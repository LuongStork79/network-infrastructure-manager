import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { formatMacAddress } from '../../utils/elevator.js';
import {
  getPortKindAndConnection,
  getDownlinks,
  DEVICE_ICONS,
  VLANS,
  addOrUpdatePortConnection,
  removePortConnection,
  appendGlobalLog
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
  const vlanConfig = VLANS[vlanNum];

  const rackIndex = db.findIndex((rack) => rack.switches?.some((s) => s.id === sw.id));

  const handleSave = () => {
    const devName = name.trim();
    if (!devName) {
      showDialog('Vui lòng nhập tên thiết bị!', 'error');
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
      ...(ip.trim() && { ip: ip.trim() }),
      ...(mac.trim() && { mac: mac.trim() }),
      ...(isCamera && nvr.trim() && { nvr: nvr.trim() }),
      ...(isCamera && !isNaN(chNum) && { ch: chNum }),
      ...(isCamera && camType.trim() && { camType: camType.trim() })
    };

    const newConns = addOrUpdatePortConnection(sw.conns || [], connData);
    const updatedSw = {
      ...sw,
      conns: newConns,
      logs: appendGlobalLog(
        sw.logs,
        `Cấu hình Port ${port}: ${devName} (VLAN ${vlanNum})`,
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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[500px] max-w-full shadow-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black font-mono">
              P{port}
            </span>
            <div>
              <h3 className="text-sm font-black text-slate-800">
                {sw.name} · Cổng {port}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                {portKindInfo.kind === 'uplink'
                  ? 'Đường kết nối Uplink (Cáp trục)'
                  : portKindInfo.kind === 'downlink'
                    ? 'Đường kết nối Downlink (Tới Switch con)'
                    : 'Cổng Access (Thiết bị đầu cuối)'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scroll space-y-4">
          {portKindInfo.kind === 'uplink' && (
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2">
              <span className="text-xs font-black text-indigo-900 flex items-center gap-2">
                <i className="fas fa-arrow-up" /> Cổng Uplink
              </span>
              <p className="text-xs text-indigo-700">
                Cổng này đang được cấu hình làm đường Uplink chính lên Switch cha.
              </p>
              <div className="mt-2 text-xs font-medium text-slate-600">
                Loại cáp: <b>{sw.uplinkType}</b> · Tốc độ: <b>{sw.uplinkSpeed}</b>
              </div>
            </div>
          )}

          {portKindInfo.kind === 'downlink' && (
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl space-y-3">
              <span className="text-xs font-black text-purple-900 flex items-center gap-2">
                <i className="fas fa-arrow-down" /> Cổng Downlink
              </span>
              <p className="text-xs text-purple-700">
                Cổng này đang kết nối trực tiếp đến Switch con: <b>{portKindInfo.downlinkChildName}</b>
              </p>
              {onNavigateToSwitch && (
                <button
                  type="button"
                  onClick={() => {
                    onNavigateToSwitch(portKindInfo.downlinkChildId);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-1.5" /> Chuyển tới Switch con
                </button>
              )}
            </div>
          )}

          {portKindInfo.kind !== 'uplink' && portKindInfo.kind !== 'downlink' && (
            <>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Loại thiết bị
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {DEVICE_ICONS.map((item) => (
                    <button
                      key={item.icon}
                      type="button"
                      disabled={!canEdit}
                      onClick={() => setIcon(item.icon)}
                      className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        icon === item.icon
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <i className={`fas ${item.icon} text-sm`} />
                      <span className="text-[10px] font-bold truncate max-w-full">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Tên thiết bị *
                </label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="PC-Admin, Cam-Gate01, AP-Lobby..."
                  className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    VLAN mạng
                  </label>
                  <select
                    disabled={!canEdit}
                    value={vlan}
                    onChange={(e) => setVlan(e.target.value)}
                    className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
                  >
                    {Object.entries(VLANS).map(([vId, vConf]) => (
                      <option key={vId} value={vId}>
                        VLAN {vId} ({vConf.name})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Trạng thái cổng
                  </label>
                  <select
                    disabled={!canEdit}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
                  >
                    <option value="active">Active (Hoạt động)</option>
                    <option value="shutdown">Shutdown (Tắt cổng)</option>
                    <option value="err-disabled">Err-Disabled (Lỗi)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Địa chỉ IP
                  </label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder={vlanConfig?.subnet?.replace(/\.0\/\d+/, '.x') || '10.x.x.x'}
                    className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Địa chỉ MAC
                  </label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={mac}
                    onChange={(e) => setMac(formatMacAddress(e.target.value))}
                    placeholder="AA:BB:CC:DD:EE:FF"
                    className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none"
                  />
                </div>
              </div>

              {isCamera && (
                <div className="p-3 bg-red-50/50 border border-red-200 rounded-xl space-y-3">
                  <span className="text-[11px] font-black text-red-700 flex items-center gap-1.5">
                    <i className="fas fa-video" /> Thông số Camera CCTV
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">NVR Gán</label>
                      <input
                        type="text"
                        value={nvr}
                        onChange={(e) => setNvr(e.target.value)}
                        placeholder="NVR-01"
                        className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Kênh (CH)</label>
                      <input
                        type="number"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        placeholder="1 - 64"
                        className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Loại Cam</label>
                      <select
                        value={camType}
                        onChange={(e) => setCamType(e.target.value)}
                        className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                      >
                        <option value="">-- Loại --</option>
                        <option value="Dome">Dome</option>
                        <option value="Bullet">Bullet</option>
                        <option value="PTZ">PTZ</option>
                        <option value="Turret">Turret</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {existingConn && canEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
            >
              <i className="fas fa-trash-alt mr-1.5" /> Gỡ kết nối
            </button>
          ) : <div />}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors"
            >
              Đóng
            </button>
            {canEdit && portKindInfo.kind !== 'uplink' && portKindInfo.kind !== 'downlink' && (
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
              >
                <i className="fas fa-save" /> Lưu Port
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortConfigModal;
