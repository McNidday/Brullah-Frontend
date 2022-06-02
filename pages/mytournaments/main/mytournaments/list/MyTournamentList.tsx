import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { gql } from "@apollo/client";
import Button from "../../../../components/Button/Button";
import { decodeBlurHash } from "../../../../functions/helpers";

interface Props {
  id: string;
  information: {
    name: string;
    description: string;
    thumbnail: { image: string; blurhash: string };
  };
  analytics: { joined_users: number };
  creator: { identity: { arena_name: string } };
  sponsor: { sponsored: boolean };
  contribution: { contributed: boolean };
  setEditId: (id: string) => void;
}

const MyTournamentList = (props: Props) => {
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
          <span>
            {props?.analytics?.joined_users
              ? props?.analytics?.joined_users
              : 0}{" "}
            joined
          </span>
          <p>
            {props?.analytics?.joined_users
              ? props?.analytics?.joined_users
              : 0}
          </p>
        </div>
      </div>
      <div>
        <Image
          src={props.information.thumbnail.image}
          layout="fill"
          placeholder="blur"
          blurDataURL={decodeBlurHash(
            props.information.thumbnail.blurhash,
            200,
            100
          )}
        ></Image>
      </div>
      <div>
        <h3>{props.information.name}</h3>
      </div>
      <div>
        <p>{props.information.description}</p>
      </div>
      <div>
        <Button
          text="edit"
          disabled={false}
          onClick={() => props.setEditId(props.id)}
        ></Button>
      </div>
    </li>
  );
};

export const MyTournamentListFragment = gql`
  fragment MyTournamentList_Tournament on Tournament {
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
      thumbnail {
        image
        blurhash
      }
    }
  }
`;

export default MyTournamentList;
