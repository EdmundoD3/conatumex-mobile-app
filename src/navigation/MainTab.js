import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import SettingsNav from './SettingNav';
import ClientSearch from '../screen/Client/clientSearch';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Client" component={ClientSearch} />
      <Tab.Screen name="Settings" component={SettingsNav} />
    </Tab.Navigator>
  );
}