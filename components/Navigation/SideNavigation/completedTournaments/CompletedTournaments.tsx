import { gql, NetworkStatus, useQuery } from "@apollo/client";
import classNames from "classnames";
import { Duration } from "luxon";
import { useEffect, useState, useCallback } from "react";
import Completed from "./completed/Completed";
import CompletedTournamentsError from "./error/CompletedTournamentsError";
import CompletedTournamentsLoading from "./loading/CompletedTournamentsLoading";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const COMPLETED_MATCHES = gql`
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

const CompletedTournaments = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, networkStatus, fetchMore, refetch } = useQuery<{
    joinedTournaments: {
      hasNextPage: boolean;
      page: number;
      docs: Array<{
        id: string;
        start_date: string;
        information: {
          name: string;
          thumbnail: {
            image: string;
            blurhash: string;
          };
        };
      }>;
    };
  }>(COMPLETED_MATCHES, {
    variables: {
      page: page,
      limit: 10,
      search: "",
      status: ["DONE"],
    },
    notifyOnNetworkStatusChange: true,
  });

  const refetchData = useCallback(refetch, [refetch]);

  const onLoadMore = () => {
    if (!data || loading) return;
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data.joinedTournaments.hasNextPage
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
    return <CompletedTournamentsLoading></CompletedTournamentsLoading>;

  if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <CompletedTournamentsError
        error={error}
        code={401}
      ></CompletedTournamentsError>
    );
  }
  if (error)
    return (
      <CompletedTournamentsError
        error={error}
        code={200}
      ></CompletedTournamentsError>
    );

  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h4>Completed</h4>
        </div>
      </div>
      {data?.joinedTournaments && data.joinedTournaments.docs.length > 0 ? (
        <ul className={cn(styles.tournamentList)} onScroll={handleScroll}>
          {data.joinedTournaments.docs.map((m) => {
            return <Completed key={m.id} {...m}></Completed>;
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

export default CompletedTournaments;
