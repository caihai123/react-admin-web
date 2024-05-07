import { useState } from "react";
import {
  Card,
  Divider,
  Menu,
  Row,
  Col,
  Button,
  Input,
  Space,
  Table,
  Pagination,
  Statistic,
  Tooltip,
  Spin,
  Empty,
  theme,
} from "antd";
import {
  AppstoreOutlined,
  UploadOutlined,
  UnorderedListOutlined,
  VerticalAlignBottomOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { usePagination, useToggle } from "ahooks";
import axios from "@/utils/axios";
import { getFilenameFromPath } from "@/utils/utils";
import MyIcon from "@/components/MyIcon";
import FileView from "./components/FileView";
import { fileType } from "@/utils/dict";
import PieView from "./components/PieView";
import NameEllipsis from "./components/NameEllipsis";

export default function File() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [activeType, setActiveType] = useState("all");

  // 获取列表
  const getListData = ({ current, pageSize }) => {
    return axios
      .post("/api/file/page", {
        pageIndex: current,
        pageSize,
        type: activeType,
      })
      .then((value) => {
        const { result: data } = value;
        return {
          list: data.records,
          total: data.total,
        };
      });
  };

  const { data, pagination, loading } = usePagination(getListData, {
    refreshDeps: [activeType],
    defaultPageSize: 20,
  });

  // 表格配置
  const tableColumns = [
    {
      title: "文件",
      key: "file",
      render: (_, record) => {
        return (
          <FileView
            type={fileType.map[record.type].alias}
            src={record.url}
            height={36}
          />
        );
      },
    },
    {
      title: "文件地址",
      dataIndex: "url",
    },
    {
      title: "文件大小",
      dataIndex: "size",
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="下载" mouseEnterDelay={1}>
            <Button
              type="primary"
              icon={<VerticalAlignBottomOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="删除" mouseEnterDelay={1}>
            <Button danger icon={<DeleteOutlined />}></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // 分页配置
  const paginationConfig = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `第 ${range.join("-")} 条/共 ${total} 条`,
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    onChange: pagination.onChange,
  };

  // 视图切换
  const [viewType, { toggle }] = useToggle("list", "table");
  const listElement = {
    list: (
      <Spin spinning={loading}>
        {data?.list.length ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gridGap: 16,
              }}
            >
              {data?.list.map((item) => (
                <div
                  key={item.id}
                  style={{
                    height: 150,
                    padding: 10,
                    textAlign: "center",
                  }}
                >
                  <FileView
                    type={fileType.map[item.type].alias}
                    src={item.url}
                    height={60}
                  />
                  <NameEllipsis
                    text={getFilenameFromPath(item.url)}
                    style={{ lineHeight: 2, padding: "0 10px" }}
                  />
                </div>
              ))}
            </div>
            <Pagination
              style={{ marginTop: 16, textAlign: "right" }}
              {...paginationConfig}
              hideOnSinglePage={true}
            />
          </>
        ) : (
          <Empty />
        )}
      </Spin>
    ),
    table: (
      <Table
        rowKey="id"
        dataSource={data?.list}
        columns={tableColumns}
        pagination={paginationConfig}
        loading={loading}
      ></Table>
    ),
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 250px" }}>
        <Card>
          <div>文件管理 ✨</div>
          <Divider dashed style={{ margin: "8px 0" }} />
          <Menu
            items={[
              {
                key: "file",
                label: "文件类型",
                icon: <AppstoreOutlined />,
                children: [
                  {
                    key: "all",
                    label: "全部",
                    icon: <MyIcon type="icon-files" />,
                  },
                  {
                    key: "img",
                    label: "图片",
                    icon: <MyIcon type="icon-file_img" />,
                  },
                  {
                    key: "doc",
                    label: "文档",
                    icon: <MyIcon type="icon-file_txt" />,
                  },
                  {
                    key: "video",
                    label: "视频",
                    icon: <MyIcon type="icon-file_video" />,
                  },
                  {
                    key: "music",
                    label: "音频",
                    icon: <MyIcon type="icon-file_music" />,
                  },
                  {
                    key: "other",
                    label: "其他",
                    icon: <MyIcon type="icon-File" />,
                  },
                ],
              },
            ]}
            selectedKeys={["file", activeType]}
            defaultOpenKeys={["file"]}
            mode="inline"
            style={{ border: "none" }}
            onClick={({ key }) => setActiveType(key)}
          ></Menu>
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Row align="middle" style={{ textAlign: "center" }}>
            <Col span={10}>
              <Statistic
                title="储存容量"
                value={5}
                suffix="MB"
                valueStyle={{
                  color: colorPrimary,
                }}
              />
            </Col>
            <Col span={4}>
              <Divider type="vertical" />
            </Col>
            <Col span={10}>
              <Statistic
                title="数量"
                value={100}
                valueStyle={{
                  color: colorPrimary,
                }}
              />
            </Col>
          </Row>
          <Divider style={{ margin: "8px 0" }} />
          <PieView />
        </Card>
      </div>
      <div style={{ flex: "auto", padding: "0px 16px" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Space>
              <Input.Search
                enterButton="查询"
                placeholder="请输入文件名"
              ></Input.Search>
            </Space>
            <Space>
              <Button type="primary" icon={<UploadOutlined />}>
                上传
              </Button>
              <Button>批量操作</Button>
              <Tooltip title="视图" mouseEnterDelay={1}>
                <Button
                  icon={
                    viewType.view === "table" ? (
                      <UnorderedListOutlined />
                    ) : (
                      <AppstoreOutlined />
                    )
                  }
                  onClick={toggle}
                ></Button>
              </Tooltip>
            </Space>
          </div>
          <Divider dashed style={{ margin: "16px 0" }} />
          {listElement[viewType]}
        </Card>
      </div>
    </div>
  );
}
