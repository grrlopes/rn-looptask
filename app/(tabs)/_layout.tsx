import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { CheckBox } from '@rneui/base';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [isSmallChecked, setSmallChecked] = useState(false);
  const [isLargeChecked, setLargeChecked] = useState(false);
  const [selectedIndex, setIndex] = useState(0);
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          backgroundColor: "#E0E0E0",
          borderTopWidth: 0,
          padding: 0,
        },
        headerStyle: { backgroundColor: "#757575" },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors['light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="barcode"
        options={{
          title: '',
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="camera-retro" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-check-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
