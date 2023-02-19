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

const ReadyToPlay = ({ id, information }: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Image
          fill
          src={information.thumbnail.image}
          alt={`Tournament ${information.name}`}
          placeholder="blur"
          blurDataURL={decodeBlurHash(information.thumbnail.blurhash, 65, 40)}
        ></Image>
      </div>
      <div>{information.name}</div>
      <Button
        text="play"
        disabled={false}
        link={`/tournament/track?id=${id}`}
      ></Button>
    </li>
  );
};

export default ReadyToPlay;
