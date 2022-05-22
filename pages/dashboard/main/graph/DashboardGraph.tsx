import moment from "moment";
import cn from "classnames";
import styles from "./styles.module.scss";

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

const DashboardGraph = () => {
  const data = [
    {
      createdAt: moment().format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 100 },
    },
    {
      createdAt: moment().add(1, "day").format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 200 },
    },
    {
      createdAt: moment().add(2, "day").format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 300 },
    },
    {
      createdAt: moment().add(3, "day").format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 200 },
    },
    {
      createdAt: moment().add(4, "day").format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 300 },
    },
    {
      createdAt: moment().add(5, "day").format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 600 },
    },
    {
      createdAt: moment().add(6, "day").format("HH DD MMM"),
      gross_amount: { value: "BRC", amount: 700 },
    },
  ];

  useEffect(() => {}, [data]);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis dataKey="createdAt" padding={{ left: 35, right: 35 }} />
            <YAxis />
            <Tooltip content={<DashboardGraphTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="gross_amount.amount"
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
