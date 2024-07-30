class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
class TokenExpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenExpiredError';
  }
}
class ExecutionInProgressError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExecutionInProgressError';
  }
}

class DataExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataExistsError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class MissingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingDataError';
  }
}

class LoginError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginError';
    this.message = 'Error de inicio de sesion'
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
    this.message = 'La solicitud tardo mas de lo esperado intente la solicitud de nuevo o mas tarde'
  }
}


export {
  AuthenticationError,
  ExecutionInProgressError,
  DataExistsError,
  MissingDataError, NetworkError,
  ValidationError, LoginError, 
  TimeoutError,TokenExpiredError
}