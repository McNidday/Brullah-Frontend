import { gql, useQuery } from "@apollo/client";
import LoginError from "./states/LoginError";
import LoginInputs from "./states/LoginInputs";
import LoginLoading from "./states/LoginLoading";

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        arena_name
      }
    }
  }
`;

const LoginMain = () => {
  const { loading, error, data } = useQuery(USER, { errorPolicy: "all" });
  if (error && (error?.networkError as any).statusCode !== 401) {
    return <LoginError errorNum={1} error={error!}></LoginError>;
  }
  if (loading) return <LoginLoading></LoginLoading>;
  if (data && data.user && data.user.id)
    return (
      <LoginError
        arena_name={data.user.identity.arena_name}
        errorNum={0}
        error={error!}
      ></LoginError>
    );
  return <LoginInputs></LoginInputs>;
};

export default LoginMain;
