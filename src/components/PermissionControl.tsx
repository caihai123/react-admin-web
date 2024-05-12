import { Fragment, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenuFlatten } from "@/store/menu";

/**
 * 返回针对当前页的权限判断函数
 */
export const useButtonAuthorization = function () {
  const { pathname } = useLocation();
  const menuFlatten = useSelector(selectMenuFlatten);

  const currentRoute = menuFlatten.find((item) => item.path === pathname);

  return (butId: string) =>
    currentRoute?.buttonList?.some((item) => item.id === butId) || false;
};

/**
 * 判断是否至少拥有一个权限
 */
export const useAnyButtonPermission = function (...permissions: string[]) {
  const hasButtonPermission = useButtonAuthorization();
  return permissions.some((permission) => hasButtonPermission(permission));
};

/**
 * 传入一个或多个按钮，返回有权限的按钮
 */
export const useFilterElementPermission: (
  ...args: Array<{
    // 按钮的权限标识
    permission: string;
    // 用于渲染元素的函数
    render: (...args: any) => ReactNode;
  }>
) => [(...args: any) => ReactNode, boolean] = function (...permissionElements) {
  const hasButtonPermission = useButtonAuthorization();

  const filteredElements = permissionElements.filter((item) =>
    hasButtonPermission(item.permission)
  );

  const hasPermissionButtons = !!filteredElements.length;

  const render = function (...argument: any) {
    return (
      <Fragment>
        {filteredElements.map((item) => {
          const element = item.render(...argument);
          return <Fragment key={item.permission}>{element}</Fragment>;
        })}
      </Fragment>
    );
  };

  return [render, hasPermissionButtons];
};

/**
 * 按钮权限鉴权组件
 */
export default function PermissionControl({
  permission,
  children,
}: {
  // 按钮的权限标识
  permission: string;
  // 按钮元素
  children: ReactNode;
}) {
  const hasButtonPermission = useButtonAuthorization();

  return hasButtonPermission(permission) ? children : undefined;
}
