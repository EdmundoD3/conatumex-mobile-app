import { AuthenticationError, TokenExpiredError } from "@error/typeErrors";
import { AdminUserStorage } from "@database/AdminUserStorage";
import errorHandler from "@error/errorHandler";
import { UserData } from "@models/userProviderDataModel";
const initializeAuth = async ({setTheme,setIsLoading,setUserData}) => {
  try {
    const storedUser = await AdminUserStorage.get();
    const storedTheme = await AdminUserStorage.getTheme();

    if (storedTheme) {
      setTheme(storedTheme);
    }

    if (storedUser) {
      const { user, username, key, token } = storedUser;
      const {expiryDate} = token
      if (!key) {
        await AdminUserStorage.out();
        throw new AuthenticationError('Ha ocurrido un error, intente más tarde');
      }

      if (expiryDate && new Date() > new Date(expiryDate)) {
        throw new TokenExpiredError('La sesión ha expirado, por favor ingrese de nuevo');
      }

      setUserData(new UserData({ user, username, token }));
    }
  } catch (error) {
    setUserData({
      user: null,
      username: null,
      token: {}
    })
    errorHandler(error);
  } finally {
    setIsLoading(false);
  }
};

export default initializeAuth