import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import { DateTime } from "luxon";
import Button from "../../../../../components/Button/Button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { decodeBlurHash } from "../../../../../functions/helpers";
import { isByeNumber } from "../../../../../functions/helpers";
import anime from "animejs";
import Icon from "../../../../../components/Icon/Icon";

interface Props {
  tournamentId: string;
  startDate: string;
  initialized: boolean;
  config: Array<{ id: string; configured: boolean; arbs: string }>;
  usersToConfigure: Array<{
    id: string;
    identity: {
      brullah_name: string;
      avatar: {
        image: string;
        blurhash: string;
      };
    };
  }>;
  refetchTournament: () => Promise<void>;
  setActiveEdit: (edit: string | null) => void;
  activeEdit: string | null;
  addToConfigured: (id: string, arbs: string) => void;
  markRemovedFromConfigured: (arbs: string) => void;
}

const UPDATE_START_DATE = gql`
  mutation UpdateStartDate($id: ID!, $startDate: String) {
    updateStartDate(id: $id, startDate: $startDate) {
      id
    }
  }
`;

const EditTournamentModal = ({
  initialized,
  usersToConfigure,
  tournamentId,
  config,
  startDate,
  activeEdit,
  setActiveEdit,
  addToConfigured,
  refetchTournament,
  markRemovedFromConfigured,
}: Props) => {
  const [update, { loading }] = useMutation(UPDATE_START_DATE, {
    errorPolicy: "all",
  });
  const [editting, setEditting] = useState<{
    matchNumber: number;
    slot_one?: {
      user: {
        identity: {
          brullah_name: string;
          avatar: { image: string; blurhash: string };
        };
      };
    };
    slot_two?: {
      user: {
        identity: {
          brullah_name: string;
          avatar: { image: string; blurhash: string };
        };
      };
    };
    bye_slot?: {
      user: {
        identity: {
          brullah_name: string;
          avatar: { image: string; blurhash: string };
        };
      };
    };
  } | null>(null);
  const [bye, setBye] = useState(false);
  const [byeExists, setByeExists] = useState(false);
  const modalRef = useRef(null);
  const [tab, setTab] = useState<"people" | "time">("people");
  const [closeIconHover, setCloseIconHover] = useState(false);
  const [displayDate, setDisplayDate] = useState<string | null>();
  const [date, setDate] = useState<string>(startDate);

  const handleChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    setDisplayDate(e.target.value);
    setDate(DateTime.fromISO(e.target.value).toISO());
  };

  useEffect(() => {
    if (activeEdit && initialized) {
      // arbs stands for arena, round, bracket and last the slot
      // In the format of 1:1:1:1
      const activeConfigured = config.filter((c) => {
        const arbs = c.arbs.split(":").splice(0, 3).join(":");
        const activeArbs = activeEdit.split(":").splice(0, 3).join(":");
        return arbs === activeArbs;
      });
      const activeArbs = activeEdit.split(":").map((n) => parseInt(n));
      let theEditting: {
        matchNumber: number;
        slot_one?: {
          user: {
            identity: {
              brullah_name: string;
              avatar: { image: string; blurhash: string };
            };
          };
        };
        slot_two?: {
          user: {
            identity: {
              brullah_name: string;
              avatar: { image: string; blurhash: string };
            };
          };
        };
        bye_slot?: {
          user: {
            identity: {
              brullah_name: string;
              avatar: { image: string; blurhash: string };
            };
          };
        };
      } = { matchNumber: activeArbs[2] };
      activeConfigured.forEach((a) => {
        const arbs = a.arbs.split(":").map((n) => parseInt(n));
        // Find its indx in usersTo configure
        const jIndex = usersToConfigure.findIndex((u) => {
          return u.id === a.id;
        });
        if (arbs[3] === 1) {
          theEditting.slot_one = {
            user: usersToConfigure[jIndex],
          };
        } else if (arbs[3] === 2) {
          theEditting.slot_two = {
            user: usersToConfigure[jIndex],
          };
        } else if (arbs[3] === 3) {
          theEditting.bye_slot = {
            user: usersToConfigure[jIndex],
          };
        }
      });
      setEditting(theEditting);
      // Check if  there can be an existing bye
      const isABye = isByeNumber(
        usersToConfigure.slice((activeArbs[0] - 1) * 16, activeArbs[0] * 16)
          .length
      );
      // Check if the neighbouring match is taken or is empty
      const neighbouringIndex = config.findIndex(
        (n) =>
          n.arbs ===
            `${activeArbs[0]}:${activeArbs[1]}:${
              activeArbs[2] % 2 === 0 ? activeArbs[2] - 1 : activeArbs[2] + 1
            }:1` ||
          n.arbs ===
            `${activeArbs[0]}:${activeArbs[1]}:${
              activeArbs[2] % 2 === 0 ? activeArbs[2] - 1 : activeArbs[2] + 1
            }:2`
      );
      const byeIsAroundIndex = config.findIndex((n) => {
        const arbsArr = n.arbs.split(":").map((s) => parseInt(s));
        if (arbsArr[3] === 3) return true;
        return false;
      });
      const byeIsInCurrentEdit = config.findIndex(
        (n) => n.arbs === `${activeArbs[0]}:${activeArbs[1]}:${activeArbs[2]}:3`
      );
      const byeIndex = config.findIndex(
        (n) =>
          n.arbs ===
          `${activeArbs[0]}:${activeArbs[1]}:${
            activeArbs[2] % 2 === 0 ? activeArbs[2] - 1 : activeArbs[2] + 1
          }:3`
      );
      if (byeIndex > -1) {
        setByeExists(true);
      } else {
        setByeExists(false);
      }
      // Check if the neighbouring bracket is contained
      // If it's not then check if this mapping shuld contain abye
      // If it should check if there is already a mapped user to the bye
      // If one has been mapped then make sure it is in the current arbs so as to set it as true
      if (neighbouringIndex <= -1 && isABye) {
        if (byeIsAroundIndex <= -1) {
          setBye(true);
        } else if (byeIsAroundIndex > -1 && byeIsInCurrentEdit > -1) {
          setBye(true);
        } else {
          setBye(false);
        }
      } else {
        setBye(false);
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
  }, [config, activeEdit, usersToConfigure, initialized]);

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
        <div
          className={cn(styles.closeIcon)}
          onMouseEnter={() => setCloseIconHover(true)}
          onMouseLeave={() => setCloseIconHover(false)}
          onClick={() => setActiveEdit(null)}
        >
          <Icon
            activeLink="/icons/x/active.svg"
            inactiveLink="/icons/x/inactive.svg"
            hover={closeIconHover}
            alt="Close Icon"
          ></Icon>
        </div>
      </div>
      <div className={cn(styles.content)}>
        <div className={cn(styles.editUsers, bye ? styles.editUsersBye : "")}>
          {tab === "people" ? (
            usersToConfigure.length > 0 ? (
              <ul className={cn(styles.editUserList)}>
                {usersToConfigure.map((u) => {
                  const ui = config.findIndex((c) => {
                    return c.id === u.id;
                  });
                  if (ui <= -1) {
                    return (
                      <li key={u.id} className={cn(styles.editUserListItem)}>
                        <div className={cn(styles.editUserListItemImage)}>
                          <Image
                            fill
                            src={u.identity.avatar.image}
                            alt={u.identity.brullah_name}
                            placeholder="blur"
                            blurDataURL={decodeBlurHash(
                              u.identity.avatar.blurhash,
                              50,
                              50
                            )}
                          ></Image>
                        </div>
                        <div>{u.identity.brullah_name}</div>
                        <Button
                          text="left"
                          disabled={
                            editting
                              ? editting.slot_one?.user
                                ? true
                                : byeExists
                                ? true
                                : false
                              : false
                          }
                          onClick={() =>
                            addToConfigured(u.id, `${activeEdit}:1`)
                          }
                        ></Button>

                        {bye ? (
                          (!editting?.slot_one?.user &&
                            !editting?.slot_two?.user) ||
                          (editting?.slot_one?.user &&
                            !editting.slot_two?.user) ||
                          (!editting?.slot_one?.user &&
                            editting.slot_two?.user) ? (
                            <Button
                              text="right"
                              disabled={
                                editting
                                  ? editting.slot_two?.user || byeExists
                                    ? true
                                    : false
                                  : false
                              }
                              onClick={() =>
                                addToConfigured(u.id, `${activeEdit}:2`)
                              }
                            ></Button>
                          ) : (
                            ""
                          )
                        ) : (
                          <Button
                            text="right"
                            disabled={
                              editting
                                ? editting.slot_two?.user || byeExists
                                  ? true
                                  : false
                                : false
                            }
                            onClick={() =>
                              addToConfigured(u.id, `${activeEdit}:2`)
                            }
                          ></Button>
                        )}

                        {bye ? (
                          editting?.slot_one?.user &&
                          editting.slot_two?.user ? (
                            <Button
                              text="bye"
                              disabled={
                                editting
                                  ? editting.bye_slot?.user
                                    ? true
                                    : false
                                  : false
                              }
                              onClick={() =>
                                addToConfigured(u.id, `${activeEdit}:3`)
                              }
                            ></Button>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </li>
                    );
                  } else {
                    return "";
                  }
                })}
              </ul>
            ) : (
              <div className={cn(styles.editUserListPlaceHolder)}>
                <p>No one to match up. Clean slate ( ͡° ͜ʖ ͡°)</p>
              </div>
            )
          ) : (
            <div className={cn(styles.setTime)}>
              <input
                placeholder="offset ~ hours"
                type="datetime-local"
                value={
                  displayDate ||
                  DateTime.fromISO(startDate).toFormat("yyyy-MM-dd'T'hh:mm")
                }
                onChange={handleChange}
              ></input>
              <Button
                text="Set time"
                disabled={loading}
                onClick={async () => {
                  await update({
                    variables: {
                      id: tournamentId,
                      startDate: date,
                    },
                  });
                  refetchTournament();
                }}
              ></Button>
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
            editting.slot_one?.user ? (
              <div className={cn(styles.containedUsersContainer)}>
                <div className={cn(styles.containedUsersImage)}>
                  <Image
                    fill
                    src={editting.slot_one.user.identity.avatar.image}
                    alt={editting.slot_one.user.identity.brullah_name}
                    placeholder="blur"
                    blurDataURL={decodeBlurHash(
                      editting.slot_one.user.identity.avatar.blurhash,
                      50,
                      50
                    )}
                  ></Image>
                </div>
                <div>{editting.slot_one.user.identity.brullah_name}</div>
                <Button
                  text="remove"
                  disabled={false}
                  onClick={() => markRemovedFromConfigured(`${activeEdit}:1`)}
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
            editting.slot_two?.user ? (
              <div className={cn(styles.containedUsersContainer)}>
                <div className={cn(styles.containedUsersImage)}>
                  <Image
                    fill
                    src={editting.slot_two.user.identity.avatar.image}
                    alt={editting.slot_two.user.identity.brullah_name}
                    placeholder="blur"
                    blurDataURL={decodeBlurHash(
                      editting.slot_two.user.identity.avatar.blurhash,
                      50,
                      50
                    )}
                  ></Image>
                </div>
                <div>{editting.slot_two.user.identity.brullah_name}</div>
                <Button
                  text="remove"
                  disabled={false}
                  onClick={() => markRemovedFromConfigured(`${activeEdit}:2`)}
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
                editting?.bye_slot?.user ? (
                  <div className={cn(styles.containedUsersContainer)}>
                    <div className={cn(styles.containedUsersImage)}>
                      <Image
                        fill
                        src={editting.bye_slot.user.identity.avatar.image}
                        alt={editting.bye_slot.user.identity.brullah_name}
                        placeholder="blur"
                        blurDataURL={decodeBlurHash(
                          editting.bye_slot.user.identity.avatar.blurhash,
                          50,
                          50
                        )}
                      ></Image>
                    </div>
                    <div>{editting.bye_slot.user.identity.brullah_name}</div>
                    <Button
                      text="remove"
                      disabled={false}
                      onClick={() =>
                        markRemovedFromConfigured(`${activeEdit}:3`)
                      }
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
