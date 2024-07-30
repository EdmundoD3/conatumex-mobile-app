import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthenticationError, DataExistsError, TokenExpiredError } from '../error/typeErrors';
import { AdminUserStorage } from '../database/AdminUserStorage';



const initUserData = {
  user:null,
  username:null,
  theme:"black",
  jwt:null,
  jwtExpiryDate:null
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(initUserData);
  const [load,setLoad] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = await AdminUserStorage.get()
        setLoad(false)
        if (storedUser) {
          const {user,username,theme="black",key,expiryDate} = JSON.parse(storedUser)
          if (!key) {
            await AdminUserStorage.out();
            throw new AuthenticationError('ah ocurrido un error intente mas tarde');
          }
          const hasExpired = new Date() > expiryDate;
          if(hasExpired) throw new TokenExpiredError("La sesion a expirado, favor de ingresar de nuevo")
          setUserData({user,username,theme});
          
        }
      } catch (error) {
        setLoad(false)
        throw error
      }
    };

    checkAuthStatus();
  }, []);

  const patchUserData = (newData={}) => setUserData(userData=>({...userData,... newData}))
  

  const login = async ({username, user,jwt,key,refreshToken,expiryDate}) => {
    setLoad(true)
    console.log({username,user,jwt,key,refreshToken,expiryDate});
    const {theme="dark"} =userData
    try {
      await AdminUserStorage.set({user,username,theme,jwt,key,refreshToken,expiryDate})
      patchUserData({user,username});
      setLoad(false)
    } catch (error) {
      setLoad(false)
      throw error
    }
  };

  const logout = async () => {
    setLoad(true)
    try {
      await AdminUserStorage.out()
      patchUserData({user:null, username:null,jwt:null})
      setLoad(false)
    } catch (error) {
      setLoad(false)
      throw error
    }
  };

  return (
    <AuthContext.Provider value={{ userData,load, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = ()=> useContext(AuthContext);