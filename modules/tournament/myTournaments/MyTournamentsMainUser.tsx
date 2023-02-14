import { gql, useQuery } from "@apollo/client";
import MyTournamentsMain from "./MyTournamentsMain";
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
    return <MyTournamentsError errorNum={1} error={error}></MyTournamentsError>;
  } else if (error && (error?.networkError as any).statusCode === 401) {
    return <MyTournamentsError errorNum={0} error={error}></MyTournamentsError>;
  }
  return <MyTournamentsMain></MyTournamentsMain>;
};

export default MyTournamentsMainUser;
