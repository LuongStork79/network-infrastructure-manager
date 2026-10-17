import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  At as r,
  Ct as i,
  Dt as a,
  Et as o,
  Nt as s,
  St as c,
  Tt as l,
  _t as u,
  c as d,
  f,
  gt as p,
  l as m,
  s as h,
  t as g,
  tn as _,
  vt as v,
  wt as y,
  yt as b,
} from "./index-QE6I14Fy.js";
import x from "./GponFrameManageModal-N7lwuioW.js";
import { n as S, t as C } from "./BackupHistoryModal-DIkefmZZ.js";
var w = _(),
  T = e(t(), 1),
  E = n(),
  D = [`TV`, `WiFi`, `Data`, `Trống`],
  O = {
    TV: `bg-amber-500 text-white`,
    WiFi: `bg-emerald-500 text-white`,
    Data: `bg-blue-500 text-white`,
    Trống: `bg-slate-100 text-slate-500`,
  },
  k = [`NetNam`, `VNPT`],
  A = {
    NetNam: { active: `bg-emerald-600 text-white`, dot: `bg-emerald-500` },
    VNPT: { active: `bg-blue-600 text-white`, dot: `bg-blue-500` },
    "TP-Link": { active: `bg-sky-600 text-white`, dot: `bg-sky-500` },
  },
  j = `TP-Link`;
