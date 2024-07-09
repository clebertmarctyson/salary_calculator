import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      menuOpen: false,
      setMenuOpen: (open) => set({ menuOpen: open }),
    }),
    { name: "store" }
  )
);

export default useStore;
