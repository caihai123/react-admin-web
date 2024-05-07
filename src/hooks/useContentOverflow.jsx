import { useBoolean } from "ahooks";
import useDomSize from "./useDomSize";

// 获取dom padding
const getPadding = (el) => {
  const style = window.getComputedStyle(el, null);
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
  return {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom,
  };
};

/**
 * 判断容器内容是否溢出
 * @param {*} target DOM 节点或者 ref
 * @returns [isOverflowX, isOverflowY]
 */
export default function useContentOverflow(target) {
  const [isOverflowX, { set: setIsOverflowX }] = useBoolean(false);
  const [isOverflowY, { set: setIsOverflowY }] = useBoolean(false);

  useDomSize(target, () => {
    const element = "current" in target ? target.current : target;

    if (element) {
      const range = document.createRange();
      range.setStart(element, 0);
      range.setEnd(element, element.childNodes.length);

      const padding = getPadding(element);

      const rangeSize = range.getBoundingClientRect();

      setIsOverflowX(
        rangeSize.width + padding.left + padding.right > element.offsetWidth ||
          element.scrollWidth > element.offsetWidth
      );
      setIsOverflowY(
        rangeSize.height + padding.top + padding.bottom >
          element.offsetHeight || element.scrollHeight > element.offsetHeight
      );
    }
  });

  return [isOverflowX, isOverflowY];
}
