import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { TextTitle } from '@/components/ui/texts/TextComponents';
import { LinkGeneric } from '@/components/ui/Link/LinksComponents';
import { ViewContainer } from '@/components/ui/Container/ContainerComponents';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ViewContainer style={styles.container}>
        <TextTitle >This screen doesn't exist.</TextTitle>
          <LinkGeneric url='/'>Go to home screen!</LinkGeneric>
      </ViewContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
