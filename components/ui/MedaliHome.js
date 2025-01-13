import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MendaliComponent = () => {
  // Example individual conditions for each image
  const conditions = {
    medalRed: true,
    medalBlue: false,
    medalUngu: false,
    medalGold: false,
  };

  return (
      <View style={styles.medali}>
        <Image
          style={[
            styles.image,
            { opacity: conditions.medalRed ? 1 : 0.5 },
          ]}
          source={require('../../assets/images/medalred.png')}
        />
        <Image
          style={[
            styles.image,
            { opacity: conditions.medalBlue ? 1 : 0.5 },
          ]}
          source={require('../../assets/images/medalblue.png')}
        />
        <Image
          style={[
            styles.image,
            { opacity: conditions.medalUngu ? 1 : 0.5 },
          ]}
          source={require('../../assets/images/medalungu.png')}
        />
        <Image
          style={[
            styles.image,
            { opacity: conditions.medalGold ? 1 : 0.5 },
          ]}
          source={require('../../assets/images/medalgold.png')}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  medali: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:15,
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default MendaliComponent;
