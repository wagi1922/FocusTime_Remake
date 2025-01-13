import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleBarChart = ({ fetchValues }) => {
    

  const [leftValue, setLeftValue] = useState(25);
  const [rightValue, setRightValue] = useState(25);

  useEffect(() => {
    const getData = async () => {
      try {
        const { left, right } = await fetchValues();
        setLeftValue(left);
        setRightValue(right);
      } catch (error) {
        console.error('Error fetching values:', error);
      }
    };

    getData();
  }, [fetchValues]);

  const totalValue = leftValue + rightValue;
  const leftPercentage = (leftValue / totalValue) * 150;
  const rightPercentage = (rightValue / totalValue) * 0;

  

  return (
    <View style={styles.container}>
      
      <Text style={styles.progressText}>{leftValue}/{rightValue}</Text>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barSegment,
            { backgroundColor: '#1EFF00', width: `${leftPercentage}%` },
          ]}
        />
        
        <View
          style={[
            styles.barSegment,
            { backgroundColor: 'red', width: `${rightPercentage}%` },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  barContainer: {
    flexDirection: 'row',
    height: 10,
    width: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth:1
  },
  barSegment: {
    height: '100%',
  },
});

export default SingleBarChart;
