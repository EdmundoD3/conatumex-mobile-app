import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { startDatabase } from './src/database/startDb';
import { ClienteRepository } from './src/database/repository/ClienteRepository';
import { AuthProvider } from './src/context/AuthContext';
import Main from './main';

// startDatabase()
// Addresdb.create({})
export default function App() {
  
  return (<AuthProvider>
    <Main />
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
