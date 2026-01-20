import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { examService } from '@/services/examService';
import { useEffect, useState } from 'react';
import { Exam } from '@/types/exam';


export default function ExamIndexScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [exams, setExams] = useState<Array<Exam>>([]);

  // Sample exam data
  useEffect(() => {
    examService.getAll()
      .then((data) => setExams(data))
      .catch((error) => console.error(error));
  }
  , []);
  const handleBackPress = () => {
    router.replace('/home');
  };

  const handleCreateExam = () => {
    router.replace('/exam/create');
  };

  const handleEditExam = (id: string) => {
    router.replace(`/exam/${id}`);
  };

  const handleFinishExam = (id: string) => {
    // router.push(`/exam/${id}`); //change later to exam taking screen
  };

  return (
    <View style={[styles.container, { backgroundColor: '#5B7FC4' }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {exams.map((exam) => { 
          const dateTime = new Date(exam.examDateTime);
          const time = dateTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
          const date = dateTime.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });

          return (
          <View key={exam.id} style={styles.examCard}>
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <View style={styles.titleSection}>
                  <Text style={styles.examTitle}>{exam.name}</Text>
                  <View style={styles.timeAndDate}>
                    <View style={styles.timeBadge}>
                      <Text style={styles.timeBadgeText}>{time}</Text>
                    </View>
                    <Text style={styles.dateText}>{date}</Text>
                  </View>
                  <Text style={styles.subjectText}>{exam.description}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => handleEditExam(exam.id.toString())}
                >
                  <Text style={styles.editIcon}>✎</Text>
                </Pressable>
              <Pressable
              style={styles.startButton}
              onPress={() => handleFinishExam(exam.id.toString())}
            >
              <Text style={styles.startButtonText}>เสร็จแล้ว</Text>
            </Pressable>
            </View>
             </View>
            </View>
          </View>
        );
    })}
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
    marginTop: 20,
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
