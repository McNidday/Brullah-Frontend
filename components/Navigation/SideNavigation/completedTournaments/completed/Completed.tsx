import classNames from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../functions/helpers";
import Button from "../../../../Button/Button";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  id: string;
  information: {
    name: string;
    thumbnail: { image: string; blurhash: string };
  };
}

const Completed = ({ id, information }: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image
          fill
          src={information.thumbnail.image}
          alt={`Touenament ${information.name}`}
          placeholder="blur"
          blurDataURL={decodeBlurHash(information.thumbnail.blurhash, 65, 40)}
        ></Image>
      </div>
      <div>{information.name}</div>
      <Button
        text="recap"
        disabled={false}
        link={`/tournament/recap?id=${id}`}
      ></Button>
    </li>
  );
};

export default Completed;
