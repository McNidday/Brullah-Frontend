import EditTournamentBrackets8 from "./5-8users/EditTournamentBrackets8";
import EditTournamentBrackets2 from "./2users/EditTournamentBrackets2";
import EditTournamentBrackets4 from "./3-4users/EditTournamentBrackets4";

interface Props {
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
}

const EditTournamentBrackets = ({ matches }: Props) => {
  switch (matches.length) {
    case 1:
      return (
        <EditTournamentBrackets2 matches={matches}></EditTournamentBrackets2>
      );
    case 2:
      return <EditTournamentBrackets4></EditTournamentBrackets4>;
    default:
      return <EditTournamentBrackets8></EditTournamentBrackets8>;
  }
};

export default EditTournamentBrackets;
