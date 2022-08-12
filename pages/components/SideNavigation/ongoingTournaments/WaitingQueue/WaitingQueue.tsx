import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { decodeBlurHash } from "../../../../functions/helpers";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  timeToMatch: number;
  tournament: {
    id: string;
    information: {
      name: string;
      thumbnail: { image: string; blurhash: string };
    };
  };
}

const WaitingQueue = ({ tournament, timeToMatch }: Props) => {
  const [countDown, setCountDown] = useState(">>>");

  useEffect(() => {
    const interval = setInterval(() => {
      if (moment().isSameOrAfter(moment.unix(timeToMatch))) {
        setCountDown(">>>");
        clearInterval(interval);
      } else {
        setCountDown(moment().to(moment.unix(timeToMatch)));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [timeToMatch]);

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
      <Link href={`/tournament/track?id=${tournament.id}`}>
        <a>{countDown}</a>
      </Link>
    </li>
  );
};

export default WaitingQueue;
