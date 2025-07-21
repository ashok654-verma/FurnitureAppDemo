import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // ✅ Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        navigation.replace('Login'); // redirect if no user
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Ashok Kumar</Text>
      <Text style={styles.email}>ashok@example.com</Text>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefefe',
    paddingTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  menu: {
    width: '90%',
    marginVertical: 30,
  },
  menuItem: {
    padding: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutBtn: {
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
