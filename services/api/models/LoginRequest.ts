export class LoginRequest {
  username: string;
  password: string;
  key: string;

  constructor({ username, password, key }: { username: string; password: string; key: string }) {
    this.username = username;
    this.password = password;
    this.key = key;
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.username.length < 6) {
      errors.push("username is not in the correct format");
    }

    if (this.password.length < 6) {
      errors.push("password is not in the correct format");
    }

    if (this.key.length < 6 || this.key.length > 40) {
      errors.push("key is not in the correct format");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}