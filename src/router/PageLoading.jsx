import { Spin } from "antd";

// 页面级的loading组件
const PageLoading = function () {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default PageLoading;
