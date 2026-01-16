import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface Exam {
  id: string;
  title: string;
  time: string;
  date: string;
  subject: string;
}

export default function ExamIndexScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Sample exam data
  const exams: Exam[] = [
    {
      id: '1',
      title: 'Computer Programming I',
      time: '13:00 น.',
      date: '25 มีนวคม 2568',
      subject: 'สอบนบน 2 กิ่ง 3',
    },
    {
      id: '2',
      title: 'Computer Programming I',
      time: '13:00 น.',
      date: '25 มีนวคม 2568',
      subject: 'สอบนบน 2 กิ่ง 3',
    },
    {
      id: '3',
      title: 'Computer Programming I',
      time: '13:00 น.',
      date: '25 มีนวคม 2568',
      subject: 'สอบนบน 2 กิ่ง 3',
    },
    {
      id: '4',
      title: 'Computer Programming I',
      time: '13:00 น.',
      date: '25 มีนวคม 2568',
      subject: 'สอบนบน 2 กิ่ง 3',
    },
    {
      id: '5',
      title: 'Computer Programming I',
      time: '13:00 น.',
      date: '25 มีนวคม 2568',
      subject: 'สอบนบน 2 กิ่ง 3',
    },
    {
      id: '6',
      title: 'Computer Programming I',
      time: '13:00 น.',
      date: '25 มีนวคม 2568',
      subject: 'สอบนบน 2 กิ่ง 3',
    },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleCreateExam = () => {
    router.push('/exam/create');
  };

  const handleEditExam = (id: string) => {
    router.push(`/exam/${id}`);
  };

  const handleStartExam = (id: string) => {
    router.push(`/exam/${id}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#5B7FC4' }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {exams.map((exam) => (
          <View key={exam.id} style={styles.examCard}>
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <View style={styles.titleSection}>
                  <Text style={styles.examTitle}>{exam.title}</Text>
                  <View style={styles.timeAndDate}>
                    <View style={styles.timeBadge}>
                      <Text style={styles.timeBadgeText}>{exam.time}</Text>
                    </View>
                    <Text style={styles.dateText}>{exam.date}</Text>
                  </View>
                  <Text style={styles.subjectText}>{exam.subject}</Text>
                </View>
                <Pressable
                  style={styles.editButton}
                  onPress={() => handleEditExam(exam.id)}
                >
                  <Text style={styles.editIcon}>✎</Text>
                </Pressable>
              </View>
            </View>
            <Pressable
              style={styles.startButton}
              onPress={() => handleStartExam(exam.id)}
            >
              <Text style={styles.startButtonText}>เริ่มสอบ</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>BACK</Text>
        </Pressable>
        <Pressable style={styles.createButton} onPress={handleCreateExam}>
          <Text style={styles.createButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  examCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  timeAndDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  timeBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  timeBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  subjectText: {
    fontSize: 11,
    color: '#999',
  },
  editButton: {
    backgroundColor: '#333',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  editIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#5B7FC4',
  },
  backButton: {
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  createButton: {
    backgroundColor: '#FFA500',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '300',
  },
});
