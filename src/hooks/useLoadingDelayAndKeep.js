import { useState, useRef } from "react";
import { useBoolean } from "ahooks";

// 使用场景：有些时候，当请求返回足够快的情况下，loading 可能会在短时间内完成 false -> true -> false 状态的切换，
// 这时候，加载动画可能会出现闪烁的情况（特别是占满一整屏的动画），这给会用户带来糟糕的体验。

const getTime = () => new Date().getTime(); // 获取当前时间戳

// 延迟 loading变成 true,如果在 delay时间内调用 setFalse，则 loading不会变成 true，有效防止闪烁。
// 处理逻辑：如果请求返回过快，则直接不显示loading
export const useLoadingDelay = function (val, delay = 500) {
  const [loading, { set }] = useBoolean(val);
  const timerRef = useRef(null);

  const setTrue = () => {
    if (timerRef.current) return; // 感觉没必要重复设置
    timerRef.current = setTimeout(() => set(true), delay || 0);
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

// 让 loading 持续指定的时间以上
// 处理逻辑：如果请求时间少于指定的时间，则最终时间为指定的时间，如果请求时间大于指定的时间，则最终时间为请求的时间
export const useLoadingKeep = function (val, delay = 500) {
  const [loading, { set }] = useBoolean(val);
  const timerRef = useRef(null);
  const [timer, setTimer] = useState();

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
    timerRef.current = setTimeout(
      () => set(false),
      runTime > delay ? 0 : delay - runTime
    );
    setTimer(undefined); // 清除timer，避免重复setFalse
  };

  return [loading, { setTrue, setFalse }];
};

// 不管是单独使用useLoadingDelay还是单独使用useLoadingKeep，效果都不是最好
// 所以他们两个可以中和一下，最终的表现是：
//  如果在指定的时间内完成了请求，那就不展示 loading 动画，超过指定时间后才进行展示
//  如果展示了 loading 动画，那至少要展示足够长的时间，不能一闪而过
export default function useLoadingDelayAndKeep(val = false, options) {
  const [loading, { set }] = useBoolean(val);
  const timerRef = useRef(null);
  const [timer, setTimer] = useState();

  const _options = { delay: 300, keep: 500, ...options };

  const setTrue = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
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
    timerRef.current = setTimeout(
      () => set(false),
      runTime > keep ? 0 : keep - runTime
    );
    setTimer(undefined); // 清除timer，避免重复setFalse
  };

  return [loading, { setTrue, setFalse }];
}
