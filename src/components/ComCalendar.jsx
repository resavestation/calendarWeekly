import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Data } from "@services/DataCalendar";
import { DataFilter, GetToday, GetWeeklyArr } from "@utils";

const ComCalendar = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [count, setCount] = useState(0);
  const filterData = () => {
    let dataAvailable = !!Data && !!Data.available ? Data.available : [];
    let dataBooked = !!Data && !!Data.booked ? Data.booked : [];
    const today = GetToday();
    // 加上timestamp供排序用, 加上時間的filter結果, 加上是否可預約的key
    dataAvailable = dataAvailable.map((item) => {
      item.enableBooked = true;
      const obj = DataFilter(item.start);
      item.timestamp = obj.timestamp;
      item.time = obj.time;
      return item;
    });
    dataBooked = dataBooked.map((item) => {
      item.enableBooked = false;
      const obj = DataFilter(item.start);
      item.timestamp = obj.timestamp;
      item.time = obj.time;
      return item;
    });
    let newArr = dataAvailable.concat(dataBooked);
    // 排序
    newArr.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    // 過去日期不顯示
    newArr = newArr.filter((item) => {
      return item.timestamp >= today.dateTimestamp;
    });
    return newArr;
  };
  const updateData = () => {
    let data = GetWeeklyArr(count);
    const scheduleData = filterData();
    for (let i = 0; i < data.length; i++) {
      data[i].schedule = [];
      for (let j = 0; j < scheduleData.length; j++) {
        if (
          scheduleData[j].timestamp >= data[i].dateTimestamp &&
          scheduleData[j].timestamp < data[i].dateTimestamp + 86400000
        ) {
          data[i].schedule.push(scheduleData[j]);
        }
      }
    }
    setWeeklyData(data);
  };
  useEffect(updateData, [count]);
  const forMapWeeklyData = (item) => {
    const today = GetToday();
    const scheduleElem = item.schedule.map((timeItem) => {
      return (
        <p
          className={
            timeItem.enableBooked
              ? "calendar__time "
              : "calendar__time calendar__time--booked"
          }
          key={timeItem.timestamp}
        >
          {timeItem.time}
        </p>
      );
    });
    return (
      <li
        className={
          today.dateTimestamp <= item.dateTimestamp
            ? "calendar__item "
            : "calendar__item calendar__item--expired"
        }
        key={item.weekDayStr}
      >
        <h3 className="mar-t-05 mar-b-05">{item.weekDayStr}</h3>
        <h3>{item.date}</h3>
        <div className="calendar__schedule">{scheduleElem}</div>
      </li>
    );
  };
  const calendarChild = weeklyData.map(forMapWeeklyData);
  const handleChangeDate = (nb) => {
    let newCount = count + nb;
    newCount >= 0 && setCount(newCount);
  };
  return (
    <div className="calendar">
      <div className="calendar__wrapper">
        <h2>Available times</h2>
        <div className="calendar__nav">
          <div className="calendar__options">
            {count <= 0 ? (
              <Button
                icon={<LeftOutlined />}
                size="mini"
                onClick={() => handleChangeDate(-1)}
                disabled
              ></Button>
            ) : (
              <Button
                icon={<LeftOutlined />}
                size="mini"
                onClick={() => handleChangeDate(-1)}
              ></Button>
            )}
            <Button
              icon={<RightOutlined />}
              size="mini"
              onClick={() => handleChangeDate(1)}
            ></Button>
          </div>
          <div className="calendar__range">
            {!!weeklyData[0]
              ? `${weeklyData[0].fullDate} - ${weeklyData[6].date}`
              : "no data"}
          </div>
          <div className="calendar__txt">
            * All times listed are in your local timezone: Taipei (GMT+08:00)
          </div>
        </div>
        <ul className="calendar__list">{calendarChild}</ul>
      </div>
    </div>
  );
};
export default ComCalendar;
