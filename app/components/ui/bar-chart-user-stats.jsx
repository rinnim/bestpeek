"use client";

import { formatDate } from "@/app/utils/date";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";
import Subtitle from "./subtitle";
import Title from "./title";

const color = "#8884d8";

export default function BarChartUserStats({
  data,
  title,
  subTitle,
  className,
}) {
  const [timeRange, setTimeRange] = useState("90");

  const chartData = data.map((entry) => ({
    date: new Date(entry.date),
    user: entry.users,
  }));

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeRange);

  const filteredData = chartData.filter((item) => {
    return item.date >= startDate;
  });

  const totalUsers = filteredData.reduce((sum, item) => sum + item.user, 0);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Title>{title}</Title>
          <span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border border-border px-1 text-xs md:p-1"
            >
              <option value="90">Last 3 months</option>
              <option value="30">Last 30 days</option>
              <option value="7">Last 7 days</option>
            </select>
          </span>
        </div>
        <Subtitle>{subTitle}</Subtitle>
      </div>
      <div
        className={twMerge(
          "h-[250px] w-full pt-3 md:h-[400px] md:px-2 md:pt-5",
          className,
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ right: 15 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={0.5}
              strokeLinecap="round"
            />
            <XAxis
              style={{ fontSize: "0.75rem" }}
              tickMargin={10}
              minTickGap={30}
              dataKey="date"
              tickFormatter={(value) => formatDate(value)}
            />
            <YAxis
              domain={[0, (dataMax) => Math.ceil(dataMax * 1.01)]}
              style={{ fontSize: "0.75rem" }}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend totalUsers={totalUsers} />} />
            <Bar dataKey="user" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Custom Legend
const CustomLegend = ({ payload, totalUsers }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-2 capitalize md:mt-5 md:gap-5">
      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <div
            className="h-3 w-3 rounded-[0.25rem] md:h-4 md:w-4 md:rounded-md"
            style={{ backgroundColor: color }}
          />
          <p>{entry.value}</p>
          <p>({totalUsers})</p>
        </div>
      ))}
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const activeData = payload[0];
    return (
      <div className="flex flex-col gap-2 rounded-md bg-background p-2 md:p-4">
        <p className="text-sm font-semibold md:text-lg">{formatDate(label)}</p>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex w-full items-center gap-2">
            <div
              className="h-3 w-3 rounded-[0.25rem] md:h-4 md:w-4 md:rounded-md"
              style={{ backgroundColor: color }}
            />
            <div className="flex flex-1 items-center justify-between gap-2 text-xs md:text-sm">
              <p className="capitalize">{activeData.name}</p>
              <p className="font-medium">{activeData.value}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
