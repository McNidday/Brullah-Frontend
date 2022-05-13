import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import "swiper/css/bundle";
import cd from "country-data";
import ReactCountryFlag from "react-country-flag";
import { EffectCoverflow } from "swiper";

interface Props {
  activeCurrency: string;
  setActiveCurrency: Function;
}
const PaypalCountries = ({ activeCurrency, setActiveCurrency }: Props) => {
  // List all the supported currencies
  const supportedCurrencies = [
    "USD",
    "AUD",
    "CAD",
    "HKD",
    "ILS",
    "JPY",
    "MXN",
    "TWD",
    "NZD",
    "PHP",
    "GBP",
    "RUB",
    "SGD",
    "CHF",
    "THB",
  ];

  return (
    <div className={cn(styles.countries)}>
      <Swiper
        effect="coverflow"
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 60,
          modifier: 1,
          slideShadows: true,
        }}
        slideToClickedSlide={true}
        modules={[EffectCoverflow]}
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={10}
        className={cn("mySwiper", styles.swiper)}
        direction={"horizontal"}
        noSwipingClass="swiper-no-swiping"
      >
        {supportedCurrencies.map((v) => {
          const country = cd.lookup.countries({ currencies: v })[0];
          return (
            <SwiperSlide key={v}>
              {({ isActive }) => {
                if (isActive) setActiveCurrency(v);
                return (
                  <div>
                    <ReactCountryFlag
                      className="emojiFlag"
                      countryCode={country.alpha2}
                      aria-label={country.name}
                      svg={true}
                    ></ReactCountryFlag>
                  </div>
                );
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PaypalCountries;
