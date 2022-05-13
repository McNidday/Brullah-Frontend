import cn from "classnames";
import Image from "next/image";
import Icon from "../../../../components/Icon/Icon";
import styles from "./styles.module.scss";

const DashboardUserProfile = () => {
  return (
    <div className={cn(styles.profile)}>
      <div>
        <Image src="/icons/duck.png" layout="fill"></Image>
      </div>
      <div>
        <h3>nidday</h3>
      </div>
      <div>
        <h3>joijdjou09u8</h3>
        <div>
          <Icon
            hover={false}
            activeLink="/icons/copy/active.svg"
            inactiveLink="/icons/copy/active.svg"
          ></Icon>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserProfile;
