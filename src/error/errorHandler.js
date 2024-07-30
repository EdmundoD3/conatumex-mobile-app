import { Alert } from "react-native";

const showAlert = (error) => {
  const title = error.name || "Error inesperado"
  const message = error.message || 'Hubo un error intenta de nuevo en un momento'
  Alert.alert(
    title,
    message,
    [
      { text: 'OK' }
    ],
    { cancelable: false }
  );
};

const errorHandler = (error) =>{
  showAlert(error)
}

export default errorHandler