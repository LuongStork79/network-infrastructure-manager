import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import { l as r, s as i, tn as a, u as ee } from "./index-QE6I14Fy.js";
var o = e(t(), 1),
  s = a();
function c(e, t, n, r) {
  let i = [...e].sort(
    (e, t) =>
      parseInt(e.extension || `9999`, 10) -
        parseInt(t.extension || `9999`, 10) ||
      (e.name || ``).localeCompare(t.name || ``),
  );
  (t !== `all` && (i = i.filter((e) => e.status === t)),
    n !== `all` && (i = i.filter((e) => e.floor === n)));
  let a = r.toLowerCase().trim();
  return (
    a &&
      (i = i.filter(
        (e) =>
          (e.extension || ``).includes(a) ||
          (e.name || ``).toLowerCase().includes(a) ||
          (e.ip || ``).includes(a) ||
          (e.location || ``).toLowerCase().includes(a) ||
          (e.model || ``).toLowerCase().includes(a) ||
          (e.floor || ``).toLowerCase().includes(a),
      )),
    i
  );
}
function l(e) {
  return {
    total: e.length,
    active: e.filter((e) => e.status === `active`).length,
    unregistered: e.filter((e) => e.status === `unregistered`).length,
    offline: e.filter((e) => e.status === `offline`).length,
    noExt: e.filter((e) => !e.extension).length,
  };
}
function u(e) {
  return [...new Set(e.map((e) => e.floor || ``).filter(Boolean))].sort();
}
function te(e, t) {
  let n = new Set(t.map((e) => e.ip).filter(Boolean)),
    r = [];
  return (
    e.forEach((e) =>
      e.switches.forEach((t) => {
        t.conns.forEach((i) => {
          (i.icon === `fa-phone` || String(i.v) === `150`) &&
            (i.n || i.ip) &&
            (n.has(i.ip ?? ``) ||
              r.push({
                name: i.n || ``,
                ip: i.ip || ``,
                mac: i.mac || ``,
                swName: t.name,
                swId: t.id,
                floor: e.floor,
                port: i.p,
              }));
        });
      }),
    ),
    r
  );
}
function ne(e) {
  return `Thêm mới: Ext ${e.extension || `—`} · ${e.name || `—`}`;
}
function d(e, t) {
  return `Gán vào Switch [${e}] Port ${t}`;
}
var f = {
  extension: `Extension`,
  name: `Tên`,
  ip: `IP`,
  mac: `MAC`,
  brand: `Thương hiệu`,
  model: `Model`,
  floor: `Tầng`,
  location: `Vị trí`,
  switchId: `Switch`,
  switchPort: `Port SW`,
  status: `Trạng thái`,
  notes: `Ghi chú`,
};
function re(e, t) {
  let n = [];
  return (
    Object.keys(f).forEach((r) => {
      let i = r,
        a = String(e[i] ?? ``),
        ee = String(t[i] ?? ``);
      a !== ee && n.push(`${f[r]}: "${a || `—`}" → "${ee || `—`}"`);
    }),
    n.length ? `Cập nhật: ${n.join(` | `)}` : null
  );
}
var p = n();
function ie(e) {
  let t = (0, s.c)(173),
    {
      record: n,
      db: a,
      username: c,
      onSave: l,
      onClose: u,
      initialFloor: te,
      initialSwitchId: d,
      initialSwitchPort: f,
    } = e,
    ie = i(ue),
    de = r(le),
    [m, fe] = (0, o.useState)(n?.extension ?? ``),
    [h, pe] = (0, o.useState)(n?.name ?? ``),
    [g, me] = (0, o.useState)(n?.ip ?? ``),
    [_, he] = (0, o.useState)(n?.mac ?? ``),
    [v, ge] = (0, o.useState)(n?.brand ?? ``),
    [y, _e] = (0, o.useState)(n?.model ?? ``),
    [b, ve] = (0, o.useState)(n?.floor ?? te ?? ``),
    [x, ye] = (0, o.useState)(n?.location ?? ``),
    [be, xe] = (0, o.useState)(n?.switchId ?? d ?? ``),
    [S, Se] = (0, o.useState)(
      n?.switchPort == null
        ? f == null
          ? ``
          : String(f)
        : String(n.switchPort),
    ),
    [C, Ce] = (0, o.useState)(n?.status ?? `active`),
    [w, we] = (0, o.useState)(n?.notes ?? ``),
    T;
  t[0] === a ? (T = t[1]) : ((T = new Set(a.map(ce))), (t[0] = a), (t[1] = T));
  let E;
  t[2] === T ? (E = t[3]) : ((E = [...T]), (t[2] = T), (t[3] = E));
  let Te = E,
    D,
    O,
    k,
    A,
    j,
    M,
    N,
    P,
    F,
    I,
    L,
    R,
    z,
    Ee,
    B,
    De,
    V,
    Oe,
    H,
    ke,
    U,
    Ae;
  if (
    t[4] !== de ||
    t[5] !== v ||
    t[6] !== a ||
    t[7] !== m ||
    t[8] !== b ||
    t[9] !== Te ||
    t[10] !== g ||
    t[11] !== x ||
    t[12] !== _ ||
    t[13] !== y ||
    t[14] !== h ||
    t[15] !== w ||
    t[16] !== u ||
    t[17] !== l ||
    t[18] !== n ||
    t[19] !== ie ||
    t[20] !== C ||
    t[21] !== be ||
    t[22] !== S ||
    t[23] !== c
  ) {
    let e = a.flatMap(se),
      r;
    (t[46] !== de ||
    t[47] !== v ||
    t[48] !== m ||
    t[49] !== b ||
    t[50] !== g ||
    t[51] !== x ||
    t[52] !== _ ||
    t[53] !== y ||
    t[54] !== h ||
    t[55] !== w ||
    t[56] !== l ||
    t[57] !== n ||
    t[58] !== ie ||
    t[59] !== C ||
    t[60] !== be ||
    t[61] !== S ||
    t[62] !== c
      ? ((r = function () {
          let e = m.trim(),
            t = h.trim();
          if (!e && !t) {
            ie(`Vui lòng nhập số nhánh hoặc tên máy!`, `error`);
            return;
          }
          let r = {
              extension: e,
              name: t,
              ip: g.trim(),
              mac: _.trim(),
              brand: v.trim(),
              model: y.trim(),
              floor: b,
              location: x.trim(),
              switchId: be,
              switchPort: parseInt(S, 10) || null,
              status: C,
              notes: w.trim(),
            },
            i = `Phone ${r.extension || r.name || `N/A`}`;
          if (n) {
            let e = re(n, r);
            (l({ ...n, ...r, logs: e ? ee(n.logs, e, c) : n.logs }),
              e && de(i, e, c));
          } else {
            let e = ne(r);
            (l({ id: `phone-${Date.now()}`, ...r, logs: ee(void 0, e, c) }),
              de(i, e, c));
          }
        }),
        (t[46] = de),
        (t[47] = v),
        (t[48] = m),
        (t[49] = b),
        (t[50] = g),
        (t[51] = x),
        (t[52] = _),
        (t[53] = y),
        (t[54] = h),
        (t[55] = w),
        (t[56] = l),
        (t[57] = n),
        (t[58] = ie),
        (t[59] = C),
        (t[60] = be),
        (t[61] = S),
        (t[62] = c),
        (t[63] = r))
      : (r = t[63]),
      (D = r),
      (Ee = `modal`),
      t[64] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((B = { display: `flex`, zIndex: 225 }), (t[64] = B))
        : (B = t[64]),
      (L = `modal-content shadow-2xl`),
      t[65] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((R = {
            width: 560,
            maxWidth: `96vw`,
            maxHeight: `90vh`,
            display: `flex`,
            flexDirection: `column`,
          }),
          (t[65] = R))
        : (R = t[65]));
    let i;
    t[66] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((i = (0, p.jsx)(`div`, {
          className: `w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-xs border border-green-100`,
          children: (0, p.jsx)(`i`, { className: `fas fa-phone-alt` }),
        })),
        (t[66] = i))
      : (i = t[66]);
    let o = n ? `Sửa Điện Thoại IP` : `Thêm Điện Thoại IP`,
      s;
    t[67] === o
      ? (s = t[68])
      : ((s = (0, p.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [i, (0, p.jsx)(`span`, { children: o })],
        })),
        (t[67] = o),
        (t[68] = s));
    let te;
    t[69] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((te = (0, p.jsx)(`i`, { className: `fas fa-times` })), (t[69] = te))
      : (te = t[69]);
    let d;
    (t[70] === u
      ? (d = t[71])
      : ((d = (0, p.jsx)(`button`, {
          onClick: u,
          className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
          children: te,
        })),
        (t[70] = u),
        (t[71] = d)),
      t[72] !== s || t[73] !== d
        ? ((z = (0, p.jsxs)(`div`, {
            className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
            children: [s, d],
          })),
          (t[72] = s),
          (t[73] = d),
          (t[74] = z))
        : (z = t[74]),
      (I = `flex-1 overflow-y-auto custom-scroll`),
      (Ae = `grid grid-cols-2 gap-4`));
    let f;
    t[75] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((f = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `Số nhánh (Extension) *`,
        })),
        (t[75] = f))
      : (f = t[75]);
    let ce;
    (t[76] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((ce = (e) => fe(e.target.value)), (t[76] = ce))
      : (ce = t[76]),
      t[77] === m
        ? (O = t[78])
        : ((O = (0, p.jsxs)(`div`, {
            children: [
              f,
              (0, p.jsx)(`input`, {
                value: m,
                onChange: ce,
                placeholder: `VD: 101, 202...`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[77] = m),
          (t[78] = O)));
    let le;
    t[79] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((le = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `Tên / Vị trí *`,
        })),
        (t[79] = le))
      : (le = t[79]);
    let ue;
    (t[80] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((ue = (e) => pe(e.target.value)), (t[80] = ue))
      : (ue = t[80]),
      t[81] === h
        ? (k = t[82])
        : ((k = (0, p.jsxs)(`div`, {
            children: [
              le,
              (0, p.jsx)(`input`, {
                value: h,
                onChange: ue,
                placeholder: `VD: Lễ tân, Phòng Giám đốc...`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[81] = h),
          (t[82] = k)));
    let Se;
    t[83] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((Se = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `IP Address`,
        })),
        (t[83] = Se))
      : (Se = t[83]);
    let Ce;
    (t[84] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((Ce = (e) => me(e.target.value)), (t[84] = Ce))
      : (Ce = t[84]),
      t[85] === g
        ? (A = t[86])
        : ((A = (0, p.jsxs)(`div`, {
            children: [
              Se,
              (0, p.jsx)(`input`, {
                value: g,
                onChange: Ce,
                placeholder: `172.16.16.x`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[85] = g),
          (t[86] = A)));
    let we;
    t[87] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((we = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `MAC Address`,
        })),
        (t[87] = we))
      : (we = t[87]);
    let T;
    (t[88] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((T = (e) => he(e.target.value)), (t[88] = T))
      : (T = t[88]),
      t[89] === _
        ? (j = t[90])
        : ((j = (0, p.jsxs)(`div`, {
            children: [
              we,
              (0, p.jsx)(`input`, {
                value: _,
                onChange: T,
                placeholder: `AA:BB:CC:DD:EE:FF`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[89] = _),
          (t[90] = j)));
    let E;
    t[91] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((E = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `Hãng sản xuất`,
        })),
        (t[91] = E))
      : (E = t[91]);
    let W;
    (t[92] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((W = (e) => ge(e.target.value)), (t[92] = W))
      : (W = t[92]),
      t[93] === v
        ? (M = t[94])
        : ((M = (0, p.jsxs)(`div`, {
            children: [
              E,
              (0, p.jsx)(`input`, {
                value: v,
                onChange: W,
                placeholder: `Yealink, Cisco, Grandstream...`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[93] = v),
          (t[94] = M)));
    let G;
    t[95] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((G = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `Model`,
        })),
        (t[95] = G))
      : (G = t[95]);
    let K;
    (t[96] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((K = (e) => _e(e.target.value)), (t[96] = K))
      : (K = t[96]),
      t[97] === y
        ? (N = t[98])
        : ((N = (0, p.jsxs)(`div`, {
            children: [
              G,
              (0, p.jsx)(`input`, {
                value: y,
                onChange: K,
                placeholder: `T46G, CP-7961G...`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[97] = y),
          (t[98] = N)));
    let q;
    t[99] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((q = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `Tầng`,
        })),
        (t[99] = q))
      : (q = t[99]);
    let J;
    t[100] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((J = (e) => ve(e.target.value)), (t[100] = J))
      : (J = t[100]);
    let Y;
    t[101] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((Y = (0, p.jsx)(`option`, { value: ``, children: `-- Chọn tầng --` })),
        (t[101] = Y))
      : (Y = t[101]);
    let X;
    (t[102] === Te
      ? (X = t[103])
      : ((X = Te.map(oe)), (t[102] = Te), (t[103] = X)),
      t[104] !== b || t[105] !== X
        ? ((P = (0, p.jsxs)(`div`, {
            children: [
              q,
              (0, p.jsxs)(`select`, {
                value: b,
                onChange: J,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
                children: [Y, X],
              }),
            ],
          })),
          (t[104] = b),
          (t[105] = X),
          (t[106] = P))
        : (P = t[106]));
    let Z;
    t[107] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((Z = (0, p.jsx)(`label`, {
          className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
          children: `Phòng / Vị trí chi tiết`,
        })),
        (t[107] = Z))
      : (Z = t[107]);
    let Q;
    (t[108] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((Q = (e) => ye(e.target.value)), (t[108] = Q))
      : (Q = t[108]),
      t[109] === x
        ? (F = t[110])
        : ((F = (0, p.jsxs)(`div`, {
            children: [
              Z,
              (0, p.jsx)(`input`, {
                value: x,
                onChange: Q,
                placeholder: `Phòng họp A, Quầy lễ tân...`,
                className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
              }),
            ],
          })),
          (t[109] = x),
          (t[110] = F)),
      t[111] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((U = (0, p.jsx)(`label`, {
            className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
            children: `Switch kết nối`,
          })),
          (t[111] = U))
        : (U = t[111]),
      (De = be),
      t[112] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = (e) => xe(e.target.value)), (t[112] = V))
        : (V = t[112]),
      (Oe = `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`),
      t[113] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((H = (0, p.jsx)(`option`, {
            value: ``,
            children: `-- Chọn Switch --`,
          })),
          (t[113] = H))
        : (H = t[113]),
      (ke = e.map(ae)),
      (t[4] = de),
      (t[5] = v),
      (t[6] = a),
      (t[7] = m),
      (t[8] = b),
      (t[9] = Te),
      (t[10] = g),
      (t[11] = x),
      (t[12] = _),
      (t[13] = y),
      (t[14] = h),
      (t[15] = w),
      (t[16] = u),
      (t[17] = l),
      (t[18] = n),
      (t[19] = ie),
      (t[20] = C),
      (t[21] = be),
      (t[22] = S),
      (t[23] = c),
      (t[24] = D),
      (t[25] = O),
      (t[26] = k),
      (t[27] = A),
      (t[28] = j),
      (t[29] = M),
      (t[30] = N),
      (t[31] = P),
      (t[32] = F),
      (t[33] = I),
      (t[34] = L),
      (t[35] = R),
      (t[36] = z),
      (t[37] = Ee),
      (t[38] = B),
      (t[39] = De),
      (t[40] = V),
      (t[41] = Oe),
      (t[42] = H),
      (t[43] = ke),
      (t[44] = U),
      (t[45] = Ae));
  } else
    ((D = t[24]),
      (O = t[25]),
      (k = t[26]),
      (A = t[27]),
      (j = t[28]),
      (M = t[29]),
      (N = t[30]),
      (P = t[31]),
      (F = t[32]),
      (I = t[33]),
      (L = t[34]),
      (R = t[35]),
      (z = t[36]),
      (Ee = t[37]),
      (B = t[38]),
      (De = t[39]),
      (V = t[40]),
      (Oe = t[41]),
      (H = t[42]),
      (ke = t[43]),
      (U = t[44]),
      (Ae = t[45]));
  let W;
  t[114] !== De ||
  t[115] !== V ||
  t[116] !== Oe ||
  t[117] !== H ||
  t[118] !== ke
    ? ((W = (0, p.jsxs)(`select`, {
        value: De,
        onChange: V,
        className: Oe,
        children: [H, ke],
      })),
      (t[114] = De),
      (t[115] = V),
      (t[116] = Oe),
      (t[117] = H),
      (t[118] = ke),
      (t[119] = W))
    : (W = t[119]);
  let G;
  t[120] !== W || t[121] !== U
    ? ((G = (0, p.jsxs)(`div`, { children: [U, W] })),
      (t[120] = W),
      (t[121] = U),
      (t[122] = G))
    : (G = t[122]);
  let K;
  t[123] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((K = (0, p.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Port trên Switch`,
      })),
      (t[123] = K))
    : (K = t[123]);
  let q;
  t[124] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((q = (e) => Se(e.target.value)), (t[124] = q))
    : (q = t[124]);
  let J;
  t[125] === S
    ? (J = t[126])
    : ((J = (0, p.jsxs)(`div`, {
        children: [
          K,
          (0, p.jsx)(`input`, {
            value: S,
            onChange: q,
            type: `number`,
            min: 1,
            placeholder: `Số port`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
          }),
        ],
      })),
      (t[125] = S),
      (t[126] = J));
  let Y;
  t[127] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Y = (0, p.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Trạng thái`,
      })),
      (t[127] = Y))
    : (Y = t[127]);
  let X;
  t[128] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((X = (e) => Ce(e.target.value)), (t[128] = X))
    : (X = t[128]);
  let Z, Q, je;
  t[129] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Z = (0, p.jsx)(`option`, { value: `active`, children: `● Active` })),
      (Q = (0, p.jsx)(`option`, {
        value: `unregistered`,
        children: `○ Unregistered`,
      })),
      (je = (0, p.jsx)(`option`, { value: `offline`, children: `✕ Offline` })),
      (t[129] = Z),
      (t[130] = Q),
      (t[131] = je))
    : ((Z = t[129]), (Q = t[130]), (je = t[131]));
  let Me;
  t[132] === C
    ? (Me = t[133])
    : ((Me = (0, p.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          Y,
          (0, p.jsxs)(`select`, {
            value: C,
            onChange: X,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
            children: [Z, Q, je],
          }),
        ],
      })),
      (t[132] = C),
      (t[133] = Me));
  let Ne;
  t[134] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ne = (0, p.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Ghi chú`,
      })),
      (t[134] = Ne))
    : (Ne = t[134]);
  let Pe;
  t[135] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Pe = (e) => we(e.target.value)), (t[135] = Pe))
    : (Pe = t[135]);
  let Fe;
  t[136] === w
    ? (Fe = t[137])
    : ((Fe = (0, p.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          Ne,
          (0, p.jsx)(`input`, {
            value: w,
            onChange: Pe,
            placeholder: `Ghi chú thêm...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-green-500 transition-colors`,
          }),
        ],
      })),
      (t[136] = w),
      (t[137] = Fe));
  let Ie;
  t[138] !== O ||
  t[139] !== k ||
  t[140] !== A ||
  t[141] !== j ||
  t[142] !== M ||
  t[143] !== N ||
  t[144] !== P ||
  t[145] !== F ||
  t[146] !== G ||
  t[147] !== J ||
  t[148] !== Me ||
  t[149] !== Fe ||
  t[150] !== Ae
    ? ((Ie = (0, p.jsxs)(`div`, {
        className: Ae,
        children: [O, k, A, j, M, N, P, F, G, J, Me, Fe],
      })),
      (t[138] = O),
      (t[139] = k),
      (t[140] = A),
      (t[141] = j),
      (t[142] = M),
      (t[143] = N),
      (t[144] = P),
      (t[145] = F),
      (t[146] = G),
      (t[147] = J),
      (t[148] = Me),
      (t[149] = Fe),
      (t[150] = Ae),
      (t[151] = Ie))
    : (Ie = t[151]);
  let $;
  t[152] !== I || t[153] !== Ie
    ? (($ = (0, p.jsx)(`div`, { className: I, children: Ie })),
      (t[152] = I),
      (t[153] = Ie),
      (t[154] = $))
    : ($ = t[154]);
  let Le;
  t[155] === u
    ? (Le = t[156])
    : ((Le = (0, p.jsx)(`button`, {
        onClick: u,
        className: `flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50`,
        children: `Hủy`,
      })),
      (t[155] = u),
      (t[156] = Le));
  let Re;
  t[157] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (0, p.jsx)(`i`, { className: `fas fa-save` })), (t[157] = Re))
    : (Re = t[157]);
  let ze;
  t[158] === D
    ? (ze = t[159])
    : ((ze = (0, p.jsxs)(`button`, {
        onClick: D,
        className: `flex-1 px-4 py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 flex items-center justify-center gap-2`,
        children: [Re, ` Lưu`],
      })),
      (t[158] = D),
      (t[159] = ze));
  let Be;
  t[160] !== Le || t[161] !== ze
    ? ((Be = (0, p.jsxs)(`div`, {
        className: `flex gap-3 mt-5 pt-4 border-t border-slate-100 shrink-0`,
        children: [Le, ze],
      })),
      (t[160] = Le),
      (t[161] = ze),
      (t[162] = Be))
    : (Be = t[162]);
  let Ve;
  t[163] !== L || t[164] !== R || t[165] !== z || t[166] !== $ || t[167] !== Be
    ? ((Ve = (0, p.jsxs)(`div`, {
        className: L,
        style: R,
        children: [z, $, Be],
      })),
      (t[163] = L),
      (t[164] = R),
      (t[165] = z),
      (t[166] = $),
      (t[167] = Be),
      (t[168] = Ve))
    : (Ve = t[168]);
  let He;
  return (
    t[169] !== Ee || t[170] !== B || t[171] !== Ve
      ? ((He = (0, p.jsx)(`div`, { className: Ee, style: B, children: Ve })),
        (t[169] = Ee),
        (t[170] = B),
        (t[171] = Ve),
        (t[172] = He))
      : (He = t[172]),
    He
  );
}
function ae(e) {
  return (0, p.jsxs)(
    `option`,
    { value: e.id, children: [e.name, ` (`, e.floor, `)`] },
    e.id,
  );
}
function oe(e) {
  return (0, p.jsx)(`option`, { value: e, children: e }, e);
}
function se(e) {
  return e.switches.map((t) => ({ id: t.id, name: t.name, floor: e.floor }));
}
function ce(e) {
  return e.floor;
}
function le(e) {
  return e.addGlobalLog;
}
function ue(e) {
  return e.showDialog;
}
export { l as a, u as i, d as n, c as o, ne as r, te as s, ie as t };
