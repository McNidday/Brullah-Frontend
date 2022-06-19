import TrackTournamentBrackets8 from "./5-8users/TrackTournamentBrackets8";
import TrackTournamentBrackets2 from "./2users/TrackTournamentBrackets2";
import TrackTournamentBrackets4 from "./4users/TrackTournamentBrackets4";

interface User {
  id: string;
  identity: {
    arena_name: string;
    avatar: {
      image: string;
      blurhash: string;
    };
  };
}

interface Slot {
  joined: boolean;
  user: User;
  reason: string;
  winner: boolean;
}

interface Props {
  userId: string;
  arenaNumber: number;
  roundNumber: number;
  arenaWinner: {
    status: "IN-PROGRESS" | "NONE" | "DONE";
    user: User;
  };
  matches: Array<{
    done: boolean;
    matchNumber: number;
    progress: string;
    slot_one: Slot;
    slot_two: Slot;
  }>;
  time: {
    arenaNumber: number;
    rounds: Array<{
      roundNumber: number;
      matches: [
        {
          matchNumber: number;
          time: number;
        }
      ];
    }>;
  };
}

const TrackTournamentBrackets = ({
  userId,
  arenaWinner,
  arenaNumber,
  roundNumber,
  matches,
  time,
}: Props) => {
  switch (matches.length) {
    case 1:
      return (
        <TrackTournamentBrackets2
          userId={userId}
          arenaWinner={arenaWinner}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></TrackTournamentBrackets2>
      );
    case 2:
      return (
        <TrackTournamentBrackets4
          userId={userId}
          arenaWinner={arenaWinner}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></TrackTournamentBrackets4>
      );
    default:
      return (
        <TrackTournamentBrackets8
          userId={userId}
          arenaWinner={arenaWinner}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></TrackTournamentBrackets8>
      );
  }
};

export default TrackTournamentBrackets;
