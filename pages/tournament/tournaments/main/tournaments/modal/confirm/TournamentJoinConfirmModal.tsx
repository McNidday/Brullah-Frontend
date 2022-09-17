import { Box, Modal } from "@mui/material";
import cn from "classnames";
import Button from "../../../../../../components/Button/Button";
import styles from "./styles.module.scss";
import dinero from "dinero.js";

interface Props {
  action: "withdraw" | "join";
  tournamentName: string;
  contribution: {
    contributed: boolean;
    per_user: {
      value: number;
      currency: dinero.Currency;
    };
  };
  confirmAction: () => void;
  confirmModalOpen: boolean;
  handleConfirmModalClose: () => void;
}

const TournamentJoinConfirmModal = ({
  confirmAction,
  tournamentName,
  contribution,
  confirmModalOpen,
  handleConfirmModalClose,
  action,
}: Props) => {
  return (
    <Modal
      className={cn(styles.modal)}
      open={confirmModalOpen}
      onClose={handleConfirmModalClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={cn(styles.parentModal)}>
        {action === "join" ? (
          contribution.contributed ? (
            <>
              <h4>
                Click below to confirm. You are about to contribute{" "}
                {dinero({
                  amount: contribution.per_user.value,
                  currency: contribution.per_user.currency,
                }).toFormat()}{" "}
                to join tournament {tournamentName}
              </h4>
              <Button
                text="ᕦ(ò_óˇ)ᕤ"
                disabled={false}
                onClick={() => {
                  confirmAction();
                  handleConfirmModalClose();
                }}
              ></Button>
            </>
          ) : (
            <h4>...</h4>
          )
        ) : (
          <>
            <h4>
              Click below to confirm. You are about to withdraw from tournament{" "}
              {tournamentName}. You can only withdraw from contributed
              tournaments 24 hours after you have joined.
            </h4>
            <Button
              text="o(TヘTo)"
              disabled={false}
              onClick={() => {
                confirmAction();
                handleConfirmModalClose();
              }}
            ></Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TournamentJoinConfirmModal;
