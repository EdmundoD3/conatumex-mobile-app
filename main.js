import Navigation from './src/navigation/NavigationContainer';
import { useAuthContext } from './src/context/AuthContext';
import Loading from './src/components/loading';
import Login from './src/screen/Loggin/loggin';

// Addresdb.create({})
export default function Main() {
  const { userData, isLoading } = useAuthContext()

  return (<>
    {
      isLoading ? <Loading /> :
        (userData?.username ?
          <Navigation /> :
          <Login />)
    }
  </>
  );
}

