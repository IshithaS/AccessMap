import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MOCK_LOCATIONS } from '../data/mockLocations';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredLocations = MOCK_LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AccessMap</Text>
        <Text style={styles.subtitle}>Know before you go.</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place or category..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <ScrollView 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredLocations.map((item) => (
          <Pressable 
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/location/${item.id}`)}
            {...{ onClick: () => router.push(`/location/${item.id}`) }}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.type} • {item.address}</Text>
            
            <View style={styles.factSummary}>
              <Text style={styles.factText}>
                🔍 {item.facts.length} Accessibility Records Available
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  title: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subtitle: { fontSize: 16, color: '#64748b', marginTop: 4 },
  searchContainer: { padding: 20 },
  searchInput: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)', elevation: 1 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)', elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#64748b', marginBottom: 12 },
  factSummary: { backgroundColor: '#f1f5f9', padding: 10, borderRadius: 8 },
  factText: { fontSize: 13, color: '#334155', fontWeight: '600' },
});