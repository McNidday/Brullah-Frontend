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
import ViewAffiliatesContentRemoveButton from "./removeButton/ViewAffiliatesContentRemoveButton";

interface Props {
  docs: Array<{
    id: String;
    identity: {
      brullah_name: String;
      brullah_id: String;
    };
    finance: {
      affiliate: {
        code: String;
        start_date: string;
        enlisted: number;
        commission: number;
      };
    };
  }>;
  totalDocs: number;
  page: number;
  limit: number;
  handleChangePage: (page: number) => void;
}

const ViewAffiliatesContent = ({
  docs,
  totalDocs,
  page,
  limit,
  handleChangePage,
}: Props) => {
  return (
    <Paper className={cn(styles.table)}>
      <TableContainer sx={{ width: "100%", height: "100%" }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Brullah Id</TableCell>
              <TableCell align="center">Brullah.N</TableCell>
              <TableCell align="center">Affiliate.EN</TableCell>
              <TableCell align="center">Affiliate.CN</TableCell>
              <TableCell align="center">Affiliate.CD</TableCell>
              <TableCell align="center">Affiliate.SD</TableCell>
              <TableCell align="center">Remove.A</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map((t) => {
              return (
                <TableRow key={`${t.identity.brullah_id}~view~affiliates`}>
                  <TableCell component="th" scope="row">
                    {t.identity.brullah_id}
                  </TableCell>
                  <TableCell align="center">
                    {t.identity.brullah_name}
                  </TableCell>
                  <TableCell align="center">
                    {t.finance.affiliate.enlisted}
                  </TableCell>
                  <TableCell align="center">
                    {dinero({
                      amount: t.finance.affiliate.commission,
                      currency: "USD",
                    }).toFormat()}
                  </TableCell>
                  <TableCell align="center">
                    {t.finance.affiliate.code}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(
                      t.finance.affiliate.start_date
                    ).toLocaleString(DateTime.DATETIME_FULL)}
                  </TableCell>
                  <TableCell align="center">
                    <ViewAffiliatesContentRemoveButton
                      id={t.id}
                    ></ViewAffiliatesContentRemoveButton>
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

export default ViewAffiliatesContent;
