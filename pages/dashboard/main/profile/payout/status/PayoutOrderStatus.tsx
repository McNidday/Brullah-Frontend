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
        <h4>...</h4>
        {error ? <h4>{error.message}</h4> : <h4>...</h4>}
      </div>
    );
  }

  return (
    <div>
      {data?.payoutOrderStatus.nextPayoutIn ? (
        <h4>Next payout {formattedCountDown}</h4>
      ) : (
        <h4>Payout queue empty (✿◡‿◡)</h4>
      )}

      <h4
        className={cn(
          data.payoutOrderStatus.inNextQueue ? styles.good : styles.warn
        )}
      >
        {data.payoutOrderStatus.inNextQueue
          ? "You are in next payout buddy, enjoy ^_~"
          : "You are not in next payout ಥ_ಥ"}
      </h4>
      {mutatePayoutOrderError ? (
        <h4 className={cn(styles.error)}>{mutatePayoutOrderError.message}</h4>
      ) : (
        ""
      )}
    </div>
  );
};

export default PayoutOrderStatus;
