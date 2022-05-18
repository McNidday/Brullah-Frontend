import cn from "classnames";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { formatNumber, inputSelection } from "../../../../../functions/helpers";
import getSymbolFromCurrency from "currency-symbol-map";

interface Props {
  activeCurrency: string;
  setDepositAmount: Function;
}

const PaypalInput = ({ activeCurrency, setDepositAmount }: Props) => {
  const [formattedAmount, setFormattedAmount] = useState("");

  const formatPlaceHolder = () => {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    let input_val = "999.00";

    // original length
    var original_len = input_val.length;
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");

      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);

      // add commas to left side of number
      left_side = formatNumber(left_side);

      // validate right side
      right_side = formatNumber(right_side);

      // On blur make sure 2 numbers after decimal
      if (activeCurrency !== "JPY" && activeCurrency !== "AC") {
        right_side += "00";
      }

      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);

      if (activeCurrency !== "JPY" && activeCurrency !== "AC") {
        // join number by .
        input_val = left_side + "." + right_side;
      } else {
        input_val = left_side;
      }
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      // input_val = "$" + input_val;

      // final formatting
      if (activeCurrency !== "JPY" && activeCurrency !== "AC") {
        input_val += ".00";
      }
    }
    // send updated string to input
    return input_val;
  };

  const formatCurrency = (
    e: FormEvent & { target: EventTarget & { [key: string]: any } },
    blur?: boolean
  ) => {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    let input_val = e.target.value;
    // don't validate empty input
    if (input_val === "" && formattedAmount.length === 1) {
      setFormattedAmount("");
      return;
    }

    // original length
    var original_len = input_val.length;

    // initial caret position
    var caret_pos = inputSelection(e.target).start;
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");

      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);

      // add commas to left side of number
      left_side = formatNumber(left_side);

      // validate right side
      right_side = formatNumber(right_side);

      // On blur make sure 2 numbers after decimal
      if (blur && activeCurrency !== "JPY" && activeCurrency !== "AC") {
        right_side += "00";
      }

      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);

      if (activeCurrency !== "JPY" && activeCurrency !== "AC") {
        // join number by .
        input_val = left_side + "." + right_side;
      } else {
        input_val = left_side;
      }
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      // input_val = "$" + input_val;

      // final formatting
      if (blur && activeCurrency !== "JPY" && activeCurrency !== "AC") {
        if (input_val) {
          input_val += ".00";
        }
      }
    }
    // send updated string to input
    setFormattedAmount(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    e.target.setSelectionRange(caret_pos, caret_pos);
  };

  const setAmount = () => {
    // Check if a dot exitsts and get rid of it
    let money = formattedAmount.split(".");
    let rightMoney = money[0];
    // Remove all the comas
    let comaClensed = rightMoney.split("").map((v) => {
      if (v !== ",") return v;
      return "";
    });
    if (Number.isNaN(parseInt(comaClensed.join("")))) {
      setDepositAmount(0);
      return;
    }
    setDepositAmount(parseInt(comaClensed.join("")));
  };

  useEffect(() => {
    setAmount();
  }, [formattedAmount]);

  return (
    <div className={cn(styles.container)}>
      <h3>{getSymbolFromCurrency(activeCurrency)}</h3>
      <input
        data-symbol={getSymbolFromCurrency(activeCurrency)}
        type={"text"}
        placeholder={formatPlaceHolder()}
        value={formattedAmount}
        onInput={formatCurrency}
        onBlur={(e) => formatCurrency(e, true)}
      ></input>
      <div id="paypal-script"></div>
    </div>
  );
};

export default PaypalInput;
