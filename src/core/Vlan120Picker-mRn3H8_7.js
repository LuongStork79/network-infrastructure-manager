import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import { tn as r } from "./index-QE6I14Fy.js";
var i = e(t(), 1),
  a = r();
function o(e) {
  return e.split(`.`).reduce((e, t) => (e << 8) + parseInt(t, 10), 0) >>> 0;
}
function s(e) {
  return [(e >>> 24) & 255, (e >>> 16) & 255, (e >>> 8) & 255, e & 255].join(
    `.`,
  );
}
function c(e, t, n) {
  let r = {};
  return (
    t.forEach((t) =>
      t.switches.forEach((t) => {
        (e === `1` &&
          t.ip &&
          t.ip !== `10.x.x.x` &&
          t.ip.trim() !== `` &&
          (r[t.ip] = {
            ip: t.ip,
            n: t.name,
            swName: `Tủ Rack (Core/Dist)`,
            port: `Mgmt`,
            icon: t.isCore ? `fa-crown` : `fa-server`,
          }),
          t.conns.forEach((n) => {
            if (String(n.v) === e) {
              let e = n.ip || `no_ip_${t.id}_${n.p}`;
              r[e] = {
                ip: n.ip,
                n: n.n,
                swName: t.name,
                port: n.p,
                icon: n.icon || `fa-desktop`,
                nvr: n.nvr,
                ch: n.ch,
                camType: n.camType,
                mac: n.mac,
              };
            }
          }));
      }),
    ),
    e === `120` &&
      n.forEach((e) => {
        (e.master?.ip &&
          (r[e.master.ip] = {
            ip: e.master.ip,
            n: e.master.name,
            swName: e.name,
            port: `Master`,
            icon: `fa-server`,
            mac: e.master.mac,
          }),
          e.client?.ip &&
            (r[e.client.ip] = {
              ip: e.client.ip,
              n: e.client.name,
              swName: e.name,
              port: `Client`,
              icon: `fa-box`,
              mac: e.client.mac,
            }),
          (e.cctvs ?? []).forEach((t, n) => {
            t.ip &&
              (r[t.ip] = {
                ip: t.ip,
                n: t.name,
                swName: e.name,
                port: `Cam ${n + 1}`,
                icon: `fa-video`,
                mac: t.mac,
              });
          }));
      }),
    r
  );
}
function l(e, t) {
  if (e === `N/A`) return { totalIps: 0, usedCount: 0, percent: `0.0` };
  let n = parseInt(e.split(`/`)[1], 10),
    r = isNaN(n) ? 0 : 2 ** (32 - n),
    i = Object.values(t).filter((e) => e.ip).length;
  return {
    totalIps: r,
    usedCount: i,
    percent: r > 0 ? ((i / r) * 100).toFixed(1) : `0.0`,
  };
}
var u = 4096;
function d(e, t, n) {
  let [r, i] = e.split(`/`),
    a = 2 ** (32 - parseInt(i, 10)),
    c = o(r),
    l = Math.ceil(a / u),
    d = (t - 1) * u,
    f = Math.min(d + u, a),
    p = [],
    m = Math.floor(d / 256) * 256;
  for (; m < f;) {
    let e = Math.min(m + 256, f),
      t = s(c + m).replace(/\.\d+$/, `.x`),
      r = [];
    for (let t = Math.max(m, d); t < e; t++) {
      let e = s(c + t),
        i = `available`,
        o = `${e} - Available`;
      if (t === 0 || t === 1 || t === a - 1)
        ((i = `reserved`),
          t === 0 && (o = `${e} - Network ID`),
          t === 1 && (o = `${e} - Default Gateway`),
          t === a - 1 && (o = `${e} - Broadcast IP`));
      else if (n[e]) {
        let t = n[e];
        ((i = `used`),
          (o = `${e}\nDevice: ${t.n}\nLoc: ${t.swName} (Port ${t.port})`));
      }
      r.push({ ip: e, status: i, title: o });
    }
    (p.push({ blockLabel: t, ips: r }), (m += 256));
  }
  return { totalPages: l, blocks: p };
}
var f = n();
function p(e) {
  let t = (0, a.c)(23),
    { isOpen: n, onClose: r, onSelect: o, db: s, elevatorDB: l } = e,
    [u, d] = (0, i.useState)(``),
    p,
    m;
  if (
    (t[0] === n
      ? ((p = t[1]), (m = t[2]))
      : ((p = () => {
          n && d(``);
        }),
        (m = [n]),
        (t[0] = n),
        (t[1] = p),
        (t[2] = m)),
    (0, i.useEffect)(p, m),
    !n)
  )
    return null;
  let h;
  if (t[3] !== s || t[4] !== l || t[5] !== u) {
    let e = c(`120`, s, l),
      n = u.trim().toLowerCase();
    ((h = Object.values(e).filter((e) =>
      e.ip
        ? n === `` ||
          e.ip.includes(n) ||
          e.n.toLowerCase().includes(n) ||
          (e.mac ?? ``).toLowerCase().includes(n)
        : !1,
    )),
      (t[3] = s),
      (t[4] = l),
      (t[5] = u),
      (t[6] = h));
  } else h = t[6];
  let g = h,
    _;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_ = (0, f.jsxs)(`h3`, {
        className: `text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
        children: [
          (0, f.jsx)(`i`, { className: `fas fa-search text-emerald-500` }),
          ` Chọn IP từ VLAN 120`,
        ],
      })),
      (t[7] = _))
    : (_ = t[7]);
  let v;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = (0, f.jsx)(`i`, { className: `fas fa-times text-lg` })), (t[8] = v))
    : (v = t[8]);
  let y;
  t[9] === r
    ? (y = t[10])
    : ((y = (0, f.jsxs)(`div`, {
        className: `px-5 py-4 border-b border-slate-100 flex justify-between items-center`,
        children: [
          _,
          (0, f.jsx)(`button`, {
            onClick: r,
            className: `text-slate-400 hover:text-red-500 transition-colors`,
            children: v,
          }),
        ],
      })),
      (t[9] = r),
      (t[10] = y));
  let b;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = (e) => d(e.target.value)), (t[11] = b))
    : (b = t[11]);
  let x;
  t[12] === u
    ? (x = t[13])
    : ((x = (0, f.jsx)(`div`, {
        className: `p-4 border-b border-slate-100 bg-slate-50`,
        children: (0, f.jsx)(`input`, {
          autoFocus: !0,
          value: u,
          onChange: b,
          className: `w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold shadow-sm`,
          placeholder: `Tìm kiếm IP, Tên, MAC...`,
        }),
      })),
      (t[12] = u),
      (t[13] = x));
  let S;
  t[14] !== o || t[15] !== g
    ? ((S =
        g.length === 0
          ? (0, f.jsx)(`div`, {
              className: `p-4 text-center text-xs text-slate-400 font-medium`,
              children: `Không tìm thấy thiết bị nào`,
            })
          : g.map((e) =>
              (0, f.jsxs)(
                `div`,
                {
                  onClick: () => o(e),
                  className: `p-3 mb-2 last:mb-0 bg-white border border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors flex flex-col gap-1`,
                  children: [
                    (0, f.jsxs)(`div`, {
                      className: `flex justify-between items-start`,
                      children: [
                        (0, f.jsx)(`span`, {
                          className: `text-xs font-black text-slate-800`,
                          children: e.n || `Unknown Device`,
                        }),
                        (0, f.jsx)(`span`, {
                          className: `text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200`,
                          children: e.ip,
                        }),
                      ],
                    }),
                    (0, f.jsxs)(`div`, {
                      className: `flex justify-between items-center mt-1`,
                      children: [
                        (0, f.jsxs)(`span`, {
                          className: `text-[9px] text-slate-400 font-bold flex items-center gap-1`,
                          children: [
                            (0, f.jsx)(`i`, {
                              className: `fas ${e.icon ?? ``}`,
                            }),
                            ` `,
                            e.swName,
                          ],
                        }),
                        (0, f.jsx)(`span`, {
                          className: `text-[9px] font-mono text-slate-400 uppercase`,
                          children: e.mac || `NO MAC`,
                        }),
                      ],
                    }),
                  ],
                },
                e.ip,
              ),
            )),
      (t[14] = o),
      (t[15] = g),
      (t[16] = S))
    : (S = t[16]);
  let C;
  t[17] === S
    ? (C = t[18])
    : ((C = (0, f.jsx)(`div`, {
        className: `p-2 overflow-y-auto custom-scroll flex-1`,
        children: S,
      })),
      (t[17] = S),
      (t[18] = C));
  let w;
  return (
    t[19] !== C || t[20] !== y || t[21] !== x
      ? ((w = (0, f.jsx)(`div`, {
          className: `fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[400] flex items-center justify-center`,
          children: (0, f.jsxs)(`div`, {
            className: `bg-white rounded-2xl w-[450px] shadow-2xl flex flex-col max-h-[80vh]`,
            children: [y, x, C],
          }),
        })),
        (t[19] = C),
        (t[20] = y),
        (t[21] = x),
        (t[22] = w))
      : (w = t[22]),
    w
  );
}
export { c as i, d as n, l as r, p as t };
