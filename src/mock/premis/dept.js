// import Mock from "mockjs";

const mock = [
  {
    // 获取权限菜单
    url: "/api/dept-all/get",
    type: "get",
    handler() {
      return {
        status: "success",
        result: [
          {
            id: "1",
            deptName: "部门1",
            description: "",
          },
          {
            id: "2",
            deptName: "部门2",
            description: "",
            children: [
              {
                id: "2-1",
                deptName: "部门2-1",
                description: "",
              },
              {
                id: "2-2",
                deptName: "部门2-2",
                description: "",
              },
              {
                id: "2-3",
                deptName: "部门2-3",
                description: "",
              },
              {
                id: "2-4",
                deptName: "部门2-4",
                description: "",
              },
            ],
          },
          {
            id: "3",
            deptName: "部门3",
            description: "",
          },
          {
            id: "4",
            deptName: "部门4",
            description: "",
            children: [
              {
                id: "4-1",
                deptName: "部门4-1",
                description: "",
              },
              {
                id: "4-2",
                deptName: "部门4-2",
                description: "",
              },
            ],
          },
        ],
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
        result: [...Array(10)].map((_, index) => ({
          value: `${index + 1}`,
          label: `部门${index + 1}`,
        })),
        status: "success",
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
