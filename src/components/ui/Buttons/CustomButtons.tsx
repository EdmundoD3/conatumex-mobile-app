import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from "react-native";

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export const PrimaryButton: React.FC<CustomButtonProps> = ({
  title,
  textStyle,
  containerStyle,
  ...props
}) => (
  <TouchableOpacity style={[styles.primaryButton, containerStyle]} {...props}>
    <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export const SecondaryButton: React.FC<CustomButtonProps> = ({
  title,
  textStyle,
  containerStyle,
  ...props
}) => (
  <TouchableOpacity style={[styles.secondaryButton, containerStyle]} {...props}>
    <Text style={[styles.secondaryButtonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export const OutlineButton: React.FC<CustomButtonProps> = ({
  title,
  textStyle,
  containerStyle,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  return(
  <TouchableOpacity style={[styles.outlineButton,{borderColor:colors.tint}, containerStyle,style]} {...props}>
    <Text style={[styles.outlineButtonText,{color:colors.tint}, textStyle]}>{title}</Text>
  </TouchableOpacity>
)};

export const DangerButton: React.FC<CustomButtonProps> = ({
  title,
  textStyle,
  containerStyle,
  ...props
}) => (
  <TouchableOpacity style={[styles.dangerButton, containerStyle]} {...props}>
    <Text style={[styles.dangerButtonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor:  "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#6C757D",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    // borderColor: "#007BFF",
    alignItems: "center",
  },
  outlineButtonText: {
    color:  "#007BFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor:  "#DC3545",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  dangerButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
