const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const URL_REFRESH_TOKEN = `${apiUrl}/user/auth/refreshtoken`;
const URL_LOGIN = `${apiUrl}/user/auth/login`;
const URL_GET_ALL_PURCHASES = `${apiUrl}/customer/cobrador/get-all-purchases`;
const URL_GET_LAST_DATE_UPDATE = `${apiUrl}/cobrador/get-last-date-update`;
const URL_UPDATE_PURCHASE = `${apiUrl}/cobrador/update-purchases`;


export { URL_REFRESH_TOKEN, URL_LOGIN, URL_GET_ALL_PURCHASES, URL_GET_LAST_DATE_UPDATE,URL_UPDATE_PURCHASE,apiUrl }
