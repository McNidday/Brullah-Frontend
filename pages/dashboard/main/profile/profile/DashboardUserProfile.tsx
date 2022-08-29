import { gql } from "@apollo/client";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import { decodeBlurHash } from "../../../../functions/helpers";
import styles from "./styles.module.scss";
import numeral from "numeral";

interface Props {
  user: {
    identity: {
      arena_name: string;
      arena_id: string;
      avatar: {
        image: string;
        blurhash: string;
      };
    };
    stats: {
      tournament: {
        likes: number;
      };
    };
  };
}

const DashboardUserProfile = ({ user }: Props) => {
  const [copyHover, setCopyHover] = useState(false);
  const [copy, setCopy] = useState(false);
  const [editIconHover, setEditIconHover] = useState(false);
  const copyArenaId = () => {
    setCopy(true);
    navigator.clipboard.writeText(user.identity.arena_id);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  }, [copy]);

  return (
    <div className={cn(styles.profile)}>
      <div>
        <Image
          src={user.identity.avatar.image}
          layout="fill"
          placeholder="blur"
          blurDataURL={decodeBlurHash(user.identity.avatar.blurhash, 100, 100)}
        ></Image>
      </div>
      <div>
        <h4>{user.identity.arena_name}</h4>
      </div>
      <div>
        <h4>💘 {numeral(user?.stats?.tournament?.likes || 0).format("0a")}</h4>
      </div>
      <div>
        <h4>{user.identity.arena_id}</h4>
        <div
          className={copy ? "copy" : ""}
          onMouseEnter={() => setCopyHover(true)}
          onMouseLeave={() => setCopyHover(false)}
          onClick={() => copyArenaId()}
        >
          <Icon
            hover={copyHover}
            activeLink="/icons/copy/active.svg"
            inactiveLink="/icons/copy/inactive.svg"
          ></Icon>
        </div>
      </div>
      <div
        onMouseEnter={() => setEditIconHover(true)}
        onMouseLeave={() => setEditIconHover(false)}
      >
        <Link href={`/user/update`}>
          <a>
            <Icon
              activeLink="/icons/edit/active.svg"
              inactiveLink="/icons/edit/inactive.svg"
              hover={editIconHover}
            ></Icon>
          </a>
        </Link>
      </div>
    </div>
  );
};

export const DashboardUserProfileFragment = gql`
  fragment DashboardUserProfile_User on User {
    identity {
      arena_name
      arena_id
      avatar {
        image
        blurhash
      }
    }
  }
`;

export default DashboardUserProfile;
