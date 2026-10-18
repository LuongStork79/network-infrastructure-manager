import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import { c as r, l as i, s as a, tn as o, u as s } from "./index-QE6I14Fy.js";
import {
  a as c,
  i as l,
  o as u,
  s as d,
  t as f,
} from "./IPPhoneManageModal-BCWkf8ne.js";
var p = e(t(), 1),
  m = o();
function h(e, t) {
  return [...(t ? e.filter((e) => e.floor === t) : e)].sort(
    (e, t) => e.floor.localeCompare(t.floor, `vi`) || e.number - t.number,
  );
}
function g(e) {
  return [...new Set(e.map((e) => e.floor))].sort((e, t) =>
    e.localeCompare(t, `vi`),
  );
}
function _(e) {
  let t = Object.values(e.ports ?? {}),
    n = t.filter((e) => e.status === `ok`).length,
    r = t.filter((e) => e.status === `fault`).length,
    i = t.filter((e) => e.room || e.status === `fault`).length,
    a = 10 - i;
  return {
    okCount: n,
    faultCount: r,
    usedCount: i,
    emptyCount: a,
    pct: i * 10,
    accentColor: r ? `#ef4444` : a === 0 ? `#10b981` : `#6366f1`,
  };
}
function v(e) {
  let t = e?.room || ``;
  return (e?.status || `empty`) === `fault`
    ? {
        status: `fault`,
        bg: `#fef2f2`,
        border: `#fca5a5`,
        textColor: `#ef4444`,
        displayText: t || ``,
      }
    : t
      ? {
          status: `ok`,
          bg: `#f0fdf4`,
          border: `#6ee7b7`,
          textColor: `#047857`,
          displayText: t,
        }
      : {
          status: `empty`,
          bg: `#f8fafc`,
          border: `#e2e8f0`,
          textColor: `#cbd5e1`,
          displayText: `·`,
        };
}
function y(e, t) {
  return `Tạo mới Krone #${t} tại ${e}`;
}
function b(e, t, n) {
  let r = e ?? { room: ``, status: `empty`, note: `` },
    i = [];
  return (
    (r.room || ``) !== t.room &&
      i.push(`Phòng: "${r.room || `—`}" → "${t.room || `—`}"`),
    (r.status || `empty`) !== t.status &&
      i.push(`TT: "${r.status || `empty`}" → "${t.status}"`),
    (r.note || ``) !== t.note &&
      i.push(`Ghi chú: "${r.note || `—`}" → "${t.note || `—`}"`),
    i.length ? `Port ${n}: ${i.join(` | `)}` : null
  );
}
function x(e, t) {
  return !e || !(e.room || (e.status && e.status !== `empty`))
    ? null
    : `Xóa port ${t}: Phòng "${e.room || `—`}"`;
}
var S = n(),
  C = {
    emerald: {
      row: `bg-emerald-50 border border-emerald-100`,
      label: `text-emerald-700`,
      value: `text-emerald-600`,
    },
    amber: {
      row: `bg-amber-50 border border-amber-100`,
      label: `text-amber-700`,
      value: `text-amber-600`,
    },
    red: {
      row: `bg-red-50 border border-red-100`,
      label: `text-red-700`,
      value: `text-red-600`,
    },
  };
function w(e) {
  let t = (0, m.c)(79),
    {
      db: n,
      statusFilter: r,
      onStatusFilterChange: i,
      floorFilter: a,
      onFloorFilterChange: o,
    } = e,
    s;
  t[0] === n ? (s = t[1]) : ((s = c(n)), (t[0] = n), (t[1] = s));
  let u = s,
    d,
    f,
    p,
    h,
    g,
    _,
    v,
    y,
    b,
    x,
    C,
    w;
  if (
    t[2] !== n ||
    t[3] !== a ||
    t[4] !== o ||
    t[5] !== i ||
    t[6] !== u.active ||
    t[7] !== u.noExt ||
    t[8] !== u.offline ||
    t[9] !== u.total ||
    t[10] !== u.unregistered ||
    t[11] !== r
  ) {
    let e = l(n),
      s;
    t[24] === u.active
      ? (s = t[25])
      : ((s = [`emerald`, `●`, `Active`, u.active]),
        (t[24] = u.active),
        (t[25] = s));
    let c;
    t[26] === u.unregistered
      ? (c = t[27])
      : ((c = [`amber`, `○`, `Unregistered`, u.unregistered]),
        (t[26] = u.unregistered),
        (t[27] = c));
    let m;
    t[28] === u.offline
      ? (m = t[29])
      : ((m = [`red`, `✕`, `Offline`, u.offline]),
        (t[28] = u.offline),
        (t[29] = m));
    let D;
    t[30] !== s || t[31] !== c || t[32] !== m
      ? ((D = [s, c, m]), (t[30] = s), (t[31] = c), (t[32] = m), (t[33] = D))
      : (D = t[33]);
    let O = D;
    p = `view-sidebar w-[240px] shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto custom-scroll`;
    let k;
    t[34] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((k = (0, S.jsx)(`span`, {
          className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
          children: `Tổng quan`,
        })),
        (t[34] = k))
      : (k = t[34]);
    let A;
    t[35] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((A = (0, S.jsx)(`span`, {
          className: `text-xs font-bold text-slate-400`,
          children: `máy`,
        })),
        (t[35] = A))
      : (A = t[35]);
    let j;
    t[36] === u.total
      ? (j = t[37])
      : ((j = (0, S.jsxs)(`div`, {
          className: `flex items-center justify-between mb-3`,
          children: [
            k,
            (0, S.jsxs)(`span`, {
              className: `text-xl font-black text-green-600`,
              children: [u.total, ` `, A],
            }),
          ],
        })),
        (t[36] = u.total),
        (t[37] = j));
    let M;
    t[38] === O ? (M = t[39]) : ((M = O.map(E)), (t[38] = O), (t[39] = M));
    let N;
    t[40] === u.noExt
      ? (N = t[41])
      : ((N =
          u.noExt > 0 &&
          (0, S.jsxs)(`div`, {
            className: `flex items-center justify-between px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg mt-1`,
            children: [
              (0, S.jsx)(`span`, {
                className: `text-[9px] font-bold text-slate-500`,
                children: `Chưa có extension`,
              }),
              (0, S.jsx)(`span`, {
                className: `text-sm font-black text-slate-600`,
                children: u.noExt,
              }),
            ],
          })),
        (t[40] = u.noExt),
        (t[41] = N));
    let P;
    (t[42] !== M || t[43] !== N
      ? ((P = (0, S.jsxs)(`div`, { className: `space-y-2`, children: [M, N] })),
        (t[42] = M),
        (t[43] = N),
        (t[44] = P))
      : (P = t[44]),
      t[45] !== j || t[46] !== P
        ? ((h = (0, S.jsxs)(`div`, {
            className: `p-4 border-b border-slate-100`,
            children: [j, P],
          })),
          (t[45] = j),
          (t[46] = P),
          (t[47] = h))
        : (h = t[47]),
      (C = `p-4`),
      t[48] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((w = (0, S.jsx)(`label`, {
            className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
            htmlFor: `ipphone-status-filter`,
            children: `Lọc trạng thái`,
          })),
          (t[48] = w))
        : (w = t[48]));
    let F;
    t[49] === i
      ? (F = t[50])
      : ((F = (e) => i(e.target.value)), (t[49] = i), (t[50] = F));
    let I, L, R, z;
    (t[51] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((I = (0, S.jsx)(`option`, { value: `all`, children: `Tất cả` })),
        (L = (0, S.jsx)(`option`, { value: `active`, children: `Active` })),
        (R = (0, S.jsx)(`option`, {
          value: `unregistered`,
          children: `Unregistered`,
        })),
        (z = (0, S.jsx)(`option`, { value: `offline`, children: `Offline` })),
        (t[51] = I),
        (t[52] = L),
        (t[53] = R),
        (t[54] = z))
      : ((I = t[51]), (L = t[52]), (R = t[53]), (z = t[54])),
      t[55] !== r || t[56] !== F
        ? ((d = (0, S.jsxs)(`select`, {
            id: `ipphone-status-filter`,
            value: r,
            onChange: F,
            className: `w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-1.5 px-2 focus:outline-none focus:border-green-500 mb-3`,
            children: [I, L, R, z],
          })),
          (t[55] = r),
          (t[56] = F),
          (t[57] = d))
        : (d = t[57]),
      t[58] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((f = (0, S.jsx)(`label`, {
            className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
            htmlFor: `ipphone-floor-filter`,
            children: `Lọc tầng`,
          })),
          (t[58] = f))
        : (f = t[58]),
      (g = `ipphone-floor-filter`),
      (_ = a),
      t[59] === o
        ? (v = t[60])
        : ((v = (e) => o(e.target.value)), (t[59] = o), (t[60] = v)),
      (y = `w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-1.5 px-2 focus:outline-none focus:border-green-500`),
      t[61] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, S.jsx)(`option`, {
            value: `all`,
            children: `Tất cả tầng`,
          })),
          (t[61] = b))
        : (b = t[61]),
      (x = e.map(T)),
      (t[2] = n),
      (t[3] = a),
      (t[4] = o),
      (t[5] = i),
      (t[6] = u.active),
      (t[7] = u.noExt),
      (t[8] = u.offline),
      (t[9] = u.total),
      (t[10] = u.unregistered),
      (t[11] = r),
      (t[12] = d),
      (t[13] = f),
      (t[14] = p),
      (t[15] = h),
      (t[16] = g),
      (t[17] = _),
      (t[18] = v),
      (t[19] = y),
      (t[20] = b),
      (t[21] = x),
      (t[22] = C),
      (t[23] = w));
  } else
    ((d = t[12]),
      (f = t[13]),
      (p = t[14]),
      (h = t[15]),
      (g = t[16]),
      (_ = t[17]),
      (v = t[18]),
      (y = t[19]),
      (b = t[20]),
      (x = t[21]),
      (C = t[22]),
      (w = t[23]));
  let D;
  t[62] !== g ||
  t[63] !== _ ||
  t[64] !== v ||
  t[65] !== y ||
  t[66] !== b ||
  t[67] !== x
    ? ((D = (0, S.jsxs)(`select`, {
        id: g,
        value: _,
        onChange: v,
        className: y,
        children: [b, x],
      })),
      (t[62] = g),
      (t[63] = _),
      (t[64] = v),
      (t[65] = y),
      (t[66] = b),
      (t[67] = x),
      (t[68] = D))
    : (D = t[68]);
  let O;
  t[69] !== d || t[70] !== f || t[71] !== D || t[72] !== C || t[73] !== w
    ? ((O = (0, S.jsxs)(`div`, { className: C, children: [w, d, f, D] })),
      (t[69] = d),
      (t[70] = f),
      (t[71] = D),
      (t[72] = C),
      (t[73] = w),
      (t[74] = O))
    : (O = t[74]);
  let k;
  return (
    t[75] !== p || t[76] !== h || t[77] !== O
      ? ((k = (0, S.jsxs)(`div`, { className: p, children: [h, O] })),
        (t[75] = p),
        (t[76] = h),
        (t[77] = O),
        (t[78] = k))
      : (k = t[78]),
    k
  );
}
function T(e) {
  return (0, S.jsx)(`option`, { value: e, children: e }, e);
}
function E(e) {
  let [t, n, r, i] = e;
  return (0, S.jsxs)(
    `div`,
    {
      className: `flex items-center justify-between px-2.5 py-1.5 ${C[t].row} rounded-lg`,
      children: [
        (0, S.jsxs)(`span`, {
          className: `text-[10px] font-bold ${C[t].label}`,
          children: [n, ` `, r],
        }),
        (0, S.jsx)(`span`, {
          className: `text-sm font-black ${C[t].value}`,
          children: i,
        }),
      ],
    },
    r,
  );
}
var D = {
    active: `bg-emerald-100 text-emerald-700`,
    unregistered: `bg-amber-100 text-amber-700`,
    offline: `bg-red-100 text-red-700`,
  },
  O = { active: `Active`, unregistered: `Unregistered`, offline: `Offline` };
