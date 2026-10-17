import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import { c as r, l as i, s as a, tn as o } from "./index-QE6I14Fy.js";
var s = e(t(), 1),
  c = o(),
  l = 300;
function u(e, t, n) {
  let r = new Date(),
    i = [
      {
        time: `${r.toLocaleTimeString(`vi-VN`)} - ${r.toLocaleDateString(`vi-VN`)}`,
        user: n,
        msg: t,
      },
      ...(e ?? []),
    ];
  return i.length > l ? i.slice(0, l) : i;
}
function d(e) {
  return e ? `Tạo ODF mới` : `Cập nhật thông tin ODF`;
}
function f(e, t) {
  return `Cập nhật nhãn nhóm ${e}${t ? `: "${t}"` : ``}`;
}
function p(e) {
  return `Xóa nhãn nhóm ${e}`;
}
function m(e, t) {
  let n = e.status === `reserved` || e.status === `inactive`,
    r = n
      ? `Port ${e.portFrom} (${e.status})`
      : e.targetName || String(e.portFrom);
  return t
    ? n
      ? `Đánh dấu Port ${e.portFrom}: ${e.status}`
      : `Thêm kết nối Port ${e.portFrom} → ${r} (${e.fiberType})`
    : `Cập nhật Port ${e.portFrom} → ${r}`;
}
function h(e) {
  return `Xóa kết nối Port ${e.portFrom} → ${e.targetName || e.targetId}`;
}
function g(e, t) {
  let n = new Set((e.connections ?? []).map((e) => e.portFrom));
  return (
    t.forEach((t) => {
      t.id !== e.id &&
        (t.connections ?? []).forEach((t) => {
          t.targetType === `odf` &&
            t.targetId === e.id &&
            t.targetPort &&
            n.add(t.targetPort);
        });
    }),
    n.size
  );
}
function _(e) {
  return {
    total: e.length,
    indoor: e.filter((e) => e.type === `indoor`).length,
    outdoor: e.filter((e) => e.type === `outdoor`).length,
    totalConns: e.reduce((t, n) => t + g(n, e), 0),
  };
}
function v(e, t) {
  let n = g(e, t),
    r = e.totalPorts;
  return {
    usedCount: n,
    totalPorts: r,
    freePorts: r - n,
    pct: r > 0 ? Math.round((n / r) * 100) : 0,
  };
}
function y(e, t, n) {
  let r = t === `all` ? e : e.filter((e) => e.type === t),
    i = n.trim().toLowerCase();
  return (
    i &&
      (r = r.filter(
        (e) =>
          (e.name || ``).toLowerCase().includes(i) ||
          (e.location || ``).toLowerCase().includes(i) ||
          (e.zone || ``).toLowerCase().includes(i),
      )),
    r
  );
}
function b(e, t) {
  let n = {};
  return (
    (e.connections ?? []).forEach((e) => {
      n[e.portFrom] = e;
    }),
    t.forEach((t) => {
      t.id !== e.id &&
        (t.connections ?? []).forEach((r) => {
          if (r.targetType === `odf` && r.targetId === e.id && r.targetPort) {
            let e = {
              ...r,
              isReverse: !0,
              fromOdfId: t.id,
              fromOdfName: t.name,
              fromPort: r.portFrom,
              portFrom: r.targetPort,
            };
            n[r.targetPort] || (n[r.targetPort] = e);
          }
        });
    }),
    n
  );
}
function x(e, t) {
  let n = [`Port ${e}`];
  return (
    t
      ? (t.status === `reserved`
          ? n.push(`Dự phòng`)
          : t.status === `inactive` && n.push(`Không hoạt động`),
        (t.targetName || t.targetId) &&
          n.push(`→ ${t.targetName || t.targetId}`),
        t.cctvIp && n.push(t.cctvIp),
        t.portDesc && n.push(t.portDesc),
        t.fiberType &&
          n.push(
            t.fiberType + (t.connectorType ? ` / ` + t.connectorType : ``),
          ),
        t.cableId && n.push(`Cable: ${t.cableId}`),
        t.cableLength && n.push(`${t.cableLength}m`))
      : n.push(`Trống`),
    n.join(` · `)
  );
}
function S(e) {
  return e
    ? e.status === `reserved`
      ? `reserved`
      : e.status === `inactive`
        ? `inactive`
        : e.targetType === `switch`
          ? `connected-switch`
          : e.targetType === `cctv`
            ? `connected-cctv`
            : `connected`
    : `empty`;
}
function C(e, t) {
  let n = t[e];
  return { port: e, status: S(n), title: x(e, n) };
}
function w(e, t) {
  let n = e.totalPorts;
  if (n <= 0) return { kind: `empty` };
  let r = e.portGroupSize || 4;
  if (r >= 2) {
    let i = Math.ceil(n / r),
      a = Math.ceil(i / 2),
      o = e.portGroups ?? {};
    function s(e) {
      let i = (e - 1) * r + 1,
        a = Math.min(e * r, n),
        s = o[String(e)] ?? {},
        c = [];
      for (let e = i; e <= a; e++) c.push(C(e, t));
      return { groupNum: e, label: s.label ?? ``, color: s.color, ports: c };
    }
    let c = [],
      l = [];
    for (let e = 1; e <= i; e++) (e <= a ? c : l).push(s(e));
    return { kind: `grouped`, row1: c, row2: l };
  }
  let i = Math.ceil(n / 2),
    a = [],
    o = [];
  for (let e = 1; e <= n; e++) (e <= i ? a : o).push(C(e, t));
  return { kind: `sequential`, row1: a, row2: o };
}
var T = {
    odf: `#f59e0b`,
    switch: `#3b82f6`,
    cctv: `#ef4444`,
    ap: `#06b6d4`,
    other: `#64748b`,
  },
  E = {
    odf: `fa-network-wired`,
    switch: `fa-server`,
    cctv: `fa-video`,
    ap: `fa-wifi`,
    other: `fa-plug`,
  },
  D = { odf: `ODF`, switch: `SW`, cctv: `CAM`, ap: `AP`, other: `DEV` };
function O(e, t) {
  let n = e.totalPorts,
    r = Math.ceil(n / 2),
    i = [];
  t.forEach((t) => {
    t.id !== e.id &&
      (t.connections ?? []).forEach((n) => {
        n.targetType === `odf` &&
          n.targetId === e.id &&
          n.targetPort &&
          i.push({
            ...n,
            isReverse: !0,
            fromOdfId: t.id,
            fromOdfName: t.name,
            fromPort: n.portFrom,
            portFrom: n.targetPort,
          });
      });
  });
  let a = {};
  [...(e.connections ?? []), ...i].forEach((e) => {
    let t = e.portFrom;
    (a[t] || (a[t] = { incoming: null, outgoing: null }),
      e.isReverse ? (a[t].incoming = e) : (a[t].outgoing = e));
  });
  let o = Object.keys(a)
      .map(Number)
      .sort((e, t) => e - t),
    s = o.filter((e) => {
      let { incoming: t, outgoing: n } = a[e];
      return !!t && !!n && n.status !== `reserved` && n.status !== `inactive`;
    }).length,
    c = o.filter((e) => {
      let { incoming: t, outgoing: n } = a[e];
      return !!t && !n;
    }).length;
  function l(e) {
    let { incoming: t, outgoing: n } = a[e],
      r = !!n && (n.status === `reserved` || n.status === `inactive`),
      i = !!t,
      o = !!n && !r,
      s,
      c,
      l = null;
    if (r && n)
      ((s = n.status === `reserved` ? `#a855f7` : `#94a3b8`),
        (c = n.status === `reserved` ? `fa-bookmark` : `fa-pause-circle`),
        (l = {
          text: n.status === `reserved` ? `Dự phòng` : `Không HĐ`,
          color: s,
        }));
    else if (i && o)
      ((s = `#6366f1`),
        (c = `fa-arrows-alt-h`),
        (l = { text: `Qua cầu`, color: `#6366f1`, icon: `fa-arrows-alt-h` }));
    else if (i && !o)
      ((s = `#f59e0b`),
        (c = `fa-arrow-left`),
        (l = { text: `Nhận`, color: `#f59e0b`, icon: `fa-arrow-left` }));
    else {
      let e = n?.targetType || `other`;
      ((s = T[e] ?? T.other), (c = E[e] ?? E.other));
    }
    let u = null;
    if (i && t) {
      let e = [
        t.fiberType,
        t.connectorType,
        t.cableId,
        t.cableLength ? `${t.cableLength}m` : ``,
      ].filter(Boolean);
      u = {
        label: `${t.fromOdfName ?? ``}${t.fromPort ? ` · P` + t.fromPort : ``}`,
        subParts: e,
      };
    }
    let d = null;
    if (o && n) {
      let e = n.targetType || `other`,
        t = [
          e === `cctv` && n.cctvIp ? n.cctvIp : ``,
          n.fiberType,
          n.connectorType,
          n.cableId,
          n.cableLength ? `${n.cableLength}m` : ``,
          n.portDesc,
          n.label,
        ].filter(Boolean);
      d = {
        kind: `device`,
        label: `${n.targetName || n.targetId || ``}${n.targetPort ? ` · P` + n.targetPort : ``}`,
        typeLabel: D[e] ?? D.other,
        typeColor: T[e] ?? T.other,
        typeIcon: E[e] ?? E.other,
        subParts: t,
        connId: n.id,
      };
    } else
      r &&
        n &&
        (d = {
          kind: `passive`,
          label: n.status === `reserved` ? `Dự phòng` : `Không hoạt động`,
          subParts: [n.portDesc, n.notes].filter(Boolean),
          connId: n.id,
        });
    return {
      port: e,
      borderColor: s,
      headerIcon: c,
      headerBadge: l,
      incoming: u,
      outgoing: d,
    };
  }
  return {
    oddPorts: o.filter((e) => e <= r).map(l),
    evenPorts: o.filter((e) => e > r).map(l),
    passThroughCount: s,
    receiveCount: c,
    half: r,
    totalPorts: n,
  };
}
function k(e, t, n, r = new Set()) {
  let i = `${e}:${t}`;
  if (r.has(i)) return [{ odfName: ``, port: t, kind: `loop` }];
  r.add(i);
  let a = n.find((t) => t.id === e);
  if (!a) return [];
  let o = (a.connections ?? []).find((e) => e.portFrom === t);
  if (!o) return [];
  let s = {
    odfName: a.name,
    port: t,
    fiberType: o.fiberType,
    cableId: o.cableId,
    cableLength: o.cableLength,
  };
  if (o.targetType === `odf`) {
    let e = k(o.targetId, o.targetPort ?? 0, n, r);
    return [
      {
        ...s,
        kind: `odf`,
        nextOdfId: o.targetId,
        nextPort: o.targetPort,
        nextName: o.targetName,
      },
      ...e,
    ];
  }
  let c = { switch: `fa-server`, cctv: `fa-video`, odf: `fa-network-wired` };
  return [
    {
      ...s,
      kind: `device`,
      endName: o.targetName || o.targetId,
      endPort: o.targetPort,
      endType: o.targetType || `other`,
      endIcon: c[o.targetType] ?? `fa-plug`,
    },
  ];
}
function A(e) {
  let t = [];
  return (
    e.forEach((e) =>
      e.switches.forEach((n) => {
        n.conns.forEach((r) => {
          (r.icon === `fa-video` || String(r.v) === `120`) &&
            (r.n || r.ip) &&
            t.push({
              name: r.n || ``,
              ip: r.ip || ``,
              swName: n.name,
              floor: e.floor,
            });
        });
      }),
    ),
    t
  );
}
var j = n();
function M(e) {
  let t = (0, c.c)(17),
    { stats: n } = e,
    r;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((r = (0, j.jsx)(`span`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Tổng quan`,
      })),
      (t[0] = r))
    : (r = t[0]);
  let i;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((i = (0, j.jsx)(`span`, {
        className: `text-xs font-bold text-slate-400`,
        children: `ODF`,
      })),
      (t[1] = i))
    : (i = t[1]);
  let a;
  t[2] === n.total
    ? (a = t[3])
    : ((a = (0, j.jsxs)(`div`, {
        className: `flex items-center justify-between mb-2`,
        children: [
          r,
          (0, j.jsxs)(`span`, {
            className: `text-lg font-black text-amber-600`,
            children: [n.total, ` `, i],
          }),
        ],
      })),
      (t[2] = n.total),
      (t[3] = a));
  let o;
  t[4] === n.indoor
    ? (o = t[5])
    : ((o = (0, j.jsxs)(`span`, {
        className: `text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full`,
        children: [`Indoor: `, n.indoor],
      })),
      (t[4] = n.indoor),
      (t[5] = o));
  let s;
  t[6] === n.outdoor
    ? (s = t[7])
    : ((s = (0, j.jsxs)(`span`, {
        className: `text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full`,
        children: [`Outdoor: `, n.outdoor],
      })),
      (t[6] = n.outdoor),
      (t[7] = s));
  let l;
  t[8] === n.totalConns
    ? (l = t[9])
    : ((l = (0, j.jsxs)(`span`, {
        className: `text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full`,
        children: [`Kết nối: `, n.totalConns],
      })),
      (t[8] = n.totalConns),
      (t[9] = l));
  let u;
  t[10] !== o || t[11] !== s || t[12] !== l
    ? ((u = (0, j.jsxs)(`div`, {
        className: `flex gap-1.5 flex-wrap`,
        children: [o, s, l],
      })),
      (t[10] = o),
      (t[11] = s),
      (t[12] = l),
      (t[13] = u))
    : (u = t[13]);
  let d;
  return (
    t[14] !== a || t[15] !== u
      ? ((d = (0, j.jsxs)(`div`, { children: [a, u] })),
        (t[14] = a),
        (t[15] = u),
        (t[16] = d))
      : (d = t[16]),
    d
  );
}
function N(e) {
  let t = (0, c.c)(30),
    { odf: n, odfDB: r, isActive: i, onClick: a } = e,
    o;
  t[0] !== n || t[1] !== r
    ? ((o = v(n, r)), (t[0] = n), (t[1] = r), (t[2] = o))
    : (o = t[2]);
  let { usedCount: s, totalPorts: l, pct: u } = o,
    d = n.type === `outdoor` ? `emerald` : `indigo`,
    f = `odf-card ${i ? `active` : ``}`,
    p;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = (0, j.jsx)(`div`, {
        className: `w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0`,
        children: (0, j.jsx)(`i`, {
          className: `fas fa-network-wired text-amber-600 text-[10px]`,
        }),
      })),
      (t[3] = p))
    : (p = t[3]);
  let m;
  t[4] === n.name
    ? (m = t[5])
    : ((m = (0, j.jsx)(`p`, {
        className: `text-xs font-black text-slate-800 truncate`,
        children: n.name,
      })),
      (t[4] = n.name),
      (t[5] = m));
  let h = n.location || `—`,
    g;
  t[6] === h
    ? (g = t[7])
    : ((g = (0, j.jsx)(`p`, {
        className: `text-[10px] text-slate-400 font-bold truncate`,
        children: h,
      })),
      (t[6] = h),
      (t[7] = g));
  let _;
  t[8] !== m || t[9] !== g
    ? ((_ = (0, j.jsxs)(`div`, {
        className: `flex-1 min-w-0`,
        children: [m, g],
      })),
      (t[8] = m),
      (t[9] = g),
      (t[10] = _))
    : (_ = t[10]);
  let y = `text-[9px] font-black px-1.5 py-0.5 rounded-full bg-${d}-100 text-${d}-700 shrink-0`,
    b;
  t[11] !== n.type || t[12] !== y
    ? ((b = (0, j.jsx)(`span`, { className: y, children: n.type })),
      (t[11] = n.type),
      (t[12] = y),
      (t[13] = b))
    : (b = t[13]);
  let x;
  t[14] !== _ || t[15] !== b
    ? ((x = (0, j.jsxs)(`div`, {
        className: `flex items-center gap-2 mb-2`,
        children: [p, _, b],
      })),
      (t[14] = _),
      (t[15] = b),
      (t[16] = x))
    : (x = t[16]);
  let S = `${u}%`,
    C;
  t[17] === S
    ? (C = t[18])
    : ((C = (0, j.jsx)(`div`, {
        className: `flex-1 bg-slate-100 rounded-full h-1.5`,
        children: (0, j.jsx)(`div`, {
          className: `bg-amber-500 h-1.5 rounded-full transition-all`,
          style: { width: S },
        }),
      })),
      (t[17] = S),
      (t[18] = C));
  let w;
  t[19] !== l || t[20] !== s
    ? ((w = (0, j.jsxs)(`span`, {
        className: `text-[9px] font-black text-slate-500`,
        children: [s, `/`, l],
      })),
      (t[19] = l),
      (t[20] = s),
      (t[21] = w))
    : (w = t[21]);
  let T;
  t[22] !== C || t[23] !== w
    ? ((T = (0, j.jsxs)(`div`, {
        className: `flex items-center gap-2`,
        children: [C, w],
      })),
      (t[22] = C),
      (t[23] = w),
      (t[24] = T))
    : (T = t[24]);
  let E;
  return (
    t[25] !== a || t[26] !== x || t[27] !== T || t[28] !== f
      ? ((E = (0, j.jsxs)(`div`, {
          className: f,
          onClick: a,
          children: [x, T],
        })),
        (t[25] = a),
        (t[26] = x),
        (t[27] = T),
        (t[28] = f),
        (t[29] = E))
      : (E = t[29]),
    E
  );
}
function P(e) {
  let t = (0, c.c)(38),
    { odfDB: n, activeOdfId: r, onSelect: i } = e,
    [a, o] = (0, s.useState)(``),
    [l, u] = (0, s.useState)(`all`),
    d;
  t[0] === n ? (d = t[1]) : ((d = _(n)), (t[0] = n), (t[1] = d));
  let f = d,
    p,
    m,
    h,
    g,
    v,
    b;
  if (
    t[2] !== r ||
    t[3] !== n ||
    t[4] !== i ||
    t[5] !== a ||
    t[6] !== f ||
    t[7] !== l
  ) {
    let e = y(n, l, a);
    ((h = `odf-left-panel`),
      (g = `view-sidebar w-[290px] shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden`),
      t[14] === f
        ? (v = t[15])
        : ((v = (0, j.jsx)(`div`, {
            className: `p-4 border-b border-slate-100`,
            children: (0, j.jsx)(M, { stats: f }),
          })),
          (t[14] = f),
          (t[15] = v)));
    let s;
    t[16] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((s = (0, j.jsx)(`i`, {
          className: `fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] pointer-events-none`,
        })),
        (t[16] = s))
      : (s = t[16]);
    let c;
    t[17] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((c = (e) => o(e.target.value)), (t[17] = c))
      : (c = t[17]);
    let d;
    t[18] === a
      ? (d = t[19])
      : ((d = (0, j.jsxs)(`div`, {
          className: `relative`,
          children: [
            s,
            (0, j.jsx)(`input`, {
              value: a,
              onChange: c,
              placeholder: `Tìm ODF theo tên, vị trí...`,
              className: `w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 placeholder-slate-300 focus:outline-none focus:border-amber-400 focus:bg-white transition-all duration-200`,
            }),
          ],
        })),
        (t[18] = a),
        (t[19] = d));
    let _;
    t[20] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((_ = (e) => u(e.target.value)), (t[20] = _))
      : (_ = t[20]);
    let x, S, C;
    t[21] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((x = (0, j.jsx)(`option`, { value: `all`, children: `Tất cả ODF` })),
        (S = (0, j.jsx)(`option`, { value: `indoor`, children: `Indoor` })),
        (C = (0, j.jsx)(`option`, { value: `outdoor`, children: `Outdoor` })),
        (t[21] = x),
        (t[22] = S),
        (t[23] = C))
      : ((x = t[21]), (S = t[22]), (C = t[23]));
    let w;
    (t[24] === l
      ? (w = t[25])
      : ((w = (0, j.jsxs)(`select`, {
          value: l,
          onChange: _,
          className: `w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-1.5 px-2 focus:outline-none focus:border-amber-500`,
          children: [x, S, C],
        })),
        (t[24] = l),
        (t[25] = w)),
      t[26] !== d || t[27] !== w
        ? ((b = (0, j.jsxs)(`div`, {
            className: `px-4 py-3 border-b border-slate-100 space-y-2`,
            children: [d, w],
          })),
          (t[26] = d),
          (t[27] = w),
          (t[28] = b))
        : (b = t[28]),
      (p = `flex-1 overflow-y-auto custom-scroll p-2 space-y-1`),
      (m =
        e.length === 0
          ? (0, j.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-10 opacity-40`,
              children: [
                (0, j.jsx)(`i`, {
                  className: `fas fa-network-wired text-3xl text-slate-400 mb-3`,
                }),
                (0, j.jsx)(`p`, {
                  className: `text-xs font-bold text-slate-500`,
                  children: a ? `Không tìm thấy kết quả` : `Chưa có ODF nào`,
                }),
              ],
            })
          : e.map((e) =>
              (0, j.jsx)(
                N,
                {
                  odf: e,
                  odfDB: n,
                  isActive: r === e.id,
                  onClick: () => i(e.id),
                },
                e.id,
              ),
            )),
      (t[2] = r),
      (t[3] = n),
      (t[4] = i),
      (t[5] = a),
      (t[6] = f),
      (t[7] = l),
      (t[8] = p),
      (t[9] = m),
      (t[10] = h),
      (t[11] = g),
      (t[12] = v),
      (t[13] = b));
  } else
    ((p = t[8]),
      (m = t[9]),
      (h = t[10]),
      (g = t[11]),
      (v = t[12]),
      (b = t[13]));
  let x;
  t[29] !== p || t[30] !== m
    ? ((x = (0, j.jsx)(`div`, { className: p, children: m })),
      (t[29] = p),
      (t[30] = m),
      (t[31] = x))
    : (x = t[31]);
  let S;
  return (
    t[32] !== h || t[33] !== g || t[34] !== v || t[35] !== b || t[36] !== x
      ? ((S = (0, j.jsxs)(`div`, { id: h, className: g, children: [v, b, x] })),
        (t[32] = h),
        (t[33] = g),
        (t[34] = v),
        (t[35] = b),
        (t[36] = x),
        (t[37] = S))
      : (S = t[37]),
    S
  );
}
var F = {
    blue: {
      bg: `bg-blue-50`,
      border: `border-blue-200`,
      text: `text-blue-700`,
    },
    green: {
      bg: `bg-green-50`,
      border: `border-green-200`,
      text: `text-green-700`,
    },
    amber: {
      bg: `bg-amber-50`,
      border: `border-amber-200`,
      text: `text-amber-700`,
    },
    red: { bg: `bg-red-50`, border: `border-red-200`, text: `text-red-700` },
    purple: {
      bg: `bg-purple-50`,
      border: `border-purple-200`,
      text: `text-purple-700`,
    },
    cyan: {
      bg: `bg-cyan-50`,
      border: `border-cyan-200`,
      text: `text-cyan-700`,
    },
    pink: {
      bg: `bg-pink-50`,
      border: `border-pink-200`,
      text: `text-pink-700`,
    },
  },
  I = { bg: `bg-slate-50`, border: `border-slate-200`, text: `text-slate-400` };
