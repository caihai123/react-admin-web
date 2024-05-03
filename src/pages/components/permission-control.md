# 按钮权限控制 ✨
按钮权限和菜单类似，只需要给按钮添加允许访问的角色即可，详情参考代码：`@/compenents/PermissionControl.jsx`，以下是代码的具体使用方式。

## useButtonAuthorization
最简单的方式就是通过 `useButtonAuthorization` 获得一个函数，该函数需要传入允许访问的角色列表，执行时会根据当前用户的角色进行判断。
```jsx
import { Button } from "antd";
import { useButtonAuthorization } from "@/components/PermissionControl";

export default function Page() {
  const hasButtonPermission = useButtonAuthorization();

  return hasButtonPermission(['admin']) ? <Button>新增</Button> : undefined;
}
```

## PermissionControl
或者使用 `PermissionControl` 组件进行包裹
```jsx
import { Button } from "antd";
import PermissionControl from "@/components/PermissionControl";

export default function PermissionButton() {
  return (
    <PermissionControl role={['admin']}>
      <Button>新增</Button>
    </PermissionControl>
  );
}
```

在按钮组中我们可能需要知道用户是否至少拥有其中一个的按钮的权限，以控制父级是否显示。
```jsx
import { Button, Space } from "antd";
import PermissionControl from "@/components/PermissionControl";

export default function PermissionButton() {
  return (
    <PermissionControl role={['admin','user']}>
      <Space>
        <PermissionControl role={['admin']}>
          <Button>新增</Button>
        </PermissionControl>
        <PermissionControl role={['user']}>
          <Button>编辑</Button>
        </PermissionControl>
        <PermissionControl role={['admin']}>
          <Button>删除</Button>
        </PermissionControl>
      </Space>
    </PermissionControl>
  );
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
      role: ['admin'],
    },
    {
      render: () => <Button>编辑</Button>,
      role: ['user'],
    },
    {
      render: () => <Button>删除</Button>,
      role: ['admin'],
    }
  );

  return showButtonGroup ? <Space>{buttonGroupRender()}</Space> : undefined;
}

```
> 注意：当向 `buttonGroupRender` 渲染函数传递参数时，参数会直接传递给 `render`，这在类似表格列中使用时非常有用。