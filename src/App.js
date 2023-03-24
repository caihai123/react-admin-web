import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { selectTheme } from "@/store//modules//system";
import { useSelector } from "react-redux";

export default function App() {
  const themeName = useSelector(selectTheme);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: { borderRadius: 2 },
        algorithm:
          themeName !== "dark" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
