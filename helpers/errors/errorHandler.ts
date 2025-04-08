import { Alert } from "react-native";
import { BaseError } from "@error/typeErrors";


const showAlert = (error: BaseError): void => {
  const title = error.name || "Error inesperado";
  const message = error.userMessage || 'Hubo un error, intenta de nuevo en un momento';
  
  Alert.alert(
    title,
    message,
    [
      { text: 'OK' }
    ],
    { cancelable: false }
  );
};

const errorHandler = (error: BaseError): void => {
  console.log("errorHandler:", error);
  showAlert(error);
};
export {showAlert}
export default errorHandler;