function M() {
  return [1, 2, 3, 4].map((e) => ({ port: e, type: `Trống` }));
}
function N(e) {
  let t = (0, w.c)(155),
    {
      ont: n,
      frame: i,
      slot: a,
      port: o,
      ontDB: c,
      username: l,
      onSave: d,
      onDelete: _,
      onClose: y,
    } = e,
    x = m(ee),
    N = m(B),
    te = h(z),
    [V, ne] = (0, T.useState)(String(n?.onuId ?? ``)),
    [H, re] = (0, T.useState)(n?.sn ?? ``),
    [U, ie] = (0, T.useState)(n?.mac ?? ``),
    [W, ae] = (0, T.useState)(n?.brand ?? ``),
    [G, oe] = (0, T.useState)(n?.model ?? ``),
    [K, se] = (0, T.useState)(n?.room ?? ``),
    [q, ce] = (0, T.useState)(n?.floor ?? ``),
    [J, le] = (0, T.useState)(n?.ip ?? ``),
    [Y, X] = (0, T.useState)(n?.status ?? `online`),
    Z;
  t[0] === n
    ? (Z = t[1])
    : ((Z = n?.ports?.length ? n.ports : M()), (t[0] = n), (t[1] = Z));
  let [Q, ue] = (0, T.useState)(Z),
    de;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((de = {}), (t[2] = de))
    : (de = t[2]);
  let [$, fe] = (0, T.useState)(de),
    [pe, me] = (0, T.useState)(!1),
    [he, ge] = (0, T.useState)(!1),
    _e;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_e = function (e, t) {
        ue((n) =>
          n.map((n) => {
            if (n.port !== e) return n;
            let r = { ...n, ...t };
            return Object.fromEntries(Object.entries(r).filter(R));
          }),
        );
      }),
      (t[3] = _e))
    : (_e = t[3]);
  let ve = _e,
    ye;
  t[4] === Q
    ? (ye = t[5])
    : ((ye = function (e, t) {
        let n = Q.find((t) => t.port === e),
          r = t === `WiFi` ? j : n?.provider === j ? void 0 : n?.provider;
        ve(e, { type: t, provider: r });
      }),
      (t[4] = Q),
      (t[5] = ye));
  let be = ye,
    xe;
  t[6] !== N ||
  t[7] !== W ||
  t[8] !== q ||
  t[9] !== i ||
  t[10] !== J ||
  t[11] !== U ||
  t[12] !== G ||
  t[13] !== d ||
  t[14] !== n ||
  t[15] !== c ||
  t[16] !== V ||
  t[17] !== o ||
  t[18] !== Q ||
  t[19] !== K ||
  t[20] !== te ||
  t[21] !== a ||
  t[22] !== H ||
  t[23] !== Y ||
  t[24] !== l
    ? ((xe = function () {
        let e = H.trim(),
          t = parseInt(V, 10),
          f = Number.isNaN(t)
            ? `Vui lòng nhập ONU ID hợp lệ!`
            : r(o, c, t, n?.id ?? null),
          p = {};
        if (
          (f && (p.onuId = f),
          e || (p.sn = `Vui lòng nhập Serial Number (SN)!`),
          f || !e)
        ) {
          (fe(p), f && te(f, `error`));
          return;
        }
        let m = K.trim() || e,
          h = n ? v(m) : u(m),
          g = Q.map(L),
          _ = {
            id: n?.id ?? `gpon-ont-${Date.now()}`,
            frameId: i.id,
            slotId: a.id,
            portId: o.id,
            onuId: t,
            sn: e,
            mac: U.trim(),
            brand: W.trim(),
            model: G.trim(),
            room: K.trim(),
            floor: q.trim(),
            ip: J.trim(),
            status: Y,
            ports: g,
            logs: s(n?.logs, h, l),
            ...(n?.backup ? { backup: n.backup } : {}),
          };
        (d(_), N(`GPON ONT: ${m}`, h, l));
      }),
      (t[6] = N),
      (t[7] = W),
      (t[8] = q),
      (t[9] = i),
      (t[10] = J),
      (t[11] = U),
      (t[12] = G),
      (t[13] = d),
      (t[14] = n),
      (t[15] = c),
      (t[16] = V),
      (t[17] = o),
      (t[18] = Q),
      (t[19] = K),
      (t[20] = te),
      (t[21] = a),
      (t[22] = H),
      (t[23] = Y),
      (t[24] = l),
      (t[25] = xe))
    : (xe = t[25]);
  let Se = xe,
    Ce;
  t[26] === n
    ? (Ce = t[27])
    : ((Ce = n?.backup ? f(n.backup) : null), (t[26] = n), (t[27] = Ce));
  let we = Ce,
    Te;
  t[28] !== J || t[29] !== n || t[30] !== K || t[31] !== H
    ? ((Te = n
        ? { name: K.trim() || H, ip: J.trim(), backup: n.backup }
        : null),
      (t[28] = J),
      (t[29] = n),
      (t[30] = K),
      (t[31] = H),
      (t[32] = Te))
    : (Te = t[32]);
  let Ee = Te,
    De;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((De = { display: `flex`, zIndex: 222 }), (t[33] = De))
    : (De = t[33]);
  let Oe;
  t[34] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Oe = {
        width: 640,
        maxHeight: `92vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[34] = Oe))
    : (Oe = t[34]);
  let ke;
  t[35] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ke = (0, E.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center text-xs border border-fuchsia-100`,
        children: (0, E.jsx)(`i`, { className: `fas fa-satellite-dish` }),
      })),
      (t[35] = ke))
    : (ke = t[35]);
  let Ae = n ? `Chỉnh sửa ONT` : `Thêm ONT`,
    je;
  t[36] === Ae
    ? (je = t[37])
    : ((je = (0, E.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [ke, (0, E.jsx)(`span`, { children: Ae })],
      })),
      (t[36] = Ae),
      (t[37] = je));
  let Me;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Me = (0, E.jsx)(`i`, { className: `fas fa-times` })), (t[38] = Me))
    : (Me = t[38]);
  let Ne;
  t[39] === y
    ? (Ne = t[40])
    : ((Ne = (0, E.jsx)(`button`, {
        onClick: y,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: Me,
      })),
      (t[39] = y),
      (t[40] = Ne));
  let Pe;
  t[41] !== je || t[42] !== Ne
    ? ((Pe = (0, E.jsxs)(`div`, {
        className: `flex justify-between items-center mb-1 border-b border-slate-100 pb-4 shrink-0`,
        children: [je, Ne],
      })),
      (t[41] = je),
      (t[42] = Ne),
      (t[43] = Pe))
    : (Pe = t[43]);
  let Fe;
  t[44] !== i || t[45] !== o || t[46] !== a
    ? ((Fe = b(i, a, o)), (t[44] = i), (t[45] = o), (t[46] = a), (t[47] = Fe))
    : (Fe = t[47]);
  let Ie;
  t[48] === Fe
    ? (Ie = t[49])
    : ((Ie = (0, E.jsx)(`p`, {
        className: `text-[10px] font-bold text-fuchsia-500 uppercase tracking-widest mb-4 shrink-0`,
        children: Fe,
      })),
      (t[48] = Fe),
      (t[49] = Ie));
  let Le;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Le = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `ONU ID`,
      })),
      (t[50] = Le))
    : (Le = t[50]);
  let Re;
  t[51] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (e) => {
        (ne(e.target.value), fe(I));
      }),
      (t[51] = Re))
    : (Re = t[51]);
  let ze;
  t[52] === V
    ? (ze = t[53])
    : ((ze = (0, E.jsx)(`input`, {
        value: V,
        onChange: Re,
        type: `number`,
        min: 0,
        placeholder: `0`,
        className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
      })),
      (t[52] = V),
      (t[53] = ze));
  let Be;
  t[54] === $.onuId
    ? (Be = t[55])
    : ((Be =
        $.onuId &&
        (0, E.jsx)(`p`, {
          className: `text-[10px] text-red-500 font-bold mt-1`,
          children: $.onuId,
        })),
      (t[54] = $.onuId),
      (t[55] = Be));
  let Ve;
  t[56] !== ze || t[57] !== Be
    ? ((Ve = (0, E.jsxs)(`div`, { children: [Le, ze, Be] })),
      (t[56] = ze),
      (t[57] = Be),
      (t[58] = Ve))
    : (Ve = t[58]);
  let He;
  t[59] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((He = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Trạng thái`,
      })),
      (t[59] = He))
    : (He = t[59]);
  let Ue;
  t[60] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ue = (e) => X(e.target.value)), (t[60] = Ue))
    : (Ue = t[60]);
  let We, Ge, Ke;
  t[61] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((We = (0, E.jsx)(`option`, { value: `online`, children: `🟢 Online` })),
      (Ge = (0, E.jsx)(`option`, { value: `offline`, children: `⚪ Offline` })),
      (Ke = (0, E.jsx)(`option`, {
        value: `los`,
        children: `🔴 Mất tín hiệu (LOS)`,
      })),
      (t[61] = We),
      (t[62] = Ge),
      (t[63] = Ke))
    : ((We = t[61]), (Ge = t[62]), (Ke = t[63]));
  let qe;
  t[64] === Y
    ? (qe = t[65])
    : ((qe = (0, E.jsxs)(`div`, {
        children: [
          He,
          (0, E.jsxs)(`select`, {
            value: Y,
            onChange: Ue,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
            children: [We, Ge, Ke],
          }),
        ],
      })),
      (t[64] = Y),
      (t[65] = qe));
  let Je;
  t[66] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Je = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Serial Number (SN)`,
      })),
      (t[66] = Je))
    : (Je = t[66]);
  let Ye;
  t[67] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ye = (e) => {
        (re(e.target.value), fe(F));
      }),
      (t[67] = Ye))
    : (Ye = t[67]);
  let Xe;
  t[68] === H
    ? (Xe = t[69])
    : ((Xe = (0, E.jsx)(`input`, {
        value: H,
        onChange: Ye,
        placeholder: `ZTEGC1A2B3C4`,
        className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-fuchsia-400`,
      })),
      (t[68] = H),
      (t[69] = Xe));
  let Ze;
  t[70] === $.sn
    ? (Ze = t[71])
    : ((Ze =
        $.sn &&
        (0, E.jsx)(`p`, {
          className: `text-[10px] text-red-500 font-bold mt-1`,
          children: $.sn,
        })),
      (t[70] = $.sn),
      (t[71] = Ze));
  let Qe;
  t[72] !== Xe || t[73] !== Ze
    ? ((Qe = (0, E.jsxs)(`div`, { children: [Je, Xe, Ze] })),
      (t[72] = Xe),
      (t[73] = Ze),
      (t[74] = Qe))
    : (Qe = t[74]);
  let $e;
  t[75] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($e = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Địa chỉ MAC`,
      })),
      (t[75] = $e))
    : ($e = t[75]);
  let et;
  t[76] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((et = (e) => ie(e.target.value)), (t[76] = et))
    : (et = t[76]);
  let tt;
  t[77] === U
    ? (tt = t[78])
    : ((tt = (0, E.jsxs)(`div`, {
        children: [
          $e,
          (0, E.jsx)(`input`, {
            value: U,
            onChange: et,
            placeholder: `3C:5A:B4:11:22:33`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-fuchsia-400 uppercase`,
          }),
        ],
      })),
      (t[77] = U),
      (t[78] = tt));
  let nt;
  t[79] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((nt = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Hãng`,
      })),
      (t[79] = nt))
    : (nt = t[79]);
  let rt;
  t[80] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((rt = (e) => ae(e.target.value)), (t[80] = rt))
    : (rt = t[80]);
  let it;
  t[81] === W
    ? (it = t[82])
    : ((it = (0, E.jsxs)(`div`, {
        children: [
          nt,
          (0, E.jsx)(`input`, {
            value: W,
            onChange: rt,
            placeholder: `ZTE, Huawei, Nokia...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[81] = W),
      (t[82] = it));
  let at;
  t[83] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((at = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Model`,
      })),
      (t[83] = at))
    : (at = t[83]);
  let ot;
  t[84] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ot = (e) => oe(e.target.value)), (t[84] = ot))
    : (ot = t[84]);
  let st;
  t[85] === G
    ? (st = t[86])
    : ((st = (0, E.jsxs)(`div`, {
        children: [
          at,
          (0, E.jsx)(`input`, {
            value: G,
            onChange: ot,
            placeholder: `F660`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[85] = G),
      (t[86] = st));
  let ct;
  t[87] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ct = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Phòng`,
      })),
      (t[87] = ct))
    : (ct = t[87]);
  let lt;
  t[88] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((lt = (e) => se(e.target.value)), (t[88] = lt))
    : (lt = t[88]);
  let ut;
  t[89] === K
    ? (ut = t[90])
    : ((ut = (0, E.jsxs)(`div`, {
        children: [
          ct,
          (0, E.jsx)(`input`, {
            value: K,
            onChange: lt,
            placeholder: `G124`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[89] = K),
      (t[90] = ut));
  let dt;
  t[91] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((dt = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Tầng`,
      })),
      (t[91] = dt))
    : (dt = t[91]);
  let ft;
  t[92] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ft = (e) => ce(e.target.value)), (t[92] = ft))
    : (ft = t[92]);
  let pt;
  t[93] === q
    ? (pt = t[94])
    : ((pt = (0, E.jsxs)(`div`, {
        children: [
          dt,
          (0, E.jsx)(`input`, {
            value: q,
            onChange: ft,
            placeholder: `Tầng 1`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[93] = q),
      (t[94] = pt));
  let mt;
  t[95] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((mt = (0, E.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `IP Address`,
      })),
      (t[95] = mt))
    : (mt = t[95]);
  let ht;
  t[96] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ht = (e) => le(e.target.value)), (t[96] = ht))
    : (ht = t[96]);
  let gt;
  t[97] === J
    ? (gt = t[98])
    : ((gt = (0, E.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          mt,
          (0, E.jsx)(`input`, {
            value: J,
            onChange: ht,
            placeholder: `10.195.40.24`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[97] = J),
      (t[98] = gt));
  let _t;
  t[99] !== Ve ||
  t[100] !== qe ||
  t[101] !== Qe ||
  t[102] !== tt ||
  t[103] !== it ||
  t[104] !== st ||
  t[105] !== ut ||
  t[106] !== pt ||
  t[107] !== gt
    ? ((_t = (0, E.jsx)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: (0, E.jsxs)(`div`, {
          className: `grid grid-cols-2 gap-3`,
          children: [Ve, qe, Qe, tt, it, st, ut, pt, gt],
        }),
      })),
      (t[99] = Ve),
      (t[100] = qe),
      (t[101] = Qe),
      (t[102] = tt),
      (t[103] = it),
      (t[104] = st),
      (t[105] = ut),
      (t[106] = pt),
      (t[107] = gt),
      (t[108] = _t))
    : (_t = t[108]);
  let vt;
  t[109] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((vt = (0, E.jsxs)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3`,
        children: [
          (0, E.jsx)(`i`, { className: `fas fa-ethernet text-slate-400 mr-1` }),
          `4 cổng LAN (TV / WiFi / Data)`,
        ],
      })),
      (t[109] = vt))
    : (vt = t[109]);
  let yt;
  if (t[110] !== Q || t[111] !== be) {
    let e;
    (t[113] === be
      ? (e = t[114])
      : ((e = (e) =>
          (0, E.jsxs)(
            `div`,
            {
              className: `bg-white border border-slate-200 rounded-xl p-2.5`,
              children: [
                (0, E.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, E.jsxs)(`span`, {
                      className: `text-[10px] font-black text-slate-500 w-14 shrink-0`,
                      children: [`Port `, e.port],
                    }),
                    (0, E.jsx)(`select`, {
                      value: e.type,
                      onChange: (t) => be(e.port, t.target.value),
                      className: `px-2.5 py-1.5 rounded-lg text-[10px] font-black focus:outline-none shrink-0 border-0 ${O[e.type]}`,
                      children: D.map(P),
                    }),
                    (0, E.jsx)(`input`, {
                      value: e.deviceName ?? ``,
                      onChange: (t) =>
                        ve(e.port, { deviceName: t.target.value }),
                      placeholder: `Thiết bị nối vào (VD: TV phòng khách)`,
                      className: `flex-1 min-w-0 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
                    }),
                  ],
                }),
                (e.type === `TV` || e.type === `WiFi`) &&
                  (0, E.jsxs)(`div`, {
                    className: `grid grid-cols-2 gap-1.5 mt-1.5 pl-16`,
                    children: [
                      (0, E.jsx)(`input`, {
                        value: e.serialNumber ?? ``,
                        onChange: (t) =>
                          ve(e.port, { serialNumber: t.target.value }),
                        placeholder:
                          e.type === `TV`
                            ? `SN của TV`
                            : `SN của thiết bị WiFi`,
                        className: `px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold font-mono focus:outline-none focus:border-fuchsia-400`,
                      }),
                      (0, E.jsx)(`input`, {
                        value: e.macAddress ?? ``,
                        onChange: (t) =>
                          ve(e.port, { macAddress: t.target.value }),
                        placeholder: `Địa chỉ MAC`,
                        className: `px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold font-mono focus:outline-none focus:border-fuchsia-400 uppercase`,
                      }),
                      e.type === `TV`
                        ? (0, E.jsx)(`div`, {
                            className: `flex rounded-lg overflow-hidden border border-slate-200`,
                            role: `radiogroup`,
                            "aria-label": `Nhà cung cấp cổng ${e.port}`,
                            children: k.map((t) =>
                              (0, E.jsxs)(
                                `button`,
                                {
                                  type: `button`,
                                  role: `radio`,
                                  "aria-checked": e.provider === t,
                                  onClick: () =>
                                    ve(e.port, {
                                      provider: e.provider === t ? void 0 : t,
                                    }),
                                  className: `flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-bold transition-colors ${e.provider === t ? A[t].active : `bg-white text-slate-500 hover:bg-slate-50`}`,
                                  children: [
                                    (0, E.jsx)(`span`, {
                                      className: `w-3.5 h-3.5 rounded-full text-white text-[7px] font-black flex items-center justify-center shrink-0 ${A[t].dot}`,
                                      children: t[0],
                                    }),
                                    (0, E.jsx)(`span`, { children: t }),
                                  ],
                                },
                                t,
                              ),
                            ),
                          })
                        : (0, E.jsxs)(`div`, {
                            className: `flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold ${A[j].active}`,
                            children: [
                              (0, E.jsx)(`span`, {
                                className: `w-3.5 h-3.5 rounded-full text-white text-[7px] font-black flex items-center justify-center shrink-0 ${A[j].dot}`,
                                children: `T`,
                              }),
                              (0, E.jsx)(`span`, { children: j }),
                            ],
                          }),
                      e.type === `TV`
                        ? (0, E.jsx)(`input`, {
                            value: e.licenses ?? ``,
                            onChange: (t) =>
                              ve(e.port, { licenses: t.target.value }),
                            placeholder: `License đã cài (VD: K+, VieON...)`,
                            className: `px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold focus:outline-none focus:border-fuchsia-400`,
                          })
                        : (0, E.jsx)(`input`, {
                            value: e.productCode ?? ``,
                            onChange: (t) =>
                              ve(e.port, { productCode: t.target.value }),
                            placeholder: `Mã sản phẩm`,
                            className: `px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold focus:outline-none focus:border-fuchsia-400`,
                          }),
                    ],
                  }),
              ],
            },
            e.port,
          )),
        (t[113] = be),
        (t[114] = e)),
      (yt = Q.map(e)),
      (t[110] = Q),
      (t[111] = be),
      (t[112] = yt));
  } else yt = t[112];
  let bt;
  t[115] === yt
    ? (bt = t[116])
    : ((bt = (0, E.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [
          vt,
          (0, E.jsx)(`div`, { className: `space-y-2`, children: yt }),
        ],
      })),
      (t[115] = yt),
      (t[116] = bt));
  let xt;
  t[117] !== n || t[118] !== we
    ? ((xt =
        n &&
        (0, E.jsxs)(E.Fragment, {
          children: [
            (0, E.jsxs)(`div`, {
              className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
              children: [
                (0, E.jsxs)(`div`, {
                  className: `flex items-center justify-between mb-2`,
                  children: [
                    (0, E.jsxs)(`p`, {
                      className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                      children: [
                        (0, E.jsx)(`i`, {
                          className: `fas fa-cloud-arrow-up text-slate-400 mr-1`,
                        }),
                        `Backup cấu hình`,
                      ],
                    }),
                    we &&
                      (0, E.jsxs)(`span`, {
                        className: `text-[10px] font-black px-2 py-0.5 rounded-full border ${we.bgClass} ${we.textClass}`,
                        children: [we.icon, ` `, we.label],
                      }),
                  ],
                }),
                (0, E.jsxs)(`div`, {
                  className: `flex gap-2`,
                  children: [
                    (0, E.jsx)(`button`, {
                      type: `button`,
                      onClick: () => me(!0),
                      className: `flex-1 py-2 text-[10px] font-black bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all`,
                      children: `Cập nhật Backup`,
                    }),
                    n.backup?.logs &&
                      n.backup.logs.length > 0 &&
                      (0, E.jsx)(`button`, {
                        type: `button`,
                        onClick: () => ge(!0),
                        className: `px-3 py-2 text-[10px] font-black bg-slate-50 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-100 transition-all`,
                        children: `🕐 Lịch sử`,
                      }),
                  ],
                }),
              ],
            }),
            (0, E.jsxs)(`div`, {
              className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
              children: [
                (0, E.jsxs)(`p`, {
                  className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
                  children: [
                    (0, E.jsx)(`i`, {
                      className: `fas fa-clock-rotate-left text-slate-400 mr-1`,
                    }),
                    `Lịch sử thay đổi`,
                  ],
                }),
                (0, E.jsx)(g, { logs: n.logs ?? [] }),
              ],
            }),
          ],
        })),
      (t[117] = n),
      (t[118] = we),
      (t[119] = xt))
    : (xt = t[119]);
  let St;
  t[120] !== _t || t[121] !== bt || t[122] !== xt
    ? ((St = (0, E.jsxs)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll space-y-4 pr-1`,
        children: [_t, bt, xt],
      })),
      (t[120] = _t),
      (t[121] = bt),
      (t[122] = xt),
      (t[123] = St))
    : (St = t[123]);
  let Ct;
  t[124] !== _ || t[125] !== n
    ? ((Ct =
        n &&
        (0, E.jsx)(`button`, {
          onClick: _,
          className: `px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100`,
          children: `Xóa`,
        })),
      (t[124] = _),
      (t[125] = n),
      (t[126] = Ct))
    : (Ct = t[126]);
  let wt;
  t[127] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((wt = (0, E.jsx)(`div`, { className: `flex-1` })), (t[127] = wt))
    : (wt = t[127]);
  let Tt;
  t[128] === y
    ? (Tt = t[129])
    : ((Tt = (0, E.jsx)(`button`, {
        onClick: y,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50`,
        children: `Hủy`,
      })),
      (t[128] = y),
      (t[129] = Tt));
  let Et;
  t[130] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Et = (0, E.jsx)(`i`, { className: `fas fa-save` })), (t[130] = Et))
    : (Et = t[130]);
  let Dt;
  t[131] === Se
    ? (Dt = t[132])
    : ((Dt = (0, E.jsxs)(`button`, {
        onClick: Se,
        className: `px-6 py-2.5 bg-fuchsia-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-fuchsia-700 flex items-center gap-2`,
        children: [Et, `Lưu ONT`],
      })),
      (t[131] = Se),
      (t[132] = Dt));
  let Ot;
  t[133] !== Ct || t[134] !== Tt || t[135] !== Dt
    ? ((Ot = (0, E.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [Ct, wt, Tt, Dt],
      })),
      (t[133] = Ct),
      (t[134] = Tt),
      (t[135] = Dt),
      (t[136] = Ot))
    : (Ot = t[136]);
  let kt;
  t[137] !== Pe || t[138] !== Ie || t[139] !== St || t[140] !== Ot
    ? ((kt = (0, E.jsx)(`div`, {
        className: `modal`,
        style: De,
        children: (0, E.jsxs)(`div`, {
          className: `modal-content shadow-2xl`,
          style: Oe,
          children: [Pe, Ie, St, Ot],
        }),
      })),
      (t[137] = Pe),
      (t[138] = Ie),
      (t[139] = St),
      (t[140] = Ot),
      (t[141] = kt))
    : (kt = t[141]);
  let At;
  t[142] !== N || t[143] !== Ee || t[144] !== n || t[145] !== x || t[146] !== pe
    ? ((At =
        pe &&
        Ee &&
        (0, E.jsx)(S, {
          sw: Ee,
          onClose: () => me(!1),
          onSave: (e) => {
            (x(n.id, e),
              N(`Backup · ${Ee.name}`, p(n, e), e.by || `system`, e.date),
              me(!1));
          },
        })),
      (t[142] = N),
      (t[143] = Ee),
      (t[144] = n),
      (t[145] = x),
      (t[146] = pe),
      (t[147] = At))
    : (At = t[147]);
  let jt;
  t[148] !== Ee || t[149] !== he
    ? ((jt = he && Ee && (0, E.jsx)(C, { sw: Ee, onClose: () => ge(!1) })),
      (t[148] = Ee),
      (t[149] = he),
      (t[150] = jt))
    : (jt = t[150]);
  let Mt;
  return (
    t[151] !== kt || t[152] !== At || t[153] !== jt
      ? ((Mt = (0, E.jsxs)(E.Fragment, { children: [kt, At, jt] })),
        (t[151] = kt),
        (t[152] = At),
        (t[153] = jt),
        (t[154] = Mt))
      : (Mt = t[154]),
    Mt
  );
}
function P(e) {
  return (0, E.jsx)(`option`, { value: e, children: e }, e);
}
function F(e) {
  return { ...e, sn: void 0 };
}
function I(e) {
  return { ...e, onuId: void 0 };
}
function L(e) {
  return e.type === `WiFi` && e.provider !== j ? { ...e, provider: j } : e;
}
function R(e) {
  let [, t] = e;
  return t !== void 0;
}
function z(e) {
  return e.showDialog;
}
function B(e) {
  return e.addGlobalLog;
}
function ee(e) {
  return e.saveGponOntBackup;
}
var te = {
    online: `bg-emerald-500`,
    offline: `bg-slate-300`,
    los: `bg-red-500`,
  },
  V = { online: `Online`, offline: `Offline`, los: `Mất tín hiệu` };
