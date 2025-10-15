import { Env } from '../worker';
import { verifyJWT } from '../utils/jwt';

export async function authMiddleware(request: Request, env: Env): Promise<Response | undefined> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Missing or invalid authorization header'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.substring(7);
  
  try {
    const payload = await verifyJWT(token, env.JWT_SECRET);
    
    // Add user info to request context
    (request as any).user = payload;
    
    return undefined; // Continue to next handler
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
