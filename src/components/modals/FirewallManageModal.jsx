import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';
import { formatMacAddress } from '../../utils/elevator.js';
import { findSwitchById } from '../../utils/networkUtils.js';
import { EditBackupModal, BackupHistoryModal } from './BackupHistoryModal.jsx';

export function getAvailableCoreSwitches(db = []) {
  const result = [];
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (sw.isCore) {
        result.push({ id: sw.id, label: `${sw.name} (${sw.ip || 'No IP'})` });
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
  gponFrames = [],
  deviceLabel = 'Gateway'
) {
  if (!coreSwId) return `Vui lòng chọn Core Switch để ${deviceLabel} kết nối vào!`;
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
      const isRt = fw.deviceType === 'router' || fw.name?.toLowerCase().includes('router');
      return `LỖI VẬT LÝ: Cổng ${port} trên Core Switch [${coreSw.name}] đã bị chiếm dụng bởi ${isRt ? 'Router' : 'Firewall'} khác [${fw.name}]!`;
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
  return (lines || [])
    .filter((l) => (l.isp && l.isp.trim() !== '') || (l.ip && l.ip.trim() !== ''))
    .map((l) => ({
      id: l.id || `wan-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      isp: (l.isp || '').trim(),
      ...(l.ip?.trim() ? { ip: l.ip.trim() } : {}),
      ...(l.notes?.trim() ? { notes: l.notes.trim() } : {})
    }));
}

function appendDeviceLog(logs = [], actionText = '', username = 'system') {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} - ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  return [{ time: timeStr, msg: actionText, user: username }, ...(logs || [])].slice(0, 100);
}

export function FirewallManageModal({
  mode = 'add',
  initialType = 'firewall',
  fw = null,
  db = [],
  username = 'admin',
  isAdmin = true,
  onSave,
  onDelete,
  onClose
}) {
  const showDialog = useDialogStore((state) => state.showDialog);
  const firewalls = useNetworkStore((state) => state.FirewallDB);
  const deleteFirewall = useNetworkStore((state) => state.deleteFirewall);
  const gponFrames = useNetworkStore((state) => state.GponFrameDB);
  const addGlobalLog = useNetworkStore((state) => state.addGlobalLog);
  const saveFirewallBackup = useNetworkStore((state) => state.saveFirewallBackup);

  // Determine initial device type
  const [deviceType, setDeviceType] = useState(() => {
    if (fw?.deviceType) return fw.deviceType;
    if (initialType === 'router') return 'router';
    if (
      fw?.name?.toLowerCase().includes('router') ||
      fw?.model?.toLowerCase().includes('router') ||
      fw?.brand?.toLowerCase().includes('router')
    ) {
      return 'router';
    }
    return 'firewall';
  });

  const isRouter = deviceType === 'router';

  // Form states with smart defaults based on device type
  const [name, setName] = useState(() => {
    if (fw?.name) return fw.name;
    if (mode === 'add') {
      return (initialType === 'router' || deviceType === 'router') ? 'Router-01' : 'FW-Core-01';
    }
    return '';
  });

  const [brand, setBrand] = useState(() => {
    if (fw?.brand) return fw.brand;
    if (mode === 'add') {
      return (initialType === 'router' || deviceType === 'router') ? 'MikroTik' : 'Fortinet';
    }
    return '';
  });

  const [model, setModel] = useState(() => {
    if (fw?.model) return fw.model;
    if (mode === 'add') {
      return (initialType === 'router' || deviceType === 'router') ? 'CCR2004-16G-2S+' : 'FortiGate 100F';
    }
    return '';
  });

  const [ip, setIp] = useState(() => fw?.ip ?? fw?.mgmtIp ?? '');
  const [mac, setMac] = useState(() => fw?.mac ?? '');
  const [zone, setZone] = useState(() => fw?.zone ?? 'Server Room');
  const [notes, setNotes] = useState(() => fw?.notes ?? '');
  const [lanUplinkTarget, setLanUplinkTarget] = useState(() => fw?.lanUplinkTarget ?? '');
  const [lanUplinkPort, setLanUplinkPort] = useState(() => String(fw?.lanUplinkPort ?? ''));
  const [lanUplinkMediaType, setLanUplinkMediaType] = useState(() => fw?.lanUplinkMediaType ?? 'copper');
  const [lanUplinkLocalPort, setLanUplinkLocalPort] = useState(() => fw?.lanUplinkLocalPort ?? (isRouter ? 'ether1' : 'port1'));
  const [lanUplinkComboMode, setLanUplinkComboMode] = useState(() => fw?.lanUplinkComboMode ?? 'copper');

  // Port configuration (same as Switch: RJ45, SFP, Uplink/Stack, Combo)
  const [ports, setPorts] = useState(() => String(fw?.ports ?? fw?.totalPorts ?? (isRouter ? 16 : 10)));
  const [sfpPorts, setSfpPorts] = useState(() => String(fw?.sfpPorts ?? 2));
  const [uplinkPort, setUplinkPort] = useState(() => String(fw?.uplinkPort ?? 1));
  const [hybridPortCount, setHybridPortCount] = useState(() => String(fw?.hybridPortCount ?? fw?.comboPorts ?? 0));
  const [hybridPorts, setHybridPorts] = useState(() => fw?.hybridPorts ?? {});

  // HA cluster mode (used for firewalls)
  const [haMode, setHaMode] = useState(() => fw?.haMode ?? 'standalone');
  const [haPeerIp, setHaPeerIp] = useState(() => fw?.haPeerIp ?? '');

  // WAN links
  const [wanLinks, setWanLinks] = useState(() => {
    const raw = fw?.wanLinks || fw?.wanLines;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return [createEmptyWanLine()];
  });

  // Backup modals state
  const [showBackupEditModal, setShowBackupEditModal] = useState(false);
  const [showBackupHistoryModal, setShowBackupHistoryModal] = useState(false);

  const coreSwitches = getAvailableCoreSwitches(db);

  // Handle switching device type tab
  const handleSelectDeviceType = (type) => {
    setDeviceType(type);
    if (mode === 'add') {
      if (type === 'router') {
        if (!name || name === 'FW-Core-01' || name === 'Firewall') setName('Router-01');
        if (!brand || brand === 'Fortinet' || brand === 'Check Point') setBrand('MikroTik');
        if (!model || model === 'FortiGate 100F' || model === 'Quantum Spark') setModel('CCR2004-16G-2S+');
      } else {
        if (!name || name === 'Router-01' || name === 'Router Gateway') setName('FW-Core-01');
        if (!brand || brand === 'MikroTik') setBrand('Fortinet');
        if (!model || model === 'CCR2004-16G-2S+') setModel('FortiGate 100F');
      }
    }
  };

  const handleAddWanLine = () => {
    setWanLinks([...wanLinks, createEmptyWanLine()]);
  };

  const handleUpdateWanLine = (id, field, value) => {
    setWanLinks(wanLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleRemoveWanLine = (id) => {
    if (wanLinks.length === 1) {
      setWanLinks([createEmptyWanLine()]);
    } else {
      setWanLinks(wanLinks.filter((l) => l.id !== id));
    }
  };

  const handleSave = () => {
    if (!isAdmin) {
      showDialog('Bạn không có quyền thực hiện thao tác này! Vui lòng liên hệ quản trị viên.', 'error');
      return;
    }
    const devLabel = isRouter ? 'Router' : 'Firewall';
    const trimmedName = name.trim();
    if (!trimmedName) {
      showDialog(`Vui lòng nhập tên ${devLabel}!`, 'error');
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
        gponFrames,
        devLabel
      );
      if (err) {
        showDialog(err, 'error');
        return;
      }
    }

    const actionText =
      mode === 'add'
        ? `Thêm mới ${devLabel} [${trimmedName}]`
        : `Cập nhật thông tin ${devLabel} [${trimmedName}]`;

    const cleanedWan = cleanWanLines(wanLinks);

    const data = {
      id: fw?.id || (isRouter ? `router-${Date.now()}` : `fw-${Date.now()}`),
      name: trimmedName,
      deviceType: deviceType,
      brand: brand.trim(),
      model: model.trim(),
      ip: ip.trim(),
      mgmtIp: ip.trim(),
      mac: mac.trim(),
      zone: zone.trim() || 'Server Room',
      lanUplinkTarget: lanUplinkTarget || '',
      lanUplinkPort: portNum || null,
      lanUplinkMediaType,
      lanUplinkLocalPort: lanUplinkLocalPort.trim(),
      lanUplinkComboMode,
      ports: parseInt(ports, 10) || 0,
      totalPorts: parseInt(ports, 10) || 0,
      sfpPorts: parseInt(sfpPorts, 10) || 0,
      uplinkPort: parseInt(uplinkPort, 10) || 0,
      hybridPortCount: parseInt(hybridPortCount, 10) || 0,
      comboPorts: parseInt(hybridPortCount, 10) || 0,
      hybridPorts,
      haMode: !isRouter ? haMode : 'standalone',
      haPeerIp: !isRouter ? haPeerIp.trim() : '',
      wanLinks: cleanedWan,
      wanLines: cleanedWan,
      notes: notes.trim(),
      logs: appendDeviceLog(fw?.logs, actionText, username),
      backup: fw?.backup ?? null
    };

    if (onSave) {
      onSave(data);
    }
    if (addGlobalLog) {
      addGlobalLog(`${devLabel}: ${trimmedName}`, actionText, username);
    }
    onClose();
  };

  const handleDelete = () => {
    if (!isAdmin) {
      showDialog('Bạn không có quyền thực hiện thao tác này! Vui lòng liên hệ quản trị viên.', 'error');
      return;
    }
    if (!fw) return;
    const devLabel = isRouter ? 'Router' : 'Firewall';

    const executeDelete = () => {
      deleteFirewall(fw.id);
      if (addGlobalLog) {
        addGlobalLog(`${devLabel}: ${fw.name}`, `Đã xóa ${devLabel} [${fw.name}]`, username);
      }
      onClose();
    };

    if (typeof showDialog === 'function') {
      showDialog(`Bạn có chắc chắn muốn xóa ${devLabel} [${fw.name}]?`, 'confirm', executeDelete);
    } else if (onDelete) {
      onDelete();
    } else if (typeof window !== 'undefined' && window.confirm(`Bạn có chắc chắn muốn xóa ${devLabel} [${fw.name}]?`)) {
      executeDelete();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[250] flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-[620px] max-w-[calc(100vw-24px)] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        style={{ width: 620, maxWidth: 'calc(100vw - 24px)', maxHeight: '92vh' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shadow-sm ${
                isRouter
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-800'
                  : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800'
              }`}
            >
              <i className={`fas ${isRouter ? 'fa-route' : 'fa-shield-halved'}`} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {mode === 'edit'
                  ? `${isRouter ? 'Chỉnh sửa Router' : 'Chỉnh sửa Firewall'}: ${fw?.name || name}`
                  : (isRouter ? 'Thêm mới Router Gateway' : 'Thêm mới Firewall Bảo Mật')}
              </h3>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-400">
                {isRouter
                  ? 'Thiết bị định tuyến mạng & Cổng ra Internet chính'
                  : 'Thiết bị tường lửa kiểm soát bảo mật & Định tuyến Gateway'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-colors"
            title="Đóng"
          >
            <i className="fas fa-times text-sm" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scroll space-y-4 flex-1">
          {/* Device Type Toggle (Router vs Firewall) */}
          <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => handleSelectDeviceType('router')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isRouter
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-route text-sm" />
              <span>Router Gateway</span>
              {isRouter && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 font-mono">Đang chọn</span>}
            </button>
            <button
              type="button"
              onClick={() => handleSelectDeviceType('firewall')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !isRouter
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-shield-halved text-sm" />
              <span>Firewall Bảo Mật</span>
              {!isRouter && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 font-mono">Đang chọn</span>}
            </button>
          </div>

          {/* Row 1: Device Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Tên thiết bị *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isRouter ? 'Router-01' : 'FW-Core-01'}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Hãng sản xuất
              </label>
              <input
                type="text"
                list="gateway-brand-suggestions"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder={isRouter ? 'MikroTik, Cisco, DrayTek...' : 'Fortinet, Sophos, Palo Alto...'}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <datalist id="gateway-brand-suggestions">
                {isRouter ? (
                  <>
                    <option value="MikroTik" />
                    <option value="Cisco" />
                    <option value="DrayTek" />
                    <option value="Ruijie" />
                    <option value="Huawei" />
                    <option value="Ubiquiti" />
                    <option value="pfSense" />
                    <option value="OPNsense" />
                  </>
                ) : (
                  <>
                    <option value="Fortinet" />
                    <option value="Sophos" />
                    <option value="Palo Alto" />
                    <option value="Check Point" />
                    <option value="Cisco Firepower" />
                    <option value="pfSense" />
                    <option value="SonicWall" />
                  </>
                )}
              </datalist>
            </div>
          </div>

          {/* Row 2: Model & IP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Model thiết bị
              </label>
              <input
                type="text"
                list="gateway-model-suggestions"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={isRouter ? 'CCR2004-16G-2S+, RB750Gr3...' : 'FortiGate 100F, XGS 2100...'}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <datalist id="gateway-model-suggestions">
                {isRouter ? (
                  <>
                    <option value="CCR2004-16G-2S+" />
                    <option value="CCR1036-8G-2S+" />
                    <option value="RB750Gr3 (hEX)" />
                    <option value="RB5009UG+S+IN" />
                    <option value="Vigor 2927" />
                    <option value="Vigor 3910" />
                    <option value="Cisco ISR 4331" />
                    <option value="RG-EG3250" />
                  </>
                ) : (
                  <>
                    <option value="FortiGate 100F" />
                    <option value="FortiGate 60F" />
                    <option value="FortiGate 200F" />
                    <option value="Sophos XGS 2100" />
                    <option value="Sophos XGS 136" />
                    <option value="Palo Alto PA-440" />
                    <option value="Quantum Spark 1600" />
                  </>
                )}
              </datalist>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Địa chỉ IP Quản trị (Mgmt)
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder={isRouter ? '192.168.1.1' : '10.0.1.1'}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold font-mono text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Row 3: MAC Address & Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Địa chỉ MAC
              </label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(formatMacAddress(e.target.value))}
                placeholder="AA:BB:CC:DD:EE:FF"
                maxLength={17}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold font-mono text-slate-800 dark:text-slate-100 uppercase outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Zone (Khu vực đặt thiết bị)
              </label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="Server Room / MDF"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Row 4: Port Configuration (RJ45, SFP, Uplink/Stack, Combo) */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <i className="fas fa-ethernet text-indigo-500 text-xs" />
              <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                Cấu hình Port thiết bị
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="fw-input-ports" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Tổng số Port (RJ45)
                </label>
                <input
                  id="fw-input-ports"
                  type="number"
                  min="1"
                  max="128"
                  value={ports}
                  onChange={(e) => setPorts(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="fw-input-sfp-ports" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Số cổng SFP
                </label>
                <input
                  id="fw-input-sfp-ports"
                  type="number"
                  min="0"
                  max="64"
                  value={sfpPorts}
                  onChange={(e) => setSfpPorts(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="fw-input-uplink-port" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Cổng Uplink/Stack
                </label>
                <input
                  id="fw-input-uplink-port"
                  type="number"
                  min="1"
                  max="128"
                  value={uplinkPort}
                  onChange={(e) => setUplinkPort(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fw-input-hybrid-count" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Số cổng Combo (Đồng / Quang dùng chung)
              </label>
              <input
                id="fw-input-hybrid-count"
                type="number"
                min="0"
                max="32"
                value={hybridPortCount}
                onChange={(e) => setHybridPortCount(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 transition-all"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Cổng combo là các cổng cuối trong dải RJ45, có thể chọn dùng Đồng hoặc Quang cho từng cổng — không cộng thêm vào tổng số port.
              </p>
            </div>
          </div>

          {/* Firewall HA Cluster options */}
          {!isRouter && (
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <i className="fas fa-server text-rose-500 text-xs" />
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Chế độ dự phòng HA (High Availability / Cluster)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Chế độ HA</label>
                  <select
                    value={haMode}
                    onChange={(e) => setHaMode(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  >
                    <option value="standalone">Standalone (Đơn chiếc)</option>
                    <option value="active-passive">Active - Passive (A-P)</option>
                    <option value="active-active">Active - Active (A-A)</option>
                  </select>
                </div>
                {haMode !== 'standalone' && (
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">IP Node dự phòng (Peer IP)</label>
                    <input
                      type="text"
                      value={haPeerIp}
                      onChange={(e) => setHaPeerIp(e.target.value)}
                      placeholder="10.0.1.2"
                      className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-800 dark:text-slate-100 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Core Switch LAN Connection */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <i className="fas fa-network-wired text-indigo-500 text-xs" />
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Kết nối LAN xuống Core Switch (Uplink)
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-2xs">
                {[
                  { id: 'copper', label: 'Port Đồng', icon: 'fa-ethernet' },
                  { id: 'fiber', label: 'Port Quang', icon: 'fa-bolt' },
                  { id: 'combo', label: 'Combo', icon: 'fa-random' }
                ].map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setLanUplinkMediaType(pt.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      lanUplinkMediaType === pt.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    <i className={`fas ${pt.icon} text-[8px]`} />
                    <span>{pt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                  Port {isRouter ? 'Router' : 'Firewall'}
                </label>
                <input
                  type="text"
                  value={lanUplinkLocalPort}
                  onChange={(e) => setLanUplinkLocalPort(e.target.value)}
                  placeholder={lanUplinkMediaType === 'fiber' ? 'sfp-sfpplus1' : (isRouter ? 'ether1' : 'port1')}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-800 dark:text-slate-100 outline-none"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Chọn Core Switch</label>
                <select
                  value={lanUplinkTarget}
                  onChange={(e) => setLanUplinkTarget(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                >
                  <option value="">— Chưa kết nối Core Switch —</option>
                  {coreSwitches.map((cs) => (
                    <option key={cs.id} value={cs.id}>
                      {cs.label}
                    </option>
                  ))}
                </select>
                {coreSwitches.length === 0 && (
                  <p className="text-[10px] text-amber-500 dark:text-amber-400 font-bold mt-1">
                    ⚠️ Chưa có Switch nào được đánh dấu là Core Switch trong hệ thống!
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Port Core SW</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  value={lanUplinkPort}
                  onChange={(e) => setLanUplinkPort(e.target.value)}
                  placeholder="1 - 48"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-800 dark:text-slate-100 outline-none"
                />
              </div>
            </div>

            {lanUplinkMediaType === 'combo' && (
              <div className="flex items-center gap-3 p-2 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                  ⚡ Chế độ Cổng Combo:
                </span>
                <label className="flex items-center gap-1 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200">
                  <input
                    type="radio"
                    name="comboMediaMode"
                    value="copper"
                    checked={lanUplinkComboMode !== 'fiber'}
                    onChange={() => setLanUplinkComboMode('copper')}
                  />
                  <span>Ưu tiên Đồng (RJ45)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200 ml-2">
                  <input
                    type="radio"
                    name="comboMediaMode"
                    value="fiber"
                    checked={lanUplinkComboMode === 'fiber'}
                    onChange={() => setLanUplinkComboMode('fiber')}
                  />
                  <span>Ưu tiên Quang (SFP)</span>
                </label>
              </div>
            )}
          </div>

          {/* WAN Links */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fas fa-globe text-sky-500 text-xs" />
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Đường truyền Internet (WAN / ISP)
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddWanLine}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <i className="fas fa-plus-circle text-xs" />
                <span>+ Thêm WAN</span>
              </button>
            </div>

            {wanLinks.map((line, idx) => (
              <div
                key={line.id || idx}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl grid grid-cols-12 gap-2 items-center"
              >
                <div className="col-span-4">
                  <input
                    type="text"
                    value={line.isp || ''}
                    onChange={(e) => handleUpdateWanLine(line.id, 'isp', e.target.value)}
                    placeholder="Viettel / VNPT / FPT"
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={line.ip || ''}
                    onChange={(e) => handleUpdateWanLine(line.id, 'ip', e.target.value)}
                    placeholder="IP Tĩnh (Static IP)"
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="text"
                    value={line.notes || ''}
                    onChange={(e) => handleUpdateWanLine(line.id, 'notes', e.target.value)}
                    placeholder="Gói 500M..."
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 outline-none"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveWanLine(line.id)}
                    className="w-7 h-7 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-500 transition-colors flex items-center justify-center cursor-pointer"
                    title="Xóa đường WAN này"
                  >
                    <i className="fas fa-trash-alt text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Ghi chú cấu hình
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thông tin tài khoản PPPoE, VLAN WAN, quy tắc định tuyến..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          {/* Backup & Change Logs Section (when editing) */}
          {mode === 'edit' && fw && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Sao lưu cấu hình (Backup)
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {fw.backup ? `Đã sao lưu: ${fw.backup.date || '—'} (${fw.backup.status === 'ok' ? '✅ Thành công' : '❌ Thất bại'})` : 'Chưa có bản ghi sao lưu'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBackupEditModal(true)}
                    className="px-3 py-1.5 text-[10px] font-black bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-all cursor-pointer"
                  >
                    <i className="fas fa-cloud-upload-alt mr-1" /> Cập nhật Backup
                  </button>
                  {fw.backup?.logs && fw.backup.logs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowBackupHistoryModal(true)}
                      className="px-3 py-1.5 text-[10px] font-black bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-all cursor-pointer"
                    >
                      <i className="fas fa-history mr-1" /> Lịch sử
                    </button>
                  )}
                </div>
              </div>

              {fw.logs && fw.logs.length > 0 && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Lịch sử thay đổi gần đây
                  </span>
                  <div className="max-h-28 overflow-y-auto custom-scroll space-y-1 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-[10px]">
                    {fw.logs.slice(0, 10).map((log, lIdx) => (
                      <div key={lIdx} className="flex items-start justify-between text-slate-600 dark:text-slate-300">
                        <span className="font-mono text-slate-400 mr-2 shrink-0">{log.time}</span>
                        <span className="flex-1 font-medium">{log.msg}</span>
                        {log.user && <span className="text-slate-400 font-bold ml-2">@{log.user}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            {isAdmin && mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <i className="fas fa-trash-alt" />
                <span>Xóa {isRouter ? 'Router' : 'Firewall'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Hủy
            </button>
            {isAdmin ? (
              <button
                type="button"
                onClick={handleSave}
                className={`px-5 py-2 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                  isRouter
                    ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/30'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30'
                }`}
              >
                <i className="fas fa-check" />
                <span>{isRouter ? 'Lưu Router' : 'Lưu Firewall'}</span>
              </button>
            ) : (
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                <i className="fas fa-lock" />
                <span>Chế độ chỉ đọc</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-modals for Backup */}
      {showBackupEditModal && fw && (
        <EditBackupModal
          sw={fw}
          onClose={() => setShowBackupEditModal(false)}
          onSave={(backupData) => {
            if (saveFirewallBackup) {
              saveFirewallBackup(fw.id, backupData);
            }
            if (addGlobalLog) {
              addGlobalLog(
                `Backup · ${fw.name}`,
                `Cập nhật backup: ${backupData.status === 'ok' ? 'Thành công' : 'Thất bại'} (${backupData.configFile || 'no file'})`,
                username
              );
            }
            setShowBackupEditModal(false);
          }}
        />
      )}

      {showBackupHistoryModal && fw && (
        <BackupHistoryModal sw={fw} onClose={() => setShowBackupHistoryModal(false)} />
      )}
    </div>
  );
}

// Chunks compatibility alias
export const u = FirewallManageModal;
export default FirewallManageModal;
