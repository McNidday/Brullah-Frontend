import Image from "next/image";
import styles from "./styles.module.scss";
import cn from "classnames";

interface Props {
  hover: boolean;
  activeLink: string;
  inactiveLink: string;
}

const Icon = (props: Props) => {
  return (
    <>
      <Image
        className={cn(props.hover ? styles.hideIcon : "")}
        src={props.inactiveLink}
        layout="fill"
      ></Image>
      <Image
        className={cn(!props.hover ? styles.hideIcon : "")}
        src={props.activeLink}
        layout="fill"
      ></Image>
    </>
  );
};

export default Icon;
