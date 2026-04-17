"use client";

export function OrderStatus({ orderId }: { orderId: string }) {
  return (
    <div className="space-y-8">
      {/* Success Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-container text-on-primary-container rounded-full mb-6">
          <span className="material-symbols-outlined !text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h1 className="font-headline font-extrabold text-3xl mb-2 tracking-tight">Your order is in the kitchen!</h1>
        <p className="text-on-surface-variant max-w-xs mx-auto">Order #{orderId} • Estimated arrival in 12-15 minutes</p>
      </section>

      {/* Real-time Status Tracker (Vertical Stepper) */}
      <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_12px_40px_rgba(26,28,28,0.06)] relative overflow-hidden border border-outline-variant/10">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col gap-10">
          {/* Sent (Completed) */}
          <div className="flex gap-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white z-10">
                <span className="material-symbols-outlined !text-xl" style={{ fontVariationSettings: "'wght' 700" }}>done</span>
              </div>
              <div className="w-0.5 h-full bg-primary absolute top-10"></div>
            </div>
            <div className="pb-2">
              <h3 className="font-headline font-bold text-lg text-primary">Sent</h3>
              <p className="text-label-md text-on-surface-variant text-sm">Confirmed at 7:42 PM</p>
            </div>
          </div>

          {/* Preparing (Active) */}
          <div className="flex gap-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container z-10 animate-pulse">
                <span className="material-symbols-outlined !text-xl">restaurant</span>
              </div>
              <div className="w-0.5 h-full bg-surface-container-high absolute top-10"></div>
            </div>
            <div className="pb-2">
              <h3 className="font-headline font-bold text-lg">Preparing</h3>
              <p className="text-label-md text-primary font-semibold text-sm">Chef is crafting your masterpiece</p>
              {/* Progress Bar Mini */}
              <div className="mt-3 w-48 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Ready */}
          <div className="flex gap-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant z-10">
                <span className="material-symbols-outlined !text-xl">countertops</span>
              </div>
              <div className="w-0.5 h-full bg-surface-container-high absolute top-10"></div>
            </div>
            <div className="pb-2">
              <h3 className="font-headline font-bold text-lg text-on-surface-variant">Ready</h3>
              <p className="text-label-md text-on-surface-variant opacity-60 text-sm">Plating and garnish</p>
            </div>
          </div>

          {/* Served */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant z-10">
                <span className="material-symbols-outlined !text-xl">person_raised_hand</span>
              </div>
            </div>
            <div className="pb-2">
              <h3 className="font-headline font-bold text-lg text-on-surface-variant">Served</h3>
              <p className="text-label-md text-on-surface-variant opacity-60 text-sm">Enjoy your meal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Styled Order Details */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-3 block">Current Selection</span>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center text-on-surface">
                <span className="font-medium">Wagyu Truffle Burger</span>
                <span className="text-on-surface-variant font-bold">x1</span>
              </li>
              <li className="flex justify-between items-center text-on-surface">
                <span className="font-medium">Herbed Sea Salt Fries</span>
                <span className="text-on-surface-variant font-bold">x1</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-outline/10 flex justify-between items-baseline">
            <span className="text-sm font-bold text-on-surface-variant">Total</span>
            <span className="text-2xl font-headline font-extrabold text-on-surface">$42.00</span>
          </div>
        </div>
        
        <div className="bg-surface-container-high rounded-2xl overflow-hidden relative min-h-[160px] group shadow-sm">
          <img 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN355hurxsvXT73cV-YFa62nJPbzs5OwHr-lO-7vSkH6EO6V82HS3tq0u6B_A_PlBoW-hw8gT2Gv2ga0FEdT2waJbE2p03bUlgkI-IKqj8MlVnVLgR_Z9d7fwioeeJmE-IM6joR9SkS7w1RlGZ9kSpSo1VjFMhAO9ftKWgzd6WKuj_vVqLFlyC6Rz2V0i-N54O85m_XybVulFUuksC1-eKiK8ztgkvPqY640surJASihdQvRz0nKIeEWCpJRM4nF79yZzc3pOA3R4" 
            alt="Kitchen Background"
          />
          <div className="relative p-6 h-full flex flex-col justify-center text-center">
            <p className="font-headline font-bold text-lg mb-2 text-on-surface">Need something else?</p>
            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">Add a drink or call for assistance anytime.</p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="mt-10 flex flex-col gap-4">
        <button className="w-full bg-primary text-on-primary py-4 px-8 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
          <span className="material-symbols-outlined">add_circle</span>
          Order More
        </button>
        <button className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface py-4 px-8 rounded-full font-headline font-bold text-lg hover:bg-surface-container-high transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm">
          <span className="material-symbols-outlined">person_raised_hand</span>
          Call Waiter
        </button>
      </section>
    </div>
  );
}
