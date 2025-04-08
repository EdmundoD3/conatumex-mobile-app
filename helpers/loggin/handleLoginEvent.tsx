// import { startDatabase } from "@database/manageDatabase";
// import { fetchLogin } from '@services/authService';
// import errorHandler from '@error/errorHandler';
// import getSessionId from './getSessionId';
// import { AuthLoginType } from '@/context/AuthContext';
// import { Token } from '@/models/userProviderDataModel';

// interface LoginEventProps {
//   username: string;
//   password: string;
//   login: ({userSession, key}: AuthLoginType) => void;
//   logout: () => void;
//   setLoad: (loading: boolean) => void;
// }

// const handleLoginEvent = async ({ username, password, login, logout, setLoad }: LoginEventProps): Promise<void> => {
//   setLoad(true);
//   try {
//     const key = getSessionId();
//     const body = { username, password, key };

//     const userSession = await fetchLogin(body);
//     login({ userSession, key });
//     await startDatabase();
//   } catch (error) {
//     errorHandler(error);
//     logout();
//   } finally {
//     setLoad(false);
//   }
// };

// export default handleLoginEvent;
