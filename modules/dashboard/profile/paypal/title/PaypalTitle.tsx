import cn from "classnames";
import styles from "./styles.module.scss";

const PaypalTitle = () => {
  return (
    <div className={cn(styles.title)}>
      <h4>Enter the amount of money to deposit to your brullah account</h4>
    </div>
  );
};

export default PaypalTitle;
