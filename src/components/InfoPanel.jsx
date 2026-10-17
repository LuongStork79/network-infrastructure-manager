import React from 'react';
import { useUIStore } from '../stores/useUIStore.js';
import { useNetworkStore } from '../stores/useNetworkStore.js';
import {
  getDownlinks,
  getPortKindAndConnection,
  getPortStatusSummary,
  VLANS,
  brandColors
} from '../utils/networkUtils.js';

export function InfoPanel({ sw, onClose, isAdmin = true, username = 'admin' }) {
  const db = useNetworkStore((state) => state.DB);
  const openEditSwitchModal = useUIStore((state) => state.openEditSwitchModal);
  const openPortConfigModal = useUIStore((state) => state.openPortConfigModal);

  if (!sw) return null;

  const downlinks = getDownlinks(sw.id, db);
  const summary = getPortStatusSummary(sw, db, downlinks);
  const totalPorts = sw.ports + (sw.sfpPorts ?? 0);

  const portsArray = Array.from({ length: totalPorts }, (_, i) => i + 1);

  return (
    <aside className="info-panel custom-scroll overflow-y-auto">
      <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-white sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                sw.isCore ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {sw.isCore ? 'Core / Dist' : 'Access Switch'}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">{sw.brand}</span>
          </div>
          <h3 className="text-base font-black text-slate-800 mt-1">{sw.name}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{sw.ip || '10.x.x.x'}</p>
        </div>

        <div className="flex items-center gap-1.5">
          {isAdmin && (
            <button
              onClick={() => openEditSwitchModal(sw.id)}
              className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors border border-slate-200"
              title="Chỉnh sửa Switch"
            >
              <i className="fas fa-edit text-xs" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors border border-slate-200"
            title="Đóng panel"
          >
            <i className="fas fa-times text-xs" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Uplink</div>
            <div className="text-sm font-black text-indigo-600 font-mono">{summary.uplink}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Downlink</div>
            <div className="text-sm font-black text-purple-600 font-mono">{summary.downlink}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Client</div>
            <div className="text-sm font-black text-emerald-600 font-mono">{summary.access}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Shutdown</div>
            <div className="text-sm font-black text-red-500 font-mono">{summary.shutdown}</div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
            Sơ đồ Cổng ({sw.ports} Port RJ45 + {sw.sfpPorts || 0} SFP)
          </h4>
          <div className="grid grid-cols-6 gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            {portsArray.map((pNum) => {
              const kindInfo = getPortKindAndConnection(sw, pNum, downlinks);
              const isUplink = kindInfo.kind === 'uplink';
              const isDownlink = kindInfo.kind === 'downlink';
              const conn = kindInfo.connection;

              let bgClass = 'bg-white border-slate-200 text-slate-400';
              let iconClass = 'fa-ethernet';

              if (isUplink) {
                bgClass = 'bg-indigo-600 text-white border-indigo-700 shadow-sm';
                iconClass = 'fa-arrow-up';
              } else if (isDownlink) {
                bgClass = 'bg-purple-600 text-white border-purple-700 shadow-sm';
                iconClass = 'fa-arrow-down';
              } else if (conn) {
                if (conn.status === 'shutdown') {
                  bgClass = 'bg-red-50 text-red-600 border-red-200';
                  iconClass = 'fa-power-off';
                } else if (conn.status === 'err-disabled') {
                  bgClass = 'bg-amber-100 text-amber-700 border-amber-300';
                  iconClass = 'fa-triangle-exclamation';
                } else {
                  bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm';
                  iconClass = conn.icon || 'fa-desktop';
                }
              }

              return (
                <button
                  key={pNum}
                  onClick={() => openPortConfigModal(sw.id, pNum)}
                  className={`h-9 rounded-lg border text-center flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer ${bgClass}`}
                  title={`Cổng ${pNum}: ${isUplink ? 'Uplink' : isDownlink ? 'Downlink' : conn ? conn.n : 'Trống'}`}
                >
                  <i className={`fas ${iconClass} text-[9px]`} />
                  <span className="text-[8px] font-mono font-bold leading-none mt-0.5">{pNum}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
            Danh sách thiết bị kết nối ({sw.conns?.length ?? 0})
          </h4>
          <div className="space-y-2">
            {(!sw.conns || sw.conns.length === 0) ? (
              <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                Chưa có thiết bị nào kết nối vào cổng của Switch này.
              </div>
            ) : (
              sw.conns.map((conn) => {
                const vlanInfo = VLANS[conn.v];
                return (
                  <div
                    key={conn.p}
                    onClick={() => openPortConfigModal(sw.id, conn.p)}
                    className="p-3 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                        <i className={`fas ${conn.icon || 'fa-desktop'}`} />
                      </span>
                      <div>
                        <div className="text-xs font-black text-slate-800 flex items-center gap-2">
                          <span>{conn.n}</span>
                          <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1 rounded">
                            Port {conn.p}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {conn.ip || 'No IP'} · {conn.mac || 'No MAC'}
                        </div>
                      </div>
                    </div>

                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
                      style={{
                        borderColor: vlanInfo?.color || '#cbd5e1',
                        color: vlanInfo?.color || '#64748b'
                      }}
                    >
                      VLAN {conn.v}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default InfoPanel;
