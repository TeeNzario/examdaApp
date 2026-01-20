import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '@/services/authService';

const LoginScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    // Clear previous errors
    setError('');

    // Validation
    if (!username.trim() || !password.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      router.replace('/home');
    } catch (error) {
      console.error('Login failed:', error);
      
      // Check if it's an authentication error
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('invalid') ||
          errorMessage.includes('incorrect') ||
          errorMessage.includes('401')
        ) {
          setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        } else {
          setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
      } else {
        setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Examda</Text>
        <Text style={styles.subtitle}>ยินดีต้อนรับ</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Error Message */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="ชื่อผู้ใช้"
          placeholderTextColor="#C4C4C4"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!isLoading}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="รหัสผ่าน"
          placeholderTextColor="#C4C4C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!isLoading}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เริ่มเลย'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B7AC7',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  formContainer: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
  },
  button: {
    backgroundColor: '#FEB05D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;