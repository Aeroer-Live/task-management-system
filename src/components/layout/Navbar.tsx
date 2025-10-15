'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50" style={{ 
      background: 'var(--color-canvas-default)', 
      borderBottom: '1px solid var(--color-border-default)',
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--color-fg-default)' }}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span className="text-lg font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                Task-Lab
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/features" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-opacity-10"
              style={{ color: 'var(--color-fg-default)' }}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-opacity-10"
              style={{ color: 'var(--color-fg-default)' }}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-opacity-10"
              style={{ color: 'var(--color-fg-default)' }}
            >
              About
            </Link>
            <div className="w-px h-6" style={{ background: 'var(--color-border-default)' }}></div>
            <Link 
              href="/auth/login" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-opacity-10"
              style={{ color: 'var(--color-fg-default)' }}
            >
              Sign in
            </Link>
            <Link 
              href="/auth/signup" 
              className="btn-primary"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              style={{ color: 'var(--color-fg-default)' }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" style={{ 
          background: 'var(--color-canvas-default)', 
          borderTop: '1px solid var(--color-border-default)' 
        }}>
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/features"
              className="block px-3 py-2 rounded-md text-sm font-medium"
              style={{ color: 'var(--color-fg-default)' }}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-sm font-medium"
              style={{ color: 'var(--color-fg-default)' }}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-sm font-medium"
              style={{ color: 'var(--color-fg-default)' }}
            >
              About
            </Link>
            <div className="h-px my-2" style={{ background: 'var(--color-border-default)' }}></div>
            <Link
              href="/auth/login"
              className="block px-3 py-2 rounded-md text-sm font-medium"
              style={{ color: 'var(--color-fg-default)' }}
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="block px-3 py-2 btn-primary mt-2"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

