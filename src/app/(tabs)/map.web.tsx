import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreenWeb() {
  return (
    <View style={styles.webContainer}>
      <Text style={styles.webTitle}>🗺️ Interactive Map</Text>
      <Text style={styles.webText}>
        Native maps require a physical phone to render. To see this map, open this project in the Expo Go app on your iOS or Android device!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    padding: 20 
  },
  webTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 12 
  },
  webText: { 
    fontSize: 16, 
    color: '#64748b', 
    textAlign: 'center', 
    maxWidth: 400,
    lineHeight: 24 
  },
});