import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor"; // Asumiendo que usas el hook para obtener el tema
import { router, Href, Link } from "expo-router";
import { NavigationOptions } from "expo-router/build/global-state/routing";

type CustomLinkProps = {
  children: React.ReactNode;
  url: string; // URL a la que apunta el enlace
  style?: TextStyle; // Estilo personalizado
};

type CustomRouterProps = {
  children: React.ReactNode;
  href: Href; // URL a la que apunta el enlace
  options?: NavigationOptions; // Opciones de navegación (opcional)
  style?: TextStyle; // Estilo personalizado
};

export const LinkRouter: React.FC<CustomRouterProps> = ({
  children,
  href,
  options,
  style,
}) => {
  const { colors } = useThemeColor();

  const handlePress = () => {
    if (href) {
      try {
        router.navigate(href, options); // Pasa las opciones de navegación
      } catch (error) {
        console.error("Error al navegar:", error);
      }
    } else {
      console.warn("La propiedad 'href' no está definida.");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.link, { color: colors.primary }, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const LinkGeneric: React.FC<CustomLinkProps> = ({
  children,
  url,
  style,
}) => {
  const { colors } = useThemeColor();

  // Función para manejar el clic en el enlace
  const handlePress = () => {
    Linking.openURL(url); // Abre la URL en el navegador
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.link, { color: colors.primary }, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    textDecorationLine: "underline", // Subrayado para simular un enlace
  },
});
