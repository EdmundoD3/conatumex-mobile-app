import { Stack } from "expo-router";

export default function CuentasLayOut() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "debug",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="DebugFetch"
        options={{
          title: "debug fetch",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="DebugComponents"
        options={{
          title: "debug components",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
