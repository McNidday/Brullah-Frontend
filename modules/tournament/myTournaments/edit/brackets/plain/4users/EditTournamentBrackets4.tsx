import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBracket from "../bracket/EditTournamentBracket";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { MatchType } from "../../../../../../../types/match";
import EditTournamentWinnerBracket from "../winner/EditTournamentWinnerBracket";

interface Props {
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
  time: string;
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

const EditTournamentBrackets4 = ({
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
  const {
    loading: loadingOne,
    data: dataOne,
    refetch: refetchOne,
  } = useQuery<{
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

  const {
    loading: loadingTwo,
    data: dataTwo,
    refetch: refetchTwo,
  } = useQuery<{
    match: MatchType;
  }>(MATCH, {
    variables: {
      input: {
        tournament: tournamentId,
        game: 1,
        arena_number: arenaNumber,
        round_number: roundNumber,
        match_number: matchNumber + 1,
      },
    },
  });

  const [initializedConfigOne, setInitializedConfigOne] =
    useState<boolean>(false);
  const [initializedConfigTwo, setInitializedConfigTwo] =
    useState<boolean>(false);

  const refetchMatch = (arbs: string) => {
    if (arbs === `${arenaNumber}:${roundNumber}:${matchNumber}`) {
      refetchOne();
    } else {
      refetchTwo();
    }
  };

  useEffect(() => {
    if (!loadingOne && dataOne && !initializedConfigOne) {
      if (dataOne.match.bye_slot?.user) {
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
          removeBye(input).then(() => refetchOne());
        }
      }
      setInitializedConfigOne(() => true);
    }
    if (!loadingTwo && dataTwo && !initializedConfigTwo) {
      if (dataTwo.match.bye_slot?.user) {
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
            return (
              s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber + 1}:1`
            );
          });
          if (slotOneIndex > -1) input.slot_one = config[slotOneIndex].id;
          const slotTwoIndex = config.findIndex((s) => {
            return (
              s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber + 1}:2`
            );
          });
          if (slotTwoIndex > -1) input.slot_two = config[slotTwoIndex].id;
          removeBye(input).then(() => refetchTwo());
        }
      }
      setInitializedConfigTwo(() => true);
    }
  }, [
    time,
    refetchTwo,
    tournamentId,
    isABye,
    config,
    refetchOne,
    removeBye,
    arenaNumber,
    roundNumber,
    matchNumber,
    dataTwo,
    loadingTwo,
    dataOne,
    loadingOne,
    initializedConfigOne,
    initializedConfigTwo,
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
                {loadingOne || loadingTwo ? "Loading..." : "Quarterfinals"}
              </h2>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentBracket
                  removeMarked={removeMarked}
                  matchNumber={matchNumber}
                  refetchMatch={refetchMatch}
                  tournamentId={tournamentId}
                  config={config}
                  markConfigured={markConfigured}
                  byeOnly={false}
                  timeOnly={false}
                  activeEdit={activeEdit}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber}`}
                  setActiveEdit={setActiveEdit}
                  arenaNumber={arenaNumber}
                  roundNumber={roundNumber}
                  match={
                    dataOne?.match ||
                    ({ match_number: matchNumber } as MatchType)
                  }
                  time={time}
                ></EditTournamentBracket>
                <EditTournamentBracket
                  removeMarked={removeMarked}
                  matchNumber={matchNumber + 1}
                  refetchMatch={refetchMatch}
                  tournamentId={tournamentId}
                  config={config}
                  markConfigured={markConfigured}
                  byeOnly={false}
                  timeOnly={false}
                  activeEdit={activeEdit}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber + 1}`}
                  setActiveEdit={setActiveEdit}
                  arenaNumber={arenaNumber}
                  roundNumber={roundNumber}
                  match={
                    dataTwo?.match ||
                    ({ match_number: matchNumber + 1 } as MatchType)
                  }
                  time={time}
                ></EditTournamentBracket>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Finals</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentBracket
                  removeMarked={removeMarked}
                  refetchMatch={refetchMatch}
                  tournamentId={tournamentId}
                  config={config}
                  markConfigured={markConfigured}
                  byeOnly={false}
                  timeOnly={true}
                  makeFinalBefore={true}
                  match={
                    dataTwo?.match ||
                    ({ match_number: matchNumber } as MatchType)
                  }
                ></EditTournamentBracket>
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

export default EditTournamentBrackets4;
