"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Live Orders", href: "/", icon: "restaurant_menu" },
  { label: "Menu Manager", href: "/menu", icon: "menu_book" },
  { label: "Analytics", href: "/analytics", icon: "analytics" },
  { label: "Staff", href: "/staff", icon: "groups" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/10 bg-surface-container-lowest flex-col py-6 px-4 z-40">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-black text-on-surface">Kitchen Central</h1>
        <p className="font-label text-[10px] text-on-surface-variant/60 mt-1 uppercase tracking-widest">Terminal #01 (Active)</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-bold translate-x-1"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label text-sm tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-6 border-t border-outline-variant/10">
        <button className="w-full bg-tertiary text-on-tertiary rounded-xl py-3 px-4 mb-4 flex items-center justify-center gap-2 font-label text-sm font-bold shadow-lg shadow-tertiary/20 hover:opacity-90 transition-opacity">
          View Live Store
        </button>
        <Link href="/help" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant/60 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-xl">help</span>
          <span className="font-label text-xs">Help</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-error/60 hover:text-error transition-colors">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="font-label text-xs">Logout</span>
        </button>
      </div>
    </aside>
  );
}
