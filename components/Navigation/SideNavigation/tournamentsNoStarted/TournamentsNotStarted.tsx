import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { Duration } from "luxon";
import classNames from "classnames";
import { useEffect, useState, useCallback } from "react";
import TournamentNotStartedError from "./error/TournamentNotStartedError";
import TournamentNotStartedLoading from "./loading/TournamentNotStartedLoading";
import NotStarted from "./notStarted/NotStarted";
import styles from "./styles.module.scss";
import { TournamentType } from "../../../../types/tournament";
const cn = classNames.bind(styles);

const NOT_STARTED_MATCHES = gql`
  query JoinedNotStartedTournaments(
    $page: Int!
    $limit: Int!
    $search: String
    $status: [String]
  ) {
    joinedTournaments(
      page: $page
      limit: $limit
      search: $search
      status: $status
    ) {
      page
      hasNextPage
      docs {
        id
        start_date
        information {
          name
          thumbnail {
            image
            blurhash
          }
        }
      }
    }
  }
`;

const TournamentsNotStarted = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, networkStatus, fetchMore, refetch } = useQuery<{
    joinedTournaments: {
      hasNextPage: boolean;
      page: number;
      docs: Array<TournamentType>;
    };
  }>(NOT_STARTED_MATCHES, {
    variables: {
      page: page,
      limit: 10,
      search: "",
      status: ["NOT-STARTED"],
    },
    notifyOnNetworkStatusChange: true,
  });

  const refetchData = useCallback(refetch, [refetch]);

  const onLoadMore = () => {
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data?.joinedTournaments.hasNextPage
    )
      return;
    fetchMore({
      variables: {
        page: page + 1,
      },
    });
  };

  const handleScroll = (e: any) => {
    if (
      e.currentTarget!.scrollTop + e.currentTarget!.clientHeight >=
      e.currentTarget!.scrollHeight
    ) {
      onLoadMore();
    }
  };

  useEffect(() => {
    if (data?.joinedTournaments) {
      setPage(data.joinedTournaments.page);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchData({ page: 1 });
      setPage(1);
    }, Duration.fromObject({ minutes: 10 }).as("milliseconds"));
    return () => clearInterval(interval);
  }, [refetchData]);

  if (loading && NetworkStatus.loading === networkStatus)
    return <TournamentNotStartedLoading></TournamentNotStartedLoading>;
  if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <TournamentNotStartedError
        error={error}
        code={401}
      ></TournamentNotStartedError>
    );
  }
  if (error)
    return (
      <TournamentNotStartedError
        error={error}
        code={200}
      ></TournamentNotStartedError>
    );
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h4>Not Started</h4>
        </div>
      </div>
      {data?.joinedTournaments?.docs &&
      data.joinedTournaments.docs.length > 0 ? (
        <ul className={cn(styles.tournamentList)} onScroll={handleScroll}>
          {data.joinedTournaments.docs.map((m) => {
            return <NotStarted key={m.id} {...m}></NotStarted>;
          })}
        </ul>
      ) : (
        <div className={cn(styles.warnContainer)}>
          <p>Nothing here (x_x)</p>
        </div>
      )}
    </div>
  );
};

export default TournamentsNotStarted;
