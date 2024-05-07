import Mock from "mockjs";

const mock = [
  {
    // 新增菜单
    url: "/api/menu/add",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "新增失败！",
      };
    },
  },
  {
    // 更新菜单
    url: "/api/menu/update",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "更新失败！",
      };
    },
  },
];

export default mock;
