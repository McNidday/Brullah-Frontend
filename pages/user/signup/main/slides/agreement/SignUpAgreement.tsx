import cn from "classnames";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";

const SignUpAgreement = () => {
  const swiper = useSwiper();
  return (
    <div className={cn(styles.container)}>
      <Swiper
        scrollbar={{ draggable: true }}
        direction={"vertical"}
        slidesPerView={"auto"}
        freeMode={true}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className={cn("mySwiper", styles.swiper)}
        data-swiper-parallax="-300"
      >
        <SwiperSlide>
          <h1>Terms of service</h1>
          <h2>Your relationship with Brullah</h2>
          <p>
            These terms help define the relationship between you and Brullah.
            Broadly speaking, we give you permission to use our services if
            youagree to follow these terms, which reflects how Brullah's
            business works and how we earn money. Whwn we speak of "Brullah",
            "we", "us" and "our", we mean Brullah and its affiliates.
          </p>
          <h2>What you can expect from us</h2>
          <h3>Provide a broad range of useful services</h3>
          <p>
            We provide a broad range of services that are subject to these
            terms, including:
          </p>
          <ul>
            <li>game site</li>
            <li>tournament site</li>
            <li>management site</li>
          </ul>
          <p>
            Our services are designed to work together, making it easier for you
            to move from one activity to the next. For example, if you have a
            game tournament, clicking on the tournament address will direct you
            to the game site.
          </p>
          <h3>Develop, improve, and update Brullah services</h3>
          <p>
            We are constanlty developing new technologies and features to
            improve our services. For example, UI and Architecture design, to
            give you simultanious translations. As part of our continual
            improvement, we sometimes add or remove features and
            functionalities, increase or decrease limits to our services, and
            start offering new services or stop offering old services
          </p>
          <p>
            If we make material changes that negatively impact your use of our
            service or if we stop offering a service, we'll provide you with
            reasonable advance notice, except in urgent situations such as
            preventing abuse, responding to legal requirements, or addressing
            security and operability issues.
          </p>
          <h2>What we expect from you</h2>
          <h3>Follow these terms and service-pecific additional terms</h3>
          <p>
            The permission we give you to use our services continues as long as
            you comply with:
          </p>
          <ul>
            <li>
              <strong>these terms</strong>
            </li>
            <li>
              service-specific additional terms, which could, for example,
              include things like respecting others in in-game chats
            </li>
          </ul>
          <p>
            Although we give you permission to use our services, we retain any
            intellectual property rights we have in the services.
          </p>
          <h3>Respect others</h3>
          <p>
            We want to maintain a respectful environment for everyone, which
            means you must follow these basic rules of conduct:
          </p>
          <ul>
            <li>
              comply with applicable laws, including export control, sanctions,
              and human trafficking laws
            </li>
            <li>
              respect the rights of others, including privacy and intellectual
              property rights
            </li>
            <li>
              don't abuse or harm others or yourself (or threaten or encourage
              such abuse or harm) — for example, by misleading, defrauding,
              illegally impersonating, defaming, bullying, harassing, or
              stalking others
            </li>
            <li>
              don't abuse, harm, interfere with, or disrupt the services — for
              example, by accessing or using them in fraudulent or deceptive
              ways, introducing malware, or spamming, hacking, or bypassing our
              systems or protective measures.
            </li>
          </ul>
          <h3>Permission to use your content</h3>
          <p>
            Some of our services are designed to let you upload, submit, store,
            send, receive, or share your content. You have no obligation to
            provide any content to our services and you're free to choose the
            content that you want to provide. If you choose to upload or share
            content, please make sure you have the necessary rights to do so and
            that the content is lawful.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>How Brullah does business</h2>
          <h3>Deposits and Payouts help fund our products and services</h3>
          <p>
            Our mission is to make as many people as possible financially
            independent and give a chance at people in making this possible.
            It's why we make so many of our products, like tournaments,
            accessible and free of charge to everyone
          </p>
          <p>
            Deposits and payouts is what makes it possible to offer our products
            to everyone. Currently being the only source of funds for brullah.
          </p>
          <p>
            So how does it work? We make money taking a cut of 4% on every
            deposit or payout done at brullah.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>Using Brullah services</h2>
          <h3>Your Brullah account</h3>
          <p>
            You're responsible for what you do with your Brullah Account,
            including taking reasonable steps to keep your Brullah Account
            secure, and we encourage you to create a strong password.
          </p>
          <h3>Service-related communications</h3>
          <p>
            To provide you with our services, we sometimes send you service
            announcements and other information. If you choose to give us
            feedback, such as suggestions to improve our services, we may act on
            your feedback without obligation to you.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>Content in Brullah services</h2>
          <h3>Your content</h3>
          <p>
            Some of our services give you the opportunity to make your content
            publicly available — for example, you might post a tournament with
            your own picture or illustrations.
          </p>
          <p>
            If you think someone is infringing your intellectual property
            rights, you can send us notice of the infringement and we'll take
            appropriate action.
          </p>
          <h3>Brullah content</h3>
          <p>
            We retain any intellectual property rights that we have in our
            content. Don't remove, obscure, or alter any of our branding, logos,
            or legal notices. If you want to use our branding or logos, please
            contact us.
          </p>
          <h3>Other content</h3>
          <p>
            Finally, some of our services give you access to content that
            belongs to other people or organizations. You may not use this
            content without that person or organization's permission, or as
            otherwise allowed by law. The views expressed in other people or
            organizations' content are theirs, and don't necessarily reflect
            Brullah's views.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>In case of problems or disagreements</h2>
          <p>
            If we reasonably believe that any of your content (1) breaches these
            terms, service-specific additional terms or policies, (2) violates
            applicable law, or (3) could harm our users, third parties, or
            Google, then we reserve the right to take down some or all of that
            content in accordance with applicable law. Examples include child
            pornography, content that facilitates human trafficking or
            harassment, terrorist content, and content that infringes someone
            else's intellectual property rights.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>Cookies</h2>
          <p>
            Brullah uses cookies to better your experience, by continuing you
            allow us to use cookies to store brullah information.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h2>About these terms</h2>
          <p>
            By law, you have certain rights that can't be limited by a contract
            like these terms of service. These terms are in no way intended to
            restrict those rights. If it turns out that a particular term is not
            valid or enforceable, this will not affect any other terms.
          </p>
          <p>
            These terms describe the relationship between you and Brullah. They
            don't create any legal rights for other people or organizations,
            even if others benefit from that relationship under these terms.
          </p>
          <p>
            We want to make these terms easy to understand, so we've used
            examples from our services.
          </p>
          <p>
            If you don't follow these terms, and we don't take action right
            away, that doesn't mean we're giving up any rights that we may have,
            such as taking action in the future.
          </p>
          <p>
            We may update these terms (1) to reflect changes in our services or
            how we do business — for example, when we add new services,
            features, technologies, pricing, or benefits (or remove old ones),
            (2) for legal, regulatory, or security reasons, or (3) to prevent
            abuse or harm.
          </p>
          <p>
            If we materially change these terms or service-specific additional
            terms, we'll provide you with reasonable advance notice and the
            opportunity to review the changes, except (1) when we launch a new
            service or feature, or (2) in urgent situations, such as preventing
            ongoing abuse or responding to legal requirements. If you don't
            agree to the new terms, you should remove your content and stop
            using the services. You can also end your relationship with us at
            any time by closing your Brullah Account.
          </p>
        </SwiperSlide>
      </Swiper>
      <p data-swiper-parallax="-200">
        By clicking next, you agree to the terms and conditions
      </p>
      <div className={cn(styles.buttons)} data-swiper-parallax="-100">
        <Button
          text="back"
          disabled={false}
          onClick={() => swiper.slidePrev()}
        ></Button>
        <Button
          text="next"
          disabled={false}
          onClick={() => swiper.slideNext()}
        ></Button>
      </div>
    </div>
  );
};

export default SignUpAgreement;
