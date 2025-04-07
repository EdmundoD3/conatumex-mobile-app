import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewProps,
} from "react-native";

type KeyboardAvoidingContainerProps = ViewProps & {
  children: React.ReactNode;
};
// Este componente maneja automáticamente el desplazamiento cuando aparece el teclado, especialmente útil para formularios.
export const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingContainerProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
