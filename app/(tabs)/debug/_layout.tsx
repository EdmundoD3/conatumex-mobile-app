import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function CuentasLayOut() {
  const {colors} =useThemeColor()
  return (
    <Stack screenOptions={{headerStyle:{backgroundColor:colors.background,}, headerTitleStyle:{color:colors.text}, headerShown: true }}>
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
