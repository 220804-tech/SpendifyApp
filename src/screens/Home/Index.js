/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { authStore } from '../../stores/authStore';
import ExpensePieChart from '../../components/Chart/ExpensePieChart';
import MainModal from '../../components/Modals/MainModal';
import CalendarModal from '../../components/Modals/CalendarModal';
import CategoryModal from '../../components/Modals/CategoryModal';
import useTransactions from '../../hook/useTransactions';
import styles from './Style';

const HomeScreen = ({ navigation }) => {
  // Extract username from the authStore
  const { username } = authStore();

  // Use custom hook to fetch and manage transactions
  const { transactions, loadTransactions } = useTransactions();

  // Reload transactions when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  // Filter transactions by the current user
  const userTransactions = transactions.filter(transaction => transaction.username === username);

  // Calculate user balance based on income and expense transactions
  const userBalance = userTransactions.reduce((acc, transaction) => {
    return transaction.transactionType === 'Income' ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  // State to control modal visibility
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  // State for handling selected date, amount, and transaction type
  const [selectedDate, setSelectedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [comment, setComment] = useState('');

  // State for handling selected categories for expense and income
  const [selectedCategoryExpense, setSelectedCategoryExpense] = useState('Category');
  const [selectedCategoryIncome, setSelectedCategoryIncome] = useState('Category');

  // Function to generate random colors for PieChart slices
  const generateColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Prepare data for the PieChart based on expense transactions
  const expenseCategoriesData = userTransactions
    .filter(transaction => transaction.transactionType === 'Expense')
    .reduce((acc, transaction) => {
      const categoryIndex = acc.findIndex(item => item.name === transaction.category);
      if (categoryIndex > -1) {
        acc[categoryIndex].population += transaction.amount;
      } else {
        acc.push({
          name: transaction.category,
          population: transaction.amount,
          color: generateColor(),
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
          legendFontFamily: 'PlusJakartaSans-Medium',
        });
      }
      return acc;
    }, []);

  // Toggle main modal visibility
  const toggleMainModal = () => setMainModalVisible(prev => !prev);

  // Toggle calendar modal visibility
  const toggleCalendarModal = () => setCalendarModalVisible(prev => !prev);

  // Toggle category modal visibility
  const toggleCategoryModal = () => setCategoryModalVisible(prev => !prev);

  // Handle input on number pad
  const handleNumberPress = input => {
    if (!transactionType) {
      Alert.alert('Select Transaction Type', 'Please select Income or Expense first.');
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

  // Handle confirm action and reset state after confirmation
  const handleConfirm = () => {
    setAmount('');
    setTransactionType('');
    setSelectedCategoryExpense('Category');
    setSelectedCategoryIncome('Category');
    setComment('');
    toggleMainModal();
  };

  // Switch transaction type between Expense and Income
  const handleTransactionTypeSwitch = type => setTransactionType(type);

  // Handle category selection for expense or income
  const handleCategorySelect = (category, section) => {
    if (section === 'Category Expense') {
      setSelectedCategoryExpense(category.name);
    } else if (section === 'Category Income') {
      setSelectedCategoryIncome(category.name);
    }
    toggleCategoryModal();
  };

  // Handle date selection from calendar
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    toggleCalendarModal();
  };

  // Predefined categories for expense and income
  const expenseCategories = [
    { name: 'Meal', icon: require('../../assets/icons/mealIcon.png') },
    { name: 'Grocery', icon: require('../../assets/icons/groceryIcon.png') },
    { name: 'Shopping', icon: require('../../assets/icons/shopingIcon.png') },
    { name: 'Transport', icon: require('../../assets/icons/transportIcon.png') },
  ];

  const incomeCategories = [
    { name: 'Salary', icon: require('../../assets/icons/entartainIcon.png') },
    { name: 'Overtime', icon: require('../../assets/icons/entartainIcon.png') },
    { name: 'Freelance', icon: require('../../assets/icons/entartainIcon.png') },
    { name: 'Gift', icon: require('../../assets/icons/entartainIcon.png') },
  ];

  return (
    <View style={styles.container}>
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
            source={require('../../assets/images/profileImage.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <Text style={styles.titleText}>Manage your{'\n'}expenses</Text>

      {/* Expense Overview */}
      <View style={styles.expenseCard}>
        <View style={styles.expenseHeader}>
          <Text style={styles.expenseTitle}>Expenses</Text>
          <Text style={styles.expenseAmount}>
            Rp{' '}
            {userTransactions
              .filter(t => t.transactionType === 'Expense')
              .reduce((acc, t) => acc + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
        <Text style={styles.dateRange}>1 Feb 2023 - 28 Feb 2023</Text>

        {/* PieChart showing expense breakdown */}
        <ExpensePieChart data={expenseCategoriesData} />

        {/* Modals for adding transactions, calendar, and category selection */}
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

      {/* Bottom Section with Wallet and Income vs Expenses */}
      <View style={styles.alertBox}>
        <View>
          <Text style={styles.alertText}>My Wallet</Text>
          <Text style={styles.walletText}>Rp {userBalance.toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnAdds} onPress={toggleMainModal}>
            <FastImage
              source={require('../../assets/icons/editIcon.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate('Wallet')}>
            <FastImage
              source={require('../../assets/icons/arrowNext.png')}
              style={styles.arrowNextIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Income vs Expenses Summary */}
      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeBox}>
          <Text style={styles.incomeText}>Income</Text>
          <Text style={styles.incomeAmount}>
            Rp{' '}
            {userTransactions
              .filter(t => t.transactionType === 'Income')
              .reduce((acc, t) => acc + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
        <View style={styles.expenseBox}>
          <Text style={styles.expenseText}>Expenses</Text>
          <Text style={styles.expenseAmount}>
            Rp{' '}
            {userTransactions
              .filter(t => t.transactionType === 'Expense')
              .reduce((acc, t) => acc + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
