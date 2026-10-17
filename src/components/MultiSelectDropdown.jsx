import React, { useState } from 'react';
import WifiManageModal from './modals/WifiManageModal.jsx';

/**
 * Reusable multi-select dropdown filter with counter and checkboxes
 */
export function MultiSelectDropdown({
  icon = 'fa-filter',
  allLabel = 'Tất cả',
  countLabel = (n) => `${n} đã chọn`,
  options = [],
  selected = [],
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter((x) => x !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const displayText =
    selected.length === 0
      ? allLabel
      : selected.length === 1
        ? (options.find((o) => o.value === selected[0])?.label ?? selected[0])
        : countLabel(selected.length);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`px-3 py-2.5 border rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
          selected.length > 0
            ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
            : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
        }`}
      >
        <i className={`fas ${icon} text-[10px]`} />
        <span>{displayText}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-[8px] ml-1`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-20 p-2">
            <div className="flex items-center justify-between px-1.5 py-1 mb-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {allLabel} (nhiều)
              </span>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-[9px] font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Bỏ chọn tất cả
                </button>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto custom-scroll space-y-0.5">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 px-1.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.value)}
                    onChange={() => toggleOption(opt.value)}
                    className="shrink-0 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  {opt.swatch && (
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: opt.swatch }} />
                  )}
                  <span className="font-bold text-slate-700 truncate">{opt.label}</span>
                  {opt.sublabel && (
                    <span className="text-slate-400 truncate text-[10px]">— {opt.sublabel}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Chunks compatibility alias
export const n = WifiManageModal;
export const t = MultiSelectDropdown;
export default MultiSelectDropdown;
