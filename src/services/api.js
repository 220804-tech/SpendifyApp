/* eslint-disable no-shadow */
// services/api.js
import axios from 'axios';
import {Alert} from 'react-native';
import {API_BASE_URL, EXCHANGE_RATE_API_URL} from '@env';
import {authStore} from '../stores/authStore';

export const loginUser = async (username, password, navigation) => {
  let data = JSON.stringify({
    username: username,
    password: password,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/api/auth/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    if (response.data.status.code === 200) {
      const token = response.data.user.token;
      const username = response.data.user.username;
      const role = response.data.user.role;

      // Simpan token, username, dan role di state store
      authStore.getState().setLogin(token, username, role);

      // Cek role pengguna
      if (role === 'admin') {
        // Jika role adalah admin, redirect ke Dashboard
        navigation.navigate('Dashboard');
      } else {
        // Jika role adalah user, redirect ke Home
        navigation.navigate('Home');
      }
    } else {
      Alert.alert('Error', response.data.status.message);
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Failed to login. Please try again.');
  }
};

// Function to get currency data
export const getCurrencyData = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: EXCHANGE_RATE_API_URL,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching currency data:', error);
    Alert.alert('Error', 'Failed to fetch currency data.');
    return null;
  }
};
