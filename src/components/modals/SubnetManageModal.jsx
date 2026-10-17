import React, { useState } from 'react';

const COMMON_ICONS = [
  { id: 'fa-network-wired', label: 'Network' },
  { id: 'fa-server', label: 'Server' },
  { id: 'fa-wifi', label: 'WiFi' },
  { id: 'fa-video', label: 'CCTV' },
  { id: 'fa-phone', label: 'Phone' },
  { id: 'fa-building', label: 'Office' },
  { id: 'fa-desktop', label: 'PC/Laptop' },
  { id: 'fa-lock', label: 'Security' },
  { id: 'fa-print', label: 'Printer' },
  { id: 'fa-database', label: 'Data' },
  { id: 'fa-snowflake', label: 'HVAC' },
  { id: 'fa-tree', label: 'Outdoor' },
  { id: 'fa-tv', label: 'IPTV' },
  { id: 'fa-bed', label: 'Hotel' }
];

const PRESET_COLORS = [
  '#4f46e5', '#2563eb', '#0284c7', '#0d9488', '#059669',
  '#16a34a', '#d97706', '#ea580c', '#dc2626', '#e11d48',
  '#9333ea', '#7c3aed', '#64748b', '#0f172a'
];

export default function SubnetManageModal({ initialData, isEdit, onSave, onClose }) {
  const [vid, setVid] = useState(initialData?.vid || '');
  const [name, setName] = useState(initialData?.name || '');
  const [subnet, setSubnet] = useState(initialData?.subnet || '192.168.1.0/24');
  const [color, setColor] = useState(initialData?.color || '#4f46e5');
  const [icon, setIcon] = useState(initialData?.icon || 'fa-network-wired');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!vid.trim()) {
      setError('Vui lòng nhập số VLAN ID!');
      return;
    }
    if (!subnet.trim() || !subnet.includes('/')) {
      setError('Dải mạng Subnet phải có dạng CIDR (ví dụ: 192.168.1.0/24 hoặc 10.0.0.0/22)!');
      return;
    }

    onSave(vid.trim(), {
      name: name.trim() || `VLAN ${vid}`,
      subnet: subnet.trim(),
      color,
      icon
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: color }}
            >
              <i className={`fas ${icon}`}></i>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">
                {isEdit ? `Chỉnh Sửa Subnet - VLAN ${vid}` : 'Thêm Mới Subnet / VLAN'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Quy hoạch dải địa chỉ IP và định danh VLAN trong IPAM
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                VLAN ID *
              </label>
              <input
                type="number"
                disabled={isEdit}
                value={vid}
                onChange={(e) => setVid(e.target.value)}
                placeholder="VD: 50"
                className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none ${
                  isEdit ? 'opacity-60 cursor-not-allowed' : 'focus:bg-white focus:border-indigo-500'
                }`}
                autoFocus={!isEdit}
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                Tên VLAN / Mục đích
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Guest WiFi, Server Farm..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
              Dải Subnet (CIDR) *
            </label>
            <input
              type="text"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              placeholder="VD: 192.168.50.0/24 hoặc 10.10.0.0/22"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-indigo-600 focus:bg-white focus:border-indigo-500 outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Hệ thống sẽ tự động phân chia IP thành các khối và tính toán số lượng IP khả dụng.
            </p>
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
              Màu sắc hiển thị
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-lg transition-transform ${
                    color === c ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110 shadow-sm' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0 ml-1 bg-transparent"
                title="Chọn màu tùy biến"
              />
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
              Biểu tượng (Icon)
            </label>
            <div className="grid grid-cols-7 gap-2 max-h-32 overflow-y-auto p-1 custom-scroll">
              {COMMON_ICONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIcon(item.id)}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center border text-xs transition-all ${
                    icon === item.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-600 font-bold shadow-sm'
                      : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                  title={item.label}
                >
                  <i className={`fas ${item.id} text-sm mb-1`}></i>
                  <span className="text-[8px] truncate max-w-full">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-save"></i>
              {isEdit ? 'Cập Nhật Subnet' : 'Tạo Subnet Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
