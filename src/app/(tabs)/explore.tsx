import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MOCK_LOCATIONS } from '../../data/mockLocations';

// Helper function to pick an emoji based on the location type
const getMarkerEmoji = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('hospital') || t.includes('health')) return '🏥';
  if (t.includes('library') || t.includes('civic')) return '📚';
  if (t.includes('restaurant') || t.includes('food')) return '🍽️';
  if (t.includes('transit') || t.includes('station')) return '🚆';
  if (t.includes('park')) return '🌳';
  return '📍'; // Default fallback
};

export default function ExploreScreen() {
  const router = useRouter();
  
  const [region, setRegion] = useState({
    latitude: 35.2271,
    longitude: -80.8431,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

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
        showsUserLocation={true}
        showsMyLocationButton={true}
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
          >
            {/* Custom Marker View */}
            <View style={styles.customMarker}>
              <Text style={styles.markerText}>{getMarkerEmoji(location.type)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  customMarker: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0f172a',
    // Shadows to make the pins pop off the map
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    fontSize: 20,
  },
  webContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 20 },
  webTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  webText: { fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 400, lineHeight: 24 },
});