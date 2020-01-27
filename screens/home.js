import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

//Import all the screens
import CreateScreen from './create';
import ListScreen from './list';
import StatisticScreen from './statistic';

//Import Custom Sidebar
// import CustomSidebarMenu from './CustomSidebarMenu';

global.currentScreenIndex = 0;

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../assets/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//Stack Navigator for the First Option of Navigation Drawer
const Create_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: CreateScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Location',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Second Option of Navigation Drawer
const List_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Second: {
    screen: ListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'List Screen',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Third Option of Navigation Drawer
const Statistic_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: StatisticScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Statistic screen',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavCreateScreen: {
      screen: Create_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Create Screen',
      },
    },
    NavListScreen: {
      screen: List_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    NavStatisticScreen: {
      screen: Statistic_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Statistic Screen',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    //contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  }
);

const BottomNav = createBottomTabNavigator({
  Entrantes: Statistic_StackNavigator,
});

const switchNavigator = createSwitchNavigator(
  {
    Bottom: BottomNav,
    Drawler:DrawerNavigatorExample
  },
  {
    initialRouteName: 'Bottom',
  }
);
export default createAppContainer(DrawerNavigatorExample);
