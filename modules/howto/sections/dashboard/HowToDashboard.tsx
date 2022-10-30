import cn from "classnames";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";

const HowToDashboard = () => {
  return (
    <section className={cn(styles.section)}>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <h3>The dashboard, where all the majic happens</h3>
          <div>
            <Swiper
              scrollbar={{ draggable: true }}
              direction={"vertical"}
              slidesPerView={"auto"}
              freeMode={true}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel]}
              className={cn("mySwiper", styles.swiper)}
            >
              <SwiperSlide>
                <section>
                  <h4>Actual Mullah</h4>
                  <p>
                    This is the amount of cash you have in your brullah account.
                    In order to deposit some amount into brullah, just click on
                    the deposit icon below the Actual Mullah header. Same goes
                    for any withdrawals.
                  </p>
                  <div className={cn(styles.checkersPlayContainer)}>
                    <div className={cn(styles.checkersPlay)}>
                      <Image
                        src={`/images/Dashboard.png`}
                        alt={`Dashboard brullah page`}
                        fill
                      ></Image>
                    </div>
                  </div>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section>
                  <h4>Brullah Coins</h4>
                  <p>
                    This is the InGame currency. Actual cash is not used ingame,
                    due to security concerns. You can convert the actual mullah
                    to Brullah Coins (BRC) and back. It&apos;s free.
                  </p>
                </section>
              </SwiperSlide>
            </Swiper>
          </div>
        </li>
      </ul>
      <h5>HAPPY MULLAH MAKING 🎉</h5>
    </section>
  );
};

export default HowToDashboard;
