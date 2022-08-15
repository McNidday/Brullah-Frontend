import styles from "./styles.module.scss";
import cn from "classnames";
import { useState, FormEvent, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import Image from "next/image";

interface Props {
  search: string | null;
  setSearch: (text: string) => void;
}

const TournamentSearch = ({ search, setSearch }: Props) => {
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
    </div>
  );
};

export default TournamentSearch;
