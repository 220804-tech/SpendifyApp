// components/Modals/EditModal.js
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from '../../screens/Home/Style';
import {authStore} from '../../stores/authStore'; // Import authStore
import uuid from 'react-native-uuid'; // Import react-native-uuid

// Fungsi untuk format angka ke Rupiah
const formatRupiah = number => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace(/IDR\s?/, '');
};

const EditModal = ({
  visible,
  onClose,
  initialData, // Data transaksi yang akan diedit atau null untuk tambah baru
  handleSave, // Fungsi untuk menyimpan transaksi
  navigation,
}) => {
  const {username} = authStore();

  // State internal untuk form
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategoryExpense, setSelectedCategoryExpense] = useState('');
  const [selectedCategoryIncome, setSelectedCategoryIncome] = useState('');

  // Fungsi untuk beralih jenis transaksi
  const handleTransactionTypeSwitch = type => {
    setTransactionType(type);
    // Reset kategori saat jenis transaksi berubah
    if (type === 'Income') {
      setSelectedCategoryExpense('');
    } else {
      setSelectedCategoryIncome('');
    }
  };

  // Fungsi untuk menangani input angka (Keypad)
  const handleNumberPress = num => {
    if (num === '$') {
      // Implementasikan jika diperlukan
      return;
    } else if (num === ',') {
      // Implementasikan jika diperlukan
      return;
    }
    setAmount(prev => prev + num);
  };

  // Mengisi form saat modal dibuka dengan data transaksi yang dipilih
  useEffect(() => {
    if (initialData) {
      setTransactionType(initialData.transactionType);
      setAmount(initialData.amount.toString());
      setComment(initialData.comment);
      setSelectedDate(initialData.date);
      if (initialData.transactionType === 'Income') {
        setSelectedCategoryIncome(initialData.category);
        setSelectedCategoryExpense('');
      } else {
        setSelectedCategoryExpense(initialData.category);
        setSelectedCategoryIncome('');
      }
    } else {
      // Reset form untuk tambah transaksi baru
      setTransactionType('');
      setAmount('');
      setComment('');
      setSelectedDate('');
      setSelectedCategoryExpense('');
      setSelectedCategoryIncome('');
    }
  }, [initialData]);

  // Fungsi untuk menyimpan transaksi
  const onSave = () => {
    if (!transactionType || !amount || !selectedDate || !comment) {
      Alert.alert('Error', 'Silakan lengkapi semua bidang sebelum menyimpan.');
      return;
    }

    const transactionData = initialData
      ? {
          // Data untuk mengedit transaksi
          transactionType: transactionType === 'Income' ? 'Income' : 'Expense',
          amount: parseInt(amount.replace(/\D/g, ''), 10),
          date: selectedDate,
          category:
            transactionType === 'Income'
              ? selectedCategoryIncome
              : selectedCategoryExpense,
          comment: comment,
          editedBy: username, // Menambahkan siapa yang mengedit
        }
      : {
          // Data untuk menambahkan transaksi baru
          id: uuid.v4(),
          username: username, // Username saat menambahkan transaksi baru
          transactionType: transactionType === 'Income' ? 'Income' : 'Expense',
          amount: parseInt(amount.replace(/\D/g, ''), 10),
          date: selectedDate,
          category:
            transactionType === 'Income'
              ? selectedCategoryIncome
              : selectedCategoryExpense,
          comment: comment,
        };

    handleSave(transactionData);
  };

  // Placeholder untuk memilih kategori (Anda bisa mengganti ini dengan implementasi sebenarnya)
  const toggleCategoryModal = () => {
    Alert.alert('Info', 'Fungsi pemilihan kategori belum diimplementasikan.');
  };

  // Placeholder untuk memilih tanggal (Anda bisa mengganti ini dengan implementasi sebenarnya)
  const toggleCalendarModal = () => {
    Alert.alert('Info', 'Fungsi pemilihan tanggal belum diimplementasikan.');
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
          {/* Label Jenis Transaksi */}
          <Text style={styles.expenseLabel}>
            {transactionType ? transactionType : 'Transaction Type'}
          </Text>

          {/* Input Jumlah */}
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
                    parseInt(amount, 10),
                  )}`
                : ''
            }
            showSoftInputOnFocus={false}
            editable={false}
          />

          {/* Input Komentar */}
          <TextInput
            style={styles.commentInput}
            placeholder="Add comment..."
            placeholderTextColor={'gray'}
            value={comment}
            onChangeText={setComment}
          />

          {/* Pemilihan Jenis Transaksi dan Kategori */}
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

            {/* Tombol untuk membuka modal Kategori */}
            <TouchableOpacity
              style={styles.modalOptionCategory}
              onPress={toggleCategoryModal}>
              <Text style={styles.modalOptionText}>
                {transactionType === 'Income'
                  ? selectedCategoryIncome || 'Select Category'
                  : selectedCategoryExpense || 'Select Category'}
              </Text>
              <FastImage
                source={require('../../assets/icons/arrowDown.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowBetween}>
            {/* Keypad Angka */}
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

            {/* Tombol Aksi */}
            <View style={styles.modalActions}>
              <View>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    setAmount('');
                  }}>
                  <Text style={styles.confirmText}>C</Text>
                </TouchableOpacity>

                {/* Tombol untuk membuka modal Kalender */}
                <TouchableOpacity
                  style={styles.calendarButton}
                  onPress={toggleCalendarModal}>
                  <FastImage
                    source={require('../../assets/icons/calenderIcon.png')}
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.confirmButtons} onPress={onSave}>
                <Text style={styles.confirmText}>✓</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol untuk menutup modal */}
          <TouchableOpacity
            style={{marginTop: 10, alignSelf: 'flex-end'}}
            onPress={onClose}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
