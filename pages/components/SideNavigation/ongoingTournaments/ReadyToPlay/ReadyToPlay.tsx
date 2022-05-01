import classNames from "classnames";
import Image from "next/image";
import Button from "../../../Button/Button";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  information: { name: string; thumbnail: string };
  startUnix: number;
}
const ReadyToPlay = (props: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image src="/icons/trophy.jpg" layout="fill"></Image>
      </div>
      <div>Donald du...</div>
      <Button text="play" disabled={false}></Button>
    </li>
  );
};

export default ReadyToPlay;
