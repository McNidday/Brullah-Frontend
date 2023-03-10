import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";

const HomeDiscoverSlide = () => {
  return (
    <section className={cn(styles.section)}>
      <div>
        <div>
          <Image
            src={`/icons/helping_hand/default.svg`}
            alt="Helping Hand Icon"
            fill
          ></Image>
        </div>
        <Link href={`/howto`}>
          Click This link to learn how to use brullah and more features 😎
        </Link>
      </div>
    </section>
  );
};

export default HomeDiscoverSlide;
