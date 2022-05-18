import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import cn from "classnames";
import Logo from "../../../../../../components/Logo/Logo";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import client from "../../../../../../components/Apollo/Client";
import { gql } from "@apollo/client";
import dinero from "dinero.js";

interface Props {
  activeCurrency: string;
  setPaypalScriptState: Function;
  depositAmount: number;
  setError: (message: string) => void;
  setSuccessMessage: (message: string | JSX.Element) => void;
}

let amount = 0;

const PaypalButtonWrapper = ({
  activeCurrency,
  setPaypalScriptState,
  depositAmount,
  setError,
  setSuccessMessage,
}: Props) => {
  const [{ options, isPending, isResolved, isRejected }, dispatch] =
    usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: activeCurrency,
      },
    });
  }, [activeCurrency]);

  useEffect(() => {
    if (isPending) {
      setPaypalScriptState("pending");
    }
    if (isResolved) {
      setPaypalScriptState("resolved");
    }
    if (isRejected) {
      setPaypalScriptState("rejected");
    }
  }, [isPending, isResolved, isRejected]);

  useEffect(() => {
    amount = depositAmount * 100;
  }, [depositAmount]);

  return (
    <>
      <div className={cn(styles.loader, isPending ? styles.loading : "")}>
        <div>
          <Logo
            thinking={true}
            text={true}
            image={{ width: "50px", height: "50px" }}
            container={{ width: "100px", height: "50px" }}
          ></Logo>
        </div>
      </div>
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "gold",
          tagline: true,
        }}
        createOrder={async () => {
          const response = await client.mutate({
            mutation: gql`mutation PaypalDepositOrder { 
              paypalDepositOrder(amount: ${amount}, currency: "${activeCurrency}") { 
                order_id
               }
            }`,
          });
          return response.data.paypalDepositOrder.order_id;
        }}
        onApprove={async (data) => {
          const response = await client.mutate({
            mutation: gql`
              mutation CapturePaypalDepositOrder {
                capturePaypalDepositOrder(orderId: "${data.orderID}") {
                  payer {
                    identity {
                      arena_name
                    }
                  }
                  deposit_final_amount {
                    value
                    currency
                  }
                }
              }
            `,
          });

          const deposited = dinero({
            amount:
              response.data.capturePaypalDepositOrder.deposit_final_amount
                .value,
            currency:
              response.data.capturePaypalDepositOrder.deposit_final_amount
                .currency,
          });

          setSuccessMessage(
            <>
              Transaction completed successfully{" "}
              {
                response.data.capturePaypalDepositOrder.payer.identity
                  .arena_name
              }
              . Deposited <strong>{deposited.toFormat()}</strong> to your
              brullah account. Navigate to brullah coins tab and get your game
              on!
            </>
          );
        }}
        onCancel={async () => {
          setError(
            "You cancelled the transaction. If you experienced any error, please contact brullah."
          );
        }}
        onError={async () => {
          setError(
            "Transaction failed. Please check your internet connection and try again."
          );
        }}
      ></PayPalButtons>
    </>
  );
};

export default PaypalButtonWrapper;
