import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Single/HomeScreen';
import ProfileScreen from '../screens/Double/ProfileScreen';
import SettingsScreen from '../screens/Choose/SettingsScreen';
import HeaderRight from '../components/HeaderRight';
import { APP_SCREEN_NAME } from '../constants/AppScreenName';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === APP_SCREEN_NAME.SINGLE) {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === APP_SCREEN_NAME.DOUBLE) {
            iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
          } else if (route.name === APP_SCREEN_NAME.CHOOSE) {
            iconName = focused ? 'options' : 'options-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen 
          name={APP_SCREEN_NAME.SINGLE} 
          component={HomeScreen} 
          options={{ 
            tabBarLabel: APP_SCREEN_NAME.SINGLE,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Tab.Screen 
          name={APP_SCREEN_NAME.DOUBLE}
          component={ProfileScreen} 
          options={{ 
            tabBarLabel: APP_SCREEN_NAME.DOUBLE,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Tab.Screen 
          name={APP_SCREEN_NAME.CHOOSE} 
          component={SettingsScreen} 
          options={{ 
            tabBarLabel: APP_SCREEN_NAME.CHOOSE,
            headerRight: () => <HeaderRight />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;






