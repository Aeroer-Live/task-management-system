export function errorHandler(error: unknown, request: Request): Response {
  console.error('Worker error:', error);
  
  const errorResponse = {
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    path: new URL(request.url).pathname
  };
  
  // In development, include more details
  if (process.env.NODE_ENV === 'development') {
    errorResponse.message = error instanceof Error ? error.message : 'Unknown error';
  }
  
  return new Response(JSON.stringify(errorResponse), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}
