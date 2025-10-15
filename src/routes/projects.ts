import { Router } from 'itty-router';
import { Env } from '../worker';
import { DatabaseService } from '../utils/database';

const router = Router();

// Get all projects
router.get('/api/projects', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const db = new DatabaseService(env.DB);
    const projects = await db.getProjects(user.userId);

    return new Response(JSON.stringify({
      projects: projects.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get projects error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch projects'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get single project
router.get('/api/projects/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const projectId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    const project = await db.db.prepare(`
      SELECT p.*, 
             COUNT(t.id) as task_count,
             COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks
      FROM projects p
      LEFT JOIN tasks t ON p.id = t.project_id
      WHERE p.id = ? AND p.owner = ?
      GROUP BY p.id
    `).bind(projectId, user.userId).first();

    if (!project) {
      return new Response(JSON.stringify({
        error: 'Not Found',
        message: 'Project not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get project tasks
    const tasks = await db.db.prepare(`
      SELECT * FROM tasks 
      WHERE project_id = ? AND user_id = ?
      ORDER BY created_at DESC
    `).bind(projectId, user.userId).all();

    return new Response(JSON.stringify({ 
      project: {
        ...project,
        tasks: tasks.results || []
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get project error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch project'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Create project
router.post('/api/projects', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const projectData = await request.json();

    // Validation
    if (!projectData.name) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Project name is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseService(env.DB);
    const projectId = await db.createProject(projectData, user.userId);

    return new Response(JSON.stringify({
      message: 'Project created successfully',
      projectId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create project error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to create project'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Update project
router.put('/api/projects/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const projectId = (request as any).params.id;
    const updates = await request.json();

    const db = new DatabaseService(env.DB);
    await db.updateProject(projectId, updates, user.userId);

    return new Response(JSON.stringify({
      message: 'Project updated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update project error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to update project'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Delete project
router.delete('/api/projects/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const projectId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    
    // First, update all tasks to remove project association
    await db.db.prepare(`
      UPDATE tasks 
      SET project_id = NULL 
      WHERE project_id = ? AND user_id = ?
    `).bind(projectId, user.userId).run();

    // Then delete the project
    await db.deleteProject(projectId, user.userId);

    return new Response(JSON.stringify({
      message: 'Project deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete project error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to delete project'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get project statistics
router.get('/api/projects/:id/stats', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const projectId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    const stats = await db.db.prepare(`
      SELECT 
        COUNT(*) as total_tasks,
        COUNT(CASE WHEN status = 'todo' THEN 1 END) as todo_tasks,
        COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
        COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_tasks,
        COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_tasks,
        AVG(estimated_hours) as avg_estimated_hours,
        SUM(actual_hours) as total_actual_hours
      FROM tasks 
      WHERE project_id = ? AND user_id = ?
    `).bind(projectId, user.userId).first();

    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get project stats error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch project statistics'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

export default router;
