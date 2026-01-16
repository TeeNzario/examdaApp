import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ExamCardProps {
  title: string;
  time: string;
  date: string;
  onPress?: () => void;
}

export function ExamCard({ title, time, date, onPress }: ExamCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable 
      style={[styles.card, { backgroundColor: colors.background }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.details}>
        <View style={styles.timeBadge}>
          <Text style={styles.timeBadgeText}>{time}</Text>
        </View>
        <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
});
