import { URL_GET_ALL_PURCHASES, URL_GET_LAST_DATE_UPDATE, URL_UPDATE_PURCHASE } from "../constants/url";
import SyncDateHandler from "../database/updateDate";
import { AuthenticationError } from "../error/typeErrors";
import { fetchWithTimeout } from "../helpers/fetchWithTimeOut";

const fetchGetAllPurchases = async ({ token }) => {
  try {
    const response = await fetchWithTimeout(URL_GET_ALL_PURCHASES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    console.error('Error en fetchGetAllPurchases:', error); 
    throw error;
  }
};

const fetchLastDateUpdate = async ({ token }) => {
  try {
    const lastDateUpdate = await SyncDateHandler.getLastUpdateDate()
    const response = await fetchWithTimeout(URL_GET_LAST_DATE_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

const fetchLastDateUpdateee = async ({ token, data }) => {
  try {
    const lastDateUpdate = await SyncDateHandler.getLastUpdateDate()
    const response = await fetchWithTimeout(URL_UPDATE_PURCHASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        lastDateUpdate
      },
      body: {data}
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
    console.error('Error en fetchGetAllPurchases:', error); 
    throw error;
  }
};

export {fetchGetAllPurchases, fetchLastDateUpdate }