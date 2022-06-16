import classNames from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../../../Button/Button";
import { decodeBlurHash } from "../../../../functions/helpers";
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

const DqTournaments = ({ tournament }: Props) => {
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
        text="dq :("
        disabled={false}
        link={`/track?id=${tournament.id}`}
      ></Button>
    </li>
  );
};

export default DqTournaments;
