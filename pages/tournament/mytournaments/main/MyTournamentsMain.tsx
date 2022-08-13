import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, useQuery } from "@apollo/client";
import MyTournamentsParentList, {
  MyTournamentsParentListFragment,
} from "./mytournaments/MyTournamentsParentList";
import MyTournamentsLoading from "./loading/MyTournamentsLoading";
import MyTournamentSearch from "./search/MyTournamentSearch";
import { useState } from "react";
import EditMyTournament from "./edit/EditMyTournament";
import MyTournamentsError from "./error/MyTournamentsError";

const TOURNAMENTS = gql`
  query GetMyTournaments($page: Int!, $limit: Int!) {
    myTournaments(page: $page, limit: $limit) {
      ...MyTournamentsParentList_PaginatedTournament
    }
  }
  ${MyTournamentsParentListFragment}
`;

const MyTournamentsMain = () => {
  const { loading, error, data } = useQuery(TOURNAMENTS, {
    variables: { page: 1, limit: 10 },
  });
  const [editId, setEditId] = useState<string | null>(null);
  if (loading) return <MyTournamentsLoading></MyTournamentsLoading>;
  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <MyTournamentsError errorNum={1} error={error}></MyTournamentsError>;
        </div>
      </div>
    );
  }
  if (!data?.myTournaments)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <MyTournamentsError errorNum={0} error={error!}></MyTournamentsError>
        </div>
      </div>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        {!editId ? <MyTournamentSearch></MyTournamentSearch> : ""}
        {editId ? (
          <EditMyTournament
            setEditId={(val: string | null) => setEditId(val)}
            editId={editId}
          ></EditMyTournament>
        ) : (
          <MyTournamentsParentList
            setEditId={(val: string) => setEditId(val)}
            tournaments={data.myTournaments.docs}
          ></MyTournamentsParentList>
        )}
      </div>
    </div>
  );
};

export default MyTournamentsMain;
