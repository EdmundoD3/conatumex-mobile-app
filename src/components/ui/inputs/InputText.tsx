import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";

type CustomInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?:StyleProp<ViewStyle>;
};

export const InputText: React.FC<CustomInputProps> = ({
  label = "Texto",
  placeholder = "Escribe aquí...",
  value,
  onChangeText,
  secureTextEntry = false,
  style,
}) => {
  const { colors } = useThemeColor();
  const coloredStyle = {
    // borderColor: colors.tabIconSelected,
    backgroundColor: colors.background,
    color: colors.text,
  };
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[styles.input, coloredStyle]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const predefinedValues = [20000, 15000, 10000, 5000];
const filterByStartingValue = (arr: number[], search: string): number[] => {
  return arr.filter((num) => num.toString().startsWith(search));
};

export const InputMoney: React.FC<CustomInputProps> = ({
  label = "Cantidad",
  placeholder = "Ingrese el monto",
  value = "000",
  onChangeText,
}) => {
  const { colors } = useThemeColor();
  const [showOptions, setShowOptions] = useState(false);

  const formatMoney = (text: string) => {
    const onlyNumbers = text.replace(/\D/g, ""); // Solo números
    const numericValue = parseInt(onlyNumbers || "0", 10);
    onChangeText?.(numericValue.toString()); // Almacena el valor en centavos
  };

  const displayValue = value ? (parseInt(value, 10) / 100).toFixed(2) : "0.00"; // Muestra como dinero

  const selectValue = (amount: number) => {
    // onChangeText?.(amount.toString()); // Guarda sin punto decimal
    console.log(amount);
    formatMoney(amount.toString());
    setShowOptions(false);
    console.log(value);
  };

  const filteredAmount = value ? filterByStartingValue(predefinedValues, value) : predefinedValues;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={displayValue} // Muestra formato xx.xx
        onChangeText={formatMoney}
        keyboardType="numeric"
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
      />
      {showOptions && filteredAmount.length > 0 && (
        <FlatList
          data={filteredAmount}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.option, { backgroundColor: colors.card }]}
              onPress={() => selectValue(item)}
            >
              <Text style={{ color: colors.text }}>{(item / 100).toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    fontSize: 18,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    color: "#333",
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
});
