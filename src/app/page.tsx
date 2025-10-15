'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redirect to the pure HTML landing page
    window.location.href = '/landing.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-canvas-default)' }}>
          <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p style={{ color: 'var(--color-fg-muted)' }}>Loading landing page...</p>
        </div>
    </div>
  );
}
