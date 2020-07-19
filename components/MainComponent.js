import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform,Image,StyleSheet, Text } from 'react-native';
import { createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
// import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import Reservation from './ReservationComponent';
import SafeAreaView,{SafeAreaProvider} from 'react-native-safe-area-view';

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation,
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: ()=><Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.navigate('DrawerToggle') } />    
  })
}
}
);
const HomeNavigator = createStackNavigator({
  Home: { screen: Home ,
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: ()=><Icon name='menu' size={24}
      color='white'
      onPress={() => navigation.toggleDrawer()}
    />
  })
}
});

const AboutNavigator = createStackNavigator({
  About: { screen: About,
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name='menu' size={24}
      color='white'
      onPress={() => navigation.toggleDrawer()}
    />
  })
}
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact,

  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: ()=><Icon name='menu' size={24}
      color='white'
      onPress={() => navigation.toggleDrawer()}
    />
  })
}
});

const MenuNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerLeft: ()=><Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()}
      />
    })
  },
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
const CustomDrawerContentComponent = (props)=>{
  return(
    <SafeAreaProvider>
  <ScrollView>
    <SafeAreaView style={styles.container}
    forceInset={{top:'always',horizontal:'never'}}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
          <Image source={{uri:baseUrl+'images/logo.png'}}
          style={styles.drawerImage}/>
        </View>
        <View style={{flex:2}}>
          <Text style={styles.drawerHeaderText}>Restorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props}/>
    </SafeAreaView>

  </ScrollView>
  </SafeAreaProvider>
)
  }
const MainNavigator = createDrawerNavigator({
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        drawerLabel:'Home',
        drawerIcon:({ tintColor, focused }) => (
          <Icon
            name='home'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ),
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
    About: 
    { screen: AboutNavigator,
      navigationOptions: {
        title: 'About Us',
        drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
      }, 
    },
    Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
      }, 
    },
    Contact: 
    { screen: ContactNavigator,
      navigationOptions: {
        title: 'Contact Us',
        drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
      }, 
    },
    Reservation:{
      screen: ReservationNavigator,
      navigationOptions: {
        title: 'Reseerve Table',
        drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
      },

    }
},
 {
drawerBackgroundColor: '#D1C4E9',
contentComponent: CustomDrawerContentComponent
});



const MainScreen = createAppContainer(MainNavigator);

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    return (
        <MainScreen/>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  drawerHeader:{
    backgroundColor:'#512DA8',
    height:140,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    flexDirection:'row'
  },
  drawerHeaderText:{
    color:'white',
    fontSize:24,
    fontWeight:'bold'
  },
  drawerImage:{
    margin:10,
    width:80,
    height:60
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);