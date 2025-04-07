import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewProps,
  ScrollViewProps,
  Animated,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor"; // Asegúrate de que el hook esté importado
import { getBoxShadow } from "@/helpers/constants/baseStyles";

type CustomViewProps = ViewProps & {
  children: React.ReactNode;
};

type CustomScrollViewProps = ScrollViewProps & {
  children: React.ReactNode;
};

export const ViewContainer: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  // const boxShadow = getBoxShadow(colors.shadow);
  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export const ViewSubContainer: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.card }, style]}
      {...props}
    >
      {children}
    </View>
  );
};
export const ViewCardContainer: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  const boxShadow = getBoxShadow(colors.shadow);
  return (
    <View
      style={[styles.card, boxShadow, { backgroundColor: colors.card }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export const ScrollContainer: React.FC<CustomScrollViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: colors.background },
        style,
      ]}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

// Para manejar áreas seguras en dispositivos con muescas o bordes redondeados.
export const SafeContainer: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: colors.background },
        style,
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export const KeyboardAvoidingContainer: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  const boxShadow = getBoxShadow(colors.shadow);
  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        boxShadow,
        { backgroundColor: colors.card
         },
        style,
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export const AnimatedContainer: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.card }, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export const ViewRow: React.FC<CustomViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeColor();
  const boxShadow = getBoxShadow(colors.shadow);
  return (
    <View
      style={[styles.row, boxShadow, { backgroundColor: colors.card }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 0,
    borderRadius: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 12,
  },
  safeContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    paddingVertical: 4,
    // marginBottom: 2,
    borderRadius: 5,
    // shadowRadius:5,
  },
  card: {
    // flex:1,
    // width: "100%",
    borderRadius: 10,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 8,
    margin: 0,
    alignItems: "flex-start",
  },
});
