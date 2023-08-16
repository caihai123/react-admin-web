import Mock from "mockjs";

import login from "./login";
import role from "./premis/role";
import account from "./premis/account";
import dept from "./premis/dept";

Mock.setup({
  timeout: "50-1000",
});

const mock = [...login, ...role, ...account, ...dept];

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
