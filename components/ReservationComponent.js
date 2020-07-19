import React, { Component } from 'react';
import { View, StyleSheet, Picker, Text, Switch, Button,Modal } from 'react-native';
import {Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class Resevation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: (new Date()),
            datePickerVisible: false,
            timePickerVisible:false,
            showModal: false
        }
    }
    
    // static navigationOptions = {
    //     title: 'Reserve Table'
    // }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});

    }
    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number Of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ smoking: value })} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity 
                    onPress={() => this.setState({datePickerVisible: true, })}
                    // style={styles.formItem}
                    >
                        <Input
                        placeholder={"01/01/2019 1:00PM"}
                        editable= {false}
                        value={this.state.date.toString()}
                        style={styles.formItem}
                    />
                    </TouchableOpacity>
                    </View>
                {this.state.datePickerVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={(this.state.date)}
                        mode="date"
                        display="default"
                        onChange={(event, value) => {
                            this.setState({
                                date: value,
                                datePickerVisible: Platform.OS === 'ios' ? true : false,
                                timePickerVisible: Platform.OS === 'ios' ? false : true
                            });

                            if (event.type === "set")
                                console.log("value:" , value);
                        }}
                    />
                )}
                {this.state.timePickerVisible && (
                <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date.getTime()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, value) => {
                            this.setState({
                                date: value,
                                timePickerVisible: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set")
                                console.log("value:" , value);
                        }}
                    />
                )}
    
                {/* <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date</Text>
                    <DateTimePicker
                        style={{flex: 2, marginRight: 20}}
                        value={new Date()}
                        mode="date"
                        minimumDate={new Date("2017-01-01")}
                        neutralButtonLabel="clear"
                        testID="dateTimePicker"
                    // ... You can check the source to find the other keys. 
                        onChange={(value) => {this.setState({date: value})}}
                    />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Time</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(value) => {this.setState({time: value})}}
                    />
                </View> */}
        <View style={styles.formRow}>
            <Button
                onPress={() => this.handleReservation()}
                title="Reserve"
                color="#512DA8"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
        <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date.toString()}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 20,
        flexDirection: 'row'
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
})

export default Resevation;