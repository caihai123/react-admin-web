import { version as reactV } from "react";
import { version as antdV } from "antd";
const { REACT_APP_Commit_Hash, REACT_APP_Build_Date } = process.env;

const consoleFn = function (label, val) {
  const style1 =
    "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff";
  const style2 =
    "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff";
  const style3 = "background:transparent";
  window.setTimeout(
    // eslint-disable-next-line no-console
    console.log.bind(
      console,
      `%c ${label} %c ${val} %c`,
      style1,
      style2,
      style3
    )
  );
};

consoleFn("React", `v${reactV}`);
consoleFn("Antd", `v${antdV}`);
consoleFn("CommitHash", REACT_APP_Commit_Hash);
consoleFn("BuildDate", REACT_APP_Build_Date);
