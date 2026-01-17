import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ExamCard } from '@/components/exam/ExamCard';
import { useEffect, useState } from 'react';
import { examService } from '@/services/examService';
import { Exam } from '@/types/exam';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');
  const [exams, setExams] = useState<Array<Exam>>([]);


  useEffect(() => {
    examService.getAll()
    .then(setExams)
    .catch(console.error)
    // Fetch exams based on activeTab if needed
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.greeting}>
          <Text style={[styles.greetingSmall, { color: '#999' }]}>Hello</Text>
          <Text style={[styles.greetingName, { color: 'white' }]}>Teerapat</Text>
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
            <Text style={styles.menuIcon}>A</Text>
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
              activeTab === 'month' && { borderColor: Colors.light.yellowprimary, backgroundColor: Colors.light.yellowprimary },
            ]}
            onPress={() => setActiveTab('month')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'month' ? { color: 'white' } : { color: Colors.light.yellowprimary },
              ]}
            >
              เดือนนี้
            </Text>
          </Pressable>
        </View>

        {/* Exam Cards */}
        <View style={styles.cardsContainer}>
          {exams.map((exam) => {
            const dateTime = new Date(exam.examDateTime);
            const time = dateTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
            const date = dateTime.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
            
            return (
              <ExamCard
                key={exam.id}
                title={exam.name}
                time={time}
                date={date}
                description={exam.description}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
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
    backgroundColor: Colors.light.yellowprimary,
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
    backgroundColor: '#E8E8E8',
    borderRadius: 18,
    padding: 25,
  },
  examsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    fontWeight: '600',
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
    fontSize: 25,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.light.yellowprimary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardsContainer: {
    gap: 8,
  },
});
