import { gql } from "@apollo/client";
import cn from "classnames";
import DashboardButtonsDefault, {
  DashboardButtonsDefaultFragment,
} from "./default/DashboardButtonsDefault";
import styles from "./styles.module.scss";

interface Props {
  setOverflowTab: (tab: string | null) => void;
  user: any;
}

const DashboardMoneyButtons = ({ setOverflowTab, user }: Props) => {
  return (
    <div className={cn(styles.moneyButtons)}>
      <DashboardButtonsDefault
        user={user}
        setOverflowTab={setOverflowTab}
      ></DashboardButtonsDefault>
    </div>
  );
};

export const DashboardMoneyButtonsFragment = gql`
  fragment DashboardMoneyButtons_User on User {
    ...DashboardButtonsDefault_User
  }
  ${DashboardButtonsDefaultFragment}
`;

export default DashboardMoneyButtons;
