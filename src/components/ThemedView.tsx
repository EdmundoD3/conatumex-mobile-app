import React from 'react';
import { View, type ViewProps } from 'react-native';
import { getStyles } from '../../helpers/constants/Themes';
// import { useAuthContext } from '@/src/context/AuthContext';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  // const { theme } = useAuthContext(); // Obteniendo el tema del contexto de autenticación
  // const { backgroundColor } = getStyles(theme); // Obteniendo los estilos basados en el tema
  const backgroundColor = "#000"
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
