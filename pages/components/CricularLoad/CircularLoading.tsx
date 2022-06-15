import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import cn from "classnames";

const CircularLoading = () => {
  return <CircularProgress className={cn(styles.loading)}></CircularProgress>;
};

export default CircularLoading;
