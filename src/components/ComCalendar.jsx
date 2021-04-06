import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Data } from "@services/DataCalendar";
import { GetToday, GetWeeklyArr } from "@utils";

const ComCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [count, setCount] = useState(0);

  /*
  const filterData = () => {
    let dataAvailable = !!Data && !!Data.available ? Data.available : [];
    let dataBooked = !!Data && !!Data.booked ? Data.booked : [];
    dataAvailable = dataAvailable.map((item) => {
      item.enableBooked = true;
      return item;
    });
    dataBooked = dataBooked.map((item) => {
      item.enableBooked = false;
      return item;
    });
    setCalendarData(dataAvailable.concat(dataBooked));
  };
  */
  const updateData = () => {
    setWeeklyData(GetWeeklyArr(count));
  };
  useEffect(updateData, [count]);
  const forMapWeeklyData = (item) => {
    const today = GetToday();
    const calendarElem = (
      <>
        <h3 className="mar-t-05 mar-b-05">{item.weekDayStr}</h3>
        <h3>{item.date.toString().length < 2 ? `0${item.date}` : item.date}</h3>
      </>
    );
    return (
      <li
        className={
          today.dateTimestamp <= item.dateTimestamp
            ? "calendar__item "
            : "calendar__item calendar__item--expired"
        }
        key={item.weekDayStr}
      >
        {calendarElem}
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
        <div className="calendar__nav">
          <div className="calendar__options">
            <Button
              icon={<LeftOutlined />}
              size="mini"
              onClick={() => handleChangeDate(-1)}
            ></Button>
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
