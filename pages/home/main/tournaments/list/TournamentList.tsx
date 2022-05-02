import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import Button from "../../../../components/Button/Button";
import uniqid from "uniqid";

const TournamentList = () => {
  return (
    <li key={uniqid()} className={cn(styles.container)}>
      <div>
        <div>
          <span>@marknidday</span>
          <Image src="/icons/duck.png" layout="fill"></Image>
        </div>
        <div>
          <span>sponsored</span>
          <Image src="/icons/sponsor.svg" layout="fill"></Image>
        </div>
        <div>
          <span>contributed</span>
          <Image src="/icons/bit.svg" layout="fill"></Image>
        </div>
        <div>
          <span>18 joined</span>
          <p>18</p>
        </div>
      </div>
      <div>
        <Image src="/icons/pig.jpg" layout="fill"></Image>
      </div>
      <div>
        <h3>Donuld duck</h3>
      </div>
      <div>
        <p>This tournament uses markup langiage</p>
      </div>
      <div>
        <Button text="join" disabled={false}></Button>
      </div>
    </li>
  );
};

export default TournamentList;
