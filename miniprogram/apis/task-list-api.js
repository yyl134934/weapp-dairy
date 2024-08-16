// Task List
const TASK_LIST = "task_list";
export function loadTaskList() {
  const list = getTaskList();
  if (list.length === 0) {
    createTaskList();
    return [];
  }
  return list;
}
export function getTaskList(searchText = "") {
  try {
    const list = wx.getStorageSync(TASK_LIST) || [];
    return searchText
      ? list?.filter((item) => item.content.includes(searchText))
      : list;
  } catch (error) {
    console.error("获取任务列表数据失败：", error);
    return [];
  }
}

export function searchTasks(ids = []) {
  try {
    const data = wx.getStorageSync(TASK_LIST) || [];
    return data.filter((item) => ids.includes(item.id));
  } catch (error) {
    console.error("获取特定任务列表数据失败：", error);
    return [];
  }
}
export function createTaskList() {
  try {
    wx.setStorageSync(TASK_LIST, []);
    return true;
  } catch (error) {
    console.error("初始化任务列表数据失败：", error);
    return false;
  }
}

export function addTask(task = {}) {
  const allData = getTaskList();
  try {
    wx.setStorageSync(TASK_LIST, [...allData, task]);
    return true;
  } catch (error) {
    console.error("添加任务数据成功：", error);
    return false;
  }
}
export function deleteTask(task = {}) {
  const allData = getTaskList();
  try {
    const newData = allData.filter((item) => item.id !== task.id);
    wx.setStorageSync(TASK_LIST, newData);
    return true;
  } catch (error) {
    console.error("添加任务数据成功：", error);
    return false;
  }
}
export function updateTask(task = {}) {
  const allData = getTaskList();
  const index = allData.findIndex((item) => item.id === task.id);
  allData.splice(index, 1, task);

  try {
    wx.setStorageSync(TASK_LIST, allData);
    return true;
  } catch (error) {
    console.error("更新任务数据成功：", error);
    return false;
  }
}
