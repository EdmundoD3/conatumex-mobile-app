import { AuthenticationError } from '../../../error/typeErrors';
import errorHandler from '../../../error/errorHandler';
import { fetchWithTimeout } from '../../../helpers/fetchWithTimeOut';
import getSessionId from './getSessionId';
import { URL_LOGIN } from '../../../constants/url';

const handleLoginEvent = async ({ username, password, login, setLoad }) => {
  setLoad(true);
  try {
    const key = getSessionId();
    const body = JSON.stringify({ username, password, key });

    const response = await fetchWithTimeout(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

    if (!response.ok) {
      const {message} = await response.json()
      throw new AuthenticationError(message);
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