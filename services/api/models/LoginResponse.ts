export class LoginResponse {
  user: string;
  username: string;
  token: { token: string; expiryDate: string };
  refreshToken: { token: string; expiryDate: string };

  constructor(
    user: string,
    username: string,
    token: { token: string; expiryDate: string },
    refreshToken: { token: string; expiryDate: string }
  ) {
    this.user = user;
    this.username = username;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}