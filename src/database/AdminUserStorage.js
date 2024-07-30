import AsyncStorage from '@react-native-async-storage/async-storage';

const userKey ="user"
export class AdminUserStorage {
  static get() {
    try {
      return AsyncStorage.getItem(userKey);
    } catch (error) {
      throw new DataExistsError('Error getting user data from storage');
    }
  }

  static async set(userData = { username, user, jwt, key, refreshToken }) {
    try {
      return await AsyncStorage.setItem(userKey, JSON.stringify(userData));
    } catch (error) {
      throw new DataExistsError('Error setting user data in storage');
    }
  }

  static async out() {
    try {
      return await AsyncStorage.removeItem(userKey);
    } catch (error) {
      throw new DataExistsError('Error removing user data from storage');
    }
  }
}