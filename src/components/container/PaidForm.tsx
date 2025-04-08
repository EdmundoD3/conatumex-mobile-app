import React, { useState, useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextGeneric, TextTitle } from "@ui/texts/TextComponents";
import { useThemeColor } from "@/hooks/useThemeColor"; // Asegúrate de importar correctamente
import { InputMoney, InputText } from "@ui/inputs/InputText";
import { InputDate } from "@ui/inputs/InputDate";
import { ModalContainer } from "@ui/Container/ModalContainer";
import { SimulatedInputButton } from "@ui/Buttons/SimulatedInputButton";
import { ValidationError } from "@helpers/errors/typeErrors";
import { showAlert } from "@helpers/errors/errorHandler";
import { KeyboardAvoidingContainer } from "@ui/Container/ContainerComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isValidDateRange = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7); // Restar 7 días

  date.setHours(0, 0, 0, 0); // Resetear horas en la fecha ingresada

  return date >= oneWeekAgo && date <= today;
};

const toFechaEnEspañol = (fecha: Date) =>
  fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
const today = new Date();

const LAST_FOLIO_KEY = "last_folio_key"

const storeData = async (value:string) => {
  try {
    await AsyncStorage.setItem(LAST_FOLIO_KEY, value);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem(LAST_FOLIO_KEY);
    if (value !== null) {
      return value || ""
    }
  } catch (e) {
    // error reading value
  }
};

const PaidForm: React.FC = () => {
  const { colors } = useThemeColor(); // Obtener los colores del tema actual
  const [folio, setFolio] = useState("");
  const [abono, setAbono] = useState("");
  const [saldo, setSaldo] = useState("100000"); // Saldo inicial
  const [fecha, setFecha] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const restoreFolio = async () => {
      const lastFolio = await getData();
      if(lastFolio) return setFolio(lastFolio);
    }
    restoreFolio();
    return () => {
      
    };
  }, []);

  const calcularSaldo = useCallback((nuevoAbono: string) => {
    const abonoNumero = parseInt(nuevoAbono) || 0;
    const saldoNumero = parseInt(saldo)
    if (abonoNumero > saldoNumero) {
      alert("El abono no puede ser mayor al saldo total.");
      return;
    }
    setSaldo((saldoNumero - abonoNumero).toString());
    setAbono(nuevoAbono);
  }, []);

  const enviarFormulario = useCallback(() => {
    if (!folio || !abono || !fecha) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const nextFolio = parseInt(folio)+1
    storeData((nextFolio).toString()||folio)
    console.log("Datos enviados:", { fecha, folio, abono, saldo });
  }, [fecha, folio, abono, saldo]);

  const handleDate = (newDate: Date) => {
    try {
      if (!isValidDateRange(newDate))
        throw new ValidationError(
          "Fecha invalida ingresa una cercana a estos dias",
          "PaidForm.tsx handleDate"
        );
      setFecha(newDate);
    } catch (error) {
      // TypeScript sabe que `error` es de tipo `ValidationError`
      showAlert(error); // Muestra el mensaje de error
      // console.error(`Error en ${error.location}: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingContainer
      style={[
        styles.flex,
        styles.container,
        // {backgroundColor:"none"}
      ]}
    >
      {/* <View
        style={[
          styles.container,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      > */}
      <TextTitle style={[styles.title, { color: colors.text }]}>
        Formulario de Pago
      </TextTitle>

      {/* Fecha */}
      <SimulatedInputButton
        label={`Fecha: `}
        placeholder={toFechaEnEspañol(today)}
        value={toFechaEnEspañol(fecha)}
        onPress={() => setModalVisible(true)}
      />
      {/* <TextGeneric ></TextGeneric> */}
      <ModalContainer
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      >
        <InputDate value={fecha} onChange={handleDate} />
      </ModalContainer>

      {/* Folio */}
      <InputText
        label="Folio:"
        placeholder="Ingrese el folio"
        value={folio}
        onChangeText={setFolio}
      />

      {/* Abono */}
      <InputMoney
        label="Abono:"
        placeholder="Ingrese el abono"
        value={abono}
        onChangeText={calcularSaldo}
      />

      {/* Saldo (solo lectura) */}
      <TextGeneric style={[styles.label, { color: colors.text }]}>
        Saldo:
      </TextGeneric>
      <TextGeneric
        style={[
          styles.saldo,
          { backgroundColor: colors.background, color: colors.text },
        ]}
      >
        {(parseInt(saldo)/100).toFixed(2)}
      </TextGeneric>

      {/* Botón de enviar */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={enviarFormulario}
      >
        <TextGeneric style={[styles.buttonText, { color: colors.text }]}>
          Guardar
        </TextGeneric>
      </TouchableOpacity>
      {/* </View> */}
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  flex: {
    // flex: 1,
  },
  container: {
    padding: 20,
    borderRadius: 10,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.6,
    // shadowRadius: 4,
    // elevation: 5,
    // margin: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: "#ddd",
    marginBottom: 15,
  },
  saldo: {
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaidForm;
