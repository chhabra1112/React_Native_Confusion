import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff"
  })
});

const HomeScreen = createAppContainer(HomeNavigator);

const Drawer = createDrawerNavigator();

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backGroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})
const MenuScreen = createAppContainer(MenuNavigator);

class Main extends Component {

  render() {

    return (
      <NavigationContainer>
        <View style={{ flex: 1, 
         paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
          <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: '#D1C4E9'}}>
            <Drawer.Screen name="Home" component={()=><HomeScreen/>} />
            <Drawer.Screen name="Menu" component={()=><MenuScreen/>} />
          </Drawer.Navigator>
        </View>
      </NavigationContainer>
    );
  }
}

export default Main;