function ne(e) {
  let t = (0, w.c)(52),
    {
      frame: n,
      slot: r,
      port: i,
      ontDB: a,
      onAddNew: s,
      onEdit: c,
      onClose: u,
    } = e,
    [d, f] = (0, T.useState)(``),
    p,
    m,
    h,
    g,
    _,
    v,
    y,
    x,
    S;
  if (
    t[0] !== n ||
    t[1] !== s ||
    t[2] !== u ||
    t[3] !== c ||
    t[4] !== a ||
    t[5] !== i ||
    t[6] !== d ||
    t[7] !== r
  ) {
    let e = l(a, i.id).sort(H),
      C;
    t[17] === i.splitterRatio
      ? (C = t[18])
      : ((C = o(i.splitterRatio)), (t[17] = i.splitterRatio), (t[18] = C));
    let w = C,
      T = d.trim()
        ? e.filter((e) =>
            [e.sn, e.mac, e.room, String(e.onuId)].some((e) =>
              (e ?? ``).toLowerCase().includes(d.trim().toLowerCase()),
            ),
          )
        : e;
    ((x = `modal`),
      t[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = { display: `flex`, zIndex: 218 }), (t[19] = S))
        : (S = t[19]),
      (h = `modal-content shadow-2xl`),
      t[20] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = {
            width: 620,
            maxHeight: `86vh`,
            display: `flex`,
            flexDirection: `column`,
          }),
          (t[20] = g))
        : (g = t[20]));
    let D;
    t[21] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((D = (0, E.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [
            (0, E.jsx)(`div`, {
              className: `w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center text-xs border border-fuchsia-100`,
              children: (0, E.jsx)(`i`, { className: `fas fa-list` }),
            }),
            (0, E.jsx)(`span`, { children: `Danh sách ONT` }),
          ],
        })),
        (t[21] = D))
      : (D = t[21]);
    let O;
    (t[22] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((O = (0, E.jsx)(`i`, { className: `fas fa-times` })), (t[22] = O))
      : (O = t[22]),
      t[23] === u
        ? (_ = t[24])
        : ((_ = (0, E.jsxs)(`div`, {
            className: `flex justify-between items-center mb-1 border-b border-slate-100 pb-4 shrink-0`,
            children: [
              D,
              (0, E.jsx)(`button`, {
                onClick: u,
                className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
                children: O,
              }),
            ],
          })),
          (t[23] = u),
          (t[24] = _)));
    let k;
    (t[25] !== n || t[26] !== i || t[27] !== r
      ? ((k = b(n, r, i)), (t[25] = n), (t[26] = i), (t[27] = r), (t[28] = k))
      : (k = t[28]),
      t[29] === k
        ? (v = t[30])
        : ((v = (0, E.jsx)(`p`, {
            className: `text-[10px] font-bold text-fuchsia-500 uppercase tracking-widest mb-4 shrink-0`,
            children: k,
          })),
          (t[29] = k),
          (t[30] = v)));
    let A;
    t[31] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((A = (0, E.jsx)(`i`, {
          className: `fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs`,
        })),
        (t[31] = A))
      : (A = t[31]);
    let j;
    t[32] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((j = (e) => f(e.target.value)), (t[32] = j))
      : (j = t[32]);
    let M;
    t[33] === d
      ? (M = t[34])
      : ((M = (0, E.jsxs)(`div`, {
          className: `flex-1 relative`,
          children: [
            A,
            (0, E.jsx)(`input`, {
              value: d,
              onChange: j,
              placeholder: `Tìm theo SN, MAC, ONU ID, phòng...`,
              className: `w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
            }),
          ],
        })),
        (t[33] = d),
        (t[34] = M));
    let N;
    t[35] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((N = (0, E.jsx)(`i`, { className: `fas fa-plus` })), (t[35] = N))
      : (N = t[35]);
    let P;
    (t[36] === s
      ? (P = t[37])
      : ((P = (0, E.jsxs)(`button`, {
          onClick: s,
          className: `px-4 py-2.5 bg-fuchsia-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-fuchsia-700 flex items-center gap-2 shrink-0`,
          children: [N, `Thêm ONT`],
        })),
        (t[36] = s),
        (t[37] = P)),
      (y = (0, E.jsxs)(`div`, {
        className: `flex items-center gap-3 mb-3 shrink-0`,
        children: [
          M,
          (0, E.jsxs)(`span`, {
            className: `text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0`,
            children: [e.length, ` / `, w, ` ONU`],
          }),
          P,
        ],
      })),
      (p = `flex-1 overflow-y-auto custom-scroll space-y-2 pr-1`),
      (m =
        T.length === 0
          ? (0, E.jsx)(`p`, {
              className: `text-xs text-slate-400 text-center py-8 italic`,
              children:
                e.length === 0
                  ? `Chưa có ONT nào trên cổng này.`
                  : `Không tìm thấy ONT phù hợp.`,
            })
          : T.map((e) =>
              (0, E.jsxs)(
                `button`,
                {
                  onClick: () => c(e.id),
                  className: `w-full flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 hover:border-fuchsia-300 hover:shadow-sm transition-all text-left`,
                  children: [
                    (0, E.jsxs)(`div`, {
                      className: `w-9 h-9 rounded-lg bg-slate-800 text-white text-[10px] font-black flex items-center justify-center shrink-0 relative`,
                      children: [
                        `ONT`,
                        (0, E.jsxs)(`span`, {
                          className: `absolute -top-1.5 -right-1.5 bg-fuchsia-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-white`,
                          children: [`#`, e.onuId],
                        }),
                      ],
                    }),
                    (0, E.jsxs)(`div`, {
                      className: `flex-1 min-w-0`,
                      children: [
                        (0, E.jsx)(`p`, {
                          className: `text-xs font-black text-slate-800 truncate`,
                          children: e.room || `Chưa gán phòng`,
                        }),
                        (0, E.jsxs)(`p`, {
                          className: `text-[10px] text-slate-500 font-mono truncate`,
                          children: [
                            `SN: `,
                            e.sn,
                            ` `,
                            e.mac ? `· MAC: ${e.mac}` : ``,
                            ` `,
                            e.ip ? `· ${e.ip}` : ``,
                          ],
                        }),
                      ],
                    }),
                    (0, E.jsxs)(`span`, {
                      className: `inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500 shrink-0`,
                      children: [
                        (0, E.jsx)(`span`, {
                          className: `w-1.5 h-1.5 rounded-full ${te[e.status ?? `offline`]}`,
                        }),
                        V[e.status ?? `offline`],
                      ],
                    }),
                    (0, E.jsx)(`i`, {
                      className: `fas fa-chevron-right text-slate-300 text-xs shrink-0`,
                    }),
                  ],
                },
                e.id,
              ),
            )),
      (t[0] = n),
      (t[1] = s),
      (t[2] = u),
      (t[3] = c),
      (t[4] = a),
      (t[5] = i),
      (t[6] = d),
      (t[7] = r),
      (t[8] = p),
      (t[9] = m),
      (t[10] = h),
      (t[11] = g),
      (t[12] = _),
      (t[13] = v),
      (t[14] = y),
      (t[15] = x),
      (t[16] = S));
  } else
    ((p = t[8]),
      (m = t[9]),
      (h = t[10]),
      (g = t[11]),
      (_ = t[12]),
      (v = t[13]),
      (y = t[14]),
      (x = t[15]),
      (S = t[16]));
  let C;
  t[38] !== p || t[39] !== m
    ? ((C = (0, E.jsx)(`div`, { className: p, children: m })),
      (t[38] = p),
      (t[39] = m),
      (t[40] = C))
    : (C = t[40]);
  let D;
  t[41] !== C ||
  t[42] !== h ||
  t[43] !== g ||
  t[44] !== _ ||
  t[45] !== v ||
  t[46] !== y
    ? ((D = (0, E.jsxs)(`div`, {
        className: h,
        style: g,
        children: [_, v, y, C],
      })),
      (t[41] = C),
      (t[42] = h),
      (t[43] = g),
      (t[44] = _),
      (t[45] = v),
      (t[46] = y),
      (t[47] = D))
    : (D = t[47]);
  let O;
  return (
    t[48] !== D || t[49] !== x || t[50] !== S
      ? ((O = (0, E.jsx)(`div`, { className: x, style: S, children: D })),
        (t[48] = D),
        (t[49] = x),
        (t[50] = S),
        (t[51] = O))
      : (O = t[51]),
    O
  );
}
function H(e, t) {
  return e.onuId - t.onuId;
}
var re = {
    TV: `var(--gpon-tv-color, #f59e0b)`,
    WiFi: `var(--gpon-wifi-color, #10b981)`,
    Data: `var(--gpon-data-color, #3b82f6)`,
    Trống: `var(--gpon-empty-color, #cbd5e1)`,
  },
  U = { online: `bg-emerald-500`, offline: `bg-slate-300`, los: `bg-red-500` };
