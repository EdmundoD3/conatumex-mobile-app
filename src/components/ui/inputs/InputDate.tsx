import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useThemeColor } from "@/hooks/useThemeColor"; // Asegúrate de importar correctamente
import moment from "moment"; // Importar moment para manejar localización
import "moment/locale/es"; // Cargar la localización en español
import { showAlert } from "@/helpers/errors/errorHandler";
// Configurar manualmente el idioma en español
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};

LocaleConfig.defaultLocale = "es"; // Establecer el idioma por defecto
// Configurar moment para usar el idioma español
moment.locale("es");

interface InputDateProps {
  value: Date; // Fecha en formato Date
  onChange: (date: Date) => void; // Función para manejar cambios
}

export const InputDate: React.FC<InputDateProps> = ({ value, onChange }) => {
  const { colors } = useThemeColor(); // Obtener colores del tema
  const [selectedDate, setSelectedDate] = useState(
    value.toISOString().split("T")[0]
  ); // Fecha seleccionada en formato YYYY-MM-DD

  // Efecto para actualizar la fecha seleccionada cuando cambia el valor inicial
  useEffect(() => {
    if (value) {
      setSelectedDate(value.toISOString().split("T")[0]);
    }
  }, [value]);

  // Función para manejar la selección de fecha
  const handleDateSelect = (date: string) => {

      const [year, month, day] = date.split("-").map(Number);
      const localDate = new Date(year, month - 1, day); // Mes en JS es base 0
      onChange(localDate); // Enviar la fecha sin modificarla por la zona horaria

  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Fecha: </Text>
      <Calendar
        current={selectedDate} // Fecha actual seleccionada
        onDayPress={(day) => handleDateSelect(day.dateString)} // Manejar selección de fecha
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: colors.primary }, // Resaltar fecha seleccionada
        }}
        locale="es" // Establecer el idioma en español
        theme={{
          backgroundColor: colors.card, // Fondo del calendario
          calendarBackground: colors.card, // Fondo del calendario
          textSectionTitleColor: colors.text, // Color del texto de los días de la semana
          selectedDayBackgroundColor: colors.primary, // Color de la fecha seleccionada
          selectedDayTextColor: "#fff", // Color del texto de la fecha seleccionada
          todayTextColor: colors.primary, // Color del texto del día actual
          dayTextColor: colors.text, // Color del texto de los días
          arrowColor: colors.primary, // Color de las flechas de navegación
          monthTextColor: colors.text, // Color del texto del mes
          textDisabledColor: colors.textSecondary, // Color del texto de días deshabilitados
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default InputDate;
