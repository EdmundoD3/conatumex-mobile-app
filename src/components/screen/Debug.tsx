import { StyleSheet } from "react-native";
import ListClient, { TListClient } from "@/components/container/ListClient";
import ClientProfileCard from "@/components/container/ClientProfileCard";
import { useAuthContext } from "@/context/AuthContext";
import { DangerButton, OutlineButton } from "@ui/Buttons/CustomButtons";
import PaidForm from "@/components/container/PaidForm";
import {
  KeyboardAvoidingContainer,
  ScrollContainer,
  ViewContainer,
} from "@ui/Container/ContainerComponents";
import { InputText } from "@ui/inputs/InputText";
import { TextTitle } from "@ui/texts/TextComponents";
import { LinkGeneric, LinkRouter } from "../ui/Link/LinksComponents";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function DebugScreen() {
  const { setTheme, theme } = useAuthContext();
  const navigation = useNavigation()
    const { logout } = useAuthContext();

    useEffect(() => {
      // Cambia el título del tab padre
      navigation.getParent()?.setOptions({ title: 'Debug Components' });
    }, [navigation]);
  
  const falseClientProps: TListClient = {
    id: "./",
    name: "nombre de prueba hoy",
    direction: "direccion de prueba",
    date: new Date(),
  };
  const today = new Date(); // Fecha actual
  const tomorrow = new Date(today); // Clonar la fecha para no modificar la original
  const yesterday = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);
  const changeTheme = () => {
    const newTheme = theme == "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  return (
    <ScrollContainer
    >
      <TextTitle>Debug</TextTitle>
      <LinkRouter href={{pathname:"/debug/DebugComponents"}} >To DebugComponents</LinkRouter>
      <LinkRouter href={{pathname:"/debug/DebugFetch"}} >To Debug Fetch</LinkRouter>

      {/* <ViewContainer></ViewContainer> */}
      {/* <ViewContainer style={styles.stepContainer}>
        <TextTitle>Lista de clientess</TextTitle>
        <KeyboardAvoidingContainer
          style={[{ marginLeft: -24, marginRight: -24, marginBottom: 8 }]}
        >
          <InputText label="Buscar cliente: " />
        </KeyboardAvoidingContainer>

        <ListClient {...falseClientProps} />
        <ListClient
          {...{ ...falseClientProps, name: "mañana", date: tomorrow }}
        />
        <ListClient
          {...{ ...falseClientProps, name: "ayer", date: yesterday }}
        />
      </ViewContainer> */}
      {/* <ViewContainer style={styles.stepContainer}>
        <ClientProfileCard></ClientProfileCard>
      </ViewContainer> */}
      {/* <ViewContainer>
        <OutlineButton
          onPress={changeTheme}
          title={`tema: ${theme}`}
        ></OutlineButton>
      </ViewContainer> */}
      {/* <ViewContainer>
        <DangerButton title="Log-out" onPress={()=>logout()}>

        </DangerButton>
      </ViewContainer> */}
      {/* <ViewContainer>
        <PaidForm />
      </ViewContainer> */}
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
