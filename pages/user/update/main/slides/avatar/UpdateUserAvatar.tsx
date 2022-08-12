import Croppie from "croppie";
import cn from "classnames";
import "croppie/croppie.css";
import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  blobToFile,
  validateImageUpload,
} from "../../../../../functions/helpers";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  updateProfile: Function;
  error: ApolloError | undefined;
}

const UpdateUserAvatar = ({ updateProfile, error }: Props) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  // const [pervAvatarUrl, setPrevAvaratUrl] = useState<string | ArrayBuffer | null>(null);
  const [avatarUrl, setAvaratUrl] = useState<string | ArrayBuffer | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const crop = useRef<Croppie | null>(null);
  const cropRef = useRef(null);

  const cropAvatar = async () => {
    if (swiperSlide.isActive && crop.current) {
      const imageBlob = await crop.current.result({
        type: "blob",
      });
      updateProfile("avatar", blobToFile(imageBlob));
    } else {
      updateProfile("avatar", null);
    }
  };

  const handleAvatar = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    // Get the local file url
    const file = e.target.files![0];
    if (!file || !validateImageUpload(file)) {
      // Destroy crop if any
      if (crop) {
        crop.current!.destroy();
        crop.current = null;
      }
      // Set the upload errors
      if (!file) {
        setUploadError(() => "No image has been selected.");
      } else {
        setUploadError(() => "Only JPG, JPEG and PNG files allowed.");
      }
      setAvaratUrl(null);
      return;
    }
    // Validate the file extention
    const cropReader = new FileReader();
    cropReader.readAsDataURL(file);
    cropReader.onload = () => {
      setAvaratUrl(cropReader.result!);
    };
    cropReader.onerror = () => {
      setAvaratUrl(null);
    };
  };

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "blurhash") {
        setAvaratUrl(null);
        setUploadError(errorArray[1].trim());
        swiper.slideTo(3);
      }
    }
  }, [error]);

  useEffect(() => {
    if (!avatarUrl) return;
    crop.current = new Croppie(cropRef.current!, {
      enableExif: true,
      enableZoom: true,
      showZoomer: true,
      customClass: "swiper-no-swiping",
      enableOrientation: true,
      viewport: {
        width: 120,
        height: 120,
        type: "circle",
      },
      boundary: {
        width: 250,
        height: 150,
      },
    });

    crop.current
      .bind({
        url: typeof avatarUrl === "string" ? avatarUrl : "",
        orientation: 1,
      })
      .then(() => {
        // Update the file upload
        crop
          .current!.result({
            type: "blob",
          })
          .then((imageBlob) => {
            updateProfile("avatar", blobToFile(imageBlob));
          });
      });
    return () => {
      crop?.current!.destroy();
      crop.current = null;
    };
  }, [avatarUrl]);

  return (
    <>
      <div>
        <input
          className={cn(styles.hiddenInput)}
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleAvatar}
        ></input>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>Do you have new eye candy 🍬</h3>
          </label>
        </div>
        <div
          className={cn(styles.image, "swiper-no-swiping")}
          data-swiper-parallax="-500"
        >
          <label className={cn(styles.imageButton)} htmlFor="avatar"></label>
          <div ref={cropRef}>
            {!avatarUrl && !uploadError ? (
              <div className={cn(styles.imagePlaceholder)}>
                <p>Click the picture icon to upload your avatar</p>
              </div>
            ) : !avatarUrl && uploadError ? (
              <div className={cn(styles.imagePlaceholder)}>
                <p>{uploadError}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={cn(styles.buttons)} data-swiper-parallax="-100">
          <Button
            text="back"
            disabled={false}
            onClick={() => {
              cropAvatar();
              swiper.slidePrev();
            }}
          ></Button>
          <Button
            text="next"
            disabled={false}
            onClick={() => {
              cropAvatar();
              swiper.slideNext();
            }}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserAvatar;
