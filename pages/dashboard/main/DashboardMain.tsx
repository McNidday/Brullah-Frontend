import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import DashboardProfile, {
  DashboardProfileFragment,
} from "./profile/DashboardProfile";
import DashboardMainError from "./states/DashboardMainError";
import DashboardMainLoading from "./states/DashboardMainLoading";
import styles from "./styles.module.scss";

const USER = gql`
  query GetUser {
    user {
      id
      ...DashboardProfile_User
    }
  }
  ${DashboardProfileFragment}
`;

const DashboardMain = () => {
  const { loading, error, data, refetch } = useQuery(USER);

  if (error && (error?.networkError as any).statusCode !== 401) {
    <DashboardMainError errorNum={1} error={error}></DashboardMainError>;
  }

  if (loading) return <DashboardMainLoading></DashboardMainLoading>;
  if (!data?.user)
    return (
      <DashboardMainError errorNum={0} error={error!}></DashboardMainError>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <DashboardProfile
          user={data.user}
          refreshUser={() => refetch()}
        ></DashboardProfile>
      </div>
    </div>
  );
};

export default DashboardMain;
