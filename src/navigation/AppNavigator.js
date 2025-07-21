import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Icon fetcher
const getIcon = (route, focused) => {
  if (!route || !route.name) return '';
  switch (route.name) {
    case 'Home':
      return focused
        ? 'https://img.icons8.com/ios-filled/50/home.png'
        : 'https://img.icons8.com/ios/50/home.png';
    case 'Cart':
      return focused
        ? 'https://img.icons8.com/ios-filled/50/shopping-cart.png'
        : 'https://img.icons8.com/ios/50/shopping-cart.png';
    case 'Profile':
      return focused
        ? 'https://img.icons8.com/ios-filled/50/user.png'
        : 'https://img.icons8.com/ios/50/user.png';
    default:
      return 'https://img.icons8.com/ios/50/question-mark.png';
  }
};

// Bottom Tabs
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => (
        <Image
          source={{ uri: getIcon(route, focused) }}
          style={{ width: 24, height: 24, resizeMode: 'contain' }}
        />
      ),
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  // Check login on mount
  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
