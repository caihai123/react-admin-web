import { useNavigate } from "react-router-dom";
import { useMount } from "ahooks";
// 模拟路由重定向功能
export default function Redirect({ to }) {
  const navigate = useNavigate();
  useMount(() => navigate(to));
  return null;
}
