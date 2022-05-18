import { gql } from "@apollo/client";
import cn from "classnames";
import { useState } from "react";
import DashboardMoneyButtons, {
  DashboardMoneyButtonsFragment,
} from "./buttons/DashboardMoneyButtons";
import DashboardProfileError from "./error/DashboardProfileError";
import CurrencyExchange from "./exchange/CurrencyExchange";
import PaypalDeposit from "./paypal/PaypalDeposit";
import DashboardUserProfile, {
  DashboardUserProfileFragment,
} from "./profile/DashboardUserProfile";
import styles from "./styles.module.scss";
import DashboardProfileSuccess from "./success/DashboardProfileSuccess";

interface Props {
  refreshUser: () => void;
  user: any;
}

const DashboardProfile = ({ user, refreshUser }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<
    string | JSX.Element | null
  >(null);
  const [overflowTab, setOverflowTab] = useState<string | null>(null);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <CurrencyExchange
          overflowTab={overflowTab}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
        ></CurrencyExchange>
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
          refreshUser={refreshUser}
          overflowTab={overflowTab}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
          setSuccessMessage={(val: string | JSX.Element | null) =>
            setSuccessMessage(val)
          }
          setError={(val: string) => setError(val)}
        ></PaypalDeposit>
        <DashboardUserProfile user={user}></DashboardUserProfile>
        <DashboardMoneyButtons
          user={user}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
        ></DashboardMoneyButtons>
      </div>
    </div>
  );
};

export const DashboardProfileFragment = gql`
  fragment DashboardProfile_User on User {
    ...DashboardUserProfile_User
    ...DashboardMoneyButtons_User
  }
  ${DashboardUserProfileFragment}
  ${DashboardMoneyButtonsFragment}
`;

export default DashboardProfile;
