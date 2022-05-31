import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import { useState } from "react";
import DashboardGraph from "./graph/DashboardGraph";
import DashboardModal from "./modal/DashboardModal";
import DashboardProfile, {
  DashboardProfileFragment,
} from "./profile/DashboardProfile";
import DashboardMainError from "./states/DashboardMainError";
import DashboardMainLoading from "./states/DashboardMainLoading";
import styles from "./styles.module.scss";
import DashboardTransactions from "./transactions/DashboardTransactions";

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

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
        <DashboardGraph user={data.user}></DashboardGraph>
        <DashboardTransactions
          handleModalOpen={handleModalOpen}
        ></DashboardTransactions>
        <DashboardModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        ></DashboardModal>
      </div>
    </div>
  );
};

export default DashboardMain;
