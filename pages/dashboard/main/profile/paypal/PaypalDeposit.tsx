import cn from "classnames";
import styles from "./styles.module.scss";
import "swiper/css/bundle";
import { useCallback, useEffect, useRef, useState } from "react";
import PaypalCountries from "./countries/PaypalCountries";
import PaypalTitle from "./title/PaypalTitle";
import PaypalInput from "./input/PaypalInput";
import PaypalButton from "./button/PaypalButton";
import debounce from "lodash.debounce";
import Icon from "../../../../components/Icon/Icon";
import anime from "animejs";

interface Props {
  setSuccessMessage: (message: string | JSX.Element | null) => void;
  setOverflowTab: (tab: string | null) => void;
  setError: (message: string) => void;
  overflowTab: string | null;
}

const PaypalDeposit = ({
  setError,
  setSuccessMessage,
  setOverflowTab,
  overflowTab,
}: Props) => {
  const [activeCurrency, setCurrency] = useState<string>("USD");
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [paypalScriptState, setPaypalScriptState] = useState<string>("pending");
  const setActiveCurrency = useCallback(debounce(setCurrency, 1000), []);
  const [navBackHover, setNavBackHover] = useState(false);
  const containerRef = useRef(null);
  const navBackRef = useRef(null);

  const hidePaypalDeposit = () => {
    anime({
      targets: containerRef.current,
      translateX: "-105%",
      duration: 1000,
    });
  };

  const showPaypalDeposit = () => {
    anime({
      targets: containerRef.current,
      translateX: "0px",
      duration: 1000,
    });
  };

  useEffect(() => {
    anime({
      targets: navBackRef.current,
      translateX: "-5px",
      direction: "alternate",
      delay: 1000,
      loop: true,
    });
  }, [navBackRef.current]);

  useEffect(() => {
    if (overflowTab === "deposit") {
      showPaypalDeposit();
    }
  }, [overflowTab]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <div
        ref={navBackRef}
        className={cn(styles.navBack)}
        onMouseEnter={() => setNavBackHover(true)}
        onMouseLeave={() => setNavBackHover(false)}
        onClick={() => {
          hidePaypalDeposit();
          setOverflowTab(null);
        }}
      >
        <Icon
          activeLink="/icons/beforeNav/active.svg"
          inactiveLink="/icons/beforeNav/inactive.svg"
          hover={navBackHover}
        ></Icon>
      </div>
      <PaypalCountries
        paypalScriptState={paypalScriptState}
        setActiveCurrency={(val: string) => setActiveCurrency(val)}
      ></PaypalCountries>
      <PaypalTitle></PaypalTitle>
      <PaypalInput
        activeCurrency={activeCurrency}
        setDepositAmount={(val: number) => setDepositAmount(val)}
      ></PaypalInput>
      <PaypalButton
        setSuccessMessage={setSuccessMessage}
        setError={setError}
        depositAmount={depositAmount}
        activeCurrency={activeCurrency}
        setPaypalScriptState={(val: string) => setPaypalScriptState(val)}
      ></PaypalButton>
    </div>
  );
};

export default PaypalDeposit;
