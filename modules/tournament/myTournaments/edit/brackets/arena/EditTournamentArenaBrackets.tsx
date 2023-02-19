import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBrackets from "../plain/EditTournamentBrackets";
import Button from "../../../../../../components/Button/Button";
import { useEffect, useState } from "react";
import { isByeNumber, numOfMatches } from "../../../../../../functions/helpers";
import Icon from "../../../../../../components/Icon/Icon";

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
  tournamentId: string;
  numOfJoined: number;
  arenaNumber: number;
  activeArena: boolean;
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
  handleActiveArena: (arena: number) => void;
  markConfigured: (id: string) => void;
  removeMarked: (arbs: string) => void;
  config: Array<{ id: string; configured: boolean; arbs: string }>;
}

const EditTournamentArenaBrackets = ({
  time,
  removeBye,
  tournamentId,
  numOfJoined,
  arenaNumber,
  activeArena,
  markConfigured,
  handleActiveArena,
  setActiveEdit,
  removeMarked,
  activeEdit,
  config,
}: Props) => {
  const [arenaHover, setArenaHover] = useState(false);
  const [section, setSection] = useState(1);
  const [sectionOne, setSectionOne] = useState<boolean>(false);
  const [sectionTwo, setSectionTwo] = useState<boolean>(false);
  const [numOfUsersInArena, setNumOfUsersInArena] = useState(0);

  useEffect(() => {
    let num = numOfJoined;
    for (let i = 1; i < arenaNumber; i++) {
      num -= 16;
    }
    setNumOfUsersInArena(num);
    if (
      numOfMatches(numOfJoined, arenaNumber, 1) <= 4 ||
      numOfMatches(numOfJoined, arenaNumber, 1) > 4
    ) {
      setSectionOne(true);
    }

    if (numOfMatches(numOfJoined, arenaNumber, 1) > 4) {
      setSectionTwo(true);
    }
  }, [numOfJoined, arenaNumber]);

  return (
    <div className={cn(styles.container)}>
      <div
        onMouseEnter={() => setArenaHover(true)}
        onMouseLeave={() => setArenaHover(false)}
        className={cn(styles.arenaNav)}
        onClick={() => {
          if (
            activeEdit &&
            parseInt(activeEdit?.split(":")[0]) !== arenaNumber
          ) {
            setActiveEdit(null);
          }
          handleActiveArena(arenaNumber);
        }}
      >
        <h2>Arena {arenaNumber}</h2>
        <div
          className={cn(
            styles.openArenaIcon,
            !activeArena ? styles.inactiveOpenArenaIcon : ""
          )}
        >
          <Icon
            activeLink="/icons/dropdown/active.svg"
            inactiveLink="/icons/dropdown/inactive.svg"
            hover={arenaHover}
            alt="DropDown Icon"
          ></Icon>
        </div>
      </div>
      <div
        className={cn(
          styles.brackets,
          !activeArena ? styles.inactiveBrackets : ""
        )}
      >
        <div className={cn(styles.sectionNav)}>
          {sectionOne ? (
            <Button
              text="Section 1"
              disabled={false}
              forceActive={section === 1 ? true : false}
              onClick={() => {
                if (section !== 1) {
                  setActiveEdit(null);
                }
                setSection(1);
              }}
            ></Button>
          ) : (
            ""
          )}
          {sectionTwo ? (
            <Button
              text="Section 2"
              disabled={false}
              forceActive={section === 2 ? true : false}
              onClick={() => {
                if (section !== 2) {
                  setActiveEdit(null);
                }
                setSection(2);
              }}
            ></Button>
          ) : (
            ""
          )}
        </div>
        <div className={cn(styles.sections)}>
          {sectionOne && section === 1 ? (
            <section>
              <EditTournamentBrackets
                time={time}
                removeBye={removeBye}
                isABye={isByeNumber(numOfUsersInArena)}
                removeMarked={removeMarked}
                config={config}
                markConfigured={markConfigured}
                numOfUsersInSection={
                  numOfUsersInArena >= 8 ? 8 : numOfUsersInArena
                }
                tournamentId={tournamentId}
                activeEdit={activeEdit}
                setActiveEdit={setActiveEdit}
                roundNumber={1}
                arenaNumber={arenaNumber}
                sectionNumber={1}
              ></EditTournamentBrackets>
            </section>
          ) : (
            ""
          )}
          {sectionTwo && section === 2 ? (
            <section>
              <EditTournamentBrackets
                time={time}
                removeBye={removeBye}
                isABye={isByeNumber(numOfUsersInArena)}
                removeMarked={removeMarked}
                config={config}
                markConfigured={markConfigured}
                numOfUsersInSection={numOfUsersInArena - 8}
                tournamentId={tournamentId}
                activeEdit={activeEdit}
                setActiveEdit={setActiveEdit}
                roundNumber={1}
                arenaNumber={arenaNumber}
                sectionNumber={2}
              ></EditTournamentBrackets>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTournamentArenaBrackets;
