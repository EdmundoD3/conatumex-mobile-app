import Login from './src/screen/loggin';
import Navigation from './src/navigation/NavigationContainer';
import { useAuthContext } from './src/context/AuthContext';
import Loading from './src/components/loading';

// Addresdb.create({})
export default function Main() {
  const { userData, load } = useAuthContext()

  return (<>
    {
      load ? <Loading /> :
        (userData?.username ?
          <Navigation /> :
          <Login />)
    }
  </>
  );
}

