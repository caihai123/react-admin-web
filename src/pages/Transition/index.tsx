import React from "react";
import { Button, Card } from "antd";
import { useBoolean } from "ahooks";
import { CSSTransition } from "react-transition-group";
import CollapseTransition from "@/components/CollapseTransition";
import "@/styles/transition.css";
import "animate.css";
import ListTranstion from "./components/ListTranstion";
import FlipTransition from "./components/FlipTransition";
import useBoxStyle from "./components/useBoxStyle";

export default function AnimateDemo() {
  const [show1, { toggle: toggle1 }] = useBoolean(true);
  const [show2, { toggle: toggle2 }] = useBoolean(true);
  const [show3, { toggle: toggle3 }] = useBoolean(true);
  const [show4, { toggle: toggle4 }] = useBoolean(true);

  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);
  const nodeRef3 = React.useRef(null);
  const nodeRef4 = React.useRef(null);
  const nodeRef5 = React.useRef(null);
  const nodeRef6 = React.useRef(null);
  const nodeRef7 = React.useRef(null);
  const nodeRef8 = React.useRef(null);
  const nodeRef9 = React.useRef(null);
  const nodeRef10 = React.useRef(null);
  const nodeRef11 = React.useRef(null);
  const nodeRef12 = React.useRef(null);
  const nodeRef13 = React.useRef(null);
  const nodeRef14 = React.useRef(null);
  const nodeRef15 = React.useRef(null);

  const transitionBoxStyle = useBoxStyle();

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

            <CSSTransition
              in={show1}
              nodeRef={nodeRef12}
              timeout={300}
              unmountOnExit
              classNames="fade-in-left"
              appear
            >
              <div ref={nodeRef12} style={transitionBoxStyle}>
                fade-in-left
              </div>
            </CSSTransition>

            <CSSTransition
              in={show1}
              nodeRef={nodeRef13}
              timeout={300}
              unmountOnExit
              classNames="fade-in-right"
              appear
            >
              <div ref={nodeRef13} style={transitionBoxStyle}>
                fade-in-right
              </div>
            </CSSTransition>

            <CSSTransition
              in={show1}
              nodeRef={nodeRef14}
              timeout={300}
              unmountOnExit
              classNames="fade-in-top"
              appear
            >
              <div ref={nodeRef14} style={transitionBoxStyle}>
                fade-in-top
              </div>
            </CSSTransition>

            <CSSTransition
              in={show1}
              nodeRef={nodeRef15}
              timeout={300}
              unmountOnExit
              classNames="fade-in-bottom"
              appear
            >
              <div ref={nodeRef15} style={transitionBoxStyle}>
                fade-in-bottom
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
              <div>
                <div style={transitionBoxStyle}>collapse-transition</div>
              </div>
            </CollapseTransition>
            <CollapseTransition show={show3} appear type="horizontal">
              <div>
                <div style={transitionBoxStyle}>
                  collapse-transition-horizontal
                </div>
              </div>
            </CollapseTransition>
          </div>
        </Card>
      </div>

      <FlipTransition style={{ marginTop: 20 }} />

      <div style={{ marginTop: 20 }}>
        <h2>Animate 动画</h2>
        <p>
          animate.css 确实太花哨了一点，不过它和 CollapseTransition
          配合起来真的太香了，而且还包含了上面的 fade 和 zoom，甚至更花，
          以下是几个案例
        </p>
        <Card>
          <Button onClick={() => toggle4()}>点我</Button>
          <div style={{ display: "flex", marginTop: 20, height: 100 }}>
            <CSSTransition
              in={show4}
              nodeRef={nodeRef8}
              timeout={1000}
              unmountOnExit
              appear
              classNames={{
                appear: "animate__backInDown",
                enter: "animate__backInDown",
                exit: "animate__backOutDown",
              }}
            >
              <div
                ref={nodeRef8}
                className="animate__animated"
                style={transitionBoxStyle}
              >
                backInDown and backOutDown
              </div>
            </CSSTransition>

            <CSSTransition
              in={show4}
              nodeRef={nodeRef9}
              timeout={1000}
              unmountOnExit
              appear
              classNames={{
                appear: "animate__backInLeft",
                enter: "animate__backInLeft",
                exit: "animate__backOutLeft",
              }}
            >
              <div
                ref={nodeRef9}
                className="animate__animated"
                style={transitionBoxStyle}
              >
                backInLeft and backOutLeft
              </div>
            </CSSTransition>

            <CSSTransition
              in={show4}
              nodeRef={nodeRef10}
              timeout={1000}
              unmountOnExit
              appear
              classNames={{
                appear: "animate__backInRight",
                enter: "animate__backInRight",
                exit: "animate__backOutRight",
              }}
            >
              <div
                ref={nodeRef10}
                className="animate__animated"
                style={transitionBoxStyle}
              >
                backInRight and backOutRight
              </div>
            </CSSTransition>

            <CSSTransition
              in={show4}
              nodeRef={nodeRef11}
              timeout={1000}
              unmountOnExit
              appear
              classNames={{
                appear: "animate__backInUp",
                enter: "animate__backInUp",
                exit: "animate__backOutUp",
              }}
            >
              <div
                ref={nodeRef11}
                className="animate__animated"
                style={transitionBoxStyle}
              >
                backInUp or backOutUp
              </div>
            </CSSTransition>
          </div>
        </Card>
      </div>

      <ListTranstion style={{ marginTop: 20 }} />
    </>
  );
}
