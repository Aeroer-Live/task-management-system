import { Router } from 'itty-router';
import { Env } from '../worker';
import { DatabaseService } from '../utils/database';

const router = Router();

// Get calendar events
router.get('/api/calendar/events', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const url = new URL(request.url);
    const startDate = url.searchParams.get('start');
    const endDate = url.searchParams.get('end');

    const db = new DatabaseService(env.DB);
    
    let query = `
      SELECT * FROM calendar_events 
      WHERE user_id = ?
    `;
    const params = [user.userId];

    if (startDate && endDate) {
      query += ' AND start_time >= ? AND end_time <= ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY start_time ASC';

    const events = await db.db.prepare(query).bind(...params).all();

    return new Response(JSON.stringify({
      events: events.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get calendar events error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to fetch calendar events'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Create calendar event
router.post('/api/calendar/events', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const eventData = await request.json();

    // Validation
    if (!eventData.title || !eventData.startTime || !eventData.endTime) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Title, start time, and end time are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const eventId = crypto.randomUUID();
    const db = new DatabaseService(env.DB);
    
    await db.db.prepare(`
      INSERT INTO calendar_events (
        id, title, description, start_time, end_time, location, 
        attendees, is_all_day, color, user_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      eventId, eventData.title, eventData.description, eventData.startTime, eventData.endTime,
      eventData.location, JSON.stringify(eventData.attendees || []), eventData.isAllDay || false,
      eventData.color, user.userId, new Date().toISOString()
    ).run();

    return new Response(JSON.stringify({
      message: 'Event created successfully',
      eventId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create calendar event error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to create calendar event'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Update calendar event
router.put('/api/calendar/events/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const eventId = (request as any).params.id;
    const updates = await request.json();

    const db = new DatabaseService(env.DB);
    
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'attendees') {
          fields.push(`${key} = ?`);
          values.push(JSON.stringify(value));
        } else {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }
    });

    if (fields.length === 0) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'No updates provided'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    values.push(eventId, user.userId);

    await db.db.prepare(`
      UPDATE calendar_events 
      SET ${fields.join(', ')}
      WHERE id = ? AND user_id = ?
    `).bind(...values).run();

    return new Response(JSON.stringify({
      message: 'Event updated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update calendar event error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to update calendar event'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Delete calendar event
router.delete('/api/calendar/events/:id', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user;
    const eventId = (request as any).params.id;

    const db = new DatabaseService(env.DB);
    await db.db.prepare(`
      DELETE FROM calendar_events 
      WHERE id = ? AND user_id = ?
    `).bind(eventId, user.userId).run();

    return new Response(JSON.stringify({
      message: 'Event deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete calendar event error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to delete calendar event'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

export default router;
