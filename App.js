
import React, {Component} from 'react';
import {StyleSheet, View,TouchableOpacity,Text} from 'react-native';
import ModalCalendar from "./src/ModalCalendar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitle: 'یادداشت',
      Alert_Visibility: false,
      selectedDay: 'تاریخ و زنگ هشدار'
    }
  }
  visibility = () => {
    this.setState(prev => ({Alert_Visibility: !this.state.Alert_Visibility}));
  };
  visibleAndSendSelectedDay = (selectedDay) => {
    this.setState({Alert_Visibility: !this.state.Alert_Visibility}, () => this.setState({selectedDay: selectedDay}));
  };
  render() {
    return (
      <View style={styles.container}>
        
        
        <ModalCalendar
            visibility={this.visibility}
            Alert_Visibility={this.state.Alert_Visibility}
            visibleAndSendSelectedDay={this.visibleAndSendSelectedDay}
        />
        <TouchableOpacity
            activeOpacity={.7}
            onPress={this.visibility}>
          <View>
            <View>
            </View>
        
            <View>
              <Text>{this.state.selectedDay}</Text>
            </View>
        
          </View>
        </TouchableOpacity>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'pink'
  }
});
