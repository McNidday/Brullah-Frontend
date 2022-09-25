import cn from "classnames";
import { EffectCoverflow, Pagination, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

const HomeFeaturesSlide = () => {
  return (
    <section className={cn(styles.container)}>
      <div data-swiper-parallax="-2000" data-swiper-parallax-duration="600">
        <h2>Loaded with features you will absolutely love 💝</h2>
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
                <h3>Play Games 🕹️</h3>
                <p>
                  Have fun & make mullah playing checkers 3d and the different
                  modes available. Brullah is working on more games, you can
                  even drop your idea within our community.
                </p>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section>
                <h3>Tournaments 🥷</h3>
                <p>
                  One on one games not giving you enough... Why not join a
                  tournament and fripple your earnings. Yea i said{" "}
                  <strong>fripple</strong>.
                </p>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section>
                <h3>Compensation 💰</h3>
                <p>
                  Create contribution tournaments and earn creator compensation.
                  Creator compensation is rewarded depending on the number of
                  people who join your tournament.
                </p>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section>
                <h3>Friends 🎭</h3>
                <p>
                  Make friends while gaming. Chat features for friendly
                  connection. Keep taking away their mullah with ego-boost mode
                  after befriending them.
                </p>
              </section>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesSlide;
