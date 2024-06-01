import React from "react";
import { CSSTransition } from "react-transition-group";
import { addClass, removeClass } from "@/utils/utils";
import "@/styles/transition";

type Props = {
  show: boolean;
  children: React.ReactElement;
  appear?: boolean;
  type?: "vertical" | "horizontal";
};

export default function CollapseTransition(props: Props) {
  const nodeRef = React.useRef<HTMLElement>(null);

  const classNames =
    props.type === "horizontal"
      ? "horizontal-collapse-transition"
      : "collapse-transition";

  if (!props.children) return props.children;

  return (
    <CSSTransition
      in={props.show}
      nodeRef={nodeRef}
      timeout={300}
      unmountOnExit
      appear={props.appear}
      onEnter={() => {
        const el = nodeRef.current;
        if (el) {
          addClass(el, classNames);
          if (props.type === "horizontal") {
            el.dataset.oldPaddingLeft = el.style.paddingLeft;
            el.dataset.oldPaddingRight = el.style.paddingRight;
            el.style.width = "0";
            el.style.paddingLeft = "0";
            el.style.paddingRight = "0";
          } else {
            el.dataset.oldPaddingTop = el.style.paddingTop;
            el.dataset.oldPaddingBottom = el.style.paddingBottom;
            el.style.height = "0";
            el.style.paddingTop = "0";
            el.style.paddingBottom = "0";
          }
        }
      }}
      onEntering={() => {
        const el = nodeRef.current;
        if (el) {
          el.dataset.oldOverflow = el.style.overflow;
          if (props.type === "horizontal") {
            if (el.scrollWidth !== 0) {
              el.style.width = `${el.scrollWidth}px`;
            } else {
              el.style.width = "";
            }
            el.style.paddingLeft = el.dataset.oldPaddingLeft || "";
            el.style.paddingRight = el.dataset.paddingRight || "";
          } else {
            if (el.scrollHeight !== 0) {
              el.style.height = `${el.scrollHeight}px`;
            } else {
              el.style.height = "";
            }
            el.style.paddingTop = el.dataset.oldPaddingTop || "";
            el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
          }

          el.style.overflow = "hidden";
        }
      }}
      onEntered={() => {
        const el = nodeRef.current;
        if (el) {
          // for safari: remove class then reset height is necessary
          removeClass(el, classNames);
          if (props.type === "horizontal") {
            el.style.width = "";
          } else {
            el.style.height = "";
          }
          el.style.overflow = el.dataset.oldOverflow || "";
        }
      }}
      onExit={() => {
        const el = nodeRef.current;
        if (el) {
          if (props.type === "horizontal") {
            el.dataset.oldPaddingLeft = el.style.paddingLeft;
            el.dataset.oldPaddingRight = el.style.paddingRight;
            el.style.width = `${el.scrollWidth}px`;
          } else {
            el.dataset.oldPaddingTop = el.style.paddingTop;
            el.dataset.oldPaddingBottom = el.style.paddingBottom;
            el.style.height = `${el.scrollHeight}px`;
          }
          el.dataset.oldOverflow = el.style.overflow;
          el.style.overflow = "hidden";
        }
      }}
      onExiting={() => {
        const el = nodeRef.current;
        if (el) {
          if (props.type === "horizontal") {
            if (el.scrollWidth !== 0) {
              // for safari: add class after set height, or it will jump to zero height suddenly, weired
              addClass(el, classNames);
              el.style.width = "0";
              el.style.paddingLeft = "0";
              el.style.paddingRight = "0";
            }
          } else {
            if (el.scrollHeight !== 0) {
              // for safari: add class after set height, or it will jump to zero height suddenly, weired
              addClass(el, classNames);
              el.style.height = "0";
              el.style.paddingTop = "0";
              el.style.paddingBottom = "0";
            }
          }
        }
      }}
      onExited={() => {
        const el = nodeRef.current;
        if (el) {
          removeClass(el, classNames);
          el.style.overflow = el.dataset.oldOverflow || "";
          if (props.type === "horizontal") {
            el.style.width = "";
            el.style.paddingLeft = el.dataset.oldPaddingLeft || "";
            el.style.paddingRight = el.dataset.oldPaddingRight || "";
          } else {
            el.style.height = "";
            el.style.paddingTop = el.dataset.oldPaddingTop || "";
            el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
          }
        }
      }}
    >
      {React.cloneElement(props.children, { ref: nodeRef })}
    </CSSTransition>
  );
}
