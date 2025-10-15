'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, User, ApiResponse } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<ApiResponse>;
  register: (email: string, password: string, name: string) => Promise<ApiResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if there's a valid token
        if (!api.hasValidToken()) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const response = await api.getCurrentUser();
        if (response.data) {
          setUser(response.data);
        } else {
          // Clear user state if authentication fails
          setUser(null);
          api.clearToken();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear user state and token on error
        setUser(null);
        api.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      const response = await api.login(email, password);
      if (response.data) {
        setUser(response.data.user);
        return { data: response.data };
      }
      return response;
    } catch (error) {
      return { error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      const response = await api.register(email, password, name);
      if (response.data) {
        // Auto-login after successful registration
        const loginResponse = await api.login(email, password);
        if (loginResponse.data) {
          setUser(loginResponse.data.user);
          return { data: loginResponse.data };
        }
      }
      return response;
    } catch (error) {
      return { error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await api.getCurrentUser();
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
