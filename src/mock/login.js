const mock = [
  {
    // 登录
    url: "/api/login",
    type: "post",
    handler({ body }) {
      const { userAccount, userPassword } = JSON.parse(body);
      if (userAccount === "admin" && userPassword === "password") {
        return {
          status: "success",
          result: {
            token: true,
          },
        };
      } else {
        return {
          status: "error",
          result: null,
          msg: "用户名或密码错误！",
        };
      }
    },
  },
];

export default mock;
