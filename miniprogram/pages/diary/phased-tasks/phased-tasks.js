Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "",
    },
    timePeriod: {
      type: Array | String,
      value: "",
    },
    primaryTasks: {
      type: Object,
      value: {},
    },
    secondaryTasks: {
      type: Object,
      value: {},
    },
    taskOfCompleteness: {
      type: Object,
      value: {},
    },
    summary: {
      type: Object,
      value: {},
    },
    total: {
      type: Number,
      value: 1,
    },
    index: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isSummary: false,
    timeStr: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {},

  observers: {
    timePeriod: function (timePeriod) {
      const isSummary = typeof timePeriod === "string";
      const timePeriodStr = isSummary
        ? timePeriod
        : `${timePeriod[0]} ~ ${timePeriod[1]}`;
      this.setData({ isSummary, timeStr: timePeriodStr });
    },
  },
});