function L(e) {
  let t = (0, c.c)(8),
    { cell: n, onPortClick: r } = e,
    i = `odf-port-item${n.status === `empty` ? `` : ` ${n.status}`}`,
    a;
  t[0] !== n.port || t[1] !== r
    ? ((a = () => r(n.port)), (t[0] = n.port), (t[1] = r), (t[2] = a))
    : (a = t[2]);
  let o;
  return (
    t[3] !== n.port || t[4] !== n.title || t[5] !== i || t[6] !== a
      ? ((o = (0, j.jsx)(`div`, {
          className: i,
          title: n.title,
          onClick: a,
          children: n.port,
        })),
        (t[3] = n.port),
        (t[4] = n.title),
        (t[5] = i),
        (t[6] = a),
        (t[7] = o))
      : (o = t[7]),
    o
  );
}
function R(e) {
  let t = (0, c.c)(28),
    { card: n, onPortClick: r, onEditGroup: i } = e,
    a = n.color ? (F[n.color] ?? I) : I,
    o = n.ports[0]?.port,
    s = n.ports[n.ports.length - 1]?.port,
    l = o !== void 0 && s !== void 0 ? `${o}–${s}` : ``,
    u = `rounded-lg border ${a.border} ${a.bg} flex flex-col shrink-0`,
    d = `text-[8px] font-black ${a.text} truncate flex-1`,
    f = n.label || l,
    p = n.label || l,
    m;
  t[0] !== d || t[1] !== f || t[2] !== p
    ? ((m = (0, j.jsx)(`span`, { className: d, title: f, children: p })),
      (t[0] = d),
      (t[1] = f),
      (t[2] = p),
      (t[3] = m))
    : (m = t[3]);
  let h;
  t[4] !== n.groupNum || t[5] !== i
    ? ((h = () => i(n.groupNum)), (t[4] = n.groupNum), (t[5] = i), (t[6] = h))
    : (h = t[6]);
  let g = `Đặt nhãn nhóm ${n.groupNum}`,
    _ = `fas fa-pen ${a.text} opacity-70`,
    v;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = { fontSize: 5 }), (t[7] = v))
    : (v = t[7]);
  let y;
  t[8] === _
    ? (y = t[9])
    : ((y = (0, j.jsx)(`i`, { className: _, style: v })),
      (t[8] = _),
      (t[9] = y));
  let b;
  t[10] !== y || t[11] !== h || t[12] !== g
    ? ((b = (0, j.jsx)(`button`, {
        onClick: h,
        className: `w-3.5 h-3.5 rounded-sm flex items-center justify-center hover:bg-black/10 shrink-0 transition-colors`,
        title: g,
        children: y,
      })),
      (t[10] = y),
      (t[11] = h),
      (t[12] = g),
      (t[13] = b))
    : (b = t[13]);
  let x;
  t[14] !== b || t[15] !== m
    ? ((x = (0, j.jsxs)(`div`, {
        className: `flex items-center gap-1 px-1.5 pt-1 pb-0.5`,
        children: [m, b],
      })),
      (t[14] = b),
      (t[15] = m),
      (t[16] = x))
    : (x = t[16]);
  let S;
  if (t[17] !== n.ports || t[18] !== r) {
    let e;
    (t[20] === r
      ? (e = t[21])
      : ((e = (e) => (0, j.jsx)(L, { cell: e, onPortClick: r }, e.port)),
        (t[20] = r),
        (t[21] = e)),
      (S = n.ports.map(e)),
      (t[17] = n.ports),
      (t[18] = r),
      (t[19] = S));
  } else S = t[19];
  let C;
  t[22] === S
    ? (C = t[23])
    : ((C = (0, j.jsx)(`div`, {
        className: `flex gap-0.5 px-1 pb-1.5`,
        children: S,
      })),
      (t[22] = S),
      (t[23] = C));
  let w;
  return (
    t[24] !== u || t[25] !== x || t[26] !== C
      ? ((w = (0, j.jsxs)(`div`, { className: u, children: [x, C] })),
        (t[24] = u),
        (t[25] = x),
        (t[26] = C),
        (t[27] = w))
      : (w = t[27]),
    w
  );
}
function z(e) {
  let t = (0, c.c)(35),
    { layout: n, onPortClick: r, onEditGroup: i } = e;
  if (n.kind === `empty`) return null;
  if (n.kind === `grouped`) {
    let e;
    if (t[0] !== n.row1 || t[1] !== i || t[2] !== r) {
      let a;
      (t[4] !== i || t[5] !== r
        ? ((a = (e) =>
            (0, j.jsx)(
              R,
              { card: e, onPortClick: r, onEditGroup: i },
              e.groupNum,
            )),
          (t[4] = i),
          (t[5] = r),
          (t[6] = a))
        : (a = t[6]),
        (e = n.row1.map(a)),
        (t[0] = n.row1),
        (t[1] = i),
        (t[2] = r),
        (t[3] = e));
    } else e = t[3];
    let a;
    t[7] === e
      ? (a = t[8])
      : ((a = (0, j.jsx)(`div`, { className: `flex gap-1.5`, children: e })),
        (t[7] = e),
        (t[8] = a));
    let o;
    t[9] !== n.row2 || t[10] !== i || t[11] !== r
      ? ((o =
          n.row2.length > 0 &&
          (0, j.jsxs)(j.Fragment, {
            children: [
              (0, j.jsx)(`div`, {
                className: `w-full border-t border-dashed border-slate-200 my-0`,
              }),
              (0, j.jsx)(`div`, {
                className: `flex gap-1.5`,
                children: n.row2.map((e) =>
                  (0, j.jsx)(
                    R,
                    { card: e, onPortClick: r, onEditGroup: i },
                    e.groupNum,
                  ),
                ),
              }),
            ],
          })),
        (t[9] = n.row2),
        (t[10] = i),
        (t[11] = r),
        (t[12] = o))
      : (o = t[12]);
    let s;
    return (
      t[13] !== a || t[14] !== o
        ? ((s = (0, j.jsx)(`div`, {
            className: `overflow-x-auto custom-scroll pb-1`,
            children: (0, j.jsxs)(`div`, {
              className: `flex flex-col gap-2 items-center`,
              children: [a, o],
            }),
          })),
          (t[13] = a),
          (t[14] = o),
          (t[15] = s))
        : (s = t[15]),
      s
    );
  }
  let a;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((a = { minWidth: `max-content` }), (t[16] = a))
    : (a = t[16]);
  let o;
  if (t[17] !== n.row1 || t[18] !== r) {
    let e;
    (t[20] === r
      ? (e = t[21])
      : ((e = (e) => (0, j.jsx)(L, { cell: e, onPortClick: r }, e.port)),
        (t[20] = r),
        (t[21] = e)),
      (o = n.row1.map(e)),
      (t[17] = n.row1),
      (t[18] = r),
      (t[19] = o));
  } else o = t[19];
  let s;
  t[22] === o
    ? (s = t[23])
    : ((s = (0, j.jsx)(`div`, { className: `flex gap-1`, children: o })),
      (t[22] = o),
      (t[23] = s));
  let l;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = (0, j.jsx)(`div`, {
        className: `w-full border-t border-dashed border-slate-200`,
      })),
      (t[24] = l))
    : (l = t[24]);
  let u;
  if (t[25] !== n.row2 || t[26] !== r) {
    let e;
    (t[28] === r
      ? (e = t[29])
      : ((e = (e) => (0, j.jsx)(L, { cell: e, onPortClick: r }, e.port)),
        (t[28] = r),
        (t[29] = e)),
      (u = n.row2.map(e)),
      (t[25] = n.row2),
      (t[26] = r),
      (t[27] = u));
  } else u = t[27];
  let d;
  t[30] === u
    ? (d = t[31])
    : ((d = (0, j.jsx)(`div`, { className: `flex gap-1`, children: u })),
      (t[30] = u),
      (t[31] = d));
  let f;
  return (
    t[32] !== s || t[33] !== d
      ? ((f = (0, j.jsx)(`div`, {
          className: `overflow-x-auto custom-scroll pb-1`,
          children: (0, j.jsxs)(`div`, {
            className: `flex flex-col items-center gap-1`,
            style: a,
            children: [s, l, d],
          }),
        })),
        (t[32] = s),
        (t[33] = d),
        (t[34] = f))
      : (f = t[34]),
    f
  );
}
var B = [
  { value: ``, className: `bg-slate-300 border-slate-300`, title: `Mặc định` },
  {
    value: `blue`,
    className: `bg-blue-500 border-blue-500`,
    title: `Xanh dương`,
  },
  {
    value: `green`,
    className: `bg-green-500 border-green-500`,
    title: `Xanh lá`,
  },
  {
    value: `amber`,
    className: `bg-amber-400 border-amber-400`,
    title: `Vàng cam`,
  },
  { value: `red`, className: `bg-red-500 border-red-500`, title: `Đỏ` },
  {
    value: `purple`,
    className: `bg-purple-500 border-purple-500`,
    title: `Tím`,
  },
  {
    value: `cyan`,
    className: `bg-cyan-500 border-cyan-500`,
    title: `Xanh cyan`,
  },
  { value: `pink`, className: `bg-pink-500 border-pink-500`, title: `Hồng` },
];
function V(e) {
  let t = (0, c.c)(44),
    {
      title: n,
      initialLabel: r,
      initialColor: i,
      onSave: a,
      onClear: o,
      onClose: l,
    } = e,
    [u, d] = (0, s.useState)(r),
    [f, p] = (0, s.useState)(i),
    m;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = { display: `flex`, zIndex: 230 }), (t[0] = m))
    : (m = t[0]);
  let h;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = { width: 380, maxWidth: `96vw` }), (t[1] = h))
    : (h = t[1]);
  let g;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, j.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100`,
        children: (0, j.jsx)(`i`, { className: `fas fa-layer-group` }),
      })),
      (t[2] = g))
    : (g = t[2]);
  let _;
  t[3] === n
    ? (_ = t[4])
    : ((_ = (0, j.jsxs)(`h3`, {
        className: `text-base font-black text-slate-800 flex items-center gap-3`,
        children: [g, (0, j.jsx)(`span`, { children: n })],
      })),
      (t[3] = n),
      (t[4] = _));
  let v;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = (0, j.jsx)(`i`, { className: `fas fa-times` })), (t[5] = v))
    : (v = t[5]);
  let y;
  t[6] === l
    ? (y = t[7])
    : ((y = (0, j.jsx)(`button`, {
        onClick: l,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: v,
      })),
      (t[6] = l),
      (t[7] = y));
  let b;
  t[8] !== _ || t[9] !== y
    ? ((b = (0, j.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4`,
        children: [_, y],
      })),
      (t[8] = _),
      (t[9] = y),
      (t[10] = b))
    : (b = t[10]);
  let x;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Diễn giải / Tên nhóm`,
      })),
      (t[11] = x))
    : (x = t[11]);
  let S;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = (e) => d(e.target.value)), (t[12] = S))
    : (S = t[12]);
  let C;
  t[13] === u
    ? (C = t[14])
    : ((C = (0, j.jsxs)(`div`, {
        children: [
          x,
          (0, j.jsx)(`input`, {
            value: u,
            onChange: S,
            placeholder: `VD: Trunk Tầng 1, CCTV Cổng A, Hành lang B...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
          }),
        ],
      })),
      (t[13] = u),
      (t[14] = C));
  let w;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
        children: `Màu sắc nhóm`,
      })),
      (t[15] = w))
    : (w = t[15]);
  let T;
  t[16] === f
    ? (T = t[17])
    : ((T = B.map((e) =>
        (0, j.jsx)(
          `button`,
          {
            type: `button`,
            onClick: () => p(e.value || void 0),
            title: e.title,
            className: `w-7 h-7 rounded-full border-2 hover:scale-110 transition-transform ${e.className}`,
            style:
              f === (e.value || void 0)
                ? {
                    outline: `3px solid #1e293b`,
                    outlineOffset: 2,
                    transform: `scale(1.15)`,
                  }
                : void 0,
          },
          e.value || `default`,
        ),
      )),
      (t[16] = f),
      (t[17] = T));
  let E;
  t[18] === T
    ? (E = t[19])
    : ((E = (0, j.jsxs)(`div`, {
        children: [
          w,
          (0, j.jsx)(`div`, { className: `flex gap-2 flex-wrap`, children: T }),
        ],
      })),
      (t[18] = T),
      (t[19] = E));
  let D;
  t[20] !== C || t[21] !== E
    ? ((D = (0, j.jsxs)(`div`, { className: `space-y-4`, children: [C, E] })),
      (t[20] = C),
      (t[21] = E),
      (t[22] = D))
    : (D = t[22]);
  let O;
  t[23] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((O = (0, j.jsx)(`i`, { className: `fas fa-times-circle` })), (t[23] = O))
    : (O = t[23]);
  let k;
  t[24] === o
    ? (k = t[25])
    : ((k = (0, j.jsxs)(`button`, {
        onClick: o,
        className: `px-4 py-2 bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-1.5`,
        children: [O, ` Xóa nhãn`],
      })),
      (t[24] = o),
      (t[25] = k));
  let A;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (0, j.jsx)(`div`, { className: `flex-1` })), (t[26] = A))
    : (A = t[26]);
  let M;
  t[27] === l
    ? (M = t[28])
    : ((M = (0, j.jsx)(`button`, {
        onClick: l,
        className: `px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[27] = l),
      (t[28] = M));
  let N;
  t[29] !== f || t[30] !== u || t[31] !== a
    ? ((N = () => a(u.trim(), f)),
      (t[29] = f),
      (t[30] = u),
      (t[31] = a),
      (t[32] = N))
    : (N = t[32]);
  let P;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((P = (0, j.jsx)(`i`, { className: `fas fa-save` })), (t[33] = P))
    : (P = t[33]);
  let F;
  t[34] === N
    ? (F = t[35])
    : ((F = (0, j.jsxs)(`button`, {
        onClick: N,
        className: `px-5 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl shadow hover:bg-amber-700 transition-all flex items-center gap-2`,
        children: [P, ` Lưu`],
      })),
      (t[34] = N),
      (t[35] = F));
  let I;
  t[36] !== k || t[37] !== M || t[38] !== F
    ? ((I = (0, j.jsxs)(`div`, {
        className: `flex gap-3 mt-5 pt-4 border-t border-slate-100`,
        children: [k, A, M, F],
      })),
      (t[36] = k),
      (t[37] = M),
      (t[38] = F),
      (t[39] = I))
    : (I = t[39]);
  let L;
  return (
    t[40] !== D || t[41] !== I || t[42] !== b
      ? ((L = (0, j.jsx)(`div`, {
          className: `modal`,
          style: m,
          children: (0, j.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: h,
            children: [b, D, I],
          }),
        })),
        (t[40] = D),
        (t[41] = I),
        (t[42] = b),
        (t[43] = L))
      : (L = t[43]),
    L
  );
}
var H = [
    { value: `SM`, label: `SM — Single-mode (9/125µm)` },
    { value: `MM-OM3`, label: `MM OM3 — Multi-mode (50/125µm)` },
    { value: `MM-OM4`, label: `MM OM4 — Multi-mode (50/125µm)` },
    { value: `MM-OM5`, label: `MM OM5 — Wideband Multi-mode` },
    { value: `MM`, label: `MM — Multi-mode (khác)` },
  ],
  U = [
    `SC/APC`,
    `LC/APC`,
    `SC/UPC`,
    `LC/UPC`,
    `FC/APC`,
    `FC/UPC`,
    `ST`,
    `MTP/MPO`,
  ];
function W({
  odfId: e,
  portFrom: t,
  existing: n,
  odfDB: r,
  db: i,
  wifiDB: o = [],
  onSave: c,
  onClose: l,
}) {
  let u = a((e) => e.showDialog),
    [d, f] = (0, s.useState)(n?.portDesc ?? ``),
    [p, m] = (0, s.useState)(n?.status ?? `active`),
    [h, g] = (0, s.useState)(n?.label ?? ``),
    [_, v] = (0, s.useState)(n?.targetType || `odf`),
    [y, b] = (0, s.useState)(
      n?.targetType === `cctv` ? `` : (n?.targetId ?? ``),
    ),
    [x, S] = (0, s.useState)(
      n?.targetType === `cctv` ? (n?.targetName ?? ``) : ``,
    ),
    [C, w] = (0, s.useState)(n?.cctvIp ?? ``),
    [T, E] = (0, s.useState)(n?.targetPort == null ? `` : String(n.targetPort)),
    [D, O] = (0, s.useState)(n?.fiberType || `SM`),
    [k, M] = (0, s.useState)(n?.connectorType || `SC/APC`),
    [N, P] = (0, s.useState)(n?.cableId ?? ``),
    [F, I] = (0, s.useState)(
      n?.cableLength == null ? `` : String(n.cableLength),
    ),
    [L, R] = (0, s.useState)(n?.notes ?? ``),
    z = p === `reserved` || p === `inactive`,
    B = _ === `cctv`,
    V = (0, s.useMemo)(() => r.filter((t) => t.id !== e), [r, e]),
    W = (0, s.useMemo)(
      () =>
        i.flatMap((e) =>
          e.switches.map((t) => ({ id: t.id, name: t.name, floor: e.floor })),
        ),
      [i],
    ),
    G = (0, s.useMemo)(() => A(i), [i]),
    K = (0, s.useMemo)(
      () => o.map((e) => ({ id: e.id, name: e.name, floor: e.floor })),
      [o],
    );
  function ee(e) {
    S(e);
    let t = G.find((t) => t.name === e);
    t?.ip && w(t.ip);
  }
  function q(e) {
    w(e);
    let t = G.find((t) => t.ip === e);
    t?.name && S(t.name);
  }
  function te(e) {
    if (!e) return;
    let [t, n] = e.split(`|||`);
    (t && S(t), n && w(n));
  }
  function J() {
    if (!z && !B && !y) {
      u(`Vui lòng chọn thiết bị đích!`, `error`);
      return;
    }
    if (!z && B && !x.trim() && !C.trim()) {
      u(`Vui lòng nhập tên hoặc IP camera!`, `error`);
      return;
    }
    let e = ``,
      i = ``;
    (z ||
      (B
        ? ((e = x.trim() || C.trim() || `cctv-${Date.now()}`),
          (i = x.trim() || C.trim()))
        : _ === `odf`
          ? ((e = y), (i = r.find((e) => e.id === y)?.name ?? y))
          : _ === `switch`
            ? ((e = y), (i = W.find((e) => e.id === y)?.name ?? y))
            : ((e = y), (i = K.find((e) => e.id === y)?.name ?? y))),
      c({
        id: n?.id ?? `conn-${Date.now()}`,
        portFrom: t,
        targetType: z ? `` : _,
        targetId: e,
        targetName: i,
        targetPort: parseInt(T, 10) || null,
        cctvIp: (!z && B && C.trim()) || null,
        portDesc: d.trim(),
        status: p,
        fiberType: D,
        connectorType: k,
        cableId: N.trim(),
        cableLength: parseFloat(F) || null,
        label: h.trim(),
        notes: L.trim(),
      }));
  }
  return (0, j.jsx)(`div`, {
    className: `modal`,
    style: { display: `flex`, zIndex: 215 },
    children: (0, j.jsxs)(`div`, {
      className: `modal-content shadow-2xl`,
      style: {
        width: 600,
        maxHeight: `92vh`,
        display: `flex`,
        flexDirection: `column`,
      },
      children: [
        (0, j.jsxs)(`div`, {
          className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
          children: [
            (0, j.jsxs)(`h3`, {
              className: `text-lg font-black text-slate-800 flex items-center gap-3`,
              children: [
                (0, j.jsx)(`div`, {
                  className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100`,
                  children: (0, j.jsx)(`i`, { className: `fas fa-plug` }),
                }),
                (0, j.jsx)(`span`, {
                  children: n ? `Sửa kết nối Port ${t}` : `Kết nối Port ${t}`,
                }),
              ],
            }),
            (0, j.jsx)(`button`, {
              onClick: l,
              className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
              children: (0, j.jsx)(`i`, { className: `fas fa-times` }),
            }),
          ],
        }),
        (0, j.jsxs)(`div`, {
          className: `flex-1 overflow-y-auto custom-scroll space-y-4 pr-1`,
          children: [
            (0, j.jsxs)(`div`, {
              className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
              children: [
                (0, j.jsxs)(`p`, {
                  className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5`,
                  children: [
                    (0, j.jsx)(`i`, { className: `fas fa-tag text-amber-400` }),
                    ` Thông tin Port`,
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-3`,
                  children: [
                    (0, j.jsxs)(`div`, {
                      className: `col-span-2`,
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Mô tả Port (Description)`,
                        }),
                        (0, j.jsx)(`input`, {
                          value: d,
                          onChange: (e) => f(e.target.value),
                          placeholder: `VD: Trục kéo ngoài sân, Hướng cổng A...`,
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                        }),
                      ],
                    }),
                    (0, j.jsxs)(`div`, {
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Trạng thái`,
                        }),
                        (0, j.jsxs)(`select`, {
                          value: p,
                          onChange: (e) => m(e.target.value),
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
                          children: [
                            (0, j.jsx)(`option`, {
                              value: `active`,
                              children: `🟢 Active — Đang hoạt động`,
                            }),
                            (0, j.jsx)(`option`, {
                              value: `inactive`,
                              children: `⚫ Inactive — Tạm ngưng`,
                            }),
                            (0, j.jsx)(`option`, {
                              value: `reserved`,
                              children: `🟣 Reserved — Dự phòng`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, j.jsxs)(`div`, {
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Nhãn / Label`,
                        }),
                        (0, j.jsx)(`input`, {
                          value: h,
                          onChange: (e) => g(e.target.value),
                          placeholder: `VD: F01, Main-A...`,
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            !z &&
              (0, j.jsxs)(`div`, {
                className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
                children: [
                  (0, j.jsxs)(`p`, {
                    className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5`,
                    children: [
                      (0, j.jsx)(`i`, {
                        className: `fas fa-project-diagram text-blue-400`,
                      }),
                      ` Kết nối đến thiết bị`,
                    ],
                  }),
                  (0, j.jsxs)(`div`, {
                    className: `grid grid-cols-2 gap-3`,
                    children: [
                      (0, j.jsxs)(`div`, {
                        children: [
                          (0, j.jsx)(`label`, {
                            htmlFor: `odf-conn-target-type`,
                            className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                            children: `Loại thiết bị đích`,
                          }),
                          (0, j.jsxs)(`select`, {
                            id: `odf-conn-target-type`,
                            value: _,
                            onChange: (e) => {
                              (v(e.target.value), b(``));
                            },
                            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
                            children: [
                              (0, j.jsx)(`option`, {
                                value: `odf`,
                                children: `ODF khác`,
                              }),
                              (0, j.jsx)(`option`, {
                                value: `switch`,
                                children: `Switch`,
                              }),
                              (0, j.jsx)(`option`, {
                                value: `ap`,
                                children: `Access Point`,
                              }),
                              (0, j.jsx)(`option`, {
                                value: `cctv`,
                                children: `Camera CCTV`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      !B &&
                        (0, j.jsxs)(`div`, {
                          children: [
                            (0, j.jsx)(`label`, {
                              htmlFor: `odf-conn-target-select`,
                              className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                              children: `Chọn thiết bị`,
                            }),
                            (0, j.jsxs)(`select`, {
                              id: `odf-conn-target-select`,
                              value: y,
                              onChange: (e) => b(e.target.value),
                              className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
                              children: [
                                (0, j.jsxs)(`option`, {
                                  value: ``,
                                  children: [
                                    `-- `,
                                    _ === `odf`
                                      ? `Chọn ODF`
                                      : _ === `switch`
                                        ? `Chọn Switch`
                                        : `Chọn AP`,
                                    ` --`,
                                  ],
                                }),
                                _ === `odf`
                                  ? V.map((e) =>
                                      (0, j.jsxs)(
                                        `option`,
                                        {
                                          value: e.id,
                                          children: [
                                            e.name,
                                            ` (`,
                                            e.location || e.type,
                                            `)`,
                                          ],
                                        },
                                        e.id,
                                      ),
                                    )
                                  : _ === `switch`
                                    ? W.map((e) =>
                                        (0, j.jsxs)(
                                          `option`,
                                          {
                                            value: e.id,
                                            children: [
                                              e.name,
                                              ` (`,
                                              e.floor,
                                              `)`,
                                            ],
                                          },
                                          e.id,
                                        ),
                                      )
                                    : K.map((e) =>
                                        (0, j.jsxs)(
                                          `option`,
                                          {
                                            value: e.id,
                                            children: [
                                              e.name,
                                              ` (`,
                                              e.floor,
                                              `)`,
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                              ],
                            }),
                          ],
                        }),
                      B &&
                        (0, j.jsxs)(`div`, {
                          className: `col-span-2`,
                          children: [
                            (0, j.jsxs)(`div`, {
                              className: `mb-2`,
                              children: [
                                (0, j.jsxs)(`label`, {
                                  className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                                  children: [
                                    (0, j.jsx)(`i`, {
                                      className: `fas fa-database mr-1 text-red-400`,
                                    }),
                                    `Chọn từ database CCTV (VLAN 120)`,
                                  ],
                                }),
                                (0, j.jsxs)(`select`, {
                                  onChange: (e) => te(e.target.value),
                                  className: `w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-red-400 transition-colors`,
                                  children: [
                                    (0, j.jsx)(`option`, {
                                      value: ``,
                                      children: `-- Tìm trong database camera --`,
                                    }),
                                    G.map((e, t) =>
                                      (0, j.jsxs)(
                                        `option`,
                                        {
                                          value: `${e.name}|||${e.ip}`,
                                          children: [
                                            e.name || e.ip,
                                            e.ip && e.name ? ` · ${e.ip}` : ``,
                                            ` (`,
                                            e.swName,
                                            `)`,
                                          ],
                                        },
                                        t,
                                      ),
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            (0, j.jsxs)(`div`, {
                              className: `grid grid-cols-2 gap-3`,
                              children: [
                                (0, j.jsxs)(`div`, {
                                  children: [
                                    (0, j.jsx)(`label`, {
                                      className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                                      children: `Tên Camera`,
                                    }),
                                    (0, j.jsx)(`input`, {
                                      value: x,
                                      onChange: (e) => ee(e.target.value),
                                      placeholder: `VD: CAM-01, Cổng chính...`,
                                      className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                                    }),
                                  ],
                                }),
                                (0, j.jsxs)(`div`, {
                                  children: [
                                    (0, j.jsx)(`label`, {
                                      className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                                      children: `IP Camera`,
                                    }),
                                    (0, j.jsx)(`input`, {
                                      value: C,
                                      onChange: (e) => q(e.target.value),
                                      placeholder: `VD: 192.168.2.50`,
                                      className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      _ !== `cctv` &&
                        _ !== `ap` &&
                        (0, j.jsxs)(`div`, {
                          className: `col-span-2`,
                          children: [
                            (0, j.jsx)(`label`, {
                              className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                              children: `Port đích (tuỳ chọn)`,
                            }),
                            (0, j.jsx)(`input`, {
                              value: T,
                              onChange: (e) => E(e.target.value),
                              type: `number`,
                              min: 1,
                              placeholder: `Số port đích trên thiết bị đó`,
                              className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            (0, j.jsxs)(`div`, {
              className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
              children: [
                (0, j.jsxs)(`p`, {
                  className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5`,
                  children: [
                    (0, j.jsx)(`i`, {
                      className: `fas fa-ruler-horizontal text-emerald-400`,
                    }),
                    ` Thông số cáp quang`,
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-3`,
                  children: [
                    (0, j.jsxs)(`div`, {
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Loại sợi quang`,
                        }),
                        (0, j.jsx)(`select`, {
                          value: D,
                          onChange: (e) => O(e.target.value),
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
                          children: H.map((e) =>
                            (0, j.jsx)(
                              `option`,
                              { value: e.value, children: e.label },
                              e.value,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, j.jsxs)(`div`, {
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Loại đầu nối`,
                        }),
                        (0, j.jsx)(`select`, {
                          value: k,
                          onChange: (e) => M(e.target.value),
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
                          children: U.map((e) =>
                            (0, j.jsx)(`option`, { value: e, children: e }, e),
                          ),
                        }),
                      ],
                    }),
                    (0, j.jsxs)(`div`, {
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Mã cáp / Cable ID`,
                        }),
                        (0, j.jsx)(`input`, {
                          value: N,
                          onChange: (e) => P(e.target.value),
                          placeholder: `VD: CAB-001, F-A03-B07...`,
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                        }),
                      ],
                    }),
                    (0, j.jsxs)(`div`, {
                      children: [
                        (0, j.jsx)(`label`, {
                          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                          children: `Chiều dài cáp (m)`,
                        }),
                        (0, j.jsx)(`input`, {
                          value: F,
                          onChange: (e) => I(e.target.value),
                          type: `number`,
                          min: 0,
                          step: 0.5,
                          placeholder: `VD: 50, 120.5...`,
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 transition-colors`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, j.jsxs)(`div`, {
              children: [
                (0, j.jsx)(`label`, {
                  className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                  children: `Ghi chú thêm`,
                }),
                (0, j.jsx)(`textarea`, {
                  value: L,
                  onChange: (e) => R(e.target.value),
                  rows: 2,
                  placeholder: `Ghi chú kỹ thuật, lịch sử sự cố, v.v...`,
                  className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none`,
                }),
              ],
            }),
          ],
        }),
        (0, j.jsxs)(`div`, {
          className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
          children: [
            (0, j.jsx)(`div`, { className: `flex-1` }),
            (0, j.jsx)(`button`, {
              onClick: l,
              className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
              children: `Hủy`,
            }),
            (0, j.jsxs)(`button`, {
              onClick: J,
              className: `px-6 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-amber-700 transition-all flex items-center gap-2`,
              children: [
                (0, j.jsx)(`i`, { className: `fas fa-plug` }),
                ` Lưu kết nối`,
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function G(e) {
  let t = (0, c.c)(43),
    { card: n, onDeleteConnection: r } = e,
    i = `${n.borderColor}40`,
    a = `3px solid ${n.borderColor}`,
    o;
  t[0] !== i || t[1] !== a
    ? ((o = { borderColor: i, borderLeft: a }),
      (t[0] = i),
      (t[1] = a),
      (t[2] = o))
    : (o = t[2]);
  let s = `${n.borderColor}18`,
    l;
  t[3] === s ? (l = t[4]) : ((l = { background: s }), (t[3] = s), (t[4] = l));
  let u = `fas ${n.headerIcon} text-[8px]`,
    d;
  t[5] === n.borderColor
    ? (d = t[6])
    : ((d = { color: n.borderColor }), (t[5] = n.borderColor), (t[6] = d));
  let f;
  t[7] !== u || t[8] !== d
    ? ((f = (0, j.jsx)(`i`, { className: u, style: d })),
      (t[7] = u),
      (t[8] = d),
      (t[9] = f))
    : (f = t[9]);
  let p;
  t[10] !== l || t[11] !== f
    ? ((p = (0, j.jsx)(`div`, {
        className: `w-5 h-5 rounded flex items-center justify-center shrink-0`,
        style: l,
        children: f,
      })),
      (t[10] = l),
      (t[11] = f),
      (t[12] = p))
    : (p = t[12]);
  let m;
  t[13] === n.borderColor
    ? (m = t[14])
    : ((m = { color: n.borderColor }), (t[13] = n.borderColor), (t[14] = m));
  let h;
  t[15] !== n.port || t[16] !== m
    ? ((h = (0, j.jsxs)(`span`, {
        className: `text-[11px] font-black shrink-0`,
        style: m,
        children: [`P`, n.port],
      })),
      (t[15] = n.port),
      (t[16] = m),
      (t[17] = h))
    : (h = t[17]);
  let g;
  t[18] === n.headerBadge
    ? (g = t[19])
    : ((g =
        n.headerBadge &&
        (0, j.jsxs)(`span`, {
          className: `text-[8px] font-black px-1.5 py-0.5 rounded-md${n.headerBadge.icon ? ` flex items-center gap-1` : ``}`,
          style: {
            background: `${n.headerBadge.color}15`,
            color: n.headerBadge.color,
            border: `1px solid ${n.headerBadge.color}30`,
          },
          children: [
            n.headerBadge.icon &&
              (0, j.jsx)(`i`, {
                className: `fas ${n.headerBadge.icon}`,
                style: { fontSize: 6 },
              }),
            n.headerBadge.text,
          ],
        })),
      (t[18] = n.headerBadge),
      (t[19] = g));
  let _;
  t[20] !== h || t[21] !== g || t[22] !== p
    ? ((_ = (0, j.jsxs)(`div`, {
        className: `flex items-center gap-2 px-2.5 pt-2 pb-1`,
        children: [p, h, g],
      })),
      (t[20] = h),
      (t[21] = g),
      (t[22] = p),
      (t[23] = _))
    : (_ = t[23]);
  let v;
  t[24] === n.incoming
    ? (v = t[25])
    : ((v =
        n.incoming &&
        (0, j.jsxs)(`div`, {
          className: `flex items-start gap-2 py-1.5 border-b border-slate-50`,
          children: [
            (0, j.jsxs)(`div`, {
              className: `flex items-center gap-1 shrink-0 mt-0.5`,
              children: [
                (0, j.jsx)(`span`, {
                  className: `text-[9px] font-black text-amber-400`,
                  children: `←`,
                }),
                (0, j.jsx)(`span`, {
                  className: `text-[7px] font-black px-1 py-0.5 rounded`,
                  style: { background: `#f59e0b15`, color: `#f59e0b` },
                  children: `nhận`,
                }),
              ],
            }),
            (0, j.jsxs)(`div`, {
              className: `flex-1 min-w-0`,
              children: [
                (0, j.jsx)(`span`, {
                  className: `text-[10px] font-bold text-amber-700 block truncate`,
                  children: n.incoming.label,
                }),
                n.incoming.subParts.length > 0 &&
                  (0, j.jsx)(`div`, {
                    className: `flex gap-1 flex-wrap mt-0.5`,
                    children: n.incoming.subParts.map(q),
                  }),
              ],
            }),
          ],
        })),
      (t[24] = n.incoming),
      (t[25] = v));
  let y;
  t[26] !== n.outgoing || t[27] !== n.port || t[28] !== r
    ? ((y =
        n.outgoing &&
        n.outgoing.kind === `device` &&
        (0, j.jsxs)(`div`, {
          className: `flex items-start gap-2 py-1.5`,
          children: [
            (0, j.jsxs)(`div`, {
              className: `flex items-center gap-1 shrink-0 mt-0.5`,
              children: [
                (0, j.jsx)(`span`, {
                  className: `text-[9px] font-black`,
                  style: { color: n.outgoing.typeColor },
                  children: `→`,
                }),
                (0, j.jsxs)(`span`, {
                  className: `text-[7px] font-black px-1 py-0.5 rounded flex items-center gap-0.5`,
                  style: {
                    background: `${n.outgoing.typeColor}15`,
                    color: n.outgoing.typeColor,
                    border: `1px solid ${n.outgoing.typeColor}30`,
                  },
                  children: [
                    (0, j.jsx)(`i`, {
                      className: `fas ${n.outgoing.typeIcon}`,
                      style: { fontSize: 6 },
                    }),
                    n.outgoing.typeLabel,
                  ],
                }),
              ],
            }),
            (0, j.jsxs)(`div`, {
              className: `flex-1 min-w-0`,
              children: [
                (0, j.jsx)(`span`, {
                  className: `text-[10px] font-bold block truncate`,
                  style: { color: n.outgoing.typeColor },
                  children: n.outgoing.label,
                }),
                n.outgoing.subParts.length > 0 &&
                  (0, j.jsx)(`div`, {
                    className: `flex gap-1 flex-wrap mt-0.5`,
                    children: n.outgoing.subParts.map(ee),
                  }),
              ],
            }),
            (0, j.jsx)(`button`, {
              onClick: () => r(n.outgoing.connId),
              title: `Xóa kết nối Port ${n.port}`,
              className: `opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-50 rounded text-red-400 hover:text-red-500 shrink-0 mt-0.5`,
              children: (0, j.jsx)(`i`, {
                className: `fas fa-times text-[8px]`,
              }),
            }),
          ],
        })),
      (t[26] = n.outgoing),
      (t[27] = n.port),
      (t[28] = r),
      (t[29] = y))
    : (y = t[29]);
  let b;
  t[30] !== n.borderColor ||
  t[31] !== n.outgoing ||
  t[32] !== n.port ||
  t[33] !== r
    ? ((b =
        n.outgoing &&
        n.outgoing.kind === `passive` &&
        (0, j.jsxs)(`div`, {
          className: `flex items-start gap-2 py-1.5`,
          children: [
            (0, j.jsx)(`span`, { className: `text-[9px] w-5 shrink-0 mt-0.5` }),
            (0, j.jsxs)(`div`, {
              className: `flex-1 min-w-0`,
              children: [
                (0, j.jsx)(`span`, {
                  className: `text-[10px] font-bold block`,
                  style: { color: n.borderColor },
                  children: n.outgoing.label,
                }),
                n.outgoing.subParts.length > 0 &&
                  (0, j.jsx)(`div`, {
                    className: `flex gap-1 flex-wrap mt-0.5`,
                    children: n.outgoing.subParts.map(K),
                  }),
              ],
            }),
            (0, j.jsx)(`button`, {
              onClick: () => r(n.outgoing.connId),
              title: `Xóa kết nối Port ${n.port}`,
              className: `opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-50 rounded text-red-400 hover:text-red-500 shrink-0 mt-0.5`,
              children: (0, j.jsx)(`i`, {
                className: `fas fa-times text-[8px]`,
              }),
            }),
          ],
        })),
      (t[30] = n.borderColor),
      (t[31] = n.outgoing),
      (t[32] = n.port),
      (t[33] = r),
      (t[34] = b))
    : (b = t[34]);
  let x;
  t[35] !== v || t[36] !== y || t[37] !== b
    ? ((x = (0, j.jsxs)(`div`, {
        className: `px-2.5 pb-1.5`,
        children: [v, y, b],
      })),
      (t[35] = v),
      (t[36] = y),
      (t[37] = b),
      (t[38] = x))
    : (x = t[38]);
  let S;
  return (
    t[39] !== _ || t[40] !== x || t[41] !== o
      ? ((S = (0, j.jsxs)(`div`, {
          className: `group rounded-xl bg-white border hover:shadow-sm transition-all overflow-hidden mb-2`,
          style: o,
          children: [_, x],
        })),
        (t[39] = _),
        (t[40] = x),
        (t[41] = o),
        (t[42] = S))
      : (S = t[42]),
    S
  );
}
function K(e, t) {
  return (0, j.jsx)(
    `span`,
    {
      className: `text-[8px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1 py-0.5 rounded`,
      children: e,
    },
    t,
  );
}
function ee(e, t) {
  return (0, j.jsx)(
    `span`,
    {
      className: `text-[8px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1 py-0.5 rounded`,
      children: e,
    },
    t,
  );
}
function q(e, t) {
  return (0, j.jsx)(
    `span`,
    {
      className: `text-[8px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1 py-0.5 rounded`,
      children: e,
    },
    t,
  );
}
function te(e) {
  let t = (0, c.c)(34),
    {
      oddPorts: n,
      evenPorts: r,
      onDeleteConnection: i,
      passThroughCount: a,
      receiveCount: o,
      half: s,
      totalPorts: l,
    } = e,
    u = n.length + r.length;
  if (u === 0) return null;
  let d;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = (0, j.jsx)(`i`, { className: `fas fa-plug text-amber-400` })),
      (t[0] = d))
    : (d = t[0]);
  let f;
  t[1] === u
    ? (f = t[2])
    : ((f = (0, j.jsxs)(`h5`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2`,
        children: [
          d,
          ` Danh sách kết nối`,
          (0, j.jsxs)(`span`, {
            className: `text-slate-300 font-bold normal-case tracking-normal`,
            children: [`(`, u, ` port)`],
          }),
        ],
      })),
      (t[1] = u),
      (t[2] = f));
  let p;
  t[3] === a
    ? (p = t[4])
    : ((p =
        a > 0 &&
        (0, j.jsxs)(`span`, {
          className: `flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full`,
          style: {
            background: `#6366f115`,
            color: `#6366f1`,
            border: `1px solid #6366f130`,
          },
          children: [
            (0, j.jsx)(`i`, {
              className: `fas fa-arrows-alt-h`,
              style: { fontSize: 7 },
            }),
            `Qua cầu (`,
            a,
            `)`,
          ],
        })),
      (t[3] = a),
      (t[4] = p));
  let m;
  t[5] === o
    ? (m = t[6])
    : ((m =
        o > 0 &&
        (0, j.jsxs)(`span`, {
          className: `flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full`,
          style: {
            background: `#f59e0b15`,
            color: `#f59e0b`,
            border: `1px solid #f59e0b30`,
          },
          children: [
            (0, j.jsx)(`i`, {
              className: `fas fa-arrow-left`,
              style: { fontSize: 7 },
            }),
            `Nhận (`,
            o,
            `)`,
          ],
        })),
      (t[5] = o),
      (t[6] = m));
  let h = s + 1,
    g;
  t[7] !== s || t[8] !== h || t[9] !== l
    ? ((g = (0, j.jsxs)(`span`, {
        className: `text-[9px] font-bold text-slate-400`,
        children: [`Port 1–`, s, ` trái · `, h, `–`, l, ` phải`],
      })),
      (t[7] = s),
      (t[8] = h),
      (t[9] = l),
      (t[10] = g))
    : (g = t[10]);
  let _;
  t[11] !== p || t[12] !== m || t[13] !== g
    ? ((_ = (0, j.jsxs)(`div`, {
        className: `flex gap-2 ml-auto flex-wrap`,
        children: [p, m, g],
      })),
      (t[11] = p),
      (t[12] = m),
      (t[13] = g),
      (t[14] = _))
    : (_ = t[14]);
  let v;
  t[15] !== f || t[16] !== _
    ? ((v = (0, j.jsxs)(`div`, {
        className: `flex items-center gap-3 mb-3 flex-wrap`,
        children: [f, _],
      })),
      (t[15] = f),
      (t[16] = _),
      (t[17] = v))
    : (v = t[17]);
  let y;
  t[18] !== n || t[19] !== i
    ? ((y =
        n.length > 0
          ? n.map((e) =>
              (0, j.jsx)(G, { card: e, onDeleteConnection: i }, e.port),
            )
          : (0, j.jsx)(`p`, {
              className: `text-[10px] text-slate-300 italic text-center py-4`,
              children: `Không có`,
            })),
      (t[18] = n),
      (t[19] = i),
      (t[20] = y))
    : (y = t[20]);
  let b;
  t[21] === y
    ? (b = t[22])
    : ((b = (0, j.jsx)(`div`, { children: y })), (t[21] = y), (t[22] = b));
  let x;
  t[23] !== r || t[24] !== i
    ? ((x =
        r.length > 0
          ? r.map((e) =>
              (0, j.jsx)(G, { card: e, onDeleteConnection: i }, e.port),
            )
          : (0, j.jsx)(`p`, {
              className: `text-[10px] text-slate-300 italic text-center py-4`,
              children: `Không có`,
            })),
      (t[23] = r),
      (t[24] = i),
      (t[25] = x))
    : (x = t[25]);
  let S;
  t[26] === x
    ? (S = t[27])
    : ((S = (0, j.jsx)(`div`, { children: x })), (t[26] = x), (t[27] = S));
  let C;
  t[28] !== b || t[29] !== S
    ? ((C = (0, j.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [b, S],
      })),
      (t[28] = b),
      (t[29] = S),
      (t[30] = C))
    : (C = t[30]);
  let w;
  return (
    t[31] !== C || t[32] !== v
      ? ((w = (0, j.jsxs)(`div`, {
          className: `mt-5 border-t border-slate-100 pt-4`,
          children: [v, C],
        })),
        (t[31] = C),
        (t[32] = v),
        (t[33] = w))
      : (w = t[33]),
    w
  );
}
var J = {
    switch: `#3b82f6`,
    cctv: `#ef4444`,
    odf: `#f59e0b`,
    other: `#64748b`,
  },
  ne = { switch: `Switch`, cctv: `CCTV`, odf: `ODF`, other: `Thiết bị` };
function re(e) {
  let t = (0, c.c)(10),
    { label: n, sublabel: r, indigo: i } = e,
    a = i
      ? `bg-indigo-50 border-indigo-400 text-indigo-700`
      : `bg-amber-50 border-amber-400 text-amber-700`,
    o = i ? `text-indigo-600` : `text-amber-600`,
    s;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, j.jsx)(`div`, { className: `h-5` })), (t[0] = s))
    : (s = t[0]);
  let l = `w-12 h-12 ${a} border-2 rounded-xl flex items-center justify-center text-xs font-black shadow-sm`,
    u;
  t[1] !== n || t[2] !== l
    ? ((u = (0, j.jsx)(`div`, { className: l, children: n })),
      (t[1] = n),
      (t[2] = l),
      (t[3] = u))
    : (u = t[3]);
  let d = `text-[9px] font-bold ${o} mt-1.5 text-center leading-tight max-w-[72px]`,
    f;
  t[4] !== r || t[5] !== d
    ? ((f = (0, j.jsx)(`span`, { className: d, children: r })),
      (t[4] = r),
      (t[5] = d),
      (t[6] = f))
    : (f = t[6]);
  let p;
  return (
    t[7] !== u || t[8] !== f
      ? ((p = (0, j.jsxs)(`div`, {
          className: `flex flex-col items-center shrink-0`,
          children: [s, u, f],
        })),
        (t[7] = u),
        (t[8] = f),
        (t[9] = p))
      : (p = t[9]),
    p
  );
}
function ie(e) {
  let t = (0, c.c)(29),
    { icon: n, port: r, name: i, type: a, color: o } = e,
    s;
  t[0] === o ? (s = t[1]) : ((s = { background: o }), (t[0] = o), (t[1] = s));
  let l = ne[a] ?? `Thiết bị`,
    u;
  t[2] !== s || t[3] !== l
    ? ((u = (0, j.jsx)(`span`, {
        className: `h-5 px-2 rounded-md text-[8px] font-black text-white flex items-center`,
        style: s,
        children: l,
      })),
      (t[2] = s),
      (t[3] = l),
      (t[4] = u))
    : (u = t[4]);
  let d = `${o}12`,
    f = `${o}55`,
    p;
  t[5] !== d || t[6] !== f
    ? ((p = { background: d, borderColor: f }),
      (t[5] = d),
      (t[6] = f),
      (t[7] = p))
    : (p = t[7]);
  let m = `fas ${n} text-sm`,
    h;
  t[8] === o ? (h = t[9]) : ((h = { color: o }), (t[8] = o), (t[9] = h));
  let g;
  t[10] !== m || t[11] !== h
    ? ((g = (0, j.jsx)(`i`, { className: m, style: h })),
      (t[10] = m),
      (t[11] = h),
      (t[12] = g))
    : (g = t[12]);
  let _;
  t[13] !== o || t[14] !== r
    ? ((_ = r
        ? (0, j.jsxs)(`span`, {
            className: `text-[8px] font-black mt-0.5`,
            style: { color: `${o}aa` },
            children: [`P`, r],
          })
        : null),
      (t[13] = o),
      (t[14] = r),
      (t[15] = _))
    : (_ = t[15]);
  let v;
  t[16] !== _ || t[17] !== p || t[18] !== g
    ? ((v = (0, j.jsxs)(`div`, {
        className: `w-14 h-12 rounded-xl flex flex-col items-center justify-center border-2 shadow-sm`,
        style: p,
        children: [g, _],
      })),
      (t[16] = _),
      (t[17] = p),
      (t[18] = g),
      (t[19] = v))
    : (v = t[19]);
  let y;
  t[20] === o ? (y = t[21]) : ((y = { color: o }), (t[20] = o), (t[21] = y));
  let b;
  t[22] !== i || t[23] !== y
    ? ((b = (0, j.jsx)(`span`, {
        className: `text-[9px] font-bold mt-1.5 text-center leading-tight max-w-[80px] truncate`,
        style: y,
        children: i,
      })),
      (t[22] = i),
      (t[23] = y),
      (t[24] = b))
    : (b = t[24]);
  let x;
  return (
    t[25] !== v || t[26] !== b || t[27] !== u
      ? ((x = (0, j.jsxs)(`div`, {
          className: `flex flex-col items-center shrink-0`,
          children: [u, v, b],
        })),
        (t[25] = v),
        (t[26] = b),
        (t[27] = u),
        (t[28] = x))
      : (x = t[28]),
    x
  );
}
function Y(e) {
  let t = (0, c.c)(14),
    { info: n, color: r } = e,
    i;
  t[0] === n
    ? (i = t[1])
    : ((i =
        n &&
        (0, j.jsx)(`span`, {
          className: `text-[8px] font-bold text-slate-400 whitespace-nowrap`,
          children: n,
        })),
      (t[0] = n),
      (t[1] = i));
  let a;
  t[2] === i
    ? (a = t[3])
    : ((a = (0, j.jsx)(`div`, {
        className: `h-5 flex items-center justify-center`,
        children: i,
      })),
      (t[2] = i),
      (t[3] = a));
  let o;
  t[4] === r
    ? (o = t[5])
    : ((o = (0, j.jsx)(`div`, {
        className: `w-8 h-0.5`,
        style: { background: r },
      })),
      (t[4] = r),
      (t[5] = o));
  let s = `7px solid ${r}`,
    l;
  t[6] === s
    ? (l = t[7])
    : ((l = (0, j.jsx)(`div`, {
        style: {
          width: 0,
          height: 0,
          borderTop: `4px solid transparent`,
          borderBottom: `4px solid transparent`,
          borderLeft: s,
        },
      })),
      (t[6] = s),
      (t[7] = l));
  let u;
  t[8] !== o || t[9] !== l
    ? ((u = (0, j.jsxs)(`div`, {
        className: `h-12 flex items-center`,
        children: [o, l],
      })),
      (t[8] = o),
      (t[9] = l),
      (t[10] = u))
    : (u = t[10]);
  let d;
  return (
    t[11] !== a || t[12] !== u
      ? ((d = (0, j.jsxs)(`div`, {
          className: `flex flex-col items-center shrink-0 px-2`,
          children: [a, u],
        })),
        (t[11] = a),
        (t[12] = u),
        (t[13] = d))
      : (d = t[13]),
    d
  );
}
function ae() {
  let e = (0, c.c)(1),
    t;
  return (
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((t = (0, j.jsxs)(`div`, {
          className: `flex flex-col items-center shrink-0`,
          children: [
            (0, j.jsx)(`div`, { className: `h-5` }),
            (0, j.jsx)(`div`, {
              className: `w-12 h-12 bg-red-50 border-2 border-red-400 rounded-xl flex items-center justify-center text-base shadow-sm`,
              children: `⚠`,
            }),
            (0, j.jsx)(`span`, {
              className: `text-[9px] font-bold text-red-500 mt-1.5`,
              children: `Vòng lặp`,
            }),
          ],
        })),
        (e[0] = t))
      : (t = e[0]),
    t
  );
}
function oe() {
  let e = (0, c.c)(2),
    t;
  e[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((t = (0, j.jsx)(`div`, { className: `h-5` })), (e[0] = t))
    : (t = e[0]);
  let n;
  return (
    e[1] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((n = (0, j.jsxs)(`div`, {
          className: `flex flex-col items-center shrink-0`,
          children: [
            t,
            (0, j.jsx)(`div`, {
              className: `w-12 h-12 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-300`,
              children: (0, j.jsx)(`i`, {
                className: `fas fa-question text-sm`,
              }),
            }),
            (0, j.jsx)(`span`, {
              className: `text-[9px] text-slate-400 mt-1.5`,
              children: `Không rõ`,
            }),
          ],
        })),
        (e[1] = n))
      : (n = e[1]),
    n
  );
}
function se(e) {
  return e.kind === `loop`
    ? `#e11d48`
    : e.kind === `odf`
      ? J.odf
      : (J[e.endType ?? `other`] ?? J.other);
}
function ce(e) {
  let t = (0, c.c)(8),
    { odfName: n, port: r, chain: i } = e,
    a = `P${r}`,
    o;
  t[0] !== n || t[1] !== a
    ? ((o = (0, j.jsx)(re, { label: a, sublabel: n, indigo: !0 }, `start`)),
      (t[0] = n),
      (t[1] = a),
      (t[2] = o))
    : (o = t[2]);
  let s;
  if (t[3] !== i || t[4] !== o) {
    let e = [o];
    if (i.length === 0) {
      let n;
      (t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((n = (0, j.jsx)(Y, { info: ``, color: `#cbd5e1` }, `empty-c`)),
          (t[6] = n))
        : (n = t[6]),
        e.push(n));
      let r;
      (t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((r = (0, j.jsx)(oe, {}, `empty-t`)), (t[7] = r))
        : (r = t[7]),
        e.push(r));
    }
    (i.forEach((t, n) => {
      let r = se(t),
        i = [t.fiberType, t.cableId, t.cableLength ? `${t.cableLength}m` : ``]
          .filter(Boolean)
          .join(` · `);
      (e.push((0, j.jsx)(Y, { info: i, color: r }, `c${n}`)),
        t.kind === `odf`
          ? e.push(
              (0, j.jsx)(
                re,
                {
                  label: `P${t.nextPort}`,
                  sublabel: t.nextName ?? ``,
                  indigo: !1,
                },
                `h${n}`,
              ),
            )
          : t.kind === `loop`
            ? e.push((0, j.jsx)(ae, {}, `h${n}`))
            : e.push(
                (0, j.jsx)(
                  ie,
                  {
                    icon: t.endIcon ?? `fa-plug`,
                    port: t.endPort,
                    name: t.endName ?? ``,
                    type: t.endType ?? `other`,
                    color: r,
                  },
                  `h${n}`,
                ),
              ));
    }),
      (s = (0, j.jsx)(j.Fragment, { children: e })),
      (t[3] = i),
      (t[4] = o),
      (t[5] = s));
  } else s = t[5];
  return s;
}
function le(e) {
  let t = (0, c.c)(17),
    { odfName: n, port: r, fromOdfName: i, fromPort: a, fiberType: o } = e,
    s = `P${a}`,
    l;
  t[0] !== i || t[1] !== s
    ? ((l = (0, j.jsx)(re, { label: s, sublabel: i, indigo: !1 })),
      (t[0] = i),
      (t[1] = s),
      (t[2] = l))
    : (l = t[2]);
  let u = o ?? ``,
    d;
  t[3] === u
    ? (d = t[4])
    : ((d = (0, j.jsx)(Y, { info: u, color: `#f59e0b` })),
      (t[3] = u),
      (t[4] = d));
  let f;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = (0, j.jsx)(`span`, {
        className: `h-5 px-2 rounded-md text-[8px] font-black text-amber-600 bg-amber-100 flex items-center`,
        children: `nhận`,
      })),
      (t[5] = f))
    : (f = t[5]);
  let p;
  t[6] === r
    ? (p = t[7])
    : ((p = (0, j.jsxs)(`div`, {
        className: `w-12 h-12 bg-white border-2 border-amber-300 rounded-xl flex items-center justify-center text-xs font-black text-slate-700 shadow-sm`,
        children: [`P`, r],
      })),
      (t[6] = r),
      (t[7] = p));
  let m;
  t[8] === n
    ? (m = t[9])
    : ((m = (0, j.jsx)(`span`, {
        className: `text-[9px] font-bold text-slate-600 mt-1.5 text-center leading-tight max-w-[72px]`,
        children: n,
      })),
      (t[8] = n),
      (t[9] = m));
  let h;
  t[10] !== p || t[11] !== m
    ? ((h = (0, j.jsxs)(`div`, {
        className: `flex flex-col items-center shrink-0`,
        children: [f, p, m],
      })),
      (t[10] = p),
      (t[11] = m),
      (t[12] = h))
    : (h = t[12]);
  let g;
  return (
    t[13] !== l || t[14] !== d || t[15] !== h
      ? ((g = (0, j.jsx)(`div`, {
          className: `overflow-x-auto rounded-xl border border-amber-100 bg-amber-50/30 hover:border-amber-200 transition-all`,
          children: (0, j.jsxs)(`div`, {
            className: `flex items-start min-w-max px-4 py-3`,
            children: [l, d, h],
          }),
        })),
        (t[13] = l),
        (t[14] = d),
        (t[15] = h),
        (t[16] = g))
      : (g = t[16]),
    g
  );
}
function ue(e) {
  let t = (0, c.c)(18),
    { odf: n, odfDB: r, connMap: i } = e,
    a,
    o,
    s,
    l;
  if (t[0] !== i || t[1] !== n || t[2] !== r) {
    l = Symbol.for(`react.early_return_sentinel`);
    bb0: {
      let e = Object.keys(i).map(Number).sort(de);
      if (e.length === 0) {
        let e;
        (t[7] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-14 opacity-40`,
              children: [
                (0, j.jsx)(`i`, {
                  className: `fas fa-route text-5xl text-slate-300 mb-4`,
                }),
                (0, j.jsx)(`p`, {
                  className: `text-sm font-bold text-slate-500`,
                  children: `Chưa có kết nối nào trên ODF này`,
                }),
              ],
            })),
            (t[7] = e))
          : (e = t[7]),
          (l = e));
        break bb0;
      }
      let c;
      t[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((c = (0, j.jsx)(`i`, {
            className: `fas fa-route mr-1 text-amber-400`,
          })),
          (t[8] = c))
        : (c = t[8]);
      let u;
      t[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, j.jsxs)(`span`, {
            className: `flex items-center gap-1.5`,
            children: [
              (0, j.jsx)(`div`, {
                className: `w-4 h-4 bg-indigo-50 border-2 border-indigo-400 rounded`,
              }),
              (0, j.jsx)(`span`, {
                className: `text-slate-500`,
                children: `Port ODF này`,
              }),
            ],
          })),
          (t[9] = u))
        : (u = t[9]);
      let d;
      t[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = (0, j.jsxs)(`span`, {
            className: `flex items-center gap-1.5`,
            children: [
              (0, j.jsx)(`div`, {
                className: `w-4 h-4 bg-amber-50 border-2 border-amber-400 rounded`,
              }),
              (0, j.jsx)(`span`, {
                className: `text-slate-500`,
                children: `ODF tiếp theo`,
              }),
            ],
          })),
          (t[10] = d))
        : (d = t[10]);
      let f;
      (t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((f = (0, j.jsxs)(`div`, {
            className: `flex gap-3 ml-auto text-[9px] font-bold`,
            children: [
              u,
              d,
              (0, j.jsxs)(`span`, {
                className: `flex items-center gap-1.5`,
                children: [
                  (0, j.jsx)(`div`, {
                    className: `w-4 h-4 rounded`,
                    style: {
                      background: `#3b82f612`,
                      border: `2px solid #3b82f660`,
                    },
                  }),
                  (0, j.jsx)(`span`, {
                    className: `text-slate-500`,
                    children: `Thiết bị đầu cuối`,
                  }),
                ],
              }),
            ],
          })),
          (t[11] = f))
        : (f = t[11]),
        (s = (0, j.jsxs)(`div`, {
          className: `mb-3 flex items-center gap-2 flex-wrap`,
          children: [
            (0, j.jsxs)(`span`, {
              className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
              children: [c, `Đường đi cáp — `, e.length, ` port`],
            }),
            f,
          ],
        })),
        (a = `space-y-2 pr-1`),
        (o = e.map((e) => {
          let t = i[e];
          if (t.isReverse)
            return (0, j.jsx)(
              le,
              {
                odfName: n.name,
                port: e,
                fromOdfName: t.fromOdfName ?? ``,
                fromPort: t.fromPort ?? 0,
                fiberType: t.fiberType,
              },
              e,
            );
          let a = k(n.id, e, r);
          return (0, j.jsx)(
            `div`,
            {
              className: `overflow-x-auto rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all`,
              children: (0, j.jsx)(`div`, {
                className: `flex items-start min-w-max px-4 py-3`,
                children: (0, j.jsx)(ce, {
                  odfName: n.name,
                  port: e,
                  chain: a,
                }),
              }),
            },
            e,
          );
        })));
    }
    ((t[0] = i),
      (t[1] = n),
      (t[2] = r),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = l));
  } else ((a = t[3]), (o = t[4]), (s = t[5]), (l = t[6]));
  if (l !== Symbol.for(`react.early_return_sentinel`)) return l;
  let u;
  t[12] !== a || t[13] !== o
    ? ((u = (0, j.jsx)(`div`, { className: a, children: o })),
      (t[12] = a),
      (t[13] = o),
      (t[14] = u))
    : (u = t[14]);
  let d;
  return (
    t[15] !== s || t[16] !== u
      ? ((d = (0, j.jsxs)(`div`, { children: [s, u] })),
        (t[15] = s),
        (t[16] = u),
        (t[17] = d))
      : (d = t[17]),
    d
  );
}
function de(e, t) {
  return e - t;
}
function fe(e) {
  let t = (0, c.c)(15),
    { viewMode: n, onChange: r } = e,
    i;
  t[0] === r ? (i = t[1]) : ((i = () => r(`patch`)), (t[0] = r), (t[1] = i));
  let a = `px-3 py-1 rounded-md text-[10px] font-bold transition-all ${n === `patch` ? `bg-white shadow-sm text-slate-800` : `text-slate-500`}`,
    o;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((o = (0, j.jsx)(`i`, { className: `fas fa-th-large mr-1 text-[9px]` })),
      (t[2] = o))
    : (o = t[2]);
  let s;
  t[3] !== i || t[4] !== a
    ? ((s = (0, j.jsxs)(`button`, {
        onClick: i,
        className: a,
        children: [o, `Patch Panel`],
      })),
      (t[3] = i),
      (t[4] = a),
      (t[5] = s))
    : (s = t[5]);
  let l;
  t[6] === r
    ? (l = t[7])
    : ((l = () => r(`pathtrack`)), (t[6] = r), (t[7] = l));
  let u = `px-3 py-1 rounded-md text-[10px] font-bold transition-all ${n === `pathtrack` ? `bg-white shadow-sm text-slate-800` : `text-slate-500`}`,
    d;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = (0, j.jsx)(`i`, { className: `fas fa-route mr-1 text-[9px]` })),
      (t[8] = d))
    : (d = t[8]);
  let f;
  t[9] !== l || t[10] !== u
    ? ((f = (0, j.jsxs)(`button`, {
        onClick: l,
        className: u,
        children: [d, `Đường đi cáp`],
      })),
      (t[9] = l),
      (t[10] = u),
      (t[11] = f))
    : (f = t[11]);
  let p;
  return (
    t[12] !== s || t[13] !== f
      ? ((p = (0, j.jsxs)(`div`, {
          className: `flex items-center bg-slate-100 rounded-lg p-0.5 mr-2`,
          children: [s, f],
        })),
        (t[12] = s),
        (t[13] = f),
        (t[14] = p))
      : (p = t[14]),
    p
  );
}
function pe(e) {
  let t = (0, c.c)(20),
    { odf: n, onClose: r } = e,
    i;
  t[0] === n.logs
    ? (i = t[1])
    : ((i = n.logs ?? []), (t[0] = n.logs), (t[1] = i));
  let a = i,
    o;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((o = { display: `flex`, zIndex: 225 }), (t[2] = o))
    : (o = t[2]);
  let s;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = {
        width: 600,
        maxWidth: `96vw`,
        display: `flex`,
        flexDirection: `column`,
        maxHeight: `86vh`,
      }),
      (t[3] = s))
    : (s = t[3]);
  let l;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = (0, j.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100`,
        children: (0, j.jsx)(`i`, { className: `fas fa-history` }),
      })),
      (t[4] = l))
    : (l = t[4]);
  let u = `Lịch sử: ${n.name}`,
    d;
  t[5] === u
    ? (d = t[6])
    : ((d = (0, j.jsxs)(`h3`, {
        className: `text-base font-black text-slate-800 flex items-center gap-3`,
        children: [l, (0, j.jsx)(`span`, { children: u })],
      })),
      (t[5] = u),
      (t[6] = d));
  let f;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = (0, j.jsx)(`i`, { className: `fas fa-times` })), (t[7] = f))
    : (f = t[7]);
  let p;
  t[8] === r
    ? (p = t[9])
    : ((p = (0, j.jsx)(`button`, {
        onClick: r,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: f,
      })),
      (t[8] = r),
      (t[9] = p));
  let m;
  t[10] !== d || t[11] !== p
    ? ((m = (0, j.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [d, p],
      })),
      (t[10] = d),
      (t[11] = p),
      (t[12] = m))
    : (m = t[12]);
  let h;
  t[13] === a
    ? (h = t[14])
    : ((h =
        a.length === 0
          ? (0, j.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-10 opacity-50`,
              children: [
                (0, j.jsx)(`i`, {
                  className: `fas fa-history text-3xl text-slate-300 mb-3`,
                }),
                (0, j.jsx)(`p`, {
                  className: `text-sm font-bold text-slate-500`,
                  children: `Chưa có hoạt động nào`,
                }),
              ],
            })
          : a.map(X)),
      (t[13] = a),
      (t[14] = h));
  let g;
  t[15] === h
    ? (g = t[16])
    : ((g = (0, j.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll pr-1`,
        children: (0, j.jsx)(`div`, {
          className: `space-y-2 py-1`,
          children: h,
        }),
      })),
      (t[15] = h),
      (t[16] = g));
  let _;
  return (
    t[17] !== g || t[18] !== m
      ? ((_ = (0, j.jsx)(`div`, {
          className: `modal`,
          style: o,
          children: (0, j.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: s,
            children: [m, g],
          }),
        })),
        (t[17] = g),
        (t[18] = m),
        (t[19] = _))
      : (_ = t[19]),
    _
  );
}
function X(e, t) {
  return (0, j.jsxs)(
    `div`,
    {
      className: `flex gap-3 p-3 ${t % 2 == 0 ? `bg-slate-50` : `bg-white`} rounded-lg border border-slate-100`,
      children: [
        (0, j.jsx)(`div`, {
          className: `w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5`,
          children: (0, j.jsx)(`i`, {
            className: `fas fa-circle-dot text-amber-500 text-[9px]`,
          }),
        }),
        (0, j.jsxs)(`div`, {
          className: `flex-1 min-w-0`,
          children: [
            (0, j.jsx)(`p`, {
              className: `text-xs font-bold text-slate-700`,
              children: e.msg || ``,
            }),
            (0, j.jsxs)(`p`, {
              className: `text-[10px] text-slate-400 font-bold mt-0.5`,
              children: [e.time || ``, e.user ? ` · ${e.user}` : ``],
            }),
          ],
        }),
      ],
    },
    t,
  );
}
function me(e) {
  let t = (0, c.c)(108),
    {
      odf: n,
      odfDB: r,
      db: o,
      wifiDB: l,
      onEdit: d,
      onDelete: g,
      onSave: _,
      username: y,
    } = e,
    x = a(ge),
    S = i(he),
    [C, T] = (0, s.useState)(null),
    [E, D] = (0, s.useState)(`patch`),
    [k, A] = (0, s.useState)(null),
    [M, N] = (0, s.useState)(!1);
  if (!n) {
    let e;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((e = (0, j.jsx)(`div`, {
          className: `p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center`,
          children: (0, j.jsxs)(`h4`, {
            className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
            children: [
              (0, j.jsx)(`i`, { className: `fas fa-th text-amber-500` }),
              (0, j.jsx)(`span`, {
                children: `Chọn ODF để xem sơ đồ phối quang`,
              }),
            ],
          }),
        })),
        (t[0] = e))
      : (e = t[0]);
    let n;
    return (
      t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((n = (0, j.jsxs)(`div`, {
            className: `bg-white rounded-2xl border border-slate-200 shadow-sm`,
            children: [
              e,
              (0, j.jsx)(`div`, {
                className: `p-5`,
                children: (0, j.jsxs)(`div`, {
                  className: `flex flex-col items-center justify-center py-14 opacity-40`,
                  children: [
                    (0, j.jsx)(`i`, {
                      className: `fas fa-project-diagram text-5xl text-slate-300 mb-4`,
                    }),
                    (0, j.jsx)(`p`, {
                      className: `text-sm font-bold text-slate-500`,
                      children: `Chọn một ODF bên trái để xem sơ đồ phối quang`,
                    }),
                  ],
                }),
              }),
            ],
          })),
          (t[1] = n))
        : (n = t[1]),
      n
    );
  }
  let P;
  t[2] !== n || t[3] !== r
    ? ((P = v(n, r)), (t[2] = n), (t[3] = r), (t[4] = P))
    : (P = t[4]);
  let { usedCount: F, totalPorts: I, freePorts: L, pct: R } = P,
    B,
    H;
  t[5] !== n || t[6] !== r
    ? ((B = b(n, r)),
      (H = w(n, B)),
      (t[5] = n),
      (t[6] = r),
      (t[7] = B),
      (t[8] = H))
    : ((B = t[7]), (H = t[8]));
  let U = H,
    G;
  t[9] !== n || t[10] !== r
    ? ((G = O(n, r)), (t[9] = n), (t[10] = r), (t[11] = G))
    : (G = t[11]);
  let K = G,
    ee;
  t[12] !== k || t[13] !== n.connections
    ? ((ee =
        k === null
          ? void 0
          : (n.connections ?? []).find((e) => e.portFrom === k)),
      (t[12] = k),
      (t[13] = n.connections),
      (t[14] = ee))
    : (ee = t[14]);
  let q = ee,
    J;
  t[15] !== S || t[16] !== C || t[17] !== n || t[18] !== _ || t[19] !== y
    ? ((J = function (e, t) {
        if (C === null || !n) return;
        let r = { ...(n.portGroups ?? {}) };
        if (e || t) {
          r[String(C)] = { label: e, color: t ?? `` };
          let i = f(C, e);
          (_({ ...n, portGroups: r, logs: u(n.logs, i, y) }), S(n.name, i, y));
        } else (delete r[String(C)], _({ ...n, portGroups: r }));
        T(null);
      }),
      (t[15] = S),
      (t[16] = C),
      (t[17] = n),
      (t[18] = _),
      (t[19] = y),
      (t[20] = J))
    : (J = t[20]);
  let ne = J,
    re;
  t[21] !== S || t[22] !== C || t[23] !== n || t[24] !== _ || t[25] !== y
    ? ((re = function () {
        if (C === null || !n) return;
        let e = { ...(n.portGroups ?? {}) };
        delete e[String(C)];
        let t = p(C);
        (_({ ...n, portGroups: e, logs: u(n.logs, t, y) }),
          S(n.name, t, y),
          T(null));
      }),
      (t[21] = S),
      (t[22] = C),
      (t[23] = n),
      (t[24] = _),
      (t[25] = y),
      (t[26] = re))
    : (re = t[26]);
  let ie = re,
    Y;
  t[27] !== S || t[28] !== q || t[29] !== n || t[30] !== _ || t[31] !== y
    ? ((Y = function (e) {
        if (!n) return;
        let t = !q,
          r = (n.connections ?? []).filter((t) => t.portFrom !== e.portFrom);
        r.push(e);
        let i = m(e, t);
        (_({ ...n, connections: r, logs: u(n.logs, i, y) }),
          S(n.name, i, y),
          A(null));
      }),
      (t[27] = S),
      (t[28] = q),
      (t[29] = n),
      (t[30] = _),
      (t[31] = y),
      (t[32] = Y))
    : (Y = t[32]);
  let ae = Y,
    oe;
  t[33] !== S || t[34] !== n || t[35] !== _ || t[36] !== x || t[37] !== y
    ? ((oe = function (e) {
        n &&
          x(`Xóa kết nối này?`, `confirm`, () => {
            let t = (n.connections ?? []).find((t) => t.id === e),
              r = (n.connections ?? []).filter((t) => t.id !== e);
            if (t) {
              let e = h(t);
              (_({ ...n, connections: r, logs: u(n.logs, e, y) }),
                S(n.name, e, y));
            } else _({ ...n, connections: r });
          });
      }),
      (t[33] = S),
      (t[34] = n),
      (t[35] = _),
      (t[36] = x),
      (t[37] = y),
      (t[38] = oe))
    : (oe = t[38]);
  let se = oe,
    ce;
  t[39] === n.portGroups
    ? (ce = t[40])
    : ((ce = n.portGroups ?? {}), (t[39] = n.portGroups), (t[40] = ce));
  let le = ce,
    de;
  t[41] !== C || t[42] !== le
    ? ((de = C === null ? null : (le[String(C)] ?? {})),
      (t[41] = C),
      (t[42] = le),
      (t[43] = de))
    : (de = t[43]);
  let X = de,
    me = n.portGroupSize || 4,
    _e = C === null ? 0 : (C - 1) * me + 1,
    ve = C === null ? 0 : Math.min(C * me, I),
    ye;
  t[44] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ye = (0, j.jsx)(`i`, { className: `fas fa-th text-amber-500` })),
      (t[44] = ye))
    : (ye = t[44]);
  let Z;
  t[45] === n.name
    ? (Z = t[46])
    : ((Z = (0, j.jsx)(`span`, { className: `font-black`, children: n.name })),
      (t[45] = n.name),
      (t[46] = Z));
  let be;
  t[47] !== L ||
  t[48] !== n.location ||
  t[49] !== n.type ||
  t[50] !== I ||
  t[51] !== F ||
  t[52] !== E
    ? ((be =
        E === `patch`
          ? (0, j.jsxs)(j.Fragment, {
              children: [
                (0, j.jsxs)(`span`, {
                  className: `text-slate-400 font-semibold`,
                  children: [` — `, n.location || n.type],
                }),
                (0, j.jsxs)(`span`, {
                  className: `ml-3 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200`,
                  children: [F, `/`, I, ` ports`],
                }),
                (0, j.jsxs)(`span`, {
                  className: `text-[10px] font-bold ${L === 0 ? `text-red-500 bg-red-50` : `text-emerald-600 bg-emerald-50`} px-2 py-0.5 rounded-full border ${L === 0 ? `border-red-200` : `border-emerald-200`}`,
                  children: [L, ` trống`],
                }),
              ],
            })
          : (0, j.jsx)(`span`, {
              className: `text-slate-400 font-semibold`,
              children: ` — Đường đi cáp`,
            })),
      (t[47] = L),
      (t[48] = n.location),
      (t[49] = n.type),
      (t[50] = I),
      (t[51] = F),
      (t[52] = E),
      (t[53] = be))
    : (be = t[53]);
  let Q;
  t[54] !== Z || t[55] !== be
    ? ((Q = (0, j.jsxs)(`h4`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
        children: [ye, Z, be],
      })),
      (t[54] = Z),
      (t[55] = be),
      (t[56] = Q))
    : (Q = t[56]);
  let xe;
  t[57] === E
    ? (xe = t[58])
    : ((xe = (0, j.jsx)(fe, { viewMode: E, onChange: D })),
      (t[57] = E),
      (t[58] = xe));
  let Se;
  t[59] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Se = () => N(!0)), (t[59] = Se))
    : (Se = t[59]);
  let $;
  t[60] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($ = (0, j.jsxs)(`button`, {
        onClick: Se,
        className: `px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-100 transition-all flex items-center gap-1`,
        children: [(0, j.jsx)(`i`, { className: `fas fa-history` }), ` Logs`],
      })),
      (t[60] = $))
    : ($ = t[60]);
  let Ce;
  t[61] !== n || t[62] !== g || t[63] !== d || t[64] !== E
    ? ((Ce =
        E === `patch` &&
        (0, j.jsxs)(j.Fragment, {
          children: [
            (0, j.jsxs)(`button`, {
              onClick: () => d(n),
              className: `px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-lg hover:bg-amber-100 transition-all flex items-center gap-1`,
              children: [(0, j.jsx)(`i`, { className: `fas fa-edit` }), ` Sửa`],
            }),
            (0, j.jsx)(`button`, {
              onClick: () => g(n.id),
              title: `Xóa ODF`,
              className: `px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-all flex items-center gap-1`,
              children: (0, j.jsx)(`i`, { className: `fas fa-trash` }),
            }),
          ],
        })),
      (t[61] = n),
      (t[62] = g),
      (t[63] = d),
      (t[64] = E),
      (t[65] = Ce))
    : (Ce = t[65]);
  let we;
  t[66] !== xe || t[67] !== Ce
    ? ((we = (0, j.jsxs)(`div`, {
        className: `flex gap-2 flex-wrap justify-end`,
        children: [xe, $, Ce],
      })),
      (t[66] = xe),
      (t[67] = Ce),
      (t[68] = we))
    : (we = t[68]);
  let Te;
  t[69] !== Q || t[70] !== we
    ? ((Te = (0, j.jsxs)(`div`, {
        className: `p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center`,
        children: [Q, we],
      })),
      (t[69] = Q),
      (t[70] = we),
      (t[71] = Te))
    : (Te = t[71]);
  let Ee;
  t[72] !== B ||
  t[73] !== K ||
  t[74] !== L ||
  t[75] !== se ||
  t[76] !== U ||
  t[77] !== n ||
  t[78] !== r ||
  t[79] !== R ||
  t[80] !== E
    ? ((Ee = (0, j.jsx)(`div`, {
        className: `p-5`,
        children:
          E === `patch`
            ? (0, j.jsxs)(j.Fragment, {
                children: [
                  (0, j.jsxs)(`div`, {
                    className: `flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100`,
                    children: [
                      (0, j.jsx)(`span`, {
                        className: `text-[10px] font-black text-slate-500 shrink-0`,
                        children: `Port usage`,
                      }),
                      (0, j.jsx)(`div`, {
                        className: `flex-1 bg-slate-200 rounded-full h-2`,
                        children: (0, j.jsx)(`div`, {
                          className: `h-2 rounded-full transition-all ${R > 85 ? `bg-red-500` : R > 60 ? `bg-amber-500` : `bg-emerald-500`}`,
                          style: { width: `${R}%` },
                        }),
                      }),
                      (0, j.jsxs)(`span`, {
                        className: `text-[10px] font-black ${R > 85 ? `text-red-600` : `text-slate-600`} shrink-0`,
                        children: [R, `%`],
                      }),
                    ],
                  }),
                  (0, j.jsxs)(`div`, {
                    className: `mb-3 flex flex-wrap gap-3 text-[10px] font-bold text-slate-500`,
                    children: [
                      (0, j.jsxs)(`span`, {
                        className: `flex items-center gap-1.5`,
                        children: [
                          (0, j.jsx)(`span`, {
                            className: `w-3 h-3 rounded bg-slate-200 border border-slate-300 inline-block`,
                          }),
                          `Trống (`,
                          L,
                          `)`,
                        ],
                      }),
                      (0, j.jsxs)(`span`, {
                        className: `flex items-center gap-1.5`,
                        children: [
                          (0, j.jsx)(`span`, {
                            className: `w-3 h-3 rounded bg-amber-400 inline-block`,
                          }),
                          `→ ODF khác`,
                        ],
                      }),
                      (0, j.jsxs)(`span`, {
                        className: `flex items-center gap-1.5`,
                        children: [
                          (0, j.jsx)(`span`, {
                            className: `w-3 h-3 rounded bg-blue-500 inline-block`,
                          }),
                          `→ Switch`,
                        ],
                      }),
                      (0, j.jsxs)(`span`, {
                        className: `flex items-center gap-1.5`,
                        children: [
                          (0, j.jsx)(`span`, {
                            className: `w-3 h-3 rounded bg-red-500 inline-block`,
                          }),
                          `→ CCTV`,
                        ],
                      }),
                      (0, j.jsxs)(`span`, {
                        className: `flex items-center gap-1.5`,
                        children: [
                          (0, j.jsx)(`span`, {
                            className: `w-3 h-3 rounded bg-purple-500 inline-block`,
                          }),
                          `Dự phòng`,
                        ],
                      }),
                      (0, j.jsxs)(`span`, {
                        className: `flex items-center gap-1.5`,
                        children: [
                          (0, j.jsx)(`span`, {
                            className: `w-3 h-3 rounded bg-slate-400 inline-block`,
                            style: { opacity: 0.65 },
                          }),
                          `Không HĐ`,
                        ],
                      }),
                    ],
                  }),
                  (0, j.jsx)(`div`, {
                    className: `p-4 bg-slate-50 rounded-xl border border-slate-100 min-h-[60px]`,
                    children: (0, j.jsx)(z, {
                      layout: U,
                      onPortClick: A,
                      onEditGroup: T,
                    }),
                  }),
                  (0, j.jsx)(te, {
                    oddPorts: K.oddPorts,
                    evenPorts: K.evenPorts,
                    onDeleteConnection: se,
                    passThroughCount: K.passThroughCount,
                    receiveCount: K.receiveCount,
                    half: K.half,
                    totalPorts: K.totalPorts,
                  }),
                ],
              })
            : (0, j.jsx)(ue, { odf: n, odfDB: r, connMap: B }),
      })),
      (t[72] = B),
      (t[73] = K),
      (t[74] = L),
      (t[75] = se),
      (t[76] = U),
      (t[77] = n),
      (t[78] = r),
      (t[79] = R),
      (t[80] = E),
      (t[81] = Ee))
    : (Ee = t[81]);
  let De;
  t[82] !== C ||
  t[83] !== ve ||
  t[84] !== X?.color ||
  t[85] !== X?.label ||
  t[86] !== _e ||
  t[87] !== ie ||
  t[88] !== ne ||
  t[89] !== n.name
    ? ((De =
        C !== null &&
        (0, j.jsx)(V, {
          title: `${n.name} — Nhóm ${C} (Port ${_e}–${ve})`,
          initialLabel: X?.label ?? ``,
          initialColor: X?.color || void 0,
          onSave: ne,
          onClear: ie,
          onClose: () => T(null),
        })),
      (t[82] = C),
      (t[83] = ve),
      (t[84] = X?.color),
      (t[85] = X?.label),
      (t[86] = _e),
      (t[87] = ie),
      (t[88] = ne),
      (t[89] = n.name),
      (t[90] = De))
    : (De = t[90]);
  let Oe;
  t[91] !== k ||
  t[92] !== o ||
  t[93] !== q ||
  t[94] !== ae ||
  t[95] !== n.id ||
  t[96] !== r ||
  t[97] !== l
    ? ((Oe =
        k !== null &&
        (0, j.jsx)(W, {
          odfId: n.id,
          portFrom: k,
          existing: q,
          odfDB: r,
          db: o,
          wifiDB: l,
          onSave: ae,
          onClose: () => A(null),
        })),
      (t[91] = k),
      (t[92] = o),
      (t[93] = q),
      (t[94] = ae),
      (t[95] = n.id),
      (t[96] = r),
      (t[97] = l),
      (t[98] = Oe))
    : (Oe = t[98]);
  let ke;
  t[99] !== n || t[100] !== M
    ? ((ke = M && (0, j.jsx)(pe, { odf: n, onClose: () => N(!1) })),
      (t[99] = n),
      (t[100] = M),
      (t[101] = ke))
    : (ke = t[101]);
  let Ae;
  return (
    t[102] !== Te ||
    t[103] !== Ee ||
    t[104] !== De ||
    t[105] !== Oe ||
    t[106] !== ke
      ? ((Ae = (0, j.jsxs)(`div`, {
          className: `bg-white rounded-2xl border border-slate-200 shadow-sm`,
          children: [Te, Ee, De, Oe, ke],
        })),
        (t[102] = Te),
        (t[103] = Ee),
        (t[104] = De),
        (t[105] = Oe),
        (t[106] = ke),
        (t[107] = Ae))
      : (Ae = t[107]),
    Ae
  );
}
function he(e) {
  return e.addGlobalLog;
}
function ge(e) {
  return e.showDialog;
}
function _e(e) {
  let t = (0, c.c)(84),
    { record: n, onSave: r, onClose: o, username: l } = e,
    f = a(ye),
    p = i(ve),
    [m, h] = (0, s.useState)(n?.name ?? ``),
    [g, _] = (0, s.useState)(n?.location ?? ``),
    [v, y] = (0, s.useState)(n?.type ?? `indoor`),
    [b, x] = (0, s.useState)(n?.zone ?? ``),
    [S, C] = (0, s.useState)(String(n?.totalPorts ?? 48)),
    [w, T] = (0, s.useState)(String(n?.portGroupSize ?? 4)),
    [E, D] = (0, s.useState)(n?.notes ?? ``),
    O;
  t[0] !== p ||
  t[1] !== g ||
  t[2] !== m ||
  t[3] !== E ||
  t[4] !== r ||
  t[5] !== w ||
  t[6] !== n ||
  t[7] !== f ||
  t[8] !== S ||
  t[9] !== v ||
  t[10] !== l ||
  t[11] !== b
    ? ((O = function () {
        let e = m.trim();
        if (!e) {
          f(`Vui lòng nhập tên ODF!`, `error`);
          return;
        }
        let t = d(!n);
        (r({
          ...(n ?? {
            id: `odf-${Date.now()}`,
            connections: [],
            portGroups: {},
          }),
          id: n?.id ?? `odf-${Date.now()}`,
          name: e,
          location: g.trim(),
          type: v,
          zone: b.trim(),
          totalPorts: parseInt(S, 10) || 48,
          portGroupSize: parseInt(w, 10) || 4,
          notes: E.trim(),
          logs: u(n?.logs, t, l),
        }),
          p(e, t, l),
          f(n ? `Đã cập nhật ODF!` : `Đã thêm ODF mới!`, `success`));
      }),
      (t[0] = p),
      (t[1] = g),
      (t[2] = m),
      (t[3] = E),
      (t[4] = r),
      (t[5] = w),
      (t[6] = n),
      (t[7] = f),
      (t[8] = S),
      (t[9] = v),
      (t[10] = l),
      (t[11] = b),
      (t[12] = O))
    : (O = t[12]);
  let k = O,
    A;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = { display: `flex`, zIndex: 210 }), (t[13] = A))
    : (A = t[13]);
  let M;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((M = {
        width: 500,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[14] = M))
    : (M = t[14]);
  let N;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, j.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100`,
        children: (0, j.jsx)(`i`, { className: `fas fa-network-wired` }),
      })),
      (t[15] = N))
    : (N = t[15]);
  let P = n ? `Sửa ODF` : `Thêm ODF Mới`,
    F;
  t[16] === P
    ? (F = t[17])
    : ((F = (0, j.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [N, (0, j.jsx)(`span`, { children: P })],
      })),
      (t[16] = P),
      (t[17] = F));
  let I;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((I = (0, j.jsx)(`i`, { className: `fas fa-times` })), (t[18] = I))
    : (I = t[18]);
  let L;
  t[19] === o
    ? (L = t[20])
    : ((L = (0, j.jsx)(`button`, {
        onClick: o,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: I,
      })),
      (t[19] = o),
      (t[20] = L));
  let R;
  t[21] !== F || t[22] !== L
    ? ((R = (0, j.jsxs)(`div`, {
        className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
        children: [F, L],
      })),
      (t[21] = F),
      (t[22] = L),
      (t[23] = R))
    : (R = t[23]);
  let z;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((z = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Tên ODF *`,
      })),
      (t[24] = z))
    : (z = t[24]);
  let B;
  t[25] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((B = (e) => h(e.target.value)), (t[25] = B))
    : (B = t[25]);
  let V;
  t[26] === m
    ? (V = t[27])
    : ((V = (0, j.jsxs)(`div`, {
        children: [
          z,
          (0, j.jsx)(`input`, {
            value: m,
            onChange: B,
            placeholder: `VD: ODF-A01`,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors`,
          }),
        ],
      })),
      (t[26] = m),
      (t[27] = V));
  let H;
  t[28] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Vị trí`,
      })),
      (t[28] = H))
    : (H = t[28]);
  let U;
  t[29] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((U = (e) => _(e.target.value)), (t[29] = U))
    : (U = t[29]);
  let W;
  t[30] === g
    ? (W = t[31])
    : ((W = (0, j.jsxs)(`div`, {
        children: [
          H,
          (0, j.jsx)(`input`, {
            value: g,
            onChange: U,
            placeholder: `VD: Phòng MDF Tầng 01`,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors`,
          }),
        ],
      })),
      (t[30] = g),
      (t[31] = W));
  let G;
  t[32] !== V || t[33] !== W
    ? ((G = (0, j.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-4`,
        children: [V, W],
      })),
      (t[32] = V),
      (t[33] = W),
      (t[34] = G))
    : (G = t[34]);
  let K;
  t[35] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((K = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Loại`,
      })),
      (t[35] = K))
    : (K = t[35]);
  let ee;
  t[36] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ee = (e) => y(e.target.value)), (t[36] = ee))
    : (ee = t[36]);
  let q, te;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((q = (0, j.jsx)(`option`, { value: `indoor`, children: `Indoor` })),
      (te = (0, j.jsx)(`option`, { value: `outdoor`, children: `Outdoor` })),
      (t[37] = q),
      (t[38] = te))
    : ((q = t[37]), (te = t[38]));
  let J;
  t[39] === v
    ? (J = t[40])
    : ((J = (0, j.jsxs)(`div`, {
        children: [
          K,
          (0, j.jsxs)(`select`, {
            value: v,
            onChange: ee,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
            children: [q, te],
          }),
        ],
      })),
      (t[39] = v),
      (t[40] = J));
  let ne;
  t[41] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ne = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Zone/Khu`,
      })),
      (t[41] = ne))
    : (ne = t[41]);
  let re;
  t[42] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((re = (e) => x(e.target.value)), (t[42] = re))
    : (re = t[42]);
  let ie;
  t[43] === b
    ? (ie = t[44])
    : ((ie = (0, j.jsxs)(`div`, {
        children: [
          ne,
          (0, j.jsx)(`input`, {
            value: b,
            onChange: re,
            placeholder: `Khu A`,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors`,
          }),
        ],
      })),
      (t[43] = b),
      (t[44] = ie));
  let Y;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Y = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Số port`,
      })),
      (t[45] = Y))
    : (Y = t[45]);
  let ae;
  t[46] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ae = (e) => C(e.target.value)), (t[46] = ae))
    : (ae = t[46]);
  let oe;
  t[47] === S
    ? (oe = t[48])
    : ((oe = (0, j.jsxs)(`div`, {
        children: [
          Y,
          (0, j.jsx)(`input`, {
            value: S,
            onChange: ae,
            type: `number`,
            min: 1,
            max: 288,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors`,
          }),
        ],
      })),
      (t[47] = S),
      (t[48] = oe));
  let se;
  t[49] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((se = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Nhóm port`,
      })),
      (t[49] = se))
    : (se = t[49]);
  let ce;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ce = (e) => T(e.target.value)), (t[50] = ce))
    : (ce = t[50]);
  let le, ue, de, fe, pe;
  t[51] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((le = (0, j.jsx)(`option`, { value: `1`, children: `Không nhóm` })),
      (ue = (0, j.jsx)(`option`, { value: `4`, children: `4 port / nhóm` })),
      (de = (0, j.jsx)(`option`, { value: `6`, children: `6 port / nhóm` })),
      (fe = (0, j.jsx)(`option`, { value: `8`, children: `8 port / nhóm` })),
      (pe = (0, j.jsx)(`option`, { value: `12`, children: `12 port / nhóm` })),
      (t[51] = le),
      (t[52] = ue),
      (t[53] = de),
      (t[54] = fe),
      (t[55] = pe))
    : ((le = t[51]), (ue = t[52]), (de = t[53]), (fe = t[54]), (pe = t[55]));
  let X;
  t[56] === w
    ? (X = t[57])
    : ((X = (0, j.jsxs)(`div`, {
        children: [
          se,
          (0, j.jsxs)(`select`, {
            value: w,
            onChange: ce,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500`,
            children: [le, ue, de, fe, pe],
          }),
        ],
      })),
      (t[56] = w),
      (t[57] = X));
  let me;
  t[58] !== J || t[59] !== ie || t[60] !== oe || t[61] !== X
    ? ((me = (0, j.jsxs)(`div`, {
        className: `grid grid-cols-4 gap-3`,
        children: [J, ie, oe, X],
      })),
      (t[58] = J),
      (t[59] = ie),
      (t[60] = oe),
      (t[61] = X),
      (t[62] = me))
    : (me = t[62]);
  let he;
  t[63] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((he = (0, j.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Ghi chú`,
      })),
      (t[63] = he))
    : (he = t[63]);
  let ge;
  t[64] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ge = (e) => D(e.target.value)), (t[64] = ge))
    : (ge = t[64]);
  let _e;
  t[65] === E
    ? (_e = t[66])
    : ((_e = (0, j.jsxs)(`div`, {
        children: [
          he,
          (0, j.jsx)(`textarea`, {
            value: E,
            onChange: ge,
            rows: 2,
            placeholder: `Ghi chú thêm...`,
            className: `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none`,
          }),
        ],
      })),
      (t[65] = E),
      (t[66] = _e));
  let Z;
  t[67] !== G || t[68] !== me || t[69] !== _e
    ? ((Z = (0, j.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll`,
        children: (0, j.jsxs)(`div`, {
          className: `space-y-4`,
          children: [G, me, _e],
        }),
      })),
      (t[67] = G),
      (t[68] = me),
      (t[69] = _e),
      (t[70] = Z))
    : (Z = t[70]);
  let be;
  t[71] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((be = (0, j.jsx)(`div`, { className: `flex-1` })), (t[71] = be))
    : (be = t[71]);
  let Q;
  t[72] === o
    ? (Q = t[73])
    : ((Q = (0, j.jsx)(`button`, {
        onClick: o,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[72] = o),
      (t[73] = Q));
  let xe;
  t[74] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((xe = (0, j.jsx)(`i`, { className: `fas fa-save` })), (t[74] = xe))
    : (xe = t[74]);
  let Se;
  t[75] === k
    ? (Se = t[76])
    : ((Se = (0, j.jsxs)(`button`, {
        onClick: k,
        className: `px-6 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-amber-700 transition-all flex items-center gap-2`,
        children: [xe, ` Lưu ODF`],
      })),
      (t[75] = k),
      (t[76] = Se));
  let $;
  t[77] !== Q || t[78] !== Se
    ? (($ = (0, j.jsxs)(`div`, {
        className: `flex gap-3 mt-6 pt-4 border-t border-slate-100 shrink-0`,
        children: [be, Q, Se],
      })),
      (t[77] = Q),
      (t[78] = Se),
      (t[79] = $))
    : ($ = t[79]);
  let Ce;
  return (
    t[80] !== Z || t[81] !== $ || t[82] !== R
      ? ((Ce = (0, j.jsx)(`div`, {
          className: `modal`,
          style: A,
          children: (0, j.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: M,
            children: [R, Z, $],
          }),
        })),
        (t[80] = Z),
        (t[81] = $),
        (t[82] = R),
        (t[83] = Ce))
      : (Ce = t[83]),
    Ce
  );
}
function ve(e) {
  return e.addGlobalLog;
}
function ye(e) {
  return e.showDialog;
}
function Z(e) {
  let t = (0, c.c)(51),
    { onBack: n, username: o } = e,
    l = i(De),
    u = i(Ee),
    d = i(Te),
    f = i(we),
    p = i(Ce),
    m = a($),
    h = i(Se),
    g = r(xe),
    _ = r(Q),
    v = r(be),
    [y, b] = (0, s.useState)(null),
    [x, S] = (0, s.useState)(`closed`),
    C,
    w;
  (t[0] !== v || t[1] !== _
    ? ((C = () => {
        !_ || _.module !== `odf` || (b(_.odfId), v());
      }),
      (w = [_, v]),
      (t[0] = v),
      (t[1] = _),
      (t[2] = C),
      (t[3] = w))
    : ((C = t[2]), (w = t[3])),
    (0, s.useEffect)(C, w));
  let T;
  t[4] !== y || t[5] !== l
    ? ((T = l.find((e) => e.id === y) ?? null),
      (t[4] = y),
      (t[5] = l),
      (t[6] = T))
    : (T = t[6]);
  let E = T,
    D;
  t[7] !== h ||
  t[8] !== y ||
  t[9] !== p ||
  t[10] !== l ||
  t[11] !== m ||
  t[12] !== o
    ? ((D = function (e) {
        let t = l.find((t) => t.id === e);
        m(`Xóa ODF này và toàn bộ kết nối?`, `confirm`, () => {
          (t &&
            h(
              t.name,
              `Xóa ODF "${t.name}" (${(t.connections ?? []).length} kết nối)`,
              o,
            ),
            p(e),
            y === e && b(null));
        });
      }),
      (t[7] = h),
      (t[8] = y),
      (t[9] = p),
      (t[10] = l),
      (t[11] = m),
      (t[12] = o),
      (t[13] = D))
    : (D = t[13]);
  let O = D,
    k;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, j.jsxs)(`div`, {
        children: [
          (0, j.jsxs)(`h2`, {
            className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
            children: [
              (0, j.jsx)(`div`, {
                className: `w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100`,
                children: (0, j.jsx)(`i`, {
                  className: `fas fa-network-wired`,
                }),
              }),
              `ODF — Optical Distribution Frame`,
            ],
          }),
          (0, j.jsx)(`p`, {
            className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
            children: `Sơ đồ phối quang & kết nối dây quang ngoài trời`,
          }),
        ],
      })),
      (t[14] = k))
    : (k = t[14]);
  let A;
  t[15] === g
    ? (A = t[16])
    : ((A = () => g(`switch`)), (t[15] = g), (t[16] = A));
  let M;
  t[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((M = (0, j.jsx)(`i`, { className: `fas fa-chart-bar` })), (t[17] = M))
    : (M = t[17]);
  let N;
  t[18] === A
    ? (N = t[19])
    : ((N = (0, j.jsxs)(`button`, {
        onClick: A,
        className: `px-5 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2`,
        children: [M, ` Báo cáo tổng hợp`],
      })),
      (t[18] = A),
      (t[19] = N));
  let F;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((F = () => S(null)), (t[20] = F))
    : (F = t[20]);
  let I;
  t[21] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((I = (0, j.jsxs)(`button`, {
        onClick: F,
        className: `px-5 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-amber-700 transition-all flex items-center gap-2`,
        children: [(0, j.jsx)(`i`, { className: `fas fa-plus` }), ` Thêm ODF`],
      })),
      (t[21] = I))
    : (I = t[21]);
  let L;
  t[22] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = (0, j.jsx)(`i`, { className: `fas fa-arrow-left` })), (t[22] = L))
    : (L = t[22]);
  let R;
  t[23] === n
    ? (R = t[24])
    : ((R = (0, j.jsxs)(`button`, {
        onClick: n,
        className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
        children: [L, ` Quay lại`],
      })),
      (t[23] = n),
      (t[24] = R));
  let z;
  t[25] !== R || t[26] !== N
    ? ((z = (0, j.jsxs)(`div`, {
        className: `view-header px-8 py-5 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0 shrink-0`,
        children: [
          k,
          (0, j.jsxs)(`div`, {
            className: `view-header-actions flex items-center gap-3`,
            children: [N, I, R],
          }),
        ],
      })),
      (t[25] = R),
      (t[26] = N),
      (t[27] = z))
    : (z = t[27]);
  let B;
  t[28] !== y || t[29] !== l
    ? ((B = (0, j.jsx)(P, { odfDB: l, activeOdfId: y, onSelect: b })),
      (t[28] = y),
      (t[29] = l),
      (t[30] = B))
    : (B = t[30]);
  let V;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = (e) => S(e)), (t[31] = V))
    : (V = t[31]);
  let H;
  t[32] !== E ||
  t[33] !== u ||
  t[34] !== O ||
  t[35] !== l ||
  t[36] !== f ||
  t[37] !== o ||
  t[38] !== d
    ? ((H = (0, j.jsx)(`div`, {
        className: `flex-1 overflow-auto custom-scroll p-6`,
        children: (0, j.jsx)(me, {
          odf: E,
          odfDB: l,
          db: u,
          wifiDB: d,
          onEdit: V,
          onDelete: O,
          onSave: f,
          username: o,
        }),
      })),
      (t[32] = E),
      (t[33] = u),
      (t[34] = O),
      (t[35] = l),
      (t[36] = f),
      (t[37] = o),
      (t[38] = d),
      (t[39] = H))
    : (H = t[39]);
  let U;
  t[40] !== B || t[41] !== H
    ? ((U = (0, j.jsxs)(`div`, {
        id: `odf-body`,
        className: `view-body flex flex-1 overflow-hidden`,
        children: [B, H],
      })),
      (t[40] = B),
      (t[41] = H),
      (t[42] = U))
    : (U = t[42]);
  let W;
  t[43] !== x || t[44] !== f || t[45] !== o
    ? ((W =
        x !== `closed` &&
        (0, j.jsx)(_e, {
          record: x,
          onSave: (e) => {
            (f(e), S(`closed`));
          },
          onClose: () => S(`closed`),
          username: o,
        })),
      (t[43] = x),
      (t[44] = f),
      (t[45] = o),
      (t[46] = W))
    : (W = t[46]);
  let G;
  return (
    t[47] !== z || t[48] !== U || t[49] !== W
      ? ((G = (0, j.jsxs)(`div`, {
          id: `odf-view`,
          className: `w-full h-full flex flex-col relative bg-slate-50/50`,
          children: [z, U, W],
        })),
        (t[47] = z),
        (t[48] = U),
        (t[49] = W),
        (t[50] = G))
      : (G = t[50]),
    G
  );
}
function be(e) {
  return e.clearFocusRequest;
}
function Q(e) {
  return e.focusRequest;
}
function xe(e) {
  return e.openReportModal;
}
function Se(e) {
  return e.addGlobalLog;
}
function $(e) {
  return e.showDialog;
}
function Ce(e) {
  return e.deleteODF;
}
function we(e) {
  return e.saveODF;
}
function Te(e) {
  return e.WifiDB;
}
function Ee(e) {
  return e.DB;
}
function De(e) {
  return e.ODFDB;
}
export { Z as default };
