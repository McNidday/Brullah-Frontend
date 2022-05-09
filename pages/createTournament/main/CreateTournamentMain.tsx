import cn from "classnames";
import CreateTournamentSlides from "./slides/CreateTournamentSlides";
import styles from "./styles.module.scss";

const CreateTournamentMain = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <CreateTournamentSlides></CreateTournamentSlides>
      </div>
    </div>
  );
};

export default CreateTournamentMain;
