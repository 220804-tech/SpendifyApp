// Style.js
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  // General container styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  // Welcome section styles
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: RFValue(10),
    color: '#7E7E7E',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  nameText: {
    fontSize: RFValue(14),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#000',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',
  },

  // Title section styles
  titleText: {
    fontSize: RFValue(22),
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: 10,
    marginBottom: 20,
    color: '#000',
  },

  // Expense card styles
  expenseCard: {
    backgroundColor: '#FEFEFE',
    borderRadius: 25,
    padding: 0,
    marginBottom: 20,
    borderColor: '#EBEFF1',
    borderWidth: 1,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  expenseTitle: {
    fontSize: RFValue(13),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: 'black',
  },
  expenseAmount: {
    color: '#E74C3C',
    fontSize: RFValue(12),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  dateRange: {
    fontSize: RFValue(9),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#7E7E7E',
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  // Chart section styles
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: '#D3D3D3',
    borderRadius: 40,
    marginTop: 10,
  },

  // Income & expense box styles
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeBox: {
    borderColor: '#EBEFF1',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    width: '48%',
  },
  expenseBox: {
    borderColor: '#EBEFF1',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    width: '48%',
  },
  incomeText: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#000',
    marginBottom: 5,
  },
  incomeAmount: {
    color: '#28A580',
    fontSize: RFValue(13),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  expenseText: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#000',
    marginBottom: 5,
  },

  // Modal-related styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.9)', // Transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    height: '73%',
  },
  modalTitle: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#000',
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  // Numpad styles
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

  // Modal action styles
  modalActions: {
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#000',
    width: 85,
    paddingVertical: 33,
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
    marginTop: 5,
  },
  confirmText: {
    fontSize: RFValue(13),
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Medium',
  },

  // Transaction list styles
  transactionList: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginBottom: 500,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
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
    marginTop: 2,
  },
  transactionDate: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(9),
    color: '#6C757D',
    marginTop: 5,
    marginLeft: 5,
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

  // Other UI elements
  arrowDetail: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  boxFilter: {
    backgroundColor: '#FFFF',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 20,
    marginVertical: 20,
    justifyContent: 'center',
  },
  transactionFilter: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: RFValue(11),
    color: 'black',
    paddingLeft: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
  },
  confirmButtons: {
    backgroundColor: '#000',
    width: 85,
    paddingVertical: 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  arrowIcon: {
    width: 17,
    height: 17,
  },
});

export default styles;
