import Input from "./Input";
import Select from "./Select";
import Date from "./Date";
import DateRange from "./DateRange";

export default function FormItem({ item }) {
  if (item.renderFormItem) {
    return item.renderFormItem();
  } else {
    switch (item.type) {
      case "select":
        return <Select item={item} />;
      case "date":
        return <Date item={item} />;
      case "dateRange":
        return <DateRange item={item} />;
      default:
        return <Input item={item} />;
    }
  }
}
