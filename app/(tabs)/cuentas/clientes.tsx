import { ScrollContainer, ViewContainer } from "@ui/Container/ContainerComponents";
import { LinkRouter } from "@/components/ui/Link/LinksComponents";
import { TextTitle } from "@/components/ui/texts/TextComponents";
import { StyleSheet } from "react-native";

export default function ClientSearch() {
  return (
    <ScrollContainer
    >
      <ViewContainer style={styles.titleContainer}>
        <TextTitle>Welcome!</TextTitle>
        <LinkRouter href={{ pathname: '../cuentas' }}>Go to Details</LinkRouter>
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
