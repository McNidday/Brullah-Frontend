import cn from "classnames";
import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { FormEvent, useRef, useState, useEffect } from "react";
import {
  formatNumber,
  inputSelection,
  cleanAmount,
} from "../../../../../functions/helpers";
import { gql, useMutation } from "@apollo/client";

interface Props {
  refreshUser: () => void;
  refetchPoolAmount: () => void;
}

const POOL_WITHDRAWAL = gql`
  mutation WithdrawFromProfit($amount: Int!) {
    withdrawFromProfit(amount: $amount)
  }
`;

const PoolWithdrawal = ({ refreshUser, refetchPoolAmount }: Props) => {
  const [withdraw, { loading, error, data, reset }] = useMutation(
    POOL_WITHDRAWAL,
    {
      errorPolicy: "all",
    }
  );
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [formattedAmount, setFormattedAmount] = useState("");
  const [curretPos, setCurretPosition] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    inputRef?.current!.setSelectionRange(curretPos, curretPos);
  }, [curretPos]);

  useEffect(() => {
    setWithdrawAmount(cleanAmount(formattedAmount) * 100);
  }, [formattedAmount]);

  useEffect(() => {
    if (error) setTimeout(reset, 5000);
  }, [error]);

  useEffect(() => {
    if (data?.withdrawFromProfit) {
      refetchPoolAmount();
      refreshUser();
    }
  }, [data]);

  if (error)
    return (
      <div className={cn(styles.errorContainer)}>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.inputWrapper)}>
        <h4>$</h4>
        <input
          ref={inputRef}
          data-symbol={"$"}
          type={"text"}
          placeholder={"999.00"}
          value={formattedAmount}
          onInput={formatCurrency}
          onBlur={(e) => formatCurrency(e, true)}
        ></input>
      </div>
      <Button
        text={`${loading ? "loading..." : "Withdraw. P"}`}
        disabled={false}
        onClick={() => {
          withdraw({
            variables: {
              amount: withdrawAmount,
            },
          });
        }}
      ></Button>
    </div>
  );
};

export default PoolWithdrawal;
