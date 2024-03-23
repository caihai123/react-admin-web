import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useEffect,
} from "react";
import DropdownFrom from "@/components/DropdownFrom";
import { Table, Space, Button, theme, Card, Tooltip, Dropdown } from "antd";
import styles from "./style.module.css";
import { usePagination } from "ahooks";
import PropTypes from "prop-types";
import {
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ColumnSetting from "./ColumnSetting";
import FormItem from "./FormItem";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";

const getRowkey = function (row) {
  return row.key || row.dataIndex;
};

const initialTableSize = "large"; // 表格尺寸默认值

const ProTable = forwardRef(function (props, ref) {
  const {
    // Table 的数据，protable 推荐使用 request 来加载
    dataSource,

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

    // 表格的rowSelection配置项，优先级最高，可能会覆盖掉默认配置
    tableRowSelection = {},

    // 分页配置项，为对象时可能会覆盖掉默认值
    pagination: paginationConfig = true,

    // 自定义表格loading
    loading,

    // 处理刷新表格刷新
    onRefresh,

    // 提交表单时触发
    onSubmit,

    // 重置表单时触发
    onReset,
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
      .map((item) => <FormItem item={item} key={getRowkey(item)} />);
  }, [columns]);

  // 表格上使用的columns
  const tableColumns = useMemo(
    () => columns.filter((item) => item.hideInTable !== true),
    [columns]
  );

  // 表格设置栏
  const [configkeys, setConfigkeys] = useState(
    tableColumns.map((item) => getRowkey(item))
  );

  // 查询表单参数缓存
  const [params, setParams] = useState(initialValues);

  // 查询表单实例
  const searchFrom = useRef(null);

  // request加载数据对象
  const requestData = usePagination(
    ({ current, pageSize }) =>
      !Array.isArray(dataSource) &&
      props.request?.(params, { current, pageSize }),
    {
      refreshDeps: [params],
      defaultCurrent: paginationConfig?.current || 1,
      defaultPageSize: paginationConfig?.pageSize || 10,
      loadingDelay: 0,
    }
  );

  // 表格的可变配置项
  const tableConfig = useMemo(() => {
    const isDataSource = Array.isArray(dataSource);
    const paginationBaseConfig = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `第 ${range.join("-")} 条/共 ${total} 条`,
      style: { marginBottom: -8 },
      ...paginationConfig,
    };
    const { data, pagination, refresh } = requestData;
    return {
      list: isDataSource ? dataSource : data?.list,
      // eslint-disable-next-line no-nested-ternary
      pagination: paginationConfig
        ? isDataSource
          ? paginationBaseConfig
          : {
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: pagination.onChange,
              ...paginationBaseConfig,
            }
        : false,
      refresh: (pageIndex) => {
        if (!isDataSource) {
          pageIndex && pageIndex !== pagination.current
            ? pagination.changeCurrent(pageIndex)
            : refresh();
        }
        onRefresh?.(params);
      },
    };
  }, [dataSource, requestData, paginationConfig, params, onRefresh]);

  // loadingDelay 和 loadingKeep，具体可参考：useLoadingDelayAndKeep
  const [tableLoading, { setTrue, setFalse }] = useLoadingDelayAndKeep(
    typeof loading === "boolean" ? loading : false
  );
  useEffect(() => {
    const isDataSource = Array.isArray(dataSource);
    const tableLoading =
      // eslint-disable-next-line no-nested-ternary
      loading === "boolean"
        ? loading
        : isDataSource
        ? false
        : requestData.loading;
    tableLoading ? setTrue() : setFalse();
  }, [dataSource, loading, requestData.loading, setTrue, setFalse]);

  // 表格size
  const [tableSize, setTableSize] = useState(initialTableSize);

  // 当前选中的keys
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 暴露出去的函数
  useImperativeHandle(ref, () => ({
    refresh: tableConfig.refresh,

    // 触发搜索表单的搜索事件
    search: () => {
      const submit = searchFrom?.current?.submit;
      submit ? submit() : setParams(null);
      onSubmit?.(params);
    },

    // 触发搜索表单的重置事件
    reset: () => {
      const reset = searchFrom?.current?.reset;
      reset ? reset() : setParams(null);
      onReset?.(params);
    },

    // 清空选中项
    clearSelected: () => setSelectedRowKeys([]),
  }));

  const {
    token: { borderRadius, controlItemBgActive, colorText },
  } = theme.useToken();

  return (
    <>
      {search && (
        <DropdownFrom
          ref={searchFrom}
          onFinish={(values) => setParams(values)}
          initialValues={initialValues}
        >
          {formItems}
        </DropdownFrom>
      )}

      <Card
        style={{ marginTop: search ? 16 : 0 }}
        styles={{ body: { paddingTop: 16, paddingBottom: 24 } }}
      >
        {
          <div
            className={styles["tools-bar"]}
            style={{
              display: selectedRowKeys.length > 0 ? "none" : "",
              color: colorText,
            }}
          >
            <div className={styles["header-title"]}>
              {typeof headerTitle === "function" ? headerTitle() : headerTitle}
            </div>
            <div className={styles["tool-right"]}>
              {toolBarRender && (
                <Space>
                  {typeof toolBarRender === "function"
                    ? toolBarRender(params)
                    : toolBarRender}
                </Space>
              )}
              <div className={styles["toolbar-setting"]}>
                <div
                  className={styles["toolbar-setting-item"]}
                  onClick={() => tableConfig.refresh()}
                >
                  <Tooltip title="刷新">
                    <ReloadOutlined />
                  </Tooltip>
                </div>
                <Dropdown
                  overlayStyle={{ width: 80 }}
                  menu={{
                    items: [
                      { key: "large", label: "默认" },
                      { key: "middle", label: "中等" },
                      { key: "small", label: "紧凑" },
                    ],
                    selectable: true,
                    defaultSelectedKeys: [initialTableSize],
                    onClick: ({ key }) => setTableSize(key),
                  }}
                  trigger={["click"]}
                >
                  <div className={styles["toolbar-setting-item"]}>
                    <Tooltip title="密度">
                      <ColumnHeightOutlined />
                    </Tooltip>
                  </div>
                </Dropdown>

                <ColumnSetting
                  value={configkeys}
                  options={tableColumns.map((item) => ({
                    label: item.title,
                    value: getRowkey(item),
                  }))}
                  onChange={(keys) => setConfigkeys(keys)}
                >
                  <div className={styles["toolbar-setting-item"]}>
                    <Tooltip title="列设置">
                      <SettingOutlined />
                    </Tooltip>
                  </div>
                </ColumnSetting>
              </div>
            </div>
          </div>
        }

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
            dataSource={tableConfig.list}
            columns={tableColumns.filter((item) => {
              const key = getRowkey(item);
              return configkeys.includes(key);
            })}
            pagination={tableConfig.pagination}
            loading={tableLoading}
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
            size={tableSize}
            scroll={{ x: "max-content" }}
          />
        </div>
      </Card>
    </>
  );
});

ProTable.propTypes = {
  rowKey: PropTypes.string.isRequired,
  dataSource: PropTypes.array,
  request: PropTypes.func,
  onRefresh: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  columns: PropTypes.array.isRequired,
  search: PropTypes.bool,
  loading: PropTypes.bool,
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
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ProTable;
