const ghpages = require("gh-pages");

ghpages.publish(
  "./dist",
  {
    // eslint-disable-next-line no-console
    beforeAdd: () => console.log("正在将dist推送到gh-pages分支..."),
  },
  function (err) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } else {
      // eslint-disable-next-line no-console
      console.info("推送成功！");
    }
  }
);
