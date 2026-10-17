import React, { useState } from 'react';
import { useDialogStore } from '../../stores/useDialogStore.js';
import { useNetworkStore } from '../../stores/useNetworkStore.js';
import { findSwitchById } from '../../utils/networkUtils.js';

export const SPLITTER_RATIOS = ['1:8', '1:16', '1:32', '1:64', '1:128'];

export function createEmptySlot(slotNumber) {
  return {
    id: `slot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    slotNumber,
    cardModel: '',
    ports: []
  };
}

export function createEmptyPonPort(portNumber) {
  return {
    id: `port-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    portNumber,
    splitterRatio: '1:32',
    notes: ''
  };
}

export function GponFrameManageModal({
  frame = null,
  username = 'admin',
  onSave,
  onDelete,
  onClose
}) {
  const showDialog = useDialogStore((state) => state.showDialog);
  const db = useNetworkStore((state) => state.DB);
  const firewalls = useNetworkStore((state) => state.FirewallDB);
  const allFrames = useNetworkStore((state) => state.GponFrameDB);

  const [name, setName] = useState(frame?.name ?? '');
  const [location, setLocation] = useState(frame?.location ?? '');
  const [brand, setBrand] = useState(frame?.brand ?? 'Huawei');
  const [model, setModel] = useState(frame?.model ?? 'MA5800-X7');
  const [notes, setNotes] = useState(frame?.notes ?? '');
  const [slots, setSlots] = useState(frame?.slots ?? []);
  const [uplinks, setUplinks] = useState(frame?.uplinks ?? []);

  const coreSwitches = [];
  db.forEach((rack) => {
    rack.switches?.forEach((sw) => {
      if (sw.isCore) {
        coreSwitches.push({ id: sw.id, label: `${sw.name} (${sw.ip})` });
      }
    });
  });

  const handleAddSlot = () => {
    const nextSlotNum = slots.length + 1;
    const newSlot = createEmptySlot(nextSlotNum);
    // Add default 8 PON ports
    newSlot.ports = Array.from({ length: 8 }, (_, i) => createEmptyPonPort(i + 1));
    setSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (slotId) => {
    setSlots(slots.filter((s) => s.id !== slotId));
  };

  const handleUpdateSlot = (slotId, patch) => {
    setSlots(slots.map((s) => (s.id === slotId ? { ...s, ...patch } : s)));
  };

  const handleAddPortToSlot = (slotId) => {
    setSlots(
      slots.map((s) => {
        if (s.id === slotId) {
          const nextPortNum = s.ports.length + 1;
          return { ...s, ports: [...s.ports, createEmptyPonPort(nextPortNum)] };
        }
        return s;
      })
    );
  };

  const handleUpdatePort = (slotId, portId, patch) => {
    setSlots(
      slots.map((s) => {
        if (s.id === slotId) {
          return {
            ...s,
            ports: s.ports.map((p) => (p.id === portId ? { ...p, ...patch } : p))
          };
        }
        return s;
      })
    );
  };

  const handleRemovePort = (slotId, portId) => {
    setSlots(
      slots.map((s) => {
        if (s.id === slotId) {
          return { ...s, ports: s.ports.filter((p) => p.id !== portId) };
        }
        return s;
      })
    );
  };

  const handleAddUplink = () => {
    setUplinks([
      ...uplinks,
      {
        id: `uplink-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        target: '',
        port: 0
      }
    ]);
  };

  const handleUpdateUplink = (id, field, value) => {
    setUplinks(uplinks.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const handleRemoveUplink = (id) => {
    setUplinks(uplinks.filter((u) => u.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      showDialog('Vui lòng nhập tên khung OLT / GPON Frame!', 'error');
      return;
    }

    const data = {
      id: frame?.id || `gpon-${Date.now()}`,
      name: name.trim(),
      location: location.trim(),
      brand: brand.trim(),
      model: model.trim(),
      notes: notes.trim(),
      uplinks: uplinks.filter((u) => u.target && u.port > 0),
      slots
    };

    onSave(data);
    onClose();
  };

  const handleDelete = () => {
    if (!frame) return;
    showDialog(
      `Bạn có chắc chắn muốn xóa Khung OLT [${frame.name}]? Tất cả các card slot và thiết bị ONT trực thuộc sẽ bị gỡ bỏ!`,
      'confirm',
      () => {
        onDelete(frame.id);
        onClose();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[700px] max-w-full shadow-2xl flex flex-col max-h-[92vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-network-wired text-cyan-600" />
            {frame ? `Cấu hình Khung OLT: ${frame.name}` : 'Thêm mới Khung GPON OLT'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scroll space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên Khung OLT *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="OLT-MDF-01"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vị trí tủ / Phòng</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Phòng Server Tầng 1"
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hãng OLT</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Huawei, ZTE, Nokia..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="MA5800-X7..."
                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Đường Uplink lên Core Switch
              </span>
              <button
                type="button"
                onClick={handleAddUplink}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <i className="fas fa-plus-circle" /> Thêm Uplink
              </button>
            </div>

            {uplinks.map((ul) => (
              <div key={ul.id} className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded-lg border border-slate-200">
                <div className="col-span-7">
                  <select
                    value={ul.target}
                    onChange={(e) => handleUpdateUplink(ul.id, 'target', e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
                  >
                    <option value="">-- Chọn Core Switch --</option>
                    {coreSwitches.map((cs) => (
                      <option key={cs.id} value={cs.id}>
                        {cs.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={ul.port || ''}
                    onChange={(e) => handleUpdateUplink(ul.id, 'port', Number(e.target.value))}
                    placeholder="Port trên Core SW"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono outline-none"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveUplink(ul.id)}
                    className="text-slate-400 hover:text-red-500 text-sm"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Các Card Khe cắm (Slots) & Cổng PON
              </span>
              <button
                type="button"
                onClick={handleAddSlot}
                className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                <i className="fas fa-plus-circle" /> Thêm Slot Card
              </button>
            </div>

            {slots.map((slot) => (
              <div key={slot.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-cyan-600 text-white rounded text-xs font-black">
                      Slot {slot.slotNumber}
                    </span>
                    <input
                      type="text"
                      value={slot.cardModel}
                      onChange={(e) => handleUpdateSlot(slot.id, { cardModel: e.target.value })}
                      placeholder="Model Card (vd: H901GPHF - 16 Port)"
                      className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddPortToSlot(slot.id)}
                      className="text-xs font-bold text-cyan-600 hover:underline"
                    >
                      + Thêm Port
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(slot.id)}
                      className="text-slate-400 hover:text-red-500 text-sm"
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {slot.ports.map((p) => (
                    <div key={p.id} className="bg-white p-2 rounded-lg border border-slate-200 text-xs flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-slate-700 font-mono">PON {p.portNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePort(slot.id, p.id)}
                          className="text-slate-300 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                      <select
                        value={p.splitterRatio || '1:32'}
                        onChange={(e) => handleUpdatePort(slot.id, p.id, { splitterRatio: e.target.value })}
                        className="text-[10px] font-bold border border-slate-200 rounded p-1 bg-slate-50"
                      >
                        {SPLITTER_RATIOS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {frame ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
            >
              <i className="fas fa-trash-alt mr-1.5" /> Xóa Khung OLT
            </button>
          ) : <div />}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-save" /> Lưu Khung OLT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GponFrameManageModal;
