import cn from "classnames";
import Image from "next/image";
import styles from "./styles.module.scss";

interface Props {
  thinking: boolean;
  text: boolean;
  image: { width: string; height: string };
  container: { width: string; height: string };
}

const Logo = ({ thinking, text, image, container }: Props) => {
  if (thinking && !text) {
    return (
      <div className={cn(styles.container, styles.thinking)} style={container}>
        <div style={image}>
          <div style={image}>
            <Image
              fill
              priority
              src="/icons/logo/inactive.svg"
              alt="Brillah Logo Inactive"
            ></Image>
          </div>
          <div style={image}>
            <Image
              fill
              priority
              src="/icons/logo/active.svg"
              alt="Brullah Logo Active"
            ></Image>
          </div>
        </div>
      </div>
    );
  } else if (thinking && text) {
    return (
      <div
        className={cn(styles.container, styles.thinking, styles.text)}
        style={container}
      >
        <div style={image}>
          <div style={image}>
            <Image
              fill
              priority
              src="/icons/logo/inactive.svg"
              alt="Brillah Logo Inactive"
            ></Image>
          </div>
          <div style={image}>
            <Image
              fill
              priority
              src="/icons/logo/active.svg"
              alt="Brillah Logo Active"
            ></Image>
          </div>
        </div>
        <p>thinking</p>
      </div>
    );
  } else {
    return (
      <div className={cn(styles.container)} style={container}>
        <div style={image}>
          <div style={image}>
            <Image
              fill
              priority
              src="/icons/logo/inactive.svg"
              alt="Brillah Logo Inactive"
            ></Image>
          </div>
          <div style={image}>
            <Image
              fill
              priority
              src="/icons/logo/active.svg"
              alt="Brillah Logo Active"
            ></Image>
          </div>
        </div>
      </div>
    );
  }
};

export default Logo;
