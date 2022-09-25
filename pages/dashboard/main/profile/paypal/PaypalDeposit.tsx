import cn from "classnames";
import styles from "./styles.module.scss";
import "swiper/css/bundle";
import { useEffect, useRef, useState, useCallback } from "react";
import PaypalCountries from "./countries/PaypalCountries";
import PaypalTitle from "./title/PaypalTitle";
import PaypalInput from "./input/PaypalInput";
import PaypalButton from "./button/PaypalButton";
import debounce from "lodash.debounce";
import Icon from "../../../../../components/Icon/Icon";
import anime from "animejs";

interface Props {
  setSuccessMessage: (message: string | JSX.Element | null) => void;
  setOverflowTab: (tab: string | null) => void;
  setError: (message: string) => void;
  overflowTab: string | null;
  refreshUser: () => void;
}

const PaypalDeposit = ({
  setError,
  setSuccessMessage,
  setOverflowTab,
  overflowTab,
  refreshUser,
}: Props) => {
  const [activeCurrency, setCurrency] = useState<string>("USD");
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [paypalScriptState, setPaypalScriptState] = useState<string>("pending");
  const setActiveCurrency = useRef(debounce(setCurrency, 1000)).current;
  const [navBackHover, setNavBackHover] = useState(false);
  const containerRef = useRef(null);
  const navBackRef = useRef(null);

  const setDepositAmountCallback = useCallback((val: number) => {
    setDepositAmount(val);
  }, []);

  const setPaypalScriptStateCallback = useCallback((val: string) => {
    setPaypalScriptState(val);
  }, []);

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
  }, []);

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
          alt={"Previous Card Icon"}
        ></Icon>
      </div>
      <PaypalCountries
        paypalScriptState={paypalScriptState}
        setActiveCurrency={(val: string) => setActiveCurrency(val)}
      ></PaypalCountries>
      <PaypalTitle></PaypalTitle>
      <PaypalInput
        activeCurrency={activeCurrency}
        setDepositAmount={setDepositAmountCallback}
      ></PaypalInput>
      <PaypalButton
        refreshUser={refreshUser}
        setSuccessMessage={setSuccessMessage}
        setError={setError}
        depositAmount={depositAmount}
        activeCurrency={activeCurrency}
        setPaypalScriptState={setPaypalScriptStateCallback}
      ></PaypalButton>
    </div>
  );
};

export default PaypalDeposit;
