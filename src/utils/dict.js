const createDict = function (dict) {
  return {
    enum: Object.fromEntries(dict.map(({ alias, value }) => [alias, value])),
    options: dict.map(({ label, value }) => ({ label, value })),
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

const dict = {
  menuType,
  gender,
};

export default dict;
