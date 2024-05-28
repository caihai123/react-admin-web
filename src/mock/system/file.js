import Mock from "mockjs";
import { fileType } from "@/utils/dict";

const mockAccount = (filetype) => {
  const type =
    filetype === "all"
      ? Mock.mock({
          "type|1": fileType.options.map((item) => item.value),
        }).type
      : filetype;

  const url = (() => {
    switch (type) {
      case "img":
        return Mock.mock({
          "img|1": [
            "https://caihai123.com/Dribbble/lists/news_teaser.png",
            "https://caihai123.com/Dribbble/lists/preview_teaser.png",
            "https://caihai123.com/Dribbble/lists/car_teaser.gif",
            "https://caihai123.com/Dribbble/lists/artboard_38_teaser.png",
            "https://caihai123.com/Dribbble/lists/messi-video_teaser.png",
            "https://caihai123.com/Dribbble/lists/stock_app_ui_design_light_tubik_teaser.png",
          ],
        }).img;

      case "audio":
        return Mock.mock({
          "src|1": [
            "https://m10.music.126.net/20240528133333/29a4a9dcf8c77f71187ab639b1be7d29/yyaac/5459/045e/0e5e/c371249b1734b0c1110e94d5f268cce4.m4a",
            "https://m704.music.126.net/20240528133434/9b247bd4b6ed199003d082654a364e18/jdyyaac/040c/565b/5109/3feef0f4a9a1672cb358fc395e4218d0.m4a?authSecret=0000018fbd9a905f11860aaba0bbbc35",
            "https://m704.music.126.net/20240528133535/b785858ccd9019e9d6c9b43550dd79d0/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/28482025540/2ecd/059d/82f0/bb30988ff630497b351f36da15000e22.m4a?authSecret=0000018fbd9b801419cd0aaba56a125a",
            "https://m804.music.126.net/20240528133620/51949e5da040a9468cb57b0a740413b6/jdyyaac/0409/515c/555c/3c26b50ab9f6f7a5ffd6b67802db95a9.m4a?authSecret=0000018fbd9c2dbf1d350aaba0761578",
          ],
        }).src;

      case "video":
        return Mock.mock({
          "src|1": [
            "https://media.w3.org/2010/05/sintel/trailer.mp4",
            "http://www.w3school.com.cn/example/html5/mov_bbb.mp4",
            "https://www.w3schools.com/html/movie.mp4",
            "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8",
          ],
        }).src;

      default:
        return Mock.mock("@url");
    }
  })();
  return Mock.mock({
    id: "@guid",
    url,
    type,
    createDate: "@date",
    size: "100 kb",
  });
};

const mock = [
  {
    // 用户列表分页
    url: "/api/file/page",
    type: "post",
    handler({ body }) {
      const { pageIndex, pageSize = 10, type } = JSON.parse(body);

      return {
        result: {
          records: [...Array(pageSize)].map(() => mockAccount(type)),
          total: 100,
          pageIndex,
        },
        status: "success",
        msg: "成功！",
      };
    },
  },
];

export default mock;
