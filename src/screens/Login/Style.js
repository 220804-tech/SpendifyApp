// Style.js
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  backButton: {
    marginBottom: 20,
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: RFValue(26),
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    color: 'black',
  },
  signInButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  signInText: {
    color: '#FFF',
    fontSize: RFValue(13),
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;
