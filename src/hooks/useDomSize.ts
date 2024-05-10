import { useEffect, type RefObject } from "react";

export type Target = HTMLElement | RefObject<HTMLElement>;

export type Callback = (size: { width: number; height: number }) => void;

/**
 * DOM 节点尺寸变化时执行回调
 * @param target DOM 节点或者 ref
 * @param callback 执行的回调函数
 */
export default function useDomSize(target: Target, callback: Callback) {
  useEffect(() => {
    const element = "current" in target ? target.current : target;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { clientWidth, clientHeight } = entry.target;
        callback({ width: clientWidth, height: clientHeight });
      }
    });

    element && resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [target, callback]);
}
