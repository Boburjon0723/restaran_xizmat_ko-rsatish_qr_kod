"use client";

type MockOrderItem = {
  quant: string;
  name: string;
  note?: string;
};

type MockOrder = {
  table: string;
  status: "Preparing" | "Pending" | "Ready";
  time: string;
  isLate?: boolean;
  isReady?: boolean;
  items: MockOrderItem[];
};

const MOCK_ORDERS: MockOrder[] = [
  {
    table: "04",
    status: "Preparing",
    time: "Late: 18m",
    isLate: true,
    items: [
      { quant: "2x", name: "Signature Wagyu Burger", note: "Medium Rare" },
      { quant: "1x", name: "Truffle Parmesan Fries" },
      { quant: "3x", name: "Craft Cola (Glass)" }
    ]
  },
  {
    table: "12",
    status: "Pending",
    time: "Ordered 2m ago",
    items: [
      { quant: "1x", name: "Seafood Paella (Large)" },
      { quant: "2x", name: "Mediterranean Salad" }
    ]
  },
  {
    table: "01",
    status: "Ready",
    time: "Ready for 4m",
    isReady: true,
    items: [
      { quant: "4x", name: "Lunch Set A (Daily)" }
    ]
  },
  {
    table: "07",
    status: "Preparing",
    time: "Ordered 9m ago",
    items: [
      { quant: "1x", name: "Ribeye Steak (Dry Aged)", note: "Rare" },
      { quant: "1x", name: "Grilled Asparagus" },
      { quant: "1x", name: "Merlot Reserve (Bottle)" }
    ]
  }
];

export default function LiveOrdersPage() {
  return (
    <div className="p-6 lg:p-10 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-headline font-bold text-3xl tracking-tight text-on-surface">Live Orders</h2>
          <p className="text-on-surface-variant mt-1 text-sm font-body">Real-time kitchen management and ticket tracking.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-surface-container-low p-1 rounded-full px-4 items-center gap-2 border border-outline-variant/10">
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,97,147,0.5)] animate-pulse"></span>
            <span className="font-label text-xs font-bold text-tertiary tracking-wide uppercase">Live 24 Orders</span>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
            <button className="p-3 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Live Order Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_ORDERS.map((order, i) => (
          <div 
            key={i} 
            className={`bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-6 border-l-4 transition-all hover:shadow-xl ${
              order.isLate ? "border-error ring-2 ring-error/5" : order.isReady ? "border-tertiary" : "border-transparent"
            } border border-outline-variant/10`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`font-label text-[10px] font-black uppercase tracking-widest block mb-1 flex items-center gap-1 ${order.isLate ? 'text-error' : 'text-on-surface-variant/60'}`}>
                  {order.isLate && <span className="material-symbols-outlined text-[14px]">warning</span>}
                  {order.time}
                </span>
                <h3 className="font-headline text-2xl font-black text-on-surface">Table #{order.table}</h3>
              </div>
              <div className={`px-3 py-1 rounded-full font-label text-[10px] font-black uppercase tracking-widest ${
                order.status === "Preparing" ? "bg-secondary-container text-on-secondary-container" :
                order.status === "Ready" ? "bg-tertiary-container text-on-tertiary-container" :
                "bg-surface-container-high text-on-surface-variant"
              }`}>
                {order.status}
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div className="flex gap-3">
                    <span className="bg-surface-container-low px-2 py-0.5 rounded font-label font-black text-on-surface text-[10px]">{item.quant}</span>
                    <span className="text-on-surface font-medium">{item.name}</span>
                  </div>
                  {item.note && <span className="text-tertiary font-bold text-[10px] uppercase tracking-tighter">{item.note}</span>}
                </div>
              ))}
            </div>

            <div className="pt-4 mt-auto border-t border-outline-variant/10 flex gap-3">
              {order.status === "Pending" ? (
                <button className="flex-1 bg-primary text-on-primary rounded-xl py-3 font-label text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">Accept</button>
              ) : order.status === "Ready" ? (
                <button className="flex-1 bg-on-surface text-surface rounded-xl py-3 font-label text-sm font-bold shadow-lg shadow-on-surface/20 hover:opacity-90 transition-opacity">Complete</button>
              ) : (
                <button className="flex-1 bg-tertiary text-on-tertiary rounded-xl py-3 font-label text-sm font-bold shadow-lg shadow-tertiary/20 hover:opacity-90 transition-opacity">Mark Ready</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative border border-outline-variant/10">
          <div className="relative z-10">
            <h4 className="font-headline font-bold text-2xl text-on-surface mb-3">Kitchen Productivity Tip</h4>
            <p className="text-on-surface-variant leading-relaxed max-w-md text-sm font-body">
              Batch preparation of sauces during the 4 PM window has improved ticket times by <span className="text-primary font-bold">12%</span> this week. Keep up the high standard!
            </p>
            <button className="mt-8 font-label text-sm font-bold text-tertiary flex items-center gap-2 hover:gap-3 transition-all">
              View Analytics Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="w-full md:w-64 h-48 md:h-full rounded-2xl overflow-hidden shadow-2xl relative group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeCmZ57GLornIWsOlkt__aAzLH3brEtxWF_Mnav5o62vtYhTqhjpKFGOw_aqqDhxR_EwPd6cSvS3ErzyVx9n9HuZna3BQPwX2qBag0BkwWixAlmTWiUm1w3YB3vNm_AcciT5mIRRtAB6n44lrQSKqYrO-W6mYageoNCm4L-zOYkmty7HsNm6eIiVDjRF1j9dAG8TI9HSwn3Hr973txwRIbLyvje1gOBzlj6RxJaCPJSrJ8b9NvCmq5TBK-RkhSiAeZuI-PYasgzv4"
              alt="Professional Chef"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-3xl p-8 flex flex-col justify-center border border-tertiary/10 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-on-tertiary-fixed/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-4xl">timer</span>
            <h4 className="font-headline font-bold text-xl leading-none">Avg. Prep Time</h4>
          </div>
          <p className="text-5xl font-black mb-2 font-headline tracking-tighter text-tertiary">14:22</p>
          <p className="font-label text-[10px] opacity-60 uppercase font-black flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            2m from yesterday
          </p>
        </div>
      </section>
    </div>
  );
}
