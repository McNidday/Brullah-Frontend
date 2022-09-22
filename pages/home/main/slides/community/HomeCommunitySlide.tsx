import YouTube from "react-youtube";
import cn from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

const HomeCommunitySlide = () => {
  return (
    <section className={cn(styles.section)}>
      <div className={cn(styles.container)}>
        <YouTube
          videoId={"dO0u9XlUk90"}
          className={cn(styles.youtube)}
          iframeClassName={cn(styles.iframe)}
        ></YouTube>
      </div>
      <div className={cn(styles.socialContainer)}>
        <div className={cn(styles.whatsapp)}>
          <div>
            <Link href="https://chat.whatsapp.com/BfO9knIg4VQ4Z7xea7e1Cs">
              <a>
                <Image
                  alt="WhatsApp Qr Code"
                  src="/images/WhatsAppGroup.png"
                  layout="fill"
                ></Image>
              </a>
            </Link>
          </div>
          <p>Click on image to join via link or scan QR</p>
        </div>
      </div>
    </section>
  );
};

export default HomeCommunitySlide;
