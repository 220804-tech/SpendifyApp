import React from 'react';
import {Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const ExpensePieChart = ({data}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <PieChart
      data={data}
      width={screenWidth}
      height={185}
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="-25"
    />
  );
};

export default ExpensePieChart;
