import { StyleSheet } from 'react-native';
import { ScrollContainer, ViewContainer } from '@/components/ui/Container/ContainerComponents';
import { InputText } from '@/components/ui/inputs/InputText';
import ListClient, { TListClient } from '@/components/container/ListClient';
import { useState } from 'react';
import { fakeListClient } from '@helpers/moock/devConstants';



export default function TabTwoScreen() {
    const [text, setText] = useState("");
    const list = fakeListClient.filter(e=>e.name.includes(text)||e.direction.includes(text))

  return (
    <ScrollContainer>
      <ViewContainer>
        <InputText value={text} onChangeText={setText} label="Busca un cliente"/>
        {list.map(e=><ListClient {...e} key={e.id} />)}        
      </ViewContainer>
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
