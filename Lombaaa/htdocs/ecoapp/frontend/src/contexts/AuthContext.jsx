// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = authApi.getToken();
      const userData = localStorage.getItem('user');
      
      if (token && authApi.verifyToken(token) && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // Ensure user has balance property
          if (parsedUser.balance === undefined) {
            parsedUser.balance = 0;
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          // If there's an error, clear invalid data
          localStorage.removeItem('user');
          authApi.removeToken();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      authApi.setToken(response.token);
      
      // Ensure user data has balance property from database
      const userWithBalance = {
        ...response.user,
        balance: response.user.balance || 0
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userWithBalance));
      setUser(userWithBalance);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authApi.register({ name, email, password });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authApi.removeToken();
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUserBalance = async (newBalance) => {
    if (user) {
      // Simulate API call to update balance
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        balance: newBalance
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    }
    throw new Error('User not logged in');
  };

  const addToBalance = async (amount) => {
    if (user && amount > 0) {
      const newBalance = (user.balance || 0) + amount;
      return await updateUserBalance(newBalance);
    }
    throw new Error('Invalid amount or user not logged in');
  };

  const deductFromBalance = async (amount) => {
    if (user && amount > 0 && (user.balance || 0) >= amount) {
      const newBalance = (user.balance || 0) - amount;
      return await updateUserBalance(newBalance);
    }
    throw new Error('Insufficient balance or invalid amount');
  };

  const updateUserProfile = async (userData) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...userData
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    }
    throw new Error('User not logged in');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserBalance,
    addToBalance,
    deductFromBalance,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};