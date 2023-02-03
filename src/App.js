import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </HashRouter>
  );
}
