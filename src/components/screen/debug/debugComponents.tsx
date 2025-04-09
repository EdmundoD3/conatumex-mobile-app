import ClientProfileCard from "@/components/container/ClientProfileCard";
import ListClient, { TListClient } from "@/components/container/ListClient";
import { DangerButton, PrimaryButton } from "@/components/ui/Buttons/CustomButtons";
import { ScrollContainer, ViewContainer } from "@/components/ui/Container/ContainerComponents";
import { InputText } from "@/components/ui/inputs/InputText";
import { TextSubtitle } from "@/components/ui/texts/TextComponents";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { StyleSheet } from "react-native";

const props:TListClient[] = 
 [
{
  id: "1",
  name: "John Doe",
  direction: "john.doe@example.com",
  date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
},
{
  id: "2",
  name: "Jane Smith",
  direction: "jane.smith@example.com",
  date: new Date(), // Today
},
{
  id: "3",
  name: "Alice Johnson",
  direction: "alice.johnson@example.com",
  date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
}
  ]


export default function DebugComponentsScreen() {
  const [text, setText] = useState("");
  const {toggleTheme,logout} = useAuthContext()
  return (
    <ScrollContainer>
      <ViewContainer>
        <InputText value={text} onChangeText={setText} label="Busca un cliente" style={styles.viewInput}/>
        {props.map(e=><ListClient {...e} key={e.id} />)}
        
        <ClientProfileCard />
      </ViewContainer>
      <ViewContainer>
        <PrimaryButton title="change theme" onPress={toggleTheme} />
        <DangerButton title="log out" onPress={logout}/>
      </ViewContainer>
    </ScrollContainer>
  );
}
const styles = StyleSheet.create({
  viewInput: {
    marginBottom:10,
  }
})