function ie(e) {
  let t = (0, w.c)(18),
    { ont: n, onClick: r } = e,
    i = `ONU #${n.onuId} — SN: ${n.sn}`,
    a;
  t[0] === n.onuId
    ? (a = t[1])
    : ((a = (0, E.jsx)(`span`, {
        className: `gpon-ont-node-badge`,
        children: n.onuId,
      })),
      (t[0] = n.onuId),
      (t[1] = a));
  let o = n.room || n.sn,
    s;
  t[2] === o
    ? (s = t[3])
    : ((s = (0, E.jsx)(`span`, {
        className: `gpon-ont-node-name`,
        children: o,
      })),
      (t[2] = o),
      (t[3] = s));
  let c = `gpon-ont-node-status ${U[n.status ?? `offline`]}`,
    l;
  t[4] === c
    ? (l = t[5])
    : ((l = (0, E.jsx)(`span`, { className: c })), (t[4] = c), (t[5] = l));
  let u;
  t[6] !== a || t[7] !== s || t[8] !== l
    ? ((u = (0, E.jsxs)(`div`, {
        className: `gpon-ont-node-head`,
        children: [a, s, l],
      })),
      (t[6] = a),
      (t[7] = s),
      (t[8] = l),
      (t[9] = u))
    : (u = t[9]);
  let d;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = [1, 2, 3, 4]), (t[10] = d))
    : (d = t[10]);
  let f;
  t[11] === n.ports
    ? (f = t[12])
    : ((f = (0, E.jsx)(`div`, {
        className: `gpon-ont-node-ports`,
        children: d.map((e) => {
          let t = n.ports.find((t) => t.port === e);
          return (0, E.jsx)(
            `div`,
            {
              className: `gpon-ont-node-port-dot`,
              style: { background: re[t?.type ?? `Trống`] },
            },
            e,
          );
        }),
      })),
      (t[11] = n.ports),
      (t[12] = f));
  let p;
  return (
    t[13] !== r || t[14] !== i || t[15] !== u || t[16] !== f
      ? ((p = (0, E.jsxs)(`div`, {
          className: `gpon-ont-node`,
          onClick: r,
          title: i,
          children: [u, f],
        })),
        (t[13] = r),
        (t[14] = i),
        (t[15] = u),
        (t[16] = f),
        (t[17] = p))
      : (p = t[17]),
    p
  );
}
var W = {
    online: `bg-emerald-500`,
    offline: `bg-slate-300`,
    los: `bg-red-500`,
  },
  ae = { online: `Online`, offline: `Offline`, los: `Mất tín hiệu` };
