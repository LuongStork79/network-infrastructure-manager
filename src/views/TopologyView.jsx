import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Bt as r,
  Gt as i,
  Ht as a,
  Kt as o,
  Rt as s,
  Ut as c,
  Wt as l,
  c as u,
  l as d,
  qt as f,
  r as p,
  tn as m,
  zt as h,
} from "./index-QE6I14Fy.js";
import { useDialogStore } from "../stores/useDialogStore.js";
var g = e(t(), 1);
function _(e) {
  let t = e.filter((e) => e.floor.toLowerCase().includes(`server room`)),
    n = e.filter((e) => !e.floor.toLowerCase().includes(`server room`));
  return [...t, ...n];
}
function v(e) {
  let t = new Set(e.map((e) => e.id)),
    n = new Map(),
    r = new Set();
  e.forEach((e) => {
    if (e.uplinkTarget !== `none` && t.has(e.uplinkTarget)) {
      let t = n.get(e.uplinkTarget) ?? [];
      (t.push(e), n.set(e.uplinkTarget, t), r.add(e.id));
    }
  });
  let i = [],
    a = new Set();
  function o(e) {
    if (!a.has(e.id)) {
      (a.add(e.id), i.push(e));
      for (let t of n.get(e.id) ?? []) o(t);
    }
  }
  return (
    e.forEach((e) => {
      r.has(e.id) || o(e);
    }),
    e.forEach((e) => o(e)),
    i
  );
}
function y(e) {
  let t = { none: [] };
  return (
    e.forEach((e) => {
      let n = e.zone && e.zone.trim() !== `` ? e.zone.trim() : `none`;
      (t[n] || (t[n] = []), t[n].push(e));
    }),
    t
  );
}
function b(e, t) {
  let n = e.zone && e.zone.trim() !== `` ? e.zone.trim() : `none`;
  return `${e.isCore ? `__core__` : t}::${n}`;
}
function x(e) {
  let t = new Map();
  e.forEach((e) =>
    e.switches.forEach((n) => {
      t.set(n.id, b(n, e.floor));
    }),
  );
  let n = new Map();
  return (
    e.forEach((e) =>
      e.switches.forEach((e) => {
        if (e.uplinkTarget === `none`) return;
        let r = t.get(e.id),
          i = t.get(e.uplinkTarget);
        if (!r || !i || r === i) return;
        let a = n.get(r) ?? new Set();
        (a.add(i), n.set(r, a));
      }),
    ),
    n
  );
}
var S = 78,
  C = 62;
function w(e, t = 0) {
  let n = e.length;
  if (n === 0) return { positions: [], width: 0, height: 0 };
  let r = Math.max(1, Math.ceil(Math.sqrt(n * 1.4))),
    i = e.map((e, t) => {
      let n = t % r,
        i = Math.floor(t / r);
      return { id: e.id, x: (n - i) * 168, y: (n + i) * 58 };
    }),
    a = Math.min(...i.map((e) => e.x)) - S - t,
    o = Math.max(...i.map((e) => e.x)) + S + t,
    s = Math.min(...i.map((e) => e.y)) - C - t,
    c = Math.max(...i.map((e) => e.y)) + C + t;
  return {
    positions: i.map((e) => ({ id: e.id, x: e.x - a, y: e.y - s })),
    width: o - a,
    height: c - s,
  };
}
function T(e) {
  return e.startsWith(`__core__::`) ? 90 : 0;
}
var E = 52,
  D = 230,
  O = 85;
