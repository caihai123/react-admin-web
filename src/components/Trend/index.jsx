import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

const Trend = function ({ children, flag, ...rest }) {
  return (
    <div className={styles.trendItem} {...rest}>
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
