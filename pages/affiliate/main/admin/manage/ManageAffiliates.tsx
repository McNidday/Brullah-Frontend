import styles from "./styles.module.scss";
import cn from "classnames";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import ManageAffiliatesLoading from "./loading/ManageAffiliatesLoading";
import ManageAffiliatesError from "./error/ManageAffiliatesError";
import ManageAffiliatesContent from "./content/ManageAffiliatesContent";
import ManageAffiliatesSearch from "./search/ManageAffiliatesSearch";

const AFFILIATES = gql`
  query GetNonAffiliates($page: Int!, $limit: Int!, $search: String) {
    nonAffiliates(page: $page, limit: $limit, search: $search) {
      docs {
        id
        identity {
          arena_name
          arena_id
          email
        }
      }
      limit
      page
      hasNextPage
      totalDocs
    }
  }
`;

interface Props {
  handleChangeView: () => void;
}

const ManageAffiliates = ({ handleChangeView }: Props) => {
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
    if (data?.nonAffiliates) {
      setPage(data.nonAffiliates.page);
    }
  }, [data]);

  if (networkStatus !== NetworkStatus.ready)
    return <ManageAffiliatesLoading></ManageAffiliatesLoading>;

  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <ManageAffiliatesError errorNum={1} error={error}></ManageAffiliatesError>
    );
  } else if (error) {
    return (
      <ManageAffiliatesError errorNum={0} error={error}></ManageAffiliatesError>
    );
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <ManageAffiliatesSearch
          search={search}
          setSearch={handleSearch}
          handleChangeView={handleChangeView}
        ></ManageAffiliatesSearch>
        <ManageAffiliatesContent
          {...data.nonAffiliates}
          page={page}
          handleChangePage={handleChangePage}
        ></ManageAffiliatesContent>
      </div>
    </div>
  );
};

export default ManageAffiliates;
