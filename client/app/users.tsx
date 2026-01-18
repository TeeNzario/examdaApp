import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

const UserProfileScreen = () => {
  const handleInventory = () => {
    console.log('Navigate to Inventory');
    // เพิ่มโค้ดสำหรับการไปหน้า Inventory
  };

  const handleBack = () => {
    console.log('Go back');
    // เพิ่มโค้ดสำหรับการย้อนกลับ
  };

  const handleEditName = () => {
    console.log('Edit name');
    // เพิ่มโค้ดสำหรับการแก้ไขชื่อ
  };

  const handleEditEmail = () => {
    console.log('Edit email');
    // เพิ่มโค้ดสำหรับการแก้ไขอีเมล
  };

  const handleChangePassword = () => {
    console.log('Change password');
    // เพิ่มโค้ดสำหรับการเปลี่ยนรหัสผ่าน
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>

      {/* Username Title */}
      <Text style={styles.username}>Teerapat</Text>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ข้อมูลส่วนตัว</Text>

        {/* Name Field */}
        <TouchableOpacity style={styles.infoRow} onPress={handleEditName}>
          <View style={styles.infoContent}>
            <Text style={styles.label}>ชื่อ</Text>
            <Text style={styles.value}>Teerapat Jongjit</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Email Field */}
        <TouchableOpacity style={styles.infoRow} onPress={handleEditEmail}>
          <View style={styles.infoContent}>
            <Text style={styles.label}>อีเมล</Text>
            <Text style={styles.value}>teen.2555@gmail.com</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Password Field */}
        <TouchableOpacity style={styles.infoRow} onPress={handleChangePassword}>
          <View style={styles.infoContent}>
            <Text style={styles.label}>รหัสผ่าน</Text>
            <Text style={styles.value}>••••••••••••</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Inventory Button */}
      <TouchableOpacity style={styles.inventoryButton} onPress={handleInventory}>
        <Text style={styles.inventoryButtonText}>INVENTORY</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>BACK</Text>
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
});

export default UserProfileScreen;