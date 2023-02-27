import cn from "classnames";
import styles from "./styles.module.scss";
import { DateTime } from "luxon";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../components/Logo/Logo";
import dinero from "dinero.js";
import { decodeBlurHash } from "../../../functions/helpers";
import { TournamentType } from "../../../types/tournament";
import Button from "../../../components/Button/Button";
import TournamentJoinConfirmModal from "./confirm/TournamentJoinConfirmModal";
import TournamentsIdLoading from "./loading/TournamentsIdLoading";
import TournamentsIdError from "./error/TournamentsIdError";

interface Props {
  id: string;
  secret: string;
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      start_date
      joined {
        id
        identity {
          brullah_name
          avatar {
            image
            blurhash
          }
        }
      }
      information {
        id
        name
        description
        thumbnail {
          image
          blurhash
        }
      }
      sponsor {
        id
        sponsored
        balance {
          value
          currency
        }
      }
      contribution {
        id
        contributed
        balance {
          currency
          value
        }
        per_user {
          currency
          value
        }
      }
    }
  }
`;

const ADD_TO_TOURNAMENT = gql`
  mutation AddToTournament($id: ID!, $secret: String) {
    addToTournament(id: $id, secret: $secret) {
      id
      joined {
        id
        identity {
          brullah_name
          avatar {
            image
            blurhash
          }
        }
      }
    }
  }
`;

const REMOVE_FROM_TOURNAMENT = gql`
  mutation RemoveFromTournament($id: ID!) {
    removeFromTournament(id: $id) {
      id
      joined {
        id
        identity {
          brullah_name
          avatar {
            image
            blurhash
          }
        }
      }
    }
  }
`;

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        brullah_name
      }
    }
  }
`;

