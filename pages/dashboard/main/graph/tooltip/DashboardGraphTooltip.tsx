import cn from "classnames";
import styles from "./styles.module.scss";

const DashboardGraphTooltip = (props: any) => {
  if (props.active && props.payload[0]) {
    return (
      <div className={cn(styles.container)}>
        <h3>{`BRC : ${props.payload[0].payload.amount}`}</h3>
        <h4>At {props.label}</h4>
        {props.user.id === props.payload[0].payload.winner.id ? (
          <h5>
            Won checkers game against{" "}
            {props.payload[0].payload.looser.identity.arena_name}
          </h5>
        ) : (
          <h5>
            Lost checkers game against{" "}
            {props.payload[0].payload.winner.identity.arena_name}
          </h5>
        )}
      </div>
    );
  }

  return null;
};

export default DashboardGraphTooltip;
