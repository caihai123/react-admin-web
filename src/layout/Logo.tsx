import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "@/assets/logo.svg";
import styled, { keyframes } from "styled-components";

const titleHide = keyframes`
    0% {
      display: none;
      opacity: 0;
    }

    80% {
      display: none;
      opacity: 0;
    }

    to {
      display: unset;
      opacity: 1;
    }
  `;

const LogoStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }
  & img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  & h1 {
    height: 32px;
    margin: 0 0 0 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
    animation: ${titleHide} 0.3s;
  }
`;

export default function Logo(props: {
  // title: React.ReactNode;
  logo?: string;
  collapsed?: boolean;
  style?: React.CSSProperties;
}) {
  const { collapsed = false, logo = LogoSvg } = props;

  return (
    <LogoStyle style={props.style}>
      <Link to="/">
        <img src={logo} alt="logo" />
        <h1
          className="ellipsis"
          style={{
            display: collapsed ? "none" : "block",
          }}
        >
          {process.env.REACT_APP_WEBSITE_NAME}
        </h1>
      </Link>
    </LogoStyle>
  );
}
