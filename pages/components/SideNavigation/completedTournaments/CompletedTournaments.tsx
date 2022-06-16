import { gql, NetworkStatus, useQuery } from "@apollo/client";
import classNames from "classnames";
import moment from "moment";
import { useEffect, useState } from "react";
import Completed from "./completed/Completed";
import CompletedTournamentsError from "./error/CompletedTournamentsError";
import CompletedTournamentsLoading from "./loading/CompletedTournamentsLoading";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const COMPLETED_MATCHES = gql`
  query JoinedNotStartedMatches($page: Int!, $limit: Int!, $progress: String!) {
    joinedMatches(page: $page, limit: $limit, progress: $progress) {
      page
      hasNextPage
      docs {
        id
        tournament {
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
  }
`;

const CompletedTournaments = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, networkStatus, fetchMore, refetch } = useQuery(
    COMPLETED_MATCHES,
    {
      variables: {
        page: page,
        limit: 10,
        progress: "COMPLETED",
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const onLoadMore = () => {
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data.joinedMatches.hasNextPage
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
    if (data?.joinedMatches) {
      setPage(data.joinedMatches.page);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch({ page: 1 });
      setPage(1);
    }, moment.duration(10, "minutes").asMilliseconds());
    return () => clearInterval(interval);
  }, []);

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
          <h3>Completed</h3>
        </div>
      </div>
      {data.joinedMatches.length > 0 ? (
        <ul className={cn(styles.tournamentList)} onScroll={handleScroll}>
          {data.joinedMatches.docs.map((m: any) => {
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
