import { Router } from 'itty-router';
import { Env } from '../worker';
import { DatabaseService } from '../utils/database';

const router = Router();

// Get time logs
router.get('/api/time-tracking/logs', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    const startDate = url.searchParams.get('start');
    const endDate = url.searchParams.get('end');

    const db = new DatabaseService(env.DB);
    
    let query = `
      SELECT tl.*, t.title as task_title
      FROM time_logs tl
      LEFT JOIN tasks t ON tl.task_id = t.id
      WHERE tl.user_id = ?
    `;
    const params = [user.userId];

    if (taskId) {
      query += ' AND tl.task_id = ?';
      params.push(taskId);
    }

    if (startDate && endDate) {
      query += ' AND tl.start_time >= ? AND tl.start_time <= ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY tl.start_time DESC';

    const logs = await db.db.prepare(query).bind(...params).all();

    return new Response(JSON.stringify({
      logs: logs.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get time logs error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch time logs'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Start time tracking
router.post('/api/time-tracking/start', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const { taskId, notes } = await request.json();

    if (!taskId) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Task ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if there's already an active timer for this user
    const db = new DatabaseService(env.DB);
    const activeTimer = await db.db.prepare(`
      SELECT * FROM time_logs 
      WHERE user_id = ? AND end_time IS NULL
      ORDER BY start_time DESC
      LIMIT 1
    `).bind(user.userId).first();

    if (activeTimer) {
      return new Response(JSON.stringify({
        error: 'Conflict',
        message: 'You already have an active timer running'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const logId = crypto.randomUUID();
    const startTime = new Date().toISOString();
    
    await db.db.prepare(`
      INSERT INTO time_logs (id, task_id, user_id, start_time, notes, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(logId, taskId, user.userId, startTime, notes || '', new Date().toISOString()).run();

    return new Response(JSON.stringify({
      message: 'Time tracking started',
      logId,
      startTime
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Start time tracking error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to start time tracking'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Stop time tracking
router.post('/api/time-tracking/stop', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const { notes } = await request.json();

    const db = new DatabaseService(env.DB);
    
    // Get the active timer
    const activeTimer = await db.db.prepare(`
      SELECT * FROM time_logs 
      WHERE user_id = ? AND end_time IS NULL
      ORDER BY start_time DESC
      LIMIT 1
    `).bind(user.userId).first();

    if (!activeTimer) {
      return new Response(JSON.stringify({
        error: 'Not Found',
        message: 'No active timer found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const endTime = new Date().toISOString();
    const startTime = new Date(activeTimer.start_time);
    const duration = Math.floor((new Date(endTime).getTime() - startTime.getTime()) / (1000 * 60)); // in minutes

    await db.db.prepare(`
      UPDATE time_logs 
      SET end_time = ?, duration = ?, notes = COALESCE(?, notes)
      WHERE id = ? AND user_id = ?
    `).bind(endTime, duration, notes, activeTimer.id, user.userId).run();

    // Update task actual hours
    await db.db.prepare(`
      UPDATE tasks 
      SET actual_hours = COALESCE(actual_hours, 0) + ?
      WHERE id = ? AND user_id = ?
    `).bind(duration / 60, activeTimer.task_id, user.userId).run();

    return new Response(JSON.stringify({
      message: 'Time tracking stopped',
      duration,
      endTime
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Stop time tracking error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to stop time tracking'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get current active timer
router.get('/api/time-tracking/active', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const db = new DatabaseService(env.DB);
    
    const activeTimer = await db.db.prepare(`
      SELECT tl.*, t.title as task_title
      FROM time_logs tl
      LEFT JOIN tasks t ON tl.task_id = t.id
      WHERE tl.user_id = ? AND tl.end_time IS NULL
      ORDER BY tl.start_time DESC
      LIMIT 1
    `).bind(user.userId).first();

    if (!activeTimer) {
      return new Response(JSON.stringify({
        active: false
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      active: true,
      timer: activeTimer
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get active timer error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch active timer'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get time tracking statistics
router.get('/api/time-tracking/stats', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'week'; // week, month, year

    const db = new DatabaseService(env.DB);
    
    let dateFilter = '';
    const now = new Date();
    
    switch (period) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter = `AND tl.start_time >= '${weekAgo.toISOString()}'`;
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        dateFilter = `AND tl.start_time >= '${monthAgo.toISOString()}'`;
        break;
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        dateFilter = `AND tl.start_time >= '${yearAgo.toISOString()}'`;
        break;
    }

    const stats = await db.db.prepare(`
      SELECT 
        COUNT(*) as total_sessions,
        SUM(duration) as total_minutes,
        AVG(duration) as avg_session_duration,
        COUNT(DISTINCT task_id) as unique_tasks
      FROM time_logs tl
      WHERE tl.user_id = ? AND tl.end_time IS NOT NULL ${dateFilter}
    `).bind(user.userId).first();

    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get time tracking stats error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch time tracking statistics'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

export default router;
