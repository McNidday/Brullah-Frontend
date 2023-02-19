import styles from "./styles.module.scss";
import cn from "classnames";
import TrackTournamentBracket from "../bracket/TrackTournamentBracket";
import TrackTournamentWinnerBracket from "../winner/TrackTournamentWinnerBracket";
import { useEffect, useState } from "react";

interface Props {
  userId: string;
  tournamentId: string;
  arenaNumber: number;
  roundNumber: number;
  matchNumber: number;
  gameNumber: number;
}

const TrackTournamentBrackets8 = ({
  userId,
  gameNumber,
  arenaNumber,
  roundNumber,
  matchNumber,
  tournamentId,
}: Props) => {
  return (
    <>
      <div className={cn(styles.brackets)}>
        <div className={styles.container}>
          <div
            className={cn(styles.tournamentBracket, "tournamentBracketRounded")}
          >
            <div className={cn(styles.tournamentBracketRound)}>
              <h2 className={cn(styles.tournamentBracketRoundTitle)}>
                Quarterfinals
              </h2>
              <ul className={cn(styles.tournamentBracketList)}>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber}
                  matchNumber={matchNumber}
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber}`}
                ></TrackTournamentBracket>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber}
                  matchNumber={matchNumber + 1}
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber + 1}`}
                ></TrackTournamentBracket>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber}
                  matchNumber={matchNumber + 2}
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber + 2}`}
                ></TrackTournamentBracket>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber}
                  matchNumber={matchNumber + 3}
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${matchNumber + 3}`}
                ></TrackTournamentBracket>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                SemiFinals
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber + 1}
                  matchNumber={
                    matchNumber % 2 === 0
                      ? matchNumber / 2
                      : Math.round(matchNumber / 2)
                  }
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${
                    matchNumber % 2 === 0
                      ? matchNumber / 2
                      : Math.round(matchNumber / 2)
                  }`}
                ></TrackTournamentBracket>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber + 1}
                  matchNumber={
                    (matchNumber + 2) % 2 === 0
                      ? matchNumber / 2
                      : Math.round((matchNumber + 2) / 2)
                  }
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${
                    (matchNumber + 2) % 2 === 0
                      ? matchNumber / 2
                      : Math.round((matchNumber + 2) / 2)
                  }`}
                ></TrackTournamentBracket>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Finals</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <TrackTournamentBracket
                  gameNumber={gameNumber}
                  tournamentId={tournamentId}
                  roundNumber={roundNumber + 2}
                  matchNumber={
                    (matchNumber + 2) % 2 === 0
                      ? matchNumber / 2
                      : Math.round((matchNumber + 2) / 2)
                  }
                  arenaNumber={arenaNumber}
                  userId={userId}
                  makeFinalAfter={true}
                  key={`${arenaNumber}:${roundNumber}:${
                    (matchNumber + 2) % 2 === 0
                      ? matchNumber / 2
                      : Math.round((matchNumber + 2) / 2)
                  }`}
                ></TrackTournamentBracket>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <TrackTournamentWinnerBracket
                  tournamentId={tournamentId}
                  arenaNumber={arenaNumber}
                  gameNumber={gameNumber}
                ></TrackTournamentWinnerBracket>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackTournamentBrackets8;
