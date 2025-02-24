"use client";

import { UserContext } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { LuHeart, LuHistory, LuLayoutGrid, LuUser } from "react-icons/lu";
import { MdLibraryAdd } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import Container from "../components/ui/container";
import DashboardButton from "../components/ui/dashboard-button";

export default function UserLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state] = useContext(UserContext);

  // Protect user routes with a delay of 1 sec
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!state.user) {
        router.push("/user/sign-in");
      } else {
        if (state.user.role === "admin") {
          router.push("/admin/dashboard");
        }
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [state, router]);

  const menuItems = [
    {
      icon: <LuLayoutGrid />,
      label: "Dashboard",
      href: "/user/dashboard",
    },
    {
      icon: <LuUser />,
      label: "Profile",
      href: "/user/profile",
    },
    {
      icon: <LuHeart />,
      label: "Favorite",
      href: "/user/favorite",
    },
    {
      icon: <TbTargetArrow />,
      label: "Wishlist",
      href: "/user/wishlist",
    },
    {
      icon: <MdLibraryAdd />,
      label: "Compare",
      href: "/user/compare",
    },
    {
      icon: <LuHistory />,
      label: "History",
      href: "/user/history",
    },
  ];

  if (
    pathname === "/user/sign-up" ||
    pathname === "/user/sign-in" ||
    pathname === "/user/forgotten-password"
  ) {
    return (
      <main className="flex flex-grow flex-col justify-center">{children}</main>
    );
  }

  return (
    <Container className="flex flex-col gap-5 py-5 md:flex-row-reverse">
      {/* Main Content */}
      <main className="flex-1 flex-grow">{children}</main>

      {/* Sidebar for Large Screens */}
      <aside className="hidden w-full md:block md:w-64">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="p-5">
            <nav className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-center gap-2 md:flex-col">
                {menuItems.map((item) => (
                  <DashboardButton
                    key={item.href}
                    href={item.href}
                    active={item.href === pathname}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>
            </nav>
          </div>
        </div>
      </aside>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t border-slate-100 bg-[#1F2937] px-3 py-3 md:hidden">
        {menuItems.map((item) => (
          <DashboardButton
            key={item.href}
            href={item.href}
            active={item.href === pathname}
            icon={item.icon}
            label={item.label}
            className=""
          />
        ))}
      </div>
    </Container>
  );
}
