import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  A as ee,
  E as r,
  M as te,
  k as ne,
  l as re,
  s as ie,
  tn as ae,
} from "./index-QE6I14Fy.js";
import { t as oe } from "./elevator-BpwH_0-s.js";
var se = {
    c: (size) => new Array(size).fill(Symbol.for("react.memo_cache_sentinel"))
  },
  i = e(t(), 1),
  a = n();
function ce(e) {
  let t = (0, se.c)(145),
    {
      ap: n,
      networkDB: ae,
      isAdmin: ce,
      username: o,
      onSave: me,
      onDelete: he,
      onClose: s,
      initialFloor: ge,
      initialSwitchId: _e,
      initialSwitchPort: ve,
    } = e,
    c = ie(pe),
    ye = re(fe),
    be = ee(ae),
    [l, xe] = (0, i.useState)(n?.name ?? ``),
    [u, Se] = (0, i.useState)(n?.ip ?? ``),
    [d, Ce] = (0, i.useState)(n?.mac ?? ``),
    [snVal, setSnVal] = (0, i.useState)(n?.sn ?? n?.serialNumber ?? ``),
    [userVal, setUserVal] = (0, i.useState)(n?.user ?? n?.username ?? n?.deviceUser ?? ``),
    [defPassVal, setDefPassVal] = (0, i.useState)(n?.defaultPassword ?? n?.defaultPass ?? ``),
    [newPassVal, setNewPassVal] = (0, i.useState)(n?.passwordNew ?? n?.newPassword ?? ``),
    [f, we] = (0, i.useState)(n?.floor ?? ge ?? be[0] ?? ``),
    [p, Te] = (0, i.useState)(n?.zone ?? ``),
    [m, Ee] = (0, i.useState)(n?.type ?? `Dual-band`),
    [h, De] = (0, i.useState)(n?.brand ?? ``),
    [g, Oe] = (0, i.useState)(n?.model ?? ``),
    [_, ke] = (0, i.useState)(n?.ssid ?? ``),
    [v, Ae] = (0, i.useState)(n?.channel ?? ``),
    [y, je] = (0, i.useState)(n?.power ?? ``),
    [b, Me] = (0, i.useState)(n?.notes ?? ``),
    [x, Ne] = (0, i.useState)(n?.switchId ?? _e ?? ``),
    [S, Pe] = (0, i.useState)(
      n?.switchPort == null
        ? ve == null
          ? ``
          : String(ve)
        : String(n.switchPort),
    ),
    Fe = ae.flatMap(de);
  let Ie = function () {
    if (!ce) {
      c(`Bạn không có quyền!`, `error`);
      return;
    }
    let e = l.trim();
    if (!e) {
      c(`Vui lòng nhập tên AP!`, `error`);
      return;
    }
    let t = {
      name: e,
      ip: u.trim(),
      mac: d.trim(),
      sn: snVal.trim(),
      user: userVal.trim(),
      defaultPassword: defPassVal.trim(),
      passwordNew: newPassVal.trim(),
      floor: f,
      zone: p.trim(),
      type: m,
      brand: h.trim(),
      model: g.trim(),
      ssid: _.trim(),
      channel: v.trim(),
      power: y.trim(),
      notes: b.trim(),
      switchId: x,
      switchPort: parseInt(S, 10) || null,
    };
    if (n) {
      let ee = te(e);
      (me({ ...n, ...t, logs: r(n.logs, ee, o) }),
        ye(`WiFi AP: ${e}`, ee, o));
    } else {
      let n = ne(e, f);
      (me({
        id: `wifi-${Date.now()}`,
        ...t,
        x: null,
        y: null,
        floorplanId: null,
        logs: r(void 0, n, o),
      }),
        ye(`WiFi AP: ${e}`, n, o));
    }
  };
  let Le = Ie,
    Re;
  t[21] !== n?.name || t[22] !== he || t[23] !== c
    ? ((Re = function () {
        c(`Xóa AP "${n?.name}"?`, `confirm`, he);
      }),
      (t[21] = n?.name),
      (t[22] = he),
      (t[23] = c),
      (t[24] = Re))
    : (Re = t[24]);
  let ze = Re,
    C;
  t[25] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = { display: `flex` }), (t[25] = C))
    : (C = t[25]);
  let w;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = {
        width: 560,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[26] = w))
    : (w = t[26]);
  let Be;
  t[27] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Be = (0, a.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center text-xs border border-cyan-100`,
        children: (0, a.jsx)(`i`, { className: `fas fa-wifi` }),
      })),
      (t[27] = Be))
    : (Be = t[27]);
  let Ve = n ? `Chỉnh sửa AP` : `Thêm Access Point`,
    T;
  t[28] === Ve
    ? (T = t[29])
    : ((T = (0, a.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [Be, (0, a.jsx)(`span`, { children: Ve })],
      })),
      (t[28] = Ve),
      (t[29] = T));
  let He;
  t[30] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((He = (0, a.jsx)(`i`, { className: `fas fa-times` })), (t[30] = He))
    : (He = t[30]);
  let E;
  t[31] === s
    ? (E = t[32])
    : ((E = (0, a.jsx)(`button`, {
        onClick: s,
        title: `Đóng`,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: He,
      })),
      (t[31] = s),
      (t[32] = E));
  let D;
  t[33] !== E || t[34] !== T
    ? ((D = (0, a.jsxs)(`div`, {
        className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
        children: [T, E],
      })),
      (t[33] = E),
      (t[34] = T),
      (t[35] = D))
    : (D = t[35]);
  let Ue;
  t[36] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ue = (0, a.jsxs)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: [
          `Tên AP `,
          (0, a.jsx)(`span`, { className: `text-red-400`, children: `*` }),
        ],
      })),
      (t[36] = Ue))
    : (Ue = t[36]);
  let We;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((We = (e) => xe(e.target.value)), (t[37] = We))
    : (We = t[37]);
  let O;
  t[38] === l
    ? (O = t[39])
    : ((O = (0, a.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          Ue,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: l,
            onChange: We,
            placeholder: `AP-TANG01-A`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[38] = l),
      (t[39] = O));
  let Ge;
  t[40] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ge = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `IP Address`,
      })),
      (t[40] = Ge))
    : (Ge = t[40]);
  let Ke;
  t[41] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ke = (e) => Se(e.target.value)), (t[41] = Ke))
    : (Ke = t[41]);
  let k;
  t[42] === u
    ? (k = t[43])
    : ((k = (0, a.jsxs)(`div`, {
        children: [
          Ge,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: u,
            onChange: Ke,
            placeholder: `10.195.32.x`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none font-mono transition-colors`,
          }),
        ],
      })),
      (t[42] = u),
      (t[43] = k));
  let qe;
  t[44] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((qe = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `MAC Address`,
      })),
      (t[44] = qe))
    : (qe = t[44]);
  let Je;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Je = (e) => Ce(oe(e.target.value))), (t[45] = Je))
    : (Je = t[45]);
  let A;
  t[46] === d
    ? (A = t[47])
    : ((A = (0, a.jsxs)(`div`, {
        children: [
          qe,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: d,
            onChange: Je,
            maxLength: 17,
            placeholder: `AA:BB:CC:DD:EE:FF`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none font-mono uppercase transition-colors`,
          }),
        ],
      })),
      (t[46] = d),
      (t[47] = A));
  let Ye;
  t[48] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ye = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Tầng / Vị trí`,
      })),
      (t[48] = Ye))
    : (Ye = t[48]);
  let Xe;
  t[49] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Xe = (e) => we(e.target.value)), (t[49] = Xe))
    : (Xe = t[49]);
  let Ze = be.map(ue),
    j;
  t[50] !== f || t[51] !== Ze
    ? ((j = (0, a.jsxs)(`div`, {
        children: [
          Ye,
          (0, a.jsx)(`select`, {
            value: f,
            onChange: Xe,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
            children: Ze,
          }),
        ],
      })),
      (t[50] = f),
      (t[51] = Ze),
      (t[52] = j))
    : (j = t[52]);
  let Qe;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Qe = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Khu vực`,
      })),
      (t[53] = Qe))
    : (Qe = t[53]);
  let $e;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($e = (e) => Te(e.target.value)), (t[54] = $e))
    : ($e = t[54]);
  let M;
  t[55] === p
    ? (M = t[56])
    : ((M = (0, a.jsxs)(`div`, {
        children: [
          Qe,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: p,
            onChange: $e,
            placeholder: `Sảnh, hành lang...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[55] = p),
      (t[56] = M));
  let et;
  t[57] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((et = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Loại WiFi`,
      })),
      (t[57] = et))
    : (et = t[57]);
  let tt;
  t[58] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((tt = (e) => Ee(e.target.value)), (t[58] = tt))
    : (tt = t[58]);
  let nt, rt, it, at, ot;
  t[59] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((nt = (0, a.jsx)(`option`, {
        value: `Dual-band`,
        children: `Dual-band (2.4G + 5G)`,
      })),
      (rt = (0, a.jsx)(`option`, {
        value: `Tri-band`,
        children: `Tri-band (2.4G + 5G + 6G)`,
      })),
      (it = (0, a.jsx)(`option`, { value: `2.4G`, children: `2.4G Only` })),
      (at = (0, a.jsx)(`option`, { value: `5G`, children: `5G Only` })),
      (ot = (0, a.jsx)(`option`, { value: `6G`, children: `6G Only` })),
      (t[59] = nt),
      (t[60] = rt),
      (t[61] = it),
      (t[62] = at),
      (t[63] = ot))
    : ((nt = t[59]), (rt = t[60]), (it = t[61]), (at = t[62]), (ot = t[63]));
  let N;
  t[64] === m
    ? (N = t[65])
    : ((N = (0, a.jsxs)(`div`, {
        children: [
          et,
          (0, a.jsxs)(`select`, {
            value: m,
            onChange: tt,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
            children: [nt, rt, it, at, ot],
          }),
        ],
      })),
      (t[64] = m),
      (t[65] = N));
  let st;
  t[66] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((st = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Thương hiệu`,
      })),
      (t[66] = st))
    : (st = t[66]);
  let ct;
  t[67] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ct = (e) => De(e.target.value)), (t[67] = ct))
    : (ct = t[67]);
  let P;
  t[68] === h
    ? (P = t[69])
    : ((P = (0, a.jsxs)(`div`, {
        children: [
          st,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: h,
            onChange: ct,
            placeholder: `Aruba, Cisco, TP-Link...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[68] = h),
      (t[69] = P));
  let lt;
  t[70] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((lt = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Model`,
      })),
      (t[70] = lt))
    : (lt = t[70]);
  let ut;
  t[71] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ut = (e) => Oe(e.target.value)), (t[71] = ut))
    : (ut = t[71]);
  let F;
  t[72] === g
    ? (F = t[73])
    : ((F = (0, a.jsxs)(`div`, {
        children: [
          lt,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: g,
            onChange: ut,
            placeholder: `AP-505, U6-Pro...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[72] = g),
      (t[73] = F));
  let dt;
  t[74] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((dt = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `SSID`,
      })),
      (t[74] = dt))
    : (dt = t[74]);
  let ft;
  t[75] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ft = (e) => ke(e.target.value)), (t[75] = ft))
    : (ft = t[75]);
  let I;
  t[76] === _
    ? (I = t[77])
    : ((I = (0, a.jsxs)(`div`, {
        children: [
          dt,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: _,
            onChange: ft,
            placeholder: `AQUAMARINE_5G`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[76] = _),
      (t[77] = I));
  let pt;
  t[78] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((pt = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Kênh (Channel)`,
      })),
      (t[78] = pt))
    : (pt = t[78]);
  let mt;
  t[79] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((mt = (e) => Ae(e.target.value)), (t[79] = mt))
    : (mt = t[79]);
  let L;
  t[80] === v
    ? (L = t[81])
    : ((L = (0, a.jsxs)(`div`, {
        children: [
          pt,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: v,
            onChange: mt,
            placeholder: `36, 149...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[80] = v),
      (t[81] = L));
  let ht;
  t[82] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ht = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Công suất (Power)`,
      })),
      (t[82] = ht))
    : (ht = t[82]);
  let gt;
  t[83] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((gt = (e) => je(e.target.value)), (t[83] = gt))
    : (gt = t[83]);
  let R;
  t[84] === y
    ? (R = t[85])
    : ((R = (0, a.jsxs)(`div`, {
        children: [
          ht,
          (0, a.jsx)(`input`, {
            type: `text`,
            value: y,
            onChange: gt,
            placeholder: `20 dBm`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[84] = y),
      (t[85] = R));
  let z;
  t[86] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((z = (0, a.jsx)(`label`, {
        htmlFor: `wifi-ap-switch`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Switch kết nối`,
      })),
      (t[86] = z))
    : (z = t[86]);
  let B;
  t[87] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((B = (e) => Ne(e.target.value)), (t[87] = B))
    : (B = t[87]);
  let V;
  t[88] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = (0, a.jsx)(`option`, { value: ``, children: `-- Chọn Switch --` })),
      (t[88] = V))
    : (V = t[88]);
  let _t = Fe.map(le),
    H;
  t[89] !== x || t[90] !== B || t[91] !== V || t[92] !== _t
    ? ((H = (0, a.jsxs)(`select`, {
        id: `wifi-ap-switch`,
        value: x,
        onChange: B,
        className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
        children: [V, _t],
      })),
      (t[89] = x),
      (t[90] = B),
      (t[91] = V),
      (t[92] = _t),
      (t[93] = H))
    : (H = t[93]);
  let U;
  t[94] !== z || t[95] !== H
    ? ((U = (0, a.jsxs)(`div`, { children: [z, H] })),
      (t[94] = z),
      (t[95] = H),
      (t[96] = U))
    : (U = t[96]);
  let vt;
  t[97] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((vt = (0, a.jsx)(`label`, {
        htmlFor: `wifi-ap-switch-port`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Port trên Switch`,
      })),
      (t[97] = vt))
    : (vt = t[97]);
  let W;
  t[98] === Pe
    ? (W = t[99])
    : ((W = (e) => Pe(e.target.value)), (t[98] = Pe), (t[99] = W));
  let G;
  t[100] !== S || t[101] !== W
    ? ((G = (0, a.jsxs)(`div`, {
        children: [
          vt,
          (0, a.jsx)(`input`, {
            id: `wifi-ap-switch-port`,
            value: S,
            onChange: W,
            type: `number`,
            min: 1,
            placeholder: `Số port`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[100] = S),
      (t[101] = W),
      (t[102] = G))
    : (G = t[102]);
  let yt;
  t[103] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((yt = (0, a.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Ghi chú`,
      })),
      (t[103] = yt))
    : (yt = t[103]);
  let K;
  t[104] === Me
    ? (K = t[105])
    : ((K = (e) => Me(e.target.value)), (t[104] = Me), (t[105] = K));
  let q;
  t[106] !== b || t[107] !== K
    ? ((q = (0, a.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          yt,
          (0, a.jsx)(`textarea`, {
            value: b,
            onChange: K,
            rows: 2,
            placeholder: `Ghi chú thêm...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl text-sm font-bold outline-none resize-none transition-colors`,
          }),
        ],
      })),
      (t[106] = b),
      (t[107] = K),
      (t[108] = q))
    : (q = t[108]);
  let credsUI = (0, a.jsxs)(`div`, {
    className: `col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80`,
    children: [
      (0, a.jsxs)(`div`, {
        children: [
          (0, a.jsx)(`label`, { className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1`, children: `Số Serial (S/N)` }),
          (0, a.jsx)(`input`, { type: `text`, value: snVal, onChange: (e) => setSnVal(e.target.value), placeholder: `SN...`, className: `w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold outline-none text-slate-800 dark:text-slate-100` }),
        ],
      }),
      (0, a.jsxs)(`div`, {
        children: [
          (0, a.jsx)(`label`, { className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1`, children: `Tài khoản (User)` }),
          (0, a.jsx)(`input`, { type: `text`, value: userVal, onChange: (e) => setUserVal(e.target.value), placeholder: `admin`, className: `w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold outline-none text-slate-800 dark:text-slate-100` }),
        ],
      }),
      (0, a.jsxs)(`div`, {
        children: [
          (0, a.jsx)(`label`, { className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1`, children: `Default Password` }),
          (0, a.jsx)(`input`, { type: `text`, value: defPassVal, onChange: (e) => setDefPassVal(e.target.value), placeholder: `admin@123`, className: `w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold outline-none text-amber-600 dark:text-amber-400` }),
        ],
      }),
      (0, a.jsxs)(`div`, {
        children: [
          (0, a.jsx)(`label`, { className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1`, children: `PasswordNew` }),
          (0, a.jsx)(`input`, { type: `text`, value: newPassVal, onChange: (e) => setNewPassVal(e.target.value), placeholder: `Mật khẩu mới`, className: `w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold outline-none text-emerald-600 dark:text-emerald-400` }),
        ],
      }),
    ],
  });
  let J = (0, a.jsx)(`div`, {
    className: `flex-1 overflow-y-auto custom-scroll`,
    children: (0, a.jsxs)(`div`, {
      className: `grid grid-cols-2 gap-4`,
      children: [O, k, A, credsUI, j, M, N, P, F, I, L, R, U, G, q],
    }),
  });
  let Y;
  t[124] !== n || t[125] !== ze
    ? ((Y =
        n &&
        (0, a.jsxs)(`button`, {
          onClick: ze,
          className: `px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-all`,
          children: [
            (0, a.jsx)(`i`, { className: `fas fa-trash mr-1` }),
            `Xóa`,
          ],
        })),
      (t[124] = n),
      (t[125] = ze),
      (t[126] = Y))
    : (Y = t[126]);
  let bt;
  t[127] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((bt = (0, a.jsx)(`div`, { className: `flex-1` })), (t[127] = bt))
    : (bt = t[127]);
  let X;
  t[128] === s
    ? (X = t[129])
    : ((X = (0, a.jsx)(`button`, {
        onClick: s,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[128] = s),
      (t[129] = X));
  let xt;
  t[130] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((xt = (0, a.jsx)(`i`, { className: `fas fa-save` })), (t[130] = xt))
    : (xt = t[130]);
  let Z;
  t[131] === Le
    ? (Z = t[132])
    : ((Z = (0, a.jsxs)(`button`, {
        onClick: Le,
        className: `px-6 py-2.5 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-cyan-700 transition-all flex items-center gap-2`,
        children: [xt, ` Lưu`],
      })),
      (t[131] = Le),
      (t[132] = Z));
  let Q;
  t[133] !== Y || t[134] !== X || t[135] !== Z
    ? ((Q = (0, a.jsxs)(`div`, {
        className: `flex gap-3 mt-6 pt-4 border-t border-slate-100 shrink-0`,
        children: [Y, bt, X, Z],
      })),
      (t[133] = Y),
      (t[134] = X),
      (t[135] = Z),
      (t[136] = Q))
    : (Q = t[136]);
  let $;
  t[137] !== D || t[138] !== w || t[139] !== J || t[140] !== Q
    ? (($ = (0, a.jsxs)(`div`, {
        className: `modal-content shadow-2xl`,
        style: w,
        children: [D, J, Q],
      })),
      (t[137] = D),
      (t[138] = w),
      (t[139] = J),
      (t[140] = Q),
      (t[141] = $))
    : ($ = t[141]);
  let St;
  return (
    t[142] !== C || t[143] !== $
      ? ((St = (0, a.jsx)(`div`, {
          className: `modal`,
          style: C,
          children: $,
        })),
        (t[142] = C),
        (t[143] = $),
        (t[144] = St))
      : (St = t[144]),
    St
  );
}
function le(e) {
  return (0, a.jsxs)(
    `option`,
    { value: e.id, children: [e.name, ` (`, e.floor, `)`] },
    e.id,
  );
}
function ue(e) {
  return (0, a.jsx)(`option`, { value: e, children: e }, e);
}
function de(e) {
  return e.switches.map((t) => ({ id: t.id, name: t.name, floor: e.floor }));
}
function fe(e) {
  return e.addGlobalLog;
}
function pe(e) {
  return e.showDialog;
}
function o({
  icon: e = `fa-filter`,
  allLabel: t,
  countLabel: n,
  options: ee,
  selected: r,
  onChange: te,
}) {
  let [ne, re] = (0, i.useState)(!1);
  function ie(e) {
    te(r.includes(e) ? r.filter((t) => t !== e) : [...r, e]);
  }
  let ae =
    r.length === 0
      ? t
      : r.length === 1
        ? (ee.find((e) => e.value === r[0])?.label ?? r[0])
        : n(r.length);
  return (0, a.jsxs)(`div`, {
    className: `relative`,
    children: [
      (0, a.jsxs)(`button`, {
        type: `button`,
        onClick: () => re((e) => !e),
        className: `px-3 py-2.5 border rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${r.length > 0 ? `bg-indigo-50 border-indigo-200 text-indigo-600` : `bg-white border-slate-200 text-slate-700 hover:border-indigo-300`}`,
        children: [
          (0, a.jsx)(`i`, { className: `fas ${e} text-[10px]` }),
          ` `,
          ae,
          (0, a.jsx)(`i`, {
            className: `fas fa-chevron-${ne ? `up` : `down`} text-[8px] ml-1`,
          }),
        ],
      }),
      ne &&
        (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(`div`, {
              className: `fixed inset-0 z-10`,
              onClick: () => re(!1),
            }),
            (0, a.jsxs)(`div`, {
              className: `absolute top-full left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-20 p-2`,
              children: [
                (0, a.jsxs)(`div`, {
                  className: `flex items-center justify-between px-1.5 py-1 mb-1`,
                  children: [
                    (0, a.jsxs)(`span`, {
                      className: `text-[9px] font-black text-slate-400 uppercase tracking-widest`,
                      children: [t, ` (nhiều)`],
                    }),
                    r.length > 0 &&
                      (0, a.jsx)(`button`, {
                        type: `button`,
                        onClick: () => te([]),
                        className: `text-[9px] font-bold text-indigo-600 hover:text-indigo-700`,
                        children: `Bỏ chọn tất cả`,
                      }),
                  ],
                }),
                (0, a.jsx)(`div`, {
                  className: `max-h-64 overflow-y-auto custom-scroll space-y-0.5`,
                  children: ee.map((e) =>
                    (0, a.jsxs)(
                      `label`,
                      {
                        className: `flex items-center gap-2 px-1.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs`,
                        children: [
                          (0, a.jsx)(`input`, {
                            type: `checkbox`,
                            checked: r.includes(e.value),
                            onChange: () => ie(e.value),
                            className: `shrink-0`,
                          }),
                          e.swatch &&
                            (0, a.jsx)(`span`, {
                              className: `w-2 h-2 rounded-full shrink-0`,
                              style: { background: e.swatch },
                            }),
                          (0, a.jsx)(`span`, {
                            className: `font-bold text-slate-700 truncate`,
                            children: e.label,
                          }),
                          e.sublabel &&
                            (0, a.jsxs)(`span`, {
                              className: `text-slate-400 truncate`,
                              children: [`— `, e.sublabel],
                            }),
                        ],
                      },
                      e.value,
                    ),
                  ),
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
export { ce as n, o as t };
