import debounce from "lodash.debounce";
import Croppie from "croppie";
import cn from "classnames";

import "croppie/croppie.css";
import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { validateImageUpload } from "../../../../functions/helpers";
import { useSwiper } from "swiper/react";

const updateAvatar = debounce(async function (
  crop: Croppie | null,
  updateProfile: Function
) {
  if (crop) {
    const imageBlob = await crop.result({
      type: "blob",
    });
    updateProfile("avatar", imageBlob);
  } else {
    updateProfile("avatar", null);
  }
},
500);

interface Props {
  updateProfile: Function;
}

const SignUpAvatar = ({ updateProfile }: Props) => {
  const swiper = useSwiper();

  const [avatarUrl, setAvaratUrl] = useState<string | ArrayBuffer | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const cropRef = useRef(null);
  let crop: Croppie | null;

  const handleAvatar = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    // Get the local file url
    const file = e.target.files![0];
    if (!file || !validateImageUpload(file)) {
      // Destroy crop if any
      if (crop) {
        crop.destroy();
        crop = null;
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
    const avatarObserver = new MutationObserver(function (mutations) {
      mutations.forEach(() => {
        updateAvatar(crop, updateProfile);
      });
    });

    avatarObserver.observe(cropRef.current!, {
      subtree: true,
      attributes: true,
    });
  });

  useEffect(() => {
    if (!avatarUrl) return;
    crop = new Croppie(cropRef.current!, {
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
    crop.bind({
      url: typeof avatarUrl === "string" ? avatarUrl : "",
      orientation: 1,
    });
    return () => {
      if (crop) {
        crop.destroy();
        crop = null;
      }
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
            <h1>Everybody loves eye candy</h1>
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
            onClick={() => swiper.slidePrev()}
          ></Button>
          <Button
            text="next"
            disabled={false}
            onClick={() => swiper.slideNext()}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SignUpAvatar;
