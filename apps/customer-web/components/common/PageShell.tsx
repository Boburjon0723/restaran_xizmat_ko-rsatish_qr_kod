import { ReactNode } from "react";
import Link from "next/link";

export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      {/* Top Navigation Anchor */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary font-headline tracking-tight">Culinary Architect</span>
            <span className="text-xs font-label text-outline uppercase tracking-widest">Table #12</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
              <img
                alt="Guest Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcuZFzmaU2BHX9ztZs1w2vyJjFGyElbIQR0Yap8wQC9HNo3iRyDMb8RcniprEHLBDKtRTPdFjqedkflgdybwN79dt0V5jJurjihJ1vLwCznEtl3qFNWdmJtbtJzh4r0Ysd5m4Ql5XSrQ--4tZeCjScWjNnjpLIsinG5TdrwplOJOHo9sDP84uJs4qixWT4R7obILS4SF0PbeLENIcyUI90AASRDqu10UHch_dz0yJ1FjF0GCYAAjH8hkEDDq5bjtse9L6fPI6Lfas"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 max-w-md mx-auto min-h-screen relative">
        {children}
      </main>

      {/* Floating Action Button: Call Waiter */}
      <button className="fixed right-6 bottom-40 w-14 h-14 bg-tertiary text-on-tertiary rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform">
        <span className="material-symbols-outlined text-3xl">person_raised_hand</span>
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-[0_-12px_40px_rgba(26,28,28,0.06)] z-50 pb-safe">
        <Link href="/" className="flex flex-col items-center justify-center text-on-surface-variant/60 px-5 py-2 hover:bg-surface-container-low transition-colors rounded-2xl">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-manrope text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/menu" className="flex flex-col items-center justify-center bg-primary-fixed text-on-primary-fixed-variant rounded-2xl px-5 py-2">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
          <span className="font-manrope text-[10px] font-medium">Menu</span>
        </Link>
        <Link href="/order" className="flex flex-col items-center justify-center text-on-surface-variant/60 px-5 py-2 hover:bg-surface-container-low transition-colors rounded-2xl">
          <span className="material-symbols-outlined mb-1">receipt_long</span>
          <span className="font-manrope text-[10px] font-medium">My Order</span>
        </Link>
        <Link href="/help" className="flex flex-col items-center justify-center text-on-surface-variant/60 px-5 py-2 hover:bg-surface-container-low transition-colors rounded-2xl">
          <span className="material-symbols-outlined mb-1">support_agent</span>
          <span className="font-manrope text-[10px] font-medium">Support</span>
        </Link>
      </nav>
    </div>
  );
}


