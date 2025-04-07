class Token {
  token: string;
  expiryDate: Date;

  constructor({
    token = "",
    expiryDate,
  }: {
    token: string;
    expiryDate: string | Date;
  }) {
    this.token = token;
    this.expiryDate = new Date(expiryDate);
  }

  hasAlreadyExpired(): boolean {
    return new Date() > this.expiryDate;
  }

  getToken(): string {
    return this.token;
  }
}

type UserDataType = {
  user: string;
  username: string;
  token: Token;
};

interface IUserData {
  user: string;
  username: string;
  token: Token;
}

class UserData implements IUserData {
  user: string;
  username: string;
  token: Token;

  constructor({ user, username, token }: UserDataType) {
    this.user = user;
    this.username = username;
    this.token = token;
  }
  
}
interface IUserSessin extends IUserData {
  key: string;
  refreshToken: Token;
}
type UserSessionType = {
  user: string;
  username: string;
  token: Token | object;
  key: string;
  refreshToken: Token | object;
};
class UserSession implements IUserSessin {
  key: string;
  refreshToken: Token;
  user: string;
  username: string;
  token: Token;
  constructor({
    username = "",
    user = "",
    token,
    key = "",
    refreshToken,
  }: UserSessionType) {
    this.username = username;
    this.user = user;
    this.token = this.ensureToken(token);
    this.key = key;
    this.refreshToken = this.ensureToken(refreshToken);
  }
  set newToken (token:Token) {
    this.token = this.ensureToken(token);
  }
  private ensureToken(token: Token | object): Token {
    if (typeof token === "object" && "token" in token && "expiryDate" in token)
      return new Token(token as { token: string; expiryDate: string | Date });

    throw new Error("Invalid token object");
  }
}

export { UserSession, UserData, Token };
