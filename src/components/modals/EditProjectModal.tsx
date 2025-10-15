'use client';

import { useState, useEffect } from 'react';
import { useTaskProject } from '@/contexts/TaskProjectContext';
import type { Project } from '@/contexts/ProjectsContext';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function EditProjectModal({ isOpen, onClose, project }: EditProjectModalProps) {
  const { updateProjectWithTaskSync } = useTaskProject();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'developer' as 'developer' | 'marketing',
    status: 'planning' as 'planning' | 'active' | 'on-hold' | 'completed',
    startDate: '',
    endDate: '',
    language: '',
    techStack: '',
    repositoryUrl: '',
    liveUrl: '',
    campaignGoal: '',
    targetAudience: '',
    budget: '',
    channels: '',
    tags: '',
  });

  // Update form data when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        type: project.type,
        status: project.status,
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        language: project.language || '',
        techStack: project.techStack || '',
        repositoryUrl: project.repositoryUrl || '',
        liveUrl: project.liveUrl || '',
        campaignGoal: project.campaignGoal || '',
        targetAudience: project.targetAudience || '',
        budget: project.budget || '',
        channels: project.channels || '',
        tags: project.tags ? project.tags.join(', ') : '',
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tags from comma-separated string
    const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    // Create project data
    const projectData = {
      name: formData.name,
      description: formData.description,
      type: formData.type,
      status: formData.status,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      // Developer-specific fields
      language: formData.language || undefined,
      techStack: formData.techStack || undefined,
      repositoryUrl: formData.repositoryUrl || undefined,
      liveUrl: formData.liveUrl || undefined,
      // Marketing-specific fields
      campaignGoal: formData.campaignGoal || undefined,
      targetAudience: formData.targetAudience || undefined,
      budget: formData.budget || undefined,
      channels: formData.channels || undefined,
      tags,
    };

    updateProjectWithTaskSync(project.id, projectData);
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
            Edit project
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
                      Code, software, web app
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
                      Campaign, content, social
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Project name *
                </label>
                <input
                  type="text"
                  required
                  className="input-field w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Status
                </label>
                <select
                  className="input-field w-full"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Description *
              </label>
              <textarea
                required
                rows={3}
                className="input-field w-full resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                  Start date
                </label>
                <input
                  type="date"
                  className="input-field w-full"
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
                  className="input-field w-full"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* Developer-specific fields */}
            {formData.type === 'developer' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                  Development Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Primary language
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      placeholder="e.g., TypeScript, Python"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Tech stack
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Repository URL
                    </label>
                    <input
                      type="url"
                      className="input-field w-full"
                      value={formData.repositoryUrl}
                      onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Live URL
                    </label>
                    <input
                      type="url"
                      className="input-field w-full"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://your-app.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Marketing-specific fields */}
            {formData.type === 'marketing' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-fg-default)' }}>
                  Marketing Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Campaign goal
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    value={formData.campaignGoal}
                    onChange={(e) => setFormData({ ...formData, campaignGoal: e.target.value })}
                    placeholder="e.g., Increase brand awareness, drive sales"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Target audience
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="e.g., Young professionals, tech enthusiasts"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Budget
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g., $5,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Channels
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      value={formData.channels}
                      onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
                      placeholder="e.g., Social media, email, ads"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                Tags
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Enter tags separated by commas"
              />
              <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
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
              Update project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
