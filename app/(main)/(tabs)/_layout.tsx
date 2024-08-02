import { Tabs, useNavigation } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/ui/tab-bar-icon';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import { TouchableWithoutFeedback } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: Colors[colorScheme].background,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveBackgroundColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        headerLeft(props) {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <View
                style={{
                  borderRadius: 4,
                  paddingRight: 8,
                  paddingLeft: 14,
                  paddingVertical: 6,
                }}
              >
                <Ionicons
                  name='menu'
                  size={28}
                  style={[{
                    color: Colors[colorScheme].tint,
                    marginBottom: -2,
                  }]}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
