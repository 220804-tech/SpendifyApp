import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF0BE',
  },
  illustration: {
    width: 305,
    height: 305,
    marginBottom: 160,
    alignSelf: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    right: 7,
    width: '96%',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 25,
    borderRadius: 40,
  },
  title: {
    fontSize: RFValue(26),
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: RFValue(10),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#728596',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 15,
    width: 320,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 95,
    paddingVertical: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFValue(11),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: -4,
  },
});

export default styles;
