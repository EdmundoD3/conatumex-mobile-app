import { URL_LOGIN, URL_REFRESH_TOKEN } from "../constants/url";
import { AuthenticationError } from "../error/typeErrors";
import { fetchWithTimeout } from "../helpers/fetchWithTimeOut";
import { Token } from "../models/UserSession";

class PostLogin {
  constructor({ username, password, key }) {
    this.username = username;
    this.password = password;
    this.key = key;
  }

  getBody() {
    return JSON.stringify({ username: this.username, password: this.password, key: this.key });
  }
}

const fetchLogin = async ({ username, password, key }) => {
  try {
    const postLogin = new PostLogin({ username, password, key });
    const body = postLogin.getBody();

    const response = await fetchWithTimeout(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      const { message } = await response.json()
      throw new AuthenticationError(message);
    }
    const data = await response.json();
    if (!data || data.error) {
      throw new AuthenticationError(`Error al iniciar sesión: intente de nuevo`);
    }
    return data
  } catch (error) {
    throw error
  }
};

const fetchRefreshToken = async ({ token= new Token({token:"",expiryDate:new Date}), key }) => {
  try {
    const tokenheader = token.getToken()
    const response = await fetchWithTimeout(URL_REFRESH_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": tokenheader,
        "key": key
      }
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new AuthenticationError(message || 'Error al refrescar el token');
    }

    const data = await response.json();

    if (!data || data.error) {
      throw new AuthenticationError(data.error || 'Error al refrescar el token: intente de nuevo');
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export { fetchLogin, fetchRefreshToken };
