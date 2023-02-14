import cn from "classnames";
import styles from "./styles.module.scss";

interface Props {
  brc: number;
  user: { id: string };
  label: string;
  winner: { id: string; identity: { brullah_name: string } };
  looser: { id: string; identity: { brullah_name: string } };
}

const DashboardGraphTooltip = ({ brc, user, label, winner, looser }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <h3>{`BRC : ${brc}`}</h3>
      <h4>At {label}</h4>
      {user?.id === winner?.id ? (
        <p>Won checkers game against {looser.identity.brullah_name}</p>
      ) : (
        <p>Lost checkers game against {winner.identity.brullah_name}</p>
      )}
    </div>
  );

  return null;
};

export default DashboardGraphTooltip;
