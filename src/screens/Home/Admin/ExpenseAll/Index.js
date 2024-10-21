/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {PieChart} from 'react-native-chart-kit';
import EditModal from '../../../../components/Modals/EditModal';
import CalendarModal from '../../../../components/Modals/CalendarModal';
import FastImage from 'react-native-fast-image';
import styles from './Style';

// TransactionItem component to display individual transaction
const TransactionItem = ({
  id,
  amount,
  transactionType,
  username,
  date,
  onDelete,
  onUsernamePress,
}) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionDetails}>
      {/* Click username to open the edit modal */}
      <TouchableOpacity>
        <Text style={styles.transactionName}>{username}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <View style={styles.rowCenter}>
          <Text
            style={[
              styles.transactionBadge,
              {
                backgroundColor:
                  transactionType === 'Income' ? '#28A745' : 'red',
              },
            ]}>
            {date}
          </Text>
          {/* Click amount to delete the transaction */}
          <TouchableOpacity>
            <Text
              style={
                styles.transactionDate
              }>{`${amount.toLocaleString()}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    {/* Delete and edit icons */}
    <TouchableOpacity onPress={() => onDelete(id)}>
      <FastImage
        source={require('../../../../assets/icons/deleteIcon.png')}
        style={styles.deleteIcon}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onUsernamePress}>
      <FastImage
        source={require('../../../../assets/icons/editIcon.png')}
        style={styles.editIcon}
      />
    </TouchableOpacity>
  </View>
);

export default function Index({navigation, route}) {
  // Extract username from route params
  const username = route.params?.username;

  // State to hold transactions
  const [transactions, setTransactions] = useState([]);

  // Modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Transaction to be edited

  // Calendar modal state
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);

  // Total expense and category breakdown state
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});

  // Function to open edit modal with selected transaction
  const openModal = (transaction = null) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  // Close the edit modal
  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalVisible(false);
  };

  // Open the calendar modal
  const openCalendarModal = () => {
    setIsCalendarVisible(true);
  };

  // Close the calendar modal
  const closeCalendarModal = () => {
    setIsCalendarVisible(false);
  };

  // Handle date selection from calendar modal
  const handleDayPress = day => {
    const selectedDate = day.dateString;

    if (!selectedFromDate || (selectedFromDate && selectedToDate)) {
      setSelectedFromDate(selectedDate);
      setSelectedToDate(null);
    } else {
      if (moment(selectedDate).isBefore(selectedFromDate)) {
        setSelectedToDate(selectedFromDate);
        setSelectedFromDate(selectedDate);
      } else {
        setSelectedToDate(selectedDate);
        setIsCalendarVisible(false);
      }
    }
  };

  // Load transactions from AsyncStorage and filter by username and date range
  const loadTransactions = async (fromDate, toDate) => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      let parsedTransactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      // Filter transactions by username if available
      if (username) {
        parsedTransactions = parsedTransactions.filter(
          transaction => transaction.username === username,
        );
      }

      // Filter by date range if available
      if (fromDate && toDate) {
        const from = moment(fromDate, 'YYYY-MM-DD');
        const to = moment(toDate, 'YYYY-MM-DD');

        parsedTransactions = parsedTransactions.filter(transaction => {
          const transactionDate = moment(transaction.date, 'YYYY-MM-DD');
          return transactionDate.isBetween(from, to, null, '[]'); // '[]' includes fromDate and toDate
        });
      }

      setTransactions(parsedTransactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  // Load transactions on component mount, or when date or username changes
  useEffect(() => {
    loadTransactions(selectedFromDate, selectedToDate);
  }, [selectedFromDate, selectedToDate, username]);

  // Handle transaction deletion by ID
  const handleDeleteTransaction = async id => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const parsedTransactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      // Filter out the deleted transaction
      const updatedTransactions = parsedTransactions.filter(
        transaction => transaction.id !== id,
      );

      // Save updated transactions back to AsyncStorage
      await AsyncStorage.setItem(
        'transactions',
        JSON.stringify(updatedTransactions),
      );

      // Reload transactions after deletion
      loadTransactions(selectedFromDate, selectedToDate);

      Alert.alert('Success', 'Transaction has been deleted.');
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      Alert.alert('Error', 'Failed to delete transaction.');
    }
  };

  // Handle save transaction (add or edit)
  const handleSaveTransaction = async transactionData => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const parsedTransactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      if (selectedTransaction) {
        // Edit existing transaction
        const updatedTransactions = parsedTransactions.map(txn =>
          txn.id === selectedTransaction.id
            ? {...txn, ...transactionData}
            : txn,
        );

        await AsyncStorage.setItem(
          'transactions',
          JSON.stringify(updatedTransactions),
        );
        Alert.alert('Success', 'Transaction has been updated.');
      } else {
        // Add new transaction
        parsedTransactions.push(transactionData);
        await AsyncStorage.setItem(
          'transactions',
          JSON.stringify(parsedTransactions),
        );
        Alert.alert('Success', 'Transaction has been added.');
      }

      // Reload transactions after saving
      loadTransactions(selectedFromDate, selectedToDate);

      // Close modal
      closeModal();
    } catch (error) {
      console.error('Failed to save transaction:', error);
      Alert.alert('Error', 'Failed to save transaction.');
    }
  };

  // Compute total expense and category breakdown
  const computeExpenseStats = () => {
    const expenses = transactions.filter(
      txn => txn.transactionType === 'Expense',
    );
    const total = expenses.reduce((acc, txn) => acc + txn.amount, 0);
    setTotalExpense(total);

    const categoryMap = {};
    expenses.forEach(txn => {
      if (categoryMap[txn.category]) {
        categoryMap[txn.category] += txn.amount;
      } else {
        categoryMap[txn.category] = txn.amount;
      }
    });

    const breakdown = {};
    Object.keys(categoryMap).forEach(category => {
      breakdown[category] =
        total > 0 ? ((categoryMap[category] / total) * 100).toFixed(2) : '0.00';
    });

    setCategoryBreakdown(breakdown);
  };

  // Recompute stats whenever transactions change
  useEffect(() => {
    computeExpenseStats();
  }, [transactions]);

  // Get color for PieChart slices
  const getColor = index => {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#C9CBCF',
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
    ];
    return colors[index % colors.length];
  };

  // Prepare data for PieChart
  const preparePieData = breakdown => {
    return Object.keys(breakdown).map((category, index) => ({
      name: category,
      population: parseFloat(breakdown[category]),
      color: getColor(index),
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));
  };

  const pieData = preparePieData(categoryBreakdown);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#FC9F86" barStyle="light-content" />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage
            source={require('../../../../assets/icons/arrowBackWhite.png')}
            style={styles.arrowBackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.transactionTitle}>
          Transactions for {username || 'All Users'}
        </Text>
      </View>

      {/* Expense breakdown section */}
      <View style={styles.statisticsContainer}>
        {Object.keys(categoryBreakdown).length > 0 ? (
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width - 70}
            height={200}
            chartConfig={{color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`}}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <Text style={styles.noCategoriesText}>
            No category expenses found.
          </Text>
        )}
      </View>

      {/* Total expense and income */}
      <View style={styles.boxExpense}>
        <View>
          <Text style={styles.totalExpenseTexts}>Total Expense</Text>
          <Text style={styles.totalExpenseText}>
            Rp {totalExpense.toLocaleString()}
          </Text>
        </View>

        <View>
          <Text style={styles.totalExpenseTexts}>Total Income</Text>
          <Text style={styles.totalExpenseText}>
            Rp{' '}
            {transactions
              .filter(t => t.transactionType === 'Income')
              .reduce((acc, t) => acc + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Date filter button */}
      <TouchableOpacity style={styles.boxFilter} onPress={openCalendarModal}>
        <Text style={styles.totalExpenseLabelDate}>Filter Date</Text>
        {selectedFromDate && selectedToDate ? (
          <View style={styles.rowHorizontal}>
            <Text style={styles.transactionFilter}>
              {moment(selectedFromDate).format('ddd, D MMM YYYY')}
            </Text>
            <Text style={styles.transactionFilter}>
              {moment(selectedToDate).format('ddd, D MMM YYYY')}
            </Text>
          </View>
        ) : (
          <View style={styles.rowHorizontal}>
            <Text style={styles.transactionFilter}>
              {moment().format('ddd, D MMM YYYY')}
            </Text>
            <Text style={styles.transactionFilter}>
              {moment().add(6, 'days').format('ddd, D MMM YYYY')}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Transaction list */}
      <View style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              name={transaction.category}
              amount={`Rp ${transaction.amount.toLocaleString()}`}
              transactionType={transaction.transactionType}
              comment={transaction.comment}
              username={transaction.username}
              date={moment(transaction.date).format('ddd, D MMM YYYY')}
              onDelete={handleDeleteTransaction}
              onUsernamePress={() => openModal(transaction)}
            />
          ))
        ) : (
          <Text style={styles.noTransactionsText}>No transactions found.</Text>
        )}
      </View>

      {/* Edit Modal Component */}
      <EditModal
        visible={isModalVisible}
        onClose={closeModal}
        initialData={selectedTransaction}
        handleSave={handleSaveTransaction}
        navigation={navigation}
      />

      {/* Calendar Modal Component */}
      <CalendarModal
        visible={isCalendarVisible}
        onClose={closeCalendarModal}
        onDayPress={handleDayPress}
        selectedFromDate={selectedFromDate}
        selectedToDate={selectedToDate}
      />
    </ScrollView>
  );
}
