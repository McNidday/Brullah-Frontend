import cn from "classnames";
import Button from "../../../../components/Button/Button";
import styles from "./styles.module.scss";

interface Props {
  number: number;
  setRecapNumber: (num: number) => void;
}

const RecapTournamentListCard = ({ number, setRecapNumber }: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <h1>Battle {number}</h1>
      </div>
      <div>
        <Button
          text="Look 🧐"
          disabled={false}
          onClick={() => setRecapNumber(number)}
        ></Button>
      </div>
    </li>
  );
};

export default RecapTournamentListCard;
