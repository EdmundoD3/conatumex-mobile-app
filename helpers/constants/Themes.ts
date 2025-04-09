export type ColorTheme = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  card: string;
  shadow: string;
  primary: string;
};

const colors: { light: ColorTheme; dark: ColorTheme } = {
  light: {
    text: '#11181C',               // Gris muy oscuro (casi negro)
    background: '#FFFFFF',         // Blanco puro
    tint: '#0a7ea4',               // Azul acentuado para detalles
    icon: '#687076',               // Gris medio para íconos
    tabIconDefault: '#687076',     // Igual al color de íconos
    tabIconSelected: '#0a7ea4',    // Azul acentuado cuando está activo
    card: '#F5F8FA',               // Gris muy claro para tarjetas
    shadow: 'rgba(0, 0, 0, 0.08)', // Sombra sutil y clara
    primary: '#1D9BF0',            // Azul claro brillante (como Twitter)
  },
  dark: {
    text: '#ECEDEE',               // Gris muy claro para contrastar con fondo oscuro
    background: '#151718',         // Casi negro pero con tono cálido
    tint: '#FFFFFF',              // Blanco para detalles activos
    icon: '#9BA1A6',               // Gris claro
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
    card: '#1E1F20',              // Gris oscuro para tarjetas
    shadow: 'rgba(0, 0, 0, 0.6)', // Sombra más fuerte para destacar en fondo oscuro
    primary: '#1DA1F2',           // Azul vibrante, visible en oscuro
  },
};


export const themes = {
  dark: colors.dark,
  light: colors.light,
};

export type Theme = "dark" | "light";

export const getTheme = (theme: Theme) => themes[theme] || themes.light; // Devuelve "light" si el tema no existe

export const listOfThemes = ["dark", "light"]