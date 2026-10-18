import React, { useState, useEffect, useMemo } from 'react';
import { useUIStore } from '../stores/useUIStore.js';
import { useNetworkStore } from '../stores/useNetworkStore.js';
import { useSandboxStore } from '../stores/useToastStore.js';
import { findSwitchById } from '../utils/networkUtils.js';
import { getAllSubnets } from '../services/ipamManager.js';

export function Sidebar() {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const sidebarMobileOpen = useUIStore((state) => state.sidebarMobileOpen);
  const closeSidebarMobile = useUIStore((state) => state.closeSidebarMobile);
  const openGlobalSearch = useUIStore((state) => state.openGlobalSearch);

  const db = useNetworkStore((state) => state.DB);
  const selectedSwitchId = useNetworkStore((state) => state.selectedSwitchId);
  const toggleSelectSwitch = useNetworkStore((state) => state.toggleSelectSwitch);
  const vlanFilter = useNetworkStore((state) => state.vlanFilter);
  const setVlanFilter = useNetworkStore((state) => state.setVlanFilter);

  const isSandboxMode = useSandboxStore((state) => state.isSandboxMode);

  const [vlanTick, setVlanTick] = useState(0);

  useEffect(() => {
    const fn = () => setVlanTick((t) => t + 1);
    window.addEventListener('nim:subnets_updated', fn);
    window.addEventListener('nim:project_switched', fn);
    return () => {
      window.removeEventListener('nim:subnets_updated', fn);
      window.removeEventListener('nim:project_switched', fn);
    };
  }, []);

  const activeVlans = useMemo(() => {
    let subnets = {};
    try {
      subnets = getAllSubnets();
    } catch {
      subnets = {};
    }
    const vlanMap = new Map();
    Object.entries(subnets || {}).forEach(([vIdStr, info]) => {
      const vId = Number(vIdStr);
      if (!isNaN(vId) && vId > 0 && info && !info._deleted) {
        vlanMap.set(vId, {
          id: vId,
          name: info.name || `VLAN ${vId}`,
          color: info.color || `var(--vlan-${vId})`,
        });
      }
    });

    (db || []).forEach((rack) => {
      (rack.switches || []).forEach((sw) => {
        (sw.conns || []).forEach((conn) => {
          if (conn.v != null && conn.v > 0 && !vlanMap.has(conn.v)) {
            vlanMap.set(conn.v, {
              id: conn.v,
              name: `VLAN ${conn.v}`,
              color: `var(--vlan-${conn.v})`,
            });
          }
        });
      });
    });

    return Array.from(vlanMap.values()).sort((x, y) => x.id - y.id);
  }, [db, vlanTick]);

  useEffect(() => {
    if (vlanFilter && vlanFilter !== 'none') {
      const exists = activeVlans.some((v) => String(v.id) === String(vlanFilter));
      if (!exists) {
        setVlanFilter('none');
      }
    }
  }, [vlanFilter, activeVlans, setVlanFilter]);

  const handleSelect = (swId) => {
    toggleSelectSwitch(swId);
    closeSidebarMobile();
  };

  const sidebarClass = `sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${
    sidebarMobileOpen ? 'mobile-open' : ''
  }`;

  return (
    <aside className={sidebarClass}>
      <div className="p-5 border-b border-slate-100 bg-white z-10 flex flex-col gap-4">
        <div className="flex justify-between items-center hide-on-collapse">
          <div>
            <h1 className="text-xs font-black text-slate-800 tracking-tight">
              AQUAMARINE NETWORKING
            </h1>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
              <span>
                <i className="fas fa-circle text-[8px] animate-pulse mr-1" />
                DC-Monitoring
              </span>
              {isSandboxMode && (
                <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                  <i className="fas fa-flask text-[7px] mr-0.5" /> Sandbox
                </span>
              )}
            </p>
          </div>
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
          >
            <i className="fas fa-chevron-left text-[10px]" />
          </button>
        </div>

        {sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-black text-white flex items-center justify-center mx-auto my-1 transition-colors shadow-md cursor-pointer"
            id="btn-expand-sidebar"
          >
            <i className="fas fa-bars text-[10px]" />
          </button>
        )}

        <div className="hide-on-collapse">
          <button
            onClick={openGlobalSearch}
            title="Tìm kiếm toàn hệ thống (⌘K)"
            className="w-full flex items-center gap-2.5 pl-3 pr-2.5 py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 hover:shadow transition-all text-left cursor-pointer"
          >
            <i className="fas fa-search text-slate-400 text-xs" />
            <span className="flex-1 text-xs font-medium text-slate-400">
              Tìm IP, MAC, Tên...
            </span>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </button>
        </div>

        <div className="hide-on-collapse">
          <select
            value={vlanFilter}
            onChange={(e) => setVlanFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-indigo-500 py-2 px-3 cursor-pointer transition-colors"
          >
            <option value="none">
              {activeVlans.length > 0 ? 'Highlight theo VLAN: Tất cả' : 'Highlight theo VLAN: Tất cả (Chưa có VLAN)'}
            </option>
            {activeVlans.map((v) => (
              <option key={v.id} value={String(v.id)} style={{ color: v.color }}>
                VLAN {v.id} ({v.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        {db.map((rack, idx) => (
          <React.Fragment key={rack.id || idx}>
            <div className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100/50 border-y border-slate-200 mt-2 first:mt-0 sticky top-0 backdrop-blur-sm z-10 flex items-center justify-between">
              <span>{rack.floor} — {rack.name}</span>
              <span className="text-[10px] font-mono text-slate-400">({rack.switches?.length ?? 0} SW)</span>
            </div>

            {(!rack.switches || rack.switches.length === 0) && (
              <div className="px-6 py-4 text-[10px] text-slate-300 italic font-medium">
                Tủ Rack trống
              </div>
            )}

            {rack.switches?.map((sw) => {
              const isSelected = selectedSwitchId === sw.id;
              const parentSw = sw.uplinkTarget !== 'none' ? findSwitchById(sw.uplinkTarget, db) : null;
              return (
                <div
                  key={sw.id}
                  onClick={() => handleSelect(sw.id)}
                  className={`px-5 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected ? 'bg-indigo-50/70 border-indigo-200 shadow-sm' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                        sw.isCore
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <i className={`fas ${sw.isCore ? 'fa-crown' : 'fa-server'}`} />
                    </span>
                    <div className="overflow-hidden">
                      <div className="text-xs font-black text-slate-800 truncate">{sw.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{sw.ip || '10.x.x.x'}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                    {sw.ports}P
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
