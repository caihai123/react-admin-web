import Mock from "mockjs";

// 登录
Mock.mock("/api/login", "post", function ({ body }) {
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
});

// 获取权限菜单
Mock.mock("/api/get-menu-all", "get", function () {
  return {
    status: "success",
    result: [
      {
        id: "1",
        title: "首页",
        path: "/index",
        type: "1",
        icon: "HomeOutlined",
      },
      {
        id: "2",
        title: "权限管理",
        type: "2",
        icon: "SettingOutlined",
        children: [
          {
            id: "2-1",
            title: "菜单管理",
            path: "/permis/menu",
            type: "1",
          },
          {
            id: "2-2",
            title: "角色管理",
            path: "/permis/role",
            type: "1",
          },
          {
            id: "2-3",
            title: "用户管理",
            path: "/permis/account",
            type: "1",
          },
        ],
      },
    ],
    msg: "用户名或密码错误！",
  };
});