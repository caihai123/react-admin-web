import Mock from "mockjs";
import { roleEnabledState } from "@/utils/dict";

export const roles = [
  Mock.mock({
    id: "1",
    roleName: "管理员",
    description: "@csentence",
    "status|1": roleEnabledState.options.map((item) => item.value),
    createTime: "@datetime",
  }),
  Mock.mock({
    id: "2",
    roleName: "普通用户",
    description: "@csentence",
    "status|1": roleEnabledState.options.map((item) => item.value),
    createTime: "@datetime",
  }),
  Mock.mock({
    id: "3",
    roleName: "企业用户",
    description: "@csentence",
    "status|1": roleEnabledState.options.map((item) => item.value),
    createTime: "@datetime",
  }),
  Mock.mock({
    id: "4",
    roleName: "游客",
    description: "@csentence",
    "status|1": roleEnabledState.options.map((item) => item.value),
    createTime: "@datetime",
  }),
];

const mock = [
  {
    url: "/api/role/page",
    type: "post",
    handler({ body }) {
      const { pageIndex } = JSON.parse(body);
      return {
        result: {
          records: roles,
          total: 4,
          pageIndex,
        },
        status: "success",
        msg: "成功！",
      };
    },
  },
  {
    url: "/api/role/select",
    type: "get",
    handler() {
      return {
        result: roles.map((item) => ({ label: item.roleName, value: item.id })),
        status: "success",
        msg: "成功！",
      };
    },
  },
  {
    // 更新角色状态
    url: "/api/role/status/update",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "切换失败！",
      };
    },
  },
  {
    // 新增角色
    url: "/api/role/add",
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
    // 更新角色
    url: "/api/role/update",
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
  {
    // 删除角色
    url: "/api/role/remove",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "删除失败！",
      };
    },
  },
  {
    // 给角色授权菜单
    url: "/api/role/auth",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "删除失败！",
      };
    },
  },
];

export default mock;
