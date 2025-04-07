import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { IconSymbol } from "@/src/components/ui/IconSymbol";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ViewContainer } from "./ContainerComponents";
import { TextParagraph } from "../texts/TextComponents";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const { colors } = useThemeColor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ViewContainer style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={colors.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <TextParagraph>{title}</TextParagraph>
      </TouchableOpacity>
      {isOpen && (
        <ViewContainer style={styles.content}>{children}</ViewContainer>
      )}
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 4,
    marginLeft: 8,
  },
  container: {
    padding:0,
    paddingTop:4,
    paddingBottom:4,
  }
});
