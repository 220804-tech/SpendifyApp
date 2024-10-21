/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screens/Home/Style';
import {authStore} from '../../stores/authStore'; // Import authStore
import uuid from 'react-native-uuid'; // Import react-native-uuid

// Function to format number to Rupiah
const formatRupiah = number => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace(/IDR\s?/, '');
};

const MainModal = ({
  visible,
  onClose,
  transactionType,
  amount,
  setAmount,
  handleNumberPress,
  handleConfirm,
  toggleCategoryModal,
  toggleCalendarModal,
  selectedCategoryExpense,
  selectedCategoryIncome,
  handleTransactionTypeSwitch,
  comment,
  setComment,
  selectedDate,
  navigation,
}) => {
  // Retrieve username from authStore
  const {username} = authStore();

  const saveTransactionToStorage = async () => {
    try {
      // Ensure selectedDate is available before saving
      if (!selectedDate) {
        Alert.alert('Error', 'Please select a date.');
        return;
      }

      // Create transaction object dengan ID unik menggunakan react-native-uuid
      const transaction = {
        id: uuid.v4(), // Tambahkan ID unik
        username,
        transactionType: transactionType === 'Income' ? 'Income' : 'Expense',
        amount: parseInt(amount.replace(/\D/g, ''), 10),
        date: selectedDate,
        category:
          transactionType === 'Income'
            ? selectedCategoryIncome
            : selectedCategoryExpense,
        comment: comment,
      };

      // Retrieve existing transactions from AsyncStorage
      const existingTransactions = await AsyncStorage.getItem('transactions');
      let transactions = existingTransactions
        ? JSON.parse(existingTransactions)
        : [];

      // Add the new transaction
      transactions.push(transaction);

      // Save back to AsyncStorage
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      navigation.navigate('Wallet');
    } catch (error) {
      console.error('Failed to save transaction:', error);
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  const handleConfirmPress = () => {
    if (!transactionType || !amount || !selectedDate || !comment) {
      Alert.alert('Error', 'Please complete all fields before confirming.');
      return;
    }

    saveTransactionToStorage();

    handleConfirm();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Amount Input */}
          <Text style={styles.expenseLabel}>
            {transactionType ? transactionType : 'Transaction Type'}
          </Text>
          <TextInput
            style={[
              styles.amountInput,
              {
                color:
                  transactionType === ''
                    ? 'gray'
                    : transactionType === 'Income'
                    ? 'green'
                    : 'red',
              },
            ]}
            placeholder="Rp 0"
            placeholderTextColor={'gray'}
            value={
              amount
                ? `${transactionType === 'Income' ? '+' : '-'} ${formatRupiah(
                    amount,
                  )}`
                : ''
            }
            showSoftInputOnFocus={false}
            editable={false}
          />

          {/* Comment Input */}
          <TextInput
            style={styles.commentInput}
            placeholder="Add comment..."
            placeholderTextColor={'gray'}
            value={comment} // Display comment state
            onChangeText={setComment} // Update state when text changes
          />

          {/* Transaction Type and Category Selection */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={[
                styles.modalOptions,
                transactionType === 'Expense' && styles.selectedOption,
              ]}
              onPress={() => handleTransactionTypeSwitch('Expense')}>
              <Text style={styles.modalOptionText}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                transactionType === 'Income' && styles.selectedOption,
              ]}
              onPress={() => handleTransactionTypeSwitch('Income')}>
              <Text style={styles.modalOptionText}>Income</Text>
            </TouchableOpacity>

            {/* Button to open Category modal */}
            <TouchableOpacity
              style={styles.modalOptionCategory}
              onPress={toggleCategoryModal}>
              <Text style={styles.modalOptionText}>
                {transactionType === 'Income'
                  ? selectedCategoryIncome
                  : selectedCategoryExpense}
              </Text>
              <FastImage
                source={require('../../assets/icons/arrowDown.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowBetween}>
            {/* Number Pad */}
            <View style={styles.numPad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <TouchableOpacity
                  key={num}
                  style={styles.numPadButton}
                  onPress={() => handleNumberPress(num.toString())}>
                  <Text style={styles.numPadText}>{num}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.numPadButton}
                onPress={() => handleNumberPress('$')}>
                <Text style={styles.numPadText}>$</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numPadButton}
                onPress={() => handleNumberPress('0')}>
                <Text style={styles.numPadText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numPadButton}
                onPress={() => handleNumberPress(',')}>
                <Text style={styles.numPadText}>,</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <View>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    setAmount('');
                  }}>
                  <Text style={styles.confirmText}>C</Text>
                </TouchableOpacity>

                {/* Button to open Calendar Modal */}
                <TouchableOpacity
                  style={styles.calendarButton}
                  onPress={toggleCalendarModal}>
                  <FastImage
                    source={require('../../assets/icons/calenderIcon.png')}
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.confirmButtons}
                onPress={handleConfirmPress}>
                <Text style={styles.confirmText}>✓</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MainModal;
