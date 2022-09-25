import { ReactNode, useEffect, useState, Fragment, ElementType } from "react";

interface Props {
  children: ReactNode;
  fallback: JSX.Element;
}

const ApolloClientOnly = ({ children, fallback, ...delegate }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return fallback;
  return <Fragment {...delegate}>{children}</Fragment>;
};

export default ApolloClientOnly;
