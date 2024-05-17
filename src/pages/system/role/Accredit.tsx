import React from "react";
import { Modal, Table, Tag, Checkbox, App } from "antd";
import { useBoolean, useRequest } from "ahooks";
import { getMenuAll } from "@/api/menu";
import { authRole } from "@/api/role";
import { menuType } from "@/utils/dict";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";
import { deepCopy, treeMap } from "@/utils/utils";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";
import Mock from "mockjs";

type AuthMenu = {
  id: string;
  parentId: string;
  title: string;
  path: string;
  type: (typeof menuType.options)[number]["value"];
  icon: string;
  children?: AuthMenu[];
  isAuth: boolean;
  buttonList?: { id: string; name: string; isAuth: boolean }[];
};

export type Ref = {
  start: (roleId: string) => void;
};

export type Props = {
  callback: () => void;
};

// 将tree菜单转成一维数组，此函数主要是给 selectParentMenu 使用
const flattenDeepMenu = (array: AuthMenu[] = []) => {
  const list: AuthMenu[] = [];

  const deep = function (obj: AuthMenu, parentId: string) {
    // 不要创建新对象，因为 selectParentMenu 中会改变源数据，简洁达到修改tableData的效果
    list.push(obj);
    (obj.children || []).forEach((item) => deep(item, obj.id));
  };
  array.forEach((item) => deep(item, ""));

  return list;
};

/**
 * 角色授权弹窗
 */
