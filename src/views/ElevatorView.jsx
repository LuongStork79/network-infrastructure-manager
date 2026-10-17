import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import { c as r, l as i, s as a, tn as o } from "./index-QE6I14Fy.js";
import { t as s } from "./elevator-BpwH_0-s.js";
import { t as c } from "./Vlan120Picker-mRn3H8_7.js";
var l = e(t(), 1),
  u = o(),
  d = n();
function f(e) {
  let t = (0, u.c)(73),
    { record: n, isAdmin: r, onEdit: i, registerRef: a } = e,
    o = `elv-card-${n.id}`,
    s;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, d.jsx)(`i`, {
        className: `fas fa-elevator text-indigo-500 bg-indigo-50 p-2 rounded-lg`,
      })),
      (t[0] = s))
    : (s = t[0]);
  let c;
  t[1] === n.name
    ? (c = t[2])
    : ((c = (0, d.jsxs)(`h3`, {
        className: `text-sm font-black text-slate-800 flex items-center gap-2`,
        children: [s, ` `, n.name],
      })),
      (t[1] = n.name),
      (t[2] = c));
  let l;
  t[3] !== r || t[4] !== i || t[5] !== n.id
    ? ((l =
        r &&
        (0, d.jsx)(`button`, {
          onClick: () => i(n.id),
          className: `w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors`,
          children: (0, d.jsx)(`i`, { className: `fas fa-cog` }),
        })),
      (t[3] = r),
      (t[4] = i),
      (t[5] = n.id),
      (t[6] = l))
    : (l = t[6]);
  let f;
  t[7] !== c || t[8] !== l
    ? ((f = (0, d.jsxs)(`div`, {
        className: `flex justify-between items-center mb-8 pb-4 border-b border-slate-100`,
        children: [c, l],
      })),
      (t[7] = c),
      (t[8] = l),
      (t[9] = f))
    : (f = t[9]);
  let p;
  t[10] !== n.id || t[11] !== a
    ? ((p = (e) => a(`master-${n.id}`, e)),
      (t[10] = n.id),
      (t[11] = a),
      (t[12] = p))
    : (p = t[12]);
  let m;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, d.jsx)(`i`, { className: `fas fa-server` })), (t[13] = m))
    : (m = t[13]);
  let h;
  t[14] === n.master.brand
    ? (h = t[15])
    : ((h =
        n.master.brand &&
        (0, d.jsx)(`span`, {
          className: `bg-indigo-100 text-indigo-800 px-1.5 rounded`,
          children: n.master.brand,
        })),
      (t[14] = n.master.brand),
      (t[15] = h));
  let g;
  t[16] === h
    ? (g = t[17])
    : ((g = (0, d.jsxs)(`div`, {
        className: `flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2`,
        children: [m, ` Master Device`, ` `, h],
      })),
      (t[16] = h),
      (t[17] = g));
  let _ = n.master.name || `Master`,
    v;
  t[18] === _
    ? (v = t[19])
    : ((v = (0, d.jsx)(`h4`, {
        className: `text-sm font-black text-slate-800`,
        children: _,
      })),
      (t[18] = _),
      (t[19] = v));
  let y = n.master.ip || `No IP`,
    b;
  t[20] === y
    ? (b = t[21])
    : ((b = (0, d.jsx)(`span`, {
        className: `text-[10px] font-bold text-slate-500`,
        children: y,
      })),
      (t[20] = y),
      (t[21] = b));
  let x = n.master.mac || `No MAC`,
    S;
  t[22] === x
    ? (S = t[23])
    : ((S = (0, d.jsx)(`span`, {
        className: `text-[9px] font-mono text-slate-400 bg-slate-50 px-1 rounded border border-slate-200 uppercase`,
        children: x,
      })),
      (t[22] = x),
      (t[23] = S));
  let C;
  t[24] !== b || t[25] !== S
    ? ((C = (0, d.jsxs)(`div`, {
        className: `flex justify-between items-center mt-2 pt-2 border-t border-slate-100`,
        children: [b, S],
      })),
      (t[24] = b),
      (t[25] = S),
      (t[26] = C))
    : (C = t[26]);
  let w;
  t[27] !== v || t[28] !== C || t[29] !== p || t[30] !== g
    ? ((w = (0, d.jsxs)(`div`, {
        ref: p,
        className: `sw-node-ui !w-[240px] !p-4 !static !translate-y-0 !border-t-indigo-500 shadow-md z-20`,
        children: [g, v, C],
      })),
      (t[27] = v),
      (t[28] = C),
      (t[29] = p),
      (t[30] = g),
      (t[31] = w))
    : (w = t[31]);
  let T;
  t[32] !== n.id || t[33] !== a
    ? ((T = (e) => a(`client-${n.id}`, e)),
      (t[32] = n.id),
      (t[33] = a),
      (t[34] = T))
    : (T = t[34]);
  let E;
  t[35] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = (0, d.jsx)(`i`, { className: `fas fa-box` })), (t[35] = E))
    : (E = t[35]);
  let D;
  t[36] === n.client.brand
    ? (D = t[37])
    : ((D =
        n.client.brand &&
        (0, d.jsx)(`span`, {
          className: `bg-amber-100 text-amber-800 px-1.5 rounded`,
          children: n.client.brand,
        })),
      (t[36] = n.client.brand),
      (t[37] = D));
  let O;
  t[38] === D
    ? (O = t[39])
    : ((O = (0, d.jsxs)(`div`, {
        className: `flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2`,
        children: [E, ` Client (Cabin)`, ` `, D],
      })),
      (t[38] = D),
      (t[39] = O));
  let k = n.client.name || `Client`,
    A;
  t[40] === k
    ? (A = t[41])
    : ((A = (0, d.jsx)(`h4`, {
        className: `text-sm font-black text-slate-800`,
        children: k,
      })),
      (t[40] = k),
      (t[41] = A));
  let j = n.client.ip || `No IP`,
    M;
  t[42] === j
    ? (M = t[43])
    : ((M = (0, d.jsx)(`span`, {
        className: `text-[10px] font-bold text-slate-500`,
        children: j,
      })),
      (t[42] = j),
      (t[43] = M));
  let N = n.client.mac || `No MAC`,
    P;
  t[44] === N
    ? (P = t[45])
    : ((P = (0, d.jsx)(`span`, {
        className: `text-[9px] font-mono text-slate-400 bg-slate-50 px-1 rounded border border-slate-200 uppercase`,
        children: N,
      })),
      (t[44] = N),
      (t[45] = P));
  let F;
  t[46] !== M || t[47] !== P
    ? ((F = (0, d.jsxs)(`div`, {
        className: `flex justify-between items-center mt-2 pt-2 border-t border-slate-100`,
        children: [M, P],
      })),
      (t[46] = M),
      (t[47] = P),
      (t[48] = F))
    : (F = t[48]);
  let I;
  t[49] !== T || t[50] !== O || t[51] !== A || t[52] !== F
    ? ((I = (0, d.jsxs)(`div`, {
        ref: T,
        className: `sw-node-ui !w-[240px] !p-4 !static !translate-y-0 !border-t-amber-500 shadow-md z-20`,
        children: [O, A, F],
      })),
      (t[49] = T),
      (t[50] = O),
      (t[51] = A),
      (t[52] = F),
      (t[53] = I))
    : (I = t[53]);
  let L;
  t[54] === n.cctvs
    ? (L = t[55])
    : ((L = n.cctvs ?? []), (t[54] = n.cctvs), (t[55] = L));
  let R;
  if (t[56] !== n.id || t[57] !== a || t[58] !== L) {
    let e;
    (t[60] !== n.id || t[61] !== a
      ? ((e = (e, t) =>
          (0, d.jsxs)(
            `div`,
            {
              ref: (e) => a(`cam-${n.id}-${t}`, e),
              className: `bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-col items-center w-[130px] shadow-sm relative group cursor-default hover:bg-emerald-100 transition-colors`,
              children: [
                (0, d.jsx)(`div`, {
                  className: `absolute -right-1 -top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white`,
                }),
                (0, d.jsx)(`i`, {
                  className: `fas fa-video text-emerald-600 text-xl mb-2 group-hover:scale-110 transition-transform`,
                }),
                (0, d.jsx)(`span`, {
                  className: `text-[10px] font-black text-slate-800 text-center w-full truncate mb-1`,
                  title: e.name,
                  children: e.name,
                }),
                (0, d.jsx)(`span`, {
                  className: `text-[9px] font-bold text-slate-500 bg-white border border-emerald-100 rounded px-1.5 py-0.5`,
                  children: e.ip || `No IP`,
                }),
                (0, d.jsxs)(`div`, {
                  className: `flex items-center gap-1 mt-1 justify-center w-full truncate px-1`,
                  children: [
                    e.brand &&
                      (0, d.jsx)(`span`, {
                        className: `text-[8px] font-black text-emerald-700 bg-emerald-100 px-1 rounded truncate shrink-0 max-w-[50px]`,
                        children: e.brand,
                      }),
                    (0, d.jsx)(`span`, {
                      className: `text-[8px] font-mono text-slate-400 truncate`,
                      children: e.mac || `No MAC`,
                    }),
                  ],
                }),
              ],
            },
            t,
          )),
        (t[60] = n.id),
        (t[61] = a),
        (t[62] = e))
      : (e = t[62]),
      (R = L.map(e)),
      (t[56] = n.id),
      (t[57] = a),
      (t[58] = L),
      (t[59] = R));
  } else R = t[59];
  let z;
  t[63] === R
    ? (z = t[64])
    : ((z = (0, d.jsx)(`div`, {
        className: `w-full flex gap-4 justify-center flex-wrap relative z-20`,
        children: R,
      })),
      (t[63] = R),
      (t[64] = z));
  let B;
  t[65] !== w || t[66] !== I || t[67] !== z
    ? ((B = (0, d.jsxs)(`div`, {
        className: `flex flex-col gap-16 relative items-center flex-1`,
        children: [w, I, z],
      })),
      (t[65] = w),
      (t[66] = I),
      (t[67] = z),
      (t[68] = B))
    : (B = t[68]);
  let V;
  return (
    t[69] !== o || t[70] !== B || t[71] !== f
      ? ((V = (0, d.jsxs)(`div`, {
          id: o,
          className: `bg-white border border-slate-200 rounded-3xl shadow-sm p-6 w-[360px] flex flex-col relative transition-all hover:shadow-lg`,
          children: [f, B],
        })),
        (t[69] = o),
        (t[70] = B),
        (t[71] = f),
        (t[72] = V))
      : (V = t[72]),
    V
  );
}
function p(e) {
  let t = (0, u.c)(12),
    { records: n, isAdmin: r, onEdit: i, registerRef: a } = e;
  if (n.length === 0) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, d.jsxs)(`div`, {
            className: `h-full flex flex-col items-center justify-center text-center opacity-40 w-full mt-32`,
            children: [
              (0, d.jsx)(`i`, {
                className: `fas fa-elevator text-6xl mb-6 text-slate-400`,
              }),
              (0, d.jsx)(`p`, {
                className: `text-sm font-bold text-slate-500 uppercase tracking-widest`,
                children: `Chưa có thang máy nào`,
              }),
            ],
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  let o;
  if (t[1] !== r || t[2] !== i || t[3] !== n || t[4] !== a) {
    let e;
    (t[6] !== r || t[7] !== i || t[8] !== a
      ? ((e = (e) =>
          (0, d.jsx)(
            f,
            { record: e, isAdmin: r, onEdit: i, registerRef: a },
            e.id,
          )),
        (t[6] = r),
        (t[7] = i),
        (t[8] = a),
        (t[9] = e))
      : (e = t[9]),
      (o = n.map(e)),
      (t[1] = r),
      (t[2] = i),
      (t[3] = n),
      (t[4] = a),
      (t[5] = o));
  } else o = t[5];
  let s;
  return (
    t[10] === o
      ? (s = t[11])
      : ((s = (0, d.jsx)(`div`, {
          id: `elevator-grid`,
          className: `flex flex-wrap gap-12 justify-center w-full relative z-10 pt-4`,
          children: o,
        })),
        (t[10] = o),
        (t[11] = s)),
    s
  );
}
function m(e) {
  let t = (0, u.c)(17),
    { data: n } = e,
    r;
  t[0] !== n.height || t[1] !== n.width
    ? ((r = {
        top: 0,
        left: 0,
        zIndex: 20,
        overflow: `visible`,
        opacity: 1,
        width: n.width,
        height: n.height,
      }),
      (t[0] = n.height),
      (t[1] = n.width),
      (t[2] = r))
    : (r = t[2]);
  let i = n.width,
    a = n.height,
    o = `0 0 ${n.width} ${n.height}`,
    s;
  t[3] === n.segments
    ? (s = t[4])
    : ((s = n.segments.map(_)), (t[3] = n.segments), (t[4] = s));
  let c;
  t[5] === n.circles
    ? (c = t[6])
    : ((c = n.circles.map(g)), (t[5] = n.circles), (t[6] = c));
  let l;
  t[7] === n.labels
    ? (l = t[8])
    : ((l = n.labels.map(h)), (t[7] = n.labels), (t[8] = l));
  let f;
  return (
    t[9] !== n.height ||
    t[10] !== n.width ||
    t[11] !== r ||
    t[12] !== o ||
    t[13] !== s ||
    t[14] !== c ||
    t[15] !== l
      ? ((f = (0, d.jsxs)(`svg`, {
          className: `topology-lines pointer-events-none absolute`,
          style: r,
          width: i,
          height: a,
          viewBox: o,
          children: [s, c, l],
        })),
        (t[9] = n.height),
        (t[10] = n.width),
        (t[11] = r),
        (t[12] = o),
        (t[13] = s),
        (t[14] = c),
        (t[15] = l),
        (t[16] = f))
      : (f = t[16]),
    f
  );
}
function h(e, t) {
  let n = e.text.length * 6 + 12;
  return (0, d.jsxs)(
    `g`,
    {
      children: [
        (0, d.jsx)(`rect`, {
          x: e.x - n / 2,
          y: e.y - 9,
          width: n,
          height: 18,
          rx: 6,
          ry: 6,
          fill: e.bg,
        }),
        (0, d.jsx)(`text`, {
          x: e.x,
          y: e.y + 3,
          textAnchor: `middle`,
          fontSize: 10,
          fontWeight: 800,
          fontFamily: `Plus Jakarta Sans, sans-serif`,
          fill: e.color,
          children: e.text,
        }),
      ],
    },
    t,
  );
}
function g(e, t) {
  return (0, d.jsx)(`circle`, { cx: e.cx, cy: e.cy, r: e.r, fill: e.fill }, t);
}
function _(e) {
  return (0, d.jsx)(
    `path`,
    {
      d: e.pathD,
      stroke: e.stroke,
      strokeWidth: e.strokeWidth,
      fill: `none`,
      strokeDasharray: e.dashArray ?? void 0,
      strokeLinecap: e.dashArray ? void 0 : `round`,
      opacity: e.opacity,
    },
    e.key,
  );
}
var v = { width: 0, height: 0, segments: [], circles: [], labels: [] };
function y(e) {
  let t = (0, u.c)(5),
    { records: n, nodeRefs: r, containerRef: i } = e,
    [a, o] = (0, l.useState)(v),
    s,
    c;
  return (
    t[0] !== i || t[1] !== r || t[2] !== n
      ? ((s = () => {
          let e = !1,
            t = function (e, t) {
              let n = t.getBoundingClientRect(),
                r = e.getBoundingClientRect();
              return {
                x: r.left - n.left + t.scrollLeft,
                y: r.top - n.top + t.scrollTop,
                w: r.width,
                h: r.height,
              };
            };
          function a() {
            if (e) return;
            let s = i.current;
            if (!s) return;
            let c = s.querySelector(`#elevator-grid`),
              l = Math.max(c?.scrollWidth ?? s.scrollWidth, s.clientWidth),
              u = Math.max(c?.scrollHeight ?? s.scrollHeight, s.clientHeight);
            if (l <= 0 || u <= 0) {
              requestAnimationFrame(a);
              return;
            }
            let d = [],
              f = [],
              p = [],
              m = !0;
            (n.forEach((e) => {
              let n = r.get(`master-${e.id}`),
                i = r.get(`client-${e.id}`);
              if (!n || !i) return;
              let a = t(n, s),
                o = t(i, s);
              (a.x !== 0 || a.y !== 0) && (m = !1);
              let c = a.x + a.w / 2,
                l = a.y + a.h,
                u = o.x + o.w / 2,
                h = o.y;
              d.push({
                key: `logical-${e.id}`,
                pathD: `M ${c} ${l} L ${u} ${h}`,
                stroke: `#6366f1`,
                strokeWidth: 3,
                dashArray: `8,10`,
                opacity: 0.9,
              });
              let g = (c + u) / 2,
                _ = (l + h) / 2;
              (f.push({ cx: g, cy: _, r: 5, fill: `#6366f1` }),
                p.push({
                  x: g + 35,
                  y: _,
                  text: `Logical`,
                  bg: `#eef2ff`,
                  color: `#4f46e5`,
                }));
              let v = u,
                y = o.y + o.h,
                b = e.cctvs ?? [];
              if (
                (b.forEach((n, i) => {
                  let a = r.get(`cam-${e.id}-${i}`);
                  if (!a) return;
                  let o = t(a, s),
                    c = o.x + o.w / 2,
                    l = o.y,
                    u = (y + l) / 2,
                    p =
                      Math.abs(v - c) < 4
                        ? `M ${v} ${y} L ${c} ${l}`
                        : `M ${v} ${y} C ${v} ${u}, ${c} ${u}, ${c} ${l}`;
                  (d.push({
                    key: `wired-${e.id}-${i}`,
                    pathD: p,
                    stroke: `#10b981`,
                    strokeWidth: 3,
                    dashArray: null,
                    opacity: 0.85,
                  }),
                    f.push({ cx: c, cy: l, r: 4, fill: `#10b981` }));
                }),
                b.length > 0)
              ) {
                let n = r.get(`cam-${e.id}-0`);
                if (n) {
                  let e = t(n, s),
                    r = (v + e.x + e.w / 2) / 2,
                    i = (y + e.y) / 2;
                  p.push({
                    x: r + 32,
                    y: i,
                    text: `Wired`,
                    bg: `#ecfdf5`,
                    color: `#059669`,
                  });
                }
              }
            }),
              e ||
                o({ width: l, height: u, segments: d, circles: f, labels: p }),
              m && n.length > 0 && setTimeout(a, 100));
          }
          let s = setTimeout(() => {
              (a(), setTimeout(a, 500));
            }, 100),
            c = i.current,
            l = c ? new ResizeObserver(() => a()) : null;
          return (
            c && l && l.observe(c),
            document.fonts?.ready?.then(() => {
              e || a();
            }),
            () => {
              ((e = !0), clearTimeout(s), l?.disconnect());
            }
          );
        }),
        (c = [n, r, i]),
        (t[0] = i),
        (t[1] = r),
        (t[2] = n),
        (t[3] = s),
        (t[4] = c))
      : ((s = t[3]), (c = t[4])),
    (0, l.useEffect)(s, c),
    a
  );
}
function b(e) {
  let t = (0, u.c)(27),
    { rows: n, onChange: r, onOpenPicker: i } = e,
    a;
  t[0] !== r || t[1] !== n
    ? ((a = function (e, t, i) {
        r(n.map((n, r) => (r === e ? { ...n, [t]: i } : n)));
      }),
      (t[0] = r),
      (t[1] = n),
      (t[2] = a))
    : (a = t[2]);
  let o = a,
    c;
  t[3] !== r || t[4] !== n
    ? ((c = function (e) {
        r(n.filter((t, n) => n !== e));
      }),
      (t[3] = r),
      (t[4] = n),
      (t[5] = c))
    : (c = t[5]);
  let l = c,
    f;
  t[6] !== r || t[7] !== n
    ? ((f = function () {
        r([...n, { name: ``, ip: ``, brand: ``, mac: `` }]);
      }),
      (t[6] = r),
      (t[7] = n),
      (t[8] = f))
    : (f = t[8]);
  let p = f,
    m;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, d.jsxs)(`h4`, {
        className: `text-xs font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1`,
        children: [
          (0, d.jsx)(`i`, { className: `fas fa-video` }),
          ` CCTV Cameras`,
        ],
      })),
      (t[9] = m))
    : (m = t[9]);
  let h;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = (0, d.jsx)(`i`, { className: `fas fa-plus` })), (t[10] = h))
    : (h = t[10]);
  let g;
  t[11] === p
    ? (g = t[12])
    : ((g = (0, d.jsxs)(`div`, {
        className: `flex justify-between items-center mb-3`,
        children: [
          m,
          (0, d.jsxs)(`button`, {
            onClick: p,
            className: `text-[10px] bg-emerald-500 text-white px-2 py-1 rounded font-bold hover:bg-emerald-600 transition-colors shadow-sm`,
            children: [h, ` Thêm Camera`],
          }),
        ],
      })),
      (t[11] = p),
      (t[12] = g));
  let _;
  if (t[13] !== i || t[14] !== l || t[15] !== n || t[16] !== o) {
    let e;
    (t[18] !== i || t[19] !== l || t[20] !== o
      ? ((e = (e, t) =>
          (0, d.jsxs)(
            `div`,
            {
              className: `flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl relative`,
              children: [
                (0, d.jsx)(`button`, {
                  onClick: () => l(t),
                  className: `absolute top-2 right-2 text-red-400 hover:text-red-600 z-10`,
                  children: (0, d.jsx)(`i`, { className: `fas fa-times` }),
                }),
                (0, d.jsx)(`div`, {
                  className: `flex gap-2 items-center w-full pr-6`,
                  children: (0, d.jsxs)(`button`, {
                    onClick: () => i(t),
                    className: `w-full py-1.5 px-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 shadow-sm`,
                    children: [
                      (0, d.jsx)(`i`, { className: `fas fa-search` }),
                      ` Tìm IP (VLAN 120)`,
                    ],
                  }),
                }),
                (0, d.jsxs)(`div`, {
                  className: `flex gap-2 items-center w-full`,
                  children: [
                    (0, d.jsx)(`input`, {
                      value: e.name,
                      onChange: (e) => o(t, `name`, e.target.value),
                      placeholder: `Tên Camera`,
                      className: `flex-[1.5] p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:border-indigo-500`,
                    }),
                    (0, d.jsx)(`input`, {
                      value: e.ip,
                      onChange: (e) => o(t, `ip`, e.target.value),
                      placeholder: `IP Address`,
                      className: `flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:border-indigo-500`,
                    }),
                  ],
                }),
                (0, d.jsxs)(`div`, {
                  className: `flex gap-2 items-center w-full`,
                  children: [
                    (0, d.jsx)(`input`, {
                      value: e.brand,
                      onChange: (e) => o(t, `brand`, e.target.value),
                      placeholder: `Thương hiệu`,
                      className: `flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:border-indigo-500`,
                    }),
                    (0, d.jsx)(`input`, {
                      value: e.mac,
                      onChange: (e) => o(t, `mac`, s(e.target.value)),
                      maxLength: 17,
                      placeholder: `MAC Address`,
                      className: `flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold uppercase focus:border-indigo-500`,
                    }),
                  ],
                }),
              ],
            },
            t,
          )),
        (t[18] = i),
        (t[19] = l),
        (t[20] = o),
        (t[21] = e))
      : (e = t[21]),
      (_ = n.map(e)),
      (t[13] = i),
      (t[14] = l),
      (t[15] = n),
      (t[16] = o),
      (t[17] = _));
  } else _ = t[17];
  let v;
  t[22] === _
    ? (v = t[23])
    : ((v = (0, d.jsx)(`div`, {
        className: `space-y-2 max-h-32 overflow-y-auto custom-scroll pr-1`,
        children: _,
      })),
      (t[22] = _),
      (t[23] = v));
  let y;
  return (
    t[24] !== g || t[25] !== v
      ? ((y = (0, d.jsxs)(`div`, {
          className: `bg-emerald-50/50 p-4 rounded-xl border border-emerald-100`,
          children: [g, v],
        })),
        (t[24] = g),
        (t[25] = v),
        (t[26] = y))
      : (y = t[26]),
    y
  );
}
var x = { name: ``, brand: ``, ip: ``, mac: `` },
  S = { name: ``, ip: ``, brand: ``, mac: `` };
