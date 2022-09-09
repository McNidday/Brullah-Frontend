import cn from "classnames";
import { EffectCoverflow, Pagination, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

const HomeAboutSlide = () => {
  return (
    <section className={cn(styles.container)}>
      <div data-swiper-parallax="-2000" data-swiper-parallax-duration="600">
        <h2>
          What make <strong>Brullah</strong> what it is. I meant awesome 😎
        </h2>
      </div>
      <div data-swiper-parallax="-2000" data-swiper-parallax-duration="1200">
        <div>
          <Swiper
            coverflowEffect={{
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
            }}
            parallax
            effect="coverflow"
            spaceBetween={25}
            slidesPerView={"auto"}
            centeredSlides={true}
            modules={[EffectCoverflow, Parallax, Pagination]}
            className={cn("mySwiper", styles.swiper)}
            direction={"horizontal"}
          >
            <SwiperSlide>
              <section>
                <h3>Intuitive 🍬</h3>
                <p>
                  It's <strong>unique</strong> (Built from scratch, designed
                  with you in mind). Sweet animations (Admit it, you loved it
                  loading this page). Simply made with the best (▀̿Ĺ̯▀̿ ̿).
                </p>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section>
                <h3>Secure 🔐</h3>
                <p>
                  Brullah runs on a <strong>secure https protocal</strong>.
                  Ingame currency called Brullah Coins (BRC) is also used to
                  prevent fraud and confusion. You can always convert it to real
                  currency and vice-versa. It's free (✿◡‿◡).
                </p>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section>
                <h3>Easy 🤌🧠</h3>
                <p>
                  Brullah, is easy to navigate. It also has a dedicated{" "}
                  <strong>how-to</strong> page incase you don't understand
                  anything. Their is also a dedicated <strong>community</strong>{" "}
                  that you can join and get help, if need be ༼ つ ◕_◕ ༽つ.
                </p>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section>
                <h3>Trustworthy 😊</h3>
                <p>
                  Money is an essential part of brullah. We use{" "}
                  <strong>paypal</strong> to process every payout/payment and
                  incase of any abnomarlity, you can always raise a dispute
                  ヾ(⌐■_■)ノ♪.
                </p>
              </section>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSlide;
