import Image from "next/image";
import styles from "./styles.module.scss";
import cn from "classnames";

interface Props {
  hover: boolean;
  activeLink: string;
  inactiveLink: string;
  alt: string;
}

const Icon = (props: Props) => {
  return (
    <>
      <Image
        className={cn(props.hover ? styles.hideIcon : "")}
        src={props.inactiveLink}
        alt={props.alt}
        fill
      ></Image>
      <Image
        className={cn(!props.hover ? styles.hideIcon : "")}
        src={props.activeLink}
        alt={props.alt}
        fill
      ></Image>
    </>
  );
};

export default Icon;
