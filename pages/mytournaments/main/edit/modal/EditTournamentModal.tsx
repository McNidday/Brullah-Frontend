import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import Button from "../../../../components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { decodeBlurHash } from "../../../../functions/helpers";
import anime from "animejs";

interface Props {
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
  } | null>(null);
  const modalRef = useRef(null);

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
      // Show modal
      anime({
        targets: modalRef.current,
        bottom: "0px",
      });
    } else {
      anime({
        targets: modalRef.current,
        bottom: "-450px",
      });
      setEditting(null);
    }
  }, [activeEdit, config]);
  return (
    <div ref={modalRef} className={cn(styles.container)}>
      <div className={cn(styles.navigation)}>
        <ul className={cn(styles.navList)}>
          <li>People</li>
        </ul>
      </div>
      <div className={cn(styles.content)}>
        <div className={cn(styles.editUsers)}>
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
                      editting ? (editting.slot_one.user ? true : false) : false
                    }
                    onClick={() => handleConfigUserUpdate(u.id, 1)}
                  ></Button>
                  <Button
                    text="right"
                    disabled={
                      editting ? (editting.slot_two.user ? true : false) : false
                    }
                    onClick={() => handleConfigUserUpdate(u.id, 2)}
                  ></Button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={cn(styles.containedUsers)}>
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
        </div>
      </div>
    </div>
  );
};

export default EditTournamentModal;