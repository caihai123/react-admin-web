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
                buttonList: [
                  { name: "新增", id: "add" },
                  { name: "编辑", id: "edit" },
                  { name: "删除", id: "del" },
                ],
              },
              {
                id: "2-2",
                title: "角色管理",
                path: "/permis/role",
                type: "1",
                buttonList: [
                  { name: "新增", id: "add" },
                  { name: "编辑", id: "edit" },
                  { name: "删除", id: "del" },
                  { name: "授权", id: "accredit" },
                ],
              },
              {
                id: "2-3",
                title: "用户管理",
                path: "/permis/account",
                type: "1",
                buttonList: [
                  { name: "新增", id: "add" },
                  { name: "编辑", id: "edit" },
                  { name: "删除", id: "del" },
                  { name: "授权", id: "accredit" },
                  { name: "详情", id: "details" },
                  { name: "导出", id: "export" },
                ],
                children: [
                  {
                    id: "2-3-1",
                    title: "人员详情",
                    path: "/permis/account/detail",
                    type: "1",
                  },
                ],
              },
              {
                id: "2-4",
                title: "部门管理",
                path: "/permis/dept",
                type: "1",
                buttonList: [
                  { name: "新增", id: "add" },
                  { name: "编辑", id: "edit" },
                  { name: "删除", id: "del" },
                  { name: "导出", id: "export" },
                ],
              },
            ],
          },
          {
            id: "4",
            title: "Pro Table",
            type: "1",
            path: "/pro-table",
            icon: "DatabaseFilled",
            buttonList: [
              { name: "新增", id: "add" },
              { name: "编辑", id: "edit" },
              { name: "删除", id: "del" },
              { name: "导出", id: "export" },
            ],
          },
          {
            id: "5",
            title: "components",
            type: "2",
            icon: "ProductFilled",
            children: [
              {
                id: "5-1",
                title: "mackdown",
                type: "1",
                path: "/mackdown",
              },
            ],
          },
          {
            id: "6",
            title: "hooks",
            type: "2",
            icon: "GoldFilled",
            children: [
              {
                id: "6-1",
                title: "useLoadingDelayAndKeep",
                type: "1",
                path: "/use-loading-delay-and-keep",
              },
            ],
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
