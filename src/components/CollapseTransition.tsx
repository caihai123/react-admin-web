import React from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

type Props = {
  show: boolean;
  children: React.ReactElement;
  appear?: boolean;
  type?: "vertical" | "horizontal";
};

const CollapseContainer = styled.div`
  transition: 0.3s height ease-in-out, 0.3s width ease-in-out;
  overflow: hidden;
`;

export default function CollapseTransition(props: Props) {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const [oldSize, setOldSize] = React.useState({ width: "", height: "" });

  React.useLayoutEffect(() => {
    const dom = nodeRef.current;
    if (dom) {
      setOldSize({
        width: `${dom.scrollWidth}px`,
        height: `${dom.scrollHeight}px`,
      });
    }
  }, [nodeRef]);

  if (!props.children) return props.children;

  const showIn = () => {
    const dom = nodeRef.current;
    if (dom) {
      if (props.type === "horizontal") {
        dom.style.width = oldSize.width;
      } else {
        dom.style.height = oldSize.height;
      }
    }
  };

  const showOut = () => {
    const dom = nodeRef.current;
    if (dom) {
      if (props.type === "horizontal") {
        dom.style.width = "0";
      } else {
        dom.style.height = "0";
      }
    }
  };

  return (
    <CSSTransition
      in={props.show}
      nodeRef={nodeRef}
      timeout={300}
      unmountOnExit
      appear={props.appear}
      onEnter={showOut}
      onEntering={showIn}
      onExit={showIn}
      onExiting={showOut}
    >
      <CollapseContainer ref={nodeRef}>{props.children}</CollapseContainer>
    </CSSTransition>
  );
}
