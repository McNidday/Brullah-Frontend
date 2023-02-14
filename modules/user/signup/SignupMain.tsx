import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import SignUpInputSlides from "./slides/SignUpInputSlides";
import SignupError from "./states/SignupError";
import SignupLoading from "./states/SignupLoading";
import styles from "./styles.module.scss";

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        brullah_name
      }
    }
  }
`;

const SignupMain = () => {
  const { loading, error, data } = useQuery(USER, { errorPolicy: "all" });

  if (error && (error?.networkError as any).statusCode !== 401) {
    <SignupError errorNum={1} error={error}></SignupError>;
  }

  if (loading) return <SignupLoading></SignupLoading>;
  if (data?.user?.id)
    return (
      <SignupError
        brullah_name={data.user.identity.brullah_name}
        errorNum={0}
        error={error!}
      ></SignupError>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <SignUpInputSlides></SignUpInputSlides>
      </div>
    </div>
  );
};

export default SignupMain;
