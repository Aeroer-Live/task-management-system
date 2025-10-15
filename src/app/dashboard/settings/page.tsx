'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

type SettingsTab = 'profile' | 'account' | 'notifications' | 'appearance' | 'integrations' | 'security';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { theme, setTheme, density, setDensity } = useTheme();
  const { user, isAuthenticated } = useAuth();
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await api.updateUserProfile({
        name: profileData.name,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setMessage(null);

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const response = await api.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to change password' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
    { id: 'security', label: 'Security', icon: '🔐' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-fg-default)' }}>
          Settings
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-fg-muted)' }}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="card p-3">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left"
                  style={{
                    color: activeTab === tab.id ? 'var(--color-fg-default)' : 'var(--color-fg-muted)',
                    background: activeTab === tab.id ? 'var(--color-canvas-subtle)' : 'transparent',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Public profile
                </h2>
                
                {/* Message Display */}
                {message && (
                  <div className={`mb-4 p-3 rounded-md text-sm ${
                    message.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}
                
                <form onSubmit={handleProfileUpdate}>
                  {/* Avatar */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Profile picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #1f6feb 0%, #238636 100%)' }}
                      >
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <button type="button" className="btn-secondary text-xs mb-2">Upload new picture</button>
                        <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      className="input-field resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                      Brief description for your profile.
                    </p>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                      className="input-field"
                    />
                  </div>

                  {/* Website */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                      className="input-field"
                    />
                  </div>

                  <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save changes'}
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => {
                        if (user) {
                          setProfileData({
                            name: user.name || '',
                            email: user.email || '',
                            bio: user.bio || '',
                            location: user.location || '',
                            website: user.website || ''
                          });
                        }
                        setMessage(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              {/* Account Information */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Account information
                </h2>

                {/* Message Display */}
                {message && (
                  <div className={`mb-4 p-3 rounded-md text-sm ${
                    message.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="input-field"
                    disabled
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                    Your primary email for notifications and sign in. Contact support to change.
                  </p>
                </div>

                {/* User ID */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user?.id || ''}
                    className="input-field"
                    disabled
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                    Your unique user identifier.
                  </p>
                </div>

                {/* Language */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Language
                  </label>
                  <select className="input-field">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                {/* Time Zone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                    Time zone
                  </label>
                  <select className="input-field">
                    <option>UTC (GMT+0:00)</option>
                    <option>EST (GMT-5:00)</option>
                    <option>PST (GMT-8:00)</option>
                    <option>IST (GMT+5:30)</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                  <button className="btn-primary">Update account</button>
                </div>
              </div>

              {/* Password Change */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Change password
                </h2>
                
                <form onSubmit={handlePasswordChange}>
                  {/* Current Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Current password *
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>

                  {/* New Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      New password *
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="input-field"
                      required
                      minLength={6}
                    />
                    <p className="text-xs mt-1" style={{ color: 'var(--color-fg-muted)' }}>
                      Password must be at least 6 characters long.
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                      Confirm new password *
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword ? 'Changing...' : 'Change password'}
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => {
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        setMessage(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="card p-6" style={{ borderColor: 'var(--color-danger-fg)' }}>
                <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-danger-fg)' }}>
                  Danger zone
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--color-fg-muted)' }}>
                  Irreversible and destructive actions
                </p>
                <div className="flex items-center justify-between p-4 rounded-md" style={{ background: 'rgba(207, 34, 46, 0.05)', border: '1px solid rgba(207, 34, 46, 0.2)' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                      Delete account
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <button 
                    className="btn-outline text-xs"
                    style={{ 
                      borderColor: 'var(--color-danger-fg)',
                      color: 'var(--color-danger-fg)'
                    }}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Notification preferences
                </h2>

                {/* Email Notifications */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Email notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Task assignments', desc: 'When someone assigns you a task' },
                      { label: 'Project updates', desc: 'When a project you follow is updated' },
                      { label: 'Deadline reminders', desc: 'Get reminded before task deadlines' },
                      { label: 'Team mentions', desc: 'When someone mentions you in a comment' },
                    ].map((item, index) => (
                      <label key={index} className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="mt-0.5 w-4 h-4 rounded"
                          style={{ accentColor: 'var(--color-success-fg)' }}
                        />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                            {item.label}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                            {item.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Push notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Desktop notifications', desc: 'Show notifications on your desktop' },
                      { label: 'Mobile push', desc: 'Send push notifications to your mobile device' },
                    ].map((item, index) => (
                      <label key={index} className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={index === 0}
                          className="mt-0.5 w-4 h-4 rounded"
                          style={{ accentColor: 'var(--color-success-fg)' }}
                        />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                            {item.label}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                            {item.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                  <button className="btn-primary">Save preferences</button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Appearance
                </h2>

                {/* Theme */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Theme preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Light', icon: '☀️' },
                      { value: 'dark', label: 'Dark', icon: '🌙' },
                      { value: 'system', label: 'System', icon: '💻' },
                    ].map((themeOption) => (
                      <label
                        key={themeOption.value}
                        className="relative cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="theme"
                          value={themeOption.value}
                          checked={theme === themeOption.value}
                          onChange={() => setTheme(themeOption.value as 'light' | 'dark' | 'system')}
                          className="peer sr-only"
                        />
                        <div 
                          className="p-4 rounded-md text-center transition-all peer-checked:ring-2"
                          style={{ 
                            border: `2px solid ${theme === themeOption.value ? 'var(--color-accent-emphasis)' : 'var(--color-border-default)'}`,
                            background: theme === themeOption.value ? 'var(--color-canvas-subtle)' : 'var(--color-canvas-default)',
                            boxShadow: theme === themeOption.value ? '0 0 0 2px var(--color-accent-emphasis)' : 'none'
                          }}
                        >
                          <div className="text-2xl mb-2">{themeOption.icon}</div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                            {themeOption.label}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'var(--color-fg-muted)' }}>
                    {theme === 'system' 
                      ? 'Theme will automatically switch based on your system preference'
                      : `Using ${theme} theme`
                    }
                  </p>
                </div>

                {/* Density */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Interface density
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'compact', label: 'Compact', desc: 'Tighter spacing' },
                      { value: 'comfortable', label: 'Comfortable', desc: 'Default spacing' },
                      { value: 'spacious', label: 'Spacious', desc: 'More breathing room' },
                    ].map((densityOption) => (
                      <label
                        key={densityOption.value}
                        className="relative cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="density"
                          value={densityOption.value}
                          checked={density === densityOption.value}
                          onChange={() => setDensity(densityOption.value as 'compact' | 'comfortable' | 'spacious')}
                          className="peer sr-only"
                        />
                        <div 
                          className="p-4 rounded-md text-center transition-all"
                          style={{ 
                            border: `2px solid ${density === densityOption.value ? 'var(--color-accent-emphasis)' : 'var(--color-border-default)'}`,
                            background: density === densityOption.value ? 'var(--color-canvas-subtle)' : 'var(--color-canvas-default)',
                            boxShadow: density === densityOption.value ? '0 0 0 2px var(--color-accent-emphasis)' : 'none'
                          }}
                        >
                          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-fg-default)' }}>
                            {densityOption.label}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                            {densityOption.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="mb-6 p-4 rounded-md" style={{ background: 'var(--color-canvas-subtle)', border: '1px solid var(--color-border-default)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Preview
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button className="btn-primary text-xs">Button</button>
                      <button className="btn-secondary text-xs">Secondary</button>
                      <button className="btn-outline text-xs">Outline</button>
                    </div>
                    <input 
                      type="text" 
                      className="input-field text-xs" 
                      placeholder="Input field preview"
                      readOnly
                    />
                    <div className="flex items-center gap-2">
                      <span className="badge text-xs">Badge</span>
                      <span className="badge badge-success text-xs">Success</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      // Settings are automatically saved via the context
                      alert('Preferences saved!');
                    }}
                  >
                    Save preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Connected accounts
                </h2>

                <div className="space-y-3">
                  {[
                    { name: 'Google Calendar', connected: true, icon: '📅', desc: 'Sync events with Google Calendar' },
                    { name: 'GitHub', connected: true, icon: '🐙', desc: 'Link repositories and issues' },
                    { name: 'Slack', connected: false, icon: '💬', desc: 'Get notifications in Slack' },
                    { name: 'Outlook', connected: false, icon: '📧', desc: 'Sync with Outlook Calendar' },
                  ].map((integration, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-md"
                      style={{ border: '1px solid var(--color-border-default)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                            {integration.name}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                            {integration.desc}
                          </p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-2">
                          <span 
                            className="badge text-xs"
                            style={{ 
                              color: 'var(--color-success-fg)',
                              background: 'rgba(26, 127, 55, 0.1)'
                            }}
                          >
                            Connected
                          </span>
                          <button className="btn-outline text-xs">Disconnect</button>
                        </div>
                      ) : (
                        <button className="btn-primary text-xs">Connect</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-fg-default)' }}>
                  Security settings
                </h2>

                {/* Change Password */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Change password
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                        Current password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                        New password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-fg-default)' }}>
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button className="btn-primary mt-3 text-xs">Update password</button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="mb-6 pt-6" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Two-factor authentication
                  </h3>
                  <div 
                    className="flex items-center justify-between p-4 rounded-md mb-3"
                    style={{ background: 'var(--color-canvas-subtle)', border: '1px solid var(--color-border-default)' }}
                  >
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-fg-default)' }}>
                        Two-factor authentication is not enabled
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="btn-primary text-xs">Enable 2FA</button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="pt-6" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-fg-default)' }}>
                    Active sessions
                  </h3>
                  <div className="space-y-2">
                    {[
                      { device: 'MacBook Pro', location: 'San Francisco, CA', current: true, time: 'Active now' },
                      { device: 'iPhone 13', location: 'San Francisco, CA', current: false, time: '2 hours ago' },
                    ].map((session, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-md"
                        style={{ background: 'var(--color-canvas-subtle)' }}
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--color-fg-muted)' }}>
                            <path d="M1.75 2.5h8.5a.25.25 0 01.25.25v8.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25zM0 2.75C0 1.784.784 1 1.75 1h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0110.25 13h-8.5A1.75 1.75 0 010 11.25v-8.5zM14.5 4.5a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h.5v1.5a.5.5 0 001 0v-9a.5.5 0 00-1 0V4h-.5z"/>
                          </svg>
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-fg-default)' }}>
                              {session.device}
                              {session.current && (
                                <span 
                                  className="ml-2 badge text-xs"
                                  style={{ 
                                    color: 'var(--color-success-fg)',
                                    background: 'rgba(26, 127, 55, 0.1)'
                                  }}
                                >
                                  Current
                                </span>
                              )}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
                              {session.location} • {session.time}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="text-xs" style={{ color: 'var(--color-danger-fg)' }}>
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

