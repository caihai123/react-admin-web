import { version as reactV } from "react";
import { version as antdV } from "antd";
const { REACT_APP_Commit_Hash, REACT_APP_Build_Date } = process.env;

const consoleFn = function (label, val) {
  const style1 =
    "padding:1px; border-radius:3px 0 0 3px; color:#fff; background:#35495e;";
  const style2 =
    "padding:1px; border-radius:0 3px 3px 0; color:#fff; background:#41b883;";

  window.setTimeout(
    // eslint-disable-next-line no-console
    console.log.bind(console, `%c ${label} %c ${val} `, style1, style2)
  );
};

consoleFn("React", `v${reactV}`);
consoleFn("Antd", `v${antdV}`);
consoleFn("CommitHash", REACT_APP_Commit_Hash);
consoleFn("BuildDate", REACT_APP_Build_Date);
