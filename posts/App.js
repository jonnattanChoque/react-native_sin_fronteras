import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import UsersScreen from './Screens/Users';
import PostsScreen from './Screens/Posts';
import DetailScreen from './Screens/Details';

const AppNavigator = createStackNavigator({
  Users: {
    screen: UsersScreen
  },
  Posts: {
    screen: PostsScreen
  },
  Detail: {
    screen: DetailScreen
  }
},{
  initialRouteName: 'Users'
})

export default createAppContainer(AppNavigator)
