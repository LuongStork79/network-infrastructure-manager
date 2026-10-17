import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';
import { useToastStore, useSandboxStore } from '../stores/useToastStore.js';

export const FIRESTORE_DOCS = {
  DB: 'switches',
  GlobalLogs: 'globalLogs',
  ElevatorDB: 'elevator',
  WifiDB: 'wifi',
  WifiFloorplans: 'wifiFloorplans',
  CctvCameraDB: 'cctvCameras',
  CctvFloorplans: 'cctvFloorplans',
  CctvFloorConnectors: 'cctvFloorConnectors',
  ODFDB: 'odf',
  IPPhoneDB: 'ipphone',
  NVRDB: 'nvr',
  KroneDB: 'krone',
  FirewallDB: 'firewall',
  GponFrameDB: 'gponFrame',
  GponOntDB: 'gponOnt',
  BackupHistory: 'backupHistory'
};

export function getNetworkDataDoc(key) {
  const docName = FIRESTORE_DOCS[key] || key;
  return doc(db, 'networkData', docName);
}

export function debounce(fn, waitMs = 600) {
  let timer = null;
  let accumulated = {};
  return (update) => {
    accumulated = { ...accumulated, ...update };
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const data = accumulated;
      accumulated = {};
      timer = null;
      fn(data);
    }, waitMs);
  };
}

const saveDebouncers = new Map();

export function getSaveDebouncer(key) {
  let debouncer = saveDebouncers.get(key);
  if (!debouncer) {
    debouncer = debounce(async (data) => {
      if (useSandboxStore.getState().isSandboxMode) {
        console.log(`🧪 Sandbox mode: bỏ qua lưu lên Firebase cho [${key}].`);
        return;
      }
      try {
        await setDoc(getNetworkDataDoc(key), data, { merge: true });
      } catch (err) {
        console.error(`Failed to save ${key}:`, err);
        useToastStore.getState().notifyError(`Lỗi lưu dữ liệu [${key}] — vui lòng kiểm tra kết nối.`);
      }
    });
    saveDebouncers.set(key, debouncer);
  }
  return debouncer;
}

export function saveNetworkData(payload) {
  for (const key of Object.keys(payload)) {
    getSaveDebouncer(key)({ [key]: payload[key] });
  }
}
