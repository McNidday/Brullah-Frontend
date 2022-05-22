import cn from "classnames";
import styles from "./styles.module.scss";

const DashboardGraphTooltip = (props: any) => {
  if (props.active) {
    return (
      <div className={cn(styles.container)}>
        <h3>{`BRC : ${props.payload[0].value}`}</h3>
        <h4>At {props.label}</h4>
        <h5>Won checkers game against butter</h5>
      </div>
    );
  }

  return null;
};

export default DashboardGraphTooltip;
