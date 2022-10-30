import styles from "./styles.module.scss";
import cn from "classnames";
import ViewAffiliatesSearch from "./search/ViewAffiliatesSearch";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import ViewAffiliatesContent from "./content/ViewAffiliatesContent";
import ViewAffiliateLoading from "./loading/ViewAffiliateLoading";
import ViewAffiliateError from "./error/ViewAffiliateError";

interface Props {
  handleChangeView: () => void;
}

const AFFILIATES = gql`
  query GetAffiliates($page: Int!, $limit: Int!, $search: String) {
    affiliates(page: $page, limit: $limit, search: $search) {
      docs {
        id
        identity {
          arena_name
          arena_id
        }
        finance {
          affiliate {
            code
            start_date
            enlisted
            commission
          }
        }
      }
      limit
      page
      hasNextPage
      totalDocs
    }
  }
`;

const ViewAffiliates = ({ handleChangeView }: Props) => {
  const [page, setPage] = useState(1);
  const { data, error, networkStatus, refetch } = useQuery(AFFILIATES, {
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
    if (data?.affiliates) {
      setPage(data.affiliates.page);
    }
  }, [data]);

  if (networkStatus !== NetworkStatus.ready)
    return <ViewAffiliateLoading></ViewAffiliateLoading>;

  if (error && (error?.networkError as any).statusCode !== 401) {
    return <ViewAffiliateError errorNum={1} error={error}></ViewAffiliateError>;
  } else if (error) {
    return <ViewAffiliateError errorNum={0} error={error}></ViewAffiliateError>;
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <ViewAffiliatesSearch
          search={search}
          setSearch={handleSearch}
          handleChangeView={handleChangeView}
        ></ViewAffiliatesSearch>
        <ViewAffiliatesContent
          {...data.affiliates}
          page={page}
          handleChangePage={handleChangePage}
        ></ViewAffiliatesContent>
      </div>
    </div>
  );
};

export default ViewAffiliates;
