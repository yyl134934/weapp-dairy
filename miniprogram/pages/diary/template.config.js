export default {
  default: [
    {
      type: "tasks",
      primaryTasks: { id: "pt1", data: [] },
      secondaryTasks: { id: "st1", data: [] },
      timePeriod: ["8", "11"],
    },
    {
      type: "tasks",
      primaryTasks: { id: "pt2", data: [] },
      secondaryTasks: { id: "st2", data: [] },
      timePeriod: ["12", "14"],
    },
    {
      type: "tasks",
      primaryTasks: { id: "pt3", data: [] },
      secondaryTasks: { id: "st3", data: [] },
      timePeriod: ["15", "21"],
    },
    {
      type: "summary",
      taskOfCompleteness: { id: "ts1", data: "" },
      summary: { id: "s1", data: "" },
      timePeriod: "复盘",
    },
  ],
};
