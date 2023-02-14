import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { gql } from "@apollo/client";
import { decodeBlurHash } from "../../../../../../../functions/helpers";
import { MatchType } from "../../../../../../../types/match";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";

interface Props {
  tournamentId: string;
  makeFinalBefore?: boolean;
  makeFinalAfter?: boolean;
  byeOnly: boolean;
  activeEdit?: string | null;
  arenaNumber?: number;
  roundNumber?: number;
  matchNumber?: number;
  setActiveEdit?: (arb: string | null) => void;
  removeMarked: (arbs: string) => void;
  markConfigured: (id: string) => void;
  match: MatchType;
  time?: string;
  timeOnly: boolean;
  config: Array<{
    id: string;
    configured: boolean;
    arbs: string;
    removed?: boolean;
  }>;
  refetchMatch: (arb: string) => void;
}

const SAVE_CONFIG = gql`
  mutation SaveMatchConfig($input: MatchConfigInput) {
    saveMatchConfig(input: $input) {
      id
    }
  }
`;

const EditTournamentBracket = ({
  time,
  match,
  config,
  byeOnly,
  timeOnly,
  makeFinalBefore,
  makeFinalAfter,
  activeEdit,
  arenaNumber,
  roundNumber,
  matchNumber,
  removeMarked,
  markConfigured,
  setActiveEdit,
  refetchMatch,
  tournamentId,
}: Props) => {
  const [saveConfig] = useMutation(SAVE_CONFIG, {
    errorPolicy: "all",
  });

  useEffect(() => {
    config.forEach(async (c) => {
      const arbs = c.arbs.split(":").map((a) => parseInt(a));
      if (
        !c.configured &&
        arbs[0] === arenaNumber &&
        arbs[1] === roundNumber &&
        arbs[2] === matchNumber
      ) {
        if (arbs[3] === 1) {
          const input: {
            id: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            time?: string;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            time: time,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
            slot_one: c.id,
          };
          // Check if slotTwo existed
          const slotTwoIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:2`;
          });
          if (slotTwoIndex > -1) input.slot_two = config[slotTwoIndex].id;
          const byeIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:3`;
          });
          if (byeIndex > -1) input.bye_slot = config[byeIndex].id;
          await saveConfig({
            variables: {
              input: input,
            },
          });
        } else if (arbs[3] === 2) {
          const input: {
            id: string;
            time?: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            time: time,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
            slot_two: c.id,
          };
          // Check if slotTwo existed
          const slotOneIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:1`;
          });
          if (slotOneIndex > -1) input.slot_one = config[slotOneIndex].id;
          const byeIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:3`;
          });
          if (byeIndex > -1) input.bye_slot = config[byeIndex].id;
          await saveConfig({
            variables: {
              input: input,
            },
          });
        } else if (arbs[3] === 3) {
          const input: {
            id: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            time?: string;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            time: time,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
            bye_slot: c.id,
          };
          // Check if slotTwo existed
          const slotOneIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:1`;
          });
          if (slotOneIndex > -1) input.slot_one = config[slotOneIndex].id;
          const slotTwoIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:2`;
          });
          if (slotTwoIndex > -1) input.slot_two = config[slotTwoIndex].id;
          await saveConfig({
            variables: {
              input: input,
            },
          });
        }
        markConfigured(c.id);
        refetchMatch(`${arenaNumber}:${roundNumber}:${matchNumber}`);
      }
    });
  }, [
    time,
    config,
    arenaNumber,
    matchNumber,
    tournamentId,
    markConfigured,
    roundNumber,
    saveConfig,
    refetchMatch,
    removeMarked,
  ]);

  useEffect(() => {
    config.forEach(async (c) => {
      const arbs = c.arbs.split(":").map((a) => parseInt(a));
      if (
        c.removed &&
        arbs[0] === arenaNumber &&
        arbs[1] === roundNumber &&
        arbs[2] === matchNumber
      ) {
        // Check which slot the removed was
        if (arbs[3] === 1) {
          const input: {
            id: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            time?: string;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
          };
          if (time) input.time = time;
          // Check if slotTwo existed
          const slotTwoIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:2`;
          });
          if (slotTwoIndex > -1) input.slot_two = config[slotTwoIndex].id;
          const byeIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:3`;
          });
          if (byeIndex > -1) input.bye_slot = config[byeIndex].id;
          await saveConfig({
            variables: {
              input: input,
            },
          });
        } else if (arbs[3] === 2) {
          const input: {
            id: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            time?: string;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
          };
          if (time) input.time = time;
          // Check if slotTwo existed
          const slotOneIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:1`;
          });
          if (slotOneIndex > -1) input.slot_one = config[slotOneIndex].id;
          const byeIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:3`;
          });
          if (byeIndex > -1) input.bye_slot = config[byeIndex].id;
          await saveConfig({
            variables: {
              input: input,
            },
          });
        } else if (arbs[3] === 3) {
          const input: {
            id: string;
            arena_number: number;
            round_number: number;
            match_number: number;
            time?: string;
            slot_one?: string;
            slot_two?: string;
            bye_slot?: string;
          } = {
            id: tournamentId,
            arena_number: arenaNumber,
            round_number: roundNumber,
            match_number: matchNumber,
          };
          if (time) input.time = time;
          // Check if slotTwo existed
          const slotOneIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:1`;
          });
          if (slotOneIndex > -1) input.slot_one = config[slotOneIndex].id;
          const slotTwoIndex = config.findIndex((s) => {
            return s.arbs === `${arenaNumber}:${roundNumber}:${matchNumber}:2`;
          });
          if (slotTwoIndex > -1) input.slot_two = config[slotTwoIndex].id;
          await saveConfig({
            variables: {
              input: input,
            },
          });
        }
        removeMarked(c.arbs);
        refetchMatch(`${arenaNumber}:${roundNumber}:${matchNumber}`);
      }
    });
  }, [
    config,
    time,
    arenaNumber,
    matchNumber,
    tournamentId,
    markConfigured,
    roundNumber,
    saveConfig,
    refetchMatch,
    removeMarked,
  ]);

  return (
    <li
      className={cn(
        styles.tournamentBracketItem,
        makeFinalAfter ? styles.makeFinalAfter : ""
      )}
      onClick={() => {
        if (setActiveEdit) {
          if (activeEdit === `${arenaNumber}:${roundNumber}:${matchNumber}`) {
            setActiveEdit(null);
          } else {
            setActiveEdit(`${arenaNumber}:${roundNumber}:${matchNumber}`);
          }
        }
      }}
    >
      <div
        className={cn(
          styles.tournamentBracketMatch,
          makeFinalBefore ? styles.makeFinalBefore : ""
        )}
      >
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <div className={cn(styles.tournamentBracketCaption)}>
              <time>
                {time
                  ? DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED)
                  : "Coming Soon!"}
              </time>
            </div>
            {activeEdit === `${arenaNumber}:${roundNumber}:${matchNumber}` ? (
              <div className={cn(styles.editIcon)}>
                <Image
                  fill
                  sizes="100vw"
                  src={"/icons/edit/green.svg"}
                  alt=""
                ></Image>
              </div>
            ) : (
              <div className={cn(styles.editIcon)}>
                <Image
                  fill
                  sizes="100vw"
                  src={"/icons/edit/white.svg"}
                  alt=""
                ></Image>
              </div>
            )}
          </div>

          <div className={cn(styles.tournamentBracketData)}>
            <div className={cn(styles.tournamentBracketDataProfile)}>
              {match.slot_one?.user && !byeOnly && !timeOnly ? (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      fill
                      sizes="100vw"
                      src={match.slot_one?.user.identity.avatar.image}
                      alt={match.slot_one?.user.identity.brullah_name}
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        match.slot_one?.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>{match.slot_one?.user.identity.brullah_name}</span>
                  </div>
                </>
              ) : match.bye_slot && byeOnly && !timeOnly ? (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      fill
                      sizes="100vw"
                      src={match.bye_slot.user.identity.avatar.image}
                      alt={match.bye_slot.user.identity.brullah_name}
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        match.bye_slot.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>{match.bye_slot.user.identity.brullah_name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      fill
                      sizes="100vw"
                      src={"/icons/cyclone/active.svg"}
                      alt=""
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>¯\(°_o)/¯</span>
                  </div>
                </>
              )}
            </div>
            <span>VS</span>
            <div className={cn(styles.tournamentBracketDataProfile)}>
              {match.slot_two?.user && !byeOnly && !timeOnly ? (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      fill
                      sizes="100vw"
                      src={match.slot_two.user.identity.avatar.image}
                      alt={match.slot_two.user.identity.brullah_name}
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        match.slot_two.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>{match.slot_two.user.identity.brullah_name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      fill
                      src={"/icons/cyclone/active.svg"}
                      sizes="100vw"
                      alt=""
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>¯\(°_o)/¯</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EditTournamentBracket;
