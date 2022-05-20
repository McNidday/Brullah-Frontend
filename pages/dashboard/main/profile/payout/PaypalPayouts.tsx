import anime from "animejs";
import { FormEvent, useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import Icon from "../../../../components/Icon/Icon";
import {
  cleanAmount,
  formatNumber,
  inputSelection,
} from "../../../../functions/helpers";
import { gql, useMutation } from "@apollo/client";
import PayoutOrderStatus from "./status/PayoutOrderStatus";

const PAYPAL_PAYOUT = gql`
  mutation PaypalPayoutOrder($amount: Int!) {
    paypalPayoutOrder(amount: $amount) {
      inNextQueue
      nextPayoutIn
    }
  }
`;

interface Props {
  overflowTab: string | null;
  refreshUser: () => void;
  setOverflowTab: (tab: string | null) => void;
}

const PaypalPayouts = ({ overflowTab, setOverflowTab, refreshUser }: Props) => {
  const [payoutOrder, { loading, data, error, reset }] = useMutation(
    PAYPAL_PAYOUT,
    { errorPolicy: "all" }
  );
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [formattedAmount, setFormattedAmount] = useState("");
  const [curretPos, setCurretPosition] = useState<number>(0);
  const [exchangeHover, setExchangeHover] = useState(false);
  const [navBackHover, setNavBackHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const navBackRef = useRef(null);
  const convertRef = useRef(null);

  const payoutButtonAnimation = useRef<anime.AnimeInstance>();

  const formatCurrency = (
    e: FormEvent & { target: EventTarget & { [key: string]: any } },
    blur?: boolean
  ) => {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    let inputVal = e.target.value;
    // don't validate empty input
    if (inputVal === "" && formattedAmount.length === 1) {
      setFormattedAmount("");
      return;
    }

    // original length
    let originalLen = inputVal.length;

    // initial caret position
    let caretPosition = inputSelection(e.target).start;
    // check for decimal
    if (inputVal.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      let decimalPos = inputVal.indexOf(".");

      // split number by decimal point
      let leftSide = inputVal.substring(0, decimalPos);
      let rightSide = inputVal.substring(decimalPos);

      // add commas to left side of number
      leftSide = formatNumber(leftSide);

      // validate right side
      rightSide = formatNumber(rightSide);

      // On blur make sure 2 numbers after decimal
      if (blur) {
        rightSide += "00";
      }

      // Limit decimal to only 2 digits
      rightSide = rightSide.substring(0, 2);

      // join number by .
      inputVal = leftSide + "." + rightSide;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      inputVal = formatNumber(inputVal);

      // final formatting
      if (blur) {
        if (inputVal) {
          inputVal += ".00";
        }
      }
    }
    // send updated string to input
    setFormattedAmount(inputVal);
    //  put caret back in the right position
    let updated_len = inputVal.length;
    caretPosition = updated_len - originalLen + caretPosition;
    setCurretPosition(caretPosition);
  };

  const hidePayout = () => {
    anime({
      targets: containerRef.current,
      translateX: "-105%",
      duration: 1000,
    });
  };

  const showPayout = () => {
    anime({
      targets: containerRef.current,
      translateX: "0px",
      duration: 1000,
    });
  };

  useEffect(() => {
    if (overflowTab === "payout") {
      showPayout();
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

  useEffect(() => {
    payoutButtonAnimation.current = anime({
      targets: convertRef.current,
      rotate: 360,
      loop: true,
      autoplay: false,
    });
  }, [convertRef.current]);

  useEffect(() => {
    inputRef?.current!.setSelectionRange(curretPos, curretPos);
  }, [curretPos]);

  useEffect(() => {
    if (data?.paypalPayoutOrder || error) {
      setTimeout(reset, 5000);
      payoutButtonAnimation.current?.pause();
    }
    if (data?.paypalPayoutOrder) {
      refreshUser();
    }
  }, [error, data]);

  useEffect(() => {
    setPayoutAmount(cleanAmount(formattedAmount) * 100);
  }, [formattedAmount]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <h3>
        Enter the amount of money you would like to withdraw from your brulah
        account
      </h3>

      <div className={cn(styles.inputWrapper)}>
        <h3>$</h3>
        <input
          ref={inputRef}
          data-symbol={"$"}
          type={"text"}
          placeholder={"999.00"}
          value={formattedAmount}
          onInput={formatCurrency}
          onBlur={(e) => formatCurrency(e, true)}
        ></input>
        <div
          ref={convertRef}
          className={cn(styles.convertButton)}
          onMouseEnter={() => setExchangeHover(true)}
          onMouseLeave={() => setExchangeHover(false)}
          onClick={() => {
            payoutButtonAnimation.current!.play();
            payoutOrder({
              variables: {
                amount: payoutAmount,
              },
            });
          }}
        >
          <Icon
            activeLink="/icons/currencyExchange/active.svg"
            inactiveLink="/icons/currencyExchange/inactive.svg"
            hover={exchangeHover}
          ></Icon>
        </div>
      </div>
      <PayoutOrderStatus
        mutatePayoutOrderLoading={loading}
        mutatePayoutOrderError={error}
      ></PayoutOrderStatus>
      <div
        ref={navBackRef}
        className={cn(styles.navBack)}
        onMouseEnter={() => setNavBackHover(true)}
        onMouseLeave={() => setNavBackHover(false)}
        onClick={() => {
          hidePayout();
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

export default PaypalPayouts;
