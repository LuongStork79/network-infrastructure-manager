import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Nt as ee,
  Rt as te,
  f as ne,
  l as r,
  s as i,
  t as re,
  tn as a,
} from "./index-QE6I14Fy.js";
import { t as ie } from "./elevator-BpwH_0-s.js";
import { n as ae, t as oe } from "./BackupHistoryModal-DIkefmZZ.js";
var o = e(t(), 1),
  se = a();
function ce(e) {
  let t = [];
  return (
    e.forEach((e) =>
      e.switches.forEach((e) => {
        e.isCore && t.push({ id: e.id, label: `${e.name} (${e.ip})` });
      }),
    ),
    t
  );
}
function le(e, t, n, ee, ne, r) {
  if (!t) return `Vui lòng chọn Core Switch để Firewall kết nối vào!`;
  let i = te(t, e);
  if (!i) return ``;
  if (!(n > 0)) return `Vui lòng nhập cổng kết nối trên Core Switch!`;
  if (i.uplinkTarget !== `none` && i.uplinkPort === n)
    return `LỖI VẬT LÝ: Cổng ${n} trên Core Switch [${i.name}] đang được dùng làm Uplink của chính nó!`;
  if (i.conns.find((e) => e.p === n))
    return `LỖI VẬT LÝ: Cổng ${n} trên Core Switch [${i.name}] đang kết nối với thiết bị đầu cuối! Vui lòng chọn port trống.`;
  for (let ee of e)
    for (let e of ee.switches)
      if (e.uplinkTarget === t && e.targetPort === n)
        return `LỖI VẬT LÝ: Cổng ${n} trên Core Switch [${i.name}] đã bị chiếm dụng bởi Switch con [${e.name}]!`;
  for (let e of ee)
    if (e.id !== ne && e.lanUplinkTarget === t && e.lanUplinkPort === n)
      return `LỖI VẬT LÝ: Cổng ${n} trên Core Switch [${i.name}] đã bị chiếm dụng bởi Firewall khác [${e.name}]!`;
  for (let e of r)
    for (let ee of e.uplinks ?? [])
      if (ee.target === t && ee.port === n)
        return `LỖI VẬT LÝ: Cổng ${n} trên Core Switch [${i.name}] đã bị chiếm dụng bởi OLT [${e.name}]!`;
  return ``;
}
function ue(e) {
  return `Thêm mới Firewall [${e}]`;
}
function de(e) {
  return `Cập nhật thông tin Firewall [${e}]`;
}
function s(e, t) {
  let n =
    t.status === `ok`
      ? `✅ thành công`
      : t.status === `failed`
        ? `❌ thất bại`
        : `⏭️ bỏ qua`;
  return `Backup ${e.name} [${e.brand}] — ${n}${t.configFile ? ` · ` + t.configFile : ``}`;
}
function c() {
  return {
    id: `wan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    isp: ``,
    ip: ``,
    notes: ``,
  };
}
function fe(e) {
  return e
    .filter((e) => e.isp.trim() !== ``)
    .map((e) => {
      let t = e.ip?.trim(),
        n = e.notes?.trim();
      return {
        id: e.id,
        isp: e.isp.trim(),
        ...(t ? { ip: t } : {}),
        ...(n ? { notes: n } : {}),
      };
    });
}
var l = n();
function u(e) {
  let t = (0, se.c)(205),
    {
      mode: n,
      fw: a,
      db: c,
      username: u,
      onSave: ve,
      onDelete: p,
      onClose: m,
    } = e,
    ye = r(f),
    be = r(_e),
    h = r(ge),
    g = r(d),
    xe = i(he),
    [_, Se] = (0, o.useState)(a?.name ?? ``),
    [v, Ce] = (0, o.useState)(a?.brand ?? ``),
    [y, we] = (0, o.useState)(a?.model ?? ``),
    [b, Te] = (0, o.useState)(a?.ip ?? ``),
    [x, Ee] = (0, o.useState)(a?.mac ?? ``),
    [S, De] = (0, o.useState)(a?.zone ?? ``),
    [C, w] = (0, o.useState)(a?.notes ?? ``),
    [T, Oe] = (0, o.useState)(a?.lanUplinkTarget ?? ``),
    [E, ke] = (0, o.useState)(String(a?.lanUplinkPort ?? ``)),
    [deviceType, setDeviceType] = (0, o.useState)(() => {
      if (a?.deviceType) return a.deviceType;
      if (a?.name?.toLowerCase().includes('router') || a?.model?.toLowerCase().includes('router')) return 'router';
      return 'firewall';
    }),
    D;
  t[0] === a?.wanLinks
    ? (D = t[1])
    : ((D = a?.wanLinks ?? []), (t[0] = a?.wanLinks), (t[1] = D));
  let [O, Ae] = (0, o.useState)(D),
    [k, A] = (0, o.useState)(!1),
    [j, M] = (0, o.useState)(!1),
    N,
    P,
    F,
    I,
    L,
    R,
    z,
    B,
    V,
    H,
    je,
    U,
    Me,
    Ne,
    W,
    Pe,
    G,
    Fe,
    K,
    Ie,
    Le,
    q,
    J;
  if (
    t[2] !== g ||
    t[3] !== v ||
    t[4] !== c ||
    t[5] !== ye ||
    t[6] !== a ||
    t[7] !== be ||
    t[8] !== b ||
    t[9] !== E ||
    t[10] !== T ||
    t[11] !== x ||
    t[12] !== n ||
    t[13] !== y ||
    t[14] !== _ ||
    t[15] !== C ||
    t[16] !== m ||
    t[17] !== ve ||
    t[18] !== xe ||
    t[19] !== u ||
    t[20] !== O ||
    t[21] !== S
  ) {
    P = ce(c);
    let e;
    (t[45] !== c || t[46] !== T
      ? ((e = T ? te(T, c) : void 0), (t[45] = c), (t[46] = T), (t[47] = e))
      : (e = t[47]),
      (Le = e));
    let r;
    (t[48] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((r = function (e, t) {
          Ae((n) => n.map((n) => (n.id === e ? { ...n, ...t } : n)));
        }),
        (t[48] = r))
      : (r = t[48]),
      (J = r));
    let i;
    (t[49] !== g ||
    t[50] !== v ||
    t[51] !== c ||
    t[52] !== ye ||
    t[53] !== a ||
    t[54] !== be ||
    t[55] !== b ||
    t[56] !== E ||
    t[57] !== T ||
    t[58] !== x ||
    t[59] !== n ||
    t[60] !== y ||
    t[61] !== _ ||
    t[62] !== C ||
    t[63] !== ve ||
    t[64] !== xe ||
    t[65] !== u ||
    t[66] !== O ||
    t[67] !== S
      ? ((i = function () {
          let e = _.trim(),
            t = parseInt(E, 10) || 0,
            te = le(c, T, t, ye, a?.id ?? null, be);
          if (te) {
            xe(te, `error`);
            return;
          }
          let isRt = deviceType === 'router',
            defName = isRt ? 'Router Gateway' : 'Firewall',
            ne = e || defName,
            r = n === `add` ? (isRt ? `Thêm mới Router [${ne}]` : ue(ne)) : (isRt ? `Cập nhật thông tin Router [${ne}]` : de(ne)),
            i = {
              id: a?.id ?? `fw-${Date.now()}`,
              name: ne,
              deviceType: deviceType,
              brand: v.trim(),
              model: y.trim(),
              ip: b.trim(),
              mac: x.trim(),
              wanLinks: fe(O),
              lanUplinkTarget: T,
              lanUplinkPort: t,
              logs: ee(a?.logs, r, u),
              ...(S.trim() ? { zone: S.trim() } : {}),
              ...(C.trim() ? { notes: C.trim() } : {}),
              ...(a?.backup ? { backup: a.backup } : {}),
            };
          (ve(i), g(`${isRt ? 'Router' : 'Firewall'}: ${ne}`, r, u));
        }),
        (t[49] = g),
        (t[50] = v),
        (t[51] = c),
        (t[52] = ye),
        (t[53] = a),
        (t[54] = be),
        (t[55] = b),
        (t[56] = E),
        (t[57] = T),
        (t[58] = x),
        (t[59] = n),
        (t[60] = y),
        (t[61] = _),
        (t[62] = C),
        (t[63] = ve),
        (t[64] = xe),
        (t[65] = u),
        (t[66] = O),
        (t[67] = S),
        (t[68] = i))
      : (i = t[68]),
      (N = i));
    let re;
    (t[69] === a
      ? (re = t[70])
      : ((re = a?.backup ? ne(a.backup) : null), (t[69] = a), (t[70] = re)),
      (q = re),
      (je = `modal`),
      t[71] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((U = { display: `flex`, zIndex: 215 }), (t[71] = U))
        : (U = t[71]),
      (B = `modal-content shadow-2xl`),
      t[72] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = {
            width: 560,
            maxWidth: `96vw`,
            maxHeight: `90vh`,
            display: `flex`,
            flexDirection: `column`,
          }),
          (t[72] = V))
        : (V = t[72]));
    let ae;
    t[73] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((ae = (0, l.jsx)(`div`, {
          className: `w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xs border border-orange-100`,
          children: (0, l.jsx)(`i`, { className: `fas fa-shield-halved` }),
        })),
        (t[73] = ae))
      : (ae = t[73]);
    let oe = n === `add` ? `Thêm Firewall` : `Chỉnh sửa Firewall`,
      o;
    t[74] === oe
      ? (o = t[75])
      : ((o = (0, l.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [ae, (0, l.jsx)(`span`, { children: oe })],
        })),
        (t[74] = oe),
        (t[75] = o));
    let se;
    t[76] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((se = (0, l.jsx)(`i`, { className: `fas fa-times` })), (t[76] = se))
      : (se = t[76]);
    let s;
    (t[77] === m
      ? (s = t[78])
      : ((s = (0, l.jsx)(`button`, {
          onClick: m,
          title: `Đóng`,
          className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100 shrink-0 ml-2`,
          children: se,
        })),
        (t[77] = m),
        (t[78] = s)),
      t[79] !== o || t[80] !== s
        ? ((H = (0, l.jsxs)(`div`, {
            className: `flex justify-between items-center mb-6 shrink-0`,
            children: [o, s],
          })),
          (t[79] = o),
          (t[80] = s),
          (t[81] = H))
        : (H = t[81]),
      (z = `flex-1 overflow-y-auto custom-scroll`),
      (F = `space-y-4`));
    let deviceTypeSelector = (0, l.jsxs)(`div`, {
      className: `flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4`,
      children: [
        (0, l.jsxs)(`button`, {
          type: `button`,
          onClick: () => {
            setDeviceType('router');
            if (!_ || _ === 'FW-Core-01' || _ === 'Firewall') Se('Router-01');
          },
          className: `flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer \${
            deviceType === 'router'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`,
          children: [(0, l.jsx)(`i`, { className: `fas fa-route` }), ' Router Gateway']
        }),
        (0, l.jsxs)(`button`, {
          type: `button`,
          onClick: () => {
            setDeviceType('firewall');
            if (!_ || _ === 'Router-01' || _ === 'Router Gateway') Se('FW-Core-01');
          },
          className: `flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer \${
            deviceType === 'firewall'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`,
          children: [(0, l.jsx)(`i`, { className: `fas fa-fire` }), ' Firewall']
        })
      ]
    });
    let pe;
    t[82] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((pe = (0, l.jsx)(`label`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Tên thiết bị`,
        })),
        (t[82] = pe))
      : (pe = t[82]);
    let he;
    t[83] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((he = (e) => Se(e.target.value)), (t[83] = he))
      : (he = t[83]);
    let d;
    t[84] === _
      ? (d = t[85])
      : ((d = (0, l.jsxs)(`div`, {
          children: [
            pe,
            (0, l.jsx)(`input`, {
              value: _,
              onChange: he,
              placeholder: `FW-Core-01`,
              className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
            }),
          ],
        })),
        (t[84] = _),
        (t[85] = d));
    let ge;
    t[86] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((ge = (0, l.jsx)(`label`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Hãng`,
        })),
        (t[86] = ge))
      : (ge = t[86]);
    let _e;
    t[87] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((_e = (e) => Ce(e.target.value)), (t[87] = _e))
      : (_e = t[87]);
    let f;
    (t[88] === v
      ? (f = t[89])
      : ((f = (0, l.jsxs)(`div`, {
          children: [
            ge,
            (0, l.jsx)(`input`, {
              value: v,
              onChange: _e,
              placeholder: `Fortinet, Sophos...`,
              className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
            }),
          ],
        })),
        (t[88] = v),
        (t[89] = f)),
      t[90] !== d || t[91] !== f
        ? ((I = (0, l.jsxs)(`div`, {
            className: `grid grid-cols-2 gap-4`,
            children: [d, f],
          })),
          (t[90] = d),
          (t[91] = f),
          (t[92] = I))
        : (I = t[92]));
    let p;
    t[93] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, l.jsx)(`label`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Địa chỉ IP quản lý`,
        })),
        (t[93] = p))
      : (p = t[93]);
    let h;
    t[94] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((h = (e) => Te(e.target.value)), (t[94] = h))
      : (h = t[94]);
    let w;
    t[95] === b
      ? (w = t[96])
      : ((w = (0, l.jsxs)(`div`, {
          children: [
            p,
            (0, l.jsx)(`input`, {
              value: b,
              onChange: h,
              placeholder: `10.x.x.x`,
              className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
            }),
          ],
        })),
        (t[95] = b),
        (t[96] = w));
    let ke;
    t[97] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((ke = (0, l.jsx)(`label`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Địa chỉ MAC`,
        })),
        (t[97] = ke))
      : (ke = t[97]);
    let D;
    t[98] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((D = (e) => Ee(ie(e.target.value))), (t[98] = D))
      : (D = t[98]);
    let k;
    (t[99] === x
      ? (k = t[100])
      : ((k = (0, l.jsxs)(`div`, {
          children: [
            ke,
            (0, l.jsx)(`input`, {
              value: x,
              onChange: D,
              maxLength: 17,
              placeholder: `AA:BB:CC:DD:EE:FF`,
              className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none uppercase`,
            }),
          ],
        })),
        (t[99] = x),
        (t[100] = k)),
      t[101] !== w || t[102] !== k
        ? ((L = (0, l.jsxs)(`div`, {
            className: `grid grid-cols-2 gap-4`,
            children: [w, k],
          })),
          (t[101] = w),
          (t[102] = k),
          (t[103] = L))
        : (L = t[103]));
    let A;
    t[104] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((A = (0, l.jsx)(`label`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Model`,
        })),
        (t[104] = A))
      : (A = t[104]);
    let j;
    t[105] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((j = (e) => we(e.target.value)), (t[105] = j))
      : (j = t[105]);
    let M;
    t[106] === y
      ? (M = t[107])
      : ((M = (0, l.jsxs)(`div`, {
          children: [
            A,
            (0, l.jsx)(`input`, {
              value: y,
              onChange: j,
              placeholder: `FortiGate 100F`,
              className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
            }),
          ],
        })),
        (t[106] = y),
        (t[107] = M));
    let Y;
    t[108] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((Y = (0, l.jsx)(`label`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Zone (Khu vực)`,
        })),
        (t[108] = Y))
      : (Y = t[108]);
    let X;
    t[109] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((X = (e) => De(e.target.value)), (t[109] = X))
      : (X = t[109]);
    let Z;
    (t[110] === S
      ? (Z = t[111])
      : ((Z = (0, l.jsxs)(`div`, {
          children: [
            Y,
            (0, l.jsx)(`input`, {
              value: S,
              onChange: X,
              placeholder: `Server Room`,
              className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
            }),
          ],
        })),
        (t[110] = S),
        (t[111] = Z)),
      t[112] !== M || t[113] !== Z
        ? ((R = (0, l.jsxs)(`div`, {
            className: `grid grid-cols-2 gap-4`,
            children: [M, Z],
          })),
          (t[112] = M),
          (t[113] = Z),
          (t[114] = R))
        : (R = t[114]),
      (Ie = `grid grid-cols-[1fr_auto] gap-4`),
      t[115] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((K = (0, l.jsx)(`label`, {
            htmlFor: `fw-input-lan-target`,
            className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
            children: `Kết nối LAN vào Core Switch`,
          })),
          (t[115] = K))
        : (K = t[115]),
      (Me = `fw-input-lan-target`),
      (Ne = T),
      t[116] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = (e) => Oe(e.target.value)), (t[116] = W))
        : (W = t[116]),
      (Pe = `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`),
      t[117] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((G = (0, l.jsx)(`option`, {
            value: ``,
            children: `— Chọn Core Switch —`,
          })),
          (t[117] = G))
        : (G = t[117]),
      (Fe = P.map(me)),
      (t[2] = g),
      (t[3] = v),
      (t[4] = c),
      (t[5] = ye),
      (t[6] = a),
      (t[7] = be),
      (t[8] = b),
      (t[9] = E),
      (t[10] = T),
      (t[11] = x),
      (t[12] = n),
      (t[13] = y),
      (t[14] = _),
      (t[15] = C),
      (t[16] = m),
      (t[17] = ve),
      (t[18] = xe),
      (t[19] = u),
      (t[20] = O),
      (t[21] = S),
      (t[22] = N),
      (t[23] = P),
      (t[24] = F),
      (t[25] = I),
      (t[26] = L),
      (t[27] = R),
      (t[28] = z),
      (t[29] = B),
      (t[30] = V),
      (t[31] = H),
      (t[32] = je),
      (t[33] = U),
      (t[34] = Me),
      (t[35] = Ne),
      (t[36] = W),
      (t[37] = Pe),
      (t[38] = G),
      (t[39] = Fe),
      (t[40] = K),
      (t[41] = Ie),
      (t[42] = Le),
      (t[43] = q),
      (t[44] = J));
  } else
    ((N = t[22]),
      (P = t[23]),
      (F = t[24]),
      (I = t[25]),
      (L = t[26]),
      (R = t[27]),
      (z = t[28]),
      (B = t[29]),
      (V = t[30]),
      (H = t[31]),
      (je = t[32]),
      (U = t[33]),
      (Me = t[34]),
      (Ne = t[35]),
      (W = t[36]),
      (Pe = t[37]),
      (G = t[38]),
      (Fe = t[39]),
      (K = t[40]),
      (Ie = t[41]),
      (Le = t[42]),
      (q = t[43]),
      (J = t[44]));
  let Y;
  t[118] !== Me ||
  t[119] !== Ne ||
  t[120] !== W ||
  t[121] !== Pe ||
  t[122] !== G ||
  t[123] !== Fe
    ? ((Y = (0, l.jsxs)(`select`, {
        id: Me,
        value: Ne,
        onChange: W,
        className: Pe,
        children: [G, Fe],
      })),
      (t[118] = Me),
      (t[119] = Ne),
      (t[120] = W),
      (t[121] = Pe),
      (t[122] = G),
      (t[123] = Fe),
      (t[124] = Y))
    : (Y = t[124]);
  let X;
  t[125] === P.length
    ? (X = t[126])
    : ((X =
        P.length === 0 &&
        (0, l.jsx)(`p`, {
          className: `text-[10px] text-red-500 font-bold mt-1`,
          children: `Chưa có Core Switch nào trong hệ thống — hãy đánh dấu 1 switch là Core trước.`,
        })),
      (t[125] = P.length),
      (t[126] = X));
  let Z;
  t[127] !== Y || t[128] !== X || t[129] !== K
    ? ((Z = (0, l.jsxs)(`div`, { children: [K, Y, X] })),
      (t[127] = Y),
      (t[128] = X),
      (t[129] = K),
      (t[130] = Z))
    : (Z = t[130]);
  let Re;
  t[131] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (0, l.jsx)(`label`, {
        htmlFor: `fw-input-lan-port`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Cổng (Port)`,
      })),
      (t[131] = Re))
    : (Re = t[131]);
  let ze = Le?.ports,
    Be;
  t[132] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Be = (e) => ke(e.target.value)), (t[132] = Be))
    : (Be = t[132]);
  let Ve = Le ? `1-${Le.ports}` : `#`,
    He;
  t[133] !== E || t[134] !== ze || t[135] !== Ve
    ? ((He = (0, l.jsxs)(`div`, {
        className: `w-24`,
        children: [
          Re,
          (0, l.jsx)(`input`, {
            id: `fw-input-lan-port`,
            type: `number`,
            min: 1,
            max: ze,
            value: E,
            onChange: Be,
            placeholder: Ve,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none`,
          }),
        ],
      })),
      (t[133] = E),
      (t[134] = ze),
      (t[135] = Ve),
      (t[136] = He))
    : (He = t[136]);
  let Ue;
  t[137] !== Z || t[138] !== He || t[139] !== Ie
    ? ((Ue = (0, l.jsxs)(`div`, { className: Ie, children: [Z, He] })),
      (t[137] = Z),
      (t[138] = He),
      (t[139] = Ie),
      (t[140] = Ue))
    : (Ue = t[140]);
  let We;
  t[141] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((We = (0, l.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Đường truyền Internet (WAN / ISP)`,
      })),
      (t[141] = We))
    : (We = t[141]);
  let Ge;
  t[142] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ge = () => Ae(pe)), (t[142] = Ge))
    : (Ge = t[142]);
  let Ke;
  t[143] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ke = (0, l.jsxs)(`div`, {
        className: `flex items-center justify-between mb-2`,
        children: [
          We,
          (0, l.jsxs)(`button`, {
            type: `button`,
            onClick: Ge,
            className: `text-[10px] font-bold text-orange-600 hover:text-orange-700`,
            children: [
              (0, l.jsx)(`i`, { className: `fas fa-plus` }),
              ` Thêm đường truyền`,
            ],
          }),
        ],
      })),
      (t[143] = Ke))
    : (Ke = t[143]);
  let qe;
  if (t[144] !== J || t[145] !== O) {
    let e;
    (t[147] === J
      ? (e = t[148])
      : ((e = (e) =>
          (0, l.jsxs)(
            `div`,
            {
              className: `flex items-center gap-2`,
              children: [
                (0, l.jsx)(`input`, {
                  value: e.isp,
                  onChange: (t) => J(e.id, { isp: t.target.value }),
                  placeholder: `VD: FPT Telecom`,
                  className: `flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none`,
                }),
                (0, l.jsx)(`input`, {
                  value: e.ip ?? ``,
                  onChange: (t) => J(e.id, { ip: t.target.value }),
                  placeholder: `IP public (tuỳ chọn)`,
                  className: `flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none font-mono`,
                }),
                (0, l.jsx)(`button`, {
                  type: `button`,
                  onClick: () => Ae((t) => t.filter((t) => t.id !== e.id)),
                  title: `Xóa đường truyền này`,
                  className: `w-8 h-8 shrink-0 bg-red-50 border border-red-200 text-red-500 rounded-lg hover:bg-red-100`,
                  children: (0, l.jsx)(`i`, { className: `fas fa-times` }),
                }),
              ],
            },
            e.id,
          )),
        (t[147] = J),
        (t[148] = e)),
      (qe = O.map(e)),
      (t[144] = J),
      (t[145] = O),
      (t[146] = qe));
  } else qe = t[146];
  let Je;
  t[149] === O.length
    ? (Je = t[150])
    : ((Je =
        O.length === 0 &&
        (0, l.jsx)(`p`, {
          className: `text-[10px] text-slate-400 italic`,
          children: `Chưa có đường truyền nào — bấm "Thêm đường truyền" nếu có 1 hoặc nhiều nhà mạng.`,
        })),
      (t[149] = O.length),
      (t[150] = Je));
  let Ye;
  t[151] !== qe || t[152] !== Je
    ? ((Ye = (0, l.jsxs)(`div`, {
        children: [
          Ke,
          (0, l.jsxs)(`div`, { className: `space-y-2`, children: [qe, Je] }),
        ],
      })),
      (t[151] = qe),
      (t[152] = Je),
      (t[153] = Ye))
    : (Ye = t[153]);
  let Xe;
  t[154] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Xe = (0, l.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Ghi chú`,
      })),
      (t[154] = Xe))
    : (Xe = t[154]);
  let Ze;
  t[155] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ze = (e) => w(e.target.value)), (t[155] = Ze))
    : (Ze = t[155]);
  let Qe;
  t[156] === C
    ? (Qe = t[157])
    : ((Qe = (0, l.jsxs)(`div`, {
        children: [
          Xe,
          (0, l.jsx)(`textarea`, {
            value: C,
            onChange: Ze,
            rows: 2,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none resize-none`,
          }),
        ],
      })),
      (t[156] = C),
      (t[157] = Qe));
  let $e;
  t[158] !== a || t[159] !== n || t[160] !== q
    ? (($e =
        n === `edit` &&
        a &&
        (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsxs)(`div`, {
              className: `border-t border-slate-100 pt-4`,
              children: [
                (0, l.jsxs)(`div`, {
                  className: `flex items-center justify-between mb-2`,
                  children: [
                    (0, l.jsx)(`label`, {
                      className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                      children: `Backup cấu hình`,
                    }),
                    q &&
                      (0, l.jsxs)(`span`, {
                        className: `text-[10px] font-black px-2 py-0.5 rounded-full border ${q.bgClass} ${q.textClass}`,
                        children: [q.icon, ` `, q.label],
                      }),
                  ],
                }),
                (0, l.jsxs)(`div`, {
                  className: `flex gap-2`,
                  children: [
                    (0, l.jsx)(`button`, {
                      type: `button`,
                      onClick: () => A(!0),
                      className: `flex-1 py-2 text-[10px] font-black bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all`,
                      children: `Cập nhật Backup`,
                    }),
                    a.backup?.logs &&
                      a.backup.logs.length > 0 &&
                      (0, l.jsx)(`button`, {
                        type: `button`,
                        onClick: () => M(!0),
                        className: `px-3 py-2 text-[10px] font-black bg-slate-50 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-100 transition-all`,
                        children: `🕐 Lịch sử`,
                      }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)(`div`, {
              children: [
                (0, l.jsx)(`label`, {
                  className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                  children: `Lịch sử thay đổi`,
                }),
                (0, l.jsx)(`div`, {
                  className: `mt-1.5`,
                  children: (0, l.jsx)(re, { logs: a.logs ?? [] }),
                }),
              ],
            }),
          ],
        })),
      (t[158] = a),
      (t[159] = n),
      (t[160] = q),
      (t[161] = $e))
    : ($e = t[161]);
  let et;
  t[162] !== F ||
  t[163] !== I ||
  t[164] !== L ||
  t[165] !== R ||
  t[166] !== Ue ||
  t[167] !== Ye ||
  t[168] !== Qe ||
  t[169] !== $e
    ? ((et = (0, l.jsxs)(`div`, {
        className: F,
        children: [deviceTypeSelector, I, L, R, Ue, Ye, Qe, $e],
      })),
      (t[162] = F),
      (t[163] = I),
      (t[164] = L),
      (t[165] = R),
      (t[166] = Ue),
      (t[167] = Ye),
      (t[168] = Qe),
      (t[169] = $e),
      (t[170] = et))
    : (et = t[170]);
  let tt;
  t[171] !== z || t[172] !== et
    ? ((tt = (0, l.jsx)(`div`, { className: z, children: et })),
      (t[171] = z),
      (t[172] = et),
      (t[173] = tt))
    : (tt = t[173]);
  let Q;
  t[174] !== n || t[175] !== p
    ? ((Q =
        n === `edit` &&
        (0, l.jsx)(`button`, {
          onClick: p,
          className: `flex-[0.5] py-3 bg-red-50 border border-red-200 text-sm font-bold text-red-600 hover:bg-red-100 rounded-xl transition-all`,
          children: `Xóa`,
        })),
      (t[174] = n),
      (t[175] = p),
      (t[176] = Q))
    : (Q = t[176]);
  let nt;
  t[177] === m
    ? (nt = t[178])
    : ((nt = (0, l.jsx)(`button`, {
        onClick: m,
        className: `flex-1 py-3 bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all`,
        children: `Hủy`,
      })),
      (t[177] = m),
      (t[178] = nt));
  let rt;
  t[179] === N
    ? (rt = t[180])
    : ((rt = (0, l.jsx)(`button`, {
        onClick: N,
        className: `flex-1 py-3 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-md hover:bg-black transition-all`,
        children: `Lưu Firewall`,
      })),
      (t[179] = N),
      (t[180] = rt));
  let it;
  t[181] !== Q || t[182] !== nt || t[183] !== rt
    ? ((it = (0, l.jsxs)(`div`, {
        className: `flex gap-3 mt-8 pt-6 border-t border-slate-100 shrink-0`,
        children: [Q, nt, rt],
      })),
      (t[181] = Q),
      (t[182] = nt),
      (t[183] = rt),
      (t[184] = it))
    : (it = t[184]);
  let at;
  t[185] !== B || t[186] !== V || t[187] !== H || t[188] !== tt || t[189] !== it
    ? ((at = (0, l.jsxs)(`div`, {
        className: B,
        style: V,
        children: [H, tt, it],
      })),
      (t[185] = B),
      (t[186] = V),
      (t[187] = H),
      (t[188] = tt),
      (t[189] = it),
      (t[190] = at))
    : (at = t[190]);
  let ot;
  t[191] !== g || t[192] !== a || t[193] !== h || t[194] !== k
    ? ((ot =
        k &&
        a &&
        (0, l.jsx)(ae, {
          sw: a,
          onClose: () => A(!1),
          onSave: (e) => {
            (h(a.id, e),
              g(`Backup · ${a.name}`, s(a, e), e.by || `system`, e.date),
              A(!1));
          },
        })),
      (t[191] = g),
      (t[192] = a),
      (t[193] = h),
      (t[194] = k),
      (t[195] = ot))
    : (ot = t[195]);
  let $;
  t[196] !== a || t[197] !== j
    ? (($ = j && a && (0, l.jsx)(oe, { sw: a, onClose: () => M(!1) })),
      (t[196] = a),
      (t[197] = j),
      (t[198] = $))
    : ($ = t[198]);
  let st;
  return (
    t[199] !== je ||
    t[200] !== U ||
    t[201] !== at ||
    t[202] !== ot ||
    t[203] !== $
      ? ((st = (0, l.jsxs)(`div`, {
          className: je,
          style: U,
          children: [at, ot, $],
        })),
        (t[199] = je),
        (t[200] = U),
        (t[201] = at),
        (t[202] = ot),
        (t[203] = $),
        (t[204] = st))
      : (st = t[204]),
    st
  );
}
function pe(e) {
  return [...e, c()];
}
function me(e) {
  return (0, l.jsx)(`option`, { value: e.id, children: e.label }, e.id);
}
function he(e) {
  return e.showDialog;
}
function d(e) {
  return e.addGlobalLog;
}
function ge(e) {
  return e.saveFirewallBackup;
}
function _e(e) {
  return e.GponFrameDB;
}
function f(e) {
  return e.FirewallDB;
}
export { u as default };
