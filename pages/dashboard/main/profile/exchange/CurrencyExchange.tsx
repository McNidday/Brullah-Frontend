import styles from "./styles.module.scss";
import cn from "classnames";
import Icon from "../../../../components/Icon/Icon";
import { FormEvent, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { gql, useMutation } from "@apollo/client";
import {
  cleanAmount,
  formatNumber,
  inputSelection,
} from "../../../../functions/helpers";
import dinero from "dinero.js";

const CURRENCY_EXCHANGE = gql`
  mutation CurrencyExchange($from: String!, $to: String!, $amount: Int!) {
    convert(from: $from, to: $to, amount: $amount) {
      converted_amount {
        value
        currency
      }
      gross_amount {
        value
        currency
      }
    }
  }
`;

interface Props {
  overflowTab: string | null;
  setOverflowTab: (tab: string | null) => void;
  refreshUser: () => void;
}

const CurrencyExchange = ({
  overflowTab,
  setOverflowTab,
  refreshUser,
}: Props) => {
  const [convert, { error, data, reset }] = useMutation(CURRENCY_EXCHANGE, {
    errorPolicy: "all",
  });
  const [convertAmount, setConvertAmount] = useState<number>(0);
  const [currencyFrom, setCurrencyFrom] = useState<"BRC" | "USD">("USD");
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
  const [navBackHover, setNavBackHover] = useState(false);
  const [transferHover, setTransferHover] = useState(false);
  const [exchangeHover, setExchangeHover] = useState(false);
  const [formattedFromAmount, setFormattedFromAmount] = useState("");
  const [formattedToAmount, setFormattedToAmount] = useState("");
  const [curretPos, setCurretPosition] = useState<{
    type: "from" | "to";
    caretPos: number;
  }>({ type: "from", caretPos: 0 });
  const inputFromRef = useRef<HTMLInputElement>(null);
  const inputToRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const navBackRef = useRef(null);
  const convertRef = useRef(null);

  const convertButtonAnimation = useRef<anime.AnimeInstance>();

  const formatCurrency = (
    e: FormEvent & { target: EventTarget & { [key: string]: any } },
    inputType: "from" | "to",
    blur?: boolean
  ) => {
    // get input value
    let inputVal = e.target.value;
    // don't validate empty input
    if (inputVal === "") {
      if (inputType === "from" && formattedFromAmount.length === 1) {
        setFormattedFromAmount("");
        setFormattedToAmount("");
        return;
      } else if (formattedToAmount.length === 1) {
        setFormattedFromAmount("");
        setFormattedToAmount("");
        return;
      }
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
    setFormattedFromAmount(inputVal);
    setFormattedToAmount(inputVal);
    //  put caret back in the right position
    let updated_len = inputVal.length;
    caretPosition = updated_len - originalLen + caretPosition;
    setCurretPosition({ type: inputType, caretPos: caretPosition });
    if (inputVal) {
      if (inputType === "from") {
        setToFocused(true);
      } else {
        setFromFocused(true);
      }
    }

    if (!inputVal && blur) {
      setFromFocused(false);
      setToFocused(false);
    }
  };

  useEffect(() => {
    if (curretPos.type === "from") {
      inputFromRef?.current!.setSelectionRange(
        curretPos.caretPos,
        curretPos.caretPos
      );
    } else {
      inputToRef?.current!.setSelectionRange(
        curretPos.caretPos,
        curretPos.caretPos
      );
    }
  }, [curretPos]);

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
    convertButtonAnimation.current = anime({
      targets: convertRef.current,
      rotate: 360,
      loop: true,
      autoplay: false,
    });
  }, [convertRef.current]);

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

  useEffect(() => {
    setConvertAmount(cleanAmount(formattedFromAmount) * 100);
  }, [formattedToAmount, formattedFromAmount]);

  useEffect(() => {
    if (data?.convert || error) {
      setTimeout(reset, 5000);
      convertButtonAnimation.current?.pause();
    }
    if (data?.convert) {
      refreshUser();
    }
  }, [error, data]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <h3>
        Enter the amount of money you would like to convert to BRC or vice
        versa. 1 BRC = $1
      </h3>
      <div className={cn(styles.converterInputs)}>
        <div className="input-wrapper">
          <label
            className={cn(
              fromFocused ? "writting" : "",
              data?.convert || error ? styles.labelDisabled : ""
            )}
          >
            {currencyFrom === "USD" ? "Base (USD)" : "Base (BRC)"}
          </label>
          <input
            className={cn(data?.convert || error ? styles.inputDisabled : "")}
            ref={inputFromRef}
            value={formattedFromAmount}
            onInput={(e) => formatCurrency(e, "from", false)}
            onBlur={(e) => {
              formatCurrency(e, "from", true);
            }}
            onFocus={() => setFromFocused(true)}
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
          <label
            className={cn(
              toFocused ? "writting" : "",
              data?.convert || error ? styles.labelDisabled : ""
            )}
          >
            {currencyFrom === "USD" ? "Target (BRC)" : "Target (USD)"}
          </label>
          <input
            className={cn(data?.convert || error ? styles.inputDisabled : "")}
            ref={inputToRef}
            value={formattedToAmount}
            onInput={(e) => formatCurrency(e, "to", false)}
            onFocus={() => setToFocused(true)}
            onBlur={(e) => formatCurrency(e, "to", true)}
            type="text"
          ></input>
        </div>
      </div>
      <div
        ref={convertRef}
        className={cn(styles.convertButton)}
        onMouseEnter={() => setExchangeHover(true)}
        onMouseLeave={() => setExchangeHover(false)}
        onClick={() => {
          convertButtonAnimation.current!.play();
          convert({
            variables: {
              from: currencyFrom,
              to: currencyFrom === "USD" ? "BRC" : "USD",
              amount: convertAmount,
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
      {data?.convert ? (
        <h4 className="convertion-success">
          Succesfully converted{" "}
          {dinero({
            amount: data.convert.gross_amount.value,
            currency: data.convert.gross_amount.currency,
          }).toFormat()}{" "}
          TO {data.convert.converted_amount.currency}
        </h4>
      ) : (
        ""
      )}
      {error ? <h4 className="convertion-error">{error.message}</h4> : ""}
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