function k(e, t) {
  if (!e.switchId) return `—`;
  let n = ``;
  return (
    t.forEach((t) =>
      t.switches.forEach((t) => {
        t.id === e.switchId && (n = t.name);
      }),
    ),
    n ? `${n}${e.switchPort ? ` / P` + e.switchPort : ``}` : `—`
  );
}
function A(e) {
  let {
      db: n,
      phones: r,
      statusFilter: i,
      floorFilter: a,
      onEdit: o,
      onDeleteId: s,
      onShowLogsId: c,
      onBulkDelete: onBulkDel,
    } = e,
    [l, d] = (0, p.useState)(``),
    [selectedIds, setSelectedIds] = (0, p.useState)(() => new Set());

  let filteredPhones = u(r, i, a, l);
  let isAllSelected = filteredPhones.length > 0 && filteredPhones.every((ph) => selectedIds.has(ph.id));
  let isSomeSelected = filteredPhones.some((ph) => selectedIds.has(ph.id));

  return (0, S.jsxs)(`div`, {
    className: `flex-1 flex flex-col overflow-hidden`,
    children: [
      (0, S.jsxs)(`div`, {
        className: `px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between gap-3 shrink-0`,
        children: [
          (0, S.jsxs)(`div`, {
            className: `flex items-center gap-3 flex-1`,
            children: [
              (0, S.jsxs)(`div`, {
                className: `relative flex-1 max-w-sm`,
                children: [
                  (0, S.jsx)(`i`, {
                    className: `fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]`,
                  }),
                  (0, S.jsx)(`input`, {
                    type: `text`,
                    value: l,
                    onChange: (e) => d(e.target.value),
                    placeholder: `Tìm extension, tên, IP, vị trí...`,
                    className: `w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
                  }),
                ],
              }),
              (0, S.jsxs)(`span`, {
                className: `text-[10px] font-black text-slate-400`,
                children: [filteredPhones.length, ` / `, r.length, ` máy`],
              }),
            ],
          }),
          selectedIds.size > 0 &&
            (0, S.jsxs)(`div`, {
              className: `flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold shrink-0`,
              children: [
                (0, S.jsxs)(`span`, {
                  className: `text-rose-700 text-[11px] font-bold flex items-center gap-1`,
                  children: [
                    (0, S.jsx)(`i`, { className: `fas fa-check-square text-rose-500` }),
                    `Đã chọn ${selectedIds.size} máy`,
                  ],
                }),
                (0, S.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => {
                    if (onBulkDel) {
                      onBulkDel([...selectedIds]);
                      setSelectedIds(new Set());
                    }
                  },
                  className: `px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all`,
                  children: [
                    (0, S.jsx)(`i`, { className: `fas fa-trash-alt` }),
                    `Xóa hàng loạt`,
                  ],
                }),
                (0, S.jsx)(`button`, {
                  type: `button`,
                  onClick: () => setSelectedIds(new Set()),
                  className: `px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium cursor-pointer hover:bg-slate-50`,
                  children: `Bỏ chọn`,
                }),
              ],
            }),
        ],
      }),
      (0, S.jsx)(`div`, {
        className: `flex-1 overflow-auto custom-scroll`,
        children: (0, S.jsxs)(`table`, {
          className: `w-full text-left`,
          children: [
            (0, S.jsx)(`thead`, {
              className: `sticky top-0 z-10`,
              children: (0, S.jsxs)(`tr`, {
                className: `bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                children: [
                  (0, S.jsx)(`th`, {
                    className: `px-3 py-3 w-10 text-center`,
                    children: (0, S.jsx)(`input`, {
                      type: `checkbox`,
                      checked: isAllSelected,
                      ref: (el) => {
                        if (el) el.indeterminate = isSomeSelected && !isAllSelected;
                      },
                      onChange: () => {
                        if (isAllSelected) {
                          setSelectedIds(new Set());
                        } else {
                          setSelectedIds(new Set(filteredPhones.map((ph) => ph.id)));
                        }
                      },
                      className: `rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer`,
                      title: isAllSelected ? `Bỏ chọn tất cả` : `Chọn tất cả`,
                    }),
                  }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3 w-20`, children: `Nhánh` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3`, children: `Tên / Vị trí` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3`, children: `IP Address` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3`, children: `Model` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3`, children: `Tầng` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3`, children: `Switch / Port` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3 w-28`, children: `Trạng thái` }),
                  (0, S.jsx)(`th`, { className: `px-4 py-3 w-16` }),
                ],
              }),
            }),
            (0, S.jsx)(`tbody`, {
              children:
                filteredPhones.length === 0
                  ? (0, S.jsx)(`tr`, {
                      children: (0, S.jsx)(`td`, {
                        colSpan: 9,
                        className: `px-4 py-12 text-center text-sm text-slate-400 italic`,
                        children:
                          r.length === 0
                            ? `Chưa có điện thoại nào. Thêm mới hoặc Import từ Switch.`
                            : `Không tìm thấy kết quả phù hợp.`,
                      }),
                    })
                  : filteredPhones.map((phoneItem) => {
                      let isRowSel = selectedIds.has(phoneItem.id);
                      return (0, S.jsxs)(
                        `tr`,
                        {
                          onClick: () => o(phoneItem),
                          className: `border-b border-slate-100 hover:bg-green-50/30 transition-colors cursor-pointer ${
                            isRowSel ? 'bg-green-50/60' : ''
                          }`,
                          children: [
                            (0, S.jsx)(`td`, {
                              className: `px-3 py-3 w-10 text-center`,
                              onClick: (ev) => ev.stopPropagation(),
                              children: (0, S.jsx)(`input`, {
                                type: `checkbox`,
                                checked: isRowSel,
                                onChange: () => {
                                  setSelectedIds((prev) => {
                                    let next = new Set(prev);
                                    if (next.has(phoneItem.id)) next.delete(phoneItem.id);
                                    else next.add(phoneItem.id);
                                    return next;
                                  });
                                },
                                className: `rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer`,
                              }),
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-3`,
                              children: (0, S.jsx)(`span`, {
                                className: `text-sm font-black text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg`,
                                children: phoneItem.extension || `—`,
                              }),
                            }),
                            (0, S.jsxs)(`td`, {
                              className: `px-4 py-3`,
                              children: [
                                (0, S.jsx)(`p`, {
                                  className: `text-xs font-bold text-slate-800`,
                                  children: phoneItem.name || `—`,
                                }),
                                phoneItem.location &&
                                  (0, S.jsx)(`p`, {
                                    className: `text-[9px] text-slate-400 font-bold`,
                                    children: phoneItem.location,
                                  }),
                              ],
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-3 text-xs font-mono text-indigo-600`,
                              children: phoneItem.ip || `—`,
                            }),
                            (0, S.jsxs)(`td`, {
                              className: `px-4 py-3`,
                              children: [
                                phoneItem.brand &&
                                  (0, S.jsx)(`p`, {
                                    className: `text-[10px] font-black text-slate-600`,
                                    children: phoneItem.brand,
                                  }),
                                (0, S.jsx)(`p`, {
                                  className: `text-[9px] text-slate-400`,
                                  children: phoneItem.model || `—`,
                                }),
                              ],
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-3 text-xs text-slate-600`,
                              children: phoneItem.floor || `—`,
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-3 text-[10px] text-slate-500`,
                              children: k(phoneItem, n),
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-3`,
                              children: (0, S.jsx)(`span`, {
                                className: `text-[9px] font-black px-2 py-1 rounded-full ${
                                  D[phoneItem.status] ?? `bg-slate-100 text-slate-700`
                                }`,
                                children: O[phoneItem.status] || phoneItem.status,
                              }),
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-3`,
                              children: (0, S.jsxs)(`div`, {
                                className: `flex items-center gap-1`,
                                children: [
                                  (0, S.jsx)(`button`, {
                                    onClick: (t) => {
                                      t.stopPropagation();
                                      c(phoneItem.id);
                                    },
                                    title: `Lịch sử thay đổi`,
                                    className: `p-1.5 hover:bg-indigo-50 rounded text-indigo-300 hover:text-indigo-500 transition-colors ${
                                      phoneItem.logs?.length ? `text-indigo-400` : ``
                                    }`,
                                    children: (0, S.jsx)(`i`, {
                                      className: `fas fa-history text-[10px]`,
                                    }),
                                  }),
                                  (0, S.jsx)(`button`, {
                                    onClick: (t) => {
                                      t.stopPropagation();
                                      s(phoneItem.id);
                                    },
                                    title: `Xóa`,
                                    className: `p-1.5 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors`,
                                    children: (0, S.jsx)(`i`, {
                                      className: `fas fa-trash text-[10px]`,
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        },
                        phoneItem.id
                      );
                    }),
            }),
          ],
        }),
      }),
    ],
  });
}
function j(e) {
  let t = (0, m.c)(38),
    { db: n, ipPhoneDB: r, onImport: i, onClose: a } = e,
    o;
  t[0] !== n || t[1] !== r
    ? ((o = d(n, r)), (t[0] = n), (t[1] = r), (t[2] = o))
    : (o = t[2]);
  let s = o,
    c;
  t[3] === s ? (c = t[4]) : ((c = () => s.map(N)), (t[3] = s), (t[4] = c));
  let [l, u] = (0, p.useState)(c),
    f;
  t[5] === s
    ? (f = t[6])
    : ((f = function (e) {
        u(s.map(() => e));
      }),
      (t[5] = s),
      (t[6] = f));
  let h = f,
    g;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = function (e) {
        u((t) => t.map((t, n) => (n === e ? !t : t)));
      }),
      (t[7] = g))
    : (g = t[7]);
  let _ = g,
    v;
  t[8] !== s || t[9] !== l || t[10] !== i
    ? ((v = function () {
        let e = s.filter((e, t) => l[t]);
        if (!e.length) return;
        let t = e.map(M);
        i(t);
      }),
      (t[8] = s),
      (t[9] = l),
      (t[10] = i),
      (t[11] = v))
    : (v = t[11]);
  let y = v,
    b;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = { display: `flex`, zIndex: 225 }), (t[12] = b))
    : (b = t[12]);
  let x;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = {
        width: 680,
        maxWidth: `96vw`,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[13] = x))
    : (x = t[13]);
  let C;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = (0, S.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          (0, S.jsx)(`div`, {
            className: `w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs border border-blue-100`,
            children: (0, S.jsx)(`i`, { className: `fas fa-file-import` }),
          }),
          `Import điện thoại từ Switch (VLAN 150)`,
        ],
      })),
      (t[14] = C))
    : (C = t[14]);
  let w;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = (0, S.jsx)(`i`, { className: `fas fa-times` })), (t[15] = w))
    : (w = t[15]);
  let T;
  t[16] === a
    ? (T = t[17])
    : ((T = (0, S.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [
          C,
          (0, S.jsx)(`button`, {
            onClick: a,
            className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
            children: w,
          }),
        ],
      })),
      (t[16] = a),
      (t[17] = T));
  let E;
  t[18] !== s.length || t[19] !== h
    ? ((E =
        s.length > 0 &&
        (0, S.jsxs)(`div`, {
          className: `shrink-0 mb-3 flex items-center gap-3`,
          children: [
            (0, S.jsx)(`p`, {
              className: `text-xs text-slate-500 flex-1`,
              children: `Chọn các máy từ cổng VLAN 150 chưa được thêm vào danh bạ để import nhanh.`,
            }),
            (0, S.jsx)(`button`, {
              onClick: () => h(!0),
              className: `text-[10px] font-bold text-indigo-600 hover:underline`,
              children: `Chọn tất cả`,
            }),
            (0, S.jsx)(`button`, {
              onClick: () => h(!1),
              className: `text-[10px] font-bold text-slate-400 hover:underline`,
              children: `Bỏ chọn`,
            }),
          ],
        })),
      (t[18] = s.length),
      (t[19] = h),
      (t[20] = E))
    : (E = t[20]);
  let D;
  t[21] !== s || t[22] !== l || t[23] !== h
    ? ((D = (0, S.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll`,
        children:
          s.length === 0
            ? (0, S.jsxs)(`div`, {
                className: `flex flex-col items-center justify-center py-12 opacity-40`,
                children: [
                  (0, S.jsx)(`i`, {
                    className: `fas fa-check-circle text-4xl text-emerald-400 mb-3`,
                  }),
                  (0, S.jsx)(`p`, {
                    className: `text-sm font-bold text-slate-500`,
                    children: `Tất cả máy VLAN 150 đã có trong danh bạ!`,
                  }),
                ],
              })
            : (0, S.jsxs)(`table`, {
                className: `w-full text-left`,
                children: [
                  (0, S.jsx)(`thead`, {
                    children: (0, S.jsxs)(`tr`, {
                      className: `bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase`,
                      children: [
                        (0, S.jsx)(`th`, {
                          className: `px-4 py-2 w-10`,
                          children: (0, S.jsx)(`input`, {
                            type: `checkbox`,
                            checked: l.every(Boolean),
                            onChange: (e) => h(e.target.checked),
                          }),
                        }),
                        (0, S.jsx)(`th`, {
                          className: `px-4 py-2`,
                          children: `Tên`,
                        }),
                        (0, S.jsx)(`th`, {
                          className: `px-4 py-2`,
                          children: `IP`,
                        }),
                        (0, S.jsx)(`th`, {
                          className: `px-4 py-2`,
                          children: `MAC`,
                        }),
                        (0, S.jsx)(`th`, {
                          className: `px-4 py-2`,
                          children: `Switch / Tầng`,
                        }),
                      ],
                    }),
                  }),
                  (0, S.jsx)(`tbody`, {
                    children: s.map((e, t) =>
                      (0, S.jsxs)(
                        `tr`,
                        {
                          className: `border-b border-slate-100 hover:bg-blue-50/30`,
                          children: [
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-2`,
                              children: (0, S.jsx)(`input`, {
                                type: `checkbox`,
                                checked: l[t],
                                onChange: () => _(t),
                              }),
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-2 text-xs font-bold text-slate-700`,
                              children: e.name || `—`,
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-2 text-xs font-mono text-indigo-600`,
                              children: e.ip || `—`,
                            }),
                            (0, S.jsx)(`td`, {
                              className: `px-4 py-2 text-[10px] font-mono text-slate-400`,
                              children: e.mac || `—`,
                            }),
                            (0, S.jsxs)(`td`, {
                              className: `px-4 py-2 text-[10px] text-slate-500`,
                              children: [e.swName, ` · `, e.floor],
                            }),
                          ],
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
      })),
      (t[21] = s),
      (t[22] = l),
      (t[23] = h),
      (t[24] = D))
    : (D = t[24]);
  let O;
  t[25] === a
    ? (O = t[26])
    : ((O = (0, S.jsx)(`button`, {
        onClick: a,
        className: `flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50`,
        children: `Hủy`,
      })),
      (t[25] = a),
      (t[26] = O));
  let k;
  t[27] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, S.jsx)(`i`, { className: `fas fa-file-import` })), (t[27] = k))
    : (k = t[27]);
  let A;
  t[28] === y
    ? (A = t[29])
    : ((A = (0, S.jsxs)(`button`, {
        onClick: y,
        className: `flex-1 px-4 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2`,
        children: [k, ` Import đã chọn`],
      })),
      (t[28] = y),
      (t[29] = A));
  let j;
  t[30] !== O || t[31] !== A
    ? ((j = (0, S.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [O, A],
      })),
      (t[30] = O),
      (t[31] = A),
      (t[32] = j))
    : (j = t[32]);
  let P;
  return (
    t[33] !== T || t[34] !== E || t[35] !== D || t[36] !== j
      ? ((P = (0, S.jsx)(`div`, {
          className: `modal`,
          style: b,
          children: (0, S.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: x,
            children: [T, E, D, j],
          }),
        })),
        (t[33] = T),
        (t[34] = E),
        (t[35] = D),
        (t[36] = j),
        (t[37] = P))
      : (P = t[37]),
    P
  );
}
function M(e, t) {
  return {
    id: `phone-${Date.now()}-${t}`,
    name: e.name,
    extension: ``,
    ip: e.ip,
    mac: e.mac,
    brand: ``,
    model: ``,
    floor: e.floor,
    location: ``,
    switchId: e.swId,
    switchPort: e.port || null,
    status: `unregistered`,
    notes: ``,
  };
}
function N() {
  return !0;
}
function P(e) {
  let t = (0, m.c)(54),
    { db: n, activeFloor: r, onSelectFloor: i, onCreateFloor: a } = e,
    [o, s] = (0, p.useState)(``),
    c,
    l,
    u,
    d,
    f,
    h,
    _;
  if (t[0] !== r || t[1] !== n || t[2] !== o || t[3] !== a || t[4] !== i) {
    let e = g(n),
      p;
    (t[12] !== o || t[13] !== a
      ? ((p = function () {
          let e = o.trim();
          e && (a(e), s(``));
        }),
        (t[12] = o),
        (t[13] = a),
        (t[14] = p))
      : (p = t[14]),
      (c = p),
      (_ = `view-sidebar w-[240px] shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto custom-scroll`),
      (f = `p-4 border-b border-slate-100`),
      t[15] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, S.jsx)(`p`, {
            className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3`,
            children: `Chọn tầng`,
          })),
          (t[15] = h))
        : (h = t[15]),
      (l = `space-y-1`));
    let m;
    t[16] === i ? (m = t[17]) : ((m = () => i(null)), (t[16] = i), (t[17] = m));
    let v = `w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${r ? `text-slate-500 hover:bg-slate-50` : `bg-indigo-50 text-indigo-700 border border-indigo-200`}`,
      y;
    t[18] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((y = (0, S.jsx)(`i`, {
          className: `fas fa-layer-group mr-2 text-[9px]`,
        })),
        (t[18] = y))
      : (y = t[18]);
    let b;
    (t[19] === n.length
      ? (b = t[20])
      : ((b = (0, S.jsxs)(`span`, {
          className: `float-right text-[9px] font-black text-slate-400`,
          children: [n.length, `K`],
        })),
        (t[19] = n.length),
        (t[20] = b)),
      t[21] !== b || t[22] !== m || t[23] !== v
        ? ((u = (0, S.jsxs)(`button`, {
            onClick: m,
            className: v,
            children: [y, `Tất cả tầng`, b],
          })),
          (t[21] = b),
          (t[22] = m),
          (t[23] = v),
          (t[24] = u))
        : (u = t[24]));
    let x;
    (t[25] !== r || t[26] !== n || t[27] !== i
      ? ((x = (e) => {
          let t = n.filter((t) => t.floor === e).length,
            a = r === e;
          return (0, S.jsxs)(
            `button`,
            {
              onClick: () => i(e),
              className: `w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${a ? `bg-indigo-50 text-indigo-700 border border-indigo-200` : `text-slate-600 hover:bg-slate-50`}`,
              children: [
                (0, S.jsx)(`i`, {
                  className: `fas fa-layer-group mr-2 text-[9px] ${a ? `text-indigo-500` : `text-slate-300`}`,
                }),
                e,
                (0, S.jsxs)(`span`, {
                  className: `float-right text-[9px] font-black text-slate-400`,
                  children: [t, `K`],
                }),
              ],
            },
            e,
          );
        }),
        (t[25] = r),
        (t[26] = n),
        (t[27] = i),
        (t[28] = x))
      : (x = t[28]),
      (d = e.map(x)),
      (t[0] = r),
      (t[1] = n),
      (t[2] = o),
      (t[3] = a),
      (t[4] = i),
      (t[5] = c),
      (t[6] = l),
      (t[7] = u),
      (t[8] = d),
      (t[9] = f),
      (t[10] = h),
      (t[11] = _));
  } else
    ((c = t[5]),
      (l = t[6]),
      (u = t[7]),
      (d = t[8]),
      (f = t[9]),
      (h = t[10]),
      (_ = t[11]));
  let v;
  t[29] !== l || t[30] !== u || t[31] !== d
    ? ((v = (0, S.jsxs)(`div`, { className: l, children: [u, d] })),
      (t[29] = l),
      (t[30] = u),
      (t[31] = d),
      (t[32] = v))
    : (v = t[32]);
  let y;
  t[33] !== f || t[34] !== h || t[35] !== v
    ? ((y = (0, S.jsxs)(`div`, { className: f, children: [h, v] })),
      (t[33] = f),
      (t[34] = h),
      (t[35] = v),
      (t[36] = y))
    : (y = t[36]);
  let b;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = (0, S.jsx)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
        children: `Tạo Krone mới`,
      })),
      (t[37] = b))
    : (b = t[37]);
  let x;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = (e) => s(e.target.value)), (t[38] = x))
    : (x = t[38]);
  let C;
  t[39] === c
    ? (C = t[40])
    : ((C = (e) => {
        e.key === `Enter` && c();
      }),
      (t[39] = c),
      (t[40] = C));
  let w;
  t[41] !== o || t[42] !== C
    ? ((w = (0, S.jsx)(`input`, {
        value: o,
        onChange: x,
        onKeyDown: C,
        type: `text`,
        placeholder: `Tên tầng (vd: Tầng 01)`,
        className: `flex-1 px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors`,
      })),
      (t[41] = o),
      (t[42] = C),
      (t[43] = w))
    : (w = t[43]);
  let T;
  t[44] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, S.jsx)(`i`, { className: `fas fa-plus text-[9px]` })),
      (t[44] = T))
    : (T = t[44]);
  let E;
  t[45] === c
    ? (E = t[46])
    : ((E = (0, S.jsx)(`button`, {
        onClick: c,
        className: `px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-1`,
        children: T,
      })),
      (t[45] = c),
      (t[46] = E));
  let D;
  t[47] !== w || t[48] !== E
    ? ((D = (0, S.jsxs)(`div`, {
        className: `p-4`,
        children: [
          b,
          (0, S.jsxs)(`div`, { className: `flex gap-1.5`, children: [w, E] }),
        ],
      })),
      (t[47] = w),
      (t[48] = E),
      (t[49] = D))
    : (D = t[49]);
  let O;
  return (
    t[50] !== D || t[51] !== _ || t[52] !== y
      ? ((O = (0, S.jsxs)(`div`, { className: _, children: [y, D] })),
        (t[50] = D),
        (t[51] = _),
        (t[52] = y),
        (t[53] = O))
      : (O = t[53]),
    O
  );
}
function F(e) {
  let t = (0, m.c)(60),
    { krone: n, onPortClick: r, onShowLogs: i, onDelete: a } = e,
    o;
  t[0] === n ? (o = t[1]) : ((o = _(n)), (t[0] = n), (t[1] = o));
  let s = o,
    c = !!n.logs?.length,
    l = `krone-block-${n.id}`,
    u = `3px solid ${s.accentColor}`,
    d;
  t[2] === u
    ? (d = t[3])
    : ((d = { border: `1px solid #e2e8f0`, borderLeft: u }),
      (t[2] = u),
      (t[3] = d));
  let f = `${s.accentColor}18`,
    p;
  t[4] === f
    ? (p = t[5])
    : ((p = {
        width: 26,
        height: 26,
        borderRadius: 8,
        background: f,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        flexShrink: 0,
      }),
      (t[4] = f),
      (t[5] = p));
  let h;
  t[6] === s.accentColor
    ? (h = t[7])
    : ((h = (0, S.jsx)(`i`, {
        className: `fas fa-th`,
        style: { fontSize: 9, color: s.accentColor },
      })),
      (t[6] = s.accentColor),
      (t[7] = h));
  let g;
  t[8] !== p || t[9] !== h
    ? ((g = (0, S.jsx)(`div`, { style: p, children: h })),
      (t[8] = p),
      (t[9] = h),
      (t[10] = g))
    : (g = t[10]);
  let y;
  t[11] === n.number
    ? (y = t[12])
    : ((y = (0, S.jsxs)(`span`, {
        className: `text-xs font-black text-slate-700`,
        children: [`Krone #`, n.number],
      })),
      (t[11] = n.number),
      (t[12] = y));
  let b;
  t[13] === n.floor
    ? (b = t[14])
    : ((b = (0, S.jsx)(`span`, {
        className: `text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-full truncate`,
        children: n.floor,
      })),
      (t[13] = n.floor),
      (t[14] = b));
  let x;
  t[15] !== b || t[16] !== y
    ? ((x = (0, S.jsxs)(`div`, {
        className: `flex items-center gap-1.5`,
        children: [y, b],
      })),
      (t[15] = b),
      (t[16] = y),
      (t[17] = x))
    : (x = t[17]);
  let C;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = {
        height: 3,
        background: `#f1f5f9`,
        borderRadius: 99,
        marginTop: 4,
        overflow: `hidden`,
      }),
      (t[18] = C))
    : (C = t[18]);
  let w = `${s.pct}%`,
    T;
  t[19] !== s.accentColor || t[20] !== w
    ? ((T = (0, S.jsx)(`div`, {
        style: C,
        children: (0, S.jsx)(`div`, {
          style: {
            height: `100%`,
            width: w,
            background: s.accentColor,
            borderRadius: 99,
            transition: `width 0.3s`,
          },
        }),
      })),
      (t[19] = s.accentColor),
      (t[20] = w),
      (t[21] = T))
    : (T = t[21]);
  let E;
  t[22] !== x || t[23] !== T
    ? ((E = (0, S.jsxs)(`div`, {
        className: `flex-1 min-w-0`,
        children: [x, T],
      })),
      (t[22] = x),
      (t[23] = T),
      (t[24] = E))
    : (E = t[24]);
  let D;
  t[25] === s.okCount
    ? (D = t[26])
    : ((D =
        s.okCount > 0 &&
        (0, S.jsxs)(`span`, {
          style: {
            fontSize: 8,
            fontWeight: 900,
            background: `#f0fdf4`,
            color: `#16a34a`,
            border: `1px solid #bbf7d0`,
            padding: `1px 5px`,
            borderRadius: 99,
          },
          children: [`✓`, s.okCount],
        })),
      (t[25] = s.okCount),
      (t[26] = D));
  let O;
  t[27] === s.faultCount
    ? (O = t[28])
    : ((O =
        s.faultCount > 0 &&
        (0, S.jsxs)(`span`, {
          style: {
            fontSize: 8,
            fontWeight: 900,
            background: `#fef2f2`,
            color: `#dc2626`,
            border: `1px solid #fecaca`,
            padding: `1px 5px`,
            borderRadius: 99,
          },
          children: [`⚠`, s.faultCount],
        })),
      (t[27] = s.faultCount),
      (t[28] = O));
  let k;
  t[29] === s.emptyCount
    ? (k = t[30])
    : ((k =
        s.emptyCount > 0 &&
        s.emptyCount < 10 &&
        (0, S.jsxs)(`span`, {
          style: {
            fontSize: 8,
            fontWeight: 900,
            background: `#f8fafc`,
            color: `#94a3b8`,
            border: `1px solid #e2e8f0`,
            padding: `1px 5px`,
            borderRadius: 99,
          },
          children: [`○`, s.emptyCount],
        })),
      (t[29] = s.emptyCount),
      (t[30] = k));
  let A;
  t[31] !== D || t[32] !== O || t[33] !== k
    ? ((A = (0, S.jsxs)(`div`, {
        className: `flex items-center gap-1 shrink-0`,
        children: [D, O, k],
      })),
      (t[31] = D),
      (t[32] = O),
      (t[33] = k),
      (t[34] = A))
    : (A = t[34]);
  let j;
  t[35] === i
    ? (j = t[36])
    : ((j = (e) => {
        (e.stopPropagation(), i());
      }),
      (t[35] = i),
      (t[36] = j));
  let M = `w-6 h-6 flex items-center justify-center rounded-lg transition-all shrink-0 ${c ? `text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50` : `text-slate-200 hover:text-indigo-400 hover:bg-indigo-50`}`,
    N;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, S.jsx)(`i`, { className: `fas fa-history text-[8px]` })),
      (t[37] = N))
    : (N = t[37]);
  let P;
  t[38] !== j || t[39] !== M
    ? ((P = (0, S.jsx)(`button`, {
        onClick: j,
        title: `Lịch sử thay đổi`,
        className: M,
        children: N,
      })),
      (t[38] = j),
      (t[39] = M),
      (t[40] = P))
    : (P = t[40]);
  let F;
  t[41] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((F = (0, S.jsx)(`i`, { className: `fas fa-trash text-[8px]` })),
      (t[41] = F))
    : (F = t[41]);
  let L;
  t[42] === a
    ? (L = t[43])
    : ((L = (0, S.jsx)(`button`, {
        onClick: a,
        title: `Xóa`,
        className: `w-6 h-6 flex items-center justify-center text-slate-200 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all shrink-0`,
        children: F,
      })),
      (t[42] = a),
      (t[43] = L));
  let R;
  t[44] !== E || t[45] !== A || t[46] !== P || t[47] !== L || t[48] !== g
    ? ((R = (0, S.jsxs)(`div`, {
        className: `flex items-center gap-2 px-3 pt-3 pb-2`,
        children: [g, E, A, P, L],
      })),
      (t[44] = E),
      (t[45] = A),
      (t[46] = P),
      (t[47] = L),
      (t[48] = g),
      (t[49] = R))
    : (R = t[49]);
  let z, B;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((z = { display: `flex`, gap: 6, minWidth: `max-content` }),
      (B = Array.from({ length: 10 }, I)),
      (t[50] = z),
      (t[51] = B))
    : ((z = t[50]), (B = t[51]));
  let V;
  t[52] !== n.ports || t[53] !== r
    ? ((V = (0, S.jsx)(`div`, {
        className: `px-3 pb-3 overflow-x-auto`,
        children: (0, S.jsx)(`div`, {
          style: z,
          children: B.map((e) => {
            let t = v(n.ports?.[String(e)]);
            return (0, S.jsxs)(
              `div`,
              {
                style: {
                  display: `flex`,
                  flexDirection: `column`,
                  alignItems: `center`,
                  gap: 3,
                },
                children: [
                  (0, S.jsx)(`button`, {
                    onClick: (t) => r(e, t.currentTarget),
                    title: `Port ${e}`,
                    className: `krone-port-cell`,
                    style: {
                      width: 44,
                      height: 44,
                      background: t.bg,
                      border: `1.5px solid ${t.border}`,
                      borderRadius: 10,
                      display: `flex`,
                      flexDirection: `column`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      gap: 1,
                      cursor: `pointer`,
                      boxShadow: `0 1px 3px rgba(0,0,0,0.05)`,
                    },
                    children:
                      t.status === `fault`
                        ? (0, S.jsxs)(S.Fragment, {
                            children: [
                              (0, S.jsx)(`i`, {
                                className: `fas fa-exclamation-triangle`,
                                style: { fontSize: 9, color: `#f87171` },
                              }),
                              t.displayText &&
                                (0, S.jsx)(`span`, {
                                  style: {
                                    fontSize: 8,
                                    fontWeight: 900,
                                    color: t.textColor,
                                    lineHeight: 1,
                                  },
                                  children: t.displayText,
                                }),
                            ],
                          })
                        : (0, S.jsx)(`span`, {
                            style: {
                              fontSize: t.status === `ok` ? 11 : 12,
                              fontWeight: t.status === `ok` ? 900 : 700,
                              color: t.textColor,
                              letterSpacing: t.status === `ok` ? -0.3 : void 0,
                            },
                            children: t.displayText,
                          }),
                  }),
                  (0, S.jsx)(`span`, {
                    style: {
                      fontSize: 8,
                      fontWeight: 800,
                      color: `#94a3b8`,
                      letterSpacing: 0.2,
                    },
                    children: e,
                  }),
                ],
              },
              e,
            );
          }),
        }),
      })),
      (t[52] = n.ports),
      (t[53] = r),
      (t[54] = V))
    : (V = t[54]);
  let H;
  return (
    t[55] !== l || t[56] !== R || t[57] !== V || t[58] !== d
      ? ((H = (0, S.jsxs)(`div`, {
          id: l,
          className: `bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden`,
          style: d,
          children: [R, V],
        })),
        (t[55] = l),
        (t[56] = R),
        (t[57] = V),
        (t[58] = d),
        (t[59] = H))
      : (H = t[59]),
    H
  );
}
function I(e, t) {
  return t + 1;
}
function L(e) {
  let t = (0, m.c)(14),
    { db: n, activeFloor: r, onPortClick: i, onShowLogs: a, onDelete: o } = e,
    s,
    c;
  if (t[0] !== r || t[1] !== n || t[2] !== o || t[3] !== i || t[4] !== a) {
    c = Symbol.for(`react.early_return_sentinel`);
    bb0: {
      let e = h(n, r);
      if (e.length === 0) {
        let e;
        t[7] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, S.jsx)(`i`, {
              className: `fas fa-th text-4xl mb-3 block`,
            })),
            (t[7] = e))
          : (e = t[7]);
        let n = r
            ? `Chưa có Krone nào tại ${r}`
            : `Nhập tên tầng và nhấn + để tạo Krone đầu tiên`,
          i;
        (t[8] === n
          ? (i = t[9])
          : ((i = (0, S.jsx)(`div`, {
              className: `flex items-center justify-center h-full`,
              children: (0, S.jsxs)(`div`, {
                className: `text-center text-slate-300`,
                children: [
                  e,
                  (0, S.jsx)(`p`, {
                    className: `text-sm font-bold`,
                    children: n,
                  }),
                ],
              }),
            })),
            (t[8] = n),
            (t[9] = i)),
          (c = i));
        break bb0;
      }
      if (r) {
        let n;
        (t[10] !== o || t[11] !== i || t[12] !== a
          ? ((n = (e) =>
              (0, S.jsx)(
                F,
                {
                  krone: e,
                  onPortClick: (t, n) => i(e.id, t, n),
                  onShowLogs: () => a(e.id),
                  onDelete: () => o(e.id),
                },
                e.id,
              )),
            (t[10] = o),
            (t[11] = i),
            (t[12] = a),
            (t[13] = n))
          : (n = t[13]),
          (c = (0, S.jsx)(`div`, {
            className: `space-y-2`,
            children: e.map(n),
          })));
        break bb0;
      }
      let l = {};
      (e.forEach((e) => {
        (l[e.floor] || (l[e.floor] = []), l[e.floor].push(e));
      }),
        (s = (0, S.jsx)(S.Fragment, {
          children: Object.entries(l).map((e) => {
            let [t, n] = e;
            return (0, S.jsxs)(
              `div`,
              {
                className: `mb-6`,
                children: [
                  (0, S.jsxs)(`div`, {
                    className: `flex items-center gap-3 mb-3`,
                    children: [
                      (0, S.jsxs)(`h4`, {
                        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 shrink-0`,
                        children: [
                          (0, S.jsx)(`i`, {
                            className: `fas fa-layer-group text-indigo-400`,
                          }),
                          t,
                          (0, S.jsxs)(`span`, {
                            className: `text-slate-300 font-bold normal-case tracking-normal`,
                            children: [`(`, n.length, ` krone)`],
                          }),
                        ],
                      }),
                      (0, S.jsx)(`div`, {
                        className: `flex-1 border-t border-slate-100`,
                      }),
                    ],
                  }),
                  (0, S.jsx)(`div`, {
                    className: `space-y-2`,
                    children: n.map((e) =>
                      (0, S.jsx)(
                        F,
                        {
                          krone: e,
                          onPortClick: (t, n) => i(e.id, t, n),
                          onShowLogs: () => a(e.id),
                          onDelete: () => o(e.id),
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              },
              t,
            );
          }),
        })));
    }
    ((t[0] = r),
      (t[1] = n),
      (t[2] = o),
      (t[3] = i),
      (t[4] = a),
      (t[5] = s),
      (t[6] = c));
  } else ((s = t[5]), (c = t[6]));
  return c === Symbol.for(`react.early_return_sentinel`) ? s : c;
}
var R = 220;
function z(e) {
  let t = (0, m.c)(62),
    {
      krone: n,
      portNum: r,
      anchorRect: i,
      onSave: a,
      onClear: o,
      onClose: s,
    } = e,
    c = n.ports?.[String(r)],
    [l, u] = (0, p.useState)(c?.room ?? ``),
    [d, f] = (0, p.useState)(c?.status === `fault`),
    [h, g] = (0, p.useState)(c?.note ?? ``),
    _ = (0, p.useRef)(null),
    v,
    y;
  (t[0] === s
    ? ((v = t[1]), (y = t[2]))
    : ((v = () => {
        let e = function (e) {
          _.current && !_.current.contains(e.target) && s();
        };
        return (
          document.addEventListener(`mousedown`, e),
          () => document.removeEventListener(`mousedown`, e)
        );
      }),
      (y = [s]),
      (t[0] = s),
      (t[1] = v),
      (t[2] = y)),
    (0, p.useEffect)(v, y));
  let b = window.innerHeight - i.bottom,
    x = Math.min(i.left, window.innerWidth - 235),
    C = b >= R ? i.bottom + 6 : Math.max(6, i.top - R - 6),
    w;
  t[3] !== d || t[4] !== h || t[5] !== s || t[6] !== a || t[7] !== l
    ? ((w = function () {
        let e = l.trim(),
          t = h.trim();
        (a(
          !e && !d && !t
            ? null
            : { room: e, status: d ? `fault` : e ? `ok` : `empty`, note: t },
        ),
          s());
      }),
      (t[3] = d),
      (t[4] = h),
      (t[5] = s),
      (t[6] = a),
      (t[7] = l),
      (t[8] = w))
    : (w = t[8]);
  let T = w,
    E;
  t[9] !== o || t[10] !== s
    ? ((E = function () {
        (o(), s());
      }),
      (t[9] = o),
      (t[10] = s),
      (t[11] = E))
    : (E = t[11]);
  let D = E,
    O;
  t[12] !== x || t[13] !== C
    ? ((O = { minWidth: 200, left: x, top: C }),
      (t[12] = x),
      (t[13] = C),
      (t[14] = O))
    : (O = t[14]);
  let k;
  t[15] !== n.number || t[16] !== r
    ? ((k = (0, S.jsxs)(`span`, {
        className: `text-xs font-black text-slate-700`,
        children: [`Krone #`, n.number, ` — Port `, r],
      })),
      (t[15] = n.number),
      (t[16] = r),
      (t[17] = k))
    : (k = t[17]);
  let A;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (0, S.jsx)(`i`, { className: `fas fa-times text-[9px]` })),
      (t[18] = A))
    : (A = t[18]);
  let j;
  t[19] === s
    ? (j = t[20])
    : ((j = (0, S.jsx)(`button`, {
        onClick: s,
        className: `w-6 h-6 flex items-center justify-center text-slate-300 hover:text-slate-500 rounded-full hover:bg-slate-100 transition-all`,
        children: A,
      })),
      (t[19] = s),
      (t[20] = j));
  let M;
  t[21] !== k || t[22] !== j
    ? ((M = (0, S.jsxs)(`div`, {
        className: `flex items-center justify-between mb-3`,
        children: [k, j],
      })),
      (t[21] = k),
      (t[22] = j),
      (t[23] = M))
    : (M = t[23]);
  let N;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, S.jsx)(`label`, {
        className: `block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1`,
        htmlFor: `krone-port-room`,
        children: `Số phòng`,
      })),
      (t[24] = N))
    : (N = t[24]);
  let P;
  t[25] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((P = (e) => u(e.target.value)), (t[25] = P))
    : (P = t[25]);
  let F;
  t[26] === T
    ? (F = t[27])
    : ((F = (e) => {
        e.key === `Enter` && T();
      }),
      (t[26] = T),
      (t[27] = F));
  let I;
  t[28] !== l || t[29] !== F
    ? ((I = (0, S.jsxs)(`div`, {
        children: [
          N,
          (0, S.jsx)(`input`, {
            id: `krone-port-room`,
            value: l,
            onChange: P,
            onKeyDown: F,
            type: `text`,
            placeholder: `VD: 101`,
            maxLength: 10,
            className: `w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors`,
          }),
        ],
      })),
      (t[28] = l),
      (t[29] = F),
      (t[30] = I))
    : (I = t[30]);
  let L;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = (e) => f(e.target.checked)), (t[31] = L))
    : (L = t[31]);
  let z;
  t[32] === d
    ? (z = t[33])
    : ((z = (0, S.jsx)(`input`, {
        type: `checkbox`,
        checked: d,
        onChange: L,
        className: `w-4 h-4 rounded accent-red-500`,
      })),
      (t[32] = d),
      (t[33] = z));
  let B;
  t[34] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((B = (0, S.jsx)(`span`, {
        className: `text-xs font-bold text-red-500`,
        children: `Đánh dấu lỗi`,
      })),
      (t[34] = B))
    : (B = t[34]);
  let V;
  t[35] === z
    ? (V = t[36])
    : ((V = (0, S.jsxs)(`label`, {
        className: `flex items-center gap-2 cursor-pointer select-none`,
        children: [z, B],
      })),
      (t[35] = z),
      (t[36] = V));
  let H;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, S.jsx)(`label`, {
        className: `block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1`,
        htmlFor: `krone-port-note`,
        children: `Ghi chú`,
      })),
      (t[37] = H))
    : (H = t[37]);
  let ee;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ee = (e) => g(e.target.value)), (t[38] = ee))
    : (ee = t[38]);
  let U;
  t[39] === T
    ? (U = t[40])
    : ((U = (e) => {
        e.key === `Enter` && T();
      }),
      (t[39] = T),
      (t[40] = U));
  let W;
  t[41] !== h || t[42] !== U
    ? ((W = (0, S.jsxs)(`div`, {
        children: [
          H,
          (0, S.jsx)(`input`, {
            id: `krone-port-note`,
            value: h,
            onChange: ee,
            onKeyDown: U,
            type: `text`,
            placeholder: `Ghi chú thêm...`,
            className: `w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors`,
          }),
        ],
      })),
      (t[41] = h),
      (t[42] = U),
      (t[43] = W))
    : (W = t[43]);
  let G;
  t[44] === T
    ? (G = t[45])
    : ((G = (0, S.jsx)(`button`, {
        onClick: T,
        className: `flex-1 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all`,
        children: `Lưu`,
      })),
      (t[44] = T),
      (t[45] = G));
  let K;
  t[46] === D
    ? (K = t[47])
    : ((K = (0, S.jsx)(`button`, {
        onClick: D,
        className: `px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all`,
        children: `Xóa`,
      })),
      (t[46] = D),
      (t[47] = K));
  let q;
  t[48] !== G || t[49] !== K
    ? ((q = (0, S.jsxs)(`div`, {
        className: `flex gap-2 pt-1`,
        children: [G, K],
      })),
      (t[48] = G),
      (t[49] = K),
      (t[50] = q))
    : (q = t[50]);
  let J;
  t[51] !== I || t[52] !== V || t[53] !== W || t[54] !== q
    ? ((J = (0, S.jsxs)(`div`, {
        className: `space-y-2.5`,
        children: [I, V, W, q],
      })),
      (t[51] = I),
      (t[52] = V),
      (t[53] = W),
      (t[54] = q),
      (t[55] = J))
    : (J = t[55]);
  let Y;
  t[56] !== J || t[57] !== M
    ? ((Y = (0, S.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-2xl shadow-2xl p-4`,
        children: [M, J],
      })),
      (t[56] = J),
      (t[57] = M),
      (t[58] = Y))
    : (Y = t[58]);
  let te;
  return (
    t[59] !== Y || t[60] !== O
      ? ((te = (0, S.jsx)(`div`, {
          ref: _,
          className: `fixed z-[350]`,
          style: O,
          children: Y,
        })),
        (t[59] = Y),
        (t[60] = O),
        (t[61] = te))
      : (te = t[61]),
    te
  );
}
function B(e) {
  let t = (0, m.c)(20),
    { title: n, logs: r, onClose: i } = e,
    a;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((a = { display: `flex`, zIndex: 230 }), (t[0] = a))
    : (a = t[0]);
  let o;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((o = {
        width: 480,
        maxWidth: `96vw`,
        maxHeight: `85vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[1] = o))
    : (o = t[1]);
  let s;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, S.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center text-xs border border-indigo-100`,
        children: (0, S.jsx)(`i`, { className: `fas fa-history` }),
      })),
      (t[2] = s))
    : (s = t[2]);
  let c;
  t[3] === n
    ? (c = t[4])
    : ((c = (0, S.jsxs)(`h3`, {
        className: `text-base font-black text-slate-800 flex items-center gap-2.5`,
        children: [s, (0, S.jsx)(`span`, { children: n })],
      })),
      (t[3] = n),
      (t[4] = c));
  let l;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = (0, S.jsx)(`i`, { className: `fas fa-times text-xs` })), (t[5] = l))
    : (l = t[5]);
  let u;
  t[6] === i
    ? (u = t[7])
    : ((u = (0, S.jsx)(`button`, {
        onClick: i,
        title: `Đóng`,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100 flex items-center justify-center`,
        children: l,
      })),
      (t[6] = i),
      (t[7] = u));
  let d;
  t[8] !== c || t[9] !== u
    ? ((d = (0, S.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [c, u],
      })),
      (t[8] = c),
      (t[9] = u),
      (t[10] = d))
    : (d = t[10]);
  let f;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = { minHeight: 100 }), (t[11] = f))
    : (f = t[11]);
  let p;
  t[12] === r
    ? (p = t[13])
    : ((p = (0, S.jsx)(`div`, {
        className: `overflow-y-auto flex-1 pr-1`,
        style: f,
        children:
          r.length === 0
            ? (0, S.jsxs)(`div`, {
                className: `flex flex-col items-center justify-center py-12 text-slate-300`,
                children: [
                  (0, S.jsx)(`i`, {
                    className: `fas fa-history text-3xl mb-3`,
                  }),
                  (0, S.jsx)(`p`, {
                    className: `text-sm font-bold`,
                    children: `Chưa có lịch sử thay đổi`,
                  }),
                ],
              })
            : (0, S.jsxs)(`div`, {
                className: `relative`,
                children: [
                  (0, S.jsx)(`div`, {
                    className: `absolute left-[18px] top-0 bottom-0 w-0.5 bg-slate-100`,
                  }),
                  r.map(V),
                ],
              }),
      })),
      (t[12] = r),
      (t[13] = p));
  let h;
  t[14] === i
    ? (h = t[15])
    : ((h = (0, S.jsx)(`div`, {
        className: `shrink-0 pt-4 mt-2 border-t border-slate-100`,
        children: (0, S.jsx)(`button`, {
          onClick: i,
          className: `w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors`,
          children: `Đóng`,
        }),
      })),
      (t[14] = i),
      (t[15] = h));
  let g;
  return (
    t[16] !== h || t[17] !== d || t[18] !== p
      ? ((g = (0, S.jsx)(`div`, {
          className: `modal`,
          style: a,
          children: (0, S.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: o,
            children: [d, p, h],
          }),
        })),
        (t[16] = h),
        (t[17] = d),
        (t[18] = p),
        (t[19] = g))
      : (g = t[19]),
    g
  );
}
function V(e, t) {
  return (0, S.jsxs)(
    `div`,
    {
      className: `flex gap-3 pb-4 relative`,
      children: [
        (0, S.jsx)(`div`, {
          className: `w-9 h-9 rounded-full border-2 ${t === 0 ? `border-indigo-400 bg-indigo-50` : `border-slate-200 bg-white`} flex items-center justify-center shrink-0 z-10`,
          children: (0, S.jsx)(`i`, {
            className: `fas fa-pen text-[8px] ${t === 0 ? `text-indigo-500` : `text-slate-300`}`,
          }),
        }),
        (0, S.jsxs)(`div`, {
          className: `flex-1 min-w-0 pt-1`,
          children: [
            (0, S.jsx)(`p`, {
              className: `text-xs font-bold text-slate-700 leading-snug`,
              children: e.msg,
            }),
            (0, S.jsxs)(`p`, {
              className: `text-[9px] font-bold text-slate-400 mt-1`,
              children: [
                (0, S.jsx)(`i`, { className: `fas fa-user text-[7px] mr-1` }),
                e.user,
                (0, S.jsx)(`span`, { className: `mx-1.5`, children: `·` }),
                (0, S.jsx)(`i`, { className: `fas fa-clock text-[7px] mr-1` }),
                e.time,
              ],
            }),
          ],
        }),
      ],
    },
    t,
  );
}
function H(e) {
  let t = (0, m.c)(112),
    { onBack: n, username: o } = e,
    c = i(ie),
    l = i(re),
    u = i(ne),
    d = i(te),
    h = i(Y),
    g = i(J),
    _ = i(q),
    v = i(K),
    C = a(G),
    T = r(W),
    E = r(U),
    D = r(ee),
    [O, k] = (0, p.useState)(`ip`),
    [M, N] = (0, p.useState)(`all`),
    [F, I] = (0, p.useState)(`all`),
    [R, V] = (0, p.useState)(`closed`),
    [H, ae] = (0, p.useState)(!1),
    [oe, se] = (0, p.useState)(null),
    [ce, le] = (0, p.useState)(null),
    [X, ue] = (0, p.useState)(null),
    de,
    fe;
  (t[0] !== D || t[1] !== E || t[2] !== l || t[3] !== u
    ? ((de = () => {
        if (E) {
          if (E.module === `ipphone`) {
            let e = l.find((e) => e.id === E.phoneId);
            (k(`ip`), e && V(e), D());
          } else if (E.module === `krone`) {
            let e = u.find((e) => e.id === E.kroneId);
            if ((k(`krone`), e)) {
              let t = e.id;
              (le(e.floor),
                setTimeout(() => {
                  let e = document.getElementById(`krone-block-${t}`);
                  e &&
                    (e.scrollIntoView({ behavior: `smooth`, block: `center` }),
                    e.classList.remove(`elv-focus-flash`),
                    e.classList.add(`elv-focus-flash`),
                    setTimeout(
                      () => e.classList.remove(`elv-focus-flash`),
                      2600,
                    ));
                }, 50));
            }
            D();
          }
        }
      }),
      (fe = [E, D, l, u]),
      (t[0] = D),
      (t[1] = E),
      (t[2] = l),
      (t[3] = u),
      (t[4] = de),
      (t[5] = fe))
    : ((de = t[4]), (fe = t[5])),
    (0, p.useEffect)(de, fe));
  let pe;
  t[6] !== v || t[7] !== h || t[8] !== l || t[9] !== C || t[10] !== o
    ? ((pe = function (e) {
        let t = l.find((t) => t.id === e);
        C(`Xóa điện thoại này khỏi danh bạ?`, `confirm`, () => {
          (t &&
            v(
              `Phone ${t.extension || t.name || `N/A`}`,
              `Đã xóa: Ext ${t.extension || `—`} · ${t.name || `—`}`,
              o,
            ),
            h(e));
        });
      }),
      (t[6] = v),
      (t[7] = h),
      (t[8] = l),
      (t[9] = C),
      (t[10] = o),
      (t[11] = pe))
    : (pe = t[11]);
  let me = pe,
    he;
  t[12] === l
    ? (he = t[13])
    : ((he = function (e) {
        let t = l.find((t) => t.id === e);
        t &&
          se({
            title: `Lịch sử — ${t.extension ? `Ext ` + t.extension + ` · ` : ``}${t.name || `Điện thoại`}`,
            logs: t.logs ?? [],
          });
      }),
      (t[12] = l),
      (t[13] = he));
  let ge = he,
    _e;
  t[14] !== d || t[15] !== C
    ? ((_e = function (e) {
        (e.forEach((e) => d(e)),
          ae(!1),
          C(`Đã import ${e.length} máy điện thoại vào danh bạ!`, `success`));
      }),
      (t[14] = d),
      (t[15] = C),
      (t[16] = _e))
    : (_e = t[16]);
  let ve = _e,
    ye;
  t[17] !== v || t[18] !== u || t[19] !== g || t[20] !== o
    ? ((ye = function (e) {
        let t = u.filter((t) => t.floor === e).length + 1,
          n = {
            id: `krone-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            floor: e,
            number: t,
            ports: {},
          },
          r = y(e, t);
        (g({ ...n, logs: s(void 0, r, o) }),
          v(`Krone #${t} ${e}`, r, o),
          le(e));
      }),
      (t[17] = v),
      (t[18] = u),
      (t[19] = g),
      (t[20] = o),
      (t[21] = ye))
    : (ye = t[21]);
  let be = ye,
    xe;
  t[22] !== v ||
  t[23] !== _ ||
  t[24] !== u ||
  t[25] !== g ||
  t[26] !== C ||
  t[27] !== o
    ? ((xe = function (e) {
        let t = u.find((t) => t.id === e);
        t &&
          C(`Xóa Krone #${t.number} (${t.floor})?`, `confirm`, () => {
            (v(
              `Krone #${t.number} ${t.floor}`,
              `Đã xóa Krone #${t.number} tại ${t.floor}`,
              o,
            ),
              _(e),
              u
                .filter((n) => n.floor === t.floor && n.id !== e)
                .forEach((e, t) => g({ ...e, number: t + 1 })));
          });
      }),
      (t[22] = v),
      (t[23] = _),
      (t[24] = u),
      (t[25] = g),
      (t[26] = C),
      (t[27] = o),
      (t[28] = xe))
    : (xe = t[28]);
  let Se = xe,
    Ce;
  t[29] === u
    ? (Ce = t[30])
    : ((Ce = function (e) {
        let t = u.find((t) => t.id === e);
        t &&
          se({
            title: `Lịch sử — Krone #${t.number} · ${t.floor}`,
            logs: t.logs ?? [],
          });
      }),
      (t[29] = u),
      (t[30] = Ce));
  let we = Ce,
    Te;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Te = function (e, t, n) {
        ue({ kroneId: e, portNum: t, anchorRect: n.getBoundingClientRect() });
      }),
      (t[31] = Te))
    : (Te = t[31]);
  let Ee = Te,
    De;
  t[32] !== v || t[33] !== u || t[34] !== X || t[35] !== g || t[36] !== o
    ? ((De = function (e) {
        if (!X) return;
        let t = u.find((e) => e.id === X.kroneId);
        if (!t) return;
        let n = t.ports?.[String(X.portNum)],
          r = { ...t.ports },
          i;
        (e === null
          ? (delete r[String(X.portNum)], (i = x(n, X.portNum)))
          : ((r[String(X.portNum)] = e), (i = b(n, e, X.portNum))),
          g({ ...t, ports: r, logs: i ? s(t.logs, i, o) : t.logs }),
          i && v(`Krone #${t.number} ${t.floor}`, i, o));
      }),
      (t[32] = v),
      (t[33] = u),
      (t[34] = X),
      (t[35] = g),
      (t[36] = o),
      (t[37] = De))
    : (De = t[37]);
  let Oe = De,
    ke;
  t[38] !== v || t[39] !== u || t[40] !== X || t[41] !== g || t[42] !== o
    ? ((ke = function () {
        if (!X) return;
        let e = u.find((e) => e.id === X.kroneId);
        if (!e) return;
        let t = e.ports?.[String(X.portNum)],
          n = { ...e.ports };
        delete n[String(X.portNum)];
        let r = x(t, X.portNum);
        (g({ ...e, ports: n, logs: r ? s(e.logs, r, o) : e.logs }),
          r && v(`Krone #${e.number} ${e.floor}`, r, o));
      }),
      (t[38] = v),
      (t[39] = u),
      (t[40] = X),
      (t[41] = g),
      (t[42] = o),
      (t[43] = ke))
    : (ke = t[43]);
  let Ae = ke,
    je;
  t[44] !== u || t[45] !== X
    ? ((je = X ? u.find((e) => e.id === X.kroneId) : null),
      (t[44] = u),
      (t[45] = X),
      (t[46] = je))
    : (je = t[46]);
  let Me = je,
    Ne;
  t[47] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ne = (0, S.jsxs)(`div`, {
        children: [
          (0, S.jsxs)(`h2`, {
            className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
            children: [
              (0, S.jsx)(`div`, {
                className: `w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100`,
                children: (0, S.jsx)(`i`, { className: `fas fa-phone-alt` }),
              }),
              `Điện Thoại IP — VLAN 150`,
            ],
          }),
          (0, S.jsx)(`p`, {
            className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
            children: `Danh bạ nội bộ & quản lý máy điện thoại IP`,
          }),
        ],
      })),
      (t[47] = Ne))
    : (Ne = t[47]);
  let Z;
  t[48] === T
    ? (Z = t[49])
    : ((Z = () => T(`ipphone`)), (t[48] = T), (t[49] = Z));
  let Pe;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Pe = (0, S.jsx)(`i`, {
        className: `fas fa-chart-bar text-indigo-400`,
      })),
      (t[50] = Pe))
    : (Pe = t[50]);
  let Q;
  t[51] === Z
    ? (Q = t[52])
    : ((Q = (0, S.jsxs)(`button`, {
        onClick: Z,
        className: `px-4 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2`,
        children: [Pe, ` Báo cáo`],
      })),
      (t[51] = Z),
      (t[52] = Q));
  let Fe;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Fe = () => ae(!0)), (t[53] = Fe))
    : (Fe = t[53]);
  let Ie, Le;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ie = (0, S.jsxs)(`button`, {
        onClick: Fe,
        className: `px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2`,
        children: [
          (0, S.jsx)(`i`, { className: `fas fa-file-import text-slate-400` }),
          ` Import từ Switch`,
        ],
      })),
      (Le = () => V(null)),
      (t[54] = Ie),
      (t[55] = Le))
    : ((Ie = t[54]), (Le = t[55]));
  let Re;
  t[56] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (0, S.jsxs)(`button`, {
        onClick: Le,
        className: `px-5 py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-green-700 transition-all flex items-center gap-2`,
        children: [(0, S.jsx)(`i`, { className: `fas fa-plus` }), ` Thêm máy`],
      })),
      (t[56] = Re))
    : (Re = t[56]);
  let ze;
  t[57] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ze = (0, S.jsx)(`i`, { className: `fas fa-arrow-left` })), (t[57] = ze))
    : (ze = t[57]);
  let $;
  t[58] === n
    ? ($ = t[59])
    : (($ = (0, S.jsxs)(`button`, {
        onClick: n,
        className: `px-4 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
        children: [ze, ` Quay lại`],
      })),
      (t[58] = n),
      (t[59] = $));
  let Be;
  t[60] !== Q || t[61] !== $
    ? ((Be = (0, S.jsxs)(`div`, {
        className: `view-header px-6 py-4 bg-white border-b border-slate-200 shrink-0 flex justify-between items-center shadow-sm`,
        children: [
          Ne,
          (0, S.jsxs)(`div`, {
            className: `view-header-actions flex items-center gap-3`,
            children: [Q, Ie, Re, $],
          }),
        ],
      })),
      (t[60] = Q),
      (t[61] = $),
      (t[62] = Be))
    : (Be = t[62]);
  let Ve;
  t[63] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ve = () => k(`ip`)), (t[63] = Ve))
    : (Ve = t[63]);
  let He = `px-5 py-3 text-xs font-black border-b-2 flex items-center gap-2 transition-all ${O === `ip` ? `border-green-500 text-green-600` : `border-transparent text-slate-400 hover:text-slate-600`}`,
    Ue;
  t[64] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ue = (0, S.jsx)(`i`, { className: `fas fa-phone-alt text-[10px]` })),
      (t[64] = Ue))
    : (Ue = t[64]);
  let We;
  t[65] === He
    ? (We = t[66])
    : ((We = (0, S.jsxs)(`button`, {
        onClick: Ve,
        className: He,
        children: [Ue, ` Danh sách IP Phone`],
      })),
      (t[65] = He),
      (t[66] = We));
  let Ge;
  t[67] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ge = () => k(`krone`)), (t[67] = Ge))
    : (Ge = t[67]);
  let Ke = `px-5 py-3 text-xs font-black border-b-2 flex items-center gap-2 transition-all ${O === `krone` ? `border-indigo-500 text-indigo-600` : `border-transparent text-slate-400 hover:text-slate-600`}`,
    qe;
  t[68] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((qe = (0, S.jsx)(`i`, { className: `fas fa-th text-[10px]` })),
      (t[68] = qe))
    : (qe = t[68]);
  let Je;
  t[69] === Ke
    ? (Je = t[70])
    : ((Je = (0, S.jsxs)(`button`, {
        onClick: Ge,
        className: Ke,
        children: [qe, ` Krone Analog`],
      })),
      (t[69] = Ke),
      (t[70] = Je));
  let Ye;
  t[71] !== We || t[72] !== Je
    ? ((Ye = (0, S.jsxs)(`div`, {
        className: `flex border-b border-slate-200 bg-white shrink-0 px-4`,
        children: [We, Je],
      })),
      (t[71] = We),
      (t[72] = Je),
      (t[73] = Ye))
    : (Ye = t[73]);
  let Xe;
  t[74] !== O ||
  t[75] !== c ||
  t[76] !== F ||
  t[77] !== be ||
  t[78] !== Se ||
  t[79] !== me ||
  t[80] !== we ||
  t[81] !== ge ||
  t[82] !== l ||
  t[83] !== ce ||
  t[84] !== u ||
  t[85] !== M
    ? ((Xe = (0, S.jsx)(`div`, {
        className: `view-body flex flex-1 overflow-hidden`,
        children:
          O === `ip`
            ? (0, S.jsxs)(S.Fragment, {
                children: [
                  (0, S.jsx)(w, {
                    db: l,
                    statusFilter: M,
                    onStatusFilterChange: N,
                    floorFilter: F,
                    onFloorFilterChange: I,
                  }),
                  (0, S.jsx)(A, {
                    db: c,
                    phones: l,
                    statusFilter: M,
                    floorFilter: F,
                    onEdit: V,
                    onDeleteId: me,
                    onShowLogsId: ge,
                    onBulkDelete: (ids) => {
                      if (!ids || ids.length === 0) return;
                      let count = ids.length;
                      C(`Bạn có chắc chắn muốn xóa ${count} điện thoại IP đã chọn khỏi danh bạ?`, `confirm`, () => {
                        ids.forEach((id) => h(id));
                        v(`Điện thoại IP: Xóa hàng loạt`, `Đã xóa ${count} điện thoại IP`, o);
                        C(`Đã xóa thành công ${count} điện thoại IP!`, `success`);
                      });
                    },
                  }),
                ],
              })
            : (0, S.jsxs)(S.Fragment, {
                children: [
                  (0, S.jsx)(P, {
                    db: u,
                    activeFloor: ce,
                    onSelectFloor: le,
                    onCreateFloor: be,
                  }),
                  (0, S.jsx)(`div`, {
                    className: `flex-1 flex flex-col overflow-hidden`,
                    children: (0, S.jsx)(`div`, {
                      className: `flex-1 overflow-auto custom-scroll p-5`,
                      children: (0, S.jsx)(L, {
                        db: u,
                        activeFloor: ce,
                        onPortClick: Ee,
                        onShowLogs: we,
                        onDelete: Se,
                      }),
                    }),
                  }),
                ],
              }),
      })),
      (t[74] = O),
      (t[75] = c),
      (t[76] = F),
      (t[77] = be),
      (t[78] = Se),
      (t[79] = me),
      (t[80] = we),
      (t[81] = ge),
      (t[82] = l),
      (t[83] = ce),
      (t[84] = u),
      (t[85] = M),
      (t[86] = Xe))
    : (Xe = t[86]);
  let Ze;
  t[87] !== c || t[88] !== R || t[89] !== d || t[90] !== o
    ? ((Ze =
        R !== `closed` &&
        (0, S.jsx)(f, {
          record: R,
          db: c,
          username: o,
          onSave: (e) => {
            (d(e), V(`closed`));
          },
          onClose: () => V(`closed`),
        })),
      (t[87] = c),
      (t[88] = R),
      (t[89] = d),
      (t[90] = o),
      (t[91] = Ze))
    : (Ze = t[91]);
  let Qe;
  t[92] !== c || t[93] !== ve || t[94] !== H || t[95] !== l
    ? ((Qe =
        H &&
        (0, S.jsx)(j, {
          db: c,
          ipPhoneDB: l,
          onImport: ve,
          onClose: () => ae(!1),
        })),
      (t[92] = c),
      (t[93] = ve),
      (t[94] = H),
      (t[95] = l),
      (t[96] = Qe))
    : (Qe = t[96]);
  let $e;
  t[97] === oe
    ? ($e = t[98])
    : (($e =
        oe &&
        (0, S.jsx)(B, {
          title: oe.title,
          logs: oe.logs,
          onClose: () => se(null),
        })),
      (t[97] = oe),
      (t[98] = $e));
  let et;
  t[99] !== Me || t[100] !== Ae || t[101] !== Oe || t[102] !== X
    ? ((et =
        X &&
        Me &&
        (0, S.jsx)(z, {
          krone: Me,
          portNum: X.portNum,
          anchorRect: X.anchorRect,
          onSave: Oe,
          onClear: Ae,
          onClose: () => ue(null),
        })),
      (t[99] = Me),
      (t[100] = Ae),
      (t[101] = Oe),
      (t[102] = X),
      (t[103] = et))
    : (et = t[103]);
  let tt;
  return (
    t[104] !== Be ||
    t[105] !== Ye ||
    t[106] !== Xe ||
    t[107] !== Ze ||
    t[108] !== Qe ||
    t[109] !== $e ||
    t[110] !== et
      ? ((tt = (0, S.jsxs)(`div`, {
          className: `w-full h-full flex flex-col relative bg-slate-50/50`,
          children: [Be, Ye, Xe, Ze, Qe, $e, et],
        })),
        (t[104] = Be),
        (t[105] = Ye),
        (t[106] = Xe),
        (t[107] = Ze),
        (t[108] = Qe),
        (t[109] = $e),
        (t[110] = et),
        (t[111] = tt))
      : (tt = t[111]),
    tt
  );
}
function ee(e) {
  return e.clearFocusRequest;
}
function U(e) {
  return e.focusRequest;
}
function W(e) {
  return e.openReportModal;
}
function G(e) {
  return e.showDialog;
}
function K(e) {
  return e.addGlobalLog;
}
function q(e) {
  return e.deleteKrone;
}
function J(e) {
  return e.saveKrone;
}
function Y(e) {
  return e.deleteIPPhone;
}
function te(e) {
  return e.saveIPPhone;
}
function ne(e) {
  return e.KroneDB;
}
function re(e) {
  return e.IPPhoneDB;
}
function ie(e) {
  return e.DB;
}
export { H as default };
