import { Result } from "antd";
import { useSelector } from "react-redux";
import { selectUserinfo } from "@/store/userinfo";
import Error401 from "@/pages/401";
import PageLoading from "./PageLoading";

// 权限路由包装组件
// 根据后端返回的菜单列表显示视图
export default function Auth(props) {
  const { status, role = [] } = useSelector(selectUserinfo);

  const routeRole = props.role || [];

  const component = {
    loading: <PageLoading />,
    succeeded: role.some((item) => routeRole.includes(item)) ? (
      <props.Component />
    ) : (
      <Error401 />
    ),
    failed: (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          status="500"
          title="权限错误！！！"
          subTitle="没有获取到您的权限，可能是菜单获取失败了，您可以尝试刷新整个页面。"
        ></Result>
      </div>
    ),
  };

  return component[status];
}
