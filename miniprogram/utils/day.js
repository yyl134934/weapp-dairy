const formatDate = (date, delimiter = "") => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${[year, month, day].map(formatNumber).join(delimiter)}`;
};
const formatTime = (date, delimiter = "") => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[hour, minute, second].map(formatNumber).join(delimiter)}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

const getFullDate = (date) => {
  return `${formatDate(date, "/")} ${formatTime(date, ":")}`;
};

/**
 * 获取当日 日期+时间
 */
const getTodayDate = () => {
  const date = new Date();

  return getFullDate(date);
};

/**
 * 获取当日 日期
 * @example const today=getToday(); //"20240815"
 */
const getToday = () => {
  const date = new Date();

  return formatDate(date);
};

const getYesterday = () => {
  const today = new Date();
  const yesterdayTime = today.getTime() - 24 * 60 * 60 * 1000;

  return formatDate(new Date(yesterdayTime));
};

module.exports = {
  formatTime,
  getTodayDate,
  getToday,
  getYesterday,
};
