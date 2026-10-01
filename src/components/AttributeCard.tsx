import { StyleSheet, Text, View } from 'react-native';
import { AccessibilityFact } from '../types/accessibility';
import StatusBadge from './StatusBadge';

interface Props {
  fact: AccessibilityFact;
}

export default function AttributeCard({ fact }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.attributeTitle}>{fact.attribute}</Text>
        <StatusBadge status={fact.status} />
      </View>

      <Text style={styles.description}>{fact.description}</Text>

      {/* Show conflict alert if status is conflicting */}
      {fact.status === 'conflicting' && fact.conflictDetail && (
        <View style={styles.conflictBox}>
          <Text style={styles.conflictTitle}>⚠️ Discrepancy Note:</Text>
          <Text style={styles.conflictText}>{fact.conflictDetail}</Text>
        </View>
      )}

      {/* Source & Date Footer */}
      <View style={styles.footer}>
        <Text style={styles.metaText}>
          Source: <Text style={styles.metaBold}>{fact.sourceName}</Text>
        </Text>
        <Text style={styles.metaText}>Checked: {fact.lastChecked}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)', // Fixed shadow property
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
    flexWrap: 'wrap',
  },
  attributeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 12,
  },
  conflictBox: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  conflictTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991b1b',
    marginBottom: 2,
  },
  conflictText: {
    fontSize: 13,
    color: '#b91c1c',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
    flexWrap: 'wrap',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
  },
  metaBold: {
    fontWeight: '600',
    color: '#475569',
  },
});