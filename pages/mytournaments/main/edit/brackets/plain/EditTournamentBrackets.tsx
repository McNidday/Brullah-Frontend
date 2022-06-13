import EditTournamentBrackets8 from "./5-8users/EditTournamentBrackets8";
import EditTournamentBrackets2 from "./2users/EditTournamentBrackets2";
import EditTournamentBrackets4 from "./4users/EditTournamentBrackets4";

interface Props {
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
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

const EditTournamentBrackets = ({
  activeEdit,
  setActiveEdit,
  arenaNumber,
  roundNumber,
  matches,
  time,
}: Props) => {
  switch (matches.length) {
    case 1:
      return (
        <EditTournamentBrackets2
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></EditTournamentBrackets2>
      );
    case 2:
      return (
        <EditTournamentBrackets4
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></EditTournamentBrackets4>
      );
    default:
      return (
        <EditTournamentBrackets8
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matches={matches}
          time={time}
        ></EditTournamentBrackets8>
      );
  }
};

export default EditTournamentBrackets;
