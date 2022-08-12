import classNames from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../functions/helpers";
import Button from "../../../Button/Button";
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

const ReadyToPlay = ({ tournament }: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image
          src={tournament.information.thumbnail.image}
          layout="fill"
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
        text="play"
        disabled={false}
        link={`/tournament/track?id=${tournament.id}`}
      ></Button>
    </li>
  );
};

export default ReadyToPlay;
