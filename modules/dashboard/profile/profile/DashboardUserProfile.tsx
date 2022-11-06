import { gql } from "@apollo/client";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import numeral from "numeral";
import Icon from "../../../../components/Icon/Icon";
import { decodeBlurHash } from "../../../../functions/helpers";

interface Props {
  setOverflowTab: (tab: string | null) => void;
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

const DashboardUserProfile = ({ setOverflowTab, user }: Props) => {
  const [copyHover, setCopyHover] = useState(false);
  const [copy, setCopy] = useState(false);
  const [editIconHover, setEditIconHover] = useState(false);
  const [affiliateIconHover, setAffiliateIconHover] = useState(false);
  const [affiliateStatus, setAffiliateStatus] = useState(false);
  const [poolIconHover, setPoolIconHover] = useState(false);
  const [admin, setAdmin] = useState(false);
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
    const adminIndex = user.badges.findIndex((a) => {
      return a.status === "ADMIN";
    });
    if (adminIndex > -1) {
      setAdmin(true);
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
          fill
          src={user.identity.avatar.image}
          alt={user.identity.arena_name}
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
            <Icon
              activeLink="/icons/edit/active.svg"
              inactiveLink="/icons/edit/inactive.svg"
              hover={editIconHover}
              alt="Edit Profile"
            ></Icon>
          </Link>
        </div>
        {affiliateStatus ? (
          <div
            onMouseEnter={() => setAffiliateIconHover(true)}
            onMouseLeave={() => setAffiliateIconHover(false)}
          >
            <Link href={`/affiliate`}>
              <Icon
                activeLink="/icons/affiliate/active.svg"
                inactiveLink="/icons/affiliate/inactive.svg"
                hover={affiliateIconHover}
                alt="Affiate Dashboard"
              ></Icon>
            </Link>
          </div>
        ) : (
          ""
        )}
        {admin ? (
          <div
            onMouseEnter={() => setPoolIconHover(true)}
            onMouseLeave={() => setPoolIconHover(false)}
            onClick={() => setOverflowTab("pool")}
          >
            <Icon
              activeLink="/icons/pool/active.svg"
              inactiveLink="/icons/pool/inactive.svg"
              hover={poolIconHover}
              alt="Pool data icon"
            ></Icon>
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
