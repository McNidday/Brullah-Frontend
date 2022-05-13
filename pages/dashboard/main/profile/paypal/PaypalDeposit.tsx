import cn from "classnames";
import styles from "./styles.module.scss";
import "swiper/css/bundle";
import { useState } from "react";
import PaypalCountries from "./countries/PaypalCountries";
import PaypalTitle from "./title/PaypalTitle";
import PaypalInput from "./input/PaypalInput";

const PaypalDeposit = () => {
  const [activeCurrency, setActiveCurrency] = useState<string>("USD");

  // List all the supported currencies
  const supportedCurrencies = [
    "USD",
    "AUD",
    "CAD",
    "HKD",
    "ILS",
    "JPY",
    "MXN",
    "TWD",
    "NZD",
    "PHP",
    "GBP",
    "RUB",
    "SGD",
    "CHF",
    "THB",
  ];

  return (
    <div className={cn(styles.container)}>
      <PaypalCountries
        activeCurrency={activeCurrency}
        setActiveCurrency={(val: string) => setActiveCurrency(val)}
      ></PaypalCountries>
      <PaypalTitle></PaypalTitle>
      <PaypalInput activeCurrency={activeCurrency}></PaypalInput>
    </div>
  );
};

export default PaypalDeposit;
