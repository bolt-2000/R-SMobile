import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
  subscription?: 'free' | 'premium' | 'creator';
  createdAt: string;
  lastLogin?: string;
  preferences?: {
    theme: 'dark' | 'light';
    notifications: boolean;
    autoDownload: boolean;
    quality: 'low' | 'medium' | 'high';
  };
  stats?: {
    episodesListened: number;
    hoursListened: number;
    podcastsCreated: number;
    followers: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage utilities for cross-platform compatibility
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    // For React Native, you would use AsyncStorage here
    // import AsyncStorage from '@react-native-async-storage/async-storage';
    // return await AsyncStorage.getItem(key);
    return null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    }
    // For React Native:
    // await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    }
    // For React Native:
    // await AsyncStorage.removeItem(key);
  },
};

// API configuration - Replace with your actual API endpoints
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.riseandspeak.com';
const API_ENDPOINTS = {
  signIn: `${API_BASE_URL}/auth/signin`,
  signUp: `${API_BASE_URL}/auth/signup`,
  signOut: `${API_BASE_URL}/auth/signout`,
  refreshToken: `${API_BASE_URL}/auth/refresh`,
  profile: `${API_BASE_URL}/user/profile`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
  deleteAccount: `${API_BASE_URL}/user/delete`,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check for stored authentication token
      const token = await storage.getItem('auth_token');
      const storedUser = await storage.getItem('user_data');
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          
          // Verify token with backend (in production)
          // const response = await fetch(API_ENDPOINTS.refreshToken, {
          //   method: 'POST',
          //   headers: {
          //     'Authorization': `Bearer ${token}`,
          //     'Content-Type': 'application/json',
          //   },
          // });
          
          // if (response.ok) {
          //   const refreshedUser = await response.json();
          //   setUser(refreshedUser);
          //   setIsAuthenticated(true);
          // } else {
          //   await signOut();
          // }
          
          // For demo purposes, use stored user data
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          await signOut();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Production API call
      // const response = await fetch(API_ENDPOINTS.signIn, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || 'Sign in failed');
      // }
      
      // const { user: userData, token } = await response.json();
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        isVerified: Math.random() > 0.5,
        subscription: ['free', 'premium', 'creator'][Math.floor(Math.random() * 3)] as any,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: 'dark',
          notifications: true,
          autoDownload: false,
          quality: 'high',
        },
        stats: {
          episodesListened: Math.floor(Math.random() * 500) + 50,
          hoursListened: Math.floor(Math.random() * 200) + 20,
          podcastsCreated: Math.floor(Math.random() * 20),
          followers: Math.floor(Math.random() * 10000) + 100,
        },
      };

      // Store authentication data
      await storage.setItem('auth_token', 'demo_token_' + Date.now());
      await storage.setItem('user_data', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Production API call
      // const response = await fetch(API_ENDPOINTS.signUp, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password, name }),
      // });
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email,
        name,
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        isVerified: false,
        subscription: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: 'dark',
          notifications: true,
          autoDownload: false,
          quality: 'medium',
        },
        stats: {
          episodesListened: 0,
          hoursListened: 0,
          podcastsCreated: 0,
          followers: 0,
        },
      };

      await storage.setItem('auth_token', 'demo_token_' + Date.now());
      await storage.setItem('user_data', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // Production API call
      // const token = await storage.getItem('auth_token');
      // if (token) {
      //   await fetch(API_ENDPOINTS.signOut, {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //     },
      //   });
      // }
      
      // Clear stored data
      await storage.removeItem('auth_token');
      await storage.removeItem('user_data');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Production API call
      // const token = await storage.getItem('auth_token');
      // const response = await fetch(API_ENDPOINTS.profile, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updates),
      // });
      
      const updatedUser = { ...user, ...updates };
      await storage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Production API call
      // await fetch(API_ENDPOINTS.resetPassword, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (!isAuthenticated) return;
    
    try {
      // Production API call to refresh user data
      // const token = await storage.getItem('auth_token');
      // const response = await fetch(API_ENDPOINTS.profile, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });
      
      // const userData = await response.json();
      // setUser(userData);
      // await storage.setItem('user_data', JSON.stringify(userData));
      
      console.log('User data refreshed');
    } catch (error) {
      console.error('User refresh error:', error);
    }
  };

  const deleteAccount = async () => {
    if (!user) return;
    
    try {
      // Production API call
      // const token = await storage.getItem('auth_token');
      // await fetch(API_ENDPOINTS.deleteAccount, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });
      
      await signOut();
    } catch (error) {
      console.error('Account deletion error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      updateProfile,
      resetPassword,
      refreshUser,
      deleteAccount,
    }}>
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