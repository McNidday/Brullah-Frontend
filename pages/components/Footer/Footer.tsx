import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={classNames(styles.footer)}>
      <p>B.V: 2.0.0</p>
      <Link href={"/"}>
        <p>@copyright 2018: nidday/brullah 🏠</p>
      </Link>
      <div className={classNames(styles.socialIcons)}>
        <div>
          <Link href={`${process.env.YOUTUBE}`}>
            <a target="_blank">
              <Image src={`/icons/youtube/default_2.svg`} layout="fill"></Image>
            </a>
          </Link>
        </div>
        <div>
          <Link href={`/howto`}>
            <a target="_blank">
              <Image
                src={`/icons/helping_hand/default.svg`}
                layout="fill"
              ></Image>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
