import { fetchLogin, fetchRefreshToken } from "@services/api/auth/loginAuth";
import { LoginRequest } from "@services/api/models/LoginRequest";
import { SecondaryButton } from "@/components/ui/Buttons/CustomButtons";
import { Collapsible } from "@/components/ui/Container/Collapsible";
import { TextTitle } from "@ui/texts/TextComponents";

const loginFuncional = {
  username: "vane5912",
  password: "123456",
  key: "patata",
};
const jwtCaduco =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0Yjk0YTc3MTU0YTNmOTkxZTE5OTUiLCJ1c2VybmFtZSI6InZhbmU1OTEyIiwia2V5IjoicGF0YXRhIiwiaWF0IjoxNzIzNDk0MTczLCJleHAiOjE3MjQwOTg5NzN9.UcCOyC0fziQ5qhLaao5zQujv02SkAxCyPlIohZjZWzY";


export function DebugLoging({consoleFake,setRefreshToken,refreshToken}:{consoleFake:Function,setRefreshToken:Function,refreshToken:string}) {
  const handleFetchLogin = async () => {
    try {
      const data = await fetchLogin(new LoginRequest(loginFuncional));
      setRefreshToken(data.refreshToken.token);
      consoleFake(data);
    } catch (error) {
      consoleFake(error);
    }
  };
  const handleFecthRefreshToken = async () => {
    try {
      const data = await fetchRefreshToken(refreshToken, loginFuncional.key);
      consoleFake(data);
    } catch (err) {
      consoleFake(err);
    }
  };
  const handleFecthRefreshTokenExpiry = async () => {
    try {
      const data = await fetchRefreshToken(jwtCaduco, loginFuncional.key);
      consoleFake(data);
    } catch (err) {
      consoleFake(err);
    }
  };

  const handleDeleteRefreshToken = () => {
    setRefreshToken("");
    consoleFake("refreshToken vacio");
  };
  return (
    <Collapsible title="Auth">
      <TextTitle>Login</TextTitle>
      <SecondaryButton title="loginFetch" onPress={handleFetchLogin} />
      <TextTitle>Refresh {refreshToken ? "nuevo" : "vacio"}</TextTitle>
      <SecondaryButton title="refreshToken" onPress={handleFecthRefreshToken} />
      <TextTitle>delete RefreshToken</TextTitle>
      <SecondaryButton
        title="refreshToken"
        onPress={handleDeleteRefreshToken}
      />
      <TextTitle>Refresh expirado</TextTitle>
      <SecondaryButton
        title="refreshTokenExpiry"
        onPress={handleFecthRefreshTokenExpiry}
      />
    </Collapsible>
  );
}