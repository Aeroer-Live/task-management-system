'use client';

import { useState, useMemo } from 'react';
import { useCalendar } from '@/contexts/CalendarContext';
import type { CalendarEvent } from '@/contexts/CalendarContext';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, getEventsForDate, getUpcomingEvents } = useCalendar();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return getEventsForDate(targetDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const getEventColor = (event: CalendarEvent) => {
    switch(event.type) {
      case 'task':
        if (event.status === 'completed') {
          return { bg: 'rgba(26, 127, 55, 0.1)', border: 'var(--color-success-fg)', text: 'var(--color-success-fg)' };
        } else if (event.priority === 'urgent' || event.priority === 'high') {
          return { bg: 'rgba(207, 34, 46, 0.1)', border: 'var(--color-danger-fg)', text: 'var(--color-danger-fg)' };
        } else {
          return { bg: 'rgba(31, 111, 235, 0.1)', border: 'var(--color-accent-fg)', text: 'var(--color-accent-fg)' };
        }
      case 'project':
        return { bg: 'rgba(139, 69, 19, 0.1)', border: '#8B4513', text: '#8B4513' };
      case 'meeting': 
        return { bg: 'rgba(31, 111, 235, 0.1)', border: 'var(--color-accent-fg)', text: 'var(--color-accent-fg)' };
      case 'deadline': 
        return { bg: 'rgba(207, 34, 46, 0.1)', border: 'var(--color-danger-fg)', text: 'var(--color-danger-fg)' };
      case 'milestone': 
        return { bg: 'rgba(26, 127, 55, 0.1)', border: 'var(--color-success-fg)', text: 'var(--color-success-fg)' };
      default: 
        return { bg: 'rgba(208, 215, 222, 0.2)', border: 'var(--color-fg-muted)', text: 'var(--color-fg-muted)' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
            Calendar
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
            Manage your schedule and upcoming events
          </p>
        </div>
        <button className="btn-primary">
          New event
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="card p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={previousMonth}
                  className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: 'var(--color-fg-muted)' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="btn-secondary text-xs px-3"
                >
                  Today
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1.5 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: 'var(--color-fg-muted)' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div 
                  key={day} 
                  className="text-center text-xs font-semibold py-2"
                  style={{ color: 'var(--color-fg-muted)' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDay(day);
                const today = isToday(day);

                return (
                  <div
                    key={day}
                    className="aspect-square rounded-md p-1 transition-colors cursor-pointer relative"
                    style={{
                      background: today ? 'var(--color-canvas-subtle)' : 'transparent',
                      border: today ? '2px solid var(--color-accent-emphasis)' : '1px solid var(--color-border-default)',
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <span 
                        className="text-sm font-medium mb-1"
                        style={{ 
                          color: today ? 'var(--color-accent-fg)' : 'var(--color-fg-default)'
                        }}
                      >
                        {day}
                      </span>
                      <div className="flex-1 space-y-0.5 overflow-hidden">
                        {dayEvents.slice(0, 2).map(event => {
                          const colors = getEventColor(event);
                          return (
                            <div
                              key={event.id}
                              className="text-xs px-1 py-0.5 rounded truncate"
                              style={{
                                background: colors.bg,
                                borderLeft: `2px solid ${colors.border}`,
                                color: colors.text
                              }}
                              title={`${event.title}${event.description ? ` - ${event.description}` : ''}`}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div 
                            className="text-xs px-1"
                            style={{ color: 'var(--color-fg-muted)' }}
                          >
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: 'rgba(31, 111, 235, 0.3)' }}></div>
              <span style={{ color: 'var(--color-fg-muted)' }}>Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: 'rgba(139, 69, 19, 0.3)' }}></div>
              <span style={{ color: 'var(--color-fg-muted)' }}>Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: 'rgba(207, 34, 46, 0.3)' }}></div>
              <span style={{ color: 'var(--color-fg-muted)' }}>Deadlines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: 'rgba(26, 127, 55, 0.3)' }}></div>
              <span style={{ color: 'var(--color-fg-muted)' }}>Milestones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: 'rgba(31, 111, 235, 0.3)' }}></div>
              <span style={{ color: 'var(--color-fg-muted)' }}>Meetings</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
              Upcoming events
            </h3>
            <div className="space-y-3">
              {getUpcomingEvents(10).map(event => {
                const colors = getEventColor(event);
                return (
                  <div
                    key={event.id}
                    className="p-3 rounded-md transition-colors hover:bg-opacity-50 cursor-pointer"
                    style={{ 
                      background: 'var(--color-canvas-subtle)',
                      borderLeft: `3px solid ${colors.border}`
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                        {event.title}
                      </h4>
                      <span 
                        className="badge text-xs capitalize flex-shrink-0"
                        style={{ 
                          color: colors.text,
                          background: colors.bg
                        }}
                      >
                        {event.type}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-xs mb-2" style={{ color: 'var(--color-fg-muted)' }}>
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"/>
                        </svg>
                        {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      {event.time && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm7-3.25v3.5h3.25a.75.75 0 010 1.5H7.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0z"/>
                          </svg>
                          {event.time}
                        </span>
                      )}
                      {event.priority && (
                        <span 
                          className="badge text-xs"
                          style={{ 
                            color: event.priority === 'urgent' || event.priority === 'high' ? 'var(--color-danger-fg)' : 'var(--color-fg-muted)',
                            background: event.priority === 'urgent' || event.priority === 'high' ? 'rgba(207, 34, 46, 0.1)' : 'rgba(208, 215, 222, 0.2)'
                          }}
                        >
                          {event.priority}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-4 mt-4">
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
              This month
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Total events</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                  {events.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Tasks</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-accent-fg)' }}>
                  {events.filter(e => e.type === 'task').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Projects</span>
                <span className="text-sm font-semibold" style={{ color: '#8B4513' }}>
                  {events.filter(e => e.type === 'project').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Deadlines</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-danger-fg)' }}>
                  {events.filter(e => e.type === 'deadline').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Milestones</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-success-fg)' }}>
                  {events.filter(e => e.type === 'milestone').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

