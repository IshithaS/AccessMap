import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0f172a' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: () => <Text>🏠</Text> 
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Map',
          tabBarIcon: () => <Text>🗺️</Text> 
        }} 
      />
    </Tabs>
  );
}