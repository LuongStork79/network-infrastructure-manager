import React, { useState } from 'react';

export default function IpAllocationModal({ ip, existingData, onSave, onDelete, onClose }) {
  const [name, setName] = useState(existingData?.n || existingData?.name || '');
  const [mac, setMac] = useState(existingData?.mac || '');
  const [note, setNote] = useState(existingData?.note || '');
  const [status, setStatus] = useState(existingData?.status || 'used');
  const [icon, setIcon] = useState(existingData?.icon || 'fa-desktop');

  function handleSubmit(e) {
    e.preventDefault();
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
    if (confirm(`Bạn có chắc muốn hủy gán và giải phóng địa chỉ IP ${ip}?`)) {
      onDelete(ip);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <i className="fas fa-network-wired"></i>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">
                Chi Tiết & Gán Địa Chỉ IP
              </h3>
              <p className="font-mono text-xs font-bold text-indigo-600">{ip}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
              Tên thiết bị / Mục đích gán *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Printer Phòng Marketing, Core Gateway..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                Địa chỉ MAC
              </label>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="AA:BB:CC:DD:EE:FF"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none uppercase"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                Trạng thái
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              >
                <option value="used">Đang sử dụng (Used)</option>
                <option value="reserved">Đặt trước (Reserved)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
              Ghi chú thêm
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú người dùng, port cắm, số phòng..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {existingData ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <i className="fas fa-trash-alt"></i>
                Giải phóng IP
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Đóng
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <i className="fas fa-save"></i>
                Lưu Gán IP
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
