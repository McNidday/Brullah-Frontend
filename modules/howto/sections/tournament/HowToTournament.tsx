import cn from "classnames";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";

const HowToTournament = () => {
  return (
    <section className={cn(styles.section)}>
      <h2>Tournaments</h2>
      <ul>
        <li>
          <h3>You can create or join tournaments in brullah</h3>
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
                  <h4>Creating Tournaments</h4>
                  <p>
                    Creating tournaments is a breeze brullah. For this type of
                    feature you need to have signed up and logged in to your
                    brullah account. Remember to confirm your email address as
                    this feature won&apos;t be available to you.
                  </p>
                  <p>
                    Navigate to the dashboard and click on the my tournaments
                    link. From there you will be able to see the create
                    tournament link, which will direct you to the craeate
                    tournament dashboard.
                  </p>
                  <div className={cn(styles.checkersPlayContainer)}>
                    <div className={cn(styles.checkersPlay)}>
                      <Image
                        src={`/images/CreateTournament.png`}
                        alt={`Create tournament brullah page`}
                        layout={"fill"}
                      ></Image>
                    </div>
                  </div>
                  <p>
                    Only single elimination brackets is supported. Depending on
                    the number of participants who joined. Brullah will create
                    the brackets for you, like below.
                  </p>
                  <div className={cn(styles.checkersPlayContainer)}>
                    <div className={cn(styles.checkersPlay)}>
                      <Image
                        src={`/images/EditTournament.png`}
                        alt={`Edit tournament brullah page`}
                        layout={"fill"}
                      ></Image>
                    </div>
                  </div>
                  <p>
                    A single person joined the tournament, so i get the brackets
                    as above. Clicking on the pencil icon, on the first bracket
                    will enable you to add a player to that bracket. The popup
                    window also alows you to configure the tournament time.
                  </p>
                  <div className={cn(styles.checkersPlayContainer)}>
                    <div className={cn(styles.checkersPlay)}>
                      <Image
                        src={`/images/EditTournamentPopUp.png`}
                        alt={`Edit tournament brullah page`}
                        layout={"fill"}
                      ></Image>
                    </div>
                  </div>
                  <p>
                    You can also delete the tournaments you have created, from
                    the my tournaments dashboard and also manage them.
                  </p>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section>
                  <h4>Joining Tournaments</h4>
                  <p>
                    Joining tournaments doesn&apos;t have much to it. Navigate
                    to the dashboard, click on tournaments link. A list of all
                    the availabe tournaments will show up and you can choose one
                    to join.
                  </p>
                  <p>
                    You can view your joined tournaments from the side
                    navigation. When it&apos;s your time to play, you will
                    recieve an email and will also be shown on the side
                    navigation. You can also track your joined tournaments from
                    the side navigation.
                  </p>
                </section>
              </SwiperSlide>
            </Swiper>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default HowToTournament;
