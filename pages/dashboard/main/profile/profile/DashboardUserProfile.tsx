import { gql } from "@apollo/client";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../../../../../components/Icon/Icon";
import { decodeBlurHash } from "../../../../../functions/helpers";
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
    badges: Array<{ status: String }>;
  };
}

const DashboardUserProfile = ({ user }: Props) => {
  const [copyHover, setCopyHover] = useState(false);
  const [copy, setCopy] = useState(false);
  const [editIconHover, setEditIconHover] = useState(false);
  const [affiliateIconHover, setAffiliateIconHover] = useState(false);
  const [affiliateStatus, setAffiliateStatus] = useState(false);
  const copyArenaId = () => {
    setCopy(true);
    navigator.clipboard.writeText(user.identity.arena_id);
  };

  useEffect(() => {
    const affiliateIndex = user.badges.findIndex((a) => {
      return a.status === "AFFILIATE" || a.status === "ADMIN";
    });
    if (affiliateIndex > -1) {
      setAffiliateStatus(true);
    }
  }, [user?.badges]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCopy(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [copy]);

  return (
    <div className={cn(styles.profile)}>
      <div>
        <Image
          src={user.identity.avatar.image}
          alt={user.identity.arena_name}
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
            alt="Copy Arena Id"
          ></Icon>
        </div>
      </div>
      <div>
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
                alt="Edit Profile"
              ></Icon>
            </a>
          </Link>
        </div>
        {affiliateStatus ? (
          <div
            onMouseEnter={() => setAffiliateIconHover(true)}
            onMouseLeave={() => setAffiliateIconHover(false)}
          >
            <Link href={`/affiliate`}>
              <a>
                <Icon
                  activeLink="/icons/affiliate/active.svg"
                  inactiveLink="/icons/affiliate/inactive.svg"
                  hover={affiliateIconHover}
                  alt="Affiate Dashboard"
                ></Icon>
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export const DashboardUserProfileFragment = gql`
  fragment DashboardUserProfile_User on User {
    badges {
      status
    }
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
