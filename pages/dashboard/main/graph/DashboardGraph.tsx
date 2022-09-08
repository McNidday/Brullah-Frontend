import dynamic from "next/dynamic";
import moment from "moment";
import cn from "classnames";
import styles from "./styles.module.scss";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Logo from "../../../components/Logo/Logo";
import DashboardGraphTooltip from "./tooltip/DashboardGraphTooltip";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
  const { data, error, loading } = useQuery(GAME_TRANSACTIONS, {
    variables: { page: 1, limit: 50 },
  });
  const [graphData, setGraphData] = useState<
    Array<{
      y: number;
      x: number;
      winner: { id: string; identity: { arena_name: string } };
      looser: { id: string; identity: { arena_name: string } };
    }>
  >([]);
  new Date().getTime();
  useEffect(() => {
    if (data?.gameTransactions) {
      const update: Array<{
        y: number;
        winner: { id: string; identity: { arena_name: string } };
        looser: { id: string; identity: { arena_name: string } };
        x: number;
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
            const amount = d.gross_amount.value / 100 + update[i - 1].y;
            update.push({
              y: amount,
              winner: d.winner,
              looser: d.looser,
              x: moment(d.createdAt).toDate().getTime(),
            });
          }

          if (d.looser.id === user.id) {
            const amount = update[i - 1].y - d.gross_amount.value / 100;
            update.push({
              y: amount,
              winner: d.winner,
              looser: d.looser,
              x: moment(d.createdAt).toDate().getTime(),
            });
          }
        } else {
          if (d.winner.id === user.id) {
            const amount = d.gross_amount.value / 100;
            update.push({
              y: amount,
              winner: d.winner,
              looser: d.looser,
              x: moment(d.createdAt).toDate().getTime(),
            });
          }

          if (d.looser.id === user.id) {
            const amount = -Math.abs(d.gross_amount.value / 100);
            update.push({
              y: amount,
              winner: d.winner,
              looser: d.looser,
              x: moment(d.createdAt).toDate().getTime(),
            });
          }
        }
      }
      setGraphData(update);
    }
  }, [data]);

  if (loading || typeof window === "undefined") {
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
  // console.log(graphData);
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div className={cn(styles.graphContainer)}>
          <Chart
            width="100%"
            height="100%"
            type="line"
            options={{
              chart: {
                id: "BRC-A-TIME",
                fontFamily: "inherit",
                redrawOnParentResize: true,
              },
              xaxis: { type: "datetime" },
              title: {
                text: "Brc / Time",
                style: {
                  fontFamily: "inherit",
                },
              },
              colors: ["#c3073f"],
              markers: {
                size: 3,
              },
              noData: {
                text: "Well this i awkward...get your game on 😒",
                align: "center",
                verticalAlign: "middle",
                offsetX: 0,
                offsetY: 0,
              },
              tooltip: {
                theme: "dark",
                custom: ({ series, seriesIndex, dataPointIndex }) => {
                  const brc = series[seriesIndex][dataPointIndex];
                  const winner = graphData[dataPointIndex].winner;
                  const looser = graphData[dataPointIndex].looser;
                  const label = moment(graphData[dataPointIndex].x).format(
                    "LL"
                  );
                  return renderToStaticMarkup(
                    <DashboardGraphTooltip
                      brc={brc}
                      user={user}
                      winner={winner}
                      looser={looser}
                      label={label}
                    ></DashboardGraphTooltip>
                  );
                },
              },
            }}
            series={[
              {
                name: "brc",
                data: graphData,
              },
            ]}
          ></Chart>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
