import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Bt as r,
  Dt as i,
  E as a,
  It as o,
  Jt as s,
  Lt as c,
  Mt as l,
  Nt as u,
  O as d,
  Rt as f,
  Vt as p,
  Wt as m,
  c as h,
  j as g,
  l as _,
  n as v,
  r as y,
  s as b,
  tn as x,
  u as S,
} from "./index-QE6I14Fy.js";
import { n as C, r as w, t as T } from "./IPPhoneManageModal-BCWkf8ne.js";
import { n as E, t as D } from "./reportClasses-Dlg0NGLS.js";
import { n as O, t as k } from "./MultiSelectDropdown-CobGdMgk.js";
var A = e(t(), 1),
  ee = x();
function j(e, t, n, i, a) {
  let o = r(e.id, n);
  return !(
    p(e, t, o).kind !== `empty` ||
    i.some((n) => n.switchId === e.id && n.switchPort === t) ||
    a.some((n) => n.switchId === e.id && n.switchPort === t)
  );
}
function M(e, t, n, r) {
  let i = [];
  return (
    e.forEach((a) => {
      (r && r !== `all` && a.floor !== r) ||
        a.switches.forEach((r) => {
          let o = [];
          for (let i = 1; i <= m(r); i++) j(r, i, e, t, n) && o.push(i);
          o.length > 0 &&
            i.push({
              switchId: r.id,
              switchName: r.name,
              floor: a.floor,
              freePorts: o,
            });
        });
    }),
    i.sort((e, t) => t.freePorts.length - e.freePorts.length)
  );
}
var N = `fa-diagram-project`;
function P(e, t, n, r, a, o = [], s = [], c = [], l = []) {
  let u = [];
  return (
    e.forEach((t) =>
      t.switches.forEach((n) => {
        let r = n.uplinkTarget === `none` ? void 0 : f(n.uplinkTarget, e);
        (u.push({
          key: `switch-${n.id}`,
          source: `switch`,
          name: n.name,
          ip: n.ip ?? ``,
          mac: n.mac ?? ``,
          vlan: ``,
          icon: `fa-network-wired`,
          status: null,
          floor: t.floor,
          switchId: n.id,
          switchName: r ? r.name : n.name,
          switchPort: r ? (n.targetPort ?? null) : null,
          trunkVlans: null,
          recordId: null,
          ipConflict: !1,
          macConflict: !1,
          historyLogs: (n.logs ?? []).map((e) => ({
            time: e.time,
            msg: e.msg,
          })),
        }),
          n.conns.forEach((e) => {
            u.push({
              key: `conn-${n.id}-${e.p}`,
              source: `conn`,
              name: e.n || `(Chưa đặt tên)`,
              ip: e.ip ?? ``,
              mac: e.mac ?? ``,
              vlan: e.v == null ? `` : String(e.v),
              icon: e.icon || `fa-desktop`,
              status: e.status ?? `active`,
              floor: t.floor,
              switchId: n.id,
              switchName: n.name,
              switchPort: e.p,
              trunkVlans: null,
              recordId: null,
              ipConflict: !1,
              macConflict: !1,
              historyLogs: L(n.logs, e.p),
            });
          }));
      }),
    ),
    t.forEach((t) => {
      let n = t.switchId ? f(t.switchId, e) : void 0;
      u.push({
        key: `ipphone-${t.id}`,
        source: `ipphone`,
        name: t.name || (t.extension ? `Ext ${t.extension}` : `(Chưa đặt tên)`),
        ip: t.ip ?? ``,
        mac: t.mac ?? ``,
        vlan: `150`,
        icon: `fa-phone`,
        status: t.status,
        floor: t.floor,
        switchId: t.switchId,
        switchName: n?.name ?? `—`,
        switchPort: t.switchPort,
        trunkVlans: null,
        recordId: t.id,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: (t.logs ?? []).map((e) => ({ time: e.time, msg: e.msg })),
      });
    }),
    n.forEach((t) => {
      let n = t.switchId ? f(t.switchId, e) : void 0;
      u.push({
        key: `wifiap-${t.id}`,
        source: `wifiap`,
        name: t.name || `(Chưa đặt tên)`,
        ip: t.ip ?? ``,
        mac: t.mac ?? ``,
        vlan: `102`,
        icon: `fa-wifi`,
        status: null,
        floor: t.floor,
        switchId: t.switchId,
        switchName: n?.name ?? `—`,
        switchPort: t.switchPort,
        trunkVlans: null,
        recordId: t.id,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: (t.logs ?? []).map((e) => ({ time: e.time, msg: e.msg })),
      });
    }),
    i(r, a).forEach(({ ont: e, breadcrumb: t }) => {
      u.push({
        key: `gpon-${e.id}`,
        source: `gpon`,
        name: e.room || e.sn,
        ip: e.ip ?? ``,
        mac: e.mac,
        vlan: ``,
        icon: N,
        status: null,
        floor: e.floor ?? ``,
        switchId: `gpon-${e.frameId}`,
        switchName: `${t} · ONU #${e.onuId}`,
        switchPort: null,
        trunkVlans: null,
        recordId: e.id,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: (e.logs ?? []).map((e) => ({ time: e.time, msg: e.msg })),
      });
    }),
    o.forEach((t) => {
      let n = t.switchId ? f(t.switchId, e) : void 0;
      u.push({
        key: `cctv-${t.id}`,
        source: `cctv`,
        name: t.name || `(Chưa đặt tên)`,
        ip: t.ip ?? ``,
        mac: t.mac ?? ``,
        vlan: `120`,
        icon: `fa-video`,
        status: null,
        floor: t.floor,
        switchId: t.switchId,
        switchName: n?.name ?? `—`,
        switchPort: t.switchPort,
        trunkVlans: null,
        recordId: null,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: (t.logs ?? []).map((e) => ({ time: e.time, msg: e.msg })),
      });
    }),
    s.forEach((e) => {
      (u.push({
        key: `elevator-${e.id}-master`,
        source: `elevator`,
        name: e.master.name || `${e.name} - Master`,
        ip: e.master.ip,
        mac: e.master.mac,
        vlan: `120`,
        icon: `fa-server`,
        status: null,
        floor: ``,
        switchId: ``,
        switchName: e.name,
        switchPort: null,
        trunkVlans: null,
        recordId: null,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: [],
      }),
        u.push({
          key: `elevator-${e.id}-client`,
          source: `elevator`,
          name: e.client.name || `${e.name} - Client`,
          ip: e.client.ip,
          mac: e.client.mac,
          vlan: `120`,
          icon: `fa-box`,
          status: null,
          floor: ``,
          switchId: ``,
          switchName: e.name,
          switchPort: null,
          trunkVlans: null,
          recordId: null,
          ipConflict: !1,
          macConflict: !1,
          historyLogs: [],
        }),
        e.cctvs.forEach((t, n) => {
          u.push({
            key: `elevator-${e.id}-cctv-${n}`,
            source: `elevator`,
            name: t.name || `${e.name} - Cam ${n + 1}`,
            ip: t.ip ?? ``,
            mac: t.mac ?? ``,
            vlan: `120`,
            icon: `fa-video`,
            status: null,
            floor: ``,
            switchId: ``,
            switchName: e.name,
            switchPort: null,
            trunkVlans: null,
            recordId: null,
            ipConflict: !1,
            macConflict: !1,
            historyLogs: [],
          });
        }));
    }),
    c.forEach((e) => {
      u.push({
        key: `nvr-${e.id}`,
        source: `nvr`,
        name: e.name || `(Chưa đặt tên)`,
        ip: e.ip ?? ``,
        mac: ``,
        vlan: `120`,
        icon: `fa-hdd`,
        status: null,
        floor: e.floor ?? ``,
        switchId: ``,
        switchName: e.location || e.name,
        switchPort: null,
        trunkVlans: null,
        recordId: null,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: (e.logs ?? []).map((e) => ({ time: e.time, msg: e.msg })),
      });
    }),
    l.forEach((t) => {
      let n = t.lanUplinkTarget ? f(t.lanUplinkTarget, e) : void 0;
      u.push({
        key: `firewall-${t.id}`,
        source: `firewall`,
        name: t.name || `(Chưa đặt tên)`,
        ip: t.ip,
        mac: t.mac,
        vlan: ``,
        icon: `fa-shield-halved`,
        status: null,
        floor: ``,
        switchId: t.lanUplinkTarget,
        switchName: n?.name ?? `—`,
        switchPort: t.lanUplinkPort,
        trunkVlans: null,
        recordId: null,
        ipConflict: !1,
        macConflict: !1,
        historyLogs: (t.logs ?? []).map((e) => ({ time: e.time, msg: e.msg })),
      });
    }),
    I(F(u))
  );
}
function F(e) {
  let t = new Map(),
    n = [];
  return (
    e.forEach((e) => {
      let r = e.mac.trim().toUpperCase();
      if (!r) {
        n.push(e);
        return;
      }
      let i = t.get(r) ?? [];
      (i.push(e), t.set(r, i));
    }),
    t.forEach((e) => {
      if (e.length !== 2) {
        n.push(...e);
        return;
      }
      let t = e.find((e) => e.source === `conn`),
        r = e.find(
          (e) =>
            e.source === `wifiap` ||
            e.source === `ipphone` ||
            e.source === `cctv`,
        );
      if (!t || !r) {
        n.push(...e);
        return;
      }
      let i = [...new Set(e.map((e) => e.vlan).filter(Boolean))].sort(
        (e, t) => Number(e) - Number(t),
      );
      n.push({
        ...t,
        key: e.map((e) => e.key).join(`|`),
        recordId: r.recordId,
        vlan: i[0] ?? t.vlan,
        trunkVlans: i.length > 1 ? i : null,
        historyLogs: e.flatMap((e) => e.historyLogs),
      });
    }),
    n
  );
}
function I(e) {
  let t = new Map(),
    n = new Map();
  return (
    e.forEach((e) => {
      let r = e.mac.trim().toUpperCase();
      r && t.set(r, (t.get(r) ?? 0) + 1);
      let i = e.ip.trim();
      i && n.set(i, (n.get(i) ?? 0) + 1);
    }),
    e.map((e) => ({
      ...e,
      macConflict: e.mac.trim()
        ? (t.get(e.mac.trim().toUpperCase()) ?? 0) > 1
        : !1,
      ipConflict: e.ip.trim() ? (n.get(e.ip.trim()) ?? 0) > 1 : !1,
    }))
  );
}
function L(e, t) {
  if (!e || !e.length) return [];
  let n = RegExp(`\\bPort ${t}\\b`);
  return e.filter((e) => n.test(e.msg));
}
function R(e) {
  for (let t of e) {
    let e = t.switches.find((e) => e.isCore);
    if (e) return e.id;
  }
  return null;
}
var z = [`Tên`, `Loại thiết bị`, `IP`, `MAC`, `VLAN`, `Tầng`, `Switch`, `Port`];
function B(e) {
  return `"${String(e ?? ``).replace(/"/g, `""`)}"`;
}
function V(e) {
  return e.trunkVlans
    ? `TRUNK ${e.trunkVlans.map((e) => `VLAN ${e}`).join(` và `)}`
    : e.vlan;
}
function te(e) {
  return e.source === `gpon`
    ? `GPON ONT`
    : e.source === `nvr`
      ? `Đầu ghi NVR`
      : e.source === `firewall`
        ? `Firewall`
        : e.source === `elevator` && e.icon === `fa-box`
          ? `Thang máy (Client)`
          : c(e.icon);
}
function ne(e) {
  let t =
    `﻿` +
    z.join(`,`) +
    `
`;
  return (
    e.forEach((e) => {
      t +=
        [
          e.name,
          te(e),
          e.ip,
          e.mac,
          V(e),
          e.floor,
          e.switchName,
          e.switchPort ?? ``,
        ]
          .map(B)
          .join(`,`) +
        `
`;
    }),
    t
  );
}
function H() {
  let e =
    `﻿` +
    z.join(`,`) +
    `
`;
  return (
    [
      [
        `VD-PC-KeToan-01`,
        `PC/Laptop`,
        `10.50.24.10`,
        `AA:BB:CC:DD:EE:01`,
        `114`,
        `Tầng 03`,
        `TÊN_SWITCH_CỦA_BẠN`,
        `5`,
      ],
      [
        `VD-Camera-HanhLang-01`,
        `Camera CCTV`,
        `172.16.4.20`,
        `AA:BB:CC:DD:EE:02`,
        `120`,
        `Tầng 01`,
        `TÊN_SWITCH_CỦA_BẠN`,
        `3`,
      ],
      [
        `VD-AP-Sanh-01`,
        `WiFi AP`,
        `10.195.60.20`,
        ``,
        ``,
        `Tầng 01`,
        `TÊN_SWITCH_CỦA_BẠN`,
        `8`,
      ],
      [
        `VD-Le-Tan`,
        `IP Phone`,
        `172.16.16.50`,
        ``,
        ``,
        `Tầng 01`,
        `TÊN_SWITCH_CỦA_BẠN`,
        `9`,
      ],
    ].forEach((t) => {
      e +=
        t.map(B).join(`,`) +
        `
`;
    }),
    e
  );
}
function re(e) {
  let t = [],
    n = ``,
    r = !1;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    r
      ? a === `"`
        ? e[i + 1] === `"`
          ? ((n += `"`), i++)
          : (r = !1)
        : (n += a)
      : a === `"`
        ? (r = !0)
        : a === `,`
          ? (t.push(n), (n = ``))
          : (n += a);
  }
  return (t.push(n), t);
}
function U(e) {
  let t = e
    .replace(/^\uFEFF/, ``)
    .split(/\r\n|\n/)
    .filter((e) => e.trim().length > 0);
  if (t.length < 2) return [];
  let n = re(t[0]).map((e) => e.trim());
  return t.slice(1).map((e, t) => {
    let r = re(e),
      i = {};
    return (
      n.forEach((e, t) => {
        i[e] = (r[t] ?? ``).trim();
      }),
      { lineNumber: t + 2, raw: i }
    );
  });
}
function ie(e, t, n, r) {
  let i = t.flatMap((e) => e.switches.map((t) => ({ sw: t, floor: e.floor }))),
    a = new Set();
  return e.map(({ raw: e, lineNumber: s }) => {
    let c = (e.Tên || ``).trim(),
      l = (e[`Loại thiết bị`] || ``).trim(),
      u = o(l),
      d = (e.Switch || ``).trim(),
      f = parseInt(e.Port || ``, 10),
      p = (e.IP || ``).trim(),
      m = (e.MAC || ``).trim(),
      h = (e.VLAN || ``).trim(),
      g = i.find((e) => e.sw.name.trim().toLowerCase() === d.toLowerCase()),
      _ = {
        lineNumber: s,
        name: c,
        icon: u,
        vlan: h,
        ip: p,
        mac: m,
        floor: g?.floor ?? ``,
        switchId: g?.sw.id ?? null,
        switchName: d,
        port: Number.isFinite(f) ? f : null,
        error: null,
      };
    return (
      c
        ? l
          ? u
            ? d
              ? g
                ? !Number.isFinite(f) || f <= 0
                  ? (_.error = `Port không hợp lệ`)
                  : u !== `fa-wifi` &&
                      u !== `fa-phone` &&
                      (!h || !Number.isFinite(parseInt(h, 10)))
                    ? (_.error = `VLAN không hợp lệ`)
                    : j(g.sw, f, t, n, r)
                      ? a.has(`${g.sw.id}:${f}`) &&
                        (_.error = `Port ${f} trên "${d}" đã được dòng khác trong file này sử dụng`)
                      : (_.error = `Port ${f} trên "${d}" đã được sử dụng`)
                : (_.error = `Không tìm thấy Switch "${d}"`)
              : (_.error = `Thiếu tên Switch`)
            : (_.error = `Loại thiết bị không hợp lệ: "${l}"`)
          : (_.error = `Thiếu loại thiết bị`)
        : (_.error = `Thiếu tên thiết bị`),
      !_.error && g && a.add(`${g.sw.id}:${f}`),
      _
    );
  });
}
var W = n(),
  G = 8;
