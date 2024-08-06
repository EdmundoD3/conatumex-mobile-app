import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "../../components/customTextInput";
import { Button } from "react-native-paper";

export default function ClientSearch (){
  const [search, setSearch] = useState('');

  const clearSearch= ()=>setSearch('')

  return<View style={styles.container}>
  <CustomTextInput
    label="Buscar"
    value={search}
    onChangeText = {setSearch}
    onClearText = {clearSearch}
  />

</View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
});