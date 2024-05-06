export type DictType<L, V, A, C> = {
  enum: {
    [alias: string]: V;
  };
  options: Array<{
    label: L;
    value: V;
    color?: C;
  }>;
  map: {
    [value: string]: {
      label: L;
      value: V;
      alias: A;
      color?: C;
    };
  };
};

const createDict = function <
  L extends string,
  V extends string | number,
  A extends string,
  C extends string
>(dict: { label: L; value: V; alias: A; color?: C }[]): DictType<L, V, A, C> {
  return {
    enum: Object.fromEntries(dict.map(({ alias, value }) => [alias, value])),
    options: dict.map(({ label, value, color }) => ({ label, value, color })),
    map: Object.fromEntries(dict.map((item) => [item.value, item])),
  };
};

// 菜单类型
export const menuType = createDict([
  { label: "菜单", value: "1", alias: "menu", color: "#87d068" },
  { label: "目录", value: "2", alias: "folder", color: "#108ee9" },
]);

// 性别
export const gender = createDict([
  { label: "男", value: "1", alias: "male", color: "#00b9ff" },
  { label: "女", value: "2", alias: "woman", color: "#f179b4" },
]);

// 用户启用状态
export const accountEnabledState = createDict([
  { label: "启用", value: "1", alias: "enabled", color: "#52c41a" },
  {
    label: "禁用",
    value: "0",
    alias: "disabled",
    color: "rgba(30, 41, 59, 0.25)",
  },
]);

// 角色启用状态
export const roleEnabledState = createDict([
  { label: "启用", value: "1", alias: "enabled", color: "#52c41a" },
  {
    label: "禁用",
    value: "0",
    alias: "disabled",
    color: "rgba(30, 41, 59, 0.25)",
  },
]);
