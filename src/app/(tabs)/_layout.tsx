import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0f172a' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: () => <span>🏠</span> // Temporary web-safe icons
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Map',
          tabBarIcon: () => <span>🗺️</span> 
        }} 
      />
    </Tabs>
  );
}