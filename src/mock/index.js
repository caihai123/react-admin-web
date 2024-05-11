import Mock from "mockjs";

import login from "./login";
import role from "./system/role";
import account from "./system/account";
import dept from "./system/dept";
import issues from "./issues";
import file from "./system/file";

Mock.setup({
  timeout: "50-1000",
});

const mock = [...login, ...role, ...account, ...dept, ...issues, ...file];

mock.forEach(({ url, type, handler }) => {
  Mock.mock(url, type, function (...params) {
    const result = handler(...params);
    setTimeout(
      // eslint-disable-next-line no-console
      console.log.bind(
        console,
        {
          url,
          type,
          result,
        },
        "mockjs"
      )
    );
    return result;
  });
});
