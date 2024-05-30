import Mock from "mockjs";
import { treeMap } from "@/utils/tree";

export const deptDataMock = Mock.mock([
  {
    id: "1",
    parentId: null,
    deptName: "贵州某某科技无限公司",
    description: "@csentence",
    children: [
      {
        id: "1-1",
        parentId: "1",
        deptName: "产品研发部",
        description: "@csentence",
        children: [
          {
            id: "1-1-1",
            parentId: "1-1",
            deptName: "研发部",
            description: "@csentence",
          },
          {
            id: "1-1-2",
            parentId: "1-1",
            deptName: "UI部",
            description: "@csentence",
          },
          {
            id: "1-1-3",
            parentId: "1-1",
            deptName: "产品部",
            description: "@csentence",
          },
          {
            id: "1-1-4",
            parentId: "1-1",
            deptName: "运维部",
            description: "@csentence",
          },
          {
            id: "1-1-5",
            parentId: "1-1",
            deptName: "测试部",
            description: "@csentence",
          },
        ],
      },
      {
        id: "1-2",
        parentId: "1",
        deptName: "人事部",
        description: "@csentence",
      },
      {
        id: "1-3",
        parentId: "1",
        deptName: "销售部",
        description: "@csentence",
      },
      {
        id: "1-4",
        parentId: "1",
        deptName: "财务部",
        description: "@csentence",
      },
      {
        id: "1-5",
        parentId: "1",
        deptName: "后勤部",
        description: "@csentence",
      },
    ],
  },
]);

const mock = [
  {
    // 获取权限菜单
    url: "/api/dept/all",
    type: "get",
    handler() {
      return {
        status: "success",
        result: deptDataMock,
        msg: "成功！",
      };
    },
  },
  {
    // 获取部门选择器
    url: "/api/dept/select",
    type: "get",
    handler() {
      return {
        status: "success",
        result: treeMap(deptDataMock, (item) => ({
          label: item.deptName,
          value: item.id,
        })),
        msg: "成功！",
      };
    },
  },
  {
    // 新增部门
    url: "/api/dept/add",
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
    // 更新部门
    url: "/api/dept/update",
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
    // 删除单个部门
    url: "/api/dept/delete",
    type: "post",
    handler() {
      return {
        result: null,
        status: "success",
        msg: "成功！",
      };
    },
  },
];

export default mock;
