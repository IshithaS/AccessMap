import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MOCK_LOCATIONS } from '../../data/mockLocations';

export default function ExploreScreen() {
  const router = useRouter();
  
  // Start with a default region (Charlotte, NC) while waiting for GPS
  const [region, setRegion] = useState({
    latitude: 35.2271,
    longitude: -80.8431,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    (async () => {
      // Ask the user for permission to use their GPS
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // If granted, grab the current coordinates and center the map
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05, // Zoomed in a bit closer
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // Safe fallback for web testing (this won't trigger since you are on your phone)
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <Text style={styles.webTitle}>🗺️ Interactive Map</Text>
        <Text style={styles.webText}>
          Native maps require a physical phone to render. Open this project in Expo Go!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={region} 
        showsUserLocation={true} // Displays the blue dot
        showsMyLocationButton={true} // Adds a button to snap back to the user
      >
        {MOCK_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude || 35.2271 + (Math.random() * 0.05 - 0.025),
              longitude: location.longitude || -80.8431 + (Math.random() * 0.05 - 0.025),
            }}
            title={location.name}
            description={location.type}
            onCalloutPress={() => router.push(`/location/${location.id}`)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  webContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 20 },
  webTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  webText: { fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 400, lineHeight: 24 },
});