import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { selectTheme } from "@/store//modules//system";
import { useSelector } from "react-redux";

export default function App() {
  const themeName = useSelector(selectTheme);

  const isLight = themeName !== "light";

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          borderRadius: 2,
          // colorBgBase: isLight ? "#fff" : "rgb(36, 37, 37)",
          colorBgContainer: isLight ? "#fff" : "rgb(36, 37, 37)",
          colorPrimary: isLight ? "#1677ff" : "rgb(23, 101, 174)",
          colorBgLayout: isLight ? "#f5f5f5" : "rgb(42, 44, 44)",
          colorTextBase: isLight ? "#000" : "rgba(229, 224, 216, 0.85)",
          colorError: isLight ? "#ff4d4f" : "rgb(147, 18, 18)",
        },
        algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
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
