import { create } from "zustand";

interface UserStore {
  sideMenuOpen: boolean;
  showBalance: boolean;

  // Actions
  toggleSideMenuOpen: () => void;
  closeSideMenu: () => void;



}

// Create store
const useAdminStore = create<UserStore>((set) => ({
  sideMenuOpen: true,
  showBalance: true,

  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),

  closeSideMenu: () => set({ sideMenuOpen: false }),
}));

export default useAdminStore;