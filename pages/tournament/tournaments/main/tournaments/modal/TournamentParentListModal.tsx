import cn from "classnames";
import styles from "./styles.module.scss";
import { Modal, Box } from "@mui/material";
import {
  gql,
  NetworkStatus,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../../../components/Logo/Logo";
import moment from "moment";
import dinero from "dinero.js";
import { decodeBlurHash } from "../../../../../functions/helpers";
import Button from "../../../../../components/Button/Button";
import TournamentJoinConfirmModal from "./confirm/TournamentJoinConfirmModal";

interface Props {
  modalOpen: boolean;
  handleModalClose: () => void;
  tournamentId: string | null;
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      start_date
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
      analytics {
        id
        joined_users
      }
      match {
        id
        users {
          joined {
            id
            identity {
              arena_name
              avatar {
                image
                blurhash
              }
            }
          }
        }
      }
    }
  }
`;

const ADD_TO_MATCH = gql`
  mutation AddToMatch($id: ID!) {
    addToMatch(id: $id) {
      id
    }
  }
`;

const USER = gql`
  query GetUser {
    user {
      id
    }
  }
`;

const TournamentParentListModal = ({
  tournamentId,
  modalOpen,
  handleModalClose,
}: Props) => {
  const [
    getTournament,
    { data, error, loading, called, networkStatus, refetch },
  ] = useLazyQuery(TOURNAMENT, { notifyOnNetworkStatusChange: true });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(USER);

  const [
    addToMatch,
    {
      data: addToMatchData,
      loading: addToMatchLoading,
      error: addToMatchError,
      reset,
    },
  ] = useMutation(ADD_TO_MATCH, {
    errorPolicy: "all",
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [displayUsers, setDisplayUsers] = useState<Array<any>>([]);

  const handleConfirmModalClose = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirmModalOpen = () => {
    setConfirmModalOpen(true);
  };

  const handleJoin = () => {
    if (data.tournament.contribution.contributed) {
      handleConfirmModalOpen();
    } else {
      // Join the tournament
      addToMatch({
        variables: {
          id: data.tournament.match.id,
        },
      });
    }
  };

  useEffect(() => {
    if (tournamentId) {
      console.log(
        tournamentId,
        "We some poor high class niggas, made it we rich ooh"
      );
      if (called) {
        refetch({
          id: tournamentId,
        });
      } else {
        getTournament({
          variables: {
            id: tournamentId,
          },
        });
      }
    }
  }, [tournamentId]);

  useEffect(() => {
    if (addToMatchError) {
      setTimeout(() => {
        reset();
      }, 5000);
    }
    if (addToMatchData) {
      setTimeout(() => {
        reset();
        refetch();
      }, 5000);
    }
  }, [addToMatchData, addToMatchError]);

  useEffect(() => {
    if (userData && data?.tournament) {
      const userIndex = data.tournament.match.users.joined.findIndex(
        (u: any) => {
          return u.id === userData.user.id;
        }
      );
      setDisplayUsers(data.tournament.match.users.joined.slice(0, 5));
      if (userIndex >= 0) {
        setJoined(true);
      }
    }
  }, [userData, data]);

  return (
    <Modal
      className={cn(styles.modal)}
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={cn(styles.parentModal)}>
        {loading ||
        networkStatus !== NetworkStatus.ready ||
        !data?.tournament ? (
          <div className={cn(styles.loading)}>
            <Logo
              thinking={true}
              text={true}
              image={{ width: "100px", height: "100px" }}
              container={{ width: "210px", height: "80px" }}
            ></Logo>
          </div>
        ) : error ? (
          <div className={cn(styles.error)}>
            <p>Error: {error.message}</p>
          </div>
        ) : (
          <>
            <div className={cn(styles.heading)}>
              <h3
                className={cn(
                  addToMatchLoading || addToMatchError ? styles.hideHeading : ""
                )}
              >
                Join Tournament {data.tournament.information.name}
              </h3>
              {addToMatchLoading ? (
                <div className={cn(styles.joinLoading)}>
                  <Logo
                    thinking={true}
                    text={true}
                    image={{ width: "50px", height: "50px" }}
                    container={{ width: "100px", height: "45px" }}
                  ></Logo>
                </div>
              ) : addToMatchError ? (
                <div className={cn(styles.JoinError)}>
                  <p>{addToMatchError.message}r</p>
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
                    {moment.unix(data.tournament.start_date).format("LLL")} ~
                    CAN START EARLIER ¯\(°_o)/¯
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
                        Contribution ~ Pool "
                        {dinero({
                          amount: data.tournament.contribution.balance.value,
                          currency:
                            data.tournament.contribution.balance.currency,
                        }).toFormat()}
                        "
                      </h4>
                      <p>
                        Every player contributes{" "}
                        {dinero({
                          amount: data.tournament.contribution.per_user.value,
                          currency:
                            data.tournament.contribution.per_user.currency,
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
                    src={data.tournament.information.thumbnail.image}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={decodeBlurHash(
                      data.tournament.information.thumbnail.blurhash,
                      200,
                      100
                    )}
                  ></Image>
                </div>
                <div className={cn(styles.peopleJoined)}>
                  <h4>
                    People joined:{" "}
                    {data.tournament.analytics?.joined_users || 0}
                  </h4>
                  {!data.tournament.analytics ||
                  data.tournament.analytics.joined_users === 0 ? (
                    <div className={cn(styles.joinedUsersPlaceHolder)}>
                      <p>No one has joined yet (╯‵□′)╯︵┻━┻</p>
                    </div>
                  ) : (
                    <div className={cn(styles.joinedUsers)}>
                      {data.tournament.analytics.joined_users > 6 ? (
                        <span className={cn(styles.moreUsers)}></span>
                      ) : (
                        ""
                      )}
                      {displayUsers.map((u: any) => {
                        return (
                          <Fragment
                            key={`${u.identity.arena_name}-joined-tournament-${tournamentId}`}
                          >
                            <div className={cn(styles.joinedUser)}>
                              <div className={cn(styles.joinedUserImage)}>
                                <Image
                                  src={u.identity.avatar.image}
                                  layout="fill"
                                  blurDataURL={decodeBlurHash(
                                    u.identity.avatar.blurhash,
                                    50,
                                    50
                                  )}
                                ></Image>
                              </div>
                              <p>{u.identity.arena_name}</p>
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
                        addToMatchLoading || addToMatchError ? true : false
                      }
                      onClick={handleJoin}
                    ></Button>
                  </div>
                )}
              </div>
            </div>
            <TournamentJoinConfirmModal
              confirmAction={() =>
                addToMatch({
                  variables: {
                    id: data.tournament.match.id,
                  },
                })
              }
              tournamentName={data.tournament.information.name}
              contribution={data.tournament.contribution}
              confirmModalOpen={confirmModalOpen}
              handleConfirmModalClose={handleConfirmModalClose}
            ></TournamentJoinConfirmModal>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TournamentParentListModal;
