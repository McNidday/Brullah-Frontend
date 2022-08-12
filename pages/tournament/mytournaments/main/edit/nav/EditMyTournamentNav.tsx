import Button from "../../../../../components/Button/Button";
import styles from "./styles.module.scss";
import cn from "classnames";
import { CircularProgress } from "@mui/material";
import { ApolloError } from "@apollo/client";

interface Props {
  handleAutoPple: () => void;
  handlePublishModalOpen: () => void;
  saveConfigLoading: boolean;
  saveConfigError: ApolloError | undefined;
}

const EditMyTournamentNav = ({
  handlePublishModalOpen,
  handleAutoPple,
  saveConfigLoading,
  saveConfigError,
}: Props) => {
  return (
    <div className={cn(styles.editNavigation)}>
      <div className={cn(styles.editNavigationButtons)}>
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
      {saveConfigLoading ? (
        <div className={cn(styles.editStatesLoading)}>
          <span>Saving</span>
          <CircularProgress
            className={styles.editStatesLoadingProgress}
          ></CircularProgress>
        </div>
      ) : saveConfigError ? (
        <div className={cn(styles.editStatesError)}>
          <h3>{saveConfigError.message}</h3>
        </div>
      ) : (
        <div className={cn(styles.cool)}>
          <h3>(✿◡‿◡)</h3>
        </div>
      )}
    </div>
  );
};

export default EditMyTournamentNav;
