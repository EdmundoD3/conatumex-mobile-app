import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

type CenteredViewProps = ViewProps & {
  children: React.ReactNode;
};

export const CenteredView: React.FC<CenteredViewProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.centered, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Puedes personalizar este color según tu diseño
  },
});
