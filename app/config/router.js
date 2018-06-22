import React from 'react';
import { StackNavigator, TabNavigator, createStackNavigator } from 'react-navigation';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Group from '../screens/group';

export const StackN = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      }
    },
    Group: {
      screen: Group,
      navigationOptions: {
        header: null,
      }
    }
});
