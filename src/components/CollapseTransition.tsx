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

const transition = {
  vertical: {
    onEnter(el: HTMLElement) {
      addClass(el, "collapse-transition");
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.style.height = "0";
      el.style.paddingTop = "0";
      el.style.paddingBottom = "0";
    },
    onEntering(el: HTMLElement) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`;
      } else {
        el.style.height = "";
      }
      el.style.paddingTop = el.dataset.oldPaddingTop || "";
      el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
      el.style.overflow = "hidden";
    },
    onEntered(el: HTMLElement) {
      removeClass(el, "collapse-transition");
      el.style.height = "";
      el.style.paddingTop = el.dataset.oldPaddingTop || "";
      el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
      el.style.overflow = el.dataset.oldOverflow || "";
    },
    onExit(el: HTMLElement) {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.style.height = `${el.scrollHeight}px`;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.overflow = "hidden";
    },
    onExiting(el: HTMLElement) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass(el, "collapse-transition");
        el.style.height = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
      }
    },
    onExited(el: HTMLElement) {
      removeClass(el, "collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow || "";
      el.style.paddingTop = el.dataset.oldPaddingTop || "";
      el.style.paddingBottom = el.dataset.oldPaddingBottom || "";
    },
  },

  horizontal: {
    onEnter(el: HTMLElement) {
      addClass(el, "horizontal-collapse-transition");
      el.dataset.oldPaddingLeft = el.style.paddingLeft;
      el.dataset.oldPaddingRight = el.style.paddingRight;
      el.style.width = "0";
      el.style.paddingLeft = "0";
      el.style.paddingRight = "0";
    },
    onEntering(el: HTMLElement) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollWidth !== 0) {
        el.style.width = `${el.scrollWidth}px`;
      } else {
        el.style.width = "";
      }
      el.style.paddingLeft = el.dataset.oldPaddingLeft || "";
      el.style.paddingRight = el.dataset.paddingRight || "";
      el.style.overflow = "hidden";
    },
    onEntered(el: HTMLElement) {
      removeClass(el, "horizontal-collapse-transition");
      el.style.width = "";
      el.style.overflow = el.dataset.oldOverflow || "";
      el.style.paddingLeft = el.dataset.oldPaddingLeft || "";
      el.style.paddingRight = el.dataset.oldPaddingRight || "";
    },
    onExit(el: HTMLElement) {
      el.dataset.oldPaddingLeft = el.style.paddingLeft;
      el.dataset.oldPaddingRight = el.style.paddingRight;
      el.style.width = `${el.scrollWidth}px`;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.overflow = "hidden";
    },
    onExiting(el: HTMLElement) {
      if (el.scrollWidth !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass(el, "horizontal-collapse-transition");
        el.style.width = "0";
        el.style.paddingLeft = "0";
        el.style.paddingRight = "0";
      }
    },
    onExited(el: HTMLElement) {
      removeClass(el, "horizontal-collapse-transition");
      el.style.overflow = el.dataset.oldOverflow || "";
      el.style.width = "";
      el.style.paddingLeft = el.dataset.oldPaddingLeft || "";
      el.style.paddingRight = el.dataset.oldPaddingRight || "";
    },
  },
};

export default function CollapseTransition(props: Props) {
  const nodeRef = React.useRef<HTMLElement>(null);

  const { type = "vertical" } = props;

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
        el && transition[type].onEnter(el);
      }}
      onEntering={() => {
        const el = nodeRef.current;
        el && transition[type].onEntering(el);
      }}
      onEntered={() => {
        const el = nodeRef.current;
        el && transition[type].onEntered(el);
      }}
      onExit={() => {
        const el = nodeRef.current;
        el && transition[type].onExit(el);
      }}
      onExiting={() => {
        const el = nodeRef.current;
        el && transition[type].onExiting(el);
      }}
      onExited={() => {
        const el = nodeRef.current;
        el && transition[type].onExited(el);
      }}
    >
      {React.cloneElement(props.children, { ref: nodeRef })}
    </CSSTransition>
  );
}
