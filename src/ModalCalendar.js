import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    FlatList,
    ScrollView,
    Animated,
    SectionList
} from 'react-native';
import months from './calendarMonth';
import moment from 'moment-jalaali';
import * as _ from "lodash";


let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class ModalCalendar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            indexList: '',
            sss: '',
            selectedDay: null,
            scrollX: new Animated.Value(1),
            yearChange: 1398,
            monthChange: 1,
            posDivide: null
        }
    }
    
    zeroMonthYearUp = () => {
        this.setState({monthChange: 0});
        this.setState({yearChange: this.state.yearChange + 1})
    };
    
    selectDay = (day) => {
        this.setState({selectedDay: day})
    };
    
    onScrollFlatList = () => {
        Animated.event([{nativeEvent: {contentOffset: {x: this.state.scrollX}}}]);
        this.setState({monthChange: this.state.monthChange + 1});
    };
    
    closeModal = () => {
        this.setState({monthChange: 1},
            () => this.setState({selectedDay: null},
                () => this.props.visibility()))
    };
    
    confirmButtonFunction = () => {
        let {selectedDay} = this.state;
        this.props.visibleAndSendSelectedDay(selectedDay);
    };
    
    render() {
        const dayNameInWeek = moment({dialect: 'persian-modern'}).format('ddd');
        
        let currentMonth = moment({dialect: 'persian-modern'}).format('jMMMM');
        let currentMonthIndex = moment({dialect: 'persian-modern'}).format('jM');
        let currentMonthNumber = currentMonthIndex - 1;
        let currentYear = moment({dialect: 'persian-modern'}).format('jYYYY');
        let currentDay = moment({dialect: 'persian-modern'}).format('ddd');
        let monthsInYear = moment.months();
        let daysOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
        let dayInMonth = _.range(1, moment.jDaysInMonth(this.state.yearChange, this.state.monthChange) + 1);
        return (
            <Modal
                hardwareAccelerated={true}
                visible={this.props.Alert_Visibility}
                animated={true}
                transparent={true}
                animationType={'fade'}
                onRequestClose={() => {
                    this.options(this.props.visible)
                }}
            >
                <View style={styles.className}>
                    <View style={styles.calendarHeader}>
                        <View style={styles.dateTitleView}>
                            <Text style={styles.dateTitle}>تاریخ</Text>
                        </View>
                        <View>
                            <Text style={styles.yearText}>{currentYear}</Text>
                        </View>
                        <View>
                            <Text style={styles.dayText}>{currentDay} 13 {currentMonth}</Text>
                        </View>
                    </View>
                    <View style={styles.allFlatList}>
                        <FlatList
                            data={monthsInYear}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            initialScrollIndex={currentMonthNumber}
                            pagingEnabled
                            keyExtractor={(item) => `${item}`}
                            renderItem={({item}) =>
                                <View style={styles.monthView}>
                                    <Text style={styles.currentMonth}>{item} {currentYear}</Text>
                                </View>
                            }
                        />
                        <View style={styles.daysOfWeekViewAll}>
                            {
                                daysOfWeek.map((item, i) =>
                                    <View style={styles.daysOfWeekViews} key={i}>
                                        <Text style={styles.daysOfWeekText}>{item}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#e45'}}>{dayNameInWeek}</Text>
                        </View>
                        <FlatList
                            data={months}
                            pagingEnabled
                            horizontal
                            initialScrollIndex={currentMonthNumber}
                            onMomentumScrollBegin={this.onScrollFlatList}
                            onEndReached={this.zeroMonthYearUp}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.daysItemViewFlatList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({item: {id}}) =>
                                <View style={styles.daysItemViewOutside}>
                                    <FlatList
                                        data={dayInMonth}
                                        numColumns={7}
                                        scrollEnabled={false}
                                        keyExtractor={(days) => `${days}`}
                                        renderItem={({item}) =>
                                            <TouchableOpacity
                                                onPress={this.selectDay.bind(this, `${id}/${item}`)}
                                            >
                                                <View style={
                                                    this.state.selectedDay === `${id}/${item}` ?
                                                        [styles.daysItem, styles.daysItemSelected] :
                                                        styles.daysItem
                                                }>
                                                    <Text style={
                                                        this.state.selectedDay === `${id}/${item}` ?
                                                            [styles.daysAmountInMonth, styles.daysAmountInMonthSelected] :
                                                            styles.daysAmountInMonth
                                                    }>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            }
                        />
                        
                        
                        <View style={styles.confirmCancelButton}>
                            <TouchableOpacity
                                onPress={this.confirmButtonFunction}
                                style={styles.confirmButtonStyle}
                            >
                                <Text style={styles.textStyleConfirmCancel}>تایید</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.closeModal}
                            >
                                <Text style={styles.textStyleConfirmCancel}>انصراف</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                <TouchableOpacity
                    underlayColor={'transparent'}
                    onPress={this.props.visibility}
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
    className: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 40,
        // justifyContent: 'center',
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
        backgroundColor: '#fff'
    },
    monthView: {
        width: deviceWidth - 32,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateTitle: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'IranSans'
    },
    yearText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'IranSans'
    },
    dayText: {
        fontSize: 24,
        color: '#ffffff',
        fontFamily: 'IranSans'
    },
    daysOfWeekViewAll: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    daysOfWeekViews: {
        marginHorizontal: 17
    },
    daysOfWeekText: {
        fontSize: 12,
        color: '#7d7d7d',
        fontFamily: 'IranSans'
    },
    daysItem: {
        width: 36,
        height: 36,
        marginVertical: 5,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    daysItemSelected: {
        borderRadius: 50,
        backgroundColor: '#e46325',
    },
    daysAmountInMonth: {
        fontSize: 14,
        color: '#232f34',
        fontFamily: 'IRANSans_Medium',
    },
    daysAmountInMonthSelected: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'IRANSans_Medium'
    },
    daysItemViewFlatList: {
        justifyContent: 'space-between',
    },
    daysItemViewSecondFlatList: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'lightgreen',
        alignItems: 'center'
    },
    confirmCancelButton: {
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        padding: 10,
    },
    daysItemViewOutside: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'skyblue',
        width: deviceWidth - 32,
        paddingHorizontal: 10,
        // flex: 1,
    },
    currentMonth: {
        fontFamily: 'IRANSans_Medium',
        fontSize: 14,
        color: '#232f34'
    },
    textStyleConfirmCancel: {
        fontFamily: 'IRANSans_Medium',
        fontSize: 14,
        color: '#1ea07e'
    },
    confirmButtonStyle: {
        marginHorizontal: 15
    }
});
