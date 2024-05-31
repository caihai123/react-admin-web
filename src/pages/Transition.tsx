import React from "react";
import { Button, Card, theme } from "antd";
import { useBoolean } from "ahooks";
import { CSSTransition } from "react-transition-group";
import CollapseTransition from "@/components/CollapseTransition";
import "@/styles/transition.css";

export default function AnimateDemo() {
  const {
    token: { colorPrimary, colorWhite },
  } = theme.useToken();

  const [show1, { toggle: toggle1 }] = useBoolean(true);
  const [show2, { toggle: toggle2 }] = useBoolean(true);
  const [show3, { toggle: toggle3 }] = useBoolean(true);

  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);
  const nodeRef3 = React.useRef(null);
  const nodeRef4 = React.useRef(null);
  const nodeRef5 = React.useRef(null);
  const nodeRef6 = React.useRef(null);
  const nodeRef7 = React.useRef(null);

  const transitionBoxStyle: React.CSSProperties = {
    width: 200,
    height: 100,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
    padding: 20,
    textAlign: "center",
    borderRadius: 4,
    boxSizing: "border-box",
    color: colorWhite,
    fontSize: 16,
    background: colorPrimary,
  };
  return (
    <>
      <div>
        <h2>fade 淡入淡出</h2>
        <Card>
          <Button onClick={() => toggle1()}>点我</Button>
          <div style={{ display: "flex", marginTop: 20, height: 100 }}>
            <CSSTransition
              in={show1}
              nodeRef={nodeRef1}
              timeout={300}
              unmountOnExit
              classNames="fade-in-linear"
              appear
            >
              <div ref={nodeRef1} style={transitionBoxStyle}>
                fade-in-linear
              </div>
            </CSSTransition>
            <CSSTransition
              in={show1}
              nodeRef={nodeRef2}
              timeout={300}
              unmountOnExit
              classNames="fade-in"
              appear
            >
              <div ref={nodeRef2} style={transitionBoxStyle}>
                fade-in
              </div>
            </CSSTransition>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>zoom 缩放</h2>
        <Card>
          <Button onClick={() => toggle2()}>点我</Button>
          <div style={{ display: "flex", marginTop: 20, height: 100 }}>
            <CSSTransition
              in={show2}
              nodeRef={nodeRef3}
              timeout={300}
              unmountOnExit
              classNames="zoom-in-center"
              appear
            >
              <div ref={nodeRef3} style={transitionBoxStyle}>
                zoom-in-center
              </div>
            </CSSTransition>
            <CSSTransition
              in={show2}
              nodeRef={nodeRef4}
              timeout={300}
              unmountOnExit
              classNames="zoom-in-top"
              appear
            >
              <div ref={nodeRef4} style={transitionBoxStyle}>
                zoom-in-top
              </div>
            </CSSTransition>
            <CSSTransition
              in={show2}
              nodeRef={nodeRef5}
              timeout={300}
              unmountOnExit
              classNames="zoom-in-bottom"
              appear
            >
              <div ref={nodeRef5} style={transitionBoxStyle}>
                zoom-in-bottom
              </div>
            </CSSTransition>
            <CSSTransition
              in={show2}
              nodeRef={nodeRef6}
              timeout={300}
              unmountOnExit
              classNames="zoom-in-left"
              appear
            >
              <div ref={nodeRef6} style={transitionBoxStyle}>
                zoom-in-left
              </div>
            </CSSTransition>
            <CSSTransition
              in={show2}
              nodeRef={nodeRef7}
              timeout={300}
              unmountOnExit
              classNames="zoom-in-right"
              appear
            >
              <div ref={nodeRef7} style={transitionBoxStyle}>
                zoom-in-left
              </div>
            </CSSTransition>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>collapse 展开折叠</h2>
        <Card>
          <Button onClick={() => toggle3()}>点我</Button>
          <div style={{ display: "flex", marginTop: 20, height: 100 }}>
            <CollapseTransition show={show3} appear>
              <div style={transitionBoxStyle}>collapse-transition</div>
            </CollapseTransition>
            <CollapseTransition show={show3} appear type="horizontal">
              <div style={transitionBoxStyle}>
                collapse-transition-horizontal
              </div>
            </CollapseTransition>
          </div>
        </Card>
      </div>
    </>
  );
}
