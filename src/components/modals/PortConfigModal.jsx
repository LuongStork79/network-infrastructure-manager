import React, { useState } from '../../core/react-adapter.js';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { formatMacAddress } from '../../utils/elevator.js';
import {
  getPortKindAndConnection,
  getDownlinks,
  DEVICE_ICONS,
  VLANS,
  addOrUpdatePortConnection,
  removePortConnection,
  appendGlobalLog,
  isSfpPort,
  isComboPort,
  getComboPortMedia
} from '../../utils/networkUtils.js';

export function PortConfigModal({
  sw,
  port,
  db = [],
  username = 'admin',
  canEdit = true,
  onSave,
  onClose,
  onNavigateToSwitch,
  initialIcon
}) {
  const showDialog = useDialogStore((state) => state.showDialog);

  const downlinks = getDownlinks(sw.id, db);
  const portKindInfo = getPortKindAndConnection(sw, port, downlinks);
  const existingConn = portKindInfo.connection;

  // Determine initial port physical media type
  const isDefaultSfp = isSfpPort(sw, port);
  const isDefaultCombo = isComboPort(sw, port);
  const currentComboMedia = getComboPortMedia(sw, port);

  const [portMediaType, setPortMediaType] = useState(() => {
    if (existingConn?.mediaType) return existingConn.mediaType;
    if (sw.hybridPorts?.[String(port)]?.isSfp) return 'fiber';
    if (isDefaultCombo || sw.hybridPorts?.[String(port)]) return 'combo';
    if (isDefaultSfp) return 'fiber';
    return 'copper';
  });

  const [comboActiveMedia, setComboActiveMedia] = useState(() => {
    return existingConn?.comboActiveMedia || sw.hybridPorts?.[String(port)]?.media || currentComboMedia || 'copper';
  });

  const [opticalSpeed, setOpticalSpeed] = useState(() => {
    return existingConn?.opticalSpeed || sw.hybridPorts?.[String(port)]?.speed || (sw.isCore ? '10G' : '1G');
  });

  const [opticalFiberType, setOpticalFiberType] = useState(() => {
    return existingConn?.opticalFiberType || 'single-mode';
  });

  const [opticalNote, setOpticalNote] = useState(() => {
    return existingConn?.opticalNote || sw.hybridPorts?.[String(port)]?.note || '';
  });

  const [vlan, setVlan] = useState(existingConn?.v != null ? String(existingConn.v) : '1');
  const [name, setName] = useState(existingConn?.n ?? '');
  const [ip, setIp] = useState(existingConn?.ip ?? '');
  const [mac, setMac] = useState(existingConn?.mac ?? '');
  const [icon, setIcon] = useState(existingConn?.icon || initialIcon || 'fa-desktop');
  const [status, setStatus] = useState(existingConn?.status ?? 'active');
  const [nvr, setNvr] = useState(existingConn?.nvr ?? '');
  const [channel, setChannel] = useState(existingConn?.ch != null ? String(existingConn.ch) : '');
  const [camType, setCamType] = useState(existingConn?.camType ?? '');

  const isCamera = icon === 'fa-video';
  const vlanNum = parseInt(vlan, 10) || 0;

  const rackIndex = db.findIndex((rack) => rack.switches?.some((s) => s.id === sw.id));

  const handleSave = () => {
    const devName = name.trim();
    if (!devName) {
      showDialog('Vui lòng nhập tên thiết bị hoặc mô tả cổng!', 'error');
      return;
    }
    if (vlanNum <= 0) {
      showDialog('VLAN không hợp lệ!', 'error');
      return;
    }

    const chNum = parseInt(channel, 10);
    const connData = {
      p: port,
      v: vlanNum,
      n: devName,
      status,
      icon,
      mediaType: portMediaType,
      ...(portMediaType === 'combo' && { comboActiveMedia }),
      ...((portMediaType === 'fiber' || (portMediaType === 'combo' && comboActiveMedia === 'fiber')) && {
        opticalSpeed,
        opticalFiberType,
        opticalNote: opticalNote.trim()
      }),
      ...(ip.trim() && { ip: ip.trim() }),
      ...(mac.trim() && { mac: mac.trim() }),
      ...(isCamera && nvr.trim() && { nvr: nvr.trim() }),
      ...(isCamera && !isNaN(chNum) && { ch: chNum }),
      ...(isCamera && camType.trim() && { camType: camType.trim() })
    };

    const newConns = addOrUpdatePortConnection(sw.conns || [], connData);

    // Update switch hybridPorts dictionary to remember media configuration
    const updatedHybridPorts = { ...(sw.hybridPorts || {}) };
    if (portMediaType === 'combo') {
      updatedHybridPorts[String(port)] = {
        media: comboActiveMedia,
        note: opticalNote.trim() || `Cổng Combo ${port} (${comboActiveMedia === 'fiber' ? 'Quang SFP' : 'Đồng RJ45'})`
      };
    } else if (portMediaType === 'fiber') {
      updatedHybridPorts[String(port)] = {
        media: 'fiber',
        isSfp: true,
        speed: opticalSpeed,
        note: opticalNote.trim() || `Port Quang SFP ${port}`
      };
    } else {
      updatedHybridPorts[String(port)] = {
        media: 'copper',
        note: ''
      };
    }

    const updatedSw = {
      ...sw,
      conns: newConns,
      hybridPorts: updatedHybridPorts,
      logs: appendGlobalLog(
        sw.logs,
        `Cấu hình Port ${port} [${portMediaType === 'fiber' ? 'Quang SFP' : portMediaType === 'combo' ? 'Combo' : 'Đồng'}]: ${devName} (VLAN ${vlanNum})`,
        username
      )
    };

    onSave(rackIndex, updatedSw);
    onClose();
  };

  const handleDelete = () => {
    showDialog(`Xóa kết nối thiết bị tại Port ${port}?`, 'confirm', () => {
      const newConns = removePortConnection(sw.conns || [], port);
      const updatedSw = {
        ...sw,
        conns: newConns,
        logs: appendGlobalLog(sw.logs, `Xóa cấu hình thiết bị Port ${port}`, username)
      };
      onSave(rackIndex, updatedSw);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[250] flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-[560px] max-w-[calc(100vw-24px)] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        style={{ width: 560, maxWidth: 'calc(100vw - 24px)', maxHeight: '92vh' }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-xs font-black font-mono shadow-sm">
              P{port}
            </span>
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                {sw.name} · Cổng {port}
              </h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">
                {portKindInfo.kind === 'uplink'
                  ? 'Đường kết nối Uplink (Cáp trục)'
                  : portKindInfo.kind === 'downlink'
                    ? 'Đường kết nối Downlink (Tới Switch con)'
                    : 'Cổng Access / Cấu hình thiết bị'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <i className="fas fa-times text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scroll space-y-4 flex-1">
          {/* Section: Loại cổng vật lý (Port Physical Type: Đồng / Quang / Combo) */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <i className="fas fa-microchip text-indigo-500" /> Loại cổng vật lý & Phương tiện
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {portMediaType === 'fiber' ? 'Quang SFP' : portMediaType === 'combo' ? 'Combo' : 'Đồng RJ45'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPortMediaType('copper')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  portMediaType === 'copper'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-sm font-black'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400 font-bold'
                }`}
              >
                <i className="fas fa-ethernet text-sm" />
                <span className="text-[10px]">Port Đồng</span>
                <span className="text-[8px] text-slate-400">RJ45 / Cat6</span>
              </button>

              <button
                type="button"
                onClick={() => setPortMediaType('fiber')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  portMediaType === 'fiber'
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 shadow-sm font-black'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400 font-bold'
                }`}
              >
                <i className="fas fa-bolt text-sm text-purple-500" />
                <span className="text-[10px]">Port Quang</span>
                <span className="text-[8px] text-slate-400">SFP / SFP+</span>
              </button>

              <button
                type="button"
                onClick={() => setPortMediaType('combo')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  portMediaType === 'combo'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-sm font-black'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400 font-bold'
                }`}
              >
                <i className="fas fa-shuffle text-sm text-amber-500" />
                <span className="text-[10px]">Port Combo</span>
                <span className="text-[8px] text-slate-400">Đồng/Quang</span>
              </button>
            </div>

            {/* Sub-config for Combo Port */}
            {portMediaType === 'combo' && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Chế độ cổng Combo đang dùng:
                </span>
                <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setComboActiveMedia('copper')}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      comboActiveMedia === 'copper'
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    🔌 Dùng Đồng (RJ45)
                  </button>
                  <button
                    type="button"
                    onClick={() => setComboActiveMedia('fiber')}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      comboActiveMedia === 'fiber'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    ⚡ Dùng Quang (SFP)
                  </button>
                </div>
              </div>
            )}

            {/* Sub-config for Optical/Fiber parameters */}
            {(portMediaType === 'fiber' || (portMediaType === 'combo' && comboActiveMedia === 'fiber')) && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Tốc độ cổng quang</label>
                  <select
                    value={opticalSpeed}
                    onChange={(e) => setOpticalSpeed(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  >
                    <option value="1G">1G (SFP standard)</option>
                    <option value="10G">10G (SFP+ high-speed)</option>
                    <option value="25G">25G (SFP28)</option>
                    <option value="100M">100Mbps (Fast Ethernet)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Loại sợi quang</label>
                  <select
                    value={opticalFiberType}
                    onChange={(e) => setOpticalFiberType(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  >
                    <option value="single-mode">Single-mode (SM 1310/1550nm)</option>
                    <option value="multi-mode">Multi-mode (MM 850nm)</option>
                    <option value="bidi">BiDi (WDM 1 sợi LC)</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Ghi chú quang / Vị trí nối ODF</label>
                  <input
                    type="text"
                    value={opticalNote}
                    onChange={(e) => setOpticalNote(e.target.value)}
                    placeholder="VD: Cáp quang tới ODF-02 Tầng 1 (Port 1-2)"
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Special banners for Uplink / Downlink */}
          {portKindInfo.kind === 'uplink' && (
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 rounded-xl space-y-1">
              <span className="text-xs font-black text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                <i className="fas fa-arrow-up" /> Cổng Uplink chính
              </span>
              <p className="text-xs text-indigo-700 dark:text-indigo-400">
                Cổng này đang được dùng làm đường Uplink trục nối lên Switch cha.
              </p>
              <div className="mt-1 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Loại cáp: <b>{sw.uplinkType}</b> · Tốc độ: <b>{sw.uplinkSpeed}</b>
              </div>
            </div>
          )}

          {portKindInfo.kind === 'downlink' && (
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800 rounded-xl space-y-2">
              <span className="text-xs font-black text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <i className="fas fa-arrow-down" /> Cổng Downlink
              </span>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                Cổng này đang kết nối trực tiếp xuống Switch con: <b>{portKindInfo.downlinkChildName}</b>
              </p>
              {onNavigateToSwitch && (
                <button
                  type="button"
                  onClick={() => {
                    onNavigateToSwitch(portKindInfo.downlinkChildId);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <i className="fas fa-external-link-alt mr-1.5" /> Chuyển tới Switch con
                </button>
              )}
            </div>
          )}

          {/* Client Connection configuration */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1.5">
              Loại thiết bị kết nối
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DEVICE_ICONS.map((item) => (
                <button
                  key={item.icon}
                  type="button"
                  disabled={!canEdit}
                  onClick={() => setIcon(item.icon)}
                  className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    icon === item.icon
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className={`fas ${item.icon} text-sm`} />
                  <span className="text-[10px] font-bold truncate max-w-full">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
                Tên thiết bị / Mô tả *
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="PC-Admin, Cam-Gate01, AP-Lobby..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
                Trạng thái cổng
              </label>
              <select
                disabled={!canEdit}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
              >
                <option value="active">🟢 Active (Hoạt động)</option>
                <option value="shutdown">⚫ Shutdown (Tắt cổng)</option>
                <option value="err-disabled">🔴 Err-Disabled (Lỗi)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
                Địa chỉ IP
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="10.x.x.x"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-800 dark:text-slate-100 outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
                Địa chỉ MAC
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={mac}
                onChange={(e) => setMac(formatMacAddress(e.target.value))}
                placeholder="AA:BB:CC:DD:EE:FF"
                maxLength={17}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-800 dark:text-slate-100 uppercase outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
              VLAN truy cập
            </label>
            <input
              type="number"
              min="1"
              max="4094"
              disabled={!canEdit}
              value={vlan}
              onChange={(e) => setVlan(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>

          {/* Camera specific attributes */}
          {isCamera && (
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800 rounded-xl space-y-2">
              <span className="text-xs font-black text-teal-800 dark:text-teal-300">
                Thông số Camera CCTV
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Đầu ghi NVR</label>
                  <input
                    type="text"
                    value={nvr}
                    onChange={(e) => setNvr(e.target.value)}
                    placeholder="NVR-01"
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Kênh (CH)</label>
                  <input
                    type="number"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="1"
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Kiểu dáng</label>
                  <select
                    value={camType}
                    onChange={(e) => setCamType(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
                  >
                    <option value="">— Mặc định —</option>
                    <option value="dome">Dome</option>
                    <option value="bullet">Bullet</option>
                    <option value="ptz">PTZ</option>
                    <option value="turret">Turret</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            {existingConn && canEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <i className="fas fa-trash-alt" />
                <span>Xóa kết nối Port</span>
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
            {canEdit && (
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="fas fa-check" />
                <span>Lưu cấu hình Port</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Chunks compatibility alias
export const g = PortConfigModal;
export default PortConfigModal;
