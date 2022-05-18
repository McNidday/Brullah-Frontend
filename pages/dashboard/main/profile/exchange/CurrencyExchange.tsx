import styles from "./styles.module.scss";
import cn from "classnames";
import Icon from "../../../../components/Icon/Icon";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";

interface Props {
  overflowTab: string | null;
  setOverflowTab: (tab: string | null) => void;
}

const CurrencyExchange = ({ overflowTab, setOverflowTab }: Props) => {
  const [currencyFrom, setCurrencyFrom] = useState<"BRC" | "USD">("USD");
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
  const [navBackHover, setNavBackHover] = useState(false);
  const [transferHover, setTransferHover] = useState(false);
  const [exchangeHover, setExchangeHover] = useState(false);
  const containerRef = useRef(null);
  const navBackRef = useRef(null);

  const hideCurrencyExchange = () => {
    anime({
      targets: containerRef.current,
      translateX: "-105%",
      duration: 1000,
    });
  };

  const showCurrencyExchange = () => {
    anime({
      targets: containerRef.current,
      translateX: "0px",
      duration: 1000,
    });
  };

  useEffect(() => {
    if (overflowTab === "exchange") {
      showCurrencyExchange();
    }
  }, [overflowTab]);

  useEffect(() => {
    anime({
      targets: navBackRef.current,
      translateX: "-5px",
      direction: "alternate",
      delay: 1000,
      loop: true,
    });
  }, [navBackRef.current]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <h3>
        Enter the amount of money you would like to convert to BRC or vice
        versa. 1 BRC = $1
      </h3>
      <div className={cn(styles.converterInputs)}>
        <div className="input-wrapper">
          <label className={cn(fromFocused ? "writting" : "")}>
            {currencyFrom === "USD" ? "Base (USD)" : "Base (BRC)"}
          </label>
          <input
            onFocus={() => setFromFocused(true)}
            onBlur={() => setFromFocused(false)}
            type="text"
          ></input>
        </div>
        <div
          className="transfer-icon"
          onMouseEnter={() => setTransferHover(true)}
          onMouseLeave={() => setTransferHover(false)}
          onClick={() =>
            setCurrencyFrom(currencyFrom === "USD" ? "BRC" : "USD")
          }
        >
          <Icon
            activeLink="/icons/transfer/active.svg"
            inactiveLink="/icons/transfer/inactive.svg"
            hover={transferHover}
          ></Icon>
        </div>
        <div className="input-wrapper">
          <label className={cn(toFocused ? "writting" : "")}>
            {currencyFrom === "USD" ? "Target (BRC)" : "Target (USD)"}
          </label>
          <input
            onFocus={() => setToFocused(true)}
            onBlur={() => setToFocused(false)}
            type="text"
          ></input>
        </div>
      </div>
      <div
        className={cn(styles.convertButton)}
        onMouseEnter={() => setExchangeHover(true)}
        onMouseLeave={() => setExchangeHover(false)}
      >
        <Icon
          activeLink="/icons/currencyExchange/active.svg"
          inactiveLink="/icons/currencyExchange/inactive.svg"
          hover={exchangeHover}
        ></Icon>
      </div>
      <p className="convertion-success">Succesfully converted $0 TO BRC</p>
      <div
        ref={navBackRef}
        className={cn(styles.navBack)}
        onMouseEnter={() => setNavBackHover(true)}
        onMouseLeave={() => setNavBackHover(false)}
        onClick={() => {
          hideCurrencyExchange();
          setOverflowTab(null);
        }}
      >
        <Icon
          activeLink="/icons/beforeNav/active.svg"
          inactiveLink="/icons/beforeNav/inactive.svg"
          hover={navBackHover}
        ></Icon>
      </div>
    </div>
  );
};

export default CurrencyExchange;
