/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert, AsyncStorage, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { authStore } from '../../../stores/authStore';
import ExpenseLineChart from '../../../components/Chart/ExpenseLineChart';
import MainModal from '../../../components/Modals/MainModal';
import CalendarModal from '../../../components/Modals/CalendarModal';
import CategoryModal from '../../../components/Modals/CategoryModal';
import EditModal from '../../../components/Modals/EditModal';
import useTransactions from '../../../hook/useTransactions';
import styles from './Style';

const AdminScreen = ({ navigation }) => {
  const { username } = authStore(); // Get the current user's username
  const { transactions, loadTransactions } = useTransactions(); // Load and manage transaction data


  // Reload transactions when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  // State management for modals and selected data
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [comment, setComment] = useState('');
  const [selectedCategoryExpense, setSelectedCategoryExpense] = useState('Category');
  const [selectedCategoryIncome, setSelectedCategoryIncome] = useState('Category');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Data for the expense line chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Styling chart color
        strokeWidth: 2,
      },
    ],
    legend: ['All Expense'],
  };

  // Function to toggle the visibility of the main modal
  const toggleMainModal = () => setMainModalVisible(prev => !prev);

  // Function to toggle the calendar modal
  const toggleCalendarModal = () => setCalendarModalVisible(prev => !prev);

  // Function to toggle the category modal
  const toggleCategoryModal = () => setCategoryModalVisible(prev => !prev);

  // Handle number input on the number pad
  const handleNumberPress = input => {
    if (!transactionType) {
      Alert.alert('Please select transaction type first', 'Choose Income or Expense.');
      return;
    }

    if (input === 'C') {
      setAmount('');
    } else if (input === 'DEL') {
      setAmount(prev => prev.slice(0, -1));
    } else {
      setAmount(prev => prev + input);
    }
  };

  // Confirm transaction action, reset state after confirming
  const handleConfirm = () => {
    setAmount('');
    setTransactionType('');
    setSelectedCategoryExpense('Category');
    setSelectedCategoryIncome('Category');
    setComment('');
    toggleMainModal();
  };

  // Switch between Expense and Income types
  const handleTransactionTypeSwitch = type => setTransactionType(type);

  // Handle category selection based on the section (Income or Expense)
  const handleCategorySelect = (category, section) => {
    if (section === 'Category Expense') {
      setSelectedCategoryExpense(category.name);
    } else if (section === 'Category Income') {
      setSelectedCategoryIncome(category.name);
    }
    toggleCategoryModal();
  };

  // Handle date selection from the calendar
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    toggleCalendarModal();
  };

  // Categories for expenses and income
  const expenseCategories = [
    { name: 'Meal', icon: require('../../../assets/icons/mealIcon.png') },
    { name: 'Grocery', icon: require('../../../assets/icons/groceryIcon.png') },
    { name: 'Shopping', icon: require('../../../assets/icons/shopingIcon.png') },
    { name: 'Transport', icon: require('../../../assets/icons/transportIcon.png') },
  ];

  const incomeCategories = [
    { name: 'Salary', icon: require('../../../assets/icons/entartainIcon.png') },
    { name: 'Overtime', icon: require('../../../assets/icons/entartainIcon.png') },
    { name: 'Freelance', icon: require('../../../assets/icons/entartainIcon.png') },
    { name: 'Gift', icon: require('../../../assets/icons/entartainIcon.png') },
  ];

  // Function to close the edit modal
  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalVisible(false);
  };

  // Function to save a transaction (add or edit)
  const handleSaveTransaction = async transactionData => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const parsedTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];

      if (selectedTransaction) {
        // Editing an existing transaction
        const updatedTransactions = parsedTransactions.map(txn =>
          txn.id === selectedTransaction.id ? { ...txn, ...transactionData } : txn
        );
        await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        Alert.alert('Success', 'Transaction has been updated.');
      } else {
        // Adding a new transaction
        parsedTransactions.push(transactionData);
        await AsyncStorage.setItem('transactions', JSON.stringify(parsedTransactions));
        Alert.alert('Success', 'Transaction has been added.');
      }

      // Reload transactions and close the modal after saving
      loadTransactions();
      closeModal();
    } catch (error) {
      console.error('Failed to save transaction:', error);
      Alert.alert('Error', 'Failed to save transaction.');
    }
  };

  // TransactionItem component for listing individual transactions
  const TransactionItem = ({ transactionType, username, onPress }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.transactionBadge,
              {
                backgroundColor: transactionType === 'Income' ? '#28A745' : 'red',
              },
            ]}>
            User
          </Text>

          {/* Display the username */}
          <TouchableOpacity>
            <Text style={styles.transactionName}>{username}</Text>
          </TouchableOpacity>
        </View>

        {/* Display message to navigate to detail */}
        <TouchableOpacity>
          <Text style={styles.transactionDate}>Click Arrow to Detail Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Arrow button to navigate to the user's detailed expenses */}
      <TouchableOpacity onPress={onPress}>
        <FastImage
          source={require('../../../assets/icons/arrowDetail.png')}
          style={styles.arrowDetail}
        />
      </TouchableOpacity>
    </View>
  );

  // Create an array of unique transactions based on username
  const uniqueTransactions = [];
  const usernamesSet = new Set();

  transactions.forEach(transaction => {
    if (!usernamesSet.has(transaction.username)) {
      usernamesSet.add(transaction.username);
      uniqueTransactions.push(transaction);
    }
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#FFFF" barStyle="dark-content" />

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.nameText}>{username}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={() => navigation.navigate('Profile')}>
          <FastImage
            source={require('../../../assets/images/profileImage.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <Text style={styles.titleText}>Manage all user{'\n'}expenses</Text>

      {/* Expenses Overview Section */}
      <View style={styles.expenseCard}>
        <View style={styles.expenseHeader}>
          <Text style={styles.expenseTitle}>All User Expense</Text>
        </View>
        <Text style={styles.dateRange}>1 Feb 2023 - 28 Feb 2023</Text>

        {/* Line Chart for Expenses */}
        <ExpenseLineChart data={data} />

        {/* Modals */}
        <MainModal
          visible={mainModalVisible}
          onClose={toggleMainModal}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          amount={amount}
          setAmount={setAmount}
          handleNumberPress={handleNumberPress}
          handleConfirm={handleConfirm}
          toggleCategoryModal={toggleCategoryModal}
          toggleCalendarModal={toggleCalendarModal}
          selectedCategoryExpense={selectedCategoryExpense}
          selectedCategoryIncome={selectedCategoryIncome}
          handleTransactionTypeSwitch={handleTransactionTypeSwitch}
          comment={comment}
          setComment={setComment}
          selectedDate={selectedDate}
          navigation={navigation}
        />

        <CalendarModal
          visible={calendarModalVisible}
          onClose={toggleCalendarModal}
          onDayPress={handleDayPress}
          selectedDate={selectedDate}
        />

        <CategoryModal
          visible={categoryModalVisible}
          onClose={toggleCategoryModal}
          onSelectCategory={handleCategorySelect}
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
        />
      </View>


      {/* List User Transactions Section */}
      <View style={styles.transactionList}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>List All User</Text>
        </View>

        {uniqueTransactions.length > 0 ? (
          uniqueTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transactionType={transaction.transactionType}
              username={transaction.username}
              onPress={() => navigation.navigate('Expense', { username: transaction.username })}
            />
          ))
        ) : (
          <Text>No transactions found.</Text>
        )}
      </View>

      {/* EditModal Component */}
      <EditModal
        visible={isModalVisible}
        onClose={closeModal}
        initialData={selectedTransaction}
        handleSave={handleSaveTransaction}
        navigation={navigation}
      />

    </ScrollView>
  );
};

export default AdminScreen;
