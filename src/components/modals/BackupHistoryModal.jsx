import React, { useState } from '../../core/react-adapter.js';

/**
 * Modal to edit device backup status and configuration details
 */
export function EditBackupModal({ sw, onSave, onClose }) {
  const currentBackup = sw.backup;

  const [status, setStatus] = useState(currentBackup?.status ?? 'ok');
  const [method, setMethod] = useState(currentBackup?.method ?? 'manual');
  const [date, setDate] = useState(currentBackup?.date ?? new Date().toLocaleDateString('vi-VN'));
  const [configFile, setConfigFile] = useState(currentBackup?.configFile ?? '');
  const [by, setBy] = useState(currentBackup?.by ?? '');
  const [note, setNote] = useState(currentBackup?.note ?? '');

  const handleSave = () => {
    onSave({
      status,
      method,
      date,
      configFile: configFile.trim(),
      by: by.trim(),
      note: note.trim()
    });
  };

  const defaultConfigFile = `${sw.name.replace(/\s+/g, '_')}_config.cfg`;

  return (
    <div className="modal" style={{ display: 'flex', zIndex: 700 }}>
      <div className="modal-content shadow-2xl" style={{ width: 360, maxWidth: '96vw' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-black text-slate-800">{sw.name}</h4>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{sw.ip || '—'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 text-xs font-black"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="bk-status" className="text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1">
              Trạng thái
            </label>
            <select
              id="bk-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400"
            >
              <option value="ok">✅ Thành công</option>
              <option value="failed">❌ Thất bại</option>
              <option value="skip">⏭️ Bỏ qua</option>
            </select>
          </div>

          <div>
            <label htmlFor="bk-method" className="text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1">
              Phương thức
            </label>
            <select
              id="bk-method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400"
            >
              <option value="manual">Thủ công (Web/CLI)</option>
              <option value="tftp">TFTP / FTP</option>
              <option value="sftp">SCP / SFTP</option>
              <option value="auto">Tự động (Cron/Script)</option>
            </select>
          </div>

          <div>
            <label htmlFor="bk-date" className="text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1">
              Thời gian backup
            </label>
            <input
              id="bk-date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="DD/MM/YYYY - HH:mm"
              className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400 font-mono"
            />
          </div>

          <div>
            <label htmlFor="bk-file" className="text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1">
              File cấu hình (.cfg / .txt)
            </label>
            <input
              id="bk-file"
              type="text"
              value={configFile}
              onChange={(e) => setConfigFile(e.target.value)}
              placeholder={defaultConfigFile}
              className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400 font-mono"
            />
          </div>

          <div>
            <label htmlFor="bk-by" className="text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1">
              Người thực hiện
            </label>
            <input
              id="bk-by"
              type="text"
              value={by}
              onChange={(e) => setBy(e.target.value)}
              placeholder="admin"
              className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="bk-note" className="text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1">
              Ghi chú
            </label>
            <input
              id="bk-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Không có lỗi..."
              className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fas fa-save" /> Lưu
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-xl hover:bg-slate-200 transition-all"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Modal to view backup logs history for a switch or device
 */
export function BackupHistoryModal({ sw, onClose }) {
  const logs = sw.backup?.logs ?? [];

  return (
    <div className="modal" style={{ display: 'flex', zIndex: 701 }}>
      <div
        className="modal-content shadow-2xl"
        style={{ width: 520, maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div>
            <h4 className="text-sm font-black text-slate-800">Lịch sử Backup</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {sw.name} · {sw.ip || '—'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 text-xs font-black"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll pr-1 space-y-2">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 font-medium">
              Chưa có lịch sử sao lưu nào được ghi nhận.
            </div>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        log.status === 'ok'
                          ? 'bg-emerald-100 text-emerald-700'
                          : log.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {log.status === 'ok' ? 'Thành công' : log.status === 'failed' ? 'Thất bại' : 'Bỏ qua'}
                    </span>
                    <span className="font-mono text-slate-600">{log.date}</span>
                    {log.method && (
                      <span className="text-[9px] uppercase font-bold text-slate-400 bg-white border border-slate-200 px-1 rounded">
                        {log.method}
                      </span>
                    )}
                  </div>
                  {log.configFile && (
                    <p className="font-mono text-[10px] text-indigo-600 mt-1">
                      <i className="fas fa-file-code mr-1" />
                      {log.configFile}
                    </p>
                  )}
                  {log.note && <p className="text-slate-500 text-[11px] mt-0.5">{log.note}</p>}
                </div>
                {log.by && <span className="text-[10px] text-slate-400 font-medium">{log.by}</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Chunks compatibility aliases
export const s = EditBackupModal;
export const c = BackupHistoryModal;
export const n = EditBackupModal;
export const t = BackupHistoryModal;
export default BackupHistoryModal;
