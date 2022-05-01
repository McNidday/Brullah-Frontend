import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props {
  text: string;
  disabled: boolean;
}

const Button = (props: Props) => {
  return (
    <div
      className={classNames(
        styles.button,
        props.disabled ? styles.disabled : ""
      )}
    >
      {props.text}
    </div>
  );
};

export default Button;