function k(e) {
  let t = new Map();
  if (
    (e.forEach((e) =>
      e.switches.forEach((n) => {
        let r = b(n, e.floor),
          i = n.zone && n.zone.trim() !== `` ? n.zone.trim() : `none`,
          a = t.get(r) ?? {
            floor: n.isCore ? `__core__` : e.floor,
            zone: i,
            switches: [],
          };
        (a.switches.push(n), t.set(r, a));
      }),
    ),
    t.size === 0)
  )
    return { slots: [], width: 0, height: 0 };
  let n = x(e),
    r = new Map();
  n.forEach((e, t) => {
    e.forEach((e) => {
      let n = r.get(e) ?? new Set();
      (n.add(t), r.set(e, n));
    });
  });
  let i = new Map(),
    a = new Map(),
    o = [],
    s = [];
  t.forEach((e, t) => {
    t.startsWith(`__core__::`) && (i.set(t, 0), o.push(t), s.push(t));
  });
  let c = 0;
  for (; c < s.length;) {
    let e = s[c++],
      t = i.get(e) ?? 0;
    for (let n of r.get(e) ?? [])
      i.has(n) || (i.set(n, t + 1), a.set(n, e), s.push(n));
  }
  let l = [];
  (t.forEach((e, t) => {
    i.has(t) || (i.set(t, 1), l.push(t));
  }),
    l.sort((e, t) => e.localeCompare(t)));
  let u = new Map();
  (a.forEach((e, t) => {
    let n = u.get(e) ?? [];
    (n.push(t), u.set(e, n));
  }),
    u.forEach((e) => e.sort((e, t) => e.localeCompare(t))));
  let d = new Map();
  function f(e) {
    let t = u.get(e) ?? [],
      n = t.length === 0 ? 1 : t.reduce((e, t) => e + f(t), 0);
    return (d.set(e, n), n);
  }
  let p = [...o.sort((e, t) => e.localeCompare(t)), ...l];
  p.forEach((e) => f(e));
  let m = new Map(),
    h = new Map();
  t.forEach((e, t) => {
    let n = i.get(t) ?? 1,
      { width: r, height: a } = w(e.switches, T(t));
    (m.set(n, (m.get(n) ?? 0) + r + E),
      h.set(n, Math.max(h.get(n) ?? 0, a / 2)));
  });
  let g = Math.max(...i.values()),
    _ = new Map([[0, 0]]),
    v = 0;
  for (let e = 1; e <= g; e++) {
    let t = (m.get(e) ?? 0) / (2 * Math.PI),
      n = (h.get(e - 1) ?? 0) + (h.get(e) ?? 0) + O;
    ((v += Math.max(D, t, n)), _.set(e, v));
  }
  let y = new Map(),
    S = (2 * Math.PI) / p.length;
  p.forEach((e, t) => C(e, t * S, (t + 1) * S));
  function C(e, t, n) {
    y.set(e, (t + n) / 2);
    let r = u.get(e) ?? [];
    if (r.length === 0) return;
    let i = r.reduce((e, t) => e + (d.get(t) ?? 1), 0),
      a = t;
    r.forEach((e) => {
      let r = ((d.get(e) ?? 1) / i) * (n - t);
      (C(e, a, a + r), (a += r));
    });
  }
  for (let e = 1; e <= g; e++) {
    let n = _.get(e) ?? 0;
    if (n <= 0) continue;
    let r = [...t.entries()]
        .filter(([t]) => (i.get(t) ?? 1) === e)
        .map(([e, t]) => ({
          key: e,
          slotWidth: (w(t.switches, T(e)).width + E) / n,
        }))
        .sort((e, t) => (y.get(e.key) ?? 0) - (y.get(t.key) ?? 0)),
      a = 0;
    r.forEach(({ key: e, slotWidth: t }) => {
      (y.set(e, a + t / 2), (a += t));
    });
  }
  let k = [...t.entries()].map(([e, t]) => {
      let n = i.get(e) ?? 1,
        r = _.get(n) ?? 0,
        a = y.get(e) ?? 0,
        { width: o, height: s } = w(t.switches, T(e));
      return {
        key: e,
        floor: t.floor,
        zone: t.zone,
        switches: t.switches,
        tier: n,
        x: r * Math.cos(a),
        y: r * Math.sin(a),
        halfW: o / 2 + 24,
        halfH: s / 2 + 24,
      };
    }),
    A = Math.min(...k.map((e) => e.x - e.halfW)),
    j = Math.max(...k.map((e) => e.x + e.halfW)),
    M = Math.min(...k.map((e) => e.y - e.halfH)),
    ee = Math.max(...k.map((e) => e.y + e.halfH));
  return {
    slots: k.map((e) => ({
      key: e.key,
      floor: e.floor,
      zone: e.zone,
      switches: e.switches,
      tier: e.tier,
      x: e.x - A,
      y: e.y - M,
    })),
    width: j - A,
    height: ee - M,
  };
}
function A(e, t, n) {
  let r = s(e, n),
    i = s(t, n);
  if (!r || !i) return null;
  if (e === t) return { switches: [r], hops: [], hopCount: 0 };
  let a = j(n),
    o = new Map(),
    c = new Set([e]),
    l = [e],
    u = 0,
    d = !1;
  for (; u < l.length && !d;) {
    let e = l[u++];
    for (let n of a.get(e) ?? [])
      if (!c.has(n)) {
        if ((c.add(n), o.set(n, e), n === t)) {
          d = !0;
          break;
        }
        l.push(n);
      }
  }
  if (!d) return null;
  let f = [t],
    p = t;
  for (; p !== e;) {
    let e = o.get(p);
    if (e == null) return null;
    (f.unshift(e), (p = e));
  }
  let m = f.map((e) => s(e, n)).filter((e) => e != null);
  if (m.length !== f.length) return null;
  let h = [];
  for (let e = 0; e < m.length - 1; e++) h.push(M(m[e], m[e + 1]));
  return { switches: m, hops: h, hopCount: h.length };
}
function j(e) {
  let t = new Set();
  e.forEach((e) => e.switches.forEach((e) => t.add(e.id)));
  let n = new Map();
  function r(e, t) {
    let r = n.get(e) ?? new Set();
    (r.add(t), n.set(e, r));
  }
  return (
    e.forEach((e) =>
      e.switches.forEach((e) => {
        e.uplinkTarget === `none` ||
          !t.has(e.uplinkTarget) ||
          (r(e.id, e.uplinkTarget), r(e.uplinkTarget, e.id));
      }),
    ),
    n
  );
}
function M(e, t) {
  let n = e.uplinkTarget === t.id,
    r = n ? e : t;
  return {
    from: e,
    to: t,
    fromPort: (n ? r.uplinkPort : r.targetPort) ?? null,
    toPort: (n ? r.targetPort : r.uplinkPort) ?? null,
    cableType: r.uplinkType,
    speed: r.uplinkSpeed,
    isUplink: n,
  };
}
function ee(e) {
  let {
    isStack: t,
    childIsCore: n,
    parentIsCore: r,
    childRect: i,
    parentRect: a,
  } = e;
  return t && n && r && Math.abs(i.top - a.top) < 50;
}
function N(e, t, n, r, i, a) {
  if (Math.abs(e - n) < 1) return `M ${e} ${t} L ${n} ${r}`;
  let o = Math.max(0, Math.min(a, i - t, r - i, Math.abs(n - e) / 2)),
    s = n > e,
    c = e + (s ? o : -o),
    l = n - (s ? o : -o);
  return `M ${e} ${t} L ${e} ${i - o} Q ${e} ${i} ${c} ${i} L ${l} ${i} Q ${n} ${i} ${n} ${i + o} L ${n} ${r}`;
}
function P(e, t, n, r, i) {
  let a, o;
  t.left > e.left
    ? ((a = (t.left - n.left) / r), (o = (e.right - n.left) / r))
    : ((a = (t.right - n.left) / r), (o = (e.left - n.left) / r));
  let s = (t.top + t.height / 2 - n.top) / r,
    c = { x: a, y: s },
    l = { x: o, y: s },
    u =
      Math.min((t.top - n.top) / r, (e.top - n.top) / r) -
      20 -
      Math.min(90, i * 30);
  return {
    pathD: `M ${a} ${s} L ${o} ${s}`,
    labelX: (a + o) / 2,
    labelY: u,
    childPoint: c,
    parentPoint: l,
    childPortPoint: { x: a, y: u - 16 },
    parentPortPoint: { x: o, y: u - 16 },
    markerDirection: { x: c.x > l.x ? 1 : -1, y: 0 },
  };
}
function F(e) {
  let {
      parentRect: t,
      childRect: n,
      canvasRect: r,
      scale: i,
      index: a,
      totalSiblings: o,
      isHorizontalCoreStack: s,
    } = e,
    c = r.width / 2,
    l = n.left < t.right && t.left < n.right;
  if (s) return P(t, n, r, i, a);
  let u = (n.left + n.width / 2 - r.left) / i,
    d = (n.top - r.top) / i,
    f = (t.left + t.width / 2 - r.left) / i,
    p = (t.bottom - r.top) / i,
    m = c / i,
    h = a - (o - 1) / 2,
    g = m + h * 9,
    _ = p + 25 + a * 6,
    v = d - 25 - a * 6,
    y = { x: f, y: p },
    b = { x: u, y: d },
    x = Math.abs(f - u) < 60 && Math.abs(f - g) < 60;
  if (v - _ < 30 || x) {
    if (d <= p && !l) return P(t, n, r, i, a);
    let e = Math.min(
        Math.max(p, d),
        Math.max(Math.min(p, d), (p + d) / 2 + h * 26),
      ),
      o = N(f, p, u, d, e, 12),
      s = 14 + Math.abs(h) * 8,
      c = { x: f, y: p + Math.min(60, Math.max(s, (e - p) * 0.4)) },
      m = { x: u, y: d - Math.min(60, Math.max(s, (d - e) * 0.4)) };
    return {
      pathD: o,
      labelX: (f + u) / 2,
      labelY: e,
      parentPoint: y,
      childPoint: b,
      parentPortPoint: c,
      childPortPoint: m,
      markerDirection: { x: 0, y: 1 },
    };
  }
  let S = Math.max(
      0,
      Math.min(
        12,
        Math.abs(g - f) / 2,
        Math.abs(g - u) / 2,
        (v - _) / 2,
        _ - p,
        d - v,
      ),
    ),
    C = `M ${f} ${p} `;
  ((C += `L ${f} ${_ - S} `),
    (C += `Q ${f} ${_} ${f > g ? f - S : f + S} ${_} `),
    (C += `L ${f > g ? g + S : g - S} ${_} `),
    (C += `Q ${g} ${_} ${g} ${_ + S} `),
    (C += `L ${g} ${v - S} `),
    (C += `Q ${g} ${v} ${g > u ? g - S : g + S} ${v} `),
    (C += `L ${g > u ? u + S : u - S} ${v} `),
    (C += `Q ${u} ${v} ${u} ${v + S} `),
    (C += `L ${u} ${d}`));
  let w = (_ + v) / 2 + h * 30,
    T = Math.min(60, 25 + a * 24),
    E = { x: f, y: p + T },
    D = { x: u, y: d - T };
  return {
    pathD: C,
    labelX: g,
    labelY: w,
    parentPoint: y,
    childPoint: b,
    parentPortPoint: E,
    childPortPoint: D,
    markerDirection: { x: 0, y: 1 },
  };
}
function I(e, t) {
  let n = e === `Fiber`,
    r = e === `Stack`,
    i = `line-copper`,
    a = `var(--copper-color)`,
    o = `3s`,
    s = `fa-ethernet text-emerald-500`,
    c = `bg-emerald-50 border-emerald-200`,
    l = ``;
  return (
    n
      ? ((i = `line-fiber`),
        (a = `var(--fiber-color)`),
        (o = `2s`),
        t >= 5
          ? ((s = `fa-bolt text-red-500`),
            (c = `bg-red-50 border-red-300`),
            (l = `box-shadow: 0 0 12px rgba(239, 68, 68, 0.8); animation: pulse-err 2s infinite;`))
          : t >= 2
            ? ((s = `fa-bolt text-purple-500`),
              (c = `bg-purple-50 border-purple-300`),
              (l = `box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);`))
            : ((s = `fa-bolt text-amber-500`),
              (c = `bg-amber-50 border-amber-300`),
              (l = `box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);`)))
      : r &&
        ((i = `line-stack`),
        (a = `var(--stack-color)`),
        (o = `1.2s`),
        (s = `fa-link text-purple-500`),
        (c = `bg-purple-50 border-purple-200`)),
    {
      lineClassType: i,
      dotColor: a,
      animDuration: o,
      iconClass: s,
      bgClass: c,
      customStyle: l,
    }
  );
}
function L(e) {
  let {
      parentRect: t,
      childRect: n,
      canvasRect: r,
      scale: i,
      index: a,
      totalSiblings: o,
      obstacles: s,
      parentIsZone: c,
      childIsZone: l,
    } = e,
    u = (t.left + t.width / 2 - r.left) / i,
    d = (t.top + t.height / 2 - r.top) / i,
    f = (n.left + n.width / 2 - r.left) / i,
    p = (n.top + n.height / 2 - r.top) / i;
  if (c || l) {
    let e = Math.hypot(f - u, p - d) || 1,
      r = (f - u) / e,
      a = (p - d) / e;
    if (c) {
      let e = B(u, d, t.width / i / 2, t.height / i / 2, r, a);
      ((u = e.x), (d = e.y));
    }
    if (l) {
      let e = B(f, p, n.width / i / 2, n.height / i / 2, -r, -a);
      ((f = e.x), (p = e.y));
    }
  }
  let m = { x: u, y: d },
    h = { x: f, y: p },
    g = f - u,
    _ = p - d,
    v = Math.hypot(g, _) || 1,
    y = g / v,
    b = _ / v,
    x = -b,
    S = y,
    C = (a - (o - 1) / 2) * 22,
    w =
      C +
      R({
        px: u,
        py: d,
        cx: f,
        cy: p,
        perpX: x,
        perpY: S,
        obstacles: s,
        siblingBow: C,
      }),
    T = (u + f) / 2 + x * w,
    E = (d + p) / 2 + S * w,
    D = `M ${u} ${d} Q ${T} ${E} ${f} ${p}`,
    O = Math.min(v * 0.35, 40);
  return {
    pathD: D,
    labelX: T,
    labelY: E,
    parentPoint: m,
    childPoint: h,
    parentPortPoint: { x: u + y * O + x * 13, y: d + b * O + S * 13 },
    childPortPoint: { x: f - y * O + x * 13, y: p - b * O + S * 13 },
    markerDirection: { x: y, y: b },
  };
}
function R(e) {
  let {
    px: t,
    py: n,
    cx: r,
    cy: i,
    perpX: a,
    perpY: o,
    siblingBow: s,
    obstacles: c,
  } = e;
  if (!c || c.length === 0) return 0;
  let l = 0;
  for (let e of c) {
    if (!z(t, n, r, i, e)) continue;
    let c = [
        [e.left, e.top],
        [e.right, e.top],
        [e.left, e.bottom],
        [e.right, e.bottom],
      ],
      u = 0,
      d = 0;
    for (let [e, r] of c) {
      let i = (e - t) * a + (r - n) * o;
      (i > u && (u = i), i < d && (d = i));
    }
    let f = s === 0 ? u <= -d : s > 0,
      p = (f ? u : d) + (f ? 34 : -34);
    Math.abs(p) > Math.abs(l) && (l = p);
  }
  return l * 2;
}
function z(e, t, n, r, i) {
  let a = n - e,
    o = r - t,
    s = 0,
    c = 1,
    l = [-a, a, -o, o],
    u = [e - i.left, i.right - e, t - i.top, i.bottom - t];
  for (let e = 0; e < 4; e++) {
    if (l[e] === 0) {
      if (u[e] < 0) return !1;
      continue;
    }
    let t = u[e] / l[e];
    if (l[e] < 0) {
      if (t > c) return !1;
      t > s && (s = t);
    } else {
      if (t < s) return !1;
      t < c && (c = t);
    }
  }
  return !0;
}
function B(e, t, n, r, i, a) {
  if (n <= 0 || r <= 0) return { x: e, y: t };
  let o = Math.hypot(i / n, a / r);
  if (o === 0) return { x: e, y: t };
  let s = 1 / o;
  return { x: e + i * s, y: t + a * s };
}
function V(e) {
  let {
      db: t,
      nodeRefs: n,
      zoneRefs: r,
      canvasRef: i,
      scale: a,
      vlanFilter: o,
      selectedSwitchId: c,
      isometric: l = !1,
      layoutVersion: u = 0,
      pathLinkKeys: d = null,
    } = e,
    [f, p] = (0, g.useState)([]),
    [m, h] = (0, g.useState)([]);
  return (
    (0, g.useEffect)(() => {
      let e = 0;
      function u() {
        let e = i.current;
        if (!e) return;
        let u = e.getBoundingClientRect(),
          f = new Map();
        n.forEach((e, t) => {
          let n = l ? e.querySelector(`.iso-cube`) : null;
          f.set(t, (n ?? e).getBoundingClientRect());
        });
        let m = new Map(),
          g = new Map();
        l &&
          (r?.forEach((e, t) => m.set(t, e.getBoundingClientRect())),
          t.forEach((e) =>
            e.switches.forEach((t) => {
              g.set(t.id, b(t, e.floor));
            }),
          ));
        let _ = new Map(),
          v = new Map(),
          y = new Map();
        (t.forEach((e) =>
          e.switches.forEach((e) => {
            if (e.uplinkTarget === `none`) return;
            let t = f.get(e.id);
            if (!t) return;
            let n = _.get(e.uplinkTarget) ?? [];
            (n.push({ childId: e.id, centerX: t.left + t.width / 2 }),
              _.set(e.uplinkTarget, n));
            let r = [e.id, e.uplinkTarget].sort().join(`|`);
            y.set(e.id, r);
            let i = v.get(r) ?? [];
            (i.push(e.id), v.set(r, i));
          }),
        ),
          _.forEach((e) => e.sort((e, t) => e.centerX - t.centerX)));
        let x = [],
          S = new Map();
        t.forEach((e) =>
          e.switches.forEach((e) => {
            if (e.uplinkTarget === `none`) return;
            let n = f.get(e.id),
              r = f.get(e.uplinkTarget);
            if (!n || !r) return;
            let i = s(e.uplinkTarget, t),
              p = d != null && d.has(`${e.id}|${e.uplinkTarget}`);
            if (l && !p) {
              let t = g.get(e.id),
                n = g.get(e.uplinkTarget);
              if (t != null && n != null && t !== n) {
                let r =
                    o !== `none` && e.conns.some((e) => e.v.toString() === o),
                  a =
                    o !== `none` && i?.conns.some((e) => e.v.toString() === o),
                  s = r || !!a,
                  l = d == null && (c === e.id || c === e.uplinkTarget),
                  u = o !== `none` && !s,
                  f = `${t}=>${n}`,
                  p = S.get(f) ?? {
                    fromZoneKey: t,
                    toZoneKey: n,
                    count: 0,
                    countByType: { Fiber: 0, Cat6: 0, Stack: 0 },
                    anyActive: !1,
                    anyHighlighted: !1,
                    allHidden: !0,
                  },
                  m = e.uplinkType ?? `Cat6`;
                ((p.count += 1),
                  (p.countByType[m] += 1),
                  (p.anyActive = p.anyActive || l),
                  (p.anyHighlighted = p.anyHighlighted || s),
                  (p.allHidden = p.allHidden && u),
                  S.set(f, p));
                return;
              }
            }
            let m = e.uplinkType === `Stack`,
              h =
                !l &&
                ee({
                  isStack: m,
                  childIsCore: e.isCore,
                  parentIsCore: !!i?.isCore,
                  childRect: n,
                  parentRect: r,
                }),
              b,
              C;
            if (l || h) {
              let t = y.get(e.id) ?? [e.id, e.uplinkTarget].sort().join(`|`),
                n = v.get(t) ?? [e.id];
              ((b = n.indexOf(e.id)), (C = n.length));
            } else {
              let t = _.get(e.uplinkTarget) ?? [];
              ((b = t.findIndex((t) => t.childId === e.id)),
                (C = t.length || 1));
            }
            let {
                pathD: w,
                labelX: T,
                labelY: E,
                parentPoint: D,
                childPoint: O,
                parentPortPoint: k,
                childPortPoint: A,
                markerDirection: j,
              } = l
                ? L({
                    parentRect: r,
                    childRect: n,
                    canvasRect: u,
                    scale: a,
                    index: Math.max(b, 0),
                    totalSiblings: C,
                  })
                : F({
                    parentRect: r,
                    childRect: n,
                    canvasRect: u,
                    scale: a,
                    index: Math.max(b, 0),
                    totalSiblings: C,
                    isHorizontalCoreStack: h,
                  }),
              M = l
                ? D
                : {
                    x: (r.left + r.width / 2 - u.left) / a,
                    y: (r.bottom - u.top) / a,
                  },
              N = new Set(e.conns.map((e) => e.v)).size,
              P = I(e.uplinkType, N),
              R = o !== `none` && e.conns.some((e) => e.v.toString() === o),
              z = o !== `none` && i?.conns.some((e) => e.v.toString() === o),
              B = R || !!z,
              V = d != null && d.has(`${e.id}|${e.uplinkTarget}`),
              H = d == null ? c === e.id || c === e.uplinkTarget : V,
              U = V && !!d?.get(`${e.id}|${e.uplinkTarget}`);
            x.push({
              key: e.id,
              pathD: w,
              className: [
                `link-line`,
                P.lineClassType,
                H ? `active` : ``,
                V ? `on-path` : ``,
                U ? `flow-reverse` : ``,
                o !== `none` && B ? `vlan-highlight` : ``,
              ]
                .filter(Boolean)
                .join(` `),
              childPoint: O,
              parentPoint: D,
              labelX: T,
              labelY: E,
              labelText:
                `${e.uplinkType ?? `Cat6`} • ${e.uplinkSpeed ?? ``}`.trim(),
              iconClass: P.iconClass,
              bgClass: P.bgClass,
              customStyle: P.customStyle,
              hidden: o !== `none` && !B,
              dimmed: d == null ? c != null && !H : !V,
              isActive: H,
              isFiber: e.uplinkType === `Fiber`,
              cableType: e.uplinkType,
              parentPortPoint: k,
              childPortPoint: A,
              parentPortLabel: e.targetPort == null ? null : `P${e.targetPort}`,
              childPortLabel: e.uplinkPort == null ? null : `P${e.uplinkPort}`,
              parentPortNumber: e.targetPort ?? null,
              parentIsSelectedSwitch: c != null && c === e.uplinkTarget,
              parentAnchorPoint: M,
              markerDirection: j,
              pathFlowReverse: U,
            });
          }),
        );
        let C = [];
        m.forEach((e, t) =>
          C.push({
            key: t,
            box: {
              left: (e.left - u.left) / a,
              top: (e.top - u.top) / a,
              right: (e.right - u.left) / a,
              bottom: (e.bottom - u.top) / a,
            },
          }),
        );
        let w = [];
        (S.forEach((e, t) => {
          let n = m.get(e.fromZoneKey),
            r = m.get(e.toZoneKey);
          if (!n || !r) return;
          let {
              pathD: i,
              labelX: o,
              labelY: s,
              parentPoint: l,
              childPoint: f,
            } = L({
              parentRect: r,
              childRect: n,
              canvasRect: u,
              scale: a,
              index: 0,
              totalSiblings: 1,
              obstacles: C.filter(
                (t) => t.key !== e.fromZoneKey && t.key !== e.toZoneKey,
              ).map((e) => e.box),
              parentIsZone: !0,
              childIsZone: !0,
            }),
            p = [`Fiber`, `Cat6`, `Stack`]
              .filter((t) => e.countByType[t] > 0)
              .map((t) => ({ type: t, count: e.countByType[t], ...I(t, 0) }));
          w.push({
            key: t,
            pathD: i,
            parentPoint: l,
            childPoint: f,
            labelX: o,
            labelY: s,
            count: e.count,
            cableBreakdown: p,
            isActive: e.anyActive,
            dimmed: d != null || (c != null && !e.anyActive),
            hidden: e.allHidden,
            vlanHighlighted: e.anyHighlighted,
          });
        }),
          p(x),
          h(w));
      }
      function f() {
        (cancelAnimationFrame(e), (e = requestAnimationFrame(u)));
      }
      f();
      let m = i.current,
        g = m ? new ResizeObserver(f) : null;
      m && g && g.observe(m);
      function _(e) {
        e.propertyName === `transform` && f();
      }
      m?.addEventListener(`transitionend`, _);
      let v = !1;
      return (
        document.fonts?.ready?.then(() => {
          v || f();
        }),
        () => {
          ((v = !0),
            cancelAnimationFrame(e),
            g?.disconnect(),
            m?.removeEventListener(`transitionend`, _));
        }
      );
    }, [t, n, r, i, a, o, c, l, u, d]),
    { links: f, zoneLinks: m }
  );
}
var H = m();
function U(e, t, n, r) {
  return { x: (e - n.left) / r, y: (t - n.top) / r };
}
function te(e, t, n, r) {
  let i = U(e.left + e.width / 2, e.bottom, n, r),
    a = U(t.left + t.width / 2, t.top, n, r),
    o = (i.y + a.y) / 2;
  return {
    pathD: N(i.x, i.y, a.x, a.y, o, 12),
    labelX: (i.x + a.x) / 2,
    labelY: o,
  };
}
function W(e) {
  let {
    cloudRects: t,
    firewallRect: n,
    targetRect: r,
    canvasRect: i,
    scale: a,
  } = e;
  return n
    ? {
        cloudLinks: t.map(({ id: e, rect: t }) => {
          let { pathD: r, labelX: o, labelY: s } = te(t, n, i, a);
          return { id: e, pathD: r, labelX: o, labelY: s };
        }),
        firewallLink: r ? te(n, r, i, a) : null,
      }
    : { cloudLinks: [], firewallLink: null };
}
function ne(e) {
  let {
    devices: n = [],
    cloudIds: singleCloudIds,
    firewallId: singleFwId,
    targetId: singleTargetId,
    nodeRefs: a,
    canvasRef: o,
    scale: s,
  } = e;
  let [l, u] = (0, g.useState)([]);
  let [d, f] = (0, g.useState)([]);

  (0, g.useEffect)(() => {
    let animFrame = 0;
    let updateLinks = function () {
      let canvasEl = o.current;
      if (!canvasEl) {
        u([]);
        f([]);
        return;
      }
      let canvasRect = canvasEl.getBoundingClientRect();
      let devList = Array.isArray(n) && n.length > 0 ? n : (singleFwId ? [{ id: singleFwId, lanUplinkTarget: singleTargetId, wanLinks: (singleCloudIds || []).map(id => ({ id: id.replace('wan-cloud-', '') })) }] : []);

      let allCloudLinks = [];
      let allGatewayLinks = [];

      devList.forEach((dev) => {
        let devEl = dev.id ? a.get(dev.id) : null;
        if (!devEl) return;
        let devRect = devEl.getBoundingClientRect();

        // 1. WAN cloud links for this gateway device
        let wans = dev.wanLinks || dev.wanLines || [];
        wans.forEach((wl) => {
          let cloudEl = a.get(`wan-cloud-${wl.id}`);
          if (cloudEl) {
            let cloudRect = cloudEl.getBoundingClientRect();
            let link = te(cloudRect, devRect, canvasRect, s);
            allCloudLinks.push({ id: `wan-cloud-${wl.id}`, ...link });
          }
        });

        // 2. LAN uplink to Core Switch for this gateway device
        if (dev.lanUplinkTarget) {
          let targetEl = a.get(dev.lanUplinkTarget);
          if (targetEl) {
            let targetRect = targetEl.getBoundingClientRect();
            let link = te(devRect, targetRect, canvasRect, s);
            allGatewayLinks.push({
              id: `uplink-${dev.id}-${dev.lanUplinkTarget}`,
              port: dev.lanUplinkPort,
              ...link
            });
          }
        }
      });

      u(allCloudLinks);
      f(allGatewayLinks);
    };

    let cancel = function () {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(updateLinks);
    };

    cancel();

    let canvasEl = o.current;
    let resizeObs = canvasEl ? new ResizeObserver(cancel) : null;
    canvasEl && resizeObs && resizeObs.observe(canvasEl);

    let onTrans = function (ev) {
      ev.propertyName === 'transform' && cancel();
    };
    canvasEl?.addEventListener('transitionend', onTrans);

    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) cancel();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animFrame);
      resizeObs?.disconnect();
      canvasEl?.removeEventListener('transitionend', onTrans);
    };
  }, [n, singleCloudIds, singleFwId, singleTargetId, a, o, s]);

  return {
    cloudLinks: l,
    gatewayLinks: d,
    firewallLink: d[0] || null,
    firewallPort: d[0]?.port ?? null,
  };
}
function re(e) {
  return e !== null;
}
function ie(e, t, n, r) {
  return { x: (e - n.left) / r, y: (t - n.top) / r };
}
function ae(e, t, n, r) {
  let i = ie(e.left + e.width / 2, e.bottom, n, r),
    a = ie(t.left + t.width / 2, t.top, n, r),
    o = (i.y + a.y) / 2;
  return {
    pathD: N(i.x, i.y, a.x, a.y, o, 12),
    labelX: (i.x + a.x) / 2,
    labelY: o,
  };
}
function oe(e) {
  let { pairs: t, canvasRect: n, scale: r } = e;
  return t.map(({ uplinkId: e, targetRect: t, frameRect: i }) => {
    let { pathD: a, labelX: o, labelY: s } = ae(t, i, n, r);
    return { uplinkId: e, pathD: a, labelX: o, labelY: s };
  });
}
function se(e) {
  let t = (0, H.c)(7),
    { legs: n, nodeRefs: r, canvasRef: i, scale: a } = e,
    o;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((o = []), (t[0] = o))
    : (o = t[0]);
  let [s, c] = (0, g.useState)(o),
    l,
    u;
  return (
    t[1] !== i || t[2] !== n || t[3] !== r || t[4] !== a
      ? ((l = () => {
          let e = 0,
            t = function () {
              let e = i.current;
              if (!e || n.length === 0) {
                c([]);
                return;
              }
              let t = e.getBoundingClientRect(),
                o = n
                  .map((e) => {
                    let { uplinkId: t, frameId: n, targetId: i } = e,
                      a = r.get(n),
                      o = r.get(i);
                    return !a || !o
                      ? null
                      : {
                          uplinkId: t,
                          targetRect: o.getBoundingClientRect(),
                          frameRect: a.getBoundingClientRect(),
                        };
                  })
                  .filter(G);
              c(oe({ pairs: o, canvasRect: t, scale: a }));
            },
            o = function () {
              (cancelAnimationFrame(e), (e = requestAnimationFrame(t)));
            };
          o();
          let s = i.current,
            l = s ? new ResizeObserver(o) : null;
          s && l && l.observe(s);
          let u = function (e) {
            e.propertyName === `transform` && o();
          };
          s?.addEventListener(`transitionend`, u);
          let d = !1;
          return (
            document.fonts?.ready?.then(() => {
              d || o();
            }),
            () => {
              ((d = !0),
                cancelAnimationFrame(e),
                l?.disconnect(),
                s?.removeEventListener(`transitionend`, u));
            }
          );
        }),
        (u = [n, r, i, a]),
        (t[1] = i),
        (t[2] = n),
        (t[3] = r),
        (t[4] = a),
        (t[5] = l),
        (t[6] = u))
      : ((l = t[5]), (u = t[6])),
    (0, g.useEffect)(l, u),
    s
  );
}
function G(e) {
  return e !== null;
}
var K = 0.1;
function ce(e) {
  let t = (0, H.c)(9),
    n = u(ue),
    r = u(le),
    i,
    a;
  (t[0] !== e || t[1] !== r
    ? ((i = () => {
        let t = e.current;
        if (!t) return;
        let n = function (e) {
          if (!e.ctrlKey) return;
          e.preventDefault();
          let t = u.getState().scale;
          r(e.deltaY < 0 ? t + K : t - K);
        };
        return (
          t.addEventListener(`wheel`, n, { passive: !1 }),
          () => t.removeEventListener(`wheel`, n)
        );
      }),
      (a = [e, r]),
      (t[0] = e),
      (t[1] = r),
      (t[2] = i),
      (t[3] = a))
    : ((i = t[2]), (a = t[3])),
    (0, g.useEffect)(i, a));
  let o;
  t[4] === r ? (o = t[5]) : ((o = () => r(1)), (t[4] = r), (t[5] = o));
  let s;
  return (
    t[6] !== n || t[7] !== o
      ? ((s = { scale: n, resetView: o }), (t[6] = n), (t[7] = o), (t[8] = s))
      : (s = t[8]),
    s
  );
}
function le(e) {
  return e.setScale;
}
function ue(e) {
  return e.scale;
}
var q = `.sw-node-ui, .firewall-node-ui, .gpon-olt-node-ui, .iso-node, .iso-zone-blob, button, a, input, select, textarea`;
function de(e) {
  let t = (0, H.c)(3),
    n = (0, g.useRef)(null),
    r,
    i;
  (t[0] === e
    ? ((r = t[1]), (i = t[2]))
    : ((r = () => {
        let t = e.current?.closest(`.main-view`);
        if (!t) return;
        t.style.cursor = `grab`;
        let r = function (e) {
            if (e.button !== 0 || e.target.closest(q)) return;
            let r = t;
            (r.setPointerCapture?.(e.pointerId),
              (n.current = {
                pointerId: e.pointerId,
                startX: e.clientX,
                startY: e.clientY,
                startScrollLeft: r.scrollLeft,
                startScrollTop: r.scrollTop,
              }),
              (r.style.scrollBehavior = `auto`),
              (r.style.cursor = `grabbing`));
          },
          i = function (e) {
            let r = n.current;
            !r ||
              e.pointerId !== r.pointerId ||
              ((t.scrollLeft = r.startScrollLeft - (e.clientX - r.startX)),
              (t.scrollTop = r.startScrollTop - (e.clientY - r.startY)));
          },
          a = function (e) {
            n.current?.pointerId === e.pointerId &&
              ((n.current = null),
              (t.style.scrollBehavior = ``),
              (t.style.cursor = `grab`));
          };
        return (
          t.addEventListener(`pointerdown`, r),
          t.addEventListener(`pointermove`, i),
          t.addEventListener(`pointerup`, a),
          t.addEventListener(`pointercancel`, a),
          () => {
            (t.removeEventListener(`pointerdown`, r),
              t.removeEventListener(`pointermove`, i),
              t.removeEventListener(`pointerup`, a),
              t.removeEventListener(`pointercancel`, a),
              (t.style.cursor = ``),
              (t.style.scrollBehavior = ``));
          }
        );
      }),
      (i = [e]),
      (t[0] = e),
      (t[1] = r),
      (t[2] = i)),
    (0, g.useEffect)(r, i));
}
var J = n(),
  Y = (0, g.forwardRef)(function (
    {
      sw: e,
      db: t,
      isSelected: n,
      isVlanHighlighted: s,
      onSelect: c,
      compact: u = !1,
      isDimmed: d = !1,
    },
    p,
  ) {
    let m = r(e.id, t),
      g = o(e, t, m),
      _ = l(e),
      { colorClass: v } = f(g, _),
      y = [
        `sw-node-ui`,
        e.isCore ? `sw-node-core` : ``,
        n ? `active` : ``,
        s ? `vlan-highlight` : ``,
        u ? `compact` : ``,
        d ? `dimmed` : ``,
      ]
        .filter(Boolean)
        .join(` `);
    if (u)
      return (0, J.jsxs)(`div`, {
        ref: p,
        id: e.id,
        className: y,
        style: { borderTopColor: e.color },
        onClick: () => c(e.id),
        title: `${e.name} — ${g}/${_} ports`,
        children: [
          (0, J.jsxs)(`div`, {
            className: `compact-icon`,
            children: [
              (0, J.jsx)(`i`, {
                className: e.isCore
                  ? `fas fa-crown text-amber-500`
                  : `fas fa-server`,
                style: e.isCore ? void 0 : { color: e.color },
              }),
              (0, J.jsx)(`div`, { className: `compact-status-dot ${v}` }),
            ],
          }),
          (0, J.jsx)(`span`, { className: `compact-label`, children: e.name }),
        ],
      });
    let b = a(e, t, m),
      x = b.shutdown + b.errDisabled,
      S = i(e.uplinkType),
      C = e.hybridPortCount ?? 0;
    return (0, J.jsxs)(`div`, {
      ref: p,
      id: e.id,
      className: `${y} sw-brand-card`,
      onClick: () => c(e.id),
      title: `${e.name} — ${g}/${_} port`,
      children: [
        C > 0 &&
          (0, J.jsx)(`span`, {
            className: `sw-combo-badge`,
            title: `Có ${C} cổng Combo (Đồng/Quang)`,
            children: `Combo`,
          }),
        (0, J.jsxs)(`div`, {
          className: `sw-card-header`,
          children: [
            (0, J.jsxs)(`div`, {
              className: `sw-brand-badge`,
              style: { background: e.color },
              children: [
                (0, J.jsxs)(`div`, {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    padding: "4px 2px"
                  },
                  children: [
                    (0, J.jsxs)(`svg`, {
                      viewBox: `0 0 24 24`,
                      style: { width: "22px", height: "20px", color: "#ffffff", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))" },
                      fill: `none`,
                      stroke: `currentColor`,
                      strokeWidth: `2.2`,
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                      children: [
                        (0, J.jsx)(`path`, { d: `M3 8h14M14 5l4 3-4 3` }),
                        (0, J.jsx)(`path`, { d: `M21 16H7M10 13l-4 3 4 3` }),
                        (0, J.jsx)(`circle`, { cx: `7`, cy: `12`, r: `1`, fill: `currentColor` }),
                        (0, J.jsx)(`circle`, { cx: `12`, cy: `12`, r: `1`, fill: `currentColor` }),
                        (0, J.jsx)(`circle`, { cx: `17`, cy: `12`, r: `1`, fill: `currentColor` })
                      ]
                    }),
                    (0, J.jsx)(`span`, {
                      style: {
                        fontSize: "8.5px",
                        fontWeight: "900",
                        letterSpacing: "0.5px",
                        lineHeight: "1",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        marginTop: "3px",
                        color: "#ffffff",
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)"
                      },
                      children: e.isCore ? `CORE` : `SW`
                    })
                  ]
                }),
                e.isCore &&
                  (0, J.jsx)(`span`, {
                    className: `sw-crown-badge`,
                    children: (0, J.jsx)(`i`, { className: `fas fa-crown` }),
                  }),
              ],
            }),
            (0, J.jsxs)(`div`, {
              className: `sw-card-info`,
              children: [
                (0, J.jsx)(`p`, {
                  className: `sw-card-name`,
                  title: e.name,
                  children: e.name,
                }),
                (0, J.jsxs)(`p`, {
                  className: `sw-card-meta mono`,
                  children: [
                    (0, J.jsx)(`i`, { className: `fas fa-globe` }),
                    e.ip || `—`,
                  ],
                }),
                (0, J.jsxs)(`p`, {
                  className: `sw-card-meta mono`,
                  children: [
                    (0, J.jsx)(`i`, { className: `fas fa-fingerprint` }),
                    e.mac || `—`,
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, J.jsxs)(`div`, {
          className: `sw-stat-row`,
          children: [
            (0, J.jsxs)(`div`, {
              className: `sw-stat sw-stat-up${b.uplink === 0 ? ` is-zero` : ``}`,
              children: [
                (0, J.jsx)(`span`, { className: `n`, children: b.uplink }),
                (0, J.jsx)(`span`, { className: `lbl`, children: `Uplink` }),
                (0, J.jsx)(`span`, {
                  className: `sw-stat-tag-slot`,
                  children:
                    b.uplink > 0 &&
                    (0, J.jsx)(`span`, {
                      className: `sw-uplink-tag sw-uplink-tag--${S.toLowerCase()}`,
                      children: S,
                    }),
                }),
              ],
            }),
            (0, J.jsxs)(`div`, {
              className: `sw-stat sw-stat-down${b.downlink === 0 ? ` is-zero` : ``}`,
              children: [
                (0, J.jsx)(`span`, { className: `n`, children: b.downlink }),
                (0, J.jsx)(`span`, { className: `lbl`, children: `Downlink` }),
                (0, J.jsx)(`span`, { className: `sw-stat-tag-slot` }),
              ],
            }),
            (0, J.jsxs)(`div`, {
              className: `sw-stat sw-stat-access${b.access === 0 ? ` is-zero` : ``}`,
              children: [
                (0, J.jsx)(`span`, { className: `n`, children: b.access }),
                (0, J.jsx)(`span`, { className: `lbl`, children: `Access` }),
                (0, J.jsx)(`span`, { className: `sw-stat-tag-slot` }),
              ],
            }),
            (0, J.jsxs)(`div`, {
              className: `sw-stat sw-stat-issue${x === 0 ? ` is-zero` : ``}`,
              children: [
                (0, J.jsx)(`span`, { className: `n`, children: x }),
                (0, J.jsx)(`span`, { className: `lbl`, children: `Sự cố` }),
                (0, J.jsx)(`span`, { className: `sw-stat-tag-slot` }),
              ],
            }),
          ],
        }),
      ],
    });
  });
function X(e) {
  let t = (0, H.c)(14),
    { color: n, core: r } = e,
    i;
  t[0] !== n || t[1] !== r
    ? ((i =
        r &&
        (0, J.jsx)(`polygon`, {
          points: `0,-24 20,-12 20,12 0,24 -20,12 -20,-12`,
          fill: `none`,
          stroke: n,
          strokeWidth: `1.5`,
          strokeDasharray: `2 3`,
          opacity: `.55`,
        })),
      (t[0] = n),
      (t[1] = r),
      (t[2] = i))
    : (i = t[2]);
  let a;
  t[3] === n
    ? (a = t[4])
    : ((a = (0, J.jsx)(`polygon`, {
        points: `0,-20 17,-10 0,0 -17,-10`,
        fill: n,
      })),
      (t[3] = n),
      (t[4] = a));
  let o = `color-mix(in srgb, ${n} 78%, black)`,
    s;
  t[5] === o
    ? (s = t[6])
    : ((s = (0, J.jsx)(`polygon`, {
        points: `-17,-10 0,0 0,20 -17,10`,
        fill: o,
      })),
      (t[5] = o),
      (t[6] = s));
  let c = `color-mix(in srgb, ${n} 55%, black)`,
    l;
  t[7] === c
    ? (l = t[8])
    : ((l = (0, J.jsx)(`polygon`, {
        points: `17,-10 0,0 0,20 17,10`,
        fill: c,
      })),
      (t[7] = c),
      (t[8] = l));
  let u;
  return (
    t[9] !== i || t[10] !== a || t[11] !== s || t[12] !== l
      ? ((u = (0, J.jsxs)(`svg`, {
          viewBox: `-26 -28 52 56`,
          width: `60`,
          height: `65`,
          className: `iso-cube-svg`,
          children: [i, a, s, l],
        })),
        (t[9] = i),
        (t[10] = a),
        (t[11] = s),
        (t[12] = l),
        (t[13] = u))
      : (u = t[13]),
    u
  );
}
var fe = (0, g.forwardRef)(function (
  {
    sw: e,
    db: t,
    x: n,
    y: r,
    isSelected: i,
    isVlanHighlighted: a,
    onSelect: s,
    isDimmed: c = !1,
  },
  u,
) {
  let d = o(e, t),
    p = l(e),
    { colorClass: m } = f(d, p),
    g = [
      `iso-node`,
      i ? `active` : ``,
      a ? `vlan-highlight` : ``,
      c ? `dimmed` : ``,
    ]
      .filter(Boolean)
      .join(` `);
  return (0, J.jsxs)(`div`, {
    ref: u,
    id: e.id,
    className: g,
    style: { left: n, top: r },
    onClick: () => s(e.id),
    title: `${e.name} — ${d}/${p} ports`,
    children: [
      (0, J.jsxs)(`div`, {
        className: `iso-name-pill`,
        children: [
          (0, J.jsx)(`div`, { className: `iso-status-dot ${m}` }),
          e.isCore && (0, J.jsx)(`i`, { className: `fas fa-crown` }),
          (0, J.jsx)(`span`, {
            className: `iso-brand-tag`,
            style: { backgroundColor: e.color },
            children: h(e.brand),
          }),
          (0, J.jsx)(`span`, { className: `iso-name-text`, children: e.name }),
        ],
      }),
      (0, J.jsxs)(`div`, {
        className: `iso-caption mono`,
        children: [e.ip || `—`, ` · `, d, `/`, p],
      }),
      (0, J.jsx)(`div`, {
        className: `iso-cube`,
        children: (0, J.jsx)(X, { color: e.color, core: !!e.isCore }),
      }),
    ],
  });
});
function pe({
  zone: e,
  floor: t,
  switches: n,
  db: r,
  selectedSwitchId: i,
  vlanFilter: a,
  onSelect: o,
  registerRef: s,
  relatedSwitchIds: c = null,
  zoneOffsets: l = {},
  onZoneDrag: u,
  registerZoneRef: d,
}) {
  let f = t === `__core__`,
    { positions: p, width: m, height: h } = w(n, f ? 90 : 0),
    _ = new Map(p.map((e) => [e.id, e])),
    v = `${t}::${e}`,
    y = l[v] ?? { x: 0, y: 0 },
    b = (0, g.useRef)(null),
    x = (0, g.useRef)(0);
  function S(e) {
    e.target.closest(`.iso-node`) ||
      (u &&
        (e.currentTarget.setPointerCapture?.(e.pointerId),
        (b.current = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          baseX: y.x,
          baseY: y.y,
        })));
  }
  function C(e) {
    let t = b.current;
    if (!t || !u || e.pointerId !== t.pointerId) return;
    let n = t.baseX + (e.clientX - t.startX),
      r = t.baseY + (e.clientY - t.startY);
    (cancelAnimationFrame(x.current),
      (x.current = requestAnimationFrame(() => u(v, n, r))));
  }
  function T(e) {
    b.current?.pointerId === e.pointerId && (b.current = null);
  }
  return (0, J.jsxs)(`div`, {
    ref: (e) => d?.(v, e),
    className: `zone-wrapper isometric ${u ? `draggable` : ``}`,
    style: { width: m, height: h, transform: `translate(${y.x}px, ${y.y}px)` },
    onPointerDown: S,
    onPointerMove: C,
    onPointerUp: T,
    onPointerCancel: T,
    children: [
      (0, J.jsx)(`div`, {
        className: `iso-zone-blob ${f ? `iso-zone-blob-core` : ``}`,
        style: {
          borderRadius: `min(30%,74px) min(40%,74px) min(36%,74px) min(26%,74px) / min(34%,58px) min(28%,58px) min(38%,58px) min(32%,58px)`,
        },
      }),
      f
        ? (0, J.jsxs)(`div`, {
            className: `iso-zone-label iso-zone-label-core`,
            children: [
              (0, J.jsx)(`i`, { className: `fas fa-circle-nodes` }),
              ` Trung tâm kết nối`,
            ],
          })
        : e !== `none` &&
          (0, J.jsx)(`div`, { className: `iso-zone-label`, children: e }),
      n.map((e) => {
        let t = _.get(e.id);
        return t
          ? (0, J.jsx)(
              fe,
              {
                ref: (t) => s(e.id, t),
                sw: e,
                db: r,
                x: t.x,
                y: t.y,
                isSelected: i === e.id,
                isVlanHighlighted:
                  a !== `none` && e.conns.some((e) => e.v.toString() === a),
                onSelect: o,
                isDimmed: c != null && !c.has(e.id),
              },
              e.id,
            )
          : null;
      }),
    ],
  });
}
function me({
  zone: e,
  floor: t,
  switches: n,
  db: r,
  selectedSwitchId: i,
  vlanFilter: a,
  onSelect: o,
  registerRef: s,
  compact: c = !1,
  relatedSwitchIds: l = null,
  zoneOffsets: u,
  onZoneDrag: d,
  registerZoneRef: f,
}) {
  if (c)
    return (0, J.jsx)(pe, {
      zone: e,
      floor: t ?? e,
      switches: n,
      db: r,
      selectedSwitchId: i,
      vlanFilter: a,
      onSelect: o,
      registerRef: s,
      relatedSwitchIds: l,
      zoneOffsets: u,
      onZoneDrag: d,
      registerZoneRef: f,
    });
  let p = n.map((e) =>
    (0, J.jsx)(
      Y,
      {
        ref: (t) => s(e.id, t),
        sw: e,
        db: r,
        isSelected: i === e.id,
        isVlanHighlighted:
          a !== `none` && e.conns.some((e) => e.v.toString() === a),
        onSelect: o,
        isDimmed: l != null && !l.has(e.id),
      },
      e.id,
    ),
  );
  return e === `none`
    ? (0, J.jsx)(J.Fragment, { children: p })
    : (0, J.jsxs)(`div`, {
        className: `zone-wrapper`,
        children: [
          (0, J.jsxs)(`div`, {
            className: `zone-label`,
            children: [
              (0, J.jsx)(`i`, {
                className: `fas fa-layer-group text-slate-400`,
              }),
              ` `,
              e,
            ],
          }),
          p,
        ],
      });
}
function he(e) {
  let t = (0, H.c)(10),
    n,
    r;
  t[0] === e
    ? ((n = t[1]), (r = t[2]))
    : (({ coreSwitches: r, ...n } = e), (t[0] = e), (t[1] = n), (t[2] = r));
  let i;
  t[3] === r ? (i = t[4]) : ((i = y(r)), (t[3] = r), (t[4] = i));
  let a = i,
    o;
  t[5] === a ? (o = t[6]) : ((o = Object.entries(a)), (t[5] = a), (t[6] = o));
  let s;
  return (
    t[7] !== n || t[8] !== o
      ? ((s = (0, J.jsx)(`div`, {
          className: `mb-32 flex gap-16 justify-center relative z-10 flex-wrap w-full`,
          id: `core-topology-grid`,
          children: o.map((e) => {
            let [t, r] = e;
            return r.length > 0
              ? (0, J.jsx)(
                  me,
                  { zone: t, switches: r, floor: `__core__`, ...n },
                  t,
                )
              : null;
          }),
        })),
        (t[7] = n),
        (t[8] = o),
        (t[9] = s))
      : (s = t[9]),
    s
  );
}
function ge(e) {
  let t = (0, H.c)(20),
    n,
    r;
  t[0] === e
    ? ((n = t[1]), (r = t[2]))
    : (({ floor: r, ...n } = e), (t[0] = e), (t[1] = n), (t[2] = r));
  let i;
  t[3] === r.switches
    ? (i = t[4])
    : ((i = y(v(r.switches.filter(_e)))), (t[3] = r.switches), (t[4] = i));
  let a = i;
  if (!Object.values(a).some(Z)) return null;
  let o = r.floor.toLowerCase().includes(`server room`),
    s = `absolute -top-4 px-6 py-2 rounded-xl border-[2px] text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-slate-200 z-20 flex items-center gap-2 ${o ? `bg-indigo-900 border-indigo-200` : `bg-slate-800 border-slate-600`}`,
    c = o ? `fas fa-server text-indigo-400` : `fas fa-building text-indigo-400`,
    l;
  t[5] === c
    ? (l = t[6])
    : ((l = (0, J.jsx)(`i`, { className: c })), (t[5] = c), (t[6] = l));
  let u;
  t[7] !== r.floor || t[8] !== s || t[9] !== l
    ? ((u = (0, J.jsxs)(`div`, { className: s, children: [l, r.floor] })),
      (t[7] = r.floor),
      (t[8] = s),
      (t[9] = l),
      (t[10] = u))
    : (u = t[10]);
  let d;
  t[11] === a
    ? (d = t[12])
    : ((d = Object.entries(a)), (t[11] = a), (t[12] = d));
  let f;
  t[13] !== n || t[14] !== r.floor || t[15] !== d
    ? ((f = (0, J.jsx)(`div`, {
        className: `flex flex-wrap justify-center items-center gap-x-20 gap-y-16 w-full max-w-[1600px] px-8 border-t border-slate-200/60 pt-10`,
        children: d.map((e) => {
          let [t, i] = e;
          return i.length > 0
            ? (0, J.jsx)(me, { zone: t, switches: i, floor: r.floor, ...n }, t)
            : null;
        }),
      })),
      (t[13] = n),
      (t[14] = r.floor),
      (t[15] = d),
      (t[16] = f))
    : (f = t[16]);
  let p;
  return (
    t[17] !== u || t[18] !== f
      ? ((p = (0, J.jsxs)(`div`, {
          className: `flex flex-col items-center w-full relative z-10 pt-16 mt-6 first:border-0 first:pt-0 first:mt-0`,
          children: [u, f],
        })),
        (t[17] = u),
        (t[18] = f),
        (t[19] = p))
      : (p = t[19]),
    p
  );
}
function Z(e) {
  return e.length > 0;
}
function _e(e) {
  return !e.isCore;
}
var Q = 4,
  $ = 3.5;
function ve({ links: e, zoneLinks: t = [] }) {
  let n = [],
    r = [];
  for (let t of e)
    t.hidden ||
      !t.isActive ||
      (t.parentPortLabel != null &&
        (t.parentIsSelectedSwitch
          ? t.parentPortNumber != null && r.push(t)
          : n.push({
              key: `${t.key}-p`,
              point: t.parentPortPoint,
              label: t.parentPortLabel,
              bgClass: t.bgClass,
              iconClass: t.iconClass,
              customStyle: t.customStyle,
            })),
      t.childPortLabel &&
        n.push({
          key: `${t.key}-c`,
          point: t.childPortPoint,
          label: t.childPortLabel,
          bgClass: t.bgClass,
          iconClass: t.iconClass,
          customStyle: t.customStyle,
        }));
  r.sort((e, t) => e.parentPortNumber - t.parentPortNumber);
  let i = r[0]?.parentAnchorPoint;
  return (0, J.jsxs)(J.Fragment, {
    children: [
      (0, J.jsxs)(`svg`, {
        className: `topology-lines`,
        id: `svg-layer`,
        children: [
          t.map((e) =>
            (0, J.jsx)(
              `path`,
              {
                d: e.pathD,
                className: [
                  `zone-link-line`,
                  e.isActive ? `active` : ``,
                  e.dimmed ? `dimmed` : ``,
                  e.vlanHighlighted ? `vlan-highlight` : ``,
                ]
                  .filter(Boolean)
                  .join(` `),
                style: { display: e.hidden ? `none` : void 0 },
              },
              `zone-${e.key}`,
            ),
          ),
          e.map((e) => {
            let { x: t, y: n } = e.markerDirection,
              r = { x: e.childPoint.x - t * Q, y: e.childPoint.y - n * Q },
              i = { x: e.parentPoint.x + t * Q, y: e.parentPoint.y + n * Q };
            return (0, J.jsxs)(
              `g`,
              {
                children: [
                  (0, J.jsx)(`path`, {
                    id: `path-${e.key}`,
                    d: e.pathD,
                    className: [e.className, e.dimmed ? `dimmed` : ``]
                      .filter(Boolean)
                      .join(` `),
                  }),
                  (0, J.jsxs)(`g`, {
                    style: {
                      display: e.hidden ? `none` : void 0,
                      opacity: e.dimmed ? 0.15 : void 0,
                    },
                    children: [
                      (0, J.jsx)(`circle`, {
                        cx: r.x,
                        cy: r.y,
                        r: $,
                        fill: `var(--uplink-color)`,
                      }),
                      (0, J.jsx)(`circle`, {
                        cx: i.x,
                        cy: i.y,
                        r: $,
                        fill: `var(--downlink-color)`,
                      }),
                    ],
                  }),
                ],
              },
              e.key,
            );
          }),
        ],
      }),
      (0, J.jsxs)(`div`, {
        id: `link-labels-layer`,
        className: `absolute inset-0 pointer-events-none z-10`,
        children: [
          t.map((e) =>
            e.hidden
              ? null
              : (0, J.jsx)(
                  `div`,
                  {
                    className: `zone-link-badge-group absolute flex items-center gap-1 z-10 transition-all duration-300 ${e.dimmed ? `dimmed` : ``} ${e.isActive ? `active` : ``} ${e.vlanHighlighted ? `vlan-highlight` : ``}`,
                    style: {
                      left: e.labelX,
                      top: e.labelY,
                      transform: `translate(-50%, -50%)`,
                    },
                    children: e.cableBreakdown.map((e) =>
                      (0, J.jsxs)(
                        `span`,
                        {
                          className: `zone-link-badge inline-flex items-center gap-1 px-2 py-1 rounded-full border whitespace-nowrap font-bold text-[10px] ${e.bgClass}`,
                          children: [
                            (0, J.jsx)(`i`, {
                              className: `fas ${e.iconClass}`,
                            }),
                            (0, J.jsxs)(`span`, { children: [`×`, e.count] }),
                          ],
                        },
                        e.type,
                      ),
                    ),
                  },
                  `zone-badge-${e.key}`,
                ),
          ),
          e.map((e) =>
            e.cableType === `Stack`
              ? (0, J.jsxs)(
                  `div`,
                  {
                    className: `link-label absolute inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border whitespace-nowrap font-bold text-[10px] z-10 transition-all duration-300 shadow-sm ${e.bgClass} ${e.hidden ? `vlan-dim` : ``} ${e.dimmed ? `dimmed` : ``}`,
                    style: {
                      left: e.labelX,
                      top: e.labelY,
                      transform: `translate(-50%, -50%)`,
                      ...(e.customStyle ? ye(e.customStyle) : {}),
                    },
                    children: [
                      (0, J.jsx)(`i`, { className: `fas ${e.iconClass}` }),
                      (0, J.jsx)(`span`, {
                        className: `text-slate-700`,
                        children: e.labelText,
                      }),
                    ],
                  },
                  e.key,
                )
              : null,
          ),
          n.map((e) =>
            (0, J.jsxs)(
              `div`,
              {
                className: `port-badge absolute inline-flex items-center gap-1 px-1.5 py-0.5 rounded border whitespace-nowrap font-bold text-[9px] z-10 transition-all duration-300 ${e.bgClass}`,
                style: {
                  left: e.point.x,
                  top: e.point.y,
                  transform: `translate(-50%, -50%)`,
                  ...(e.customStyle ? ye(e.customStyle) : {}),
                },
                children: [
                  (0, J.jsx)(`i`, { className: `fas ${e.iconClass}` }),
                  (0, J.jsx)(`span`, {
                    className: `text-slate-700`,
                    children: e.label,
                  }),
                ],
              },
              e.key,
            ),
          ),
          i &&
            (0, J.jsx)(`div`, {
              className: `port-badge-grid absolute grid grid-cols-4 gap-1 p-1.5 rounded-lg border border-slate-200 bg-white/95 shadow-md z-10`,
              style: {
                left: i.x,
                top: i.y + 20,
                transform: `translate(-50%, 0)`,
              },
              children: r.map((e) =>
                (0, J.jsxs)(
                  `span`,
                  {
                    className: `inline-flex items-center justify-center gap-0.5 px-1 py-0.5 rounded border whitespace-nowrap font-bold text-[9px] ${e.bgClass}`,
                    children: [
                      (0, J.jsx)(`i`, { className: `fas ${e.iconClass}` }),
                      (0, J.jsx)(`span`, {
                        className: `text-slate-700`,
                        children: e.parentPortLabel,
                      }),
                    ],
                  },
                  e.key,
                ),
              ),
            }),
        ],
      }),
    ],
  });
}
function ye(e) {
  let t = {};
  return (
    e.split(`;`).forEach((e) => {
      let [n, r] = e.split(`:`);
      if (!n || !r) return;
      let i = n.trim().replace(/-([a-z])/g, (e, t) => t.toUpperCase());
      t[i] = r.trim();
    }),
    t
  );
}
function be(e) {
  let { cloudLinks: n = [], gatewayLinks: r = [], firewallLink: legacyLink, firewallPort: legacyPort } = e;
  let activeGatewayLinks = Array.isArray(r) && r.length > 0 
    ? r 
    : (legacyLink ? [{ ...legacyLink, port: legacyPort, id: 'legacy-fw-link' }] : []);

  if (n.length === 0 && activeGatewayLinks.length === 0) return null;

  let cloudPaths = n.map(xe);
  let gatewayPaths = activeGatewayLinks.map((link) =>
    (0, J.jsx)('path', {
      d: link.pathD,
      className: 'wan-link-path wan-link-path-core',
    }, link.id)
  );

  let badges = activeGatewayLinks
    .filter((link) => link.port != null && link.port !== '')
    .map((link) =>
      (0, J.jsx)(
        'div',
        {
          key: link.id,
          className: 'absolute inset-0 pointer-events-none z-10',
          children: (0, J.jsxs)('div', {
            className: 'wan-port-badge absolute inline-flex items-center gap-1 px-2 py-0.5 rounded-full border whitespace-nowrap font-bold text-[10px]',
            style: {
              left: link.labelX,
              top: link.labelY,
              transform: 'translate(-50%, -50%)',
            },
            children: [
              (0, J.jsx)('i', { className: 'fas fa-plug' }),
              ` P${link.port}`,
            ],
          }),
        }
      )
    );

  return (0, J.jsxs)(J.Fragment, {
    children: [
      (0, J.jsxs)('svg', {
        className: 'topology-lines wan-lines',
        id: 'wan-svg-layer',
        children: [...cloudPaths, ...gatewayPaths],
      }),
      ...badges,
    ],
  });
}
function xe(e) {
  return (0, J.jsx)(`path`, { d: e.pathD, className: `wan-link-path` }, e.id);
}
function Se(e) {
  let t = (0, H.c)(15),
    { links: n, frameDB: r } = e;
  if (n.length === 0) return null;
  let i, a, o;
  if (t[0] !== r || t[1] !== n) {
    let e = r.flatMap(we),
      s;
    (t[5] === n ? (s = t[6]) : ((s = n.map(Ce)), (t[5] = n), (t[6] = s)),
      t[7] === s
        ? (o = t[8])
        : ((o = (0, J.jsx)(`svg`, {
            className: `topology-lines`,
            id: `gpon-olt-svg-layer`,
            children: s,
          })),
          (t[7] = s),
          (t[8] = o)),
      (i = `absolute inset-0 pointer-events-none z-10`),
      (a = n.map((t) => {
        let n = e.find((e) => e.id === t.uplinkId)?.port;
        return n == null
          ? null
          : (0, J.jsxs)(
              `div`,
              {
                className: `gpon-olt-port-badge absolute inline-flex items-center gap-1 px-2 py-0.5 rounded-full border whitespace-nowrap font-bold text-[10px]`,
                style: {
                  left: t.labelX,
                  top: t.labelY,
                  transform: `translate(-50%, -50%)`,
                },
                children: [
                  (0, J.jsx)(`i`, { className: `fas fa-plug` }),
                  ` P`,
                  n,
                ],
              },
              t.uplinkId,
            );
      })),
      (t[0] = r),
      (t[1] = n),
      (t[2] = i),
      (t[3] = a),
      (t[4] = o));
  } else ((i = t[2]), (a = t[3]), (o = t[4]));
  let s;
  t[9] !== i || t[10] !== a
    ? ((s = (0, J.jsx)(`div`, { className: i, children: a })),
      (t[9] = i),
      (t[10] = a),
      (t[11] = s))
    : (s = t[11]);
  let c;
  return (
    t[12] !== o || t[13] !== s
      ? ((c = (0, J.jsxs)(J.Fragment, { children: [o, s] })),
        (t[12] = o),
        (t[13] = s),
        (t[14] = c))
      : (c = t[14]),
    c
  );
}
function Ce(e) {
  return (0, J.jsx)(
    `path`,
    { d: e.pathD, className: `gpon-olt-link-path` },
    e.uplinkId,
  );
}
function we(e) {
  return e.uplinks ?? [];
}
var Te = (0, g.forwardRef)(function (e, t) {
  let n = (0, H.c)(27),
    { frame: r, totalOnts: i, totalPorts: a, onManage: o } = e,
    s;
  n[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, J.jsx)(`div`, {
        className: `gpon-olt-icon-badge`,
        children: (0, J.jsx)(`i`, { className: `fas fa-diagram-project` }),
      })),
      (n[0] = s))
    : (s = n[0]);
  let c;
  n[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = (0, J.jsxs)(`div`, {
        className: `gpon-olt-node-top`,
        children: [
          s,
          (0, J.jsxs)(`div`, {
            className: `gpon-olt-status-row`,
            children: [
              (0, J.jsx)(`span`, { className: `gpon-olt-status-dot` }),
              (0, J.jsx)(`span`, { children: `OLT` }),
            ],
          }),
        ],
      })),
      (n[1] = c))
    : (c = n[1]);
  let l = r.brand || `OLT`,
    u;
  n[2] === l
    ? (u = n[3])
    : ((u = (0, J.jsx)(`p`, { className: `gpon-olt-node-brand`, children: l })),
      (n[2] = l),
      (n[3] = u));
  let d;
  n[4] === r.name
    ? (d = n[5])
    : ((d = (0, J.jsx)(`h4`, {
        className: `gpon-olt-node-name`,
        title: r.name,
        children: r.name,
      })),
      (n[4] = r.name),
      (n[5] = d));
  let f;
  n[6] === r.model
    ? (f = n[7])
    : ((f =
        r.model &&
        (0, J.jsx)(`p`, {
          className: `gpon-olt-node-model`,
          children: r.model,
        })),
      (n[6] = r.model),
      (n[7] = f));
  let p;
  n[8] === r.location
    ? (p = n[9])
    : ((p =
        r.location &&
        (0, J.jsxs)(`span`, {
          className: `gpon-olt-spec-chip`,
          children: [
            (0, J.jsx)(`i`, { className: `fas fa-map-marker-alt` }),
            ` `,
            r.location,
          ],
        })),
      (n[8] = r.location),
      (n[9] = p));
  let m;
  n[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, J.jsx)(`i`, { className: `fas fa-ethernet` })), (n[10] = m))
    : (m = n[10]);
  let h;
  n[11] === a
    ? (h = n[12])
    : ((h = (0, J.jsxs)(`span`, {
        className: `gpon-olt-spec-chip`,
        children: [m, ` `, a, ` PON Port`],
      })),
      (n[11] = a),
      (n[12] = h));
  let g;
  n[13] !== p || n[14] !== h
    ? ((g = (0, J.jsxs)(`div`, {
        className: `gpon-olt-node-specs`,
        children: [p, h],
      })),
      (n[13] = p),
      (n[14] = h),
      (n[15] = g))
    : (g = n[15]);
  let _;
  n[16] === i
    ? (_ = n[17])
    : ((_ =
        i > 0 &&
        (0, J.jsxs)(`div`, {
          className: `gpon-olt-ont-badge`,
          children: [
            (0, J.jsx)(`i`, { className: `fas fa-network-wired` }),
            ` `,
            i,
            ` ONT`,
          ],
        })),
      (n[16] = i),
      (n[17] = _));
  let v;
  return (
    n[18] !== r.id ||
    n[19] !== o ||
    n[20] !== t ||
    n[21] !== g ||
    n[22] !== _ ||
    n[23] !== u ||
    n[24] !== d ||
    n[25] !== f
      ? ((v = (0, J.jsxs)(`div`, {
          ref: t,
          id: r.id,
          className: `gpon-olt-node-ui`,
          onClick: o,
          title: `Bấm để xem/sửa thông tin OLT`,
          children: [c, u, d, f, g, _],
        })),
        (n[18] = r.id),
        (n[19] = o),
        (n[20] = t),
        (n[21] = g),
        (n[22] = _),
        (n[23] = u),
        (n[24] = d),
        (n[25] = f),
        (n[26] = v))
      : (v = n[26]),
    v
  );
});
function Ee(e) {
  let t = (0, H.c)(11),
    { frames: n, ontDB: r, registerRef: i, onManage: a } = e;
  if (n.length === 0) return null;
  let o;
  if (t[0] !== n || t[1] !== a || t[2] !== r || t[3] !== i) {
    let e;
    (t[5] !== a || t[6] !== r || t[7] !== i
      ? ((e = (e) =>
          (0, J.jsx)(
            Te,
            {
              frame: e,
              totalOnts: r.filter((t) => t.frameId === e.id).length,
              totalPorts: e.slots.reduce(De, 0),
              ref: (t) => i(e.id, t),
              onManage: () => a(e.id),
            },
            e.id,
          )),
        (t[5] = a),
        (t[6] = r),
        (t[7] = i),
        (t[8] = e))
      : (e = t[8]),
      (o = n.map(e)),
      (t[0] = n),
      (t[1] = a),
      (t[2] = r),
      (t[3] = i),
      (t[4] = o));
  } else o = t[4];
  let s;
  return (
    t[9] === o
      ? (s = t[10])
      : ((s = (0, J.jsx)(`div`, {
          className: `flex items-center gap-4 flex-wrap justify-center`,
          children: o,
        })),
        (t[9] = o),
        (t[10] = s)),
    s
  );
}
function De(e, t) {
  return e + t.ports.length;
}
var Oe = (0, g.forwardRef)(function (e, t) {
    let n = (0, H.c)(27),
      { fw: r, onManage: i, onDelete: onDel } = e,
      a;

    let isRouter = r.deviceType === 'router' || 
                   (r.name && r.name.toLowerCase().includes('router')) || 
                   (r.model && r.model.toLowerCase().includes('router')) ||
                   (r.brand && r.brand.toLowerCase().includes('router'));

    a = (0, J.jsxs)(`div`, {
      className: `firewall-icon-badge ${isRouter ? 'router-badge' : ''}`,
      style: {
        background: isRouter ? `linear-gradient(135deg, #0284c7, #0369a1)` : `linear-gradient(135deg, #ef4444, #b91c1c)`,
        borderRadius: `12px`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`,
        width: `44px`,
        height: `44px`,
        boxShadow: isRouter ? `0 4px 12px rgba(2, 132, 199, 0.45)` : `0 4px 12px rgba(220, 38, 38, 0.45)`,
        border: isRouter ? `2px solid #7dd3fc` : `2px solid #fca5a5`
      },
      children: [
        (0, J.jsx)(`i`, { className: `fas ${isRouter ? 'fa-route' : 'fa-shield-halved'} text-base text-white drop-shadow` }),
        (0, J.jsx)(`span`, {
          className: `text-[6.5px] font-black text-white/95 uppercase tracking-wider mt-0.5`,
          children: isRouter ? `ROUTER` : `FIREWALL`
        })
      ],
    });

    let delBtn = onDel && (0, J.jsx)(`button`, {
      type: `button`,
      onClick: (e) => {
        e.stopPropagation();
        onDel(r);
      },
      className: `w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400 flex items-center justify-center text-[10px] transition-all ml-auto cursor-pointer shadow-sm shrink-0`,
      title: `Xóa ${isRouter ? 'Router' : 'Firewall'} [${r.name}]`,
      children: (0, J.jsx)(`i`, { className: `fas fa-trash-alt` })
    });

    let o = (0, J.jsxs)(`div`, {
      className: `firewall-node-top flex items-center justify-between w-full`,
      children: [
        (0, J.jsxs)(`div`, {
          className: `flex items-center gap-2`,
          children: [
            a,
            (0, J.jsxs)(`div`, {
              className: `firewall-status-row`,
              children: [
                (0, J.jsx)(`span`, { className: `firewall-status-dot ${isRouter ? 'bg-emerald-500' : ''}` }),
                (0, J.jsx)(`span`, { children: isRouter ? `Online` : `Protected` }),
              ],
            }),
          ],
        }),
        delBtn,
      ],
    });

    let s = r.brand || (isRouter ? `Router` : `Firewall`),
      c = (0, J.jsx)(`p`, {
        className: `firewall-node-brand`,
        children: s,
      });

    let l = (0, J.jsx)(`h4`, {
      className: `firewall-node-name`,
      title: r.name,
      children: r.name,
    });

    let u = r.model && (0, J.jsx)(`p`, {
      className: `firewall-node-model`,
      children: r.model,
    });

    let d = (0, J.jsx)(`i`, { className: isRouter ? `fas fa-route` : `fas fa-network-wired` });
    let f = r.ip || `—`,
      p = (0, J.jsxs)(`span`, {
        className: `firewall-spec-chip`,
        children: [d, ` `, f],
      });

    let m = r.mac && (0, J.jsxs)(`span`, {
      className: `firewall-spec-chip`,
      children: [
        (0, J.jsx)(`i`, { className: `fas fa-tag` }),
        ` `,
        r.mac,
      ],
    });

    let h = (0, J.jsxs)(`div`, {
      className: `firewall-node-specs`,
      children: [p, m],
    });

    let g = r.wanLinks.length > 0 && (0, J.jsxs)(`div`, {
      className: `firewall-wan-badge`,
      children: [
        (0, J.jsx)(`i`, { className: `fas fa-globe` }),
        ` WAN ×`,
        r.wanLinks.length,
      ],
    });

    return (0, J.jsxs)(`div`, {
      ref: t,
      id: r.id,
      className: `firewall-node-ui ${isRouter ? 'is-router' : ''}`,
      onClick: i,
      title: `Bấm để xem/sửa thông tin ${isRouter ? 'Router' : 'Firewall'}`,
      children: [o, c, l, u, h, g],
    });
  }),
  ke = (0, g.forwardRef)(function (e, t) {
    let n = (0, H.c)(11),
      { link: r } = e,
      i = `wan-cloud-${r.id}`,
      a = r.notes || void 0,
      o;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((o = (0, J.jsx)(`div`, {
          style: {
            width: `40px`,
            height: `40px`,
            borderRadius: `50%`,
            background: `radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 60%, #0369a1)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            boxShadow: `0 4px 14px rgba(2, 132, 199, 0.45)`,
            border: `2px solid #bae6fd`
          },
          children: (0, J.jsx)(`i`, { className: `fas fa-globe-americas text-white text-xl` })
        })), (n[0] = o))
      : (o = n[0]);
    let s = r.isp || `Internet`,
      c;
    n[1] === s
      ? (c = n[2])
      : ((c = (0, J.jsx)(`span`, {
          className: `internet-cloud-label`,
          children: s,
        })),
        (n[1] = s),
        (n[2] = c));
    let l;
    n[3] === r.ip
      ? (l = n[4])
      : ((l =
          r.ip &&
          (0, J.jsx)(`span`, {
            className: `internet-cloud-ip`,
            children: r.ip,
          })),
        (n[3] = r.ip),
        (n[4] = l));
    let u;
    return (
      n[5] !== t || n[6] !== i || n[7] !== a || n[8] !== c || n[9] !== l
        ? ((u = (0, J.jsxs)(`div`, {
            ref: t,
            id: i,
            className: `internet-cloud-ui`,
            title: a,
            children: [o, c, l],
          })),
          (n[5] = t),
          (n[6] = i),
          (n[7] = a),
          (n[8] = c),
          (n[9] = l),
          (n[10] = u))
        : (u = n[10]),
      u
    );
  });
