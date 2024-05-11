import { Pie } from "@ant-design/plots";

const pieConfig = {
  height: 250,
  appendPadding: 10,
  data: [
    {
      type: "图片",
      value: 4544,
    },
    {
      type: "文档",
      value: 3321,
    },
    {
      type: "视频",
      value: 3113,
    },
    {
      type: "音频",
      value: 3113,
    },
    {
      type: "其他",
      value: 2341,
    },
  ],
  angleField: "value",
  colorField: "type",
  innerRadius: 0.6,
  label: false,
  legend: false,
  statistic: false,
};
export default function PieView() {
  return <Pie {...pieConfig} />;
}
