import cn from "classnames";
import styles from "./styles.module.scss";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalButtonWrapper from "./wrapper/PaypalButtonWrapper";

interface Props {
  activeCurrency: string;
  setPaypalScriptState: Function;
  depositAmount: number;
  setError: (message: string) => void;
  setSuccessMessage: (message: string | JSX.Element) => void;
  refreshUser: () => void;
}

const PaypalButton = ({
  activeCurrency,
  setPaypalScriptState,
  depositAmount,
  setError,
  setSuccessMessage,
  refreshUser,
}: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div id="paypal-button">
        <PayPalScriptProvider
          options={{
            "client-id": process.env.PAYPAL_CLIENT_ID!,
            currency: activeCurrency,
          }}
        >
          <PaypalButtonWrapper
            refreshUser={refreshUser}
            setSuccessMessage={setSuccessMessage}
            setError={setError}
            depositAmount={depositAmount}
            activeCurrency={activeCurrency}
            setPaypalScriptState={setPaypalScriptState}
          ></PaypalButtonWrapper>
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PaypalButton;
