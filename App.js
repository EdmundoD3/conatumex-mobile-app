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