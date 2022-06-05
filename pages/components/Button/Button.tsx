import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props {
  text: string;
  disabled: boolean;
  onClick?: Function | null;
  forceActive?: boolean;
}

const Button = (props: Props) => {
  return (
    <div
      onClick={() => {
        props.onClick ? props.onClick() : "";
      }}
      className={classNames(
        styles.button,
        props.forceActive ? styles.forceActive : "",
        props.disabled ? styles.disabled : ""
      )}
    >
      {props.text}
    </div>
  );
};

export default Button;
