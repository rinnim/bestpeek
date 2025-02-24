"use client";

import colors from "@/app/api/data/shop-colors";
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

export default function ShopRecordsBarChart({
  stats,
  title,
  subTitle,
  className,
}) {
  const [timeRange, setTimeRange] = useState("90");
  // Preprocess data to structure it for the BarChart
  let chartData = [];

  // Convert stats into a structure we can use for the BarChart
  stats.forEach((stat) => {
    const shopRecords = {};
    stat.shops.forEach((shop) => {
      shopRecords[shop.name] = shop.records;
    });

    // Push the processed data for this date into the chartData
    chartData.push({
      date: new Date(stat.date),
      ...shopRecords,
    });
  });

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeRange);

  const filteredData = chartData.filter((item) => {
    return item.date >= startDate;
  });

  // Calculate total records from filtered data
  const totalRecords = {};
  filteredData.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'date') {
        totalRecords[key] = (totalRecords[key] || 0) + value;
      }
    });
  });

  // Get all unique shop names for the legend
  const shopNames = Object.keys(totalRecords);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Title>{title}</Title>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border border-border px-1 text-xs md:p-1"
          >
            <option value="90">Last 3 months</option>
            <option value="30">Last 30 days</option>
            <option value="7">Last 7 days</option>
          </select>
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
            {/* Cartesian Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={0.5}
              strokeLinecap="round"
            />
            {/* X Axis - displaying dates */}
            <XAxis
              style={{ fontSize: "0.75rem" }}
              tickMargin={5}
              minTickGap={30}
              dataKey="date"
              tickFormatter={(value) => formatDate(value)}
            />
            {/* Y Axis - displaying total number of users */}
            <YAxis style={{ fontSize: "0.75rem" }} tickMargin={2} />
            {/* Tooltip - displays data when hovering over bars */}
            <Tooltip content={<CustomTooltip />} />
            {/* Legend */}
            <Legend content={<CustomLegend totalRecords={totalRecords} />} />
            {/* Bars - one for each shop */}
            {shopNames.map((shopName) => (
              <Bar
                key={shopName}
                dataKey={shopName} // Corresponds to the shop name in chartData
                fill={colors[shopName]} // Use color based on shop
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Custom Legend
const CustomLegend = ({ payload, totalRecords }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-2 capitalize md:mt-5 md:gap-5">
      {/* Shop Records */}
      <div className="flex flex-wrap justify-center gap-2 capitalize md:gap-5">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-2 text-xs md:text-sm"
          >
            <div
              className="h-3 w-3 rounded-[0.25rem] md:h-4 md:w-4 md:rounded-md"
              style={{ backgroundColor: colors[entry.dataKey] }}
            />
            <p>{entry.value}</p>
            <p>({totalRecords[entry.dataKey]})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-md bg-background p-2 md:p-4">
        <p className="text-sm font-semibold md:text-lg">{formatDate(label)}</p>
        {payload
          .sort((a, b) => b.value - a.value)
          .map((entry) => {
            return (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-[0.25rem] md:h-4 md:w-4 md:rounded-md"
                  style={{ backgroundColor: colors[entry.name] }}
                />
                <div className="flex flex-1 items-center justify-between gap-2 text-xs md:text-sm">
                  <p className="capitalize">{entry.name}</p>
                  <p className="font-medium">{entry.value}</p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  return null;
};
