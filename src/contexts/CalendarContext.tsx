'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useTasks } from './TasksContext';
import { useProjects } from './ProjectsContext';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: 'task' | 'project' | 'meeting' | 'deadline' | 'milestone';
  source: 'task' | 'project' | 'manual';
  sourceId?: string; // ID of the task or project
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
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
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
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { tasks } = useTasks();
  const { projects } = useProjects();

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date)
        }));
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Error loading calendar events:', error);
      }
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  // Sync tasks to calendar events
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

    // Remove existing task events and add new ones
    setEvents(prevEvents => {
      const nonTaskEvents = prevEvents.filter(event => event.source !== 'task');
      return [...nonTaskEvents, ...taskEvents];
    });
  };

  // Sync projects to calendar events
  const syncProjectsToCalendar = () => {
    const projectEvents: CalendarEvent[] = projects
      .filter(project => project.startDate || project.endDate)
      .flatMap(project => {
        const events: CalendarEvent[] = [];
        
        if (project.startDate) {
          events.push({
            id: `project-start-${project.id}`,
            title: `Start: ${project.name}`,
            date: new Date(project.startDate),
            type: 'milestone' as const,
            source: 'project' as const,
            sourceId: project.id,
            description: project.description,
            projectType: project.type,
            isAllDay: true,
          });
        }
        
        if (project.endDate) {
          events.push({
            id: `project-end-${project.id}`,
            title: `End: ${project.name}`,
            date: new Date(project.endDate),
            type: 'deadline' as const,
            source: 'project' as const,
            sourceId: project.id,
            description: project.description,
            projectType: project.type,
            isAllDay: true,
          });
        }
        
        return events;
      });

    // Remove existing project events and add new ones
    setEvents(prevEvents => {
      const nonProjectEvents = prevEvents.filter(event => event.source !== 'project');
      return [...nonProjectEvents, ...projectEvents];
    });
  };

  // Sync all data to calendar
  const syncAllToCalendar = () => {
    syncTasksToCalendar();
    syncProjectsToCalendar();
  };

  // Auto-sync when tasks or projects change
  useEffect(() => {
    syncAllToCalendar();
  }, [tasks, projects]);

  // Add a new event
  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  // Update an existing event
  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    );
  };

  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = event.date;
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Get events for a specific month
  const getEventsForMonth = (date: Date) => {
    return events.filter(event => {
      const eventDate = event.date;
      return eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Get upcoming events
  const getUpcomingEvents = (limit: number = 10) => {
    const now = new Date();
    return events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, limit);
  };

  const value: CalendarContextType = {
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
  };

  return (
    <CalendarContext.Provider value={value}>
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
