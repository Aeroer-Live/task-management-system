'use client';

import { useState, useEffect } from 'react';
import { useTaskProject } from '@/contexts/TaskProjectContext';
import { useProjects } from '@/contexts/ProjectsContext';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTaskModal({ isOpen, onClose }: NewTaskModalProps) {
  const { addTaskWithProjectSync } = useTaskProject();
  const { projects } = useProjects();
  const [userLocation, setUserLocation] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(4.5); // Default MYR to USD rate
  const [isDetectingCurrency, setIsDetectingCurrency] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    project: '',
    tags: '',
    taskType: 'regular', // regular, development, financial, meeting
    productLink: '',
    amount: '',
    currency: 'USD',
    paymentLink: '',
    renewalFrequency: '',
    // Development-specific fields
    repositoryLink: '',
    branchName: '',
    issueLink: '',
    techStack: '',
    // Meeting-specific fields
    meetingLink: '',
    meetingType: '',
    attendees: '',
    duration: '',
    meetingDate: '',
    meetingTime: '',
  });

  // Detect user location and set appropriate currency
  useEffect(() => {
    if (isOpen && !userLocation) {
      detectUserLocation();
    }
  }, [isOpen, userLocation]);

  const detectUserLocation = async () => {
    setIsDetectingCurrency(true);
    try {
      // Try to get location from IP geolocation
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.country_code) {
        setUserLocation(data.country_code);
        
        // Set currency based on country
        if (data.country_code === 'MY') {
          setFormData(prev => ({ ...prev, currency: 'MYR' }));
        } else {
          setFormData(prev => ({ ...prev, currency: 'USD' }));
        }
        
        // Fetch current exchange rate
        await fetchExchangeRate();
      }
    } catch (error) {
      console.log('Location detection failed, using default currency');
      // Fallback to USD if location detection fails
      setFormData(prev => ({ ...prev, currency: 'USD' }));
    } finally {
      setIsDetectingCurrency(false);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/MYR');
      const data = await response.json();
      
      if (data.rates && data.rates.USD) {
        setExchangeRate(data.rates.USD);
      }
    } catch (error) {
      console.log('Exchange rate fetch failed, using default rate');
    }
  };

  const convertAmount = (amount: string, fromCurrency: string, toCurrency: string) => {
    if (!amount || fromCurrency === toCurrency) return amount;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return amount;
    
    if (fromCurrency === 'MYR' && toCurrency === 'USD') {
      return (numAmount * exchangeRate).toFixed(2);
    } else if (fromCurrency === 'USD' && toCurrency === 'MYR') {
      return (numAmount / exchangeRate).toFixed(2);
    }
    
    return amount;
  };

  const handleCurrencyChange = (newCurrency: 'USD' | 'MYR') => {
    const currentAmount = formData.amount;
    if (currentAmount && formData.currency !== newCurrency) {
      const convertedAmount = convertAmount(currentAmount, formData.currency, newCurrency);
      setFormData(prev => ({ 
        ...prev, 
        currency: newCurrency,
        amount: convertedAmount
      }));
    } else {
      setFormData(prev => ({ ...prev, currency: newCurrency }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tags from comma-separated string
    const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    // Find selected project
    const selectedProject = projects.find(p => p.id === formData.project);
    
    // Create task data
    const taskData = {
      title: formData.title,
      description: formData.description,
      status: formData.status as 'todo' | 'in-progress' | 'completed',
      priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      taskType: formData.taskType as 'regular' | 'development' | 'financial' | 'meeting',
      tags,
      // Project association
      projectId: formData.project || undefined,
      projectName: selectedProject?.name,
      // Type-specific fields
      productLink: formData.productLink || undefined,
      amount: formData.amount || undefined,
      currency: (formData.currency as 'USD' | 'MYR') || 'USD',
      paymentLink: formData.paymentLink || undefined,
      renewalFrequency: formData.renewalFrequency || undefined,
      repositoryLink: formData.repositoryLink || undefined,
      branchName: formData.branchName || undefined,
      issueLink: formData.issueLink || undefined,
      techStack: formData.techStack || undefined,
      // Meeting-specific fields
      meetingLink: formData.meetingLink || undefined,
      meetingType: formData.meetingType ? (formData.meetingType as 'online' | 'in-person' | 'hybrid') : undefined,
      attendees: formData.attendees || undefined,
      duration: formData.duration || undefined,
      meetingDate: formData.meetingDate || undefined,
      meetingTime: formData.meetingTime || undefined,
      // Assignment (for now, assign to current user)
      assignedTo: 'user1',
      assignedToName: 'Current User',
    };

    await addTaskWithProjectSync(taskData);
    
    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      project: '',
      tags: '',
      taskType: 'regular',
      productLink: '',
      amount: '',
      currency: 'USD',
      paymentLink: '',
      renewalFrequency: '',
      repositoryLink: '',
      branchName: '',
      issueLink: '',
      techStack: '',
      meetingLink: '',
      meetingType: '',
      attendees: '',
      duration: '',
      meetingDate: '',
      meetingTime: '',
    });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div 
        className="w-full max-w-2xl rounded-lg shadow-xl"
        style={{ 
          background: 'var(--color-canvas-default)',
          border: '1px solid var(--color-border-default)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Modal Header */}
        <div 
          className="flex items-center justify-between p-4"
          style={{ borderBottom: '1px solid var(--color-border-default)' }}
        >
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-fg-default)' }}>
            Create new task
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-opacity-10 transition-colors"
            style={{ color: 'var(--color-fg-muted)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Task Type Selector */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Task type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { value: 'regular', label: 'Regular Task', icon: '✅' },
                  { value: 'development', label: 'Development', icon: '💻' },
                  { value: 'financial', label: 'Financial', icon: '💰' },
                  { value: 'meeting', label: 'Meeting', icon: '🗓️' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, taskType: type.value })}
                    className="flex flex-col items-center justify-center p-3 rounded-md text-center transition-all"
                    style={{
                      background: formData.taskType === type.value ? 'var(--color-canvas-subtle)' : 'transparent',
                      border: `1px solid ${formData.taskType === type.value ? 'var(--color-accent-emphasis)' : 'var(--color-border-default)'}`,
                    }}
                  >
                    <span className="text-2xl mb-1">{type.icon}</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-fg-default)' }}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                {formData.taskType === 'development' ? 'Feature/Task name' :
                 formData.taskType === 'financial' ? 'Financial item name' :
                 formData.taskType === 'meeting' ? 'Meeting title' :
                 'Task title'} <span style={{ color: 'var(--color-danger-fg)' }}>*</span>
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder={
                  formData.taskType === 'development' ? 'e.g., Fix authentication bug, Add dark mode...' :
                  formData.taskType === 'financial' ? 'e.g., New laptop, Rent payment, Netflix subscription...' :
                  formData.taskType === 'meeting' ? 'e.g., Team standup, Client presentation...' :
                  'Enter task title...'
                }
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                autoFocus
              />
            </div>

            {/* Repository Link (for development tasks) */}
            {formData.taskType === 'development' && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Repository link
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://github.com/username/repository..."
                  value={formData.repositoryLink}
                  onChange={(e) => setFormData({ ...formData, repositoryLink: e.target.value })}
                />
                <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                  GitHub, GitLab, or Bitbucket repository link
                </p>
              </div>
            )}

            {/* Issue/PR Link (for development tasks) */}
            {formData.taskType === 'development' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Issue/PR link
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://github.com/.../issues/123"
                    value={formData.issueLink}
                    onChange={(e) => setFormData({ ...formData, issueLink: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Branch name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="feature/dark-mode"
                    value={formData.branchName}
                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Tech Stack (for development tasks) */}
            {formData.taskType === 'development' && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Tech stack / Language
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., React, TypeScript, Node.js"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                />
                <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                  Technologies or programming languages involved
                </p>
              </div>
            )}

            {/* Meeting-specific fields */}
            {formData.taskType === 'meeting' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Meeting type
                    </label>
                    <select
                      className="input-field"
                      value={formData.meetingType}
                      onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option value="online">Online (Zoom, Teams, etc.)</option>
                      <option value="in-person">In-person</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Duration
                    </label>
                    <select
                      className="input-field"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    >
                      <option value="">Select duration</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Meeting Date
                    </label>
                    <input
                      type="date"
                      className="input-field"
                      value={formData.meetingDate}
                      onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Meeting Time
                    </label>
                    <input
                      type="time"
                      className="input-field"
                      value={formData.meetingTime}
                      onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Meeting link
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://zoom.us/j/123456789 or Meeting room location"
                    value={formData.meetingLink}
                    onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                    Zoom, Teams, Google Meet link or physical meeting location
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Attendees
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., John Doe, Jane Smith, team@company.com"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                    Names or email addresses of meeting participants
                  </p>
                </div>
              </div>
            )}

            {/* Financial-specific fields */}
            {formData.taskType === 'financial' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Financial type
                  </label>
                  <select
                    className="input-field"
                    value={formData.renewalFrequency} // Reusing this field to store financial type
                    onChange={(e) => setFormData({ ...formData, renewalFrequency: e.target.value })}
                  >
                    <option value="">Select type...</option>
                    <option value="purchase">Purchase</option>
                    <option value="payment">Payment</option>
                    <option value="renewal">Renewal/Subscription</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Link
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://amazon.com/product-link... or https://example.com/billing..."
                    value={formData.productLink || formData.paymentLink}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (formData.renewalFrequency === 'purchase') {
                        setFormData({ ...formData, productLink: value });
                      } else {
                        setFormData({ ...formData, paymentLink: value });
                      }
                    }}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                    Product link, payment link, or service management link
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Amount (optional)
                    </label>
                    <div className="relative">
                      <span 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium pointer-events-none z-10" 
                        style={{ color: 'var(--color-fg-muted)' }}
                      >
                        {formData.currency === 'MYR' ? 'RM' : '$'}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full pl-10 pr-3 py-2 text-sm border rounded-md transition-colors"
                        style={{
                          background: 'var(--color-canvas-default)',
                          borderColor: 'var(--color-border-default)',
                          color: 'var(--color-fg-default)',
                          paddingLeft: '2.5rem'
                        }}
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--color-accent-emphasis)';
                          e.target.style.outline = '2px solid var(--color-accent-emphasis)';
                          e.target.style.outlineOffset = '-1px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--color-border-default)';
                          e.target.style.outline = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Currency
                      {isDetectingCurrency && (
                        <span className="ml-2 text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                          (Detecting...)
                        </span>
                      )}
                    </label>
                    <select
                      className="input-field"
                      value={formData.currency}
                      onChange={(e) => handleCurrencyChange(e.target.value as 'USD' | 'MYR')}
                      disabled={isDetectingCurrency}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="MYR">MYR (RM)</option>
                    </select>
                    {userLocation && (
                      <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                        Auto-detected for {userLocation === 'MY' ? 'Malaysia' : 'International'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Exchange Rate Info */}
                {formData.amount && formData.currency && (
                  <div className="p-3 rounded-md" style={{ background: 'var(--color-canvas-subtle)' }}>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: 'var(--color-fg-muted)' }}>
                        Current exchange rate: 1 MYR = ${(1 / exchangeRate).toFixed(4)} USD
                      </span>
                      {formData.currency === 'MYR' && formData.amount && (
                        <span style={{ color: 'var(--color-fg-default)' }}>
                          ≈ ${(parseFloat(formData.amount) / exchangeRate).toFixed(2)} USD
                        </span>
                      )}
                      {formData.currency === 'USD' && formData.amount && (
                        <span style={{ color: 'var(--color-fg-default)' }}>
                          ≈ RM{(parseFloat(formData.amount) * exchangeRate).toFixed(2)} MYR
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {formData.renewalFrequency === 'renewal' && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Renewal frequency
                    </label>
                    <select
                      className="input-field"
                      value={formData.duration} // Reusing duration field for renewal frequency
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    >
                      <option value="">Select frequency...</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly (3 months)</option>
                      <option value="semi-annually">Semi-annually (6 months)</option>
                      <option value="annually">Annually</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                {formData.taskType === 'development' ? 'Code description / Requirements' :
                 formData.taskType === 'financial' ? 'Financial details / Notes' :
                 formData.taskType === 'meeting' ? 'Meeting agenda / Notes' :
                 'Description'}
              </label>
              <textarea
                rows={formData.taskType === 'development' ? 4 : 3}
                className="input-field resize-none"
                placeholder={
                  formData.taskType === 'development' ? 'Describe the implementation details, requirements, or code changes needed...' :
                  formData.taskType === 'financial' ? 'Add financial details, notes, or reminders...' :
                  formData.taskType === 'meeting' ? 'Add meeting agenda, notes, or objectives...' :
                  'Add a description...'
                }
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Priority
                </label>
                <select
                  className="input-field"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Status
                </label>
                <select
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Due Date and Project */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  {formData.taskType === 'payment' ? 'Payment date' :
                   formData.taskType === 'renewal' ? 'Renewal date' :
                   'Due date'}
                  {(formData.taskType === 'payment' || formData.taskType === 'renewal') && 
                    <span style={{ color: 'var(--color-danger-fg)' }}> *</span>
                  }
                </label>
                <input
                  type="date"
                  className="input-field"
                  required={formData.taskType === 'payment' || formData.taskType === 'renewal'}
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Project
                </label>
                <select
                  className="input-field"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                >
                  <option value="">No project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Tags
              </label>
              <input
                type="text"
                className="input-field"
                placeholder={
                  formData.taskType === 'development' ? 'bug, feature, refactor, documentation (comma-separated)' :
                  formData.taskType === 'purchase' ? 'electronics, office, personal (comma-separated)' :
                  formData.taskType === 'payment' ? 'bills, rent, insurance (comma-separated)' :
                  formData.taskType === 'renewal' ? 'subscription, domain, software (comma-separated)' :
                  'bug, feature, documentation (comma-separated)'
                }
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                Separate tags with commas
              </p>
            </div>

            {/* Info Box for Development/Purchase/Payment/Renewal */}
            {formData.taskType !== 'regular' && (
              <div 
                className="p-3 rounded-md"
                style={{ 
                  background: formData.taskType === 'development' ? 'rgba(163, 113, 247, 0.05)' :
                             formData.taskType === 'purchase' ? 'rgba(31, 111, 235, 0.05)' :
                             formData.taskType === 'payment' ? 'rgba(207, 34, 46, 0.05)' :
                             'rgba(26, 127, 55, 0.05)',
                  border: `1px solid ${
                    formData.taskType === 'development' ? 'rgba(163, 113, 247, 0.2)' :
                    formData.taskType === 'purchase' ? 'rgba(31, 111, 235, 0.2)' :
                    formData.taskType === 'payment' ? 'rgba(207, 34, 46, 0.2)' :
                    'rgba(26, 127, 55, 0.2)'
                  }`
                }}
              >
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 16 16" 
                    style={{ 
                      color: formData.taskType === 'development' ? '#a371f7' :
                             formData.taskType === 'purchase' ? 'var(--color-accent-fg)' :
                             formData.taskType === 'payment' ? 'var(--color-danger-fg)' :
                             'var(--color-success-fg)'
                    }}
                  >
                    <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
                  </svg>
                  <p className="text-xs" style={{ color: 'var(--color-fg-default)' }}>
                    {formData.taskType === 'development' && 
                      'Link repositories and track issues/PRs directly. Perfect for managing bug fixes, features, and code reviews with full context.'}
                    {formData.taskType === 'purchase' && 
                      'Add product links to quickly access items you want to buy. Perfect for tracking wishlists and planned purchases.'}
                    {formData.taskType === 'payment' && 
                      'Set reminders for upcoming payments. Add payment links to make transactions quick and easy on the due date.'}
                    {formData.taskType === 'renewal' && 
                      'Track subscription renewals and avoid unexpected charges. Add service links and set renewal frequency for automatic reminders.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div 
            className="flex items-center justify-end gap-2 mt-6 pt-6"
            style={{ borderTop: '1px solid var(--color-border-default)' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

