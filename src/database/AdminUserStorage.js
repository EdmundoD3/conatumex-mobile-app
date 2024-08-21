import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataExistsError, TokenExpiredError, ValidationError } from '../error/typeErrors';
import { UserSession } from '../models/UserSession';
import { fetchWithTimeout } from '../helpers/fetchWithTimeOut';
import { URL_REFRESH_TOKEN } from '../constants/url';
import { keyStorage } from '../constants/keyStorage';



export class AdminUserStorage {
  static async get() {
    try {
      const data = await AsyncStorage.getItem(keyStorage.user);
      if (data) return new UserSession(JSON.parse(data))
      return null
    } catch (error) {
      throw new DataExistsError('Error getting user data from storage');
    }
  }
  static async getTheme() {
    const theme = await AsyncStorage.getItem(keyStorage.theme);
    return theme || "dark"
  }
  static async setTheme(theme = "") {
    const existTheme = ["dark", "white"].find(t => theme == t)
    if (!existTheme) throw new ValidationError("Tema no existente")
    return await AsyncStorage.setItem(keyStorage.theme, theme)
  }
  static async set(userData) {
    try {
      const newUserSession = new UserSession(userData)
      return await AsyncStorage.setItem(keyStorage.user, JSON.stringify(newUserSession));
    } catch (error) {
      throw new DataExistsError('Error setting user data in storage');
    }
  }

  static async out() {
    try {
      await AsyncStorage.removeItem(keyStorage.user);
      await AsyncStorage.removeItem(keyStorage.lastSendDataDate);
      await AsyncStorage.removeItem(keyStorage.lastUpdateDate);
    } catch (error) {
      throw new DataExistsError('Error removing user data from storage');
    }
  }

  static async getToken() {
    try {
      const { token } = await this.get();
      if (!token.hasAlreadyExpired()) return token;
      const { token: newToken } = await this.get();
      return newToken;
    } catch (error) {
      this.out()
      throw new TokenExpiredError(error)
    }
  }

  static async refreshToken() {
    try {
      const userSesion = await this.get()
      const { refreshToken, key } = userSesion
      if (refreshToken.hasAlreadyExpired()) throw new TokenExpiredError("La sesion a expirado, inicia sesion de nuevo")
      const { data } = await fetchWithTimeout(URL_REFRESH_TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": refreshToken.token,
          key
        }
      })
      const token = data.token
      await this.set({ ...userSesion, token })
    } catch (error) {
      this.out()
      if (error instanceof Error) throw new TokenExpiredError(error)
      throw error
    }
  }
}