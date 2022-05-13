import cn from "classnames";
import DahboardButtonsDefault from "./default/DahboardButtonsDefault";
import styles from "./styles.module.scss";

const DahboardMoneyButtons = () => {
  return (
    <div className={cn(styles.moneyButtons)}>
      <DahboardButtonsDefault></DahboardButtonsDefault>
    </div>
  );
};

export default DahboardMoneyButtons;
