import anime from "animejs";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import styles from "./styles.module.scss";

interface Props {
  error: string | null;
  setError: (message: string | null) => void;
}

const DashboardProfileError = ({ error, setError }: Props) => {
  const [cancelHover, setCancelHover] = useState(false);
  const containerRef = useRef(null);
  const showError = () => {
    anime({
      targets: containerRef.current,
      translateY: "0px",
      delay: 2000,
      duration: 2000,
    });
  };
  const hideError = () => {
    anime({
      targets: containerRef.current,
      translateY: "-100%",
      duration: 2000,
    });
  };

  useEffect(() => {
    if (error) {
      showError();
    }
  }, [error]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <div
        className={cn(styles.close)}
        onMouseEnter={() => setCancelHover(true)}
        onMouseLeave={() => setCancelHover(false)}
        onClick={() => {
          hideError();
          setError(null);
        }}
      >
        <Icon
          activeLink="/icons/x/active.svg"
          inactiveLink="/icons/x/inactive.svg"
          hover={cancelHover}
          alt="Close Icon"
        ></Icon>
      </div>
      <div className="failure-checkmark">
        <div className="fail-icon">
          <div className="x-icon first-line"></div>
          <div className="x-icon second-line"></div>
        </div>
      </div>
      <p className="failure-payment-message">{error}</p>
    </div>
  );
};

export default DashboardProfileError;
