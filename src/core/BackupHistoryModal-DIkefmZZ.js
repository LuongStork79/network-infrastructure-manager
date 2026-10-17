import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import { tn as r, w as i } from "./index-QE6I14Fy.js";
var ee = r(),
  a = e(t(), 1),
  o = n();
function s(e) {
  let t = (0, ee.c)(80),
    { sw: n, onSave: r, onClose: s } = e,
    c = n.backup,
    [l, u] = (0, a.useState)(c?.status ?? `ok`),
    [d, f] = (0, a.useState)(c?.method ?? `manual`),
    p;
  t[0] === c?.date
    ? (p = t[1])
    : ((p = c?.date ?? i()), (t[0] = c?.date), (t[1] = p));
  let [m, h] = (0, a.useState)(p),
    [g, _] = (0, a.useState)(c?.configFile ?? ``),
    [v, te] = (0, a.useState)(c?.by ?? ``),
    [y, ne] = (0, a.useState)(c?.note ?? ``),
    re;
  t[2] !== v ||
  t[3] !== g ||
  t[4] !== m ||
  t[5] !== d ||
  t[6] !== y ||
  t[7] !== r ||
  t[8] !== l
    ? ((re = () => {
        r({
          status: l,
          method: d,
          date: m,
          configFile: g.trim(),
          by: v.trim(),
          note: y.trim(),
        });
      }),
      (t[2] = v),
      (t[3] = g),
      (t[4] = m),
      (t[5] = d),
      (t[6] = y),
      (t[7] = r),
      (t[8] = l),
      (t[9] = re))
    : (re = t[9]);
  let ie = re,
    b;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = { display: `flex`, zIndex: 700 }), (t[10] = b))
    : (b = t[10]);
  let x;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = { width: 360, maxWidth: `96vw` }), (t[11] = x))
    : (x = t[11]);
  let S;
  t[12] === n.name
    ? (S = t[13])
    : ((S = (0, o.jsx)(`h4`, {
        className: `text-sm font-black text-slate-800`,
        children: n.name,
      })),
      (t[12] = n.name),
      (t[13] = S));
  let ae = n.ip || `—`,
    C;
  t[14] === ae
    ? (C = t[15])
    : ((C = (0, o.jsx)(`p`, {
        className: `text-[10px] text-slate-400 font-mono mt-0.5`,
        children: ae,
      })),
      (t[14] = ae),
      (t[15] = C));
  let w;
  t[16] !== S || t[17] !== C
    ? ((w = (0, o.jsxs)(`div`, { children: [S, C] })),
      (t[16] = S),
      (t[17] = C),
      (t[18] = w))
    : (w = t[18]);
  let T;
  t[19] === s
    ? (T = t[20])
    : ((T = (0, o.jsx)(`button`, {
        onClick: s,
        className: `w-7 h-7 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 text-xs font-black`,
        children: `✕`,
      })),
      (t[19] = s),
      (t[20] = T));
  let E;
  t[21] !== w || t[22] !== T
    ? ((E = (0, o.jsxs)(`div`, {
        className: `flex items-center justify-between mb-4`,
        children: [w, T],
      })),
      (t[21] = w),
      (t[22] = T),
      (t[23] = E))
    : (E = t[23]);
  let oe;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((oe = (0, o.jsx)(`label`, {
        htmlFor: `bk-status`,
        className: `text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1`,
        children: `Trạng thái`,
      })),
      (t[24] = oe))
    : (oe = t[24]);
  let se;
  t[25] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((se = (e) => u(e.target.value)), (t[25] = se))
    : (se = t[25]);
  let ce, le, D;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ce = (0, o.jsx)(`option`, { value: `ok`, children: `✅ Thành công` })),
      (le = (0, o.jsx)(`option`, { value: `failed`, children: `❌ Thất bại` })),
      (D = (0, o.jsx)(`option`, { value: `skip`, children: `⏭️ Bỏ qua` })),
      (t[26] = ce),
      (t[27] = le),
      (t[28] = D))
    : ((ce = t[26]), (le = t[27]), (D = t[28]));
  let O;
  t[29] === l
    ? (O = t[30])
    : ((O = (0, o.jsxs)(`div`, {
        children: [
          oe,
          (0, o.jsxs)(`select`, {
            id: `bk-status`,
            value: l,
            onChange: se,
            className: `w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400`,
            children: [ce, le, D],
          }),
        ],
      })),
      (t[29] = l),
      (t[30] = O));
  let k;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, o.jsx)(`label`, {
        htmlFor: `bk-method`,
        className: `text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1`,
        children: `Phương thức`,
      })),
      (t[31] = k))
    : (k = t[31]);
  let A;
  t[32] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (e) => f(e.target.value)), (t[32] = A))
    : (A = t[32]);
  let j, M, N, P;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((j = (0, o.jsx)(`option`, { value: `manual`, children: `Manual` })),
      (M = (0, o.jsx)(`option`, { value: `ssh`, children: `SSH` })),
      (N = (0, o.jsx)(`option`, { value: `tftp`, children: `TFTP` })),
      (P = (0, o.jsx)(`option`, { value: `console`, children: `Console` })),
      (t[33] = j),
      (t[34] = M),
      (t[35] = N),
      (t[36] = P))
    : ((j = t[33]), (M = t[34]), (N = t[35]), (P = t[36]));
  let F;
  t[37] === d
    ? (F = t[38])
    : ((F = (0, o.jsxs)(`div`, {
        children: [
          k,
          (0, o.jsxs)(`select`, {
            id: `bk-method`,
            value: d,
            onChange: A,
            className: `w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400`,
            children: [j, M, N, P],
          }),
        ],
      })),
      (t[37] = d),
      (t[38] = F));
  let I;
  t[39] !== O || t[40] !== F
    ? ((I = (0, o.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [O, F],
      })),
      (t[39] = O),
      (t[40] = F),
      (t[41] = I))
    : (I = t[41]);
  let L;
  t[42] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = (0, o.jsx)(`label`, {
        htmlFor: `bk-date`,
        className: `text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1`,
        children: `Ngày backup`,
      })),
      (t[42] = L))
    : (L = t[42]);
  let R;
  t[43] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((R = (e) => h(e.target.value)), (t[43] = R))
    : (R = t[43]);
  let z;
  t[44] === m
    ? (z = t[45])
    : ((z = (0, o.jsxs)(`div`, {
        children: [
          L,
          (0, o.jsx)(`input`, {
            id: `bk-date`,
            type: `text`,
            value: m,
            onChange: R,
            placeholder: `DD/MM/YYYY - HH:MM`,
            className: `w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400 font-mono`,
          }),
        ],
      })),
      (t[44] = m),
      (t[45] = z));
  let B;
  t[46] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((B = (0, o.jsx)(`label`, {
        htmlFor: `bk-file`,
        className: `text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1`,
        children: `Tên file config`,
      })),
      (t[46] = B))
    : (B = t[46]);
  let V;
  t[47] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = (e) => _(e.target.value)), (t[47] = V))
    : (V = t[47]);
  let H;
  if (t[48] !== n.name) {
    let e;
    (t[50] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((e = /\s+/g), (t[50] = e))
      : (e = t[50]),
      (H = n.name.replace(e, `_`)),
      (t[48] = n.name),
      (t[49] = H));
  } else H = t[49];
  let ue = `${H}.cfg`,
    U;
  t[51] !== g || t[52] !== ue
    ? ((U = (0, o.jsxs)(`div`, {
        children: [
          B,
          (0, o.jsx)(`input`, {
            id: `bk-file`,
            type: `text`,
            value: g,
            onChange: V,
            placeholder: ue,
            className: `w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400 font-mono`,
          }),
        ],
      })),
      (t[51] = g),
      (t[52] = ue),
      (t[53] = U))
    : (U = t[53]);
  let W;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((W = (0, o.jsx)(`label`, {
        htmlFor: `bk-by`,
        className: `text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1`,
        children: `Người thực hiện`,
      })),
      (t[54] = W))
    : (W = t[54]);
  let G;
  t[55] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((G = (e) => te(e.target.value)), (t[55] = G))
    : (G = t[55]);
  let K;
  t[56] === v
    ? (K = t[57])
    : ((K = (0, o.jsxs)(`div`, {
        children: [
          W,
          (0, o.jsx)(`input`, {
            id: `bk-by`,
            type: `text`,
            value: v,
            onChange: G,
            placeholder: `admin`,
            className: `w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400`,
          }),
        ],
      })),
      (t[56] = v),
      (t[57] = K));
  let q;
  t[58] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((q = (0, o.jsx)(`label`, {
        htmlFor: `bk-note`,
        className: `text-[9px] font-black text-slate-500 uppercase tracking-wide block mb-1`,
        children: `Ghi chú`,
      })),
      (t[58] = q))
    : (q = t[58]);
  let J;
  t[59] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((J = (e) => ne(e.target.value)), (t[59] = J))
    : (J = t[59]);
  let Y;
  t[60] === y
    ? (Y = t[61])
    : ((Y = (0, o.jsxs)(`div`, {
        children: [
          q,
          (0, o.jsx)(`input`, {
            id: `bk-note`,
            type: `text`,
            value: y,
            onChange: J,
            placeholder: `Không có lỗi...`,
            className: `w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400`,
          }),
        ],
      })),
      (t[60] = y),
      (t[61] = Y));
  let X;
  t[62] !== I || t[63] !== z || t[64] !== U || t[65] !== K || t[66] !== Y
    ? ((X = (0, o.jsxs)(`div`, {
        className: `space-y-3`,
        children: [I, z, U, K, Y],
      })),
      (t[62] = I),
      (t[63] = z),
      (t[64] = U),
      (t[65] = K),
      (t[66] = Y),
      (t[67] = X))
    : (X = t[67]);
  let de;
  t[68] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((de = (0, o.jsx)(`i`, { className: `fas fa-save mr-1.5` })),
      (t[68] = de))
    : (de = t[68]);
  let Z;
  t[69] === ie
    ? (Z = t[70])
    : ((Z = (0, o.jsxs)(`button`, {
        onClick: ie,
        className: `flex-1 py-2 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 transition-all`,
        children: [de, ` Lưu`],
      })),
      (t[69] = ie),
      (t[70] = Z));
  let Q;
  t[71] === s
    ? (Q = t[72])
    : ((Q = (0, o.jsx)(`button`, {
        onClick: s,
        className: `px-4 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-xl hover:bg-slate-200 transition-all`,
        children: `Hủy`,
      })),
      (t[71] = s),
      (t[72] = Q));
  let $;
  t[73] !== Z || t[74] !== Q
    ? (($ = (0, o.jsxs)(`div`, {
        className: `flex gap-2 mt-5`,
        children: [Z, Q],
      })),
      (t[73] = Z),
      (t[74] = Q),
      (t[75] = $))
    : ($ = t[75]);
  let fe;
  return (
    t[76] !== E || t[77] !== X || t[78] !== $
      ? ((fe = (0, o.jsx)(`div`, {
          className: `modal`,
          style: b,
          children: (0, o.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: x,
            children: [E, X, $],
          }),
        })),
        (t[76] = E),
        (t[77] = X),
        (t[78] = $),
        (t[79] = fe))
      : (fe = t[79]),
    fe
  );
}
function c(e) {
  let t = (0, ee.c)(21),
    { sw: n, onClose: r } = e,
    i;
  t[0] === n.backup?.logs
    ? (i = t[1])
    : ((i = n.backup?.logs ?? []), (t[0] = n.backup?.logs), (t[1] = i));
  let a = i,
    s;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = { display: `flex`, zIndex: 701 }), (t[2] = s))
    : (s = t[2]);
  let c;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = {
        width: 520,
        maxHeight: `70vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[3] = c))
    : (c = t[3]);
  let u;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((u = (0, o.jsx)(`h4`, {
        className: `text-sm font-black text-slate-800`,
        children: `Lịch sử Backup`,
      })),
      (t[4] = u))
    : (u = t[4]);
  let d = n.ip || `—`,
    f;
  t[5] !== n.name || t[6] !== d
    ? ((f = (0, o.jsxs)(`div`, {
        children: [
          u,
          (0, o.jsxs)(`p`, {
            className: `text-[10px] text-slate-400 mt-0.5`,
            children: [n.name, ` · `, d],
          }),
        ],
      })),
      (t[5] = n.name),
      (t[6] = d),
      (t[7] = f))
    : (f = t[7]);
  let p;
  t[8] === r
    ? (p = t[9])
    : ((p = (0, o.jsx)(`button`, {
        onClick: r,
        className: `w-7 h-7 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 text-xs font-black`,
        children: `✕`,
      })),
      (t[8] = r),
      (t[9] = p));
  let m;
  t[10] !== f || t[11] !== p
    ? ((m = (0, o.jsxs)(`div`, {
        className: `flex items-center justify-between mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [f, p],
      })),
      (t[10] = f),
      (t[11] = p),
      (t[12] = m))
    : (m = t[12]);
  let h;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = (0, o.jsx)(`thead`, {
        children: (0, o.jsxs)(`tr`, {
          className: `bg-slate-50 text-[8px] font-black text-slate-400 uppercase border-b border-slate-100`,
          children: [
            (0, o.jsx)(`th`, { className: `p-2 pl-3`, children: `#` }),
            (0, o.jsx)(`th`, { className: `p-2`, children: `Ngày` }),
            (0, o.jsx)(`th`, { className: `p-2`, children: `Kết quả` }),
            (0, o.jsx)(`th`, { className: `p-2`, children: `Method` }),
            (0, o.jsx)(`th`, { className: `p-2`, children: `File` }),
            (0, o.jsx)(`th`, { className: `p-2`, children: `Bởi` }),
          ],
        }),
      })),
      (t[13] = h))
    : (h = t[13]);
  let g;
  t[14] === a ? (g = t[15]) : ((g = a.map(l)), (t[14] = a), (t[15] = g));
  let _;
  t[16] === g
    ? (_ = t[17])
    : ((_ = (0, o.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll`,
        children: (0, o.jsxs)(`table`, {
          className: `w-full text-left`,
          children: [h, (0, o.jsx)(`tbody`, { children: g })],
        }),
      })),
      (t[16] = g),
      (t[17] = _));
  let v;
  return (
    t[18] !== _ || t[19] !== m
      ? ((v = (0, o.jsx)(`div`, {
          className: `modal`,
          style: s,
          children: (0, o.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: c,
            children: [m, _],
          }),
        })),
        (t[18] = _),
        (t[19] = m),
        (t[20] = v))
      : (v = t[20]),
    v
  );
}
function l(e, t) {
  return (0, o.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0`,
      children: [
        (0, o.jsx)(`td`, {
          className: `p-2 pl-3 text-[9px] text-slate-400 font-bold`,
          children: t + 1,
        }),
        (0, o.jsx)(`td`, {
          className: `p-2 font-mono text-[9px] text-slate-600`,
          children: e.date || `—`,
        }),
        (0, o.jsx)(`td`, {
          className: `p-2 text-[9px] font-black ${e.status === `ok` ? `text-emerald-600` : e.status === `failed` ? `text-red-500` : `text-slate-400`}`,
          children:
            e.status === `ok`
              ? `✅ OK`
              : e.status === `failed`
                ? `❌ Failed`
                : `⏭️ Skip`,
        }),
        (0, o.jsx)(`td`, {
          className: `p-2 text-[9px] text-slate-500`,
          children: e.method || `—`,
        }),
        (0, o.jsx)(`td`, {
          className: `p-2 font-mono text-[9px] text-slate-400 max-w-[120px] truncate`,
          title: e.configFile || ``,
          children: e.configFile || `—`,
        }),
        (0, o.jsx)(`td`, {
          className: `p-2 text-[9px] text-slate-400`,
          children: e.by || `—`,
        }),
      ],
    },
    t,
  );
}
export { s as n, c as t };
