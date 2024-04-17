import { ReactNode } from "react";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Date from "./Date";
import DateRange from "./DateRange";
import TreeSelect from "./TreeSelect";

import type { GetProp } from "antd";

type BaseItem = {
  type?:
    | "input"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "dateRange"
    | "treeSelect";
  renderFormItem?: ReactNode;
};

type SelectItem = BaseItem & GetProp<typeof Select, "item">;
type CheckboxItem = BaseItem & GetProp<typeof Checkbox, "item">;
type RadioItem = BaseItem & GetProp<typeof Radio, "item">;
type DateItem = BaseItem & GetProp<typeof Date, "item">;
type DateRangeItem = BaseItem & GetProp<typeof DateRange, "item">;
type TreeSelectItem = BaseItem & GetProp<typeof TreeSelect, "item">;
type InputItem = BaseItem & GetProp<typeof Input, "item">;

type Item =
  | (BaseItem & SelectItem)
  | (BaseItem & CheckboxItem)
  | (BaseItem & RadioItem)
  | (BaseItem & DateItem)
  | (BaseItem & DateRangeItem)
  | (BaseItem & TreeSelectItem)
  | (BaseItem & InputItem);

export default function FormItem({ item }: { item: Item }) {
  const { type = "input", renderFormItem, ...rest } = item;
  if (renderFormItem) {
    return renderFormItem;
  } else {
    switch (type) {
      case "select":
        return <Select item={rest as SelectItem} />;
      case "checkbox":
        return <Checkbox item={rest as CheckboxItem} />;
      case "radio":
        return <Radio item={rest as RadioItem} />;
      case "date":
        return <Date item={rest as DateItem} />;
      case "dateRange":
        return <DateRange item={rest as DateRangeItem} />;
      case "treeSelect":
        return <TreeSelect item={rest as TreeSelectItem} />;
      case "input":
        return <Input item={rest as InputItem} />;
      default:
        return <Input item={rest as InputItem} />;
    }
  }
}
