import { URL_GET_ALL_PURCHASES, URL_GET_LAST_DATE_UPDATE, URL_UPDATE_PURCHASE } from "@constants/urls";
import SyncDateHandler from "@database/helpers/updateDate";
import { AuthenticationError } from "@error/typeErrors";
import { fetchWithTimeout } from "@helpers/network/fetchWithTimeOut";
import { Token } from "@models/userProviderDataModel";


const fetchGetAllPurchases = async ({ token = new Token({ token: "", expiryDate: new Date }) }) => {
  try {
    const tokenheader = token.getToken()
    const response = await fetchWithTimeout(URL_GET_ALL_PURCHASES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": `${tokenheader}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Error al obtener las compras';
      throw new AuthenticationError(errorMessage);
    }

    const data = await response.json();

    if (!data || data.error) {
      const errorMessage = data.error || 'Error al obtener las compras';
      throw new AuthenticationError(errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchLastDateUpdate = async ({ token = new Token({ token: "", expiryDate: new Date }) }) => {
  try {
    const lastDateUpdate = (await SyncDateHandler.getLastUpdateDate()).toDateString()
    const tokenheader = token.getToken()

    const response = await fetchWithTimeout(URL_GET_LAST_DATE_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": `${tokenheader}`,
        lastDateUpdate
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Error al obtener las compras';
      throw new AuthenticationError(errorMessage);
    }

    const data = await response.json();

    if (!data || data.error) {
      const errorMessage = data.error || 'Error al obtener las compras';
      throw new AuthenticationError(errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchUpdatePurchase = async ({ token, data }:{token:Token,data:}) => {
  try {
    const tokenheader = token.getToken()
    const lastDateUpdate = (await SyncDateHandler.getLastUpdateDate()).toDateString()
    const response = await fetchWithTimeout(URL_UPDATE_PURCHASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": `${tokenheader}`,
        lastDateUpdate
      },
      body: { data }
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Error al obtener las compras';
      throw new AuthenticationError(errorMessage);
    }

    const res = await response.json();

    if (!res || res.error) {
      const errorMessage = res.error || 'Error al obtener las compras';
      throw new AuthenticationError(errorMessage);
    }

    return res;
  } catch (error) {
    throw error;
  }
};

export { fetchGetAllPurchases, fetchLastDateUpdate, fetchUpdatePurchase }