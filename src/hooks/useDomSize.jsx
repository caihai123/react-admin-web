import { useEffect } from "react";

/**
 * DOM 节点尺寸变化时执行回调
 * @param {*} target DOM 节点或者 ref
 * @param {*} callback 变化时执行的回调
 */
export default function useDomSize(target, callback) {
  useEffect(() => {
    const element = "current" in target ? target.current : target;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        callback({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [target, callback]);
}
