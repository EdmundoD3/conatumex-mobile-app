import { getNetworkStateAsync } from "expo-network";
import { fetchWithTimeout } from "../helpers/fetchWithTimeOut";
import { AdminUserStorage } from "./AdminUserStorage";
import SyncDateHandler from "./updateDate";
import { URL_GET_LAST_DATE } from "../constants/url";
import { ClienteRepository } from "./repository/ClienteRepository";

const isNotConnectedToTheNetwork = async () => {
  const networkState = await getNetworkStateAsync();
  return !networkState.isConnected
}
class SynchronizeDatabase {
  static async getNewData() {
    const lastUpdateDate = await SyncDateHandler.getLastUpdateDate()
    const token = await AdminUserStorage.getToken()
    const newData = await fetchWithTimeout(URL_GET_LAST_DATE, {})
    return newData.data
  }
  static async saveNewData() {
    const newData = await this.getNewData()
    ClienteRepository.saveNewData(newData.customers)
  }
}

const synchronizeDatabase = async () => {
  if (isNotConnectedToTheNetwork()) return;
  SynchronizeDatabase.getNewData()

}