import { Env } from '../worker';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const rateLimitConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per window
};

export async function rateLimitMiddleware(request: Request, env: Env): Promise<Response | undefined> {
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `rate_limit:${clientIP}`;
  
  try {
    const current = await env.CACHE.get(key);
    const count = current ? parseInt(current) : 0;
    
    if (count >= rateLimitConfig.maxRequests) {
      return new Response(JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Increment counter
    await env.CACHE.put(key, (count + 1).toString(), {
      expirationTtl: Math.ceil(rateLimitConfig.windowMs / 1000)
    });
    
    return undefined; // Continue to next handler
  } catch (error) {
    // If rate limiting fails, continue anyway
    console.error('Rate limiting error:', error);
    return undefined;
  }
}
