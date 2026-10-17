import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';
import { formatMacAddress } from '../../utils/elevator.js';
import { findSwitchById } from '../../utils/networkUtils.js';

export function getAvailableCoreSwitches(db = []) {
  const result = [];
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (sw.isCore) {
        result.push({ id: sw.id, label: `${sw.name} (${sw.ip})` });
      }
    });
  });
  return result;
}

export function validateFirewallUplink(
  db = [],
  coreSwId,
  port,
  firewalls = [],
  currentFwId = null,
  gponFrames = []
) {
  if (!coreSwId) return 'Vui lòng chọn Core Switch để Firewall kết nối vào!';
  const coreSw = findSwitchById(coreSwId, db);
  if (!coreSw) return '';
  if (!(port > 0)) return 'Vui lòng nhập cổng kết nối trên Core Switch!';

  if (coreSw.uplinkTarget !== 'none' && coreSw.uplinkPort === port) {
    return `LỖI VẬT LÝ: Cổng ${port} trên Core Switch [${coreSw.name}] đang được dùng làm Uplink của chính nó!`;
  }
  if (coreSw.conns?.find((c) => c.p === port)) {
    return `LỖI VẬT LÝ: Cổng ${port} trên Core Switch [${coreSw.name}] đang kết nối với thiết bị đầu cuối! Vui lòng chọn port trống.`;
  }

  for (const rack of db) {
    for (const s of rack.switches || []) {
      if (s.uplinkTarget === coreSwId && s.targetPort === port) {
        return `LỖI VẬT LÝ: Cổng ${port} trên Core Switch [${coreSw.name}] đã bị chiếm dụng bởi Switch con [${s.name}]!`;
      }
    }
  }

  for (const fw of firewalls) {
    if (fw.id !== currentFwId && fw.lanUplinkTarget === coreSwId && fw.lanUplinkPort === port) {
      return `LỖI VẬT LÝ: Cổng ${port} trên Core Switch [${coreSw.name}] đã bị chiếm dụng bởi Firewall khác [${fw.name}]!`;
    }
  }

  for (const frame of gponFrames) {
    for (const ul of frame.uplinks ?? []) {
      if (ul.target === coreSwId && ul.port === port) {
        return `LỖI VẬT LÝ: Cổng ${port} trên Core Switch [${coreSw.name}] đã bị chiếm dụng bởi OLT [${frame.name}]!`;
      }
    }
  }

  return '';
}

