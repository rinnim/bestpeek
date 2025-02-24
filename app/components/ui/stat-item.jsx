import { twMerge } from "tailwind-merge";

export default function StatItem({ label, value, className }) {
  return (
    <div className={twMerge("w-full", className)}>
      <p className="text-muted">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
