import cn from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import DepositTransactionsModal from "./deposits/DepositTransactionsModal";

interface Props {
  handleModalClose: () => void;
  modalOpen: boolean;
}

const DashboardModal = ({ handleModalClose, modalOpen }: Props) => {
  return (
    <div className={cn(styles.container, !modalOpen ? styles.modalClosed : "")}>
      <DepositTransactionsModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      ></DepositTransactionsModal>
    </div>
  );
};

export default DashboardModal;
