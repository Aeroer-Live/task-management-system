import { Router } from 'itty-router';
import { Env } from '../worker';
import { DatabaseService } from '../utils/database';

const router = Router();

// Get all tasks
router.get('/api/tasks', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const projectId = url.searchParams.get('projectId');

    const db = new DatabaseService(env.DB);
    const tasks = await db.getTasks(user.userId, {
      status,
      priority,
      projectId
    });

    return new Response(JSON.stringify({
      tasks: tasks.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch tasks'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get single task
router.get('/api/tasks/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const taskId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    const task = await db.db.prepare(`
      SELECT t.*, p.name as project_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.id = ? AND t.user_id = ?
    `).bind(taskId, user.userId).first();

    if (!task) {
      return new Response(JSON.stringify({
        error: 'Not Found',
        message: 'Task not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ task }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get task error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch task'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Create task
router.post('/api/tasks', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const taskData = await request.json();

    // Validation
    if (!taskData.title) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Task title is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseService(env.DB);
    const taskId = await db.createTask(taskData, user.userId);

    return new Response(JSON.stringify({
      message: 'Task created successfully',
      taskId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create task error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to create task'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Update task
router.put('/api/tasks/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const taskId = (request as any).params.id;
    const updates = await request.json();

    const db = new DatabaseService(env.DB);
    await db.updateTask(taskId, updates, user.userId);

    return new Response(JSON.stringify({
      message: 'Task updated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update task error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to update task'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Delete task
router.delete('/api/tasks/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const taskId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    await db.deleteTask(taskId, user.userId);

    return new Response(JSON.stringify({
      message: 'Task deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete task error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to delete task'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Bulk operations
router.post('/api/tasks/bulk', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const { action, taskIds, updates } = await request.json();

    if (!action || !taskIds || !Array.isArray(taskIds)) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Action and taskIds are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseService(env.DB);
    let results = [];

    for (const taskId of taskIds) {
      if (action === 'update' && updates) {
        await db.updateTask(taskId, updates, user.userId);
        results.push({ taskId, success: true });
      } else if (action === 'delete') {
        await db.deleteTask(taskId, user.userId);
        results.push({ taskId, success: true });
      }
    }

    return new Response(JSON.stringify({
      message: 'Bulk operation completed',
      results
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Bulk operation error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to perform bulk operation'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

export default router;
