// screens/Home/Index.js
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import styles from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authStore} from '../../../stores/authStore';
import CalendarModal from '../../../components/Modals/CalendarModal';
import moment from 'moment';
import {PieChart} from 'react-native-chart-kit';

// Reusable TransactionItem component
const TransactionItem = ({name, comment, amount, transactionType, date}) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionName}>{comment}</Text>
      <View style={styles.rowCenter}>
        <Text
          style={[
            styles.transactionBadge,
            {backgroundColor: transactionType === 'Income' ? '#28A745' : 'red'},
          ]}>
          {name}
        </Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
    </View>
    <Text
      style={[
        styles.transactionAmount,
        {color: transactionType === 'Income' ? '#28A745' : 'red'},
      ]}>
      {amount}
    </Text>
  </View>
);

export default function Index() {
  // State for storing transactions, balance, and user-related data
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const {username} = authStore();

  // Fetch transactions from AsyncStorage and calculate balance
  const loadTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions);

        // Filter transactions based on the current user's username
        const userTransactions = parsedTransactions.filter(
          transaction => transaction.username === username,
        );

        setTransactions(userTransactions);

        // Calculate balance based on filtered transactions
        const newBalance = userTransactions.reduce((acc, transaction) => {
          return transaction.transactionType === 'Income'
            ? acc + transaction.amount
            : acc - transaction.amount;
        }, 0);

        setBalance(newBalance);
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  // Load transactions when component mounts
  useEffect(() => {
    loadTransactions();
  }, [username]);

  // State for managing the visibility of the calendar modal
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  // State to determine whether selecting the start date or end date
  const [isSelectingFromDate, setIsSelectingFromDate] = useState(true);

  // State for handling date range selection (fromDate and toDate)
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // State to store the filtered transactions based on the selected date range
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // State for total expense and breakdown of categories
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});

  // Function to open the calendar modal for date selection
  const openFilterModal = () => {
    setIsSelectingFromDate(true);
    setIsCalendarModalVisible(true);
  };

  // Function to close the calendar modal
  const closeFilterModal = () => {
    setIsCalendarModalVisible(false);
  };

  // Handle the day press event for selecting a date range
  const handleDayPress = day => {
    if (isSelectingFromDate) {
      setFromDate(day.dateString);
      setIsSelectingFromDate(false);
      setIsCalendarModalVisible(true); // Reopen modal to select end date
    } else {
      // Ensure end date is after the start date
      if (moment(day.dateString).isBefore(moment(fromDate))) {
        Alert.alert('Invalid Date', 'End date must be after the start date.');
      } else {
        setToDate(day.dateString);
        setIsCalendarModalVisible(false); // Close modal after selecting end date
      }
    }
  };

  // Filter transactions based on selected date range
  useEffect(() => {
    if (fromDate && toDate) {
      const filtered = transactions.filter(txn => {
        const txnDate = moment(txn.date, 'YYYY-MM-DD');
        return (
          txnDate.isSameOrAfter(moment(fromDate, 'YYYY-MM-DD')) &&
          txnDate.isSameOrBefore(moment(toDate, 'YYYY-MM-DD'))
        );
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [fromDate, toDate, transactions]);

  // Calculate the balance based on income and expenses
  useEffect(() => {
    const calculateBalance = () => {
      let income = 0;
      let expense = 0;
      transactions.forEach(txn => {
        if (txn.transactionType === 'Income') {
          income += txn.amount;
        } else {
          expense += txn.amount;
        }
      });
      setBalance(income - expense);
    };

    calculateBalance();
  }, [transactions]);

  // Calculate total expense and categorize expense breakdown
  useEffect(() => {
    const expenses = filteredTransactions.filter(
      txn => txn.transactionType === 'Expense',
    );

    // Calculate total expenses
    const total = expenses.reduce((acc, txn) => acc + txn.amount, 0);
    setTotalExpense(total);

    // Group expenses by category
    const categoryMap = {};
    expenses.forEach(txn => {
      if (categoryMap[txn.category]) {
        categoryMap[txn.category] += txn.amount;
      } else {
        categoryMap[txn.category] = txn.amount;
      }
    });

    // Calculate percentage breakdown for each category
    const breakdown = {};
    Object.keys(categoryMap).forEach(category => {
      breakdown[category] = ((categoryMap[category] / total) * 100).toFixed(2);
    });

    setCategoryBreakdown(breakdown);
  }, [filteredTransactions]);

  // Get color for PieChart items based on index
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
  const pieData = Object.keys(categoryBreakdown).map((category, index) => ({
    name: category,
    population: parseFloat(categoryBreakdown[category]),
    color: getColor(index),
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FC9F86" barStyle="light-content" />

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <View>
          <Text style={styles.balanceLabel}>My Wallet</Text>
          <Text style={styles.balanceAmount}>
            Rp {balance.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Category Breakdown */}
      <View style={styles.categoryBreakdownContainer}>
        <Text style={styles.categoryBreakdownTitle}>Breakdown Kategori</Text>
        {pieData.length > 0 ? (
          <>
            <PieChart
              data={pieData}
              width={Dimensions.get('window').width - 70}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        ) : (
          <Text style={styles.noCategoriesText}>
            No expense categories available.
          </Text>
        )}
      </View>

      {/* Total Expense Section */}
      <View style={styles.totalExpenseContainer}>
        <View>
          <Text style={styles.totalExpenseLabel}>Total Income</Text>
          <Text style={styles.totalExpenseAmount}>
            Rp{' '}
            {transactions
              .filter(t => t.transactionType === 'Income')
              .reduce((acc, t) => acc + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>

        <View>
          <Text style={styles.totalExpenseLabel}>Total Expense</Text>
          <Text style={styles.totalExpenseAmount}>
            Rp {totalExpense.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Date Filter Button */}
      <TouchableOpacity style={styles.boxFilter} onPress={openFilterModal}>
        <Text style={styles.totalExpenseLabelDate}>Filter Date</Text>
        {fromDate && toDate ? (
          <View style={styles.rowHorizontal}>
            <Text style={styles.transactionFilter}>
              {moment(fromDate).format('ddd, D MMM YYYY')}
            </Text>
            <Text style={styles.transactionFilter}>
              {moment(toDate).format('ddd, D MMM YYYY')}
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

      {/* Transaction List */}
      <View style={styles.transactionList}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Transactions</Text>
        </View>

        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id} // Use unique ID for each transaction
              name={transaction.category}
              amount={`Rp ${transaction.amount.toLocaleString()}`}
              transactionType={transaction.transactionType}
              comment={transaction.comment}
              date={transaction.date}
            />
          ))
        ) : (
          <Text style={styles.noTransactionsText}>No transactions found.</Text>
        )}
      </View>

      {/* CalendarModal Component */}
      <CalendarModal
        visible={isCalendarModalVisible}
        onClose={closeFilterModal}
        onDayPress={handleDayPress}
        selectedFromDate={fromDate}
        selectedToDate={toDate}
      />
    </View>
  );
}
