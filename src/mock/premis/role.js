import Mock from "mockjs";

Mock.mock("/api/role/page", "post", function ({ body }) {
  const { pageIndex, pageSize = 10 } = JSON.parse(body);

  return {
    result: {
      records: [...Array(pageSize)].map(() =>
        Mock.mock({
          id: "@guid",
          roleName: "@ctitle",
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
});
