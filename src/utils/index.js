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
const getFullDate = (timestamp) => {
  const date = !!timestamp ? new Date(timestamp) : new Date();
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const weekDay = date.getDay();
  const fullDate = `${yy}/${mm}/${dd}`;
  return { fullDate: fullDate, weekDay: weekDay, date: dd };
};
export function GetToday() {
  const date = getFullDate();
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
      const date = getFullDate(
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
export function DateFormat(date) {
  console.log(date);
  //const dateStr = date.split(".")[0];
  //let dateString = date.replace(/-/g, "/").replace("T", " ");

  const timestamp = Date.parse(new Date(date));
  // 28800
  let newDate = new Date();
  newDate.setTime(timestamp);
  const options = {
    year: "numeric", // 加西元年
    day: "2-digit", //(e.g., 1)
    month: "2-digit", //(e.g., Oct)
    hour: "2-digit", //(e.g., 02)
    minute: "2-digit", //(e.g., 02)
    hour12: false, // 24 小時制
    second: "2-digit", // 加秒數
  };
  let dateStringFormat = newDate.toLocaleString("zh-TW", options);
  dateStringFormat = dateStringFormat.replace("年", "/");
  dateStringFormat = dateStringFormat.replace("月", "/");
  dateStringFormat = dateStringFormat.replace("日", "");
  return dateStringFormat;
}
export function DateToTimestamp(date) {
  const timestamp = Date.parse(new Date(date));
  return timestamp;
}
