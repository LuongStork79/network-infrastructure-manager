/**
 * Network Infrastructure Manager - Core Utilities & Constants
 */

export const DEVICE_ICONS = [
  { icon: 'fa-desktop', label: 'PC/Laptop' },
  { icon: 'fa-video', label: 'Camera CCTV' },
  { icon: 'fa-wifi', label: 'WiFi AP' },
  { icon: 'fa-phone', label: 'IP Phone' },
  { icon: 'fa-print', label: 'Máy in' },
  { icon: 'fa-server', label: 'Máy chủ' },
  { icon: 'fa-microchip', label: 'IoT' },
  { icon: 'fa-network-wired', label: 'Router/Switch' }
];

export function getDeviceLabelByIcon(icon) {
  return DEVICE_ICONS.find((item) => item.icon === icon)?.label ?? 'Khác';
}

export function getDeviceIconByLabel(label) {
  const q = label.trim().toLowerCase();
  return DEVICE_ICONS.find((item) => item.label.toLowerCase() === q)?.icon ?? null;
}

export const brandColors = {
  Cisco: 'var(--cisco-blue)',
  Aruba: 'var(--aruba-orange)',
  HP: 'var(--hp-green)',
  Juniper: '#6366f1',
  'Allied Telesis': 'var(--allied-red)',
  'TPLink Omada': 'var(--tp-link)',
  Grandstream: 'var(--grandstream)'
};

export const brandCodes = {
  Cisco: 'CS',
  Aruba: 'AR',
  HP: 'HP',
  Juniper: 'JN',
  'Allied Telesis': 'AT',
  'TPLink Omada': 'TP',
  Grandstream: 'GS'
};

export function getBrandCode(brand) {
  return brandCodes[brand] ?? brand.trim().slice(0, 2).toUpperCase();
}

export const VLANS = {
  1: {
    name: 'Management',
    color: 'var(--vlan-1)',
    icon: 'fa-server',
    subnet: '10.195.32.0/19'
  },
  99: {
    name: 'IPTV',
    color: 'var(--vlan-99)',
    icon: 'fa-tv',
    subnet: '10.195.64.0/22'
  },
  100: {
    name: 'Guest Room',
    color: 'var(--vlan-100)',
    icon: 'fa-bed',
    subnet: '10.195.80.0/20'
  },
  114: {
    name: 'officeVlan',
    color: 'var(--vlan-114)',
    icon: 'fa-building',
    subnet: '10.50.24.0/22'
  },
  102: {
    name: 'wifiVlan',
    color: 'var(--vlan-102)',
    icon: 'fa-wifi',
    subnet: '10.195.104.0/22'
  },
  20: {
    name: 'Máy lạnh Daikin',
    color: 'var(--vlan-20)',
    icon: 'fa-snowflake',
    subnet: '192.168.20.0/24'
  },
  150: {
    name: 'IP Phone',
    color: 'var(--vlan-150)',
    icon: 'fa-phone',
    subnet: '172.16.16.0/24'
  },
  120: {
    name: 'CCTV',
    color: 'var(--vlan-120)',
    icon: 'fa-video',
    subnet: '172.16.4.0/22'
  },
  130: {
    name: 'ACS',
    color: 'var(--vlan-130)',
    icon: 'fa-id-card',
    subnet: '172.16.64.0/24'
  },
  111: {
    name: 'Server Farm',
    color: 'var(--vlan-111)',
    icon: 'fa-network-wired',
    subnet: '10.195.109.0/24'
  },
  170: {
    name: 'Outdoor',
    color: 'var(--vlan-170)',
    icon: 'fa-tree',
    subnet: '172.100.170.1/21'
  }
};

export const VLAN_IDS = [1, 99, 100, 114, 102, 20, 150, 120, 130, 111, 170];

export function findSwitchById(swId, db = []) {
  for (const rack of db) {
    const sw = rack.switches?.find((s) => s.id === swId);
    if (sw) return sw;
  }
  return null;
}

export function getDownlinks(swId, db = []) {
  const downlinks = [];
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (sw.uplinkTarget === swId) {
        downlinks.push({
          port: sw.targetPort ?? 0,
          childId: sw.id,
          childName: sw.name
        });
      }
    });
  });
  return downlinks;
}

