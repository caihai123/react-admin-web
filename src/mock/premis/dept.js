import Mock from "mockjs";

const mock = [
  {
    // 获取权限菜单
    url: "/api/dept-all/get",
    type: "get",
    handler() {
      return {
        status: "success",
        result: Mock.mock([
          {
            id: "1",
            deptName: "部门1",
            description: "@csentence",
          },
          {
            id: "2",
            deptName: "部门2",
            description: "@csentence",
            children: [
              {
                id: "2-1",
                deptName: "部门2-1",
                description: "@csentence",
              },
              {
                id: "2-2",
                deptName: "部门2-2",
                description: "@csentence",
              },
              {
                id: "2-3",
                deptName: "部门2-3",
                description: "@csentence",
              },
              {
                id: "2-4",
                deptName: "部门2-4",
                description: "@csentence",
              },
            ],
          },
          {
            id: "3",
            deptName: "部门3",
            description: "@csentence",
          },
          {
            id: "4",
            deptName: "部门4",
            description: "@csentence",
            children: [
              {
                id: "4-1",
                deptName: "部门4-1",
                description: "@csentence",
              },
              {
                id: "4-2",
                deptName: "部门4-2",
                description: "@csentence",
              },
            ],
          },
        ]),
        msg: "成功！",
      };
    },
  },
  {
    // 获取部门选择器
    url: "/api/dept/select",
    type: "get",
    handler() {
      return {
        status: "success",
        result: [
          {
            value: "1",
            title: "部门1",
          },
          {
            value: "2",
            title: "部门2",
            children: [
              {
                value: "2-1",
                title: "部门2-1",
              },
              {
                value: "2-2",
                title: "部门2-2",
              },
              {
                value: "2-3",
                title: "部门2-3",
              },
              {
                value: "2-4",
                title: "部门2-4",
              },
            ],
          },
          {
            value: "3",
            title: "部门3",
          },
          {
            value: "4",
            title: "部门4",
            children: [
              {
                value: "4-1",
                title: "部门4-1",
              },
              {
                value: "4-2",
                title: "部门4-2",
              },
            ],
          },
        ],
        msg: "成功！",
      };
    },
  },
  {
    // 删除单个部门
    url: "/api/dept/delete",
    type: "post",
    handler() {
      return {
        result: null,
        status: "success",
        msg: "成功！",
      };
    },
  },
];

export default mock;
