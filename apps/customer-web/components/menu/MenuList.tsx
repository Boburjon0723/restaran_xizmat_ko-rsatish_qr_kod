"use client";

import { useState } from "react";

import { DishDetailDrawer } from "./DishDetailDrawer";

const MOCK_CATEGORIES = ["Appetizers", "Mains", "Drinks", "Desserts", "Sides"];

const MOCK_ITEMS = [
  {
    id: "1",
    name: "Truffle Arancini",
    description: "Wild mushroom risotto, black truffle oil, and aged parmesan center.",
    price: 14.00,
    category: "Appetizers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn5G-hj1QHHe5e4XvKNimju-Pd_IHaIjCJ1atiJNgOWR4XN3pwsoezmHZSTfPYLFniSZxkJKwwLWOt2w6O9YlJIXrOmwi8rdYgsPEeRjOL9pDZlprpqZoSVOv9hlao90qtqHmjNyKX6hWTH3lk5PfNlu4e55AbohBYc9IqSG_MtUPe0IDKXDD5cPZ0R5XE1-6D3X3qjRrjNOGhvOIDeWfjE3OytsJH8dPWI9qETgtWRBeiQtUH0wkhIwVoAc0ztnsnQL3o6vDMqOY"
  },
  {
    id: "5",
    name: "Truffle Mushroom Burger",
    description: "A masterclass in umami. Our signature 45-day dry-aged wagyu beef patty topped with sautéed wild porcini mushrooms.",
    price: 24.00,
    category: "Mains",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0lzsiBEEeKslmgAVWy_Hrz2VpHICMASlbIzcLh-bMaK8qc8ib6uVjaaV3UpAo85zACoyTDCcngsHG3mzLzk0VT18cgZZHNEEQTm4wU186KxgJHMjkhhGbCfHZthoZVxKVu9Ymc649RlqFGb-ZY0l9OytYhnRsdxJiU_OD_49JrZZ7iHgNRFW1321Ma_vImR1wCiQyKEz0OM29GmyeP3x9m_dgmU07KTsdojMlDXOKthg8RMXV3DoVRsKCk-7s7-6N1fK5B81dJvc"
  },
  {
    id: "2",
    name: "Heritage Burrata",
    description: "Heirloom tomatoes, cold-pressed basil oil, and balsamic pearls.",
    price: 18.50,
    category: "Appetizers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-s61_hIUYEyTJyvSH9crxg8QMozSC6a6SlR-XQtTrVw7V_RLXUVm0X_sqMex0piHkxlFs746m3d_4Hs3Yu3f9gQBMKCkj_KUFWSfOaSRn9LSeSuX3hW4-OunNSPttYWTJ_T86xFAPfBLFt7PU7ITPFDAtxAFKRto0hn6K7IK9EZremS9dkvXZUHtnDfAIKPip1hJfVgByTGKW6beRcqpsg9f3sHMm6BpEHK_BBCxAGTH697AmRkvwe7D2YQATVmOTvOnvzst_3dM"
  },
  {
    id: "3",
    name: "Spiced Calamari",
    description: "Flash-fried with togarashi salt and served with saffron aioli.",
    price: 16.00,
    category: "Appetizers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMYTkwm8QEedja0mjaCKNOKcdOAIztLT3VR4m-n10jSQD19MKbESx8YOQRFyy5Yq8xliNyfgx6Q0KuILBuah0OPTjR0CWOANi_GGQ0j1FEYH_a11F3qFJfURJgu6RIoyYM65tGNaCYL-Pn7GbLecFZ4GKJrDweEGKrEPrIpPJ0n1Qv1386xGQ04B0TPHAOEb3k3fZgSBChAEe5mLD62fZnKIZEblw9Ys7_xjCDdKRiE0bMQr1z9WLSSwpNlyEpzrFYzF25sdS0100"
  },
  {
    id: "4",
    name: "Wagyu Carpaccio",
    description: "Thinly sliced wagyu beef, caper berries, and 24-month aged parmesan.",
    price: 22.00,
    category: "Appetizers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZd4irti9mnDCwhEiICUAKBy_SdLVQ2eRE3eo-iyFBn_F2hUmWAOllb06CFfQXEXrTKJlIeeBzV89_xLkkLw0KcrQh2mjlKfqnuD6-Lwsps6-IuN6VWMe_v6VbiUCNXfJuhK7X2NbcOqWFjSL6UKQeZDW-8cLmGIG5ClIjKyizQfu4kC1ij8LDIYofL1UHBEQKwGNi_up7gJOMl6dfrphp3vsPrQ2qkEF9oShJY4u-B9DnzPXkEJzM9pEh4SDjN8E4JDF-Z-npt4o"
  }
];

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [cartCount, setCartCount] = useState(1);

  return (
    <div className="space-y-6">
      <DishDetailDrawer 
        dish={selectedDish} 
        isOpen={!!selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />

      {/* Category Scroll */}
      <div className="sticky top-[72px] z-40 bg-surface/80 backdrop-blur-md -mx-6 px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-6 py-2 rounded-full font-semibold text-sm transition-all active:scale-95 ${
              selectedCategory === cat
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-end mb-2">
        <h2 className="text-xl font-headline font-bold text-on-surface">{selectedCategory}</h2>
        <span className="text-sm font-label text-outline">8 Items</span>
      </div>

      {/* Dishes List */}
      <div className="space-y-4">
        {MOCK_ITEMS.filter(item => item.category === selectedCategory || selectedCategory === "Appetizers").map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedDish(item)}
            className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(26,28,28,0.04)] flex h-32 relative group border border-outline-variant/5 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="w-32 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-grow p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-on-surface font-headline leading-tight">{item.name}</h3>
                <p className="text-[10px] text-on-surface-variant line-clamp-2 mt-1 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-sm">${item.price.toFixed(2)}</span>
                
                {item.id === "4" ? (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setCartCount(Math.max(0, cartCount - 1))} className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-primary active:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="font-bold text-on-surface text-sm">{cartCount}</span>
                    <button onClick={() => setCartCount(cartCount + 1)} className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center active:scale-90 transition-transform shadow-sm">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                ) : (
                  <button className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-transform">
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating View Cart Bar */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-40 max-w-md mx-auto right-0">
        <button className="w-full bg-primary text-on-primary rounded-2xl py-4 px-6 flex justify-between items-center shadow-2xl shadow-primary/20 transition-transform active:scale-95 group">
          <div className="flex items-center gap-3">
            <div className="bg-on-primary/20 rounded-lg px-2 py-1">
              <span className="text-sm font-bold">1</span>
            </div>
            <span className="font-headline font-bold text-lg">View Cart</span>
          </div>
          <span className="font-bold text-lg">$22.00</span>
        </button>
      </div>
    </div>
  );
}



