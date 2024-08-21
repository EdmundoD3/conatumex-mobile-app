import { AuthProvider } from './src/context/AuthContext';
import Main from './main';

// startDatabase()
// Addresdb.create({})
export default function App() {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Lógica para actualizar datos
  //     fetchData();
  //   }, 5000); // 5000 ms = 5 segundos

  //   // Limpia el intervalo cuando el componente se desmonta
  //   return () => clearInterval(interval);
  // }, []);
  return (<AuthProvider>
    <Main />
  </AuthProvider>
  );
}