import { URL_GET_ALL_PURCHASES, URL_GET_LAST_DATE_UPDATE, URL_UPDATE_PURCHASE } from "../constants/url";
import SyncDateHandler from "../database/updateDate";
import { AuthenticationError } from "../error/typeErrors";
import { fetchWithTimeout } from "../helpers/fetchWithTimeOut";
import { Token } from "../models/UserSession";


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
    const lastDateUpdate = await SyncDateHandler.getLastUpdateDate()
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

const fetchUpdatePurchase = async ({ token = new Token({ token: "", expiryDate: new Date }), data }) => {
  try {
    const tokenheader = token.getToken()
    const lastDateUpdate = await SyncDateHandler.getLastUpdateDate()
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

export { fetchGetAllPurchases, fetchLastDateUpdate, fetchUpdatePurchase }