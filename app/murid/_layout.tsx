import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet} from 'react-native';
import MuridScreen from './MuridScreen';
import KelasScreen from './kelas';

import DetailKelasScreen from '../../components/kelas/DetailKelasScreen';
import Pencapaian from './pencapain';
import Pengaturan from './pengaturan';
import ChatScreen from '../../components/kelas/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const NamesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="IsiKelas" component={KelasScreen} options={{ headerShown: false ,animation: "none"}} />
    <Stack.Screen name="DetailKelas" component={DetailKelasScreen} options={{ headerShown: false,animation: "none" }} />
    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false,animation: "none" }} />
  </Stack.Navigator>
);

const MuridNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = focused
                ? require('../../assets/icons/tabhome2.png')
                : require('../../assets/icons/tabhome1.png');
              break;
            case 'Kelas':
              iconSource = focused 
                ? require('../../assets/icons/tabkelas2.png')
                : require('../../assets/icons/tabkelas1.png')
              break;
            case 'Pencapain':
              iconSource = focused 
                ? require('../../assets/icons/tabpencapain2.png')
                : require('../../assets/icons/tabpencapain1.png')
              break;
            case 'Pengaturan':
              iconSource = focused 
                ? require('../../assets/icons/tabpengaturan2.png')
                : require('../../assets/icons/tabpengaturan1.png')
              break;

            default:
              iconSource = require('../../assets/icons/tabhome1.png');
          }

          return (
            <Image
              source={iconSource}
              style={{  }}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIconStyle: styles.tabBarIcon,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Home"
        component={MuridScreen}
        options={{
          tabBarLabel: '', // Menghilangkan label teks
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Kelas"
        component={NamesStack}
        options={{
          tabBarLabel: '', // Menghilangkan label teks
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Pencapain"
        component={Pencapaian}
        options={{
          tabBarLabel: '', // Menghilangkan label teks
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Pengaturan"
        component={Pengaturan}
        options={{
          tabBarLabel: '', // Menghilangkan label teks
          headerShown: false
        }}
      />

    </Tab.Navigator>
  );
};



export default MuridNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: -50 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  tabBarIcon: {
    marginTop: 20,
  },
  tabIcon: {
    width: 37,
    height: 37,
  },
  iconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 20,
  },
});
