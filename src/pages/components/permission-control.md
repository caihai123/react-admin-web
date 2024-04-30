# 按钮权限控制
按钮权限和菜单类似，我们需要在菜单目录下添加按钮标识，获取菜单时按钮和菜单一起返回，在编码时只需要判断是否显示就行，详情参考代码：`@/compenents/PermissionControl.jsx`，以下是代码的具体使用方式。

## useButtonAuthorization
最简单的方式就是通过 `useButtonAuthorization` 获得一个函数，然后使用该函数判断当前用户在当前也是否拥有某个按钮的访问权限。
```jsx
import { Button } from "antd";
import { useButtonAuthorization } from "@/components/PermissionControl";

export default function Page() {
  const hasButtonPermission = useButtonAuthorization();

  return hasButtonPermission("add") ? <Button>新增</Button> : undefined;
}
```

## PermissionControl
或者使用 `PermissionControl` 组件进行包裹
```jsx
import { Button } from "antd";
import PermissionControl from "@/components/PermissionControl";

export default function PermissionButton() {
  return (
    <PermissionControl permission="add">
      <Button>新增</Button>
    </PermissionControl>
  );
}
```

## useAnyButtonPermission
在按钮组中我们可能需要知道用户是否至少拥有其中一个的按钮的权限，以控制父级是否显示，这时就需要使用 `useAnyButtonPermission`。
```jsx
import { Button, Space } from "antd";
import PermissionControl, {
  useAnyButtonPermission,
} from "@/components/PermissionControl";

export default function PermissionButton() {
  const isShowButtonGroup = useAnyButtonPermission("add", "edit", "del");

  return isShowButtonGroup ? (
    <Space>
      <PermissionControl permission="add">
        <Button>新增</Button>
      </PermissionControl>
      <PermissionControl permission="edit">
        <Button>编辑</Button>
      </PermissionControl>
      <PermissionControl permission="del">
        <Button>删除</Button>
      </PermissionControl>
    </Space>
  ) : undefined;
}
```

## useFilterElementPermission
在上面的代码中，我们每个按钮标识都需要写两次，一次是在判断按钮组是否显示，一次是在判断按钮是否显示，这在后期增加或者删减按钮时很容易出错，所以我们还可以使用 `useFilterElementPermission`
```jsx
import { Button, Space } from "antd";
import { useFilterElementPermission } from "@/components/PermissionControl";

export default function PermissionButton() {
  const [buttonGroupRender, showButtonGroup] = useFilterElementPermission(
    {
      render: () => <Button>新增</Button>,
      permission: "add",
    },
    {
      render: () => <Button>编辑</Button>,
      permission: "edit",
    },
    {
      render: () => <Button>删除</Button>,
      permission: "del",
    }
  );

  return showButtonGroup ? <Space>{buttonGroupRender()}</Space> : undefined;
}

```
> 注意：当向 `buttonGroupRender` 渲染函数传递参数时，参数会直接传递给 `render`，这在类似表格列中使用时非常有用。