import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { gql } from "@apollo/client";
import Button from "../../../../../components/Button/Button";
import { decodeBlurHash } from "../../../../../functions/helpers";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Icon from "../../../../../components/Icon/Icon";

interface Props {
  id: string;
  status: { progress: string };
  access: { secret: string };
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
  setEditId: (id: string) => void;
}

const MyTournamentList = (props: Props) => {
  const [copyLink, setCopyLink] = useState(false);
  const [copyLinkHover, setCopyLinkHover] = useState(false);
  const copyTournamentLink = () => {
    if (!navigator.clipboard) return;
    setCopyLink(true);
    if (props.access.secret) {
      navigator.clipboard.writeText(
        `${process.env.BRULLAH_URL}/tournament/tournaments?tid=${props.id}&secret=${props.access.secret}`
      );
    } else {
      navigator.clipboard.writeText(
        `${process.env.BRULLAH_URL}/tournament/tournaments?tid=${props.id}`
      );
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCopyLink(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [copyLink]);

  return (
    <li className={cn(styles.container)}>
      <div>
        <Tooltip
          title={props.creator.identity.arena_name}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <Image
              fill
              src={props.creator.identity.avatar.image}
              alt={props.creator.identity.arena_name}
              placeholder="blur"
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
            <Image fill src="/icons/sponsor.svg" alt=""></Image>
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
            <Image fill src="/icons/bit.svg" alt=""></Image>
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
          fill
          src={props.information.thumbnail.image}
          alt={props.information.name}
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
        ) : props.status.progress === "RECONFIGURE" ? (
          <Button
            text="reconfig"
            disabled={false}
            onClick={() => props.setEditId(props.id)}
          ></Button>
        ) : (
          <>
            <div
              className={cn(copyLink ? styles.copiedLink : "", styles.copyLink)}
              onMouseEnter={() => setCopyLinkHover(true)}
              onMouseLeave={() => setCopyLinkHover(false)}
              onClick={() => copyTournamentLink()}
            >
              <Icon
                hover={copyLinkHover}
                activeLink="/icons/copy/active.svg"
                inactiveLink="/icons/copy/inactive.svg"
                alt={"Copy Tournament Link Icon"}
              ></Icon>
            </div>
            <Button
              text="edit"
              disabled={false}
              onClick={() => props.setEditId(props.id)}
            ></Button>
          </>
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
    access {
      secret
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