const TournamentIdMain = ({ id, secret }: Props) => {
  const { data, error, loading, refetch } = useQuery<{
    tournament: TournamentType;
  }>(TOURNAMENT, {
    variables: { id, secret },
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(USER);

  const [
    addToTournament,
    {
      data: addToTournamentData,
      loading: addToTournamentLoading,
      error: addToTournamentError,
      reset,
    },
  ] = useMutation(ADD_TO_TOURNAMENT, {
    errorPolicy: "all",
  });

  const [
    removeFromTournament,
    {
      data: removeFromTournamentData,
      loading: removeFromTournamentLoading,
      error: removeFromTournamentError,
      reset: removeFromTournamentReset,
    },
  ] = useMutation(REMOVE_FROM_TOURNAMENT, {
    errorPolicy: "all",
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [displayUsers, setDisplayUsers] = useState<
    Array<{
      identity: {
        brullah_name: string;
        avatar: {
          image: string;
          blurhash: string;
        };
      };
    }>
  >([]);

  const handleConfirmModalClose = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirmModalOpen: () => void = () => {
    setConfirmModalOpen(true);
  };

  const handleJoin = () => {
    if (loading || !data) return;
    if (data.tournament.contribution.contributed) {
      handleConfirmModalOpen();
    } else {
      // Join the tournament
      addToTournament({
        variables: {
          id,
          secret: secret,
        },
      });
    }
  };

  const withdraw = () => {
    if (loading || !data) return;
    if (data.tournament.contribution.contributed) {
      handleConfirmModalOpen();
    } else {
      // Join the tournament
      removeFromTournament({
        variables: {
          id,
        },
      });
    }
  };

  useEffect(() => {
    let timeOut: any;
    if (addToTournamentError) {
      timeOut = setTimeout(() => {
        reset();
      }, 5000);
    } else if (addToTournamentData) {
      timeOut = setTimeout(() => {
        reset();
        refetch();
      }, 2000);
    }
    if (removeFromTournamentError) {
      timeOut = setTimeout(() => {
        removeFromTournamentReset();
      }, 10000);
    } else if (removeFromTournamentData) {
      timeOut = setTimeout(() => {
        removeFromTournamentReset();
        refetch();
      }, 2000);
    }
    return () => clearTimeout(timeOut);
  }, [
    addToTournamentData,
    addToTournamentError,
    removeFromTournamentData,
    removeFromTournamentError,
    refetch,
    reset,
    removeFromTournamentReset,
  ]);

  useEffect(() => {
    if (data?.tournament) {
      setDisplayUsers(data.tournament.joined.slice(0, 5));
    }
    if (userData && data?.tournament) {
      const userIndex = data.tournament.joined.findIndex((u: any) => {
        return u.id === userData.user.id;
      });
      if (userIndex >= 0) {
        setJoined(true);
      } else {
        setJoined(false);
      }
    }
  }, [userData, data]);

  if (error) return <TournamentsIdError error={error}></TournamentsIdError>;

  if (loading || !data) return <TournamentsIdLoading></TournamentsIdLoading>;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div className={cn(styles.heading)}>
          <h3
            className={cn(
              addToTournamentLoading ||
                removeFromTournamentLoading ||
                removeFromTournamentError ||
                addToTournamentError
                ? styles.hideHeading
                : ""
            )}
          >
            Join Tournament {data.tournament.information.name}
          </h3>
          {addToTournamentLoading || removeFromTournamentLoading ? (
            <div className={cn(styles.joinLoading)}>
              <Logo
                thinking={true}
                text={true}
                image={{ width: "50px", height: "50px" }}
                container={{ width: "100px", height: "45px" }}
              ></Logo>
            </div>
          ) : addToTournamentError ? (
            <div className={cn(styles.JoinError)}>
              <p>{addToTournamentError.message}</p>
            </div>
          ) : removeFromTournamentError ? (
            <div className={cn(styles.JoinError)}>
              <p>{removeFromTournamentError.message}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={cn(styles.data)}>
          <div className={cn(styles.information)}>
            <div>
              <h4>Tournament name</h4>
              <p>{data.tournament.information.name}</p>
            </div>
            <div>
              <h4>Tournament descriptrion</h4>
              <p>{data.tournament.information.description}</p>
            </div>
            <div>
              <h4>Tournament start date</h4>
              <p>
                {`${DateTime.fromISO(data.tournament.start_date).toLocaleString(
                  DateTime.DATETIME_FULL
                )} ~ CAN START
                EARLIER ¯\(°_o)/¯`}
              </p>
            </div>
            <div>
              <h4>Sponsored</h4>
              {data.tournament.sponsor.sponsored ? (
                <p>
                  Winner gets{" "}
                  {dinero({
                    amount: data.tournament.sponsor.balance.value,
                    currency: data.tournament.sponsor.balance.currency,
                  }).toFormat()}{" "}
                  ( $ _ $ )
                </p>
              ) : (
                <p>Tournament is not sponsored</p>
              )}
            </div>
            <div>
              {data.tournament.contribution.contributed ? (
                <>
                  <h4>
                    Contribution ~ Pool &quot;
                    {dinero({
                      amount: data.tournament.contribution.balance.value,
                      currency: data.tournament.contribution.balance.currency,
                    }).toFormat()}
                    &quot;
                  </h4>
                  <p>
                    Every player contributes{" "}
                    {dinero({
                      amount: data.tournament.contribution.per_user.value,
                      currency: data.tournament.contribution.per_user.currency,
                    }).toFormat()}
                  </p>
                </>
              ) : (
                <>
                  <h4>Contribution</h4>
                  <p>No contribution required (✿◡‿◡)</p>
                </>
              )}
            </div>
          </div>
          <div className={cn(styles.thumbnail)}>
            <div className={cn(styles.thumbnailImage)}>
              <Image
                fill
                src={data.tournament.information.thumbnail.image}
                alt={data.tournament.information.name}
                placeholder="blur"
                blurDataURL={decodeBlurHash(
                  data.tournament.information.thumbnail.blurhash,
                  200,
                  100
                )}
              ></Image>
            </div>
            <div className={cn(styles.peopleJoined)}>
              <h4>People joined: {data.tournament.joined.length}</h4>
              {data.tournament.joined.length === 0 ? (
                <div className={cn(styles.joinedUsersPlaceHolder)}>
                  <p>No one has joined yet (╯‵□′)╯︵┻━┻</p>
                </div>
              ) : (
                <div className={cn(styles.joinedUsers)}>
                  {data.tournament.joined.length > 6 ? (
                    <span className={cn(styles.moreUsers)}></span>
                  ) : (
                    ""
                  )}
                  {displayUsers.map((u: any) => {
                    return (
                      <Fragment
                        key={`${u.identity.brullah_name}-joined-tournament-${id}`}
                      >
                        <div className={cn(styles.joinedUser)}>
                          <div className={cn(styles.joinedUserImage)}>
                            <Image
                              fill
                              src={u.identity.avatar.image}
                              alt={u.identity.brullah_name}
                              blurDataURL={decodeBlurHash(
                                u.identity.avatar.blurhash,
                                50,
                                50
                              )}
                            ></Image>
                          </div>
                          <p>{u.identity.brullah_name}</p>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </div>
            {joined ? (
              <div className={cn(styles.joinStatus)}>
                <p>You are one with this tournament (✿◡‿◡)</p>
                <Button
                  text="Withdraw"
                  disabled={
                    removeFromTournamentLoading || addToTournamentError
                      ? true
                      : false
                  }
                  onClick={withdraw}
                ></Button>
              </div>
            ) : userLoading ? (
              <div className={cn(styles.joinStatus)}>
                <p>...</p>
              </div>
            ) : userError &&
              (userError?.networkError as any).statusCode !== 401 ? (
              <div className={cn(styles.joinStatusError)}>
                <p>Error: {userError.message}</p>
              </div>
            ) : userError ? (
              <div className={cn(styles.joinStatusError)}>
                <p>Please login to join tournaments.</p>
              </div>
            ) : (
              <div className={cn(styles.joinButton)}>
                <Button
                  text="Let's do this (►__◄)"
                  disabled={
                    addToTournamentLoading || addToTournamentError
                      ? true
                      : false
                  }
                  onClick={handleJoin}
                ></Button>
              </div>
            )}
          </div>
        </div>
        <TournamentJoinConfirmModal
          action={joined ? "withdraw" : "join"}
          confirmAction={() =>
            joined
              ? removeFromTournament({
                  variables: {
                    id,
                  },
                })
              : addToTournament({
                  variables: {
                    id,
                    secret: secret,
                  },
                })
          }
          tournamentName={data.tournament.information.name}
          contribution={data.tournament.contribution}
          confirmModalOpen={confirmModalOpen}
          handleConfirmModalClose={handleConfirmModalClose}
        ></TournamentJoinConfirmModal>
      </div>
    </div>
  );
};

export default TournamentIdMain;
