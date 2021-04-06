const lang = navigator.language;
export const CalendarDetail = {
  title: lang === "zh-TW" ? "授課時間" : "Available times",
  description:
    lang === "zh-TW"
      ? "* 時間以 台北(GMT+08:00) 顯示"
      : "* All times listed are in your local timezone: Taipei (GMT+08:00)",
};
