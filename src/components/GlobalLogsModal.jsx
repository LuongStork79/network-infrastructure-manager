import React from 'react';

export function GlobalLogsModal({ logs = [], onClose }) {
  return (
    <div className="modal" style={{ display: 'flex', zIndex: 600 }}>
      <div
        className="modal-content shadow-2xl"
        style={{ width: 650, maxWidth: '96vw', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
      >
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 shrink-0">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100">
              <i className="fas fa-history" />
            </div>
            Global Activity Timeline
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100 flex items-center justify-center"
          >
            <i className="fas fa-times text-xs" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll pr-2">
          {logs.length === 0 ? (
            <div className="text-center text-slate-400 py-10 text-sm italic border border-dashed border-slate-200 rounded-xl bg-slate-50">
              Hệ thống chưa ghi nhận hoạt động nào.
            </div>
          ) : (
            <div className="relative py-4 space-y-4">
              {logs.map((item, idx) => {
                const isSystem = item.user === 'system';
                return (
                  <div key={idx} className="relative pl-10">
                    <div
                      className={`absolute left-0 top-1 w-8 h-8 rounded-full ${
                        isSystem ? 'bg-slate-400' : 'bg-indigo-500'
                      } text-white flex items-center justify-center text-xs shadow-md border-2 border-white z-10`}
                    >
                      <i className={`fas ${isSystem ? 'fa-robot' : 'fa-user-cog'}`} />
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <span className="text-xs font-black text-slate-800">
                          {item.target || 'Hệ thống'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-slate-100 shadow-sm">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        {item.msg}
                      </p>
                      <div className="mt-3 inline-block px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-bold uppercase text-slate-500 shadow-sm">
                        Bởi: <span className="text-indigo-600 font-bold">{item.user || 'system'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalLogsModal;
