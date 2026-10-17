import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Bt as r,
  Ft as i,
  Jt as a,
  Mt as o,
  Nt as s,
  Vt as c,
  r as l,
  s as u,
  tn as d,
} from "./index-QE6I14Fy.js";
import { t as f } from "./elevator-BpwH_0-s.js";
var p = d(),
  m = e(t(), 1),
  h = n();
function g(e) {
  let t = (0, p.c)(150),
    {
      sw: n,
      port: d,
      db: g,
      username: v,
      canEdit: ee,
      onSave: y,
      onClose: b,
      onNavigateToSwitch: te,
      initialIcon: ne,
    } = e,
    re = u(_),
    ie;
  if (t[0] !== g || t[1] !== d || t[2] !== n) {
    let e = r(n.id, g);
    ((ie = c(n, d, e)), (t[0] = g), (t[1] = d), (t[2] = n), (t[3] = ie));
  } else ie = t[3];
  let x = ie,
    S = x.connection,
    [ae, oe] = (0, m.useState)(S?.v == null ? `` : String(S.v)),
    [C, se] = (0, m.useState)(S?.n ?? ``),
    [w, ce] = (0, m.useState)(S?.ip ?? ``),
    [T, le] = (0, m.useState)(S?.mac ?? ``),
    [E, ue] = (0, m.useState)(S?.icon || ne || `fa-desktop`),
    [D, de] = (0, m.useState)(S?.status ?? `active`),
    [O, fe] = (0, m.useState)(S?.nvr ?? ``),
    [k, pe] = (0, m.useState)(S?.ch == null ? `` : String(S.ch)),
    [A, me] = (0, m.useState)(S?.camType ?? ``),
    j = E === `fa-video`,
    M = parseInt(ae, 10) || 0,
    he = l[M],
    ge;
  if (t[4] !== g || t[5] !== n.id) {
    let e;
    (t[7] === n.id
      ? (e = t[8])
      : ((e = (e) => e.switches.some((e) => e.id === n.id)),
        (t[7] = n.id),
        (t[8] = e)),
      (ge = g.findIndex(e)),
      (t[4] = g),
      (t[5] = n.id),
      (t[6] = ge));
  } else ge = t[6];
  let N = ge,
    _e;
  t[9] !== A ||
  t[10] !== k ||
  t[11] !== S ||
  t[12] !== N ||
  t[13] !== E ||
  t[14] !== w ||
  t[15] !== j ||
  t[16] !== T ||
  t[17] !== C ||
  t[18] !== O ||
  t[19] !== y ||
  t[20] !== d ||
  t[21] !== re ||
  t[22] !== D ||
  t[23] !== n ||
  t[24] !== v ||
  t[25] !== M
    ? ((_e = function () {
        let e = C.trim();
        if (!e) {
          re(`Vui lòng nhập tên thiết bị!`, `error`);
          return;
        }
        if (M <= 0) {
          re(`VLAN không hợp lệ!`, `error`);
          return;
        }
        let t = parseInt(k, 10),
          r = {
            p: d,
            v: M,
            n: e,
            status: D,
            icon: E,
            ...(w.trim() && { ip: w.trim() }),
            ...(T.trim() && { mac: T.trim() }),
            ...(j && O.trim() && { nvr: O.trim() }),
            ...(j && t > 0 && { ch: t }),
            ...(j && A.trim() && { camType: A.trim() }),
          },
          i = a(n.conns, r),
          o = S
            ? `Cập nhật cấu hình Port ${d}: ${e} (VLAN ${M})`
            : `Thêm thiết bị Client vào Port ${d}: ${e} (VLAN ${M})`;
        y(N, { ...n, conns: i, logs: s(n.logs, o, v) });
      }),
      (t[9] = A),
      (t[10] = k),
      (t[11] = S),
      (t[12] = N),
      (t[13] = E),
      (t[14] = w),
      (t[15] = j),
      (t[16] = T),
      (t[17] = C),
      (t[18] = O),
      (t[19] = y),
      (t[20] = d),
      (t[21] = re),
      (t[22] = D),
      (t[23] = n),
      (t[24] = v),
      (t[25] = M),
      (t[26] = _e))
    : (_e = t[26]);
  let ve = _e,
    ye;
  t[27] !== S ||
  t[28] !== N ||
  t[29] !== y ||
  t[30] !== d ||
  t[31] !== n ||
  t[32] !== v
    ? ((ye = function () {
        if (!S) return;
        let e = i(n.conns, d),
          t = `Xoá kết nối Client khỏi Port ${d} (trước đó: ${S.n || S.ip || `—`})`;
        y(N, { ...n, conns: e, logs: s(n.logs, t, v) });
      }),
      (t[27] = S),
      (t[28] = N),
      (t[29] = y),
      (t[30] = d),
      (t[31] = n),
      (t[32] = v),
      (t[33] = ye))
    : (ye = t[33]);
  let be = ye,
    xe = x.kind === `uplink` || x.kind === `downlink`;
  if (!ee || xe) {
    let e;
    t[34] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((e = { display: `flex`, zIndex: 220 }), (t[34] = e))
      : (e = t[34]);
    let r;
    t[35] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((r = { width: 440, maxWidth: `96vw` }), (t[35] = r))
      : (r = t[35]);
    let i;
    t[36] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((i = (0, h.jsx)(`div`, {
          className: `w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs border border-slate-200`,
          children: (0, h.jsx)(`i`, { className: `fas fa-ethernet` }),
        })),
        (t[36] = i))
      : (i = t[36]);
    let a;
    t[37] !== d || t[38] !== n.name
      ? ((a = (0, h.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [
            i,
            (0, h.jsxs)(`span`, { children: [`Port `, d, ` — `, n.name] }),
          ],
        })),
        (t[37] = d),
        (t[38] = n.name),
        (t[39] = a))
      : (a = t[39]);
    let o;
    t[40] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((o = (0, h.jsx)(`i`, { className: `fas fa-times` })), (t[40] = o))
      : (o = t[40]);
    let s;
    t[41] === b
      ? (s = t[42])
      : ((s = (0, h.jsx)(`button`, {
          onClick: b,
          className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
          children: o,
        })),
        (t[41] = b),
        (t[42] = s));
    let c;
    t[43] !== s || t[44] !== a
      ? ((c = (0, h.jsxs)(`div`, {
          className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4`,
          children: [a, s],
        })),
        (t[43] = s),
        (t[44] = a),
        (t[45] = c))
      : (c = t[45]);
    let l;
    t[46] !== x.kind || t[47] !== d
      ? ((l =
          x.kind === `uplink` &&
          (0, h.jsxs)(`div`, {
            className: `p-5 bg-slate-50 border border-slate-200 rounded-xl text-center`,
            children: [
              (0, h.jsx)(`i`, {
                className: `fas fa-link text-2xl text-slate-400 mb-2`,
              }),
              (0, h.jsxs)(`p`, {
                className: `text-sm font-bold text-slate-700`,
                children: [`Port `, d, ` là cổng Uplink/Stack`],
              }),
              (0, h.jsxs)(`p`, {
                className: `text-xs text-slate-400 mt-1`,
                children: [
                  `Cổng này nối lên thiết bị cha. Sửa qua nút `,
                  (0, h.jsx)(`i`, { className: `fas fa-cog` }),
                  ` "Cài đặt Switch" ở đầu trang chi tiết.`,
                ],
              }),
            ],
          })),
        (t[46] = x.kind),
        (t[47] = d),
        (t[48] = l))
      : (l = t[48]);
    let u;
    t[49] !== x.downlinkChildName || t[50] !== x.kind || t[51] !== d
      ? ((u =
          x.kind === `downlink` &&
          (0, h.jsxs)(`div`, {
            className: `p-5 bg-slate-50 border border-slate-200 rounded-xl text-center`,
            children: [
              (0, h.jsx)(`i`, {
                className: `fas fa-arrow-down text-2xl text-slate-400 mb-2`,
              }),
              (0, h.jsxs)(`p`, {
                className: `text-sm font-bold text-slate-700`,
                children: [`Port `, d, ` là cổng Downlink`],
              }),
              (0, h.jsxs)(`p`, {
                className: `text-xs text-slate-400 mt-1`,
                children: [
                  `Đang kết nối xuống switch con `,
                  (0, h.jsx)(`strong`, { children: x.downlinkChildName }),
                  `. Sửa qua switch đó.`,
                ],
              }),
            ],
          })),
        (t[49] = x.downlinkChildName),
        (t[50] = x.kind),
        (t[51] = d),
        (t[52] = u))
      : (u = t[52]);
    let f;
    t[53] !== S || t[54] !== x.kind
      ? ((f =
          x.kind === `client` &&
          S &&
          (0, h.jsxs)(`div`, {
            className: `p-5 bg-slate-50 border border-slate-200 rounded-xl`,
            children: [
              (0, h.jsxs)(`p`, {
                className: `text-sm font-bold text-slate-700 flex items-center gap-2`,
                children: [
                  (0, h.jsx)(`i`, {
                    className: `fas ${S.icon || `fa-desktop`} text-indigo-500`,
                  }),
                  ` `,
                  S.n || `—`,
                ],
              }),
              (0, h.jsxs)(`p`, {
                className: `text-xs text-slate-400 mt-1`,
                children: [
                  `VLAN `,
                  S.v,
                  ` `,
                  S.ip && `· ${S.ip}`,
                  ` `,
                  S.mac && `· ${S.mac}`,
                ],
              }),
            ],
          })),
        (t[53] = S),
        (t[54] = x.kind),
        (t[55] = f))
      : (f = t[55]);
    let p;
    t[56] === x.kind
      ? (p = t[57])
      : ((p =
          x.kind === `empty` &&
          (0, h.jsx)(`div`, {
            className: `p-5 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center`,
            children: (0, h.jsx)(`p`, {
              className: `text-xs text-slate-400 font-medium`,
              children: `Port trống — chưa cấu hình.`,
            }),
          })),
        (t[56] = x.kind),
        (t[57] = p));
    let m;
    t[58] !== x.downlinkChildId || t[59] !== x.kind || t[60] !== te
      ? ((m =
          x.kind === `downlink` &&
          (0, h.jsxs)(`button`, {
            onClick: () => te(x.downlinkChildId),
            className: `flex-1 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all`,
            children: [
              (0, h.jsx)(`i`, { className: `fas fa-arrow-right mr-1.5` }),
              ` Đi tới Switch con`,
            ],
          })),
        (t[58] = x.downlinkChildId),
        (t[59] = x.kind),
        (t[60] = te),
        (t[61] = m))
      : (m = t[61]);
    let g;
    t[62] === b
      ? (g = t[63])
      : ((g = (0, h.jsx)(`button`, {
          onClick: b,
          className: `flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
          children: `Đóng`,
        })),
        (t[62] = b),
        (t[63] = g));
    let _;
    t[64] !== m || t[65] !== g
      ? ((_ = (0, h.jsxs)(`div`, {
          className: `flex gap-3 mt-6 pt-4 border-t border-slate-100`,
          children: [m, g],
        })),
        (t[64] = m),
        (t[65] = g),
        (t[66] = _))
      : (_ = t[66]);
    let v;
    return (
      t[67] !== c ||
      t[68] !== l ||
      t[69] !== u ||
      t[70] !== f ||
      t[71] !== p ||
      t[72] !== _
        ? ((v = (0, h.jsx)(`div`, {
            className: `modal`,
            style: e,
            children: (0, h.jsxs)(`div`, {
              className: `modal-content shadow-2xl`,
              style: r,
              children: [c, l, u, f, p, _],
            }),
          })),
          (t[67] = c),
          (t[68] = l),
          (t[69] = u),
          (t[70] = f),
          (t[71] = p),
          (t[72] = _),
          (t[73] = v))
        : (v = t[73]),
      v
    );
  }
  let Se;
  t[74] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Se = { display: `flex`, zIndex: 220 }), (t[74] = Se))
    : (Se = t[74]);
  let Ce;
  t[75] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ce = {
        width: 480,
        maxWidth: `96vw`,
        maxHeight: `92vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[75] = Ce))
    : (Ce = t[75]);
  let we;
  t[76] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((we = (0, h.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
        children: (0, h.jsx)(`i`, { className: `fas fa-ethernet` }),
      })),
      (t[76] = we))
    : (we = t[76]);
  let Te = S ? `Sửa cấu hình Port ${d}` : `Cấu hình Port ${d}`,
    P;
  t[77] === Te
    ? (P = t[78])
    : ((P = (0, h.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [we, (0, h.jsx)(`span`, { children: Te })],
      })),
      (t[77] = Te),
      (t[78] = P));
  let Ee;
  t[79] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ee = (0, h.jsx)(`i`, { className: `fas fa-times` })), (t[79] = Ee))
    : (Ee = t[79]);
  let F;
  t[80] === b
    ? (F = t[81])
    : ((F = (0, h.jsx)(`button`, {
        onClick: b,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: Ee,
      })),
      (t[80] = b),
      (t[81] = F));
  let I;
  t[82] !== F || t[83] !== P
    ? ((I = (0, h.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [P, F],
      })),
      (t[82] = F),
      (t[83] = P),
      (t[84] = I))
    : (I = t[84]);
  let De;
  t[85] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((De = (0, h.jsx)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3`,
        children: `Loại thiết bị`,
      })),
      (t[85] = De))
    : (De = t[85]);
  let L;
  t[86] === E
    ? (L = t[87])
    : ((L = o.map((e) =>
        (0, h.jsxs)(
          `button`,
          {
            type: `button`,
            onClick: () => ue(e.icon),
            title: e.label,
            className: `flex flex-col items-center gap-1 py-2.5 rounded-xl border text-[9px] font-bold transition-all ${E === e.icon ? `bg-indigo-600 border-indigo-600 text-white shadow-md` : `bg-white border-slate-200 text-slate-500 hover:border-indigo-300`}`,
            children: [
              (0, h.jsx)(`i`, { className: `fas ${e.icon} text-sm` }),
              (0, h.jsx)(`span`, {
                className: `truncate w-full text-center px-0.5`,
                children: e.label,
              }),
            ],
          },
          e.icon,
        ),
      )),
      (t[86] = E),
      (t[87] = L));
  let R;
  t[88] === L
    ? (R = t[89])
    : ((R = (0, h.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [
          De,
          (0, h.jsx)(`div`, {
            className: `grid grid-cols-4 gap-2`,
            children: L,
          }),
        ],
      })),
      (t[88] = L),
      (t[89] = R));
  let Oe;
  t[90] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Oe = (0, h.jsx)(`label`, {
        htmlFor: `port-cfg-name`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Tên thiết bị`,
      })),
      (t[90] = Oe))
    : (Oe = t[90]);
  let ke;
  t[91] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ke = (e) => se(e.target.value)), (t[91] = ke))
    : (ke = t[91]);
  let z;
  t[92] === C
    ? (z = t[93])
    : ((z = (0, h.jsxs)(`div`, {
        children: [
          Oe,
          (0, h.jsx)(`input`, {
            id: `port-cfg-name`,
            value: C,
            onChange: ke,
            placeholder: `VD: PC-Kế toán-01`,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500`,
          }),
        ],
      })),
      (t[92] = C),
      (t[93] = z));
  let Ae;
  t[94] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ae = (0, h.jsx)(`label`, {
        htmlFor: `port-cfg-vlan`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `VLAN`,
      })),
      (t[94] = Ae))
    : (Ae = t[94]);
  let je;
  t[95] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((je = (e) => oe(e.target.value)), (t[95] = je))
    : (je = t[95]);
  let B;
  t[96] === ae
    ? (B = t[97])
    : ((B = (0, h.jsx)(`input`, {
        id: `port-cfg-vlan`,
        type: `number`,
        value: ae,
        onChange: je,
        placeholder: `VD: 114`,
        className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500`,
      })),
      (t[96] = ae),
      (t[97] = B));
  let V;
  t[98] === he
    ? (V = t[99])
    : ((V =
        he &&
        (0, h.jsxs)(`p`, {
          className: `text-[9px] font-bold text-indigo-500 mt-1`,
          children: [
            (0, h.jsx)(`i`, { className: `fas ${he.icon} mr-1` }),
            he.name,
          ],
        })),
      (t[98] = he),
      (t[99] = V));
  let H;
  t[100] !== B || t[101] !== V
    ? ((H = (0, h.jsxs)(`div`, { children: [Ae, B, V] })),
      (t[100] = B),
      (t[101] = V),
      (t[102] = H))
    : (H = t[102]);
  let U;
  t[103] !== z || t[104] !== H
    ? ((U = (0, h.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [z, H],
      })),
      (t[103] = z),
      (t[104] = H),
      (t[105] = U))
    : (U = t[105]);
  let Me;
  t[106] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Me = (0, h.jsx)(`label`, {
        htmlFor: `port-cfg-ip`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `IP (tuỳ chọn)`,
      })),
      (t[106] = Me))
    : (Me = t[106]);
  let Ne;
  t[107] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ne = (e) => ce(e.target.value)), (t[107] = Ne))
    : (Ne = t[107]);
  let W;
  t[108] === w
    ? (W = t[109])
    : ((W = (0, h.jsxs)(`div`, {
        children: [
          Me,
          (0, h.jsx)(`input`, {
            id: `port-cfg-ip`,
            value: w,
            onChange: Ne,
            placeholder: `10.x.x.x`,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500`,
          }),
        ],
      })),
      (t[108] = w),
      (t[109] = W));
  let Pe;
  t[110] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Pe = (0, h.jsx)(`label`, {
        htmlFor: `port-cfg-mac`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `MAC (tuỳ chọn)`,
      })),
      (t[110] = Pe))
    : (Pe = t[110]);
  let Fe;
  t[111] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Fe = (e) => le(f(e.target.value))), (t[111] = Fe))
    : (Fe = t[111]);
  let G;
  t[112] === T
    ? (G = t[113])
    : ((G = (0, h.jsxs)(`div`, {
        children: [
          Pe,
          (0, h.jsx)(`input`, {
            id: `port-cfg-mac`,
            value: T,
            onChange: Fe,
            maxLength: 17,
            placeholder: `AA:BB:CC:DD:EE:FF`,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none uppercase focus:border-indigo-500`,
          }),
        ],
      })),
      (t[112] = T),
      (t[113] = G));
  let K;
  t[114] !== W || t[115] !== G
    ? ((K = (0, h.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [W, G],
      })),
      (t[114] = W),
      (t[115] = G),
      (t[116] = K))
    : (K = t[116]);
  let Ie;
  t[117] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ie = (0, h.jsx)(`label`, {
        htmlFor: `port-cfg-status`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Trạng thái`,
      })),
      (t[117] = Ie))
    : (Ie = t[117]);
  let Le;
  t[118] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Le = (e) => de(e.target.value)), (t[118] = Le))
    : (Le = t[118]);
  let Re, ze, Be;
  t[119] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (0, h.jsx)(`option`, {
        value: `active`,
        children: `🟢 Active — Đang hoạt động`,
      })),
      (ze = (0, h.jsx)(`option`, {
        value: `shutdown`,
        children: `⚫ Shutdown — Đã tắt cổng`,
      })),
      (Be = (0, h.jsx)(`option`, {
        value: `err-disabled`,
        children: `🔴 Err-Disabled — Lỗi cổng`,
      })),
      (t[119] = Re),
      (t[120] = ze),
      (t[121] = Be))
    : ((Re = t[119]), (ze = t[120]), (Be = t[121]));
  let q;
  t[122] === D
    ? (q = t[123])
    : ((q = (0, h.jsxs)(`div`, {
        children: [
          Ie,
          (0, h.jsxs)(`select`, {
            id: `port-cfg-status`,
            value: D,
            onChange: Le,
            className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500`,
            children: [Re, ze, Be],
          }),
        ],
      })),
      (t[122] = D),
      (t[123] = q));
  let J;
  t[124] !== A || t[125] !== k || t[126] !== j || t[127] !== O
    ? ((J =
        j &&
        (0, h.jsxs)(`div`, {
          className: `bg-amber-50 rounded-xl border border-amber-100 p-4`,
          children: [
            (0, h.jsxs)(`p`, {
              className: `text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3`,
              children: [
                (0, h.jsx)(`i`, { className: `fas fa-video mr-1` }),
                ` Thông tin Camera (VLAN 120)`,
              ],
            }),
            (0, h.jsxs)(`div`, {
              className: `grid grid-cols-2 gap-3`,
              children: [
                (0, h.jsxs)(`div`, {
                  children: [
                    (0, h.jsx)(`label`, {
                      htmlFor: `port-cfg-nvr`,
                      className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                      children: `Tên NVR`,
                    }),
                    (0, h.jsx)(`input`, {
                      id: `port-cfg-nvr`,
                      value: O,
                      onChange: (e) => fe(e.target.value),
                      placeholder: `VD: NVR-01`,
                      className: `w-full mt-1.5 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500`,
                    }),
                  ],
                }),
                (0, h.jsxs)(`div`, {
                  children: [
                    (0, h.jsx)(`label`, {
                      htmlFor: `port-cfg-ch`,
                      className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                      children: `Kênh (CH)`,
                    }),
                    (0, h.jsx)(`input`, {
                      id: `port-cfg-ch`,
                      type: `number`,
                      value: k,
                      onChange: (e) => pe(e.target.value),
                      placeholder: `VD: 3`,
                      className: `w-full mt-1.5 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500`,
                    }),
                  ],
                }),
                (0, h.jsxs)(`div`, {
                  className: `col-span-2`,
                  children: [
                    (0, h.jsx)(`label`, {
                      htmlFor: `port-cfg-camtype`,
                      className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                      children: `Loại Camera`,
                    }),
                    (0, h.jsx)(`input`, {
                      id: `port-cfg-camtype`,
                      value: A,
                      onChange: (e) => me(e.target.value),
                      placeholder: `VD: Dome 4MP`,
                      className: `w-full mt-1.5 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        })),
      (t[124] = A),
      (t[125] = k),
      (t[126] = j),
      (t[127] = O),
      (t[128] = J))
    : (J = t[128]);
  let Y;
  t[129] !== R || t[130] !== U || t[131] !== K || t[132] !== q || t[133] !== J
    ? ((Y = (0, h.jsxs)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll space-y-4 pr-1`,
        children: [R, U, K, q, J],
      })),
      (t[129] = R),
      (t[130] = U),
      (t[131] = K),
      (t[132] = q),
      (t[133] = J),
      (t[134] = Y))
    : (Y = t[134]);
  let X;
  t[135] !== S || t[136] !== be
    ? ((X =
        S &&
        (0, h.jsx)(`button`, {
          onClick: be,
          className: `flex-[0.6] py-3 bg-red-50 border border-red-200 text-sm font-bold text-red-600 hover:bg-red-100 rounded-xl transition-all`,
          children: `Xoá kết nối`,
        })),
      (t[135] = S),
      (t[136] = be),
      (t[137] = X))
    : (X = t[137]);
  let Z;
  t[138] === b
    ? (Z = t[139])
    : ((Z = (0, h.jsx)(`button`, {
        onClick: b,
        className: `flex-1 py-3 bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all`,
        children: `Hủy`,
      })),
      (t[138] = b),
      (t[139] = Z));
  let Q;
  t[140] === ve
    ? (Q = t[141])
    : ((Q = (0, h.jsx)(`button`, {
        onClick: ve,
        className: `flex-1 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all`,
        children: `Lưu`,
      })),
      (t[140] = ve),
      (t[141] = Q));
  let $;
  t[142] !== X || t[143] !== Z || t[144] !== Q
    ? (($ = (0, h.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [X, Z, Q],
      })),
      (t[142] = X),
      (t[143] = Z),
      (t[144] = Q),
      (t[145] = $))
    : ($ = t[145]);
  let Ve;
  return (
    t[146] !== I || t[147] !== Y || t[148] !== $
      ? ((Ve = (0, h.jsx)(`div`, {
          className: `modal`,
          style: Se,
          children: (0, h.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: Ce,
            children: [I, Y, $],
          }),
        })),
        (t[146] = I),
        (t[147] = Y),
        (t[148] = $),
        (t[149] = Ve))
      : (Ve = t[149]),
    Ve
  );
}
function _(e) {
  return e.showDialog;
}
export { g as default };
