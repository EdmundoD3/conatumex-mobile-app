import { Text, StyleSheet, TextProps } from "react-native";
import { TextParagraph } from "./TextComponents";

type CustomTextProps = TextProps & {
  children: string | number;
};
const today = new Date();
export function DateText({ children, style, ...props }: CustomTextProps) {

  const inputDate = new Date(children);

  // Resetea horas para comparar solo las fechas
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  // Determina el color basado en la comparación
  let color: string;
  if (inputDate < today) {
    color = "red"; // Fecha pasada
  } else if (inputDate.getTime() === today.getTime()) {
    color = "green"; // Hoy
  } else {
    color = "#0066ff"; // Fecha futura
  }

  return (
    <TextParagraph
      style={[styles.text, { color }, style]}
      {...props}
    >
      {`Fecha: ${inputDate.toLocaleDateString()}`}
    </TextParagraph>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 600,
    fontSize: 10,
    color: "#acaeb4"
  },
});
