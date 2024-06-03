import { useState, type CSSProperties } from "react";
import { Card, Button, theme } from "antd";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useBoxStyle from "./useBoxStyle";
import "@/styles/transition.css";

export default function FlipDemo(props: { style: CSSProperties }) {
  const [flipped, setFlipped] = useState(false);

  const {
    token: { colorPrimary, colorError },
  } = theme.useToken();

  const transitionBoxStyle = useBoxStyle();

  return (
    <div style={props.style}>
      <h2>flip 翻转</h2>
      <Card>
        <Button onClick={() => setFlipped(!flipped)}>点我</Button>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            height: 100,
          }}
        >
          <div
            style={{
              position: "relative",
              transformStyle: "preserve-3d",
              perspective: 5000,
            }}
          >
            <CSSTransition
              in={!flipped}
              timeout={1000}
              classNames="front-face-transition"
            >
              <div
                style={{
                  ...transitionBoxStyle,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backfaceVisibility: "hidden",
                }}
              >
                正面
              </div>
            </CSSTransition>
            <CSSTransition
              in={flipped}
              timeout={1000}
              classNames="back-face-transition"
            >
              <div
                style={{
                  ...transitionBoxStyle,
                  backfaceVisibility: "hidden",
                  background: colorError,
                }}
              >
                反面
              </div>
            </CSSTransition>
          </div>

          {/* 简易版的，没有3d效果 */}
          <SwitchTransition>
            <CSSTransition
              in={flipped}
              key={flipped ? "back" : "front"}
              timeout={300}
              unmountOnExit
              classNames="zoom-in-center"
              appear
            >
              <div
                style={{
                  ...transitionBoxStyle,
                  background: flipped ? colorError : colorPrimary,
                }}
              >
                {flipped ? "反面" : "正面"}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </Card>
    </div>
  );
}
