import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authStore} from '../../stores/authStore';
import styles from './Style';

const SplashScreen = ({navigation}) => {
  const {isLoggedIn, role} = authStore(); // Ambil role dari authStore

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoggedIn) {
        // Cek role pengguna dan arahkan ke halaman yang sesuai
        if (role === 'admin') {
          navigation.replace('Dashboard');
        } else {
          navigation.replace('Home');
        }
      } else {
        navigation.replace('Login');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, role, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FEF0BE" barStyle="dark-content" />

      {/* Illustration Image */}
      <FastImage
        style={styles.illustration}
        source={require('../../assets/ilustration/expense.png')}
        resizeMode={FastImage.resizeMode.contain}
      />

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Manage your daily{'\n'}life expenses</Text>
        <Text style={styles.subtitle}>
          Expense Tracker is a simple and efficient personal finance management
          app that allows you to track your daily expenses and income.
        </Text>

        {/* Swipe Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Swipe to get started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
