'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import NewTaskModal from '@/components/modals/NewTaskModal';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { 
    name: 'Overview', 
    path: '/dashboard', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM3.5 3.25a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9zm0 4a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9zM3 11.75a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z"/>
      </svg>
    )
  },
  { 
    name: 'Tasks', 
    path: '/dashboard/tasks', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"/>
      </svg>
    )
  },
  { 
    name: 'Projects', 
    path: '/dashboard/projects', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v7.5a.75.75 0 01-1.5 0v-7.5zM8 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 008 3z"/>
      </svg>
    )
  },
  { 
    name: 'Calendar', 
    path: '/dashboard/calendar', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm0 3.5h8.5a.25.25 0 01.25.25V6h-11V3.75a.25.25 0 01.25-.25h2zm-2 4.25h11v6.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25v-6.5z"/>
      </svg>
    )
  },
  { 
    name: 'Time Tracking', 
    path: '/dashboard/time-tracking', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm7-3.25v3.5h3.25a.75.75 0 010 1.5H7.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0z"/>
      </svg>
    )
  },
  { 
    name: 'Notifications', 
    path: '/dashboard/notifications', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zM8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z"/>
      </svg>
    )
  },
  { 
    name: 'Settings', 
    path: '/dashboard/settings', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0a8.2 8.2 0 01.701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 01-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 01-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 01-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 01-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 01-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 010-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 01.704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 000 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.030.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 001.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 000-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 00-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 00-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 00-1.142 0zM11 8a3 3 0 11-6 0 3 3 0 016 0zM9.5 8a1.5 1.5 0 10-3.001.001A1.5 1.5 0 009.5 8z"/>
      </svg>
    )
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <NewTaskModal 
        isOpen={isNewTaskModalOpen} 
        onClose={() => setIsNewTaskModalOpen(false)} 
      />
    <aside className="w-64 h-screen fixed left-0 top-0 flex flex-col" style={{ 
      background: 'var(--color-canvas-default)',
      borderRight: '1px solid var(--color-border-default)',
      zIndex: 30
    }}>
      {/* Fixed Header Section */}
      <div className="p-4 flex-shrink-0">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-3 mb-4">
          <img 
            src="/TaskLab.png" 
            alt="Task-Lab Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-base font-semibold" style={{ color: 'var(--color-fg-default)' }}>
            Task-Lab
          </span>
        </Link>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">

        {/* Quick Actions - Moved to top */}
        <div className="mb-4 p-3 rounded-md" style={{ background: 'var(--color-canvas-subtle)', border: '1px solid var(--color-border-default)' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-fg-default)' }}>
            Quick actions
          </p>
          <button 
            onClick={() => setIsNewTaskModalOpen(true)}
            className="btn-primary w-full text-xs"
          >
            New Task
          </button>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px" style={{ background: 'var(--color-border-default)' }}></div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-colors"
                style={{
                  color: isActive ? 'var(--color-fg-default)' : 'var(--color-fg-muted)',
                  background: isActive ? 'var(--color-canvas-subtle)' : 'transparent',
                  fontWeight: isActive ? 600 : 400
                }}
              >
                <span style={{ color: isActive ? 'var(--color-fg-default)' : 'var(--color-fg-muted)' }}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Fixed Footer Section - User Profile */}
      <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid var(--color-border-default)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #1f6feb 0%, #238636 100%)' }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--color-fg-default)' }}>
              {user?.name || 'User Name'}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--color-fg-muted)' }}>
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-opacity-10 transition-colors"
          style={{ color: 'var(--color-danger-fg)' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 01-.5-.5v-7a.5.5 0 011 0v7a.5.5 0 01-.5.5zM10.5 6a.5.5 0 00-.5-.5H8a.5.5 0 000 1h2a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5H8a.5.5 0 000 1h2a.5.5 0 00.5-.5z"/>
            <path d="M2 2a2 2 0 00-2 2v8a2 2 0 002 2h5.293a1 1 0 001-1V13a1 1 0 011-1h1a1 1 0 001 1v3.293a1 1 0 01-.293.707L9.5 16.5a1.5 1.5 0 01-1.5 1.5H2a2 2 0 01-2-2V4a2 2 0 012-2h2.5a.5.5 0 010 1H2z"/>
          </svg>
          Sign out
        </button>
      </div>
    </aside>
    </>
  );
}

