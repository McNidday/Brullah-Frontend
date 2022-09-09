import YouTube from "react-youtube";
import cn from "classnames";
import styles from "./styles.module.scss";

const HomeCommunitySlide = () => {
  return (
    <section>
      <div className={cn(styles.container)}>
        <YouTube
          videoId={"zdRYP2azu2U"}
          className={cn(styles.youtube)}
          iframeClassName={cn(styles.iframe)}
        ></YouTube>
      </div>
      <div></div>
    </section>
  );
};

export default HomeCommunitySlide;
