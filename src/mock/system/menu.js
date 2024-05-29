import Mock from "mockjs";

const mock = [
  {
    // 获取所有菜单列表 or mock获取权限菜单
    url: "/api/menu/all",
    type: "get",
    handler() {
      return {
        status: "success",
        // 真实场景中 parentId 不是必须的，这里是定义是因为我在【角色授权】中也用了此接口模拟
        result: [
          {
            id: "1",
            parentId: null,
            title: "Dashboard",
            path: "/index",
            type: "1",
            icon: "HomeFilled",
          },
          {
            id: "2",
            parentId: null,
            title: "系统管理",
            type: "2",
            icon: "SettingFilled",
            children: [
              {
                id: "2-1",
                parentId: "2",
                title: "菜单管理",
                path: "/system/menu",
                type: "1",
                buttonList: [
                  { name: "新增", id: "add" },
                  { name: "编辑", id: "edit" },
                  { name: "删除", id: "del" },
                ],
                children: [
                  {
                    parentId: "2-1",
                    id: "2-1-1",
                    title: "新增菜单",
                    path: "/system/menu/add",
                    type: "1",
                  },
                ],
              },
              {
                id: "2-2",
                parentId: "2",
                title: "角色管理",
                path: "/system/role",
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
                parentId: "2",
                title: "用户管理",
                path: "/system/account",
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
                    parentId: "2-3",
                    id: "2-3-1",
                    title: "人员详情",
                    path: "/system/account/detail",
                    type: "1",
                  },
                ],
              },
              {
                id: "2-4",
                parentId: "2",
                title: "部门管理",
                path: "/system/dept",
                type: "1",
                buttonList: [
                  { name: "新增", id: "add" },
                  { name: "编辑", id: "edit" },
                  { name: "删除", id: "del" },
                  { name: "导出", id: "export" },
                ],
              },
              {
                id: "2-5",
                parentId: "2",
                title: "文件管理",
                path: "/system/file",
                type: "1",
              },
            ],
          },
          {
            id: "4",
            parentId: null,
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
            parentId: null,
            title: "components",
            type: "2",
            icon: "ProductFilled",
            children: [
              {
                id: "5-1",
                parentId: "5",
                title: "按钮权限",
                type: "1",
                path: "/permission-control",
              },
              {
                id: "5-2",
                parentId: "5",
                title: "mackdown",
                type: "1",
                path: "/mackdown",
              },
              {
                id: "5-3",
                parentId: "5",
                title: "dropdown-from",
                type: "1",
                path: "/dropdown-from",
              },
              {
                id: "5-4",
                parentId: "5",
                title: "audio-modal",
                type: "1",
                path: "/audio-modal",
              },
              {
                id: "5-5",
                parentId: "5",
                title: "video-modal",
                type: "1",
                path: "/video-modal",
              },
            ],
          },
          {
            id: "6",
            parentId: null,
            title: "hooks",
            type: "2",
            icon: "GoldFilled",
            children: [
              {
                id: "6-1",
                parentId: "6",
                title: "useLoadingDelayAndKeep",
                type: "1",
                path: "/use-loading-delay-and-keep",
              },
              {
                id: "6-2",
                parentId: "6",
                title: "useDomSize",
                type: "1",
                path: "/use-dom-size",
              },
              {
                id: "6-3",
                parentId: "6",
                title: "useContentOverflow",
                type: "1",
                path: "/use-content-overflow",
              },
            ],
          },
          {
            id: "7",
            parentId: null,
            title: "字典管理",
            path: "/dict",
            type: "1",
            icon: "ProfileFilled",
          },
          {
            id: "3",
            parentId: null,
            title: "错误页面",
            type: "2",
            icon: "CloseCircleFilled",
            children: [
              {
                id: "3-1",
                parentId: "3",
                title: "401",
                path: "/error/401",
                type: "1",
              },
              {
                id: "3-2",
                parentId: "3",
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
  {
    // 新增菜单
    url: "/api/menu/add",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "新增失败！",
      };
    },
  },
  {
    // 更新菜单
    url: "/api/menu/update",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "更新失败！",
      };
    },
  },
  {
    // 删除菜单
    url: "/api/menu/remove",
    type: "post",
    handler() {
      // 随机模拟成功或者失败
      const b = Mock.mock({ "boolean|1-2": false }).boolean;
      return {
        result: null,
        status: b ? "success" : "failure",
        msg: b ? "成功！" : "删除失败！",
      };
    },
  },
];

export default mock;
