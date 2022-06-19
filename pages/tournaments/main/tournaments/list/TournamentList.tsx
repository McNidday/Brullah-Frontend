import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import Button from "../../../../components/Button/Button";
import { gql } from "@apollo/client";
import { decodeBlurHash } from "../../../../functions/helpers";
import { Tooltip } from "@mui/material";

interface Props {
  setJoinTournamentId: (id: string) => void;
  handleModalOpen: () => void;
  id: string;
  information: {
    name: string;
    description: string;
    thumbnail: { image: string; blurhash: string };
  };
  analytics: { joined_users: number };
  creator: {
    identity: {
      arena_name: string;
      avatar: { image: string; blurhash: string };
    };
  };
  sponsor: { sponsored: boolean };
  contribution: { contributed: boolean };
}

const TournamentList = (props: Props) => {
  return (
    <li className={cn(styles.container)}>
      <div>
        <Tooltip
          title={props.creator.identity.arena_name}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <Image
              src={props.creator.identity.avatar.image}
              placeholder="blur"
              layout="fill"
              blurDataURL={decodeBlurHash(
                props.creator.identity.avatar.blurhash,
                50,
                50
              )}
            ></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={props.sponsor.sponsored ? "Sponsored" : "Not Sponsored"}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div className={cn(!props.sponsor.sponsored ? styles.disabled : "")}>
            <Image src="/icons/sponsor.svg" layout="fill"></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={
            props.contribution.contributed ? "Contributed" : "Not Contributed"
          }
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div
            className={cn(
              !props.contribution.contributed ? styles.disabled : ""
            )}
          >
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
        <p>{props.information.description} nidday maketh a man</p>
      </div>
      <div>
        <Button
          text="join"
          disabled={false}
          onClick={() => {
            props.setJoinTournamentId(props.id);
            props.handleModalOpen();
          }}
        ></Button>
      </div>
    </li>
  );
};

export const TournamentListFragment = gql`
  fragment TournamentList_Tournament on Tournament {
    creator {
      identity {
        arena_name
        avatar {
          image
          blurhash
        }
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

export default TournamentList;
