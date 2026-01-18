import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { examService } from '@/services/examService';
import { Exam } from '@/types/exam';

export default function EditExamScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // Edit states
  const [examName, setExamName] = useState('');
  const [description, setDescription] = useState('');
  const [examDateTime, setExamDateTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadExam();
  }, [id]);

  const loadExam = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const allExams = await examService.getAll();
      const foundExam = allExams.find((e) => e.id === parseInt(id));
      if (foundExam) {
        setExam(foundExam);
        setExamName(foundExam.name);
        setDescription(foundExam.description || '');
        setExamDateTime(foundExam.examDateTime);
      }
    } catch (error) {
      console.error('Failed to load exam:', error);
      alert('ไม่สามารถโหลดข้อมูลการสอบได้');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!examName.trim() || !examDateTime.trim()) {
      alert('กรุณากรอกชื่อการสอบและเลือกวัน-เวลาสอบ');
      return;
    }

    if (!exam) return;

    setIsSaving(true);
    try {
      await examService.update(exam.id, {
        name: examName,
        description: description || undefined,
        examDateTime,
      });

      alert('บันทึกการเปลี่ยนแปลงสำเร็จ');
      setIsEditing(false);
      loadExam();
    } catch (error) {
      console.error('Failed to save exam:', error);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (exam) {
      setExamName(exam.name);
      setDescription(exam.description || '');
      setExamDateTime(exam.examDateTime);
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.text }}>กำลังโหลด...</Text>
        </View>
      </View>
    );
  }

  if (!exam) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.text }}>ไม่พบข้อมูลการสอบ</Text>
        </View>
        <View style={styles.actionBar}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>BACK</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#5B7FC4' }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Card Container */}
        <View style={styles.card}>
          {/* Exam Name Section */}
          <View style={styles.section}>
            <Text style={styles.label}>ชื่อการสอบ</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={examName}
                onChangeText={setExamName}
                placeholder="ชื่อการสอบ"
              />
            ) : (
              <View style={styles.displayValue}>
                <Text style={styles.displayText}>{examName}</Text>
              </View>
            )}
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.label}>คำอธิบาย</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="คำอธิบาย"
                multiline
              />
            ) : (
              <View style={styles.displayValue}>
                <Text style={styles.displayText}>{description || '-'}</Text>
              </View>
            )}
          </View>

          {/* Date Time Section */}
          <View style={styles.section}>
            <Text style={styles.label}>เลือกวัน-เวลาสอบ</Text>
            {isEditing ? (
              <Pressable
                style={styles.input}
                onPress={() => setShowDateTimePicker(true)}
              >
                <Text style={styles.inputText}>{examDateTime || 'เลือกวัน-เวลา'}</Text>
              </Pressable>
            ) : (
              <View style={styles.displayValue}>
                <Text style={styles.displayText}>{examDateTime}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <Pressable
          style={styles.backButton}
          onPress={isEditing ? handleCancel : () => router.back()}
          disabled={isSaving}
        >
          <Text style={styles.backButtonText}>{isEditing ? 'ยกเลิก' : 'BACK'}</Text>
        </Pressable>
        <Pressable
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'บันทึก...' : isEditing ? 'SAVE' : 'EDIT'}
          </Text>
        </Pressable>
      </View>

      {/* Date Time Picker Modal */}
      <Modal
        visible={showDateTimePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDateTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>เลือกวัน-เวลาสอบ</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="13:00 น. 25 ธันวาคม 2568"
              value={examDateTime}
              onChangeText={setExamDateTime}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setShowDateTimePicker(false)}
              >
                <Text style={styles.modalButtonText}>ยืนยัน</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowDateTimePicker(false)}
              >
                <Text style={styles.modalCancelButtonText}>ยกเลิก</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B7FC4',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  displayValue: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 45,
  },
  displayText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFA500',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
    minHeight: 45,
  },
  inputText: {
    fontSize: 14,
    color: '#000',
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
    gap: 12,
  },
  backButton: {
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 20,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  modalCancelButton: {
    backgroundColor: '#E0E0E0',
  },
  modalCancelButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '700',
  },
});
