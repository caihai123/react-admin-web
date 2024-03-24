import "@/assets/github-markdown";
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";

const MarkdownPreview = ({ markdown }) => {
  const themeName = useSelector(selectTheme);

  return (
    <div
      className="markdown-body"
      data-theme={themeName}
      style={{ padding: 24 }}
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></div>
  );
};

export default MarkdownPreview;
