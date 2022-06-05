import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentArenaBrackets from "./brackets/arena/EditTournamentArenaBrackets";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  getAreanaFromConfig,
  getNumOfArenas,
} from "../../../functions/helpers";

interface Props {
  editId: string;
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      analytics {
        joined_users
      }
      match {
        id
        users {
          joined {
            identity {
              arena_name
            }
          }
        }
        configuration {
          configure {
            winner {
              user
              status
            }
            arenaNumber
            rounds {
              roundNumber
              matches {
                matchNumber
                progress
                bye {
                  advanced
                  user
                  reason
                }
                slot_one {
                  joined
                  winner
                  user
                  reason
                }
                slot_two {
                  joined
                  winner
                  user
                  reason
                }
              }
            }
          }
        }
      }
    }
  }
`;

const EditMyTournament = ({ editId }: Props) => {
  const { loading, error, data } = useQuery(TOURNAMENT, {
    variables: {
      id: editId,
    },
  });
  const [numOfArenas, setNumOfArenas] = useState(0);
  const [arenas, setArenas] = useState<Array<JSX.Element> | null>(null);

  useEffect(() => {
    if (data?.tournament) {
      // setNumOfArenas(getNumOfArenas(data.tournament.analytics.joined_users));
      setNumOfArenas(2);
    }
  }, data);

  useEffect(() => {
    if (data?.tournament) {
      const theArenas = [];
      for (let i = 0; i < numOfArenas; i++) {
        const arenaConfig = getAreanaFromConfig(
          i + 1,
          data.tournament.match.configuration.configure
        );
        const users = data?.tournament?.match?.joined
          ? data.tournament.match.joined.slice(i * 16, (i + 1) * 16)
          : [];
        theArenas.push(
          <EditTournamentArenaBrackets
            users={users}
            config={arenaConfig}
          ></EditTournamentArenaBrackets>
        );
      }
      setArenas(theArenas);
    }
  }, [numOfArenas]);

  console.log(data);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className={cn(styles.editNavigation)}>Navigation</div>
      <div className={cn(styles.editContainer)}>{arenas?.map((a) => a)}</div>
    </>
  );
};

export default EditMyTournament;
