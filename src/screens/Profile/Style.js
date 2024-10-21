import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },

  // Back Button
  backButton: {
    marginVertical: 20,
  },
  backText: {
    color: '#000',
    fontSize: RFValue(12),
    fontFamily: 'PlusJakartaSans-Medium',
  },

  // Profile Section
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 100,
    marginBottom: 15,
  },
  profileName: {
    fontSize: RFValue(14),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#000',
  },
  profileID: {
    fontSize: RFValue(10),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#7E7E7E',
  },

  // Menu Section
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  listIcon: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginBottom: 15,
    marginRight: 10,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: RFValue(12),
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#000',
  },
  menuSubtitle: {
    fontSize: RFValue(9),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#7E7E7E',
    marginTop: 2,
    borderBottomColor: '#E3E6EA',
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },

  // Logout Button
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FFE3E3',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#E74C3C',
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: -5,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '40%', // Set the height of modal
  },
  modalTitle: {
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 10,
  },
  currencyText: {
    fontSize: RFValue(12),
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 15,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default styles;
