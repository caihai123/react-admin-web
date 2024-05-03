const createDict = function (dict) {
  return {
    enum: Object.fromEntries(dict.map(({ alias, value }) => [alias, value])),
    options: dict.map(({ label, value, color }) => ({ label, value, color })),
    map: Object.fromEntries(dict.map((item) => [item.value, item])),
  };
};

export const role = createDict([
  { label: "管理员", value: "admin", alias: "admin" },
  { label: "用户", value: "user", alias: "user" },
]);

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

const dict = {
  role,
  menuType,
  gender,
  accountEnabledState,
};

export default dict;
