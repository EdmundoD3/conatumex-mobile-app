import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  ModalProps,
  ViewProps,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type ModalContainerProps = ModalProps & {
  children: React.ReactNode;
  contentStyle?: ViewProps["style"];
  onClose: () => void;
};

export const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  contentStyle,
  onClose,
  ...modalProps
}) => {
  const { colors } = useThemeColor();
  const { card: backgroundColor, text } = colors;

  return (
    <Modal transparent animationType="fade" {...modalProps}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.avoidingView}
        >
          <View style={[styles.content, { backgroundColor }, contentStyle]}>
            {/* Botón para cerrar el modal */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: text }]}>✕</Text>
            </TouchableOpacity>

            {children}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // padding:8,
  },
  avoidingView: {
    width: "100%", // Ocupa toda la pantalla
    flex: 1, // Evita que el modal comprima los elementos
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    padding: 20,
    // paddingTop:32,
    // paddingBottom:32,
    borderRadius: 10,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 5,
    padding: 5,
    borderRadius: 50,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
