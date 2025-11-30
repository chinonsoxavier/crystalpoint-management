import { create } from "zustand";
interface LandingStore {
  sideMenuOpen: boolean;
  toggleSideMenuOpen: () => void;
  closeSideMrnu: () => void;
}

const useLandingStore = create<LandingStore>((set) => ({
  sideMenuOpen: false,
  closeSideMrnu: () => set(() => ({ sideMenuOpen: false })),
  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),
}));

export default useLandingStore;
