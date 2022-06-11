import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import Button from "../../../../components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { decodeBlurHash, isByeNumber } from "../../../../functions/helpers";
import anime from "animejs";

interface Props {
  joinedUsers: Array<{
    id: string;
    identity: {
      arena_name: string;
      avatar: {
        image: string;
        blurhash: string;
      };
    };
  }>;
  config: Array<{
    arenaNumber: number;
    rounds: Array<{
      roundNumber: number;
      matches: Array<{
        matchNumber: number;
        slot_one: {
          user: {
            identity: {
              arena_name: string;
              avatar: { image: string; blurhash: string };
            };
          };
        };
        slot_two: {
          user: {
            identity: {
              arena_name: string;
              avatar: { image: string; blurhash: string };
            };
          };
        };
        bye: {
          user: {
            identity: {
              arena_name: string;
              avatar: { image: string; blurhash: string };
            };
          };
        };
      }>;
    }>;
  }>;
  usersToConfigure: Array<{
    id: string;
    identity: {
      arena_name: string;
      avatar: {
        image: string;
        blurhash: string;
      };
    };
  }>;
  activeEdit: string | null;
  handleConfigUserUpdate: (userId: string, slot: number) => void;
  handleConfigUserRemove: (arbs: string) => void;
}

const EditTournamentModal = ({
  joinedUsers,
  config,
  usersToConfigure,
  activeEdit,
  handleConfigUserUpdate,
  handleConfigUserRemove,
}: Props) => {
  const [editting, setEditting] = useState<{
    matchNumber: number;
    slot_one: {
      user: {
        identity: {
          arena_name: string;
          avatar: { image: string; blurhash: string };
        };
      };
    };
    slot_two: {
      user: {
        identity: {
          arena_name: string;
          avatar: { image: string; blurhash: string };
        };
      };
    };
    bye: {
      user: {
        identity: {
          arena_name: string;
          avatar: { image: string; blurhash: string };
        };
      };
    };
  } | null>(null);
  const [bye, setBye] = useState(false);
  const [emptyByes, setEmptyByes] = useState(false);
  const modalRef = useRef(null);

  const [tab, setTab] = useState<"people" | "time">("people");

  useEffect(() => {
    if (activeEdit) {
      // arbs stands for arena, round, bracket and last;y the slot
      // In the format of 1:1:1:1
      const arbsArray = activeEdit!.split(":").map((v) => parseInt(v));
      config.forEach((a) => {
        if (a.arenaNumber === arbsArray[0]) {
          a.rounds.forEach((r, ri) => {
            if (r.roundNumber === arbsArray[1]) {
              a.rounds[ri].matches.forEach((m) => {
                if (m.matchNumber === arbsArray[2]) {
                  setEditting(m);
                }
              });
            }
          });
        }
      });
      // Check if  bye exists
      const isABye = isByeNumber(
        joinedUsers.slice((arbsArray[0] - 1) * 16, arbsArray[0] * 16).length
      );
      // If bye has been configured, but has not been configured in current edit
      // Then disable bye
      if (isABye) {
        let byeEdit: string | null = null;
        let oneMatchEmpty = false;
        // Check if bye has been configured
        config.forEach((a) => {
          a.rounds.forEach((r, ri) => {
            a.rounds[ri].matches.forEach((m) => {
              if (m.bye && m.bye.user) {
                byeEdit = `${a.arenaNumber}:${r.roundNumber}:${m.matchNumber}`;
              }
            });
          });
        });
        config.forEach((a) => {
          if (arbsArray[0] !== a.arenaNumber) return;
          a.rounds.forEach((r, ri) => {
            if (arbsArray[1] !== r.roundNumber) return;
            a.rounds[ri].matches.forEach((m) => {
              if (arbsArray[2] !== m.matchNumber) return;
              let bye: boolean = false;
              if (m.bye) bye = true;
              if (!m.slot_one.user && !m.slot_two.user) {
                // Check if the neighbouring parent is full
                if (m.matchNumber % 2 === 0) {
                  a.rounds[ri].matches.forEach((mc) => {
                    if (mc.matchNumber === m.matchNumber - 1) {
                      if (mc.slot_one.user && mc.slot_two.user) {
                        oneMatchEmpty = true;
                        if (mc.bye) bye = true;
                      }
                    }
                  });
                }

                if (m.matchNumber % 2 !== 0) {
                  a.rounds[ri].matches.forEach((mc) => {
                    if (mc.matchNumber === m.matchNumber + 1) {
                      if (mc.slot_one.user && mc.slot_two.user) {
                        oneMatchEmpty = true;
                        if (mc.bye) bye = true;
                      }
                    }
                  });
                }
              }
              if (m.slot_one.user && m.slot_two.user) {
                // Check if the neighbouring parent is full
                if (m.matchNumber % 2 === 0) {
                  a.rounds[ri].matches.forEach((mc) => {
                    if (mc.matchNumber === m.matchNumber - 1) {
                      if (!mc.slot_one.user && !mc.slot_two.user) {
                        oneMatchEmpty = true;
                        if (mc.bye) bye = true;
                      }
                    }
                  });
                }

                if (m.matchNumber % 2 !== 0) {
                  a.rounds[ri].matches.forEach((mc) => {
                    if (mc.matchNumber === m.matchNumber + 1) {
                      if (!mc.slot_one.user && !mc.slot_two.user) {
                        oneMatchEmpty = true;
                        if (mc.bye) bye = true;
                      }
                    }
                  });
                }
              }
              if (!bye && byeEdit) oneMatchEmpty = false;
            });
          });
        });

        if (oneMatchEmpty && byeEdit) {
          setEmptyByes(true);
        } else {
          setEmptyByes(false);
        }

        if (byeEdit === activeEdit) {
          setBye(true);
        } else if (byeEdit === null && oneMatchEmpty) {
          setBye(true);
        } else {
          setBye(false);
        }
      }
      // Show modal
      anime({
        targets: modalRef.current,
        bottom: "0px",
      });
    } else {
      anime({
        targets: modalRef.current,
        bottom: "-500px",
      });
      setEditting(null);
    }
  }, [activeEdit, config]);

  return (
    <div
      ref={modalRef}
      className={cn(styles.container, bye ? styles.byeContainer : "")}
    >
      <div className={cn(styles.navigation)}>
        <ul className={cn(styles.navList)}>
          <li
            className={cn(tab === "people" ? styles.activeTab : "")}
            onClick={() => setTab("people")}
          >
            People
          </li>
          <li
            className={cn(tab === "time" ? styles.activeTab : "")}
            onClick={() => setTab("time")}
          >
            Time
          </li>
        </ul>
      </div>
      <div className={cn(styles.content)}>
        <div className={cn(styles.editUsers, bye ? styles.editUsersBye : "")}>
          {usersToConfigure.length > 0 ? (
            <ul className={cn(styles.editUserList)}>
              {usersToConfigure.map((u) => {
                return (
                  <li key={u.id} className={cn(styles.editUserListItem)}>
                    <div className={cn(styles.editUserListItemImage)}>
                      <Image
                        src={u.identity.avatar.image}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={decodeBlurHash(
                          u.identity.avatar.blurhash,
                          50,
                          50
                        )}
                      ></Image>
                    </div>
                    <div>{u.identity.arena_name}</div>
                    <Button
                      text="left"
                      disabled={
                        editting
                          ? editting.slot_one.user
                            ? true
                            : emptyByes
                            ? true
                            : false
                          : false
                      }
                      onClick={() => handleConfigUserUpdate(u.id, 1)}
                    ></Button>

                    {bye ? (
                      (!editting?.slot_one.user && !editting?.slot_two.user) ||
                      (editting?.slot_one.user && !editting.slot_two.user) ||
                      (!editting?.slot_one.user && editting.slot_two.user) ? (
                        <Button
                          text="right"
                          disabled={
                            editting
                              ? editting.slot_two.user
                                ? true
                                : emptyByes
                                ? true
                                : false
                              : false
                          }
                          onClick={() => handleConfigUserUpdate(u.id, 2)}
                        ></Button>
                      ) : (
                        ""
                      )
                    ) : (
                      <Button
                        text="right"
                        disabled={
                          editting
                            ? editting.slot_two.user
                              ? true
                              : emptyByes
                              ? true
                              : false
                            : false
                        }
                        onClick={() => handleConfigUserUpdate(u.id, 2)}
                      ></Button>
                    )}

                    {bye ? (
                      editting?.slot_one.user && editting.slot_two.user ? (
                        <Button
                          text="bye"
                          disabled={
                            editting
                              ? editting.bye && editting.bye.user
                                ? true
                                : false
                              : false
                          }
                          onClick={() => handleConfigUserUpdate(u.id, 3)}
                        ></Button>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={cn(styles.editUserListPlaceHolder)}>
              <p>No one to match up. Clean slate ( ͡° ͜ʖ ͡°)</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            styles.containedUsers,
            bye ? styles.containedUsersBye : ""
          )}
        >
          <h3>Slot One</h3>
          {editting ? (
            editting.slot_one.user ? (
              <div className={cn(styles.containedUsersContainer)}>
                <div className={cn(styles.containedUsersImage)}>
                  <Image
                    src={editting.slot_one.user.identity.avatar.image}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={decodeBlurHash(
                      editting.slot_one.user.identity.avatar.blurhash,
                      50,
                      50
                    )}
                  ></Image>
                </div>
                <div>{editting.slot_one.user.identity.arena_name}</div>
                <Button
                  text="remove"
                  disabled={false}
                  onClick={() => handleConfigUserRemove(`${activeEdit}:1`)}
                ></Button>
              </div>
            ) : (
              <div className={cn(styles.containedUsersContainer)}>
                <p>Slot one is empty</p>
              </div>
            )
          ) : (
            ""
          )}

          <h3>Slot Two</h3>
          {editting ? (
            editting.slot_two.user ? (
              <div className={cn(styles.containedUsersContainer)}>
                <div className={cn(styles.containedUsersImage)}>
                  <Image
                    src={editting.slot_two.user.identity.avatar.image}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={decodeBlurHash(
                      editting.slot_two.user.identity.avatar.blurhash,
                      50,
                      50
                    )}
                  ></Image>
                </div>
                <div>{editting.slot_two.user.identity.arena_name}</div>
                <Button
                  text="remove"
                  disabled={false}
                  onClick={() => handleConfigUserRemove(`${activeEdit}:2`)}
                ></Button>
              </div>
            ) : (
              <div className={cn(styles.containedUsersContainer)}>
                <p>Slot two is empty</p>
              </div>
            )
          ) : (
            ""
          )}

          {bye ? (
            <>
              <h3>Bye Slot</h3>
              {editting ? (
                editting?.bye?.user ? (
                  <div className={cn(styles.containedUsersContainer)}>
                    <div className={cn(styles.containedUsersImage)}>
                      <Image
                        src={editting.bye.user.identity.avatar.image}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={decodeBlurHash(
                          editting.bye.user.identity.avatar.blurhash,
                          50,
                          50
                        )}
                      ></Image>
                    </div>
                    <div>{editting.bye.user.identity.arena_name}</div>
                    <Button
                      text="remove"
                      disabled={false}
                      onClick={() => handleConfigUserRemove(`${activeEdit}:3`)}
                    ></Button>
                  </div>
                ) : (
                  <div className={cn(styles.containedUsersContainer)}>
                    <p>Bye slot is empty</p>
                  </div>
                )
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTournamentModal;