function G(e) {
  return e.ports.find((e) => e.provider)?.provider ?? ``;
}
function oe({ frameDB: e, ontDB: t, onEdit: n, onClose: r }) {
  let [i, o] = (0, T.useState)(``),
    [s, c] = (0, T.useState)(`all`),
    [l, u] = (0, T.useState)(`breadcrumb`),
    [d, f] = (0, T.useState)(!1),
    p = (0, T.useMemo)(() => a(e, t), [e, t]),
    m = (0, T.useMemo)(() => {
      let e = i.trim().toLowerCase();
      return p
        .filter((e) => s === `all` || (e.ont.status ?? `offline`) === s)
        .filter(
          (t) =>
            !e ||
            [
              t.ont.sn,
              t.ont.mac,
              t.ont.room,
              String(t.ont.onuId),
              t.breadcrumb,
            ].some((t) => (t ?? ``).toLowerCase().includes(e)),
        )
        .sort((e, t) => {
          let n = (e) =>
              l === `onuId`
                ? e.ont.onuId
                : l === `room`
                  ? (e.ont.room ?? ``)
                  : l === `status`
                    ? (e.ont.status ?? `offline`)
                    : l === `provider`
                      ? G(e.ont)
                      : e.breadcrumb,
            r = n(e),
            i = n(t),
            a =
              typeof r == `number` && typeof i == `number`
                ? r - i
                : String(r).localeCompare(String(i), `vi`, { numeric: !0 });
          return d ? -a : a;
        });
    }, [p, i, s, l, d]);
  function h(e) {
    if (e === l) {
      f((e) => !e);
      return;
    }
    (u(e), f(!1));
  }
  function g(e) {
    return e === l
      ? (0, E.jsx)(`i`, {
          className: `fas fa-chevron-${d ? `down` : `up`} ml-1 text-[8px]`,
        })
      : null;
  }
  let _ = (0, T.useMemo)(() => {
    let e = 0,
      t = 0,
      n = 0;
    return (
      p.forEach((r) => {
        let i = r.ont.status ?? `offline`;
        i === `online` ? e++ : i === `los` ? n++ : t++;
      }),
      { online: e, offline: t, los: n }
    );
  }, [p]);
  return (0, E.jsx)(`div`, {
    className: `modal`,
    style: { display: `flex`, zIndex: 219 },
    children: (0, E.jsxs)(`div`, {
      className: `modal-content shadow-2xl`,
      style: {
        width: 860,
        maxWidth: `96vw`,
        display: `flex`,
        flexDirection: `column`,
        maxHeight: `90vh`,
      },
      children: [
        (0, E.jsxs)(`div`, {
          className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
          children: [
            (0, E.jsxs)(`h3`, {
              className: `text-lg font-black text-slate-800 flex items-center gap-3`,
              children: [
                (0, E.jsx)(`div`, {
                  className: `w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center text-xs border border-fuchsia-100`,
                  children: (0, E.jsx)(`i`, { className: `fas fa-list-ul` }),
                }),
                `Tất cả ONT`,
                (0, E.jsxs)(`span`, {
                  className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                  children: [p.length, ` thiết bị`],
                }),
              ],
            }),
            (0, E.jsx)(`button`, {
              onClick: r,
              className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
              children: (0, E.jsx)(`i`, { className: `fas fa-times` }),
            }),
          ],
        }),
        (0, E.jsxs)(`div`, {
          className: `flex items-center gap-3 mb-3 shrink-0 flex-wrap`,
          children: [
            (0, E.jsxs)(`div`, {
              className: `relative flex-1 min-w-[220px]`,
              children: [
                (0, E.jsx)(`i`, {
                  className: `fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs`,
                }),
                (0, E.jsx)(`input`, {
                  value: i,
                  onChange: (e) => o(e.target.value),
                  placeholder: `Tìm theo SN, MAC, ONU ID, phòng, Frame/Slot/Port...`,
                  className: `w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
                }),
              ],
            }),
            [`all`, `online`, `offline`, `los`].map((e) =>
              (0, E.jsx)(
                `button`,
                {
                  onClick: () => c(e),
                  className: `px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${s === e ? `bg-fuchsia-600 border-fuchsia-600 text-white` : `bg-white border-slate-200 text-slate-500 hover:border-fuchsia-300`}`,
                  children:
                    e === `all`
                      ? `Tất cả (${p.length})`
                      : e === `online`
                        ? `Online (${_.online})`
                        : e === `offline`
                          ? `Offline (${_.offline})`
                          : `LOS (${_.los})`,
                },
                e,
              ),
            ),
          ],
        }),
        (0, E.jsx)(`div`, {
          className: `flex-1 overflow-y-auto custom-scroll border border-slate-200 rounded-xl`,
          children: (0, E.jsxs)(`table`, {
            className: `w-full text-xs`,
            children: [
              (0, E.jsx)(`thead`, {
                className: `sticky top-0 bg-slate-50 z-10`,
                children: (0, E.jsxs)(`tr`, {
                  className: `border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest`,
                  children: [
                    (0, E.jsxs)(`th`, {
                      className: `text-left px-3 py-2.5 cursor-pointer select-none`,
                      onClick: () => h(`room`),
                      children: [`Phòng `, g(`room`)],
                    }),
                    (0, E.jsx)(`th`, {
                      className: `text-left px-3 py-2.5`,
                      children: `SN / MAC`,
                    }),
                    (0, E.jsxs)(`th`, {
                      className: `text-left px-3 py-2.5 cursor-pointer select-none`,
                      onClick: () => h(`onuId`),
                      children: [`ONU ID `, g(`onuId`)],
                    }),
                    (0, E.jsxs)(`th`, {
                      className: `text-left px-3 py-2.5 cursor-pointer select-none`,
                      onClick: () => h(`breadcrumb`),
                      children: [`Frame / Slot / Port `, g(`breadcrumb`)],
                    }),
                    (0, E.jsxs)(`th`, {
                      className: `text-left px-3 py-2.5 cursor-pointer select-none`,
                      onClick: () => h(`provider`),
                      children: [`Nhà cung cấp `, g(`provider`)],
                    }),
                    (0, E.jsxs)(`th`, {
                      className: `text-left px-3 py-2.5 cursor-pointer select-none`,
                      onClick: () => h(`status`),
                      children: [`Trạng thái `, g(`status`)],
                    }),
                  ],
                }),
              }),
              (0, E.jsxs)(`tbody`, {
                children: [
                  m.length === 0 &&
                    (0, E.jsx)(`tr`, {
                      children: (0, E.jsx)(`td`, {
                        colSpan: 6,
                        className: `text-center py-10 text-slate-400 italic`,
                        children: `Không tìm thấy ONT nào phù hợp.`,
                      }),
                    }),
                  m.map(({ ont: e, breadcrumb: t }) => {
                    let r = G(e);
                    return (0, E.jsxs)(
                      `tr`,
                      {
                        onClick: () => n(e.id),
                        className: `border-b border-slate-100 last:border-0 hover:bg-fuchsia-50/40 cursor-pointer transition-colors`,
                        children: [
                          (0, E.jsx)(`td`, {
                            className: `px-3 py-2.5 font-bold text-slate-800`,
                            children:
                              e.room ||
                              (0, E.jsx)(`span`, {
                                className: `text-slate-300 italic`,
                                children: `—`,
                              }),
                          }),
                          (0, E.jsxs)(`td`, {
                            className: `px-3 py-2.5 text-slate-500 font-mono text-[10px]`,
                            children: [e.sn, e.mac ? ` · ${e.mac}` : ``],
                          }),
                          (0, E.jsxs)(`td`, {
                            className: `px-3 py-2.5 text-slate-600 font-black`,
                            children: [`#`, e.onuId],
                          }),
                          (0, E.jsx)(`td`, {
                            className: `px-3 py-2.5 text-slate-500`,
                            children: t,
                          }),
                          (0, E.jsx)(`td`, {
                            className: `px-3 py-2.5 text-slate-500`,
                            children:
                              r ||
                              (0, E.jsx)(`span`, {
                                className: `text-slate-300 italic`,
                                children: `—`,
                              }),
                          }),
                          (0, E.jsx)(`td`, {
                            className: `px-3 py-2.5`,
                            children: (0, E.jsxs)(`span`, {
                              className: `inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500`,
                              children: [
                                (0, E.jsx)(`span`, {
                                  className: `w-1.5 h-1.5 rounded-full ${W[e.status ?? `offline`]}`,
                                }),
                                ae[e.status ?? `offline`],
                              ],
                            }),
                          }),
                        ],
                      },
                      e.id,
                    );
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function K(e) {
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
var se = { HWTC: `Huawei` };
function q(e) {
  let t = e.trim();
  if (!/^[0-9a-fA-F]{16}$/.test(t)) return { sn: t };
  let n = t.match(/../g).map((e) => parseInt(e, 16)),
    r = n.slice(0, 4);
  if (!r.every((e) => e >= 32 && e <= 126)) return { sn: t };
  let i = r.map((e) => String.fromCharCode(e)).join(``),
    a = n
      .slice(4)
      .map((e) => e.toString(16).padStart(2, `0`))
      .join(``)
      .toUpperCase(),
    o = se[i];
  return { sn: i + a, ...(o ? { brand: o } : {}) };
}
function ce(e) {
  let t = e
    .replace(/^﻿/, ``)
    .split(/\r\n|\n/)
    .filter((e) => e.trim().length > 0);
  if (t.length < 2)
    return { ok: !1, error: `File CSV rỗng hoặc không có dòng dữ liệu nào.` };
  let n = K(t[0]).map((e) => e.trim()),
    r = n.findIndex((e) => /frame.*slot.*port/i.test(e)),
    i = n.findIndex((e) => /ph[oò]ng|room|description/i.test(e)),
    a = n.findIndex((e) => /on[tu].*id/i.test(e)),
    o = n.findIndex((e) => /serial|mac.*sn|sn.*(address|mac)/i.test(e));
  return r === -1 || a === -1 || o === -1
    ? {
        ok: !1,
        error: `File CSV thiếu cột bắt buộc — cần có cột dạng "Frame_Slot_Port", "ONT_ID"/"ONU_ID", và "MAC_SN_Address"/"Serial".`,
      }
    : {
        ok: !0,
        rows: t.slice(1).map((e, t) => {
          let n = K(e),
            s = t + 2,
            c = (n[r] ?? ``).trim(),
            l = c.split(`/`),
            u = l.length === 3 ? parseInt(l[1], 10) : NaN,
            d = l.length === 3 ? parseInt(l[2], 10) : NaN,
            f = i > -1 ? (n[i] ?? ``).trim() : ``,
            p = (n[a] ?? ``).trim(),
            m = parseInt(p, 10),
            { sn: h, brand: g } = q((n[o] ?? ``).trim()),
            _ = null;
          return (
            !c || Number.isNaN(u) || Number.isNaN(d)
              ? (_ = `Cột Frame_Slot_Port không đọc được: "${c}"`)
              : !p || Number.isNaN(m) || m < 0
                ? (_ = `ONU ID không hợp lệ: "${p}"`)
                : h || (_ = `Thiếu Serial Number`),
            {
              lineNumber: s,
              slotNumber: u,
              portNumber: d,
              room: f,
              onuId: m,
              sn: h,
              ...(g ? { brand: g } : {}),
              error: _,
            }
          );
        }),
      };
}
var J = (e, t) => `${e}/${t}`;
function le(e) {
  let t = e.filter((e) => !e.error),
    n = e.filter((e) => e.error),
    r = new Map();
  t.forEach((e) => {
    let t = J(e.slotNumber, e.portNumber);
    (r.has(t) || r.set(t, []), r.get(t).push(e));
  });
  let i = [];
  return (
    r.forEach((e, t) => {
      let n = new Map();
      e.forEach((e) => {
        (n.has(e.onuId) || n.set(e.onuId, []),
          n.get(e.onuId).push(e.lineNumber));
      });
      let [r, a] = t.split(`/`).map(Number);
      n.forEach((e, t) => {
        e.length > 1 &&
          i.push({ slotNumber: r, portNumber: a, onuId: t, lines: e });
      });
    }),
    {
      validRows: t,
      errorRows: n,
      byPort: r,
      duplicates: i,
      slotCount: new Set(t.map((e) => e.slotNumber)).size,
      portCount: r.size,
    }
  );
}
var Y = [`1:8`, `1:16`, `1:32`, `1:64`, `1:128`];
function X(e) {
  let t = e + 1;
  return Y.find((e) => o(e) >= t) ?? `1:128`;
}
function Z(e, t, n) {
  let r = e
    ? { ...e, slots: e.slots.map((e) => ({ ...e, ports: [...e.ports] })) }
    : { id: `gpon-frame-${Date.now()}`, name: t, slots: [] };
  return (
    n.forEach((e, t) => {
      let [n, i] = t.split(`/`).map(Number),
        a = Math.max(...e.map((e) => e.onuId)),
        s = r.slots.find((e) => e.slotNumber === n);
      s ||
        ((s = { id: `gpon-slot-${Date.now()}-${n}`, slotNumber: n, ports: [] }),
        r.slots.push(s));
      let c = s.ports.find((e) => e.portNumber === i);
      c
        ? a + 1 > o(c.splitterRatio) && (c.splitterRatio = X(a))
        : s.ports.push({
            id: `gpon-port-${Date.now()}-${n}-${i}`,
            portNumber: i,
            splitterRatio: X(a),
          });
    }),
    r.slots.sort((e, t) => e.slotNumber - t.slotNumber),
    r.slots.forEach((e) => e.ports.sort((e, t) => e.portNumber - t.portNumber)),
    r
  );
}
function Q(e, t, n, r) {
  let i = [],
    a = [],
    o = 0;
  return (
    t.forEach((t, c) => {
      let [l, u] = c.split(`/`).map(Number),
        d = e.slots.find((e) => e.slotNumber === l),
        f = d?.ports.find((e) => e.portNumber === u);
      if (!d || !f) return;
      let p = new Set(n.filter((e) => e.portId === f.id).map((e) => e.onuId));
      t.forEach((t) => {
        if (p.has(t.onuId)) {
          a.push({
            row: t,
            reason: `ONU ID ${t.onuId} trên Slot ${l} / Port ${u} đã tồn tại`,
          });
          return;
        }
        (p.add(t.onuId), o++);
        let n = t.room || t.sn;
        i.push({
          id: `gpon-ont-import-${Date.now()}-${o}`,
          frameId: e.id,
          slotId: d.id,
          portId: f.id,
          onuId: t.onuId,
          sn: t.sn,
          mac: ``,
          ...(t.brand ? { brand: t.brand } : {}),
          ...(t.room ? { room: t.room } : {}),
          status: `online`,
          ports: [],
          logs: s(void 0, `Thêm mới ONT [${n}] (Import CSV)`, r),
        });
      });
    }),
    { onts: i, skipped: a }
  );
}
function ue(e) {
  let t = (0, w.c)(68),
    { frameDB: n, ontDB: r, username: i, onConfirm: a, onClose: o } = e,
    s = h(pe),
    [c, l] = (0, T.useState)(``),
    [u, d] = (0, T.useState)(null),
    [f, p] = (0, T.useState)(`__new__`),
    [m, g] = (0, T.useState)(``),
    _;
  t[0] === s
    ? (_ = t[1])
    : ((_ = async function (e) {
        let t = e.target.files?.[0];
        if (((e.target.value = ``), !t)) return;
        l(t.name);
        let n = ce(await t.text());
        if (!n.ok) {
          (s(n.error, `error`), d(null));
          return;
        }
        d(n.rows);
      }),
      (t[0] = s),
      (t[1] = _));
  let v = _,
    y,
    b,
    x,
    S,
    C,
    D,
    O,
    k,
    A,
    j,
    M;
  if (
    t[2] !== c ||
    t[3] !== n ||
    t[4] !== v ||
    t[5] !== m ||
    t[6] !== o ||
    t[7] !== a ||
    t[8] !== r ||
    t[9] !== u ||
    t[10] !== s ||
    t[11] !== f ||
    t[12] !== i
  ) {
    x = u ? le(u) : null;
    let e = f === `__new__` ? null : (n.find((e) => e.id === f) ?? null),
      l = f === `__new__` ? m.trim() : (e?.name ?? ``);
    ((y = !!x && x.validRows.length > 0 && !!l),
      (b = function () {
        if (!x || !y) return;
        let t = Z(e, l, x.byPort),
          { onts: n, skipped: o } = Q(t, x.byPort, r, i);
        (a(t, n),
          o.length > 0 &&
            s(
              `Đã import ${n.length} ONT. Bỏ qua ${o.length} dòng vì ONU ID đã tồn tại sẵn trên cổng đó.`,
              `success`,
            ));
      }),
      (j = `modal`),
      t[24] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((M = { display: `flex`, zIndex: 235 }), (t[24] = M))
        : (M = t[24]),
      (S = `modal-content shadow-2xl`),
      t[25] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = {
            width: 760,
            maxWidth: `96vw`,
            display: `flex`,
            flexDirection: `column`,
            maxHeight: `90vh`,
          }),
          (t[25] = C))
        : (C = t[25]));
    let d;
    t[26] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = (0, E.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [
            (0, E.jsx)(`div`, {
              className: `w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center text-xs border border-fuchsia-100`,
              children: (0, E.jsx)(`i`, { className: `fas fa-file-import` }),
            }),
            `Nhập ONT từ CSV`,
          ],
        })),
        (t[26] = d))
      : (d = t[26]);
    let h;
    (t[27] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((h = (0, E.jsx)(`i`, { className: `fas fa-times` })), (t[27] = h))
      : (h = t[27]),
      t[28] === o
        ? (D = t[29])
        : ((D = (0, E.jsxs)(`div`, {
            className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
            children: [
              d,
              (0, E.jsx)(`button`, {
                onClick: o,
                className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
                children: h,
              }),
            ],
          })),
          (t[28] = o),
          (t[29] = D)));
    let _;
    t[30] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((_ = (0, E.jsx)(`i`, {
          className: `fas fa-info-circle text-fuchsia-500 mt-0.5`,
        })),
        (t[30] = _))
      : (_ = t[30]);
    let w;
    t[31] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((w = (0, E.jsx)(`code`, { children: `Frame_Slot_Port` })), (t[31] = w))
      : (w = t[31]);
    let T;
    t[32] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((T = (0, E.jsx)(`code`, { children: `ONT_ID` })), (t[32] = T))
      : (T = t[32]);
    let N;
    t[33] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((N = (0, E.jsx)(`code`, { children: `ONU_ID` })), (t[33] = N))
      : (N = t[33]);
    let P;
    t[34] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((P = (0, E.jsx)(`code`, { children: `MAC_SN_Address` })), (t[34] = P))
      : (P = t[34]);
    let F;
    t[35] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((F = (0, E.jsx)(`code`, { children: `Serial` })), (t[35] = F))
      : (F = t[35]);
    let I;
    t[36] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((I = (0, E.jsx)(`code`, { children: `Phòng` })), (t[36] = I))
      : (I = t[36]);
    let L;
    (t[37] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((L = (0, E.jsx)(`code`, { children: `Room` })), (t[37] = L))
      : (L = t[37]),
      t[38] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (0, E.jsxs)(`div`, {
            className: `mb-4 shrink-0 bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-3 flex items-start gap-2`,
            children: [
              _,
              (0, E.jsxs)(`p`, {
                className: `text-[10px] text-fuchsia-700 font-bold leading-relaxed`,
                children: [
                  `Cột bắt buộc: `,
                  w,
                  ` (VD: 0/1/2), `,
                  T,
                  `/`,
                  N,
                  `, và`,
                  ` `,
                  P,
                  `/`,
                  F,
                  ` — thứ tự cột không quan trọng. Cột phòng (`,
                  I,
                  `/`,
                  L,
                  `/`,
                  (0, E.jsx)(`code`, { children: `Description` }),
                  `) là tùy chọn. Serial dạng hex 16 ký tự (xuất từ CLI OLT) sẽ tự giải mã về dạng chữ+hex đúng như trên nhãn thiết bị.`,
                ],
              }),
            ],
          })),
          (t[38] = O))
        : (O = t[38]));
    let R;
    t[39] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((R = (0, E.jsx)(`i`, { className: `fas fa-upload` })), (t[39] = R))
      : (R = t[39]);
    let z = c || `Chọn file CSV...`,
      B;
    (t[40] === v
      ? (B = t[41])
      : ((B = (0, E.jsx)(`input`, {
          type: `file`,
          accept: `.csv,text/csv`,
          className: `hidden`,
          onChange: v,
        })),
        (t[40] = v),
        (t[41] = B)),
      t[42] !== z || t[43] !== B
        ? ((k = (0, E.jsx)(`div`, {
            className: `mb-4 shrink-0`,
            children: (0, E.jsxs)(`label`, {
              className: `flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-fuchsia-300 hover:bg-fuchsia-50/30 transition-all text-xs font-bold text-slate-500`,
              children: [R, z, B],
            }),
          })),
          (t[42] = z),
          (t[43] = B),
          (t[44] = k))
        : (k = t[44]),
      (A =
        x &&
        (0, E.jsxs)(E.Fragment, {
          children: [
            (0, E.jsxs)(`div`, {
              className: `grid grid-cols-2 gap-4 mb-4 shrink-0`,
              children: [
                (0, E.jsxs)(`div`, {
                  children: [
                    (0, E.jsx)(`label`, {
                      htmlFor: `gpon-import-target-frame`,
                      className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                      children: `Frame đích`,
                    }),
                    (0, E.jsxs)(`select`, {
                      id: `gpon-import-target-frame`,
                      value: f,
                      onChange: (e) => p(e.target.value),
                      className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
                      children: [
                        (0, E.jsx)(`option`, {
                          value: `__new__`,
                          children: `+ Tạo Frame mới`,
                        }),
                        n.map(fe),
                      ],
                    }),
                  ],
                }),
                (0, E.jsxs)(`div`, {
                  children: [
                    (0, E.jsx)(`label`, {
                      className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
                      children:
                        f === `__new__`
                          ? `Tên Frame mới`
                          : `Slot/Port sẽ được gộp vào Frame này`,
                    }),
                    f === `__new__`
                      ? (0, E.jsx)(`input`, {
                          value: m,
                          onChange: (e) => g(e.target.value),
                          placeholder: `VD: OLT 02 - Tòa B`,
                          className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
                        })
                      : (0, E.jsx)(`div`, {
                          className: `px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500`,
                          children: `Slot/Port trùng số sẽ dùng chung; Slot/Port mới sẽ được thêm vào.`,
                        }),
                  ],
                }),
              ],
            }),
            (0, E.jsxs)(`div`, {
              className: `flex items-center gap-2 mb-3 shrink-0 flex-wrap`,
              children: [
                (0, E.jsxs)(`span`, {
                  className: `px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-[10px] font-black`,
                  children: [x.validRows.length, ` ONT hợp lệ`],
                }),
                (0, E.jsxs)(`span`, {
                  className: `px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg text-[10px] font-black`,
                  children: [x.slotCount, ` Slot · `, x.portCount, ` Port`],
                }),
                x.errorRows.length > 0 &&
                  (0, E.jsxs)(`span`, {
                    className: `px-2.5 py-1 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] font-black`,
                    children: [x.errorRows.length, ` dòng lỗi`],
                  }),
                x.duplicates.length > 0 &&
                  (0, E.jsxs)(`span`, {
                    className: `px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-600 rounded-lg text-[10px] font-black`,
                    children: [x.duplicates.length, ` ONU ID trùng trong file`],
                  }),
              ],
            }),
            (x.errorRows.length > 0 || x.duplicates.length > 0) &&
              (0, E.jsx)(`div`, {
                className: `flex-1 overflow-y-auto custom-scroll border border-slate-200 rounded-xl mb-4`,
                style: { maxHeight: 220 },
                children: (0, E.jsxs)(`table`, {
                  className: `w-full text-xs`,
                  children: [
                    (0, E.jsx)(`thead`, {
                      className: `sticky top-0 bg-slate-50`,
                      children: (0, E.jsxs)(`tr`, {
                        className: `border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest`,
                        children: [
                          (0, E.jsx)(`th`, {
                            className: `text-left px-3 py-2 w-14`,
                            children: `Dòng`,
                          }),
                          (0, E.jsx)(`th`, {
                            className: `text-left px-3 py-2`,
                            children: `Vấn đề`,
                          }),
                        ],
                      }),
                    }),
                    (0, E.jsxs)(`tbody`, {
                      children: [x.errorRows.map($), x.duplicates.map(de)],
                    }),
                  ],
                }),
              }),
          ],
        })),
      (t[2] = c),
      (t[3] = n),
      (t[4] = v),
      (t[5] = m),
      (t[6] = o),
      (t[7] = a),
      (t[8] = r),
      (t[9] = u),
      (t[10] = s),
      (t[11] = f),
      (t[12] = i),
      (t[13] = y),
      (t[14] = b),
      (t[15] = x),
      (t[16] = S),
      (t[17] = C),
      (t[18] = D),
      (t[19] = O),
      (t[20] = k),
      (t[21] = A),
      (t[22] = j),
      (t[23] = M));
  } else
    ((y = t[13]),
      (b = t[14]),
      (x = t[15]),
      (S = t[16]),
      (C = t[17]),
      (D = t[18]),
      (O = t[19]),
      (k = t[20]),
      (A = t[21]),
      (j = t[22]),
      (M = t[23]));
  let N;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, E.jsx)(`div`, { className: `flex-1` })), (t[45] = N))
    : (N = t[45]);
  let P;
  t[46] === o
    ? (P = t[47])
    : ((P = (0, E.jsx)(`button`, {
        onClick: o,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[46] = o),
      (t[47] = P));
  let F = !y,
    I;
  t[48] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((I = (0, E.jsx)(`i`, { className: `fas fa-file-import` })), (t[48] = I))
    : (I = t[48]);
  let L = x ? ` (${x.validRows.length})` : ``,
    R;
  t[49] !== b || t[50] !== F || t[51] !== L
    ? ((R = (0, E.jsxs)(`button`, {
        onClick: b,
        disabled: F,
        className: `px-6 py-2.5 bg-fuchsia-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-fuchsia-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2`,
        children: [I, ` Xác nhận Import`, L],
      })),
      (t[49] = b),
      (t[50] = F),
      (t[51] = L),
      (t[52] = R))
    : (R = t[52]);
  let z;
  t[53] !== P || t[54] !== R
    ? ((z = (0, E.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [N, P, R],
      })),
      (t[53] = P),
      (t[54] = R),
      (t[55] = z))
    : (z = t[55]);
  let B;
  t[56] !== z ||
  t[57] !== S ||
  t[58] !== C ||
  t[59] !== D ||
  t[60] !== O ||
  t[61] !== k ||
  t[62] !== A
    ? ((B = (0, E.jsxs)(`div`, {
        className: S,
        style: C,
        children: [D, O, k, A, z],
      })),
      (t[56] = z),
      (t[57] = S),
      (t[58] = C),
      (t[59] = D),
      (t[60] = O),
      (t[61] = k),
      (t[62] = A),
      (t[63] = B))
    : (B = t[63]);
  let ee;
  return (
    t[64] !== B || t[65] !== j || t[66] !== M
      ? ((ee = (0, E.jsx)(`div`, { className: j, style: M, children: B })),
        (t[64] = B),
        (t[65] = j),
        (t[66] = M),
        (t[67] = ee))
      : (ee = t[67]),
    ee
  );
}
function de(e, t) {
  return (0, E.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 bg-amber-50/40`,
      children: [
        (0, E.jsx)(`td`, {
          className: `px-3 py-2 text-slate-400 font-mono`,
          children: e.lines.join(`, `),
        }),
        (0, E.jsxs)(`td`, {
          className: `px-3 py-2 text-[10px] font-bold text-amber-700`,
          children: [
            (0, E.jsx)(`i`, { className: `fas fa-triangle-exclamation mr-1` }),
            `ONU ID `,
            e.onuId,
            ` lặp lại trên Slot `,
            e.slotNumber,
            ` / Port `,
            e.portNumber,
            ` — chỉ dòng đầu tiên sẽ được import.`,
          ],
        }),
      ],
    },
    `dup-${t}`,
  );
}
function $(e) {
  return (0, E.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 bg-red-50/40`,
      children: [
        (0, E.jsx)(`td`, {
          className: `px-3 py-2 text-slate-400 font-mono`,
          children: e.lineNumber,
        }),
        (0, E.jsxs)(`td`, {
          className: `px-3 py-2 text-[10px] font-bold text-red-600`,
          children: [
            (0, E.jsx)(`i`, { className: `fas fa-circle-exclamation mr-1` }),
            e.error,
          ],
        }),
      ],
    },
    `err-${e.lineNumber}`,
  );
}
function fe(e) {
  return (0, E.jsx)(`option`, { value: e.id, children: e.name }, e.id);
}
function pe(e) {
  return e.showDialog;
}
var me = 5;
function he(e) {
  let t = (0, w.c)(63),
    { onBack: n, username: r } = e,
    a = m(Te),
    s = m(we),
    u = m(Ce),
    f = m(Se),
    p = m(xe),
    g = m(be),
    _ = h(ye),
    v = d(ve),
    b = d(_e),
    [S, C] = (0, T.useState)(`closed`),
    [D, O] = (0, T.useState)(null),
    [k, A] = (0, T.useState)(null),
    [j, M] = (0, T.useState)(!1),
    [P, F] = (0, T.useState)(!1),
    I;
  t[0] !== a || t[1] !== s
    ? ((I = function (e) {
        let t = s.find((t) => t.id === e),
          n = t && c(a, t.frameId),
          r = n && t && y(a, t.frameId, t.slotId),
          o = n && r && t && i(a, t.frameId, t.slotId, t.portId);
        n && r && o && t && A({ frame: n, slot: r, port: o, ont: t });
      }),
      (t[0] = a),
      (t[1] = s),
      (t[2] = I))
    : (I = t[2]);
  let L = I,
    R,
    z;
  (t[3] !== b || t[4] !== v || t[5] !== a || t[6] !== s
    ? ((R = () => {
        if (!v || v.module !== `gpon`) return;
        let e = s.find((e) => e.id === v.ontId),
          t = e && c(a, e.frameId),
          n = t && e && y(a, e.frameId, e.slotId),
          r = t && n && e && i(a, e.frameId, e.slotId, e.portId);
        (t && n && r && e && A({ frame: t, slot: n, port: r, ont: e }), b());
      }),
      (z = [v, b, a, s]),
      (t[3] = b),
      (t[4] = v),
      (t[5] = a),
      (t[6] = s),
      (t[7] = R),
      (t[8] = z))
    : ((R = t[7]), (z = t[8])),
    (0, T.useEffect)(R, z));
  let B;
  t[9] !== f || t[10] !== s || t[11] !== _
    ? ((B = function (e) {
        let t = s.filter((t) => t.frameId === e.id).length,
          n =
            t > 0 ? `\n\n⚠️ Sẽ xóa luôn ${t} ONT đang gắn trên Frame này!` : ``;
        _(`Bạn có chắc chắn muốn xóa Frame "${e.name}"?${n}`, `confirm`, () => {
          (f(e.id), C(`closed`));
        });
      }),
      (t[9] = f),
      (t[10] = s),
      (t[11] = _),
      (t[12] = B))
    : (B = t[12]);
  let ee = B,
    te;
  t[13] !== g || t[14] !== _
    ? ((te = function (e) {
        if (!e.ont) return;
        let t = e.ont.room || e.ont.sn;
        _(`Bạn có chắc chắn muốn xóa ONT "${t}"?`, `confirm`, () => {
          (g(e.ont.id), A(null));
        });
      }),
      (t[13] = g),
      (t[14] = _),
      (t[15] = te))
    : (te = t[15]);
  let V = te,
    H;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, E.jsxs)(`div`, {
        children: [
          (0, E.jsxs)(`h2`, {
            className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
            children: [
              (0, E.jsx)(`div`, {
                className: `w-10 h-10 rounded-xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center border border-fuchsia-100`,
                children: (0, E.jsx)(`i`, { className: `fas fa-code-branch` }),
              }),
              `GPON Topology`,
            ],
          }),
          (0, E.jsx)(`p`, {
            className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
            children: `Hệ thống OLT / ONT`,
          }),
        ],
      })),
      (t[16] = H))
    : (H = t[16]);
  let re;
  t[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((re = () => M(!0)), (t[17] = re))
    : (re = t[17]);
  let U, W;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((U = (0, E.jsxs)(`button`, {
        onClick: re,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2`,
        children: [
          (0, E.jsx)(`i`, { className: `fas fa-list-ul` }),
          ` Xem tất cả ONT`,
        ],
      })),
      (W = () => F(!0)),
      (t[18] = U),
      (t[19] = W))
    : ((U = t[18]), (W = t[19]));
  let ae, G;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ae = (0, E.jsxs)(`button`, {
        onClick: W,
        className: `px-5 py-2.5 bg-white border border-fuchsia-200 text-fuchsia-600 text-xs font-bold rounded-xl hover:bg-fuchsia-50 transition-all flex items-center gap-2`,
        children: [
          (0, E.jsx)(`i`, { className: `fas fa-file-import` }),
          ` Nhập từ CSV`,
        ],
      })),
      (G = () => C(null)),
      (t[20] = ae),
      (t[21] = G))
    : ((ae = t[20]), (G = t[21]));
  let K;
  t[22] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((K = (0, E.jsxs)(`button`, {
        onClick: G,
        className: `px-5 py-2.5 bg-fuchsia-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-fuchsia-700 transition-all flex items-center gap-2`,
        children: [
          (0, E.jsx)(`i`, { className: `fas fa-plus` }),
          ` Thêm Frame`,
        ],
      })),
      (t[22] = K))
    : (K = t[22]);
  let se;
  t[23] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((se = (0, E.jsx)(`i`, { className: `fas fa-arrow-left` })), (t[23] = se))
    : (se = t[23]);
  let q;
  t[24] === n
    ? (q = t[25])
    : ((q = (0, E.jsxs)(`div`, {
        className: `view-header px-8 py-6 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0`,
        children: [
          H,
          (0, E.jsxs)(`div`, {
            className: `view-header-actions flex items-center gap-3`,
            children: [
              U,
              ae,
              K,
              (0, E.jsxs)(`button`, {
                onClick: n,
                className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
                children: [se, ` Quay lại Topology`],
              }),
            ],
          }),
        ],
      })),
      (t[24] = n),
      (t[25] = q));
  let ce;
  t[26] !== a || t[27] !== s
    ? ((ce = (0, E.jsx)(`div`, {
        className: `flex-1 overflow-auto custom-scroll p-8`,
        children:
          a.length === 0
            ? (0, E.jsxs)(`div`, {
                className: `h-full flex flex-col items-center justify-center text-center opacity-40`,
                children: [
                  (0, E.jsx)(`i`, {
                    className: `fas fa-code-branch text-5xl mb-4 text-slate-400`,
                  }),
                  (0, E.jsx)(`p`, {
                    className: `text-sm font-bold text-slate-500 uppercase tracking-widest`,
                    children: `Chưa có Frame (OLT) nào — bấm "Thêm Frame" để bắt đầu`,
                  }),
                ],
              })
            : (0, E.jsx)(`div`, {
                className: `gpon-canvas`,
                children: a.map((e) =>
                  (0, E.jsxs)(
                    `div`,
                    {
                      className: `gpon-frame-block`,
                      children: [
                        (0, E.jsxs)(`div`, {
                          className: `gpon-frame-box`,
                          onClick: () => C(e),
                          title: `Bấm để xem/sửa Frame`,
                          children: [
                            (0, E.jsx)(`i`, { className: `fas fa-server` }),
                            e.name,
                            e.location ? ` · ${e.location}` : ``,
                          ],
                        }),
                        e.slots.length > 0 &&
                          (0, E.jsxs)(E.Fragment, {
                            children: [
                              (0, E.jsx)(`div`, { className: `gpon-vline` }),
                              (0, E.jsx)(`div`, {
                                className: `gpon-slot-row`,
                                children: e.slots.map((t) =>
                                  (0, E.jsxs)(
                                    `div`,
                                    {
                                      className: `gpon-slot-col`,
                                      children: [
                                        (0, E.jsxs)(`div`, {
                                          className: `gpon-slot-box`,
                                          onClick: () => C(e),
                                          title: `Bấm để xem/sửa Slot`,
                                          children: [
                                            `Slot `,
                                            t.slotNumber,
                                            t.cardModel
                                              ? ` — ${t.cardModel}`
                                              : ``,
                                          ],
                                        }),
                                        t.ports.length > 0 &&
                                          (0, E.jsx)(`div`, {
                                            className: `gpon-ports-row`,
                                            children: t.ports.map((n) => {
                                              let r = l(s, n.id).sort(ge),
                                                i = o(n.splitterRatio),
                                                a = r.length >= i,
                                                c = r.slice(0, me),
                                                u = r.length - c.length;
                                              return (0, E.jsxs)(
                                                `div`,
                                                {
                                                  className: `gpon-port-col`,
                                                  children: [
                                                    (0, E.jsxs)(`div`, {
                                                      className: `gpon-port-box ${a ? `gpon-port-box--full` : ``}`,
                                                      onClick: () =>
                                                        O({
                                                          frame: e,
                                                          slot: t,
                                                          port: n,
                                                        }),
                                                      title: `Bấm để xem toàn bộ ONT trên cổng này`,
                                                      children: [
                                                        `Port `,
                                                        n.portNumber,
                                                        ` · `,
                                                        r.length,
                                                        `/`,
                                                        i,
                                                      ],
                                                    }),
                                                    (0, E.jsx)(`div`, {
                                                      className: `gpon-ont-fan`,
                                                      children:
                                                        c.length === 0
                                                          ? (0, E.jsxs)(`div`, {
                                                              className: `gpon-more-tile`,
                                                              onClick: () =>
                                                                A({
                                                                  frame: e,
                                                                  slot: t,
                                                                  port: n,
                                                                  ont: null,
                                                                }),
                                                              children: [
                                                                (0, E.jsx)(
                                                                  `i`,
                                                                  {
                                                                    className: `fas fa-plus mr-1`,
                                                                  },
                                                                ),
                                                                `Thêm ONT`,
                                                              ],
                                                            })
                                                          : (0, E.jsxs)(
                                                              E.Fragment,
                                                              {
                                                                children: [
                                                                  c.map((r) =>
                                                                    (0, E.jsx)(
                                                                      ie,
                                                                      {
                                                                        ont: r,
                                                                        onClick:
                                                                          () =>
                                                                            A({
                                                                              frame:
                                                                                e,
                                                                              slot: t,
                                                                              port: n,
                                                                              ont: r,
                                                                            }),
                                                                      },
                                                                      r.id,
                                                                    ),
                                                                  ),
                                                                  u > 0 &&
                                                                    (0, E.jsxs)(
                                                                      `div`,
                                                                      {
                                                                        className: `gpon-more-tile`,
                                                                        onClick:
                                                                          () =>
                                                                            O({
                                                                              frame:
                                                                                e,
                                                                              slot: t,
                                                                              port: n,
                                                                            }),
                                                                        children:
                                                                          [
                                                                            `+ `,
                                                                            u,
                                                                            ` ONT khác`,
                                                                            (0,
                                                                            E.jsx)(
                                                                              `br`,
                                                                              {},
                                                                            ),
                                                                            `trên cổng này`,
                                                                          ],
                                                                      },
                                                                    ),
                                                                ],
                                                              },
                                                            ),
                                                    }),
                                                  ],
                                                },
                                                n.id,
                                              );
                                            }),
                                          }),
                                      ],
                                    },
                                    t.id,
                                  ),
                                ),
                              }),
                            ],
                          }),
                      ],
                    },
                    e.id,
                  ),
                ),
              }),
      })),
      (t[26] = a),
      (t[27] = s),
      (t[28] = ce))
    : (ce = t[28]);
  let J;
  t[29] !== S || t[30] !== ee || t[31] !== u || t[32] !== r
    ? ((J =
        S !== `closed` &&
        (0, E.jsx)(x, {
          frame: S,
          username: r,
          onSave: (e) => {
            (u(e), C(`closed`));
          },
          onDelete: () => ee(S),
          onClose: () => C(`closed`),
        })),
      (t[29] = S),
      (t[30] = ee),
      (t[31] = u),
      (t[32] = r),
      (t[33] = J))
    : (J = t[33]);
  let le;
  t[34] !== D || t[35] !== s
    ? ((le =
        D &&
        (0, E.jsx)(ne, {
          frame: D.frame,
          slot: D.slot,
          port: D.port,
          ontDB: s,
          onAddNew: () => {
            (A({ ...D, ont: null }), O(null));
          },
          onEdit: (e) => {
            let t = s.find((t) => t.id === e) ?? null;
            (A({ ...D, ont: t }), O(null));
          },
          onClose: () => O(null),
        })),
      (t[34] = D),
      (t[35] = s),
      (t[36] = le))
    : (le = t[36]);
  let Y;
  t[37] !== V || t[38] !== s || t[39] !== k || t[40] !== p || t[41] !== r
    ? ((Y =
        k &&
        (0, E.jsx)(N, {
          ont: k.ont,
          frame: k.frame,
          slot: k.slot,
          port: k.port,
          ontDB: s,
          username: r,
          onSave: (e) => {
            (p(e), A(null));
          },
          onDelete: () => V(k),
          onClose: () => A(null),
        })),
      (t[37] = V),
      (t[38] = s),
      (t[39] = k),
      (t[40] = p),
      (t[41] = r),
      (t[42] = Y))
    : (Y = t[42]);
  let X;
  t[43] !== j || t[44] !== a || t[45] !== s || t[46] !== L
    ? ((X =
        j &&
        (0, E.jsx)(oe, {
          frameDB: a,
          ontDB: s,
          onEdit: (e) => {
            (L(e), M(!1));
          },
          onClose: () => M(!1),
        })),
      (t[43] = j),
      (t[44] = a),
      (t[45] = s),
      (t[46] = L),
      (t[47] = X))
    : (X = t[47]);
  let Z;
  t[48] !== P ||
  t[49] !== a ||
  t[50] !== s ||
  t[51] !== u ||
  t[52] !== p ||
  t[53] !== r
    ? ((Z =
        P &&
        (0, E.jsx)(ue, {
          frameDB: a,
          ontDB: s,
          username: r,
          onConfirm: (e, t) => {
            (u(e), t.forEach((e) => p(e)), F(!1));
          },
          onClose: () => F(!1),
        })),
      (t[48] = P),
      (t[49] = a),
      (t[50] = s),
      (t[51] = u),
      (t[52] = p),
      (t[53] = r),
      (t[54] = Z))
    : (Z = t[54]);
  let Q;
  return (
    t[55] !== q ||
    t[56] !== ce ||
    t[57] !== J ||
    t[58] !== le ||
    t[59] !== Y ||
    t[60] !== X ||
    t[61] !== Z
      ? ((Q = (0, E.jsxs)(`div`, {
          className: `w-full h-full flex flex-col relative bg-slate-50/50`,
          children: [q, ce, J, le, Y, X, Z],
        })),
        (t[55] = q),
        (t[56] = ce),
        (t[57] = J),
        (t[58] = le),
        (t[59] = Y),
        (t[60] = X),
        (t[61] = Z),
        (t[62] = Q))
      : (Q = t[62]),
    Q
  );
}
function ge(e, t) {
  return e.onuId - t.onuId;
}
function _e(e) {
  return e.clearFocusRequest;
}
function ve(e) {
  return e.focusRequest;
}
function ye(e) {
  return e.showDialog;
}
function be(e) {
  return e.deleteGponOnt;
}
function xe(e) {
  return e.saveGponOnt;
}
function Se(e) {
  return e.deleteGponFrame;
}
function Ce(e) {
  return e.saveGponFrame;
}
function we(e) {
  return e.GponOntDB;
}
function Te(e) {
  return e.GponFrameDB;
}
export { he as default };
