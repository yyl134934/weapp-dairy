/**
 * 找到当日积分数据，更新积分以及打卡日期
 * @param {*} pointsData 积分表数据
 * @param {*} point 更新积分
 */
function updateTodayData(pointsData = [], point = 0) {
  let today = {};
  pointsData?.some((row = [], i) => {
    const index = row.findIndex((item) => item.point === "-");
    if (index !== -1) {
      // 更新积分以及日期
      today = { ...row[index], point, clockInDate: getTodayDate() };
    }
    return index !== -1;
  });

  return today;
}

const POINTS_DATA = "points_data";

function getPointData(date = "") {
  try {
    return wx.getStorageSync(POINTS_DATA);
  } catch (error) {
    console.error("获取积分日记数据成功：", error);
    return [];
  }
}

function loadPoinData() {
  const data = getPointData() || [];
  if (data.length === 0) {
    const initData = new Array(5).fill(new Array(7).fill(0)).map((row, i) => {
      return row.map((_, j, array) => ({
        date: i * array.length + (j + 1),
        point: "-",
        clockInDate: "-",
      }));
    });
    try {
      wx.setStorageSync(POINTS_DATA, initData);
      return initData;
    } catch (error) {
      console.error("更新积分日记数据成功：", error);
      return initData;
    }
  }

  return data;
}

/**
 * 更新积分日志数据
 * @param {*} allData
 * @param {*} todayData
 */
function updatePointsData(allData = [], todayData) {
  const { date } = todayData;
  const len = allData?.[0].length;
  const rowIndex = parseInt((date - 1) / len, 10);
  const columnIndex = (date % len) - 1;

  // 更新数组越界！后续版本应该出拓展的方案
  if (rowIndex > len) {
    return allData;
  }

  allData[rowIndex].splice(columnIndex, 1, todayData);

  try {
    wx.setStorageSync(POINTS_DATA, allData);
    return allData;
  } catch (error) {
    console.error("更新积分日记数据成功：", error);
    return allData;
  }
}

export { loadPoinData, getPointData, updatePointsData };
