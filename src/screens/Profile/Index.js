import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {authStore} from '../../stores/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';
import {getCurrencyData} from '../../services/api';

export default function Index({navigation}) {
  const {username, setLogout} = authStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [currencyData, setCurrencyData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSelectedCurrency = async () => {
      try {
        const savedCurrency = await AsyncStorage.getItem('selectedCurrency');
        if (savedCurrency) {
          setSelectedCurrency(savedCurrency);
        }
      } catch (error) {
        console.error('Error fetching selected currency from storage', error);
      }
    };

    fetchSelectedCurrency();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await setLogout();
            navigation.replace('Login');
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleCurrenciesPress = async () => {
    setLoading(true);
    setModalVisible(true);

    // Call the API function from api.js
    const data = await getCurrencyData();

    if (data) {
      setCurrencyData(data);
    }
    setLoading(false);
  };

  const handleCurrencySelect = async currency => {
    setSelectedCurrency(currency);

    // Save the selected currency to AsyncStorage
    try {
      await AsyncStorage.setItem('selectedCurrency', currency);
      console.log('Currency saved to storage:', currency);
    } catch (error) {
      console.error('Error saving currency to storage', error);
    }

    setModalVisible(false); // Close the modal after selection
  };

  // Memoized item renderer for FlatList
  const renderItem = useCallback(
    ({item}) => (
      <CurrencyItem currency={item} onSelect={handleCurrencySelect} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <FastImage
          source={require('../../assets/images/profileImage.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{username}</Text>

        {/* Display the selected currency here */}
        <Text style={styles.profileID}>
          Currency: {selectedCurrency || 'None'}
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItem}>
        <FastImage
          source={require('../../assets/icons/userIcon.png')}
          style={styles.listIcon}
        />
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>User profile</Text>
          <Text style={styles.menuSubtitle}>
            Change profile image, name or password
          </Text>
        </View>
      </View>

      {/* Currencies Button */}
      <TouchableOpacity style={styles.menuItem} onPress={handleCurrenciesPress}>
        <FastImage
          source={require('../../assets/icons/coinIcon.png')}
          style={styles.listIcon}
        />
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>Currencies</Text>
          <Text style={styles.menuSubtitle}>
            Add other currencies, adjust exchange rates
          </Text>
        </View>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for Currencies */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <FlatList
                data={currencyData ? Object.keys(currencyData) : []}
                renderItem={renderItem}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Memoized Currency Item component
const CurrencyItem = memo(({currency, onSelect}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(currency)}>
      <Text style={styles.currencyText}>{currency}</Text>
    </TouchableOpacity>
  );
});
