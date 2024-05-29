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
            "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3",
            "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3",
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
