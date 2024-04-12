import { FC, ReactNode, CSSProperties } from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export type PropsType = {
  children: ReactNode;
  flag: "up" | "down";
  style?: CSSProperties;
  className?: string;
};

const Trend: FC<PropsType> = function ({ children, flag, style }) {
  return (
    <div className={styles.trendItem} style={style}>
      {children}
      {flag && (
        <span className={styles[flag]}>
          {flag === "up" ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  );
};

export default Trend;
