import styles from "./styles.module.scss";
import cn from "classnames";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { MatchType } from "../../../../../../../types/match";
import EditTournamentBracket from "../bracket/EditTournamentBracket";
import EditTournamentWinnerBracket from "../winner/EditTournamentWinnerBracket";

interface Props {
  time: string;
  removeBye: (input: {
    id: string;
    arena_number: number;
    round_number: number;
    match_number: number;
    slot_one?: string;
    slot_two?: string;
    bye_slot?: string;
  }) => Promise<void>;
  isABye: boolean;
  tournamentId: string;
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
  markConfigured: (id: string) => void;
  removeMarked: (arbs: string) => void;
  arenaNumber: number;
  roundNumber: number;
  matchNumber: number;
  config: Array<{ id: string; configured: boolean; arbs: string }>;
}

const MATCH = gql`
  query GetMatch($input: GetMatchInput!) {
    match(input: $input) {
      time
      match_number
      slot_two {
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
      slot_one {
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
      bye_slot {
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
    }
  }
`;

const EditTournamentBrackets2 = ({
  isABye,
  config,
  time,
  tournamentId,
  activeEdit,
  removeBye,
  markConfigured,
  setActiveEdit,
  removeMarked,
  arenaNumber,
  roundNumber,
  matchNumber,
}: Props) => {
  const { loading, error, data, refetch } = useQuery<{
    match: MatchType;
  }>(MATCH, {
    variables: {
      input: {
        tournament: tournamentId,
        game: 1,
        arena_number: arenaNumber,
        round_number: roundNumber,
        match_number: matchNumber,
      },
    },
  });
  const [initializedConfig, setInitializedConfig] = useState<boolean>(false);
  const refetchMatch = () => refetch();

  useEffect(() => {
    if (!loading && data && !initializedConfig) {
      if (data.match.bye_slot?.user) {
        if (!isABye) {
          const input: {
            id: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            time: string;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            time: time,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
          };
          // Check if slotTwo existed
          const slotOneIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:1`;
          });
          if (slotOneIndex > -1) input.slot_one = config[slotOneIndex].id;
          const slotTwoIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:2`;
          });
          if (slotTwoIndex > -1) input.slot_two = config[slotTwoIndex].id;
          removeBye(input).then(() => refetch());
        }
      }
      setInitializedConfig(() => true);
    }
  }, [
    time,
    refetch,
    isABye,
    config,
    tournamentId,
    arenaNumber,
    roundNumber,
    matchNumber,
    removeBye,
    data,
    loading,
    initializedConfig,
  ]);

  return (
    <>
      <div className={cn(styles.brackets)}>
        <div className={styles.container}>
          <div
            className={cn(styles.tournamentBracket, "tournamentBracketRounded")}
          >
            <div className={cn(styles.tournamentBracketRound)}>
              <h2 className={cn(styles.tournamentBracketRoundTitle)}>
                {loading ? "Loading..." : "Finals"}
              </h2>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentBracket
                  removeMarked={removeMarked}
                  matchNumber={matchNumber}
                  refetchMatch={refetchMatch}
                  config={config}
                  tournamentId={tournamentId}
                  markConfigured={markConfigured}
                  byeOnly={false}
                  timeOnly={false}
                  makeFinalAfter={true}
                  activeEdit={activeEdit}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber}`}
                  setActiveEdit={setActiveEdit}
                  arenaNumber={arenaNumber}
                  roundNumber={roundNumber}
                  match={
                    data?.match || ({ match_number: matchNumber } as MatchType)
                  }
                  time={time}
                ></EditTournamentBracket>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                {loading
                  ? error
                    ? error.message
                    : "Loading..."
                  : "Almost there"}
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                {data?.match.bye_slot ? (
                  <EditTournamentBracket
                    removeMarked={removeMarked}
                    refetchMatch={refetchMatch}
                    config={config}
                    tournamentId={tournamentId}
                    markConfigured={markConfigured}
                    byeOnly={true}
                    timeOnly={false}
                    makeFinalBefore={true}
                    match={
                      data?.match ||
                      ({ match_number: matchNumber } as MatchType)
                    }
                  ></EditTournamentBracket>
                ) : (
                  <EditTournamentBracket
                    removeMarked={removeMarked}
                    refetchMatch={refetchMatch}
                    config={config}
                    tournamentId={tournamentId}
                    markConfigured={markConfigured}
                    byeOnly={false}
                    timeOnly={true}
                    makeFinalBefore={true}
                    match={
                      data?.match ||
                      ({ match_number: matchNumber } as MatchType)
                    }
                  ></EditTournamentBracket>
                )}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentWinnerBracket></EditTournamentWinnerBracket>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTournamentBrackets2;
