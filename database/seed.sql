-- Sample data for development and testing

-- Insert sample users
INSERT INTO users (id, email, name, password_hash, created_at, updated_at) VALUES
('user-1', 'demo@tasklab.com', 'Demo User', 'hashed_password_here', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('user-2', 'john@example.com', 'John Doe', 'hashed_password_here', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z');

-- Insert sample projects
INSERT INTO projects (id, name, description, type, status, owner, start_date, end_date, created_at, updated_at) VALUES
('project-1', 'TaskLab Development', 'Building the TaskLab productivity platform', 'developer', 'active', 'user-1', '2024-01-01T00:00:00Z', '2024-06-30T23:59:59Z', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('project-2', 'Marketing Campaign Q1', 'Q1 marketing campaign for new product launch', 'marketing', 'active', 'user-1', '2024-01-01T00:00:00Z', '2024-03-31T23:59:59Z', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('project-3', 'Personal Goals 2024', 'Personal development and learning goals', 'general', 'active', 'user-1', '2024-01-01T00:00:00Z', '2024-12-31T23:59:59Z', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z');

-- Insert sample tasks
INSERT INTO tasks (id, title, description, status, priority, task_type, tags, project_id, user_id, created_at, updated_at) VALUES
('task-1', 'Set up Cloudflare Workers backend', 'Configure Cloudflare Workers for the API backend', 'completed', 'high', 'development', '["backend", "cloudflare", "api"]', 'project-1', 'user-1', '2024-01-01T00:00:00Z', '2024-01-15T00:00:00Z'),
('task-2', 'Implement user authentication', 'Create JWT-based authentication system', 'in-progress', 'high', 'development', '["auth", "jwt", "security"]', 'project-1', 'user-1', '2024-01-01T00:00:00Z', '2024-01-20T00:00:00Z'),
('task-3', 'Design landing page', 'Create modern landing page with Tailwind CSS', 'todo', 'medium', 'development', '["frontend", "design", "tailwind"]', 'project-1', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('task-4', 'Research target audience', 'Conduct market research for Q1 campaign', 'todo', 'medium', 'regular', '["research", "marketing"]', 'project-2', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('task-5', 'Learn TypeScript', 'Complete TypeScript course and practice', 'todo', 'low', 'regular', '["learning", "typescript", "programming"]', 'project-3', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('task-6', 'Renew domain subscription', 'Renew domain.com subscription for $15/year', 'todo', 'medium', 'financial', '["domain", "renewal", "subscription"]', 'project-1', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('task-7', 'Team standup meeting', 'Daily standup with development team', 'todo', 'medium', 'meeting', '["meeting", "standup", "team"]', 'project-1', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z');

-- Insert sample calendar events
INSERT INTO calendar_events (id, title, description, start_time, end_time, location, attendees, is_all_day, color, user_id, created_at, updated_at) VALUES
('event-1', 'Team Standup', 'Daily standup meeting with the development team', '2024-01-22T09:00:00Z', '2024-01-22T09:30:00Z', 'Conference Room A', '["john@example.com", "jane@example.com"]', false, '#3B82F6', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('event-2', 'Project Review', 'Monthly project review and planning session', '2024-01-25T14:00:00Z', '2024-01-25T16:00:00Z', 'Main Conference Room', '["manager@example.com", "lead@example.com"]', false, '#10B981', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('event-3', 'Learning Day', 'Dedicated time for learning and skill development', '2024-01-26T10:00:00Z', '2024-01-26T17:00:00Z', 'Home Office', '[]', true, '#8B5CF6', 'user-1', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z');

-- Insert sample time logs
INSERT INTO time_logs (id, task_id, user_id, start_time, end_time, duration, notes, created_at) VALUES
('log-1', 'task-1', 'user-1', '2024-01-15T09:00:00Z', '2024-01-15T11:30:00Z', 150, 'Set up basic worker structure and routing', '2024-01-15T09:00:00Z'),
('log-2', 'task-1', 'user-1', '2024-01-15T14:00:00Z', '2024-01-15T16:00:00Z', 120, 'Configure database and authentication', '2024-01-15T14:00:00Z'),
('log-3', 'task-2', 'user-1', '2024-01-20T10:00:00Z', '2024-01-20T12:00:00Z', 120, 'Working on JWT implementation', '2024-01-20T10:00:00Z');

-- Insert sample notifications
INSERT INTO notifications (id, user_id, title, message, type, priority, category, link, read, created_at, updated_at) VALUES
('notif-1', 'user-1', 'Task Completed', 'Great job! You completed "Set up Cloudflare Workers backend"', 'success', 'low', 'task', '/dashboard/tasks', false, '2024-01-15T16:00:00Z', '2024-01-15T16:00:00Z'),
('notif-2', 'user-1', 'Deadline Approaching', 'Task "Design landing page" is due in 3 days', 'warning', 'medium', 'task', '/dashboard/tasks', false, '2024-01-20T00:00:00Z', '2024-01-20T00:00:00Z'),
('notif-3', 'user-1', 'New Project Created', 'Project "Marketing Campaign Q1" has been created', 'info', 'low', 'project', '/dashboard/projects', true, '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),
('notif-4', 'user-1', 'System Update', 'TaskLab has been updated with new features', 'info', 'low', 'system', '/dashboard', false, '2024-01-21T00:00:00Z', '2024-01-21T00:00:00Z');
