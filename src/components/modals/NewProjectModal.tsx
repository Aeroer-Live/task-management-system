'use client';

import { useState } from 'react';
import { useTaskProject } from '@/contexts/TaskProjectContext';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const { addProjectWithTaskSync } = useTaskProject();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'developer', // developer or marketing
    status: 'active',
    startDate: '',
    endDate: '',
    // Developer project fields
    repositoryLink: '',
    techStack: '',
    versionControl: 'github',
    // Marketing project fields
    campaignGoal: '',
    budget: '',
    channels: '',
    targetAudience: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create project data
    const projectData = {
      name: formData.name,
      description: formData.description,
      type: formData.type as 'developer' | 'marketing',
      status: formData.status as 'active' | 'planning' | 'on-hold' | 'completed',
      progress: 0,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
      // Developer fields
      repositoryLink: formData.repositoryLink || undefined,
      techStack: formData.techStack || undefined,
      versionControl: formData.versionControl as 'github' | 'gitlab' | 'bitbucket' | 'other' || undefined,
      // Marketing fields
      campaignGoal: formData.campaignGoal || undefined,
      budget: formData.budget || undefined,
      channels: formData.channels || undefined,
      targetAudience: formData.targetAudience || undefined,
    };

    await addProjectWithTaskSync(projectData);
    
    // Reset form and close modal
    setFormData({
      name: '',
      description: '',
      type: 'developer',
      status: 'active',
      startDate: '',
      endDate: '',
      repositoryLink: '',
      techStack: '',
      versionControl: 'github',
      campaignGoal: '',
      budget: '',
      channels: '',
      targetAudience: '',
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
            Create new project
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
            {/* Project Type Selector */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Project type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'developer' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.type === 'developer' ? 'rgba(31, 111, 235, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.type === 'developer' ? 'var(--color-accent-emphasis)' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-accent-fg)' }}>
                    <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Developer
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Code, repos, issues
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'marketing' })}
                  className="flex items-center gap-3 p-4 rounded-md transition-all"
                  style={{
                    background: formData.type === 'marketing' ? 'rgba(163, 113, 247, 0.1)' : 'var(--color-canvas-subtle)',
                    border: `2px solid ${formData.type === 'marketing' ? '#a371f7' : 'var(--color-border-default)'}`,
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16" style={{ color: '#a371f7' }}>
                    <path d="M1.75 1.5a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25H1.75z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                      Marketing
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Campaigns, content
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Project name <span style={{ color: 'var(--color-danger-fg)' }}>*</span>
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder={
                  formData.type === 'developer' 
                    ? 'e.g., Task-Lab Development, Mobile App...'
                    : 'e.g., Q4 Marketing Campaign, Product Launch...'
                }
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoFocus
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Description
              </label>
              <textarea
                rows={3}
                className="input-field resize-none"
                placeholder={
                  formData.type === 'developer'
                    ? 'Describe the project goals, features, and technical requirements...'
                    : 'Describe the campaign objectives, target metrics, and deliverables...'
                }
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Developer Project Specific Fields */}
            {formData.type === 'developer' && (
              <>
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
                    Link to the main repository for this project
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Tech stack
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="React, Node.js, PostgreSQL..."
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Version control
                    </label>
                    <select
                      className="input-field"
                      value={formData.versionControl}
                      onChange={(e) => setFormData({ ...formData, versionControl: e.target.value })}
                    >
                      <option value="github">GitHub</option>
                      <option value="gitlab">GitLab</option>
                      <option value="bitbucket">Bitbucket</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Marketing Project Specific Fields */}
            {formData.type === 'marketing' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Campaign goal
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Increase brand awareness, Generate 1000 leads..."
                    value={formData.campaignGoal}
                    onChange={(e) => setFormData({ ...formData, campaignGoal: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm" style={{ color: 'var(--color-fg-muted)' }}>
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        className="input-field pl-7"
                        placeholder="0.00"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Target audience
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Developers, B2B..."
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Marketing channels
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Social media, Email, SEO, Paid ads (comma-separated)"
                    value={formData.channels}
                    onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                    Channels you&apos;ll use for this campaign
                  </p>
                </div>
              </>
            )}

            {/* Project Status and Timeline */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Status
                </label>
                <select
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="planning">Planning</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Start date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  End date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* Info Box */}
            <div 
              className="p-3 rounded-md"
              style={{ 
                background: formData.type === 'developer' ? 'rgba(31, 111, 235, 0.05)' : 'rgba(163, 113, 247, 0.05)',
                border: `1px solid ${formData.type === 'developer' ? 'rgba(31, 111, 235, 0.2)' : 'rgba(163, 113, 247, 0.2)'}`
              }}
            >
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 16 16" 
                  style={{ color: formData.type === 'developer' ? 'var(--color-accent-fg)' : '#a371f7' }}
                >
                  <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
                <p className="text-xs" style={{ color: 'var(--color-fg-default)' }}>
                  {formData.type === 'developer' && 
                    'Developer projects include task boards, GitHub integration, code references, and issue tracking for efficient software development.'}
                  {formData.type === 'marketing' && 
                    'Marketing projects help you track campaigns, manage budgets, schedule content, and measure performance across multiple channels.'}
                </p>
              </div>
            </div>
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
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

