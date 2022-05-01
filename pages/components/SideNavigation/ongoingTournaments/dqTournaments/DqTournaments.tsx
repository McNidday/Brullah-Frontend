import classNames from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../../../Button/Button";
const cn = classNames.bind(styles);

interface Props {
  information: { name: string; thumbnail: string };
  startUnix: number;
}

const DqTournaments = (props: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image src="/icons/trophy.jpg" layout="fill"></Image>
      </div>
      <div>Donald du...</div>
      <Button text="dq :(" disabled={true}></Button>
    </li>
  );
};

export default DqTournaments;
