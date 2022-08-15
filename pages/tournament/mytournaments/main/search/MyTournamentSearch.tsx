import styles from "./styles.module.scss";
import cn from "classnames";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import Image from "next/image";

interface Props {
  search: string | null;
  setSearch: (text: string) => void;
}

const MyTournamentSearch = ({ search, setSearch }: Props) => {
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
      <div className={cn(styles.createTournamentLink)}>
        <Link href={"/tournament/createtournament"}>
          <a>
            <h4>Create Tournament</h4>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MyTournamentSearch;
