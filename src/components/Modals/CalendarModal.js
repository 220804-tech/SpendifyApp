// src/components/CalendarModal.js

import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import styles from '../../screens/Home/Style';
import moment from 'moment';

const CalendarModal = ({
  visible,
  onClose,
  onDayPress,
  selectedFromDate,
  selectedToDate,
}) => {
  const today = moment().format('YYYY-MM-DD');

  // Menandai tanggal-tanggal yang diperlukan
  const markedDates = {
    [today]: {
      marked: true,
      dotColor: 'orange', // Warna untuk menandai hari ini
      // Jika hari ini adalah toDate, tambahkan penandaan selected
      ...(selectedToDate === today && {
        selected: true,
        selectedColor: '#00ADF5',
      }),
    },
    ...(selectedFromDate &&
      selectedToDate &&
      moment(selectedToDate).isAfter(selectedFromDate) && {
        ...Array.from(
          {
            length:
              moment(selectedToDate).diff(moment(selectedFromDate), 'days') - 1,
          },
          (_, i) => {
            const date = moment(selectedFromDate)
              .add(i + 1, 'days')
              .format('YYYY-MM-DD');
            return {
              [date]: {
                selected: true,
                selectedColor: '#B3E5FC', // Warna untuk periode antara
              },
            };
          },
        ).reduce((acc, curr) => ({...acc, ...curr}), {}),
      }),
  };

  return (
    <Modal
      animationType="fade" // Slide dari bawah
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.calendarModalOverlay}>
        {/* Area untuk menutup modal dengan menekan di luar konten kalender */}
        <TouchableOpacity
          style={styles.calendarModalBackdrop}
          onPress={onClose}
        />
        <View style={styles.calendarModalContainer}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={'period'}
            theme={{
              selectedDayBackgroundColor: '#FC9F86',
              selectedDayTextColor: '#00ADF5',
              todayTextColor: '#00ADF5',
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
