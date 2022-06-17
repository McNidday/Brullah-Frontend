import TrackTournamentBrackets8 from "./5-8users/TrackTournamentBrackets8";
import TrackTournamentBrackets2 from "./2users/TrackTournamentBrackets2";
import TrackTournamentBrackets4 from "./4users/TrackTournamentBrackets4";

interface Props {
  arenaNumber: number;
  roundNumber: number;
  matches: Array<{
    matchNumber: number;
    progress: string;
    slot_one: {
      joined: boolean;
      user: {
        identity: {
          arena_name: string;
          avatar: {
            image: string;
            blurhash: string;
          };
        };
      };
      reason: string;
    };
    slot_two: {
      joined: boolean;
      user: {
        identity: {
          arena_name: string;
          avatar: {
            image: string;
            blurhash: string;
          };
        };
      };
      reason: string;
    };
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
  arenaNumber,
  roundNumber,
  matches,
  time,
}: Props) => {
  switch (matches.length) {
    case 1:
      return (
        <TrackTournamentBrackets2
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></TrackTournamentBrackets2>
      );
    case 2:
      return (
        <TrackTournamentBrackets4
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></TrackTournamentBrackets4>
      );
    default:
      return (
        <TrackTournamentBrackets8
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></TrackTournamentBrackets8>
      );
  }
};

export default TrackTournamentBrackets;
