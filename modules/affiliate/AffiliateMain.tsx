import { ApolloError, gql, useQuery } from "@apollo/client";
import cn from "classnames";
import styles from "./styles.module.scss";
import AffiliateMainError from "./error/AffiliateMainError";
import AffiliateMainLoading from "./loading/AffiliateMainLoading";
import { useEffect, useState } from "react";
import AffiliateAdmin from "./admin/AffiliateAdmin";
import Enlisted from "./enlisted/Enlisted";
import AffiliatesTermsAndContitions from "./terms/AffiliatesTermsAndContitions";

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
  const [contract, setContract] = useState<"loading" | "agreed" | "not-agreed">(
    "loading"
  );
  const [admin, setAdmin] = useState<"admin" | "affiliate" | "user" | null>(
    null
  );
  const { loading, error, data } = useQuery(USER, {
    errorPolicy: "all",
  });

  const agree = () => {
    localStorage.setItem("affiliate-contract", "agreed");
    setContract("agreed");
  };

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

  useEffect(() => {
    const contract = localStorage.getItem("affiliate-contract");
    if (contract === "agreed") {
      setContract("agreed");
    } else {
      setContract("not-agreed");
    }
  }, []);

  if ((loading || !admin || contract === "loading") && !error)
    return <AffiliateMainLoading></AffiliateMainLoading>;

  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <AffiliateMainError errorNum={1} error={error}></AffiliateMainError>
        </div>
      </div>
    );
  } else if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <AffiliateMainError errorNum={0} error={error}></AffiliateMainError>
        </div>
      </div>
    );
  }

  if (contract === "not-agreed") {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <AffiliatesTermsAndContitions
            agree={agree}
          ></AffiliatesTermsAndContitions>
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
