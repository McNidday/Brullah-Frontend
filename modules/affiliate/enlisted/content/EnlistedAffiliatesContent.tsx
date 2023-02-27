import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DateTime } from "luxon";
import cn from "classnames";
import dinero from "dinero.js";
import styles from "./styles.module.scss";

interface Props {
  docs: Array<{
    id: String;
    enlisted: {
      identity: {
        brullah_name: String;
        brullah_id: String;
      };
    };
    commission: {
      value: number;
      currency: dinero.Currency;
    };
    contract_expiry: string;
    contract_commence: string;
  }>;
  totalDocs: number;
  page: number;
  limit: number;
  handleChangePage: (page: number) => void;
}

const EnlistedAffiliatesContent = ({
  docs,
  totalDocs,
  page,
  limit,
  handleChangePage,
}: Props) => {
  console.log(docs);
  return (
    <Paper className={cn(styles.table)}>
      <TableContainer sx={{ width: "100%", height: "100%" }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Brullah Id</TableCell>
              <TableCell align="center">Brullah.N</TableCell>
              <TableCell align="center">Commission</TableCell>
              <TableCell align="center">Contract.SD</TableCell>
              <TableCell align="center">Contract.ED</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map((t) => {
              return (
                <TableRow
                  key={`${t.enlisted.identity.brullah_id}~view~enlisted`}
                >
                  <TableCell component="th" scope="row">
                    {t.enlisted.identity.brullah_id}
                  </TableCell>
                  <TableCell align="center">
                    {t.enlisted.identity.brullah_name}
                  </TableCell>
                  <TableCell align="center">
                    {dinero({
                      amount: t.commission.value,
                      currency: t.commission.currency,
                    }).toFormat()}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(t.contract_commence).toLocaleString(
                      DateTime.DATETIME_FULL
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(t.contract_expiry).toLocaleString(
                      DateTime.DATETIME_FULL
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.now() >= DateTime.fromISO(t.contract_expiry)
                      ? "Expired"
                      : "Active"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={cn(styles.paginate)}
        component="div"
        count={totalDocs}
        rowsPerPage={limit}
        page={page - 1}
        rowsPerPageOptions={[limit]}
        onPageChange={(e, page) => handleChangePage(page)}
      ></TablePagination>
    </Paper>
  );
};

export default EnlistedAffiliatesContent;
