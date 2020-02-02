import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import all the screens
import CreateScreen from '../screens/create';
//import ListScreen from '../screens/list';
import StatisticScreen from '../screens/statistic';
import POIsScreen from '../screens/pois';


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
// const List_StackNavigator = createStackNavigator({
//   //All the screen from the Second Option will be indexed here
//   Second: {
//     screen: ListScreen,
//     navigationOptions: ({ navigation }) => ({
//       title: 'List Screen',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

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

//Stack Navigator for the Third Option of Navigation Drawer
const POIs_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: POIsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'List screen',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});


//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavCreateScreen: {
      screen: Create_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Create Screen',
      },
    },
    // NavListScreen: {
    //   screen: List_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: 'List Screen',
    //   },
    // },
    NavStatisticScreen: {
      screen: Statistic_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Statistic Screen',
      },
    },
    NavListScreen: {
      screen: POIs_StackNavigator,
      navigationOptions: {
        drawerLabel: 'List Screen',
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


export default DrawerNavigator;
