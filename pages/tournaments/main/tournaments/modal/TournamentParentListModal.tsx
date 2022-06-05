import cn from "classnames";
import styles from "./styles.module.scss";
import { Modal, Box } from "@mui/material";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../../components/Logo/Logo";
import moment from "moment";
import dinero from "dinero.js";
import { decodeBlurHash } from "../../../../functions/helpers";
import Button from "../../../../components/Button/Button";
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
        name
        description
        thumbnail {
          image
          blurhash
        }
      }
      sponsor {
        sponsored
        balance {
          value
          currency
        }
      }
      contribution {
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
  const [getTournament, { data, error, loading, refetch }] =
    useLazyQuery(TOURNAMENT);

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
      getTournament({
        variables: {
          id: tournamentId,
        },
      });
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
        {loading || !data?.tournament ? (
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
              <h2>Join Tournament {data.tournament.information.name}</h2>
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
                  <h3>Tournament name</h3>
                  <p>{data.tournament.information.name}</p>
                </div>
                <div>
                  <h3>Tournament descriptrion</h3>
                  <p>{data.tournament.information.description}</p>
                </div>
                <div>
                  <h3>Tournament start date</h3>
                  <p>
                    {moment.unix(data.tournament.start_date).format("LLL")} ~
                    CAN START EARLIER ¯\(°_o)/¯
                  </p>
                </div>
                <div>
                  <h3>Sponsored</h3>
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
                      <h3>
                        Contribution ~ Pool "
                        {dinero({
                          amount: data.tournament.contribution.balance.value,
                          currency:
                            data.tournament.contribution.balance.currency,
                        }).toFormat()}
                        "
                      </h3>
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
                      <h3>Contribution</h3>
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
                  <h3>
                    People joined: {data.tournament.analytics.joined_users}
                  </h3>
                  {data.tournament.analytics.joined_users === 0 ? (
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
                      {data.tournament.match.users.joined.map((u: any) => {
                        return (
                          <>
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
                          </>
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
