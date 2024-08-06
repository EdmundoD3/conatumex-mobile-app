import { AuthenticationError } from '../../../error/typeErrors';
import errorHandler from '../../../error/errorHandler';
import { fetchWithTimeout } from '../../../helpers/fetchWithTimeOut';
import getSessionId from './getSessionId';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const handleLoginEvent = async ({ username, password, login, setLoad }) => {
  setLoad(true);
  try {
    const key = getSessionId();
    const body = JSON.stringify({ username, password, key });
    const url = `${apiUrl}user/auth/login`;

    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

    if (!response.ok) {
      throw new AuthenticationError(`Error al iniciar sesión: ${response.statusText || 'intente de nuevo'}`);
    }

    const data = await response.json();

    if (!data || data.error) {
      throw new AuthenticationError(`Error al iniciar sesión: intente de nuevo`);
    }
    login({ ...data.data, key });
  } catch (error) {
    errorHandler(error);
  } finally {
    setLoad(false);
  }
};

export default handleLoginEvent