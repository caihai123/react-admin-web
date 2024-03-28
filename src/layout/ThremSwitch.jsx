import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, setTheme } from "@/store/system";

export default function ThremSwitch() {
  const dispatch = useDispatch();
  const themeName = useSelector(selectTheme);

  return (
    <Switch
      checked={themeName === "dark"}
      checkedChildren="🌜"
      unCheckedChildren="🌞"
      onClick={() => dispatch(setTheme())}
    />
  );
}
