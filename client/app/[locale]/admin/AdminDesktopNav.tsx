"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import Logout from "./components/Logout";

const navigation = [
  { label: "ستائر", href: "/admin/curtains" },
  { label: "كنب", href: "/admin/sofas" },
  { label: "قماش", href: "/admin/fabrics" },
  { label: "تغير كلمه السر", href: "/admin/change-password" },
];

function AdminDesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-l border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
      </div>

      <nav className="flex-1 space-y-0">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
        <Logout />
      </nav>
    </aside>
  );
}

export default AdminDesktopNav;
