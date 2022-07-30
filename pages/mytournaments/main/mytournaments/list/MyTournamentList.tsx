import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { gql } from "@apollo/client";
import Button from "../../../../components/Button/Button";
import { decodeBlurHash } from "../../../../functions/helpers";
import { Tooltip } from "@mui/material";

interface Props {
  id: string;
  status: { progress: string };
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
        <Tooltip
          title={props.creator.identity.arena_name}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <Image src="/icons/duck.png" layout="fill"></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={props.sponsor.sponsored ? "Sponsored" : "Not Sponsored"}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <Image src="/icons/sponsor.svg" layout="fill"></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={
            props.contribution.contributed ? "Contributed" : "Not Contributed"
          }
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <Image src="/icons/bit.svg" layout="fill"></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={
            props?.analytics?.joined_users
              ? `${props?.analytics?.joined_users} Joined`
              : `0 Joined`
          }
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <p>
              {props?.analytics?.joined_users
                ? props?.analytics?.joined_users
                : 0}
            </p>
          </div>
        </Tooltip>
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
        {props.status.progress === "DONE" ? (
          <Button
            text="recap"
            link={`/track/recap?id=${props.id}`}
            disabled={false}
          ></Button>
        ) : props.status.progress === "IN-PROGRESS" ? (
          <Button
            text="recap"
            link={`/track?id=${props.id}`}
            disabled={false}
          ></Button>
        ) : (
          <Button
            text="edit"
            disabled={false}
            onClick={() => props.setEditId(props.id)}
          ></Button>
        )}
      </div>
    </li>
  );
};

export const MyTournamentListFragment = gql`
  fragment MyTournamentList_Tournament on Tournament {
    status {
      progress
    }
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
