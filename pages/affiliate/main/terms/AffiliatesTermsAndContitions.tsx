import cn from "classnames";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../../../components/Button/Button";
import styles from "./styles.module.scss";

interface Props {
  agree: () => void;
}

const AffiliatesTermsAndContitions = ({ agree }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.parallaxBg)}></div>
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
          <h1>Terms of service</h1>
          <h2>Who is a brullah affiliate</h2>
          <p>
            One who has been chosen by brullah admins to market brullah products
            on their behalf. A uniqe link and code will be give to you, in order
            to manage your marketing antiques.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>Your job as an affiliate</h2>
          <p>
            This is simple, get to generate as much traffic as you can to
            brullah, using your uniq link or code. When a person uses your link
            to signup, the code remains valid in their browser for 1 month stat.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>Our contract with you</h2>
          <p>
            Every signup using your link or code will automatically generate a
            contract between brullah and you. This contract will go on for a
            year. As per the contract, for every signup using your link or code,
            the affiliate is entitled to 50% of the 4% brullah takes from the
            deposit, for every deposit made by the signup.
          </p>
        </SwiperSlide>
      </Swiper>
      <p>By continuing, you agree to the terms and conditions</p>
      <div className={cn(styles.buttons)}>
        <Button
          text="I Agree"
          disabled={false}
          onClick={() => agree()}
        ></Button>
      </div>
    </div>
  );
};

export default AffiliatesTermsAndContitions;
