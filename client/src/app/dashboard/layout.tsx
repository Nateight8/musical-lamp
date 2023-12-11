import { SidebarNav } from "@/components/navbar";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Product list",
  description: "",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Products",
    href: "/dashboard/products",
  },
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <main className="flex-1 lg:max-w-2xl">{children}</main>
        </div>
      </div>
    </>
  );
}
