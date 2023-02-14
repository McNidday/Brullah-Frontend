import TrackTournamentBrackets8 from "./5-8users/TrackTournamentBrackets8";
import TrackTournamentBrackets2 from "./2users/TrackTournamentBrackets2";
import TrackTournamentBrackets4 from "./4users/TrackTournamentBrackets4";

interface User {
  id: string;
  identity: {
    brullah_name: string;
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

interface Match {
  done: boolean;
  matchNumber: number;
  progress: string;
  slot_one: Slot;
  slot_two: Slot;
}

interface Round {
  roundNumber: number;
  matches: Array<Match>;
}

interface Props {
  userId: string;
  arenaNumber: number;
  roundNumber: number;
  arenaWinner: {
    status: "IN-PROGRESS" | "NONE" | "DONE";
    user: User;
  };
  rounds: Array<Round>;
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
  rounds,
  time,
}: Props) => {
  switch (rounds[0].matches.length) {
    case 1:
      return (
        <TrackTournamentBrackets2
          userId={userId}
          arenaWinner={arenaWinner}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          rounds={rounds}
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
          rounds={rounds}
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
          rounds={rounds}
          time={time}
        ></TrackTournamentBrackets8>
      );
  }
};

export default TrackTournamentBrackets;
