import { Link, useMatches } from "react-router-dom";
import { Breadcrumb } from "antd";

export default function Component() {
  const matches = useMatches();

  const levelList = matches
    .map((match, index) => {
      return {
        title: match.handle?.title,
        path: match.pathname === "/" && index !== 0 ? null : match.pathname, // 只允许首页使用'/'
      };
    })
    .filter((item) => item.title);
  return (
    <Breadcrumb
      items={levelList.map((item) => ({
        title: item.path ? (
          <Link to={item.path}>{item.title}</Link>
        ) : (
          <span>{item.title}</span>
        ),
      }))}
    ></Breadcrumb>
  );
}
