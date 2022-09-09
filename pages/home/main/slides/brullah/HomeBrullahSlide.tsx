import cn from "classnames";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

const HomeBrullahSlide = () => {
  return (
    <section className={cn(styles.brullah)}>
      <div>
        <h1 data-swiper-parallax="-2000" data-swiper-parallax-duration="600">
          Brullah
        </h1>
        <h2 data-swiper-parallax="-2000" data-swiper-parallax-duration="1200">
          A brain with mullah is worth two jobs in the bush.
        </h2>
        <h3 data-swiper-parallax="-2000" data-swiper-parallax-duration="1800">
          Make money playing checkers and other online games created by brullah.
        </h3>
        <div data-swiper-parallax="-2000" data-swiper-parallax-duration="2400">
          <Link href={`/user/signup`}>
            <a>Get Started</a>
          </Link>
        </div>
      </div>
      <div>
        <div data-swiper-parallax-y="2000" data-swiper-parallax-duration="3000">
          <Image src={"/images/smartmockup.png"} layout="fill" priority></Image>
        </div>
      </div>
    </section>
  );
};

export default HomeBrullahSlide;
