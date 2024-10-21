// src/components/CategoryModal.js

import React from 'react';
import {View, Modal, Text, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from '../../screens/Home/Style';

const CategoryList = ({title, categories, onSelectCategory}) => (
  <View style={styles.categorySection}>
    <Text style={styles.modalTitle}>{title}</Text>
    <ScrollView contentContainerStyle={styles.categoryGrid}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryItem}
          onPress={() => onSelectCategory(category, title)}>
          <FastImage source={category.icon} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const CategoryModal = ({
  visible,
  onClose,
  onSelectCategory,
  expenseCategories,
  incomeCategories,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.categoryModalContainer}>
        <View style={styles.categoryModalContent}>
          {/* Category Expense */}
          <CategoryList
            title="Category Expense"
            categories={expenseCategories}
            onSelectCategory={onSelectCategory}
          />

          {/* Category Income */}
          <CategoryList
            title="Category Income"
            categories={incomeCategories}
            onSelectCategory={onSelectCategory}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
