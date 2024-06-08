import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "@/assets/logo.svg";
import styled from "styled-components";
import useContentOverflow from "@/hooks/useContentOverflow";

const LogoStyle = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  & > a {
    width: 100%;
    min-height: 32px;
  }
  & img {
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
  }
`;

const title = process.env.REACT_APP_WEBSITE_NAME;

export default function Logo(props: {
  // title: React.ReactNode;
  logo?: string;
  collapsed?: boolean;
  style?: React.CSSProperties;
}) {
  const { collapsed = false, logo = LogoSvg } = props;

  const linkRef = React.useRef(null);
  const { isOverflowX } = useContentOverflow(linkRef);

  return (
    <LogoStyle style={props.style}>
      <Link to="/" className="ellipsis" ref={linkRef}>
        <img src={logo} alt="logo" />
        <h1
          title={isOverflowX ? title : undefined}
          style={{ display: collapsed ? "none" : "inline" }}
        >
          {title}
        </h1>
      </Link>
    </LogoStyle>
  );
}
