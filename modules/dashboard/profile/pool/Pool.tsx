import cn from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import Icon from "../../../../components/Icon/Icon";
import PoolTitle from "./title/PoolTitle";
import PoolAmount from "./amount/PoolAmount";
import PoolWithdrawal from "./withdraw/PoolWithdrawal";

interface Props {
  overflowTab: string | null;
  refreshUser: () => void;
  setOverflowTab: (tab: string | null) => void;
}

const Pool = ({ overflowTab, setOverflowTab, refreshUser }: Props) => {
  const [amountSwitch, setAmountSwitch] = useState(0);
  const [navBackHover, setNavBackHover] = useState(false);
  const containerRef = useRef(null);
  const navBackRef = useRef(null);

  const refetchPoolAmount = () => {
    setAmountSwitch(amountSwitch === 1 ? 0 : 1);
  };

  const hidePool = () => {
    anime({
      targets: containerRef.current,
      translateX: "-105%",
      duration: 1000,
    });
  };

  const showPool = () => {
    anime({
      targets: containerRef.current,
      translateX: "0px",
      duration: 1000,
    });
  };

  useEffect(() => {
    anime({
      targets: navBackRef.current,
      translateX: "-5px",
      direction: "alternate",
      delay: 1000,
      loop: true,
    });
  }, []);

  useEffect(() => {
    if (overflowTab === "pool") {
      showPool();
    }
  }, [overflowTab]);

  return (
    <div ref={containerRef} className={cn(styles.container)}>
      <div
        ref={navBackRef}
        className={cn(styles.navBack)}
        onMouseEnter={() => setNavBackHover(true)}
        onMouseLeave={() => setNavBackHover(false)}
        onClick={() => {
          hidePool();
          setOverflowTab(null);
        }}
      >
        <Icon
          activeLink="/icons/beforeNav/active.svg"
          inactiveLink="/icons/beforeNav/inactive.svg"
          hover={navBackHover}
          alt={"Previous Card Icon"}
        ></Icon>
      </div>
      <PoolTitle></PoolTitle>
      <PoolAmount amountSwitch={amountSwitch}></PoolAmount>
      <PoolWithdrawal
        refreshUser={refreshUser}
        refetchPoolAmount={refetchPoolAmount}
      ></PoolWithdrawal>
    </div>
  );
};

export default Pool;
