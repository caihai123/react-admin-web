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
    // 获取权限菜单
    url: "/api/get-menu-all",
    type: "get",
    handler() {
      return {
        status: "success",
        result: [
          {
            id: "1",
            title: "Dashboard",
            path: "/index",
            type: "1",
            icon: "HomeFilled",
          },
          {
            id: "2",
            title: "权限管理",
            type: "2",
            icon: "SettingFilled",
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
              {
                id: "2-4",
                title: "部门管理",
                path: "/permis/dept",
                type: "1",
              },
            ],
          },
          {
            id: "4",
            title: "Pro Table",
            type: "1",
            path: "/pro-table",
            icon: "AppstoreFilled",
          },
          {
            id: "3",
            title: "错误页面",
            type: "2",
            icon: "CloseCircleFilled",
            children: [
              {
                id: "3-1",
                title: "401",
                path: "/error/401",
                type: "1",
              },
              {
                id: "3-2",
                title: "404",
                path: "/error/404",
                type: "1",
              },
            ],
          },
        ],
        msg: "成功！",
      };
    },
  },
];

export default mock;
