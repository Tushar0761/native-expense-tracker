import { Stack, Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Expense Tracker',
          tabBarIcon: () => <Ionicons name={'add'} size={24} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Settings',
          tabBarIcon: () => <Ionicons name={'settings'} size={24} />,
        }}
      />
    </Tabs>
  );
}
