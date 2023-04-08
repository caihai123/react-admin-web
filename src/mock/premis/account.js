import Mock from "mockjs";

Mock.mock("/api/account/page", "post", function ({ body }) {
  const { pageIndex, pageSize = 10 } = JSON.parse(body);

  return {
    result: {
      records: [...Array(pageSize)].map(() =>
        Mock.mock({
          id: "@guid",
          account: /^[a-zA-Z0-9_-]{4,16}$/,
          name: "@cname",
          "gender|1": [1, 2],
          phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          email: "@email",
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
