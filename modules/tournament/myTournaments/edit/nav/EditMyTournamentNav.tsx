import Button from "../../../../../components/Button/Button";
import styles from "./styles.module.scss";
import cn from "classnames";

interface Props {
  handleAutoPple: () => void;
  handlePublishModalOpen: () => void;
  setEditId: (id: string | null) => void;
}

const EditMyTournamentNav = ({
  handlePublishModalOpen,
  handleAutoPple,
  setEditId,
}: Props) => {
  return (
    <div className={cn(styles.editNavigation)}>
      <div className={cn(styles.editNavigationButtons)}>
        <Button
          text="back"
          disabled={false}
          onClick={() => setEditId(null)}
        ></Button>
        <Button
          text="publish"
          disabled={false}
          onClick={handlePublishModalOpen}
        ></Button>
        <Button
          text="auto ^_+"
          disabled={false}
          onClick={handleAutoPple}
        ></Button>
      </div>
    </div>
  );
};

export default EditMyTournamentNav;
