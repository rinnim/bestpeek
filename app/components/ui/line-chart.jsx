"use client";

import colors from "@/app/api/data/shop-colors";
import { formatDate } from "@/app/utils/date";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "./title";

export default function LineChartComponent({ chartData, title }) {
  // Convert 'date' string to timestamp for the X-axis
  const dataWithTimestamps = chartData.map((entry) => ({
    ...entry,
    timestamp: new Date(entry.date).getTime(),
  }));

  const [timeRange, setTimeRange] = useState(90);

  const filteredData = dataWithTimestamps.filter((item) => {
    const date = new Date(item.timestamp);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeRange);
    return date >= startDate;
  });

  const lineKeys = filteredData[0]
    ? Object.keys(filteredData[0]).filter(
        (key) => key !== "date" && key !== "timestamp",
      )
    : [];

  // const lineKeys = Object.keys(filteredData[0]).filter(
  //   (key) => key !== "date" && key !== "timestamp",
  // );

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <Title className="font-bold">{title}</Title>
        <span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border border-border px-1 text-xs md:p-1"
          >
            <option value={90}>Last 3 months</option>
            <option value={30}>Last 30 days</option>
            <option value={7}>Last 7 days</option>
          </select>
        </span>
      </div>
      <div className="h-[350px] w-full pt-3 md:px-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ right: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              style={{ fontSize: "0.75rem" }}
              tickMargin={8}
              minTickGap={2}
              dataKey="timestamp"
              tickFormatter={(value) => {
                return formatDate(new Date(value));
              }}
            />
            <YAxis
              // domain={["auto", "auto"]}
              domain={[
                (dataMin) => {
                  if (typeof dataMin !== "number") {
                    return 0;
                  }
                  const value = Math.floor((dataMin * 0.99) / 100) * 100;
                  return Number.isFinite(value) ? value : 0;
                },
                (dataMax) => {
                  if (typeof dataMax !== "number") {
                    return 100;
                  }
                  const value = Math.ceil((dataMax * 1.01) / 100) * 100;
                  return Number.isFinite(value) ? value : 100;
                },
              ]}
              style={{ fontSize: "0.75rem" }}
              tickMargin={2}
              minTickGap={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            {lineKeys.map((key) => (
              <Line
                dot={false}
                key={key}
                type="bump"
                dataKey={key}
                stroke={colors[key]}
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomLegend = ({ payload }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-2 capitalize md:mt-5 md:gap-5">
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <div
            style={{ backgroundColor: entry.color }}
            className="h-3 w-3 rounded-[0.25rem] md:h-4 md:w-4 md:rounded-md"
          ></div>
          <p className="text-xs md:text-sm">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

// Custom Tooltip to reflect dynamic data
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-md bg-background p-2 md:p-4">
        <p className="text-sm font-semibold md:text-lg">
          {formatDate(new Date(label))}
        </p>
        {payload
          .sort((a, b) => a.value - b.value)
          .map((entry) => {
            return (
              <div
                key={entry.dataKey}
                className="flex w-full items-center gap-2"
              >
                <div
                  style={{ backgroundColor: entry.stroke }}
                  className="h-3 w-3 rounded-[0.25rem] md:h-4 md:w-4 md:rounded-md"
                />
                <div className="flex flex-1 items-center justify-between gap-2 text-xs md:text-sm">
                  <p className="pr-1 capitalize">{entry.dataKey}</p>
                  <p className="font-medium">৳{entry.value}</p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  return null;
};
