/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import Navigation from './src/routes/route';
import {authStore} from './src/stores/authStore';
import {View, ActivityIndicator} from 'react-native';

export default function App() {
  const {loadUserData, isLoggedIn} = authStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await loadUserData();
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return <Navigation />;
}