export function getConnectedSwitchIds(swId, db = []) {
  if (!swId) return null;
  const ids = new Set([swId]);
  const current = findSwitchById(swId, db);
  if (current && current.uplinkTarget !== 'none') {
    ids.add(current.uplinkTarget);
  }
  getDownlinks(swId, db).forEach((d) => ids.add(d.childId));
  return ids;
}

export function getTotalPortCount(sw) {
  return sw.ports + (sw.sfpPorts ?? 0);
}

export function isHybridPort(sw, port) {
  const comboCount = sw.hybridPortCount ?? 0;
  return comboCount > 0 && port > sw.ports - comboCount && port <= sw.ports;
}

export function getHybridPortMedia(sw, port) {
  return sw.hybridPorts?.[String(port)]?.media ?? 'copper';
}

export function isFiberPort(sw, port) {
  return (
    (port > sw.ports && port <= getTotalPortCount(sw)) ||
    (isHybridPort(sw, port) && getHybridPortMedia(sw, port) === 'fiber')
  );
}

export function getUsedSfpCount(sw, db = [], downlinks = getDownlinks(sw.id, db)) {
  if (!sw.sfpPorts) return 0;
  let count = sw.conns?.filter((c) => isFiberPort(sw, c.p)).length ?? 0;
  if (sw.uplinkTarget !== 'none' && sw.uplinkPort != null && isFiberPort(sw, sw.uplinkPort)) {
    count++;
  }
  count += downlinks.filter((d) => isFiberPort(sw, d.port)).length;
  return count;
}

export function getUsedPortCount(sw, db = [], downlinks = getDownlinks(sw.id, db)) {
  let count = sw.conns?.length ?? 0;
  if (sw.uplinkTarget !== 'none') count++;
  count += downlinks.length;
  return count;
}

export function getPortKindAndConnection(sw, port, downlinks = []) {
  if (sw.uplinkTarget !== 'none' && port === sw.uplinkPort) {
    return { kind: 'uplink' };
  }
  const downlink = downlinks.find((d) => d.port === port);
  if (downlink) {
    return {
      kind: 'downlink',
      downlinkChildId: downlink.childId,
      downlinkChildName: downlink.childName
    };
  }
  const conn = sw.conns?.find((c) => c.p === port);
  return conn ? { kind: 'client', connection: conn } : { kind: 'empty' };
}

export function getPortStatusSummary(sw, db = [], downlinks = getDownlinks(sw.id, db)) {
  const summary = { uplink: 0, downlink: 0, access: 0, shutdown: 0, errDisabled: 0 };
  if (sw.uplinkTarget !== 'none') summary.uplink = 1;
  summary.downlink = downlinks.length;

  sw.conns?.forEach((conn) => {
    if (conn.status === 'shutdown') summary.shutdown++;
    else if (conn.status === 'err-disabled') summary.errDisabled++;
    else summary.access++;
  });

  return summary;
}

export function getPortUtilization(used, total) {
  if (total <= 0) return { colorClass: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]', percent: 0 };
  const percent = (used / total) * 100;
  let colorClass = 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]';
  if (percent > 80) {
    colorClass = 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]';
  } else if (percent > 50) {
    colorClass = 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]';
  }
  return { colorClass, percent };
}

export function validateSwitchUplink(
  db = [],
  isEdit = false,
  swId = null,
  uplinkPort = 0,
  uplinkTarget = 'none',
  targetPort = 0,
  conns = [],
  gponFrames = []
) {
  if (uplinkPort > 0 && conns.find((c) => c.p === uplinkPort)) {
    return `LỖI VẬT LÝ: Cổng ${uplinkPort} trên chính Switch này đang được cấu hình cho Thiết bị đầu cuối (Client). Vui lòng chọn cổng Uplink khác!`;
  }
  if (uplinkTarget === 'none') return '';

  const parentSw = findSwitchById(uplinkTarget, db);
  if (!parentSw) return '';

  if (parentSw.uplinkTarget !== 'none' && parentSw.uplinkPort === targetPort) {
    return `LỖI VẬT LÝ: Cổng ${targetPort} trên thiết bị cha [${parentSw.name}] đang được dùng làm Uplink của chính nó!`;
  }
  if (parentSw.conns?.find((c) => c.p === targetPort)) {
    return `LỖI VẬT LÝ: Cổng ${targetPort} trên thiết bị cha [${parentSw.name}] đang kết nối với thiết bị đầu cuối! Vui lòng chọn port trống.`;
  }

  for (const rack of db) {
    for (const s of rack.switches || []) {
      if (!(isEdit && s.id === swId) && s.uplinkTarget === uplinkTarget && s.targetPort === targetPort) {
        return `LỖI VẬT LÝ: Cổng ${targetPort} trên thiết bị cha [${parentSw.name}] đã bị chiếm dụng bởi Switch con [${s.name}]!`;
      }
    }
  }

  for (const frame of gponFrames || []) {
    for (const ul of frame.uplinks ?? []) {
      if (ul.target === uplinkTarget && ul.port === targetPort) {
        return `LỖI VẬT LÝ: Cổng ${targetPort} trên thiết bị cha [${parentSw.name}] đã bị chiếm dụng bởi OLT [${frame.name}]!`;
      }
    }
  }

  return '';
}

