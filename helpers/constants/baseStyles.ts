
export function getBoxShadow(color: string = "rgba(0, 0, 0, 0.3)") {
  return {
    shadowColor: color, // Color de la sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 4,
    // shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    // shadowOpacity: 0.3, // Opacidad de la sombra en iOS
    // shadowRadius: 5, // Difuminado de la sombra en iOS
    // elevation: 5, // Sombra en Android
  };
}

