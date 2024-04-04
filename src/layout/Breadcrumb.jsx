import { Link, useMatches } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { selectMenuFlatten } from "@/store/menu";

export default function Component() {
  const matches = useMatches();

  const menuFlatten = useSelector(selectMenuFlatten);

  const levelList = matches
    .map((match) => {
      const found = menuFlatten.find((i) => i.path === match.pathname);
      if (found) {
        return { title: found.title, path: found.path };
      } else if (match.handle?.title) {
        return {
          title: match.handle.title,
          path: match.pathname,
        };
      } else {
        return undefined;
      }
    })
    .filter(Boolean);

  return (
    <Breadcrumb
      items={levelList.map((item) => ({
        title: <Link to={item.path}>{item.title}</Link>,
      }))}
    ></Breadcrumb>
  );
}
