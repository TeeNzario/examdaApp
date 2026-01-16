import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ExamCard } from '@/components/exam/ExamCard';
import { useState } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

  // Sample exam data
  const exams = [
    { id: 1, title: 'Computer Programming I', time: '13:00 น.', date: '25 มีนวคม 2568' },
    { id: 2, title: 'Computer Programming I', time: '13:00 น.', date: '25 มีนวคม 2568' },
    { id: 3, title: 'Computer Programming I', time: '13:00 น.', date: '25 มีนวคม 2568' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.greeting}>
          <Text style={[styles.greetingSmall, { color: '#999' }]}>Hello</Text>
          <Text style={[styles.greetingName, { color: colors.text }]}>Teerapat</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>987</Text>
        </View>
      </View>

      {/* Good Morning Section */}
      <View style={styles.goodMorningSection}>
        <Text style={styles.goodMorningText}>GOOD MORNING!</Text>
      </View>

      {/* Exams Section */}
      <View style={styles.examsSection}>
        <View style={styles.examsHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            รายการสอบใกล้ๆ นี้
          </Text>
          <Pressable style={styles.menuButton}>
            <Text style={styles.menuIcon}>≡</Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'week' && { borderColor: '#FFA500', backgroundColor: '#FFA500' },
            ]}
            onPress={() => setActiveTab('week')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'week' ? { color: 'white' } : { color: '#FFA500' },
              ]}
            >
              สัปดาหนี่
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'month' && { borderColor: '#FFA500', backgroundColor: '#FFA500' },
            ]}
            onPress={() => setActiveTab('month')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'month' ? { color: 'white' } : { color: '#FFA500' },
              ]}
            >
              เดือนนี้
            </Text>
          </Pressable>
        </View>

        {/* Exam Cards */}
        <View style={styles.cardsContainer}>
          {exams.map((exam) => (
            <ExamCard
              key={exam.id}
              title={exam.title}
              time={exam.time}
              date={exam.date}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    flex: 1,
  },
  greetingSmall: {
    fontSize: 14,
    marginBottom: 4,
  },
  greetingName: {
    fontSize: 28,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  goodMorningSection: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B7FC4',
    borderRadius: 12,
    marginBottom: 24,
  },
  goodMorningText: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 2,
    textAlign: 'center',
  },
  examsSection: {
    marginBottom: 40,
  },
  examsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardsContainer: {
    gap: 8,
  },
});
