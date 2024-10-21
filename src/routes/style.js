import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(8),
    marginBottom: 3,
  },
  tabBarIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIcon: {
    width: 22,
    height: 22,
  },
  tabBarStyle: {
    backgroundColor: '#FFF',
    paddingVertical: 4,
    elevation: 0,
  },
});

export default styles;
