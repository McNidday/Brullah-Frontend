import cn from "classnames";
import Link from "next/link";
import styles from "./styles.module.scss";

interface Props {
  text: string;
  disabled: boolean;
  onClick?: Function | null;
  forceActive?: boolean;
  link?: string;
}

const Button = ({ text, disabled, onClick, forceActive, link }: Props) => {
  if (link)
    return (
      <Link href={link}>
        <a className={cn(styles.button)}>{text}</a>
      </Link>
    );
  return (
    <div
      onClick={() => {
        onClick ? onClick() : "";
      }}
      className={cn(
        styles.button,
        forceActive ? styles.forceActive : "",
        disabled ? styles.disabled : ""
      )}
    >
      {text}
    </div>
  );
};

export default Button;
