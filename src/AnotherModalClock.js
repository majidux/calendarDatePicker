import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    FlatList,
    Animated, ScrollView, AlertStatic as Alert, StatusBar, Image,
} from 'react-native';
import moment from 'moment-jalaali';
import {beforeAfter, folan, hour, minute, spread} from './clock';

let deviceWidth = Dimensions.get('window').width;
let width = Dimensions.get('window').width;

export default class AnotherModalClock extends Component {
    
    confirmClockFunction = (data) => {
        this.setState({selectedHour:data});
        this.props.visibleClockAndSelectHour();
    };
    
    closeClockModal = () => {
        this.setState({monthChange: 1},
            () => this.setState({selectedHour: null},
                () => this.props.visibility()))
    };
    
    
    render() {
        return (
            <Modal
                hardwareAccelerated={true}
                visible={this.props.clockVisibilityState}
                animated={true}
                transparent={true}
                animationType={'fade'}
                onRequestClose={() => {
                    this.options(this.props.clockVisibilityFunction)
                }}
            >
                <View style={styles.container}>
                    <View style={styles.calendarHeader}>
                        <Text>ساعت</Text>
                    </View>
                    <View style={styles.allFlatList}>
                    
                    </View>
                    <View style={styles.confirmCancelButton}>
                        <TouchableOpacity
                            onPress={this.confirmClockFunction.bind(this, this.state.currentHour)}
                            style={styles.confirmButtonStyle}
                        >
                            <Text style={styles.textStyleConfirmCancel}>تایید</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.closeClockModal}
                        >
                            <Text style={styles.textStyleConfirmCancel}>انصراف</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity
                    underlayColor={'transparent'}
                    onPress={this.props.clockVisibilityFunction}
                    style={{
                        position: 'absolute',
                        zIndex: -1,
                        backgroundColor: 'rgba(100,100,100,0.7)',
                        width: deviceWidth,
                        height: height,
                    }}/>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 100,
        borderRadius: 5,
    },
    calendarHeader: {
        backgroundColor: '#1ea07e',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: 14,
        paddingBottom: 11,
        paddingRight: 26,
        flex: 1,
    },
    allFlatList: {
        paddingBottom: 10,
        flex: 4,
        backgroundColor: '#e45',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    confirmCancelButton: {
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        padding: 10,
    },
    textStyleConfirmCancel: {
        fontFamily: 'IRANSans_Medium',
        fontSize: 14,
        color: '#1ea07e'
    },
    confirmButtonStyle: {
        marginHorizontal: 15
    },
    minuteHourTextStyle: {
        fontSize: 24,
        color: '#232f34',
        fontFamily: 'IranSans'
    },
});
