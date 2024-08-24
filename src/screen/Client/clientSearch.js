import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "../../components/customTextInput";
import { Button } from "react-native-paper";
import ClientList from "./components/clientList";
import { ClienteRepository } from "../../database/repository/ClienteRepository";
const clientData =[{name:"vanessa",street:"chuncla",colonia:"budish",nextPayment:new Date()},
  {name:"simba",street:"patata",colonia:"buchesito",nextPayment:new Date()},
  {name:"le tonche",street:"pulgis",colonia:"goodIsh",nextPayment:new Date()}
]
  const get =async(text)=>await ClienteRepository.get({text,offset})
  const getForDate =async ()=>await ClienteRepository.getForCobranzaDate()

export default function ClientSearch() {
  const [search, setSearch] = useState("");
  const [data,setData] = useState([])
  useEffect(() => {
    const getData=async ()=> {
      setData(search?await get(search): await getForDate())
    }
    getData()
    return () => {
    };
  }, []);
  const handleInput = (e)=>{
    setSearch(e);
  }
  const clearSearch = () => setSearch("");
  console.log( data); 
  console.log(search);
  return (
    <View style={styles.container}>
      <CustomTextInput
        label="Buscar"
        value={search}
        onChangeText={handleInput}
        onClearText={clearSearch}
      />
      <ClientList clientData={clientData}/>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
});
