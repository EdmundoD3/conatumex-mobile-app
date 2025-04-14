import { ScrollContainer, ViewContainer } from "@ui/Container/ContainerComponents";
import { LinkRouter } from "@/components/ui/Link/LinksComponents";
import { TextTitle } from "@/components/ui/texts/TextComponents";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DemoRepository } from "@helpers/moock/MoockRepositorys";
import { isDemoMode } from "@constants/keyStorage";
import { useEffect, useState } from "react";
import { TListClient } from "@/components/container/ListClient";
import ClientProfileCard from "@/components/container/ClientProfileCard";
const repository = new DemoRepository()
interface ClienteParams {
  id: string;
}
export default function ClientSearch() {
  const [clientData, setClientData] = useState<TListClient>();
  const params = useLocalSearchParams();
  const id = params.id as string;
  console.log(id);
  useEffect(() => {
    const client = repository.getById(id)
    console.log(client);
    setClientData(client)
    return () => {
      
    };
  }, []);
  
  console.log(clientData);
  return (
    <ScrollContainer
    >
      <ViewContainer style={styles.titleContainer}>
        <ClientProfileCard client={clientData} />
      </ViewContainer>
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
