import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Date from "./Date";
import DateRange from "./DateRange";
import TreeSelect from "./TreeSelect";

export default function FormItem({ item }) {
  if (item.renderFormItem) {
    return item.renderFormItem();
  } else {
    switch (item.type) {
      case "select":
        return <Select item={item} />;
      case "checkbox":
        return <Checkbox item={item} />;
      case "radio":
        return <Radio item={item} />;
      case "date":
        return <Date item={item} />;
      case "dateRange":
        return <DateRange item={item} />;
      case "treeSelect":
        return <TreeSelect item={item} />;
      default:
        return <Input item={item} />;
    }
  }
}
