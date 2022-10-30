import classNames from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../functions/helpers";
import Button from "../../../../Button/Button";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  tournament: {
    id: string;
    information: {
      name: string;
      thumbnail: { image: string; blurhash: string };
    };
  };
}

const Completed = ({ tournament }: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image
          fill
          src={tournament.information.thumbnail.image}
          alt={`Touenament ${tournament.information.name}`}
          placeholder="blur"
          blurDataURL={decodeBlurHash(
            tournament.information.thumbnail.blurhash,
            65,
            40
          )}
        ></Image>
      </div>
      <div>{tournament.information.name}</div>
      <Button
        text="recap"
        disabled={false}
        link={`/tournament/track/recap?id=${tournament.id}`}
      ></Button>
    </li>
  );
};

export default Completed;
