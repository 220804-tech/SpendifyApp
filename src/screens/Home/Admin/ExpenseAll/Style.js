import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#FC9F86',
    paddingTop: 20,
  },

  // Balance Section
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  balanceLabel: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(14),
  },
  balanceAmount: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: RFValue(25),
  },
  arrowIcon: {
    width: 10,
    height: 10,
  },

  // Card Section
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#001F3F',
    flex: 1,
    marginRight: 10,
    padding: 20,
    borderRadius: 20,
  },
  expenseCard: {
    backgroundColor: '#28A745',
    marginRight: 0,
  },
  cardTitle: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: RFValue(12),
  },
  cardAmount: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(13),
    marginTop: 5,
  },

  // Transaction List Section
  transactionList: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: 700,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  transactionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(13),
    color: '#FFF',
    marginLeft: 20,
    marginTop: -5,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 15,
  },
  transactionName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(12),
    color: 'black',
  },
  transactionFilter: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(10),
    color: 'black',
  },
  transactionDate: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9),
    color: '#6C757D',
    marginTop: 5,
  },
  transactionBadge: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(8),
    color: '#FFF',
    backgroundColor: 'red',
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  transactionAmount: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(10),
    color: 'black',
    paddingRight: 12,
  },
  deleteIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  editIcon: {
    width: 18,
    height: 18,
  },
  arrowBackIcon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginBottom: 10,
  },

  // Keypad Section
  numPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '75%',
  },
  numPadButton: {
    width: '32.5%',
    paddingVertical: 28,
    marginBottom: 3,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numPadText: {
    fontSize: RFValue(20),
    color: 'black',
  },

  // Filter Section
  boxFilter: {
    backgroundColor: '#FFFF',
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 17,
    marginBottom: 10,
    justifyContent: 'center',
  },
  totalExpenseLabelDate: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9.5),
    color: '#FF0000',
    paddingLeft: 20,
  },
  rowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: -15,
  },

  // Modal Section
  modalActions: {
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#000',
    width: 85,
    paddingVertical: 34,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  calendarButton: {
    backgroundColor: '#FFE0D6',
    width: 85,
    paddingVertical: 33,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  confirmText: {
    fontSize: RFValue(13),
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Medium',
  },

  // Category Modal Section
  categoryModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  categoryModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '22%',
    marginVertical: 10,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: RFValue(9),
    color: 'gray',
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },

  // Statistics Section
  statisticsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFF',
    borderRadius: 25,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  breakdownTitle: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(12),
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
  noCategoriesText: {
    fontSize: RFValue(9.5),
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },

  // Total Expense Section
  totalExpenseContainer: {
    backgroundColor: '#FFFF',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalExpenseLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9.5),
    color: '#FF0000',
    marginBottom: 5,
  },
  totalExpenseAmount: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(13),
    color: '#FF0000',
  },
  totalExpenseTexts: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9),
    color: '#FF0000',
    marginTop: 10,
  },
  totalExpenseText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(13),
    color: '#FF0000',
  },

  // Row Utilities
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Expense Box
  boxExpense: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 65,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  // Color Indicators
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryName: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9.5),
    color: '#333',
    flex: 1,
  },
  categoryPercentage: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9),
    color: '#333',
  },
});

export default styles;
