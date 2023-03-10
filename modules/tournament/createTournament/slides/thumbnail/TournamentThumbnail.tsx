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
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  isActive: boolean;
  setThumbnail: Function;
  error: Error | undefined;
  serverError: ApolloError | undefined;
  createTournament: () => Promise<void>;
}

const TournamentThumbnail = ({
  setThumbnail,
  createTournament,
  isActive,
  error,
  serverError,
}: Props) => {
  const swiper = useSwiper();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  // const [pervAvatarUrl, setPrevAvaratUrl] = useState<string | ArrayBuffer | null>(null);
  const [avatarUrl, setAvaratUrl] = useState<string | ArrayBuffer | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const crop = useRef<Croppie | null>(null);
  const cropRef = useRef(null);

  const cropThumbnail = async () => {
    if (crop.current) {
      const imageBlob = await crop.current.result({
        type: "blob",
      });
      setThumbnail(blobToFile(imageBlob));
      setButtonDisabled(true);
    } else {
      setThumbnail(null);
    }
  };

  const handleThumbnail = (
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
      setThumbnail(null);
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
      setUploadError(error.message);
      setAvaratUrl(null);
      swiper.slideTo(6);
      setButtonDisabled(false);
    }
  }, [error, swiper]);

  useEffect(() => {
    if (serverError) {
      setButtonDisabled(false);
    }
  }, [serverError]);

  useEffect(() => {
    if (!avatarUrl) return;
    crop.current = new Croppie(cropRef.current!, {
      enableExif: true,
      enableZoom: true,
      showZoomer: true,
      customClass: "swiper-no-swiping",
      enableOrientation: true,
      viewport: {
        width: 200,
        height: 100,
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
            setThumbnail(blobToFile(imageBlob));
          });
      });
    return () => {
      if (crop.current) {
        crop?.current!.destroy();
        crop.current = null;
      }
    };
  }, [avatarUrl, setThumbnail]);

  useEffect(() => {
    if (buttonDisabled) createTournament();
  }, [buttonDisabled, createTournament]);

  return (
    <>
      <div>
        <input
          tabIndex={isActive ? 0 : -1}
          className={cn(styles.hiddenInput)}
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleThumbnail}
        ></input>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>And finally, some eye candy ????</h3>
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
                <p>Click the picture icon to upload your thumbnail.</p>
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
              cropThumbnail();
              swiper.slidePrev();
            }}
          ></Button>
          <Button
            text="Let's go!"
            disabled={buttonDisabled}
            onClick={() => {
              cropThumbnail();
            }}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default TournamentThumbnail;
