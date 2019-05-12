import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TimePickerAndroid} from 'react-native';
import ModalClock from "./src/ModalClock";
import AnotherModalClock from "./src/AnotherModalClock";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteTitle: 'یادداشت',
            Alert_Visibility: false,
            selectedDay: 'تاریخ و زنگ هشدار',
            selectedTime: 'ساعت خالی است',
            clockVisibilityState: false,
            time:''
        }
    }
    
    visibility = () => {
        this.setState(prev => ({Alert_Visibility: !this.state.Alert_Visibility}));
    };
    
    
    visibleAndSendSelectedDay = (selectedDay) => {
        this.setState({Alert_Visibility: !this.state.Alert_Visibility},
            () => this.setState({selectedDay: selectedDay}));
    };
    
    clockVisibilityFunction = () => {
        this.setState({clockVisibilityState: !this.state.clockVisibilityState});
    };
    
    visibleClockAndSelectHour = (min , hour , day) => {
        this.setState({clockVisibilityState: !this.state.clockVisibilityState},
            () => this.setState({selectedTime: `${hour} : ${min} ${day}`}))
    };
    
    render() {
        return (
            <View style={styles.container}>
                
                {/*<ModalCalendar*/}
                {/*    visibility={this.visibility}*/}
                {/*    Alert_Visibility={this.state.Alert_Visibility}*/}
                {/*    visibleAndSendSelectedDay={this.visibleAndSendSelectedDay}*/}
                {/*/>*/}
                
                <ModalClock
                    clockVisibilityFunction={this.clockVisibilityFunction}
                    clockVisibilityState={this.state.clockVisibilityState}
                    visibleClockAndSelectHour={this.visibleClockAndSelectHour}
                />
                
                {/*<AnotherModalClock*/}
                {/*    clockVisibilityFunction={this.clockVisibilityFunction}*/}
                {/*    clockVisibilityState={this.state.clockVisibilityState}*/}
                {/*    visibleClockAndSelectHour={this.visibleClockAndSelectHour}*/}
                {/*/>*/}
                
                <TouchableOpacity
                    activeOpacity={.7}
                    // onPress={this.visibility}
                    onPress={this.clockVisibilityFunction}
                >
                    <View>
                        <Text>{this.state.selectedDay}{this.state.selectedTime}</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e7e7e7'
    }
});
