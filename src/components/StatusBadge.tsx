import { StyleSheet, Text, View } from 'react-native';
import { VerificationStatus } from '../types/accessibility';

interface Props {
  status: VerificationStatus;
}

const STATUS_CONFIG: Record<
  VerificationStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  facility_reported: {
    label: 'Facility Reported',
    bg: '#dcfce7',
    text: '#166534',
    border: '#86efac',
  },
  official_source: {
    label: 'Official Source',
    bg: '#e0f2fe',
    text: '#075985',
    border: '#7dd3fc',
  },
  community_reported: {
    label: 'Community Reported',
    bg: '#fef3c7',
    text: '#92400e',
    border: '#fde68a',
  },
  ai_extracted: {
    label: 'AI Extracted',
    bg: '#f3e8ff',
    text: '#6b21a8',
    border: '#d8b4fe',
  },
  conflicting: {
    label: 'Conflicting Reports',
    bg: '#fee2e2',
    text: '#991b1b',
    border: '#fca5a5',
  },
  unknown: {
    label: 'Needs Confirmation',
    bg: '#f1f5f9',
    text: '#475569',
    border: '#cbd5e1',
  },
};

export default function StatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.unknown;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Verification status: ${config.label}`}
    >
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});