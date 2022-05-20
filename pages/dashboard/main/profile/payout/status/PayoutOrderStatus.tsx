import { ApolloError, gql, useQuery } from "@apollo/client";
import cn from "classnames";
import moment from "moment";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const PAYOUT_ORDER_STATUS = gql`
  query PayoutOrderStatus {
    payoutOrderStatus {
      inNextQueue
      nextPayoutIn
    }
  }
`;

interface Props {
  mutatePayoutOrderLoading: boolean;
  mutatePayoutOrderError: ApolloError | undefined;
}

const PayoutOrderStatus = ({
  mutatePayoutOrderLoading,
  mutatePayoutOrderError,
}: Props) => {
  const { loading, data, error, refetch } = useQuery(PAYOUT_ORDER_STATUS);
  const [formattedCountDown, setFormattedCountDown] = useState("");
  const [payoutMoment, setPayoutMoment] = useState<moment.Moment | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !error) {
        if (!payoutMoment && data?.payoutOrderStatus?.nextPayoutIn) {
          const payoutTime = moment().add(
            data.payoutOrderStatus.nextPayoutIn,
            "milliseconds"
          );
          setPayoutMoment(payoutTime);
        }

        if (payoutMoment) {
          if (moment().isSameOrAfter(payoutMoment)) {
            refetch();
            setPayoutMoment(null);
            return;
          }
          setFormattedCountDown(moment().to(payoutMoment));
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!mutatePayoutOrderLoading) {
      refetch();
      setPayoutMoment(null);
    }
  }, [mutatePayoutOrderLoading]);

  if (loading || error) {
    return (
      <div>
        <h3>...</h3>
        {error ? <h3>{error.message}</h3> : <h3>...</h3>}
      </div>
    );
  }

  return (
    <div>
      {data?.payoutOrderStatus.nextPayoutIn ? (
        <h3>Next payout {formattedCountDown}</h3>
      ) : (
        <h3>Payout queue empty (✿◡‿◡)</h3>
      )}

      <h3
        className={cn(
          data.payoutOrderStatus.inNextQueue ? styles.good : styles.warn
        )}
      >
        {data.payoutOrderStatus.inNextQueue
          ? "You are in next payout buddy, enjoy ^_~"
          : "You are not in next payout ಥ_ಥ"}
      </h3>
      {mutatePayoutOrderError ? (
        <h3 className={cn(styles.error)}>{mutatePayoutOrderError.message}</h3>
      ) : (
        ""
      )}
    </div>
  );
};

export default PayoutOrderStatus;
