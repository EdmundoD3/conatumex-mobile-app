import errorHandler from '../../../error/errorHandler';
import getSessionId from './getSessionId';
import { startDatabase } from '../../../database/startDb';
import { fetchLogin } from '../../../services/auth';

const handleLoginEvent = async ({ username, password, login, logout, setLoad }) => {
  setLoad(true);
  try {
    const key = getSessionId();
    const body = { username, password, key };

    const { data } = await fetchLogin(body);

    login({ ...data, key });
    await startDatabase();
  } catch (error) {
    errorHandler(error);
    logout()
  } finally {
    setLoad(false);
  }
};

export default handleLoginEvent