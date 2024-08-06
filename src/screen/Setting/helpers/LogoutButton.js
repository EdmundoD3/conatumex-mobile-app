import { StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuthContext } from '../../../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuthContext();

  const showLogoutAlert = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Salir",
          onPress: logout
        }
      ],
      { cancelable: false }
    );
  };
  return <Button
    mode="contained"
    onPress={showLogoutAlert}
    style={styles.button}>
    Cerrar Sesión
  </Button>;
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default LogoutButton;