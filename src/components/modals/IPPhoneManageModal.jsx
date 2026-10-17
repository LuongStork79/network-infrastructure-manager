import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';

export function filterIPPhones(phones = [], statusFilter = 'all', floorFilter = 'all', search = '') {
  let list = [...phones].sort((a, b) => {
    const extA = parseInt(a.extension || '9999', 10);
    const extB = parseInt(b.extension || '9999', 10);
    return extA - extB || (a.name || '').localeCompare(b.name || '');
  });

  if (statusFilter !== 'all') {
    list = list.filter((p) => p.status === statusFilter);
  }
  if (floorFilter !== 'all') {
    list = list.filter((p) => p.floor === floorFilter);
  }

  const q = search.toLowerCase().trim();
  if (q) {
    list = list.filter(
      (p) =>
        (p.extension || '').includes(q) ||
        (p.name || '').toLowerCase().includes(q) ||
        (p.ip || '').includes(q) ||
        (p.location || '').toLowerCase().includes(q) ||
        (p.model || '').toLowerCase().includes(q) ||
        (p.floor || '').toLowerCase().includes(q)
    );
  }

  return list;
}

export function getIPPhoneStats(phones = []) {
  return {
    total: phones.length,
    active: phones.filter((p) => p.status === 'active').length,
    unregistered: phones.filter((p) => p.status === 'unregistered').length,
    offline: phones.filter((p) => p.status === 'offline').length,
    noExt: phones.filter((p) => !p.extension).length
  };
}

export function getIPPhoneFloors(phones = []) {
  return [...new Set(phones.map((p) => p.floor || '').filter(Boolean))].sort();
}

export function getUnassignedIPPhonesFromSwitches(db = [], phones = []) {
  const existingIps = new Set(phones.map((p) => p.ip).filter(Boolean));
  const result = [];

  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      sw.conns?.forEach((conn) => {
        if ((conn.icon === 'fa-phone' || String(conn.v) === '150') && (conn.n || conn.ip)) {
          if (!existingIps.has(conn.ip ?? '')) {
            result.push({
              name: conn.n || '',
              ip: conn.ip || '',
              mac: conn.mac || '',
              swName: sw.name,
              swId: sw.id,
              floor: rack.floor,
              port: conn.p
            });
          }
        }
      });
    });
  });

  return result;
}

export function logAddIPPhone(p) {
  return `Thêm mới: Ext ${p.extension || '—'} · ${p.name || '—'}`;
}

export function logAssignIPPhoneToSwitch(swName, port) {
  return `Gán vào Switch [${swName}] Port ${port}`;
}

const FIELD_LABELS = {
  extension: 'Extension',
  name: 'Tên',
  ip: 'IP',
  mac: 'MAC',
  brand: 'Thương hiệu',
  model: 'Model',
  floor: 'Tầng',
  location: 'Vị trí',
  switchId: 'Switch',
  switchPort: 'Port SW',
  status: 'Trạng thái',
  notes: 'Ghi chú'
};

export function logDiffIPPhone(oldP = {}, newP = {}) {
  const diffs = [];
  Object.keys(FIELD_LABELS).forEach((key) => {
    const vOld = String(oldP[key] ?? '');
    const vNew = String(newP[key] ?? '');
    if (vOld !== vNew) {
      diffs.push(`${FIELD_LABELS[key]}: "${vOld || '—'}" → "${vNew || '—'}"`);
    }
  });
  return diffs.length ? `Cập nhật: ${diffs.join(' | ')}` : null;
}

export function IPPhoneManageModal({
  record,
  db = [],
  username = 'admin',
  onSave,
  onClose,
  initialFloor,
  initialSwitchId,
  initialSwitchPort
}) {
  const [extension, setExtension] = useState(record?.extension ?? '');
  const [name, setName] = useState(record?.name ?? '');
  const [ip, setIp] = useState(record?.ip ?? '');
  const [mac, setMac] = useState(record?.mac ?? '');
  const [brand, setBrand] = useState(record?.brand ?? 'Grandstream');
  const [model, setModel] = useState(record?.model ?? 'GRP2602P');
  const [floor, setFloor] = useState(record?.floor ?? initialFloor ?? 'Tầng 1');
  const [location, setLocation] = useState(record?.location ?? '');
  const [switchId, setSwitchId] = useState(record?.switchId ?? initialSwitchId ?? '');
  const [switchPort, setSwitchPort] = useState(record?.switchPort ?? initialSwitchPort ?? '');
  const [status, setStatus] = useState(record?.status ?? 'active');
  const [notes, setNotes] = useState(record?.notes ?? '');

  const availableSwitches = [];
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      availableSwitches.push({ id: sw.id, label: `${sw.name} (${rack.floor})` });
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const data = {
      id: record?.id || `ipphone-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      extension: extension.trim(),
      name: name.trim(),
      ip: ip.trim(),
      mac: mac.trim(),
      brand: brand.trim(),
      model: model.trim(),
      floor: floor.trim(),
      location: location.trim(),
      switchId: switchId || null,
      switchPort: switchPort ? Number(switchPort) : null,
      status,
      notes: notes.trim()
    };

    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[500px] max-w-full shadow-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-phone text-indigo-500" />
            {record ? 'Chỉnh sửa IP Phone' : 'Thêm mới IP Phone'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scroll space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Extension</label>
              <input
                type="text"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                placeholder="101"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              >
                <option value="active">Active (Hoạt động)</option>
                <option value="unregistered">Unregistered (Chưa đăng ký)</option>
                <option value="offline">Offline (Ngoại tuyến)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên / Người sử dụng *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lễ tân / Phòng Kế toán"
              className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Địa chỉ IP</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="10.0.150.x"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Địa chỉ MAC</label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="AA:BB:CC:DD:EE:FF"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thương hiệu</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Grandstream, Yealink..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="GRP2602P..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tầng</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Tầng 1, Tầng 2..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vị trí cụ thể</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Quầy lễ tân..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kết nối Switch</label>
              <select
                value={switchId}
                onChange={(e) => setSwitchId(e.target.value)}
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              >
                <option value="">-- Chưa gán Switch --</option>
                {availableSwitches.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cổng Switch (Port)</label>
              <input
                type="number"
                value={switchPort}
                onChange={(e) => setSwitchPort(e.target.value)}
                placeholder="1 - 48"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ghi chú</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi chú thêm về thiết bị..."
              className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-save" />
              Lưu thiết bị
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Chunks compatibility exports
export const a = getIPPhoneStats;
export const i = getIPPhoneFloors;
export const n = logAssignIPPhoneToSwitch;
export const o = filterIPPhones;
export const r = logAddIPPhone;
export const s = getUnassignedIPPhonesFromSwitches;
export const t = IPPhoneManageModal;
export default IPPhoneManageModal;
