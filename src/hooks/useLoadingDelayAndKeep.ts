import { useState, useRef } from "react";
import { useBoolean } from "ahooks";

// 使用场景：有些时候，当请求返回足够快的情况下，loading 可能会在短时间内完成 false -> true -> false 状态的切换，
// 这时候，加载动画可能会出现闪烁的情况（特别是占满一整屏的动画），这给会用户带来糟糕的体验。

const getTime = () => new Date().getTime(); // 获取当前时间戳

type resultType = [
  loading: boolean,
  actions: { setTrue(): void; setFalse(): void }
];

/**
 * 延迟 `loading` 变成 `true`，如果在 `delay` 时间内调用 `setFalse`，则 `loading` 不会变成 `true`，有效防止闪烁。
 *
 * 处理逻辑：如果请求返回过快，则直接不显示 `loading`。
 */
export const useLoadingDelay = function (
  val: boolean,
  delay: number = 500
): resultType {
  const [loading, { set }] = useBoolean(val);
  const timerRef = useRef<number | null>(null);

  const setTrue = () => {
    if (timerRef.current) return; // 感觉没必要重复设置
    timerRef.current = window.setTimeout(() => set(true), delay || 0);
  };

  const setFalse = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    set(false);
  };

  return [loading, { setTrue, setFalse }];
};

/**
 * 让 `loading` 持续 `delay` 时间以上。
 *
 * 处理逻辑：如果请求时间少于 `delay`，则持续时间为 `delay`，如果请求时间大于 `delay`，则最终时间为实际请求的时间。
 */
export const useLoadingKeep = function (
  val: boolean,
  delay: number = 500
): resultType {
  const [loading, { set }] = useBoolean(val);
  const timerRef = useRef<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  const setTrue = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    set(true);
    setTimer(getTime());
  };

  const setFalse = () => {
    if (timerRef.current) return; // 感觉没必要重复设置

    const currentTime = getTime();
    const formerTime = timer || currentTime;
    const runTime = currentTime - formerTime; // loading已经运行的时间
    timerRef.current = window.setTimeout(
      () => set(false),
      runTime > delay ? 0 : delay - runTime
    );
    setTimer(null); // 清除timer，避免重复setFalse
  };

  return [loading, { setTrue, setFalse }];
};

/**
 *
 * 不管是单独使用 `useLoadingDelay` 还是单独使用 `useLoadingKeep`，效果都不是最好。
 *
 * 所以它们两个可以中和一下，最终的表现是：
 * 如果在 `delay` 时间内完成了请求，那就不展示 `loading` 动画，超过才进行展示；
 * 如果展示了 `loading` 动画，那至少要展示 `keep` 时间，不能一闪而过。
 */
export default function useLoadingDelayAndKeep(
  val: boolean = false,
  options?: { delay: number; keep: number }
): resultType {
  const [loading, { set }] = useBoolean(val);
  const timerRef = useRef<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  const _options = { delay: 300, keep: 500, ...options };

  const setTrue = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = window.setTimeout(() => {
      set(true);
      setTimer(getTime());
    }, _options.delay || 0);
  };

  const setFalse = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const { keep = 0 } = _options;
    const currentTime = getTime();
    const formerTime = timer || currentTime;
    const runTime = currentTime - formerTime; // loading已经运行的时间
    timerRef.current = window.setTimeout(
      () => set(false),
      runTime > keep ? 0 : keep - runTime
    );
    setTimer(null); // 清除timer，避免重复setFalse
  };

  return [loading, { setTrue, setFalse }];
}
