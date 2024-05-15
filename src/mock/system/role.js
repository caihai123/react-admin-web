import Mock from "mockjs";
import { roleEnabledState } from "@/utils/dict";

const mock = [
  {
    url: "/api/role/page",
    type: "post",
    handler({ body }) {
      const { pageIndex, pageSize = 10 } = JSON.parse(body);

      return {
        result: {
          records: [...Array(pageSize)].map((_, i) =>
            Mock.mock({
              id: "@guid",
              roleName: `角色名称-${pageIndex * pageSize - pageSize + i + 1}`,
              description: "@csentence",
              "status|1": roleEnabledState.options.map((item) => item.value),
            })
          ),
          total: 100,
          pageIndex,
        },
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
];

export default mock;
