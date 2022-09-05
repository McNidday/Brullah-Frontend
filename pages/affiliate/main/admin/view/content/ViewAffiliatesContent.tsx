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
import cn from "classnames";
import moment from "moment";
import dinero from "dinero.js";
import styles from "./styles.module.scss";
import ViewAffiliatesContentRemoveButton from "./removeButton/ViewAffiliatesContentRemoveButton";

interface Props {
  docs: Array<{
    id: String;
    identity: {
      arena_name: String;
      arena_id: String;
      affiliate: {
        code: String;
        start_date: number;
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
                <TableRow key={`${t.identity.arena_id}~view~affiliates`}>
                  <TableCell component="th" scope="row">
                    {t.identity.arena_id}
                  </TableCell>
                  <TableCell align="center">{t.identity.arena_name}</TableCell>
                  <TableCell align="center">
                    {t.identity.affiliate.enlisted}
                  </TableCell>
                  <TableCell align="center">
                    {dinero({
                      amount: t.identity.affiliate.commission,
                      currency: "USD",
                    }).toFormat()}
                  </TableCell>
                  <TableCell align="center">
                    {t.identity.affiliate.code}
                  </TableCell>
                  <TableCell align="center">
                    {moment.unix(t.identity.affiliate.start_date).format("LLL")}
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
