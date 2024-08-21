import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyStorage } from "../constants/keyStorage";
import { ValidationError } from "../error/typeErrors";

class SyncDateHandler {
  static async getLastUpdateDate() {
    const lastUpdateDate = await AsyncStorage.getItem(keyStorage.lastUpdateDate);
    return lastUpdateDate ? new Date(lastUpdateDate) : null;
  }

  static async saveLastUpdateDate(lastUpdateDate) {
    if (lastUpdateDate instanceof Date) {
      await AsyncStorage.setItem(keyStorage.lastUpdateDate, lastUpdateDate.toISOString());
    } else {
      throw new ValidationError("Last update date isn't type Date");
    }
  }

  static async getLastSendDataDate() {
    const lastSendDataDate = await AsyncStorage.getItem(keyStorage.lastSendDataDate);
    return lastSendDataDate ? new Date(lastSendDataDate) : null;
  }

  static async saveLastSendDataDate(lastSendDataDate) {
    if (lastSendDataDate instanceof Date) {
      await AsyncStorage.setItem(keyStorage.lastSendDataDate, lastSendDataDate.toISOString());
    } else {
      throw new ValidationError("Last send date isn't type Date");
    }
  }
}

export default SyncDateHandler;
