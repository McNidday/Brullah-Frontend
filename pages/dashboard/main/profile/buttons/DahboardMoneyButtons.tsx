import cn from "classnames";
import DahboardButtonsDefault from "./default/DahboardButtonsDefault";
import styles from "./styles.module.scss";

interface Props {
  setOverflowTab: (tab: string | null) => void;
}

const DahboardMoneyButtons = ({ setOverflowTab }: Props) => {
  return (
    <div className={cn(styles.moneyButtons)}>
      <DahboardButtonsDefault
        setOverflowTab={setOverflowTab}
      ></DahboardButtonsDefault>
    </div>
  );
};

export default DahboardMoneyButtons;
