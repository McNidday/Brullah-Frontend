import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import EnlistedAffiliatesContent from "./content/EnlistedAffiliatesContent";
import EnlistedAffiliatesStatus from "./status/EnlistedAffiliatesStatus";
import EnlistedAffiliateLoading from "./loading/EnlistedAffiliateLoading";
import EnlistedAffiliateError from "./error/EnlistedAffiliateError";

const ENLISTED = gql`
  query GetEnlisted($page: Int!, $limit: Int!, $search: String) {
    enlisted(page: $page, limit: $limit, search: $search) {
      docs {
        id
        enlisted {
          identity {
            arena_id
            arena_name
          }
        }
        commission {
          value
          currency
        }
        contract_expiry
        contract_commence
      }
      limit
      page
      hasNextPage
      totalDocs
    }
  }
`;

const Enlisted = () => {
  const [page, setPage] = useState(1);
  const { data, error, networkStatus, refetch } = useQuery(ENLISTED, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    variables: {
      page: page,
      limit: 10,
      search: "",
    },
  });

  const [search, setSearch] = useState<string | null>(null);
  const getSearchResults = useRef(
    debounce((val: string) => {
      if (val) {
        refetch({
          page: 1,
          search: val,
          limit: 10,
        });
      } else {
        refetch({
          page: 1,
          search: "",
          limit: 10,
        });
      }
    }, 500)
  ).current;
  const handleSearch = (val: string) => {
    if (val && val !== "") {
      setSearch(val);
    } else {
      setSearch(null);
    }
    getSearchResults(val);
  };

  const handleChangePage = (newPage: number) => {
    refetch({ limit: 10, page: newPage + 1 });
  };

  useEffect(() => {
    if (data?.enlisted) {
      setPage(data.enlisted.page);
    }
  }, [data]);

  if (error && (error?.networkError as any)?.statusCode !== 401) {
    return (
      <EnlistedAffiliateError
        errorNum={1}
        error={error}
      ></EnlistedAffiliateError>
    );
  } else if (error) {
    return (
      <EnlistedAffiliateError
        errorNum={0}
        error={error}
      ></EnlistedAffiliateError>
    );
  }

  if (networkStatus !== NetworkStatus.ready)
    return <EnlistedAffiliateLoading></EnlistedAffiliateLoading>;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <EnlistedAffiliatesStatus
          search={search}
          setSearch={handleSearch}
        ></EnlistedAffiliatesStatus>
        <EnlistedAffiliatesContent
          {...data.enlisted}
          handleChangePage={handleChangePage}
        ></EnlistedAffiliatesContent>
      </div>
    </div>
  );
};

export default Enlisted;
