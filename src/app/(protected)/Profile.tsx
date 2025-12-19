import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '../../store/AuthStore';

export default function Profile() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => logout() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {user && (
        <View style={styles.userInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.info}>{user.name}</Text>
          </View>
          
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAFAFA', // Light Cream background
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A', // Near Black
    marginBottom: 32,
    marginTop: 20,
  },
  userInfoContainer: {
    backgroundColor: '#FFFFFF', // Soft White Card
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    // Using your Card shadow style
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  infoRow: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA', // Creamy divider
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666', // Muted Text/Dark Gray
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1A1A1A', // Near Black
  },
  logoutButton: {
    height: 58,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  logoutButtonText: {
    color: '#FF3B30', 
    fontSize: 16,
    fontWeight: '700',
  },
});