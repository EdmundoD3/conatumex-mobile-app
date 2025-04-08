import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { Link } from 'expo-router';
import { TextGeneric } from '@/components/ui/texts/TextComponents';
import { ScrollContainer, ViewContainer } from '@/components/ui/Container/ContainerComponents';

export default function TabTwoScreen() {
  return (
    <ScrollContainer>
      <ViewContainer style={styles.titleContainer}>
        <TextGeneric>Explore</TextGeneric>
      </ViewContainer>
      <TextGeneric>This app includes example code to help you get started.</TextGeneric>
      <Link href={{ pathname: './cuentas/clientes' }}>Go to Details</Link>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
