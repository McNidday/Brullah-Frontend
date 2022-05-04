import styles from "./styles.module.scss";
import cn from "classnames";
import TournamentList, { TournamentListFragment } from "./list/TournamentList";
import { gql } from "@apollo/client";

interface Props {
  tournaments: Array<{
    id: string;
    information: { name: string; description: string };
    analytics: { joined_users: number };
    creator: { identity: { arena_name: string } };
    sponsor: { sponsored: boolean };
    contribution: { contributed: boolean };
  }>;
}

const TournamentsMain = (props: Props) => {
  return (
    <div className={cn(styles.container)}>
      <ul>
        {props.tournaments.map((t) => {
          return <TournamentList key={t.id} {...t}></TournamentList>;
        })}
      </ul>
    </div>
  );
};

export const TournamentsMainFragment = gql`
  fragment TournamentsMain_PaginatedTournament on PaginatedTournamentType {
    docs {
      id
      ...TournamentList_Tournament
    }
  }
  ${TournamentListFragment}
`;

export default TournamentsMain;
