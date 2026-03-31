module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/contexts/ThemeContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('system');
    const [density, setDensity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('comfortable');
    const [resolvedTheme, setResolvedTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('light');
    // Load saved preferences from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTheme = localStorage.getItem('theme');
        const savedDensity = localStorage.getItem('density');
        if (savedTheme) setTheme(savedTheme);
        if (savedDensity) setDensity(savedDensity);
    }, []);
    // Resolve theme based on system preference
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const resolveTheme = ()=>{
            if (theme === 'system') {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
            } else {
                setResolvedTheme(theme);
            }
        };
        resolveTheme();
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ()=>{
            if (theme === 'system') {
                resolveTheme();
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, [
        theme
    ]);
    // Apply theme to document
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        // Remove existing theme classes
        root.classList.remove('light', 'dark');
        // Add new theme class
        root.classList.add(resolvedTheme);
        // Set data attribute for CSS targeting
        root.setAttribute('data-theme', resolvedTheme);
    }, [
        resolvedTheme
    ]);
    // Apply density to document
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        // Remove existing density classes
        root.classList.remove('comfortable', 'compact', 'spacious');
        // Add new density class
        root.classList.add(density);
        // Set data attribute for CSS targeting
        root.setAttribute('data-density', density);
    }, [
        density
    ]);
    // Save preferences to localStorage
    const handleSetTheme = (newTheme)=>{
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    const handleSetDensity = (newDensity)=>{
        setDensity(newDensity);
        localStorage.setItem('density', newDensity);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme: handleSetTheme,
            density,
            setDensity: handleSetDensity,
            resolvedTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
}),
"[project]/src/contexts/NotificationsContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationsProvider",
    ()=>NotificationsProvider,
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const NotificationsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function NotificationsProvider({ children }) {
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load notifications from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            try {
                const parsed = JSON.parse(savedNotifications);
                // Convert date strings back to Date objects
                const notificationsWithDates = parsed.map((n)=>({
                        ...n,
                        createdAt: new Date(n.createdAt),
                        expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined
                    }));
                setNotifications(notificationsWithDates);
            } catch (error) {
                console.error('Error loading notifications:', error);
            }
        } else {
            // Initialize with some sample notifications
            const sampleNotifications = [
                {
                    id: '1',
                    userId: 'user1',
                    title: 'Task Deadline Approaching',
                    message: 'Fix authentication bug is due in 2 hours',
                    type: 'deadline',
                    read: false,
                    priority: 'high',
                    category: 'task',
                    createdAt: new Date(Date.now() - 30 * 60 * 1000),
                    action: {
                        label: 'View Task',
                        onClick: ()=>console.log('Navigate to task')
                    }
                },
                {
                    id: '2',
                    userId: 'user1',
                    title: 'New Project Created',
                    message: 'Task-Lab Development project has been created',
                    type: 'project',
                    read: false,
                    priority: 'medium',
                    category: 'project',
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    action: {
                        label: 'View Project',
                        onClick: ()=>console.log('Navigate to project')
                    }
                },
                {
                    id: '3',
                    userId: 'user1',
                    title: 'Team Meeting Reminder',
                    message: 'Daily standup meeting starts in 15 minutes',
                    type: 'info',
                    read: true,
                    priority: 'medium',
                    category: 'calendar',
                    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
                },
                {
                    id: '4',
                    userId: 'user1',
                    title: 'System Update Available',
                    message: 'New features and improvements are ready to install',
                    type: 'system',
                    read: false,
                    priority: 'low',
                    category: 'system',
                    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                    action: {
                        label: 'Update Now',
                        onClick: ()=>console.log('Start system update')
                    }
                },
                {
                    id: '5',
                    userId: 'user1',
                    title: 'Task Completed',
                    message: 'Update landing page design has been completed',
                    type: 'success',
                    read: true,
                    priority: 'low',
                    category: 'task',
                    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
                }
            ];
            setNotifications(sampleNotifications);
        }
    }, []);
    // Save notifications to localStorage whenever they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [
        notifications
    ]);
    // Auto-remove expired notifications
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setNotifications((prev)=>prev.filter((notification)=>!notification.expiresAt || notification.expiresAt > new Date()));
        }, 60000); // Check every minute
        return ()=>clearInterval(interval);
    }, []);
    const unreadCount = notifications.filter((n)=>!n.read).length;
    const addNotification = (notificationData)=>{
        const newNotification = {
            ...notificationData,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            read: false
        };
        setNotifications((prev)=>[
                newNotification,
                ...prev
            ]);
        // Show browser notification if permission is granted
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(newNotification.title, {
                body: newNotification.message,
                icon: '/favicon.ico',
                tag: newNotification.id
            });
        }
    };
    const markAsRead = (id)=>{
        setNotifications((prev)=>prev.map((notification)=>notification.id === id ? {
                    ...notification,
                    read: true
                } : notification));
    };
    const markAllAsRead = ()=>{
        setNotifications((prev)=>prev.map((notification)=>({
                    ...notification,
                    read: true
                })));
    };
    const removeNotification = (id)=>{
        setNotifications((prev)=>prev.filter((notification)=>notification.id !== id));
    };
    const clearAllNotifications = ()=>{
        setNotifications([]);
    };
    const getNotificationsByCategory = (category)=>{
        return notifications.filter((notification)=>notification.category === category);
    };
    const getUnreadNotifications = ()=>{
        return notifications.filter((notification)=>!notification.read);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationsContext.Provider, {
        value: {
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            removeNotification,
            clearAllNotifications,
            getNotificationsByCategory,
            getUnreadNotifications
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/NotificationsContext.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
function useNotifications() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(NotificationsContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
}
}),
"[project]/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration
__turbopack_context__.s([
    "api",
    ()=>api
]);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://productivity-system-api.aeroermark.workers.dev';
// Force the correct API URL for production
const PRODUCTION_API_URL = 'https://productivity-system-api.aeroermark.workers.dev';
// Debug: Log the API URL to help with troubleshooting
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// API Client Class
class ApiClient {
    baseUrl;
    token = null;
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.loadToken();
    }
    loadToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    setToken(token) {
        this.token = token;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    clearToken() {
        this.token = null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    hasValidToken() {
        if (!this.token) return false;
        try {
            // Decode the token to check expiration
            const tokenData = JSON.parse(atob(this.token));
            if (tokenData.exp && Date.now() > tokenData.exp) {
                this.clearToken();
                return false;
            }
            return true;
        } catch (error) {
            // Invalid token format
            this.clearToken();
            return false;
        }
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }
        try {
            const response = await fetch(url, {
                ...options,
                headers
            });
            const data = await response.json();
            if (!response.ok) {
                // If it's an authentication error, clear the token
                if (response.status === 401) {
                    this.clearToken();
                }
                return {
                    error: data.error || data.message || 'Request failed'
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : 'Network error'
            };
        }
    }
    // Health Check
    async healthCheck() {
        return this.request('/health');
    }
    // Authentication
    async register(email, password, name) {
        return this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                name
            })
        });
    }
    async login(email, password) {
        const response = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.data?.token) {
            this.setToken(response.data.token);
        }
        return response;
    }
    async getCurrentUser() {
        return this.request('/api/auth/me');
    }
    // Tasks
    async getTasks(filters) {
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);
        if (filters?.priority) params.append('priority', filters.priority);
        if (filters?.projectId) params.append('projectId', filters.projectId);
        const queryString = params.toString();
        const endpoint = `/api/tasks${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }
    async getTask(id) {
        return this.request(`/api/tasks/${id}`);
    }
    async createTask(taskData) {
        return this.request('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    }
    async updateTask(id, updates) {
        return this.request(`/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }
    async deleteTask(id) {
        return this.request(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
    }
    // Projects
    async getProjects() {
        return this.request('/api/projects');
    }
    async getProject(id) {
        return this.request(`/api/projects/${id}`);
    }
    async createProject(projectData) {
        return this.request('/api/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }
    async updateProject(id, updates) {
        return this.request(`/api/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }
    async deleteProject(id) {
        return this.request(`/api/projects/${id}`, {
            method: 'DELETE'
        });
    }
    // Calendar Events
    async getCalendarEvents(startDate, endDate) {
        const params = new URLSearchParams();
        if (startDate) params.append('start', startDate);
        if (endDate) params.append('end', endDate);
        const queryString = params.toString();
        const endpoint = `/api/calendar/events${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }
    async createCalendarEvent(eventData) {
        return this.request('/api/calendar/events', {
            method: 'POST',
            body: JSON.stringify(eventData)
        });
    }
    // Time Tracking
    async getTimeLogs(taskId, startDate, endDate) {
        const params = new URLSearchParams();
        if (taskId) params.append('taskId', taskId);
        if (startDate) params.append('start', startDate);
        if (endDate) params.append('end', endDate);
        const queryString = params.toString();
        const endpoint = `/api/time-tracking/logs${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }
    async startTimeTracking(taskId, notes) {
        return this.request('/api/time-tracking/start', {
            method: 'POST',
            body: JSON.stringify({
                taskId,
                notes
            })
        });
    }
    async stopTimeTracking(notes) {
        return this.request('/api/time-tracking/stop', {
            method: 'POST',
            body: JSON.stringify({
                notes
            })
        });
    }
    async getActiveTimer() {
        return this.request('/api/time-tracking/active');
    }
    // Notifications
    async getNotifications(unreadOnly, limit) {
        const params = new URLSearchParams();
        if (unreadOnly) params.append('unread', 'true');
        if (limit) params.append('limit', limit.toString());
        const queryString = params.toString();
        const endpoint = `/api/notifications${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }
    async markNotificationAsRead(id) {
        return this.request(`/api/notifications/${id}/read`, {
            method: 'PUT'
        });
    }
    async markAllNotificationsAsRead() {
        return this.request('/api/notifications/read-all', {
            method: 'PUT'
        });
    }
    async deleteNotification(id) {
        return this.request(`/api/notifications/${id}`, {
            method: 'DELETE'
        });
    }
    // User Profile Management
    async getUserProfile() {
        return this.request('/api/users/profile');
    }
    async updateUserProfile(profileData) {
        return this.request('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    }
    async changePassword(passwordData) {
        return this.request('/api/users/password', {
            method: 'PUT',
            body: JSON.stringify(passwordData)
        });
    }
}
// Create and export API client instance
// Use production API URL for deployed version
const finalApiUrl = "undefined" !== 'undefined' && window.location.hostname.includes('pages.dev') ? "TURBOPACK unreachable" : API_BASE_URL;
const api = new ApiClient(finalApiUrl);
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const isAuthenticated = !!user;
    // Check for existing authentication on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            try {
                // Check if there's a valid token
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].hasValidToken()) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getCurrentUser();
                if (response.data) {
                    setUser(response.data);
                } else {
                    // Clear user state if authentication fails
                    setUser(null);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].clearToken();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Clear user state and token on error
                setUser(null);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].clearToken();
            } finally{
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);
    const login = async (email, password)=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].login(email, password);
            if (response.data) {
                setUser(response.data.user);
                return {
                    data: response.data
                };
            }
            return response;
        } catch (error) {
            return {
                error: 'Login failed'
            };
        } finally{
            setIsLoading(false);
        }
    };
    const register = async (email, password, name)=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].register(email, password, name);
            if (response.data) {
                // Auto-login after successful registration
                const loginResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].login(email, password);
                if (loginResponse.data) {
                    setUser(loginResponse.data.user);
                    return {
                        data: loginResponse.data
                    };
                }
            }
            return response;
        } catch (error) {
            return {
                error: 'Registration failed'
            };
        } finally{
            setIsLoading(false);
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].clearToken();
        setUser(null);
    };
    const refreshUser = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getCurrentUser();
            if (response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Failed to refresh user:', error);
        }
    };
    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/src/contexts/ProjectsContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectsProvider",
    ()=>ProjectsProvider,
    "useProjects",
    ()=>useProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const ProjectsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ProjectsProvider({ children }) {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const storageKey = user ? `projects_${user.id}` : null;
    // One-time migration: remove the old unscoped 'projects' key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.removeItem('projects');
    }, []);
    // Load projects from localStorage when the user changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!storageKey) {
            setProjects([]);
            return;
        }
        const savedProjects = localStorage.getItem(storageKey);
        if (savedProjects) {
            try {
                const parsed = JSON.parse(savedProjects);
                const projectsWithDates = parsed.map((p)=>({
                        ...p,
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt)
                    }));
                setProjects(projectsWithDates);
            } catch (error) {
                console.error('Error loading projects:', error);
                setProjects([]);
            }
        } else {
            setProjects([]);
        }
    }, [
        storageKey
    ]);
    // Save projects to localStorage whenever they change (only when logged in)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!storageKey) return;
        localStorage.setItem(storageKey, JSON.stringify(projects));
    }, [
        projects,
        storageKey
    ]);
    const addProject = (projectData)=>{
        const newProject = {
            ...projectData,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
            tasks: 0,
            members: 1,
            isStarred: false,
            language: projectData.type === 'developer' ? projectData.techStack || 'Code' : 'Campaign'
        };
        setProjects((prev)=>[
                newProject,
                ...prev
            ]);
    };
    const updateProject = (id, updates)=>{
        setProjects((prev)=>prev.map((project)=>project.id === id ? {
                    ...project,
                    ...updates,
                    updatedAt: new Date()
                } : project));
    };
    const deleteProject = (id)=>{
        setProjects((prev)=>prev.filter((project)=>project.id !== id));
    };
    const toggleStar = (id)=>{
        setProjects((prev)=>prev.map((project)=>project.id === id ? {
                    ...project,
                    isStarred: !project.isStarred,
                    updatedAt: new Date()
                } : project));
    };
    const getProjectsByType = (type)=>{
        return projects.filter((project)=>project.type === type);
    };
    const getProjectsByStatus = (status)=>{
        return projects.filter((project)=>project.status === status);
    };
    const getStarredProjects = ()=>{
        return projects.filter((project)=>project.isStarred);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProjectsContext.Provider, {
        value: {
            projects,
            addProject,
            updateProject,
            deleteProject,
            toggleStar,
            getProjectsByType,
            getProjectsByStatus,
            getStarredProjects
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ProjectsContext.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
function useProjects() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ProjectsContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
}
}),
"[project]/src/contexts/TasksContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TasksProvider",
    ()=>TasksProvider,
    "useTasks",
    ()=>useTasks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const TasksContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function TasksProvider({ children }) {
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchTasks = async (filters)=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getTasks(filters);
            if (response.data) {
                setTasks(response.data.tasks);
            } else {
                setError(response.error || 'Failed to fetch tasks');
            }
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally{
            setIsLoading(false);
        }
    };
    const fetchProjects = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getProjects();
            if (response.data) {
                setProjects(response.data.projects);
            } else {
                setError(response.error || 'Failed to fetch projects');
            }
        } catch (err) {
            setError('Failed to fetch projects');
        } finally{
            setIsLoading(false);
        }
    };
    const createTask = async (taskData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].createTask(taskData);
            if (response.data) {
                // Refresh tasks list
                await fetchTasks();
            }
            return response;
        } catch (err) {
            return {
                error: 'Failed to create task'
            };
        }
    };
    const updateTask = async (id, updates)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].updateTask(id, updates);
            if (response.data) {
                // Update local state
                setTasks((prev)=>prev.map((task)=>task.id === id ? {
                            ...task,
                            ...updates
                        } : task));
            }
            return response;
        } catch (err) {
            return {
                error: 'Failed to update task'
            };
        }
    };
    const deleteTask = async (id)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].deleteTask(id);
            if (response.data) {
                // Remove from local state
                setTasks((prev)=>prev.filter((task)=>task.id !== id));
            }
            return response;
        } catch (err) {
            return {
                error: 'Failed to delete task'
            };
        }
    };
    const createProject = async (projectData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].createProject(projectData);
            if (response.data) {
                // Refresh projects list
                await fetchProjects();
            }
            return response;
        } catch (err) {
            return {
                error: 'Failed to create project'
            };
        }
    };
    const updateProject = async (id, updates)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].updateProject(id, updates);
            if (response.data) {
                // Update local state
                setProjects((prev)=>prev.map((project)=>project.id === id ? {
                            ...project,
                            ...updates
                        } : project));
            }
            return response;
        } catch (err) {
            return {
                error: 'Failed to update project'
            };
        }
    };
    const deleteProject = async (id)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].deleteProject(id);
            if (response.data) {
                // Remove from local state
                setProjects((prev)=>prev.filter((project)=>project.id !== id));
                // Also remove tasks associated with this project
                setTasks((prev)=>prev.filter((task)=>task.projectId !== id));
            }
            return response;
        } catch (err) {
            return {
                error: 'Failed to delete project'
            };
        }
    };
    const refreshTasks = ()=>fetchTasks();
    const refreshProjects = ()=>fetchProjects();
    // Load initial data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchTasks();
        fetchProjects();
    }, []);
    const value = {
        tasks,
        projects,
        isLoading,
        error,
        fetchTasks,
        fetchProjects,
        createTask,
        updateTask,
        deleteTask,
        createProject,
        updateProject,
        deleteProject,
        refreshTasks,
        refreshProjects
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TasksContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/TasksContext.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
function useTasks() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TasksContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
}
}),
"[project]/src/contexts/CalendarContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalendarProvider",
    ()=>CalendarProvider,
    "useCalendar",
    ()=>useCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/TasksContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ProjectsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ProjectsContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const CalendarContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CalendarProvider({ children }) {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const { tasks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTasks"])();
    const { projects } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ProjectsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjects"])();
    // Load events from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedEvents = localStorage.getItem('calendar-events');
        if (savedEvents) {
            try {
                const parsedEvents = JSON.parse(savedEvents).map((event)=>({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('calendar-events', JSON.stringify(events));
    }, [
        events
    ]);
    // Sync tasks to calendar events
    const syncTasksToCalendar = ()=>{
        const taskEvents = tasks.filter((task)=>task.dueDate).map((task)=>({
                id: `task-${task.id}`,
                title: task.title,
                date: new Date(task.dueDate),
                type: 'task',
                source: 'task',
                sourceId: task.id,
                description: task.description,
                priority: task.priority,
                status: task.status,
                projectName: task.projectName,
                taskType: task.taskType,
                isAllDay: false
            }));
        // Remove existing task events and add new ones
        setEvents((prevEvents)=>{
            const nonTaskEvents = prevEvents.filter((event)=>event.source !== 'task');
            return [
                ...nonTaskEvents,
                ...taskEvents
            ];
        });
    };
    // Sync projects to calendar events
    const syncProjectsToCalendar = ()=>{
        const projectEvents = projects.filter((project)=>project.startDate || project.endDate).flatMap((project)=>{
            const events = [];
            if (project.startDate) {
                events.push({
                    id: `project-start-${project.id}`,
                    title: `Start: ${project.name}`,
                    date: new Date(project.startDate),
                    type: 'milestone',
                    source: 'project',
                    sourceId: project.id,
                    description: project.description,
                    projectType: project.type,
                    isAllDay: true
                });
            }
            if (project.endDate) {
                events.push({
                    id: `project-end-${project.id}`,
                    title: `End: ${project.name}`,
                    date: new Date(project.endDate),
                    type: 'deadline',
                    source: 'project',
                    sourceId: project.id,
                    description: project.description,
                    projectType: project.type,
                    isAllDay: true
                });
            }
            return events;
        });
        // Remove existing project events and add new ones
        setEvents((prevEvents)=>{
            const nonProjectEvents = prevEvents.filter((event)=>event.source !== 'project');
            return [
                ...nonProjectEvents,
                ...projectEvents
            ];
        });
    };
    // Sync all data to calendar
    const syncAllToCalendar = ()=>{
        syncTasksToCalendar();
        syncProjectsToCalendar();
    };
    // Auto-sync when tasks or projects change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        syncAllToCalendar();
    }, [
        tasks,
        projects
    ]);
    // Add a new event
    const addEvent = (eventData)=>{
        const newEvent = {
            ...eventData,
            id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        setEvents((prevEvents)=>[
                ...prevEvents,
                newEvent
            ]);
    };
    // Update an existing event
    const updateEvent = (id, updates)=>{
        setEvents((prevEvents)=>prevEvents.map((event)=>event.id === id ? {
                    ...event,
                    ...updates
                } : event));
    };
    // Delete an event
    const deleteEvent = (id)=>{
        setEvents((prevEvents)=>prevEvents.filter((event)=>event.id !== id));
    };
    // Get events for a specific date
    const getEventsForDate = (date)=>{
        return events.filter((event)=>{
            const eventDate = event.date;
            return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
        });
    };
    // Get events for a specific month
    const getEventsForMonth = (date)=>{
        return events.filter((event)=>{
            const eventDate = event.date;
            return eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
        });
    };
    // Get upcoming events
    const getUpcomingEvents = (limit = 10)=>{
        const now = new Date();
        return events.filter((event)=>event.date >= now).sort((a, b)=>a.date.getTime() - b.date.getTime()).slice(0, limit);
    };
    const value = {
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventsForDate,
        getEventsForMonth,
        getUpcomingEvents,
        syncTasksToCalendar,
        syncProjectsToCalendar,
        syncAllToCalendar
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/CalendarContext.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
function useCalendar() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}
}),
"[project]/src/contexts/TaskProjectContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskProjectProvider",
    ()=>TaskProjectProvider,
    "useTaskProject",
    ()=>useTaskProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/TasksContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CalendarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CalendarContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const TaskProjectContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function TaskProjectProvider({ children }) {
    const { tasks, projects, createTask, updateTask, deleteTask, createProject, updateProject, deleteProject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTasks"])();
    const { syncAllToCalendar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CalendarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCalendar"])();
    // Calculate project progress based on completed tasks
    const calculateProjectProgress = (projectId)=>{
        const projectTasks = tasks.filter((task)=>task.projectId === projectId);
        if (projectTasks.length === 0) return 0;
        const completedTasks = projectTasks.filter((task)=>task.status === 'completed');
        return Math.round(completedTasks.length / projectTasks.length * 100);
    };
    // Get task counts for a project
    const getProjectTaskCounts = (projectId)=>{
        const projectTasks = tasks.filter((task)=>task.projectId === projectId);
        return {
            total: projectTasks.length,
            completed: projectTasks.filter((task)=>task.status === 'completed').length,
            inProgress: projectTasks.filter((task)=>task.status === 'in-progress').length,
            todo: projectTasks.filter((task)=>task.status === 'todo').length
        };
    };
    // Sync all project progress
    const syncAllProjectProgress = ()=>{
        projects.forEach((project)=>{
            const newProgress = calculateProjectProgress(project.id);
            const taskCounts = getProjectTaskCounts(project.id);
            if (project.progress !== newProgress || project.tasks !== taskCounts.total) {
                updateProject(project.id, {
                    progress: newProgress,
                    tasks: taskCounts.total
                });
            }
        });
    };
    // Add task and update project progress
    const addTaskWithProjectSync = async (taskData)=>{
        // Parse tags from comma-separated string if provided
        const tags = typeof taskData.tags === 'string' ? taskData.tags.split(',').map((tag)=>tag.trim()).filter((tag)=>tag) : taskData.tags || [];
        const taskWithTags = {
            ...taskData,
            tags
        };
        // Create the task
        await createTask(taskWithTags);
        // Update project progress if task is associated with a project
        if (taskData.projectId) {
            setTimeout(()=>{
                const newProgress = calculateProjectProgress(taskData.projectId);
                const taskCounts = getProjectTaskCounts(taskData.projectId);
                updateProject(taskData.projectId, {
                    progress: newProgress,
                    tasks: taskCounts.total
                });
                // Sync with calendar
                syncAllToCalendar();
            }, 100); // Small delay to ensure task is added first
        } else {
            // Sync with calendar even if no project
            setTimeout(()=>{
                syncAllToCalendar();
            }, 100);
        }
    };
    // Update task and sync project progress
    const updateTaskWithProjectSync = async (id, updates)=>{
        const currentTask = tasks.find((task)=>task.id === id);
        if (!currentTask) return;
        // Update the task
        await updateTask(id, updates);
        // Update project progress for both old and new project
        const projectsToUpdate = new Set();
        if (currentTask.projectId) {
            projectsToUpdate.add(currentTask.projectId);
        }
        if (updates.projectId) {
            projectsToUpdate.add(updates.projectId);
        }
        // Update progress for all affected projects
        setTimeout(()=>{
            projectsToUpdate.forEach((projectId)=>{
                const newProgress = calculateProjectProgress(projectId);
                const taskCounts = getProjectTaskCounts(projectId);
                updateProject(projectId, {
                    progress: newProgress,
                    tasks: taskCounts.total
                });
            });
            // Sync with calendar
            syncAllToCalendar();
        }, 100);
    };
    // Toggle task status and update project progress
    const toggleTaskStatusWithProjectSync = async (id)=>{
        const currentTask = tasks.find((task)=>task.id === id);
        if (!currentTask) return;
        // Determine new status based on current status
        let newStatus;
        switch(currentTask.status){
            case 'todo':
                newStatus = 'in-progress';
                break;
            case 'in-progress':
                newStatus = 'completed';
                break;
            case 'completed':
                newStatus = 'todo';
                break;
            default:
                newStatus = 'todo';
        }
        // Update the task status
        await updateTask(id, {
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
        });
        // Update project progress if task is associated with a project
        if (currentTask.projectId) {
            setTimeout(()=>{
                const newProgress = calculateProjectProgress(currentTask.projectId);
                const taskCounts = getProjectTaskCounts(currentTask.projectId);
                updateProject(currentTask.projectId, {
                    progress: newProgress,
                    tasks: taskCounts.total
                });
                // Sync with calendar
                syncAllToCalendar();
            }, 100);
        } else {
            // Sync with calendar even if no project
            setTimeout(()=>{
                syncAllToCalendar();
            }, 100);
        }
    };
    // Delete task and update project progress
    const deleteTaskWithProjectSync = async (id)=>{
        const currentTask = tasks.find((task)=>task.id === id);
        if (!currentTask) return;
        // Delete the task
        await deleteTask(id);
        // Update project progress if task was associated with a project
        if (currentTask.projectId) {
            setTimeout(()=>{
                const newProgress = calculateProjectProgress(currentTask.projectId);
                const taskCounts = getProjectTaskCounts(currentTask.projectId);
                updateProject(currentTask.projectId, {
                    progress: newProgress,
                    tasks: taskCounts.total
                });
                // Sync with calendar
                syncAllToCalendar();
            }, 100);
        } else {
            // Sync with calendar even if no project
            setTimeout(()=>{
                syncAllToCalendar();
            }, 100);
        }
    };
    // Add project with task sync
    const addProjectWithTaskSync = async (projectData)=>{
        await createProject(projectData);
        // Sync with calendar
        setTimeout(()=>{
            syncAllToCalendar();
        }, 100);
    };
    // Update project with task sync
    const updateProjectWithTaskSync = async (id, updates)=>{
        await updateProject(id, updates);
        // Sync with calendar
        setTimeout(()=>{
            syncAllToCalendar();
        }, 100);
    };
    // Delete project with task sync
    const deleteProjectWithTaskSync = async (id)=>{
        // First, unlink all tasks from this project
        const projectTasks = tasks.filter((task)=>task.projectId === id);
        for (const task of projectTasks){
            await updateTask(task.id, {
                projectId: undefined,
                projectName: undefined
            });
        }
        // Then delete the project
        await deleteProject(id);
        // Sync with calendar
        setTimeout(()=>{
            syncAllToCalendar();
        }, 100);
    };
    const value = {
        addTaskWithProjectSync,
        updateTaskWithProjectSync,
        toggleTaskStatusWithProjectSync,
        deleteTaskWithProjectSync,
        addProjectWithTaskSync,
        updateProjectWithTaskSync,
        deleteProjectWithTaskSync,
        calculateProjectProgress,
        getProjectTaskCounts,
        syncAllProjectProgress
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskProjectContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/TaskProjectContext.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
function useTaskProject() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TaskProjectContext);
    if (context === undefined) {
        throw new Error('useTaskProject must be used within a TaskProjectProvider');
    }
    return context;
}
}),
"[project]/src/components/notifications/ToastNotification.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function ToastNotification({ notification, onClose, duration = 5000 }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExiting, setIsExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Animate in
        const timer = setTimeout(()=>setIsVisible(true), 100);
        // Auto close after duration
        const autoCloseTimer = setTimeout(()=>{
            handleClose();
        }, duration);
        return ()=>{
            clearTimeout(timer);
            clearTimeout(autoCloseTimer);
        };
    }, [
        duration
    ]);
    const handleClose = ()=>{
        setIsExiting(true);
        setTimeout(()=>{
            onClose();
        }, 300); // Match CSS transition duration
    };
    const getNotificationStyles = ()=>{
        const baseStyles = {
            background: 'var(--color-canvas-default)',
            border: '1px solid var(--color-border-default)',
            boxShadow: '0 4px 12px var(--color-shadow)'
        };
        switch(notification.type){
            case 'success':
                return {
                    ...baseStyles,
                    borderLeft: '4px solid var(--color-success-fg)'
                };
            case 'error':
                return {
                    ...baseStyles,
                    borderLeft: '4px solid var(--color-danger-fg)'
                };
            case 'warning':
                return {
                    ...baseStyles,
                    borderLeft: '4px solid #f59e0b'
                };
            case 'deadline':
                return {
                    ...baseStyles,
                    borderLeft: '4px solid var(--color-danger-fg)'
                };
            case 'task':
            case 'project':
                return {
                    ...baseStyles,
                    borderLeft: '4px solid var(--color-accent-fg)'
                };
            default:
                return {
                    ...baseStyles,
                    borderLeft: '4px solid var(--color-fg-muted)'
                };
        }
    };
    const getNotificationIcon = ()=>{
        switch(notification.type){
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-success-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this);
            case 'error':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-danger-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this);
            case 'warning':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: '#f59e0b'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this);
            case 'task':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-accent-fg)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this);
            case 'project':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-accent-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this);
            case 'deadline':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-danger-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 120,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-fg-muted)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 126,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-4 right-4 w-80 p-4 rounded-lg z-50 transition-all duration-300 ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`,
        style: getNotificationStyles(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 mt-0.5",
                        children: getNotificationIcon()
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold mb-1",
                                style: {
                                    color: 'var(--color-fg-default)'
                                },
                                children: notification.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mb-3",
                                style: {
                                    color: 'var(--color-fg-muted)'
                                },
                                children: notification.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            notification.action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    notification.action?.onClick();
                                    handleClose();
                                },
                                className: "text-xs px-3 py-1 rounded transition-colors",
                                style: {
                                    color: 'var(--color-accent-fg)',
                                    background: 'rgba(31, 111, 235, 0.1)'
                                },
                                children: notification.action.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "flex-shrink-0 p-1 rounded hover:bg-opacity-10 transition-colors",
                        style: {
                            color: 'var(--color-fg-muted)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "currentColor",
                            viewBox: "0 0 16 16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 h-1 bg-opacity-20 rounded-b-lg",
                style: {
                    background: 'var(--color-fg-muted)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full transition-all ease-linear",
                    style: {
                        background: 'var(--color-accent-fg)',
                        width: isExiting ? '0%' : '100%',
                        transitionDuration: `${duration}ms`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/notifications/ToastContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/NotificationsContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$ToastNotification$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/notifications/ToastNotification.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ToastContainer() {
    const { notifications, removeNotification } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotifications"])();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Show toast for new notifications
        const latestNotification = notifications[0];
        if (latestNotification && !latestNotification.read) {
            // Check if toast already exists for this notification
            const toastExists = toasts.some((toast)=>toast.id === latestNotification.id);
            if (!toastExists) {
                setToasts((prev)=>[
                        {
                            id: latestNotification.id,
                            notification: latestNotification
                        },
                        ...prev.slice(0, 2) // Limit to 3 toasts max
                    ]);
            }
        }
    }, [
        notifications,
        toasts
    ]);
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
        // Also remove from notifications context
        removeNotification(id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 space-y-2",
        children: toasts.map((toast, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    transform: `translateY(${index * 8}px)`,
                    zIndex: 1000 - index
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$ToastNotification$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    notification: toast.notification,
                    onClose: ()=>removeToast(toast.id),
                    duration: toast.notification.priority === 'urgent' ? 8000 : 5000
                }, void 0, false, {
                    fileName: "[project]/src/components/notifications/ToastContainer.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this)
            }, toast.id, false, {
                fileName: "[project]/src/components/notifications/ToastContainer.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/notifications/ToastContainer.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c9fd11bb._.js.map