import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    FlatList,
    Animated, ScrollView, PanResponder, LayoutAnimation,
} from 'react-native';
import moment from 'moment-jalaali';
import {beforeAfter, folan, hour, minute, minuteMap, spread} from './clock';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class ModalClock extends Component {
    
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gesture) => {
                
                position.setValue({x:0, y:Math.round(gesture.dy/100)});
                console.warn(Math.round(gesture.dy/100));
                if (this.state.upperHour < 23) {
                    this.setState({upperHour: this.state.upperHour + 1});
                } else if (this.state.upperHour === 23) {
                    this.setState({upperHour: 0});
                }
                if (this.state.currentHour < 23) {
                    this.setState({currentHour: this.state.currentHour + 1});
                } else {
                    this.setState({currentHour: 0});
                }
                if (this.state.downHour < 23) {
                    this.setState({downHour: this.state.downHour + 1});
                } else {
                    this.setState({downHour: 0});
                }
                if (this.state.secondUpperHour < 23) {
                    this.setState({secondUpperHour: this.state.secondUpperHour + 1});
                } else {
                    this.setState({secondUpperHour: 0});
                }
                if (this.state.secondDownHour < 23) {
                    this.setState({secondDownHour: this.state.secondDownHour + 1});
                } else {
                    this.setState({secondDownHour: 0});
                }
            },
            onPanResponderRelease: (event, gesture) => {
                position.setValue({x: (gesture.dx/10), y: (gesture.dy/10)});
            },
            onPanResponderEnd:(event, gesture)=>{
                position.flattenOffset()
            }
        });
        this.state = {
            panResponder,
            position,
            minuteScrollY: new Animated.Value(0),
            hourScrollY: new Animated.Value(0),
            secondUpperHour: 6,
            upperHour: 7,
            currentHour: 8,
            downHour: 9,
            secondDownHour: 10,
            id: null,
            selectedHour: 8,
            selectedDaySituation: 0,
            selectedMinute:0
        }
    }
    
    upFunc = () => {
        if (this.state.upperHour < 23) {
            this.setState({upperHour: this.state.upperHour + 1});
        } else if (this.state.upperHour === 23) {
            this.setState({upperHour: 0});
        }
        if (this.state.currentHour < 23) {
            this.setState({currentHour: this.state.currentHour + 1});
        } else {
            this.setState({currentHour: 0});
        }
        if (this.state.downHour < 23) {
            this.setState({downHour: this.state.downHour + 1});
        } else {
            this.setState({downHour: 0});
        }
        if (this.state.secondUpperHour < 23) {
            this.setState({secondUpperHour: this.state.secondUpperHour + 1});
        } else {
            this.setState({secondUpperHour: 0});
        }
        if (this.state.secondDownHour < 23) {
            this.setState({secondDownHour: this.state.secondDownHour + 1});
        } else {
            this.setState({secondDownHour: 0});
        }
    };
    downFunc = () => {
        if (this.state.upperHour === 0) {
            this.setState({upperHour: 23});
        } else {
            this.setState({upperHour: this.state.upperHour - 1});
        }
        if (this.state.currentHour === 0) {
            
            this.setState({currentHour: 23});
        } else {
            this.setState({currentHour: this.state.currentHour - 1});
        }
        if (this.state.downHour === 0) {
            this.setState({downHour: 23});
        } else {
            this.setState({downHour: this.state.downHour - 1});
        }
        if (this.state.secondDownHour === 0) {
            this.setState({secondDownHour: 23});
        } else {
            this.setState({secondDownHour: this.state.secondDownHour - 1});
        }
        if (this.state.secondUpperHour === 0) {
            this.setState({secondUpperHour: 23});
        } else {
            this.setState({secondUpperHour: this.state.secondUpperHour - 1});
        }
    };
    
    confirmClockFunction = () => {
        let min = this.state.selectedMinute;
        let hour = this.state.selectedHour;
        let day = this.state.selectedDaySituation;
        this.props.visibleClockAndSelectHour(hour,min,day);
    };
    
    closeClockModal = () => {
        this.setState({monthChange: 1},
            () => this.setState({selectedHour: null},
                () => this.props.visibleClockAndSelectHour()))
    };
    
    hourGet = () => {
        Animated.event([{nativeEvent: {contentOffset: {y: this.state.hourScrollY}}}]);
        let minPos = Animated.divide(this.state.hourScrollY, 60);
        let minPlus = Animated.add(minPos, 2);
        this.setState({id: minPlus})
    };
    
    setMinute = (selectedMinute) => {
        this.setState({selectedMinute: selectedMinute})
    };
    
    setDaySituation = (selectedDaySituation) => {
        this.setState({selectedDaySituation: selectedDaySituation})
    };
    
    setHour = (selectedHour) => {
        this.setState({selectedHour: selectedHour})
    };
    
    render() {
        let minPos = Animated.divide(this.state.minuteScrollY, 60);
        let minPlus = Animated.add(minPos, 2);
        let handles = this.state.panResponder.panHandlers;
        return (
            <Modal
                hardwareAccelerated={true}
                visible={this.props.clockVisibilityState}
                animated={true}
                transparent={true}
                animationType={'fade'}
                onRequestClose={() => {
                    this.options(this.props.clockVisibilityFunction)
                }}>
                <View style={styles.container}>
                    <View style={styles.calendarHeader}>
                        <Text>ساعت</Text>
                    </View>
                    <View style={styles.allFlatList}>
                        
                        <FlatList
                            data={hour}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state.selectedHour}
                            onScroll={this.hourGet}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={this.setHour.bind(this,item)}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: 2
                                    }}>
                                        <Text style={
                                            this.state.selectedHour === item ?
                                                styles.upperHourTextStyle
                                                :
                                                styles.minuteHourTextStyle
                                        }>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                        
                        {/*<InfiniteScroll*/}
                        {/*    data={minuteMap}*/}
                        {/*    renderItem={({ item }) =>*/}
                        {/*            <View style={{alignItems: 'center', backgroundColor: 'pink'}}>*/}
                        {/*                <Text style={styles.minuteHourTextStyle}>{item.key}</Text>*/}
                        {/*            </View>*/}
                        {/*    }*/}
                        {/*/>*/}
                        
                        <Text style={styles.minuteHourTextStyle}>:</Text>
                        
                        <View style={{ flex: 1}}>
                            
                            <FlatList
                                data={minute}
                                snapToStart={true}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state.selectedMinute}
                                snapToOffsets={this.state.scrollY}
                                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.hourScrollY}}}])}
                                keyExtractor={(item) => item.toString()}
                                renderItem={({item}) =>
                                    <TouchableOpacity onPress={this.setMinute.bind(this, item)}>
                                        <View
                                            style={{alignItems: 'center', marginVertical: 2}}>
                                            <Text style={
                                                this.state.selectedMinute === item ?
                                                    styles.upperHourTextStyle
                                                    :
                                                    styles.minuteHourTextStyle
                                            }>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                            
                            <Animated.View {...handles} style={{flex: 1}}>
                                {/*<TouchableOpacity onPress={this.upFunc}>*/}
                                {/*    <Text>Up</Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
                                {/*    <Text style={styles.secondUpperHourTextStyle}>{this.state.secondUpperHour}</Text>*/}
                                {/*</View>*/}
                                {/*<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
                                {/*    <Text style={styles.upperHourTextStyle}>{this.state.upperHour}</Text>*/}
                                {/*</View>*/}
                                
                                {/*<View style={{*/}
                                {/*    justifyContent: 'center',*/}
                                {/*    alignItems: 'center',*/}
                                {/*    flex: 1,*/}
                                {/*    marginVertical: 2*/}
                                {/*}}>*/}
                                {/*    <Text style={styles.minuteHourTextStyle}>{this.state.currentHour}</Text>*/}
                                {/*</View>*/}
                                {/*<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
                                {/*    <Text style={styles.upperHourTextStyle}>{this.state.downHour}</Text>*/}
                                {/*</View>*/}
                                {/*<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
                                {/*    <Text style={styles.secondUpperHourTextStyle}>{this.state.secondDownHour}</Text>*/}
                                {/*</View>*/}
                                
                                {/*<TouchableOpacity onPress={this.downFunc}>*/}
                                {/*    <Text>Down</Text>*/}
                                {/*</TouchableOpacity>*/}
                            </Animated.View>
                        </View>
                        
                        <FlatList
                            data={beforeAfter}
                            extraData={this.state.selectedDaySituation}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={this.setDaySituation.bind(this, item.name)}
                                                  activeOpacity={.8}>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={
                                            this.state.selectedDaySituation === item.name ?
                                                styles.selectedDay
                                                :
                                                styles.notSelectedDay
                                        }>{item.name}</Text>
                                    
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    
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
                        height: deviceHeight,
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
        paddingTop:30,
        flex: 4,
        backgroundColor: '#fff',
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
        fontSize: 20,
        color: '#777777',
        fontFamily: 'IranSans'
    },
    upperHourTextStyle: {
        fontSize: 24,
        color: '#232f34',
        fontFamily: 'IranSans'
    },
    secondUpperHourTextStyle: {
        fontSize: 16,
        color: '#b8b8b8',
        fontFamily: 'IranSans'
    },
    selectedDay: {
        fontSize: 16,
        color: '#232f34',
        fontFamily: 'IRANSans_Medium',
        marginVertical: 7
    },
    notSelectedDay: {
        fontSize: 14,
        color: '#777777',
        fontFamily: 'IRANSans_Medium',
        marginVertical: 7
    }
});
