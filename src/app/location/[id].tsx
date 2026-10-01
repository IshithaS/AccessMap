import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AttributeCard from '../../../src/components/AttributeCard';
import { MOCK_LOCATIONS } from '../../../src/data/mockLocations';

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the specific location from our database using the ID in the URL
  const location = MOCK_LOCATIONS.find((loc) => loc.id === id);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Location not found.</Text>
        <Pressable 
          onPress={() => router.back()} 
          {...{ onClick: () => router.back() }}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>← Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable 
          onPress={() => router.back()} 
          {...{ onClick: () => router.back() }}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>← Back to Search</Text>
        </Pressable>
        <Text style={styles.title}>{location.name}</Text>
        <Text style={styles.subtitle}>{location.type} • {location.address}</Text>
      </View>

      {/* Accessibility Evidence List */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Accessibility Information</Text>
        
        {location.facts.map((fact) => (
          <AttributeCard key={fact.id} fact={fact} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  backBtnText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
});