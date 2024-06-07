import { Layout } from "antd";

export default function MyFooter() {
  return (
    <Layout.Footer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        © 2024 Made with <span style={{ color: "#e5e0d8" }}>❤</span> by CaiHai
      </div>
    </Layout.Footer>
  );
}
