import styles from "./styles.module.scss";
import cn from "classnames";
import dinero from "dinero.js";
import { useState, FormEvent, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import Icon from "../../../../../components/Icon/Icon";

interface Props {
  search: string | null;
  setSearch: (text: string) => void;
}

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        affiliate {
          code
          commission
        }
      }
    }
  }
`;

const EnlistedAffiliatesStatus = ({ search, setSearch }: Props) => {
  const [copyCodeHover, setCopyCodeHover] = useState(false);
  const [copyCode, setCopyCode] = useState(false);
  const [copyLinkHover, setCopyLinkHover] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const { loading, error, data } = useQuery(USER, {
    errorPolicy: "all",
  });
  const [searchVal, setSearchVal] = useState("");
  const setSearchDebounce = useRef(
    debounce((val: string) => {
      setSearch(val);
    }, 1000)
  ).current;

  const handleSearchVal = (
    e: FormEvent & { target: EventTarget & { [key: string]: any } }
  ) => {
    setSearchVal(e.target.value);
    setSearchDebounce(e.target.value);
  };

  const copyAffiliateCode = () => {
    setCopyCode(true);
    navigator.clipboard.writeText(data?.user.identity.affiliate.code);
  };

  const copyAffiliateLink = () => {
    setCopyLink(true);
    navigator.clipboard.writeText(
      `${process.env.BRULLAH_URL}/?affiliate=${data?.user.identity.affiliate.code}`
    );
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCopyLink(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [copyLink]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCopyCode(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [copyCode]);

  useEffect(() => {
    if (search) setSearchVal(search);
  }, [search]);

  return (
    <div className={cn(styles.container)}>
      <div>
        <input
          placeholder="Search"
          value={searchVal || ""}
          onInput={handleSearchVal}
        ></input>
        <div>
          <Image
            src={`/icons/search/inactive.svg`}
            layout="fill"
            alt="Search Enlisted Affiliates"
          ></Image>
        </div>
      </div>
      <div>
        <div>
          <p>
            {loading || error
              ? `...`
              : dinero({
                  amount: data?.user.identity?.affiliate.commission || 0,
                  currency: "USD",
                }).toFormat()}
          </p>
        </div>
        <div>
          <p>
            {loading || error ? `...` : process.env.BRULLAH_URL}/?affiliate=
            {data?.user.identity.affiliate.code || "nidday"}
          </p>
          <div>
            <div
              className={cn(copyCode ? styles.copiedCode : "")}
              onMouseEnter={() => setCopyCodeHover(true)}
              onMouseLeave={() => setCopyCodeHover(false)}
              onClick={() => copyAffiliateCode()}
            >
              <Icon
                hover={copyCodeHover}
                activeLink="/icons/copy/active.svg"
                inactiveLink="/icons/copy/inactive.svg"
                alt="Copy Affiliate Code"
              ></Icon>
            </div>
            <div
              className={cn(copyLink ? styles.copiedLink : "")}
              onMouseEnter={() => setCopyLinkHover(true)}
              onMouseLeave={() => setCopyLinkHover(false)}
              onClick={() => copyAffiliateLink()}
            >
              <Icon
                hover={copyLinkHover}
                activeLink="/icons/link/active.svg"
                inactiveLink="/icons/link/inactive.svg"
                alt="Copy Affiliate Link"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnlistedAffiliatesStatus;
