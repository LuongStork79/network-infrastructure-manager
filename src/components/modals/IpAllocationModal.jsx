import React, { useState } from 'react';

export default function IpAllocationModal({ ip, existingData, onSave, onDelete, onClose, isAdmin = true }) {
  const [name, setName] = useState(existingData?.n || existingData?.name || '');
  const [mac, setMac] = useState(existingData?.mac || '');
  const [note, setNote] = useState(existingData?.note || '');
  const [status, setStatus] = useState(existingData?.status || 'used');
  const [icon, setIcon] = useState(existingData?.icon || 'fa-desktop');

  function handleSubmit(e) {
    e.preventDefault();
    if (!isAdmin || !onSave) return;
    onSave(ip, {
      name: name.trim() || 'Manual Host',
      mac: mac.trim(),
      note: note.trim(),
      status,
      icon
    });
    onClose();
  }

  function handleDelete() {
    if (!isAdmin || !onDelete) return;
    if (confirm(`Bạn có chắc muốn hủy gán và giải phóng địa chỉ IP ${ip}?`)) {
      onDelete(ip);
      onClose();
    }
  }

  return (
    <div
      className="modal"
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 250,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-content shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        style={{
          width: '500px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          padding: 0,
          margin: '0 auto',
          overflow: 'hidden',
          boxSizing: 'border-box',
          transform: 'none'
        }}
      >
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <i className="fas fa-network-wired"></i>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                Chi Tiết & Gán Địa Chỉ IP
              </h3>
              <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{ip}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs transition-all cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scroll flex-1">
          <div>
            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Tên thiết bị / Mục đích gán *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Core Switch Mgmt, Server 01, Printer..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Địa chỉ MAC
              </label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="VD: AA:BB:CC:DD:EE:FF"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Trạng thái
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none"
              >
                <option value="used">Đang Sử Dụng (Used)</option>
                <option value="reserved">Dự Phòng (Reserved)</option>
                <option value="vip">VIP / Quan Trọng</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Ghi chú thêm
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Vị trí tủ rack, port kết nối, lưu ý..."
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            {isAdmin && existingData && onDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                <i className="fas fa-trash-alt mr-1"></i> Giải Phóng IP
              </button>
            ) : <div />}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {isAdmin ? 'Hủy' : 'Đóng'}
              </button>
              {isAdmin && (
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-check"></i> Lưu Cấu Hình
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