function Ae(e) {
  let { firewalls: fws, firewall: n, registerRef: r, onManage: i, onAdd: a, onDelete: onDel } = e;
  let devices = (Array.isArray(fws) && fws.length > 0) ? fws : (n ? [n] : []);

  let allWanLinks = [];
  devices.forEach(dev => {
    (dev.wanLinks || []).forEach(wl => {
      allWanLinks.push({ ...wl, parentFwId: dev.id });
    });
  });

  let wanCloudElements = allWanLinks.length > 0 && (0, J.jsx)(`div`, {
    className: `flex items-center gap-4 flex-wrap justify-center mb-1`,
    children: allWanLinks.map((wl) =>
      (0, J.jsx)(
        ke,
        { link: wl, ref: (t) => r(`wan-cloud-${wl.id}`, t) },
        wl.id
      )
    ),
  });

  let hasRouter = devices.some(d => d.deviceType === 'router' || d.name?.toLowerCase().includes('router') || d.model?.toLowerCase().includes('router'));
  let hasFirewall = devices.some(d => d.deviceType === 'firewall' || (!d.deviceType && !d.name?.toLowerCase().includes('router') && !d.model?.toLowerCase().includes('router')));

  let deviceCards = devices.map(dev =>
    (0, J.jsx)(Oe, {
      fw: dev,
      ref: (el) => r(dev.id, el),
      onManage: () => i(dev.id),
      onDelete: onDel,
    }, dev.id)
  );

  let controls;
  if (devices.length === 0) {
    controls = (0, J.jsxs)(`div`, {
      className: `flex items-center gap-3`,
      children: [
        (0, J.jsxs)(`button`, {
          type: `button`,
          onClick: () => a('firewall'),
          className: `firewall-add-ghost-btn flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-rose-300 dark:border-rose-700/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-xs transition-all shadow-sm cursor-pointer`,
          title: `Thêm thiết bị Firewall bảo mật`,
          children: [
            (0, J.jsx)(`i`, { className: `fas fa-shield-halved text-rose-500` }),
            ` + Thêm Firewall`,
          ],
        }),
        (0, J.jsxs)(`button`, {
          type: `button`,
          onClick: () => a('router'),
          className: `firewall-add-ghost-btn flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-sky-300 dark:border-sky-700/60 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 font-bold text-xs transition-all shadow-sm cursor-pointer`,
          title: `Thêm thiết bị Router định tuyến`,
          children: [
            (0, J.jsx)(`i`, { className: `fas fa-route text-sky-500` }),
            ` + Thêm Router`,
          ],
        }),
      ],
    });
  } else {
    let addBtn = null;
    if (!hasRouter) {
      addBtn = (0, J.jsxs)(`button`, {
        type: `button`,
        onClick: () => a('router'),
        className: `flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-sky-300 dark:border-sky-700/60 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 font-bold text-xs transition-all shadow-sm cursor-pointer`,
        title: `Thêm thiết bị Router`,
        children: [
          (0, J.jsx)(`i`, { className: `fas fa-route text-sky-500` }),
          ` + Thêm Router`,
        ],
      });
    } else if (!hasFirewall) {
      addBtn = (0, J.jsxs)(`button`, {
        type: `button`,
        onClick: () => a('firewall'),
        className: `flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-700/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-xs transition-all shadow-sm cursor-pointer`,
        title: `Thêm thiết bị Firewall`,
        children: [
          (0, J.jsx)(`i`, { className: `fas fa-shield-halved text-rose-500` }),
          ` + Thêm Firewall`,
        ],
      });
    } else {
      addBtn = (0, J.jsxs)(`button`, {
        type: `button`,
        onClick: () => a('router'),
        className: `flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-bold transition-all cursor-pointer`,
        title: `Thêm Gateway (Firewall / Router)`,
        children: [
          (0, J.jsx)(`i`, { className: `fas fa-plus text-slate-400` }),
          ` Thêm Gateway`,
        ],
      });
    }

    controls = (0, J.jsxs)(`div`, {
      className: `flex items-center gap-6 justify-center flex-wrap`,
      children: [...deviceCards, addBtn],
    });
  }

  return (0, J.jsxs)(`div`, {
    className: `flex flex-col items-center gap-3`,
    children: [wanCloudElements, controls],
  });
}
function je(e) {
  let t = (0, H.c)(30),
    { from: n, to: r, path: i, onClear: a, onExit: o } = e,
    s;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, J.jsxs)(`h4`, {
        className: `text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5`,
        children: [
          (0, J.jsx)(`i`, { className: `fas fa-route text-indigo-500` }),
          ` Tra đường đi`,
        ],
      })),
      (t[0] = s))
    : (s = t[0]);
  let c;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = (0, J.jsx)(`i`, { className: `fas fa-rotate-left` })), (t[1] = c))
    : (c = t[1]);
  let l;
  t[2] === a
    ? (l = t[3])
    : ((l = (0, J.jsx)(`button`, {
        onClick: a,
        className: `path-trace-btn`,
        title: `Chọn lại từ đầu`,
        children: c,
      })),
      (t[2] = a),
      (t[3] = l));
  let u;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((u = (0, J.jsx)(`i`, { className: `fas fa-xmark` })), (t[4] = u))
    : (u = t[4]);
  let d;
  t[5] === o
    ? (d = t[6])
    : ((d = (0, J.jsx)(`button`, {
        onClick: o,
        className: `path-trace-btn`,
        title: `Thoát chế độ tra đường đi`,
        children: u,
      })),
      (t[5] = o),
      (t[6] = d));
  let f;
  t[7] !== l || t[8] !== d
    ? ((f = (0, J.jsxs)(`div`, {
        className: `flex items-center justify-between gap-3 mb-3`,
        children: [
          s,
          (0, J.jsxs)(`div`, {
            className: `flex items-center gap-1`,
            children: [l, d],
          }),
        ],
      })),
      (t[7] = l),
      (t[8] = d),
      (t[9] = f))
    : (f = t[9]);
  let p;
  t[10] === n
    ? (p = t[11])
    : ((p = (0, J.jsx)(Pe, {
        label: `Từ`,
        sw: n,
        placeholder: `Bấm chọn switch nguồn`,
      })),
      (t[10] = n),
      (t[11] = p));
  let m;
  t[12] === r
    ? (m = t[13])
    : ((m = (0, J.jsx)(Pe, {
        label: `Đến`,
        sw: r,
        placeholder: `Bấm chọn switch đích`,
      })),
      (t[12] = r),
      (t[13] = m));
  let h;
  t[14] !== p || t[15] !== m
    ? ((h = (0, J.jsxs)(`div`, {
        className: `flex flex-col gap-1.5 mb-3`,
        children: [p, m],
      })),
      (t[14] = p),
      (t[15] = m),
      (t[16] = h))
    : (h = t[16]);
  let g;
  t[17] === i
    ? (g = t[18])
    : ((g =
        i &&
        i.hopCount > 0 &&
        (0, J.jsxs)(J.Fragment, {
          children: [
            (0, J.jsxs)(`div`, {
              className: `path-trace-summary`,
              children: [
                (0, J.jsx)(`i`, {
                  className: `fas fa-circle-nodes text-indigo-500`,
                }),
                (0, J.jsxs)(`span`, {
                  children: [
                    (0, J.jsx)(`strong`, { children: i.hopCount }),
                    ` chặng · qua `,
                    (0, J.jsx)(`strong`, { children: i.switches.length - 2 }),
                    ` thiết bị trung gian`,
                  ],
                }),
              ],
            }),
            (0, J.jsx)(`ol`, {
              className: `path-trace-chain`,
              children: i.switches.map((e, t) => {
                let n = t > 0 ? i.hops[t - 1] : null,
                  r = t < i.hops.length ? i.hops[t] : null,
                  a = [n?.toPort ?? null, r?.fromPort ?? null].filter(Ne),
                  o = t === 0,
                  s = t === i.switches.length - 1,
                  c = r ? I(r.cableType, 0) : null;
                return (0, J.jsxs)(
                  `li`,
                  {
                    className: `path-chain-node ${o ? `source` : ``} ${s ? `dest` : ``}`,
                    children: [
                      (0, J.jsx)(`span`, { className: `path-chain-dot` }),
                      (0, J.jsx)(`span`, {
                        className: `path-chain-port`,
                        children: a.length > 0 ? a.map(Me).join(` | `) : `—`,
                      }),
                      (0, J.jsx)(`span`, {
                        className: `path-chain-name truncate`,
                        title: e.name,
                        children: e.name,
                      }),
                      r &&
                        c &&
                        (0, J.jsxs)(`div`, {
                          className: `path-chain-connector`,
                          children: [
                            (0, J.jsx)(`span`, {
                              className: `path-chain-hop-index`,
                              children: t + 1,
                            }),
                            (0, J.jsx)(`i`, {
                              className: `fas ${c.iconClass} path-chain-connector-icon`,
                            }),
                            (0, J.jsxs)(`span`, {
                              className: `path-chain-cable`,
                              children: [
                                r.cableType ?? `Cat6`,
                                r.speed ? ` · ${r.speed}` : ``,
                              ],
                            }),
                          ],
                        }),
                    ],
                  },
                  e.id,
                );
              }),
            }),
          ],
        })),
      (t[17] = i),
      (t[18] = g));
  let _;
  t[19] === i
    ? (_ = t[20])
    : ((_ =
        i &&
        i.hopCount === 0 &&
        (0, J.jsx)(`p`, {
          className: `path-trace-note`,
          children: `Nguồn và đích là cùng một switch.`,
        })),
      (t[19] = i),
      (t[20] = _));
  let v;
  t[21] !== i || t[22] !== r
    ? ((v =
        !i &&
        r != null &&
        (0, J.jsxs)(`p`, {
          className: `path-trace-note error`,
          children: [
            (0, J.jsx)(`i`, { className: `fas fa-triangle-exclamation` }),
            ` Không có đường đi vật lý giữa hai switch này.`,
          ],
        })),
      (t[21] = i),
      (t[22] = r),
      (t[23] = v))
    : (v = t[23]);
  let y;
  return (
    t[24] !== g || t[25] !== _ || t[26] !== v || t[27] !== f || t[28] !== h
      ? ((y = (0, J.jsxs)(`div`, {
          className: `path-trace-panel`,
          children: [f, h, g, _, v],
        })),
        (t[24] = g),
        (t[25] = _),
        (t[26] = v),
        (t[27] = f),
        (t[28] = h),
        (t[29] = y))
      : (y = t[29]),
    y
  );
}
function Me(e) {
  return `P${e}`;
}
function Ne(e) {
  return e != null;
}
function Pe(e) {
  let t = (0, H.c)(8),
    { label: n, sw: r, placeholder: i } = e,
    a;
  t[0] === n
    ? (a = t[1])
    : ((a = (0, J.jsx)(`span`, {
        className: `path-trace-endpoint-label`,
        children: n,
      })),
      (t[0] = n),
      (t[1] = a));
  let o;
  t[2] !== i || t[3] !== r
    ? ((o = r
        ? (0, J.jsx)(`span`, {
            className: `path-trace-endpoint-name truncate`,
            title: r.name,
            children: r.name,
          })
        : (0, J.jsx)(`span`, {
            className: `path-trace-endpoint-empty`,
            children: i,
          })),
      (t[2] = i),
      (t[3] = r),
      (t[4] = o))
    : (o = t[4]);
  let s;
  return (
    t[5] !== a || t[6] !== o
      ? ((s = (0, J.jsxs)(`div`, {
          className: `path-trace-endpoint`,
          children: [a, o],
        })),
        (t[5] = a),
        (t[6] = o),
        (t[7] = s))
      : (s = t[7]),
    s
  );
}
function Fe() {
  let e = d((e) => e.DB),
    t = d((e) => e.FirewallDB),
    deleteFirewall = d((e) => e.deleteFirewall),
    showDialog = useDialogStore((e) => e.showDialog),
    n = d((e) => e.GponFrameDB),
    r = d((e) => e.GponOntDB),
    i = u((e) => e.openGponFrameModal),
    a = d((e) => e.selectedSwitchId),
    o = d((e) => e.selectSwitch),
    l = d((e) => e.toggleSelectSwitch),
    f = d((e) => e.vlanFilter),
    m = d((e) => e.pathTrace),
    h = d((e) => e.togglePathTraceMode),
    v = d((e) => e.pickPathEndpoint),
    y = d((e) => e.clearPathTrace),
    b = u((e) => e.infoPanelCollapsed),
    x = u((e) => e.toggleInfoPanel),
    S = u((e) => e.focusRequest),
    C = u((e) => e.clearFocusRequest),
    w = u((e) => e.topologyIconMode),
    T = u((e) => e.toggleTopologyIconMode),
    E = u((e) => e.toggleSidebarMobile),
    D = u((e) => e.openAddFirewallModal),
    O = u((e) => e.openEditFirewallModal),
    handleDeleteFw = (dev) => {
      if (!dev) return;
      let isRt = dev.deviceType === 'router' || dev.name?.toLowerCase().includes('router');
      let label = isRt ? 'Router' : 'Firewall';
      let execute = () => {
        deleteFirewall(dev.id);
      };
      if (typeof showDialog === 'function') {
        showDialog(`Bạn có chắc chắn muốn xóa ${label} [${dev.name}]?`, 'confirm', execute);
      } else if (typeof window !== 'undefined' && window.confirm(`Bạn có chắc chắn muốn xóa ${label} [${dev.name}]?`)) {
        execute();
      }
    },
    j = (0, g.useRef)(null),
    { scale: M, resetView: ee } = ce(j);
  de(j);
  let N = u((e) => e.setScale),
    [P] = (0, g.useState)(() => new Map()),
    F = (e, t) => {
      t ? P.set(e, t) : P.delete(e);
    },
    [I] = (0, g.useState)(() => new Map()),
    L = (e, t) => {
      t ? I.set(e, t) : I.delete(e);
    },
    [R, z] = (0, g.useState)({}),
    [B, H] = (0, g.useState)(0);
  function U(e, t, n) {
    (z((r) => ({ ...r, [e]: { x: t, y: n } })), H((e) => e + 1));
  }
  function te() {
    (ee(), z({}));
  }
  let W = (0, g.useMemo)(
      () => (m?.fromId && m.toId ? A(m.fromId, m.toId, e) : null),
      [m?.fromId, m?.toId, e],
    ),
    re = (0, g.useMemo)(() => {
      if (!W || W.hopCount === 0) return null;
      let e = new Map();
      return (
        W.hops.forEach((t) => {
          let [n, r] = t.isUplink ? [t.from, t.to] : [t.to, t.from];
          e.set(`${n.id}|${r.id}`, t.isUplink);
        }),
        e
      );
    }, [W]),
    ie = (0, g.useMemo)(
      () => (W && W.hopCount > 0 ? new Set(W.switches.map((e) => e.id)) : null),
      [W],
    ),
    { links: ae, zoneLinks: oe } = V({
      db: e,
      nodeRefs: P,
      zoneRefs: I,
      canvasRef: j,
      scale: M,
      vlanFilter: f,
      selectedSwitchId: a,
      isometric: w,
      layoutVersion: B,
      pathLinkKeys: re,
    });
  ((0, g.useEffect)(
    () => (
      document.body.classList.toggle(`topology-icon-mode`, w),
      () => document.body.classList.remove(`topology-icon-mode`)
    ),
    [w],
  ),
    (0, g.useEffect)(() => {
      if (f === `none`) {
        document.documentElement.style.removeProperty(`--highlight-color`);
        return;
      }
      let e = p[Number(f)]?.color;
      return (
        e && document.documentElement.style.setProperty(`--highlight-color`, e),
        () => {
          document.documentElement.style.removeProperty(`--highlight-color`);
        }
      );
    }, [f]),
    (0, g.useEffect)(() => {
      if (!S || S.module !== `topology`) return;
      let { switchId: e, portNum: t } = S;
      (o(e),
        b && x(),
        setTimeout(() => {
          let n = P.get(e);
          (n &&
            (n.classList.remove(`search-focus`),
            n.offsetWidth,
            n.classList.add(`search-focus`),
            n.scrollIntoView({
              behavior: `smooth`,
              block: `center`,
              inline: `center`,
            })),
            t != null &&
              setTimeout(() => {
                let e = document.getElementById(`client-row-${t}`);
                e &&
                  (e.scrollIntoView({ behavior: `smooth`, block: `center` }),
                  e.classList.remove(`port-focus-flash`),
                  e.offsetWidth,
                  e.classList.add(`port-focus-flash`),
                  setTimeout(
                    () => e.classList.remove(`port-focus-flash`),
                    2e3,
                  ));
              }, 400));
        }, 50),
        C());
    }, [S, C, o, b, x, P]));
  let G = (0, g.useMemo)(() => _(e), [e]),
    le = (0, g.useMemo)(
      () => G.flatMap((e) => e.switches.filter((e) => e.isCore)),
      [G],
    ),
    ue = (0, g.useMemo)(() => c(a, e), [a, e]),
    q = (0, g.useMemo)(
      () => (w ? k(e) : { slots: [], width: 0, height: 0 }),
      [e, w],
    ),
    Y = (0, g.useMemo)(() => {
      let e = q.slots.filter((e) => e.tier === 0);
      return e.length === 0
        ? null
        : {
            x: e.reduce((e, t) => e + t.x, 0) / e.length,
            y: Math.min(...e.map((e) => e.y)),
          };
    }, [q]),
    X = t[0] ?? null,
    { cloudLinks: fe, gatewayLinks: allGatewayLinks, firewallLink: singleFwLink } = ne({
      devices: t,
      cloudIds: (0, g.useMemo)(
        () => (X ? X.wanLinks.map((e) => `wan-cloud-${e.id}`) : []),
        [X],
      ),
      firewallId: X?.id ?? null,
      targetId: X?.lanUplinkTarget ?? null,
      nodeRefs: P,
      canvasRef: j,
      scale: M,
    }),
    Z = (0, g.useMemo)(
      () => n.filter((e) => (e.uplinks ?? []).length > 0),
      [n],
    ),
    _e = se({
      legs: (0, g.useMemo)(
        () =>
          Z.flatMap((e) =>
            (e.uplinks ?? []).map((t) => ({
              uplinkId: t.id,
              frameId: e.id,
              targetId: t.target,
            })),
          ),
        [Z],
      ),
      nodeRefs: P,
      canvasRef: j,
      scale: M,
    });
  function Q(e) {
    if (m) {
      v(e);
      return;
    }
    (l(e), b && x());
  }
  let $ = {
    db: e,
    selectedSwitchId: a,
    vlanFilter: f,
    onSelect: Q,
    registerRef: F,
    compact: w,
    relatedSwitchIds: ie ?? ue,
    zoneOffsets: R,
    onZoneDrag: U,
    registerZoneRef: L,
  };
  return (0, J.jsxs)(`div`, {
    id: `topology-view`,
    className: `w-full h-full relative`,
    children: [
      (0, J.jsxs)(`button`, {
        onClick: E,
        className: `mobile-sidebar-trigger-btn`,
        title: `Danh sách Switch`,
        children: [(0, J.jsx)(`i`, { className: `fas fa-bars` }), ` Switch`],
      }),
      (0, J.jsx)(`button`, {
        onClick: T,
        className: `icon-mode-toggle-btn`,
        title: w
          ? `Thoát chế độ Icon toàn màn hình`
          : `Chế độ Icon toàn màn hình`,
        children: (0, J.jsx)(`i`, {
          className: `fas ${w ? `fa-compress` : `fa-border-all`}`,
        }),
      }),
      (0, J.jsx)(`button`, {
        onClick: h,
        className: `path-trace-toggle-btn ${m ? `active` : ``}`,
        title: m ? `Thoát chế độ tra đường đi` : `Tra đường đi giữa 2 switch`,
        children: (0, J.jsx)(`i`, { className: `fas fa-route` }),
      }),
      (0, J.jsxs)(`div`, {
        className: `zoom-controls`,
        children: [
          (0, J.jsx)(`button`, {
            onClick: () => N(M + K),
            disabled: M >= 2,
            title: `Phóng to`,
            "aria-label": `Phóng to`,
            children: (0, J.jsx)(`i`, { className: `fas fa-plus` }),
          }),
          (0, J.jsxs)(`span`, {
            className: `zoom-controls-value`,
            children: [Math.round(M * 100), `%`],
          }),
          (0, J.jsx)(`button`, {
            onClick: () => N(M - K),
            disabled: M <= 0.3,
            title: `Thu nhỏ`,
            "aria-label": `Thu nhỏ`,
            children: (0, J.jsx)(`i`, { className: `fas fa-minus` }),
          }),
        ],
      }),
      m &&
        (0, J.jsx)(je, {
          from: m.fromId ? (s(m.fromId, e) ?? null) : null,
          to: m.toId ? (s(m.toId, e) ?? null) : null,
          path: W,
          onClear: y,
          onExit: h,
        }),
      !w &&
        (0, J.jsxs)(`div`, {
          className: `map-legend`,
          id: `map-legend-ui`,
          children: [
            (0, J.jsxs)(`h4`, {
              className: `text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5`,
              children: [
                (0, J.jsx)(`i`, {
                  className: `fas fa-info-circle text-indigo-400`,
                }),
                ` Ý nghĩa kết nối`,
              ],
            }),
            (0, J.jsxs)(`div`, {
              className: `flex flex-col gap-2`,
              children: [
                (0, J.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, J.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full`,
                      style: { backgroundColor: `var(--uplink-color)` },
                    }),
                    (0, J.jsx)(`p`, {
                      className: `text-[10px] font-bold text-slate-700`,
                      children: `Uplink`,
                    }),
                  ],
                }),
                (0, J.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, J.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full`,
                      style: { backgroundColor: `var(--downlink-color)` },
                    }),
                    (0, J.jsx)(`p`, {
                      className: `text-[10px] font-bold text-slate-700`,
                      children: `Downlink`,
                    }),
                  ],
                }),
                (0, J.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, J.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full bg-slate-500`,
                    }),
                    (0, J.jsx)(`p`, {
                      className: `text-[10px] font-bold text-slate-700`,
                      children: `Access`,
                    }),
                  ],
                }),
                (0, J.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, J.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full bg-slate-400`,
                    }),
                    (0, J.jsx)(`p`, {
                      className: `text-[10px] font-bold text-slate-700`,
                      children: `Shutdown`,
                    }),
                  ],
                }),
                (0, J.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, J.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full bg-red-500`,
                    }),
                    (0, J.jsx)(`p`, {
                      className: `text-[10px] font-bold text-slate-700`,
                      children: `Err-Disabled`,
                    }),
                  ],
                }),
                (0, J.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, J.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full`,
                      style: { backgroundColor: `var(--wan-color)` },
                    }),
                    (0, J.jsx)(`p`, {
                      className: `text-[10px] font-bold text-slate-700`,
                      children: `WAN / Internet`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      (0, J.jsxs)(`button`, {
        onClick: te,
        className: `fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-lg px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all z-30 items-center gap-2 ${M !== 1 || f !== `none` || Object.keys(R).length > 0 ? `flex` : `hidden`}`,
        children: [
          (0, J.jsx)(`i`, {
            className: `fas fa-compress-arrows-alt text-indigo-500`,
          }),
          ` Khôi phục góc nhìn`,
        ],
      }),
      (0, J.jsxs)(`div`, {
        className: `topo-canvas ${f === `none` ? `` : `vlan-filter-active`}`,
        id: `canvas`,
        ref: j,
        style: { transform: `scale(${M})` },
        children: [
          (0, J.jsx)(ve, { links: ae, zoneLinks: oe }),
          (0, J.jsx)(be, {
            cloudLinks: fe,
            gatewayLinks: allGatewayLinks,
            firewallLink: singleFwLink,
            firewallPort: X?.lanUplinkPort,
          }),
          (0, J.jsx)(Se, { links: _e, frameDB: n }),
          w
            ? (0, J.jsxs)(`div`, {
                className: `relative z-10`,
                id: `topology-grid`,
                style: { width: q.width, height: q.height },
                children: [
                  Y &&
                    (0, J.jsx)(`div`, {
                      style: {
                        position: `absolute`,
                        left: Y.x,
                        top: Y.y - 280,
                        transform: `translate(-50%, -100%)`,
                      },
                      children: (0, J.jsx)(Ae, {
                        firewalls: t,
                        firewall: X,
                        registerRef: F,
                        onManage: O,
                        onAdd: D,
                        onDelete: handleDeleteFw,
                      }),
                    }),
                  q.slots.map((e) =>
                    (0, J.jsx)(
                      `div`,
                      {
                        style: {
                          position: `absolute`,
                          left: e.x,
                          top: e.y,
                          transform: `translate(-50%, -50%)`,
                        },
                        children: (0, J.jsx)(me, {
                          zone: e.zone,
                          floor: e.floor,
                          switches: e.switches,
                          ...$,
                        }),
                      },
                      e.key,
                    ),
                  ),
                ],
              })
            : (0, J.jsxs)(J.Fragment, {
                children: [
                  (0, J.jsx)(`div`, {
                    className: `mb-16 relative z-10`,
                    children: (0, J.jsx)(Ae, {
                      firewalls: t,
                      firewall: X,
                      registerRef: F,
                      onManage: O,
                      onAdd: D,
                      onDelete: handleDeleteFw,
                    }),
                  }),
                  (0, J.jsx)(he, { coreSwitches: le, ...$ }),
                  Z.length > 0 &&
                    (0, J.jsx)(`div`, {
                      className: `mb-16 relative z-10`,
                      children: (0, J.jsx)(Ee, {
                        frames: Z,
                        ontDB: r,
                        registerRef: F,
                        onManage: i,
                      }),
                    }),
                  (0, J.jsxs)(`div`, {
                    className: `w-full flex flex-col items-center gap-y-24 relative z-10`,
                    id: `topology-grid`,
                    children: [
                      (0, J.jsx)(`div`, {
                        className: `absolute top-[10%] bottom-[10%] w-1 bg-slate-200 left-1/2 -translate-x-1/2 z-0 rounded-full`,
                      }),
                      G.map((e) => (0, J.jsx)(ge, { floor: e, ...$ }, e.floor)),
                    ],
                  }),
                ],
              }),
        ],
      }),
    ],
  });
}
export { Fe as default };
