import {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  // Fungsi untuk memuat transaksi dan menghitung saldo
  const loadTransactions = useCallback(async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions);
        setTransactions(parsedTransactions);

        const newBalance = parsedTransactions.reduce((acc, transaction) => {
          return transaction.transactionType === 'Income'
            ? acc + transaction.amount
            : acc - transaction.amount;
        }, 0);

        setBalance(newBalance);
      } else {
        setTransactions([]);
        setBalance(0);
      }
    } catch (error) {
      console.error('Gagal memuat transaksi:', error);
    }
  }, []);

  return {transactions, balance, loadTransactions};
};

export default useTransactions;
