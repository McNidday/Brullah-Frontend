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
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import numeral from "numeral";
import Link from "next/link";

interface Props {
  user: { id: string } | null;
  id: string;
  information: {
    name: string;
    description: string;
    thumbnail: { image: string; blurhash: string };
  };
  joined: Array<{ id: string }>;
  creator: {
    id: string;
    identity: {
      brullah_name: string;
      avatar: { image: string; blurhash: string };
    };
    stats: {
      tournament: {
        likes: number;
      };
    };
  };
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
          brullah_name
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
    }
  }
`;

const TournamentList = ({
  user,
  id,
  information,
  joined,
  creator,
  sponsor,
  contribution,
}: Props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [joinedStatus, setJoinedStatus] = useState<
    "joined" | "loading" | "not-joined"
  >("loading");

  const { data, networkStatus, refetch } = useQuery(CHECKLIKE, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    variables: {
      id: creator.id,
    },
  });
  const [like, { data: likeData }] = useMutation(LIKE, {
    variables: {
      id: creator.id,
    },
  });
  const [unLike, { data: unLikeData }] = useMutation(UNLIKE, {
    variables: {
      id: creator.id,
    },
  });
  const [getTournament, { data: statsData, called, refetch: statsRefetch }] =
    useLazyQuery(TOURNAMENT, {
      variables: {
        id: id,
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

  const getTournamentCallback = useCallback(getTournament, [getTournament]);
  const refetchCallback = useCallback(refetch, [refetch]);
  const statsRefetchCallback = useCallback(statsRefetch, [statsRefetch]);

  useEffect(() => {
    if (data?.liked) {
      setLikeStatus(true);
    } else {
      setLikeStatus(false);
    }
  }, [data]);

  useEffect(() => {
    if (likeData || unLikeData) {
      refetchCallback();
      if (called) {
        statsRefetchCallback();
      } else {
        getTournamentCallback();
      }
    }
  }, [
    likeData,
    unLikeData,
    called,
    statsRefetchCallback,
    getTournamentCallback,
    refetchCallback,
  ]);

  useEffect(() => {
    const userIndex = joined.findIndex((u: any) => {
      return u.id === user?.id;
    });
    if (userIndex >= 0) {
      setJoinedStatus("joined");
    } else {
      setJoinedStatus("not-joined");
    }
  }, [data, joined, user?.id]);

  return (
    <li className={cn(styles.container)}>
      <div>
        <Tooltip
          title={creator.identity.brullah_name}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <Image
              fill
              src={creator.identity.avatar.image}
              alt={creator.identity.brullah_name}
              placeholder="blur"
              blurDataURL={decodeBlurHash(
                creator.identity.avatar.blurhash,
                50,
                50
              )}
            ></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={sponsor.sponsored ? "Sponsored" : "Not Sponsored"}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div className={cn(!sponsor.sponsored ? styles.disabled : "")}>
            <Image fill src="/icons/sponsor.svg" alt=""></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={contribution.contributed ? "Contributed" : "Not Contributed"}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div className={cn(!contribution.contributed ? styles.disabled : "")}>
            <Image fill src="/icons/bit.svg" alt=""></Image>
          </div>
        </Tooltip>
        <Tooltip
          title={`${joined.length} Joined`}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div>
            <p>{joined.length}</p>
          </div>
        </Tooltip>
      </div>
      <div>
        <Image
          fill
          src={information.thumbnail.image}
          alt={information.name}
          placeholder="blur"
          blurDataURL={decodeBlurHash(information.thumbnail.blurhash, 200, 100)}
        ></Image>
      </div>
      <div>
        <h3>{information.name}</h3>
      </div>
      <div>
        <p>{information.description}</p>
      </div>
      <div>
        <Link href={`/tournament/${id}`}>
          <Button
            text={
              joinedStatus === "joined"
                ? "withdraw"
                : joinedStatus === "loading"
                ? "..."
                : "join"
            }
            disabled={false}
          ></Button>
        </Link>
      </div>
      <div>
        {networkStatus === NetworkStatus.ready ? (
          <div>
            <input
              type="checkbox"
              checked={likeStatus}
              onChange={handleLike}
              id={`${id}~liked`}
            ></input>
            <label
              data-likes={
                statsData?.tournament?.creator?.stats?.tournament?.likes
                  ? statsData.tournament.creator.stats.tournament.likes
                  : numeral(creator?.stats?.tournament?.likes).format("0a")
                  ? numeral(creator?.stats?.tournament?.likes).format("0a")
                  : 0
              }
              htmlFor={`${id}~liked`}
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
                id={`${id}~liked`}
              ></input>
              <label
                data-likes={
                  statsData?.tournament?.creator?.stats?.tournament?.likes
                    ? statsData.tournament.creator.stats.tournament.likes
                    : numeral(creator?.stats?.tournament?.likes).format("0a")
                    ? numeral(creator?.stats?.tournament?.likes).format("0a")
                    : 0
                }
                className={cn(!user ? styles.disableLike : "")}
                htmlFor={`${id}~liked`}
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
              : numeral(creator?.stats?.tournament?.likes).format("0a")
              ? numeral(creator?.stats?.tournament?.likes).format("0a")
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
        brullah_name
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
    joined {
      id
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
