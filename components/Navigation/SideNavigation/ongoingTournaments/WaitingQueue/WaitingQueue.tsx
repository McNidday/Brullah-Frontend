import classNames from "classnames";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { decodeBlurHash } from "../../../../../functions/helpers";
import { TournamentType } from "../../../../../types/tournament";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  matchTime: string;
  id: string;
  start_date: string;
  information: {
    name: string;
    thumbnail: {
      image: string;
      blurhash: string;
    };
  };
}

const WaitingQueue = ({ id, matchTime, information }: Props) => {
  const [countDown, setCountDown] = useState(">>>");

  useEffect(() => {
    const interval = setInterval(() => {
      if (DateTime.now() >= DateTime.fromISO(matchTime)) {
        setCountDown(">>>");
        clearInterval(interval);
      } else {
        setCountDown(
          DateTime.fromISO(matchTime).diffNow().toFormat("dd hh mm")
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [matchTime]);

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
      <Link href={`/tournament/track?id=${id}`}>{countDown}</Link>
    </li>
  );
};

export default WaitingQueue;
