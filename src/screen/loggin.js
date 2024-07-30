import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../context/AuthContext';
import { AuthenticationError } from '../error/typeErrors';
import errorHandler from '../error/errorHandler';
import { fetchWithTimeout } from '../helpers/fetchWithTimeOut';
import Loading from '../components/loading';
import { eventManager } from '../helpers/eventManager';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const handleLoginEvent = async ({ username, password, login, setLoad }) => {
  setLoad(true)
  try {
    const body = JSON.stringify({ username, password })
    const url = `${apiUrl}login`
    const data = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body
    }).then(res => {
      // if(res.status==401)
      if (!res?.ok) throw new AuthenticationError(`Error al iniciar sesion intente de nuevo`);
      return res.json()
    })
    if (!data) throw new DataExistsError(`Error al iniciar sesion intente de nuevo`)
    if (data.error) {
      throw new AuthenticationError(`Error al iniciar sesion intente de nuevo`)
    }
    setLoad(false)
    console.log(data);
    login(data)
  } catch (error) {
    setLoad(false)
    console.log({ error });
    errorHandler(error)
  }
}

export default function Login() {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const [load, setLoad] = useState(false)
  const { login } = useAuthContext()

  const handleLogin = eventManager(() =>
    handleLoginEvent({ ...userData, login, setLoad })
  )

  return (
    <LinearGradient
      colors={['#52B788', '#95D5B2', '#D8F3DC']} //colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setUserData((data) => ({ ...data, username: text }))}
          value={userData.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text) => setUserData((data) => ({ ...data, password: text }))}
          value={userData.password}
        />
        {load ?
          <TouchableOpacity style={styles.button}>
            <ActivityIndicator size="large" color="#0000ff" />
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        }

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#081C15', //'#4c669f'
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    width: '100%',
    height: 50,
    // backgroundColor: '#081C05', //'#4c669f'
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});
