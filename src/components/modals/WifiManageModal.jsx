import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';
import { formatMacAddress } from '../../utils/elevator.js';

export function WifiManageModal({
  ap = null,
  networkDB = [],
  isAdmin = true,
  username = 'admin',
  onSave,
  onDelete,
  onClose,
  initialFloor,
  initialSwitchId,
  initialSwitchPort
}) {
  const showDialog = useDialogStore((state) => state.showDialog);
  const floors = networkDB.map((r) => r.floor);

  const [name, setName] = useState(ap?.name ?? '');
  const [ip, setIp] = useState(ap?.ip ?? '');
  const [mac, setMac] = useState(ap?.mac ?? '');
  const [floor, setFloor] = useState(ap?.floor ?? initialFloor ?? floors[0] ?? 'Tầng 1');
  const [zone, setZone] = useState(ap?.zone ?? '');
  const [type, setType] = useState(ap?.type ?? 'Dual-band');
  const [brand, setBrand] = useState(ap?.brand ?? 'Aruba');
  const [model, setModel] = useState(ap?.model ?? 'AP-515');
  const [ssid, setSsid] = useState(ap?.ssid ?? '');
  const [channel, setChannel] = useState(ap?.channel ?? '');
  const [power, setPower] = useState(ap?.power ?? '');
  const [notes, setNotes] = useState(ap?.notes ?? '');
  const [switchId, setSwitchId] = useState(ap?.switchId ?? initialSwitchId ?? '');
  const [switchPort, setSwitchPort] = useState(
    ap?.switchPort == null
      ? initialSwitchPort == null
        ? ''
        : String(initialSwitchPort)
      : String(ap.switchPort)
  );

  const availableSwitches = networkDB.flatMap((r) =>
    (r.switches || []).map((s) => ({ id: s.id, name: s.name, floor: r.floor }))
  );

  const handleSave = () => {
    if (!isAdmin) {
      showDialog('Bạn không có quyền thực hiện thao tác này!', 'error');
      return;
    }
    const apName = name.trim();
    if (!apName) {
      showDialog('Vui lòng nhập tên Access Point!', 'error');
      return;
    }

    const data = {
      id: ap?.id || `ap-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: apName,
      ip: ip.trim(),
      mac: mac.trim(),
      floor,
      zone: zone.trim(),
      type,
      brand: brand.trim(),
      model: model.trim(),
      ssid: ssid.trim(),
      channel: channel.trim(),
      power: power.trim(),
      notes: notes.trim(),
      switchId,
      switchPort: parseInt(switchPort, 10) || null,
      backup: ap?.backup ?? null
    };

    onSave(data);
    onClose();
  };

  const handleDelete = () => {
    if (!ap) return;
    showDialog(`Xóa AP [${ap.name}] khỏi hệ thống?`, 'confirm', () => {
      onDelete(ap.id);
      onClose();
    });
  };

  return (
    <div className="modal" style={{ display: 'flex', zIndex: 600 }}>
      <div className="modal-content shadow-2xl" style={{ width: 560, maxWidth: '96vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-wifi text-cyan-600" />
            {ap ? `Chỉnh sửa AP: ${ap.name}` : 'Thêm mới WiFi Access Point'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll pr-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Tên AP <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="AP-TANG01-A"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Address</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="10.195.102.x"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MAC Address</label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(formatMacAddress(e.target.value))}
                maxLength={17}
                placeholder="AA:BB:CC:DD:EE:FF"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none font-mono uppercase"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tầng / Vị trí</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none"
              >
                {floors.map((fl) => (
                  <option key={fl} value={fl}>
                    {fl}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khu vực</label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="Sảnh, hành lang..."
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loại WiFi</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none"
              >
                <option value="Dual-band">Dual-band (2.4G + 5G)</option>
                <option value="Tri-band">Tri-band (2.4G + 5G + 6G)</option>
                <option value="2.4G">2.4G Only</option>
                <option value="5G">5G Only</option>
                <option value="6G">6G Only</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hãng / Model</label>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Aruba"
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                />
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="AP-515"
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SSID Phát</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="Resort-Guest, Staff-Internal"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kênh (Channel)</label>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="CH 1, 6, 11 / 36, 149"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch kết nối</label>
              <select
                value={switchId}
                onChange={(e) => setSwitchId(e.target.value)}
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
              >
                <option value="">-- Chưa gán Switch --</option>
                {availableSwitches.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.floor})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Port Switch</label>
              <input
                type="number"
                value={switchPort}
                onChange={(e) => setSwitchPort(e.target.value)}
                placeholder="1 - 48"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 shrink-0">
          {ap && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-all"
            >
              <i className="fas fa-trash mr-1" /> Xóa
            </button>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-cyan-700 transition-all flex items-center gap-2"
          >
            <i className="fas fa-save" /> Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

// Chunks compatibility alias
export const n = WifiManageModal;
export default WifiManageModal;
