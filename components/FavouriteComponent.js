import React, { Component } from 'react';
import { View, FlatList ,Text,Alert} from 'react-native';
import { ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavourite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapDispatchToProps = dispatch => ({
    deleteFavourite: (dishId) => dispatch(deleteFavourite(dishId))
})

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favourites: state.favourites
    }
  }

class Favourites extends Component{
    static navigationOptions = {
        title: 'My Favourites'
    };

    render() {

        const { navigate } = this.props.navigation;
        

        const renderMenuItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavourite(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                        
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                    />
                    </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}> 
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favourites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
                </Animatable.View>
            );
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);