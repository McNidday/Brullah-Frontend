import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import MyTournamentsParentList, {
  MyTournamentsParentListFragment,
} from "./mytournaments/MyTournamentsParentList";
import MyTournamentsLoading from "./loading/MyTournamentsLoading";
import MyTournamentSearch from "./search/MyTournamentSearch";
import { useEffect, useRef, useState } from "react";
import EditMyTournament from "./edit/EditMyTournament";
import MyTournamentsError from "./error/MyTournamentsError";
import debounce from "lodash.debounce";

interface Props {
  id: string;
}

const TOURNAMENTS = gql`
  query GetMyTournaments($id: ID!, $page: Int!, $limit: Int!, $search: String) {
    myTournaments(id: $id, page: $page, limit: $limit, search: $search) {
      page
      hasNextPage
      ...MyTournamentsParentList_PaginatedTournament
    }
  }
  ${MyTournamentsParentListFragment}
`;

const MyTournamentsMain = ({ id }: Props) => {
  const [page, setPage] = useState(1);
  const { loading, error, data, networkStatus, fetchMore, refetch } = useQuery(
    TOURNAMENTS,
    {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
      variables: {
        id: id,
        page: page,
        limit: 10,
        search: "",
      },
    }
  );

  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const getSearchResults = useRef(
    debounce((val: string) => {
      if (val) {
        refetch({
          page: 1,
          search: val,
          limit: 10,
        });
      } else {
        refetch({
          page: 1,
          search: "",
          limit: 10,
        });
      }
    }, 500)
  ).current;

  const handleSearch = (val: string) => {
    if (val && val !== "") {
      setSearch(val);
    } else {
      setSearch(null);
    }
    getSearchResults(val);
  };

  const onLoadMore = () => {
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data.myTournaments.hasNextPage
    )
      return;
    fetchMore({
      variables: {
        page: page + 1,
      },
    });
  };

  useEffect(() => {
    if (data?.myTournaments) {
      setPage(data.myTournaments.page);
    }
  }, [data]);

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
          <MyTournamentsError errorNum={0} error={error!}></MyTournamentsError>
        </div>
      </div>
    );
  }
  if (
    (loading && NetworkStatus.loading === networkStatus) ||
    NetworkStatus.refetch === networkStatus ||
    !data?.myTournaments
  )
    return <MyTournamentsLoading></MyTournamentsLoading>;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        {!editId ? (
          <MyTournamentSearch
            search={search}
            setSearch={handleSearch}
          ></MyTournamentSearch>
        ) : (
          ""
        )}
        {editId ? (
          <EditMyTournament
            setEditId={(val: string | null) => setEditId(val)}
            editId={editId}
          ></EditMyTournament>
        ) : (
          <MyTournamentsParentList
            search={search}
            hasNextPage={data.myTournaments.hasNextPage}
            networkStatus={networkStatus}
            onLoadMore={onLoadMore}
            setEditId={(val: string) => setEditId(val)}
            tournaments={data.myTournaments.docs}
          ></MyTournamentsParentList>
        )}
      </div>
    </div>
  );
};

export default MyTournamentsMain;
