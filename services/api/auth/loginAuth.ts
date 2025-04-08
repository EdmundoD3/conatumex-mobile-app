import { LoginRequest } from "@services/api/models/LoginRequest";
import { LoginResponse } from "@services/api/models/LoginResponse";
import apiClient from "@services/api/apiClient";
import { apiUrl } from "@helpers/constants/urls";


export const fetchLogin = async (
  loginReq: LoginRequest
): Promise<LoginResponse> => {
  const {data} = await apiClient(
    apiUrl + "/user/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginReq),
    }
  );
  const { user, username, token, refreshToken } = data
  return new LoginResponse(user, username, token, refreshToken);
};

export const fetchRefreshToken = async (refreshToken:string,key:string)=>{
  const data = await apiClient(
    apiUrl + "/user/auth/refreshtoken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        refreshToken,
        key
      },
    }
  );
  return data;
}
