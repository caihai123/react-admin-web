import {
  forwardRef,
  useState,
  useMemo,
  useRef,
  useEffect,
  useImperativeHandle,
  ReactNode,
  Key as ReactKey,
} from "react";
import { Card, Table, theme, Space, Tooltip, Dropdown, Button } from "antd";
import { usePagination } from "ahooks";
import styles from "./style.module.css";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";
import FormItem from "./FormItem";
import DropdownFrom from "@/components/DropdownFrom";
import ColumnSetting from "./ColumnSetting";
import {
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import type { TableProps, TableColumnType } from "antd";
import type { Item as FormItemType } from "./FormItem/index";
import type { Ref as DropdownFromRefType } from "@/components/DropdownFrom";

export type Ref = {
  /** 手动触发刷新，可传入页码刷新到指定页 */
  refresh: (pageIndex?: number) => void;
  /** 手动触发查询操作 */
  search: () => void;
  /** 手动触发重置操作 */
  reset: () => void;
  /** 手动清空多选 */
  clearSelected: () => void;
};

export type ProTableColumnType<RecordType = any> =
  TableColumnType<RecordType> & {
    /** 查询表单初始值 */
    initialValue?: any;
    /** 是否在筛选表单中隐藏该项 默认：false */
    hideInSearch?: boolean;
    /** 是否在表格中隐藏该项 默认：false */
    hideInTable?: boolean;
  } & FormItemType;

export type ProTableProps<RecordType = any> = {
  /** 表格行 key 的取值，可以是字符串或一个函数 */
  rowKey: TableProps<RecordType>["rowKey"];
  /** Table 的数据，protable 推荐使用 request 来加载 */
  dataSource?: TableProps<RecordType>["dataSource"];
  /** 获取 dataSource 的方法 */
  request?: (
    /** 查询表单的 params */
    params: any,
    /** 分页参数 */
    pagination: { current: number; pageSize: number }
  ) => Promise<{ list: any[]; total?: number }>;
  /** 表格列及查询表单的配置描述 */
  columns: ProTableColumnType<RecordType>[];
  /** 表格分页配置项 为 false 时不显示*/
  pagination?: TableProps<RecordType>["pagination"];
  /** 自定义表格 loading 默认：不显示 */
  loading?: TableProps<RecordType>["loading"];
  /** 是否显示搜索表单 默认：true */
  search?: boolean;
  /** 批量操作节点 */
  batchBarRender?: ReactNode | ((keys: any[]) => ReactNode);
  /** 工具栏节点 */
  toolBarRender?: ReactNode | ((params: any) => ReactNode);
  /** table 标题 */
  headerTitle?: ReactNode | (() => ReactNode);
  /** Table rowSelection 配置 */
  tableRowSelection?: TableProps<RecordType>["rowSelection"];
  /** 刷新页面时触发 */
  onRefresh?: (params: any) => void;
  /** 提交表单时触发 */
  onSubmit?: (params: any) => void;
  /** 重置表单时触发 */
  onReset?: (params: any) => void;

  footer?: TableProps["footer"];
};

export type TableSize = TableProps["size"];

const initialTableSize = "large"; // 表格尺寸默认值

const getRowkey = function (row: ProTableColumnType) {
  return row.key || row.dataIndex;
};

const ProTable = forwardRef<Ref, ProTableProps>(function (props, ref) {
  const {
    loading,
    columns,
    dataSource,
    pagination: propPagination = true,
    onRefresh,
    search: showSearch = true,
    batchBarRender,
    toolBarRender,
    headerTitle,
    tableRowSelection,
  } = props;

  // 搜索表单项
  const formItems = useMemo(() => {
    return columns
      .filter((item) => item.hideInSearch !== true)
      .map((item) => <FormItem item={item} key={getRowkey(item)} />);
  }, [columns]);

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

  // 查询表单参数缓存
  const [params, setParams] = useState(initialValues);

  // 查询表单实例
  const searchFrom = useRef<DropdownFromRefType>(null);

  // 表格上使用的columns
  const tableColumns = useMemo(
    () => columns.filter((item) => item.hideInTable !== true),
    [columns]
  );

  // request加载数据对象
  const requestData = usePagination(
    ({ current, pageSize }) =>
      // @ts-ignore
      !Array.isArray(dataSource) &&
      props.request?.(params, { current, pageSize }),
    {
      refreshDeps: [params],
      // @ts-ignore
      defaultCurrent: propPagination?.current || 1,
      // @ts-ignore
      defaultPageSize: propPagination?.pageSize || 10,
      loadingDelay: 0,
    }
  );

  // 表格的可变配置项
  const tableConfig = useMemo(() => {
    const isDataSource = Array.isArray(dataSource);
    const { data, pagination, refresh } = requestData;
    const paginationConfig: TableProps["pagination"] = {
      // table pagination 的默认配置，允许props.pagination 覆盖它
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `第 ${range.join("-")} 条/共 ${total} 条`,
      style: { marginBottom: -8 },
      // @ts-ignore 我知道它可能为 boolean ,就算放进去也不会出现错误
      ...propPagination,
    };
    return {
      list: isDataSource ? dataSource : data?.list,
      // eslint-disable-next-line no-nested-ternary
      pagination: propPagination
        ? isDataSource
          ? paginationConfig
          : {
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: pagination.onChange,
              ...paginationConfig,
            }
        : false,
      refresh(pageIndex?: number) {
        if (!isDataSource) {
          pageIndex && pageIndex !== pagination.current
            ? pagination.changeCurrent(pageIndex)
            : refresh();
        }
        onRefresh?.(params);
      },
    };
  }, [dataSource, requestData, propPagination, params, onRefresh]);

  // 表格设置栏
  const [configkeys, setConfigkeys] = useState(
    tableColumns.map((item) => getRowkey(item))
  );

  // loadingDelay 和 loadingKeep，具体可参考：useLoadingDelayAndKeep
  const [tableLoading, { setTrue, setFalse }] = useLoadingDelayAndKeep(
    typeof loading === "boolean" ? loading : false
  );
  useEffect(() => {
    const tableLoading =
      typeof loading === "boolean" ? loading : requestData.loading;
    tableLoading ? setTrue() : setFalse();
  }, [loading, requestData.loading, setTrue, setFalse]);

  // 表格size
  const [tableSize, setTableSize] = useState<TableSize>(initialTableSize);

  // 当前选中的keys
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactKey[]>([]);

  const {
    token: { borderRadius, controlItemBgActive, colorText },
  } = theme.useToken();

  // 暴露出去的函数
  useImperativeHandle(ref, () => ({
    refresh: tableConfig.refresh,

    // 触发搜索表单的搜索事件
    search: () => {
      const submit = searchFrom.current?.submit;
      submit ? submit() : setParams(null);
      props.onSubmit?.(params);
    },

    // 触发搜索表单的重置事件
    reset: () => {
      const reset = searchFrom.current?.reset;
      reset ? reset() : setParams(null);
      props.onReset?.(params);
    },

    // 清空选中项
    clearSelected: () => setSelectedRowKeys([]),
  }));

  return (
    <>
      {showSearch && (
        <DropdownFrom
          ref={searchFrom}
          onFinish={(values) => setParams(values)}
          initialValues={initialValues}
        >
          {formItems}
        </DropdownFrom>
      )}

      <Card
        style={{ marginTop: showSearch ? 16 : 0 }}
        styles={{
          body: { paddingTop: 16, paddingBottom: 24 },
        }}
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
                    onClick: ({ key }) => setTableSize(key as TableSize),
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
            loading={tableLoading}
            pagination={tableConfig.pagination}
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
            size={tableSize}
            bordered
            scroll={{ x: "max-content" }}
            footer={props.footer}
          ></Table>
        </div>
      </Card>
    </>
  );
});

export default ProTable;
