/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { getTheme } from '@constants/Themes';
// import { useContext } from 'react';
import { useAuthContext } from '@/context/AuthContext';

export function useThemeColor() {
  // const theme = useColorScheme() ?? 'light';
  const {theme}=useAuthContext();
  return{ colors: getTheme(theme), theme}
}
