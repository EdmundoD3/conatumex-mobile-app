export type ColorTheme = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  card:string;
  shadow:string;
  primary:string;
};

// Definimos el objeto Colors, que contendrá los temas claro y oscuro
const colors: { light: ColorTheme; dark: ColorTheme } = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const themes = {
  dark: {
    colors:colors.dark
    // color: colors.dark.text,
    // backgroundColor: colors.dark.background,
    
  },
  light: {
    colors:colors.light
    // color: colors.light.text,
    // backgroundColor: colors.light.background, // Cambia 'colors.light.text' por 'colors.light.background'
  },
};

type Theme = "dark" | "light";

export const getTheme = (theme: Theme) => themes[theme] || themes.light; // Devuelve "light" si el tema no existe
