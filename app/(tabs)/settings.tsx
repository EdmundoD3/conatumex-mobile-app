
import { ScrollContainer, ViewContainer } from "@/components/ui/Container/ContainerComponents";
import { TextGeneric } from "@/components/ui/texts/TextComponents";
import { Image, StyleSheet } from "react-native";

export default function settings() {
  return (
    <ScrollContainer>
      <ViewContainer>
        <TextGeneric>Hola</TextGeneric>
      </ViewContainer>
    </ScrollContainer>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
  },
});