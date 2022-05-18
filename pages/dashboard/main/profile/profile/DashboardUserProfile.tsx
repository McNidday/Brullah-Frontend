import { gql } from "@apollo/client";
import cn from "classnames";
import Image from "next/image";
import Icon from "../../../../components/Icon/Icon";
import { decodeBlurHash } from "../../../../functions/helpers";
import styles from "./styles.module.scss";

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
  };
}

const DashboardUserProfile = ({ user }: Props) => {
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
        <h3>{user.identity.arena_name}</h3>
      </div>
      <div>
        <h3>{user.identity.arena_id}</h3>
        <div>
          <Icon
            hover={false}
            activeLink="/icons/copy/active.svg"
            inactiveLink="/icons/copy/active.svg"
          ></Icon>
        </div>
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
