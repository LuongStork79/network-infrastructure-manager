import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  Nt as r,
  Ot as i,
  Rt as ee,
  bt as te,
  kt as ne,
  l as re,
  s as ie,
  tn as ae,
  xt as oe,
} from "./index-QE6I14Fy.js";
var se = ae(),
  a = e(t(), 1),
  o = n(),
  ce = [`1:8`, `1:16`, `1:32`, `1:64`, `1:128`];
function s(e) {
  return {
    id: `slot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    slotNumber: e,
    cardModel: ``,
    ports: [],
  };
}
function le(e) {
  return {
    id: `port-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    portNumber: e,
    splitterRatio: `1:32`,
    notes: ``,
  };
}
function c(e) {
  let t = (0, se.c)(112),
    { frame: n, username: i, onSave: ae, onDelete: s, onClose: c } = e,
    l = re(ye),
    be = re(ve),
    xe = re(_e),
    Se = re(ge),
    Ce = ie(he),
    [u, we] = (0, a.useState)(n?.name ?? ``),
    [d, Te] = (0, a.useState)(n?.location ?? ``),
    [f, Ee] = (0, a.useState)(n?.brand ?? ``),
    [p, De] = (0, a.useState)(n?.model ?? ``),
    [m, Oe] = (0, a.useState)(n?.notes ?? ``),
    ke;
  t[0] === n?.slots
    ? (ke = t[1])
    : ((ke = n?.slots ?? []), (t[0] = n?.slots), (t[1] = ke));
  let [h, g] = (0, a.useState)(ke),
    [Ae, je] = (0, a.useState)(!1),
    _;
  t[2] === n?.uplinks
    ? (_ = t[3])
    : ((_ = n?.uplinks ?? []), (t[2] = n?.uplinks), (t[3] = _));
  let [v, Me] = (0, a.useState)(_),
    y;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = function (e, t) {
        Me((n) => n.map((n) => (n.id === e ? { ...n, ...t } : n)));
      }),
      (t[4] = y))
    : (y = t[4]);
  let Ne = y,
    b;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = function () {
        g(me);
      }),
      (t[5] = b))
    : (b = t[5]);
  let Pe = b,
    x;
  t[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = function (e) {
        g((t) => t.filter((t) => t.id !== e));
      }),
      (t[6] = x))
    : (x = t[6]);
  let Fe = x,
    S;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = function (e, t) {
        g((n) => n.map((n) => (n.id === e ? { ...n, ...t } : n)));
      }),
      (t[7] = S))
    : (S = t[7]);
  let Ie = S,
    C;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = function (e) {
        g((t) =>
          t.map((t) =>
            t.id === e
              ? { ...t, ports: [...t.ports, le(t.ports.length + 1)] }
              : t,
          ),
        );
      }),
      (t[8] = C))
    : (C = t[8]);
  let Le = C,
    w;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = function (e, t) {
        g((n) =>
          n.map((n) =>
            n.id === e ? { ...n, ports: n.ports.filter((e) => e.id !== t) } : n,
          ),
        );
      }),
      (t[9] = w))
    : (w = t[9]);
  let Re = w,
    T;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = function (e, t, n) {
        g((r) =>
          r.map((r) =>
            r.id === e
              ? {
                  ...r,
                  ports: r.ports.map((e) => (e.id === t ? { ...e, ...n } : e)),
                }
              : r,
          ),
        );
      }),
      (t[10] = T))
    : (T = t[10]);
  let ze = T,
    E;
  t[11] !== Se ||
  t[12] !== f ||
  t[13] !== l ||
  t[14] !== xe ||
  t[15] !== n ||
  t[16] !== be ||
  t[17] !== d ||
  t[18] !== p ||
  t[19] !== u ||
  t[20] !== m ||
  t[21] !== ae ||
  t[22] !== Ce ||
  t[23] !== h ||
  t[24] !== v ||
  t[25] !== i
    ? ((E = function () {
        let e = u.trim();
        if (!e) {
          je(!0);
          return;
        }
        for (let e of v) {
          if (!e.target) continue;
          let t = ne(l, e.target, e.port, be, xe, e.id);
          if (t) {
            Ce(t, `error`);
            return;
          }
        }
        let t = n ? `Cập nhật thông tin Frame [${e}]` : `Thêm mới Frame [${e}]`;
        (ae({
          id: n?.id ?? `gpon-frame-${Date.now()}`,
          name: e,
          location: d.trim(),
          brand: f.trim(),
          model: p.trim(),
          notes: m.trim(),
          slots: h,
          uplinks: oe(v),
          logs: r(n?.logs, t, i),
        }),
          Se(`GPON Frame: ${e}`, t, i));
      }),
      (t[11] = Se),
      (t[12] = f),
      (t[13] = l),
      (t[14] = xe),
      (t[15] = n),
      (t[16] = be),
      (t[17] = d),
      (t[18] = p),
      (t[19] = u),
      (t[20] = m),
      (t[21] = ae),
      (t[22] = Ce),
      (t[23] = h),
      (t[24] = v),
      (t[25] = i),
      (t[26] = E))
    : (E = t[26]);
  let Be = E,
    D;
  t[27] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = { display: `flex`, zIndex: 220 }), (t[27] = D))
    : (D = t[27]);
  let O;
  t[28] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((O = {
        width: 640,
        maxHeight: `92vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[28] = O))
    : (O = t[28]);
  let k;
  t[29] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, o.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center text-xs border border-fuchsia-100`,
        children: (0, o.jsx)(`i`, { className: `fas fa-server` }),
      })),
      (t[29] = k))
    : (k = t[29]);
  let Ve = n ? `Chỉnh sửa Frame (OLT)` : `Thêm Frame (OLT)`,
    A;
  t[30] === Ve
    ? (A = t[31])
    : ((A = (0, o.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [k, (0, o.jsx)(`span`, { children: Ve })],
      })),
      (t[30] = Ve),
      (t[31] = A));
  let He;
  t[32] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((He = (0, o.jsx)(`i`, { className: `fas fa-times` })), (t[32] = He))
    : (He = t[32]);
  let j;
  t[33] === c
    ? (j = t[34])
    : ((j = (0, o.jsx)(`button`, {
        onClick: c,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: He,
      })),
      (t[33] = c),
      (t[34] = j));
  let M;
  t[35] !== A || t[36] !== j
    ? ((M = (0, o.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [A, j],
      })),
      (t[35] = A),
      (t[36] = j),
      (t[37] = M))
    : (M = t[37]);
  let N;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, o.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Tên Frame`,
      })),
      (t[38] = N))
    : (N = t[38]);
  let Ue;
  t[39] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ue = (e) => {
        (we(e.target.value), je(!1));
      }),
      (t[39] = Ue))
    : (Ue = t[39]);
  let P;
  t[40] === u
    ? (P = t[41])
    : ((P = (0, o.jsx)(`input`, {
        value: u,
        onChange: Ue,
        placeholder: `VD: OLT-01`,
        className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
      })),
      (t[40] = u),
      (t[41] = P));
  let F;
  t[42] === Ae
    ? (F = t[43])
    : ((F =
        Ae &&
        (0, o.jsx)(`p`, {
          className: `text-[10px] text-red-500 font-bold mt-1`,
          children: `Vui lòng nhập tên Frame`,
        })),
      (t[42] = Ae),
      (t[43] = F));
  let I;
  t[44] !== P || t[45] !== F
    ? ((I = (0, o.jsxs)(`div`, {
        className: `col-span-2`,
        children: [N, P, F],
      })),
      (t[44] = P),
      (t[45] = F),
      (t[46] = I))
    : (I = t[46]);
  let We;
  t[47] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((We = (0, o.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Vị trí`,
      })),
      (t[47] = We))
    : (We = t[47]);
  let Ge;
  t[48] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ge = (e) => Te(e.target.value)), (t[48] = Ge))
    : (Ge = t[48]);
  let L;
  t[49] === d
    ? (L = t[50])
    : ((L = (0, o.jsxs)(`div`, {
        children: [
          We,
          (0, o.jsx)(`input`, {
            value: d,
            onChange: Ge,
            placeholder: `Server Room - Rack A`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[49] = d),
      (t[50] = L));
  let Ke;
  t[51] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ke = (0, o.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Hãng`,
      })),
      (t[51] = Ke))
    : (Ke = t[51]);
  let qe;
  t[52] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((qe = (e) => Ee(e.target.value)), (t[52] = qe))
    : (qe = t[52]);
  let R;
  t[53] === f
    ? (R = t[54])
    : ((R = (0, o.jsxs)(`div`, {
        children: [
          Ke,
          (0, o.jsx)(`input`, {
            value: f,
            onChange: qe,
            placeholder: `Huawei, ZTE, Nokia...`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[53] = f),
      (t[54] = R));
  let Je;
  t[55] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Je = (0, o.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Model`,
      })),
      (t[55] = Je))
    : (Je = t[55]);
  let Ye;
  t[56] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ye = (e) => De(e.target.value)), (t[56] = Ye))
    : (Ye = t[56]);
  let z;
  t[57] === p
    ? (z = t[58])
    : ((z = (0, o.jsxs)(`div`, {
        children: [
          Je,
          (0, o.jsx)(`input`, {
            value: p,
            onChange: Ye,
            placeholder: `MA5800-X7`,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
          }),
        ],
      })),
      (t[57] = p),
      (t[58] = z));
  let B;
  t[59] !== I || t[60] !== L || t[61] !== R || t[62] !== z
    ? ((B = (0, o.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [I, L, R, z],
      })),
      (t[59] = I),
      (t[60] = L),
      (t[61] = R),
      (t[62] = z),
      (t[63] = B))
    : (B = t[63]);
  let Xe;
  t[64] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Xe = (0, o.jsx)(`label`, {
        className: `block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5`,
        children: `Ghi chú`,
      })),
      (t[64] = Xe))
    : (Xe = t[64]);
  let Ze;
  t[65] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ze = (e) => Oe(e.target.value)), (t[65] = Ze))
    : (Ze = t[65]);
  let V;
  t[66] === m
    ? (V = t[67])
    : ((V = (0, o.jsxs)(`div`, {
        className: `mt-3`,
        children: [
          Xe,
          (0, o.jsx)(`textarea`, {
            value: m,
            onChange: Ze,
            rows: 2,
            className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400 resize-none`,
          }),
        ],
      })),
      (t[66] = m),
      (t[67] = V));
  let H;
  t[68] !== B || t[69] !== V
    ? ((H = (0, o.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [B, V],
      })),
      (t[68] = B),
      (t[69] = V),
      (t[70] = H))
    : (H = t[70]);
  let Qe;
  t[71] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Qe = (0, o.jsxs)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: [
          (0, o.jsx)(`i`, { className: `fas fa-route text-slate-400 mr-1` }),
          `Uplink vào Switch (hiện trên sơ đồ Topology)`,
        ],
      })),
      (t[71] = Qe))
    : (Qe = t[71]);
  let $e;
  t[72] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($e = () => Me(pe)), (t[72] = $e))
    : ($e = t[72]);
  let et;
  t[73] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((et = (0, o.jsxs)(`div`, {
        className: `flex items-center justify-between mb-3`,
        children: [
          Qe,
          (0, o.jsxs)(`button`, {
            type: `button`,
            onClick: $e,
            className: `text-[10px] font-bold text-fuchsia-600 hover:text-fuchsia-700`,
            children: [
              (0, o.jsx)(`i`, { className: `fas fa-plus` }),
              ` Thêm Uplink`,
            ],
          }),
        ],
      })),
      (t[73] = et))
    : (et = t[73]);
  let U;
  t[74] === l
    ? (U = t[75])
    : ((U =
        te(l).length === 0 &&
        (0, o.jsx)(`p`, {
          className: `text-[10px] text-red-500 font-bold mb-2`,
          children: `Chưa có Core Switch nào trong hệ thống — hãy đánh dấu 1 switch là Core trước.`,
        })),
      (t[74] = l),
      (t[75] = U));
  let W;
  t[76] !== l || t[77] !== v
    ? ((W = v.map((e) => {
        let t = te(l, v.filter((t) => t.id !== e.id).map(fe)),
          n = e.target ? ee(e.target, l) : void 0;
        return (0, o.jsxs)(
          `div`,
          {
            className: `grid grid-cols-[1fr_auto_auto] gap-2 items-end`,
            children: [
              (0, o.jsx)(`div`, {
                children: (0, o.jsxs)(`select`, {
                  "aria-label": `Switch (Core)`,
                  value: e.target,
                  onChange: (t) => Ne(e.id, { target: t.target.value }),
                  className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
                  children: [
                    (0, o.jsx)(`option`, {
                      value: ``,
                      children: `— Chọn Switch (Core) —`,
                    }),
                    t.map(de),
                  ],
                }),
              }),
              (0, o.jsx)(`div`, {
                className: `w-24`,
                children: (0, o.jsx)(`input`, {
                  "aria-label": `Cổng`,
                  type: `number`,
                  min: 1,
                  max: n?.ports,
                  value: e.port || ``,
                  onChange: (t) =>
                    Ne(e.id, { port: parseInt(t.target.value, 10) || 0 }),
                  placeholder: n ? `1-${n.ports}` : `#`,
                  disabled: !e.target,
                  className: `w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-fuchsia-400 disabled:opacity-50`,
                }),
              }),
              (0, o.jsx)(`button`, {
                type: `button`,
                onClick: () => Me((t) => t.filter((t) => t.id !== e.id)),
                title: `Xóa Uplink này`,
                className: `w-9 h-9 shrink-0 bg-red-50 border border-red-200 text-red-500 rounded-xl hover:bg-red-100`,
                children: (0, o.jsx)(`i`, { className: `fas fa-times` }),
              }),
            ],
          },
          e.id,
        );
      })),
      (t[76] = l),
      (t[77] = v),
      (t[78] = W))
    : (W = t[78]);
  let G;
  t[79] === v.length
    ? (G = t[80])
    : ((G =
        v.length === 0 &&
        (0, o.jsx)(`p`, {
          className: `text-[10px] text-slate-400 italic`,
          children: `Chưa kết nối — bấm "Thêm Uplink" nếu OLT này nối vào 1 hoặc nhiều Core Switch.`,
        })),
      (t[79] = v.length),
      (t[80] = G));
  let K;
  t[81] !== W || t[82] !== G
    ? ((K = (0, o.jsxs)(`div`, { className: `space-y-2`, children: [W, G] })),
      (t[81] = W),
      (t[82] = G),
      (t[83] = K))
    : (K = t[83]);
  let q;
  t[84] !== U || t[85] !== K
    ? ((q = (0, o.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [et, U, K],
      })),
      (t[84] = U),
      (t[85] = K),
      (t[86] = q))
    : (q = t[86]);
  let tt;
  t[87] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((tt = (0, o.jsxs)(`p`, {
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: [
          (0, o.jsx)(`i`, {
            className: `fas fa-layer-group text-slate-400 mr-1`,
          }),
          `Slot & Port PON`,
        ],
      })),
      (t[87] = tt))
    : (tt = t[87]);
  let nt;
  t[88] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((nt = (0, o.jsxs)(`div`, {
        className: `flex items-center justify-between mb-3`,
        children: [
          tt,
          (0, o.jsxs)(`button`, {
            onClick: Pe,
            className: `px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-fuchsia-400 hover:text-fuchsia-600 transition-all`,
            children: [
              (0, o.jsx)(`i`, { className: `fas fa-plus mr-1 text-[9px]` }),
              `Thêm Slot`,
            ],
          }),
        ],
      })),
      (t[88] = nt))
    : (nt = t[88]);
  let J;
  t[89] === h
    ? (J = t[90])
    : ((J = (0, o.jsxs)(`div`, {
        className: `bg-slate-50 rounded-xl border border-slate-200 p-4`,
        children: [
          nt,
          h.length === 0
            ? (0, o.jsx)(`p`, {
                className: `text-[10px] text-slate-400 text-center py-2 italic`,
                children: `Chưa có Slot nào. Bấm "Thêm Slot" để thêm.`,
              })
            : (0, o.jsx)(`div`, {
                className: `space-y-3`,
                children: h.map((e) =>
                  (0, o.jsxs)(
                    `div`,
                    {
                      className: `bg-white border border-slate-200 rounded-xl p-3`,
                      children: [
                        (0, o.jsxs)(`div`, {
                          className: `flex items-center gap-2 mb-2`,
                          children: [
                            (0, o.jsxs)(`span`, {
                              className: `text-[10px] font-black text-slate-400 w-14 shrink-0`,
                              children: [`Slot `, e.slotNumber],
                            }),
                            (0, o.jsx)(`input`, {
                              value: e.cardModel ?? ``,
                              onChange: (t) =>
                                Ie(e.id, { cardModel: t.target.value }),
                              placeholder: `Loại card (VD: GPFD)`,
                              className: `flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-fuchsia-400`,
                            }),
                            (0, o.jsx)(`button`, {
                              onClick: () => Fe(e.id),
                              "aria-label": `Xóa Slot`,
                              className: `w-6 h-6 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 text-xs shrink-0 flex items-center justify-center`,
                              children: (0, o.jsx)(`i`, {
                                className: `fas fa-times`,
                              }),
                            }),
                          ],
                        }),
                        (0, o.jsxs)(`div`, {
                          className: `pl-16 space-y-1.5`,
                          children: [
                            e.ports.map((t) =>
                              (0, o.jsxs)(
                                `div`,
                                {
                                  className: `flex items-center gap-1.5`,
                                  children: [
                                    (0, o.jsxs)(`span`, {
                                      className: `text-[9px] font-black text-slate-400 w-12 shrink-0`,
                                      children: [`Port `, t.portNumber],
                                    }),
                                    (0, o.jsx)(`select`, {
                                      value: t.splitterRatio ?? `1:32`,
                                      onChange: (n) =>
                                        ze(e.id, t.id, {
                                          splitterRatio: n.target.value,
                                        }),
                                      className: `px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold focus:outline-none focus:border-fuchsia-400`,
                                      children: ce.map(ue),
                                    }),
                                    (0, o.jsx)(`input`, {
                                      value: t.notes ?? ``,
                                      onChange: (n) =>
                                        ze(e.id, t.id, {
                                          notes: n.target.value,
                                        }),
                                      placeholder: `Ghi chú`,
                                      className: `flex-1 min-w-0 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold focus:outline-none focus:border-fuchsia-400`,
                                    }),
                                    (0, o.jsx)(`button`, {
                                      onClick: () => Re(e.id, t.id),
                                      "aria-label": `Xóa Port`,
                                      className: `w-5 h-5 rounded bg-red-50 text-red-400 hover:bg-red-100 text-[10px] shrink-0 flex items-center justify-center`,
                                      children: (0, o.jsx)(`i`, {
                                        className: `fas fa-times`,
                                      }),
                                    }),
                                  ],
                                },
                                t.id,
                              ),
                            ),
                            (0, o.jsxs)(`button`, {
                              onClick: () => Le(e.id),
                              className: `text-[9px] font-bold text-fuchsia-600 hover:text-fuchsia-700 mt-1`,
                              children: [
                                (0, o.jsx)(`i`, {
                                  className: `fas fa-plus mr-1`,
                                }),
                                `Thêm Port`,
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    e.id,
                  ),
                ),
              }),
        ],
      })),
      (t[89] = h),
      (t[90] = J));
  let Y;
  t[91] !== H || t[92] !== q || t[93] !== J
    ? ((Y = (0, o.jsxs)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll space-y-4 pr-1`,
        children: [H, q, J],
      })),
      (t[91] = H),
      (t[92] = q),
      (t[93] = J),
      (t[94] = Y))
    : (Y = t[94]);
  let X;
  t[95] !== n || t[96] !== s
    ? ((X =
        n &&
        (0, o.jsx)(`button`, {
          onClick: s,
          className: `px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100`,
          children: `Xóa`,
        })),
      (t[95] = n),
      (t[96] = s),
      (t[97] = X))
    : (X = t[97]);
  let rt;
  t[98] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((rt = (0, o.jsx)(`div`, { className: `flex-1` })), (t[98] = rt))
    : (rt = t[98]);
  let Z;
  t[99] === c
    ? (Z = t[100])
    : ((Z = (0, o.jsx)(`button`, {
        onClick: c,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50`,
        children: `Hủy`,
      })),
      (t[99] = c),
      (t[100] = Z));
  let it;
  t[101] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((it = (0, o.jsx)(`i`, { className: `fas fa-save` })), (t[101] = it))
    : (it = t[101]);
  let Q;
  t[102] === Be
    ? (Q = t[103])
    : ((Q = (0, o.jsxs)(`button`, {
        onClick: Be,
        className: `px-6 py-2.5 bg-fuchsia-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-fuchsia-700 flex items-center gap-2`,
        children: [it, `Lưu Frame`],
      })),
      (t[102] = Be),
      (t[103] = Q));
  let $;
  t[104] !== X || t[105] !== Z || t[106] !== Q
    ? (($ = (0, o.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [X, rt, Z, Q],
      })),
      (t[104] = X),
      (t[105] = Z),
      (t[106] = Q),
      (t[107] = $))
    : ($ = t[107]);
  let at;
  return (
    t[108] !== M || t[109] !== Y || t[110] !== $
      ? ((at = (0, o.jsx)(`div`, {
          className: `modal`,
          style: D,
          children: (0, o.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: O,
            children: [M, Y, $],
          }),
        })),
        (t[108] = M),
        (t[109] = Y),
        (t[110] = $),
        (t[111] = at))
      : (at = t[111]),
    at
  );
}
function ue(e) {
  return (0, o.jsxs)(`option`, { value: e, children: [`Splitter `, e] }, e);
}
function de(e) {
  return (0, o.jsx)(`option`, { value: e.id, children: e.label }, e.id);
}
function fe(e) {
  return e.target;
}
function pe(e) {
  return [...e, i()];
}
function me(e) {
  return [...e, s(e.length + 1)];
}
function he(e) {
  return e.showDialog;
}
function ge(e) {
  return e.addGlobalLog;
}
function _e(e) {
  return e.FirewallDB;
}
function ve(e) {
  return e.GponFrameDB;
}
function ye(e) {
  return e.DB;
}
export { c as default };
