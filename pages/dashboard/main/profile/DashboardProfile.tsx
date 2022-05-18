import cn from "classnames";
import { useState } from "react";
import DahboardMoneyButtons from "./buttons/DahboardMoneyButtons";
import DashboardProfileError from "./error/DashboardProfileError";
import PaypalDeposit from "./paypal/PaypalDeposit";
import DashboardUserProfile from "./profile/DashboardUserProfile";
import styles from "./styles.module.scss";
import DashboardProfileSuccess from "./success/DashboardProfileSuccess";

const DashboardProfile = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<
    string | JSX.Element | null
  >(null);
  const [overflowTab, setOverflowTab] = useState<string | null>(null);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <DashboardProfileError
          error={error}
          setError={(val: string | null) => setError(val)}
        ></DashboardProfileError>
        <DashboardProfileSuccess
          successMessage={successMessage}
          setSuccessMessage={(val: string | JSX.Element | null) =>
            setSuccessMessage(val)
          }
        ></DashboardProfileSuccess>
        <PaypalDeposit
          overflowTab={overflowTab}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
          setSuccessMessage={(val: string | JSX.Element | null) =>
            setSuccessMessage(val)
          }
          setError={(val: string) => setError(val)}
        ></PaypalDeposit>
        <DashboardUserProfile></DashboardUserProfile>
        <DahboardMoneyButtons
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
        ></DahboardMoneyButtons>
      </div>
    </div>
  );
};

export default DashboardProfile;
