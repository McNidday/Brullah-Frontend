import { ApolloError, gql, useQuery } from "@apollo/client";
import cn from "classnames";
import styles from "./styles.module.scss";
import AffiliateMainError from "./error/AffiliateMainError";
import AffiliateMainLoading from "./loading/AffiliateMainLoading";
import { useEffect, useState } from "react";
import AffiliateAdmin from "./admin/AffiliateAdmin";
import Enlisted from "./enlisted/Enlisted";

const USER = gql`
  query GetUser {
    user {
      id
      badges {
        status
      }
    }
  }
`;

const AffiliateMain = () => {
  const [admin, setAdmin] = useState<"admin" | "affiliate" | "user" | null>(
    null
  );
  const { loading, error, data } = useQuery(USER, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data?.user) {
      const adminIndex = data.user.badges.findIndex((b: { status: String }) => {
        return b.status === "ADMIN";
      });
      const affiliateIndex = data.user.badges.findIndex(
        (b: { status: String }) => {
          return b.status === "AFFILIATE";
        }
      );
      if (adminIndex > -1) {
        setAdmin("admin");
      } else if (affiliateIndex > -1) {
        setAdmin("affiliate");
      } else {
        setAdmin("user");
      }
    }
  }, [data]);

  if (loading || !admin) return <AffiliateMainLoading></AffiliateMainLoading>;
  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <AffiliateMainError errorNum={1} error={error}></AffiliateMainError>
        </div>
      </div>
    );
  }

  if (admin === "user")
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <AffiliateMainError
            errorNum={1}
            error={
              new ApolloError({
                errorMessage: "Only brullah affiliates are allowed!",
              })
            }
          ></AffiliateMainError>
        </div>
      </div>
    );

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        {admin === "admin" ? (
          <AffiliateAdmin></AffiliateAdmin>
        ) : admin === "affiliate" ? (
          <Enlisted></Enlisted>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AffiliateMain;
