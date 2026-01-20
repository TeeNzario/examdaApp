import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { fetchCurrentUser, updateUser, UserProfile } from '@/services/userService';

const UserProfileScreen = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleInventory = () => {
    console.log('Navigate to Inventory');
    // เพิ่มโค้ดสำหรับการไปหน้า Inventory
  };

  const handleBack = () => {
    console.log('Go back');
    // เพิ่มโค้ดสำหรับการย้อนกลับ
  };

  const handleEditName = () => {
    if (user) {
      setEditingField('name');
      setEditValue(`${user.first_name} ${user.last_name}`);
    }
  };

  const handleEditEmail = () => {
    if (user) {
      setEditingField('email');
      setEditValue(user.email || '');
    }
  };

  const handleSaveEdit = async () => {
    if (!user || !editingField || !editValue.trim()) {
      Alert.alert('Error', 'Please enter a value');
      return;
    }

    setIsSaving(true);
    try {
      let updateData: Partial<UserProfile> = {};

      if (editingField === 'name') {
        const [firstName, ...lastNameParts] = editValue.trim().split(' ');
        updateData = {
          first_name: firstName,
          last_name: lastNameParts.join(' ') || '',
        };
      } else if (editingField === 'email') {
        updateData = { email: editValue.trim() };
      }

      const updatedUser = await updateUser(updateData);
      setUser(updatedUser);
      setEditingField(null);
      setEditValue('');
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Error updating user:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleChangePassword = () => {
    console.log('Change password');
    // เพิ่มโค้ดสำหรับการเปลี่ยนรหัสผ่าน
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Edit Modal */}
      <Modal
        visible={editingField !== null}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingField === 'name' ? 'Edit Name' : 'Edit Email'}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={editingField === 'name' ? 'Enter full name' : 'Enter email'}
              editable={!isSaving}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelEdit}
                disabled={isSaving}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
                disabled={isSaving}
              >
                <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>

      {/* Username Title */}
      <Text style={styles.username}>
        {loading ? 'Loading...' : user ? `${user.first_name} ${user.last_name}` : 'Profile'}
      </Text>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ข้อมูลส่วนตัว</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Name Field */}
        <TouchableOpacity style={styles.infoRow} onPress={handleEditName}>
          <View style={styles.infoContent}>
            <Text style={styles.label}>ชื่อ</Text>
            <Text style={styles.value}>
              {loading ? 'Loading...' : user ? `${user.first_name} ${user.last_name}` : 'N/A'}
            </Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Email Field */}
        <TouchableOpacity style={styles.infoRow} onPress={handleEditEmail}>
          <View style={styles.infoContent}>
            <Text style={styles.label}>อีเมล</Text>
            <Text style={styles.value}>
              {loading ? 'Loading...' : user?.email || 'N/A'}
            </Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Password Field */}
        {/* <TouchableOpacity style={styles.infoRow} onPress={handleChangePassword}>
          <View style={styles.infoContent}>
            <Text style={styles.label}>รหัสผ่าน</Text>
            <Text style={styles.value}>••••••••••••</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity> */}
      </View>
{/* 
      <TouchableOpacity style={styles.inventoryButton} onPress={handleInventory}>
        <Text style={styles.inventoryButtonText}>INVENTORY</Text>
      </TouchableOpacity> */}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B7AC7',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFB380',
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 20,
    color: '#666666',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  inventoryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  inventoryButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#5B7AC7',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default UserProfileScreen;