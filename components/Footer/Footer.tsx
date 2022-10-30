import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={classNames(styles.footer)}>
      <p>B.V: 2.0.0</p>
      <Link href={"/"} passHref>
        @2020: nidday/brullah 🏠
      </Link>
      <div className={classNames(styles.socialIcons)}>
        <div>
          <Link href={`${process.env.YOUTUBE}`} passHref>
            <Image
              src={`/icons/youtube/default_2.svg`}
              alt="Brullah Youtube Channel"
              fill
            ></Image>
          </Link>
        </div>
        <div>
          <Link href={`/howto`}>
            <Image
              src={`/icons/helping_hand/default.svg`}
              alt="Helping Hand"
              fill
            ></Image>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
