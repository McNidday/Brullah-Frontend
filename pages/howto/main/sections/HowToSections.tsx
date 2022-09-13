import cn from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

interface Props {
  hashChange: () => void;
  hash: string | null;
}

const HowToSections = ({ hash, hashChange }: Props) => {
  return (
    <main>
      <p>This is some living thing</p>
    </main>
  );
};

export default HowToSections;
