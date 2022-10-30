import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { decodeBlurHash } from "../../../../../functions/helpers";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  information: { name: string; thumbnail: { image: string; blurhash: string } };
  start_date: number;
}

const NotStarted = ({ information, start_date }: Props) => {
  const [countDown, setCountDown] = useState(">>>");

  useEffect(() => {
    const interval = setInterval(() => {
      if (moment().isSameOrAfter(moment.unix(start_date))) {
        setCountDown(">>>");
        clearInterval(interval);
        // Refetch
      } else {
        setCountDown(moment().to(moment.unix(start_date)));
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