export function getAvailableUplinkSwitches(db = [], currentSwId = null) {
  const result = [];
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (sw.id !== currentSwId) {
        result.push({
          id: sw.id,
          label: `${sw.isCore ? '[CORE] ' : ''}${sw.name} (${sw.ip})`
        });
      }
    });
  });
  return result;
}

export function addOrUpdatePortConnection(conns = [], newConn) {
  const idx = conns.findIndex((c) => c.p === newConn.p);
  const updated = idx === -1 ? [...conns, newConn] : conns.map((c, i) => (i === idx ? newConn : c));
  return updated.sort((a, b) => a.p - b.p);
}

export function removePortConnection(conns = [], port) {
  return conns.filter((c) => c.p !== port);
}

export function appendGlobalLog(logs = [], msg = '', user = 'system', maxLen = 200) {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} - ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const newEntry = { time: timeStr, msg: `[${user}] ${msg}`, user };
  const combined = [newEntry, ...(logs ?? [])];
  return combined.length > maxLen ? combined.slice(0, maxLen) : combined;
}

export function daysSinceDate(dateStr) {
  if (!dateStr) return null;
  const [datePart] = dateStr.split(' - ');
  const parts = (datePart ?? dateStr).split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (isNaN(date.getTime())) return null;
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export function getFormattedNowDate() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()} - ${hh}:${min}`;
}

export function getBackupBadgeConfig(backup) {
  if (!backup || !backup.status) {
    return { icon: '—', label: 'Chưa backup', textClass: 'text-slate-400', bgClass: 'bg-slate-50 border-slate-200' };
  }
  if (backup.status === 'failed') {
    return { icon: '❌', label: 'Thất bại', textClass: 'text-red-500', bgClass: 'bg-red-50 border-red-200' };
  }
  if (backup.status === 'skip') {
    return { icon: '⏭️', label: 'Bỏ qua', textClass: 'text-slate-400', bgClass: 'bg-slate-50 border-slate-200' };
  }
  const days = daysSinceDate(backup.date);
  if (days === null) {
    return { icon: '—', label: 'Chưa backup', textClass: 'text-slate-400', bgClass: 'bg-slate-50 border-slate-200' };
  }
  if (days <= 7) {
    return { icon: '✅', label: `${days} ngày trước`, textClass: 'text-emerald-600', bgClass: 'bg-emerald-50 border-emerald-200' };
  }
  if (days <= 30) {
    return { icon: '⚠️', label: `${days} ngày trước`, textClass: 'text-amber-600', bgClass: 'bg-amber-50 border-amber-200' };
  }
  if (days <= 90) {
    return { icon: '🔴', label: `${days} ngày trước`, textClass: 'text-orange-600', bgClass: 'bg-orange-50 border-orange-200' };
  }
  return { icon: '❌', label: `Quá ${days} ngày`, textClass: 'text-red-600', bgClass: 'bg-red-50 border-red-200' };
}

export function isSfpPort(sw, port) {
  if (!sw) return false;
  const p = Number(port);
  if (sw.hybridPorts?.[String(p)]?.isSfp) return true;
  const total = Number(sw.ports) || 24;
  if (p > total) return true;
  return false;
}

export function isComboPort(sw, port) {
  if (!sw) return false;
  const p = Number(port);
  if (sw.hybridPorts?.[String(p)]?.isCombo) return true;
  const total = Number(sw.ports) || 24;
  if (total === 24 && (p === 23 || p === 24)) return true;
  if (total === 48 && (p === 47 || p === 48)) return true;
  return false;
}

export function getComboPortMedia(sw, port) {
  if (!sw) return 'copper';
  const p = String(port);
  return sw.hybridPorts?.[p]?.media || 'copper';
}
