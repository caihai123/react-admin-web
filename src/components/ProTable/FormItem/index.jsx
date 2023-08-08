import Input from "./Input";
import Select from "./Select";
import Date from "./Date";
import DateTime from "./DateTime";

export default function FormItem({ item }) {
  if (item.renderFormItem) {
    return item.renderFormItem();
  } else {
    switch (item.valueType) {
      case "select":
        return <Select item={item} />;
      case "date":
        return <Date item={item} />;
      case "dateTime":
        return <DateTime item={item} />;
      default:
        return <Input item={item} />;
    }
  }
}
