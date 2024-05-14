import React from "react";

// 定义子组件的类型
interface SubComponents {
  [key: string]: any;
}

// 主组件和子组件的组合类型
type CompoundedComponent<F, T> = F & T;

/**
 * 创建组合组件
 */
export default function createCompoundedComponent<
  F extends React.FC<any>,
  T extends SubComponents
>(mainComponent: F, subComponents: T): CompoundedComponent<F, T> {
  // 将主组件转换为复合组件类型
  const Component = mainComponent as CompoundedComponent<F, T>;

  // 使用 Object.defineProperty 添加子组件到主组件上
  Object.keys(subComponents).forEach((key) => {
    Object.defineProperty(Component, key, {
      value: subComponents[key],
      writable: false, // 确保子组件不可变
      enumerable: true,
    });
  });

  return Component;
}
