import { StyleSheet } from 'react-native';
import { ScrollContainer, ViewContainer } from '@/src/components/ui/Container/ContainerComponents';
import { TextParagraph } from '@/src/components/ui/texts/TextComponents';

export default function TabTwoScreen() {
  return (
    <ScrollContainer
      >
      <ViewContainer style={styles.titleContainer}>
        <TextParagraph>Explore</TextParagraph>
      </ViewContainer>
      {/* <TextParagraph>This app includes example code to help you get started.</TextParagraph>
      <Collapsible title="File-based routing">
        <TextParagraph>
          This app has two screens:{' '}
          <TextParagraph type="defaultSemiBold">app/(tabs)/index.tsx</TextParagraph> and{' '}
          <TextParagraph type="defaultSemiBold">app/(tabs)/explore.tsx</TextParagraph>
        </TextParagraph>
        <TextParagraph>
          The layout file in <TextParagraph type="defaultSemiBold">app/(tabs)/_layout.tsx</TextParagraph>{' '}
          sets up the tab navigator.
        </TextParagraph>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <TextParagraph type="link">Learn more</TextParagraph>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <TextParagraph>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <TextParagraph type="defaultSemiBold">w</TextParagraph> in the terminal running this project.
        </TextParagraph>
      </Collapsible>
      <Collapsible title="Images">
        <TextParagraph>
          For static images, you can use the <TextParagraph type="defaultSemiBold">@2x</TextParagraph> and{' '}
          <TextParagraph type="defaultSemiBold">@3x</TextParagraph> suffixes to provide files for
          different screen densities
        </TextParagraph>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <TextParagraph type="link">Learn more</TextParagraph>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <TextParagraph>
          Open <TextParagraph type="defaultSemiBold">app/_layout.tsx</TextParagraph> to see how to load{' '}
          <TextParagraph style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </TextParagraph>
        </TextParagraph>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <TextParagraph type="link">Learn more</TextParagraph>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <TextParagraph>
          This template has light and dark mode support. The{' '}
          <TextParagraph type="defaultSemiBold">useColorScheme()</TextParagraph> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </TextParagraph>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <TextParagraph type="link">Learn more</TextParagraph>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <TextParagraph>
          This template includes an example of an animated component. The{' '}
          <TextParagraph type="defaultSemiBold">components/HelloWave.tsx</TextParagraph> component uses
          the powerful <TextParagraph type="defaultSemiBold">react-native-reanimated</TextParagraph>{' '}
          library to create a waving hand animation.
        </TextParagraph>
        {Platform.select({
          ios: (
            <TextParagraph>
              The <TextParagraph type="defaultSemiBold">components/ParallaxScrollView.tsx</TextParagraph>{' '}
              component provides a parallax effect for the header image.
            </TextParagraph>
          ),
        })}
      </Collapsible> */}
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
