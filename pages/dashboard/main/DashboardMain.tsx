import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import { useState } from "react";
import DashboardGraph from "./graph/DashboardGraph";
import DashboardModal from "./modal/DashboardModal";
import DashboardProfile, {
  DashboardProfileFragment,
} from "./profile/DashboardProfile";
import DashboardMainError from "./error/DashboardMainError";
import DashboardMainLoading from "./loading/DashboardMainLoading";
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
  const { loading, error, data, refetch } = useQuery(USER, {
    errorPolicy: "all",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState("depositTransactions");
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  if (loading) return <DashboardMainLoading></DashboardMainLoading>;

  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <DashboardMainError errorNum={1} error={error}></DashboardMainError>;
        </div>
      </div>
    );
  }

  if (!data?.user)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <DashboardMainError errorNum={0} error={error!}></DashboardMainError>
        </div>
      </div>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div className={cn(styles.topContainer)}>
          <DashboardProfile
            user={data.user}
            refreshUser={() => refetch()}
          ></DashboardProfile>
          <DashboardGraph user={data.user}></DashboardGraph>
        </div>
        <DashboardTransactions
          handleModalOpen={handleModalOpen}
          setModalName={(val: string) => setModalName(val)}
        ></DashboardTransactions>
        <DashboardModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          modalName={modalName}
        ></DashboardModal>
      </div>
    </div>
  );
};

export default DashboardMain;
