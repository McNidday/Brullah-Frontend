import { gql, useQuery } from "@apollo/client";
import dinero from "dinero.js";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Duration } from "luxon";

interface Props {
  amountSwitch: number;
}

const POOL = gql`
  query GetPool {
    pool {
      brc
      cash
      profit
    }
  }
`;

const PoolAmount = ({ amountSwitch }: Props) => {
  const { loading, error, data, refetch } = useQuery(POOL, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (!loading) refetch();
  }, [amountSwitch, loading, refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, Duration.fromObject({ minutes: 10 }).as("milliseconds"));
    return () => clearInterval(interval);
  }, [refetch]);

  if (error)
    return (
      <div className={cn(styles.errorContainer)}>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className={cn(styles.container)}>
      <div>
        <h5>
          Cash:{" "}
          {loading
            ? "..."
            : dinero({ amount: data.pool.cash, currency: "USD" }).toFormat()}
        </h5>
      </div>
      <div>
        <h5>
          Brc:{" "}
          {loading
            ? "..."
            : dinero({ amount: data.pool.brc, currency: "USD" }).toFormat(
                "0,0.00"
              )}
        </h5>
      </div>
      <div>
        <h5>
          Profit:{" "}
          {loading
            ? "..."
            : dinero({ amount: data.pool.profit, currency: "USD" }).toFormat()}
        </h5>
      </div>
    </div>
  );
};

export default PoolAmount;
