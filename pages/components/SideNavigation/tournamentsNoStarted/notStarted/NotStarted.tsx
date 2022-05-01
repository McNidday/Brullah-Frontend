import classNames from "classnames";
import Image from "next/image";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  information: { name: string; thumbnail: string };
  startUnix: number;
}

const NotStarted = (props: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image src="/icons/trophy.jpg" layout="fill"></Image>
      </div>
      <div>Donald du...</div>
      <div>10:00:09</div>
    </li>
  );
};

export default NotStarted;
