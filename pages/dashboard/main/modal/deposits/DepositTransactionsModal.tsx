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
import Logo from "../../../../../components/Logo/Logo";

interface Props {
  modalOpen: boolean;
  handleModalClose: () => void;
}

const DEPOSIT_TRANSACTIONS = gql`
  query PaypalDepositTransactions($page: Int!, $limit: Int!) {
    paypalDepositTransactions(page: $page, limit: $limit) {
      docs {
        payer {
          identity {
            arena_name
          }
        }
        id
        gross_amount {
          value
          currency
        }
        deposit_final_amount {
          value
          currency
        }
        gateway_fee {
          value
          currency
        }
        service_fee {
          value
          currency
        }
        exchange_rate {
          target_currency
          value
        }
        status
      }
      totalDocs
      limit
    }
  }
`;

const DepositTransactionsModal = ({ modalOpen, handleModalClose }: Props) => {
  const [transactions, setTransactions] = useState<
    Array<{
      payer: {
        identity: { arena_name: string };
      };
      gross_amount: {
        value: number;
        currency: dinero.Currency;
      };
      deposit_final_amount: { value: number; currency: dinero.Currency };
      gateway_fee: {
        value: number;
        currency: dinero.Currency;
      };
      service_fee: {
        value: number;
        currency: dinero.Currency;
      };
      paypal_fee: {
        value: number;
        currency: dinero.Currency;
      };
      status: string;
      id: string;
    }>
  >([]);
  const { data, error, refetch, loading, networkStatus } = useQuery(
    DEPOSIT_TRANSACTIONS,
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
    if (data?.paypalDepositTransactions) {
      setTransactions(data?.paypalDepositTransactions.docs);
    }
  }, [data]);

  return (
    <>
      <Modal
        className={cn(styles.modal)}
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="Deposit transactions"
        aria-describedby="Deposit transactions modal"
      >
        <Box className={cn(styles.parentModal)}>
          <div className={cn(styles.headingContainer)}>
            <h2 className={cn(styles.modalHeading)}>Deposit Transactions</h2>
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
                    <TableCell align="center">Depositor</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Deposited</TableCell>
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
                        {transaction.payer.identity.arena_name}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          currency: transaction.gross_amount.currency,
                          amount: transaction.gross_amount.value,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">
                        {transaction?.deposit_final_amount?.value
                          ? dinero({
                              currency:
                                transaction.deposit_final_amount.currency,
                              amount: transaction.deposit_final_amount.value,
                            }).toFormat()
                          : "_"}
                      </TableCell>
                      <TableCell align="center">
                        {transaction?.gateway_fee?.value
                          ? dinero({
                              currency: transaction?.gateway_fee?.currency,
                              amount: transaction?.gateway_fee?.value,
                            }).toFormat()
                          : "_"}
                      </TableCell>
                      <TableCell align="center">
                        {dinero({
                          amount: transaction.service_fee.value,
                          currency: transaction.service_fee.currency,
                        }).toFormat()}
                      </TableCell>
                      <TableCell align="center">{transaction.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={
                  data?.paypalDepositTransactions?.totalDocs
                    ? data?.paypalDepositTransactions.totalDocs
                    : 0
                }
                rowsPerPage={
                  data?.paypalDepositTransactions?.limit
                    ? data?.paypalDepositTransactions.limit
                    : 0
                }
                page={page}
                rowsPerPageOptions={[
                  data?.paypalDepositTransactions?.limit
                    ? data?.paypalDepositTransactions.limit
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

export default DepositTransactionsModal;
