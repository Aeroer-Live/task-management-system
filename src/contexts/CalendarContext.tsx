'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTasks } from './TasksContext';
import { useProjects } from './ProjectsContext';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: 'task' | 'project' | 'meeting' | 'deadline' | 'milestone';
  source: 'task' | 'project' | 'manual';
  sourceId?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'todo' | 'in-progress' | 'completed';
  projectName?: string;
  taskType?: 'regular' | 'development' | 'purchase' | 'payment' | 'renewal';
  projectType?: 'developer' | 'marketing';
  isAllDay?: boolean;
}

interface CalendarContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForMonth: (date: Date) => CalendarEvent[];
  getUpcomingEvents: (limit?: number) => CalendarEvent[];
  syncTasksToCalendar: () => void;
  syncProjectsToCalendar: () => void;
  syncAllToCalendar: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { tasks } = useTasks();
  const { projects } = useProjects();

  // manualEvents are fetched from the API; derived events are computed in memory
  const [manualEvents, setManualEvents] = useState<CalendarEvent[]>([]);
  const [derivedEvents, setDerivedEvents] = useState<CalendarEvent[]>([]);

  // Fetch manually created events from API on login
  useEffect(() => {
    if (!isAuthenticated) {
      setManualEvents([]);
      return;
    }
    api.getCalendarEvents().then(response => {
      if (response.data) {
        const mapped: CalendarEvent[] = response.data.events.map((e: any) => ({
          id: e.id,
          title: e.title,
          date: new Date(e.start_time || e.date),
          time: e.time,
          type: e.event_type || e.type || 'meeting',
          source: 'manual' as const,
          sourceId: e.source_id,
          description: e.description,
          isAllDay: Boolean(e.is_all_day),
        }));
        setManualEvents(mapped);
      }
    });
  }, [isAuthenticated]);

  // Derive task events from the tasks list
  const syncTasksToCalendar = () => {
    const taskEvents: CalendarEvent[] = tasks
      .filter(task => task.dueDate)
      .map(task => ({
        id: `task-${task.id}`,
        title: task.title,
        date: new Date(task.dueDate!),
        type: 'task' as const,
        source: 'task' as const,
        sourceId: task.id,
        description: task.description,
        priority: task.priority,
        status: task.status,
        projectName: task.projectName,
        taskType: task.taskType,
        isAllDay: false,
      }));

    setDerivedEvents(prev => {
      const nonTask = prev.filter(e => e.source !== 'task');
      return [...nonTask, ...taskEvents];
    });
  };

  // Derive project milestone events from the projects list
  const syncProjectsToCalendar = () => {
    const projectEvents: CalendarEvent[] = projects
      .filter(p => p.startDate || p.endDate)
      .flatMap(p => {
        const evts: CalendarEvent[] = [];
        if (p.startDate) {
          evts.push({
            id: `project-start-${p.id}`,
            title: `Start: ${p.name}`,
            date: new Date(p.startDate),
            type: 'milestone' as const,
            source: 'project' as const,
            sourceId: p.id,
            description: p.description,
            projectType: p.type as 'developer' | 'marketing',
            isAllDay: true,
          });
        }
        if (p.endDate) {
          evts.push({
            id: `project-end-${p.id}`,
            title: `End: ${p.name}`,
            date: new Date(p.endDate),
            type: 'deadline' as const,
            source: 'project' as const,
            sourceId: p.id,
            description: p.description,
            projectType: p.type as 'developer' | 'marketing',
            isAllDay: true,
          });
        }
        return evts;
      });

    setDerivedEvents(prev => {
      const nonProject = prev.filter(e => e.source !== 'project');
      return [...nonProject, ...projectEvents];
    });
  };

  const syncAllToCalendar = () => {
    syncTasksToCalendar();
    syncProjectsToCalendar();
  };

  // Auto-sync derived events when tasks or projects change
  useEffect(() => {
    syncAllToCalendar();
  }, [tasks, projects]);

  // Merged view: manual events + derived events (manual takes precedence by id)
  const events = [...derivedEvents, ...manualEvents];

  const addEvent = async (eventData: Omit<CalendarEvent, 'id'>) => {
    const response = await api.createCalendarEvent({
      title: eventData.title,
      start_time: eventData.date.toISOString(),
      event_type: eventData.type,
      description: eventData.description,
      is_all_day: eventData.isAllDay,
      time: eventData.time,
    });

    if (response.data) {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: response.data.eventId,
      };
      setManualEvents(prev => [...prev, newEvent]);
    }
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setManualEvents(prev =>
      prev.map(e => e.id === id ? { ...e, ...updates } : e)
    );
  };

  const deleteEvent = (id: string) => {
    setManualEvents(prev => prev.filter(e => e.id !== id));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(e =>
      e.date.getDate() === date.getDate() &&
      e.date.getMonth() === date.getMonth() &&
      e.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventsForMonth = (date: Date) => {
    return events.filter(e =>
      e.date.getMonth() === date.getMonth() &&
      e.date.getFullYear() === date.getFullYear()
    );
  };

  const getUpcomingEvents = (limit: number = 10) => {
    const now = new Date();
    return events
      .filter(e => e.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, limit);
  };

  return (
    <CalendarContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventsForDate,
      getEventsForMonth,
      getUpcomingEvents,
      syncTasksToCalendar,
      syncProjectsToCalendar,
      syncAllToCalendar,
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
