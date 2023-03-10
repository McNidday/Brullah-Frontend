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
      return 2;
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
      return 2;
  }
};

export const getNumOfArenas = (numOfUsers: number) => {
  const numberOfarenas = Math.ceil(numOfUsers / 16);
  return numberOfarenas;
};

export const numOfArenas = (numOfUsers: number) => {
  const numberOfarenas = Math.ceil(numOfUsers / 16);
  return numberOfarenas;
};

export const numOfRounds = (numOfUsers: number, arenaNumber: number) => {
  // Get the number of users in that arena
  let numberOfRounds = 0;
  const usersShouldBe = arenaNumber * 16;
  // Now minus and see if only one user remains
  const remainingUsers = numOfUsers - usersShouldBe;
  // Then get the number of rounds
  // Check if remaining users is equal to 16
  if (remainingUsers <= 0) {
    numberOfRounds = getNumOfRounds(16 - (usersShouldBe - numOfUsers));
  }
  numberOfRounds = getNumOfRounds(16);
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
    const usersShouldBe = arenaNumber * 16;
    // Now minus and see if only one user remains
    const remainingUsers = numOfUsers - usersShouldBe;
    // Then get the number of rounds
    // Check if remaining users is equal to 16
    if (remainingUsers <= 0) {
      numberOfUsersInRound = 16 - (usersShouldBe - numOfUsers);
      numberOfRounds = getNumOfRounds(16 - (usersShouldBe - numOfUsers));
    } else {
      numberOfUsersInRound = 16;
      numberOfRounds = getNumOfRounds(16);
    }
    const validNumbers = [5, 9, 13];
    const validIndex = validNumbers.findIndex((n) => {
      return n === numberOfUsersInRound;
    });
    if (validIndex > -1) {
      numberOfMatches = Math.round(numberOfUsersInRound / 2);
    } else {
      if (numberOfUsersInRound === 1) {
        numberOfMatches = 1;
      } else {
        numberOfMatches = Math.floor(numberOfUsersInRound / 2);
      }
    }
    for (let j = 1; j <= numberOfRounds; j++) {
      if (j !== 1) numberOfMatches = Math.round(numberOfMatches / 2);
      if (j === roundNumber) break;
    }
  } while (numberOfMatches === 0);
  return numberOfMatches;
};

export const isByeNumber = (num: number) => {
  const valid = [5, 9, 13];
  const byeIndex = valid.findIndex((v) => v === num);
  return byeIndex === -1 && num % 2 !== 0 ? true : false;
};
