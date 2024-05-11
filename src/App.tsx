import { FC, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import router from "@/router";
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";

// antd 的 DatePicker 国际化失效，官网说是因为我项目中同时存在两个dayjs，也确实是这样，ahooks中也有dayjs
// 我这样加载中文包之后就好了，我猜测应该是antd设置dayjs.locale的时候没有找到正确的中文包
import "dayjs/locale/zh-cn";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label}是必选字段",
};

const App: FC = function () {
  const themeName = useSelector(selectTheme);

  const isLight = themeName !== "dark";

  return (
    <ConfigProvider
      locale={zhCN}
      form={{ validateMessages }}
      theme={{
        token: {
          borderRadius: 2,
          // colorBgBase: isLight ? "#fff" : "#242525",
          colorBgContainer: isLight ? "#ffffff" : "#242525",
          colorBgLayout: isLight ? "#f0f2f5" : "#2A2C2C",
          colorTextBase: isLight ? "#1E293B" : "#E2E8F0",
          colorBorder: isLight ? "#e5e7eb" : "#454847",
        },
        algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
        components: {
          Menu: { darkSubMenuItemBg: "#2c2d2d", darkPopupBg: "#424242" },
        },
        cssVar: true,
      }}
    >
      <AntdApp>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
