import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SimulatedInputButtonProps = {
  label: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
};

export const SimulatedInputButton: React.FC<SimulatedInputButtonProps> = ({
  label,
  value,
  placeholder = "Seleccionar...",
  onPress,
}) => {
  const hasValue = value && value.trim().length > 0;
  const { colors } = useThemeColor();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color:colors.text}]}>{label}</Text>
      <TouchableOpacity
        style={[styles.input, styles.inputEmpty, {backgroundColor: colors.background,}]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.inputText, !hasValue && styles.placeholderText,{color: colors.text}]}>
          {hasValue ? value : placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    borderColor: "#ccc",
  },
  input: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputEmpty: {
    borderColor: "#ccc",
  },
  inputFilled: {
    borderColor: "#666",
  },
  inputText: {
    fontSize: 18,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
});
