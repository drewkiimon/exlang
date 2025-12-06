import React, { createContext, useContext, useEffect, useState } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import exlangFetch from '@/utils/exlangFetch';

interface User {
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
// https://tanstack.com/router/latest/docs/framework/react/how-to/setup-authentication#quick-start
const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoading(false);
      return;
    }

    const response = await exlangFetch('/auth/validate-token', {
      method: 'POST',
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      setIsLoading(false);
      return;
    }
    // I really need to standardize this
    const { verified } = await response.json();

    setUser({
      uuid: verified.uuid,
      username: verified.username,
      email: verified.email,
      firstName: verified.firstName,
      lastName: verified.lastName,
    });
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Box w="320px">
          <Box mb={3}>
            <Skeleton h="36px" w="100%" borderRadius="md" />
          </Box>
          <Box mb={3}>
            <Skeleton h="20px" w="60%" borderRadius="md" />
          </Box>
          <Skeleton h="48px" w="100%" borderRadius="lg" />
        </Box>
      </Box>
    );
  }

  const login = async (username: string, password: string) => {
    const usernamePassword = `${username}:${password}`;
    const credentials = btoa(usernamePassword);

    const response = await exlangFetch('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({ credentials }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const { token, user: userData } = await response.json();

    setUser({
      uuid: userData.uuid,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
    setIsAuthenticated(true);

    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
