import cn from "classnames";
import DahboardMoneyButtons from "./buttons/DahboardMoneyButtons";
import PaypalDeposit from "./paypal/PaypalDeposit";
import DashboardUserProfile from "./profile/DashboardUserProfile";
import styles from "./styles.module.scss";

const DashboardProfile = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <PaypalDeposit></PaypalDeposit>
        <DashboardUserProfile></DashboardUserProfile>
        <DahboardMoneyButtons></DahboardMoneyButtons>
      </div>
    </div>
  );
};

export default DashboardProfile;
