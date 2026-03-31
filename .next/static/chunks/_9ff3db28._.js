(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider(param) {
    let { children } = param;
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('system');
    const [density, setDensity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('comfortable');
    const [resolvedTheme, setResolvedTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    // Load saved preferences from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const savedTheme = localStorage.getItem('theme');
            const savedDensity = localStorage.getItem('density');
            if (savedTheme) setTheme(savedTheme);
            if (savedDensity) setDensity(savedDensity);
        }
    }["ThemeProvider.useEffect"], []);
    // Resolve theme based on system preference
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const resolveTheme = {
                "ThemeProvider.useEffect.resolveTheme": ()=>{
                    if (theme === 'system') {
                        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
                    } else {
                        setResolvedTheme(theme);
                    }
                }
            }["ThemeProvider.useEffect.resolveTheme"];
            resolveTheme();
            // Listen for system theme changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = {
                "ThemeProvider.useEffect.handleChange": ()=>{
                    if (theme === 'system') {
                        resolveTheme();
                    }
                }
            }["ThemeProvider.useEffect.handleChange"];
            mediaQuery.addEventListener('change', handleChange);
            return ({
                "ThemeProvider.useEffect": ()=>mediaQuery.removeEventListener('change', handleChange)
            })["ThemeProvider.useEffect"];
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    // Apply theme to document
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = document.documentElement;
            // Remove existing theme classes
            root.classList.remove('light', 'dark');
            // Add new theme class
            root.classList.add(resolvedTheme);
            // Set data attribute for CSS targeting
            root.setAttribute('data-theme', resolvedTheme);
        }
    }["ThemeProvider.useEffect"], [
        resolvedTheme
    ]);
    // Apply density to document
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = document.documentElement;
            // Remove existing density classes
            root.classList.remove('comfortable', 'compact', 'spacious');
            // Add new density class
            root.classList.add(density);
            // Set data attribute for CSS targeting
            root.setAttribute('data-density', density);
        }
    }["ThemeProvider.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
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
_s(ThemeProvider, "LBpYjTV3MWEZUmw7CtG0T/wSKS0=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/NotificationsContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationsProvider",
    ()=>NotificationsProvider,
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const NotificationsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function NotificationsProvider(param) {
    let { children } = param;
    _s();
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load notifications from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationsProvider.useEffect": ()=>{
            const savedNotifications = localStorage.getItem('notifications');
            if (savedNotifications) {
                try {
                    const parsed = JSON.parse(savedNotifications);
                    // Convert date strings back to Date objects
                    const notificationsWithDates = parsed.map({
                        "NotificationsProvider.useEffect.notificationsWithDates": (n)=>({
                                ...n,
                                createdAt: new Date(n.createdAt),
                                expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined
                            })
                    }["NotificationsProvider.useEffect.notificationsWithDates"]);
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
                            onClick: {
                                "NotificationsProvider.useEffect": ()=>console.log('Navigate to task')
                            }["NotificationsProvider.useEffect"]
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
                            onClick: {
                                "NotificationsProvider.useEffect": ()=>console.log('Navigate to project')
                            }["NotificationsProvider.useEffect"]
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
                            onClick: {
                                "NotificationsProvider.useEffect": ()=>console.log('Start system update')
                            }["NotificationsProvider.useEffect"]
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
        }
    }["NotificationsProvider.useEffect"], []);
    // Save notifications to localStorage whenever they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationsProvider.useEffect": ()=>{
            localStorage.setItem('notifications', JSON.stringify(notifications));
        }
    }["NotificationsProvider.useEffect"], [
        notifications
    ]);
    // Auto-remove expired notifications
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationsProvider.useEffect": ()=>{
            const interval = setInterval({
                "NotificationsProvider.useEffect.interval": ()=>{
                    setNotifications({
                        "NotificationsProvider.useEffect.interval": (prev)=>prev.filter({
                                "NotificationsProvider.useEffect.interval": (notification)=>!notification.expiresAt || notification.expiresAt > new Date()
                            }["NotificationsProvider.useEffect.interval"])
                    }["NotificationsProvider.useEffect.interval"]);
                }
            }["NotificationsProvider.useEffect.interval"], 60000); // Check every minute
            return ({
                "NotificationsProvider.useEffect": ()=>clearInterval(interval)
            })["NotificationsProvider.useEffect"];
        }
    }["NotificationsProvider.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationsContext.Provider, {
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
_s(NotificationsProvider, "LEgdqg2gpVFr4gq8EBhcPrvf/EE=");
_c = NotificationsProvider;
function useNotifications() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(NotificationsContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
}
_s1(useNotifications, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "NotificationsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/ProjectsContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectsProvider",
    ()=>ProjectsProvider,
    "useProjects",
    ()=>useProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ProjectsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ProjectsProvider(param) {
    let { children } = param;
    _s();
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load projects from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectsProvider.useEffect": ()=>{
            const savedProjects = localStorage.getItem('projects');
            if (savedProjects) {
                try {
                    const parsed = JSON.parse(savedProjects);
                    // Convert date strings back to Date objects
                    const projectsWithDates = parsed.map({
                        "ProjectsProvider.useEffect.projectsWithDates": (p)=>({
                                ...p,
                                createdAt: new Date(p.createdAt),
                                updatedAt: new Date(p.updatedAt)
                            })
                    }["ProjectsProvider.useEffect.projectsWithDates"]);
                    setProjects(projectsWithDates);
                } catch (error) {
                    console.error('Error loading projects:', error);
                }
            } else {
                // Initialize with some sample projects
                const sampleProjects = [
                    {
                        id: '1',
                        name: 'Task-Lab Development',
                        description: 'Building the next-gen productivity platform with modern web technologies',
                        type: 'developer',
                        status: 'active',
                        progress: 65,
                        startDate: '2024-01-15',
                        endDate: '2024-06-30',
                        repositoryLink: 'https://github.com/username/productivity-hub',
                        techStack: 'React, Next.js, TypeScript, Tailwind CSS',
                        versionControl: 'github',
                        tasks: 24,
                        members: 5,
                        isStarred: true,
                        language: 'TypeScript',
                        createdAt: new Date('2024-01-15'),
                        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
                    },
                    {
                        id: '2',
                        name: 'Marketing Campaign Q4',
                        description: 'Q4 marketing initiatives and content calendar for product launch',
                        type: 'marketing',
                        status: 'active',
                        progress: 40,
                        startDate: '2024-10-01',
                        endDate: '2024-12-31',
                        campaignGoal: 'Increase brand awareness by 50% and generate 1000 qualified leads',
                        budget: '25000',
                        channels: 'Social media, Email marketing, SEO, Paid ads',
                        targetAudience: 'B2B SaaS companies, Developers, Product managers',
                        tasks: 18,
                        members: 3,
                        isStarred: false,
                        language: 'Campaign',
                        createdAt: new Date('2024-10-01'),
                        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    },
                    {
                        id: '3',
                        name: 'Mobile App Design',
                        description: 'iOS and Android app design system and user interface development',
                        type: 'developer',
                        status: 'on-hold',
                        progress: 25,
                        startDate: '2024-02-01',
                        endDate: '2024-08-31',
                        repositoryLink: 'https://github.com/username/mobile-app',
                        techStack: 'React Native, TypeScript, Expo',
                        versionControl: 'github',
                        tasks: 12,
                        members: 4,
                        isStarred: false,
                        language: 'React Native',
                        createdAt: new Date('2024-02-01'),
                        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
                    },
                    {
                        id: '4',
                        name: 'Brand Identity Refresh',
                        description: 'Complete brand identity overhaul including logo, colors, and guidelines',
                        type: 'marketing',
                        status: 'completed',
                        progress: 100,
                        startDate: '2024-08-01',
                        endDate: '2024-09-30',
                        campaignGoal: 'Establish new brand identity and guidelines',
                        budget: '15000',
                        channels: 'Design, Brand guidelines, Marketing materials',
                        targetAudience: 'All stakeholders, Marketing team, Design team',
                        tasks: 8,
                        members: 2,
                        isStarred: true,
                        language: 'Design',
                        createdAt: new Date('2024-08-01'),
                        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    },
                    {
                        id: '5',
                        name: 'API Documentation Portal',
                        description: 'Comprehensive API documentation and developer portal',
                        type: 'developer',
                        status: 'planning',
                        progress: 10,
                        startDate: '2024-12-01',
                        endDate: '2025-02-28',
                        repositoryLink: 'https://github.com/username/api-docs',
                        techStack: 'Next.js, TypeScript, OpenAPI, Swagger',
                        versionControl: 'github',
                        tasks: 6,
                        members: 3,
                        isStarred: false,
                        language: 'TypeScript',
                        createdAt: new Date('2024-11-15'),
                        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
                    }
                ];
                setProjects(sampleProjects);
            }
        }
    }["ProjectsProvider.useEffect"], []);
    // Save projects to localStorage whenever they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectsProvider.useEffect": ()=>{
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }["ProjectsProvider.useEffect"], [
        projects
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProjectsContext.Provider, {
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
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_s(ProjectsProvider, "3M5j6m/FqL/nu4amyBThuH6IETQ=");
_c = ProjectsProvider;
function useProjects() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ProjectsContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
}
_s1(useProjects, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ProjectsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration
__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'https://productivity-system-api.aeroermark.workers.dev';
// Force the correct API URL for production
const PRODUCTION_API_URL = 'https://productivity-system-api.aeroermark.workers.dev';
// Debug: Log the API URL to help with troubleshooting
if ("TURBOPACK compile-time truthy", 1) {
    console.log('API Base URL:', API_BASE_URL);
}
// API Client Class
class ApiClient {
    loadToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            this.token = localStorage.getItem('auth_token');
        }
    }
    setToken(token) {
        this.token = token;
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('auth_token', token);
        }
    }
    clearToken() {
        this.token = null;
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('auth_token');
        }
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
    async request(endpoint) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const url = "".concat(this.baseUrl).concat(endpoint);
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        if (this.token) {
            headers.Authorization = "Bearer ".concat(this.token);
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
        var _response_data;
        const response = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });
        if ((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.token) {
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
        if (filters === null || filters === void 0 ? void 0 : filters.status) params.append('status', filters.status);
        if (filters === null || filters === void 0 ? void 0 : filters.priority) params.append('priority', filters.priority);
        if (filters === null || filters === void 0 ? void 0 : filters.projectId) params.append('projectId', filters.projectId);
        const queryString = params.toString();
        const endpoint = "/api/tasks".concat(queryString ? "?".concat(queryString) : '');
        return this.request(endpoint);
    }
    async getTask(id) {
        return this.request("/api/tasks/".concat(id));
    }
    async createTask(taskData) {
        return this.request('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    }
    async updateTask(id, updates) {
        return this.request("/api/tasks/".concat(id), {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }
    async deleteTask(id) {
        return this.request("/api/tasks/".concat(id), {
            method: 'DELETE'
        });
    }
    // Projects
    async getProjects() {
        return this.request('/api/projects');
    }
    async getProject(id) {
        return this.request("/api/projects/".concat(id));
    }
    async createProject(projectData) {
        return this.request('/api/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }
    async updateProject(id, updates) {
        return this.request("/api/projects/".concat(id), {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }
    async deleteProject(id) {
        return this.request("/api/projects/".concat(id), {
            method: 'DELETE'
        });
    }
    // Calendar Events
    async getCalendarEvents(startDate, endDate) {
        const params = new URLSearchParams();
        if (startDate) params.append('start', startDate);
        if (endDate) params.append('end', endDate);
        const queryString = params.toString();
        const endpoint = "/api/calendar/events".concat(queryString ? "?".concat(queryString) : '');
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
        const endpoint = "/api/time-tracking/logs".concat(queryString ? "?".concat(queryString) : '');
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
        const endpoint = "/api/notifications".concat(queryString ? "?".concat(queryString) : '');
        return this.request(endpoint);
    }
    async markNotificationAsRead(id) {
        return this.request("/api/notifications/".concat(id, "/read"), {
            method: 'PUT'
        });
    }
    async markAllNotificationsAsRead() {
        return this.request('/api/notifications/read-all', {
            method: 'PUT'
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
    constructor(baseUrl){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "baseUrl", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "token", null);
        this.baseUrl = baseUrl;
        this.loadToken();
    }
}
// Create and export API client instance
// Use production API URL for deployed version
const finalApiUrl = "object" !== 'undefined' && window.location.hostname.includes('pages.dev') ? PRODUCTION_API_URL : API_BASE_URL;
const api = new ApiClient(finalApiUrl);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/TasksContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TasksProvider",
    ()=>TasksProvider,
    "useTasks",
    ()=>useTasks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const TasksContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function TasksProvider(param) {
    let { children } = param;
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchTasks = async (filters)=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getTasks(filters);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getProjects();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].createTask(taskData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].updateTask(id, updates);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].deleteTask(id);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].createProject(projectData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].updateProject(id, updates);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].deleteProject(id);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TasksProvider.useEffect": ()=>{
            fetchTasks();
            fetchProjects();
        }
    }["TasksProvider.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TasksContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/TasksContext.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(TasksProvider, "RSMQzeSvvlyFBWdOWqjO9Oo7pFE=");
_c = TasksProvider;
function useTasks() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TasksContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
}
_s1(useTasks, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TasksProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/CalendarContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalendarProvider",
    ()=>CalendarProvider,
    "useCalendar",
    ()=>useCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/TasksContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ProjectsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ProjectsContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const CalendarContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CalendarProvider(param) {
    let { children } = param;
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { tasks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTasks"])();
    const { projects } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ProjectsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjects"])();
    // Load events from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarProvider.useEffect": ()=>{
            const savedEvents = localStorage.getItem('calendar-events');
            if (savedEvents) {
                try {
                    const parsedEvents = JSON.parse(savedEvents).map({
                        "CalendarProvider.useEffect.parsedEvents": (event)=>({
                                ...event,
                                date: new Date(event.date)
                            })
                    }["CalendarProvider.useEffect.parsedEvents"]);
                    setEvents(parsedEvents);
                } catch (error) {
                    console.error('Error loading calendar events:', error);
                }
            }
        }
    }["CalendarProvider.useEffect"], []);
    // Save events to localStorage whenever events change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarProvider.useEffect": ()=>{
            localStorage.setItem('calendar-events', JSON.stringify(events));
        }
    }["CalendarProvider.useEffect"], [
        events
    ]);
    // Sync tasks to calendar events
    const syncTasksToCalendar = ()=>{
        const taskEvents = tasks.filter((task)=>task.dueDate).map((task)=>({
                id: "task-".concat(task.id),
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
                    id: "project-start-".concat(project.id),
                    title: "Start: ".concat(project.name),
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
                    id: "project-end-".concat(project.id),
                    title: "End: ".concat(project.name),
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarProvider.useEffect": ()=>{
            syncAllToCalendar();
        }
    }["CalendarProvider.useEffect"], [
        tasks,
        projects
    ]);
    // Add a new event
    const addEvent = (eventData)=>{
        const newEvent = {
            ...eventData,
            id: "manual-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9))
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
    const getUpcomingEvents = function() {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/CalendarContext.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_s(CalendarProvider, "R3kKAKQx5YqvrIdC0PxBAv0R3h0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTasks"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ProjectsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjects"]
    ];
});
_c = CalendarProvider;
function useCalendar() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}
_s1(useCalendar, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CalendarProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/TaskProjectContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskProjectProvider",
    ()=>TaskProjectProvider,
    "useTaskProject",
    ()=>useTaskProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/TasksContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CalendarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CalendarContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const TaskProjectContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function TaskProjectProvider(param) {
    let { children } = param;
    _s();
    const { tasks, projects, createTask, updateTask, deleteTask, createProject, updateProject, deleteProject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTasks"])();
    const { syncAllToCalendar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CalendarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCalendar"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskProjectContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/TaskProjectContext.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s(TaskProjectProvider, "mIkUhPLLou5DF87PbzWMMX0gyIY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TasksContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTasks"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CalendarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCalendar"]
    ];
});
_c = TaskProjectProvider;
function useTaskProject() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TaskProjectContext);
    if (context === undefined) {
        throw new Error('useTaskProject must be used within a TaskProjectProvider');
    }
    return context;
}
_s1(useTaskProject, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TaskProjectProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isAuthenticated = !!user;
    // Check for existing authentication on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const checkAuth = {
                "AuthProvider.useEffect.checkAuth": async ()=>{
                    try {
                        // Check if there's a valid token
                        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].hasValidToken()) {
                            setUser(null);
                            setIsLoading(false);
                            return;
                        }
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getCurrentUser();
                        if (response.data) {
                            setUser(response.data);
                        } else {
                            // Clear user state if authentication fails
                            setUser(null);
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].clearToken();
                        }
                    } catch (error) {
                        console.error('Auth check failed:', error);
                        // Clear user state and token on error
                        setUser(null);
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].clearToken();
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.checkAuth"];
            checkAuth();
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].login(email, password);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].register(email, password, name);
            if (response.data) {
                // Auto-login after successful registration
                const loginResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].login(email, password);
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
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].clearToken();
        setUser(null);
    };
    const refreshUser = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getCurrentUser();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/notifications/ToastNotification.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ToastNotification(param) {
    let { notification, onClose, duration = 5000 } = param;
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExiting, setIsExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToastNotification.useEffect": ()=>{
            // Animate in
            const timer = setTimeout({
                "ToastNotification.useEffect.timer": ()=>setIsVisible(true)
            }["ToastNotification.useEffect.timer"], 100);
            // Auto close after duration
            const autoCloseTimer = setTimeout({
                "ToastNotification.useEffect.autoCloseTimer": ()=>{
                    handleClose();
                }
            }["ToastNotification.useEffect.autoCloseTimer"], duration);
            return ({
                "ToastNotification.useEffect": ()=>{
                    clearTimeout(timer);
                    clearTimeout(autoCloseTimer);
                }
            })["ToastNotification.useEffect"];
        }
    }["ToastNotification.useEffect"], [
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-success-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-danger-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: '#f59e0b'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-accent-fg)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-accent-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-danger-fg)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    style: {
                        color: 'var(--color-fg-muted)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 w-80 p-4 rounded-lg z-50 transition-all duration-300 ".concat(isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'),
        style: getNotificationStyles(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 mt-0.5",
                        children: getNotificationIcon()
                    }, void 0, false, {
                        fileName: "[project]/src/components/notifications/ToastNotification.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            notification.action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    var _notification_action;
                                    (_notification_action = notification.action) === null || _notification_action === void 0 ? void 0 : _notification_action.onClick();
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "flex-shrink-0 p-1 rounded hover:bg-opacity-10 transition-colors",
                        style: {
                            color: 'var(--color-fg-muted)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "currentColor",
                            viewBox: "0 0 16 16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 h-1 bg-opacity-20 rounded-b-lg",
                style: {
                    background: 'var(--color-fg-muted)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full transition-all ease-linear",
                    style: {
                        background: 'var(--color-accent-fg)',
                        width: isExiting ? '0%' : '100%',
                        transitionDuration: "".concat(duration, "ms")
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
_s(ToastNotification, "2sW/9DKZ43VfksikBz74P9q1sKU=");
_c = ToastNotification;
var _c;
__turbopack_context__.k.register(_c, "ToastNotification");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/notifications/ToastContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/NotificationsContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$ToastNotification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/notifications/ToastNotification.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ToastContainer() {
    _s();
    const { notifications, removeNotification } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToastContainer.useEffect": ()=>{
            // Show toast for new notifications
            const latestNotification = notifications[0];
            if (latestNotification && !latestNotification.read) {
                // Check if toast already exists for this notification
                const toastExists = toasts.some({
                    "ToastContainer.useEffect.toastExists": (toast)=>toast.id === latestNotification.id
                }["ToastContainer.useEffect.toastExists"]);
                if (!toastExists) {
                    setToasts({
                        "ToastContainer.useEffect": (prev)=>[
                                {
                                    id: latestNotification.id,
                                    notification: latestNotification
                                },
                                ...prev.slice(0, 2) // Limit to 3 toasts max
                            ]
                    }["ToastContainer.useEffect"]);
                }
            }
        }
    }["ToastContainer.useEffect"], [
        notifications,
        toasts
    ]);
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
        // Also remove from notifications context
        removeNotification(id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 space-y-2",
        children: toasts.map((toast, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    transform: "translateY(".concat(index * 8, "px)"),
                    zIndex: 1000 - index
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$ToastNotification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(ToastContainer, "AR1lDoWtYs3bqh8CqwpcNph4Bbk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"]
    ];
});
_c = ToastContainer;
var _c;
__turbopack_context__.k.register(_c, "ToastContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
]);

//# sourceMappingURL=_9ff3db28._.js.map