import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {authStore} from '../stores/authStore';

// Import Screens
import SplashScreen from '../screens/Splash/Index';
import LoginScreen from '../screens/Login/Index';
import HomeScreen from '../screens/Home/Index';
import WalletScreen from '../screens/Home/Wallet/Index';
import ProfileScreen from '../screens/Profile/Index';

import DashboardAdmin from '../screens/Home/Admin/Index';
import ExpenseAll from '../screens/Home/Admin/ExpenseAll/Index';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isLoggedIn} = authStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            <Stack.Screen name="Dashboard" component={DashboardAdmin} />
            <Stack.Screen name="Expense" component={ExpenseAll} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
