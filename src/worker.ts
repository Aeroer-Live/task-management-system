export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

// Health check
    if (url.pathname === '/health') {
  return new Response(JSON.stringify({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
    
    // Authentication endpoints
    if (url.pathname === '/api/auth/register' && request.method === 'POST') {
      try {
        const { email, password, name } = await request.json();
        
        if (!email || !password || !name) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Email, password, and name are required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Check if user exists
        const existingUser = await env.DB.prepare(`
          SELECT id FROM users WHERE email = ?
        `).bind(email).first();
        
        if (existingUser) {
          return new Response(JSON.stringify({
            error: 'Conflict',
            message: 'User with this email already exists'
          }), {
            status: 409,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Create user (simplified - no password hashing for now)
        const userId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO users (id, email, name, password_hash, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(userId, email, name, password, new Date().toISOString(), new Date().toISOString()).run();
        
        return new Response(JSON.stringify({
          message: 'User created successfully',
          userId
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to create user'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    if (url.pathname === '/api/auth/login' && request.method === 'POST') {
      try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Email and password are required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        const user = await env.DB.prepare(`
          SELECT id, email, name, password_hash FROM users WHERE email = ?
        `).bind(email).first();
        
        if (!user || user.password_hash !== password) {
          return new Response(JSON.stringify({
            error: 'Unauthorized',
            message: 'Invalid email or password'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Generate a simple token (in production, use proper JWT)
        const token = btoa(JSON.stringify({
          userId: user.id,
          email: user.email,
          name: user.name,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));
        
        return new Response(JSON.stringify({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to authenticate user'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Get current user endpoint
    if (url.pathname === '/api/auth/me' && request.method === 'GET') {
      try {
        const authHeader = request.headers.get('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return new Response(JSON.stringify({
            error: 'Unauthorized',
            message: 'No valid token provided'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Decode the simple token
        const token = authHeader.substring(7); // Remove 'Bearer '
        let tokenData;
        
        try {
          tokenData = JSON.parse(atob(token));
        } catch (e) {
          return new Response(JSON.stringify({
            error: 'Unauthorized',
            message: 'Invalid token format'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Check if token is expired
        if (tokenData.exp && Date.now() > tokenData.exp) {
          return new Response(JSON.stringify({
            error: 'Unauthorized',
            message: 'Token expired'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get user from database using token data
        const user = await env.DB.prepare(`
          SELECT id, email, name, created_at FROM users WHERE id = ?
        `).bind(tokenData.userId).first();
        
        if (!user) {
          return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'User not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        return new Response(JSON.stringify({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.created_at
          }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to get user data'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Tasks endpoints
    if (url.pathname === '/api/tasks' && request.method === 'GET') {
      try {
        // Get all tasks for demo purposes
        const tasks = await env.DB.prepare(`
          SELECT id, title, description, status, priority, task_type, 
                 project_id, user_id, created_at, updated_at, completed_at, tags
          FROM tasks 
          ORDER BY created_at DESC
        `).all();
        
        // Process tasks to handle tags properly
        const processedTasks = (tasks.results || []).map(task => ({
          ...task,
          tags: task.tags ? JSON.parse(task.tags) : []
        }));
        
        return new Response(JSON.stringify({
          tasks: processedTasks
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to fetch tasks'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    if (url.pathname === '/api/tasks' && request.method === 'POST') {
      try {
        const taskData = await request.json();
        
        if (!taskData.title) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Task title is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get the first user for demo purposes
        const firstUser = await env.DB.prepare(`
          SELECT id FROM users ORDER BY created_at ASC LIMIT 1
        `).first();
        
        if (!firstUser) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'No users found. Please register first.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        const taskId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO tasks (
            id, title, description, status, priority, task_type, 
            project_id, user_id, created_at, updated_at, tags
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          taskId, taskData.title, taskData.description || '', 
          taskData.status || 'todo', taskData.priority || 'medium',
          taskData.task_type || 'regular', taskData.projectId || null,
          firstUser.id, new Date().toISOString(), new Date().toISOString(),
          JSON.stringify(taskData.tags || [])
        ).run();
        
        return new Response(JSON.stringify({
          message: 'Task created successfully',
          taskId
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to create task'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Update task endpoint
    if (url.pathname.startsWith('/api/tasks/') && request.method === 'PUT') {
      try {
        const taskId = url.pathname.split('/')[3];
        const updates = await request.json();
        
        if (!taskId) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Task ID is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get the first user for demo purposes
        const firstUser = await env.DB.prepare(`
          SELECT id FROM users ORDER BY created_at ASC LIMIT 1
        `).first();
        
        if (!firstUser) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'No users found. Please register first.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Update the task - build dynamic query based on provided fields
        const updateFields = [];
        const updateValues = [];
        
        if (updates.title !== undefined) {
          updateFields.push('title = ?');
          updateValues.push(updates.title);
        }
        if (updates.description !== undefined) {
          updateFields.push('description = ?');
          updateValues.push(updates.description);
        }
        if (updates.status !== undefined) {
          updateFields.push('status = ?');
          updateValues.push(updates.status);
        }
        if (updates.priority !== undefined) {
          updateFields.push('priority = ?');
          updateValues.push(updates.priority);
        }
        if (updates.task_type !== undefined) {
          updateFields.push('task_type = ?');
          updateValues.push(updates.task_type);
        }
        if (updates.projectId !== undefined) {
          updateFields.push('project_id = ?');
          updateValues.push(updates.projectId);
        }
        if (updates.tags !== undefined) {
          updateFields.push('tags = ?');
          updateValues.push(JSON.stringify(updates.tags));
        }
        
        if (updateFields.length === 0) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'No fields to update'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        updateFields.push('updated_at = datetime(\'now\')');
        updateValues.push(taskId, firstUser.id);
        
        const query = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ? AND user_id = ?`;
        
        const result = await env.DB.prepare(query).bind(...updateValues).run();
        
        if (result.changes === 0) {
          return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Task not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        return new Response(JSON.stringify({
          message: 'Task updated successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to update task'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Delete task endpoint
    if (url.pathname.startsWith('/api/tasks/') && request.method === 'DELETE') {
      try {
        const taskId = url.pathname.split('/')[3];
        
        if (!taskId) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Task ID is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get the first user for demo purposes
        const firstUser = await env.DB.prepare(`
          SELECT id FROM users ORDER BY created_at ASC LIMIT 1
        `).first();
        
        if (!firstUser) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'No users found. Please register first.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Delete the task
        const result = await env.DB.prepare(`
          DELETE FROM tasks WHERE id = ? AND user_id = ?
        `).bind(taskId, firstUser.id).run();
        
        if (result.changes === 0) {
          return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Task not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        return new Response(JSON.stringify({
          message: 'Task deleted successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to delete task'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Projects endpoints
    if (url.pathname === '/api/projects' && request.method === 'GET') {
      try {
        // Get all projects for demo purposes
        const projects = await env.DB.prepare(`
          SELECT id, name, description, type, status, owner, 
                 start_date, end_date, created_at, updated_at
          FROM projects 
          ORDER BY created_at DESC
        `).all();
        
        return new Response(JSON.stringify({
          projects: projects.results || []
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to fetch projects'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    if (url.pathname === '/api/projects' && request.method === 'POST') {
      try {
        const projectData = await request.json();
        
        if (!projectData.name) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Project name is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get the first user for demo purposes
        const firstUser = await env.DB.prepare(`
          SELECT id FROM users ORDER BY created_at ASC LIMIT 1
        `).first();
        
        if (!firstUser) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'No users found. Please register first.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        const projectId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO projects (
            id, name, description, type, status, owner, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          projectId, projectData.name, projectData.description || '',
          projectData.type || 'general', projectData.status || 'active',
          firstUser.id, new Date().toISOString(), new Date().toISOString()
        ).run();
        
        return new Response(JSON.stringify({
          message: 'Project created successfully',
          projectId
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to create project'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Update project endpoint
    if (url.pathname.startsWith('/api/projects/') && request.method === 'PUT') {
      try {
        const projectId = url.pathname.split('/')[3];
        const updates = await request.json();
        
        if (!projectId) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Project ID is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get the first user for demo purposes
        const firstUser = await env.DB.prepare(`
          SELECT id FROM users ORDER BY created_at ASC LIMIT 1
        `).first();
        
        if (!firstUser) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'No users found. Please register first.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Update the project - build dynamic query based on provided fields
        const updateFields = [];
        const updateValues = [];
        
        if (updates.name !== undefined) {
          updateFields.push('name = ?');
          updateValues.push(updates.name);
        }
        if (updates.description !== undefined) {
          updateFields.push('description = ?');
          updateValues.push(updates.description);
        }
        if (updates.type !== undefined) {
          updateFields.push('type = ?');
          updateValues.push(updates.type);
        }
        if (updates.status !== undefined) {
          updateFields.push('status = ?');
          updateValues.push(updates.status);
        }
        if (updates.startDate !== undefined) {
          updateFields.push('start_date = ?');
          updateValues.push(updates.startDate);
        }
        if (updates.endDate !== undefined) {
          updateFields.push('end_date = ?');
          updateValues.push(updates.endDate);
        }
        if (updates.language !== undefined) {
          updateFields.push('language = ?');
          updateValues.push(updates.language);
        }
        if (updates.techStack !== undefined) {
          updateFields.push('tech_stack = ?');
          updateValues.push(updates.techStack);
        }
        if (updates.repositoryUrl !== undefined) {
          updateFields.push('repository_url = ?');
          updateValues.push(updates.repositoryUrl);
        }
        if (updates.liveUrl !== undefined) {
          updateFields.push('live_url = ?');
          updateValues.push(updates.liveUrl);
        }
        if (updates.campaignGoal !== undefined) {
          updateFields.push('campaign_goal = ?');
          updateValues.push(updates.campaignGoal);
        }
        if (updates.targetAudience !== undefined) {
          updateFields.push('target_audience = ?');
          updateValues.push(updates.targetAudience);
        }
        if (updates.budget !== undefined) {
          updateFields.push('budget = ?');
          updateValues.push(updates.budget);
        }
        if (updates.channels !== undefined) {
          updateFields.push('channels = ?');
          updateValues.push(updates.channels);
        }
        if (updates.tags !== undefined) {
          updateFields.push('tags = ?');
          updateValues.push(JSON.stringify(updates.tags));
        }
        
        if (updateFields.length === 0) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'No fields to update'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        updateFields.push('updated_at = datetime(\'now\')');
        updateValues.push(projectId, firstUser.id);
        
        const query = `UPDATE projects SET ${updateFields.join(', ')} WHERE id = ? AND owner = ?`;
        
        const result = await env.DB.prepare(query).bind(...updateValues).run();
        
        if (result.changes === 0) {
          return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Project not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        return new Response(JSON.stringify({
          message: 'Project updated successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to update project'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // Delete project endpoint
    if (url.pathname.startsWith('/api/projects/') && request.method === 'DELETE') {
      try {
        const projectId = url.pathname.split('/')[3];
        
        if (!projectId) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Project ID is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Get the first user for demo purposes
        const firstUser = await env.DB.prepare(`
          SELECT id FROM users ORDER BY created_at ASC LIMIT 1
        `).first();
        
        if (!firstUser) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'No users found. Please register first.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        // Delete the project
        const result = await env.DB.prepare(`
          DELETE FROM projects WHERE id = ? AND owner = ?
        `).bind(projectId, firstUser.id).run();
        
        if (result.changes === 0) {
          return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Project not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
        
        return new Response(JSON.stringify({
          message: 'Project deleted successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to delete project'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

// 404 handler
  return new Response(JSON.stringify({ 
    error: 'Not Found',
    message: 'The requested resource was not found'
  }), {
    status: 404,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  },
};

// Environment interface
export interface Env {
  DB: D1Database;
  SESSIONS: KVNamespace;
  CACHE: KVNamespace;
  FILES: R2Bucket;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}
