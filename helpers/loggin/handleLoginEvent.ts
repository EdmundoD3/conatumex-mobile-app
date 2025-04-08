import { startDatabase } from "@database/manageDatabase";
import { fetchLogin } from "@services/api/auth/loginAuth";
import getSessionId from "@helpers/loggin/getSessionId";
import errorHandler from "@error/errorHandler";
import { UserSession } from "../models/userProviderDataModel";
import { LoginRequest } from "@services/api/models/LoginRequest";

interface LoginEventProps {
  username: string;
  password: string;
  login: (userSession: UserSession) => void;
  logout: () => void;
  setLoad: (loading: boolean) => void;
}

const handleLoginEvent = async ({ username, password, login, logout, setLoad }: LoginEventProps): Promise<void> => {
  setLoad(true);
  try {
    const key = getSessionId();
    const body = new LoginRequest({ username, password, key }) ;

    const userData = await fetchLogin(body);
    const userSession = new UserSession({...userData, key})
    login( userSession );
    await startDatabase();
  } catch (error) {
    errorHandler(error);
    logout();
  } finally {
    setLoad(false);
  }
};

export default handleLoginEvent;
