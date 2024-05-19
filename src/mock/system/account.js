import Mock from "mockjs";
import { gender, accountEnabledState } from "@/utils/dict";
import { roles } from "./role";

const getRandomElementsFromArray = function (arr, min, max = min) {
  // 随机选择 min 到 max 个元素
  const count = Mock.Random.integer(min, max);

  // 生成一个随机索引的数组
  const indices = Array.from({ length: arr.length }, (_, i) => i);
  const selectedIndices = Mock.Random.shuffle(indices).slice(0, count);

  // 根据选出的索引返回原数组中对应的元素并保持顺序
  selectedIndices.sort((a, b) => a - b);
  return selectedIndices.map((i) => arr[i]);
};

const mock = [
  {
    // 用户列表分页
    url: "/api/account/page",
    type: "post",
    handler({ body }) {
      const { pageIndex, pageSize = 10 } = JSON.parse(body);

      return {
        result: {
          records: [...Array(pageSize)].map(() =>
            Mock.mock({
              id: "@guid",
              account: /^[a-zA-Z0-9_-]{4,16}$/,
              "avatar|1": [
                "https://api.dicebear.com/7.x/miniavs/svg?seed=0",
                "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
                "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
                "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
                "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
              ],
              name: "@cname",
              "gender|1": [...gender.options.map((item) => item.value), ""],
              phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              email: "@email",
              deptId: "@guid",
              deptName: "部门名称",
              "role|+1"() {
                return getRandomElementsFromArray(
                  roles.map((item) => ({ name: item.roleName, id: item.id })),
                  1,
                  4
                );
              },
              "status|1": accountEnabledState.options.map((item) => item.value),
              description: "@csentence",
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
    // 更新用户状态
    url: "/api/account/status/update",
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
    // 单个删除用户
    url: "/api/account/remove",
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
    // 新增用户
    url: "/api/account/add",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "失败！",
      };
    },
  },
  {
    // 更新用户账号信息
    url: "/api/account/update",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "失败！",
      };
    },
  },
];

export default mock;
