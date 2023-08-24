import Mock from "mockjs";

const mock = [
  {
    // 用户列表分页
    url: "/api/issues/page",
    type: "post",
    handler({ body }) {
      const { pageIndex, pageSize = 10 } = JSON.parse(body);

      return {
        result: {
          records: [...Array(pageSize)].map(() =>
            Mock.mock({
              id: "@guid",
              title: "@ctitle",
              describe: "@cparagraph",
              user: Mock.mock({
                id: "@guid",
                name: "@cname",
              }),
              createTime: "@datetime",
              "type|1": [1, 2],
              "priority|1": [0, 1, 2, 3, 4],
              "pinned|1": [0, 1, 2, 3],
              "commentCount|1-100": 1,
              "status|1": [0, 1, 2],
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
