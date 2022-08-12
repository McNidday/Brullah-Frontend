import cn from "classnames";
import RecapTournamentListCard from "./card/RecapTournamentListCard";
import styles from "./styles.module.scss";

interface Props {
  recaps: number;
  setRecapNumber: (num: number) => void;
}

const RecapTournamentList = ({ recaps, setRecapNumber }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <ul>
        <RecapTournamentListCard
          number={1}
          setRecapNumber={setRecapNumber}
        ></RecapTournamentListCard>
        {recaps === 2 ? (
          <RecapTournamentListCard
            number={2}
            setRecapNumber={setRecapNumber}
          ></RecapTournamentListCard>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default RecapTournamentList;
