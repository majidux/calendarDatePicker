import momnt from 'moment-jalaali';
import * as _ from "lodash";



export let hour = _.range(12);
export const hourMap = hour.map((monthDay, key) => ({...monthDay, ['key']: `${key}`}));

export let minute = _.range(60);
export const minuteMap = minute.map((monthDay, key) => ({...monthDay, ['key']: `${key}`}));





export let beforeAfter = [{name: 'قبل از ظهر', id: 0}, {name: 'بعد از ظهر', id: 1}];
console.log(hour);
console.log(hourMap);
