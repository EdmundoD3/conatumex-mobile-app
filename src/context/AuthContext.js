import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { DataExistsError } from '../error/typeErrors';
import { AdminUserStorage } from '../database/AdminUserStorage';
import errorHandler from '../error/errorHandler';
import initializeAuth from './helper/initializeAuth';
import UserData from './helper/userProviderDataModel';

const voidUserData = {
  user: null,
  username: null,
  token: {}
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(new UserData(voidUserData));
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    initializeAuth({setTheme,setIsLoading,setUserData});
  }, []);

  const patchUserData = (newData = {}) =>
    setUserData(prevData => new UserData({ ...prevData, ...newData }));

  const login = async ({ username, user, token, key, refreshToken }) => {
    setIsLoading(true);
    const userSessionIsNotComplete = !username || !user || !token || !key || !refreshToken;

    try {
      if (userSessionIsNotComplete) {
        throw new DataExistsError("La sesión no se pudo completar");
      }
      await AdminUserStorage.set({ username, user, token, key, refreshToken });
      patchUserData({ user, username, token });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AdminUserStorage.out();
      patchUserData(new UserData(voidUserData));
    } catch (error) {
      errorHandler(error);  
    } finally {
      setIsLoading(false);
    }
  };

  const updateTheme = (newTheme) => {
    if (!theme=="dark" && !theme=="white") return
    setTheme(newTheme);
    try {
      AdminUserStorage.setTheme(newTheme);
    } catch (error) {
      errorHandler(error); 
    }
  };

  const memoizedTheme = useMemo(() => theme, [theme]);

  return (
    <AuthContext.Provider value={{ userData, isLoading, login, logout, setTheme: updateTheme, theme: memoizedTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);