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
