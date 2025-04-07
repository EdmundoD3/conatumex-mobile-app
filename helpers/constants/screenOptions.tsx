import { HapticTab } from "@/src/components/ui/Buttons/HapticTab";
import TabBarBackground from "@components/ui/TabBarBackground";
import { Platform } from "react-native";

export const screenOptions = {
  headerShown: true,
  tabBarButton: HapticTab,
  tabBarBackground: TabBarBackground,
  tabBarStyle: Platform.select({
    ios: {
      // Use a transparent background on iOS to show the blur effect
      position: "absolute",
    },
    default: {},
  }),
};
