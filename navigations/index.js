import React from "react";
import { createStackNavigator } from 'react-navigation-stack';

import { LoginScreen } from "../screens";
import { HomeScreen } from "../screens";

const MainNavigator = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen },
});

export default MainNavigator;