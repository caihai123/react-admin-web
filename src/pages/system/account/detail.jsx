import { Card, Divider, Descriptions, Tag, Badge, Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import axios from "@/utils/axios";
import { useRequest } from "ahooks";
import { gender as genderDict, accountEnabledState } from "@/utils/dict";

export default function AccountDetail() {
  const [searchParams] = useSearchParams();

  const { data, loading } = useRequest(() => {
    return axios
      .get("/api/account/details", {
        params: { id: searchParams.get("parentId") },
      })
      .then(({ result }) => {
        return result;
      });
  });

  const genderNode = (() => {
    if (!data) return undefined;
    const map = genderDict.map[data?.gender];
    const tag = {
      color: map?.color || "rgba(0,0,0,.25)",
      label: map?.label || "未知",
    };
    return <Tag color={tag.color}>{tag.label}</Tag>;
  })();

  const statusNode = (() => {
    if (!data) return undefined;
    const map = accountEnabledState.map[data?.status];
    const tag = {
      color: map?.color || "rgba(0,0,0,.25)",
      label: map?.label || "未知",
    };
    return <Badge color={tag.color} text={tag.label} />;
  })();

  const items = [
    {
      key: "name",
      label: "真实姓名",
      children: data?.name,
    },
    {
      key: "account",
      label: "账号",
      children: data?.account,
    },
    {
      key: "gender",
      label: "性别",
      children: genderNode,
    },
    {
      key: "phone",
      label: "手机号",
      children: data?.phone,
    },
    {
      key: "email",
      label: "邮箱",
      children: data?.email,
    },
    {
      key: "status",
      label: "状态",
      children: statusNode,
    },
    {
      key: "deptId",
      label: "部门",
      children: data?.deptName,
    },
  ];
  return (
    <Card>
      <h1>用户详情 ✨</h1>
      <Divider />

      <Spin spinning={loading} tip="拼命加载中...">
        <Descriptions items={items} bordered></Descriptions>
      </Spin>
    </Card>
  );
}
