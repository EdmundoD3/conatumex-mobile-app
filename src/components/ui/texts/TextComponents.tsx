import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";  // Asumiendo que usas el hook para obtener el tema

type CustomTextProps = TextProps & {
  children: React.ReactNode;
};

export const TextTitle: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColor();
  return (
    <Text style={[styles.title, { color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export const TextSubtitle: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColor();
  return (
    <Text style={[styles.subtitle, { color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export const TextParagraph: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColor();
  return (
    <Text style={[styles.paragraph, { color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export const TextBold: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColor();
  return (
    <Text style={[styles.paragraph, { color: colors.text, fontWeight: 'bold' }, style]} {...props}>
      {children}
    </Text>
  );
};

export const TextGeneric: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColor();
  return (
    <Text style={[{ color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  paragraph: {
    fontSize: 14,
  },
});
