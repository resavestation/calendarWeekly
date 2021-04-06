// 之後改i18n
const dayFormat = (day) => {
  let dayStr = "";
  switch (day) {
    case 0:
      dayStr = "Sun";
      break;
    case 1:
      dayStr = "Mon";
      break;
    case 2:
      dayStr = "Tue";
      break;
    case 3:
      dayStr = "Wed";
      break;
    case 4:
      dayStr = "Thu";
      break;
    case 5:
      dayStr = "Fri";
      break;
    case 6:
      dayStr = "Sat";
      break;
    default:
      break;
  }
  return dayStr;
};
const getCalendarData = (timestamp) => {
  const date = !!timestamp ? new Date(timestamp) : new Date();
  const yy = date.getFullYear();
  const mm =
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const dd = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const weekDay = date.getDay();
  const fullDate = `${yy}/${mm}/${dd}`;
  return { fullDate: fullDate, weekDay: weekDay, date: dd };
};
export function GetToday() {
  const date = getCalendarData();
  const timestampToday = Date.parse(date.fullDate);
  return {
    fullDate: date.fullDate,
    weekDay: date.weekDay,
    date: date.date,
    dateTimestamp: timestampToday,
    weekDayStr: dayFormat(date.weekDay),
  };
}
export function GetWeeklyArr(count) {
  const today = GetToday();
  today.dateTimestamp = !!count
    ? today.dateTimestamp + count * 86400000 * 7
    : today.dateTimestamp;
  let arr = [];
  for (let i = 0; i < 7; i++) {
    if (i !== today.weekDay) {
      const date = getCalendarData(
        (i - today.weekDay) * 86400000 + today.dateTimestamp
      );
      arr[i] = {};
      arr[i].fullDate = date.fullDate;
      arr[i].weekDay = date.weekDay;
      arr[i].date = date.date;
      arr[i].dateTimestamp = Date.parse(date.fullDate);
      arr[i].weekDayStr = dayFormat(date.weekDay);
    } else arr[i] = today;
  }
  return arr;
}
export function DataFilter(date) {
  const timestamp = Date.parse(date) - 28800000;
  const newDate = new Date(timestamp);
  const hh =
    newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
  const mm =
    newDate.getMinutes() >= 10
      ? newDate.getMinutes()
      : `0${newDate.getMinutes()}`;
  const time = `${hh}:${mm}`;
  return { timestamp: timestamp, time };
}
