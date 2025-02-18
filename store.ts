import { create } from "zustand";

interface StoreState {
  user: { name: string; email: string; image: string | null; } | null;
  loginAsGuest: () => void;
  logoutGuest: () => void;
}

export const store = create<StoreState>((set) => ({
  user: null,
  loginAsGuest: () => set({ user: { name: "Guest", email: "guest@snapzly.com", image: null } }),
  logoutGuest: () => set({ user: null }),
}));
