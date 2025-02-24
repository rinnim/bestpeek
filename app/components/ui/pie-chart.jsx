import colors from "@/app/api/data/shop-colors";
import { useState, useEffect } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function PieChartComponent({ data }) {
  // Prepare data for Pie chart
  const pieData = data.map((shop) => ({
    name: shop.name,
    value: shop.totalProducts,
  }));

  // State to track the active pie slice
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to handle slice hover
  const handlePieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };


  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            label
            onMouseEnter={handlePieEnter}
            onMouseLeave={handlePieLeave}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.name] || "#8884d8"}
                stroke={activeIndex === index ? "#ffffff" : "none"}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip activeIndex={activeIndex} />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex md:gap-5 gap-2 flex-wrap justify-center capitalize mt-2 md:mt-5">
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center px-2 gap-2">
          <div
            style={{ backgroundColor: entry.color }}
            className="w-3 md:w-4 h-3 md:h-4 rounded-[0.25rem] md:rounded-md"
          ></div>
          <p className="text-xs md:text-sm">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const activeData = payload[0];

    return (
      <div className="md:p-4 p-2 bg-background text-black text-xs md:text-sm flex items-center gap-2 rounded-md">
        <div
          style={{
            backgroundColor: colors[activeData.name],
          }}
          className="md:w-4 w-3 md:h-4 h-3 rounded-[0.25rem] md:rounded-md"
        />
        <p className="capitalize">{activeData.name}</p>
        <p className="font-medium ">{activeData.value}</p>
      </div>
    );
  }
  return null;
};
