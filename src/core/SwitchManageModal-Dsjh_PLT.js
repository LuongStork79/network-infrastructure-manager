import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Nt as r,
  Pt as i,
  Rt as a,
  Yt as ee,
  jt as o,
  l as s,
  s as c,
} from "./index-QE6I14Fy.js";
import { getAllBrandNames, getBrandColor, addCustomBrand, deleteBrand, deleteCustomBrand, isCustomBrand, getDeletedBrands, resetDeletedBrands } from "../services/brandManager.js";
import { getActiveProject, getActiveProjectId } from "../services/projectManager.js";
var u = e(t(), 1),
  d = n();
function f(e, t) {
  if (t <= 0) return [];
  let n = Math.min(t, e);
  return Array.from({ length: n }, (t, r) => e - n + 1 + r).filter(
    (e) => e > 0,
  );
}
function p({
  mode: e,
  sw: t,
  db: n,
  username: p,
  onSave: m,
  onDelete: h,
  onClose: g,
}) {
  let _ = c((e) => e.showDialog),
    v = s((e) => e.GponFrameDB),
    y = t ? n.findIndex((e) => e.switches.some((e) => e.id === t.id)) : 0,
    [b, x] = (0, u.useState)(Math.max(y, 0)),
    [S, C] = (0, u.useState)(t?.brand ?? `Cisco`),
    [availableBrands, setAvailableBrands] = (0, u.useState)(() => {
      const all = getAllBrandNames();
      if (t?.brand && !all.includes(t.brand)) all.push(t.brand);
      return all;
    }),
    [isAddingBrand, setIsAddingBrand] = (0, u.useState)(false),
    [newBrandInput, setNewBrandInput] = (0, u.useState)(''),
    [newBrandColor, setNewBrandColor] = (0, u.useState)('#0ea5e9'),
    [isAddingFloor, setIsAddingFloor] = (0, u.useState)(() => !n || n.length === 0),
    [newFloorInput, setNewFloorInput] = (0, u.useState)(''),
    handleDeleteFloor = () => {
      if (!n || n.length === 0 || b < 0 || b >= n.length) return;
      const targetFloor = n[b];
      const floorName = targetFloor?.floor;
      if (!floorName) return;
      const swCount = (targetFloor.switches || []).length;

      const confirmMsg = swCount > 0
        ? `Tầng / Vị trí "${floorName}" hiện có ${swCount} switch.\n\nBạn có chắc chắn muốn xóa vị trí này và toàn bộ ${swCount} thiết bị thuộc tầng?`
        : `Bạn có chắc chắn muốn xóa Tầng / Vị trí "${floorName}"?`;

      const execute = () => {
        if (typeof s?.getState?.()?.deleteFloor === 'function') {
          s.getState().deleteFloor(floorName);
        } else {
          const currentDB = s?.getState?.()?.DB || n;
          const delSwIds = new Set((targetFloor.switches || []).map((sw) => sw.id));
          const updatedDB = currentDB
            .filter((rack) => rack.floor !== floorName)
            .map((rack) => ({
              ...rack,
              switches: (rack.switches || []).map((sw) =>
                delSwIds.has(sw.uplinkTarget) ? { ...sw, uplinkTarget: 'none' } : sw
              ),
            }));
          if (typeof s?.setState === 'function') {
            s.setState({ DB: updatedDB });
          }
        }

        n.splice(b, 1);

        if (n.length === 0) {
          setIsAddingFloor(true);
          x(0);
        } else {
          x(Math.max(0, Math.min(b, n.length - 1)));
        }

        _(`Đã xóa thành công Tầng / Vị trí "${floorName}"!`, 'success');
      };

      if (typeof _ === 'function') {
        _ (confirmMsg, 'confirm', execute);
      } else if (typeof window !== 'undefined' && window.confirm(confirmMsg)) {
        execute();
      }
    },
    handleDeleteBrand = () => {
      if (!S || S === '__add_new__' || S === '__reset_brands__') return;
      const switchesWithBrand = (n || []).flatMap((r) => r.switches || []).filter((sw) => sw.brand === S).length;
      const confirmMsg = switchesWithBrand > 0
        ? `⚠️ Thương hiệu "${S}" hiện đang được sử dụng bởi ${switchesWithBrand} Switch.\n\nBạn có chắc chắn muốn xóa thương hiệu này khỏi danh sách lựa chọn?`
        : `Bạn có chắc chắn muốn xóa thương hiệu "${S}" khỏi danh sách?`;
      const execute = () => {
        deleteBrand(S);
        const updated = getAllBrandNames();
        setAvailableBrands(updated);
        C(updated[0] || '');
        _(`Đã xóa thương hiệu "${S}" khỏi danh sách!`, 'success');
      };
      if (typeof _ === 'function') {
        _ (confirmMsg, 'confirm', execute);
      } else if (typeof window !== 'undefined' && window.confirm(confirmMsg)) {
        execute();
      }
    },
    [w, T] = (0, u.useState)(t?.isCore ?? !1),
    [E, D] = (0, u.useState)(t?.name ?? ``),
    [O, k] = (0, u.useState)(t?.mac ?? ``),
    [A, j] = (0, u.useState)(t?.ip ?? ``),
    [M, te] = (0, u.useState)(t?.zone ?? ``),
    [N, P] = (0, u.useState)(String(t?.ports ?? 24)),
    [F, I] = (0, u.useState)(String(t?.sfpPorts ?? 0)),
    [L, R] = (0, u.useState)(String(t?.hybridPortCount ?? 0)),
    [z, B] = (0, u.useState)(t?.hybridPorts ?? {}),
    [V, H] = (0, u.useState)(String(t?.uplinkPort ?? 24)),
    [U, W] = (0, u.useState)(t?.model ?? ``),
    [G, K] = (0, u.useState)(t?.uplinkTarget ?? `none`),
    [q, J] = (0, u.useState)(String(t?.targetPort ?? 1)),
    [Y, X] = (0, u.useState)(t?.uplinkType ?? `Fiber`),
    [Z, ne] = (0, u.useState)(t?.uplinkSpeed ?? `10G`),
    re = i(n, t?.id ?? null),
    Q = f(parseInt(N, 10) || 0, parseInt(L, 10) || 0);
  function $(e, t) {
    B((n) => ({
      ...n,
      [String(e)]: {
        media: n[String(e)]?.media ?? `copper`,
        note: n[String(e)]?.note ?? ``,
        ...t,
      },
    }));
  }
  function ie() {
    let i = E.trim(),
      s = parseInt(V, 10) || 0,
      c = parseInt(q, 10) || 0,
      l = t?.conns ?? [],
      u = ee(n, e === `edit`, t?.id ?? null, s, G, c, l, v);
    if (u) {
      _(u, `error`);
      return;
    }
    let d = parseInt(N, 10),
      h = parseInt(F, 10),
      g = parseInt(L, 10),
      x = Number.isNaN(d) ? 24 : d,
      C = Number.isNaN(g) ? 0 : g;
    if (C > x) {
      _(`Số cổng Combo không được lớn hơn Tổng số Port (RJ45)!`, `error`);
      return;
    }
    if (isAddingFloor && newFloorInput.trim()) {
      const floorName = newFloorInput.trim();
      const existingIdx = n.findIndex((r) => r.floor.toLowerCase() === floorName.toLowerCase());
      if (existingIdx !== -1) {
        b = existingIdx;
      } else {
        n.push({ floor: floorName, switches: [] });
        b = n.length - 1;
      }
    }
    if (!n || n.length === 0 || b < 0 || b >= n.length) {
      _(`Vui lòng nhập hoặc chọn Tầng / Vị trí cho thiết bị!`, `error`);
      return;
    }
    let T = new Set(f(x, C)),
      D = Object.fromEntries(
        Object.entries(z).filter(([e]) => T.has(Number(e))),
      ),
      k = {
        id: t?.id ?? `sw-${Date.now()}`,
        isCore: w,
        name: i || `New SW`,
        brand: S,
        mac: O.trim() || `N/A`,
        ip: A.trim() || `10.x.x.x`,
        model: U.trim() || `Generic`,
        ports: x,
        sfpPorts: Number.isNaN(h) ? 0 : h,
        hybridPortCount: C,
        hybridPorts: D,
        uplinkPort: s,
        uplinkTarget: G,
        targetPort: c,
        uplinkType: Y,
        uplinkSpeed: Z,
        zone: M.trim(),
        color: o[S] || getBrandColor(S),
        conns: l,
        logs: t?.logs,
        ...(t?.backup ? { backup: t.backup } : {}),
      };
    if (e === `add`) {
      let e = r(void 0, `Thêm mới thiết bị vào hệ thống`, p);
      if (G !== `none`) {
        let t = a(G, n);
        t && (e = r(e, `Cắm Uplink tới ${t.name} (Port ${c})`, p));
      }
      m(b, { ...k, logs: e });
      return;
    }
    let j = k.logs;
    if (
      (y !== b &&
        (j = r(
          j,
          `Chuyển vị trí thiết bị từ [${n[y]?.floor ?? `?`}] sang [${n[b]?.floor ?? `?`}]`,
          p,
        )),
      t && (t.uplinkTarget !== G || t.targetPort !== c))
    ) {
      if (G === `none`)
        j = r(j, `Rút cáp Uplink, thiết bị trở thành Node Root`, p);
      else {
        let e = a(G, n);
        e && (j = r(j, `Chuyển Uplink sang thiết bị ${e.name} (Cổng ${c})`, p));
      }
    }
    ((j = r(j, `Cập nhật thông tin cấu hình`, p)), m(b, { ...k, logs: j }));
  }
  return (0, d.jsx)(`div`, {
    className: `modal`,
    style: { display: `flex`, zIndex: 210 },
    children: (0, d.jsxs)(`div`, {
      className: `modal-content shadow-2xl`,
      style: {
        width: 560,
        maxWidth: `96vw`,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      },
      children: [
        (0, d.jsxs)(`div`, {
          className: `flex justify-between items-center mb-6 shrink-0`,
          children: [
            (0, d.jsxs)(`h3`, {
              className: `text-lg font-black text-slate-800 flex items-center gap-3`,
              children: [
                (0, d.jsx)(`div`, {
                  className: `w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs border border-slate-200`,
                  children: (0, d.jsx)(`i`, { className: `fas fa-server` }),
                }),
                (0, d.jsx)(`span`, {
                  children:
                    e === `add` ? `Thêm Switch Mới` : `Chỉnh sửa thiết bị`,
                }),
              ],
            }),
            (0, d.jsx)(`button`, {
              onClick: g,
              title: `Đóng`,
              className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100 shrink-0 ml-2`,
              children: (0, d.jsx)(`i`, { className: `fas fa-times` }),
            }),
          ],
        }),
        (0, d.jsx)(`div`, {
          className: `flex-1 overflow-y-auto custom-scroll`,
          children: (0, d.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, d.jsxs)(`div`, {
                className: `p-2.5 bg-indigo-50/80 border border-indigo-200/80 rounded-xl flex items-center justify-between text-xs`,
                children: [
                  (0, d.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [
                      (0, d.jsx)(`i`, { className: `fas fa-folder-tree text-indigo-600` }),
                      (0, d.jsxs)(`span`, {
                        className: `text-indigo-900 font-bold`,
                        children: [`Thuộc dự án: `, (0, d.jsx)(`strong`, { className: `text-indigo-700 underline`, children: getActiveProject()?.name || `Trung Tâm` })]
                      })
                    ]
                  }),
                  (0, d.jsxs)(`span`, {
                    className: `text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-indigo-100`,
                    children: [`ID: `, getActiveProjectId()]
                  })
                ]
              }),
              (0, d.jsxs)(`div`, {
                className: `grid grid-cols-2 gap-4`,
                children: [
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsxs)(`div`, {
                        className: `flex items-center justify-between mb-1.5`,
                        children: [
                          (0, d.jsx)(`label`, {
                            htmlFor: `sw-input-floor`,
                            className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                            children: `Tầng / Vị trí`,
                          }),
                          (0, d.jsxs)(`div`, {
                            className: `flex items-center gap-2`,
                            children: [
                              n && n.length > 0 && !isAddingFloor && (0, d.jsxs)(`button`, {
                                type: `button`,
                                onClick: handleDeleteFloor,
                                className: `text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1`,
                                title: `Xóa vị trí/tầng đang chọn [${n[b]?.floor || ''}]`,
                                children: [
                                  (0, d.jsx)(`i`, { className: `fas fa-trash-alt text-[9px]` }),
                                  ` Xóa vị trí`,
                                ],
                              }),
                              (0, d.jsx)(`button`, {
                                type: `button`,
                                onClick: () => setIsAddingFloor(!isAddingFloor),
                                className: `text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer`,
                                children: isAddingFloor ? (n && n.length > 0 ? `✕ Đóng` : ``) : `+ Thêm tầng`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      isAddingFloor ? (
                        (0, d.jsxs)(`div`, {
                          className: `flex items-center gap-1.5 mt-1.5`,
                          children: [
                            (0, d.jsx)(`input`, {
                              type: `text`,
                              value: newFloorInput,
                              onChange: (e) => setNewFloorInput(e.target.value),
                              placeholder: `VD: Tầng 03, Kho A...`,
                              className: `flex-1 px-3 py-2 bg-white border border-indigo-300 rounded-xl text-xs font-semibold text-slate-800 outline-none`,
                            }),
                            (0, d.jsx)(`button`, {
                              type: `button`,
                              onClick: () => {
                                if (newFloorInput.trim()) {
                                  const floorName = newFloorInput.trim();
                                  const existingIdx = n.findIndex((r) => r.floor.toLowerCase() === floorName.toLowerCase());
                                  if (existingIdx !== -1) {
                                    x(existingIdx);
                                  } else {
                                    n.push({ floor: floorName, switches: [] });
                                    x(n.length - 1);
                                  }
                                  setNewFloorInput('');
                                  setIsAddingFloor(false);
                                }
                              },
                              className: `px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer`,
                              children: `Lưu`,
                            }),
                          ],
                        })
                      ) : (
                        (0, d.jsxs)(`div`, {
                          className: `flex items-center gap-1.5 mt-1.5`,
                          children: [
                            (0, d.jsx)(`select`, {
                              id: `sw-input-floor`,
                              value: b,
                              onChange: (e) => x(Number(e.target.value)),
                              className: `flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none text-slate-800 focus:border-indigo-400 focus:bg-white transition-all`,
                              children: n.map((e, t) =>
                                (0, d.jsx)(
                                  `option`,
                                  { value: t, children: `${e.floor}${e.switches?.length ? ` (${e.switches.length} sw)` : ` (trống)`}` },
                                  e.floor,
                                ),
                              ),
                            }),
                            n && n.length > 0 && (0, d.jsx)(`button`, {
                              type: `button`,
                              onClick: handleDeleteFloor,
                              className: `w-11 h-11 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-500 hover:text-rose-700 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm`,
                              title: `Xóa tầng / vị trí "${n[b]?.floor || ''}"`,
                              children: (0, d.jsx)(`i`, { className: `fas fa-trash-alt text-sm` }),
                            }),
                          ],
                        })
                      ),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsxs)(`div`, {
                        className: `flex justify-between items-center mb-1.5`,
                        children: [
                          (0, d.jsx)(`label`, {
                            htmlFor: `sw-input-brand`,
                            className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                            children: `Thương hiệu`,
                          }),
                          (0, d.jsxs)(`div`, {
                            className: `flex items-center gap-2`,
                            children: [
                              S && S !== `__add_new__` && S !== `__reset_brands__` && !isAddingBrand && (0, d.jsxs)(`button`, {
                                type: `button`,
                                onClick: handleDeleteBrand,
                                className: `text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1`,
                                title: `Xóa thương hiệu đang chọn [${S}]`,
                                children: [
                                  (0, d.jsx)(`i`, { className: `fas fa-trash-alt text-[9px]` }),
                                  ` Xóa hiệu`,
                                ],
                              }),
                              (0, d.jsx)(`button`, {
                                type: `button`,
                                onClick: () => setIsAddingBrand(!isAddingBrand),
                                className: `text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer`,
                                children: isAddingBrand ? `Đóng` : `+ Thêm hiệu`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      isAddingBrand
                        ? (0, d.jsxs)(`div`, {
                            className: `mt-1.5 p-2 bg-indigo-50/50 border border-indigo-200 rounded-xl flex items-center gap-2`,
                            children: [
                              (0, d.jsx)(`input`, {
                                value: newBrandInput,
                                onChange: (e) => setNewBrandInput(e.target.value),
                                placeholder: `Tên hiệu (VD: MikroTik, Ruijie...)`,
                                className: `flex-1 px-2.5 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs font-bold outline-none text-slate-800`,
                                autoFocus: true,
                              }),
                              (0, d.jsx)(`input`, {
                                type: `color`,
                                value: newBrandColor,
                                onChange: (e) => setNewBrandColor(e.target.value),
                                className: `w-7 h-7 rounded-lg cursor-pointer border-0 p-0 bg-transparent`,
                                title: `Chọn màu nhận diện`,
                              }),
                              (0, d.jsx)(`button`, {
                                type: `button`,
                                onClick: () => {
                                  if (newBrandInput.trim()) {
                                    addCustomBrand(newBrandInput.trim(), newBrandColor);
                                    const updated = getAllBrandNames();
                                    setAvailableBrands(updated);
                                    C(newBrandInput.trim());
                                    setNewBrandInput('');
                                    setIsAddingBrand(false);
                                  }
                                },
                                className: `px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm`,
                                children: `Lưu`,
                              }),
                            ],
                          })
                        : (0, d.jsxs)(`div`, {
                            className: `flex items-center gap-1.5 mt-1.5`,
                            children: [
                              (0, d.jsx)(`select`, {
                                id: `sw-input-brand`,
                                value: S,
                                onChange: (e) => {
                                  if (e.target.value === '__add_new__') {
                                    setIsAddingBrand(true);
                                  } else if (e.target.value === '__reset_brands__') {
                                    resetDeletedBrands();
                                    const updated = getAllBrandNames();
                                    setAvailableBrands(updated);
                                    C(updated[0] || 'Cisco');
                                    _('Đã khôi phục danh sách thương hiệu mặc định!', 'success');
                                  } else {
                                    C(e.target.value);
                                  }
                                },
                                className: `flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none text-slate-800 focus:border-indigo-400 focus:bg-white transition-all`,
                                children: [
                                  ...availableBrands.map((e) =>
                                    (0, d.jsx)(`option`, { value: e, children: e }, e),
                                  ),
                                  (0, d.jsx)(
                                    `option`,
                                    { value: `__add_new__`, children: `+ Thêm thương hiệu mới...` },
                                    `__add_new__`,
                                  ),
                                  getDeletedBrands().size > 0 &&
                                    (0, d.jsx)(
                                      `option`,
                                      { value: `__reset_brands__`, children: `↺ Khôi phục thương hiệu mặc định...` },
                                      `__reset_brands__`,
                                    ),
                                ],
                              }),
                              S && S !== `__add_new__` && S !== `__reset_brands__` && (0, d.jsx)(`button`, {
                                type: `button`,
                                onClick: handleDeleteBrand,
                                className: `w-11 h-11 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-500 hover:text-rose-700 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm`,
                                title: `Xóa thương hiệu "${S}"`,
                                children: (0, d.jsx)(`i`, { className: `fas fa-trash-alt text-sm` }),
                              }),
                            ],
                          }),
                    ],
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl`,
                children: [
                  (0, d.jsx)(`input`, {
                    type: `checkbox`,
                    id: `sw-input-is-core`,
                    checked: w,
                    onChange: (e) => T(e.target.checked),
                    className: `w-4 h-4 text-indigo-600 rounded border-slate-300 cursor-pointer`,
                  }),
                  (0, d.jsx)(`label`, {
                    htmlFor: `sw-input-is-core`,
                    className: `text-xs font-bold text-slate-700 cursor-pointer uppercase tracking-widest`,
                    children: `Đây là thiết bị Core Switch`,
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `grid grid-cols-2 gap-4`,
                children: [
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Hostname`,
                      }),
                      (0, d.jsx)(`input`, {
                        value: E,
                        onChange: (e) => D(e.target.value),
                        placeholder: `SW-01`,
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Địa chỉ MAC`,
                      }),
                      (0, d.jsx)(`input`, {
                        value: O,
                        onChange: (e) => k(l(e.target.value)),
                        maxLength: 17,
                        placeholder: `AA:BB:CC:DD:EE:FF`,
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none uppercase`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `grid grid-cols-2 gap-4`,
                children: [
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `IP Quản lý`,
                      }),
                      (0, d.jsx)(`input`, {
                        value: A,
                        onChange: (e) => j(e.target.value),
                        placeholder: `10.x.x.x`,
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Zone (Khu vực / Tòa nhà)`,
                      }),
                      (0, d.jsx)(`input`, {
                        value: M,
                        onChange: (e) => te(e.target.value),
                        placeholder: `VD: Zone A, Khối VP...`,
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `grid grid-cols-3 gap-4`,
                children: [
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        htmlFor: `sw-input-ports`,
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Tổng số Port (RJ45)`,
                      }),
                      (0, d.jsx)(`input`, {
                        id: `sw-input-ports`,
                        type: `number`,
                        value: N,
                        onChange: (e) => P(e.target.value),
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        htmlFor: `sw-input-sfp-ports`,
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Số cổng SFP`,
                      }),
                      (0, d.jsx)(`input`, {
                        id: `sw-input-sfp-ports`,
                        type: `number`,
                        value: F,
                        onChange: (e) => I(e.target.value),
                        placeholder: `0`,
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        htmlFor: `sw-input-uplink-port`,
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Cổng Uplink/Stack`,
                      }),
                      (0, d.jsx)(`input`, {
                        id: `sw-input-uplink-port`,
                        type: `number`,
                        value: V,
                        onChange: (e) => H(e.target.value),
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                children: [
                  (0, d.jsx)(`label`, {
                    htmlFor: `sw-input-hybrid-count`,
                    className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                    children: `Số cổng Combo (Đồng / Quang dùng chung)`,
                  }),
                  (0, d.jsx)(`input`, {
                    id: `sw-input-hybrid-count`,
                    type: `number`,
                    value: L,
                    onChange: (e) => R(e.target.value),
                    placeholder: `0`,
                    className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                  }),
                  (0, d.jsx)(`p`, {
                    className: `text-[10px] text-slate-400 mt-1`,
                    children: `Cổng combo là các cổng cuối trong dải RJ45, có thể chọn dùng Đồng hoặc Quang cho từng cổng — không cộng thêm vào tổng số port.`,
                  }),
                ],
              }),
              Q.length > 0 &&
                (0, d.jsxs)(`div`, {
                  className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
                  children: [
                    (0, d.jsxs)(`p`, {
                      className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3`,
                      children: [
                        (0, d.jsx)(`i`, {
                          className: `fas fa-random text-slate-400 mr-1`,
                        }),
                        `Cấu hình từng cổng Combo`,
                      ],
                    }),
                    (0, d.jsx)(`div`, {
                      className: `space-y-2`,
                      children: Q.map((e) => {
                        let t = z[String(e)]?.media ?? `copper`,
                          n = z[String(e)]?.note ?? ``;
                        return (0, d.jsxs)(
                          `div`,
                          {
                            className: `flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2.5`,
                            children: [
                              (0, d.jsxs)(`span`, {
                                className: `text-[10px] font-black text-slate-500 w-14 shrink-0`,
                                children: [`Port `, e],
                              }),
                              (0, d.jsxs)(`div`, {
                                className: `flex rounded-lg overflow-hidden border border-slate-200 shrink-0`,
                                role: `radiogroup`,
                                "aria-label": `Loại cổng ${e}`,
                                children: [
                                  (0, d.jsx)(`button`, {
                                    type: `button`,
                                    role: `radio`,
                                    "aria-checked": t === `copper`,
                                    onClick: () => $(e, { media: `copper` }),
                                    className: `px-3 py-1.5 text-[10px] font-bold transition-colors ${t === `copper` ? `bg-emerald-500 text-white` : `bg-white text-slate-500 hover:bg-slate-50`}`,
                                    children: `Đồng`,
                                  }),
                                  (0, d.jsx)(`button`, {
                                    type: `button`,
                                    role: `radio`,
                                    "aria-checked": t === `fiber`,
                                    onClick: () => $(e, { media: `fiber` }),
                                    className: `px-3 py-1.5 text-[10px] font-bold transition-colors ${t === `fiber` ? `bg-amber-500 text-white` : `bg-white text-slate-500 hover:bg-slate-50`}`,
                                    children: `Quang`,
                                  }),
                                ],
                              }),
                              (0, d.jsx)(`input`, {
                                value: n,
                                onChange: (t) => $(e, { note: t.target.value }),
                                placeholder: `Ghi chú (VD: SFP 10G tới ODF-2)`,
                                className: `flex-1 min-w-0 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none`,
                              }),
                            ],
                          },
                          e,
                        );
                      }),
                    }),
                  ],
                }),
              (0, d.jsxs)(`div`, {
                children: [
                  (0, d.jsx)(`label`, {
                    className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                    children: `Model Thiết Bị`,
                  }),
                  (0, d.jsx)(`input`, {
                    value: U,
                    onChange: (e) => W(e.target.value),
                    placeholder: `Catalyst 9200`,
                    className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `grid grid-cols-2 gap-4`,
                children: [
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        htmlFor: `sw-input-uplink-target`,
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Kết nối đến thiết bị`,
                      }),
                      (0, d.jsxs)(`select`, {
                        id: `sw-input-uplink-target`,
                        value: G,
                        onChange: (e) => K(e.target.value),
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                        children: [
                          (0, d.jsx)(`option`, {
                            value: `none`,
                            children: `Không có (Đây là Node Root)`,
                          }),
                          re.map((e) =>
                            (0, d.jsx)(
                              `option`,
                              { value: e.id, children: e.label },
                              e.id,
                            ),
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    children: [
                      (0, d.jsx)(`label`, {
                        htmlFor: `sw-input-target-port`,
                        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                        children: `Vào cổng (Target Port)`,
                      }),
                      (0, d.jsx)(`input`, {
                        id: `sw-input-target-port`,
                        type: `number`,
                        value: q,
                        onChange: (e) => J(e.target.value),
                        placeholder: `Port #`,
                        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, d.jsx)(`div`, {
                className: `grid grid-cols-2 gap-4`,
                children: (0, d.jsxs)(`div`, {
                  className: `flex gap-2`,
                  children: [
                    (0, d.jsxs)(`select`, {
                      value: Y,
                      onChange: (e) => X(e.target.value),
                      className: `w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      children: [
                        (0, d.jsx)(`option`, {
                          value: `Fiber`,
                          children: `Fiber (Quang)`,
                        }),
                        (0, d.jsx)(`option`, {
                          value: `Cat6`,
                          children: `Cat6 (Đồng)`,
                        }),
                        (0, d.jsx)(`option`, {
                          value: `Stack`,
                          children: `Stack / DAC`,
                        }),
                      ],
                    }),
                    (0, d.jsxs)(`select`, {
                      value: Z,
                      onChange: (e) => ne(e.target.value),
                      className: `w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
                      children: [
                        (0, d.jsx)(`option`, {
                          value: `1G`,
                          children: `1 Gbps`,
                        }),
                        (0, d.jsx)(`option`, {
                          value: `10G`,
                          children: `10 Gbps`,
                        }),
                        (0, d.jsx)(`option`, {
                          value: `40G`,
                          children: `40 Gbps`,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
        (0, d.jsxs)(`div`, {
          className: `flex gap-3 mt-8 pt-6 border-t border-slate-100 shrink-0`,
          children: [
            e === `edit` &&
              (0, d.jsx)(`button`, {
                onClick: h,
                className: `flex-[0.5] py-3 bg-red-50 border border-red-200 text-sm font-bold text-red-600 hover:bg-red-100 rounded-xl transition-all`,
                children: `Xóa`,
              }),
            (0, d.jsx)(`button`, {
              onClick: g,
              className: `flex-1 py-3 bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all`,
              children: `Hủy`,
            }),
            (0, d.jsx)(`button`, {
              onClick: ie,
              className: `flex-1 py-3 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-md hover:bg-black transition-all`,
              children: `Lưu thiết bị`,
            }),
          ],
        }),
      ],
    }),
  });
}
export { p as default };
