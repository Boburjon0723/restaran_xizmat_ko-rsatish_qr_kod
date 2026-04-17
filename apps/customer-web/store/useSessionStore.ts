import { create } from "zustand";

type SessionState = {
  restaurantSlug?: string;
  tableToken?: string;
  currentOrderId?: string;
  websocketConnected: boolean;
  setSession: (restaurantSlug: string, tableToken: string) => void;
  setCurrentOrderId: (orderId?: string) => void;
  setWebsocketConnected: (connected: boolean) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  restaurantSlug: undefined,
  tableToken: undefined,
  currentOrderId: undefined,
  websocketConnected: false,
  setSession: (restaurantSlug, tableToken) => set({ restaurantSlug, tableToken }),
  setCurrentOrderId: (currentOrderId) => set({ currentOrderId }),
  setWebsocketConnected: (websocketConnected) => set({ websocketConnected })
}));
