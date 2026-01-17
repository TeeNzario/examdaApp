import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ExamCardProps {
  title: string;
  time: string;
  date: string;
  description: string;
  onPress?: () => void;
}

export function ExamCard({ title, time, date, description, onPress }: ExamCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable 
      style={[styles.card, { backgroundColor: 'white' }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.details}>
        <View style={styles.timeBadge}>
          <Text style={styles.timeBadgeText}>{time}</Text>
        </View>
        <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
     </View>
      <Text style={styles.descriptionText}>{description}</Text>
   </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  timeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 13,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});
