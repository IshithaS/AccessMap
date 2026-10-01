import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AttributeCard from '../../../src/components/AttributeCard';
import { MOCK_LOCATIONS } from '../../../src/data/mockLocations';

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const location = MOCK_LOCATIONS.find((loc) => loc.id === id);

  const [modalVisible, setModalVisible] = useState(false);
  const [newRecordTitle, setNewRecordTitle] = useState('');
  const [localFacts, setLocalFacts] = useState(location?.facts || []);

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

  const handleAddRecord = () => {
    if (!newRecordTitle.trim()) return;
    
    const newFact = {
      id: Math.random().toString(),
      title: newRecordTitle,
      description: 'Submitted by user',
    };
    
    setLocalFacts([...localFacts, newFact]);
    setNewRecordTitle('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable 
            onPress={() => router.back()} 
            {...{ onClick: () => router.back() }}
            style={styles.backBtn}
          >
            <Text style={styles.backBtnText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>{location.name}</Text>
          <Text style={styles.subtitle}>{location.type} • {location.address}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Accessibility Information</Text>
          
          {localFacts.map((fact) => (
            <AttributeCard key={fact.id} fact={fact} />
          ))}

          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addBtnText}>+ Add New Record</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>New Accessibility Record</Text>
            
            <TextInput
              style={styles.input}
              placeholder="e.g., Automatic doors at main entrance..."
              value={newRecordTitle}
              onChangeText={setNewRecordTitle}
              placeholderTextColor="#94a3b8"
              autoFocus
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => {
                  setModalVisible(false);
                  setNewRecordTitle('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.submitBtn} 
                onPress={handleAddRecord}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#f1f5f9', borderRadius: 8, marginBottom: 16 },
  backBtnText: { color: '#334155', fontWeight: '600', fontSize: 14 },
  title: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#64748b' },
  content: { padding: 20, paddingBottom: 60 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 16 },
  errorText: { fontSize: 18, color: '#ef4444', textAlign: 'center', marginTop: 60, marginBottom: 20 },
  
  addBtn: { backgroundColor: '#e0e7ff', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: '#c7d2fe' },
  addBtnText: { color: '#4f46e5', fontWeight: '700', fontSize: 16 },
  
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(15, 23, 42, 0.4)' },
  modalView: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 20 },
  input: { 
    backgroundColor: '#f8fafc', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 16, 
    marginBottom: 24,
    color: '#0f172a' // Explicitly set text color to dark gray
  },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: { flex: 1, padding: 16, borderRadius: 12, backgroundColor: '#f1f5f9', marginRight: 12, alignItems: 'center' },
  cancelBtnText: { color: '#475569', fontWeight: '700', fontSize: 16 },
  submitBtn: { flex: 1, padding: 16, borderRadius: 12, backgroundColor: '#4f46e5', alignItems: 'center' },
  submitBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
});