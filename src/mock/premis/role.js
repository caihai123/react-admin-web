import Mock from "mockjs";

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
              "status|1": [0, 1],
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
];

export default mock;
