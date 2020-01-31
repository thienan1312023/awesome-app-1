import React from "react";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { LoginScreen } from "../screens";
import DrawerNavigator from './sidebar';

const createRootNavigator = (signedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      SignedIn: {
        screen: DrawerNavigator
      },
      SignedOut: {
        screen: LoginScreen
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  ));
};

// const MainNavigator = createStackNavigator({
//   LoginScreen: { screen: LoginScreen },
//   StatisticScreen: { screen: StatisticScreen },
// });

// export default MainNavigator;
export default createRootNavigator;