import React, { useState } from 'react';
import { useUIStore } from '../stores/useUIStore.js';
import { useNetworkStore } from '../stores/useNetworkStore.js';

export function GlobalSearchModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const db = useNetworkStore((state) => state.DB);
  const cctvDB = useNetworkStore((state) => state.CctvCameraDB);
  const wifiDB = useNetworkStore((state) => state.WifiDB);
  const odfDB = useNetworkStore((state) => state.ODFDB);
  const ipPhoneDB = useNetworkStore((state) => state.IPPhoneDB);
  const elevatorDB = useNetworkStore((state) => state.ElevatorDB);
  const gponFrames = useNetworkStore((state) => state.GponFrameDB);
  const gponOnts = useNetworkStore((state) => state.GponOntDB);
  const firewalls = useNetworkStore((state) => state.FirewallDB);

  const requestFocus = useUIStore((state) => state.requestFocus);

  const q = searchTerm.trim().toLowerCase();

  const results = [];

  // 1. Switches & Connected devices
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (!q || sw.name.toLowerCase().includes(q) || sw.ip?.toLowerCase().includes(q) || sw.mac?.toLowerCase().includes(q)) {
        results.push({
          type: 'switch',
          tab: 'switches',
          icon: 'fa-server',
          color: 'text-indigo-600',
          title: sw.name,
          sub: `${rack.floor} · IP: ${sw.ip || '—'} · MAC: ${sw.mac || '—'}`,
          action: () => requestFocus({ module: 'topology', switchId: sw.id })
        });
      }
      sw.conns?.forEach((conn) => {
        if (!q || conn.n?.toLowerCase().includes(q) || conn.ip?.toLowerCase().includes(q) || conn.mac?.toLowerCase().includes(q)) {
          results.push({
            type: 'device',
            tab: 'switches',
            icon: conn.icon || 'fa-desktop',
            color: 'text-emerald-600',
            title: conn.n,
            sub: `${sw.name} (Port ${conn.p}) · IP: ${conn.ip || '—'} · VLAN ${conn.v}`,
            action: () => requestFocus({ module: 'topology', switchId: sw.id, portNum: conn.p })
          });
        }
      });
    });
  });

  // 2. CCTV
  cctvDB.forEach((cam) => {
    if (!q || cam.name.toLowerCase().includes(q) || cam.ip?.toLowerCase().includes(q) || cam.mac?.toLowerCase().includes(q)) {
      results.push({
        type: 'cctv',
        tab: 'cctv',
        icon: 'fa-video',
        color: 'text-orange-500',
        title: cam.name,
        sub: `${cam.floor || '—'} · IP: ${cam.ip || '—'} · Model: ${cam.model || '—'}`,
        action: () => requestFocus({ module: 'cctv', cameraId: cam.id })
      });
    }
  });

  // 3. Wi-Fi APs
  wifiDB.forEach((ap) => {
    if (!q || ap.name.toLowerCase().includes(q) || ap.ip?.toLowerCase().includes(q) || ap.mac?.toLowerCase().includes(q) || ap.ssid?.toLowerCase().includes(q)) {
      results.push({
        type: 'wifi',
        tab: 'wifi',
        icon: 'fa-wifi',
        color: 'text-cyan-500',
        title: ap.name,
        sub: `${ap.floor || '—'} · IP: ${ap.ip || '—'} · SSID: ${ap.ssid || '—'}`,
        action: () => requestFocus({ module: 'wifi', apId: ap.id })
      });
    }
  });

  // 4. IP Phones
  ipPhoneDB.forEach((phone) => {
    if (!q || phone.name?.toLowerCase().includes(q) || phone.extension?.toLowerCase().includes(q) || phone.ip?.toLowerCase().includes(q)) {
      results.push({
        type: 'phone',
        tab: 'ipphone',
        icon: 'fa-phone-alt',
        color: 'text-green-600',
        title: `Ext ${phone.extension || '—'}: ${phone.name || 'IP Phone'}`,
        sub: `${phone.floor || '—'} · IP: ${phone.ip || '—'} · Model: ${phone.model || '—'}`,
        action: () => requestFocus({ module: 'ipphone', phoneId: phone.id })
      });
    }
  });

  // 5. ODF
  odfDB.forEach((odf) => {
    if (!q || odf.name?.toLowerCase().includes(q) || odf.location?.toLowerCase().includes(q)) {
      results.push({
        type: 'odf',
        tab: 'odf',
        icon: 'fa-network-wired',
        color: 'text-amber-500',
        title: odf.name,
        sub: `${odf.location || '—'} · ${odf.ports || 24} Ports`,
        action: () => requestFocus({ module: 'odf', odfId: odf.id })
      });
    }
  });

  // 6. Elevators
  elevatorDB.forEach((elev) => {
    if (!q || elev.name?.toLowerCase().includes(q) || elev.master?.ip?.toLowerCase().includes(q) || elev.client?.ip?.toLowerCase().includes(q)) {
      results.push({
        type: 'elevator',
        tab: 'elevator',
        icon: 'fa-elevator',
        color: 'text-sky-600',
        title: elev.name,
        sub: `Master: ${elev.master?.ip || '—'} · Client: ${elev.client?.ip || '—'}`,
        action: () => requestFocus({ module: 'elevator', elevatorId: elev.id })
      });
    }
  });

  // 7. GPON Frames & ONTs
  gponFrames.forEach((frame) => {
    if (!q || frame.name?.toLowerCase().includes(q) || frame.location?.toLowerCase().includes(q)) {
      results.push({
        type: 'gpon',
        tab: 'gpon',
        icon: 'fa-circle-nodes',
        color: 'text-cyan-600',
        title: `OLT: ${frame.name}`,
        sub: `${frame.location || '—'} · ${frame.slots?.length || 0} Slots`,
        action: () => requestFocus({ module: 'gpon', frameId: frame.id })
      });
    }
  });

  gponOnts.forEach((ont) => {
    if (!q || ont.room?.toLowerCase().includes(q) || ont.sn?.toLowerCase().includes(q) || ont.ip?.toLowerCase().includes(q)) {
      results.push({
        type: 'ont',
        tab: 'gpon',
        icon: 'fa-box',
        color: 'text-teal-600',
        title: `ONT: ${ont.room || ont.sn}`,
        sub: `SN: ${ont.sn} · IP: ${ont.ip || '—'}`,
        action: () => requestFocus({ module: 'gpon', ontId: ont.id })
      });
    }
  });

  // 8. Firewalls
  firewalls.forEach((fw) => {
    if (!q || fw.name?.toLowerCase().includes(q) || fw.mgmtIp?.toLowerCase().includes(q)) {
      results.push({
        type: 'firewall',
        tab: 'firewall',
        icon: 'fa-shield-halved',
        color: 'text-orange-600',
        title: `Firewall: ${fw.name}`,
        sub: `Mgmt IP: ${fw.mgmtIp || '—'} · Model: ${fw.model || '—'}`,
        action: () => requestFocus({ module: 'firewall', fwId: fw.id })
      });
    }
  });

  const filteredResults = activeTab === 'all' ? results : results.filter((r) => r.tab === activeTab);

  const handleSelectResult = (action) => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[600] flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl w-[640px] max-w-full shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <i className="fas fa-search text-slate-400 text-sm" />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm thiết bị, IP, MAC, Switch, Camera, VLAN, Phòng..."
            className="flex-1 text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xs font-mono uppercase bg-slate-100 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 bg-slate-50 overflow-x-auto custom-scroll text-xs">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'switches', label: 'Switch & Cổng' },
            { id: 'cctv', label: 'Camera CCTV' },
            { id: 'wifi', label: 'Wi-Fi AP' },
            { id: 'ipphone', label: 'IP Phone' },
            { id: 'odf', label: 'ODF' },
            { id: 'elevator', label: 'Thang máy' },
            { id: 'gpon', label: 'GPON' },
            { id: 'firewall', label: 'Firewall' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-2 divide-y divide-slate-100">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">
              Không tìm thấy thiết bị nào khớp với từ khóa tìm kiếm.
            </div>
          ) : (
            filteredResults.slice(0, 50).map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectResult(item.action)}
                className="p-3 hover:bg-indigo-50/70 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm ${item.color}`}>
                    <i className={`fas ${item.icon}`} />
                  </span>
                  <div>
                    <div className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {item.sub}
                    </div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-xs text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchModal;
