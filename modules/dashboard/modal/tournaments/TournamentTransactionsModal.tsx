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
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import dinero from "dinero.js";
import Logo from "../../../../components/Logo/Logo";

interface Props {
  modalOpen: boolean;
  handleModalClose: () => void;
}

const TOURNAMENT_TRANSACTIONS = gql`
  query TournamentTransactions($page: Int!, $limit: Int!) {
    tournamentTransactions(page: $page, limit: $limit) {
      docs {
        payer {
          identity {
            brullah_name
          }
        }
        payee {
          identity {
            brullah_name
          }
        }
        gross_amount {
          value
          currency
        }
        id
        joinDate
        status
      }
      totalDocs
      limit
    }
  }
`;

const TournamentTransactionsModal = ({
  modalOpen,
  handleModalClose,
}: Props) => {
  const [transactions, setTransactions] = useState<
    Array<{
      payer: {
        identity: {
          brullah_name: string;
        };
      };
      payee: {
        identity: {
          brullah_name: string;
        };
      };
      gross_amount: {
        value: number;
        currency: dinero.Currency;
      };
      id: string;
      joinDate: string;
      status: string;
    }>
  >([]);
  const { data, error, refetch, loading, networkStatus } = useQuery(
    TOURNAMENT_TRANSACTIONS,
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
    if (data?.tournamentTransactions) {
      setTransactions(data?.tournamentTransactions.docs);
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
            <h2 className={cn(styles.modalHeading)}>Tournament Transactions</h2>
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
              <h4 className={cn(styles.error)}>{error?.message}</h4>
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
                    <TableCell align="center">Payer</TableCell>
                    <TableCell align="center">Payee</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Join Date</TableCell>
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
                        {transaction.payer.identity.brullah_name}
                      </TableCell>
                      <TableCell align="center">
                        {transaction.payee.identity.brullah_name}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          currency: transaction.gross_amount.currency,
                          amount: transaction.gross_amount.value,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">
                        {DateTime.fromISO(transaction.joinDate).toLocaleString(
                          DateTime.DATETIME_FULL
                        )}
                      </TableCell>
                      <TableCell align="center">{transaction.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={
                  data?.tournamentTransactions?.totalDocs
                    ? data?.tournamentTransactions.totalDocs
                    : 0
                }
                rowsPerPage={
                  data?.tournamentTransactions?.limit
                    ? data?.tournamentTransactions.limit
                    : 0
                }
                page={page}
                rowsPerPageOptions={[
                  data?.tournamentTransactions?.limit
                    ? data?.tournamentTransactions.limit
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

export default TournamentTransactionsModal;
