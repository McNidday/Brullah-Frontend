import classNames from "classnames";
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { decodeBlurHash } from "../../../../../functions/helpers";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  information: { name: string; thumbnail: { image: string; blurhash: string } };
  start_date: string;
}

const NotStarted = ({ information, start_date }: Props) => {
  const [countDown, setCountDown] = useState(">>>");

  useEffect(() => {
    const interval = setInterval(() => {
      if (DateTime.now() >= DateTime.fromISO(start_date)) {
        setCountDown(">>>");
        clearInterval(interval);
        // Refetch
      } else {
        setCountDown(
          DateTime.fromISO(start_date).diffNow().toFormat("dd hh mm")
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [start_date]);

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
      <div>{countDown}</div>
    </li>
  );
};

export default NotStarted;
