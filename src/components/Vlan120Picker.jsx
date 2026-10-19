import React, { useState, useEffect } from '../core/react-adapter.js';

/**
 * IP helper: Convert IPv4 to 32-bit unsigned integer
 */
export function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

/**
 * IP helper: Convert 32-bit integer back to IPv4 string
 */
export function intToIp(intVal) {
  return [
    (intVal >>> 24) & 255,
    (intVal >>> 16) & 255,
    (intVal >>> 8) & 255,
    intVal & 255
  ].join('.');
}

/**
 * Retrieve devices belonging to a given VLAN from Switch DB and Elevator DB
 */
export function getVlanDevices(vlan, db = [], elevatorDB = []) {
  const result = {};

  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (vlan === '1' && sw.ip && sw.ip !== '10.x.x.x' && sw.ip.trim() !== '') {
        result[sw.ip] = {
          ip: sw.ip,
          n: sw.name,
          swName: 'Tủ Rack (Core/Dist)',
          port: 'Mgmt',
          icon: sw.isCore ? 'fa-crown' : 'fa-server'
        };
      }
      sw.conns?.forEach((conn) => {
        if (String(conn.v) === vlan) {
          const key = conn.ip || `no_ip_${sw.id}_${conn.p}`;
          result[key] = {
            ip: conn.ip,
            n: conn.n,
            swName: sw.name,
            port: conn.p,
            icon: conn.icon || 'fa-desktop',
            nvr: conn.nvr,
            ch: conn.ch,
            camType: conn.camType,
            mac: conn.mac
          };
        }
      });
    });
  });

  if (vlan === '120' && elevatorDB) {
    elevatorDB.forEach((elev) => {
      if (elev.master?.ip) {
        result[elev.master.ip] = {
          ip: elev.master.ip,
          n: elev.master.name,
          swName: elev.name,
          port: 'Master',
          icon: 'fa-server',
          mac: elev.master.mac
        };
      }
      if (elev.client?.ip) {
        result[elev.client.ip] = {
          ip: elev.client.ip,
          n: elev.client.name,
          swName: elev.name,
          port: 'Client',
          icon: 'fa-box',
          mac: elev.client.mac
        };
      }
      (elev.cctvs ?? []).forEach((cctv, idx) => {
        if (cctv.ip) {
          result[cctv.ip] = {
            ip: cctv.ip,
            n: cctv.name,
            swName: elev.name,
            port: `Cam ${idx + 1}`,
            icon: 'fa-video',
            mac: cctv.mac
          };
        }
      });
    });
  }

  return result;
}

/**
 * Calculate total IPs, used count and usage percentage for a CIDR subnet
 */
export function calcSubnetInfo(cidr, devicesMap = {}) {
  if (cidr === 'N/A') return { totalIps: 0, usedCount: 0, percent: '0.0' };
  const mask = parseInt(cidr.split('/')[1], 10);
  const total = isNaN(mask) ? 0 : 2 ** (32 - mask);
  const used = Object.values(devicesMap).filter((d) => d.ip).length;
  return {
    totalIps: total,
    usedCount: used,
    percent: total > 0 ? ((used / total) * 100).toFixed(1) : '0.0'
  };
}

const PAGE_SIZE = 4096;

/**
 * Paginate IPs within CIDR blocks for visual matrix
 */
export function paginateSubnet(cidr, page = 1, devicesMap = {}) {
  const [baseIp, maskStr] = cidr.split('/');
  const total = 2 ** (32 - parseInt(maskStr, 10));
  const baseInt = ipToInt(baseIp);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, total);
  const blocks = [];

  let cur = Math.floor(startIdx / 256) * 256;
  while (cur < endIdx) {
    const blockEnd = Math.min(cur + 256, endIdx);
    const blockLabel = intToIp(baseInt + cur).replace(/\.\d+$/, '.x');
    const ips = [];

    for (let i = Math.max(cur, startIdx); i < blockEnd; i++) {
      const ip = intToIp(baseInt + i);
      let status = 'available';
      let title = `${ip} - Available`;

      if (i === 0 || i === 1 || i === total - 1) {
        status = 'reserved';
        if (i === 0) title = `${ip} - Network ID`;
        if (i === 1) title = `${ip} - Default Gateway`;
        if (i === total - 1) title = `${ip} - Broadcast IP`;
      } else if (devicesMap[ip]) {
        const d = devicesMap[ip];
        status = 'used';
        title = `${ip}\nDevice: ${d.n}\nLoc: ${d.swName} (Port ${d.port})`;
      }

      ips.push({ ip, status, title });
    }

    blocks.push({ blockLabel, ips });
    cur += 256;
  }

  return { totalPages, blocks };
}

/**
 * Modal to pick an IP address assigned to VLAN 120
 */
export function Vlan120PickerModal({ isOpen, onClose, onSelect, db = [], elevatorDB = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) setSearchTerm('');
  }, [isOpen]);

  if (!isOpen) return null;

  const devicesMap = getVlanDevices('120', db, elevatorDB);
  const q = searchTerm.trim().toLowerCase();
  const filtered = Object.values(devicesMap).filter((d) => {
    if (!d.ip) return false;
    return (
      q === '' ||
      d.ip.includes(q) ||
      (d.n && d.n.toLowerCase().includes(q)) ||
      (d.mac && d.mac.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[400] flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[450px] shadow-2xl flex flex-col max-h-[80vh]">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-search text-emerald-500" />
            Chọn IP từ VLAN 120
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <input
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold shadow-sm"
            placeholder="Tìm kiếm IP, Tên, MAC..."
          />
        </div>

        <div className="p-2 overflow-y-auto custom-scroll flex-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 font-medium">
              Không tìm thấy thiết bị nào
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.ip}
                onClick={() => onSelect(item)}
                className="p-3 mb-2 last:mb-0 bg-white border border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors flex flex-col gap-1"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black text-slate-800">
                    {item.n || 'Unknown Device'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">
                    {item.ip}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                    <i className={`fas ${item.icon || ''}`} /> {item.swName}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">
                    {item.mac || 'NO MAC'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Chunks compatibility exports
export const i = getVlanDevices;
export const n = paginateSubnet;
export const r = calcSubnetInfo;
export const t = Vlan120PickerModal;
export default Vlan120PickerModal;
