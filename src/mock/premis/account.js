import Mock from "mockjs";
import { gender, accountEnabledState } from "@/utils/dict";

const mockAccount = () =>
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
  });

const mock = [
  {
    // 用户列表分页
    url: "/api/account/page",
    type: "post",
    handler({ body }) {
      const { pageIndex, pageSize = 10 } = JSON.parse(body);

      return {
        result: {
          records: [...Array(pageSize)].map(() => mockAccount()),
          total: 100,
          pageIndex,
        },
        status: "success",
        msg: "成功！",
      };
    },
  },
  {
    // 用户详情
    url: "/api/account/details",
    type: "get",
    handler() {
      return {
        result: mockAccount(),
        status: "success",
        msg: "成功！",
      };
    },
  },
];

export default mock;
