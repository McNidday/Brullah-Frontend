import cn from "classnames";
import styles from "./styles.module.scss";
import {
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import dinero from "dinero.js";
import Logo from "../../../../components/Logo/Logo";

interface Props {
  modalOpen: boolean;
  handleModalClose: () => void;
}

const PAYPAL_TRANSACTIONS = gql`
  query PaypalPayoutTransactions($page: Int!, $limit: Int!) {
    paypalPayoutTransactions(page: $page, limit: $limit) {
      docs {
        sender_item_id {
          identity {
            arena_name
          }
        }
        id
        service_fee
        original_amount
        time_processed
        payout_item_amount
        payout_item_fee
        transaction_status
      }
      totalDocs
      limit
    }
  }
`;

const PayoutTransactionsModal = ({ modalOpen, handleModalClose }: Props) => {
  const [transactions, setTransactions] = useState<
    Array<{
      sender_item_id: {
        identity: {
          arena_name: string;
        };
      };
      id: string;
      service_fee: number;
      original_amount: number;
      time_processed: number;
      payout_item_amount: number;
      payout_item_fee: number;
      transaction_status: string;
    }>
  >([]);
  const { data, error, refetch, loading, networkStatus } = useQuery(
    PAYPAL_TRANSACTIONS,
    {
      variables: {
        limit: 10,
        page: 1,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    refetch({ limit: 10, page: newPage + 1 });
    setPage(newPage);
  };

  useEffect(() => {
    if (data?.paypalPayoutTransactions) {
      setTransactions(data?.paypalPayoutTransactions.docs);
    }
  }, [data]);

  return (
    <>
      <Modal
        className={cn(styles.modal)}
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={cn(styles.parentModal)}>
          <div className={cn(styles.headingContainer)}>
            <h2 className={cn(styles.modalHeading)}>Payout Transactions</h2>
            {loading ||
            networkStatus === NetworkStatus.refetch ||
            networkStatus === NetworkStatus.setVariables ? (
              <div className={cn(styles.loading)}>
                <Logo
                  thinking={true}
                  text={true}
                  image={{ width: "50px", height: "50px" }}
                  container={{ width: "110px", height: "50px" }}
                ></Logo>
              </div>
            ) : (
              ""
            )}
            {error ? (
              <div className={cn(styles.error)}>{error?.message}</div>
            ) : (
              ""
            )}
          </div>
          <Paper className={cn(styles.table)}>
            <TableContainer sx={{ width: "100%", height: "100%" }}>
              <Table
                sx={{ minWidth: 650, maxHeight: 440 }}
                stickyHeader
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction Id</TableCell>
                    <TableCell align="center">Reciever</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Recieved</TableCell>
                    <TableCell align="center">Paypal Fee</TableCell>
                    <TableCell align="center">Service Fee</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell component="th" scope="row">
                        {transaction.id}
                      </TableCell>
                      <TableCell align="center">
                        {transaction.sender_item_id.identity.arena_name}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          amount: transaction.original_amount,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          amount: transaction.payout_item_amount,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          amount: transaction.payout_item_fee,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          amount: transaction.service_fee,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">
                        {transaction.transaction_status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={
                  data?.paypalPayoutTransactions?.totalDocs
                    ? data?.paypalPayoutTransactions.totalDocs
                    : 0
                }
                rowsPerPage={
                  data?.paypalPayoutTransactions?.limit
                    ? data?.paypalPayoutTransactions.limit
                    : 0
                }
                page={page}
                rowsPerPageOptions={[
                  data?.paypalPayoutTransactions?.limit
                    ? data?.paypalPayoutTransactions.limit
                    : 0,
                ]}
                onPageChange={handleChangePage}
              />
            </TableContainer>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default PayoutTransactionsModal;
