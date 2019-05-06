import * as _ from "lodash";
import moment from "moment-jalaali";
// سالی که در حال حاضر در آن قرار داریم
let currentYearPersian = moment().format('jYYYY');
let currentYear = moment.loadPersian({dialect: 'persian-modern'},'jYYYY');

console.log(currentYearPersian);
// شروع ماه فروردین و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let farvardin = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const farvardinSpreadOn = farvardin.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfFarvardin = moment(`${currentYearPersian}/1/1`, 'jYYYY/jM/jD').weekday();
let startDayOfFarvardin = _.range(firstDayOfFarvardin);
const farvardinSpreadOff = startDayOfFarvardin.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadFarvandin = [...farvardinSpreadOff,...farvardinSpreadOn];
console.log(farvardinSpreadOff);




// شروع ماه اردیبهشت و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let ordibehesht = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const ordibeheshtSpreadOn = ordibehesht.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfOrdibehesht = moment(`${currentYearPersian}/2/1`, 'jYYYY/jM/jD').weekday();
let startDayOfOrdibehesht = _.range(firstDayOfOrdibehesht);
const ordibeheshtSpreadOff = startDayOfOrdibehesht.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadOrdibehesht = [...ordibeheshtSpreadOff,...ordibeheshtSpreadOn];
console.log(startDayOfOrdibehesht);


// شروع ماه خرداد و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let khordad = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const khordadSpreadOn = khordad.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfKhordad = moment(`${currentYearPersian}/3/1`, 'jYYYY/jM/jD').weekday();
let startDayOfKhordad = _.range(firstDayOfKhordad);
const khordadSpreadOff = startDayOfKhordad.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadKhordad = [...khordadSpreadOff,...khordadSpreadOn];
console.log(firstDayOfKhordad);





// شروع ماه تیر و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let tir = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const tirSpreadOn = tir.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfTir = moment(`${currentYearPersian}/4/1`, 'jYYYY/jM/jD').weekday();
let startDayOfTir = _.range(firstDayOfTir);
const tirSpreadOff = startDayOfTir.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadTir = [...tirSpreadOff,...tirSpreadOn];
console.log(firstDayOfTir);




// شروع ماه مرداد و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let mordad = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const mordadSpreadOn = mordad.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfMordad = moment(`${currentYearPersian}/5/1`, 'jYYYY/jM/jD').weekday();
let startDayOfMordad = _.range(firstDayOfMordad);
const mordadSpreadOff = startDayOfMordad.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadMordad = [...mordadSpreadOff,...mordadSpreadOn];
console.log(firstDayOfMordad);




// شروع ماه شهریور و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let shahrivar = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const shahrivarSpreadOn = shahrivar.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfShahrivar = moment(`${currentYearPersian}/6/1`, 'jYYYY/jM/jD').weekday();
let startDayOfShahrivar = _.range(firstDayOfShahrivar);
const shahrivarSpreadOff = startDayOfShahrivar.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadShahrivar = [...shahrivarSpreadOff,...shahrivarSpreadOn];
console.log(firstDayOfShahrivar);



// شروع ماه مهر و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let mehr = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const mehrSpreadOn = mehr.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfMehr = moment(`${currentYearPersian}/7/1`, 'jYYYY/jM/jD').weekday();
let startDayOfMehr = _.range(firstDayOfMehr);
const mehrSpreadOff = startDayOfMehr.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadMehr = [...mehrSpreadOff,...mehrSpreadOn];
console.log(startDayOfMehr);


// شروع ماه ابان و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let aban = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const abanSpreadOn = aban.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfAban = moment(`${currentYearPersian}/8/1`, 'jYYYY/jM/jD').weekday();
let startDayOfAban = _.range(firstDayOfAban);
const abanSpreadOff = startDayOfAban.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadAban = [...abanSpreadOff,...abanSpreadOn];
console.log(startDayOfAban);


// شروع ماه آذر و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let azar = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const azarSpreadOn = azar.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfAzar = moment(`${currentYearPersian}/9/1`, 'jYYYY/jM/jD').weekday();
let startDayOfAzar = _.range(firstDayOfAzar);
const azarSpreadOff = startDayOfAzar.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadAzar = [...azarSpreadOff,...azarSpreadOn];
console.log(startDayOfAzar);


// شروع ماه دی و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let dey = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const deySpreadOn = dey.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfDey = moment(`${currentYearPersian}/10/1`, 'jYYYY/jM/jD').weekday();
let startDayOfDey = _.range(firstDayOfDey);
const deySpreadOff = startDayOfDey.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadDey = [...deySpreadOff,...deySpreadOn];
console.log(startDayOfDey);


// شروع ماه بهمن و گرفتن اندازه آن و شیفت کردن آن به روز های باقی مانده
let bahman = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const bahmanSpreadOn = bahman.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfBahman= moment(`${currentYearPersian}/11/1`, 'jYYYY/jM/jD').weekday();
let startDayOfBahman= _.range(firstDayOfBahman);
const bahmanSpreadOff = startDayOfBahman.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadBahman= [...bahmanSpreadOff,...bahmanSpreadOn];
console.log(startDayOfDey);


let esfand = _.range(1, moment.jDaysInMonth(currentYear, 0) + 1);
const esfandSpreadOn = esfand.map((monthDay, key) => ({...monthDay, ['day']: key+1, offDay: true}));

//تعداد روز هایی که نباید باشن
const firstDayOfEsfand= moment(`${currentYearPersian}/12/1`, 'jYYYY/jM/jD').weekday();
let startDayOfEsfand= _.range(firstDayOfEsfand);
const esfandSpreadOff = startDayOfEsfand.map((monthDay, key) => ({...monthDay, ['dayOff']: key, offDay: false}));

//جمع کردن هر دو آرایه با هم
let spreadEsfand= [...esfandSpreadOff,...esfandSpreadOn];
console.log(startDayOfEsfand);


let months = [
    {
        id: 1,
        month: 'فروردین',
        days: spreadFarvandin
    },
    {
        id: 2,
        month: 'اردیبهشت',
        days: spreadOrdibehesht
    },
    {
        id: 3,
        month: 'خرداد',
        days: spreadKhordad
    },
    {
        id: 4,
        month: 'تیر',
        days: spreadTir
    },
    {
        id: 5,
        month: 'مرداد',
        days: spreadMordad
    },
    {
        id: 6,
        month: 'شهریور',
        days: spreadShahrivar
    },
    {
        id: 7,
        month: 'مهر',
        days: spreadMehr
    },
    {
        id: 8,
        month: 'آبان',
        days: spreadAban
    },
    {
        id: 9,
        month: 'آذر',
        days: spreadAzar
    },
    {
        id: 10,
        month: 'دی',
        days: spreadDey
    },
    {
        id: 11,
        month: 'بهمن',
        days: spreadBahman
    },
    {
        id: 12,
        month: 'اسفند',
        days: spreadEsfand
    }
];

export default months;
