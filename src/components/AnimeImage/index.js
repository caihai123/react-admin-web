import { useEffect, useRef } from "react";
import anime from "animejs";
import styled, { keyframes } from "styled-components";
import background_hover from "./assets/background_hover.svg";
import background_normal from "./assets/background_normal.svg";
import stuffs_circle from "./assets/stuffs_circle.png";
import stuffs_code from "./assets/stuffs_code.png";
import stuffs_pie from "./assets/stuffs_pie.png";
import stuffs_folder from "./assets/stuffs_folder.png";
import icn_folder from "./assets/icn_folder.svg";
import stuffs_input from "./assets/stuffs_input.png";
import stuffs_dot from "./assets/stuffs_dot.png";
import panel_chart from "./assets/panel_chart.png";
import panel_code from "./assets/panel_code.png";

const float_a = keyframes`
  0% {
    transform: none;
  }
  25% {
    transform: translate(5px, -8px) scale(1.05) rotate(-10deg);
  }
  50% {
    transform: translate(3px, 0px) scale(1) rotate(0);
  }
  75% {
    transform: translate(5px, -8px) scale(1) rotate(8deg);
  }
  100% {
    transform: none;
  }
  `;
const float_b = keyframes`
  0% {
    transform: none;
  }
  33% {
    transform: translate(-6px, 6px) rotate(-5deg);
  }
  66% {
    transform: translate(-4px, -5px) rotate(-3deg);
  }
  100% {
    transform: translate(-1px, 5px) rotate(0);
  }
  `;
const float_c = keyframes`
  0% {
    transform: none;
  }
  33% {
    transform: translate(-2px, 5px);
  }
  66% {
    transform: translate(2px, -5px);
  }
  100% {
    transform: none;
  }
  `;

const layout = (dir = "column", justify = "start", align = "top") => `
  display: flex;
  flex-direction: ${dir};
  justify-content: ${justify};
  align-items: ${align};
  margin: 0;
`;

const img = (image = "none") => `
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

const float = (yaxis = "top", xaxis = "left", yoff = 0, xoff = 0) => `
  position: absolute;
  ${yaxis}: ${yoff};
  ${xaxis}: ${xoff};
`;

const AnimeImg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & .hover_layer {
    z-index: 10;
    width: 480px;
    height: 320px;
    position: absolute;
    &:hover {
      & + .animate {
        box-shadow: 4px 4px 32px rgba(204, 218, 233, 0.2);
        background-image: url(${background_hover});
      }
    }
  }

  // 动画区域
  & .animate {
    position: relative;
    width: 480px;
    height: 320px;
    perspective: 1400px;
    ${img(background_normal)}
    box-shadow: 6px 6px 20px rgba(204, 218, 233, 0.3);
    transition: 0.2s ease-out;

    // 三个关闭按钮
    & .ani_btn {
      ${float()}
      ${layout("row")}
      padding: 12px 16px;
      & > li {
        list-style: none;
        background-color: #e8ebec;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        margin-right: 6px;
      }
    }

    // 左侧菜单
    & .ani_menu {
      ${float("top", "left", "32px", 0)}
      ${layout()}
      padding: 24px 16px;
      & > li {
        list-style: none;
        width: 56px;
        height: 12px;
        background-color: #e8ebec;
        margin-bottom: 16px;
        border-radius: 6px;
      }
    }

    // 圆圈
    & .ani_stf_circle {
      width: 103px;
      height: 106px;
      ${float("top", "right", "-30px", "-40px")}
      ${img(stuffs_circle)}
      animation: ${float_a} 8s ease-in-out infinite;
    }

    //代码块
    & .ani_stf_code {
      width: 107px;
      height: 105px;
      ${float("bottom", "left", "-20px", "420px")}
      ${img(stuffs_code)}
      animation: ${float_b} 6s ease-in-out infinite 1s alternate;
    }

    //饼图
    & .ani_stf_pie {
      width: 132px;
      height: 132px;
      ${float("top", "right", "104px", "282px")}
      ${img(stuffs_pie)}
      animation: ${float_a} 10s ease-in-out 1s infinite alternate;
    }

    //文件夹
    & .ani_stf_folder {
      width: 153px;
      height: 100px;
      ${float("top", "right", "-56px", "248px")}
      ${img(stuffs_folder)}
      animation: ${float_b} 10s ease-in-out infinite alternate;
    }

    //文件夹列表
    & .ani_icn_folder {
      ${float("top", "left", "170px", "104px")}
      ${layout()}
      padding: 0;
      & > li {
        padding: 0;
        margin-bottom: 5px;
        list-style: none;
        width: 42px;
        height: 36px;
        ${img(icn_folder)}
        background-position: center center;
      }
    }

    //输入框
    & .ani_stf_input {
      width: 155px;
      height: 74px;
      ${float("bottom", "right", "0px", " 380px")}
      ${img(stuffs_input)}
      animation: ${float_b} 8s ease-in-out 0.5s infinite alternate;
    }

    //浮动球
    & .ani_stf_dot {
      width: 155px;
      height: 74px;
      ${float("top", "right", "180px", "-64px")}
      ${img(stuffs_dot)}
      animation: ${float_b} 8s ease-in-out 0.5s infinite alternate;
    }

    //图表面板
    & .ani_pn_chart {
      width: 279px;
      height: 179px;
      ${float("bottom", "left", "170px", "44px")}
      ${img(panel_chart)}
      animation: ${float_c} 6s ease-in-out infinite alternate;
    }

    //代码面板
    & .ani_pn_code {
      width: 158px;
      height: 118px;
      ${float("top", "right", "200px", "170px")}
      ${img(panel_code)}
      animation: ${float_c} 8s ease-in-out 0.5s infinite;
    }
  }
`;

