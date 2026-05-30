import { create } from 'zustand'

export const SIDEBAR_WIDTH = 240

interface SidebarState {
  isOpen: boolean
  isMobile: boolean
  setMobile: (isMobile: boolean) => void
  open: () => void
  close: () => void
  toggle: () => void
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpen: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  setMobile: (isMobile) =>
    set({
      isMobile,
      isOpen: isMobile ? false : true,
    }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}))
