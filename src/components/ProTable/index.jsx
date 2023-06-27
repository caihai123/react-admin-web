import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import DropdownFrom from "@/components/DropdownFrom";
import { Table, Form, Select, Input, Space, Button, theme } from "antd";
import styles from "./style.module.css";
import { usePagination } from "ahooks";
import PropTypes from "prop-types";

// 生成输入框
const createInput = function (item) {
  if (item.type === "select") {
    return (
      <Select
        placeholder={`请选择${item.title}`}
        options={item.options}
        style={{ width: "183px" }}
      />
    );
  } else {
    return <Input placeholder={`请输入${item.title}`} />;
  }
};

const ProTable = forwardRef(function (props, ref) {
  const {
    // 表格列配置
    columns = [],

    // 是否显示搜索表单
    search = true,

    // 工具栏渲染函数
    toolBarRender = null,

    // 列表标题区渲染函数
    headerTitle,

    // 批量操作功能的渲染函数，不为空时会自动配置checkbox
    batchBarRender = null,

    // 表格的rowSelection配置项，优先级最高，可能会覆盖掉
    tableRowSelection = {},
  } = props;

  // 表单的默认值
  const initialValues = useMemo(
    () =>
      Object.fromEntries(
        columns
          .filter((item) => typeof item.initialValue !== "undefined")
          .map(({ dataIndex, initialValue }) => [dataIndex, initialValue])
      ),
    [columns]
  );

  // 搜索表单项
  const formItems = useMemo(() => {
    return columns
      .filter((item) => item.hideInSearch !== true)
      .map((item) => (
        <Form.Item
          label={item.title}
          name={item.dataIndex}
          key={item.key || item.dataIndex}
        >
          {createInput(item)}
        </Form.Item>
      ));
  }, [columns]);

  // 表格上使用的columns
  const tableColumns = useMemo(
    () => columns.filter((item) => item.hideInTable !== true),
    [columns]
  );

  const [params, setParams] = useState(initialValues);
  const searchFrom = useRef(null);

  const {
    data: tableData,
    pagination,
    loading,
  } = usePagination(
    ({ current, pageSize }) => props.request(params, { current, pageSize }),
    { refreshDeps: [params] }
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 当前选中的keys

  useImperativeHandle(ref, () => ({
    // 刷新，不传页码时刷新到当前页
    reload: (current) => pagination.changeCurrent(current),

    // 触发搜索表单的搜索事件
    search: () => {
      const submit = searchFrom?.current?.submit;
      submit ? submit() : setParams(null);
    },

    // 触发搜索表单的重置事件
    reset: () => {
      const reset = searchFrom?.current?.reset;
      reset ? reset() : setParams(null);
    },

    // 清空选中项
    clearSelected: () => setSelectedRowKeys([]),
  }));

  const {
    token: { borderRadius, controlItemBgActive, colorText },
  } = theme.useToken();

  return (
    <div style={{ padding: 20 }}>
      {search && (
        <DropdownFrom
          ref={searchFrom}
          onFinish={(values) => setParams(values)}
          initialValues={initialValues}
        >
          {formItems}
        </DropdownFrom>
      )}

      {toolBarRender && (
        <div
          className={styles["tools"]}
          style={{
            display: selectedRowKeys.length > 0 ? "none" : "",
            color: colorText,
          }}
        >
          <div className={styles["header-title"]}>
            {typeof headerTitle === "function" ? headerTitle() : headerTitle}
          </div>
          <Space>
            {typeof toolBarRender === "function"
              ? toolBarRender()
              : toolBarRender}
          </Space>
        </div>
      )}

      {batchBarRender && (
        <div
          className={styles["batch-bar"]}
          style={{
            display: selectedRowKeys.length > 0 ? "" : "none",
            color: colorText,
            backgroundColor: controlItemBgActive,
            borderRadius,
          }}
        >
          <div>
            <span>已选 {selectedRowKeys.length} 项</span>
            <Button type="link" onClick={() => setSelectedRowKeys([])}>
              取消选择
            </Button>
          </div>
          <Space>
            {typeof batchBarRender === "function"
              ? batchBarRender(selectedRowKeys)
              : batchBarRender}
          </Space>
        </div>
      )}

      <div className={styles["main"]}>
        <Table
          rowKey={props.rowKey}
          dataSource={tableData?.list}
          columns={tableColumns}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条`,
            onChange: pagination.onChange,
          }}
          loading={loading}
          rowSelection={
            batchBarRender
              ? {
                  type: "checkbox",
                  selectedRowKeys,
                  onChange: (keys) => setSelectedRowKeys(keys),
                  preserveSelectedRowKeys: true,
                  ...tableRowSelection,
                }
              : undefined
          }
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
});

ProTable.propTypes = {
  rowKey: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  search: PropTypes.bool,
  toolBarRender: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
  ]),
  headerTitle: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
    PropTypes.string,
  ]),
  batchBarRender: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
  ]),
  tableRowSelection: PropTypes.object,
};

export default ProTable;