function ae(e) {
  let t = (0, ee.c)(49),
    {
      db: n,
      ipPhoneDB: r,
      wifiDB: i,
      onPick: a,
      onClose: o,
      lockedIcon: s,
      contextLabel: u,
      initialFloorFilter: d,
    } = e,
    [f, p] = (0, A.useState)(s ?? l[0].icon),
    [m, h] = (0, A.useState)(d ?? `all`),
    g;
  t[0] === n ? (g = t[1]) : ((g = new Set(n.map(K))), (t[0] = n), (t[1] = g));
  let _;
  t[2] === g ? (_ = t[3]) : ((_ = [...g]), (t[2] = g), (t[3] = _));
  let v = _,
    y;
  t[4] !== n || t[5] !== m || t[6] !== r || t[7] !== i
    ? ((y = M(n, r, i, m)),
      (t[4] = n),
      (t[5] = m),
      (t[6] = r),
      (t[7] = i),
      (t[8] = y))
    : (y = t[8]);
  let b = y,
    x;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = { display: `flex`, zIndex: 230 }), (t[9] = x))
    : (x = t[9]);
  let S;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = {
        width: 620,
        maxWidth: `96vw`,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[10] = S))
    : (S = t[10]);
  let C;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = (0, W.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          (0, W.jsx)(`div`, {
            className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
            children: (0, W.jsx)(`i`, { className: `fas fa-route` }),
          }),
          (0, W.jsx)(`span`, { children: `Gán thiết bị vào Switch trống` }),
        ],
      })),
      (t[11] = C))
    : (C = t[11]);
  let w;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = (0, W.jsx)(`i`, { className: `fas fa-times` })), (t[12] = w))
    : (w = t[12]);
  let T;
  t[13] === o
    ? (T = t[14])
    : ((T = (0, W.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [
          C,
          (0, W.jsx)(`button`, {
            onClick: o,
            className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
            children: w,
          }),
        ],
      })),
      (t[13] = o),
      (t[14] = T));
  let E;
  t[15] !== u || t[16] !== f || t[17] !== s
    ? ((E = s
        ? (0, W.jsxs)(`div`, {
            className: `flex items-center gap-2.5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl`,
            children: [
              (0, W.jsx)(`div`, {
                className: `w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0`,
                children: (0, W.jsx)(`i`, { className: `fas ${s} text-sm` }),
              }),
              (0, W.jsxs)(`div`, {
                className: `min-w-0`,
                children: [
                  (0, W.jsxs)(`p`, {
                    className: `text-[9px] font-black text-indigo-400 uppercase tracking-widest`,
                    children: [`Đang gán · `, c(s)],
                  }),
                  u &&
                    (0, W.jsx)(`p`, {
                      className: `text-xs font-bold text-slate-800 truncate`,
                      children: u,
                    }),
                ],
              }),
            ],
          })
        : (0, W.jsxs)(`div`, {
            children: [
              (0, W.jsx)(`p`, {
                className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
                children: `Loại thiết bị`,
              }),
              (0, W.jsx)(`div`, {
                className: `grid grid-cols-4 gap-2`,
                children: l.map((e) =>
                  (0, W.jsxs)(
                    `button`,
                    {
                      type: `button`,
                      onClick: () => p(e.icon),
                      title: e.label,
                      className: `flex flex-col items-center gap-1 py-2.5 rounded-xl border text-[9px] font-bold transition-all ${f === e.icon ? `bg-indigo-600 border-indigo-600 text-white shadow-md` : `bg-white border-slate-200 text-slate-500 hover:border-indigo-300`}`,
                      children: [
                        (0, W.jsx)(`i`, { className: `fas ${e.icon} text-sm` }),
                        (0, W.jsx)(`span`, {
                          className: `truncate w-full text-center px-0.5`,
                          children: e.label,
                        }),
                      ],
                    },
                    e.icon,
                  ),
                ),
              }),
            ],
          })),
      (t[15] = u),
      (t[16] = f),
      (t[17] = s),
      (t[18] = E))
    : (E = t[18]);
  let D;
  t[19] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = (0, W.jsx)(`label`, {
        htmlFor: `assign-floor-filter`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Tầng`,
      })),
      (t[19] = D))
    : (D = t[19]);
  let O;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((O = (e) => h(e.target.value)), (t[20] = O))
    : (O = t[20]);
  let k;
  t[21] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, W.jsx)(`option`, {
        value: `all`,
        children: `Tất cả các tầng`,
      })),
      (t[21] = k))
    : (k = t[21]);
  let j;
  t[22] === v ? (j = t[23]) : ((j = v.map(oe)), (t[22] = v), (t[23] = j));
  let N;
  t[24] !== m || t[25] !== j
    ? ((N = (0, W.jsxs)(`div`, {
        children: [
          D,
          (0, W.jsxs)(`select`, {
            id: `assign-floor-filter`,
            value: m,
            onChange: O,
            className: `w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500`,
            children: [k, j],
          }),
        ],
      })),
      (t[24] = m),
      (t[25] = j),
      (t[26] = N))
    : (N = t[26]);
  let P;
  t[27] !== N || t[28] !== E
    ? ((P = (0, W.jsxs)(`div`, {
        className: `shrink-0 space-y-3 mb-4`,
        children: [E, N],
      })),
      (t[27] = N),
      (t[28] = E),
      (t[29] = P))
    : (P = t[29]);
  let F;
  t[30] === b.length
    ? (F = t[31])
    : ((F =
        b.length === 0 &&
        (0, W.jsx)(`p`, {
          className: `text-center text-xs text-slate-400 italic py-10`,
          children: `Không tìm thấy switch nào còn port trống ở phạm vi này.`,
        })),
      (t[30] = b.length),
      (t[31] = F));
  let I;
  if (t[32] !== b || t[33] !== f || t[34] !== a) {
    let e;
    (t[36] !== f || t[37] !== a
      ? ((e = (e, t) =>
          (0, W.jsxs)(
            `div`,
            {
              className: `p-3 bg-slate-50 border border-slate-200 rounded-xl`,
              children: [
                (0, W.jsxs)(`div`, {
                  className: `flex items-center justify-between mb-2`,
                  children: [
                    (0, W.jsxs)(`div`, {
                      children: [
                        (0, W.jsx)(`p`, {
                          className: `text-xs font-black text-slate-800`,
                          children: e.switchName,
                        }),
                        (0, W.jsx)(`p`, {
                          className: `text-[9px] font-bold text-slate-400 uppercase tracking-widest`,
                          children: e.floor,
                        }),
                      ],
                    }),
                    (0, W.jsxs)(`span`, {
                      className: `px-2 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black shrink-0`,
                      children: [e.freePorts.length, ` port trống`],
                    }),
                  ],
                }),
                (0, W.jsxs)(`div`, {
                  className: `flex flex-wrap gap-1.5`,
                  children: [
                    e.freePorts.slice(0, G).map((n, r) => {
                      let i = t === 0 && r === 0;
                      return (0, W.jsxs)(
                        `button`,
                        {
                          type: `button`,
                          onClick: () => a(e.switchId, n, f, e.floor),
                          title: i ? `Gợi ý` : void 0,
                          className: `px-2.5 py-1.5 rounded-lg text-[10px] font-black transition-all ${i ? `bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200` : `bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600`}`,
                          children: [
                            i &&
                              (0, W.jsx)(`i`, {
                                className: `fas fa-star mr-1 text-[8px]`,
                              }),
                            `P`,
                            n,
                          ],
                        },
                        n,
                      );
                    }),
                    e.freePorts.length > G &&
                      (0, W.jsxs)(`span`, {
                        className: `px-2 py-1.5 text-[10px] font-bold text-slate-400`,
                        children: [`+`, e.freePorts.length - G, ` khác`],
                      }),
                  ],
                }),
              ],
            },
            e.switchId,
          )),
        (t[36] = f),
        (t[37] = a),
        (t[38] = e))
      : (e = t[38]),
      (I = b.map(e)),
      (t[32] = b),
      (t[33] = f),
      (t[34] = a),
      (t[35] = I));
  } else I = t[35];
  let L;
  t[39] !== F || t[40] !== I
    ? ((L = (0, W.jsxs)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll space-y-2 pr-1`,
        children: [F, I],
      })),
      (t[39] = F),
      (t[40] = I),
      (t[41] = L))
    : (L = t[41]);
  let R;
  t[42] === o
    ? (R = t[43])
    : ((R = (0, W.jsx)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: (0, W.jsx)(`button`, {
          onClick: o,
          className: `flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
          children: `Đóng`,
        }),
      })),
      (t[42] = o),
      (t[43] = R));
  let z;
  return (
    t[44] !== P || t[45] !== L || t[46] !== R || t[47] !== T
      ? ((z = (0, W.jsx)(`div`, {
          className: `modal`,
          style: x,
          children: (0, W.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: S,
            children: [T, P, L, R],
          }),
        })),
        (t[44] = P),
        (t[45] = L),
        (t[46] = R),
        (t[47] = T),
        (t[48] = z))
      : (z = t[48]),
    z
  );
}
function oe(e) {
  return (0, W.jsx)(`option`, { value: e, children: e }, e);
}
function K(e) {
  return e.floor;
}
function se(e) {
  let t = (0, ee.c)(46),
    { db: n, ipPhoneDB: r, wifiDB: i, onConfirm: a, onClose: o } = e,
    s = b(le),
    [c, l] = (0, A.useState)(``),
    [u, d] = (0, A.useState)(null),
    f;
  t[0] !== n || t[1] !== r || t[2] !== s || t[3] !== i
    ? ((f = async function (e) {
        let t = e.target.files?.[0];
        if (((e.target.value = ``), !t)) return;
        l(t.name);
        let a = U(await t.text());
        if (a.length === 0) {
          (s(`File CSV trống hoặc không đúng định dạng!`, `error`), d(null));
          return;
        }
        d(ie(a, n, r, i));
      }),
      (t[0] = n),
      (t[1] = r),
      (t[2] = s),
      (t[3] = i),
      (t[4] = f))
    : (f = t[4]);
  let p = f,
    m;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = function () {
        let e = H(),
          t = document.createElement(`a`);
        ((t.href = `data:text/csv;charset=utf-8,` + encodeURIComponent(e)),
          (t.download = `Mau_Import_ThietBi.csv`),
          t.click());
      }),
      (t[5] = m))
    : (m = t[5]);
  let h = m,
    g;
  t[6] === u ? (g = t[7]) : ((g = u?.filter(ce) ?? []), (t[6] = u), (t[7] = g));
  let _ = g,
    v = (u?.length ?? 0) - _.length,
    y;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = { display: `flex`, zIndex: 235 }), (t[8] = y))
    : (y = t[8]);
  let x;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = {
        width: 720,
        maxWidth: `96vw`,
        display: `flex`,
        flexDirection: `column`,
        maxHeight: `90vh`,
      }),
      (t[9] = x))
    : (x = t[9]);
  let S;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = (0, W.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          (0, W.jsx)(`div`, {
            className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100`,
            children: (0, W.jsx)(`i`, { className: `fas fa-file-import` }),
          }),
          `Import thiết bị từ CSV`,
        ],
      })),
      (t[10] = S))
    : (S = t[10]);
  let C;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = (0, W.jsx)(`i`, { className: `fas fa-times` })), (t[11] = C))
    : (C = t[11]);
  let w;
  t[12] === o
    ? (w = t[13])
    : ((w = (0, W.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [
          S,
          (0, W.jsx)(`button`, {
            onClick: o,
            className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
            children: C,
          }),
        ],
      })),
      (t[12] = o),
      (t[13] = w));
  let T;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, W.jsx)(`i`, {
        className: `fas fa-info-circle text-amber-500 mt-0.5`,
      })),
      (t[14] = T))
    : (T = t[14]);
  let E;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = (0, W.jsx)(`p`, {
        className: `text-[10px] text-amber-700 font-bold leading-relaxed`,
        children: `Cột bắt buộc: Tên, Loại thiết bị, Switch, Port (và VLAN — trừ WiFi AP/IP Phone). Chưa có file đúng cột? Tải file mẫu bên dưới, hoặc dùng nút "Xuất CSV" ở Danh sách thiết bị để lấy dữ liệu hiện có.`,
      })),
      (t[15] = E))
    : (E = t[15]);
  let D;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = (0, W.jsxs)(`div`, {
        className: `mb-4 shrink-0 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2`,
        children: [
          T,
          (0, W.jsxs)(`div`, {
            className: `flex-1`,
            children: [
              E,
              (0, W.jsxs)(`button`, {
                onClick: h,
                className: `mt-2 text-[10px] font-bold text-amber-700 underline hover:text-amber-800 flex items-center gap-1.5`,
                children: [
                  (0, W.jsx)(`i`, { className: `fas fa-download` }),
                  ` Tải file mẫu CSV`,
                ],
              }),
            ],
          }),
        ],
      })),
      (t[16] = D))
    : (D = t[16]);
  let O;
  t[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((O = (0, W.jsx)(`i`, { className: `fas fa-upload` })), (t[17] = O))
    : (O = t[17]);
  let k = c || `Chọn file CSV...`,
    j;
  t[18] === p
    ? (j = t[19])
    : ((j = (0, W.jsx)(`input`, {
        type: `file`,
        accept: `.csv,text/csv`,
        className: `hidden`,
        onChange: p,
      })),
      (t[18] = p),
      (t[19] = j));
  let M;
  t[20] !== k || t[21] !== j
    ? ((M = (0, W.jsx)(`div`, {
        className: `mb-4 shrink-0`,
        children: (0, W.jsxs)(`label`, {
          className: `flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-amber-300 hover:bg-amber-50/30 transition-all text-xs font-bold text-slate-500`,
          children: [O, k, j],
        }),
      })),
      (t[20] = k),
      (t[21] = j),
      (t[22] = M))
    : (M = t[22]);
  let N;
  t[23] !== v || t[24] !== u || t[25] !== _.length
    ? ((N =
        u &&
        (0, W.jsxs)(W.Fragment, {
          children: [
            (0, W.jsxs)(`div`, {
              className: `flex items-center gap-3 mb-3 shrink-0`,
              children: [
                (0, W.jsxs)(`span`, {
                  className: `px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-[10px] font-black`,
                  children: [_.length, ` hợp lệ`],
                }),
                v > 0 &&
                  (0, W.jsxs)(`span`, {
                    className: `px-2.5 py-1 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] font-black`,
                    children: [v, ` lỗi`],
                  }),
              ],
            }),
            (0, W.jsx)(`div`, {
              className: `flex-1 overflow-y-auto custom-scroll border border-slate-200 rounded-xl`,
              children: (0, W.jsxs)(`table`, {
                className: `w-full text-xs`,
                children: [
                  (0, W.jsx)(`thead`, {
                    className: `sticky top-0 bg-slate-50`,
                    children: (0, W.jsxs)(`tr`, {
                      className: `border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest`,
                      children: [
                        (0, W.jsx)(`th`, {
                          className: `text-left px-3 py-2 w-10`,
                          children: `Dòng`,
                        }),
                        (0, W.jsx)(`th`, {
                          className: `text-left px-3 py-2`,
                          children: `Tên`,
                        }),
                        (0, W.jsx)(`th`, {
                          className: `text-left px-3 py-2`,
                          children: `Loại`,
                        }),
                        (0, W.jsx)(`th`, {
                          className: `text-left px-3 py-2`,
                          children: `Switch / Port`,
                        }),
                        (0, W.jsx)(`th`, {
                          className: `text-left px-3 py-2`,
                          children: `Trạng thái`,
                        }),
                      ],
                    }),
                  }),
                  (0, W.jsxs)(`tbody`, {
                    children: [
                      u.length === 0 &&
                        (0, W.jsx)(`tr`, {
                          children: (0, W.jsx)(`td`, {
                            colSpan: 5,
                            className: `text-center py-8 text-slate-400 italic`,
                            children: `Không có dòng dữ liệu nào.`,
                          }),
                        }),
                      u.map(q),
                    ],
                  }),
                ],
              }),
            }),
          ],
        })),
      (t[23] = v),
      (t[24] = u),
      (t[25] = _.length),
      (t[26] = N))
    : (N = t[26]);
  let P;
  t[27] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((P = (0, W.jsx)(`div`, { className: `flex-1` })), (t[27] = P))
    : (P = t[27]);
  let F;
  t[28] === o
    ? (F = t[29])
    : ((F = (0, W.jsx)(`button`, {
        onClick: o,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[28] = o),
      (t[29] = F));
  let I;
  t[30] !== a || t[31] !== _
    ? ((I = () => a(_)), (t[30] = a), (t[31] = _), (t[32] = I))
    : (I = t[32]);
  let L = _.length === 0,
    R;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((R = (0, W.jsx)(`i`, { className: `fas fa-file-import` })), (t[33] = R))
    : (R = t[33]);
  let z;
  t[34] !== I || t[35] !== L || t[36] !== _.length
    ? ((z = (0, W.jsxs)(`button`, {
        onClick: I,
        disabled: L,
        className: `px-6 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2`,
        children: [R, ` Xác nhận Import (`, _.length, `)`],
      })),
      (t[34] = I),
      (t[35] = L),
      (t[36] = _.length),
      (t[37] = z))
    : (z = t[37]);
  let B;
  t[38] !== F || t[39] !== z
    ? ((B = (0, W.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [P, F, z],
      })),
      (t[38] = F),
      (t[39] = z),
      (t[40] = B))
    : (B = t[40]);
  let V;
  return (
    t[41] !== M || t[42] !== N || t[43] !== B || t[44] !== w
      ? ((V = (0, W.jsx)(`div`, {
          className: `modal`,
          style: y,
          children: (0, W.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: x,
            children: [w, D, M, N, B],
          }),
        })),
        (t[41] = M),
        (t[42] = N),
        (t[43] = B),
        (t[44] = w),
        (t[45] = V))
      : (V = t[45]),
    V
  );
}
function q(e) {
  return (0, W.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 ${e.error ? `bg-red-50/40` : ``}`,
      children: [
        (0, W.jsx)(`td`, {
          className: `px-3 py-2 text-slate-400 font-mono`,
          children: e.lineNumber,
        }),
        (0, W.jsx)(`td`, {
          className: `px-3 py-2 font-bold text-slate-800`,
          children: e.name || `—`,
        }),
        (0, W.jsx)(`td`, {
          className: `px-3 py-2 text-slate-500`,
          children: e.icon ? c(e.icon) : `—`,
        }),
        (0, W.jsxs)(`td`, {
          className: `px-3 py-2 text-slate-500`,
          children: [
            e.switchName || `—`,
            e.port == null ? `` : ` · P${e.port}`,
          ],
        }),
        (0, W.jsx)(`td`, {
          className: `px-3 py-2`,
          children: e.error
            ? (0, W.jsxs)(`span`, {
                className: `text-[10px] font-bold text-red-600`,
                children: [
                  (0, W.jsx)(`i`, {
                    className: `fas fa-circle-exclamation mr-1`,
                  }),
                  e.error,
                ],
              })
            : (0, W.jsxs)(`span`, {
                className: `text-[10px] font-bold text-emerald-600`,
                children: [
                  (0, W.jsx)(`i`, { className: `fas fa-circle-check mr-1` }),
                  `Hợp lệ`,
                ],
              }),
        }),
      ],
    },
    e.lineNumber,
  );
}
function ce(e) {
  return !e.error;
}
function le(e) {
  return e.showDialog;
}
function ue(e) {
  let t = (0, ee.c)(6),
    { options: n, selected: r, onChange: i } = e,
    a;
  t[0] === n ? (a = t[1]) : ((a = n.map(de)), (t[0] = n), (t[1] = a));
  let o;
  return (
    t[2] !== i || t[3] !== r || t[4] !== a
      ? ((o = (0, W.jsx)(k, {
          icon: `fa-filter`,
          allLabel: `Tất cả VLAN`,
          countLabel: fe,
          options: a,
          selected: r,
          onChange: i,
        })),
        (t[2] = i),
        (t[3] = r),
        (t[4] = a),
        (t[5] = o))
      : (o = t[5]),
    o
  );
}
function de(e) {
  return {
    value: e,
    label: `VLAN ${e}`,
    sublabel: y[Number(e)]?.name,
    swatch: y[Number(e)]?.color ?? `#94a3b8`,
  };
}
function fe(e) {
  return `${e} VLAN đã chọn`;
}
var J = [
  { value: `active`, label: `🟢 Connected (Up)` },
  { value: `shutdown`, label: `⚫ Shutdown (Down)` },
  { value: `err-disabled`, label: `🔴 Err-Disabled` },
];
function pe(e) {
  let t = (0, ee.c)(42),
    { count: n, onApply: r, onClose: i } = e,
    [a, o] = (0, A.useState)(v[0]),
    [s, c] = (0, A.useState)(`active`),
    l;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = { display: `flex`, zIndex: 226 }), (t[0] = l))
    : (l = t[0]);
  let u;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((u = { width: 480, maxWidth: `96vw` }), (t[1] = u))
    : (u = t[1]);
  let d;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = (0, W.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
        children: (0, W.jsx)(`i`, { className: `fas fa-layer-group` }),
      })),
      (t[2] = d))
    : (d = t[2]);
  let f;
  t[3] === n
    ? (f = t[4])
    : ((f = (0, W.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          d,
          (0, W.jsxs)(`span`, {
            children: [`Sửa Hàng loạt (`, n, ` thiết bị đã chọn)`],
          }),
        ],
      })),
      (t[3] = n),
      (t[4] = f));
  let p;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = (0, W.jsx)(`i`, { className: `fas fa-times` })), (t[5] = p))
    : (p = t[5]);
  let m;
  t[6] === i
    ? (m = t[7])
    : ((m = (0, W.jsx)(`button`, {
        onClick: i,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: p,
      })),
      (t[6] = i),
      (t[7] = m));
  let h;
  t[8] !== f || t[9] !== m
    ? ((h = (0, W.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4`,
        children: [f, m],
      })),
      (t[8] = f),
      (t[9] = m),
      (t[10] = h))
    : (h = t[10]);
  let g;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, W.jsx)(`label`, {
        htmlFor: `bulk-edit-vlan`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `VLAN chung`,
      })),
      (t[11] = g))
    : (g = t[11]);
  let _;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_ = (e) => o(parseInt(e.target.value, 10))), (t[12] = _))
    : (_ = t[12]);
  let y;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = v.map(he)), (t[13] = y))
    : (y = t[13]);
  let b;
  t[14] === a
    ? (b = t[15])
    : ((b = (0, W.jsxs)(`div`, {
        children: [
          g,
          (0, W.jsx)(`select`, {
            id: `bulk-edit-vlan`,
            value: a,
            onChange: _,
            className: `w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500`,
            children: y,
          }),
        ],
      })),
      (t[14] = a),
      (t[15] = b));
  let x;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = (0, W.jsx)(`label`, {
        htmlFor: `bulk-edit-status`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Trạng thái chung`,
      })),
      (t[16] = x))
    : (x = t[16]);
  let S;
  t[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = (e) => c(e.target.value)), (t[17] = S))
    : (S = t[17]);
  let C;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = J.map(me)), (t[18] = C))
    : (C = t[18]);
  let w;
  t[19] === s
    ? (w = t[20])
    : ((w = (0, W.jsxs)(`div`, {
        children: [
          x,
          (0, W.jsx)(`select`, {
            id: `bulk-edit-status`,
            value: s,
            onChange: S,
            className: `w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500`,
            children: C,
          }),
        ],
      })),
      (t[19] = s),
      (t[20] = w));
  let T;
  t[21] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, W.jsx)(`p`, {
        className: `text-[10px] text-slate-400 italic`,
        children: `Tên/IP/MAC của từng thiết bị được giữ nguyên — chỉ VLAN và trạng thái áp dụng chung cho tất cả.`,
      })),
      (t[21] = T))
    : (T = t[21]);
  let E;
  t[22] !== b || t[23] !== w
    ? ((E = (0, W.jsxs)(`div`, {
        className: `space-y-3`,
        children: [b, w, T],
      })),
      (t[22] = b),
      (t[23] = w),
      (t[24] = E))
    : (E = t[24]);
  let D;
  t[25] === i
    ? (D = t[26])
    : ((D = (0, W.jsx)(`button`, {
        onClick: i,
        className: `flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[25] = i),
      (t[26] = D));
  let O;
  t[27] !== r || t[28] !== s || t[29] !== a
    ? ((O = () => r(a, s)), (t[27] = r), (t[28] = s), (t[29] = a), (t[30] = O))
    : (O = t[30]);
  let k;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, W.jsx)(`i`, { className: `fas fa-check-double` })), (t[31] = k))
    : (k = t[31]);
  let j;
  t[32] !== n || t[33] !== O
    ? ((j = (0, W.jsxs)(`button`, {
        onClick: O,
        className: `flex-1 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2`,
        children: [k, ` Áp dụng cho `, n, ` thiết bị`],
      })),
      (t[32] = n),
      (t[33] = O),
      (t[34] = j))
    : (j = t[34]);
  let M;
  t[35] !== D || t[36] !== j
    ? ((M = (0, W.jsxs)(`div`, {
        className: `flex gap-3 mt-6 pt-4 border-t border-slate-100`,
        children: [D, j],
      })),
      (t[35] = D),
      (t[36] = j),
      (t[37] = M))
    : (M = t[37]);
  let N;
  return (
    t[38] !== E || t[39] !== M || t[40] !== h
      ? ((N = (0, W.jsx)(`div`, {
          className: `modal`,
          style: l,
          children: (0, W.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: u,
            children: [h, E, M],
          }),
        })),
        (t[38] = E),
        (t[39] = M),
        (t[40] = h),
        (t[41] = N))
      : (N = t[41]),
    N
  );
}
function me(e) {
  return (0, W.jsx)(`option`, { value: e.value, children: e.label }, e.value);
}
function he(e) {
  return (0, W.jsxs)(
    `option`,
    { value: e, children: [`VLAN `, e, ` – `, y[e]?.name ?? `—`] },
    e,
  );
}
var ge = {
    conn: `Cổng switch`,
    ipphone: `Quản lý IP Phone`,
    wifiap: `Quản lý WiFi AP`,
    switch: `Thiết bị Switch`,
    gpon: `Quản lý GPON`,
    cctv: `Quản lý CCTV`,
    elevator: `Thang máy`,
    nvr: `Quản lý NVR`,
    firewall: `Quản lý Firewall`,
  },
  _e = [`conn`, `wifiap`, `ipphone`],
  ve = {
    active: { color: `bg-emerald-500`, label: `Active` },
    shutdown: { color: `bg-slate-400`, label: `Shutdown` },
    "err-disabled": { color: `bg-red-500`, label: `Err-Disabled` },
    unregistered: { color: `bg-amber-500`, label: `Unregistered` },
    offline: { color: `bg-red-500`, label: `Offline` },
  };
function ye({ onBack: e, isAdmin: t, username: n }) {
  let r = _((e) => e.DB),
    i = _((e) => e.IPPhoneDB),
    o = _((e) => e.WifiDB),
    c = _((e) => e.GponFrameDB),
    p = _((e) => e.GponOntDB),
    m = _((e) => e.CctvCameraDB),
    v = _((e) => e.ElevatorDB),
    y = _((e) => e.NVRDB),
    x = _((e) => e.FirewallDB),
    D = _((e) => e.startPathTrace),
    ee = _((e) => e.saveWifiAP),
    j = _((e) => e.saveIPPhone),
    M = _((e) => e.saveSwitch),
    N = _((e) => e.addGlobalLog),
    F = h((e) => e.setActiveView),
    I = h((e) => e.openPortConfigModal),
    L = b((e) => e.showDialog),
    [z, B] = (0, A.useState)(``),
    [V, te] = (0, A.useState)([]),
    [H, re] = (0, A.useState)([]),
    [U, ie] = (0, A.useState)([]),
    [G, oe] = (0, A.useState)(!1),
    [K, q] = (0, A.useState)(new Set()),
    [ce, le] = (0, A.useState)(!1),
    [de, fe] = (0, A.useState)(`name`),
    [J, me] = (0, A.useState)(!1),
    [he, ge] = (0, A.useState)(null),
    [_e, ve] = (0, A.useState)(!1),
    [ye, xe] = (0, A.useState)(!1),
    [Se, Ce] = (0, A.useState)(!1),
    [Y, X] = (0, A.useState)(null),
    [Z, we] = (0, A.useState)(null),
    [Te, Ee] = (0, A.useState)(!1),
    [De, Oe] = (0, A.useState)(!1),
    [Q, ke] = (0, A.useState)(null),
    [Ae, je] = (0, A.useState)(null),
    [Me, Ne] = (0, A.useState)(``),
    $ = (0, A.useMemo)(
      () => P(r, i, o, c, p, m, v, y, x),
      [r, i, o, c, p, m, v, y, x],
    ),
    Pe = (0, A.useMemo)(() => {
      let e = 0,
        t = 0,
        n = 0,
        r = 0,
        i = 0;
      return (
        $.forEach((a) => {
          a.source === `switch`
            ? r++
            : a.source === `gpon`
              ? i++
              : a.icon === `fa-video`
                ? e++
                : a.icon === `fa-wifi`
                  ? t++
                  : a.icon === `fa-phone` && n++;
        }),
        {
          total: $.length,
          cctv: e,
          wifiAp: t,
          ipPhone: n,
          sw: r,
          gpon: i,
          other: $.length - e - t - n - r - i,
        }
      );
    }, [$]),
    Fe = (0, A.useMemo)(() => {
      let e = new Set();
      return (
        $.forEach((t) => {
          (t.vlan && e.add(t.vlan), t.trunkVlans?.forEach((t) => e.add(t)));
        }),
        [...e].sort((e, t) => Number(e) - Number(t))
      );
    }, [$]),
    Ie = (0, A.useMemo)(
      () =>
        [...new Set($.map((e) => e.floor).filter(Boolean))].sort((e, t) =>
          e.localeCompare(t, void 0, { numeric: !0 }),
        ),
      [$],
    ),
    Le = (0, A.useMemo)(() => {
      let e = new Set($.map((e) => e.icon));
      return l.filter((t) => e.has(t.icon));
    }, [$]),
    Re = (0, A.useMemo)(() => $.filter((e) => !e.switchId).length, [$]),
    ze = (0, A.useMemo)(() => {
      let e = z.trim().toLowerCase();
      return $.filter(
        (e) =>
          V.length === 0 ||
          V.includes(e.vlan) ||
          (e.trunkVlans?.some((e) => V.includes(e)) ?? !1),
      )
        .filter((e) => H.length === 0 || H.includes(e.floor))
        .filter((e) => U.length === 0 || U.includes(e.icon))
        .filter((e) => !G || !e.switchId)
        .filter(
          (t) =>
            !e ||
            [t.name, t.ip, t.mac].some((t) => t.toLowerCase().includes(e)),
        )
        .sort((e, t) => {
          let n = e[de].localeCompare(t[de], void 0, { numeric: !0 });
          return J ? -n : n;
        });
    }, [$, z, V, H, U, G, de, J]),
    Be = (0, A.useMemo)(
      () => ze.filter((e) => e.source === `conn` && !e.trunkVlans),
      [ze],
    ),
    Ve = Be.length > 0 && Be.every((e) => K.has(e.key));
  function He() {
    q(Ve ? new Set() : new Set(Be.map((e) => e.key)));
  }
  function Ue(e) {
    q((t) => {
      let n = new Set(t);
      return (n.has(e) ? n.delete(e) : n.add(e), n);
    });
  }
  function We(e) {
    if (e === de) {
      me((e) => !e);
      return;
    }
    (fe(e), me(!1));
  }
  function Ge(e) {
    if (!e.switchId || e.source === `gpon`) return;
    let t = R(r);
    if (!t) {
      L(`Chưa có thiết bị Core nào trong hệ thống để tính đường đi!`, `error`);
      return;
    }
    (D(t, e.switchId), F(`topology`));
  }
  function Ke(e) {
    return e === de
      ? (0, W.jsx)(`i`, {
          className: `fas fa-chevron-${J ? `down` : `up`} ml-1 text-[8px]`,
        })
      : null;
  }
  function qe(e, t, n, r) {
    (ve(!1),
      n === `fa-wifi`
        ? X({ floor: r, switchId: e, switchPort: t })
        : n === `fa-phone`
          ? we({ floor: r, switchId: e, switchPort: t })
          : I(e, t, n));
  }
  function Je(e, t) {
    if (!Q) return;
    let s = f(e, r)?.name ?? ``,
      c = r.find((t) => t.switches.some((t) => t.id === e))?.floor ?? Q.floor;
    if (Q.icon === `fa-wifi`) {
      let r = o.find((e) => e.id === Q.recordId);
      if (r) {
        let i = d(s, t);
        (ee({
          ...r,
          switchId: e,
          switchPort: t,
          floor: c,
          logs: a(r.logs, i, n),
        }),
          N(`WiFi AP: ${r.name}`, i, n));
      }
    } else if (Q.icon === `fa-phone`) {
      let r = i.find((e) => e.id === Q.recordId);
      if (r) {
        let i = C(s, t);
        (j({
          ...r,
          switchId: e,
          switchPort: t,
          floor: c,
          logs: S(r.logs, i, n),
        }),
          N(`Phone ${r.name || r.extension}`, i, n));
      }
    }
    ke(null);
  }
  function Ye(e, t) {
    e.trunkVlans ||
      (je({ key: e.key, field: t }),
      Ne(t === `name` ? e.name : t === `ip` ? e.ip : e.mac));
  }
  function Xe() {
    (je(null), Ne(``));
  }
  function Ze(e) {
    if (!Ae) return;
    let t = Ae.field,
      a = Me.trim();
    if (e.source === `wifiap`) {
      let n = o.find((t) => t.id === e.recordId);
      if (n) {
        let e =
          t === `name`
            ? { name: a || `(Chưa đặt tên)` }
            : t === `ip`
              ? { ip: a }
              : { mac: a };
        ee({ ...n, ...e });
      }
    } else if (e.source === `ipphone`) {
      let n = i.find((t) => t.id === e.recordId);
      if (n) {
        let e =
          t === `name` ? { name: a } : t === `ip` ? { ip: a } : { mac: a };
        j({ ...n, ...e });
      }
    } else {
      let i = f(e.switchId, r),
        o = i?.conns.find((t) => t.p === e.switchPort);
      if (i && o) {
        let c = { ...o };
        t === `name`
          ? (c.n = a || `(Chưa đặt tên)`)
          : t === `ip`
            ? a
              ? (c.ip = a)
              : delete c.ip
            : a
              ? (c.mac = a)
              : delete c.mac;
        let l = r.findIndex((e) => e.switches.some((e) => e.id === i.id)),
          d = `Cập nhật cấu hình Port ${e.switchPort}: ${c.n} (VLAN ${c.v}) [Sửa nhanh]`;
        M(l, { ...i, conns: s(i.conns, c), logs: u(i.logs, d, n) });
      }
    }
    (je(null), Ne(``));
  }
  function Qe(e, t) {
    let i = new Map(),
      a = ze.filter((e) => K.has(e.key));
    (a.forEach((a) => {
      let o = a.switchId;
      if (!i.has(o)) {
        let e = f(o, r);
        if (!e) return;
        let t = r.findIndex((e) => e.switches.some((e) => e.id === o));
        i.set(o, {
          floorIdx: t,
          sw: e,
          conns: [...e.conns],
          logs: e.logs ?? [],
        });
      }
      let c = i.get(o),
        l = c?.conns.find((e) => e.p === a.switchPort);
      if (!c || !l) return;
      let d = { ...l, v: e, status: t };
      ((c.conns = s(c.conns, d)),
        (c.logs = u(
          c.logs,
          `Cập nhật cấu hình Port ${a.switchPort}: ${d.n} (VLAN ${e}) [Sửa hàng loạt]`,
          n,
        )));
    }),
      i.forEach(({ floorIdx: e, sw: t, conns: n, logs: r }) => {
        M(e, { ...t, conns: n, logs: r });
      }),
      q(new Set()),
      le(!1),
      L(`Đã cập nhật ${a.length} thiết bị!`, `success`));
  }
  function $e() {
    let e = ne(ze),
      t = new Date().toLocaleDateString(`vi-VN`).replace(/\//g, `-`),
      n = document.createElement(`a`);
    ((n.href = `data:text/csv;charset=utf-8,` + encodeURIComponent(e)),
      (n.download = `DanhSachThietBi_${t}.csv`),
      n.click());
  }
  function et() {
    window.print();
  }
  function tt(e) {
    let t = new Map();
    (e.forEach((e, i) => {
      if (e.icon === `fa-wifi`) {
        let t = g(e.switchName, e.port, 102);
        (ee({
          id: `wifi-${Date.now()}-${i}`,
          name: e.name,
          ip: e.ip,
          mac: e.mac,
          floor: e.floor,
          zone: ``,
          type: `Dual-band`,
          brand: ``,
          model: ``,
          ssid: ``,
          channel: ``,
          power: ``,
          notes: `Import CSV — ${e.switchName} Port ${e.port}`,
          x: null,
          y: null,
          floorplanId: null,
          switchId: e.switchId,
          switchPort: e.port,
          logs: a(void 0, t, n),
        }),
          N(`WiFi AP: ${e.name}`, t, n));
      } else if (e.icon === `fa-phone`) {
        let t = w({ extension: ``, name: e.name });
        (j({
          id: `phone-${Date.now()}-${i}`,
          extension: ``,
          name: e.name,
          ip: e.ip,
          mac: e.mac,
          brand: ``,
          model: ``,
          floor: e.floor,
          location: ``,
          switchId: e.switchId,
          switchPort: e.port,
          status: `active`,
          notes: `Import CSV — ${e.switchName} Port ${e.port}`,
          logs: S(void 0, t, n),
        }),
          N(`Phone ${e.name}`, t, n));
      } else {
        let i = e.switchId;
        if (!t.has(i)) {
          let e = f(i, r),
            n = r.findIndex((e) => e.switches.some((e) => e.id === i));
          t.set(i, {
            floorIdx: n,
            sw: e,
            conns: [...e.conns],
            logs: e.logs ?? [],
          });
        }
        let a = t.get(i),
          o = parseInt(e.vlan, 10) || 0,
          c = {
            p: e.port,
            v: o,
            n: e.name,
            icon: e.icon,
            ...(e.ip && { ip: e.ip }),
            ...(e.mac && { mac: e.mac }),
          };
        ((a.conns = s(a.conns, c)),
          (a.logs = u(
            a.logs,
            `Thêm thiết bị Client vào Port ${e.port}: ${e.name} (VLAN ${o}) [Import CSV]`,
            n,
          )));
      }
    }),
      t.forEach(({ floorIdx: e, sw: t, conns: n, logs: r }) => {
        M(e, { ...t, conns: n, logs: r });
      }),
      xe(!1),
      L(`Import thành công ${e.length} thiết bị!`, `success`));
  }
  return (0, W.jsxs)(W.Fragment, {
    children: [
      (0, W.jsxs)(`div`, {
        className: `w-full h-full flex flex-col`,
        id: `inventory-print-area`,
        children: [
          (0, W.jsxs)(`div`, {
            className: `view-header px-8 py-6 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0`,
            children: [
              (0, W.jsxs)(`div`, {
                children: [
                  (0, W.jsxs)(`h2`, {
                    className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
                    children: [
                      (0, W.jsx)(`div`, {
                        className: `w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100`,
                        children: (0, W.jsx)(`i`, {
                          className: `fas fa-clipboard-list`,
                        }),
                      }),
                      `Danh sách thiết bị`,
                    ],
                  }),
                  (0, W.jsx)(`p`, {
                    className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
                    children: `IP · VLAN · MAC · Đường đi tới switch — toàn hệ thống`,
                  }),
                ],
              }),
              (0, W.jsxs)(`div`, {
                className: `view-header-actions flex items-center gap-2 no-print`,
                children: [
                  (0, W.jsxs)(`button`, {
                    onClick: $e,
                    className: `px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-2`,
                    children: [
                      (0, W.jsx)(`i`, { className: `fas fa-file-csv` }),
                      ` Xuất CSV`,
                    ],
                  }),
                  (0, W.jsxs)(`button`, {
                    onClick: et,
                    className: `px-4 py-2.5 bg-red-50 border border-red-200 text-red-500 text-xs font-bold rounded-xl hover:bg-red-100 transition-all flex items-center gap-2`,
                    children: [
                      (0, W.jsx)(`i`, { className: `fas fa-file-pdf` }),
                      ` Xuất PDF`,
                    ],
                  }),
                  t &&
                    (0, W.jsxs)(`button`, {
                      onClick: () => xe(!0),
                      className: `px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold rounded-xl hover:bg-amber-100 transition-all flex items-center gap-2`,
                      children: [
                        (0, W.jsx)(`i`, { className: `fas fa-file-import` }),
                        ` Nhập CSV`,
                      ],
                    }),
                  (0, W.jsxs)(`button`, {
                    onClick: e,
                    className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
                    children: [
                      (0, W.jsx)(`i`, { className: `fas fa-arrow-left` }),
                      ` Quay lại Topology`,
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, W.jsxs)(`div`, {
            className: `flex-1 overflow-y-auto custom-scroll p-8`,
            children: [
              (0, W.jsx)(`div`, {
                className: `stat-grid grid grid-cols-7 gap-4 mb-6`,
                children: [
                  [`indigo`, Pe.total, `Tổng thiết bị`],
                  [`purple`, Pe.sw, `Switch`],
                  [`red`, Pe.cctv, `Camera CCTV`],
                  [`cyan`, Pe.wifiAp, `WiFi AP`],
                  [`green`, Pe.ipPhone, `IP Phone`],
                  [`fuchsia`, Pe.gpon, `GPON ONT`],
                  [`slate`, Pe.other, `Khác`],
                ].map(([e, t, n]) => {
                  let r = E(e);
                  return (0, W.jsxs)(
                    `div`,
                    {
                      className: `${r.bg} border ${r.border} rounded-xl p-4 text-center shadow-sm`,
                      children: [
                        (0, W.jsx)(`span`, {
                          className: `text-2xl font-black ${r.text}`,
                          children: t,
                        }),
                        (0, W.jsx)(`p`, {
                          className: `text-[10px] font-bold ${r.text} uppercase tracking-widest mt-1`,
                          children: n,
                        }),
                      ],
                    },
                    n,
                  );
                }),
              }),
              (0, W.jsxs)(`div`, {
                className: `filter-toolbar flex items-center gap-3 mb-5 no-print`,
                children: [
                  (0, W.jsxs)(`div`, {
                    className: `relative flex-1 max-w-sm`,
                    children: [
                      (0, W.jsx)(`i`, {
                        className: `fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]`,
                      }),
                      (0, W.jsx)(`input`, {
                        type: `text`,
                        value: z,
                        onChange: (e) => B(e.target.value),
                        placeholder: `Tìm theo tên, IP, MAC...`,
                        className: `w-full pl-8 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500 transition-colors`,
                      }),
                    ],
                  }),
                  (0, W.jsx)(ue, { options: Fe, selected: V, onChange: te }),
                  (0, W.jsx)(k, {
                    icon: `fa-building`,
                    allLabel: `Tất cả Tầng`,
                    countLabel: (e) => `${e} Tầng đã chọn`,
                    options: Ie.map((e) => ({ value: e, label: e })),
                    selected: H,
                    onChange: re,
                  }),
                  (0, W.jsx)(k, {
                    icon: `fa-shapes`,
                    allLabel: `Tất cả Loại`,
                    countLabel: (e) => `${e} Loại đã chọn`,
                    options: Le.map((e) => ({ value: e.icon, label: e.label })),
                    selected: U,
                    onChange: ie,
                  }),
                  (0, W.jsxs)(`button`, {
                    type: `button`,
                    onClick: () => oe((e) => !e),
                    title: `Chỉ hiện thiết bị chưa gán vào switch/port nào`,
                    className: `px-3 py-2.5 border rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${G ? `bg-amber-50 border-amber-200 text-amber-600` : `bg-white border-slate-200 text-slate-700 hover:border-amber-300`}`,
                    children: [
                      (0, W.jsx)(`i`, {
                        className: `fas fa-unlink text-[10px]`,
                      }),
                      ` Chưa gán (`,
                      Re,
                      `)`,
                    ],
                  }),
                  K.size > 0 &&
                    (0, W.jsxs)(W.Fragment, {
                      children: [
                        (0, W.jsxs)(`button`, {
                          type: `button`,
                          onClick: () => le(!0),
                          className: `px-3 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2`,
                          children: [
                            (0, W.jsx)(`i`, {
                              className: `fas fa-layer-group`,
                            }),
                            ` Sửa hàng loạt (`,
                            K.size,
                            `)`,
                          ],
                        }),
                        (0, W.jsx)(`button`, {
                          type: `button`,
                          onClick: () => q(new Set()),
                          className: `text-[10px] font-bold text-slate-400 hover:text-slate-600`,
                          children: `Bỏ chọn`,
                        }),
                      ],
                    }),
                  t &&
                    (0, W.jsxs)(`div`, {
                      className: `relative`,
                      children: [
                        (0, W.jsxs)(`button`, {
                          onClick: () => Ce((e) => !e),
                          className: `px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-all flex items-center gap-2`,
                          children: [
                            (0, W.jsx)(`i`, { className: `fas fa-plus` }),
                            ` Thêm thiết bị mới`,
                          ],
                        }),
                        Se &&
                          (0, W.jsxs)(W.Fragment, {
                            children: [
                              (0, W.jsx)(`div`, {
                                className: `fixed inset-0 z-10`,
                                onClick: () => Ce(!1),
                              }),
                              (0, W.jsxs)(`div`, {
                                className: `absolute top-full left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-20 p-2`,
                                children: [
                                  (0, W.jsxs)(`button`, {
                                    onClick: () => {
                                      (h.getState().openAddSwitchModal(), Ce(!1));
                                    },
                                    className: `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-indigo-50 text-left transition-colors`,
                                    children: [
                                      (0, W.jsx)(`div`, {
                                        className: `w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0`,
                                        children: (0, W.jsx)(`i`, {
                                          className: `fas fa-network-wired text-xs`,
                                        }),
                                      }),
                                      (0, W.jsxs)(`div`, {
                                        children: [
                                          (0, W.jsx)(`p`, {
                                            className: `text-xs font-bold text-slate-800`,
                                            children: `Switch`,
                                          }),
                                          (0, W.jsx)(`p`, {
                                            className: `text-[9px] text-slate-400`,
                                            children: `Thêm Switch mạng vào Topology / Tầng`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, W.jsxs)(`button`, {
                                    onClick: () => {
                                      (h.getState().openAddFirewallModal?.('router'), Ce(!1));
                                    },
                                    className: `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-sky-50 text-left transition-colors`,
                                    children: [
                                      (0, W.jsx)(`div`, {
                                        className: `w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0`,
                                        children: (0, W.jsx)(`i`, {
                                          className: `fas fa-route text-xs`,
                                        }),
                                      }),
                                      (0, W.jsxs)(`div`, {
                                        children: [
                                          (0, W.jsx)(`p`, {
                                            className: `text-xs font-bold text-slate-800`,
                                            children: `Router`,
                                          }),
                                          (0, W.jsx)(`p`, {
                                            className: `text-[9px] text-slate-400`,
                                            children: `Thêm Router định tuyến mạng / WAN`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, W.jsxs)(`button`, {
                                    onClick: () => {
                                      (h.getState().openAddFirewallModal?.('firewall'), Ce(!1));
                                    },
                                    className: `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-rose-50 text-left transition-colors`,
                                    children: [
                                      (0, W.jsx)(`div`, {
                                        className: `w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0`,
                                        children: (0, W.jsx)(`i`, {
                                          className: `fas fa-shield-halved text-xs`,
                                        }),
                                      }),
                                      (0, W.jsxs)(`div`, {
                                        children: [
                                          (0, W.jsx)(`p`, {
                                            className: `text-xs font-bold text-slate-800`,
                                            children: `Firewall`,
                                          }),
                                          (0, W.jsx)(`p`, {
                                            className: `text-[9px] text-slate-400`,
                                            children: `Thêm Firewall bảo mật tường lửa`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, W.jsx)(`div`, {
                                    className: `my-1 border-t border-slate-100`,
                                  }),
                                  (0, W.jsxs)(`button`, {
                                    onClick: () => {
                                      (Ee(!0), Ce(!1));
                                    },
                                    className: `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-cyan-50 text-left transition-colors`,
                                    children: [
                                      (0, W.jsx)(`div`, {
                                        className: `w-7 h-7 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0`,
                                        children: (0, W.jsx)(`i`, {
                                          className: `fas fa-wifi text-xs`,
                                        }),
                                      }),
                                      (0, W.jsxs)(`div`, {
                                        children: [
                                          (0, W.jsx)(`p`, {
                                            className: `text-xs font-bold text-slate-800`,
                                            children: `WiFi AP`,
                                          }),
                                          (0, W.jsx)(`p`, {
                                            className: `text-[9px] text-slate-400`,
                                            children: `Tạo mới, gán switch/port sau nếu chưa biết`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, W.jsxs)(`button`, {
                                    onClick: () => {
                                      (Oe(!0), Ce(!1));
                                    },
                                    className: `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-green-50 text-left transition-colors`,
                                    children: [
                                      (0, W.jsx)(`div`, {
                                        className: `w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0`,
                                        children: (0, W.jsx)(`i`, {
                                          className: `fas fa-phone text-xs`,
                                        }),
                                      }),
                                      (0, W.jsxs)(`div`, {
                                        children: [
                                          (0, W.jsx)(`p`, {
                                            className: `text-xs font-bold text-slate-800`,
                                            children: `IP Phone`,
                                          }),
                                          (0, W.jsx)(`p`, {
                                            className: `text-[9px] text-slate-400`,
                                            children: `Tạo mới, gán switch/port sau nếu chưa biết`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, W.jsx)(`div`, {
                                    className: `my-1 border-t border-slate-100`,
                                  }),
                                  (0, W.jsxs)(`button`, {
                                    onClick: () => {
                                      (ve(!0), Ce(!1));
                                    },
                                    className: `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-indigo-50 text-left transition-colors`,
                                    children: [
                                      (0, W.jsx)(`div`, {
                                        className: `w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0`,
                                        children: (0, W.jsx)(`i`, {
                                          className: `fas fa-desktop text-xs`,
                                        }),
                                      }),
                                      (0, W.jsxs)(`div`, {
                                        children: [
                                          (0, W.jsx)(`p`, {
                                            className: `text-xs font-bold text-slate-800`,
                                            children: l
                                              .filter(
                                                (e) =>
                                                  e.icon !== `fa-wifi` &&
                                                  e.icon !== `fa-phone`,
                                              )
                                              .map((e) => e.label)
                                              .join(` / `),
                                          }),
                                          (0, W.jsx)(`p`, {
                                            className: `text-[9px] text-slate-400`,
                                            children: `Loại này cần port trên switch — tìm port trống ngay`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                      ],
                    }),
                  t &&
                    (0, W.jsxs)(`button`, {
                      onClick: () => ve(!0),
                      className: `px-4 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2`,
                      children: [
                        (0, W.jsx)(`i`, { className: `fas fa-route` }),
                        ` Gán thiết bị`,
                      ],
                    }),
                  (0, W.jsxs)(`span`, {
                    className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto`,
                    children: [ze.length, ` / `, $.length, ` thiết bị`],
                  }),
                ],
              }),
              (0, W.jsx)(`div`, {
                className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
                children: (0, W.jsxs)(`table`, {
                  className: `w-full text-xs`,
                  children: [
                    (0, W.jsx)(`thead`, {
                      children: (0, W.jsxs)(`tr`, {
                        className: `bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest`,
                        children: [
                          (0, W.jsx)(`th`, {
                            className: `text-left px-4 py-3 w-8 no-print`,
                          }),
                          (0, W.jsx)(`th`, {
                            className: `text-left px-2 py-3 w-8 no-print`,
                            children:
                              Be.length > 0 &&
                              (0, W.jsx)(`input`, {
                                type: `checkbox`,
                                checked: Ve,
                                onChange: He,
                                title: `Chọn tất cả (chỉ những dòng có thể sửa hàng loạt)`,
                              }),
                          }),
                          (0, W.jsxs)(`th`, {
                            className: `text-left px-2 py-3 cursor-pointer select-none`,
                            onClick: () => We(`name`),
                            children: [`Tên `, Ke(`name`)],
                          }),
                          (0, W.jsxs)(`th`, {
                            className: `text-left px-2 py-3 cursor-pointer select-none`,
                            onClick: () => We(`ip`),
                            children: [`IP `, Ke(`ip`)],
                          }),
                          (0, W.jsx)(`th`, {
                            className: `text-left px-2 py-3`,
                            children: `MAC`,
                          }),
                          (0, W.jsxs)(`th`, {
                            className: `text-left px-2 py-3 cursor-pointer select-none`,
                            onClick: () => We(`vlan`),
                            children: [`VLAN `, Ke(`vlan`)],
                          }),
                          (0, W.jsxs)(`th`, {
                            className: `text-left px-2 py-3 cursor-pointer select-none`,
                            onClick: () => We(`switchName`),
                            children: [`Switch / Port `, Ke(`switchName`)],
                          }),
                          (0, W.jsx)(`th`, {
                            className: `text-left px-2 py-3`,
                            children: `Tầng`,
                          }),
                          (0, W.jsx)(`th`, {
                            className: `text-left px-2 py-3`,
                            children: `Loại`,
                          }),
                          (0, W.jsx)(`th`, {
                            className: `text-right px-4 py-3 no-print`,
                            children: `Đường đi`,
                          }),
                        ],
                      }),
                    }),
                    (0, W.jsxs)(`tbody`, {
                      children: [
                        ze.length === 0 &&
                          (0, W.jsx)(`tr`, {
                            children: (0, W.jsx)(`td`, {
                              colSpan: 10,
                              className: `text-center py-10 text-slate-400 italic`,
                              children: `Không tìm thấy thiết bị nào.`,
                            }),
                          }),
                        ze.map((e) =>
                          (0, W.jsx)(
                            be,
                            {
                              row: e,
                              isAdmin: t,
                              expanded: he === e.key,
                              selected: K.has(e.key),
                              editingCell: Ae,
                              editingValue: Me,
                              onToggleExpand: () =>
                                ge((t) => (t === e.key ? null : e.key)),
                              onPathToSwitch: () => Ge(e),
                              onAssign: () => ke(e),
                              onToggleSelected: () => Ue(e.key),
                              onStartEdit: (t) => Ye(e, t),
                              onEditingValueChange: Ne,
                              onCommitEdit: () => Ze(e),
                              onCancelEdit: Xe,
                            },
                            e.key,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      _e &&
        (0, W.jsx)(ae, {
          db: r,
          ipPhoneDB: i,
          wifiDB: o,
          onPick: qe,
          onClose: () => ve(!1),
        }),
      (Y || Te) &&
        (0, W.jsx)(O, {
          ap: null,
          networkDB: r,
          isAdmin: t,
          username: n,
          initialFloor: Y?.floor,
          initialSwitchId: Y?.switchId,
          initialSwitchPort: Y?.switchPort,
          onSave: (e) => {
            (ee(e), X(null), Ee(!1));
          },
          onDelete: () => {
            (X(null), Ee(!1));
          },
          onClose: () => {
            (X(null), Ee(!1));
          },
        }),
      (Z || De) &&
        (0, W.jsx)(T, {
          record: null,
          db: r,
          username: n,
          initialFloor: Z?.floor,
          initialSwitchId: Z?.switchId,
          initialSwitchPort: Z?.switchPort,
          onSave: (e) => {
            (j(e), we(null), Oe(!1));
          },
          onClose: () => {
            (we(null), Oe(!1));
          },
        }),
      ye &&
        (0, W.jsx)(se, {
          db: r,
          ipPhoneDB: i,
          wifiDB: o,
          onConfirm: tt,
          onClose: () => xe(!1),
        }),
      Q &&
        (0, W.jsx)(ae, {
          db: r,
          ipPhoneDB: i,
          wifiDB: o,
          lockedIcon: Q.icon,
          contextLabel: Q.name,
          initialFloorFilter: Q.floor || `all`,
          onPick: (e, t) => Je(e, t),
          onClose: () => ke(null),
        }),
      ce &&
        (0, W.jsx)(pe, { count: K.size, onApply: Qe, onClose: () => le(!1) }),
    ],
  });
}
function be(e) {
  let t = (0, ee.c)(112),
    {
      row: n,
      isAdmin: r,
      expanded: i,
      selected: a,
      editingCell: o,
      editingValue: s,
      onToggleExpand: c,
      onPathToSwitch: l,
      onAssign: u,
      onToggleSelected: d,
      onStartEdit: f,
      onEditingValueChange: p,
      onCommitEdit: m,
      onCancelEdit: h,
    } = e,
    g;
  t[0] === n.icon ? (g = t[1]) : ((g = D(n.icon)), (t[0] = n.icon), (t[1] = g));
  let _ = g,
    v = n.vlan ? y[Number(n.vlan)] : void 0,
    b = n.status ? ve[n.status] : void 0,
    x = n.source === `conn` && !n.trunkVlans,
    S;
  t[2] !== r || t[3] !== n.source || t[4] !== n.trunkVlans
    ? ((S = r && !n.trunkVlans && _e.includes(n.source)),
      (t[2] = r),
      (t[3] = n.source),
      (t[4] = n.trunkVlans),
      (t[5] = S))
    : (S = t[5]);
  let C = S,
    w;
  t[6] !== C ||
  t[7] !== o ||
  t[8] !== s ||
  t[9] !== h ||
  t[10] !== m ||
  t[11] !== p ||
  t[12] !== f ||
  t[13] !== n.key
    ? ((w = function (e, t, r) {
        return o?.key === n.key && o.field === e
          ? (0, W.jsx)(`input`, {
              autoFocus: !0,
              value: s,
              onChange: (e) => p(e.target.value),
              onBlur: m,
              onKeyDown: (e) => {
                e.key === `Enter` ? m() : e.key === `Escape` && h();
              },
              className: `w-full px-1.5 py-1 bg-white border border-indigo-400 rounded outline-none ${r}`,
            })
          : C
            ? (0, W.jsx)(`button`, {
                type: `button`,
                onClick: () => f(e),
                title: `Sửa nhanh`,
                className: `w-full text-left rounded px-1.5 py-1 -mx-1.5 hover:bg-indigo-50 transition-colors ${r}`,
                children: t,
              })
            : t;
      }),
      (t[6] = C),
      (t[7] = o),
      (t[8] = s),
      (t[9] = h),
      (t[10] = m),
      (t[11] = p),
      (t[12] = f),
      (t[13] = n.key),
      (t[14] = w))
    : (w = t[14]);
  let T = w,
    E = `border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${a ? `bg-indigo-50/50` : ``}`,
    O = `fas fa-chevron-${i ? `down` : `right`} text-[9px]`,
    k;
  t[15] === O
    ? (k = t[16])
    : ((k = (0, W.jsx)(`i`, { className: O })), (t[15] = O), (t[16] = k));
  let A;
  t[17] !== c || t[18] !== k
    ? ((A = (0, W.jsx)(`td`, {
        className: `px-4 py-3 no-print`,
        children: (0, W.jsx)(`button`, {
          onClick: c,
          title: `Xem lịch sử thay đổi`,
          className: `w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors`,
          children: k,
        }),
      })),
      (t[17] = c),
      (t[18] = k),
      (t[19] = A))
    : (A = t[19]);
  let j;
  t[20] !== d || t[21] !== x || t[22] !== a
    ? ((j =
        x &&
        (0, W.jsx)(`input`, { type: `checkbox`, checked: a, onChange: d })),
      (t[20] = d),
      (t[21] = x),
      (t[22] = a),
      (t[23] = j))
    : (j = t[23]);
  let M;
  t[24] === j
    ? (M = t[25])
    : ((M = (0, W.jsx)(`td`, { className: `px-2 py-3 no-print`, children: j })),
      (t[24] = j),
      (t[25] = M));
  let N = `w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${_.iconBg}`,
    P = `fas ${n.icon} ${_.iconText} text-[10px]`,
    F;
  t[26] === P
    ? (F = t[27])
    : ((F = (0, W.jsx)(`i`, { className: P })), (t[26] = P), (t[27] = F));
  let I;
  t[28] !== N || t[29] !== F
    ? ((I = (0, W.jsx)(`div`, { className: N, children: F })),
      (t[28] = N),
      (t[29] = F),
      (t[30] = I))
    : (I = t[30]);
  let L;
  t[31] === n.name
    ? (L = t[32])
    : ((L = (0, W.jsx)(`span`, { className: `truncate`, children: n.name })),
      (t[31] = n.name),
      (t[32] = L));
  let R;
  t[33] !== I || t[34] !== L
    ? ((R = (0, W.jsxs)(`div`, {
        className: `flex items-center gap-2`,
        children: [I, L],
      })),
      (t[33] = I),
      (t[34] = L),
      (t[35] = R))
    : (R = t[35]);
  let z;
  t[36] !== T || t[37] !== R
    ? ((z = T(`name`, R, ``)), (t[36] = T), (t[37] = R), (t[38] = z))
    : (z = t[38]);
  let B;
  t[39] === z
    ? (B = t[40])
    : ((B = (0, W.jsx)(`td`, {
        className: `px-2 py-3 font-bold text-slate-800`,
        children: z,
      })),
      (t[39] = z),
      (t[40] = B));
  let V = n.ip || `—`,
    ne;
  t[41] === n.ipConflict
    ? (ne = t[42])
    : ((ne =
        n.ipConflict &&
        (0, W.jsx)(`i`, {
          title: `Trùng địa chỉ IP với 1+ thiết bị khác`,
          className: `fas fa-triangle-exclamation text-red-500 text-[9px]`,
        })),
      (t[41] = n.ipConflict),
      (t[42] = ne));
  let H;
  t[43] !== V || t[44] !== ne
    ? ((H = (0, W.jsxs)(`span`, {
        className: `inline-flex items-center gap-1.5`,
        children: [V, ne],
      })),
      (t[43] = V),
      (t[44] = ne),
      (t[45] = H))
    : (H = t[45]);
  let re;
  t[46] !== T || t[47] !== H
    ? ((re = T(`ip`, H, `font-bold text-indigo-600`)),
      (t[46] = T),
      (t[47] = H),
      (t[48] = re))
    : (re = t[48]);
  let U;
  t[49] === re
    ? (U = t[50])
    : ((U = (0, W.jsx)(`td`, {
        className: `px-2 py-3 font-bold text-indigo-600`,
        children: re,
      })),
      (t[49] = re),
      (t[50] = U));
  let ie = n.mac || `—`,
    G;
  t[51] === n.macConflict
    ? (G = t[52])
    : ((G =
        n.macConflict &&
        (0, W.jsx)(`i`, {
          title: `Trùng địa chỉ MAC với 1+ thiết bị khác`,
          className: `fas fa-triangle-exclamation text-red-500 text-[9px]`,
        })),
      (t[51] = n.macConflict),
      (t[52] = G));
  let ae;
  t[53] !== ie || t[54] !== G
    ? ((ae = (0, W.jsxs)(`span`, {
        className: `inline-flex items-center gap-1.5`,
        children: [ie, G],
      })),
      (t[53] = ie),
      (t[54] = G),
      (t[55] = ae))
    : (ae = t[55]);
  let oe;
  t[56] !== T || t[57] !== ae
    ? ((oe = T(`mac`, ae, `font-mono text-slate-500`)),
      (t[56] = T),
      (t[57] = ae),
      (t[58] = oe))
    : (oe = t[58]);
  let K;
  t[59] === oe
    ? (K = t[60])
    : ((K = (0, W.jsx)(`td`, {
        className: `px-2 py-3 font-mono text-slate-500`,
        children: oe,
      })),
      (t[59] = oe),
      (t[60] = K));
  let se;
  t[61] !== n.trunkVlans || t[62] !== n.vlan || t[63] !== v
    ? ((se = n.trunkVlans
        ? (0, W.jsxs)(`span`, {
            title: `Cổng trunk — cùng 1 thiết bị, đang mang nhiều VLAN`,
            className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-50 text-purple-700 border border-purple-200`,
            children: [
              (0, W.jsx)(`i`, { className: `fas fa-shuffle text-[8px]` }),
              ` TRUNK `,
              n.trunkVlans.map(Se).join(` và `),
            ],
          })
        : v
          ? (0, W.jsxs)(`span`, {
              className: `px-1.5 py-0.5 rounded text-[10px] font-black`,
              style: {
                backgroundColor: `${v.color}15`,
                color: v.color,
                border: `1px solid ${v.color}30`,
              },
              children: [`VLAN `, n.vlan],
            })
          : n.vlan
            ? (0, W.jsxs)(`span`, {
                className: `px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-black text-slate-600`,
                children: [`VLAN `, n.vlan],
              })
            : `—`),
      (t[61] = n.trunkVlans),
      (t[62] = n.vlan),
      (t[63] = v),
      (t[64] = se))
    : (se = t[64]);
  let q;
  t[65] === se
    ? (q = t[66])
    : ((q = (0, W.jsx)(`td`, { className: `px-2 py-3`, children: se })),
      (t[65] = se),
      (t[66] = q));
  let ce;
  t[67] !== r ||
  t[68] !== u ||
  t[69] !== n.recordId ||
  t[70] !== n.switchId ||
  t[71] !== n.switchName ||
  t[72] !== n.switchPort ||
  t[73] !== b ||
  t[74] !== _.iconBg ||
  t[75] !== _.iconText
    ? ((ce = (0, W.jsx)(`td`, {
        className: `px-2 py-3 text-slate-600`,
        children: n.switchId
          ? (0, W.jsxs)(`span`, {
              className: `inline-flex items-center gap-1.5`,
              children: [
                n.switchName,
                n.switchPort != null &&
                  (0, W.jsxs)(`span`, {
                    className: `relative inline-flex`,
                    children: [
                      (0, W.jsxs)(`span`, {
                        className: `px-1.5 py-0.5 rounded text-[9px] font-black ${_.iconBg} ${_.iconText}`,
                        children: [`P`, n.switchPort],
                      }),
                      b &&
                        (0, W.jsx)(`span`, {
                          title: b.label,
                          className: `absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white ${b.color}`,
                        }),
                    ],
                  }),
              ],
            })
          : n.recordId && r
            ? (0, W.jsxs)(`button`, {
                onClick: u,
                title: `Gán thiết bị này vào 1 switch/port đang trống`,
                className: `px-2 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg text-[9px] font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1`,
                children: [
                  (0, W.jsx)(`i`, { className: `fas fa-link` }),
                  ` Gán`,
                ],
              })
            : (0, W.jsx)(`span`, {
                className: `text-slate-300 italic`,
                children: `Chưa gán`,
              }),
      })),
      (t[67] = r),
      (t[68] = u),
      (t[69] = n.recordId),
      (t[70] = n.switchId),
      (t[71] = n.switchName),
      (t[72] = n.switchPort),
      (t[73] = b),
      (t[74] = _.iconBg),
      (t[75] = _.iconText),
      (t[76] = ce))
    : (ce = t[76]);
  let le = n.floor || `—`,
    ue;
  t[77] === le
    ? (ue = t[78])
    : ((ue = (0, W.jsx)(`td`, {
        className: `px-2 py-3 text-slate-500`,
        children: le,
      })),
      (t[77] = le),
      (t[78] = ue));
  let de = `inline-block w-fit px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${_.iconBg} ${_.iconText}`,
    fe;
  t[79] === n ? (fe = t[80]) : ((fe = te(n)), (t[79] = n), (t[80] = fe));
  let J;
  t[81] !== de || t[82] !== fe
    ? ((J = (0, W.jsx)(`span`, { className: de, children: fe })),
      (t[81] = de),
      (t[82] = fe),
      (t[83] = J))
    : (J = t[83]);
  let pe = n.trunkVlans ? `Cổng switch + Quản lý riêng` : ge[n.source],
    me;
  t[84] === pe
    ? (me = t[85])
    : ((me = (0, W.jsx)(`span`, {
        className: `text-[8px] font-bold text-slate-400 uppercase tracking-widest`,
        children: pe,
      })),
      (t[84] = pe),
      (t[85] = me));
  let he;
  t[86] !== J || t[87] !== me
    ? ((he = (0, W.jsx)(`td`, {
        className: `px-2 py-3`,
        children: (0, W.jsxs)(`div`, {
          className: `flex flex-col gap-0.5`,
          children: [J, me],
        }),
      })),
      (t[86] = J),
      (t[87] = me),
      (t[88] = he))
    : (he = t[88]);
  let ye = !n.switchId || n.source === `gpon`,
    be =
      n.source === `gpon`
        ? `ONT không nằm trên đường switch — xem trong module GPON`
        : n.switchId
          ? `Xem đường đi từ Core tới switch này`
          : `Thiết bị chưa gán vào switch nào`,
    Ce;
  t[89] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ce = (0, W.jsx)(`i`, { className: `fas fa-route mr-1` })), (t[89] = Ce))
    : (Ce = t[89]);
  let Y;
  t[90] !== l || t[91] !== ye || t[92] !== be
    ? ((Y = (0, W.jsx)(`td`, {
        className: `px-4 py-3 text-right no-print`,
        children: (0, W.jsxs)(`button`, {
          onClick: l,
          disabled: ye,
          title: be,
          className: `px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`,
          children: [Ce, ` Đường đi`],
        }),
      })),
      (t[90] = l),
      (t[91] = ye),
      (t[92] = be),
      (t[93] = Y))
    : (Y = t[93]);
  let X;
  t[94] !== B ||
  t[95] !== U ||
  t[96] !== K ||
  t[97] !== q ||
  t[98] !== ce ||
  t[99] !== ue ||
  t[100] !== he ||
  t[101] !== E ||
  t[102] !== Y ||
  t[103] !== A ||
  t[104] !== M
    ? ((X = (0, W.jsxs)(`tr`, {
        className: E,
        children: [A, M, B, U, K, q, ce, ue, he, Y],
      })),
      (t[94] = B),
      (t[95] = U),
      (t[96] = K),
      (t[97] = q),
      (t[98] = ce),
      (t[99] = ue),
      (t[100] = he),
      (t[101] = E),
      (t[102] = Y),
      (t[103] = A),
      (t[104] = M),
      (t[105] = X))
    : (X = t[105]);
  let Z;
  t[106] !== i || t[107] !== n.historyLogs
    ? ((Z =
        i &&
        (0, W.jsx)(`tr`, {
          className: `bg-slate-50 border-b border-slate-100`,
          children: (0, W.jsxs)(`td`, {
            colSpan: 10,
            className: `px-4 py-3`,
            children: [
              (0, W.jsx)(`p`, {
                className: `text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2`,
                children: `Lịch sử thay đổi`,
              }),
              n.historyLogs.length === 0
                ? (0, W.jsx)(`p`, {
                    className: `text-[10px] text-slate-400 italic`,
                    children: `Chưa có lịch sử.`,
                  })
                : (0, W.jsx)(`div`, {
                    className: `space-y-1.5 max-h-40 overflow-y-auto custom-scroll pr-2`,
                    children: n.historyLogs.map(xe),
                  }),
            ],
          }),
        })),
      (t[106] = i),
      (t[107] = n.historyLogs),
      (t[108] = Z))
    : (Z = t[108]);
  let we;
  return (
    t[109] !== X || t[110] !== Z
      ? ((we = (0, W.jsxs)(W.Fragment, { children: [X, Z] })),
        (t[109] = X),
        (t[110] = Z),
        (t[111] = we))
      : (we = t[111]),
    we
  );
}
function xe(e, t) {
  return (0, W.jsxs)(
    `div`,
    {
      className: `flex gap-2 text-[10px]`,
      children: [
        (0, W.jsx)(`span`, {
          className: `font-bold text-indigo-400 shrink-0`,
          children: e.time,
        }),
        (0, W.jsx)(`span`, { className: `text-slate-600`, children: e.msg }),
      ],
    },
    t,
  );
}
function Se(e) {
  return `VLAN ${e}`;
}
export { ye as default };
