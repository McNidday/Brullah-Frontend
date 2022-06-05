import EditTournamentBrackets8 from "./5-8users/EditTournamentBrackets8";
import EditTournamentBrackets2 from "./2users/EditTournamentBrackets2";
import EditTournamentBrackets4 from "./3-4users/EditTournamentBrackets4";

interface Props {
  numberOfUsers: number;
  matches: [
    {
      matchNumber: number;
      progress: string;
      slot_one: {
        joined: boolean;
        user: string;
        reason: string;
      };
      slot_two: {
        joined: boolean;
        user: string;
        reason: string;
      };
    }
  ];
}

const EditTournamentBrackets = ({ numberOfUsers, matches }: Props) => {
  switch (numberOfUsers) {
    case 2:
    case 1:
      return (
        <EditTournamentBrackets2 matches={matches}></EditTournamentBrackets2>
      );
    case 4:
    case 3:
      return <EditTournamentBrackets4></EditTournamentBrackets4>;
    default:
      return <EditTournamentBrackets8></EditTournamentBrackets8>;
  }
};

export default EditTournamentBrackets;
