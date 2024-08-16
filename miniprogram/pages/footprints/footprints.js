import { loadPoinData, updatePointsData } from "@/apis/footprints-api";
Page({
  data: {
    pointsData: [[]],
    rewardList: [
      { goal: "一份不超过10块钱的零食", point: 1.5 },
      { goal: "一份不超过5块钱的零食", point: 1 },
    ],
    goodList: [
      { goal: "完成了当天的主要任务", point: 1.5 },
      { goal: "完成了当天的次要任务", point: 0.5 },
    ],
    badList: [
      { goal: "没完成当天的主要任务", point: -0.5 },
      { goal: "没完成当天的次要任务", point: 0 },
    ],
  },
  onShow() {
    const init = () => {
      const pointsData = loadPoinData();

      this.setData({
        pointsData,
      });
    };

    init();
  },
  onClockIn(data) {
    const newData = updatePointsData(
      this.data.pointsData,
      data.detail.todayData
    );
    this.setData({ pointsData: newData });
  },
});
