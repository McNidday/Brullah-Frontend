import cn from "classnames";
import { useState } from "react";
import Icon from "../../../../../components/Icon/Icon";
import styles from "./styles.module.scss";

const DahboardButtonsDefault = () => {
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
              <h3>1200.00</h3>
              <div
                onMouseEnter={() => setExchanheHover(true)}
                onMouseLeave={() => setExchanheHover(false)}
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
              <h3>1200.00</h3>
              <div
                onMouseEnter={() => setWithdrawHover(true)}
                onMouseLeave={() => setWithdrawHover(false)}
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

export default DahboardButtonsDefault;
