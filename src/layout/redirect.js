import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 模拟路由重定向功能
export default function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}
