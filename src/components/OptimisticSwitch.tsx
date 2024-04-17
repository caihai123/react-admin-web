import { useBoolean } from "ahooks";
import { Switch } from "antd";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";

// 切换失败时自动撤销的 Optimistic Updates 开关
// 注意：暂时还没完全想清楚此组件要不要作为公共基础组件存在

type Props = {
  defaultChecked: boolean;
  onChange: (val: boolean) => Promise<any> | null | undefined;
};

export default function OptimisticSwitch({
  defaultChecked = false,
  onChange = () => null,
}: Props) {
  const [checked, { set }] = useBoolean(defaultChecked);
  const [loading, { setTrue, setFalse }] = useLoadingDelayAndKeep(false);

  return (
    <Switch
      checked={checked}
      loading={loading}
      onChange={(val) => {
        set(val);
        setTrue();
        onChange(val)
          ?.catch(() => {
            set(!val);
          })
          .finally(() => setFalse());
      }}
    ></Switch>
  );
}
