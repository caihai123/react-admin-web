import Mock from "mockjs";
import { gender, accountEnabledState } from "@/utils/dict";

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
              name: "@cname",
              "gender|1": [...gender.options.map((item) => item.value), ""],
              phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              email: "@email",
              deptId: "@guid",
              deptName: "部门名称",
              "status|1": accountEnabledState.options.map((item) => item.value),
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
];

export default mock;
