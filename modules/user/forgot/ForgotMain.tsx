import { gql, useQuery } from "@apollo/client";
import LoginError from "./states/ForgotError";
import LoginInputs from "./inputs/ForgotInputs";
import LoginLoading from "./states/ForgotLoading";
import { useRouter } from "next/router";
import ForgotReset from "./inputs/ForgotReset";

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

const ForgotMain = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(USER, { errorPolicy: "all" });
  if (error && (error?.networkError as any).statusCode !== 401) {
    return <LoginError errorNum={1} error={error!}></LoginError>;
  }
  if (loading || !router.isReady) return <LoginLoading></LoginLoading>;
  if (data && data.user && data.user.id)
    return (
      <LoginError
        brullah_name={data.user.identity.brullah_name}
        errorNum={0}
        error={error!}
      ></LoginError>
    );
  return router.query.token ? (
    <ForgotReset token={router.query.token as string}></ForgotReset>
  ) : (
    <LoginInputs></LoginInputs>
  );
};

export default ForgotMain;
