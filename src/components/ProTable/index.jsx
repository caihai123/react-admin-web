import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { Table, Card, Space, theme } from "antd";
import styles from "./style.module.css";
import { usePagination } from "ahooks";
import PropTypes from "prop-types";
import FormItem from "./FormItem";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";
import PageContainer from "@/components/PageContainer";
import BatchBar from "./BatchBar";
import QueryForm from "./QueryForm";
import TableTop from "./TableTop";

const getRowkey = function (row) {
  return row.key || row.dataIndex;
};

const initialTableSize = "large"; // 表格尺寸默认值

const ProTable = forwardRef(function (props, ref) {
  const {
    // 页面标题
    title,

    // Table 的数据，protable 推荐使用 request 来加载
    dataSource,

    // 表格列配置
    columns = [],

    // 工具栏渲染函数
    toolBarRender,

    // 额外的参数，优先级比params高，所以最好别和params冲突
    extraParams,

    // 批量操作功能的渲染函数，不为空时会自动配置checkbox
    batchBarRender,

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

    // PageContainer actions fundamental模式下无效
    pageActions = [],

    // PageContainer extra fundamental模式下无效
    pageExtra = null,

    // table title fundamental模式下无效
    tableTitle,

    // 两种布局方式
    layout = "primary", //  primary or fundamental
  } = props;

  const queryForm = useRef(null);
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
  // 查询表单参数缓存
  const [searchParams, setSearchParams] = useState(initialValues);
  // searchParams 和 extraParams合并，发起请求的真实参数
  const params = useMemo(
    () => ({ ...searchParams, ...extraParams }),
    [searchParams, extraParams]
  );

  // 表格上使用的columns
  const tableColumns = useMemo(
    () => columns.filter((item) => item.hideInTable !== true),
    [columns]
  );

  // 表格设置栏
  const [configkeys, setConfigkeys] = useState(
    tableColumns.map((item) => getRowkey(item))
  );

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
      total: data?.total,
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
      const submit = queryForm?.current?.submit;
      submit ? submit() : setSearchParams(null);
      onSubmit?.(params);
    },

    // 触发搜索表单的重置事件
    reset: () => {
      const reset = queryForm?.current?.reset;
      reset ? reset() : setSearchParams(null);
      onReset?.(params);
    },

    // 清空选中项
    clearSelected: () => setSelectedRowKeys([]),
  }));

  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  const QueryFormRender = (layout) => (
    <QueryForm
      ref={queryForm}
      key="queryForm"
      initialValues={initialValues}
      onFinish={(values) => setSearchParams(values)}
      layout={layout}
    >
      {formItems}
    </QueryForm>
  );

  const TableTitle =
    // eslint-disable-next-line no-nested-ternary
    layout === "fundamental"
      ? `${title} ✨`
      : typeof tableTitle === "function"
      ? tableTitle(tableConfig.total || tableConfig.list?.length || "")
      : tableTitle;

  const toolBarEl =
    typeof toolBarRender === "function" ? toolBarRender(params) : toolBarRender;

  const TablleTopEl = (
    <TableTop
      style={{
        display: selectedRowKeys.length > 0 ? "none" : "",
        border:
          layout === "fundamental"
            ? "none"
            : `1px solid ${colorBorderSecondary}`,
        borderBottom: "none",
        padding: layout === "fundamental" ? "0 0 12px 0" : "8px 12px",
      }}
      tableTitle={TableTitle}
      onRefresh={() => tableConfig.refresh()}
      initialTableSize={initialTableSize}
      onTableSizeChange={(key) => setTableSize(key)}
      columnSettingValue={configkeys}
      columnSettingOptions={tableColumns.map((item) => ({
        label: item.title,
        value: getRowkey(item),
      }))}
      onColumnSettingChange={(keys) => setConfigkeys(keys)}
      toolBarRender={
        layout === "fundamental" ? <Space>{toolBarEl}</Space> : undefined
      }
    ></TableTop>
  );

  const TableEl = (
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
  );

  const BatchBarEl = (
    <BatchBar
      batchBarRender={batchBarRender}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
    />
  );

  if (layout === "fundamental") {
    return (
      <>
        {QueryFormRender("dropdown")}

        <Card
          style={{ marginTop: formItems.length > 0 ? 16 : 0 }}
          styles={{ body: { paddingTop: 16, paddingBottom: 24 } }}
        >
          {TablleTopEl}

          {BatchBarEl}

          {TableEl}
        </Card>
      </>
    );
  } else {
    return (
      <PageContainer
        title={title}
        tools={toolBarEl}
        actions={[...pageActions, QueryFormRender()].filter(Boolean)}
        extra={pageExtra}
      >
        {TablleTopEl}

        {BatchBarEl}

        {TableEl}
      </PageContainer>
    );
  }
});

ProTable.propTypes = {
  rowKey: PropTypes.string.isRequired,
  dataSource: PropTypes.array,
  request: PropTypes.func,
  onRefresh: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  toolBarRender: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]),
  batchBarRender: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
  ]),
  tableRowSelection: PropTypes.object,
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  pageActions: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  pageExtra: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  extraParams: PropTypes.object,
  tableTitle: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default ProTable;
