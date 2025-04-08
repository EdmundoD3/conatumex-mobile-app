/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { getTheme } from '@constants/Themes';

export function useThemeColor() {
  const theme = useColorScheme() ?? 'light';
  return getTheme(theme)
}
