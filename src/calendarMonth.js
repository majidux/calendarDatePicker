import * as _ from "lodash";
import moment from "moment-jalaali";
// سالی که در حال حاضر در آن قرار داریم
let currentYear = moment().format('jYY');


// شروع ماه فروردین و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let farvardin = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const farvardinSpreadOn = farvardin.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfFarvardin = moment(`${currentYear}/1/1`, 'jYYYY/jM/jD').weekday();
let startDayOfFarvardin = _.range(firstDayOfFarvardin);
const farvardinSpreadOff = startDayOfFarvardin.map((monthDay, key) => ({...monthDay, ['']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spread = [...farvardinSpreadOff,...farvardinSpreadOn];


// شروع ماه اردیبهشت و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده

let ordibehesht = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const ordibeheshtSpreadOn = ordibehesht.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfOrdibehesht = moment(`${currentYear}/2/1`, 'jYYYY/jM/jD').weekday();
let startDayOfOrdibehesht = _.range(firstDayOfOrdibehesht-1);
const ordibeheshtSpreadOff = startDayOfOrdibehesht.map((monthDay, key) => ({...monthDay, ['']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadOrdibehesht = [...ordibeheshtSpreadOff,...ordibeheshtSpreadOn];



// شروع ماه خرداد و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let khordad = _.range(1, moment.jDaysInMonth(currentYear, 2) + 1);
const startOfKhordad = moment().startOf('jMonth').format('jD');
let startDayOfKhordad = _.range(1, startOfKhordad);
khordad.unshift(startDayOfKhordad);
console.log(khordad);

// شروع ماه تیر و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let tir = _.range(1, moment.jDaysInMonth(currentYear, 3) + 1);
const startOfTir = moment().startOf('jMonth').format('jD');
let startDayOfTir = _.range(1, startOfTir);
tir.unshift(startDayOfTir);

// شروع ماه مرداد و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let mordad = _.range(1, moment.jDaysInMonth(currentYear, 4) + 1);
const startOfMordad = moment().startOf('jMonth').format('jD');
let startDayOfMordad = _.range(1, startOfMordad);
mordad.unshift(startDayOfMordad);

// شروع ماه شهریور و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let shahrivar = _.range(1, moment.jDaysInMonth(currentYear, 5) + 1);
const startOfShahrivar = moment().startOf('jMonth').format('jD');
let startDayOfShahrivar = _.range(1, startOfShahrivar);
shahrivar.unshift(startDayOfShahrivar);


// شروع ماه مهر و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let mehr = _.range(1, moment.jDaysInMonth(currentYear, 6) + 1);
const startOfMehr = moment().startOf('jMonth').format('jD');
let startDayOfMehr = _.range(1, startOfMehr);
mehr.unshift(startDayOfMehr);


// شروع ماه ابان و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let aban = _.range(1, moment.jDaysInMonth(currentYear, 7) + 1);
const startOfAban = moment().startOf('jMonth').format('jD');
let startDayOfAban = _.range(1, startOfAban);
aban.unshift(startDayOfAban);


// شروع ماه آذر و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let azar = _.range(1, moment.jDaysInMonth(currentYear, 8) + 1);
const startOfAzar = moment().startOf('jMonth').format('jD');
let startDayOfAzar = _.range(1, startOfAzar);
azar.unshift(startDayOfAzar);


// شروع ماه دی و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let day = _.range(1, moment.jDaysInMonth(currentYear, 9) + 1);
const startOfDay = moment().startOf('jMonth').format('jD');
let startDayOfDay = _.range(1, startOfDay);
day.unshift(startDayOfDay);


// شروع ماه بهمن و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let bahman = _.range(1, moment.jDaysInMonth(currentYear, 10) + 1);
const startOfBahman = moment().startOf('jMonth').format('jD');
let startDayOfBahman = _.range(1, startOfBahman);
bahman.unshift(startDayOfBahman);


let esfand = _.range(1, moment.jDaysInMonth(currentYear, 11) + 1);
const startOfEsfand = moment().startOf('jMonth').format('jD');
let startDayOfEsfand = _.range(1, startOfEsfand);
esfand.unshift(startDayOfEsfand);


let months = [
    {
        id: 1,
        month: 'فروردین',
        days: spread
    },
    {
        id: 2,
        month: 'اردیبهشت',
        days: spreadOrdibehesht
    },
    {
        id: 3,
        month: 'خرداد',
        days: khordad
    },
    {
        id: 4,
        month: 'تیر',
        days: tir
    },
    {
        id: 5,
        month: 'مرداد',
        days: mordad
    },
    {
        id: 6,
        month: 'شهریور',
        days: shahrivar
    },
    {
        id: 7,
        month: 'مهر',
        days: mehr
    },
    {
        id: 8,
        month: 'آبان',
        days: aban
    },
    {
        id: 9,
        month: 'آذر',
        days: azar
    },
    {
        id: 10,
        month: 'دی',
        days: day
    },
    {
        id: 11,
        month: 'بهمن',
        days: bahman
    },
    {
        id: 12,
        month: 'اسفند',
        days: esfand
    }
];

export default months;
