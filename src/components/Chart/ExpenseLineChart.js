/* eslint-disable react-native/no-inline-styles */
// components/Chart/ExpenseLineChart.js
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ExpenseLineChart = ({data}) => {
  if (!data) {
    // If data is not yet available, render nothing or a placeholder
    return null;
  }

  return (
    <LineChart
      data={data}
      width={screenWidth - 70} // Adjust for padding/margin
      height={200}
      chartConfig={{
        fontFamily: 'PlusJakartaSans-Regular',
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0, // Show whole numbers on Y-axis
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      bezier
    />
  );
};

export default ExpenseLineChart;
