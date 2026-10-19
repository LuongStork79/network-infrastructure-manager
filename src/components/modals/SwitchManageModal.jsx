import React, { useState, useEffect } from '../../core/react-adapter.js';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';
import { formatMacAddress } from '../../utils/elevator.js';
import {
  validateSwitchUplink,
  getAvailableUplinkSwitches,
  brandColors
} from '../../utils/networkUtils.js';
import {
  getAllBrandNames,
  getBrandColor,
  addCustomBrand,
  deleteBrand
} from '../../services/brandManager.js';
import { getActiveProject, getActiveProjectId } from '../../services/projectManager.js';

export function getComboPorts(totalPorts, comboCount) {
  if (comboCount <= 0) return [];
  const n = Math.min(comboCount, totalPorts);
  return Array.from({ length: n }, (_, i) => totalPorts - n + 1 + i).filter((p) => p > 0);
}

export default function SwitchManageModal({
  mode = 'add',
  sw = null,
  db = [],
  username = 'admin',
  isAdmin = true,
  onSave,
  onDelete,
  onClose
}) {
  const showDialog = useDialogStore((state) => state.showDialog);
  const gponFrames = useNetworkStore((state) => state.GponFrameDB);
  const firewallDB = useNetworkStore((state) => state.FirewallDB || []);
  const saveFirewall = useNetworkStore((state) => state.saveFirewall);
  const deleteFirewall = useNetworkStore((state) => state.deleteFirewall);
  const deleteSwitch = useNetworkStore((state) => state.deleteSwitch);
  const deleteFloor = useNetworkStore((state) => state.deleteFloor);

  // Device Type: 'switch' | 'router' | 'firewall' | 'other'
  const [deviceType, setDeviceType] = useState(() => {
    if (sw?.deviceType) return sw.deviceType;
    if (sw?.isRouter || (sw?.name && sw.name.toLowerCase().includes('router'))) return 'router';
    if (sw?.isFirewall || (sw?.name && sw.name.toLowerCase().includes('firewall'))) return 'firewall';
    return 'switch';
  });

  const initialRackIndex = sw
    ? db.findIndex((rack) => rack.switches?.some((s) => s.id === sw.id))
    : 0;

  const [rackIndex, setRackIndex] = useState(Math.max(initialRackIndex, 0));
  const [isAddingFloor, setIsAddingFloor] = useState(() => !db || db.length === 0);
  const [newFloorInput, setNewFloorInput] = useState('');

  // Brand states
  const [brand, setBrand] = useState(sw?.brand ?? (deviceType === 'router' ? 'Cisco' : (deviceType === 'firewall' ? 'Fortinet' : 'Cisco')));
  const [availableBrands, setAvailableBrands] = useState(() => {
    const all = getAllBrandNames();
    if (sw?.brand && !all.includes(sw.brand)) all.push(sw.brand);
    return all;
  });
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandInput, setNewBrandInput] = useState('');

  // Switch fields
  const [isCore, setIsCore] = useState(sw?.isCore ?? false);
  const [name, setName] = useState(() => {
    if (sw?.name) return sw.name;
    if (deviceType === 'router') return 'RT-Gateway-01';
    if (deviceType === 'firewall') return 'FW-Core-01';
    return 'SW-01';
  });
  const [mac, setMac] = useState(sw?.mac ?? '');
  const [ip, setIp] = useState(() => {
    if (sw?.ip) return sw.ip;
    if (deviceType === 'router') return '10.0.0.1';
    if (deviceType === 'firewall') return '10.0.1.1';
    return '10.195.32.10';
  });
  const [zone, setZone] = useState(sw?.zone ?? 'Server Room');
  const [model, setModel] = useState(() => {
    if (sw?.model) return sw.model;
    if (deviceType === 'router') return 'ISR 4331';
    if (deviceType === 'firewall') return 'FortiGate 100F';
    return 'Catalyst 9200';
  });

  // Ports configuration
  const [ports, setPorts] = useState(String(sw?.ports ?? (deviceType === 'router' ? 8 : 24)));
  const [sfpPorts, setSfpPorts] = useState(String(sw?.sfpPorts ?? (deviceType === 'router' ? 2 : 4)));
  const [hybridPortCount, setHybridPortCount] = useState(String(sw?.hybridPortCount ?? 0));
  const [hybridPorts, setHybridPorts] = useState(sw?.hybridPorts ?? {});
  const [uplinkPort, setUplinkPort] = useState(String(sw?.uplinkPort ?? (deviceType === 'router' ? 1 : 24)));

  // WAN Uplink Configuration (for Router, Firewall, or WAN uplink)
  const [wanPort, setWanPort] = useState(String(sw?.wanPort || 1));
  const [wanIsp, setWanIsp] = useState(sw?.wanLinks?.[0]?.isp || sw?.wanLines?.[0]?.isp || 'VNPT Fiber 500M');
  const [wanIp, setWanIp] = useState(sw?.wanLinks?.[0]?.ip || sw?.wanLines?.[0]?.ip || '14.161.20.10');
  const [wanGateway, setWanGateway] = useState(sw?.wanGateway || '14.161.20.1');
  const [wanNotes, setWanNotes] = useState(sw?.wanLinks?.[0]?.notes || sw?.wanLines?.[0]?.notes || 'Đường truyền Gateway chính');

  // LAN Uplink Target
  const [uplinkTarget, setUplinkTarget] = useState(sw?.uplinkTarget ?? (sw?.lanUplinkTarget || 'none'));
  const [targetPort, setTargetPort] = useState(String(sw?.targetPort ?? (sw?.lanUplinkPort || 1)));
  const [uplinkType, setUplinkType] = useState(sw?.uplinkType ?? 'Fiber');
  const [uplinkSpeed, setUplinkSpeed] = useState(sw?.uplinkSpeed ?? '10G');

  // Available uplink switches in system
  const availableUplinks = getAvailableUplinkSwitches(db, sw?.id ?? null);
  // Add firewalls/routers to available uplink targets so switches can connect to Router/Firewall
  const allUplinkTargets = [
    ...availableUplinks,
    ...firewallDB
      .filter((fw) => fw.id !== sw?.id)
      .map((fw) => ({
        id: fw.id,
        label: `[${fw.deviceType === 'router' ? 'Router' : 'Firewall'}] ${fw.name} (${fw.ip || '—'})`
      }))
  ];

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

  const handleDeviceTypeChange = (newType) => {
    setDeviceType(newType);
    if (newType === 'router') {
      setIsCore(false);
      if (!name || name === 'SW-01' || name === 'FW-Core-01') setName('RT-Gateway-01');
      if (!ip || ip === '10.195.32.10' || ip === '10.0.1.1') setIp('10.0.0.1');
      if (!model || model === 'Catalyst 9200' || model === 'FortiGate 100F') setModel('ISR 4331');
      setPorts('8');
      setSfpPorts('2');
      setBrand('Cisco');
    } else if (newType === 'firewall') {
      setIsCore(false);
      if (!name || name === 'SW-01' || name === 'RT-Gateway-01') setName('FW-Core-01');
      if (!ip || ip === '10.195.32.10' || ip === '10.0.0.1') setIp('10.0.1.1');
      if (!model || model === 'Catalyst 9200' || model === 'ISR 4331') setModel('FortiGate 100F');
      setPorts('24');
      setSfpPorts('4');
      setBrand('Fortinet');
    } else if (newType === 'switch') {
      if (!name || name === 'RT-Gateway-01' || name === 'FW-Core-01') setName('SW-01');
      if (!ip || ip === '10.0.0.1' || ip === '10.0.1.1') setIp('10.195.32.10');
      if (!model || model === 'ISR 4331' || model === 'FortiGate 100F') setModel('Catalyst 9200');
      setPorts('24');
      setSfpPorts('4');
      setBrand('Cisco');
    }
  };

  const handleDeleteCurrentFloor = () => {
    if (!db || db.length === 0 || rackIndex < 0 || rackIndex >= db.length) return;
    const targetFloor = db[rackIndex];
    const floorName = targetFloor?.floor;
    if (!floorName) return;
    const swCount = (targetFloor.switches || []).length;

    const confirmMsg = swCount > 0
      ? `Tầng / Vị trí "${floorName}" hiện có ${swCount} switch.\n\nBạn có chắc chắn muốn xóa vị trí này và toàn bộ ${swCount} thiết bị thuộc tầng?`
      : `Bạn có chắc chắn muốn xóa Tầng / Vị trí "${floorName}"?`;

    showDialog(confirmMsg, 'confirm', () => {
      if (typeof deleteFloor === 'function') {
        deleteFloor(floorName);
      }
      db.splice(rackIndex, 1);
      if (db.length === 0) {
        setIsAddingFloor(true);
        setRackIndex(0);
      } else {
        setRackIndex(Math.max(0, Math.min(rackIndex, db.length - 1)));
      }
      showDialog(`Đã xóa thành công Tầng / Vị trí "${floorName}"!`, 'success');
    });
  };

  const handleSave = () => {
    if (!isAdmin) {
      showDialog('Bạn không có quyền thực hiện thao tác này! Vui lòng liên hệ quản trị viên.', 'error');
      return;
    }

    const swName = name.trim();
    if (!swName) {
      showDialog('Vui lòng nhập tên thiết bị!', 'error');
      return;
    }

    const upPort = parseInt(uplinkPort, 10) || 0;
    const tgtPort = parseInt(targetPort, 10) || 0;
    const totalP = parseInt(ports, 10);
    const sfpP = parseInt(sfpPorts, 10);
    const comboP = parseInt(hybridPortCount, 10);
    const finalPorts = Number.isNaN(totalP) ? 24 : totalP;
    const finalCombo = Number.isNaN(comboP) ? 0 : comboP;

    if (finalCombo > finalPorts) {
      showDialog('Số cổng Combo không được lớn hơn Tổng số Port (RJ45)!', 'error');
      return;
    }

    // Handle Floor resolution
    let finalRackIndex = rackIndex;
    if (isAddingFloor && newFloorInput.trim()) {
      const floorName = newFloorInput.trim();
      const existingIdx = db.findIndex((r) => r.floor?.toLowerCase() === floorName.toLowerCase());
      if (existingIdx !== -1) {
        finalRackIndex = existingIdx;
      } else {
        db.push({ floor: floorName, switches: [] });
        finalRackIndex = db.length - 1;
      }
    }

    const currentFloorName = db[finalRackIndex]?.floor || zone || 'Server Room';

    // 1. ROUTER / FIREWALL SAVING LOGIC
    if (deviceType === 'router' || deviceType === 'firewall') {
      const isRouter = deviceType === 'router';
      const fwObj = {
        id: sw?.id ?? (isRouter ? `router-${Date.now()}` : `fw-${Date.now()}`),
        deviceType: deviceType,
        name: swName,
        brand,
        model: model.trim() || (isRouter ? 'ISR 4331' : 'FortiGate 100F'),
        ip: ip.trim() || (isRouter ? '10.0.0.1' : '10.0.1.1'),
        mgmtIp: ip.trim() || (isRouter ? '10.0.0.1' : '10.0.1.1'),
        mac: mac.trim() || '00:00:00:00:00:00',
        zone: currentFloorName,
        ports: finalPorts,
        totalPorts: finalPorts,
        sfpPorts: Number.isNaN(sfpP) ? 0 : sfpP,
        hybridPortCount: finalCombo,
        hybridPorts,
        uplinkPort: upPort,
        wanPort: Number(wanPort) || 1,
        wanGateway: wanGateway.trim(),
        lanUplinkTarget: uplinkTarget !== 'none' ? uplinkTarget : '',
        lanUplinkPort: tgtPort || null,
        lanUplinkLocalPort: `port${upPort}`,
        lanUplinkMediaType: uplinkType === 'Fiber' ? 'fiber' : 'copper',
        wanLinks: [
          {
            id: 'wan-1',
            isp: wanIsp.trim() || 'VNPT Fiber',
            ip: wanIp.trim() || '14.161.20.10',
            gateway: wanGateway.trim(),
            notes: wanNotes.trim() || 'Đường truyền Gateway WAN chính'
          }
        ],
        wanLines: [
          {
            id: 'wan-1',
            isp: wanIsp.trim() || 'VNPT Fiber',
            ip: wanIp.trim() || '14.161.20.10',
            gateway: wanGateway.trim(),
            notes: wanNotes.trim() || 'Đường truyền Gateway WAN chính'
          }
        ],
        notes: isRouter ? 'Router Gateway định tuyến mạng và kết nối WAN' : 'Firewall kiểm soát bảo mật hệ thống và Gateway',
        logs: [
          ...(sw?.logs || []),
          {
            time: new Date().toLocaleTimeString('vi-VN') + ' - ' + new Date().toLocaleDateString('vi-VN'),
            user: username,
            msg: `${mode === 'edit' ? 'Cập nhật' : 'Thêm mới'} ${isRouter ? 'Router' : 'Firewall'} [${swName}]`
          }
        ]
      };

      if (typeof saveFirewall === 'function') {
        saveFirewall(fwObj);
      }

      // If this device was previously a Switch in db, delete it from switches
      if (sw && db.some((f) => (f.switches || []).some((s) => s.id === sw.id))) {
        if (typeof deleteSwitch === 'function') {
          deleteSwitch(sw.id, username);
        }
      }

      showDialog(`Đã lưu thành công ${isRouter ? 'Router Gateway' : 'Firewall'} "${fwObj.name}"!`, 'success');
      onClose();
      return;
    }

    // 2. SWITCH / OTHER SAVING LOGIC
    if (!db || db.length === 0 || finalRackIndex < 0 || finalRackIndex >= db.length) {
      showDialog('Vui lòng nhập hoặc chọn Tầng / Vị trí cho thiết bị!', 'error');
      return;
    }

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

    const validComboSet = new Set(getComboPorts(finalPorts, finalCombo));
    const cleanHybridPorts = Object.fromEntries(
      Object.entries(hybridPorts).filter(([p]) => validComboSet.has(Number(p)))
    );

    const switchData = {
      id: sw?.id ?? `sw-${Date.now()}`,
      deviceType: deviceType,
      isCore,
      name: swName || 'New SW',
      brand,
      mac: mac.trim() || 'N/A',
      ip: ip.trim() || '10.x.x.x',
      model: model.trim() || 'Generic',
      zone: currentFloorName,
      ports: finalPorts,
      sfpPorts: Number.isNaN(sfpP) ? 0 : sfpP,
      hybridPortCount: finalCombo,
      hybridPorts: cleanHybridPorts,
      uplinkPort: upPort,
      uplinkTarget,
      targetPort: tgtPort,
      uplinkType,
      uplinkSpeed,
      color: brandColors[brand] || getBrandColor(brand),
      conns: sw?.conns ?? [],
      logs: sw?.logs ?? [
        {
          time: new Date().toLocaleTimeString('vi-VN') + ' - ' + new Date().toLocaleDateString('vi-VN'),
          user: username,
          msg: `${mode === 'edit' ? 'Chỉnh sửa' : 'Tạo mới'} thiết bị [${swName || 'New SW'}]`
        }
      ]
    };

    // If it was in FirewallDB previously, remove it from FirewallDB
    if (sw && firewallDB.some((fw) => fw.id === sw.id)) {
      if (typeof deleteFirewall === 'function') {
        deleteFirewall(sw.id);
      }
    }

    onSave(finalRackIndex, switchData);
    showDialog(`Đã lưu thành công thiết bị "${switchData.name}"!`, 'success');
    onClose();
  };

  const handleDelete = () => {
    if (!isAdmin) {
      showDialog('Bạn không có quyền thực hiện thao tác này! Vui lòng liên hệ quản trị viên.', 'error');
      return;
    }
    if (!sw) return;

    showDialog(
      `Bạn có chắc chắn muốn xóa thiết bị [${sw.name}]? Tất cả kết nối liên quan sẽ bị ảnh hưởng!`,
      'confirm',
      () => {
        if (sw.deviceType === 'router' || sw.deviceType === 'firewall' || firewallDB.some((f) => f.id === sw.id)) {
          if (typeof deleteFirewall === 'function') {
            deleteFirewall(sw.id);
          }
        } else {
          onDelete(sw.id);
        }
        showDialog(`Đã xóa thiết bị [${sw.name}] thành công!`, 'success');
        onClose();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-[640px] max-w-full shadow-2xl flex flex-col max-h-[92vh] border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-xs ${
              deviceType === 'router'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                : deviceType === 'firewall'
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                : isCore
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
            }`}>
              <i className={`fas ${
                deviceType === 'router'
                  ? 'fa-route'
                  : deviceType === 'firewall'
                  ? 'fa-shield-halved'
                  : isCore
                  ? 'fa-crown'
                  : 'fa-server'
              }`} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
                {mode === 'edit'
                  ? `Chỉnh sửa: ${sw?.name || 'Thiết bị'}`
                  : `Thêm ${deviceType === 'router' ? 'Router Gateway' : deviceType === 'firewall' ? 'Firewall' : 'Switch Mạng'} Mới`}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold">
                Dự án: <span className="text-indigo-600 dark:text-indigo-400 font-black">{getActiveProject()?.name || 'Trung Tâm'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer"
          >
            <i className="fas fa-times text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scroll space-y-4 flex-1">
          
          {/* DEVICE TYPE SELECTOR TABS */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">
              Loại Thiết Bị
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => handleDeviceTypeChange('switch')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  deviceType === 'switch'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <i className="fas fa-server text-[10px]" />
                Switch
              </button>
              <button
                type="button"
                onClick={() => handleDeviceTypeChange('router')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  deviceType === 'router'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <i className="fas fa-route text-[10px]" />
                Router
              </button>
              <button
                type="button"
                onClick={() => handleDeviceTypeChange('firewall')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  deviceType === 'firewall'
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <i className="fas fa-shield-halved text-[10px]" />
                Firewall
              </button>
              <button
                type="button"
                onClick={() => handleDeviceTypeChange('other')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  deviceType === 'other'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <i className="fas fa-microchip text-[10px]" />
                Khác
              </button>
            </div>
          </div>

          {/* WAN Uplink & Internet Section (for Router & Firewall) */}
          {(deviceType === 'router' || deviceType === 'firewall') && (
            <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <i className="fas fa-globe text-blue-600 dark:text-blue-400" />
                  Cấu hình Cổng Uplink tới WAN (Internet)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 uppercase">
                  WAN Link
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
                    Cổng WAN (Port #)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={wanPort}
                    onChange={(e) => setWanPort(e.target.value)}
                    placeholder="1"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
                    Nhà Mạng (ISP)
                  </label>
                  <input
                    type="text"
                    value={wanIsp}
                    onChange={(e) => setWanIsp(e.target.value)}
                    placeholder="VNPT, Viettel, FPT..."
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
                    Địa chỉ IP WAN
                  </label>
                  <input
                    type="text"
                    value={wanIp}
                    onChange={(e) => setWanIp(e.target.value)}
                    placeholder="14.161.20.10"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold font-mono outline-none text-slate-800 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
                    Default Gateway WAN
                  </label>
                  <input
                    type="text"
                    value={wanGateway}
                    onChange={(e) => setWanGateway(e.target.value)}
                    placeholder="14.161.20.1"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold font-mono outline-none text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
                    Ghi chú đường truyền
                  </label>
                  <input
                    type="text"
                    value={wanNotes}
                    onChange={(e) => setWanNotes(e.target.value)}
                    placeholder="Đường truyền chính FTTH 500M"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Location & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Tầng / Vị trí
                </label>
                <div className="flex items-center gap-2">
                  {db && db.length > 0 && !isAddingFloor && (
                    <button
                      type="button"
                      onClick={handleDeleteCurrentFloor}
                      className="text-[10px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer flex items-center gap-1"
                      title="Xóa vị trí đang chọn"
                    >
                      <i className="fas fa-trash-alt text-[9px]" />
                      Xóa vị trí
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsAddingFloor(!isAddingFloor)}
                    className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {isAddingFloor ? '✕ Đóng' : '+ Thêm tầng'}
                  </button>
                </div>
              </div>
              {isAddingFloor ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newFloorInput}
                    onChange={(e) => setNewFloorInput(e.target.value)}
                    placeholder="VD: Tầng 03, Kho A..."
                    className="flex-1 p-2 bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-600 rounded-lg text-xs font-bold outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFloorInput.trim()) {
                        const floorName = newFloorInput.trim();
                        const existingIdx = db.findIndex((r) => r.floor?.toLowerCase() === floorName.toLowerCase());
                        if (existingIdx !== -1) {
                          setRackIndex(existingIdx);
                        } else {
                          db.push({ floor: floorName, switches: [] });
                          setRackIndex(db.length - 1);
                        }
                        setNewFloorInput('');
                        setIsAddingFloor(false);
                      }
                    }}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <select
                  value={rackIndex}
                  onChange={(e) => setRackIndex(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none cursor-pointer text-slate-800 dark:text-white"
                >
                  {db.map((rack, idx) => (
                    <option key={rack.floor || idx} value={idx}>
                      {rack.floor} {rack.switches?.length ? `(${rack.switches.length} sw)` : '(trống)'}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Hãng sản xuất
                </label>
                <button
                  type="button"
                  onClick={() => setIsAddingBrand(!isAddingBrand)}
                  className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  {isAddingBrand ? '✕ Đóng' : '+ Thêm hãng'}
                </button>
              </div>
              {isAddingBrand ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newBrandInput}
                    onChange={(e) => setNewBrandInput(e.target.value)}
                    placeholder="Tên hãng mới..."
                    className="flex-1 p-2 bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-600 rounded-lg text-xs font-bold outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newBrandInput.trim()) {
                        const bName = newBrandInput.trim();
                        addCustomBrand(bName, '#0ea5e9');
                        setAvailableBrands(getAllBrandNames());
                        setBrand(bName);
                        setNewBrandInput('');
                        setIsAddingBrand(false);
                      }
                    }}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none cursor-pointer text-slate-800 dark:text-white"
                >
                  {availableBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Hostname & Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Tên Thiết Bị (Hostname) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={deviceType === 'router' ? 'RT-Gateway-01' : deviceType === 'firewall' ? 'FW-Core-01' : 'SW-Fl02-01'}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Model Thiết Bị
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Catalyst 9200, ISR 4331, FortiGate 100F..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* IP & MAC */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Địa Chỉ IP Quản Lý
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="10.x.x.x"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Địa Chỉ MAC
              </label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(formatMacAddress(e.target.value))}
                placeholder="AA:BB:CC:DD:EE:FF"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-lg text-xs font-bold font-mono outline-none uppercase text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Ports specification */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Tổng Số Port (RJ45)
              </label>
              <input
                type="number"
                min={1}
                max={96}
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Số Cổng SFP/Quang
              </label>
              <input
                type="number"
                min={0}
                max={32}
                value={sfpPorts}
                onChange={(e) => setSfpPorts(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Số Cổng Combo
              </label>
              <input
                type="number"
                min={0}
                max={Number(ports) || 24}
                value={hybridPortCount}
                onChange={(e) => setHybridPortCount(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Combo Ports Details (if any) */}
          {comboList.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-3.5 space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                Cấu hình cổng Combo (Đồng / Quang)
              </span>
              {comboList.map((p) => {
                const currentMedia = hybridPorts[String(p)]?.media ?? 'copper';
                const currentNote = hybridPorts[String(p)]?.note ?? '';
                return (
                  <div key={p} className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 w-14 shrink-0">
                      Port {p}
                    </span>
                    <div className="flex rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateHybridPort(p, { media: 'copper' })}
                        className={`px-2 py-1 text-[10px] font-bold ${currentMedia === 'copper' ? 'bg-emerald-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        Đồng
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateHybridPort(p, { media: 'fiber' })}
                        className={`px-2 py-1 text-[10px] font-bold ${currentMedia === 'fiber' ? 'bg-amber-600 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        Quang
                      </button>
                    </div>
                    <input
                      type="text"
                      value={currentNote}
                      onChange={(e) => handleUpdateHybridPort(p, { note: e.target.value })}
                      placeholder="Ghi chú cổng combo..."
                      className="flex-1 p-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Switch Core Mode (for Switch only) */}
          {(deviceType === 'switch' || deviceType === 'other') && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-white block">
                  Thiết bị Core Switch (Trung tâm)
                </span>
                <span className="text-[10px] text-slate-400">
                  Switch trung tâm điều phối lưu lượng mạng toàn hệ thống
                </span>
              </div>
              <input
                type="checkbox"
                checked={isCore}
                onChange={(e) => setIsCore(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 cursor-pointer"
              />
            </div>
          )}

          {/* Uplink Target & Ports */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
            <span className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <i className="fas fa-network-wired text-indigo-500" />
              {deviceType === 'router' || deviceType === 'firewall'
                ? 'Cấu hình Cổng LAN Uplink (Cắm xuống Switch Core)'
                : 'Cấu hình Cổng Uplink'}
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                  Kết Nối Đến Thiết Bị
                </label>
                <select
                  value={uplinkTarget}
                  onChange={(e) => setUplinkTarget(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none cursor-pointer text-slate-800 dark:text-white"
                >
                  <option value="none">(Không kết nối / Node Root)</option>
                  {allUplinkTargets.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                  Cổng Đích Trên Thiết Bị Cha
                </label>
                <input
                  type="number"
                  min={1}
                  value={targetPort}
                  onChange={(e) => setTargetPort(e.target.value)}
                  placeholder="Port #"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                  Cổng Uplink Trên Thiết Bị Này
                </label>
                <input
                  type="number"
                  min={1}
                  value={uplinkPort}
                  onChange={(e) => setUplinkPort(e.target.value)}
                  placeholder="24"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                  Loại Cáp
                </label>
                <select
                  value={uplinkType}
                  onChange={(e) => setUplinkType(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none cursor-pointer text-slate-800 dark:text-white"
                >
                  <option value="Fiber">Fiber (Quang)</option>
                  <option value="Cat6">Cat6 (Đồng)</option>
                  <option value="Stack">Stack / DAC</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                  Tốc Độ
                </label>
                <select
                  value={uplinkSpeed}
                  onChange={(e) => setUplinkSpeed(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none cursor-pointer text-slate-800 dark:text-white"
                >
                  <option value="1G">1 Gbps</option>
                  <option value="10G">10 Gbps</option>
                  <option value="25G">25 Gbps</option>
                  <option value="40G">40 Gbps</option>
                  <option value="100G">100 Gbps</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          {mode === 'edit' && isAdmin && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <i className="fas fa-trash-alt text-[10px]" />
              Xóa Thiết Bị
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Hủy
            </button>
            {isAdmin ? (
              <button
                type="button"
                onClick={handleSave}
                className={`px-6 py-2.5 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  deviceType === 'router'
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                    : deviceType === 'firewall'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                }`}
              >
                <i className="fas fa-check text-[10px]" />
                Lưu {deviceType === 'router' ? 'Router Gateway' : deviceType === 'firewall' ? 'Firewall' : 'Switch'}
              </button>
            ) : (
              <span className="text-xs text-slate-400 font-bold px-3 py-2 bg-slate-100 rounded-xl">
                Chế độ chỉ đọc
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
