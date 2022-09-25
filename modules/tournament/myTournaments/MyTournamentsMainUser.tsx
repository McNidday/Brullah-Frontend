import { gql, useQuery } from "@apollo/client";
import MyTournamentsMain from "./MyTournamentsMain";
import styles from "./styles.module.scss";
import cn from "classnames";
import MyTournamentsError from "./error/MyTournamentsError";
import MyTournamentsLoading from "./loading/MyTournamentsLoading";

const USER = gql`
  query GetUser {
    user {
      id
    }
  }
`;

const MyTournamentsMainUser = () => {
  const { data, loading, error } = useQuery(USER);
  if (loading) return <MyTournamentsLoading></MyTournamentsLoading>;
  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <MyTournamentsError errorNum={1} error={error}></MyTournamentsError>;
        </div>
      </div>
    );
  } else if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <MyTournamentsError errorNum={0} error={error}></MyTournamentsError>;
        </div>
      </div>
    );
  }
  return <MyTournamentsMain id={data.user.id}></MyTournamentsMain>;
};

export default MyTournamentsMainUser;
