"use client";

import { UserContext } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { LuFile, LuLayoutDashboard, LuUser, LuUsers } from "react-icons/lu";
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
        if (
          pathname !== "/admin/sign-up" &&
          pathname !== "/admin/sign-in" &&
          pathname !== "/admin/forgotten-password"
        ) {
          toast.error("Please sign in to continue");
          router.push("/admin/sign-in");
        }
      } else {
        if (state.user.role !== "admin") {
          toast.error("You are not authorized to access this page");
          router.push("/user/dashboard");
        }
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [state, router, pathname]);

  const menuItems = [
    {
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <LuUser />,
      label: "My Profile",
      href: "/admin/profile",
    },
    {
      icon: <LuUsers />,
      label: "User List",
      href: "/admin/user-list",
    },
    {
      icon: <AiOutlineProduct />,
      label: "Product List",
      href: "/admin/product-list",
    },
    {
      icon: <LuFile />,
      label: "Report",
      href: "/admin/report",
    },
  ];

  if (
    pathname === "/admin/sign-up" ||
    pathname === "/admin/sign-in" ||
    pathname === "/admin/forgotten-password"
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
