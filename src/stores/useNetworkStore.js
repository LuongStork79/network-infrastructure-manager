import { create } from 'zustand';
import { saveNetworkData } from '../services/dataSync.js';
import { appendGlobalLog } from '../utils/networkUtils.js';

export const useNetworkStore = create((set, get) => ({
  DB: [],
  GlobalLogs: [],
  ElevatorDB: [],
  WifiDB: [],
  WifiFloorplans: [],
  CctvCameraDB: [],
  CctvFloorplans: [],
  CctvFloorConnectors: [],
  ODFDB: [],
  IPPhoneDB: [],
  NVRDB: [],
  KroneDB: [],
  FirewallDB: [],
  GponFrameDB: [],
  GponOntDB: [],
  BackupHistory: [],

  selectedSwitchId: null,
  vlanFilter: 'none',
  pathTrace: null,

  hydrate: (data) => set((state) => ({ ...state, ...data })),
  selectSwitch: (swId) => set({ selectedSwitchId: swId }),
  toggleSelectSwitch: (swId) =>
    set((state) => ({ selectedSwitchId: state.selectedSwitchId === swId ? null : swId })),
  setVlanFilter: (vlan) => set({ vlanFilter: vlan }),

  togglePathTraceMode: () =>
    set((state) => ({
      pathTrace: state.pathTrace ? null : { fromId: null, toId: null },
      selectedSwitchId: null
    })),
  pickPathEndpoint: (endpointId) =>
    set((state) => {
      if (!state.pathTrace) return {};
      const { fromId, toId } = state.pathTrace;
      if (fromId == null) return { pathTrace: { fromId: endpointId, toId: null } };
      if (toId == null) return { pathTrace: { fromId, toId: endpointId } };
      return { pathTrace: { fromId: endpointId, toId: null } };
    }),
  startPathTrace: (fromId, toId) => set({ pathTrace: { fromId, toId } }),
  clearPathTrace: () =>
    set((state) => (state.pathTrace ? { pathTrace: { fromId: null, toId: null } } : {})),

  addGlobalLog: (msg, target, user) => {
    const logs = appendGlobalLog(get().GlobalLogs, msg, user);
    set({ GlobalLogs: logs });
    saveNetworkData({ GlobalLogs: logs });
  },

  // Switch / Rack actions
  saveSwitch: (rackIdx, switchData) => {
    const db = get().DB;
    const currentRackIdx = db.findIndex((r) => r.switches?.some((s) => s.id === switchData.id));
    let newDb;

    if (currentRackIdx === -1) {
      newDb = db.map((rack, idx) =>
        idx === rackIdx ? { ...rack, switches: [...(rack.switches || []), switchData] } : rack
      );
    } else if (currentRackIdx === rackIdx) {
      newDb = db.map((rack, idx) =>
        idx === rackIdx
          ? {
              ...rack,
              switches: rack.switches.map((s) => (s.id === switchData.id ? switchData : s))
            }
          : rack
      );
    } else {
      newDb = db.map((rack, idx) => {
        if (idx === currentRackIdx) {
          return { ...rack, switches: rack.switches.filter((s) => s.id !== switchData.id) };
        }
        if (idx === rackIdx) {
          return { ...rack, switches: [...(rack.switches || []), switchData] };
        }
        return rack;
      });
    }

    set({ DB: newDb });
    saveNetworkData({ DB: newDb });
  },

  deleteSwitch: (swId, user = 'admin') => {
    const db = get().DB;
    let foundSw = null;
    const updatedRacks = db.map((rack) => {
      const sw = rack.switches?.find((s) => s.id === swId);
      if (sw) foundSw = sw;
      return { ...rack, switches: (rack.switches || []).filter((s) => s.id !== swId) };
    });

    if (!foundSw) return;

    const cleanedDb = updatedRacks.map((rack) => ({
      ...rack,
      switches: rack.switches.map((s) =>
        s.uplinkTarget === swId
          ? {
              ...s,
              uplinkTarget: 'none',
              logs: appendGlobalLog(s.logs, 'Thiết bị cha bị xoá, mất kết nối Uplink', user)
            }
          : s
      )
    }));

    set({
      DB: cleanedDb,
      selectedSwitchId: get().selectedSwitchId === swId ? null : get().selectedSwitchId
    });
    saveNetworkData({ DB: cleanedDb });
  },

  saveSwitchBackup: (swId, backupData) => {
    let touched = false;
    const newDb = get().DB.map((rack) => ({
      ...rack,
      switches: rack.switches.map((s) => {
        if (s.id === swId) {
          touched = true;
          return { ...s, backup: { ...backupData, logs: [backupData, ...(s.backup?.logs || [])].slice(0, 20) } };
        }
        return s;
      })
    }));
    if (touched) {
      set({ DB: newDb });
      saveNetworkData({ DB: newDb });
    }
  },

  bulkMarkBrandBackup: (brandName, user = 'admin') => {
    let count = 0;
    const dateStr = new Date().toLocaleDateString('vi-VN');
    const newDb = get().DB.map((rack) => ({
      ...rack,
      switches: rack.switches.map((s) => {
        if ((s.brand || 'Unknown') === brandName) {
          count++;
          const backup = {
            status: 'ok',
            date: dateStr,
            method: s.backup?.method ?? 'manual',
            configFile: s.backup?.configFile || `${s.name.replace(/\s+/g, '_')}_backup.cfg`,
            by: user,
            note: 'Bulk mark'
          };
          return { ...s, backup: { ...backup, logs: [backup, ...(s.backup?.logs || [])].slice(0, 20) } };
        }
        return s;
      })
    }));
    if (count > 0) {
      set({ DB: newDb });
      saveNetworkData({ DB: newDb });
    }
    return count;
  },

  // NVR actions
  saveNVR: (nvr) => {
    const list = get().NVRDB;
    const idx = list.findIndex((x) => x.id === nvr.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? nvr : x)) : [...list, nvr];
    set({ NVRDB: updated });
    saveNetworkData({ NVRDB: updated });
  },
  deleteNVR: (id) => {
    const updated = get().NVRDB.filter((x) => x.id !== id);
    set({ NVRDB: updated });
    saveNetworkData({ NVRDB: updated });
  },

  // Elevator actions
  saveElevator: (elev) => {
    const list = get().ElevatorDB;
    const idx = list.findIndex((x) => x.id === elev.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? elev : x)) : [...list, elev];
    set({ ElevatorDB: updated });
    saveNetworkData({ ElevatorDB: updated });
  },
  deleteElevator: (id) => {
    const updated = get().ElevatorDB.filter((x) => x.id !== id);
    set({ ElevatorDB: updated });
    saveNetworkData({ ElevatorDB: updated });
  },

  // ODF actions
  saveODF: (odf) => {
    const list = get().ODFDB;
    const idx = list.findIndex((x) => x.id === odf.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? odf : x)) : [...list, odf];
    set({ ODFDB: updated });
    saveNetworkData({ ODFDB: updated });
  },
  deleteODF: (id) => {
    const updated = get().ODFDB.filter((x) => x.id !== id);
    set({ ODFDB: updated });
    saveNetworkData({ ODFDB: updated });
  },

  // IP Phone actions
  saveIPPhone: (phone) => {
    const list = get().IPPhoneDB;
    const idx = list.findIndex((x) => x.id === phone.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? phone : x)) : [...list, phone];
    set({ IPPhoneDB: updated });
    saveNetworkData({ IPPhoneDB: updated });
  },
  deleteIPPhone: (id) => {
    const updated = get().IPPhoneDB.filter((x) => x.id !== id);
    set({ IPPhoneDB: updated });
    saveNetworkData({ IPPhoneDB: updated });
  },

  // Krone actions
  saveKrone: (krone) => {
    const list = get().KroneDB;
    const idx = list.findIndex((x) => x.id === krone.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? krone : x)) : [...list, krone];
    set({ KroneDB: updated });
    saveNetworkData({ KroneDB: updated });
  },
  deleteKrone: (id) => {
    const updated = get().KroneDB.filter((x) => x.id !== id);
    set({ KroneDB: updated });
    saveNetworkData({ KroneDB: updated });
  },

  // WiFi AP & Floorplan actions
  saveWifiAP: (ap) => {
    const list = get().WifiDB;
    const idx = list.findIndex((x) => x.id === ap.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? ap : x)) : [...list, ap];
    set({ WifiDB: updated });
    saveNetworkData({ WifiDB: updated });
  },
  deleteWifiAP: (id) => {
    const updated = get().WifiDB.filter((x) => x.id !== id);
    set({ WifiDB: updated });
    saveNetworkData({ WifiDB: updated });
  },
  saveWifiFloorplan: (fp) => {
    const list = get().WifiFloorplans;
    const idx = list.findIndex((x) => x.id === fp.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? fp : x)) : [...list, fp];
    set({ WifiFloorplans: updated });
    saveNetworkData({ WifiFloorplans: updated });
  },
  deleteWifiFloorplan: (id) => {
    const updated = get().WifiFloorplans.filter((x) => x.id !== id);
    set({ WifiFloorplans: updated });
    saveNetworkData({ WifiFloorplans: updated });
  },

  // CCTV Camera & Floorplans
  saveCctvCamera: (cam) => {
    const list = get().CctvCameraDB;
    const idx = list.findIndex((x) => x.id === cam.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? cam : x)) : [...list, cam];
    set({ CctvCameraDB: updated });
    saveNetworkData({ CctvCameraDB: updated });
  },
  deleteCctvCamera: (id) => {
    const updated = get().CctvCameraDB.filter((x) => x.id !== id);
    set({ CctvCameraDB: updated });
    saveNetworkData({ CctvCameraDB: updated });
  },
  saveCctvFloorplan: (fp) => {
    const list = get().CctvFloorplans;
    const idx = list.findIndex((x) => x.id === fp.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? fp : x)) : [...list, fp];
    set({ CctvFloorplans: updated });
    saveNetworkData({ CctvFloorplans: updated });
  },
  deleteCctvFloorplan: (id) => {
    const updated = get().CctvFloorplans.filter((x) => x.id !== id);
    set({ CctvFloorplans: updated });
    saveNetworkData({ CctvFloorplans: updated });
  },
  saveCctvFloorConnector: (conn) => {
    const list = get().CctvFloorConnectors;
    const idx = list.findIndex((x) => x.id === conn.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? conn : x)) : [...list, conn];
    set({ CctvFloorConnectors: updated });
    saveNetworkData({ CctvFloorConnectors: updated });
  },
  deleteCctvFloorConnector: (id) => {
    const updated = get().CctvFloorConnectors.filter((x) => x.id !== id);
    set({ CctvFloorConnectors: updated });
    saveNetworkData({ CctvFloorConnectors: updated });
  },

  // Firewall actions
  saveFirewall: (fw) => {
    const list = get().FirewallDB;
    const idx = list.findIndex((x) => x.id === fw.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? fw : x)) : [...list, fw];
    set({ FirewallDB: updated });
    saveNetworkData({ FirewallDB: updated });
  },
  deleteFirewall: (id) => {
    const updated = get().FirewallDB.filter((x) => x.id !== id);
    set({ FirewallDB: updated });
    saveNetworkData({ FirewallDB: updated });
  },

  // GPON Frame & ONT actions
  saveGponFrame: (frame) => {
    const list = get().GponFrameDB;
    const idx = list.findIndex((x) => x.id === frame.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? frame : x)) : [...list, frame];
    set({ GponFrameDB: updated });
    saveNetworkData({ GponFrameDB: updated });
  },
  deleteGponFrame: (id) => {
    const updatedFrames = get().GponFrameDB.filter((x) => x.id !== id);
    const updatedOnts = get().GponOntDB.filter((x) => x.frameId !== id);
    set({ GponFrameDB: updatedFrames, GponOntDB: updatedOnts });
    saveNetworkData({ GponFrameDB: updatedFrames, GponOntDB: updatedOnts });
  },
  saveGponOnt: (ont) => {
    const list = get().GponOntDB;
    const idx = list.findIndex((x) => x.id === ont.id);
    const updated = idx > -1 ? list.map((x, i) => (i === idx ? ont : x)) : [...list, ont];
    set({ GponOntDB: updated });
    saveNetworkData({ GponOntDB: updated });
  },
  deleteGponOnt: (id) => {
    const updated = get().GponOntDB.filter((x) => x.id !== id);
    set({ GponOntDB: updated });
    saveNetworkData({ GponOntDB: updated });
  },

  // Backup History actions
  setBackupHistory: (history) => {
    set({ BackupHistory: history });
    saveNetworkData({ BackupHistory: history });
  },
  deleteBackupHistoryEntry: (id) => {
    const updated = get().BackupHistory.filter((x) => x.id !== id);
    set({ BackupHistory: updated });
    saveNetworkData({ BackupHistory: updated });
  }
}));

// Chunks compatibility alias
export const l = useNetworkStore;
export default useNetworkStore;