export function createEmptyWanLine() {
  return {
    id: `wan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    isp: '',
    ip: '',
    notes: ''
  };
}

export function cleanWanLines(lines = []) {
  return lines
    .filter((l) => l.isp.trim() !== '')
    .map((l) => ({
      id: l.id,
      isp: l.isp.trim(),
      ...(l.ip?.trim() ? { ip: l.ip.trim() } : {}),
      ...(l.notes?.trim() ? { notes: l.notes.trim() } : {})
    }));
}

export function FirewallManageModal({
  mode = 'add',
  fw = null,
  db = [],
  username = 'admin',
  onSave,
  onDelete,
  onClose
}) {
  const showDialog = useDialogStore((state) => state.showDialog);
  const firewalls = useNetworkStore((state) => state.FirewallDB);
  const gponFrames = useNetworkStore((state) => state.GponFrameDB);

  const [name, setName] = useState(fw?.name ?? '');
  const [brand, setBrand] = useState(fw?.brand ?? 'Fortinet');
  const [model, setModel] = useState(fw?.model ?? 'FortiGate 100F');
  const [mgmtIp, setMgmtIp] = useState(fw?.mgmtIp ?? '');
  const [mac, setMac] = useState(fw?.mac ?? '');
  const [haMode, setHaMode] = useState(fw?.haMode ?? 'standalone');
  const [haPeerIp, setHaPeerIp] = useState(fw?.haPeerIp ?? '');
  const [lanUplinkTarget, setLanUplinkTarget] = useState(fw?.lanUplinkTarget ?? '');
  const [lanUplinkPort, setLanUplinkPort] = useState(String(fw?.lanUplinkPort ?? ''));
  const [wanLines, setWanLines] = useState(
    fw?.wanLines?.length ? fw.wanLines : [createEmptyWanLine()]
  );

  const coreSwitches = getAvailableCoreSwitches(db);

  const handleAddWanLine = () => {
    setWanLines([...wanLines, createEmptyWanLine()]);
  };

  const handleUpdateWanLine = (id, field, value) => {
    setWanLines(wanLines.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleRemoveWanLine = (id) => {
    setWanLines(wanLines.filter((l) => l.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      showDialog('Vui lòng nhập tên Firewall!', 'error');
      return;
    }

    const portNum = parseInt(lanUplinkPort, 10) || 0;
    if (lanUplinkTarget) {
      const err = validateFirewallUplink(
        db,
        lanUplinkTarget,
        portNum,
        firewalls,
        fw?.id ?? null,
        gponFrames
      );
      if (err) {
        showDialog(err, 'error');
        return;
      }
    }

    const data = {
      id: fw?.id || `fw-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      model: model.trim(),
      mgmtIp: mgmtIp.trim(),
      mac: mac.trim(),
      haMode,
      haPeerIp: haPeerIp.trim(),
      lanUplinkTarget,
      lanUplinkPort: portNum || null,
      wanLines: cleanWanLines(wanLines),
      backup: fw?.backup ?? null
    };

    onSave(data);
    onClose();
  };

  const handleDelete = () => {
    if (!fw) return;
    showDialog(`Bạn có chắc chắn muốn xóa Firewall [${fw.name}]?`, 'confirm', () => {
      onDelete(fw.id);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[620px] max-w-full shadow-2xl flex flex-col max-h-[92vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-shield-halved text-orange-500" />
            {mode === 'edit' ? `Chỉnh sửa Firewall: ${fw?.name}` : 'Thêm Firewall bảo mật mới'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scroll space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên Firewall *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="FW-Edge-01"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hãng sản xuất</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              >
                <option value="Fortinet">Fortinet (FortiGate)</option>
                <option value="Sophos">Sophos (XGS)</option>
                <option value="Palo Alto">Palo Alto Networks</option>
                <option value="Cisco">Cisco Firepower / ASA</option>
                <option value="pfSense">pfSense / Netgate</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="FortiGate 100F, XGS 2100..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Quản trị (Mgmt)</label>
              <input
                type="text"
                value={mgmtIp}
                onChange={(e) => setMgmtIp(e.target.value)}
                placeholder="10.0.1.1"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Địa chỉ MAC</label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(formatMacAddress(e.target.value))}
                placeholder="AA:BB:CC:DD:EE:FF"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chế độ HA (Cluster)</label>
              <select
                value={haMode}
                onChange={(e) => setHaMode(e.target.value)}
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              >
                <option value="standalone">Standalone (Đơn chiếc)</option>
                <option value="active-passive">Active - Passive</option>
                <option value="active-active">Active - Active</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider block">
              Kết nối LAN xuống Core Switch
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase">Core Switch</label>
                <select
                  value={lanUplinkTarget}
                  onChange={(e) => setLanUplinkTarget(e.target.value)}
                  className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                >
                  <option value="">-- Chưa kết nối Core SW --</option>
                  {coreSwitches.map((cs) => (
                    <option key={cs.id} value={cs.id}>
                      {cs.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase">Port trên Core SW</label>
                <input
                  type="number"
                  value={lanUplinkPort}
                  onChange={(e) => setLanUplinkPort(e.target.value)}
                  placeholder="1 - 48"
                  className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Đường truyền Internet (WAN / ISP)
              </span>
              <button
                type="button"
                onClick={handleAddWanLine}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <i className="fas fa-plus-circle" /> Thêm WAN
              </button>
            </div>

            {wanLines.map((line, idx) => (
              <div
                key={line.id || idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-12 gap-2 items-center"
              >
                <div className="col-span-4">
                  <input
                    type="text"
                    value={line.isp}
                    onChange={(e) => handleUpdateWanLine(line.id, 'isp', e.target.value)}
                    placeholder="Viettel / VNPT / FPT"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={line.ip || ''}
                    onChange={(e) => handleUpdateWanLine(line.id, 'ip', e.target.value)}
                    placeholder="IP Tĩnh (Static IP)"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="text"
                    value={line.notes || ''}
                    onChange={(e) => handleUpdateWanLine(line.id, 'notes', e.target.value)}
                    placeholder="Gói 500M..."
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveWanLine(line.id)}
                    className="text-slate-400 hover:text-red-500 text-sm"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {mode === 'edit' ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
            >
              <i className="fas fa-trash-alt mr-1.5" /> Xóa Firewall
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
              <i className="fas fa-save" /> Lưu Firewall
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirewallManageModal;
