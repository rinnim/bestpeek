import Link from "next/link";

export default function DashboardButton({ href, active = false, icon, label }) {
  return (
    <Link
      key={href}
      href={href || "#"}
      className={`flex w-full flex-col md:flex-row items-center md:border hover:text-white duration-200  justify-between  md:py-2 md:px-4 rounded-md transition-colors ${
        active
          ? "text-white md:bg-foreground  md:border-foreground"
          : "text-muted md:border-border md:hover:bg-foreground md:hover:border-foreground"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 md:text-center">
        <span className="text-sm ">{icon}</span>
        <p className="text-xs md:text-sm ">{label}</p>
      </div>
    </Link>
  );
}
