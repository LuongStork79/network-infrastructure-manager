import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';
import { formatMacAddress } from '../../utils/elevator.js';
import {
  validateSwitchUplink,
  getAvailableUplinkSwitches,
  brandColors
} from '../../utils/networkUtils.js';

export function getComboPorts(totalPorts, comboCount) {
  if (comboCount <= 0) return [];
  const n = Math.min(comboCount, totalPorts);
  return Array.from({ length: n }, (_, i) => totalPorts - n + 1 + i).filter((p) => p > 0);
}

export function SwitchManageModal({
  mode = 'add',
  sw = null,
  db = [],
  username = 'admin',
  onSave,
  onDelete,
  onClose
}) {
  const showDialog = useDialogStore((state) => state.showDialog);
  const gponFrames = useNetworkStore((state) => state.GponFrameDB);

  const initialRackIndex = sw
    ? db.findIndex((rack) => rack.switches?.some((s) => s.id === sw.id))
    : 0;

  const [rackIndex, setRackIndex] = useState(Math.max(initialRackIndex, 0));
  const [brand, setBrand] = useState(sw?.brand ?? 'Cisco');
  const [isCore, setIsCore] = useState(sw?.isCore ?? false);
  const [name, setName] = useState(sw?.name ?? '');
  const [mac, setMac] = useState(sw?.mac ?? '');
  const [ip, setIp] = useState(sw?.ip ?? '');
  const [zone, setZone] = useState(sw?.zone ?? '');
  const [ports, setPorts] = useState(String(sw?.ports ?? 24));
  const [sfpPorts, setSfpPorts] = useState(String(sw?.sfpPorts ?? 4));
  const [hybridPortCount, setHybridPortCount] = useState(String(sw?.hybridPortCount ?? 0));
  const [hybridPorts, setHybridPorts] = useState(sw?.hybridPorts ?? {});
  const [uplinkPort, setUplinkPort] = useState(String(sw?.uplinkPort ?? 24));
  const [model, setModel] = useState(sw?.model ?? '');
  const [uplinkTarget, setUplinkTarget] = useState(sw?.uplinkTarget ?? 'none');
  const [targetPort, setTargetPort] = useState(String(sw?.targetPort ?? 1));
  const [uplinkType, setUplinkType] = useState(sw?.uplinkType ?? 'Fiber');
  const [uplinkSpeed, setUplinkSpeed] = useState(sw?.uplinkSpeed ?? '10G');

  const availableUplinks = getAvailableUplinkSwitches(db, sw?.id ?? null);
  const comboList = getComboPorts(parseInt(ports, 10) || 0, parseInt(hybridPortCount, 10) || 0);

  const handleUpdateHybridPort = (portNum, patch) => {
    setHybridPorts((prev) => ({
      ...prev,
      [String(portNum)]: {
        media: prev[String(portNum)]?.media ?? 'copper',
        note: prev[String(portNum)]?.note ?? '',
        ...patch
      }
    }));
  };

  const handleSave = () => {
    const swName = name.trim();
    const upPort = parseInt(uplinkPort, 10) || 0;
    const tgtPort = parseInt(targetPort, 10) || 0;
    const conns = sw?.conns ?? [];

    const validationError = validateSwitchUplink(
      db,
      mode === 'edit',
      sw?.id ?? null,
      upPort,
      uplinkTarget,
      tgtPort,
      conns,
      gponFrames
    );

    if (validationError) {
      showDialog(validationError, 'error');
      return;
    }

    const totalP = parseInt(ports, 10);
    const sfpP = parseInt(sfpPorts, 10);
    const comboP = parseInt(hybridPortCount, 10);
    const finalPorts = Number.isNaN(totalP) ? 24 : totalP;
    const finalCombo = Number.isNaN(comboP) ? 0 : comboP;

    if (finalCombo > finalPorts) {
      showDialog('Số cổng Combo không được lớn hơn Tổng số Port (RJ45)!', 'error');
      return;
    }

    const validComboSet = new Set(getComboPorts(finalPorts, finalCombo));
    const cleanHybridPorts = Object.fromEntries(
      Object.entries(hybridPorts).filter(([p]) => validComboSet.has(Number(p)))
    );

    const switchData = {
      id: sw?.id ?? `sw-${Date.now()}`,
      isCore,
      name: swName || 'New SW',
      brand,
      mac: mac.trim() || 'N/A',
      ip: ip.trim() || '10.x.x.x',
      model: model.trim() || 'Generic',
      zone: zone.trim() || 'Tủ Rack',
      ports: finalPorts,
      sfpPorts: Number.isNaN(sfpP) ? 0 : sfpP,
      hybridPortCount: finalCombo,
      hybridPorts: cleanHybridPorts,
      uplinkPort: upPort,
      uplinkTarget,
      targetPort: tgtPort,
      uplinkType,
      uplinkSpeed,
      conns: sw?.conns ?? [],
      logs: sw?.logs ?? [
        {
          time: new Date().toLocaleTimeString('vi-VN') + ' - ' + new Date().toLocaleDateString('vi-VN'),
          user: username,
          msg: `${mode === 'edit' ? 'Chỉnh sửa' : 'Tạo mới'} thiết bị [${swName || 'New SW'}]`
        }
      ]
    };

    onSave(rackIndex, switchData);
    onClose();
  };

  const handleDelete = () => {
    if (!sw) return;
    showDialog(
      `Bạn có chắc chắn muốn xóa Switch [${sw.name}]? Tất cả kết nối liên quan sẽ bị ảnh hưởng!`,
      'confirm',
      () => {
        onDelete(sw.id);
        onClose();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[600px] max-w-full shadow-2xl flex flex-col max-h-[92vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <i className={`fas ${isCore ? 'fa-crown text-amber-500' : 'fa-server text-indigo-500'}`} />
            {mode === 'edit' ? `Cấu hình Switch: ${sw?.name}` : 'Thêm Switch mới vào hạ tầng'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scroll space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tủ Rack chứa</label>
              <select
                value={rackIndex}
                onChange={(e) => setRackIndex(Number(e.target.value))}
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              >
                {db.map((rack, idx) => (
                  <option key={rack.id || idx} value={idx}>
                    {rack.name} ({rack.floor})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hãng sản xuất</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              >
                <option value="Cisco">Cisco</option>
                <option value="Aruba">Aruba / HPE</option>
                <option value="HP">HP ProCurve</option>
                <option value="Juniper">Juniper</option>
                <option value="Allied Telesis">Allied Telesis</option>
                <option value="TPLink Omada">TP-Link Omada</option>
                <option value="Grandstream">Grandstream</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên Switch *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Core-SW01 hoặc SW-Fl02"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Catalyst 2960X, Aruba 2930F..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Địa chỉ IP quản trị</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="10.0.1.x"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Địa chỉ MAC</label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(formatMacAddress(e.target.value))}
                placeholder="AA:BB:CC:DD:EE:FF"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-slate-800">Vai trò Core / Distribution</span>
              <p className="text-[10px] text-slate-400">Switch chính đảm nhận vai trò trung tâm mạng hoặc uplink gốc</p>
            </div>
            <input
              type="checkbox"
              checked={isCore}
              onChange={(e) => setIsCore(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Số Port RJ45</label>
              <input
                type="number"
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
                className="w-full mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Số Port SFP/Fiber</label>
              <input
                type="number"
                value={sfpPorts}
                onChange={(e) => setSfpPorts(e.target.value)}
                className="w-full mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Số Port Combo</label>
              <input
                type="number"
                value={hybridPortCount}
                onChange={(e) => setHybridPortCount(e.target.value)}
                className="w-full mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
          </div>

          {comboList.length > 0 && (
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
              <span className="text-[11px] font-black text-amber-800 flex items-center gap-1.5">
                <i className="fas fa-layer-group" /> Cấu hình cổng Combo ({comboList.join(', ')})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {comboList.map((pNum) => (
                  <div key={pNum} className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200/80">
                    <span className="text-xs font-black text-slate-700">Port {pNum}</span>
                    <select
                      value={hybridPorts[String(pNum)]?.media ?? 'copper'}
                      onChange={(e) => handleUpdateHybridPort(pNum, { media: e.target.value })}
                      className="text-[11px] font-bold border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50"
                    >
                      <option value="copper">RJ45 (Đồng)</option>
                      <option value="fiber">SFP (Quang)</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 pt-3">
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider block mb-3">
              Cấu hình đường Uplink lên Thiết bị cha
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thiết bị cha (Parent)</label>
                <select
                  value={uplinkTarget}
                  onChange={(e) => setUplinkTarget(e.target.value)}
                  className="w-full mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
                >
                  <option value="none">-- Không có (Switch Core gốc) --</option>
                  {availableUplinks.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loại cáp / Tốc độ</label>
                <div className="grid grid-cols-2 gap-1 mt-1.5">
                  <select
                    value={uplinkType}
                    onChange={(e) => setUplinkType(e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
                  >
                    <option value="Fiber">Fiber (Quang)</option>
                    <option value="CAT6">CAT6 (Đồng)</option>
                    <option value="Stack">Stacking</option>
                  </select>
                  <select
                    value={uplinkSpeed}
                    onChange={(e) => setUplinkSpeed(e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
                  >
                    <option value="1G">1G</option>
                    <option value="10G">10G</option>
                    <option value="40G">40G</option>
                    <option value="100G">100G</option>
                  </select>
                </div>
              </div>
            </div>

            {uplinkTarget !== 'none' && (
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cổng Uplink (Trên Switch này)
                  </label>
                  <input
                    type="number"
                    value={uplinkPort}
                    onChange={(e) => setUplinkPort(e.target.value)}
                    className="w-full mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cổng tiếp nhận (Trên Thiết bị cha)
                  </label>
                  <input
                    type="number"
                    value={targetPort}
                    onChange={(e) => setTargetPort(e.target.value)}
                    className="w-full mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {mode === 'edit' ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
            >
              <i className="fas fa-trash-alt mr-1.5" /> Xóa Switch
            </button>
          ) : <div />}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-save" /> Lưu thiết bị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chunks compatibility default export
export default SwitchManageModal;
