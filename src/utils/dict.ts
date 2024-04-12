export type DictType = {
  enum: {
    [alias: string]: string | number;
  };
  options: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  map: {
    [value: string | number]: {
      label: string;
      value: string | number;
      alias: string;
      color?: string;
    };
  };
};

const createDict = function (
  dict: { label: string; value: string; alias: string; color?: string }[]
): DictType {
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

const dict: { [dictName: string]: DictType } = {
  menuType,
  gender,
  accountEnabledState,
};

export default dict;
