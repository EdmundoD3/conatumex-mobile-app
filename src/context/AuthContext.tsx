import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Token,
  UserData,
  UserSession,
} from "@helpers/models/userProviderDataModel";
import { AdminUserStorage } from "@database/AdminUserStorage";
import errorHandler from "@error/errorHandler";
import { DataExistsError } from "@error/typeErrors";
import initializeAuth from "./helper/initializeAuth";
import { ColorTheme, Theme } from "@constants/Themes";

// export type AuthLoginType =  UserSession

// Definir tipos para el contexto y props
interface AuthContextProps {
  userData: UserData;
  isLoading: boolean;
  login: (userSession: UserSession) => Promise<void>;
  logout: () => Promise<void>;
  // setTheme: (theme: "dark" | "light") => void;
  toggleTheme:()=>void;
  theme: Theme;
}

interface AuthProviderProps {
  children: ReactNode;
}

const voidUserData = new UserData({
  user: null,
  username: null,
  token: null,
});

// // Definir el contexto con tipo
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState(new UserData(voidUserData));
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    initializeAuth({ setTheme, setIsLoading, setUserData });
  }, []);

  const patchUserData = (newData = {}) =>
    setUserData((prevData) => new UserData({ ...prevData, ...newData }));

  const login = async (userSession: UserSession) => {
    setIsLoading(true);
    try {
      await AdminUserStorage.set(userSession);
      patchUserData(userSession);
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

  const updateTheme = (newTheme: "dark"|"light") => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;
    setTheme(newTheme);
    try {
      AdminUserStorage.setTheme(newTheme);
    } catch (error) {
      errorHandler(error);
    }
  };
  const toggleTheme = () => {
    updateTheme(theme === "dark" ? "light" : "dark");
  };

  const memoizedTheme = useMemo<Theme>(() => theme, [theme]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoading,
        login,
        logout, //setTheme: updateTheme,
        toggleTheme,
        theme: memoizedTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
