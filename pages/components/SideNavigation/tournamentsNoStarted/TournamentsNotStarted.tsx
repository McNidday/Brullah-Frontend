import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import TournamentNotStartedError from "./error/TournamentNotStartedError";
import TournamentNotStartedLoading from "./loading/TournamentNotStartedLoading";
import NotStarted from "./notStarted/NotStarted";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const NOT_STARTED_TOURNAMENTS = gql`
  query JoinedNotStartedTournaments(
    $page: Int!
    $limit: Int!
    $progress: String!
  ) {
    joinedTournaments(page: $page, limit: $limit, progress: $progress) {
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
  const { data, error, loading } = useQuery(NOT_STARTED_TOURNAMENTS, {
    variables: {
      page: 1,
      limit: 10,
      progress: "CONFIGURE",
    },
  });

  if (loading)
    return <TournamentNotStartedLoading></TournamentNotStartedLoading>;
  if (error && (error?.networkError as any).statusCode !== 401) {
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
          <h3>Not Started</h3>
        </div>
      </div>
      {data.joinedTournaments.docs.length > 0 ? (
        <ul className={cn(styles.tournamentList)}>
          {data.joinedTournaments.docs.map((t: any) => {
            return <NotStarted {...t}></NotStarted>;
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
