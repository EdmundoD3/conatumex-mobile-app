import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataExistsError, ValidationError } from '../error/typeErrors';
import { UserSession } from '../models/UserSession';


const keyStorage = {
  user: "user",
  theme: "theme"
}

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
      return await AsyncStorage.removeItem(keyStorage.user);
    } catch (error) {
      throw new DataExistsError('Error removing user data from storage');
    }
  }
}