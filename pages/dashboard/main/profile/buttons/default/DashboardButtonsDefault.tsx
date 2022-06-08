import cn from "classnames";
import { useState } from "react";
import Icon from "../../../../../components/Icon/Icon";
import styles from "./styles.module.scss";
import dinero from "dinero.js";
import { gql } from "@apollo/client";

interface Props {
  setOverflowTab: (tab: string | null) => void;
  user: {
    finance: {
      cash_balance: {
        value: number;
        currency: dinero.Currency;
      };
      brc_balance: {
        value: number;
        currency: dinero.Currency;
      };
    };
  };
}

const DashboardButtonsDefault = ({ setOverflowTab, user }: Props) => {
  const [exchangeHover, setExchanheHover] = useState<boolean>(false);
  const [withdrawHover, setWithdrawHover] = useState<boolean>(false);
  const [depositHover, setDepositHover] = useState<boolean>(false);

  return (
    <>
      <div>
        <div>
          <h2 className={cn(styles.brullahCoinsTitle)}>Brullah Coins (BRC)</h2>
          <div>
            <div>
              <h3>
                {dinero({
                  amount: user.finance.brc_balance.value,
                  currency: user.finance.brc_balance.currency,
                }).toFormat("0,0.00")}
              </h3>
              <div
                onMouseEnter={() => setExchanheHover(true)}
                onMouseLeave={() => setExchanheHover(false)}
                onClick={() => setOverflowTab("exchange")}
              >
                <Icon
                  hover={exchangeHover}
                  activeLink="/icons/exchange/active.svg"
                  inactiveLink="/icons/exchange/inactive.svg"
                ></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className={cn(styles.actualMullahTitle)}>Actual Mullah</h2>
          <div>
            <div>
              <h3>
                {dinero({
                  amount: user.finance.cash_balance.value,
                  currency: user.finance.cash_balance.currency,
                }).toFormat("0,0.00")}
              </h3>
              <div
                onMouseEnter={() => setWithdrawHover(true)}
                onMouseLeave={() => setWithdrawHover(false)}
                onClick={() => setOverflowTab("payout")}
              >
                <Icon
                  hover={withdrawHover}
                  activeLink="/icons/withdraw/active.svg"
                  inactiveLink="/icons/withdraw/inactive.svg"
                ></Icon>
              </div>
              <div
                onMouseEnter={() => setDepositHover(true)}
                onMouseLeave={() => setDepositHover(false)}
                onClick={() => setOverflowTab("deposit")}
              >
                <Icon
                  hover={depositHover}
                  activeLink="/icons/deposit/active.svg"
                  inactiveLink="/icons/deposit/inactive.svg"
                ></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DashboardButtonsDefaultFragment = gql`
  fragment DashboardButtonsDefault_User on User {
    finance {
      cash_balance {
        value
        currency
      }
      brc_balance {
        value
        currency
      }
    }
  }
`;

export default DashboardButtonsDefault;