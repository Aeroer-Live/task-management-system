# Task Lab - Comprehensive Productivity Platform

A modern, feature-rich productivity web system built with Next.js, TypeScript, and Tailwind CSS. Designed to help individuals and teams streamline their workflow with powerful task management, project boards, calendar integration, and time tracking.

## 🚀 Features

### 🔐 Authentication & Security
- Secure login system with email/password
- OAuth integration (Google & GitHub)
- Two-factor authentication support (coming soon)
- Data privacy controls

### ✅ Task Management
- Create, organize, and prioritize tasks
- Filter by status (todo, in-progress, completed)
- Priority levels (low, medium, high, urgent)
- Due dates and deadlines
- Recurring task automation (coming soon)

### 📂 Project Management
- **Developer Projects**: Task boards, GitHub integration, issue tracking
- **Marketing Projects**: Campaign tracking, content calendar, resource management
- Progress tracking and analytics
- Team collaboration tools

### 📅 Smart Calendar
- Calendar view for events and deadlines
- Google Calendar & Outlook sync (coming soon)
- Meeting scheduler (coming soon)

### ⏱️ Time Tracking
- Start/stop timers for tasks
- Track productivity metrics
- Generate time reports (coming soon)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with modern design
- **Deployment**: Cloudflare Pages

### Backend ✅ LIVE
- **API**: Cloudflare Workers - https://productivity-system-api.aeroermark.workers.dev
- **Database**: Cloudflare D1 (SQL) with complete schema
- **Storage**: Cloudflare R2 (Object Storage)
- **Cache**: Cloudflare KV (Key-Value Store)
- **Authentication**: JWT with secure token handling
- **Rate Limiting**: Built-in protection
- **CORS**: Full cross-origin support

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development Server

The development server runs on [http://localhost:3000](http://localhost:3000)

### Available Pages:
- **Landing Page**: `/`
- **Login**: `/auth/login`
- **Sign Up**: `/auth/signup`
- **Dashboard**: `/dashboard`
- **Tasks**: `/dashboard/tasks`
- **Projects**: `/dashboard/projects`
- **Calendar**: `/dashboard/calendar` (coming soon)
- **Time Tracking**: `/dashboard/time-tracking` (coming soon)
- **Settings**: `/dashboard/settings` (coming soon)

## 📁 Project Structure

```
productivity-system/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── auth/             # Auth components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── layout/           # Layout components (Navbar, Sidebar)
│   │   ├── tasks/            # Task components
│   │   ├── projects/         # Project components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
└── tailwind.config.ts       # Tailwind CSS configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (Sky) - `#0ea5e9`
- **Secondary**: Purple - `#a855f7`
- **Success**: Green
- **Warning**: Yellow/Orange
- **Error**: Red

### Components
- Custom button styles: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- Card component: `.card`
- Input fields: `.input-field`
- Responsive navigation and sidebar

## 🔄 Current Status

### ✅ Completed
- [x] Project setup with Next.js & TypeScript
- [x] Tailwind CSS configuration
- [x] Landing page with features showcase
- [x] Authentication UI (Login & Signup)
- [x] Dashboard layout with sidebar navigation
- [x] Dashboard overview with stats
- [x] Tasks page with filtering
- [x] Projects page with developer/marketing types
- [x] Responsive design for mobile/tablet/desktop
- [x] Dark mode support
- [x] **Cloudflare Workers backend with full API**
- [x] **D1 database with complete schema**
- [x] **JWT authentication system**
- [x] **Real-time task and project management**
- [x] **Frontend-backend integration**

### 🚧 In Progress
- [ ] Calendar page
- [ ] Time tracking page
- [ ] Settings page

### 📋 Planned Features
- [x] ~~Backend integration with Cloudflare Workers~~ ✅ **COMPLETED**
- [x] ~~Database setup with Cloudflare D1~~ ✅ **COMPLETED**
- [ ] Real authentication with OAuth (Google & GitHub)
- [ ] Google Calendar & Outlook integration
- [ ] Real-time notifications
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile app (PWA)
- [ ] Email templates and reminders
- [ ] File attachments with Cloudflare R2

## 🚀 Deployment

### Backend API (LIVE)
The backend is deployed and running on Cloudflare Workers:
- **Database**: Cloudflare D1 with complete schema
- **Authentication**: JWT-based with secure tokens

### Frontend Deployment
The frontend will be deployed to Cloudflare Pages for global CDN distribution.

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
# Follow Cloudflare Pages deployment guide
```

### API Endpoints
- **Authentication**: `/api/auth/*` (register, login, me)
- **Tasks**: `/api/tasks/*` (CRUD operations, bulk actions)
- **Projects**: `/api/projects/*` (CRUD operations, statistics)
- **Calendar**: `/api/calendar/*` (event management)
- **Time Tracking**: `/api/time-tracking/*` (timer, logs, stats)
- **Notifications**: `/api/notifications/*` (management, stats)

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Coming soon - Backend API configuration
NEXT_PUBLIC_API_URL=your_cloudflare_workers_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
```

## 🤝 Contributing

This is a personal productivity project. Contributions, issues, and feature requests are welcome!

## 📄 License

MIT License - feel free to use this project for your own productivity needs.

## 🎯 Next Steps

1. **Complete remaining dashboard pages** (Calendar, Time Tracking, Settings)
2. **Set up Cloudflare Workers backend** for API endpoints
3. **Implement database schema** with Cloudflare D1
4. **Add real authentication** with JWT and OAuth
5. **Integrate external APIs** (Google Calendar, GitHub)
6. **Build reusable UI components** library
7. **Add comprehensive testing** (Jest, React Testing Library)
8. **Deploy to production** on Cloudflare Pages

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
