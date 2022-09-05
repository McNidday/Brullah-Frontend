import styles from "./styles.module.scss";
import cn from "classnames";
import { useState, FormEvent, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import Image from "next/image";
import Icon from "../../../../../components/Icon/Icon";

interface Props {
  search: string | null;
  setSearch: (text: string) => void;
  handleChangeView: () => void;
}

const ViewAffiliatesSearch = ({
  search,
  setSearch,
  handleChangeView,
}: Props) => {
  const [addUserHover, setAddUserHover] = useState(false);
  const [removeUserHover, setRemoveUserHover] = useState(false);
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
          <Image src={`/icons/search/inactive.svg`} layout="fill"></Image>
        </div>
      </div>
      <div>
        <div
          onMouseEnter={() => setAddUserHover(true)}
          onMouseLeave={() => setAddUserHover(false)}
          onClick={handleChangeView}
        >
          <Icon
            activeLink="/icons/add_user/active.svg"
            inactiveLink="/icons/add_user/inactive.svg"
            hover={addUserHover}
          ></Icon>
        </div>
        <div
          onMouseEnter={() => setRemoveUserHover(true)}
          onMouseLeave={() => setRemoveUserHover(false)}
          onClick={handleChangeView}
        >
          <Icon
            activeLink="/icons/remove_user/active.svg"
            inactiveLink="/icons/remove_user/inactive.svg"
            hover={removeUserHover}
          ></Icon>
        </div>
      </div>
    </div>
  );
};

export default ViewAffiliatesSearch;
