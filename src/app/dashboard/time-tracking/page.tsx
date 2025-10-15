'use client';

import { useState, useEffect, useRef } from 'react';
import { useTasks } from '@/contexts/TasksContext';
import { useAuth } from '@/contexts/AuthContext';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';
type TimerStatus = 'idle' | 'running' | 'paused';

export default function TimeTrackingPage() {
  const { tasks, isLoading, error } = useTasks();
  const { user } = useAuth();
  
  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState<TimerMode>('work');
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [selectedTask, setSelectedTask] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timerModes = {
    work: { duration: 25 * 60, label: 'Work' },
    shortBreak: { duration: 5 * 60, label: 'Short Break' },
    longBreak: { duration: 15 * 60, label: 'Long Break' },
  };

  // For new users, show empty state
  const timeLogs: any[] = [];

  useEffect(() => {
    if (timerStatus === 'running' && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerStatus, timeLeft]);

  const handleTimerComplete = () => {
    setTimerStatus('idle');
    
    if (timerMode === 'work') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      // After 4 pomodoros, take a long break
      if (newCount % 4 === 0) {
        setTimerMode('longBreak');
        setTimeLeft(timerModes.longBreak.duration);
      } else {
        setTimerMode('shortBreak');
        setTimeLeft(timerModes.shortBreak.duration);
      }
    } else {
      setTimerMode('work');
      setTimeLeft(timerModes.work.duration);
    }

    // Play notification sound (browser notification)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: timerMode === 'work' ? 'Time for a break!' : 'Back to work!',
      });
    }
  };

  const startTimer = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setTimerStatus('running');
  };

  const pauseTimer = () => {
    setTimerStatus('paused');
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setTimerStatus('idle');
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(timerModes[timerMode].duration);
  };

  const switchMode = (mode: TimerMode) => {
    setTimerMode(mode);
    setTimeLeft(timerModes[mode].duration);
    setTimerStatus('idle');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const total = timerModes[timerMode].duration;
    return ((total - timeLeft) / total) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
          Time Tracking
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
          Track your time with Pomodoro technique and view your productivity
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Pomodoro Timer - Main Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Timer Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                Pomodoro Timer
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                  Session: {pomodoroCount}
                </span>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-2 mb-6">
              {(Object.keys(timerModes) as TimerMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => switchMode(mode)}
                  className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
                  style={{
                    background: timerMode === mode ? 'var(--color-canvas-subtle)' : 'transparent',
                    color: timerMode === mode ? 'var(--color-fg-default)' : 'var(--color-fg-muted)',
                    border: `1px solid ${timerMode === mode ? 'var(--color-border-default)' : 'transparent'}`,
                  }}
                >
                  {timerModes[mode].label}
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="relative mb-6">
              {/* Progress Circle */}
              <div className="relative w-64 h-64 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="var(--color-canvas-subtle)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke={timerMode === 'work' ? 'var(--color-accent-fg)' : 'var(--color-success-fg)'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - getProgress() / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                
                {/* Timer Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-bold mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
                    {timerMode === 'work' ? 'Focus Time' : 'Break Time'}
                  </p>
                </div>
              </div>
            </div>

            {/* Task Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Working on
              </label>
              <select 
                className="input-field"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
              >
                <option value="">Select a task...</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              {timerStatus === 'idle' && (
                <button 
                  onClick={startTimer}
                  className="btn-primary px-8 py-3 text-base"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4 2.5A.5.5 0 014.5 2h7a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-11z"/>
                      <path d="M6.5 4.5v7l5-3.5-5-3.5z"/>
                    </svg>
                    Start
                  </span>
                </button>
              )}
              
              {timerStatus === 'running' && (
                <button 
                  onClick={pauseTimer}
                  className="btn-secondary px-8 py-3 text-base"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5zm5 0A1.5 1.5 0 0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5z"/>
                    </svg>
                    Pause
                  </span>
                </button>
              )}

              {timerStatus === 'paused' && (
                <>
                  <button 
                    onClick={startTimer}
                    className="btn-primary px-6 py-3 text-base"
                  >
                    Resume
                  </button>
                  <button 
                    onClick={resetTimer}
                    className="btn-outline px-6 py-3 text-base"
                  >
                    Reset
                  </button>
                </>
              )}

              {timerStatus !== 'idle' && timerStatus !== 'paused' && (
                <button 
                  onClick={resetTimer}
                  className="btn-outline px-6 py-3 text-base"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Timer Info */}
            <div className="mt-6 p-4 rounded-md" style={{ background: 'var(--color-canvas-subtle)' }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-fg-muted)' }}>Work</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                    25 min
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-fg-muted)' }}>Short Break</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                    5 min
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-fg-muted)' }}>Long Break</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                    15 min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Logs */}
          <div className="card p-4">
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
              Recent activity
            </h3>
            <div className="space-y-2">
              {timeLogs.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
                    <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm7-3.25v3.5h3.25a.75.75 0 010 1.5H7.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0z"/>
                  </svg>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-fg-default)' }}>
                    No time tracking yet
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                    Start a timer to begin tracking your work time
                  </p>
                </div>
              ) : (
                timeLogs.map((log) => (
                  <div 
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-md"
                    style={{ background: 'var(--color-canvas-subtle)' }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
                        <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm7-3.25v3.5h3.25a.75.75 0 010 1.5H7.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0z"/>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-fg-default)' }}>
                          {log.task}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                          {log.date}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-accent-fg)' }}>
                      {log.duration}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Today's Summary */}
          <div className="card p-4">
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
              Today&apos;s summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Total time</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                  0h 0m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Pomodoros</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-accent-fg)' }}>
                  {pomodoroCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Tasks</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                  {tasks.length}
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="card p-4">
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
              This week
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Total time</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                  0h 0m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Daily average</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-accent-fg)' }}>
                  0h 0m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>Most productive</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-fg-muted)' }}>
                  -
                </span>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
              <div className="flex items-end justify-between gap-1 h-24">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  // Show empty bars for new users
                  const heights = [0, 0, 0, 0, 0, 0, 0];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full rounded-t transition-all"
                        style={{ 
                          height: `${heights[index]}%`,
                          background: 'var(--color-fg-muted)',
                          opacity: 0.3
                        }}
                      ></div>
                      <span className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                        {day[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Productivity Tips */}
          <div className="card p-4" style={{ background: 'rgba(26, 127, 55, 0.05)', border: '1px solid rgba(26, 127, 55, 0.2)' }}>
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-success-fg)' }}>
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-success-fg)' }}>
                  Tip
                </h4>
                <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                  Take a 5-minute break after each 25-minute focus session. Stand up, stretch, and hydrate!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

