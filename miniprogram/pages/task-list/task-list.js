import { loadTaskList, addTask, getTaskList } from "@/apis/task-list-api.js";
import _ from "lodash";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskList: [],
    alternateList: [],
    iTaskContent: "",
    planId: "",
    onSearch: () => {},
  },
  _mergeList(allTasks, tasksInPlan) {
    return allTasks?.reduce((prev, item) => {
      const isIncludes = tasksInPlan?.some(
        (selected) => selected.id === item.id
      );
      return isIncludes
        ? [{ ...item, selected: true }, ...prev]
        : [...prev, item];
    }, []);
  },
  _onPlan(list) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel?.on("updateThePlan", (data) => {
      const { tasks: selectedTasks, id } = data;
      const updatedList = this._mergeList(list, selectedTasks);
      this.setData({ taskList: updatedList, alternateList: updatedList });
    });
  },
  _updatePlan(task) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("updateThePlan", { task });
  },
  _upateList(taskContent) {
    const list = getTaskList(taskContent);
    const updatedList = list?.reduce((prev, item) => {
      const isIncludes = this.data.alternateList?.some(
        (selected) => selected.id === item.id && selected.selected
      );
      return isIncludes
        ? [{ ...item, selected: true }, ...prev]
        : [...prev, item];
    }, []);
    this.setData({
      taskList: updatedList,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const list = loadTaskList();
    this._onPlan(list);
    this.setData({
      onSearch: _.debounce(this._upateList, 250),
    });
  },
  /**
   * 添加或移出计划
   * @param {*} e
   */
  handleModifyList(e) {
    const {
      currentTarget: {
        dataset: { task },
      },
    } = e;
    const { taskList, alternateList } = this.data;
    const updatedList = taskList?.map((item) => {
      return item.id === task.id
        ? { ...item, selected: !item?.selected }
        : item;
    });
    const updatedAltList = alternateList?.map((item) => {
      return item.id === task.id
        ? { ...item, selected: !item?.selected }
        : item;
    });

    this._updatePlan({ ...task, selected: !task?.selected });
    this.setData({ taskList: updatedList, alternateList: updatedAltList });
  },
  handleAddTask(e) {
    const {
      value: { taskContent = "" },
    } = e.detail;
    if (taskContent === "") {
      return;
    }
    function createTask(content = "") {
      const newTask = {
        id: new Date().getTime(),
        content: content,
        done: false,
        auto: false,
        selected: false,
      };

      return newTask;
    }
    const newTask = createTask(taskContent);
    addTask(newTask);
    this.setData({
      taskList: this.data.taskList.concat(newTask),
      alternateList: this.data.alternateList.concat(newTask),
    });
  },
  handleSearch(e) {
    const { value: taskContent = "" } = e.detail;

    this.data.onSearch(taskContent);
  },
  onUnload() {
    const ec = this.getOpenerEventChannel();
    ec.off("updateThePlan");
  },
});
