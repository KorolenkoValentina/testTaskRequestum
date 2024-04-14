
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from 'react-native';


const STORAGE_KEY = '@MyApp:userData';
const SESSION_STORAGE_KEY = '@MyApp:sessionData';

export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    console.log('User data saved successfully:', userData);
  } catch (error) {
    console.error('Error saving user data to asyncStorage:', error);
  }
};

export const getUserData = async () => {
  try {
    const userDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
    if (userDataJSON === null) {
      console.log('No user data found');
      return null;
    }
    const userData = JSON.parse(userDataJSON);
    console.log('User data retrieved successfully:', userData);
    return userData;
  } catch (error) {
    console.error('Error getting user data from asyncStorage:', error);
    return null;
  }
};

export const saveSessionData = async (sessionData: any) => {
  try {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    console.log('Session data saved successfully:', sessionData);
  } catch (error) {
    console.error('Error saving session data to asyncStorage:', error);
  }
};

export const getSessionData = async () => {
  try {
    const sessionDataJSON = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionDataJSON === null) {
      console.log('No session data found');
      return null;
    }
    const sessionData = JSON.parse(sessionDataJSON);
    console.log('Session data retrieved successfully:', sessionData);
    return sessionData;
  } catch (error) {
    console.error('Error getting session data from asyncStorage:', error);
    return null;
  }
};

export const clearSessionData = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    console.log('Session data cleared successfully');
  } catch (error) {
    console.error('Error clearing session data from asyncStorage:', error);
  }
};


export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordPattern.test(password);
};

export const shakeButton = (shakeAnimation: Animated.Value) => {
  Animated.sequence([
    Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
  ]).start();
};


