import { Image, StyleSheet, Platform } from "react-native";

import { TextGeneric } from "@ui/texts/TextComponents";
import {
  ScrollContainer,
  ViewContainer,
} from "@/components/ui/Container/ContainerComponents";

export default function HomeScreen() {
  return (
    <ScrollContainer>
      <ViewContainer style={styles.titleContainer}>
        <TextGeneric>Welcome!</TextGeneric>
      </ViewContainer>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
