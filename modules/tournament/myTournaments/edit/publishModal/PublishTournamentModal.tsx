import styles from "./styles.module.scss";
import cn from "classnames";
import Button from "../../../../../components/Button/Button";
import { Box, CircularProgress, Modal } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

const PUBLISH_TOURNAMENT = gql`
  mutation PublishTournament($id: ID!) {
    publish(id: $id) {
      id
    }
  }
`;

interface Props {
  refetchTournament: () => void;
  showPublishModal: boolean;
  handlePublishModalClose: () => void;
  tournament: {
    id: string;
    start_date: string;
    information: { name: string };
  };
}

const PublishTournamentModal = ({
  refetchTournament,
  tournament,
  showPublishModal,
  handlePublishModalClose,
}: Props) => {
  const router = useRouter();
  const [publishTournamentConfig, { data, loading, error, reset }] =
    useMutation(PUBLISH_TOURNAMENT, {
      errorPolicy: "all",
    });

  const resetCallback = useCallback(reset, [reset]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        refetchTournament();
        resetCallback();
      }, 10000);
    }
    if (data && !error) {
      // Redirect to tournament tracker
      router.replace(`/tournament/track?id=${tournament.id}`);
    }
  }, [data, error, router, tournament.id, refetchTournament, resetCallback]);

  return (
    <Modal
      className={cn(styles.modal)}
      open={showPublishModal}
      onClose={handlePublishModalClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={cn(styles.parentModal)}>
        <h2>
          Ready to publish your tournament &quot;{tournament.information.name}
          &quot;, to start on{" "}
          {DateTime.fromISO(tournament.start_date).toLocaleString(
            DateTime.DATETIME_FULL
          )}
          . You are One Click away ( $ _ $ ).
        </h2>
        <h3>
          If you did not get the above statement, i meant that you can click the
          button below to publish your tournament. Just clik below. Ok am sorry
          am being awkward ?????????.
        </h3>
        <div className={cn(styles.publishStatus)}>
          {loading ? (
            <div className={cn(styles.publishStatusLoading)}>
              <span>Publishing...</span>
              <CircularProgress
                className={styles.publishStatusLoadingProgress}
              ></CircularProgress>
            </div>
          ) : error ? (
            <h4 className={cn(styles.error)}>{error.message}</h4>
          ) : (
            <Button
              text="Publish ???(?????????)"
              disabled={false}
              onClick={() => {
                publishTournamentConfig({
                  variables: {
                    id: tournament.id,
                  },
                });
              }}
            ></Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default PublishTournamentModal;
