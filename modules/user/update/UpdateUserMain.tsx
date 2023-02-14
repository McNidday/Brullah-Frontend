import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import UpdateUserInputSlides from "./slides/UpdateUserInputSlides";
import UpdateUserError from "./states/UpdateUserError";
import UpdateUserLoading from "./states/UpdateUserLoading";
import styles from "./styles.module.scss";

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        brullah_name
        email
        first_name
        last_name
      }
    }
  }
`;

const UpdateUserMain = () => {
  const { loading, error, data } = useQuery(USER, { errorPolicy: "all" });

  if (loading) return <UpdateUserLoading></UpdateUserLoading>;
  if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <UpdateUserError errorNum={0} error={error}></UpdateUserError>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <UpdateUserError errorNum={1} error={error!}></UpdateUserError>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <UpdateUserInputSlides
          user={data.user.identity}
        ></UpdateUserInputSlides>
      </div>
    </div>
  );
};

export default UpdateUserMain;
