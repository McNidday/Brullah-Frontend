import cn from "classnames";
import { useEffect } from "react";
import { useSwiper } from "swiper/react";
import styles from "./styles.module.scss";

const UpdateUserComplete = ({ data }: { data: undefined | any }) => {
  const swiper = useSwiper();
  useEffect(() => {
    if (data && data.updateUser) {
      swiper.slideTo(6);
    }
  }, [data, swiper]);

  return (
    <div className={cn(styles.container)}>
      {data && data.updateUser ? (
        <h3>
          Greate {data.updateUser.identity.arena_name}, your brullah account has
          been updated.
        </h3>
      ) : (
        <h3>Update your brullah account info.</h3>
      )}
    </div>
  );
};

export default UpdateUserComplete;
