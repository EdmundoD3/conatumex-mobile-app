import { Stack } from "expo-router";

export default function CuentasLayOut() {
  return <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen
    name="index"
    options={{
      title: 'Cuentas',
    }}
    ></Stack.Screen>
    <Stack.Screen
    name="clientes"
    options={{
      title: 'Clientes',
    }}
    ></Stack.Screen>
  </Stack>
}