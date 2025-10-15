# Backend Setup Guide

This guide will help you set up the Cloudflare Workers backend for the TaskLab productivity system.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install the Cloudflare Workers CLI
3. **Node.js**: Version 18 or higher

## Installation

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

### 3. Install Dependencies

```bash
npm install
```

## Database Setup

### 1. Create D1 Database

```bash
npm run db:create
```

This will create a new D1 database. Copy the database ID from the output.

### 2. Update wrangler.toml

Update the `database_id` in `wrangler.toml` with the ID from step 1:

```toml
[[d1_databases]]
binding = "DB"
database_name = "productivity-system-db"
database_id = "your-database-id-here"  # Replace with actual ID
```

### 3. Run Database Migrations

```bash
# For local development
npm run db:local

# For production
npm run db:migrate
```

### 4. Seed Database (Optional)

```bash
# For local development
npm run db:local:seed

# For production
npm run db:seed
```

## Environment Variables

### 1. Copy Environment Template

```bash
cp env.example .env
```

### 2. Configure Environment Variables

Update `.env` with your actual values:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=https://your-worker.your-subdomain.workers.dev
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Backend Environment Variables
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Update wrangler.toml

Add your environment variables to the `[vars]` section in `wrangler.toml`:

```toml
[vars]
JWT_SECRET = "your-jwt-secret-here"
GOOGLE_CLIENT_ID = "your-google-client-id"
GOOGLE_CLIENT_SECRET = "your-google-client-secret"
GITHUB_CLIENT_ID = "your-github-client-id"
GITHUB_CLIENT_SECRET = "your-github-client-secret"
```

## KV Namespaces Setup

### 1. Create KV Namespaces

```bash
# Create sessions KV namespace
wrangler kv:namespace create "SESSIONS"

# Create cache KV namespace  
wrangler kv:namespace create "CACHE"
```

### 2. Update wrangler.toml

Update the KV namespace IDs in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "SESSIONS"
id = "your-sessions-kv-id"
preview_id = "your-sessions-preview-kv-id"

[[kv_namespaces]]
binding = "CACHE"
id = "your-cache-kv-id"
preview_id = "your-cache-preview-kv-id"
```

## R2 Storage Setup

### 1. Create R2 Bucket

```bash
wrangler r2 bucket create productivity-system-files
```

### 2. Update wrangler.toml

The R2 bucket configuration should already be set up in `wrangler.toml`.

## Deployment

### 1. Deploy to Staging

```bash
npm run deploy:staging
```

### 2. Deploy to Production

```bash
npm run deploy
```

## API Endpoints

Once deployed, your API will be available at:
- **Staging**: `https://productivity-system-api-staging.your-subdomain.workers.dev`
- **Production**: `https://productivity-system-api.your-subdomain.workers.dev`

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/google` - Google OAuth (coming soon)
- `POST /api/auth/github` - GitHub OAuth (coming soon)

#### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/bulk` - Bulk operations

#### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/stats` - Get project statistics

#### Calendar
- `GET /api/calendar/events` - Get calendar events
- `POST /api/calendar/events` - Create calendar event
- `PUT /api/calendar/events/:id` - Update calendar event
- `DELETE /api/calendar/events/:id` - Delete calendar event

#### Time Tracking
- `GET /api/time-tracking/logs` - Get time logs
- `POST /api/time-tracking/start` - Start time tracking
- `POST /api/time-tracking/stop` - Stop time tracking
- `GET /api/time-tracking/active` - Get active timer
- `GET /api/time-tracking/stats` - Get time tracking statistics

#### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification
- `GET /api/notifications/stats` - Get notification statistics

## Testing the API

### 1. Health Check

```bash
curl https://your-worker.your-subdomain.workers.dev/health
```

### 2. Register a User

```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 3. Login

```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Common Issues

1. **Database not found**: Make sure you've created the D1 database and updated the ID in `wrangler.toml`
2. **KV namespace not found**: Ensure you've created the KV namespaces and updated the IDs
3. **Authentication errors**: Check that your JWT_SECRET is set correctly
4. **CORS errors**: The API includes CORS headers, but make sure your frontend is configured correctly

### Debug Commands

```bash
# View logs
wrangler tail

# Test locally
wrangler dev

# Check database
wrangler d1 execute productivity-system-db --command "SELECT * FROM users LIMIT 5"
```

## Next Steps

1. **Update Frontend**: Update your frontend to use the new API endpoints
2. **OAuth Integration**: Implement Google and GitHub OAuth
3. **File Uploads**: Set up R2 for file storage
4. **Real-time Features**: Add WebSocket support for real-time updates
5. **Monitoring**: Set up Cloudflare Analytics and monitoring

## Support

If you encounter any issues:

1. Check the Cloudflare Workers dashboard
2. Review the Wrangler logs
3. Check the database queries
4. Verify environment variables are set correctly
