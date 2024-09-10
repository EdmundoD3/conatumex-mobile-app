class Token {
  constructor({token ="", expiryDate}) {
    this.token = token
    this.expiryDate = new Date(expiryDate) 
  }
  hasAlreadyExpired (){
    return  this.expiryDate > new Date()
  }
  getToken(){
    return this.token
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