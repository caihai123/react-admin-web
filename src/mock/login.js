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
  {
    // 获取用户信息
    url: "/api/get-userinfo",
    type: "get",
    handler() {
      return {
        status: "success",
        result: {
          account: "Cai Hai",
          avatar: "https://avatars.githubusercontent.com/u/47770861?v=4",
          name: "Cai Hai",
          gender: "1",
          phone: "18888888888",
          email: "123456ch@email.com",
          deptId: ["1", "2"],
          role: ["admin"],
          description: "阁下身为真灵，不知能接下韩某几招。",
        },
      };
    },
  },
];

export default mock;
