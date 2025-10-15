import { Router } from 'itty-router';
import { Env } from '../worker';
import { DatabaseService } from '../utils/database';

const router = Router();

// Get notifications
router.get('/api/notifications', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const url = new URL(request.url);
    const unreadOnly = url.searchParams.get('unread') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '50');

    const db = new DatabaseService(env.DB);
    
    let query = `
      SELECT * FROM notifications 
      WHERE user_id = ?
    `;
    const params = [user.userId];

    if (unreadOnly) {
      query += ' AND read = false';
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);

    const notifications = await db.db.prepare(query).bind(...params).all();

    return new Response(JSON.stringify({
      notifications: notifications.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch notifications'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Mark notification as read
router.put('/api/notifications/:id/read', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const notificationId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    await db.db.prepare(`
      UPDATE notifications 
      SET read = true, updated_at = ?
      WHERE id = ? AND user_id = ?
    `).bind(new Date().toISOString(), notificationId, user.userId).run();

    return new Response(JSON.stringify({
      message: 'Notification marked as read'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Mark notification as read error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to mark notification as read'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Mark all notifications as read
router.put('/api/notifications/read-all', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const db = new DatabaseService(env.DB);
    
    await db.db.prepare(`
      UPDATE notifications 
      SET read = true, updated_at = ?
      WHERE user_id = ? AND read = false
    `).bind(new Date().toISOString(), user.userId).run();

    return new Response(JSON.stringify({
      message: 'All notifications marked as read'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to mark all notifications as read'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Delete notification
router.delete('/api/notifications/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const notificationId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    await db.db.prepare(`
      DELETE FROM notifications 
      WHERE id = ? AND user_id = ?
    `).bind(notificationId, user.userId).run();

    return new Response(JSON.stringify({
      message: 'Notification deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete notification error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to delete notification'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get notification statistics
router.get('/api/notifications/stats', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const db = new DatabaseService(env.DB);
    
    const stats = await db.db.prepare(`
      SELECT 
        COUNT(*) as total_notifications,
        COUNT(CASE WHEN read = false THEN 1 END) as unread_notifications,
        COUNT(CASE WHEN type = 'task' THEN 1 END) as task_notifications,
        COUNT(CASE WHEN type = 'project' THEN 1 END) as project_notifications,
        COUNT(CASE WHEN type = 'deadline' THEN 1 END) as deadline_notifications,
        COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_notifications
      FROM notifications 
      WHERE user_id = ?
    `).bind(user.userId).first();

    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get notification stats error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch notification statistics'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Create notification (internal use)
export async function createNotification(
  db: DatabaseService,
  userId: string,
  notification: {
    title: string;
    message: string;
    type: string;
    priority: string;
    category: string;
    link?: string;
    expiresAt?: string;
  }
): Promise<string> {
  const notificationId = crypto.randomUUID();
  
  await db.db.prepare(`
    INSERT INTO notifications (
      id, user_id, title, message, type, priority, category, 
      link, read, created_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    notificationId, userId, notification.title, notification.message,
    notification.type, notification.priority, notification.category,
    notification.link || null, false, new Date().toISOString(),
    notification.expiresAt || null
  ).run();
  
  return notificationId;
}

export default router;
