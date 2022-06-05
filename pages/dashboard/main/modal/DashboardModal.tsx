import cn from "classnames";
import styles from "./styles.module.scss";
import DepositTransactionsModal from "./deposits/DepositTransactionsModal";
import PayoutTransactionsModal from "./payouts/PayoutTransactionsModal";
import TournamentTransactionsModal from "./tournaments/TournamentTransactionsModal";

interface Props {
  handleModalClose: () => void;
  modalOpen: boolean;
  modalName: string;
}

const DashboardModal = ({ handleModalClose, modalOpen, modalName }: Props) => {
  return (
    <div className={cn(styles.container, !modalOpen ? styles.modalClosed : "")}>
      {modalName === "depositTransactions" ? (
        <DepositTransactionsModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        ></DepositTransactionsModal>
      ) : modalName === "payoutTransactions" ? (
        <PayoutTransactionsModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        ></PayoutTransactionsModal>
      ) : modalName === "tournamentTransactions" ? (
        <TournamentTransactionsModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        ></TournamentTransactionsModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardModal;
