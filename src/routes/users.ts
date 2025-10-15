import { Request } from 'itty-router';
import { Env } from '../types';

export async function handleUsersRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const path = url.pathname;

  try {
    // Get user ID from the authenticated request
    const userId = (request as any).user?.id;
    if (!userId) {
      return new Response(JSON.stringify({
        error: 'Unauthorized',
        message: 'User not authenticated'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update user profile
    if (path === '/api/users/profile' && method === 'PUT') {
      const body = await request.json();
      const { name, bio, location, website } = body;

      // Validate required fields
      if (!name || !name.trim()) {
        return new Response(JSON.stringify({
          error: 'Validation Error',
          message: 'Name is required'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Update user profile in database
      const result = await env.DB.prepare(`
        UPDATE users 
        SET name = ?, bio = ?, location = ?, website = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(name.trim(), bio || null, location || null, website || null, userId).run();

      if (result.changes === 0) {
        return new Response(JSON.stringify({
          error: 'Not Found',
          message: 'User not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Fetch updated user data
      const user = await env.DB.prepare(`
        SELECT id, email, name, bio, location, website, avatar_url, created_at, updated_at
        FROM users 
        WHERE id = ?
      `).bind(userId).first();

      return new Response(JSON.stringify({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          bio: user.bio,
          location: user.location,
          website: user.website,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Change password
    if (path === '/api/users/password' && method === 'PUT') {
      const body = await request.json();
      const { currentPassword, newPassword } = body;

      // Validate required fields
      if (!currentPassword || !newPassword) {
        return new Response(JSON.stringify({
          error: 'Validation Error',
          message: 'Current password and new password are required'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (newPassword.length < 6) {
        return new Response(JSON.stringify({
          error: 'Validation Error',
          message: 'New password must be at least 6 characters long'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get current user data
      const user = await env.DB.prepare(`
        SELECT password_hash FROM users WHERE id = ?
      `).bind(userId).first();

      if (!user) {
        return new Response(JSON.stringify({
          error: 'Not Found',
          message: 'User not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify current password
      const bcrypt = await import('bcryptjs');
      const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
      
      if (!isValidPassword) {
        return new Response(JSON.stringify({
          error: 'Validation Error',
          message: 'Current password is incorrect'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Hash new password
      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      // Update password in database
      const result = await env.DB.prepare(`
        UPDATE users 
        SET password_hash = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(newPasswordHash, userId).run();

      if (result.changes === 0) {
        return new Response(JSON.stringify({
          error: 'Database Error',
          message: 'Failed to update password'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Password changed successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user profile
    if (path === '/api/users/profile' && method === 'GET') {
      const user = await env.DB.prepare(`
        SELECT id, email, name, bio, location, website, avatar_url, created_at, updated_at
        FROM users 
        WHERE id = ?
      `).bind(userId).first();

      if (!user) {
        return new Response(JSON.stringify({
          error: 'Not Found',
          message: 'User not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          bio: user.bio,
          location: user.location,
          website: user.website,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Method not allowed
    return new Response(JSON.stringify({
      error: 'Method Not Allowed',
      message: `${method} not allowed for ${path}`
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Users API Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
