import { Env } from '../worker';

export class DatabaseService {
  constructor(private db: D1Database) {}

  // User operations
  async createUser(email: string, name: string, hashedPassword: string): Promise<string> {
    const userId = crypto.randomUUID();
    await this.db.prepare(`
      INSERT INTO users (id, email, name, password_hash, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(userId, email, name, hashedPassword, new Date().toISOString()).run();
    
    return userId;
  }

  async getUserByEmail(email: string) {
    return await this.db.prepare(`
      SELECT id, email, name, password_hash, created_at
      FROM users 
      WHERE email = ?
    `).bind(email).first();
  }

  async getUserById(id: string) {
    return await this.db.prepare(`
      SELECT id, email, name, created_at
      FROM users 
      WHERE id = ?
    `).bind(id).first();
  }

  // Task operations
  async createTask(task: any, userId: string): Promise<string> {
    const taskId = crypto.randomUUID();
    await this.db.prepare(`
      INSERT INTO tasks (
        id, title, description, status, priority, due_date, 
        task_type, tags, product_link, amount, currency, payment_link,
        renewal_frequency, repository_link, branch_name, issue_link,
        tech_stack, meeting_link, meeting_type, attendees, duration,
        meeting_date, meeting_time, assigned_to, assigned_to_name,
        estimated_hours, actual_hours, project_id, user_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      taskId, task.title, task.description, task.status, task.priority, task.dueDate,
      task.taskType, JSON.stringify(task.tags || []), task.productLink, task.amount, task.currency, task.paymentLink,
      task.renewalFrequency, task.repositoryLink, task.branchName, task.issueLink,
      task.techStack, task.meetingLink, task.meetingType, task.attendees, task.duration,
      task.meetingDate, task.meetingTime, task.assignedTo, task.assignedToName,
      task.estimatedHours, task.actualHours, task.projectId, userId, new Date().toISOString(), new Date().toISOString()
    ).run();
    
    return taskId;
  }

  async getTasks(userId: string, filters?: any) {
    let query = `
      SELECT t.*, p.name as project_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.user_id = ?
    `;
    const params = [userId];

    if (filters?.status) {
      query += ' AND t.status = ?';
      params.push(filters.status);
    }

    if (filters?.priority) {
      query += ' AND t.priority = ?';
      params.push(filters.priority);
    }

    if (filters?.projectId) {
      query += ' AND t.project_id = ?';
      params.push(filters.projectId);
    }

    query += ' ORDER BY t.created_at DESC';

    return await this.db.prepare(query).bind(...params).all();
  }

  async updateTask(taskId: string, updates: any, userId: string) {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return;

    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(taskId, userId);

    await this.db.prepare(`
      UPDATE tasks 
      SET ${fields.join(', ')}
      WHERE id = ? AND user_id = ?
    `).bind(...values).run();
  }

  async deleteTask(taskId: string, userId: string) {
    await this.db.prepare(`
      DELETE FROM tasks 
      WHERE id = ? AND user_id = ?
    `).bind(taskId, userId).run();
  }

  // Project operations
  async createProject(project: any, userId: string): Promise<string> {
    const projectId = crypto.randomUUID();
    await this.db.prepare(`
      INSERT INTO projects (
        id, name, description, type, status, owner, start_date, end_date, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      projectId, project.name, project.description, project.type, project.status,
      userId, project.startDate, project.endDate, new Date().toISOString(), new Date().toISOString()
    ).run();
    
    return projectId;
  }

  async getProjects(userId: string) {
    return await this.db.prepare(`
      SELECT p.*, 
             COUNT(t.id) as task_count,
             COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks
      FROM projects p
      LEFT JOIN tasks t ON p.id = t.project_id
      WHERE p.owner = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `).bind(userId).all();
  }

  async updateProject(projectId: string, updates: any, userId: string) {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return;

    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(projectId, userId);

    await this.db.prepare(`
      UPDATE projects 
      SET ${fields.join(', ')}
      WHERE id = ? AND owner = ?
    `).bind(...values).run();
  }

  async deleteProject(projectId: string, userId: string) {
    await this.db.prepare(`
      DELETE FROM projects 
      WHERE id = ? AND owner = ?
    `).bind(projectId, userId).run();
  }
}