function C(e) {
  let t = (0, u.c)(114),
    { record: n, db: r, elevatorDB: i, onSave: o, onDelete: f, onClose: p } = e,
    m = a(D),
    [h, g] = (0, l.useState)(n?.name ?? ``),
    _;
  t[0] === n
    ? (_ = t[1])
    : ((_ = n ? { ...n.master, brand: n.master.brand ?? `` } : x),
      (t[0] = n),
      (t[1] = _));
  let [v, y] = (0, l.useState)(_),
    C;
  t[2] === n
    ? (C = t[3])
    : ((C = n ? { ...n.client, brand: n.client.brand ?? `` } : x),
      (t[2] = n),
      (t[3] = C));
  let [O, k] = (0, l.useState)(C),
    A;
  t[4] === n
    ? (A = t[5])
    : ((A = n && (n.cctvs ?? []).length > 0 ? (n.cctvs ?? []).map(E) : [S]),
      (t[4] = n),
      (t[5] = A));
  let [j, M] = (0, l.useState)(A),
    [N, P] = (0, l.useState)(null),
    F;
  t[6] !== j ||
  t[7] !== O.brand ||
  t[8] !== O.ip ||
  t[9] !== O.mac ||
  t[10] !== O.name ||
  t[11] !== v.brand ||
  t[12] !== v.ip ||
  t[13] !== v.mac ||
  t[14] !== v.name ||
  t[15] !== h ||
  t[16] !== o ||
  t[17] !== n?.id ||
  t[18] !== m
    ? ((F = function () {
        let e = h.trim();
        if (!e) {
          m(`Vui lòng nhập tên thang máy`, `error`);
          return;
        }
        let t = j.filter(T).map(w);
        o({
          id: n?.id ?? `elv-${Date.now()}`,
          name: e,
          master: {
            name: v.name.trim(),
            brand: v.brand.trim(),
            ip: v.ip.trim(),
            mac: v.mac.trim(),
          },
          client: {
            name: O.name.trim(),
            brand: O.brand.trim(),
            ip: O.ip.trim(),
            mac: O.mac.trim(),
          },
          cctvs: t,
        });
      }),
      (t[6] = j),
      (t[7] = O.brand),
      (t[8] = O.ip),
      (t[9] = O.mac),
      (t[10] = O.name),
      (t[11] = v.brand),
      (t[12] = v.ip),
      (t[13] = v.mac),
      (t[14] = v.name),
      (t[15] = h),
      (t[16] = o),
      (t[17] = n?.id),
      (t[18] = m),
      (t[19] = F))
    : (F = t[19]);
  let I = F,
    L;
  t[20] !== f || t[21] !== n || t[22] !== m
    ? ((L = function () {
        n &&
          m(`Bạn có chắc chắn muốn xóa thang máy này?`, `confirm`, () =>
            f(n.id),
          );
      }),
      (t[20] = f),
      (t[21] = n),
      (t[22] = m),
      (t[23] = L))
    : (L = t[23]);
  let R = L,
    z;
  t[24] === N
    ? (z = t[25])
    : ((z = function (e) {
        (N === `master`
          ? y((t) => ({
              ...t,
              ip: e.ip ?? t.ip,
              name: e.n || t.name,
              mac: e.mac || t.mac,
            }))
          : N === `client`
            ? k((t) => ({
                ...t,
                ip: e.ip ?? t.ip,
                name: e.n || t.name,
                mac: e.mac || t.mac,
              }))
            : typeof N == `number` &&
              M((t) =>
                t.map((t, n) =>
                  n === N
                    ? {
                        ...t,
                        ip: e.ip ?? t.ip,
                        name: e.n || t.name,
                        mac: e.mac || t.mac,
                      }
                    : t,
                ),
              ),
          P(null));
      }),
      (t[24] = N),
      (t[25] = z));
  let B = z,
    V;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = { display: `flex` }), (t[26] = V))
    : (V = t[26]);
  let ee;
  t[27] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ee = {
        width: 700,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[27] = ee))
    : (ee = t[27]);
  let H;
  t[28] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, d.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
        children: (0, d.jsx)(`i`, { className: `fas fa-elevator` }),
      })),
      (t[28] = H))
    : (H = t[28]);
  let U = n ? `Chỉnh sửa Thang Máy` : `Thêm Thang Máy Mới`,
    W;
  t[29] === U
    ? (W = t[30])
    : ((W = (0, d.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [H, (0, d.jsx)(`span`, { children: U })],
      })),
      (t[29] = U),
      (t[30] = W));
  let G;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((G = (0, d.jsx)(`i`, { className: `fas fa-times` })), (t[31] = G))
    : (G = t[31]);
  let K;
  t[32] === p
    ? (K = t[33])
    : ((K = (0, d.jsx)(`button`, {
        onClick: p,
        title: `Đóng`,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100 shrink-0 ml-2`,
        children: G,
      })),
      (t[32] = p),
      (t[33] = K));
  let q;
  t[34] !== W || t[35] !== K
    ? ((q = (0, d.jsxs)(`div`, {
        className: `flex justify-between items-center mb-6 shrink-0`,
        children: [W, K],
      })),
      (t[34] = W),
      (t[35] = K),
      (t[36] = q))
    : (q = t[36]);
  let J;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((J = (0, d.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Tên Thang Máy`,
      })),
      (t[37] = J))
    : (J = t[37]);
  let te;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((te = (e) => g(e.target.value)), (t[38] = te))
    : (te = t[38]);
  let Y;
  t[39] === h
    ? (Y = t[40])
    : ((Y = (0, d.jsxs)(`div`, {
        children: [
          J,
          (0, d.jsx)(`input`, {
            value: h,
            onChange: te,
            placeholder: `Thang máy 1`,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-bold outline-none`,
          }),
        ],
      })),
      (t[39] = h),
      (t[40] = Y));
  let ne, X;
  t[41] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ne = (0, d.jsxs)(`span`, {
        className: `flex items-center gap-1`,
        children: [
          (0, d.jsx)(`i`, { className: `fas fa-server` }),
          ` Master Device`,
        ],
      })),
      (X = () => P(`master`)),
      (t[41] = ne),
      (t[42] = X))
    : ((ne = t[41]), (X = t[42]));
  let Z;
  t[43] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Z = (0, d.jsxs)(`h4`, {
        className: `text-xs font-black text-indigo-800 mb-3 uppercase tracking-widest flex items-center justify-between`,
        children: [
          ne,
          (0, d.jsxs)(`button`, {
            onClick: X,
            className: `text-[9px] font-black bg-indigo-500 text-white px-2 py-1 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-1`,
            children: [
              (0, d.jsx)(`i`, { className: `fas fa-search` }),
              ` Tìm IP`,
            ],
          }),
        ],
      })),
      (t[43] = Z))
    : (Z = t[43]);
  let Q;
  t[44] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Q = (e) => y((t) => ({ ...t, name: e.target.value }))), (t[44] = Q))
    : (Q = t[44]);
  let $;
  t[45] === v.name
    ? ($ = t[46])
    : (($ = (0, d.jsx)(`input`, {
        value: v.name,
        onChange: Q,
        placeholder: `Tên Master`,
        className: `w-full mb-2 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold`,
      })),
      (t[45] = v.name),
      (t[46] = $));
  let re;
  t[47] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((re = (e) => y((t) => ({ ...t, brand: e.target.value }))), (t[47] = re))
    : (re = t[47]);
  let ie;
  t[48] === v.brand
    ? (ie = t[49])
    : ((ie = (0, d.jsx)(`input`, {
        value: v.brand,
        onChange: re,
        placeholder: `Thương hiệu (VD: Cisco)`,
        className: `w-full mb-2 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold`,
      })),
      (t[48] = v.brand),
      (t[49] = ie));
  let ae;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ae = (e) => y((t) => ({ ...t, ip: e.target.value }))), (t[50] = ae))
    : (ae = t[50]);
  let oe;
  t[51] === v.ip
    ? (oe = t[52])
    : ((oe = (0, d.jsx)(`input`, {
        value: v.ip,
        onChange: ae,
        placeholder: `IP Address`,
        className: `w-full mb-2 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold`,
      })),
      (t[51] = v.ip),
      (t[52] = oe));
  let se;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((se = (e) => y((t) => ({ ...t, mac: s(e.target.value) }))), (t[53] = se))
    : (se = t[53]);
  let ce;
  t[54] === v.mac
    ? (ce = t[55])
    : ((ce = (0, d.jsx)(`input`, {
        value: v.mac,
        onChange: se,
        maxLength: 17,
        placeholder: `MAC Address`,
        className: `w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold uppercase`,
      })),
      (t[54] = v.mac),
      (t[55] = ce));
  let le;
  t[56] !== $ || t[57] !== ie || t[58] !== oe || t[59] !== ce
    ? ((le = (0, d.jsxs)(`div`, {
        className: `bg-indigo-50/50 p-4 rounded-xl border border-indigo-100`,
        children: [Z, $, ie, oe, ce],
      })),
      (t[56] = $),
      (t[57] = ie),
      (t[58] = oe),
      (t[59] = ce),
      (t[60] = le))
    : (le = t[60]);
  let ue, de;
  t[61] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ue = (0, d.jsxs)(`span`, {
        className: `flex items-center gap-1`,
        children: [
          (0, d.jsx)(`i`, { className: `fas fa-box` }),
          ` Client Device`,
        ],
      })),
      (de = () => P(`client`)),
      (t[61] = ue),
      (t[62] = de))
    : ((ue = t[61]), (de = t[62]));
  let fe;
  t[63] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((fe = (0, d.jsxs)(`h4`, {
        className: `text-xs font-black text-amber-800 mb-3 uppercase tracking-widest flex items-center justify-between`,
        children: [
          ue,
          (0, d.jsxs)(`button`, {
            onClick: de,
            className: `text-[9px] font-black bg-amber-500 text-white px-2 py-1 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-1`,
            children: [
              (0, d.jsx)(`i`, { className: `fas fa-search` }),
              ` Tìm IP`,
            ],
          }),
        ],
      })),
      (t[63] = fe))
    : (fe = t[63]);
  let pe;
  t[64] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((pe = (e) => k((t) => ({ ...t, name: e.target.value }))), (t[64] = pe))
    : (pe = t[64]);
  let me;
  t[65] === O.name
    ? (me = t[66])
    : ((me = (0, d.jsx)(`input`, {
        value: O.name,
        onChange: pe,
        placeholder: `Tên Client`,
        className: `w-full mb-2 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold`,
      })),
      (t[65] = O.name),
      (t[66] = me));
  let he;
  t[67] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((he = (e) => k((t) => ({ ...t, brand: e.target.value }))), (t[67] = he))
    : (he = t[67]);
  let ge;
  t[68] === O.brand
    ? (ge = t[69])
    : ((ge = (0, d.jsx)(`input`, {
        value: O.brand,
        onChange: he,
        placeholder: `Thương hiệu (VD: Hikvision)`,
        className: `w-full mb-2 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold`,
      })),
      (t[68] = O.brand),
      (t[69] = ge));
  let _e;
  t[70] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_e = (e) => k((t) => ({ ...t, ip: e.target.value }))), (t[70] = _e))
    : (_e = t[70]);
  let ve;
  t[71] === O.ip
    ? (ve = t[72])
    : ((ve = (0, d.jsx)(`input`, {
        value: O.ip,
        onChange: _e,
        placeholder: `IP Address`,
        className: `w-full mb-2 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold`,
      })),
      (t[71] = O.ip),
      (t[72] = ve));
  let ye;
  t[73] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ye = (e) => k((t) => ({ ...t, mac: s(e.target.value) }))), (t[73] = ye))
    : (ye = t[73]);
  let be;
  t[74] === O.mac
    ? (be = t[75])
    : ((be = (0, d.jsx)(`input`, {
        value: O.mac,
        onChange: ye,
        maxLength: 17,
        placeholder: `MAC Address`,
        className: `w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold uppercase`,
      })),
      (t[74] = O.mac),
      (t[75] = be));
  let xe;
  t[76] !== me || t[77] !== ge || t[78] !== ve || t[79] !== be
    ? ((xe = (0, d.jsxs)(`div`, {
        className: `bg-amber-50/50 p-4 rounded-xl border border-amber-100`,
        children: [fe, me, ge, ve, be],
      })),
      (t[76] = me),
      (t[77] = ge),
      (t[78] = ve),
      (t[79] = be),
      (t[80] = xe))
    : (xe = t[80]);
  let Se;
  t[81] !== le || t[82] !== xe
    ? ((Se = (0, d.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-4`,
        children: [le, xe],
      })),
      (t[81] = le),
      (t[82] = xe),
      (t[83] = Se))
    : (Se = t[83]);
  let Ce;
  t[84] === j
    ? (Ce = t[85])
    : ((Ce = (0, d.jsx)(b, { rows: j, onChange: M, onOpenPicker: P })),
      (t[84] = j),
      (t[85] = Ce));
  let we;
  t[86] !== Y || t[87] !== Se || t[88] !== Ce
    ? ((we = (0, d.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll`,
        children: (0, d.jsxs)(`div`, {
          className: `space-y-6`,
          children: [Y, Se, Ce],
        }),
      })),
      (t[86] = Y),
      (t[87] = Se),
      (t[88] = Ce),
      (t[89] = we))
    : (we = t[89]);
  let Te;
  t[90] !== R || t[91] !== n
    ? ((Te =
        n &&
        (0, d.jsx)(`button`, {
          onClick: R,
          className: `flex-[0.5] py-3 bg-red-50 border border-red-200 text-sm font-bold text-red-600 hover:bg-red-100 rounded-xl transition-all`,
          children: `Xóa`,
        })),
      (t[90] = R),
      (t[91] = n),
      (t[92] = Te))
    : (Te = t[92]);
  let Ee;
  t[93] === p
    ? (Ee = t[94])
    : ((Ee = (0, d.jsx)(`button`, {
        onClick: p,
        className: `flex-1 py-3 bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all`,
        children: `Hủy`,
      })),
      (t[93] = p),
      (t[94] = Ee));
  let De;
  t[95] === I
    ? (De = t[96])
    : ((De = (0, d.jsx)(`button`, {
        onClick: I,
        className: `flex-1 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-[0_4px_14px_rgba(99,102,241,0.3)]`,
        children: `Lưu cấu hình`,
      })),
      (t[95] = I),
      (t[96] = De));
  let Oe;
  t[97] !== Te || t[98] !== Ee || t[99] !== De
    ? ((Oe = (0, d.jsxs)(`div`, {
        className: `flex gap-3 mt-8 pt-6 border-t border-slate-100 shrink-0`,
        children: [Te, Ee, De],
      })),
      (t[97] = Te),
      (t[98] = Ee),
      (t[99] = De),
      (t[100] = Oe))
    : (Oe = t[100]);
  let ke;
  t[101] !== q || t[102] !== we || t[103] !== Oe
    ? ((ke = (0, d.jsx)(`div`, {
        className: `modal`,
        style: V,
        children: (0, d.jsxs)(`div`, {
          className: `modal-content shadow-2xl`,
          style: ee,
          children: [q, we, Oe],
        }),
      })),
      (t[101] = q),
      (t[102] = we),
      (t[103] = Oe),
      (t[104] = ke))
    : (ke = t[104]);
  let Ae = N !== null,
    je;
  t[105] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((je = () => P(null)), (t[105] = je))
    : (je = t[105]);
  let Me;
  t[106] !== r || t[107] !== i || t[108] !== B || t[109] !== Ae
    ? ((Me = (0, d.jsx)(c, {
        isOpen: Ae,
        onClose: je,
        db: r,
        elevatorDB: i,
        onSelect: B,
      })),
      (t[106] = r),
      (t[107] = i),
      (t[108] = B),
      (t[109] = Ae),
      (t[110] = Me))
    : (Me = t[110]);
  let Ne;
  return (
    t[111] !== ke || t[112] !== Me
      ? ((Ne = (0, d.jsxs)(d.Fragment, { children: [ke, Me] })),
        (t[111] = ke),
        (t[112] = Me),
        (t[113] = Ne))
      : (Ne = t[113]),
    Ne
  );
}
function w(e) {
  return {
    name: e.name.trim() || `Camera`,
    ip: e.ip.trim(),
    brand: e.brand.trim(),
    mac: e.mac.trim(),
  };
}
function T(e) {
  return e.name.trim() || e.ip.trim();
}
function E(e) {
  return {
    name: e.name,
    ip: e.ip ?? ``,
    brand: e.brand ?? ``,
    mac: e.mac ?? ``,
  };
}
function D(e) {
  return e.showDialog;
}
function O(e) {
  let t = (0, u.c)(51),
    { onBack: n, isAdmin: o } = e,
    s = i(I),
    c = i(F),
    f = i(P),
    h = i(N),
    g = a(M),
    _ = (0, l.useRef)(null),
    [v] = (0, l.useState)(j),
    b;
  t[0] === v
    ? (b = t[1])
    : ((b = (e, t) => {
        t ? v.set(e, t) : v.delete(e);
      }),
      (t[0] = v),
      (t[1] = b));
  let x = b,
    S;
  t[2] !== c || t[3] !== v
    ? ((S = { records: c, nodeRefs: v, containerRef: _ }),
      (t[2] = c),
      (t[3] = v),
      (t[4] = S))
    : (S = t[4]);
  let w = y(S),
    [T, E] = (0, l.useState)(`closed`),
    D = r(A),
    O = r(k),
    L,
    R;
  (t[5] !== O || t[6] !== D
    ? ((L = () => {
        if (!D || D.module !== `elevator`) return;
        let { elevatorId: e } = D;
        (setTimeout(() => {
          let t = document.getElementById(`elv-card-${e}`);
          t &&
            (t.scrollIntoView({ behavior: `smooth`, block: `center` }),
            t.classList.remove(`elv-focus-flash`),
            t.classList.add(`elv-focus-flash`),
            setTimeout(() => t.classList.remove(`elv-focus-flash`), 2600));
        }, 50),
          O());
      }),
      (R = [D, O]),
      (t[5] = O),
      (t[6] = D),
      (t[7] = L),
      (t[8] = R))
    : ((L = t[7]), (R = t[8])),
    (0, l.useEffect)(L, R));
  let z;
  t[9] !== o || t[10] !== g
    ? ((z = function () {
        if (!o) {
          g(`Bạn không có quyền thêm thang máy!`, `error`);
          return;
        }
        E(null);
      }),
      (t[9] = o),
      (t[10] = g),
      (t[11] = z))
    : (z = t[11]);
  let B = z,
    V;
  t[12] !== c || t[13] !== o || t[14] !== g
    ? ((V = function (e) {
        if (!o) {
          g(`Bạn không có quyền sửa thang máy!`, `error`);
          return;
        }
        let t = c.find((t) => t.id === e);
        t && E(t);
      }),
      (t[12] = c),
      (t[13] = o),
      (t[14] = g),
      (t[15] = V))
    : (V = t[15]);
  let ee = V,
    H;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, d.jsxs)(`div`, {
        children: [
          (0, d.jsxs)(`h2`, {
            className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
            children: [
              (0, d.jsx)(`div`, {
                className: `w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100`,
                children: (0, d.jsx)(`i`, { className: `fas fa-elevator` }),
              }),
              `Elevator Topology`,
            ],
          }),
          (0, d.jsx)(`p`, {
            className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
            children: `Hệ thống mạng Thang máy`,
          }),
        ],
      })),
      (t[16] = H))
    : (H = t[16]);
  let U;
  t[17] !== B || t[18] !== o
    ? ((U =
        o &&
        (0, d.jsxs)(`button`, {
          onClick: B,
          className: `px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2`,
          children: [
            (0, d.jsx)(`i`, { className: `fas fa-plus` }),
            ` Thêm Thang Máy`,
          ],
        })),
      (t[17] = B),
      (t[18] = o),
      (t[19] = U))
    : (U = t[19]);
  let W;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((W = (0, d.jsx)(`i`, { className: `fas fa-arrow-left` })), (t[20] = W))
    : (W = t[20]);
  let G;
  t[21] === n
    ? (G = t[22])
    : ((G = (0, d.jsxs)(`button`, {
        onClick: n,
        className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
        children: [W, ` Quay lại Topology`],
      })),
      (t[21] = n),
      (t[22] = G));
  let K;
  t[23] !== G || t[24] !== U
    ? ((K = (0, d.jsxs)(`div`, {
        className: `view-header px-8 py-6 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0`,
        children: [
          H,
          (0, d.jsxs)(`div`, {
            className: `view-header-actions flex items-center gap-3`,
            children: [U, G],
          }),
        ],
      })),
      (t[23] = G),
      (t[24] = U),
      (t[25] = K))
    : (K = t[25]);
  let q;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((q = (0, d.jsxs)(`h4`, {
        className: `text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5`,
        children: [
          (0, d.jsx)(`i`, { className: `fas fa-info-circle text-indigo-400` }),
          ` Ý nghĩa kết nối`,
        ],
      })),
      (t[26] = q))
    : (q = t[26]);
  let J;
  t[27] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((J = (0, d.jsx)(`svg`, {
        width: `36`,
        height: `6`,
        className: `shrink-0`,
        children: (0, d.jsx)(`line`, {
          x1: `0`,
          y1: `3`,
          x2: `36`,
          y2: `3`,
          stroke: `#6366f1`,
          strokeWidth: 2.5,
          strokeDasharray: `6,4`,
          strokeLinecap: `round`,
        }),
      })),
      (t[27] = J))
    : (J = t[27]);
  let te;
  t[28] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((te = (0, d.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [
          J,
          (0, d.jsxs)(`span`, {
            className: `text-[10px] font-bold text-slate-700`,
            children: [
              `Nét đứt — Master ↔ Client `,
              (0, d.jsx)(`span`, {
                className: `text-indigo-500`,
                children: `(Logical)`,
              }),
            ],
          }),
        ],
      })),
      (t[28] = te))
    : (te = t[28]);
  let Y;
  t[29] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Y = (0, d.jsx)(`svg`, {
        width: `36`,
        height: `6`,
        className: `shrink-0`,
        children: (0, d.jsx)(`line`, {
          x1: `0`,
          y1: `3`,
          x2: `36`,
          y2: `3`,
          stroke: `#10b981`,
          strokeWidth: 2,
          strokeLinecap: `round`,
        }),
      })),
      (t[29] = Y))
    : (Y = t[29]);
  let ne;
  t[30] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ne = (0, d.jsxs)(`div`, {
        className: `absolute top-4 right-4 z-30 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-3 shadow-md`,
        children: [
          q,
          (0, d.jsxs)(`div`, {
            className: `flex flex-col gap-2.5`,
            children: [
              te,
              (0, d.jsxs)(`div`, {
                className: `flex items-center gap-3`,
                children: [
                  Y,
                  (0, d.jsxs)(`span`, {
                    className: `text-[10px] font-bold text-slate-700`,
                    children: [
                      `Nét liền — Client → CCTV `,
                      (0, d.jsx)(`span`, {
                        className: `text-emerald-500`,
                        children: `(Wired)`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })),
      (t[30] = ne))
    : (ne = t[30]);
  let X;
  t[31] === w
    ? (X = t[32])
    : ((X = (0, d.jsx)(m, { data: w })), (t[31] = w), (t[32] = X));
  let Z;
  t[33] !== c || t[34] !== ee || t[35] !== o || t[36] !== x
    ? ((Z = (0, d.jsx)(p, {
        records: c,
        isAdmin: o,
        onEdit: ee,
        registerRef: x,
      })),
      (t[33] = c),
      (t[34] = ee),
      (t[35] = o),
      (t[36] = x),
      (t[37] = Z))
    : (Z = t[37]);
  let Q;
  t[38] !== X || t[39] !== Z
    ? ((Q = (0, d.jsxs)(`div`, {
        className: `flex-1 overflow-auto custom-scroll p-8 relative`,
        ref: _,
        children: [ne, X, Z],
      })),
      (t[38] = X),
      (t[39] = Z),
      (t[40] = Q))
    : (Q = t[40]);
  let $;
  t[41] !== s || t[42] !== h || t[43] !== c || t[44] !== T || t[45] !== f
    ? (($ =
        T !== `closed` &&
        (0, d.jsx)(C, {
          record: T,
          db: s,
          elevatorDB: c,
          onSave: (e) => {
            (f(e), E(`closed`));
          },
          onDelete: (e) => {
            (h(e), E(`closed`));
          },
          onClose: () => E(`closed`),
        })),
      (t[41] = s),
      (t[42] = h),
      (t[43] = c),
      (t[44] = T),
      (t[45] = f),
      (t[46] = $))
    : ($ = t[46]);
  let re;
  return (
    t[47] !== K || t[48] !== Q || t[49] !== $
      ? ((re = (0, d.jsxs)(`div`, {
          className: `w-full h-full flex flex-col relative bg-slate-50/50`,
          children: [K, Q, $],
        })),
        (t[47] = K),
        (t[48] = Q),
        (t[49] = $),
        (t[50] = re))
      : (re = t[50]),
    re
  );
}
function k(e) {
  return e.clearFocusRequest;
}
function A(e) {
  return e.focusRequest;
}
function j() {
  return new Map();
}
function M(e) {
  return e.showDialog;
}
function N(e) {
  return e.deleteElevator;
}
function P(e) {
  return e.saveElevator;
}
function F(e) {
  return e.ElevatorDB;
}
function I(e) {
  return e.DB;
}
export { O as default };
