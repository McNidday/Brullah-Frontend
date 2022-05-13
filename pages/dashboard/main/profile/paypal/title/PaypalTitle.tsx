import cn from "classnames";
import styles from "./styles.module.scss";

const PaypalTitle = () => {
  return (
    <div className={cn(styles.title)}>
      <h3>Enter the amount of money to deposit to your brullah account</h3>
    </div>
  );
};

export default PaypalTitle;
