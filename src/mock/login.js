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
          userName: "Cai Hai",
          avatar: "https://avatars.githubusercontent.com/u/47770861?v=4",
          role: [],
        },
      };
    },
  },
];

export default mock;
