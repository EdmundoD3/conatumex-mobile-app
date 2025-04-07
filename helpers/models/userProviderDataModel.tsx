/**
 * Represents a token with an expiry date.
 */
class Token {
  readonly token: string;
  readonly expiryDate: Date;

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

/**
 * Checks if the token has already expired.
 * @returns True if the token has expired, false otherwise.
 */
hasAlreadyExpired(offset?: {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}): boolean {
  let adjustedExpiry = new Date(this.expiryDate); // Copia la fecha original

  if (offset) {
    if (offset.days) adjustedExpiry.setDate(adjustedExpiry.getDate() - offset.days);
    if (offset.hours) adjustedExpiry.setHours(adjustedExpiry.getHours() - offset.hours);
    if (offset.minutes) adjustedExpiry.setMinutes(adjustedExpiry.getMinutes() - offset.minutes);
    if (offset.seconds) adjustedExpiry.setSeconds(adjustedExpiry.getSeconds() - offset.seconds);
  }

  return new Date() > adjustedExpiry;
}


  /**
   * Gets the token value.
   * @returns The token string.
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Checks if the token is valid.
   * @returns True if the token is valid, false otherwise.
   */
  isValid(): boolean {
    return this.token.trim() !== "" && !this.hasAlreadyExpired();
  }
}

/**
 * Represents user data.
 */
class UserData {
  user: string;
  username: string;
  token: Token;

  constructor({
    user,
    username,
    token,
  }: {
    user: string;
    username: string;
    token: Token;
  }) {
    this.user = user;
    this.username = username;
    this.token = token;
  }

  /**
   * Checks if the user data is valid.
   * @returns True if the user data is valid, false otherwise.
   */
  get isValidUser(): boolean {
    return (
      this.user.trim() !== "" && // Verifica que user no esté vacío
      this.username.trim() !== "" && // Verifica que username no esté vacío
      this.token.isValid()
    );
  }
}

/**
 * Represents a user session.
 */
class UserSession {
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
  }: {
    username: string;
    user: string;
    token: Token | object;
    key: string;
    refreshToken: Token | object;
  }) {
    this.username = username;
    this.user = user;
    this.token = this.ensureToken(token);
    this.key = key;
    this.refreshToken = this.ensureToken(refreshToken);
  }

  /**
   * Sets a new token for the session.
   */
  set newToken(token: Token) {
    this.token = this.ensureToken(token);
  }

  /**
   * Checks if the session is valid.
   * @returns True if the session is valid, false otherwise.
   */
  get isValidSession(): boolean {
    return (
      this.user.trim() !== "" && // Verifica que user no esté vacío
      this.username.trim() !== "" && // Verifica que username no esté vacío
      this.token.isValid()
    );
  }

  /**
   * Ensures that the token is a valid instance of Token.
   * @param token - The token to validate.
   * @returns A valid Token instance.
   * @throws Error if the token is invalid.
   */
  private ensureToken(token: Token | object): Token {
    if (
      typeof token === "object" &&
      "token" in token &&
      "expiryDate" in token &&
      typeof token.token === "string" &&
      (typeof token.expiryDate === "string" || token.expiryDate instanceof Date)
    ) {
      return new Token(token as { token: string; expiryDate: string | Date });
    }
    throw new Error("Invalid token object");
  }
}

export { UserSession, UserData, Token };
