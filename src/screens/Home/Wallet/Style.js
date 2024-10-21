import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  // Container Styles
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
    fontSize: RFValue(12),
  },
  balanceAmount: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: RFValue(20),
  },

  // Card Styles
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

  // Transaction List Styles
  transactionList: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 700,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  transactionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(13),
    color: '#000',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    paddingTop: 2,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  transactionAmount: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(10),
    color: 'black',
    paddingRight: 12,
  },

  // Filter Styles
  boxFilter: {
    backgroundColor: '#fff',
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 17,
    marginBottom: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  transactionFilter: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(10),
    color: 'black',
  },
  transactionFilters: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(10),
    color: 'black',
    paddingLeft: 15,
  },
  rowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  // Category Breakdown Styles
  categoryBreakdownContainer: {
    backgroundColor: '#FFFF',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  categoryBreakdownTitle: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(12),
    marginBottom: 10,
    color: 'black',
  },
  noCategoriesText: {
    fontSize: RFValue(9.5),
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
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

  // Expense Summary Styles
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
  totalExpenseLabelDate: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9.5),
    color: '#FF0000',
    paddingLeft: 20,
  },
  totalExpenseAmount: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: RFValue(13),
    color: '#FF0000',
  },

  // Numpad Styles
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

  // Modal Action Styles
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

  // Modal Styles
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

  // Miscellaneous Styles
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 10,
    height: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
