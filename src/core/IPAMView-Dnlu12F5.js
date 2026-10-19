import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Nt as r,
  f as i,
  l as a,
  r as o,
  s,
  t as c,
  tn as l,
} from "./index-QE6I14Fy.js";
import { i as u, n as d, r as f, t as p } from "./Vlan120Picker-mRn3H8_7.js";
import { n as m, t as h } from "./BackupHistoryModal-DIkefmZZ.js";
import {
  getAllSubnets,
  saveSubnet,
  deleteSubnet,
  getCustomIpAllocations,
  setIpAllocation,
  deleteIpAllocation,
} from "../services/ipamManager.js";
import SubnetManageModal from "../components/modals/SubnetManageModal.jsx";
import IpAllocationModal from "../components/modals/IpAllocationModal.jsx";
var g = e(t(), 1),
  _ = l(),
  v = n();
function y(e) {
  let { db: n, elevatorDB: r, activeVlanId: i, onSelect: a, subnets: subMap, onAddSubnet, onEditSubnet, onDeleteSubnet, isAdmin = true } = e;
  let currentSubnets = subMap || getAllSubnets();
  return (0, v.jsxs)(`div`, {
    id: `ipam-subnet-list`,
    className: `view-sidebar w-[380px] bg-white border-r border-slate-200 overflow-y-auto custom-scroll p-4 space-y-2`,
    children: [
      (0, v.jsxs)(`div`, {
        className: `flex justify-between items-center px-2 pt-2 mb-3`,
        children: [
          (0, v.jsx)(`h3`, {
            className: `text-xs font-black text-slate-800 uppercase tracking-widest`,
            children: `Subnets List`,
          }),
          (0, v.jsxs)(`button`, {
            type: `button`,
            onClick: () => onAddSubnet && onAddSubnet(),
            className: `text-[11px] font-bold px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-all`,
            children: [
              (0, v.jsx)(`i`, { className: `fas fa-plus text-[9px]` }),
              `Thêm Subnet`,
            ],
          }),
        ],
      }),
      Object.keys(currentSubnets).length === 0
        ? (0, v.jsx)(`div`, {
            className: `p-6 text-center text-xs text-slate-400 italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200 mt-2`,
            children: `Chưa có Subnet nào. Bấm "+ Thêm Subnet" để bắt đầu quy hoạch IP.`,
          })
        : Object.entries(currentSubnets).map((entry) => {
        let [t, o] = entry,
          s = u(t, n, r),
          { totalIps: c, usedCount: l, percent: d } = f(o.subnet, s);
        return (0, v.jsxs)(
          `div`,
          {
            className: `subnet-card p-3 rounded-xl border border-slate-100 bg-white cursor-pointer relative group ${i === t ? `active` : ``}`,
            onClick: () => a(t),
            children: [
              (0, v.jsxs)(`div`, {
                className: `flex items-center justify-between gap-2`,
                children: [
                  (0, v.jsxs)(`div`, {
                    className: `flex items-center gap-3 min-w-0 flex-1`,
                    children: [
                      (0, v.jsx)(`div`, {
                        className: `w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0`,
                        style: { backgroundColor: o.color },
                        children: (0, v.jsx)(`i`, {
                          className: `fas ${o.icon}`,
                        }),
                      }),
                      (0, v.jsxs)(`div`, {
                        className: `flex-1 min-w-0`,
                        children: [
                          (0, v.jsxs)(`h4`, {
                            className: `text-xs font-black text-slate-800 truncate`,
                            children: [`VLAN `, t, ` - `, o.name],
                          }),
                          (0, v.jsx)(`p`, {
                            className: `text-[10px] font-mono text-slate-500 font-bold bg-slate-50 inline-block px-1 rounded border border-slate-100 mt-1`,
                            children: o.subnet,
                          }),
                        ],
                      }),
                    ],
                  }),
                  isAdmin && (0, v.jsxs)(`div`, {
                    className: `flex items-center gap-1 shrink-0`,
                    onClick: (ev) => ev.stopPropagation(),
                    children: [
                      (0, v.jsx)(`button`, {
                        type: `button`,
                        onClick: (ev) => {
                          ev.stopPropagation();
                          onEditSubnet && onEditSubnet(t, o);
                        },
                        title: `Chỉnh sửa Subnet`,
                        className: `w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 flex items-center justify-center text-xs transition-colors`,
                        children: (0, v.jsx)(`i`, { className: `fas fa-pen` }),
                      }),
                      (0, v.jsx)(`button`, {
                        type: `button`,
                        onClick: (ev) => {
                          ev.stopPropagation();
                          onDeleteSubnet && onDeleteSubnet(t, o);
                        },
                        title: `Xóa Subnet`,
                        className: `w-7 h-7 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center text-xs transition-colors`,
                        children: (0, v.jsx)(`i`, { className: `fas fa-trash-alt` }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, v.jsxs)(`div`, {
                className: `mt-3`,
                children: [
                  (0, v.jsxs)(`div`, {
                    className: `flex justify-between text-[9px] font-bold text-slate-500 mb-1`,
                    children: [
                      (0, v.jsxs)(`span`, {
                        children: [`Used: `, l, `/`, c || `-`],
                      }),
                      (0, v.jsxs)(`span`, { children: [d, `%`] }),
                    ],
                  }),
                  (0, v.jsx)(`div`, {
                    className: `w-full h-1.5 bg-slate-100 rounded-full overflow-hidden`,
                    children: (0, v.jsx)(`div`, {
                      className: `h-full rounded-full transition-all`,
                      style: { width: `${d}%`, backgroundColor: o.color },
                    }),
                  }),
                ],
              }),
            ],
          },
          t,
        );
      }),
    ],
  });
}
function b(e) {
  let t = (0, _.c)(18),
    { subnet: n, page: r, usedMap: i, onPageChange: a, onIpClick } = e,
    o,
    s,
    c,
    l;
  if (t[0] !== r || t[1] !== n || t[2] !== i) {
    let { totalPages: e, blocks: a } = d(n, r, i);
    ((l = e), (s = (r - 1) * 4096 + 1), (o = a.reduce(S, 0) + (r - 1) * 4096));
    let u;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((u = { available: ``, used: `ip-used`, reserved: `ip-reserved` }),
        (t[7] = u))
      : (u = t[7]);
    let f = u,
      p;
    (t[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (e) =>
          (0, v.jsxs)(
            `div`,
            {
              className: `ip-block mb-6`,
              children: [
                (0, v.jsxs)(`h4`, {
                  className: `text-[10px] font-bold text-slate-500 mb-2 pb-1 border-b border-slate-100 flex justify-between uppercase tracking-widest`,
                  children: [
                    (0, v.jsxs)(`span`, {
                      children: [
                        `Block: `,
                        (0, v.jsx)(`span`, {
                          className: `text-indigo-600 font-black`,
                          children: e.blockLabel,
                        }),
                      ],
                    }),
                    (0, v.jsxs)(`span`, { children: [e.ips.length, ` IP`] }),
                  ],
                }),
                (0, v.jsx)(`div`, {
                  className: `ip-grid`,
                  children: e.ips.map((ipObj) =>
                    (0, v.jsx)(
                      `div`,
                      {
                        className: `ip-box ${f[ipObj.status] || ''} cursor-pointer hover:ring-2 hover:ring-indigo-400 transition-all`,
                        title: `${ipObj.title || ipObj.ip} (Click để gán/chỉnh sửa)`,
                        onClick: () => onIpClick && onIpClick(ipObj.ip, i[ipObj.ip] || ipObj),
                      },
                      ipObj.ip,
                    ),
                  ),
                }),
              ],
            },
            e.blockLabel,
          )),
        (t[8] = p))
      : (p = t[8]),
      (c = a.map(p)),
      (t[0] = r),
      (t[1] = n),
      (t[2] = i),
      (t[3] = o),
      (t[4] = s),
      (t[5] = c),
      (t[6] = l));
  } else ((o = t[3]), (s = t[4]), (c = t[5]), (l = t[6]));
  let u;
  t[9] !== o || t[10] !== a || t[11] !== r || t[12] !== s || t[13] !== l
    ? ((u =
        l > 1 &&
        (0, v.jsxs)(`div`, {
          className: `mt-6 flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200`,
          children: [
            (0, v.jsxs)(`span`, {
              className: `text-xs font-bold text-slate-500`,
              children: [
                (0, v.jsx)(`i`, { className: `fas fa-layer-group mr-1.5` }),
                ` Hiển thị IP từ`,
                ` `,
                (0, v.jsx)(`span`, {
                  className: `text-indigo-600 font-black`,
                  children: s,
                }),
                ` đến`,
                ` `,
                (0, v.jsx)(`span`, {
                  className: `text-indigo-600 font-black`,
                  children: o,
                }),
              ],
            }),
            (0, v.jsx)(`div`, {
              className: `flex gap-2`,
              children: Array.from({ length: l }, x).map((e) =>
                (0, v.jsx)(
                  `button`,
                  {
                    onClick: () => a(e),
                    className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${r === e ? `bg-indigo-600 text-white shadow-md` : `bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-300`}`,
                    children: e,
                  },
                  e,
                ),
              ),
            }),
          ],
        })),
      (t[9] = o),
      (t[10] = a),
      (t[11] = r),
      (t[12] = s),
      (t[13] = l),
      (t[14] = u))
    : (u = t[14]);
  let f;
  return (
    t[15] !== c || t[16] !== u
      ? ((f = (0, v.jsxs)(`div`, { children: [c, u] })),
        (t[15] = c),
        (t[16] = u),
        (t[17] = f))
      : (f = t[17]),
    f
  );
}
function x(e, t) {
  return t + 1;
}
function S(e, t) {
  return e + t.ips.length;
}
function C(e) {
  let t = (0, _.c)(49),
    { vid: n, db: r, elevatorDB: i, nvrSlot: a, subnets: subMap, ipAllocations, onIpClick } = e,
    [s, c] = (0, g.useState)(1),
    currentSubnets = subMap || getAllSubnets(),
    l = currentSubnets[n] || currentSubnets[Number(n)] || o[Number(n)] || { name: `VLAN ${n}`, color: '#4f46e5', icon: 'fa-network-wired', subnet: '192.168.1.0/24' };
  let rawP = u(n, r, i),
    p = { ...rawP };
  if (ipAllocations) {
    for (let [allocIp, alloc] of Object.entries(ipAllocations)) {
      if (alloc.vlan == null || String(alloc.vlan) === String(n)) {
        p[allocIp] = {
          ip: allocIp,
          n: alloc.name,
          swName: alloc.status === 'reserved' ? 'Đặt trước (Reserved)' : 'Gán thủ công',
          port: 'Static',
          icon: alloc.icon || 'fa-desktop',
          mac: alloc.mac,
          note: alloc.note,
          status: alloc.status,
          isManual: true,
        };
      }
    }
  }
  let d = f(l.subnet, p);
  let { totalIps: m, usedCount: h } = d;
  if (l.subnet === `N/A`) {
    let e;
    return (
      t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, v.jsx)(`div`, {
            className: `h-full flex items-center justify-center text-center`,
            children: (0, v.jsx)(`p`, {
              className: `text-sm text-slate-400`,
              children: `Subnet này chưa được quy hoạch IP.`,
            }),
          })),
          (t[6] = e))
        : (e = t[6]),
      e
    );
  }
  let y = `fas ${l.icon}`,
    x;
  t[7] === y
    ? (x = t[8])
    : ((x = (0, v.jsx)(`div`, {
        className: `absolute -right-4 -top-4 opacity-5 text-9xl text-slate-800 pointer-events-none`,
        children: (0, v.jsx)(`i`, { className: y }),
      })),
      (t[7] = y),
      (t[8] = x));
  let S;
  t[9] === l.color
    ? (S = t[10])
    : ((S = { background: l.color }), (t[9] = l.color), (t[10] = S));
  let C;
  t[11] !== S || t[12] !== n
    ? ((C = (0, v.jsxs)(`span`, {
        className: `px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-widest mb-2 inline-block shadow-sm`,
        style: S,
        children: [`VLAN `, n],
      })),
      (t[11] = S),
      (t[12] = n),
      (t[13] = C))
    : (C = t[13]);
  let w;
  t[14] === l.name
    ? (w = t[15])
    : ((w = (0, v.jsxs)(`h2`, {
        className: `text-2xl font-black text-slate-800 tracking-tight`,
        children: [l.name, ` Subnet`],
      })),
      (t[14] = l.name),
      (t[15] = w));
  let T;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, v.jsx)(`p`, {
        className: `text-sm text-slate-500 font-medium mt-1`,
        children: `Quản lý dải IP tĩnh & DHCP Pool`,
      })),
      (t[16] = T))
    : (T = t[16]);
  let E;
  t[17] !== C || t[18] !== w
    ? ((E = (0, v.jsxs)(`div`, { children: [C, w, T] })),
      (t[17] = C),
      (t[18] = w),
      (t[19] = E))
    : (E = t[19]);
  let D;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = (0, v.jsx)(`p`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Network / CIDR`,
      })),
      (t[20] = D))
    : (D = t[20]);
  let O;
  t[21] === l.subnet
    ? (O = t[22])
    : ((O = (0, v.jsxs)(`div`, {
        className: `text-right`,
        children: [
          D,
          (0, v.jsx)(`p`, {
            className: `text-base font-mono font-black text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100`,
            children: l.subnet,
          }),
        ],
      })),
      (t[21] = l.subnet),
      (t[22] = O));
  let k;
  t[23] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, v.jsx)(`p`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Total IPs`,
      })),
      (t[23] = k))
    : (k = t[23]);
  let A;
  t[24] === m
    ? (A = t[25])
    : ((A = (0, v.jsxs)(`div`, {
        className: `text-right`,
        children: [
          k,
          (0, v.jsx)(`p`, {
            className: `text-base font-black text-indigo-600`,
            children: m,
          }),
        ],
      })),
      (t[24] = m),
      (t[25] = A));
  let j;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((j = (0, v.jsx)(`p`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Used`,
      })),
      (t[26] = j))
    : (j = t[26]);
  let M;
  t[27] === h
    ? (M = t[28])
    : ((M = (0, v.jsxs)(`div`, {
        className: `text-right`,
        children: [
          j,
          (0, v.jsx)(`p`, {
            className: `text-base font-black text-emerald-600`,
            children: h,
          }),
        ],
      })),
      (t[27] = h),
      (t[28] = M));
  let N;
  t[29] !== O || t[30] !== A || t[31] !== M
    ? ((N = (0, v.jsxs)(`div`, {
        className: `flex gap-6`,
        children: [O, A, M],
      })),
      (t[29] = O),
      (t[30] = A),
      (t[31] = M),
      (t[32] = N))
    : (N = t[32]);
  let P;
  t[33] !== N || t[34] !== x || t[35] !== E
    ? ((P = (0, v.jsxs)(`div`, {
        className: `bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 flex justify-between items-center relative overflow-hidden`,
        children: [x, E, N],
      })),
      (t[33] = N),
      (t[34] = x),
      (t[35] = E),
      (t[36] = P))
    : (P = t[36]);
  let F;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((F = (0, v.jsxs)(`h3`, {
        className: `text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
        children: [
          (0, v.jsx)(`i`, { className: `fas fa-th text-indigo-500` }),
          ` Chi tiết dải IP (IP Allocation)`,
        ],
      })),
      (t[37] = F))
    : (F = t[37]);
  let I;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((I = (0, v.jsxs)(`div`, {
        className: `flex items-center gap-1.5`,
        children: [
          (0, v.jsx)(`div`, {
            className: `w-3 h-3 rounded bg-slate-100 border border-slate-200`,
          }),
          (0, v.jsx)(`span`, {
            className: `text-[10px] font-bold text-slate-500 uppercase`,
            children: `Available`,
          }),
        ],
      })),
      (t[38] = I))
    : (I = t[38]);
  let L;
  t[39] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = (0, v.jsxs)(`div`, {
        className: `flex items-center gap-1.5`,
        children: [
          (0, v.jsx)(`div`, {
            className: `w-3 h-3 rounded bg-emerald-500 shadow-sm`,
          }),
          (0, v.jsx)(`span`, {
            className: `text-[10px] font-bold text-slate-500 uppercase`,
            children: `Used`,
          }),
        ],
      })),
      (t[39] = L))
    : (L = t[39]);
  let R;
  t[40] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((R = (0, v.jsxs)(`div`, {
        className: `flex items-center justify-between mb-4 pb-4 border-b border-slate-100`,
        children: [
          F,
          (0, v.jsxs)(`div`, {
            className: `flex gap-4`,
            children: [
              I,
              L,
              (0, v.jsxs)(`div`, {
                className: `flex items-center gap-1.5`,
                children: [
                  (0, v.jsx)(`div`, {
                    className: `w-3 h-3 rounded bg-amber-500 opacity-80 shadow-sm`,
                  }),
                  (0, v.jsx)(`span`, {
                    className: `text-[10px] font-bold text-slate-500 uppercase`,
                    children: `Reserved`,
                  }),
                ],
              }),
            ],
          }),
        ],
      })),
      (t[40] = R))
    : (R = t[40]);
  let z;
  t[41] !== l.subnet || t[42] !== s || t[43] !== p
    ? ((z = (0, v.jsxs)(`div`, {
        className: `bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6`,
        children: [
          R,
          (0, v.jsx)(b, {
            subnet: l.subnet,
            page: s,
            usedMap: p,
            onPageChange: c,
            onIpClick: onIpClick,
          }),
        ],
      })),
      (t[41] = l.subnet),
      (t[42] = s),
      (t[43] = p),
      (t[44] = z))
    : (z = t[44]);
  let ee;
  return (
    t[45] !== a || t[46] !== P || t[47] !== z
      ? ((ee = (0, v.jsxs)(`div`, {
          className: `max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-300`,
          children: [P, a, z],
        })),
        (t[45] = a),
        (t[46] = P),
        (t[47] = z),
        (t[48] = ee))
      : (ee = t[48]),
    ee
  );
}
var w = {
    ok: `text-emerald-500`,
    warn: `text-amber-400`,
    fail: `text-red-500`,
  },
  T = { ok: `OK`, warn: `Warn`, fail: `Lỗi` };
function E(e) {
  let t = (0, _.c)(33),
    {
      nvrDB: n,
      usedMap: r,
      onAddNew: i,
      onEdit: a,
      onDelete: o,
      onViewChannels: s,
      isAdmin = true,
    } = e,
    c;
  t[0] === r
    ? (c = t[1])
    : ((c = {}),
      Object.values(r).forEach((e) => {
        e.nvr &&
          e.nvr.trim() &&
          (c[e.nvr] || (c[e.nvr] = []), c[e.nvr].push(e));
      }),
      (t[0] = r),
      (t[1] = c));
  let l;
  if (t[2] !== c || t[3] !== n) {
    let e = n.map(O),
      r;
    t[5] === c ? (r = t[6]) : ((r = Object.keys(c)), (t[5] = c), (t[6] = r));
    let i = [...e, ...r],
      a;
    (t[7] === i ? (a = t[8]) : ((a = new Set(i)), (t[7] = i), (t[8] = a)),
      (l = Array.from(a)),
      (t[2] = c),
      (t[3] = n),
      (t[4] = l));
  } else l = t[4];
  let u = l;
  if (u.length === 0) {
    let e;
    t[9] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((e = (0, v.jsxs)(`span`, {
          className: `text-xs font-bold text-slate-400 flex items-center gap-2`,
          children: [
            (0, v.jsx)(`i`, { className: `fas fa-video text-slate-300` }),
            `Chưa có NVR nào`,
          ],
        })),
        (t[9] = e))
      : (e = t[9]);
    let n;
    t[10] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((n = (0, v.jsx)(`i`, { className: `fas fa-plus text-[9px]` })),
        (t[10] = n))
      : (n = t[10]);
    let r;
    return (
      t[11] === i
        ? (r = t[12])
        : ((r = (0, v.jsx)(`div`, {
            className: `mt-4 bg-white p-4 rounded-xl border border-dashed border-slate-200`,
            children: (0, v.jsxs)(`div`, {
              className: `flex items-center justify-between`,
              children: [
                e,
                isAdmin && (0, v.jsxs)(`button`, {
                  onClick: i,
                  className: `px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-[10px] font-bold text-orange-600 hover:bg-orange-100 transition-all flex items-center gap-1.5`,
                  children: [n, `Thêm NVR`],
                }),
              ],
            }),
          })),
          (t[11] = i),
          (t[12] = r)),
      r
    );
  }
  let d;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = (0, v.jsx)(`i`, { className: `fas fa-video text-orange-500` })),
      (t[13] = d))
    : (d = t[13]);
  let f;
  t[14] === u.length
    ? (f = t[15])
    : ((f = (0, v.jsxs)(`h3`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
        children: [
          d,
          ` Đầu ghi NVR`,
          (0, v.jsxs)(`span`, {
            className: `text-[10px] font-bold text-slate-400 normal-case tracking-normal`,
            children: [`(`, u.length, ` thiết bị)`],
          }),
        ],
      })),
      (t[14] = u.length),
      (t[15] = f));
  let p;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = (0, v.jsx)(`i`, { className: `fas fa-plus text-[9px]` })),
      (t[16] = p))
    : (p = t[16]);
  let m;
  t[17] === i
    ? (m = t[18])
    : ((m = isAdmin && (0, v.jsxs)(`button`, {
        onClick: i,
        className: `px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-[10px] font-bold text-orange-600 hover:bg-orange-100 transition-all flex items-center gap-1.5`,
        children: [p, `Thêm NVR`],
      })),
      (t[17] = i),
      (t[18] = m));
  let h;
  t[19] !== f || t[20] !== m
    ? ((h = (0, v.jsxs)(`div`, {
        className: `flex items-center justify-between mb-3`,
        children: [f, m],
      })),
      (t[19] = f),
      (t[20] = m),
      (t[21] = h))
    : (h = t[21]);
  let g;
  t[22] !== u ||
  t[23] !== c ||
  t[24] !== n ||
  t[25] !== i ||
  t[26] !== o ||
  t[27] !== a ||
  t[28] !== s
    ? ((g = (0, v.jsx)(`div`, {
        className: `grid grid-cols-3 gap-3`,
        children: u.map((e) => {
          let t = n.find((t) => t.name === e),
            r = c[e] ?? [],
            l = t?.channels || 32,
            u = r.length,
            d = Math.round((u / l) * 100),
            f =
              d >= 90
                ? `bg-red-500`
                : d >= 70
                  ? `bg-amber-400`
                  : `bg-emerald-500`;
          return (0, v.jsxs)(
            `div`,
            {
              className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-orange-200 transition-all`,
              children: [
                (0, v.jsxs)(`div`, {
                  className: `flex items-start justify-between mb-3`,
                  children: [
                    (0, v.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, v.jsx)(`div`, {
                          className: `w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center text-sm shrink-0`,
                          children: (0, v.jsx)(`i`, {
                            className: `fas fa-server`,
                          }),
                        }),
                        (0, v.jsxs)(`div`, {
                          children: [
                            (0, v.jsx)(`p`, {
                              className: `text-xs font-black text-slate-800 leading-tight`,
                              children: e,
                            }),
                            t?.model &&
                              (0, v.jsxs)(`p`, {
                                className: `text-[9px] font-bold text-slate-400 leading-tight`,
                                children: [
                                  t.brand ? `${t.brand} · ` : ``,
                                  t.model,
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                    (0, v.jsx)(`div`, {
                      className: `flex items-center gap-1`,
                      children: t
                        ? (isAdmin ? (0, v.jsxs)(v.Fragment, {
                            children: [
                              (0, v.jsx)(`button`, {
                                onClick: () => a(t.id),
                                title: `Chỉnh sửa`,
                                className: `p-1 rounded hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-colors`,
                                children: (0, v.jsx)(`i`, {
                                  className: `fas fa-pen text-[10px]`,
                                }),
                              }),
                              (0, v.jsx)(`button`, {
                                onClick: () => o(t.id),
                                title: `Xoá`,
                                className: `p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors`,
                                children: (0, v.jsx)(`i`, {
                                  className: `fas fa-trash text-[10px]`,
                                }),
                              }),
                            ],
                          }) : null)
                        : (isAdmin ? (0, v.jsx)(`button`, {
                            onClick: i,
                            className: `px-2 py-0.5 text-[9px] font-bold bg-orange-50 border border-orange-200 rounded text-orange-600 hover:bg-orange-100 transition-colors`,
                            children: `+ Thêm vào DB`,
                          }) : null),
                    }),
                  ],
                }),
                t?.ip &&
                  (0, v.jsxs)(`div`, {
                    className: `flex items-center gap-1.5 mb-2`,
                    children: [
                      (0, v.jsx)(`i`, {
                        className: `fas fa-network-wired text-[9px] text-slate-400`,
                      }),
                      (0, v.jsx)(`span`, {
                        className: `text-[10px] font-mono font-bold text-slate-600`,
                        children: t.ip,
                      }),
                    ],
                  }),
                (t?.floor || t?.location) &&
                  (0, v.jsxs)(`div`, {
                    className: `flex items-center gap-1.5 mb-2`,
                    children: [
                      (0, v.jsx)(`i`, {
                        className: `fas fa-map-marker-alt text-[9px] text-slate-400`,
                      }),
                      (0, v.jsx)(`span`, {
                        className: `text-[10px] font-bold text-slate-500`,
                        children: [t?.floor, t?.location]
                          .filter(Boolean)
                          .join(` · `),
                      }),
                    ],
                  }),
                (0, v.jsxs)(`div`, {
                  className: `mb-1 flex items-center justify-between`,
                  children: [
                    (0, v.jsx)(`span`, {
                      className: `text-[9px] font-black text-slate-400 uppercase tracking-widest`,
                      children: `Kênh camera`,
                    }),
                    (0, v.jsxs)(`span`, {
                      className: `text-[10px] font-black ${u >= l ? `text-red-500` : `text-emerald-600`}`,
                      children: [u, `/`, l, ` CH`],
                    }),
                  ],
                }),
                (0, v.jsx)(`div`, {
                  className: `w-full bg-slate-100 rounded-full h-1.5 mb-2`,
                  children: (0, v.jsx)(`div`, {
                    className: `${f} h-1.5 rounded-full transition-all`,
                    style: { width: `${Math.min(d, 100)}%` },
                  }),
                }),
                t?.drives?.length
                  ? (0, v.jsx)(`div`, {
                      className: `mt-2 space-y-1`,
                      children: t.drives.map(D),
                    })
                  : null,
                t?.notes &&
                  (0, v.jsx)(`p`, {
                    className: `text-[9px] text-slate-400 italic mt-2 line-clamp-2`,
                    children: t.notes,
                  }),
                (0, v.jsxs)(`button`, {
                  onClick: () => s(e),
                  className: `mt-3 w-full py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all flex items-center justify-center gap-1.5`,
                  children: [
                    (0, v.jsx)(`i`, {
                      className: `fas fa-th-large text-[9px]`,
                    }),
                    `Xem kênh`,
                  ],
                }),
              ],
            },
            e,
          );
        }),
      })),
      (t[22] = u),
      (t[23] = c),
      (t[24] = n),
      (t[25] = i),
      (t[26] = o),
      (t[27] = a),
      (t[28] = s),
      (t[29] = g))
    : (g = t[29]);
  let y;
  return (
    t[30] !== h || t[31] !== g
      ? ((y = (0, v.jsxs)(`div`, {
          className: `mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4`,
          children: [h, g],
        })),
        (t[30] = h),
        (t[31] = g),
        (t[32] = y))
      : (y = t[32]),
    y
  );
}
function D(e) {
  return (0, v.jsxs)(
    `div`,
    {
      className: `flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg`,
      children: [
        (0, v.jsx)(`i`, {
          className: `fas fa-hdd ${w[e.status] || `text-slate-400`} text-[10px] shrink-0`,
        }),
        (0, v.jsxs)(`span`, {
          className: `text-[9px] font-black text-slate-700 shrink-0`,
          children: [`Slot `, e.slot],
        }),
        (0, v.jsx)(`span`, {
          className: `text-[9px] font-bold text-slate-600 shrink-0`,
          children: e.size || `—`,
        }),
        (0, v.jsx)(`span`, {
          className: `text-[8px] font-bold text-slate-400 bg-white border border-slate-200 px-1 rounded shrink-0`,
          children: e.type,
        }),
        [e.brand, e.serial].filter(Boolean).length > 0
          ? (0, v.jsx)(`span`, {
              className: `text-[8px] font-bold text-slate-400 truncate flex-1`,
              title: [e.brand, e.serial].filter(Boolean).join(` · `),
              children: [e.brand, e.serial].filter(Boolean).join(` · `),
            })
          : (0, v.jsx)(`span`, { className: `flex-1` }),
        (0, v.jsx)(`span`, {
          className: `text-[8px] font-black ${w[e.status] || `text-slate-400`} shrink-0`,
          children: T[e.status] || e.status,
        }),
      ],
    },
    e.slot,
  );
}
function O(e) {
  return e.name;
}
function k(e) {
  let t = (0, _.c)(25),
    { nvrName: n, usedMap: r, onClose: i } = e,
    a,
    o;
  if (t[0] !== n || t[1] !== r) {
    a = Object.values(r).filter((e) => e.nvr === n);
    let e = {},
      i = [];
    (a.forEach((t) => {
      let n = parseInt(String(t.ch), 10);
      n >= 1 && n <= 32 ? (e[n] = t) : i.push(t);
    }),
      (o = []));
    for (let t = 1; t <= 32; t++) {
      let n = e[t];
      (!n && i.length > 0 && (n = i.shift()), o.push(n));
    }
    ((t[0] = n), (t[1] = r), (t[2] = a), (t[3] = o));
  } else ((a = t[2]), (o = t[3]));
  let s;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = { display: `flex` }), (t[4] = s))
    : (s = t[4]);
  let c;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = { width: 860, maxWidth: `95vw` }), (t[5] = c))
    : (c = t[5]);
  let l;
  t[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = (0, v.jsx)(`div`, {
        className: `w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm border border-amber-100`,
        children: (0, v.jsx)(`i`, { className: `fas fa-server` }),
      })),
      (t[6] = l))
    : (l = t[6]);
  let u;
  t[7] === n
    ? (u = t[8])
    : ((u = (0, v.jsxs)(`span`, {
        className: `block`,
        children: [`Đầu ghi: `, n, ` (32 Kênh)`],
      })),
      (t[7] = n),
      (t[8] = u));
  let d;
  t[9] === a.length
    ? (d = t[10])
    : ((d = (0, v.jsxs)(`span`, {
        className: `text-[10px] font-bold text-slate-500 uppercase tracking-widest`,
        children: [`Đang kết nối: `, a.length, `/32 Camera`],
      })),
      (t[9] = a.length),
      (t[10] = d));
  let f;
  t[11] !== u || t[12] !== d
    ? ((f = (0, v.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [l, (0, v.jsxs)(`div`, { children: [u, d] })],
      })),
      (t[11] = u),
      (t[12] = d),
      (t[13] = f))
    : (f = t[13]);
  let p;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = (0, v.jsx)(`i`, { className: `fas fa-times` })), (t[14] = p))
    : (p = t[14]);
  let m;
  t[15] === i
    ? (m = t[16])
    : ((m = (0, v.jsx)(`button`, {
        onClick: i,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors`,
        children: p,
      })),
      (t[15] = i),
      (t[16] = m));
  let h;
  t[17] !== f || t[18] !== m
    ? ((h = (0, v.jsxs)(`div`, {
        className: `flex justify-between items-center mb-6`,
        children: [f, m],
      })),
      (t[17] = f),
      (t[18] = m),
      (t[19] = h))
    : (h = t[19]);
  let g;
  t[20] === o
    ? (g = t[21])
    : ((g = (0, v.jsx)(`div`, {
        className: `grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3`,
        children: o.map(A),
      })),
      (t[20] = o),
      (t[21] = g));
  let y;
  return (
    t[22] !== g || t[23] !== h
      ? ((y = (0, v.jsx)(`div`, {
          className: `modal`,
          style: s,
          children: (0, v.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: c,
            children: [h, g],
          }),
        })),
        (t[22] = g),
        (t[23] = h),
        (t[24] = y))
      : (y = t[24]),
    y
  );
}
function A(e, t) {
  let n = t + 1;
  return e
    ? (0, v.jsxs)(
        `div`,
        {
          className: `p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col items-center text-center shadow-sm relative overflow-hidden group`,
          children: [
            (0, v.jsxs)(`span`, {
              className: `text-[9px] font-black text-white bg-emerald-500 px-1.5 py-0.5 rounded shadow-sm mb-2 absolute top-2 left-2 z-10`,
              children: [`CH `, n],
            }),
            (0, v.jsx)(`i`, {
              className: `fas fa-video text-emerald-500 text-xl mb-1 mt-3 relative z-10`,
            }),
            (0, v.jsx)(`span`, {
              className: `text-[10px] font-bold text-slate-800 truncate w-full relative z-10 mt-1`,
              title: e.n,
              children: e.n,
            }),
            (0, v.jsx)(`span`, {
              className: `text-[9px] font-mono font-bold text-slate-500 bg-white border border-slate-100 px-1 rounded mt-0.5 relative z-10`,
              children: e.ip || `No IP`,
            }),
            e.camType &&
              (0, v.jsx)(`span`, {
                className: `text-[8px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded mt-1 border border-amber-100 relative z-10`,
                children: e.camType,
              }),
            (0, v.jsxs)(`span`, {
              className: `text-[8px] font-medium text-slate-400 mt-1 relative z-10 line-clamp-1`,
              title: `${e.swName} (P${e.port})`,
              children: [
                (0, v.jsx)(`i`, { className: `fas fa-server mr-0.5` }),
                e.swName,
              ],
            }),
          ],
        },
        n,
      )
    : (0, v.jsxs)(
        `div`,
        {
          className: `p-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center opacity-60`,
          children: [
            (0, v.jsxs)(`span`, {
              className: `text-[9px] font-black text-slate-400 mb-2`,
              children: [`CH `, n],
            }),
            (0, v.jsx)(`i`, {
              className: `fas fa-video-slash text-slate-300 text-xl mb-1`,
            }),
            (0, v.jsx)(`span`, {
              className: `text-[10px] font-bold text-slate-400 mt-1`,
              children: `Trống`,
            }),
          ],
        },
        n,
      );
}
function j(e) {
  return `Thêm mới NVR [${e}]`;
}
function M(e) {
  return `Cập nhật thông tin NVR [${e}]`;
}
function N(e, t) {
  let n =
      t.status === `ok`
        ? `✅ thành công`
        : t.status === `failed`
          ? `❌ thất bại`
          : `⏭️ bỏ qua`,
    r = e.brand ? ` [${e.brand}]` : ``;
  return `Backup ${e.name}${r} — ${n}${t.configFile ? ` · ` + t.configFile : ``}`;
}
var P = [`HDD`, `SSD`, `NVMe`],
  F = [
    [`ok`, `Bình thường`],
    [`warn`, `Cảnh báo`],
    [`fail`, `Lỗi`],
  ];
function I(e) {
  let t = (0, _.c)(135),
    {
      record: n,
      db: o,
      elevatorDB: s,
      username: l,
      onSave: u,
      onDelete: d,
      onClose: f,
    } = e,
    y = a(ne),
    b = a(te),
    [x, S] = (0, g.useState)(!1),
    [C, w] = (0, g.useState)(n?.name ?? ``),
    [T, E] = (0, g.useState)(n?.ip ?? ``),
    [D, O] = (0, g.useState)(n?.channels ? String(n.channels) : ``),
    [k, A] = (0, g.useState)(n?.brand ?? ``),
    [I, re] = (0, g.useState)(n?.model ?? ``),
    [B, ie] = (0, g.useState)(n?.floor ?? ``),
    [V, ae] = (0, g.useState)(n?.location ?? ``),
    [H, oe] = (0, g.useState)(n?.notes ?? ``),
    se;
  t[0] === n?.drives
    ? (se = t[1])
    : ((se = n?.drives ?? []), (t[0] = n?.drives), (t[1] = se));
  let [U, ce] = (0, g.useState)(se),
    [le, ue] = (0, g.useState)(!1),
    [de, fe] = (0, g.useState)(!1),
    [pe, me] = (0, g.useState)(!1),
    he;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((he = function () {
        ce(ee);
      }),
      (t[2] = he))
    : (he = t[2]);
  let ge = he,
    _e;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_e = function (e) {
        ce((t) => t.filter((t, n) => n !== e).map(z));
      }),
      (t[3] = _e))
    : (_e = t[3]);
  let ve = _e,
    ye;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ye = function (e, t, n) {
        ce((r) => r.map((r, i) => (i === e ? { ...r, [t]: n } : r)));
      }),
      (t[4] = ye))
    : (ye = t[4]);
  let be = ye,
    xe;
  t[5] !== b ||
  t[6] !== k ||
  t[7] !== D ||
  t[8] !== U ||
  t[9] !== B ||
  t[10] !== T ||
  t[11] !== V ||
  t[12] !== I ||
  t[13] !== C ||
  t[14] !== H ||
  t[15] !== u ||
  t[16] !== n ||
  t[17] !== l
    ? ((xe = function () {
        let e = C.trim();
        if (!e) {
          ue(!0);
          return;
        }
        let t = n ? M(e) : j(e),
          i = {
            id: n?.id ?? `nvr-${Date.now()}`,
            name: e,
            ip: T.trim(),
            channels: parseInt(D, 10) || 0,
            brand: k.trim(),
            model: I.trim(),
            floor: B.trim(),
            location: V.trim(),
            notes: H.trim(),
            drives: U,
            logs: r(n?.logs, t, l),
            ...(n?.backup ? { backup: n.backup } : {}),
          };
        (u(i), b(`NVR: ${e}`, t, l));
      }),
      (t[5] = b),
      (t[6] = k),
      (t[7] = D),
      (t[8] = U),
      (t[9] = B),
      (t[10] = T),
      (t[11] = V),
      (t[12] = I),
      (t[13] = C),
      (t[14] = H),
      (t[15] = u),
      (t[16] = n),
      (t[17] = l),
      (t[18] = xe))
    : (xe = t[18]);
  let Se = xe,
    Ce;
  t[19] === n
    ? (Ce = t[20])
    : ((Ce = n?.backup ? i(n.backup) : null), (t[19] = n), (t[20] = Ce));
  let W = Ce,
    we;
  t[21] === n
    ? (we = t[22])
    : ((we = n ? { name: n.name, ip: n.ip ?? ``, backup: n.backup } : null),
      (t[21] = n),
      (t[22] = we));
  let G = we,
    Te;
  t[23] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Te = { display: `flex`, zIndex: 222 }), (t[23] = Te))
    : (Te = t[23]);
  let Ee;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ee = {
        width: 640,
        maxHeight: `92vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[24] = Ee))
    : (Ee = t[24]);
  let De;
  t[25] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((De = (0, v.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center text-xs border border-orange-100`,
        children: (0, v.jsx)(`i`, { className: `fas fa-server` }),
      })),
      (t[25] = De))
    : (De = t[25]);
  let Oe = n ? `Chỉnh sửa NVR` : `Thêm NVR`,
    K;
  t[26] === Oe
    ? (K = t[27])
    : ((K = (0, v.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [De, (0, v.jsx)(`span`, { children: Oe })],
      })),
      (t[26] = Oe),
      (t[27] = K));
  let ke;
  t[28] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ke = (0, v.jsx)(`i`, { className: `fas fa-times` })), (t[28] = ke))
    : (ke = t[28]);
  let q;
  t[29] === f
    ? (q = t[30])
    : ((q = (0, v.jsx)(`button`, {
        onClick: f,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: ke,
      })),
      (t[29] = f),
      (t[30] = q));
  let J;
  t[31] !== K || t[32] !== q
    ? ((J = (0, v.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [K, q],
      })),
      (t[31] = K),
      (t[32] = q),
      (t[33] = J))
    : (J = t[33]);
  let Ae;
  t[34] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ae = (0, v.jsxs)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3`,
        children: [
          (0, v.jsx)(`i`, {
            className: `fas fa-info-circle text-orange-400 mr-1`,
          }),
          `Thông tin NVR`,
        ],
      })),
      (t[34] = Ae))
    : (Ae = t[34]);
  let je;
  t[35] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((je = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Tên NVR`,
      })),
      (t[35] = je))
    : (je = t[35]);
  let Me;
  t[36] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Me = (e) => {
        (w(e.target.value), ue(!1));
      }),
      (t[36] = Me))
    : (Me = t[36]);
  let Y;
  t[37] === C
    ? (Y = t[38])
    : ((Y = (0, v.jsx)(`input`, {
        value: C,
        onChange: Me,
        placeholder: `VD: NVR-01, NVR-LOBBY...`,
        className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
      })),
      (t[37] = C),
      (t[38] = Y));
  let X;
  t[39] === le
    ? (X = t[40])
    : ((X =
        le &&
        (0, v.jsx)(`p`, {
          className: `text-[10px] text-red-500 font-bold mt-1`,
          children: `Vui lòng nhập tên NVR`,
        })),
      (t[39] = le),
      (t[40] = X));
  let Z;
  t[41] !== Y || t[42] !== X
    ? ((Z = (0, v.jsxs)(`div`, {
        className: `col-span-2`,
        children: [je, Y, X],
      })),
      (t[41] = Y),
      (t[42] = X),
      (t[43] = Z))
    : (Z = t[43]);
  let Ne;
  t[44] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ne = (0, v.jsxs)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: [
          `IP Address `,
          (0, v.jsx)(`span`, {
            className: `text-orange-400`,
            children: `(VLAN 120)`,
          }),
        ],
      })),
      (t[44] = Ne))
    : (Ne = t[44]);
  let Pe;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Pe = (e) => E(e.target.value)), (t[45] = Pe))
    : (Pe = t[45]);
  let Fe;
  t[46] === T
    ? (Fe = t[47])
    : ((Fe = (0, v.jsx)(`input`, {
        value: T,
        onChange: Pe,
        placeholder: `172.16.x.x`,
        className: `flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-orange-400`,
      })),
      (t[46] = T),
      (t[47] = Fe));
  let Ie;
  t[48] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ie = () => S(!0)), (t[48] = Ie))
    : (Ie = t[48]);
  let Le;
  t[49] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Le = (0, v.jsx)(`button`, {
        onClick: Ie,
        className: `px-2.5 py-2 bg-orange-50 border border-orange-200 rounded-xl text-orange-500 hover:bg-orange-100 transition-all shrink-0`,
        title: `Chọn từ VLAN 120`,
        children: (0, v.jsx)(`i`, { className: `fas fa-search text-xs` }),
      })),
      (t[49] = Le))
    : (Le = t[49]);
  let Re;
  t[50] === Fe
    ? (Re = t[51])
    : ((Re = (0, v.jsxs)(`div`, {
        children: [
          Ne,
          (0, v.jsxs)(`div`, { className: `flex gap-1.5`, children: [Fe, Le] }),
        ],
      })),
      (t[50] = Fe),
      (t[51] = Re));
  let ze;
  t[52] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ze = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Số kênh`,
      })),
      (t[52] = ze))
    : (ze = t[52]);
  let Be;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Be = (e) => O(e.target.value)), (t[53] = Be))
    : (Be = t[53]);
  let Ve;
  t[54] === D
    ? (Ve = t[55])
    : ((Ve = (0, v.jsxs)(`div`, {
        children: [
          ze,
          (0, v.jsx)(`input`, {
            value: D,
            onChange: Be,
            type: `number`,
            min: 1,
            max: 256,
            placeholder: `32`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
          }),
        ],
      })),
      (t[54] = D),
      (t[55] = Ve));
  let He;
  t[56] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((He = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Hãng`,
      })),
      (t[56] = He))
    : (He = t[56]);
  let Ue;
  t[57] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ue = (e) => A(e.target.value)), (t[57] = Ue))
    : (Ue = t[57]);
  let We;
  t[58] === k
    ? (We = t[59])
    : ((We = (0, v.jsxs)(`div`, {
        children: [
          He,
          (0, v.jsx)(`input`, {
            value: k,
            onChange: Ue,
            placeholder: `Hikvision, Dahua...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
          }),
        ],
      })),
      (t[58] = k),
      (t[59] = We));
  let Ge;
  t[60] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ge = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Model`,
      })),
      (t[60] = Ge))
    : (Ge = t[60]);
  let Ke;
  t[61] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ke = (e) => re(e.target.value)), (t[61] = Ke))
    : (Ke = t[61]);
  let qe;
  t[62] === I
    ? (qe = t[63])
    : ((qe = (0, v.jsxs)(`div`, {
        children: [
          Ge,
          (0, v.jsx)(`input`, {
            value: I,
            onChange: Ke,
            placeholder: `DS-9632NI-I8`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
          }),
        ],
      })),
      (t[62] = I),
      (t[63] = qe));
  let Je;
  t[64] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Je = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Tầng`,
      })),
      (t[64] = Je))
    : (Je = t[64]);
  let Ye;
  t[65] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ye = (e) => ie(e.target.value)), (t[65] = Ye))
    : (Ye = t[65]);
  let Xe;
  t[66] === B
    ? (Xe = t[67])
    : ((Xe = (0, v.jsxs)(`div`, {
        children: [
          Je,
          (0, v.jsx)(`input`, {
            value: B,
            onChange: Ye,
            placeholder: `Tầng 1, B1...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
          }),
        ],
      })),
      (t[66] = B),
      (t[67] = Xe));
  let Ze;
  t[68] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ze = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Vị trí`,
      })),
      (t[68] = Ze))
    : (Ze = t[68]);
  let Qe;
  t[69] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Qe = (e) => ae(e.target.value)), (t[69] = Qe))
    : (Qe = t[69]);
  let $e;
  t[70] === V
    ? ($e = t[71])
    : (($e = (0, v.jsxs)(`div`, {
        children: [
          Ze,
          (0, v.jsx)(`input`, {
            value: V,
            onChange: Qe,
            placeholder: `Phòng kỹ thuật, Rack A...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
          }),
        ],
      })),
      (t[70] = V),
      (t[71] = $e));
  let et;
  t[72] !== Z ||
  t[73] !== Re ||
  t[74] !== Ve ||
  t[75] !== We ||
  t[76] !== qe ||
  t[77] !== Xe ||
  t[78] !== $e
    ? ((et = (0, v.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [Z, Re, Ve, We, qe, Xe, $e],
      })),
      (t[72] = Z),
      (t[73] = Re),
      (t[74] = Ve),
      (t[75] = We),
      (t[76] = qe),
      (t[77] = Xe),
      (t[78] = $e),
      (t[79] = et))
    : (et = t[79]);
  let tt;
  t[80] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((tt = (0, v.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Ghi chú`,
      })),
      (t[80] = tt))
    : (tt = t[80]);
  let nt;
  t[81] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((nt = (e) => oe(e.target.value)), (t[81] = nt))
    : (nt = t[81]);
  let rt;
  t[82] === H
    ? (rt = t[83])
    : ((rt = (0, v.jsxs)(`div`, {
        className: `mt-3`,
        children: [
          tt,
          (0, v.jsx)(`textarea`, {
            value: H,
            onChange: nt,
            rows: 2,
            placeholder: `Ghi chú...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400 resize-none`,
          }),
        ],
      })),
      (t[82] = H),
      (t[83] = rt));
  let it;
  t[84] !== et || t[85] !== rt
    ? ((it = (0, v.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [Ae, et, rt],
      })),
      (t[84] = et),
      (t[85] = rt),
      (t[86] = it))
    : (it = t[86]);
  let at;
  t[87] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((at = (0, v.jsxs)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: [
          (0, v.jsx)(`i`, { className: `fas fa-hdd text-slate-400 mr-1` }),
          `Ổ cứng`,
        ],
      })),
      (t[87] = at))
    : (at = t[87]);
  let ot;
  t[88] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ot = (0, v.jsxs)(`div`, {
        className: `flex items-center justify-between mb-3`,
        children: [
          at,
          (0, v.jsxs)(`button`, {
            onClick: ge,
            className: `px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-orange-400 hover:text-orange-600 transition-all`,
            children: [
              (0, v.jsx)(`i`, { className: `fas fa-plus mr-1 text-[9px]` }),
              `Thêm ổ`,
            ],
          }),
        ],
      })),
      (t[88] = ot))
    : (ot = t[88]);
  let st;
  t[89] === U
    ? (st = t[90])
    : ((st = (0, v.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [
          ot,
          U.length === 0
            ? (0, v.jsx)(`p`, {
                className: `text-[10px] text-slate-400 text-center py-2 italic`,
                children: `Chưa có ổ cứng. Bấm "Thêm ổ" để thêm.`,
              })
            : (0, v.jsx)(`div`, {
                className: `space-y-2`,
                children: U.map((e, t) =>
                  (0, v.jsxs)(
                    `div`,
                    {
                      className: `bg-white border border-slate-200 rounded-xl p-2.5 space-y-2`,
                      children: [
                        (0, v.jsxs)(`div`, {
                          className: `flex items-center gap-2`,
                          children: [
                            (0, v.jsxs)(`span`, {
                              className: `text-[10px] font-black text-slate-400 w-10 shrink-0 text-center`,
                              children: [`Slot `, e.slot],
                            }),
                            (0, v.jsx)(`input`, {
                              value: e.size,
                              onChange: (e) => be(t, `size`, e.target.value),
                              placeholder: `Dung lượng (VD: 4TB)`,
                              className: `flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-orange-400`,
                            }),
                            (0, v.jsx)(`select`, {
                              value: e.type,
                              onChange: (e) => be(t, `type`, e.target.value),
                              className: `px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-orange-400`,
                              children: P.map(R),
                            }),
                            (0, v.jsx)(`select`, {
                              value: e.status,
                              onChange: (e) => be(t, `status`, e.target.value),
                              className: `px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-orange-400`,
                              children: F.map(L),
                            }),
                            (0, v.jsx)(`button`, {
                              onClick: () => ve(t),
                              "aria-label": `Xóa ổ cứng`,
                              className: `w-6 h-6 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 text-xs shrink-0 flex items-center justify-center`,
                              children: (0, v.jsx)(`i`, {
                                className: `fas fa-times`,
                              }),
                            }),
                          ],
                        }),
                        (0, v.jsxs)(`div`, {
                          className: `flex items-center gap-2 pl-12`,
                          children: [
                            (0, v.jsxs)(`div`, {
                              className: `flex-1 relative`,
                              children: [
                                (0, v.jsx)(`span`, {
                                  className: `absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase tracking-widest pointer-events-none`,
                                  children: `Hãng`,
                                }),
                                (0, v.jsx)(`input`, {
                                  value: e.brand ?? ``,
                                  onChange: (e) =>
                                    be(t, `brand`, e.target.value),
                                  placeholder: `Seagate, WD, Toshiba...`,
                                  className: `w-full pl-12 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-orange-400`,
                                }),
                              ],
                            }),
                            (0, v.jsxs)(`div`, {
                              className: `flex-1 relative`,
                              children: [
                                (0, v.jsx)(`span`, {
                                  className: `absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase tracking-widest pointer-events-none`,
                                  children: `S/N`,
                                }),
                                (0, v.jsx)(`input`, {
                                  value: e.serial ?? ``,
                                  onChange: (e) =>
                                    be(t, `serial`, e.target.value),
                                  placeholder: `Serial number...`,
                                  className: `w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-orange-400`,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
        ],
      })),
      (t[89] = U),
      (t[90] = st));
  let ct;
  t[91] !== n || t[92] !== W
    ? ((ct =
        n &&
        (0, v.jsxs)(v.Fragment, {
          children: [
            (0, v.jsxs)(`div`, {
              className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
              children: [
                (0, v.jsxs)(`div`, {
                  className: `flex items-center justify-between mb-2`,
                  children: [
                    (0, v.jsxs)(`p`, {
                      className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                      children: [
                        (0, v.jsx)(`i`, {
                          className: `fas fa-cloud-arrow-up text-slate-400 mr-1`,
                        }),
                        `Backup cấu hình`,
                      ],
                    }),
                    W &&
                      (0, v.jsxs)(`span`, {
                        className: `text-[10px] font-black px-2 py-0.5 rounded-full border ${W.bgClass} ${W.textClass}`,
                        children: [W.icon, ` `, W.label],
                      }),
                  ],
                }),
                (0, v.jsxs)(`div`, {
                  className: `flex gap-2`,
                  children: [
                    (0, v.jsx)(`button`, {
                      type: `button`,
                      onClick: () => fe(!0),
                      className: `flex-1 py-2 text-[10px] font-black bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all`,
                      children: `Cập nhật Backup`,
                    }),
                    n.backup?.logs &&
                      n.backup.logs.length > 0 &&
                      (0, v.jsx)(`button`, {
                        type: `button`,
                        onClick: () => me(!0),
                        className: `px-3 py-2 text-[10px] font-black bg-slate-50 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-100 transition-all`,
                        children: `🕐 Lịch sử`,
                      }),
                  ],
                }),
              ],
            }),
            (0, v.jsxs)(`div`, {
              className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
              children: [
                (0, v.jsxs)(`p`, {
                  className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
                  children: [
                    (0, v.jsx)(`i`, {
                      className: `fas fa-clock-rotate-left text-slate-400 mr-1`,
                    }),
                    `Lịch sử thay đổi`,
                  ],
                }),
                (0, v.jsx)(c, { logs: n.logs ?? [] }),
              ],
            }),
          ],
        })),
      (t[91] = n),
      (t[92] = W),
      (t[93] = ct))
    : (ct = t[93]);
  let lt;
  t[94] !== it || t[95] !== st || t[96] !== ct
    ? ((lt = (0, v.jsxs)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll space-y-4 pr-1`,
        children: [it, st, ct],
      })),
      (t[94] = it),
      (t[95] = st),
      (t[96] = ct),
      (t[97] = lt))
    : (lt = t[97]);
  let ut;
  t[98] !== d || t[99] !== n
    ? ((ut =
        n &&
        (0, v.jsx)(`button`, {
          onClick: d,
          className: `px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100`,
          children: `Xóa`,
        })),
      (t[98] = d),
      (t[99] = n),
      (t[100] = ut))
    : (ut = t[100]);
  let dt;
  t[101] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((dt = (0, v.jsx)(`div`, { className: `flex-1` })), (t[101] = dt))
    : (dt = t[101]);
  let ft;
  t[102] === f
    ? (ft = t[103])
    : ((ft = (0, v.jsx)(`button`, {
        onClick: f,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50`,
        children: `Hủy`,
      })),
      (t[102] = f),
      (t[103] = ft));
  let pt;
  t[104] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((pt = (0, v.jsx)(`i`, { className: `fas fa-save` })), (t[104] = pt))
    : (pt = t[104]);
  let Q;
  t[105] === Se
    ? (Q = t[106])
    : ((Q = (0, v.jsxs)(`button`, {
        onClick: Se,
        className: `px-6 py-2.5 bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md hover:bg-orange-600 flex items-center gap-2`,
        children: [pt, `Lưu NVR`],
      })),
      (t[105] = Se),
      (t[106] = Q));
  let mt;
  t[107] !== ut || t[108] !== ft || t[109] !== Q
    ? ((mt = (0, v.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [ut, dt, ft, Q],
      })),
      (t[107] = ut),
      (t[108] = ft),
      (t[109] = Q),
      (t[110] = mt))
    : (mt = t[110]);
  let ht;
  t[111] !== J || t[112] !== lt || t[113] !== mt
    ? ((ht = (0, v.jsx)(`div`, {
        className: `modal`,
        style: Te,
        children: (0, v.jsxs)(`div`, {
          className: `modal-content shadow-2xl`,
          style: Ee,
          children: [J, lt, mt],
        }),
      })),
      (t[111] = J),
      (t[112] = lt),
      (t[113] = mt),
      (t[114] = ht))
    : (ht = t[114]);
  let gt;
  t[115] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((gt = () => S(!1)), (t[115] = gt))
    : (gt = t[115]);
  let _t;
  t[116] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_t = (e) => {
        (e.ip && E(e.ip), S(!1));
      }),
      (t[116] = _t))
    : (_t = t[116]);
  let vt;
  t[117] !== o || t[118] !== s || t[119] !== x
    ? ((vt = (0, v.jsx)(p, {
        isOpen: x,
        onClose: gt,
        db: o,
        elevatorDB: s,
        onSelect: _t,
      })),
      (t[117] = o),
      (t[118] = s),
      (t[119] = x),
      (t[120] = vt))
    : (vt = t[120]);
  let yt;
  t[121] !== b || t[122] !== G || t[123] !== n || t[124] !== y || t[125] !== de
    ? ((yt =
        de &&
        G &&
        (0, v.jsx)(m, {
          sw: G,
          onClose: () => fe(!1),
          onSave: (e) => {
            (y(n.id, e),
              b(`Backup · ${n.name}`, N(n, e), e.by || `system`, e.date),
              fe(!1));
          },
        })),
      (t[121] = b),
      (t[122] = G),
      (t[123] = n),
      (t[124] = y),
      (t[125] = de),
      (t[126] = yt))
    : (yt = t[126]);
  let $;
  t[127] !== G || t[128] !== pe
    ? (($ = pe && G && (0, v.jsx)(h, { sw: G, onClose: () => me(!1) })),
      (t[127] = G),
      (t[128] = pe),
      (t[129] = $))
    : ($ = t[129]);
  let bt;
  return (
    t[130] !== ht || t[131] !== vt || t[132] !== yt || t[133] !== $
      ? ((bt = (0, v.jsxs)(v.Fragment, { children: [ht, vt, yt, $] })),
        (t[130] = ht),
        (t[131] = vt),
        (t[132] = yt),
        (t[133] = $),
        (t[134] = bt))
      : (bt = t[134]),
    bt
  );
}
function L(e) {
  let [t, n] = e;
  return (0, v.jsx)(`option`, { value: t, children: n }, t);
}
function R(e) {
  return (0, v.jsx)(`option`, { value: e, children: e }, e);
}
function z(e, t) {
  return { ...e, slot: t + 1 };
}
function ee(e) {
  return [
    ...e,
    {
      slot: e.length + 1,
      size: ``,
      type: `HDD`,
      status: `ok`,
      brand: ``,
      serial: ``,
    },
  ];
}
function te(e) {
  return e.addGlobalLog;
}
function ne(e) {
  return e.saveNVRBackup;
}
function re(e) {
  let t = (0, _.c)(41),
    { onBack: n, username: r, isAdmin = true } = e,
    i = a(oe),
    o = a(H),
    c = a(ae),
    l = a(V),
    d = a(ie),
    f = s(B),
    [p, m] = (0, g.useState)(null),
    [subnets, setSubnets] = (0, g.useState)(getAllSubnets),
    [ipAllocations, setIpAllocations] = (0, g.useState)(getCustomIpAllocations),
    [subnetModal, setSubnetModal] = (0, g.useState)(null),
    [ipModal, setIpModal] = (0, g.useState)(null),
    [h, b] = (0, g.useState)(`closed`),
    [x, S] = (0, g.useState)(null);

  (0, g.useEffect)(() => {
    function handleSubnets() {
      setSubnets(getAllSubnets());
    }
    function handleIps() {
      setIpAllocations(getCustomIpAllocations());
    }
    window.addEventListener(`nim:subnets_updated`, handleSubnets);
    window.addEventListener(`nim:ip_allocations_updated`, handleIps);
    return () => {
      window.removeEventListener(`nim:subnets_updated`, handleSubnets);
      window.removeEventListener(`nim:ip_allocations_updated`, handleIps);
    };
  }, []);

  function handleAddSubnet() {
    setSubnetModal({ isOpen: true, isEdit: false, data: null });
  }

  function handleEditSubnet(vid, data) {
    if (!isAdmin) return;
    setSubnetModal({ isOpen: true, isEdit: true, data: { vid, ...data } });
  }

  function handleDeleteSubnet(vid, data) {
    if (!isAdmin) return;
    f(`Bạn có chắc chắn muốn xóa Subnet VLAN ${vid} (${data.name}) không?`, `confirm`, () => {
      deleteSubnet(vid);
      setSubnets(getAllSubnets());
      if (p === vid) m(null);
    });
  }

  function handleSaveSubnet(vid, data) {
    if (!isAdmin) return;
    saveSubnet(vid, data);
    setSubnets(getAllSubnets());
  }

  function handleIpClick(clickedIp, existingData) {
    setIpModal({ isOpen: true, ip: clickedIp, data: existingData });
  }

  function handleSaveIp(ip, data) {
    if (!isAdmin) return;
    setIpAllocation(ip, { ...data, vlan: p });
    setIpAllocations(getCustomIpAllocations());
  }

  function handleDeleteIp(ip) {
    if (!isAdmin) return;
    deleteIpAllocation(ip);
    setIpAllocations(getCustomIpAllocations());
  }

  let w;
  t[0] !== d || t[1] !== c || t[2] !== f
    ? ((w = function (e) {
        let t = c.find((t) => t.id === e);
        f(`Bạn có chắc chắn muốn xóa NVR "${t?.name ?? ``}"?`, `confirm`, () =>
          d(e),
        );
      }),
      (t[0] = d),
      (t[1] = c),
      (t[2] = f),
      (t[3] = w))
    : (w = t[3]);
  let T = w,
    D;
  t[4] !== i || t[5] !== o
    ? ((D = u(`120`, i, o)), (t[4] = i), (t[5] = o), (t[6] = D))
    : (D = t[6]);
  let O = D,
    A;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (0, v.jsxs)(`div`, {
        children: [
          (0, v.jsxs)(`h2`, {
            className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
            children: [
              (0, v.jsx)(`div`, {
                className: `w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100`,
                children: (0, v.jsx)(`i`, { className: `fas fa-sitemap` }),
              }),
              `IP Address Management (IPAM)`,
            ],
          }),
          (0, v.jsx)(`p`, {
            className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
            children: `Giám sát & Quy hoạch dải mạng trung tâm`,
          }),
        ],
      })),
      (t[7] = A))
    : (A = t[7]);
  let j;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((j = (0, v.jsx)(`i`, { className: `fas fa-arrow-left` })), (t[8] = j))
    : (j = t[8]);
  let M;
  t[9] === n
    ? (M = t[10])
    : ((M = (0, v.jsxs)(`div`, {
        className: `view-header px-8 py-6 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0`,
        children: [
          A,
          (0, v.jsxs)(`button`, {
            onClick: n,
            className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
            children: [j, ` Quay lại Topology`],
          }),
        ],
      })),
      (t[9] = n),
      (t[10] = M));
  let N = (0, v.jsx)(y, {
    db: i,
    elevatorDB: o,
    activeVlanId: p,
    onSelect: m,
    subnets: subnets,
    isAdmin: isAdmin,
    onAddSubnet: handleAddSubnet,
    onEditSubnet: handleEditSubnet,
    onDeleteSubnet: handleDeleteSubnet,
  });
  let P = (0, v.jsx)(`div`, {
    className: `flex-1 overflow-y-auto custom-scroll bg-slate-50/50 p-8 relative`,
    children: p
      ? (0, v.jsx)(
          C,
          {
            vid: p,
            db: i,
            elevatorDB: o,
            subnets: subnets,
            ipAllocations: ipAllocations,
            onIpClick: handleIpClick,
            nvrSlot:
              p === `120`
                ? (0, v.jsx)(E, {
                    nvrDB: c,
                    usedMap: O,
                    isAdmin: isAdmin,
                    onAddNew: isAdmin ? () => b(null) : null,
                    onEdit: isAdmin ? (e) => b(c.find((t) => t.id === e) ?? null) : null,
                    onDelete: isAdmin ? T : null,
                    onViewChannels: S,
                  })
                : null,
          },
          p,
        )
      : (0, v.jsxs)(`div`, {
          className: `h-full flex flex-col items-center justify-center text-center opacity-40`,
          children: [
            (0, v.jsx)(`i`, {
              className: `fas fa-th text-5xl mb-4 text-slate-400`,
            }),
            (0, v.jsx)(`p`, {
              className: `text-sm font-bold text-slate-500 uppercase tracking-widest`,
              children: `Chọn một Subnet bên trái để xem chi tiết`,
            }),
          ],
        }),
  });
  let F = (0, v.jsxs)(`div`, {
    id: `ipam-body`,
    className: `view-body flex-1 flex overflow-hidden`,
    children: [N, P],
  });
  let L;
  t[25] !== i ||
  t[26] !== d ||
  t[27] !== o ||
  t[28] !== h ||
  t[29] !== l ||
  t[30] !== f ||
  t[31] !== r
    ? ((L =
        h !== `closed` &&
        isAdmin &&
        (0, v.jsx)(I, {
          record: h,
          db: i,
          elevatorDB: o,
          username: r,
          onSave: (e) => {
            if (!isAdmin) return;
            (l(e), b(`closed`));
          },
          onDelete: () => {
            if (!isAdmin || !h) return;
            let { id: e, name: t } = h;
            f(`Bạn có chắc chắn muốn xóa NVR "${t}"?`, `confirm`, () => {
              (d(e), b(`closed`));
            });
          },
          onClose: () => b(`closed`),
        })),
      (t[25] = i),
      (t[26] = d),
      (t[27] = o),
      (t[28] = h),
      (t[29] = l),
      (t[30] = f),
      (t[31] = r),
      (t[32] = L))
    : (L = t[32]);
  let R;
  t[33] !== x || t[34] !== O
    ? ((R =
        x && (0, v.jsx)(k, { nvrName: x, usedMap: O, onClose: () => S(null) })),
      (t[33] = x),
      (t[34] = O),
      (t[35] = R))
    : (R = t[35]);
  return (0, v.jsxs)(`div`, {
    id: `ipam-view`,
    className: `w-full h-full flex flex-col relative`,
    children: [
      M,
      F,
      L,
      R,
      subnetModal?.isOpen &&
        (0, v.jsx)(SubnetManageModal, {
          initialData: subnetModal.data,
          isEdit: subnetModal.isEdit,
          onSave: handleSaveSubnet,
          onClose: () => setSubnetModal(null),
        }),
      ipModal?.isOpen &&
        (0, v.jsx)(IpAllocationModal, {
          ip: ipModal.ip,
          existingData: ipModal.data,
          isAdmin: isAdmin,
          onSave: handleSaveIp,
          onDelete: handleDeleteIp,
          onClose: () => setIpModal(null),
        }),
    ],
  });
}
function B(e) {
  return e.showDialog;
}
function ie(e) {
  return e.deleteNVR;
}
function V(e) {
  return e.saveNVR;
}
function ae(e) {
  return e.NVRDB;
}
function H(e) {
  return e.ElevatorDB;
}
function oe(e) {
  return e.DB;
}
export { re as default };
