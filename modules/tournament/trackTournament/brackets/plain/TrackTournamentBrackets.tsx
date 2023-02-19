import TrackTournamentBrackets8 from "./5-8users/TrackTournamentBrackets8";
import TrackTournamentBrackets2 from "./2users/TrackTournamentBrackets2";
import TrackTournamentBrackets4 from "./4users/TrackTournamentBrackets4";

interface Props {
  userId: string;
  arenaNumber: number;
  roundNumber: number;
  sectionNumber: number;
  numOfUsersInSection: number;
  tournamentId: string;
  gameNumber: number;
}

const TrackTournamentBrackets = ({
  userId,
  arenaNumber,
  roundNumber,
  sectionNumber,
  numOfUsersInSection,
  tournamentId,
  gameNumber,
}: Props) => {
  switch (numOfUsersInSection) {
    case 1:
    case 2:
    case 3:
      return (
        <TrackTournamentBrackets2
          userId={userId}
          gameNumber={gameNumber}
          tournamentId={tournamentId}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matchNumber={sectionNumber === 1 ? 1 : 5}
        ></TrackTournamentBrackets2>
      );
    case 4:
      return (
        <TrackTournamentBrackets4
          userId={userId}
          gameNumber={gameNumber}
          tournamentId={tournamentId}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matchNumber={sectionNumber === 1 ? 1 : 5}
        ></TrackTournamentBrackets4>
      );
    default:
      return (
        <TrackTournamentBrackets8
          userId={userId}
          gameNumber={gameNumber}
          tournamentId={tournamentId}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matchNumber={sectionNumber === 1 ? 1 : 5}
        ></TrackTournamentBrackets8>
      );
  }
};

export default TrackTournamentBrackets;
