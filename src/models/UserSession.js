class Token {
  constructor({token, expiryDate}) {
    this.token = token
    this.expiryDate = expiryDate
  }
}
class UserSession {
  constructor({ username="", user="", token={}, key="", refreshToken={} }) {
    this.username = username;
    this.user = user
    this.token = new Token(token);
    this.key = key;
    this.refreshToken = new Token(refreshToken);
  }
}

export { UserSession, Token }