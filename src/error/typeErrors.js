class BaseError extends Error {
  constructor(message, userMessage) {
    super(message);
    this.name = this.constructor.name;
    this.userMessage = userMessage || 'Ha ocurrido un error, intente más tarde';
  }
}
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.userMessage = 'Ha ocurrido un error, intente más tarde';
  }
}

class TokenExpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenExpiredError';
    this.userMessage = 'La sesión ha expirado, por favor ingrese de nuevo';
  }
}

class ExecutionInProgressError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExecutionInProgressError';
    this.userMessage = 'La ejecución está en progreso, por favor espere';
  }
}

class DataExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataExistsError';
    this.userMessage = 'Los datos tienen un error';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.userMessage = 'Error en la validación de datos';
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
    this.userMessage = 'Error de conexión, intente más tarde';
  }
}

class MissingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingDataError';
    this.userMessage = 'Faltan datos requeridos';
  }
}

class LoginError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginError';
    this.userMessage = 'Error de inicio de sesión';
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
    this.userMessage = 'La solicitud tardó más de lo esperado. Intente nuevamente más tarde';
  }
}

export {
  BaseError, AuthenticationError,
  ExecutionInProgressError,
  DataExistsError,
  MissingDataError, NetworkError,
  ValidationError, LoginError, 
  TimeoutError,TokenExpiredError
}