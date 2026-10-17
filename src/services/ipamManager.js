// Quản lý IPAM: Subnets, VLANs và Gán IP (Add/Edit/Delete)
// Phân tách độc lập theo từng Dự án (Project-scoped)
import { getActiveProjectId } from './projectManager.js';

function getSubnetsKey() {
  const pid = getActiveProjectId();
  return pid === 'default' ? 'nim_custom_ipam_subnets' : `nim_custom_ipam_subnets_${pid}`;
}

function getAllocationsKey() {
  const pid = getActiveProjectId();
  return pid === 'default' ? 'nim_custom_ip_allocations' : `nim_custom_ip_allocations_${pid}`;
}

export const DEFAULT_SUBNETS = {
  1: { name: 'Management', color: 'var(--vlan-1)', icon: 'fa-server', subnet: '10.195.32.0/19' },
  99: { name: 'IPTV', color: 'var(--vlan-99)', icon: 'fa-tv', subnet: '10.195.64.0/22' },
  100: { name: 'Guest Room', color: 'var(--vlan-100)', icon: 'fa-bed', subnet: '10.195.80.0/20' },
  114: { name: 'officeVlan', color: 'var(--vlan-114)', icon: 'fa-building', subnet: '10.50.24.0/22' },
  102: { name: 'wifiVlan', color: 'var(--vlan-102)', icon: 'fa-wifi', subnet: '10.195.104.0/22' },
  20: { name: 'Máy lạnh Daikin', color: 'var(--vlan-20)', icon: 'fa-snowflake', subnet: '192.168.20.0/24' },
  150: { name: 'IP Phone', color: 'var(--vlan-150)', icon: 'fa-phone', subnet: '172.16.16.0/24' },
  120: { name: 'CCTV', color: 'var(--vlan-120)', icon: 'fa-video', subnet: '172.16.4.0/22' },
  130: { name: 'ACS', color: 'var(--vlan-130)', icon: 'fa-id-card', subnet: '172.16.64.0/24' },
  111: { name: 'Server Farm', color: 'var(--vlan-111)', icon: 'fa-network-wired', subnet: '10.195.109.0/24' },
  170: { name: 'Outdoor', color: 'var(--vlan-170)', icon: 'fa-tree', subnet: '172.100.170.1/21' }
};

export function getCustomSubnets() {
  try {
    const raw = localStorage.getItem(getSubnetsKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading custom subnets:', e);
  }
  return {};
}

export function saveCustomSubnets(subnets) {
  try {
    localStorage.setItem(getSubnetsKey(), JSON.stringify(subnets));
    window.dispatchEvent(new CustomEvent('nim:subnets_updated', { detail: subnets }));
  } catch (e) {
    console.error('Error saving custom subnets:', e);
  }
}

// Lấy toàn bộ Subnets (Dự án Trung Tâm có dải mạng mẫu, dự án mới tạo hoàn toàn trống)
export function getAllSubnets() {
  const pid = getActiveProjectId();
  const custom = getCustomSubnets();

  // Đối với các dự án mới / khác dự án mặc định: khởi đầu hoàn toàn trống
  if (pid !== 'default') {
    const result = {};
    for (const [key, val] of Object.entries(custom)) {
      if (val && !val._deleted) {
        result[key] = val;
      }
    }
    return result;
  }

  // Đối với dự án Trung Tâm ('default'), nạp sẵn dải mạng mặc định
  const result = { ...DEFAULT_SUBNETS };
  for (const [key, val] of Object.entries(custom)) {
    if (val === null || val._deleted) {
      delete result[key];
    } else {
      result[key] = {
        ...result[key],
        ...val
      };
    }
  }
  return result;
}

// Thêm mới hoặc cập nhật một Subnet / VLAN
export function saveSubnet(vlanId, { name, subnet, color, icon }) {
  const idStr = String(vlanId).trim();
  if (!idStr) throw new Error('VLAN ID không được để trống!');

  const custom = getCustomSubnets();
  custom[idStr] = {
    name: name.trim() || `VLAN ${idStr}`,
    subnet: subnet.trim() || '192.168.1.0/24',
    color: color || '#4f46e5',
    icon: icon || 'fa-network-wired'
  };

  saveCustomSubnets(custom);
  return custom[idStr];
}

// Xóa Subnet / VLAN
export function deleteSubnet(vlanId) {
  const idStr = String(vlanId).trim();
  const custom = getCustomSubnets();
  custom[idStr] = { _deleted: true };
  saveCustomSubnets(custom);
  return true;
}

// Khôi phục về danh sách mặc định
export function resetSubnetsToDefault() {
  localStorage.removeItem(getSubnetsKey());
  window.dispatchEvent(new CustomEvent('nim:subnets_updated'));
}

// Quản lý gán IP tĩnh / Đặt trước thủ công (Manual IP Allocations)
export function getCustomIpAllocations() {
  try {
    const raw = localStorage.getItem(getAllocationsKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    }
  } catch (e) {}
  return {};
}

export function saveCustomIpAllocations(allocations) {
  try {
    localStorage.setItem(getAllocationsKey(), JSON.stringify(allocations));
    window.dispatchEvent(new CustomEvent('nim:ip_allocations_updated', { detail: allocations }));
  } catch (e) {}
}

export function setIpAllocation(ip, { name, mac, note, status = 'used', vlan = null, icon = 'fa-desktop' }) {
  const allocations = getCustomIpAllocations();
  allocations[ip] = {
    ip,
    name: name.trim() || 'Manual Host',
    mac: mac ? mac.trim() : '',
    note: note ? note.trim() : '',
    status, // 'used' | 'reserved'
    vlan,
    icon: icon || 'fa-desktop',
    updatedAt: new Date().toISOString()
  };
  saveCustomIpAllocations(allocations);
  return allocations[ip];
}

export function deleteIpAllocation(ip) {
  const allocations = getCustomIpAllocations();
  delete allocations[ip];
  saveCustomIpAllocations(allocations);
}
