import EditTournamentBrackets8 from "./5-8users/EditTournamentBrackets8";
import EditTournamentBrackets2 from "./2users/EditTournamentBrackets2";
import EditTournamentBrackets4 from "./4users/EditTournamentBrackets4";
import { numOfMatches } from "../../../../../../functions/helpers";

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
  time: string;
  isABye: boolean;
  sectionNumber: number;
  tournamentId: string;
  numOfUsersInSection: number;
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
  markConfigured: (id: string) => void;
  removeMarked: (arbs: string) => void;
  arenaNumber: number;
  roundNumber: number;
  timeConfig: {
    round_offset: number;
    before_dq: number;
    after_dq: number;
    match_length: number;
  };
  config: Array<{ id: string; configured: boolean; arbs: string }>;
}

const EditTournamentBrackets = ({
  time,
  removeBye,
  isABye,
  config,
  sectionNumber,
  timeConfig,
  tournamentId,
  numOfUsersInSection,
  activeEdit,
  markConfigured,
  setActiveEdit,
  removeMarked,
  arenaNumber,
  roundNumber,
}: Props) => {
  switch (numOfMatches(numOfUsersInSection, 1, roundNumber)) {
    case 1:
      return (
        <EditTournamentBrackets2
          time={time}
          isABye={isABye}
          removeBye={removeBye}
          removeMarked={removeMarked}
          config={config}
          markConfigured={markConfigured}
          timeConfig={timeConfig}
          tournamentId={tournamentId}
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matchNumber={sectionNumber === 1 ? 1 : 5}
        ></EditTournamentBrackets2>
      );
    case 2:
      return (
        <EditTournamentBrackets4
          time={time}
          isABye={isABye}
          removeBye={removeBye}
          removeMarked={removeMarked}
          config={config}
          markConfigured={markConfigured}
          tournamentId={tournamentId}
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matchNumber={sectionNumber === 1 ? 1 : 5}
        ></EditTournamentBrackets4>
      );
    default:
      return (
        <EditTournamentBrackets8
          time={time}
          isABye={isABye}
          removeBye={removeBye}
          removeMarked={removeMarked}
          config={config}
          markConfigured={markConfigured}
          tournamentId={tournamentId}
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          arenaNumber={arenaNumber}
          roundNumber={roundNumber}
          matchNumber={sectionNumber === 1 ? 1 : 5}
        ></EditTournamentBrackets8>
      );
  }
};

export default EditTournamentBrackets;
