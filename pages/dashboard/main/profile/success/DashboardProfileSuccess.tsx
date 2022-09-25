import anime from "animejs";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import Icon from "../../../../../components/Icon/Icon";
import styles from "./styles.module.scss";

interface Props {
  successMessage: string | JSX.Element | null;
  setSuccessMessage: (message: string | JSX.Element | null) => void;
}

const DashboardProfileSuccess = ({
  successMessage,
  setSuccessMessage,
}: Props) => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
  const containerRef = useRef(null);
  const showSuccessMessage = () => {
    anime({
      targets: containerRef.current,
      translateY: "0px",
      delay: 2000,
      duration: 2000,
    });
  };
  const hideSuccessMessage = () => {
    anime({
      targets: containerRef.current,
      translateY: "-100%",
      duration: 2000,
    });
  };

  useEffect(() => {
    if (successMessage) {
      showSuccessMessage();
      setTimeout(() => {
        setShowCheckmark(true);
      }, 3000);
    }
  }, [successMessage]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <div
        className={cn(styles.close)}
        onMouseEnter={() => setCancelHover(true)}
        onMouseLeave={() => setCancelHover(false)}
        onClick={() => {
          hideSuccessMessage();
          setSuccessMessage(null);
        }}
      >
        <Icon
          activeLink="/icons/x/active.svg"
          inactiveLink="/icons/x/inactive.svg"
          hover={cancelHover}
          alt="Close Success Card"
        ></Icon>
      </div>
      <div
        className={cn(
          "success-checkmark",
          showCheckmark ? styles.showCheckmark : ""
        )}
      >
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <p className="payment-message">{successMessage}</p>
    </div>
  );
};

export default DashboardProfileSuccess;
