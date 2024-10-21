import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  // Welcome Section
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
  calendarIcon: {
    width: 27,
    height: 27,
  },

  // Title Section
  titleText: {
    fontSize: RFValue(24),
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: 30,
    marginBottom: 20,
    color: '#000',
  },
  expenseLabel: {
    fontSize: RFValue(10),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#000',
    textAlign: 'center',
  },

  // Expense Card Section
  expenseCard: {
    backgroundColor: '#FEFEFE',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    borderColor: '#EBEFF1',
    borderWidth: 1,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseTitle: {
    fontSize: RFValue(15),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: 'black',
  },
  expenseAmount: {
    color: '#E74C3C',
    fontSize: RFValue(12),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  dateRange: {
    fontSize: RFValue(10),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#7E7E7E',
    marginBottom: 15,
  },

  // Chart Section
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

  // Expense Details Section
  expenseDetails: {
    flex: 1,
    paddingLeft: 10,
    marginTop: 20,
  },
  expenseItem: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#000',
    marginBottom: 10,
  },

  // Income and Expense Box Section
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
  expenseBox: {
    borderColor: '#EBEFF1',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    width: '48%',
  },
  expenseText: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#000',
    marginBottom: 5,
  },

  // Alert Section (Wallet Section)
  alertBox: {
    backgroundColor: '#FC9F86',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  alertText: {
    color: 'white',
    fontSize: RFValue(12),
    fontFamily: 'PlusJakartaSans-Medium',
  },
  walletText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  // Buttons Section
  btnAdd: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  btnAdds: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    marginRight: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  arrowNextIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },

  // Modal Section
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
  modalHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalOptions: {
    backgroundColor: '#E0ECFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginRight: 8,
  },
  modalOption: {
    backgroundColor: '#E0FFE0',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  modalOptionCategory: {
    backgroundColor: '#E0FFE0',
    paddingVertical: 14,
    borderRadius: 15,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 155,
    paddingHorizontal: 15,
  },
  modalOptionText: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Medium',
    color: 'black',
    marginTop: -4,
  },
  arrowIcon: {
    width: 17,
    height: 17,
  },

  // Input Section
  amountInput: {
    fontSize: RFValue(28),
    textAlign: 'center',
    marginVertical: 5,
    color: 'black',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  commentInput: {
    fontSize: RFValue(12),
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 5,
    fontFamily: 'PlusJakartaSans-Medium',
    color: 'black',
  },

  // NumPad Section
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

  // Modal Actions
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
  confirmButtons: {
    backgroundColor: '#000',
    width: 85,
    paddingVertical: 75,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  confirmText: {
    fontSize: RFValue(13),
    color: '#FFF',
    fontFamily: 'PlusJakartaSans-Medium',
  },

  // Filter Section
  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderColor: '#EBEFF1',
    borderWidth: 1,
    borderRadius: 17,
    marginLeft: 9,
  },
  activeFilterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 17,
  },
  filterText: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#000',
    marginTop: -5,
  },
  activeFilterText: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#FFF',
    marginTop: 3,
  },

  // Category Modal Section
  categoryModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  categoryModalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '34%',
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

  // Miscellaneous
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  // Calendar Modal Section
  calendarModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  calendarModalBackdrop: {
    flex: 1,
  },
  calendarModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
  },

  // Row Styles
  row: {
    flexDirection: 'row',
  },
});

export default styles;
