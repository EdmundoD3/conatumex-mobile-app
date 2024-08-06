import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, TextInput, Button, Card, Divider } from 'react-native-paper';
import LogoutButton from './helpers/LogoutButton';
import { useAuthContext } from '../../context/AuthContext';

const SettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const {setTheme,theme} = useAuthContext()
  useEffect(() => {
    setIsDarkTheme(theme=="dark")
  }, []);

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
    const theme = isDarkTheme?"dark":"white";
    setTheme(theme)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Apariencia</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Modo Oscuro</Text>
            <Switch value={isDarkTheme} onValueChange={handleThemeChange} />
          </View>
        </Card.Content>
      </Card>
      

        <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default SettingsScreen;