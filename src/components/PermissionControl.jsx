import { Fragment } from "react";
import { selectUserinfo } from "@/store/userinfo";
import { useSelector } from "react-redux";

/**
 * 返回针对当前页的权限判断函数
 * @returns function
 */
export const useButtonAuthorization = function () {
  const { role: userRole = [] } = useSelector(selectUserinfo);

  return (buttonRoles = []) =>
    userRole.some((userRoleitem) =>
      buttonRoles.some((item) => item === userRoleitem)
    );
};

/**
 * 传入一个或多个按钮，返回有权限的按钮
 * @param  {...object} permissionElements
 * @param {array} permissionElements[].role - 按钮的权限标识
 * @param {function} permissionElements[].render - 用于渲染元素的函数
 * @param {function} permissionElements[].key - key 没有时使用索引
 * @returns [render, hasPermissionButtons]
 */
export const useFilterElementPermission = function (...permissionElements) {
  const hasButtonPermission = useButtonAuthorization();

  const filteredElements = permissionElements.filter((item) =>
    hasButtonPermission(item.role)
  );

  const hasPermissionButtons = !!filteredElements.length;

  const render = function (...argument) {
    return (
      <Fragment>
        {filteredElements.map((item, index) => {
          const element = item.render(...argument);
          return <Fragment key={item.key || index}>{element}</Fragment>;
        })}
      </Fragment>
    );
  };

  return [render, hasPermissionButtons];
};

/**
 * 按钮权限鉴权组件
 * @param {array} role - 按钮的权限标识
 * @param {ReactNode} children - 按钮元素
 */
export default function PermissionControl({ role, children }) {
  const hasButtonPermission = useButtonAuthorization();

  return hasButtonPermission(role) ? children : undefined;
}
