import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { TasksProvider } from "@/contexts/TasksContext";
import { TaskProjectProvider } from "@/contexts/TaskProjectContext";
import { CalendarProvider } from "@/contexts/CalendarContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ToastContainer from "@/components/notifications/ToastContainer";

export const metadata: Metadata = {
  title: "Task-Lab - Streamline Your Workflow",
  description: "A comprehensive productivity platform for managing tasks, projects, and time efficiently.",
  icons: {
    icon: [
      { url: '/TaskLab.png', sizes: '32x32', type: 'image/png' },
      { url: '/TaskLab.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/TaskLab.png',
    apple: '/TaskLab.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider>
            <NotificationsProvider>
              <ProjectsProvider>
                <TasksProvider>
                  <CalendarProvider>
                    <TaskProjectProvider>
                      {children}
                      <ToastContainer />
                    </TaskProjectProvider>
                  </CalendarProvider>
                </TasksProvider>
              </ProjectsProvider>
            </NotificationsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
