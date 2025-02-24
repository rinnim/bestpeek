"use client";

import { formatDate } from "@/app/utils/date";
import { useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AreaChartComponent({ chartData }) {
  const colors = ["#3b82f6", "#72BF44", "#059669"];
  // Convert 'date' string to timestamp for the X-axis
  const dataWithTimestamps = chartData.map((entry) => ({
    ...entry,
    timestamp: new Date(entry.date).getTime(),
  }));

  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = dataWithTimestamps.filter((item) => {
    const date = new Date(item.timestamp);
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const lineKeys = Object.keys(filteredData[0]).filter(
    (key) => key !== "date" && key !== "timestamp",
  );

  return (
    <div className="relative h-full w-full">
      <span className="absolute -top-12 right-0">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-lg border border-border p-2"
        >
          <option value="90d">Last 3 months</option>
          <option value="30d">Last 30 days</option>
          <option value="7d">Last 7 days</option>
        </select>
      </span>
      <div className="h-full w-full px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={2}
              dataKey="timestamp"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              minTickGap={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {lineKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <div className="mt-5 flex flex-wrap justify-center gap-5 capitalize">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            style={{ backgroundColor: entry.color }}
            className="h-4 w-4 rounded-md"
          ></div>
          <p className="text-sm">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

// Custom Tooltip to reflect dynamic data
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Format the date for the tooltip
    const date = new Date(label);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="flex flex-col gap-2 rounded-md bg-background p-4">
        <p className="text-medium text-lg">{formatDate(date)}</p>
        {payload.map((entry) => {
          const { dataKey, value } = entry;
          const metricName = dataKey.charAt(0).toUpperCase() + dataKey.slice(1);
          const color = entry.stroke;
          return (
            <div key={dataKey} className="flex items-center gap-2">
              <div
                style={{ backgroundColor: color }}
                className="h-4 w-4 rounded-md"
              ></div>
              <div className="flex flex-1 items-center justify-between gap-2">
                <p key={dataKey} className="pr-1 text-sm">
                  {metricName}
                </p>
                <p className="text-sm">৳{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
