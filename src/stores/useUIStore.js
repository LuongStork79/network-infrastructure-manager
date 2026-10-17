import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  infoPanelCollapsed: false,
  topologyIconMode: false,
  scale: 1,
  activeView: 'topology',
  reportModalTab: null,
  sidebarMobileOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleSidebarMobile: () => set((state) => ({ sidebarMobileOpen: !state.sidebarMobileOpen })),
  closeSidebarMobile: () => set({ sidebarMobileOpen: false }),
  toggleInfoPanel: () => set((state) => ({ infoPanelCollapsed: !state.infoPanelCollapsed })),
  toggleTopologyIconMode: () => set((state) => ({ topologyIconMode: !state.topologyIconMode })),
  showFullTopologyView: () =>
    set({ activeView: 'topology', topologyIconMode: false, sidebarMobileOpen: false }),
  setScale: (val) => set({ scale: Math.min(Math.max(0.3, val), 2) }),
  setActiveView: (view) =>
    set({ activeView: view, topologyIconMode: false, sidebarMobileOpen: false }),

  openReportModal: (tab) => set({ reportModalTab: tab }),
  closeReportModal: () => set({ reportModalTab: null }),

  globalTimelineModalOpen: false,
  openGlobalTimelineModal: () => set({ globalTimelineModalOpen: true }),
  closeGlobalTimelineModal: () => set({ globalTimelineModalOpen: false }),

  focusRequest: null,
  requestFocus: (req) => {
    set({
      focusRequest: req,
      activeView: req.module === 'krone' ? 'ipphone' : req.module,
      topologyIconMode: false,
      sidebarMobileOpen: false
    });
  },
  clearFocusRequest: () => set({ focusRequest: null }),

  globalSearchModalOpen: false,
  openGlobalSearch: () => set({ globalSearchModalOpen: true }),
  closeGlobalSearch: () => set({ globalSearchModalOpen: false }),

  switchModalRequest: null,
  openAddSwitchModal: () => set({ switchModalRequest: { mode: 'add' } }),
  openEditSwitchModal: (switchId) => set({ switchModalRequest: { mode: 'edit', switchId } }),
  closeSwitchModal: () => set({ switchModalRequest: null }),

  firewallModalRequest: null,
  openAddFirewallModal: () => set({ firewallModalRequest: { mode: 'add' } }),
  openEditFirewallModal: (firewallId) => set({ firewallModalRequest: { mode: 'edit', firewallId } }),
  closeFirewallModal: () => set({ firewallModalRequest: null }),

  gponFrameModalRequest: null,
  openGponFrameModal: (frameId) => set({ gponFrameModalRequest: { frameId } }),
  closeGponFrameModal: () => set({ gponFrameModalRequest: null }),

  portConfigRequest: null,
  openPortConfigModal: (switchId, port, initialIcon) =>
    set({ portConfigRequest: { switchId, port, initialIcon } }),
  closePortConfigModal: () => set({ portConfigRequest: null })
}));

export const c = useUIStore;
export default useUIStore;
