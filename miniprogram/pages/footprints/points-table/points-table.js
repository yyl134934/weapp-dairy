// pages/index/points-table/points-table.js
import { getTodayDate } from "@/utils/day";
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

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pointsData: {
      type: Array,
      value: [],
    },
    header: { type: Array, value: [] },
    month: {
      type: Number,
      value: 8,
    },
  },

  data: {},

  methods: {
    handleClockIn() {
      wx.showModal({
        title: "今日积分",
        content: "2",
        placeholderText: "今天积了几分呢？",
        editable: true,
        complete: (res) => {
          console.info(res);
          const { confirm, content } = res;
          if (confirm) {
            const point = parseFloat(content);
            const todayData = updateTodayData(this.data.pointsData, point);
            this.triggerEvent("onClockIn", { todayData });

            wx.showToast({
              title: "撒花~",
            });
          }
        },
      });
    },
  },
});
