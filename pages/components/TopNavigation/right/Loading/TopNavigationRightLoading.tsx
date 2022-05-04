import classNames from "classnames";
import Image from "next/image";
import Logo from "../../../Logo/Logo";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const TopNavigationRightLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div>
        <div className={cn(styles.profileImage)}>
          <Image src="/icons/person/person.svg" layout="fill"></Image>
        </div>
        <div>
          <Logo
            thinking={true}
            text={true}
            image={{ width: "50px", height: "50px" }}
            container={{ width: "110px", height: "40px" }}
          ></Logo>
        </div>
      </div>
    </div>
  );
};

export default TopNavigationRightLoading;
