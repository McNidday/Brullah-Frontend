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
import ManageAffiliatesContentAddButton from "./addButton/ManageAffiliatesContentAddButton";
import styles from "./styles.module.scss";

interface Props {
  totalDocs: number;
  page: number;
  limit: number;
  handleChangePage: (page: number) => void;
  docs: Array<{
    id: String;
    identity: {
      brullah_name: String;
      brullah_id: String;
      email: String;
    };
  }>;
}

const ManageAffiliatesContent = ({
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
              <TableCell align="center">Brullah.E</TableCell>
              <TableCell align="center">Add Affiliate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map((t) => {
              return (
                <TableRow key={`${t.identity.brullah_name}~table-row`}>
                  <TableCell component="th" scope="row">
                    {t.identity.brullah_id}
                  </TableCell>
                  <TableCell align="center">{t.identity.brullah_name}</TableCell>
                  <TableCell align="center">{t.identity.email}</TableCell>
                  <TableCell align="center">
                    <ManageAffiliatesContentAddButton
                      id={t.id}
                    ></ManageAffiliatesContentAddButton>
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

export default ManageAffiliatesContent;