const Accredit = React.forwardRef<Ref, Props>((props, ref) => {
  const [open, { set: setOpen }] = useBoolean(false);
  const { message } = App.useApp();

  // 获取当前角色的菜单菜单授权情况，这里只是使用 getMenuAll 进行模拟，实际情况不可能使用这个接口
  const {
    data: tableData,
    loading,
    mutate: mutateTableData,
    run: getTableData,
  } = useRequest(
    async (roleId: string) => {
      // 真实情况下获取菜单时必须要传入 roleId
      const response = await getMenuAll();
      return treeMap(response.result, (item) => ({
        ...item,
        isAuth: Mock.mock({ "boolean|1-2": false }).boolean, // mock 后后端返回的授权状态
      })) as AuthMenu[];
    },
    { manual: true }
  );

  const [checkAll, setCheckAll] = React.useState<boolean>(false); // 控制表头是否全选
  const [indeterminate, setIndeterminate] = React.useState<boolean>(false); // 是否有选中，控制控制表头半选状态

  React.useEffect(() => {
    // tableData改变时计算全选checkbox的状态
    const isAuthAllList: boolean[] = [];

    const deep = function (arr: AuthMenu[] = []) {
      arr.forEach((item) => {
        isAuthAllList.push(item.isAuth);
        item.buttonList?.forEach((but) => {
          isAuthAllList.push(but.isAuth);
        });
        deep(item.children);
      });
    };
    deep(tableData);

    if (isAuthAllList.every((item) => item === true)) {
      setCheckAll(true);
      setIndeterminate(false);
    } else if (isAuthAllList.every((item) => item !== true)) {
      setCheckAll(false);
      setIndeterminate(false);
    } else {
      setCheckAll(false);
      setIndeterminate(true);
    }
  }, [tableData]);

  // 全选checkbox改变时触发
  const checkAllChange = React.useCallback(
    function (val: boolean) {
      const deep = function (arr: AuthMenu[] = []) {
        arr.forEach((item) => {
          item.isAuth = val;
          item.buttonList?.forEach((but) => {
            but.isAuth = val;
          });
          deep(item.children);
        });
      };
      deep(tableData);
      mutateTableData(deepCopy(tableData));
    },
    [tableData, mutateTableData]
  );

  // 勾选菜单或目录时自动勾选所有父级菜单
  const selectParentMenu = React.useCallback(
    function (childId: string) {
      const menuList = flattenDeepMenu(tableData);
      let currentItem = menuList.find((item) => item.id === childId);
      while (currentItem?.parentId) {
        currentItem = menuList.find(
          // eslint-disable-next-line no-loop-func
          (item) => item.id === currentItem?.parentId
        );

        if (currentItem) currentItem.isAuth = true;
      }
      mutateTableData(deepCopy(tableData));
    },
    [tableData, mutateTableData]
  );

  // 菜单或目录上的checkbox改变时触发
  const chechMenuChange = React.useCallback(
    function (val: boolean, row: AuthMenu) {
      const deep = function (item: AuthMenu) {
        item.isAuth = val;
        item.buttonList?.forEach((but) => {
          but.isAuth = val;
        });
        item.children?.forEach((menu) => {
          deep(menu);
        });
      };

      if (val) selectParentMenu(row.id);

      deep(row);

      mutateTableData(deepCopy(tableData));
    },
    [selectParentMenu, mutateTableData, tableData]
  );

  // 处理功能标签check改变时
  const handleFunCheckChange = React.useCallback(
    function (row: AuthMenu) {
      if ((row.buttonList || []).some((item) => item.isAuth === true)) {
        row.isAuth = true;
        selectParentMenu(row.id);
      }
      mutateTableData(deepCopy(tableData));
    },
    [selectParentMenu, mutateTableData, tableData]
  );

  const [submitLoading, setSubmitLoading] = useLoadingDelayAndKeep(false);
  const onSubmit = React.useCallback(
    function () {
      setSubmitLoading.setTrue();
      const result = treeMap(tableData, (item) => ({
        id: item.id,
        isAuth: item.isAuth,
      }));

      return authRole(result)
        .then(() => {
          setOpen(false);
          props.callback();
          message.success("更新成功！");
        })
        .finally(() => setSubmitLoading.setFalse());
    },
    [tableData, message, props, setOpen, setSubmitLoading]
  );

  const columns = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "类型",
      dataIndex: "type",
      render: (type: AuthMenu["type"]) => {
        const map = menuType.map[type];
        return <Tag color={map.color}>{map.label}</Tag>;
      },
      type: "select",
      options: menuType.options,
    },
    {
      title: "按钮",
      dataIndex: "buttonList",
      render: (buttonList: AuthMenu["buttonList"], row: AuthMenu) => {
        return buttonList?.map((item) => (
          <Checkbox
            key={item.id}
            checked={item.isAuth}
            onChange={(e) => {
              item.isAuth = e.target.checked;
              handleFunCheckChange(row);
            }}
          >
            {item.name}
          </Checkbox>
        ));
      },
    },
    {
      title: (
        <Checkbox
          checked={checkAll}
          indeterminate={indeterminate}
          onChange={(e) => checkAllChange(e.target.checked)}
        />
      ),
      key: "action",
      render: (row: AuthMenu) => (
        <Checkbox
          checked={row.isAuth}
          onChange={(e) => chechMenuChange(e.target.checked, row)}
        />
      ),
    },
  ];

  React.useImperativeHandle(ref, () => ({
    start: (roleId) => {
      getTableData(roleId);
      setOpen(true);
    },
  }));

  return (
    <Modal
      title="角色授权"
      width={800}
      open={open}
      centered={true}
      wrapClassName="custom-modal-style"
      maskClosable={false}
      onOk={() => onSubmit()}
      onCancel={() => setOpen(false)}
      confirmLoading={submitLoading}
    >
      <Table
        rowKey="id"
        size="small"
        dataSource={tableData}
        columns={columns}
        loading={loading}
        pagination={false}
        bordered
      ></Table>
    </Modal>
  );
});

// 可以稍微减少使用时的代码量
const useModal: (props: Props) => [React.RefObject<Ref>, React.ReactElement] =
  function (props) {
    const ref = React.useRef<Ref>(null);

    return [ref, <Accredit ref={ref} {...props} />];
  };

export default createCompoundedComponent(Accredit, { useModal });
