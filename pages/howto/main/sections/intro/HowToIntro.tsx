import cn from "classnames";
import styles from "./styles.module.scss";

const HowToIntro = () => {
  return (
    <section className={cn(styles.section)}>
      <div>
        <h1>Brullah</h1>
        <p>
          Brullah is a platform where brullah&apos;s can have fun and make money
          while doing it. Well how does it happen by playing games made by
          brullah of course. You can even make it a hustle if you are that good
          at the game.
        </p>
      </div>
    </section>
  );
};

export default HowToIntro;
