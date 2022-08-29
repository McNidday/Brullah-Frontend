import classNames from "classnames";
import Image from "next/image";
import CircularLoading from "../../../../CricularLoad/CircularLoading";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const TopNavigationRightLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div>
        <div className={cn(styles.profileImage)}>
          <Image src="/icons/person/inactive.svg" layout="fill"></Image>
        </div>
        <div>
          <CircularLoading></CircularLoading>
        </div>
      </div>
    </div>
  );
};

export default TopNavigationRightLoading;
