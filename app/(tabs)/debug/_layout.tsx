import { Stack } from "expo-router";

export default function CuentasLayOut() {
  return <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen
    name="index"
    options={{
      title: 'debug',
    }}
    ></Stack.Screen>
        <Stack.Screen
    name="database"
    options={{
      title: 'debug database',
    }}
    ></Stack.Screen>
  </Stack>
}