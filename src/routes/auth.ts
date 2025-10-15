import { Router } from 'itty-router';
import { Env } from '../worker';
import { DatabaseService } from '../utils/database';
import { generateJWT, JWTPayload } from '../utils/jwt';
import { hashPassword, verifyPassword } from '../utils/hash';

const router = Router();

// Register endpoint
router.post('/api/auth/register', async (request: Request, env: Env) => {
  try {
    const { email, password, name } = await request.json() as {
      email: string;
      password: string;
      name: string;
    };

    // Validation
    if (!email || !password || !name) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Email, password, and name are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Password must be at least 8 characters long'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseService(env.DB);

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return new Response(JSON.stringify({
        error: 'Conflict',
        message: 'User with this email already exists'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create user
    const hashedPassword = await hashPassword(password);
    const userId = await db.createUser(email, name, hashedPassword);

    // Generate JWT
    const token = await generateJWT({
      userId,
      email,
      name
    }, env.JWT_SECRET);

    return new Response(JSON.stringify({
      message: 'User created successfully',
      token,
      user: {
        id: userId,
        email,
        name
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to create user'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Login endpoint
router.post('/api/auth/login', async (request: Request, env: Env) => {
  try {
    const { email, password } = await request.json() as {
      email: string;
      password: string;
    };

    // Validation
    if (!email || !password) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Email and password are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = new DatabaseService(env.DB);

    // Get user
    const user = await db.getUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({
        error: 'Unauthorized',
        message: 'Invalid email or password'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return new Response(JSON.stringify({
        error: 'Unauthorized',
        message: 'Invalid email or password'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate JWT
    const token = await generateJWT({
      userId: user.id,
      email: user.email,
      name: user.name
    }, env.JWT_SECRET);

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
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to authenticate user'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get current user endpoint
router.get('/api/auth/me', async (request: Request, env: Env) => {
  try {
    const user = (request as any).user as JWTPayload;
    const db = new DatabaseService(env.DB);
    
    const userData = await db.getUserById(user.userId);
    if (!userData) {
      return new Response(JSON.stringify({
        error: 'Not Found',
        message: 'User not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        createdAt: userData.created_at
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Failed to get user data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// OAuth endpoints (placeholder for future implementation)
router.post('/api/auth/google', async (request: Request, env: Env) => {
  return new Response(JSON.stringify({
    error: 'Not Implemented',
    message: 'Google OAuth integration coming soon'
  }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' }
  });
});

router.post('/api/auth/github', async (request: Request, env: Env) => {
  return new Response(JSON.stringify({
    error: 'Not Implemented',
    message: 'GitHub OAuth integration coming soon'
  }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' }
  });
});

export default router;
