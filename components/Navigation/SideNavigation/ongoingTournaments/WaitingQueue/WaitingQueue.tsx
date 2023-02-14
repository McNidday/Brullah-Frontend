import classNames from "classnames";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { decodeBlurHash } from "../../../../../functions/helpers";
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
      if (DateTime.now() >= DateTime.fromISO(timeToMatch)) {
        setCountDown(">>>");
        clearInterval(interval);
      } else {
        setCountDown(DateTime.fromISO(timeToMatch).diffNow());
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [timeToMatch]);

  return (
    <li className={cn(styles.container)}>
      <div>
        <Image
          fill
          src={tournament.information.thumbnail.image}
          alt={`Tournament ${tournament.information.name}`}
          placeholder="blur"
          blurDataURL={decodeBlurHash(
            tournament.information.thumbnail.blurhash,
            65,
            40
          )}
        ></Image>
      </div>
      <div>{tournament.information.name}</div>
      <Link href={`/tournament/track?id=${tournament.id}`}>{countDown}</Link>
    </li>
  );
};

export default WaitingQueue;
