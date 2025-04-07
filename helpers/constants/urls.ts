const API_URL = process.env.EXPO_PUBLIC_API_URL;
const URL_REFRESH_TOKEN = `${API_URL}/user/auth/refreshtoken`;
const URL_LOGIN = `${API_URL}/user/auth/login`;
const URL_GET_ALL_PURCHASES = `${API_URL}/customer/cobrador/get-all-purchases`;
const URL_GET_LAST_DATE_UPDATE = `${API_URL}/cobrador/get-last-date-update`;
const URL_UPDATE_PURCHASE = `${API_URL}/cobrador/update-purchases`;


export { URL_REFRESH_TOKEN, URL_LOGIN, URL_GET_ALL_PURCHASES, URL_GET_LAST_DATE_UPDATE,URL_UPDATE_PURCHASE }
