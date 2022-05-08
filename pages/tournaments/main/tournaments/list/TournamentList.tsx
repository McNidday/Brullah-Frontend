import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import Button from "../../../../components/Button/Button";
import { gql } from "@apollo/client";

interface Props {
  id: string;
  information: { name: string; description: string };
  analytics: { joined_users: number };
  creator: { identity: { arena_name: string } };
  sponsor: { sponsored: boolean };
  contribution: { contributed: boolean };
}

const TournamentList = (props: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <div>
          <span>{props.creator.identity.arena_name}</span>
          <Image src="/icons/duck.png" layout="fill"></Image>
        </div>
        <div>
          <span>{props.sponsor.sponsored ? "Sponsored" : "Not Sponsored"}</span>
          <Image src="/icons/sponsor.svg" layout="fill"></Image>
        </div>
        <div>
          <span>
            {props.contribution.contributed ? "Contributed" : "Not Contributed"}
          </span>
          <Image src="/icons/bit.svg" layout="fill"></Image>
        </div>
        <div>
          <span>{props.analytics.joined_users} joined</span>
          <p>{props.analytics.joined_users}</p>
        </div>
      </div>
      <div>
        <Image src="/icons/pig.jpg" layout="fill"></Image>
      </div>
      <div>
        <h3>{props.information.name}</h3>
      </div>
      <div>
        <p>{props.information.description}</p>
      </div>
      <div>
        <Button text="join" disabled={false}></Button>
      </div>
    </li>
  );
};

export const TournamentListFragment = gql`
  fragment TournamentList_Tournament on Tournament {
    creator {
      identity {
        arena_name
      }
    }
    analytics {
      joined_users
    }
    sponsor {
      sponsored
    }
    contribution {
      contributed
    }
    information {
      name
      description
    }
  }
`;

export default TournamentList;