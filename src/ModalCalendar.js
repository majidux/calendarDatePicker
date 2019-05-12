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
    
    selectWrong = () =>{
        this.setState({selectedDay:'تاریخ و زنگ هشدار'})
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
        let currentMonth = moment({dialect: 'persian-modern'}).format('jMMMM');
        let currentMonthNumber = moment().format('jM')-1;
        let currentYear = moment({dialect: 'persian-modern'}).format('jYYYY');
        let currentDayName = moment({dialect: 'persian-modern'}).format('ddd');
        let currentDayNumber = moment().format('jDD');
        let monthsInYear = moment.months('jMMMM');
        let daysOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
        let currentYearPersian = moment.loadPersian({dialect: 'persian-modern'},'jYYYY');
        console.log(currentMonthNumber);
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
                            <Text style={styles.dayText}>{currentDayName}، {currentDayNumber} {currentMonth}</Text>
                        </View>
                    </View>
                    <View style={styles.allFlatList}>
                        <FlatList
                            data={months}
                            pagingEnabled
                            horizontal
                            initialScrollIndex={2}
                            extraData={this.state.selectedDay}
                            onMomentumScrollBegin={this.onScrollFlatList}
                            onEndReached={this.zeroMonthYearUp}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.daysItemViewFlatList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({item: {id}, item}) =>
                                <View style={styles.daysItemViewOutside}>
                                    <View style={styles.monthView}>
                                        <Text style={styles.currentMonth}>{item.month} {currentYear}</Text>
                                    </View>
                                    <View style={styles.daysOfWeekViewAll}>
                                        {
                                            daysOfWeek.map((item, i) =>
                                                <View style={styles.daysOfWeekViews} key={i}>
                                                    <Text style={styles.daysOfWeekText}>{item}</Text>
                                                </View>
                                            )
                                        }
                                    </View>
                                    <FlatList
                                        data={item.days}
                                        numColumns={7}
                                        extraData={this.state.selectedDay}
                                        // ListHeaderComponent={this.testView}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => `${item.day}`}
                                        renderItem={({item}) =>
                                            <TouchableOpacity
                                                onPress={item.offDay ?
                                                    this.selectDay.bind(this, `${currentYear}/${id}/${item.day}`)
                                                    :
                                                    this.selectWrong
                                                }
                                            >
                                                <View style={
                                                    this.state.selectedDay === `${currentYear}/${id}/${item.day}` ?
                                                        [styles.daysItem, styles.daysItemSelected] :
                                                        styles.daysItem
                                                }>
                                                    <Text style={
                                                        this.state.selectedDay === `${currentYear}/${id}/${item.day}` ?
                                                            [styles.daysAmountInMonth, styles.daysAmountInMonthSelected] :
                                                            styles.daysAmountInMonth
                                                    }>{item.day}</Text>
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
        paddingVertical: 50,
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
        marginVertical: 3,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
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
        // width: deviceWidth - 32,
        paddingHorizontal: 10,
        flex:1,
        backgroundColor:'red'
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
