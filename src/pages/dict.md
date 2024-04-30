# 字典管理
这不是一个功能页面，而是本系统对字典的一种管理方式的描述及使用方式。关于这方面我思考了很久，最终还是采用在前端管理的方式。

## 在 `@/utils/dict.js` 中统一管理

```js
// @/tuils/dict.js
const createDict = function (dict) {
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

const dict = {
  menuType,
  gender,
  accountEnabledState,
  roleEnabledState
};

export default dict;

```
上面的代码并不复杂，首先我定义了一个叫 `createDict` 的工厂函数，然后在下面创建字典并导出，字典中的每一项都有`label`,`value`,`alias`,`color`四个属性，除了`color`其他三个都是必须的。

## DictSelect
使用字典的一种常用方式就是创建选择器，为此我创建了一个公共组件`DictSelect`，具体代码如下：
```jsx
// @/components/DictSelect
import { Select, Badge } from "antd";
import dict from "@/utils/dict";

const DictSelect = function (props) {
  const { dictName, placeholder = "请选择", ...rest } = props;

  const { options } = dict[dictName];

  return (
    <Select {...rest} options={options} placeholder={placeholder}>
      {options.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.color ? (
            <Badge color={item.color} text={item.label} />
          ) : (
            item.label
          )}
        </Select.Option>
      ))}
    </Select>
  );
};
export default DictSelect;

```

使用
```jsx
import DictSelect from "@/components/DictSelect";

<DictSelect dictName='gender'/>
```

## 通过 `value` 获取 `label`
在与后端的交互中，后端很可能会直接返回一个`value`，如：`const userinfo = {name: "张三", gender: "1"}`，我们需要将 `value` 转为 `lable` 进行展示，这时我们可以这样做：
```jsx
import { Tag } from "antd";
import { gender as genderDict } from "@/utils/dict";

export default function UserInfo() {
  const userinfo = { name: "张三", gender: "1" }; // 模拟的后端返回的数据
  const map = genderDict.map[userinfo.gender];
  const tag = {
    color: map?.color || "rgba(0,0,0,.25)",
    label: map?.label || "未知",
  };
  return (
    <div>
      <div>姓名：{userinfo.name}</div>
      <div>性别：<Tag color={tag.color}>{tag.label}</Tag></div>
    </div>
  );
}
```

## 使用 `alias` 消除魔法值
在我们的代码中，很大可能会存在一些对字典 `value` 的逻辑判断，如：我们需要判断某个用户是男还是女，然后进行不同的逻辑，这时我们可以这样：
```js
import { gender as genderDict } from "@/utils/dict";

const gender = "1"; // 模拟的后端返回的数据

if (gender === genderDict.enum.male) {
  // 如果是男
} else if (gender === genderDict.enum.woman) {
  // 如果是女
} else {
  // 未知
}
```

## 为什么不在后端统一维护
某些系统可能会在后端统一管理字典，在我看来那会出现以下几种问题：
1. 只能通过一些规范来控制管理员的修改，一但修改就可能出现严重的bug。
2. 需要很多代码来解决重复请求的问题。关于这个问题我写了一篇文章，有兴趣可以看一下：[前端数据字典的最优方案探索](https://juejin.cn/post/6949080259438313509)
3. 难以消除魔法值。

可能会有人说，你这样好麻烦，前端定义一份，后端也要定义一份，我的回答是：是的。必须在开发的时候就将字典定义好，一旦定义后绝对不允许单边修改。试想一种情况，假设我现在前端有如下代码：
```js
if (gender === 1) {
  // 如果是男
} else if (gender === 2) {
  // 如果是女
} else {
  // 未知
}
```
如果某一天某个后端同事说我觉得1男2女不太好，我要改成1女2男，这样代码就会走出错误的逻辑。所以我认为字典应该是属于前端与后端，后端与数据库之间的一个约定，是不能随意修改的，如果非要修改，那是一定要检测代码和更新数据库的，而上面的维护方式对于前端来说也非常便于修改。