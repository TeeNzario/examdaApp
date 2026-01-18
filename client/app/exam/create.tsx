import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { examService } from '@/services/examService';

const NOTIFICATION_OPTIONS = [
  { label: 'ก่อน 30 นาที', minutes: 30 },
  { label: 'ก่อน 1 ชั่วโมง', minutes: 60 },
  { label: 'ก่อน 1 วัน', minutes: 1440 },
];

export default function CreateExamScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [examName, setExamName] = useState('');
  const [description, setDescription] = useState('');

  // ✅ correct state
  const [examDate, setExamDate] = useState<Date | null>(null);

  const [selectedReminders, setSelectedReminders] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleReminderToggle = (minutes: number) => {
    setSelectedReminders((prev) =>
      prev.includes(minutes)
        ? prev.filter((m) => m !== minutes)
        : [...prev, minutes]
    );
  };

  // ✅ format only for UI
  const formatDateTime = (date: Date) => {
    const buddhistYear = date.getFullYear() + 543;
    return (
      format(date, "HH:mm 'น.' d MMMM", { locale: th }) +
      ` ${buddhistYear}`
    );
  };

  const onChangeDate = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (!selected) return;

    setExamDate((prev) => {
      const base = prev ?? new Date();
      const newDate = new Date(base);
      newDate.setFullYear(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      );
      return newDate;
    });

    // On Android, automatically show time picker after date
    if (Platform.OS === 'android') {
      setTimeout(() => setShowTimePicker(true), 100);
    }
  };

  const onChangeTime = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (!selected) return;

    setExamDate((prev) => {
      const base = prev ?? new Date();
      const newDate = new Date(base);
      newDate.setHours(selected.getHours(), selected.getMinutes());
      return newDate;
    });
  };

  const handleSave = async () => {
    if (!examName.trim() || !examDate) {
      alert('กรุณากรอกชื่อการสอบและเลือกวัน-เวลาสอบ');
      return;
    }

    setIsLoading(true);
    try {
      const reminderMinutes =
        selectedReminders.length > 0 ? selectedReminders[0] : 30;

      await examService.create({
        name: examName,
        description: description || undefined,
        examDateTime: examDate.toISOString(), // ✅ backend-safe
        remindBeforeMinutes: reminderMinutes,
      });

      alert('สร้างการสอบสำเร็จ');
      router.back();
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการสร้างการสอบ');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Exam Name */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>ชื่อการสอบ</Text>
          <TextInput
            style={styles.input}
            placeholder="Computer Programming I"
            value={examName}
            onChangeText={setExamName}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>คำอธิบาย</Text>
          <TextInput
            style={styles.input}
            placeholder="อ่อนบกที่ 2 กิน 3"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>
            เลือกวัน-เวลาสอบ
          </Text>

          <Pressable
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: examDate ? colors.text : '#999' }}>
              {examDate
                ? formatDateTime(examDate)
                : 'เลือกวันและเวลา'}
            </Text>
          </Pressable>
        </View>

        {/* Reminders */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>
            ตั้งการแจ้งเตือน
          </Text>
          <View style={styles.notificationOptions}>
            {NOTIFICATION_OPTIONS.map((option) => (
              <Pressable
                key={option.minutes}
                style={[
                  styles.notificationButton,
                  selectedReminders.includes(option.minutes) &&
                    styles.notificationButtonActive,
                ]}
                onPress={() => handleReminderToggle(option.minutes)}
              >
                <Text
                  style={{
                    color: selectedReminders.includes(option.minutes)
                      ? 'white'
                      : '#FFA500',
                    fontWeight: '600',
                  }}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>BACK</Text>
        </Pressable>
        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'กำลังบันทึก...' : 'SAVE'}
          </Text>
        </Pressable>
      </View>

      {/* Native Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={examDate ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          locale="th-TH"
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={examDate ?? new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeTime}
          locale="th-TH"
        />
      )}

      {/* iOS Date Picker Overlay */}
      {Platform.OS === 'ios' && showDatePicker && (
        <View style={styles.iosOverlay}>
          <Pressable
            style={styles.iosButton}
            onPress={() => {
              setShowDatePicker(false);
              setShowTimePicker(true);
            }}
          >
            <Text style={styles.iosButtonText}>ถัดไป</Text>
          </Pressable>
          <Pressable
            style={[styles.iosButton, styles.iosCancelButton]}
            onPress={() => setShowDatePicker(false)}
          >
            <Text style={styles.iosCancelButtonText}>ยกเลิก</Text>
          </Pressable>
        </View>
      )}

      {/* iOS Time Picker Overlay */}
      {Platform.OS === 'ios' && showTimePicker && (
        <View style={styles.iosOverlay}>
          <Pressable
            style={styles.iosButton}
            onPress={() => setShowTimePicker(false)}
          >
            <Text style={styles.iosButtonText}>เสร็จสิ้น</Text>
          </Pressable>
          <Pressable
            style={[styles.iosButton, styles.iosCancelButton]}
            onPress={() => {
              setShowTimePicker(false);
              setExamDate(null);
            }}
          >
            <Text style={styles.iosCancelButtonText}>ยกเลิก</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 120 },
  section: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  notificationOptions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  notificationButton: {
    borderWidth: 1.5,
    borderColor: '#FFA500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  notificationButtonActive: { backgroundColor: '#FFA500' },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#5B7FC4',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  backButtonText: { color: 'white', fontWeight: '700' },
  saveButtonText: { color: 'white', fontWeight: '700' },
  iosOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  iosButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  iosCancelButton: {
    backgroundColor: '#E0E0E0',
  },
  iosButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  iosCancelButtonText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 14,
  },
});
