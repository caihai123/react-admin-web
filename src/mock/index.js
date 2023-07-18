import Mock from "mockjs";

import login from "./login";
import role from "./premis/role";
import account from "./premis/account";

Mock.setup({
  timeout: "500-1000",
});

const mock = [...login, ...role, ...account];

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
