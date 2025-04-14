import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '../../helpers/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const {colors}=useThemeColor()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        headerBackgroundContainerStyle:{backgroundColor:colors.background},
        // headerTintColor:colors.background,
        // headerBackgroundContainerStyle:{backgroundColor:colors.background},
        tabBarInactiveBackgroundColor:colors.background,
        tabBarActiveBackgroundColor:colors.card,
        tabBarStyle:{borderColor:colors.shadow},
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cuentas"
        options={{
          title: 'Cuentas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'id-card' : 'id-card-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
      {__DEV__&&<Tabs.Screen
        name="debug"
        options={{
          title: 'debug',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bug' : 'bug-outline'} color={color} />
          ),
          headerShown:false,
        }}
      />}
    </Tabs>
  );
}
