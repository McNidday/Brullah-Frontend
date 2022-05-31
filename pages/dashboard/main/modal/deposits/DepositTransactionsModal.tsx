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
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

interface Props {
  modalOpen: boolean;
  handleModalClose: () => void;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  fee: number,
  status: string
) {
  return { name, calories, fat, carbs, protein, fee, status };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 700, "completed"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 50, "Pending"),
  createData("Eclair", 262, 16.0, 24, 6.0, 50, "Pending"),
  createData("Cupcake", 305, 3.7, 67, 4.3, 50, "Pending"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 50, "Pending"),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 700, "completed"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 50, "Pending"),
  createData("Eclair", 262, 16.0, 24, 6.0, 50, "Pending"),
  createData("Cupcake", 305, 3.7, 67, 4.3, 50, "Pending"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 50, "Pending"),
];

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
  const { data, error, refetch, loading } = useQuery(DEPOSIT_TRANSACTIONS, {
    variables: {
      limit: 10,
      page: 1,
    },
  });
  const [page, setPage] = useState(1);
  const handleChangePage = (event: unknown, newPage: number) => {
    refetch({ limit: 10, page: newPage });
    setPage(newPage);
  };
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
          <h2 className={cn(styles.modalHeading)}>Deposit Transactions</h2>
          <div className={cn(styles.table)}>
            <TableContainer
              sx={{ width: "100%", height: "100%" }}
              component={Paper}
            >
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
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell align="center">{row.fee}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={rows.length}
                rowsPerPage={2}
                page={page}
                rowsPerPageOptions={[2]}
                onPageChange={handleChangePage}
              />
            </TableContainer>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DepositTransactionsModal;