export default function AnimeImage() {
  const aniBg = useRef();
  const btn = useRef();
  const menu = useRef();
  const stfCircle = useRef();
  const stfCode = useRef();
  const stfPie = useRef();
  const stfFolder = useRef();

  const stfInput = useRef();
  const icn_folder = useRef();
  const stfDot = useRef();
  const pnChart = useRef();
  const pnCode = useRef();

  const animationRef = useRef();
  const handleOver = () => {
    if (animationRef.current.reversed) animationRef.current.reverse();
    animationRef.current.play();
    // console.log(btn);
  };
  const handleOut = () => {
    if (!animationRef.current.reversed) animationRef.current.reverse();
    animationRef.current.play();
    // console.log(animationRef.current);
  };

  useEffect(() => {
    animationRef.current = anime.timeline({
      easing: "easeInElastic(2,1)",
      duration: 400,
      autoplay: false,
    });
    animationRef.current
      //输入框
      .add(
        {
          targets: stfInput.current,
          bottom: 200,
          right: 0,
          opacity: 0,
          duration: 400,
        },
        0
      )
      //代码块
      .add(
        {
          targets: stfCode.current,
          left: 10,
          opacity: 0,
        },
        0
      )
      //饼图
      .add(
        {
          targets: stfPie.current,
          top: 40,
          right: 60,
          // width: 0,
          opacity: 0,
        },
        30
      )
      //圆圈
      .add(
        {
          targets: stfCircle.current,
          right: 30,
          top: 140,
          width: 40,
          opacity: 0,
        },
        10
      )
      //文件夹
      .add(
        {
          targets: stfFolder.current,
          right: 240,
          top: 140,
          width: 40,
          opacity: 0,
        },
        30
      )
      //菜单条
      .add(
        {
          targets: menu.current.children,
          backgroundColor(el, i) {
            if (i === 1) return "#3E64F0";
            else return "#E1E9EE";
          },
          width: [56, 32, 52],
          translateX: 4,
          scale: 1.2,
          delay: anime.stagger(50),
          easing: "easeOutBack",
          duration: 500,
        },
        60
      )
      //窗体背景
      .add(
        {
          targets: aniBg.current,
          scale: 1.05,
          easing: "easeOutBack",
          duration: 100,
        },
        150
      )
      //窗体按钮
      .add(
        {
          targets: btn.current,
          scale: 1.1,
          left: 4,
          easing: "easeOutBack",
        },
        150
      )
      .add(
        {
          targets: btn.current.children[0],
          background: "#F65F59",
        },
        150
      )
      .add(
        {
          targets: btn.current.children[1],
          background: "#F9BC2F",
        },
        150
      )
      .add(
        {
          targets: btn.current.children[2],
          background: "#3CC83F",
        },
        150
      )

      //文件夹图标
      .add(
        {
          targets: icn_folder.current.children,
          height: [0, 36],
          opacity: [0, 1],
          delay: anime.stagger(50),
          easing: "linear",
          duration: 200,
        },
        200
      )
      //代码面板
      .add(
        {
          targets: pnCode.current,
          width: [0, 158],
          opacity: [0, 1],
          right: 370,
          easing: "easeOutElastic(6,1)",
          duration: 400,
        },
        200
      )

      //图表面板
      .add(
        {
          targets: pnChart.current,
          height: [0, 179],
          opacity: [0, 1],
          left: 244,
          easing: "easeOutElastic(6,1)",
          duration: 400,
        },
        200
      )
      //浮动球
      .add(
        {
          targets: stfDot.current,
          height: [0, 74],
          opacity: [0, 1],
          top: 240,
          right: -36,
          easing: "easeOutElastic(6,1)",
          duration: 400,
        },
        200
      );
  }, []);

  return (
    <AnimeImg>
      <div
        className="hover_layer"
        onMouseEnter={handleOver}
        onMouseLeave={handleOut}
      ></div>
      <div ref={aniBg} className="animate">
        <ul ref={btn} className="ani_btn">
          <li /> <li /> <li />
        </ul>
        <ul ref={menu} className="ani_menu">
          <li /> <li /> <li />
          <li /> <li />
        </ul>
        <ul ref={icn_folder} className="ani_icn_folder">
          <li /> <li /> <li />
        </ul>
        <div ref={stfCircle} className="ani_stf_circle" />
        <div ref={stfCode} className="ani_stf_code" />
        <div ref={stfPie} className="ani_stf_pie" />
        <div ref={stfFolder} className="ani_stf_folder" />
        <div ref={stfDot} className="ani_stf_dot" />
        <div ref={stfInput} className="ani_stf_input" />
        <div ref={pnChart} className="ani_pn_chart" />
        <div ref={pnCode} className="ani_pn_code" />
      </div>
    </AnimeImg>
  );
}
