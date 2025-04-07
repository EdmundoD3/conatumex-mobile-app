import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValidationError } from '@error/typeErrors';
import { keyStorage } from '@constants/keyStorage';

class SyncDateHandler {
  // Obtiene la última fecha de actualización almacenada
  static async getLastUpdateDate(): Promise<Date | null> {
    const lastUpdateDate = await AsyncStorage.getItem(keyStorage.lastUpdateDate);
    return lastUpdateDate ? new Date(lastUpdateDate) : null;
  }

  // Guarda la última fecha de actualización
  static async saveLastUpdateDate(lastUpdateDate: Date): Promise<void> {
    if (lastUpdateDate instanceof Date) {
      await AsyncStorage.setItem(keyStorage.lastUpdateDate, lastUpdateDate.toISOString());
    } else {
      throw new ValidationError("Last update date isn't type Date");
    }
  }

  // Obtiene la última fecha de envío de datos almacenada
  static async getLastSendDataDate(): Promise<Date | null> {
    const lastSendDataDate = await AsyncStorage.getItem(keyStorage.lastSendDataDate);
    return lastSendDataDate ? new Date(lastSendDataDate) : null;
  }

  // Guarda la última fecha de envío de datos
  static async saveLastSendDataDate(lastSendDataDate: Date): Promise<void> {
    if (lastSendDataDate instanceof Date) {
      await AsyncStorage.setItem(keyStorage.lastSendDataDate, lastSendDataDate.toISOString());
    } else {
      throw new ValidationError("Last send date isn't type Date");
    }
  }
}

export default SyncDateHandler;
