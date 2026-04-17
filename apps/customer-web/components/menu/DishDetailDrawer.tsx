"use client";

import { useState } from "react";

interface DishDetailDrawerProps {
  dish: any;
  isOpen: boolean;
  onClose: () => void;
}

export function DishDetailDrawer({ dish, isOpen, onClose }: DishDetailDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSide, setSelectedSide] = useState("Truffle Parmesan Fries");

  if (!isOpen || !dish) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-on-surface/30 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`relative w-full max-w-3xl bg-surface rounded-t-[2.5rem] shadow-[0_-12px_40px_rgba(26,28,28,0.08)] overflow-hidden flex flex-col max-h-[90vh] transition-transform duration-500 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Handle */}
        <div className="w-full flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-surface-variant rounded-full"></div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pb-40 px-8">
          {/* Hero Image */}
          <div className="relative pt-2 h-72 md:h-96 -mx-2">
            <img 
              className="w-full h-full object-cover rounded-[2rem] shadow-sm" 
              src={dish.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuC0lzsiBEEeKslmgAVWy_Hrz2VpHICMASlbIzcLh-bMaK8qc8ib6uVjaaV3UpAo85zACoyTDCcngsHG3mzLzk0VT18cgZZHNEEQTm4wU186KxgJHMjkhhGbCfHZthoZVxKVu9Ymc649RlqFGb-ZY0l9OytYhnRsdxJiU_OD_49JrZZ7iHgNRFW1321Ma_vImR1wCiQyKEz0OM29GmyeP3x9m_dgmU07KTsdojMlDXOKthg8RMXV3DoVRsKCk-7s7-6N1fK5B81dJvc"} 
              alt={dish.name}
            />
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 bg-surface/90 backdrop-blur-md p-3 rounded-full shadow-lg text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="mt-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-headline text-3xl font-extrabold text-on-surface leading-tight">{dish.name}</h2>
                <div className="flex gap-2 mt-2">
                  <span className="bg-primary-container text-on-primary-container font-label text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Bestseller</span>
                  <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Signature</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline text-2xl font-bold text-primary">${dish.price.toFixed(2)}</span>
              </div>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-lg mb-8 max-w-2xl">
              {dish.description}
            </p>

            {/* Allergen Information */}
            <div className="mb-10 bg-surface-container-low p-5 rounded-2xl">
              <h3 className="font-headline text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">info</span>
                Allergen Information
              </h3>
              <div className="flex flex-wrap gap-4 text-on-surface-variant text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span>Contains Dairy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span>Contains Gluten</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span>Nut-Free</span>
                </div>
              </div>
            </div>

            {/* Modifiers: Sides */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-xl font-extrabold text-on-surface">Choose your side</h3>
                <span className="font-label text-xs font-semibold text-primary uppercase tracking-widest bg-primary-container/10 px-3 py-1 rounded-full">Required</span>
              </div>
              <div className="space-y-4">
                {["Truffle Parmesan Fries", "Garden Herb Salad", "Sweet Potato Wedges"].map((side) => (
                  <label 
                    key={side}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                      selectedSide === side ? 'bg-surface-container-lowest border-primary shadow-sm' : 'bg-surface-container-low border-transparent hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSide === side ? 'border-primary' : 'border-outline'}`}>
                        {selectedSide === side && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                      </div>
                      <span className={`font-semibold ${selectedSide === side ? 'text-on-surface' : 'text-on-surface-variant'}`}>{side}</span>
                    </div>
                    <span className="text-on-surface-variant text-sm">{side === "Sweet Potato Wedges" ? "+ $2.50" : "+ $0.00"}</span>
                    <input 
                      type="radio" 
                      className="hidden" 
                      name="side" 
                      checked={selectedSide === side}
                      onChange={() => setSelectedSide(side)}
                    />
                  </label>
                ))}
              </div>
            </section>

            {/* Extra Cravings */}
            <section className="mb-10">
              <h3 className="font-headline text-xl font-extrabold text-on-surface mb-6">Extra cravings</h3>
              <div className="space-y-4">
                {[
                  { name: "Double Beef Patty", price: 8.00 },
                  { name: "Extra Gruyère Cheese", price: 2.00 }
                ].map((extra) => (
                  <div key={extra.name} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer border-2 border-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-lg border-2 border-outline flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-lg font-bold">check</span>
                      </div>
                      <span className="font-semibold text-on-surface">{extra.name}</span>
                    </div>
                    <span className="text-on-surface-variant text-sm">+ ${extra.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Special Instructions */}
            <section className="mb-10">
              <h3 className="font-headline text-xl font-extrabold text-on-surface mb-4">Special Instructions</h3>
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-on-surface focus:ring-2 focus:ring-primary h-32 placeholder:text-on-surface-variant/50" 
                placeholder="e.g., No onions, extra napkins please..."
              ></textarea>
            </section>
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-md p-6 pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.05)] flex items-center gap-6">
          <div className="flex items-center bg-surface-container-high rounded-full p-1 h-14">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="w-10 text-center font-headline font-bold text-xl">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <button 
            onClick={onClose}
            className="flex-1 bg-primary text-on-primary font-headline font-bold text-lg h-14 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Add to Order</span>
            <span className="w-1.5 h-1.5 rounded-full bg-on-primary/30"></span>
            <span>${(dish.price * quantity + (selectedSide === "Sweet Potato Wedges" ? 2.5 : 0)).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
