import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBrackets from "../plain/EditTournamentBrackets";
import Button from "../../../../../components/Button/Button";
import { useEffect, useState } from "react";

interface Props {
  users: [];
  config: {
    arenaNumber: number;
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
  };
}

const EditTournamentArenaBrackets = ({ config, users }: Props) => {
  const [section, setSection] = useState(1);
  const [numOfSections, setNumOfSections] = useState(1);

  useEffect(() => {
    if (users && users.length <= 8) {
      setNumOfSections(1);
    }

    if (users && users.length > 8) {
      setNumOfSections(2);
    }
  }, [users]);
  console.log(config);
  return (
    <div className={cn(styles.container)}>
      <h2>Arena 1</h2>
      <div className={cn(styles.brackets)}>
        <div className={cn(styles.sectionNav)}>
          <Button
            text="Section 1"
            disabled={false}
            forceActive={section === 1 ? true : false}
            onClick={() => setSection(1)}
          ></Button>
          {numOfSections === 2 ? (
            <Button
              text="Section 2"
              disabled={false}
              forceActive={section === 2 ? true : false}
              onClick={() => setSection(2)}
            ></Button>
          ) : (
            ""
          )}
        </div>
        <div className={cn(styles.sections)}>
          <section>
            <EditTournamentBrackets
              matches={config?.matches}
              numberOfUsers={5}
            ></EditTournamentBrackets>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditTournamentArenaBrackets;
