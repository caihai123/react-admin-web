import { Card, List, Select, Radio, Input, Space, Button, Tag } from "antd";
import {
  PlusOutlined,
  UserOutlined,
  MessageOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  MehFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { usePagination } from "ahooks";
import axios from "@/utils/axios";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

const StatusIcon = function ({ status }) {
  switch (status) {
    case 0:
      // 已关闭
      return <CloseCircleFilled style={{ color: "#909399" }} />;
    case 1:
      // 开启的
      return <MehFilled style={{ color: "#108ee9" }} />;
    case 2:
      // 已完成
      return <CheckCircleFilled style={{ color: "#52c41a" }} />;
    default:
      return <div>未知状态</div>;
  }
};

const TypeTag = function ({ type }) {
  switch (type) {
    case 1:
      return <Tag color="error">缺陷</Tag>;
    case 2:
      return <Tag color="processing">需求</Tag>;
    default:
      return undefined;
  }
};

export default function Comment() {
  const navigate = useNavigate();

  const getListData = ({ current, pageSize }) => {
    return axios
      .post("/api/issues/page", { pageIndex: current, pageSize })
      .then((value) => {
        const { result: data } = value;
        return {
          list: data.records,
          total: data.total,
        };
      });
  };

  const { data, pagination, loading } = usePagination(getListData);

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <Select
            defaultValue="1"
            options={[
              { label: "全部", value: "1" },
              { label: "与我相关", value: "2" },
              { label: "我负责的", value: "3" },
              { label: "我创建的", value: "4" },
              { label: "我协作的", value: "5" },
            ]}
            style={{ width: 100 }}
          />
          <Input.Search placeholder="搜索 Issuse" style={{ width: 500 }} />
        </Space>

        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/issues/add")}
          >
            新键 Issuse
          </Button>
        </Space>
      </div>

      <List
        header={
          <div>
            <Radio.Group defaultValue="1" buttonStyle="solid">
              <Radio.Button value="">全部</Radio.Button>
              <Radio.Button value="1">开启的</Radio.Button>
              <Radio.Button value="2">已完成</Radio.Button>
              <Radio.Button value="0">已关闭</Radio.Button>
            </Radio.Group>
          </div>
        }
        loading={loading}
        itemLayout="vertical"
        dataSource={data?.list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <StatusIcon status={item.status} />,
              <Space>
                <UserOutlined />
                {item.user.name}
              </Space>,
              <Space>
                <MessageOutlined />
                {item.commentCount}
              </Space>,
            ]}
            extra={dayjs(item.createTime).fromNow()}
          >
            <List.Item.Meta
              title={
                <div>
                  <TypeTag type={item.type}></TypeTag> {item.title}
                </div>
              }
              description={item.describe}
            />
          </List.Item>
        )}
        bordered
        pagination={{
          position: "bottom",
          align: "center",
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: pagination.onChange,
        }}
        style={{ marginTop: 12 }}
      ></List>
    </Card>
  );
}
