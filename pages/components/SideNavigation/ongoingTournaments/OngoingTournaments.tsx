import classNames from "classnames";
import DqTournaments from "./dqTournaments/DqTournaments";
import ReadyToPlay from "./ReadyToPlay/ReadyToPlay";
import styles from "./styles.module.scss";
import WaitingQueue from "./WaitingQueue/WaitingQueue";
const cn = classNames.bind(styles);

interface Props {
  tournaments: Array<object>;
}
const OngoingTournaments = (props: Props) => {
  const tournamentProps = {
    information: { name: "Donald Duck", thumbnail: "sothin" },
    startUnix: 100000000,
  };
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h3>OnGoing</h3>
        </div>
      </div>
      <ul className={cn(styles.tournamentList)}>
        <ReadyToPlay {...tournamentProps}></ReadyToPlay>
        <ReadyToPlay {...tournamentProps}></ReadyToPlay>
        <WaitingQueue {...tournamentProps}></WaitingQueue>
        <WaitingQueue {...tournamentProps}></WaitingQueue>
        <DqTournaments {...tournamentProps}></DqTournaments>
      </ul>
    </div>
  );
};

export default OngoingTournaments;
