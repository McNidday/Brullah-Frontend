import cn from "classnames";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";

const HowToGames = () => {
  return (
    <section className={cn(styles.section)}>
      <h2>Games</h2>
      <ul>
        <li>
          <h3>Checkers 3d</h3>
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
                  <h4>Skill Mode</h4>
                  <p>
                    Skill mode for the checkers 3d game is as it sounds. You
                    play just for fun with others as you increase your skill.
                    Open the game by navigating to play dashboard and then click
                    on play on the checkers 3d card (currently only one game
                    😪), like so.
                  </p>
                  <div className={cn(styles.checkersCard)}>
                    <Image
                      width={"198px"}
                      height={"248px"}
                      src={`/images/PlayCard.png`}
                      alt={`Play checkers 3d game card`}
                    ></Image>
                  </div>
                  <p>
                    Click on the skill button to initiate a search on an
                    opponent, you can cancel the search if you like. Once an
                    opponent is found the game will begin. If you encounter any
                    error from the game feel free to reload as the game will
                    just continue where you left off. When you leave the page
                    you have 2 minutes to get back or else the opponent will be
                    awarded the win and vice versa.
                  </p>
                  <div className={cn(styles.checkersPlayContainer)}>
                    <div className={cn(styles.checkersPlay)}>
                      <Image
                        src={`/images/CheckersGame.png`}
                        alt={`Play checkers 3d game card`}
                        layout={"fill"}
                      ></Image>
                    </div>
                  </div>
                  <p>
                    In this mode, if you feel like the game will never end or
                    just want to end the game in a peaceful mode you can declare
                    a draw using this emoji (🤝) which is directly on top of the
                    messaging tab. If the player accepts the handshake then the
                    match will be terminated on a good standing and with equal
                    xp added to both 💃
                  </p>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section>
                  <h4>Rogue Mode</h4>
                  <p>
                    Rogue mode contains all the features that skill mode has.
                    The only difference is that you place your BRC on the line.
                    You can only place upto 5 BRC as max and 1 arena coin for
                    the least. You can look for a rogue match by clicking on the
                    rogue button. Remember choose your BRC before search.
                  </p>
                  <p>
                    You can also declare a draw in a rogue mode. It works the
                    same way as in the skill mode. You get back everything plus
                    more xp. Don&apos;t just bail from a match, you will loose
                    not all but some of your BRC to your opponent. If both of
                    you bail brullah take 1 BRC to discourage bails and the rest
                    returned to the players 🧑‍⚖️
                  </p>
                  <h4>Here is the coin mapping for rogue bails:</h4>
                  <ul>
                    <li>1 BRC: You get back 0 BRC: Opponent gets 1 BRC</li>
                    <li>2 BRC: You get back 1 BRC: Opponent gets 1 BRC</li>
                    <li>3 BRC: You get back 1 BRC: Opponent gets 2 BRC</li>
                    <li>4 BRC: You get back 2 BRC: Opponent gets 2 BRC</li>
                    <li>5 BRC: You get back 2 BRC: Opponent gets 3 BRC</li>
                  </ul>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section>
                  <h4>Tournament Mode</h4>
                  <p>
                    Tournament mode actually contains all the features of the
                    previous modes have but can only be accessed after joining a
                    checkers 3d tournament. After joining a tournament you will
                    be able to see the status on the side navigation. You can
                    also withdraw from the tournament if you like.
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

export default HowToGames;
