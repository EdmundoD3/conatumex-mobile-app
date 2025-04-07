class BaseError extends Error {
  userMessage: string;
  location?: string; 

  constructor(message: string, userMessage?: string, location?: string) {
    super(message);
    this.name = this.constructor.name;
    this.userMessage = userMessage || 'Ha ocurrido un error, intente más tarde';
    this.location = location;  // Ubicación del error (puede ser undefined)
  }
}

class AuthenticationError extends BaseError {
  constructor(message: string, location?: string) { 
    super(
      message,
      message.includes("username or password")
        ? 'Ingrese un username o password válidos'
        : 'Intente de nuevo',
      location
    );
    this.name = 'Error al iniciar sesión';
  }
}

class TokenExpiredError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'La sesión ha expirado, por favor ingrese de nuevo', location);
    this.name = 'TokenExpiredError';
  }
}

class ExecutionInProgressError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'La ejecución está en progreso, por favor espere', location);
    this.name = 'ExecutionInProgressError';
  }
}

class DataExistsError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Los datos tienen un error', location);
    this.name = 'DataExistsError';
  }
}

class ValidationError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Error en la validación de datos', location);
    this.name = 'ValidationError';
  }
}

class NetworkError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Error de conexión, intente más tarde', location);
    this.name = 'NetworkError';
  }
}

class MissingDataError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Faltan datos requeridos', location);
    this.name = 'MissingDataError';
  }
}

class LoginError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Error de inicio de sesión', location);
    this.name = 'LoginError';
  }
}
class SessionError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Error con la sesion', location);
    this.name = 'SessionError';
  }
}
class DatabaseError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'Hubo un error, Intente nuevamente más tarde', location);
    this.name = 'DatabaseError';
  }
}

class TimeoutError extends BaseError {
  constructor(message: string, location?: string) { 
    super(message, 'La solicitud tardó más de lo esperado. Intente nuevamente más tarde', location);
    this.name = 'TimeoutError';
  }
}

export {
  AuthenticationError,DatabaseError,
  ExecutionInProgressError,
  DataExistsError,
  MissingDataError, NetworkError,
  ValidationError, LoginError,
  TimeoutError, TokenExpiredError,SessionError
};
