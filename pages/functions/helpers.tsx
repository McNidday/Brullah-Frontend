import { encode, decode } from "blurhash";
import uniqid from "uniqid";

export const validateImageUpload = (
  photo: Blob & { [key: string]: string }
) => {
  var exts = [".jpg", ".jpeg", ".png"];
  return new RegExp("(" + exts.join("|").replace(/\./g, "\\.") + ")$").test(
    photo.name
  );
};

export const blobToFile = (blob: Blob): File => {
  return new File([blob], `${uniqid()}.${blob.type.split(`/`)[1]}`, {
    type: blob.type,
  });
};

export const encodeImageToBlurHash = async (imageUrl: string) => {
  const loadImage = async (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (...args) => {
        reject(args);
      };
      img.src = src;
    });
  };

  const getImageData = (image: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context?.drawImage(image, 0, 0);
    return context?.getImageData(0, 0, image.width, image.height);
  };

  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData?.data!, imageData?.width!, imageData?.height!, 4, 4);
};

export const decodeBlurHash = (hash: string, width: number, height: number) => {
  const pixels = decode(hash, width, height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const imageData = ctx!.createImageData(width, height);
  imageData.data.set(pixels);
  ctx!.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

export const formatNumber = (n: string) => {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const inputSelection = (el: EventTarget & { [key: string]: any }) => {
  let start = 0,
    end = 0,
    normalizedValue,
    range,
    textInputRange,
    len,
    endRange;

  if (
    typeof el.selectionStart == "number" &&
    typeof el.selectionEnd == "number"
  ) {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.getSelection();

    if (range && range.anchorNode == el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range);

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end,
  };
};

export const cleanAmount = (amount: string) => {
  // Check if a dot exitsts and get rid of it
  let money = amount.split(".");
  let rightMoney = money[0];
  // Remove all the comas
  let comaClensed = rightMoney.split("").map((v) => {
    if (v !== ",") return v;
    return "";
  });
  if (Number.isNaN(parseInt(comaClensed.join("")))) {
    return 0;
  }
  return parseInt(comaClensed.join(""));
};

export const getNumOfRounds = (numOfUsers: number) => {
  switch (numOfUsers) {
    // The ones
    case 2:
      return 1;
    // The twos
    case 3:
      return 2;
    case 4:
      return 2;
    // The threes
    case 5:
      return 3;
    case 6:
      return 3;
    case 7:
      return 3;
    case 8:
      return 3;
    // The fours
    case 9:
      return 4;
    case 10:
      return 4;
    case 11:
      return 4;
    case 12:
      return 4;
    // The fives
    case 13:
      return 4;
    case 14:
      return 4;
    case 15:
      return 4;
    case 16:
      return 4;
    default:
      return 1;
  }
};

export const getNumOfArenas = (numOfUsers: number) => {
  const numberOfarenas = Math.ceil(numOfUsers / 16);
  return numberOfarenas;
};

export const getAreanaFromConfig = (
  arenaNumber: number,
  config: [{ arenaNumber: number }]
) => {
  let arena: any;

  config.forEach((a) => {
    if (a.arenaNumber === arenaNumber) {
      arena = a;
    }
  });
  return arena;
};

export const numOfArenas = (numOfUsers: number) => {
  const numberOfarenas = Math.ceil(numOfUsers / 16);
  return numberOfarenas;
};

export const numOfRounds = (numOfUsers: number, arenaNumber: number) => {
  // Get the number of users in that arena
  let numberOfRounds = 0;
  do {
    for (let i = 1; i <= numOfUsers; i++) {
      const usersShouldBe = i * 16;
      // Now minus and see if only one user remains
      const remainingUsers = numOfUsers - usersShouldBe;
      if (i === arenaNumber) {
        // Then get the number of rounds
        // Check if remaining users is equal to 16
        if (remainingUsers <= 0) {
          numberOfRounds = getNumOfRounds(16 - (usersShouldBe - numOfUsers));
          break;
        }
        numberOfRounds = getNumOfRounds(16);
        break;
      }
    }
  } while (numberOfRounds === 0);
  return numberOfRounds;
};

export const numOfMatches = (
  numOfUsers: number,
  arenaNumber: number,
  roundNumber: number
) => {
  let numberOfRounds = 0;
  let numberOfMatches = 0;
  let numberOfUsersInRound = 0;

  do {
    for (let i = 1; i <= numOfUsers; i++) {
      const usersShouldBe = i * 16;
      // Now minus and see if only one user remains
      const remainingUsers = numOfUsers - usersShouldBe;
      if (i === arenaNumber) {
        // Then get the number of rounds
        // Check if remaining users is equal to 16
        if (remainingUsers <= 0) {
          numberOfUsersInRound = 16 - (usersShouldBe - numOfUsers);
          numberOfRounds = getNumOfRounds(16 - (usersShouldBe - numOfUsers));
        } else {
          numberOfUsersInRound = 16;
          numberOfRounds = getNumOfRounds(16);
        }
        numberOfMatches = Math.round(numberOfUsersInRound / 2);
        for (let j = 1; j <= numberOfRounds; j++) {
          if (j !== 1) numberOfMatches = Math.round(numberOfMatches / 2);
          if (j === roundNumber) break;
        }
      }
    }
  } while (numberOfMatches === 0);
  return Math.floor(numberOfMatches);
};

export const isByeNumber = (num: number) => {
  const valid = [5, 9, 13];
  const byeIndex = valid.findIndex((v) => v === num);
  return byeIndex === -1 && num % 2 !== 0 ? true : false;
};

export const createMatchConfig = (numOfUsers: number) => {
  if (numOfUsers >= 5 && numOfUsers <= 8) {
    numOfUsers = 8;
  }
  const config: Array<any> = [];
  for (let a = 0; a < numOfArenas(numOfUsers); a++) {
    config[a] = {
      arenaNumber: a + 1,
      rounds: [
        {
          roundNumber: 1,
          matches: [],
        },
      ],
    };
    const validNumbers = [5, 9, 13];
    let bye;
    if (numOfUsers % 2 !== 0) {
      const validIndex = validNumbers.findIndex((n) => {
        return n === numOfUsers;
      });
      if (validIndex === -1) bye = true;
    }

    let activeUsers = numOfUsers;
    for (let m = 0; m < numOfMatches(numOfUsers, a + 1, 1); m++) {
      let matchConfig;
      if (bye && activeUsers === 3) {
        matchConfig = {
          matchNumber: m + 1,
          slot_one: {},
          slot_two: {},
          bye: {},
        };
      } else {
        matchConfig = {
          matchNumber: m + 1,
          slot_one: {},
          slot_two: {},
        };
      }
      activeUsers = activeUsers - 2;
      config[a].rounds[0].matches[m] = matchConfig;
    }
  }
  return config;
};

export const createOnlineConfigFromLocalConfig = (
  joinedUsers: Array<any>,
  localConfig: Array<any>
) => {
  const usersToConfigure = joinedUsers.map((u) => {
    const newUser = { ...u };
    delete newUser.__typename;
    // delete u.__typename;
    return newUser;
  });
  // Create a new config
  const newOnlineConfig = createMatchConfig(usersToConfigure.length);
  const newLocalConfig = createMatchConfig(usersToConfigure.length);

  for (let ai = 0; ai < localConfig.length; ai++) {
    const a = localConfig[ai];
    for (let ri = 0; ri < a.rounds.length; ri++) {
      const r = a.rounds[ri];
      for (let mi = 0; mi < r.matches.length; mi++) {
        const m = r.matches[mi];
        if (m.slot_one.user) {
          // Check if user is in the config array
          const userIndex = usersToConfigure.findIndex(
            (u) => u.id === m.slot_one.user.id
          );
          if (userIndex > -1) {
            // Check if the slot exists in the new local config
            if (newOnlineConfig[ai]?.rounds[ri]?.matches[mi]?.slot_one) {
              newOnlineConfig[ai].rounds[ri].matches[mi].slot_one = {
                user: m.slot_one.user.id,
              };
              newLocalConfig[ai].rounds[ri].matches[mi].slot_one = {
                user: usersToConfigure[userIndex],
              };
              // Remove user from users to configure
              usersToConfigure.splice(userIndex, 1);
            }
          }
        }

        if (m.slot_two.user) {
          // Check if user is in the config array
          const userIndex = usersToConfigure.findIndex(
            (u) => u.id === m.slot_two.user.id
          );
          if (userIndex > -1) {
            // Check if the slot exists in the new local config
            if (newOnlineConfig[ai]?.rounds[ri]?.matches[mi]?.slot_two) {
              newOnlineConfig[ai].rounds[ri].matches[mi].slot_two = {
                user: m.slot_two.user.id,
              };
              newLocalConfig[ai].rounds[ri].matches[mi].slot_two = {
                user: usersToConfigure[userIndex],
              };
              // Remove user from users to configure
              usersToConfigure.splice(userIndex, 1);
            }
          }
        }

        if (m.bye && m.bye.user) {
          // Check if user is in the config array
          const userIndex = usersToConfigure.findIndex(
            (u) => u.id === m.bye.user.id
          );
          if (userIndex > -1) {
            // Check if a bye is viable in current arena
            const isABye = isByeNumber(
              joinedUsers.slice(ai * 16, (ai + 1) * 16).length
            );
            if (isABye) {
              if (newOnlineConfig[ai]?.rounds[ri]?.matches[mi]) {
                newOnlineConfig[ai].rounds[ri].matches[mi].bye = {
                  user: m.bye.user.id,
                };
                newLocalConfig[ai].rounds[ri].matches[mi].bye = {
                  user: usersToConfigure[userIndex],
                };
                // Remove user from users to configure
                usersToConfigure.splice(userIndex, 1);
              }
            }
          }
        }
      }
    }
  }

  return {
    onlineConfig: newOnlineConfig,
    localConfig: newLocalConfig,
    usersToConfigure: usersToConfigure,
  };
};
