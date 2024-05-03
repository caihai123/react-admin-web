import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenuFlatten } from "@/store/menu";

/**
 * 返回针对当前页的权限判断函数
 * @returns function
 */
export const useButtonAuthorization = function () {
  const { pathname } = useLocation();
  const menuFlatten = useSelector(selectMenuFlatten);

  const currentRoute = menuFlatten.find((item) => item.path === pathname);

  return (butId) => currentRoute.buttonList?.some((item) => item.id === butId);
};

/**
 * 判断是否至少拥有一个权限
 * @param  {...string} permissions 按钮标识
 * @returns Boolean
 */
export const useAnyButtonPermission = function (...permissions) {
  const hasButtonPermission = useButtonAuthorization();
  return permissions.some((permission) => hasButtonPermission(permission));
};

/**
 * 传入一个或多个按钮，返回有权限的按钮
 * @param  {...object} permissionElements
 * @param {string} permissionElements[].permission - 按钮的权限标识
 * @param {function} permissionElements[].render - 用于渲染元素的函数
 * @returns [render, hasPermissionButtons]
 */
export const useFilterElementPermission = function (...permissionElements) {
  const hasButtonPermission = useButtonAuthorization();

  const filteredElements = permissionElements.filter((item) =>
    hasButtonPermission(item.permission)
  );

  const hasPermissionButtons = !!filteredElements.length;

  const render = function (...argument) {
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
 * @param {string} permission - 按钮的权限标识
 * @param {ReactNode} children - 按钮元素
 */
export default function PermissionControl({ permission, children }) {
  const hasButtonPermission = useButtonAuthorization();

  return hasButtonPermission(permission) ? children : undefined;
}
