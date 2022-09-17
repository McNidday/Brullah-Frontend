import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import Button from "../../../../../components/Button/Button";
import {
  gql,
  NetworkStatus,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { decodeBlurHash } from "../../../../../functions/helpers";
import { CircularProgress, Tooltip } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import numeral from "numeral";

interface Props {
  setJoinTournamentId: (id: string) => void;
  handleModalOpen: () => void;
  user: { id: string } | null;
  id: string;
  information: {
    name: string;
    description: string;
    thumbnail: { image: string; blurhash: string };
  };
  analytics: { joined_users: number };
  creator: {
    id: string;
    identity: {
      arena_name: string;
      avatar: { image: string; blurhash: string };
    };
    stats: {
      tournament: {
        likes: number;
      };
    };
  };
  match: { users: { joined: Array<string> } };
  sponsor: { sponsored: boolean };
  contribution: { contributed: boolean };
}

const CHECKLIKE = gql`
  query CheckLike($id: ID!) {
    liked(check: $id)
  }
`;

const LIKE = gql`
  mutation LikeCreator($id: ID!) {
    like(liked: $id) {
      identity {
        email
      }
    }
  }
`;

const UNLIKE = gql`
  mutation UnLikeCreator($id: ID!) {
    unlike(unLiked: $id) {
      identity {
        email
      }
    }
  }
`;

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      creator {
        id
        identity {
          arena_name
          avatar {
            image
            blurhash
          }
        }
        match {
          users {
            joined {
              id
            }
          }
        }
        stats {
          tournament {
            likes
          }
        }
      }
    }
  }
`;

const TournamentList = (props: Props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [joined, setJoined] = useState<"joined" | "loading" | "not-joined">(
    "loading"
  );

  const { data, networkStatus, refetch } = useQuery(CHECKLIKE, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    variables: {
      id: props.creator.id,
    },
  });
  const [like, { data: likeData }] = useMutation(LIKE, {
    variables: {
      id: props.creator.id,
    },
  });
  const [unLike, { data: unLikeData }] = useMutation(UNLIKE, {
    variables: {
      id: props.creator.id,
    },
  });
  const [getTournament, { data: statsData, called, refetch: statsRefetch }] =
    useLazyQuery(TOURNAMENT, {
      variables: {
        id: props.id,
      },
    });

  const handleLike = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    if (e.target.checked) {
      like();
    } else {
      unLike();
    }
  };

  useEffect(() => {
    if (data?.liked) {
      setLikeStatus(true);
    } else {
      setLikeStatus(false);
    }
  }, [data]);

  useEffect(() => {
    if (likeData || unLikeData) {
      refetch();
      if (called) {
        statsRefetch();
      } else {
        getTournament();
      }
    }
  }, [likeData, unLikeData]);

  useEffect(() => {
    if (props?.match?.users?.joined) {
      const userIndex = props.match.users.joined.findIndex((u: any) => {
        return u.id === props.user?.id;
      });
      if (userIndex >= 0) {
        setJoined("joined");
      } else {
        setJoined("not-joined");
      }
    } else {
      setJoined("not-joined");
    }
  }, [data]);

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
        <p>{props.information.description}</p>
      </div>
      <div>
        <Button
          text={
            joined === "joined"
              ? "withdraw"
              : joined === "loading"
              ? "..."
              : "join"
          }
          disabled={false}
          onClick={() => {
            props.setJoinTournamentId(props.id);
            props.handleModalOpen();
          }}
        ></Button>
      </div>
      <div>
        {networkStatus === NetworkStatus.ready ? (
          <div>
            <input
              type="checkbox"
              checked={likeStatus}
              onChange={handleLike}
              id={`${props.id}~liked`}
            ></input>
            <label
              data-likes={
                statsData?.tournament?.creator?.stats?.tournament?.likes
                  ? statsData.tournament.creator.stats.tournament.likes
                  : numeral(props?.creator?.stats?.tournament?.likes).format(
                      "0a"
                    )
                  ? numeral(props?.creator?.stats?.tournament?.likes).format(
                      "0a"
                    )
                  : 0
              }
              htmlFor={`${props.id}~liked`}
            >
              <span></span>
            </label>
          </div>
        ) : networkStatus === NetworkStatus.error ? (
          <Tooltip
            title={`Login to like 🥴`}
            componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
          >
            <div>
              <input
                type="checkbox"
                checked={likeStatus}
                onChange={handleLike}
                id={`${props.id}~liked`}
              ></input>
              <label
                data-likes={
                  statsData?.tournament?.creator?.stats?.tournament?.likes
                    ? statsData.tournament.creator.stats.tournament.likes
                    : numeral(props?.creator?.stats?.tournament?.likes).format(
                        "0a"
                      )
                    ? numeral(props?.creator?.stats?.tournament?.likes).format(
                        "0a"
                      )
                    : 0
                }
                className={cn(!props.user ? styles.disableLike : "")}
                htmlFor={`${props.id}~liked`}
              >
                <span></span>
              </label>
            </div>
          </Tooltip>
        ) : (
          <div>
            <CircularProgress className={cn(styles.loading)}></CircularProgress>
          </div>
        )}
        <div>
          <p>
            {statsData?.tournament?.creator?.stats?.tournament?.likes
              ? statsData.tournament.creator.stats.tournament.likes
              : numeral(props?.creator?.stats?.tournament?.likes).format("0a")
              ? numeral(props?.creator?.stats?.tournament?.likes).format("0a")
              : 0}
          </p>
        </div>
      </div>
    </li>
  );
};

export const TournamentListFragment = gql`
  fragment TournamentList_Tournament on Tournament {
    creator {
      id
      identity {
        arena_name
        avatar {
          image
          blurhash
        }
      }
      stats {
        tournament {
          likes
        }
      }
    }
    match {
      users {
        joined {
          id
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
    createdAt
  }
`;

export default TournamentList;
