import { Token, UserSession } from "@/models/userProviderDataModel";
import { URL_LOGIN, URL_REFRESH_TOKEN } from "@constants/urls";
import { fetchWithTimeout } from "../../helpers/network/fetchWithTimeOut";
import { AuthenticationError } from "@error/typeErrors";

// Definimos la interfaz para PostLogin
interface PostLoginType {
  username: string;
  password: string;
  key: string;
}

// Clase PostLogin que se encarga de generar el cuerpo para la solicitud
class PostLogin {
  username: string;
  password: string;
  key: string;

  constructor({ username, password, key }: PostLoginType) {
    this.username = username;
    this.password = password;
    this.key = key;
  }

  getBody(): string {
    return JSON.stringify({
      username: this.username,
      password: this.password,
      key: this.key,
    });
  }
}

// Interfaz para los parámetros de login
interface LoginParams {
  username: string;
  password: string;
  key: string;
}

// Función asíncrona para realizar el login
const fetchLogin = async ({ username, password, key }: LoginParams) => {
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
      const { message } = await response.json();
      throw new AuthenticationError(message);
    }

    const data = await response.json();
    if (!data || data.error) {
      throw new AuthenticationError("Error al iniciar sesión: intente de nuevo");
    }

    return new UserSession(data);
  } catch (error) {
    throw error;
  }
};

// Interfaz para los parámetros de refresco de token
interface RefreshTokenParams {
  token: Token;
  key: string;
}

// Función asíncrona para refrescar el token
const fetchRefreshToken = async ({ token = new Token({ token: "", expiryDate: new Date() }), key }: RefreshTokenParams) => {
  try {
    const tokenHeader = token.getToken();

    const response = await fetchWithTimeout(URL_REFRESH_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": tokenHeader,
        "key": key,
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new AuthenticationError(message || "Error al refrescar el token");
    }

    const data = await response.json();

    if (!data || data.error) {
      throw new AuthenticationError(data.error || "Error al refrescar el token: intente de nuevo");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export { fetchLogin, fetchRefreshToken };
