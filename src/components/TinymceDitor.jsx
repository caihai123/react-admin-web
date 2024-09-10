import { forwardRef, useImperativeHandle, useRef } from "react";
import { theme } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/system";
import axios from "@/utils/axios";

const TinymceDitor = forwardRef((props, ref) => {
  const {
    placeholder = "请输入内容",
    height = 500,
    menubar = true,
    autoFocus = false, // 是否自动获取焦点
  } = props;

  const themeName = useSelector(selectTheme);

  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const initConfig = {
    height,
    menubar,
    promotion: false,
    statusbar: false,
    skin: themeName === "dark" ? "tinymce-5-dark" : "tinymce-5",
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "insertdatetime",
      "media",
      "table",
      "preview",
      "help",
      "wordcount",
      "emoticons",
      "visualblocks",
    ],
    toolbar:
      "undo redo restoredraft | styles | forecolor backcolor link anchor | outdent indent |" +
      "styleselect formatselect fontselect fontsizeselect | bullist numlist | removeformat | " +
      "table image media charmap emoticons hr pagebreak insertdatetime | bdmap indent2em lineheight formatpainter axupimgs",
    language: "zh_CN",
    language_url: `${process.env.PUBLIC_PATH}tinymce/zh_CN.js`,
    placeholder,
    content_style: `body { background: ${colorBgContainer}; color: ${colorText}}`,
    file_picker_types: "image,media",
    file_picker_callback: (callback, value, meta) => {
      if (["image", "media"].includes(meta.filetype)) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute(
          "accept",
          meta.filetype === "image" ? "image/*" : "video/*"
        );
        input.addEventListener("change", (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append("file", file);
          axios({
            url: "/api/common/upload",
            method: "post",
            data: formData,
          }).then((response) => {
            callback(response.data.url, { title: file.name });
          });
        });

        input.click();
      }
    },
    setup(editor) {
      // 当编辑器获取焦点时触发
      editor.on("focus", function (e) {
        props.onFocus?.();
      });
      // 当编辑器失去焦点时触发
      editor.on("blur", function (e) {
        props.onBlur?.();
      });
    },
    init_instance_callback(editor) {
      autoFocus && editor.focus();
    },
  };

  const editorRef = useRef();

  useImperativeHandle(ref, () => ({
    instance: editorRef.current,
  }));

  return (
    <Editor
      ref={editorRef}
      key={themeName}
      value={props.value}
      onEditorChange={(newValue) => props.onChange?.(newValue)}
      tinymceScriptSrc={`${process.env.PUBLIC_PATH}tinymce/tinymce.min.js`}
      licenseKey="gpl"
      init={initConfig}
    />
  );
});

export default TinymceDitor;
