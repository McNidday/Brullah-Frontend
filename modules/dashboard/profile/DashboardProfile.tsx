import { gql } from "@apollo/client";
import cn from "classnames";
import { useState, useEffect } from "react";
import DashboardMoneyButtons, {
  DashboardMoneyButtonsFragment,
} from "./buttons/DashboardMoneyButtons";
import DashboardProfileError from "./error/DashboardProfileError";
import CurrencyExchange from "./exchange/CurrencyExchange";
import PaypalPayouts from "./payout/PaypalPayouts";
import PaypalDeposit from "./paypal/PaypalDeposit";
import Pool from "./pool/Pool";
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
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<
    string | JSX.Element | null
  >(null);
  const [overflowTab, setOverflowTab] = useState<string | null>(null);

  useEffect(() => {
    const adminIndex = user.badges.findIndex((a: { status: string }) => {
      return a.status === "ADMIN";
    });
    if (adminIndex > -1) {
      setAdmin(true);
    }
  }, [user?.badges]);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <PaypalPayouts
          refreshUser={refreshUser}
          overflowTab={overflowTab}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
        ></PaypalPayouts>
        <CurrencyExchange
          refreshUser={refreshUser}
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
        <DashboardUserProfile
          user={user}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
        ></DashboardUserProfile>
        <DashboardMoneyButtons
          user={user}
          setOverflowTab={(val: string | null) => {
            setOverflowTab(val);
          }}
        ></DashboardMoneyButtons>
        {admin ? (
          <Pool
            refreshUser={refreshUser}
            overflowTab={overflowTab}
            setOverflowTab={(val: string | null) => {
              setOverflowTab(val);
            }}
          ></Pool>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export const DashboardProfileFragment = gql`
  fragment DashboardProfile_User on User {
    badges {
      status
    }
    ...DashboardUserProfile_User
    ...DashboardMoneyButtons_User
  }
  ${DashboardUserProfileFragment}
  ${DashboardMoneyButtonsFragment}
`;

export default DashboardProfile;
