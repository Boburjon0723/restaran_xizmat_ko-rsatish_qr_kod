"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_CART_ITEMS = [
  {
    id: "101",
    name: "Truffle & Honey Pizza",
    description: "Large • No Mushrooms",
    price: 24.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWQevzxu6MaPpKLeh41-vVOPyhWrZW99TLqX8U19MkgfDWNENmyP_MMk6XKDCmQM9HrvULFhUjYayffNItvMSXtiL5qMwNxiaykVt1cU3P-aWMvFPRcKUz9crQ4RiUMnLHFwVPITbotHvePNjeSXVDb5NBde2Ig6FX6LSef78f4fgd0QVR9A1FSwzwjlR7ZYixZ_5fV_HUMp8RzA3Tw66GR471RovJJcwTSaYDqsQdeyaoV-t-qRIUAQBOGhkMFUUWCfi3gA8bTto"
  },
  {
    id: "102",
    name: "Smoked Negroni",
    description: "Signature Pour",
    price: 18.00,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHI9BibdRcZxcdjnkKsPgSEGB1_x-vbWmQITbGjOLjxqTRCnD4Opi1xku7vUBs2axASx-5_2EOSg4FcsZ87P4K_vQVwt5PZT1yjhS6YnirTykfETkZM_U_uzbYbbnAQ5rmdj9RjVQklhfXmu42ETt5vKqdffvIq4FRLWJrE17XYRROChKrlcVs4c8T5XOET-hVdVArjJObVcaXRI1PVtjxeuiZwbDfT-r8PxRKpp6y_QDZZpfBWoTNuIgsTukF0eBNNWlCEr3s3f0"
  },
  {
    id: "103",
    name: "Caesar's Heirloom",
    description: "Add Grilled Chicken",
    price: 16.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrkjawL4LOP7qXjsivyGZodr-FUXfLaDd-kIJU4iROyQdbR4Eso-LhKcLR1ZQVQZ7rfX8S4ZFhCX6fNbkz9gW0of5ZnY_tXMOI0uBua8dkWE2hNk4mkl-aUKEnp_tPMK5jRKwpsiMeJvogdUzacqGpj8FFXt6FRbZwUOOjaO8xXS7lyXhHuPEJ9k8CqD9B9hg28vg5LBQcjY41cYKEeKEFTuh8G37am4RRUO2dCSOZh2VMFdZSM4FrbI1-lZG2-XXywhw1y_vUj1Y"
  }
];

export function CartSummary() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const serviceFee = subtotal * 0.10;
  const total = subtotal + tax + serviceFee;

  return (
    <div className="space-y-8">
      {/* Table Context Banner */}
      <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between border-l-4 border-primary">
        <div>
          <p className="font-label text-[10px] text-secondary uppercase tracking-wider">Current Location</p>
          <h2 className="font-headline font-bold text-xl text-on-surface">Table #12</h2>
        </div>
        <div className="text-right">
          <p className="font-label text-[10px] text-secondary">Service Status</p>
          <span className="inline-flex items-center gap-1 text-tertiary font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Priority
          </span>
        </div>
      </div>

      {/* Cart List Section */}
      <section className="space-y-6">
        <h3 className="font-headline font-bold text-2xl">Your Selection</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-surface-container-lowest rounded-xl p-4 flex gap-4 shadow-sm border border-outline-variant/10 group transition-all hover:shadow-md">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-headline font-bold text-lg text-on-surface leading-tight">{item.name}</h4>
                    <p className="text-on-surface-variant text-xs mt-1">{item.description}</p>
                  </div>
                  <p className="font-headline font-bold text-primary text-sm">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1">
                    <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span className="w-8 text-center font-bold text-sm tracking-tighter">{item.quantity}</span>
                    <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                  </div>
                  <button className="text-error material-symbols-outlined opacity-50 hover:opacity-100 transition-opacity">delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bill Summary Section */}
      <section className="space-y-6">
        <h3 className="font-headline font-bold text-2xl">Bill Summary</h3>
        <div className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/10">
          <div className="grid gap-4 text-sm">
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-4">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-on-surface-variant">Tax</span>
                <span className="material-symbols-outlined text-[10px] text-on-surface-variant/40">info</span>
              </div>
              <span className="font-bold text-on-surface">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-on-surface-variant">Service Fee (10%)</span>
                <span className="material-symbols-outlined text-[10px] text-on-surface-variant/40">info</span>
              </div>
              <span className="font-bold text-on-surface">${serviceFee.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t-2 border-dashed border-outline-variant/30 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-label font-bold uppercase text-on-surface-variant/60 tracking-widest leading-none">Total Amount</p>
              <p className="text-3xl font-headline font-extrabold text-on-surface mt-1">${total.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-tertiary bg-tertiary-fixed-dim/30 px-3 py-1.5 rounded-full inline-block font-black uppercase tracking-tighter">EARN {Math.floor(total)} POINTS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Instructions */}
      <div className="mt-8">
        <label className="block font-headline font-bold text-sm mb-3 text-on-surface uppercase tracking-tight">Special Requests</label>
        <textarea className="w-full bg-surface-container-low border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary min-h-[120px] text-on-surface-variant font-body text-sm shadow-inner" placeholder="e.g. Please bring water for the table first..."></textarea>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-40 max-w-md mx-auto right-0">
        <button className="w-full bg-primary text-on-primary py-5 rounded-full font-headline font-bold text-lg shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
          Place Order
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

