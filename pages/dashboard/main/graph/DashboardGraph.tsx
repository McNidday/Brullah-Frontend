import moment from "moment";
import cn from "classnames";
import styles from "./styles.module.scss";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import DashboardGraphTooltip from "./tooltip/DashboardGraphTooltip";
import Logo from "../../../components/Logo/Logo";

const GAME_TRANSACTIONS = gql`
  query GetGameTransactions($page: Int, $limit: Int) {
    gameTransactions(page: $page, limit: $limit) {
      docs {
        id
        createdAt
        winner {
          id
          identity {
            arena_name
          }
        }
        looser {
          id
          identity {
            arena_name
          }
        }
        gross_amount {
          value
          currency
        }
      }
      totalDocs
      limit
      hasPrevPage
    }
  }
`;

interface Props {
  user: { id: string };
}

const DashboardGraph = ({ user }: Props) => {
  const { data, error, loading } = useQuery(GAME_TRANSACTIONS);
  const [graphData, setGraphData] = useState<
    Array<{
      amount: number;
      winner: { id: string; identity: { arena_name: string } };
      looser: { id: string; identity: { arena_name: string } };
    }>
  >([]);

  useEffect(() => {
    if (data?.gameTransactions) {
      const update: Array<{
        amount: number;
        winner: { id: string; identity: { arena_name: string } };
        looser: { id: string; identity: { arena_name: string } };
        createdAt: string;
      }> = [];
      for (let i = 0; i < data.gameTransactions.docs.length; i++) {
        const d: {
          gross_amount: { value: number; currency: string };
          winner: { id: string; identity: { arena_name: string } };
          looser: { id: string; identity: { arena_name: string } };
          createdAt: string;
        } = data.gameTransactions.docs[i];

        if (update[i - 1]) {
          if (d.winner.id === user.id) {
            const amount = d.gross_amount.value + update[i - 1].amount;
            update.push({
              amount: amount,
              winner: d.winner,
              looser: d.looser,
              createdAt: moment(d.createdAt).format("HH DD MMM"),
            });
          }

          if (d.looser.id === user.id) {
            const amount = update[i - 1].amount - d.gross_amount.value;
            update.push({
              amount: amount,
              winner: d.winner,
              looser: d.looser,
              createdAt: moment(d.createdAt).format("HH DD MMM"),
            });
          }
        } else {
          if (d.winner.id === user.id) {
            const amount = d.gross_amount.value;
            update.push({
              amount: amount,
              winner: d.winner,
              looser: d.looser,
              createdAt: moment(d.createdAt).format("HH DD MMM"),
            });
          }

          if (d.looser.id === user.id) {
            const amount = -Math.abs(d.gross_amount.value);
            update.push({
              amount: amount,
              winner: d.winner,
              looser: d.looser,
              createdAt: moment(d.createdAt).format("HH DD MMM"),
            });
          }
        }
      }
      setGraphData(update);
    }
  }, [data]);

  if (loading) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.loading)}>
            <Logo
              thinking={true}
              text={true}
              image={{ width: "100px", height: "100px" }}
              container={{ width: "210px", height: "80px" }}
            ></Logo>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.loading)}>
            <h3>{error?.message}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis dataKey="createdAt" padding={{ left: 35, right: 35 }} />
            <YAxis />
            <Tooltip content={<DashboardGraphTooltip user={user} />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#c3073f"
              name="BRC AGAINST TIME （￣︶￣）↗"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardGraph;
