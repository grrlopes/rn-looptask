import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
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
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", gap: 30}}>
              <View>
                <Link href="../modals/stacktray" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus-circle"
                        size={25}
                        color={Colors['light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              </View>

              <View>
                <Link href="../modals/profile" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="bars"
                        size={30}
                        color={Colors['light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendarSearch"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-check-o" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
