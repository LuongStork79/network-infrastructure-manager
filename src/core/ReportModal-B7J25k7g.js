import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  C as r,
  L as i,
  N as a,
  S as o,
  V as s,
  _ as c,
  b as l,
  d as u,
  et as d,
  f,
  g as p,
  h as m,
  it as h,
  l as g,
  lt as _,
  m as v,
  p as y,
  r as b,
  tn as x,
  v as S,
  w as C,
  x as w,
  y as T,
} from "./index-QE6I14Fy.js";
import { n as E, t as D } from "./BackupHistoryModal-DIkefmZZ.js";
import { n as O, t as k } from "./reportClasses-Dlg0NGLS.js";
var A = e(t(), 1),
  j = x(),
  M = n(),
  N = {
    "fa-desktop": `PC / Laptop`,
    "fa-wifi": `WiFi (AP)`,
    "fa-video": `Camera CCTV`,
    "fa-phone": `IP Phone`,
    "fa-print": `Máy in`,
    "fa-server": `Máy chủ`,
    "fa-microchip": `IoT`,
    "fa-network-wired": `Router/Switch`,
  };
function ee(e) {
  let t = (0, j.c)(41),
    { db: n } = e,
    r,
    i,
    a,
    s,
    c,
    l,
    u;
  if (t[0] !== n) {
    let e = o(n),
      d = Object.keys(e.brandGroups).sort();
    s = (0, M.jsx)(`div`, {
      className: `stat-grid grid grid-cols-5 gap-4 mb-6`,
      children: [
        [`indigo`, e.totalSW, `Tổng Switch`],
        [`amber`, e.coreSW, `Core/Dist`],
        [`emerald`, e.accessSW, `Access`],
        [`blue`, `${e.usedPorts}/${e.totalPorts}`, `Ports Used (RJ45)`],
        [`purple`, `${e.usedSfpPorts}/${e.totalSfpPorts}`, `SFP Used`],
      ].map(W),
    });
    let f;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((f = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-ethernet text-blue-500` }),
            ` Trạng Thái Port`,
          ],
        })),
        (t[8] = f))
      : (f = t[8]);
    let p = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          f,
          [
            [`emerald`, `Active/Up`, e.portStatus.up],
            [`slate`, `Shutdown`, e.portStatus.shutdown],
            [`red`, `Err-Disabled`, e.portStatus.errDisabled],
          ].map((t) => {
            let [n, r, i] = t,
              a = O(n),
              o = (i / Math.max(1, e.usedPorts)) * 100;
            return (0, M.jsxs)(
              `div`,
              {
                className: `mb-3`,
                children: [
                  (0, M.jsxs)(`div`, {
                    className: `flex justify-between text-[10px] font-bold mb-1`,
                    children: [
                      (0, M.jsx)(`span`, { className: a.text, children: r }),
                      (0, M.jsx)(`span`, { children: i }),
                    ],
                  }),
                  (0, M.jsx)(`div`, {
                    className: `w-full bg-slate-100 rounded-full h-2`,
                    children: (0, M.jsx)(`div`, {
                      className: `h-2 rounded-full ${n === `red` ? `bg-red-500` : n === `emerald` ? `bg-emerald-500` : `bg-slate-400`}`,
                      style: { width: `${o}%` },
                    }),
                  }),
                ],
              },
              r,
            );
          }),
        ],
      }),
      m;
    t[9] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((m = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-microchip text-purple-400` }),
            ` Theo Model`,
          ],
        })),
        (t[9] = m))
      : (m = t[9]);
    let h = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          m,
          (0, M.jsx)(`div`, {
            className: `space-y-2 max-h-36 overflow-y-auto custom-scroll`,
            children:
              Object.keys(e.modelCount).length === 0
                ? (0, M.jsx)(`p`, {
                    className: `text-xs text-slate-400 italic`,
                    children: `Chưa có`,
                  })
                : Object.entries(e.modelCount).sort(U).map(H),
          }),
        ],
      }),
      g;
    t[10] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((g = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-tags text-indigo-400` }),
            ` Thương Hiệu`,
          ],
        })),
        (t[10] = g))
      : (g = t[10]);
    let _ =
        Object.keys(e.brandCount).length === 0
          ? (0, M.jsx)(`p`, {
              className: `text-xs text-slate-400 italic`,
              children: `Chưa có`,
            })
          : Object.entries(e.brandCount).map(V),
      v;
    t[11] === _
      ? (v = t[12])
      : ((v = (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
          children: [
            g,
            (0, M.jsx)(`div`, {
              className: `space-y-2 max-h-36 overflow-y-auto custom-scroll`,
              children: _,
            }),
          ],
        })),
        (t[11] = _),
        (t[12] = v));
    let y;
    t[13] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((y = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, {
              className: `fas fa-layer-group text-emerald-400`,
            }),
            ` Theo Tầng`,
          ],
        })),
        (t[13] = y))
      : (y = t[13]);
    let b =
        Object.keys(e.floorCount).length === 0
          ? (0, M.jsx)(`p`, {
              className: `text-xs text-slate-400 italic`,
              children: `Chưa có`,
            })
          : Object.entries(e.floorCount).map(B),
      x;
    (t[14] === b
      ? (x = t[15])
      : ((x = (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
          children: [
            y,
            (0, M.jsx)(`div`, {
              className: `space-y-2 max-h-36 overflow-y-auto custom-scroll`,
              children: b,
            }),
          ],
        })),
        (t[14] = b),
        (t[15] = x)),
      t[16] !== p || t[17] !== h || t[18] !== v || t[19] !== x
        ? ((c = (0, M.jsxs)(`div`, {
            className: `panel-grid grid grid-cols-4 gap-5 mb-6`,
            children: [p, h, v, x],
          })),
          (t[16] = p),
          (t[17] = h),
          (t[18] = v),
          (t[19] = x),
          (t[20] = c))
        : (c = t[20]));
    let S;
    t[21] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((S = (0, M.jsx)(`div`, {
          className: `p-4 border-b border-slate-100 bg-slate-50/50`,
          children: (0, M.jsxs)(`h4`, {
            className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
            children: [
              (0, M.jsx)(`i`, { className: `fas fa-fire text-orange-500` }),
              ` Top 5 Tải Cao Nhất`,
            ],
          }),
        })),
        (t[21] = S))
      : (S = t[21]);
    let C;
    t[22] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((C = (0, M.jsx)(`thead`, {
          children: (0, M.jsxs)(`tr`, {
            className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
            children: [
              (0, M.jsx)(`th`, { className: `p-3 pl-4`, children: `Switch` }),
              (0, M.jsx)(`th`, { className: `p-3`, children: `Tầng` }),
              (0, M.jsx)(`th`, { className: `p-3`, children: `Brand` }),
              (0, M.jsx)(`th`, {
                className: `p-3 text-right`,
                children: `Ports`,
              }),
              (0, M.jsx)(`th`, {
                className: `p-3 pr-4 w-1/3`,
                children: `Load`,
              }),
            ],
          }),
        })),
        (t[22] = C))
      : (C = t[22]);
    let w = (0, M.jsxs)(`table`, {
      className: `w-full text-left`,
      children: [
        C,
        (0, M.jsx)(`tbody`, {
          children:
            e.top5.length === 0
              ? (0, M.jsx)(`tr`, {
                  children: (0, M.jsx)(`td`, {
                    colSpan: 5,
                    className: `p-4 text-center text-xs text-slate-400 italic`,
                    children: `Không có dữ liệu`,
                  }),
                })
              : e.top5.map(z),
        }),
      ],
    });
    t[23] === w
      ? (l = t[24])
      : ((l = (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
          children: [S, w],
        })),
        (t[23] = w),
        (t[24] = l));
    let T;
    t[25] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((T = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-desktop text-purple-500` }),
            ` Phân Bố Thiết Bị Cuối`,
          ],
        })),
        (t[25] = T))
      : (T = t[25]);
    let E = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          T,
          (0, M.jsx)(`div`, {
            className: `grid grid-cols-2 gap-3`,
            children:
              Object.keys(e.clientTypes).length === 0
                ? (0, M.jsx)(`p`, {
                    className: `col-span-2 text-xs text-slate-400 italic text-center py-4`,
                    children: `Chưa có dữ liệu`,
                  })
                : Object.entries(e.clientTypes).sort(R).map(L),
          }),
        ],
      }),
      D;
    t[26] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((D = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, {
              className: `fas fa-network-wired text-amber-500`,
            }),
            ` Cổng Kết Nối Theo VLAN`,
          ],
        })),
        (t[26] = D))
      : (D = t[26]);
    let k = (0, M.jsxs)(`div`, {
      className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
      children: [
        D,
        (0, M.jsx)(`div`, {
          className: `grid grid-cols-2 gap-2.5 max-h-52 overflow-y-auto custom-scroll pr-1`,
          children:
            Object.keys(e.vlanUsage).length === 0
              ? (0, M.jsx)(`p`, {
                  className: `col-span-2 text-xs text-slate-400 italic text-center py-4`,
                  children: `Chưa có dữ liệu`,
                })
              : Object.entries(e.vlanUsage).sort(I).map(F),
        }),
      ],
    });
    (t[27] !== E || t[28] !== k
      ? ((u = (0, M.jsxs)(`div`, {
          className: `panel-grid grid grid-cols-2 gap-5 mt-6`,
          children: [E, k],
        })),
        (t[27] = E),
        (t[28] = k),
        (t[29] = u))
      : (u = t[29]),
      (r = `mt-6`));
    let A;
    (t[30] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((A = (0, M.jsxs)(`h3`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-list-ul text-indigo-500` }),
            ` Danh Sách Switch Theo Hãng`,
          ],
        })),
        (t[30] = A))
      : (A = t[30]),
      (i = (0, M.jsxs)(`div`, {
        className: `flex items-center gap-3 mb-4`,
        children: [
          A,
          (0, M.jsxs)(`span`, {
            className: `text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full`,
            children: [e.totalSW, ` thiết bị · `, d.length, ` hãng`],
          }),
        ],
      })),
      (a = d.map((t) => {
        let n = e.brandGroups[t],
          r =
            n.totalPorts > 0
              ? Math.round((n.usedPorts / n.totalPorts) * 100)
              : 0;
        return (0, M.jsxs)(
          `div`,
          {
            className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-4 last:mb-0`,
            children: [
              (0, M.jsxs)(`div`, {
                className: `px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3`,
                style: { borderLeft: `4px solid ${n.color}` },
                children: [
                  (0, M.jsx)(`span`, {
                    className: `text-xs font-black text-slate-800`,
                    children: t,
                  }),
                  (0, M.jsxs)(`span`, {
                    className: `text-[10px] text-slate-400`,
                    children: [
                      n.items.length,
                      ` switch · `,
                      n.totalPorts,
                      ` ports tổng`,
                    ],
                  }),
                  (0, M.jsxs)(`span`, {
                    className: `ml-auto text-[10px] font-bold text-emerald-600`,
                    children: [n.usedPorts, ` đã dùng`],
                  }),
                  (0, M.jsx)(`span`, {
                    className: `mx-1 text-slate-300 text-[10px]`,
                    children: `·`,
                  }),
                  (0, M.jsxs)(`span`, {
                    className: `text-[10px] text-slate-400`,
                    children: [n.totalPorts - n.usedPorts, ` trống`],
                  }),
                  (0, M.jsxs)(`span`, {
                    className: `text-[9px] font-black px-1.5 py-0.5 rounded-full ${r > 80 ? `bg-red-50 text-red-500 border border-red-200` : r > 50 ? `bg-amber-50 text-amber-600 border border-amber-200` : `bg-emerald-50 text-emerald-600 border border-emerald-200`}`,
                    children: [r, `%`],
                  }),
                ],
              }),
              (0, M.jsxs)(`table`, {
                className: `w-full text-left`,
                children: [
                  (0, M.jsx)(`thead`, {
                    children: (0, M.jsxs)(`tr`, {
                      className: `bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-wide border-b border-slate-100`,
                      children: [
                        (0, M.jsx)(`th`, {
                          className: `p-2 pl-4 w-8`,
                          children: `#`,
                        }),
                        (0, M.jsx)(`th`, {
                          className: `p-2`,
                          children: `Tên / Tầng`,
                        }),
                        (0, M.jsx)(`th`, {
                          className: `p-2`,
                          children: `IP Address`,
                        }),
                        (0, M.jsx)(`th`, {
                          className: `p-2`,
                          children: `Model`,
                        }),
                        (0, M.jsx)(`th`, {
                          className: `p-2`,
                          children: `Port Usage`,
                        }),
                        (0, M.jsx)(`th`, {
                          className: `p-2`,
                          children: `MAC Address`,
                        }),
                      ],
                    }),
                  }),
                  (0, M.jsx)(`tbody`, { children: n.items.map(P) }),
                ],
              }),
            ],
          },
          t,
        );
      })),
      (t[0] = n),
      (t[1] = r),
      (t[2] = i),
      (t[3] = a),
      (t[4] = s),
      (t[5] = c),
      (t[6] = l),
      (t[7] = u));
  } else
    ((r = t[1]),
      (i = t[2]),
      (a = t[3]),
      (s = t[4]),
      (c = t[5]),
      (l = t[6]),
      (u = t[7]));
  let d;
  t[31] !== r || t[32] !== i || t[33] !== a
    ? ((d = (0, M.jsxs)(`div`, { className: r, children: [i, a] })),
      (t[31] = r),
      (t[32] = i),
      (t[33] = a),
      (t[34] = d))
    : (d = t[34]);
  let f;
  return (
    t[35] !== s || t[36] !== c || t[37] !== l || t[38] !== u || t[39] !== d
      ? ((f = (0, M.jsxs)(`div`, { children: [s, c, l, u, d] })),
        (t[35] = s),
        (t[36] = c),
        (t[37] = l),
        (t[38] = u),
        (t[39] = d),
        (t[40] = f))
      : (f = t[40]),
    f
  );
}
function P(e, t) {
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors`,
      children: [
        (0, M.jsx)(`td`, {
          className: `p-2 pl-4 text-[10px] text-slate-400 font-bold w-8`,
          children: t + 1,
        }),
        (0, M.jsxs)(`td`, {
          className: `p-2`,
          children: [
            (0, M.jsx)(`span`, {
              className: `text-xs font-bold text-slate-800`,
              children: e.name,
            }),
            e.isCore &&
              (0, M.jsx)(`span`, {
                className: `ml-1.5 text-[8px] font-black bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full`,
                children: `CORE`,
              }),
            (0, M.jsx)(`p`, {
              className: `text-[9px] text-slate-400 mt-0.5`,
              children: e.floor,
            }),
          ],
        }),
        (0, M.jsx)(`td`, {
          className: `p-2 font-mono text-xs font-bold text-indigo-600`,
          children: e.ip,
        }),
        (0, M.jsx)(`td`, {
          className: `p-2 text-[10px] text-slate-500`,
          children: e.model,
        }),
        (0, M.jsx)(`td`, {
          className: `p-2`,
          children: (0, M.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, M.jsx)(`div`, {
                className: `w-14 bg-slate-100 rounded-full h-1.5 shrink-0`,
                children: (0, M.jsx)(`div`, {
                  className: `h-1.5 rounded-full ${e.util > 80 ? `bg-red-500` : e.util > 50 ? `bg-amber-500` : `bg-emerald-500`}`,
                  style: { width: `${e.util}%` },
                }),
              }),
              (0, M.jsxs)(`span`, {
                className: `text-[10px] font-black text-slate-700`,
                children: [e.used, `/`, e.ports],
              }),
              (0, M.jsxs)(`span`, {
                className: `text-[9px] font-black ml-1 ${e.util > 80 ? `text-red-500` : `text-slate-400`}`,
                children: [e.util, `%`],
              }),
            ],
          }),
        }),
        (0, M.jsx)(`td`, {
          className: `p-2 font-mono text-[9px] text-slate-400`,
          children: e.mac,
        }),
      ],
    },
    e.name + t,
  );
}
function F(e) {
  let [t, n] = e,
    r = b[Number(t)];
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-100 rounded-lg`,
      style: { borderLeft: `3px solid ${r?.color ?? `#94a3b8`}` },
      children: [
        (0, M.jsxs)(`div`, {
          className: `flex-1 min-w-0`,
          children: [
            (0, M.jsxs)(`p`, {
              className: `text-[10px] font-black text-slate-800`,
              children: [`VLAN `, t],
            }),
            (0, M.jsx)(`p`, {
              className: `text-[9px] text-slate-500 truncate`,
              children: r?.name ?? `Unknown`,
            }),
          ],
        }),
        (0, M.jsx)(`span`, {
          className: `text-sm font-black text-slate-700 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function I(e, t) {
  return t[1] - e[1];
}
function L(e) {
  let [t, n] = e,
    r = k(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex items-center gap-3 p-3 border rounded-xl ${r.bg}`,
      children: [
        (0, M.jsx)(`div`, {
          className: `w-9 h-9 rounded-xl ${r.iconBg} flex items-center justify-center shrink-0`,
          children: (0, M.jsx)(`i`, {
            className: `fas ${t} ${r.iconText} text-sm`,
          }),
        }),
        (0, M.jsxs)(`div`, {
          children: [
            (0, M.jsx)(`p`, {
              className: `text-[9px] font-bold uppercase tracking-wide ${r.iconText}`,
              children: N[t] ?? `Khác`,
            }),
            (0, M.jsx)(`p`, {
              className: `text-xl font-black text-slate-700`,
              children: n,
            }),
          ],
        }),
      ],
    },
    t,
  );
}
function R(e, t) {
  return t[1] - e[1];
}
function z(e, t) {
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-indigo-50/30`,
      children: [
        (0, M.jsxs)(`td`, {
          className: `p-3 pl-4 text-xs font-bold text-slate-800`,
          children: [
            (0, M.jsx)(`span`, {
              className: `w-5 h-5 rounded-full bg-slate-100 text-slate-500 inline-flex items-center justify-center text-[10px] font-black mr-2`,
              children: t + 1,
            }),
            e.name,
          ],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: e.floor,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-[10px] font-black text-slate-500`,
          children: e.brand,
        }),
        (0, M.jsxs)(`td`, {
          className: `p-3 text-right text-xs font-bold`,
          children: [e.used, `/`, e.total],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 pr-4`,
          children: (0, M.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, M.jsx)(`div`, {
                className: `flex-1 bg-slate-100 rounded-full h-1.5`,
                children: (0, M.jsx)(`div`, {
                  className: `h-1.5 rounded-full ${e.util > 80 ? `bg-red-500` : e.util > 50 ? `bg-amber-500` : `bg-emerald-500`}`,
                  style: { width: `${e.util.toFixed(0)}%` },
                }),
              }),
              (0, M.jsxs)(`span`, {
                className: `text-[10px] font-black w-8 text-right ${e.util > 80 ? `text-red-600` : `text-slate-600`}`,
                children: [e.util.toFixed(0), `%`],
              }),
            ],
          }),
        }),
      ],
    },
    e.name,
  );
}
function B(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between p-2 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-xs font-bold text-slate-700 truncate`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-emerald-600`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function V(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between p-2 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-xs font-bold text-slate-700`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-indigo-600`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function H(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-xs font-bold text-slate-700 truncate`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-purple-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function U(e, t) {
  return t[1] - e[1];
}
function W(e) {
  let [t, n, r] = e,
    i = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${i.bg} border ${i.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-3xl font-black ${i.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${i.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
var G = { odf: `🟡`, switch: `🔵`, ap: `🔹` };
function te(e) {
  let t = (0, j.c)(24),
    { odfDB: n } = e,
    r,
    i,
    a,
    o,
    s,
    c,
    l;
  if (t[0] !== n) {
    let e = T(n);
    ((c = (0, M.jsx)(`div`, {
      className: `stat-grid grid grid-cols-4 gap-4 mb-6`,
      children: [
        [`amber`, e.total, `Tổng ODF`],
        [`indigo`, e.indoor, `Indoor`],
        [`emerald`, e.outdoor, `Outdoor`],
        [`blue`, `${e.usedCap}/${e.totalCap}`, `Port Đã Dùng`],
      ].map(Y),
    })),
      (l = (0, M.jsx)(`div`, {
        className: `stat-grid grid grid-cols-3 gap-4 mb-6`,
        children: [
          [`amber`, `ODF → ODF`, e.byType.odf],
          [`blue`, `ODF → Switch`, e.byType.switch],
          [`cyan`, `ODF → AP Outdoor`, e.byType.ap],
        ].map(J),
      })),
      (o = `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`),
      t[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = (0, M.jsx)(`div`, {
            className: `p-4 border-b border-slate-100 bg-slate-50/50`,
            children: (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
              children: [
                (0, M.jsx)(`i`, {
                  className: `fas fa-network-wired text-amber-500`,
                }),
                ` Chi tiết ODF`,
              ],
            }),
          })),
          (t[8] = s))
        : (s = t[8]),
      (i = `w-full text-left`),
      t[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, M.jsx)(`thead`, {
            children: (0, M.jsxs)(`tr`, {
              className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
              children: [
                (0, M.jsx)(`th`, { className: `p-3 pl-4`, children: `ODF` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Type` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Zone` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Port Usage` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Kết nối` }),
              ],
            }),
          })),
          (t[9] = a))
        : (a = t[9]),
      (r =
        e.rows.length === 0
          ? (0, M.jsx)(`tr`, {
              children: (0, M.jsx)(`td`, {
                colSpan: 5,
                className: `p-4 text-center text-xs text-slate-400 italic`,
                children: `Chưa có ODF nào`,
              }),
            })
          : e.rows.map(K)),
      (t[0] = n),
      (t[1] = r),
      (t[2] = i),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = c),
      (t[7] = l));
  } else
    ((r = t[1]),
      (i = t[2]),
      (a = t[3]),
      (o = t[4]),
      (s = t[5]),
      (c = t[6]),
      (l = t[7]));
  let u;
  t[10] === r
    ? (u = t[11])
    : ((u = (0, M.jsx)(`tbody`, { children: r })), (t[10] = r), (t[11] = u));
  let d;
  t[12] !== i || t[13] !== a || t[14] !== u
    ? ((d = (0, M.jsxs)(`table`, { className: i, children: [a, u] })),
      (t[12] = i),
      (t[13] = a),
      (t[14] = u),
      (t[15] = d))
    : (d = t[15]);
  let f;
  t[16] !== o || t[17] !== s || t[18] !== d
    ? ((f = (0, M.jsxs)(`div`, { className: o, children: [s, d] })),
      (t[16] = o),
      (t[17] = s),
      (t[18] = d),
      (t[19] = f))
    : (f = t[19]);
  let p;
  return (
    t[20] !== f || t[21] !== c || t[22] !== l
      ? ((p = (0, M.jsxs)(`div`, { children: [c, l, f] })),
        (t[20] = f),
        (t[21] = c),
        (t[22] = l),
        (t[23] = p))
      : (p = t[23]),
    p
  );
}
function K(e) {
  let t = e.totalPorts > 0 ? Math.round((e.used / e.totalPorts) * 100) : 0,
    n = e.connections.map(q).join(`  `);
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-amber-50/30`,
      children: [
        (0, M.jsxs)(`td`, {
          className: `p-3 pl-4`,
          children: [
            (0, M.jsx)(`span`, {
              className: `text-xs font-black text-slate-800`,
              children: e.name,
            }),
            (0, M.jsx)(`p`, {
              className: `text-[9px] text-slate-400`,
              children: e.location || `—`,
            }),
          ],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3`,
          children: (0, M.jsx)(`span`, {
            className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${e.type === `outdoor` ? `text-emerald-600 bg-emerald-50` : `text-indigo-600 bg-indigo-50`}`,
            children: e.type,
          }),
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: e.zone || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3`,
          children: (0, M.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, M.jsx)(`div`, {
                className: `flex-1 bg-slate-100 rounded-full h-1.5`,
                children: (0, M.jsx)(`div`, {
                  className: `h-1.5 rounded-full ${t > 80 ? `bg-red-500` : `bg-amber-500`}`,
                  style: { width: `${t}%` },
                }),
              }),
              (0, M.jsxs)(`span`, {
                className: `text-[10px] font-black text-slate-600`,
                children: [e.used, `/`, e.totalPorts],
              }),
            ],
          }),
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-[9px] text-slate-500 max-w-[240px] truncate`,
          title: n,
          children:
            n ||
            (0, M.jsx)(`span`, {
              className: `text-slate-300`,
              children: `Chưa có kết nối`,
            }),
        }),
      ],
    },
    e.id,
  );
}
function q(e) {
  return `${G[e.targetType] ?? `🔹`}P${e.portFrom}→${e.targetName}`;
}
function J(e) {
  let [t, n, r] = e,
    i = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center`,
      children: [
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-2xl font-black ${i.text}`,
          children: r,
        }),
      ],
    },
    n,
  );
}
function Y(e) {
  let [t, n, r] = e,
    i = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${i.bg} border ${i.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-3xl font-black ${i.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${i.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
function ne(e) {
  let t = (0, j.c)(46),
    { wifiDB: n, odfDB: a, networkDB: o } = e,
    c,
    l,
    u,
    d,
    f,
    p;
  t[0] !== a || t[1] !== n
    ? ((c = r(n, a)),
      (p = (0, M.jsx)(`div`, {
        className: `stat-grid grid grid-cols-4 gap-4 mb-6`,
        children: [
          [`cyan`, c.total, `Tổng AP`],
          [`indigo`, c.placed, `Đã đặt mặt bằng`],
          [`amber`, c.connectedToODF, `Kết nối ODF`],
          [`slate`, c.unplaced, `Chưa đặt`],
        ].map(ie),
      })),
      (f = `panel-grid grid grid-cols-4 gap-5 mb-6`),
      (l = `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`),
      t[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, M.jsxs)(`h4`, {
            className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
            children: [
              (0, M.jsx)(`i`, {
                className: `fas fa-broadcast-tower text-cyan-500`,
              }),
              ` Loại AP`,
            ],
          })),
          (t[8] = u))
        : (u = t[8]),
      (d =
        Object.keys(c.byType).length === 0
          ? (0, M.jsx)(`p`, {
              className: `text-xs text-slate-400 italic`,
              children: `Chưa có`,
            })
          : Object.entries(c.byType).map((e) => {
              let [t, n] = e,
                r = s(t),
                i = c.total > 0 ? Math.round((n / c.total) * 100) : 0;
              return (0, M.jsxs)(
                `div`,
                {
                  className: `flex items-center gap-3 mb-2`,
                  children: [
                    (0, M.jsx)(`span`, {
                      className: `text-[10px] font-bold text-slate-600 w-28 shrink-0 truncate`,
                      children: t,
                    }),
                    (0, M.jsx)(`div`, {
                      className: `flex-1 bg-slate-100 rounded-full h-2 overflow-hidden`,
                      children: (0, M.jsx)(`div`, {
                        className: `h-full rounded-full ${r.iconBg}`,
                        style: { width: `${i}%` },
                      }),
                    }),
                    (0, M.jsxs)(`span`, {
                      className: `text-[10px] font-black text-slate-700 w-12 text-right`,
                      children: [
                        n,
                        ` `,
                        (0, M.jsxs)(`span`, {
                          className: `text-slate-400 font-normal`,
                          children: [`(`, i, `%)`],
                        }),
                      ],
                    }),
                  ],
                },
                t,
              );
            })),
      (t[0] = a),
      (t[1] = n),
      (t[2] = c),
      (t[3] = l),
      (t[4] = u),
      (t[5] = d),
      (t[6] = f),
      (t[7] = p))
    : ((c = t[2]), (l = t[3]), (u = t[4]), (d = t[5]), (f = t[6]), (p = t[7]));
  let m;
  t[9] !== l || t[10] !== u || t[11] !== d
    ? ((m = (0, M.jsxs)(`div`, { className: l, children: [u, d] })),
      (t[9] = l),
      (t[10] = u),
      (t[11] = d),
      (t[12] = m))
    : (m = t[12]);
  let h;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = (0, M.jsxs)(`h4`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
        children: [
          (0, M.jsx)(`i`, { className: `fas fa-layer-group text-indigo-400` }),
          ` Theo Tầng`,
        ],
      })),
      (t[13] = h))
    : (h = t[13]);
  let g;
  t[14] === c.byFloor
    ? (g = t[15])
    : ((g =
        Object.keys(c.byFloor).length === 0
          ? (0, M.jsx)(`p`, {
              className: `text-xs text-slate-400 italic`,
              children: `Chưa có`,
            })
          : Object.entries(c.byFloor).map(re)),
      (t[14] = c.byFloor),
      (t[15] = g));
  let _;
  t[16] === g
    ? (_ = t[17])
    : ((_ = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          h,
          (0, M.jsx)(`div`, {
            className: `space-y-1.5 max-h-40 overflow-y-auto custom-scroll`,
            children: g,
          }),
        ],
      })),
      (t[16] = g),
      (t[17] = _));
  let v;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = (0, M.jsxs)(`h4`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
        children: [
          (0, M.jsx)(`i`, { className: `fas fa-tags text-purple-400` }),
          ` Thương Hiệu`,
        ],
      })),
      (t[18] = v))
    : (v = t[18]);
  let y;
  t[19] === c.byBrand
    ? (y = t[20])
    : ((y =
        Object.keys(c.byBrand).length === 0
          ? (0, M.jsx)(`p`, {
              className: `text-xs text-slate-400 italic`,
              children: `Chưa có`,
            })
          : Object.entries(c.byBrand).map(Z)),
      (t[19] = c.byBrand),
      (t[20] = y));
  let b;
  t[21] === y
    ? (b = t[22])
    : ((b = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          v,
          (0, M.jsx)(`div`, {
            className: `space-y-1.5 max-h-40 overflow-y-auto custom-scroll`,
            children: y,
          }),
        ],
      })),
      (t[21] = y),
      (t[22] = b));
  let x;
  t[23] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = (0, M.jsxs)(`h4`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
        children: [
          (0, M.jsx)(`i`, { className: `fas fa-microchip text-emerald-400` }),
          ` Model AP`,
        ],
      })),
      (t[23] = x))
    : (x = t[23]);
  let S;
  t[24] === c.byModel
    ? (S = t[25])
    : ((S =
        Object.keys(c.byModel).length === 0
          ? (0, M.jsx)(`p`, {
              className: `text-xs text-slate-400 italic`,
              children: `Chưa có`,
            })
          : Object.entries(c.byModel).map(X)),
      (t[24] = c.byModel),
      (t[25] = S));
  let C;
  t[26] === S
    ? (C = t[27])
    : ((C = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          x,
          (0, M.jsx)(`div`, {
            className: `space-y-1.5 max-h-40 overflow-y-auto custom-scroll`,
            children: S,
          }),
        ],
      })),
      (t[26] = S),
      (t[27] = C));
  let w;
  t[28] !== b || t[29] !== C || t[30] !== f || t[31] !== m || t[32] !== _
    ? ((w = (0, M.jsxs)(`div`, { className: f, children: [m, _, b, C] })),
      (t[28] = b),
      (t[29] = C),
      (t[30] = f),
      (t[31] = m),
      (t[32] = _),
      (t[33] = w))
    : (w = t[33]);
  let T;
  t[34] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, M.jsx)(`div`, {
        className: `p-4 border-b border-slate-100 bg-slate-50/50`,
        children: (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-list text-slate-400` }),
            ` Danh Sách AP`,
          ],
        }),
      })),
      (t[34] = T))
    : (T = t[34]);
  let E;
  t[35] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = (0, M.jsx)(`thead`, {
        children: (0, M.jsxs)(`tr`, {
          className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
          children: [
            (0, M.jsx)(`th`, { className: `p-3 pl-4`, children: `Tên` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Tầng` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Loại` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Model` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `IP` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Switch` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Port` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `ODF` }),
          ],
        }),
      })),
      (t[35] = E))
    : (E = t[35]);
  let D;
  t[36] !== o || t[37] !== a || t[38] !== n
    ? ((D =
        n.length === 0
          ? (0, M.jsx)(`tr`, {
              children: (0, M.jsx)(`td`, {
                colSpan: 8,
                className: `p-4 text-center text-xs text-slate-400 italic`,
                children: `Chưa có AP nào`,
              }),
            })
          : n.map((e) => {
              let t = a.find((t) =>
                  (t.connections ?? []).some(
                    (t) => t.targetType === `ap` && t.targetId === e.id,
                  ),
                ),
                n = i(e, o);
              return (0, M.jsxs)(
                `tr`,
                {
                  className: `border-b border-slate-100 last:border-0 hover:bg-cyan-50/20`,
                  children: [
                    (0, M.jsx)(`td`, {
                      className: `p-3 pl-4 text-xs font-bold text-slate-800`,
                      children: e.name,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-xs text-slate-600`,
                      children: e.floor || `—`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] font-bold text-cyan-600`,
                      children: e.type || `—`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] text-slate-500`,
                      children: e.model || `—`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-xs font-mono text-indigo-600`,
                      children: e.ip || `—`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] font-bold`,
                      children: n
                        ? (0, M.jsx)(`span`, {
                            className: `text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full`,
                            children: n.switchName,
                          })
                        : (0, M.jsx)(`span`, {
                            className: `text-slate-300`,
                            children: `—`,
                          }),
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] font-bold text-slate-600`,
                      children:
                        n?.port == null
                          ? (0, M.jsx)(`span`, {
                              className: `text-slate-300`,
                              children: `—`,
                            })
                          : `P${n.port}`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] font-bold`,
                      children: t
                        ? (0, M.jsx)(`span`, {
                            className: `text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full`,
                            children: t.name,
                          })
                        : (0, M.jsx)(`span`, {
                            className: `text-slate-300`,
                            children: `—`,
                          }),
                    }),
                  ],
                },
                e.id,
              );
            })),
      (t[36] = o),
      (t[37] = a),
      (t[38] = n),
      (t[39] = D))
    : (D = t[39]);
  let O;
  t[40] === D
    ? (O = t[41])
    : ((O = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
        children: [
          T,
          (0, M.jsxs)(`table`, {
            className: `w-full text-left`,
            children: [E, (0, M.jsx)(`tbody`, { children: D })],
          }),
        ],
      })),
      (t[40] = D),
      (t[41] = O));
  let k;
  return (
    t[42] !== w || t[43] !== O || t[44] !== p
      ? ((k = (0, M.jsxs)(`div`, { children: [p, w, O] })),
        (t[42] = w),
        (t[43] = O),
        (t[44] = p),
        (t[45] = k))
      : (k = t[45]),
    k
  );
}
function X(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2 py-1 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-700 truncate`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-emerald-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function Z(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2 py-1 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-700 truncate`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-purple-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function re(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2 py-1 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-700 truncate`,
          children: t || `—`,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-cyan-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function ie(e) {
  let [t, n, r] = e,
    i = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${i.bg} border ${i.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-3xl font-black ${i.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${i.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
var Q = 30;
function ae(e) {
  let t = (0, j.c)(30),
    { floorplan: n, cameras: r } = e,
    i = (0, A.useRef)(null),
    o = (0, A.useRef)(null),
    [s, c] = (0, A.useState)(null),
    l;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = function () {
        let e = i.current,
          t = o.current;
        if (!e || !t) {
          c(null);
          return;
        }
        c(
          a({
            containerWidth: e.clientWidth,
            containerHeight: e.clientHeight,
            imageNaturalWidth: t.naturalWidth,
            imageNaturalHeight: t.naturalHeight,
          }),
        );
      }),
      (t[0] = l))
    : (l = t[0]);
  let u = l,
    f;
  (t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = () => (
        window.addEventListener(`resize`, u),
        () => window.removeEventListener(`resize`, u)
      )),
      (t[1] = f))
    : (f = t[1]),
    (0, A.useEffect)(f));
  let p, m, g, _, v, y;
  if (
    t[2] !== s ||
    t[3] !== r ||
    t[4] !== n.id ||
    t[5] !== n.name ||
    t[6] !== n.url
  ) {
    let e;
    t[13] === n.id
      ? (e = t[14])
      : ((e = (e) => e.floorplanId === n.id && e.x != null && e.y != null),
        (t[13] = n.id),
        (t[14] = e));
    let a = r.filter(e);
    v = `mb-5`;
    let c;
    t[15] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((c = (0, M.jsx)(`i`, { className: `fas fa-map text-orange-400` })),
        (t[15] = c))
      : (c = t[15]);
    let l;
    (t[16] === n.name
      ? (l = t[17])
      : ((l = (0, M.jsxs)(`h5`, {
          className: `text-[11px] font-black text-slate-700 flex items-center gap-2`,
          children: [c, ` `, n.name],
        })),
        (t[16] = n.name),
        (t[17] = l)),
      (y = (0, M.jsxs)(`div`, {
        className: `flex items-center justify-between mb-2`,
        children: [
          l,
          (0, M.jsxs)(`span`, {
            className: `text-[9px] font-bold text-slate-400`,
            children: [a.length, ` camera`],
          }),
        ],
      })),
      (p = i),
      (m = `cctv-floorplan-snapshot`),
      t[18] !== n.name || t[19] !== n.url
        ? ((g = (0, M.jsx)(`img`, {
            ref: o,
            className: `cctv-floorplan-img`,
            src: n.url,
            alt: n.name,
            onLoad: u,
          })),
          (t[18] = n.name),
          (t[19] = n.url),
          (t[20] = g))
        : (g = t[20]),
      (_ =
        s &&
        a.map((e) => {
          let t = s.offsetX + ((e.x ?? 0) / 100) * s.renderedW,
            n = s.offsetY + ((e.y ?? 0) / 100) * s.renderedH,
            r = d(e),
            i = h(e.fov, Q);
          return (0, M.jsxs)(
            `div`,
            {
              className: `cctv-cam-pin cctv-cam-pin-snapshot`,
              style: {
                left: t,
                top: n,
                position: `absolute`,
                transform: `translate(-50%, -100%)`,
              },
              title: e.name,
              children: [
                (0, M.jsxs)(`div`, {
                  className: `cctv-cam-cone`,
                  style: { rotate: `${e.angle}deg` },
                  children: [
                    (0, M.jsx)(`div`, {
                      className: `cctv-cam-cone-shape`,
                      style: {
                        borderLeftWidth: i,
                        borderRightWidth: i,
                        borderBottomWidth: Q,
                      },
                    }),
                    (0, M.jsx)(`div`, {
                      className: `cctv-cam-rotate-handle`,
                      children: (0, M.jsx)(`i`, { className: `fas ${r.icon}` }),
                    }),
                  ],
                }),
                (0, M.jsx)(`span`, {
                  className: `cctv-cam-pin-snapshot-label`,
                  children: e.name,
                }),
              ],
            },
            e.id,
          );
        })),
      (t[2] = s),
      (t[3] = r),
      (t[4] = n.id),
      (t[5] = n.name),
      (t[6] = n.url),
      (t[7] = p),
      (t[8] = m),
      (t[9] = g),
      (t[10] = _),
      (t[11] = v),
      (t[12] = y));
  } else
    ((p = t[7]), (m = t[8]), (g = t[9]), (_ = t[10]), (v = t[11]), (y = t[12]));
  let b;
  t[21] !== p || t[22] !== m || t[23] !== g || t[24] !== _
    ? ((b = (0, M.jsxs)(`div`, { ref: p, className: m, children: [g, _] })),
      (t[21] = p),
      (t[22] = m),
      (t[23] = g),
      (t[24] = _),
      (t[25] = b))
    : (b = t[25]);
  let x;
  return (
    t[26] !== v || t[27] !== y || t[28] !== b
      ? ((x = (0, M.jsxs)(`div`, { className: v, children: [y, b] })),
        (t[26] = v),
        (t[27] = y),
        (t[28] = b),
        (t[29] = x))
      : (x = t[29]),
    x
  );
}
function oe(e) {
  let t = (0, j.c)(42),
    { cctvDB: n, nvrDB: r, networkDB: i, cctvFloorplans: a } = e,
    o,
    s,
    c;
  if (t[0] !== n || t[1] !== a || t[2] !== r) {
    let e = m(n, r),
      i;
    t[6] === n
      ? (i = t[7])
      : ((i = (e) => n.some((t) => t.floorplanId === e.id && t.x != null)),
        (t[6] = n),
        (t[7] = i));
    let l = a.filter(i),
      u = [
        [`orange`, e.total, `Tổng Camera`],
        [`indigo`, e.placed, `Đã đặt mặt bằng`],
        [`amber`, e.withNvr, `Kết nối NVR`],
        [`slate`, e.unplaced, `Chưa đặt`],
      ].map(le);
    t[8] === u
      ? (o = t[9])
      : ((o = (0, M.jsx)(`div`, {
          className: `stat-grid grid grid-cols-4 gap-4 mb-6`,
          children: u,
        })),
        (t[8] = u),
        (t[9] = o));
    let d;
    t[10] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-video text-orange-500` }),
            ` Loại Camera`,
          ],
        })),
        (t[10] = d))
      : (d = t[10]);
    let f;
    t[11] === e
      ? (f = t[12])
      : ((f =
          Object.keys(e.byKind).length === 0
            ? (0, M.jsx)(`p`, {
                className: `text-xs text-slate-400 italic`,
                children: `Chưa có`,
              })
            : Object.entries(e.byKind).map((t) => {
                let [n, r] = t,
                  i = e.total > 0 ? Math.round((r / e.total) * 100) : 0;
                return (0, M.jsxs)(
                  `div`,
                  {
                    className: `flex items-center gap-3 mb-2`,
                    children: [
                      (0, M.jsx)(`span`, {
                        className: `text-[10px] font-bold text-slate-600 w-28 shrink-0 truncate`,
                        children: n,
                      }),
                      (0, M.jsx)(`div`, {
                        className: `flex-1 bg-slate-100 rounded-full h-2 overflow-hidden`,
                        children: (0, M.jsx)(`div`, {
                          className: `h-full rounded-full bg-orange-400`,
                          style: { width: `${i}%` },
                        }),
                      }),
                      (0, M.jsxs)(`span`, {
                        className: `text-[10px] font-black text-slate-700 w-12 text-right`,
                        children: [
                          r,
                          ` `,
                          (0, M.jsxs)(`span`, {
                            className: `text-slate-400 font-normal`,
                            children: [`(`, i, `%)`],
                          }),
                        ],
                      }),
                    ],
                  },
                  n,
                );
              })),
        (t[11] = e),
        (t[12] = f));
    let p;
    t[13] === f
      ? (p = t[14])
      : ((p = (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
          children: [d, f],
        })),
        (t[13] = f),
        (t[14] = p));
    let h;
    t[15] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((h = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, {
              className: `fas fa-layer-group text-indigo-400`,
            }),
            ` Theo Tầng`,
          ],
        })),
        (t[15] = h))
      : (h = t[15]);
    let g;
    t[16] === e
      ? (g = t[17])
      : ((g =
          Object.keys(e.byFloor).length === 0
            ? (0, M.jsx)(`p`, {
                className: `text-xs text-slate-400 italic`,
                children: `Chưa có`,
              })
            : Object.entries(e.byFloor).map(ce)),
        (t[16] = e),
        (t[17] = g));
    let _;
    t[18] === g
      ? (_ = t[19])
      : ((_ = (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
          children: [
            h,
            (0, M.jsx)(`div`, {
              className: `space-y-1.5 max-h-40 overflow-y-auto custom-scroll`,
              children: g,
            }),
          ],
        })),
        (t[18] = g),
        (t[19] = _));
    let v;
    t[20] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((v = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-tags text-purple-400` }),
            ` Thương Hiệu`,
          ],
        })),
        (t[20] = v))
      : (v = t[20]);
    let y;
    t[21] === e
      ? (y = t[22])
      : ((y =
          Object.keys(e.byBrand).length === 0
            ? (0, M.jsx)(`p`, {
                className: `text-xs text-slate-400 italic`,
                children: `Chưa có`,
              })
            : Object.entries(e.byBrand).map(se)),
        (t[21] = e),
        (t[22] = y));
    let b;
    (t[23] === y
      ? (b = t[24])
      : ((b = (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
          children: [
            v,
            (0, M.jsx)(`div`, {
              className: `space-y-1.5 max-h-40 overflow-y-auto custom-scroll`,
              children: y,
            }),
          ],
        })),
        (t[23] = y),
        (t[24] = b)),
      t[25] !== _ || t[26] !== b || t[27] !== p
        ? ((s = (0, M.jsxs)(`div`, {
            className: `panel-grid grid grid-cols-3 gap-5 mb-6`,
            children: [p, _, b],
          })),
          (t[25] = _),
          (t[26] = b),
          (t[27] = p),
          (t[28] = s))
        : (s = t[28]),
      (c =
        l.length > 0 &&
        (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6`,
          children: [
            (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
              children: [
                (0, M.jsx)(`i`, {
                  className: `fas fa-map-location-dot text-orange-500`,
                }),
                ` Vị Trí Camera Trên Bản Vẽ`,
              ],
            }),
            l.map((e) => (0, M.jsx)(ae, { floorplan: e, cameras: n }, e.id)),
          ],
        })),
      (t[0] = n),
      (t[1] = a),
      (t[2] = r),
      (t[3] = o),
      (t[4] = s),
      (t[5] = c));
  } else ((o = t[3]), (s = t[4]), (c = t[5]));
  let l;
  t[29] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = (0, M.jsx)(`div`, {
        className: `p-4 border-b border-slate-100 bg-slate-50/50`,
        children: (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-list text-slate-400` }),
            ` Danh Sách Camera`,
          ],
        }),
      })),
      (t[29] = l))
    : (l = t[29]);
  let u;
  t[30] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((u = (0, M.jsx)(`thead`, {
        children: (0, M.jsxs)(`tr`, {
          className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
          children: [
            (0, M.jsx)(`th`, { className: `p-3 pl-4`, children: `Tên` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Tầng` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `IP` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `Switch` }),
            (0, M.jsx)(`th`, { className: `p-3`, children: `NVR` }),
          ],
        }),
      })),
      (t[30] = u))
    : (u = t[30]);
  let d;
  t[31] !== n || t[32] !== i || t[33] !== r
    ? ((d =
        n.length === 0
          ? (0, M.jsx)(`tr`, {
              children: (0, M.jsx)(`td`, {
                colSpan: 5,
                className: `p-4 text-center text-xs text-slate-400 italic`,
                children: `Chưa có Camera nào`,
              }),
            })
          : n.map((e) => {
              let t = _(e, i),
                n = e.nvrId ? r.find((t) => t.id === e.nvrId) : void 0;
              return (0, M.jsxs)(
                `tr`,
                {
                  className: `border-b border-slate-100 last:border-0 hover:bg-orange-50/20`,
                  children: [
                    (0, M.jsx)(`td`, {
                      className: `p-3 pl-4 text-xs font-bold text-slate-800`,
                      children: e.name,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-xs text-slate-600`,
                      children: e.floor || `—`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-xs font-mono text-indigo-600`,
                      children: e.ip || `—`,
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] font-bold`,
                      children: t
                        ? (0, M.jsxs)(`span`, {
                            className: `text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full`,
                            children: [
                              t.switchName,
                              t.port == null ? `` : ` · P${t.port}`,
                            ],
                          })
                        : (0, M.jsx)(`span`, {
                            className: `text-slate-300`,
                            children: `—`,
                          }),
                    }),
                    (0, M.jsx)(`td`, {
                      className: `p-3 text-[10px] font-bold`,
                      children: n
                        ? (0, M.jsxs)(`span`, {
                            className: `text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full`,
                            children: [
                              n.name,
                              e.channel == null ? `` : ` · CH${e.channel}`,
                            ],
                          })
                        : (0, M.jsx)(`span`, {
                            className: `text-slate-300`,
                            children: `—`,
                          }),
                    }),
                  ],
                },
                e.id,
              );
            })),
      (t[31] = n),
      (t[32] = i),
      (t[33] = r),
      (t[34] = d))
    : (d = t[34]);
  let f;
  t[35] === d
    ? (f = t[36])
    : ((f = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
        children: [
          l,
          (0, M.jsxs)(`table`, {
            className: `w-full text-left`,
            children: [u, (0, M.jsx)(`tbody`, { children: d })],
          }),
        ],
      })),
      (t[35] = d),
      (t[36] = f));
  let p;
  return (
    t[37] !== o || t[38] !== s || t[39] !== c || t[40] !== f
      ? ((p = (0, M.jsxs)(`div`, { children: [o, s, c, f] })),
        (t[37] = o),
        (t[38] = s),
        (t[39] = c),
        (t[40] = f),
        (t[41] = p))
      : (p = t[41]),
    p
  );
}
function se(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2 py-1 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-700 truncate`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-purple-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function ce(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2 py-1 bg-slate-50 rounded-lg border border-slate-100`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-700 truncate`,
          children: t || `—`,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-orange-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function le(e) {
  let [t, n, r] = e,
    i = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${i.bg} border ${i.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-3xl font-black ${i.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${i.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
function ue(e) {
  let t = (0, j.c)(19),
    { db: n, wifiDB: r, odfDB: i } = e,
    a,
    o,
    s,
    c;
  if (t[0] !== n || t[1] !== i || t[2] !== r) {
    let { outdoorSwitches: e, outdoorAPs: u } = l(n, r, i);
    a = e.length === 0 && u.length === 0;
    let d;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1`,
          children: `Outdoor Switches`,
        })),
        (t[7] = d))
      : (d = t[7]);
    let f = (0, M.jsxs)(`div`, {
        className: `bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-sm`,
        children: [
          (0, M.jsx)(`span`, {
            className: `text-3xl font-black text-slate-700`,
            children: e.length,
          }),
          d,
        ],
      }),
      p;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold text-cyan-400 uppercase tracking-widest mt-1`,
          children: `Outdoor APs`,
        })),
        (t[8] = p))
      : (p = t[8]);
    let m = (0, M.jsxs)(`div`, {
      className: `bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-3xl font-black text-cyan-600`,
          children: u.length,
        }),
        p,
      ],
    });
    (t[9] !== f || t[10] !== m
      ? ((o = (0, M.jsxs)(`div`, {
          className: `stat-grid grid grid-cols-2 gap-4 mb-6`,
          children: [f, m],
        })),
        (t[9] = f),
        (t[10] = m),
        (t[11] = o))
      : (o = t[11]),
      (s =
        e.length > 0 &&
        (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-5`,
          children: [
            (0, M.jsx)(`div`, {
              className: `p-4 border-b border-slate-100 bg-slate-50/50`,
              children: (0, M.jsxs)(`h4`, {
                className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
                children: [
                  (0, M.jsx)(`i`, {
                    className: `fas fa-server text-slate-500`,
                  }),
                  ` Switch Ngoài Trời`,
                ],
              }),
            }),
            (0, M.jsxs)(`table`, {
              className: `w-full text-left`,
              children: [
                (0, M.jsx)(`thead`, {
                  children: (0, M.jsxs)(`tr`, {
                    className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
                    children: [
                      (0, M.jsx)(`th`, {
                        className: `p-3 pl-4`,
                        children: `Tên`,
                      }),
                      (0, M.jsx)(`th`, {
                        className: `p-3`,
                        children: `Vị trí`,
                      }),
                      (0, M.jsx)(`th`, { className: `p-3`, children: `Brand` }),
                      (0, M.jsx)(`th`, { className: `p-3`, children: `IP` }),
                      (0, M.jsx)(`th`, {
                        className: `p-3`,
                        children: `ODF kết nối`,
                      }),
                    ],
                  }),
                }),
                (0, M.jsx)(`tbody`, { children: e.map(fe) }),
              ],
            }),
          ],
        })),
      (c =
        u.length > 0 &&
        (0, M.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
          children: [
            (0, M.jsx)(`div`, {
              className: `p-4 border-b border-cyan-100 bg-cyan-50/30`,
              children: (0, M.jsxs)(`h4`, {
                className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
                children: [
                  (0, M.jsx)(`i`, { className: `fas fa-wifi text-cyan-500` }),
                  ` AP Ngoài Trời`,
                ],
              }),
            }),
            (0, M.jsxs)(`table`, {
              className: `w-full text-left`,
              children: [
                (0, M.jsx)(`thead`, {
                  children: (0, M.jsxs)(`tr`, {
                    className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
                    children: [
                      (0, M.jsx)(`th`, {
                        className: `p-3 pl-4`,
                        children: `Tên`,
                      }),
                      (0, M.jsx)(`th`, {
                        className: `p-3`,
                        children: `Vị trí`,
                      }),
                      (0, M.jsx)(`th`, { className: `p-3`, children: `Type` }),
                      (0, M.jsx)(`th`, { className: `p-3`, children: `IP` }),
                      (0, M.jsx)(`th`, {
                        className: `p-3`,
                        children: `ODF kết nối`,
                      }),
                    ],
                  }),
                }),
                (0, M.jsx)(`tbody`, { children: u.map(de) }),
              ],
            }),
          ],
        })),
      (t[0] = n),
      (t[1] = i),
      (t[2] = r),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = c));
  } else ((a = t[3]), (o = t[4]), (s = t[5]), (c = t[6]));
  let u;
  t[12] === a
    ? (u = t[13])
    : ((u =
        a &&
        (0, M.jsxs)(`div`, {
          className: `flex flex-col items-center justify-center py-12 opacity-40`,
          children: [
            (0, M.jsx)(`i`, {
              className: `fas fa-tree text-5xl text-slate-300 mb-4`,
            }),
            (0, M.jsx)(`p`, {
              className: `text-sm font-bold text-slate-500`,
              children: `Chưa có thiết bị ngoài trời nào`,
            }),
          ],
        })),
      (t[12] = a),
      (t[13] = u));
  let d;
  return (
    t[14] !== o || t[15] !== s || t[16] !== c || t[17] !== u
      ? ((d = (0, M.jsxs)(`div`, { children: [o, s, c, u] })),
        (t[14] = o),
        (t[15] = s),
        (t[16] = c),
        (t[17] = u),
        (t[18] = d))
      : (d = t[18]),
    d
  );
}
function de(e) {
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-cyan-50/30`,
      children: [
        (0, M.jsx)(`td`, {
          className: `p-3 pl-4 text-xs font-black text-slate-800`,
          children: e.name,
        }),
        (0, M.jsxs)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: [e.floor, e.zone ? ` · ${e.zone}` : ``],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: e.type || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs font-mono text-indigo-600`,
          children: e.ip || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-[10px] font-bold`,
          children: e.odfName
            ? (0, M.jsx)(`span`, {
                className: `text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full`,
                children: e.odfName,
              })
            : (0, M.jsx)(`span`, {
                className: `text-slate-300`,
                children: `Chưa kết nối`,
              }),
        }),
      ],
    },
    e.id,
  );
}
function fe(e) {
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-emerald-50/30`,
      children: [
        (0, M.jsx)(`td`, {
          className: `p-3 pl-4 text-xs font-black text-slate-800`,
          children: e.name,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: e.floor,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: e.brand || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs font-mono text-indigo-600`,
          children: e.ip || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-[10px] font-bold`,
          children: e.odfName
            ? (0, M.jsx)(`span`, {
                className: `text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full`,
                children: e.odfName,
              })
            : (0, M.jsx)(`span`, {
                className: `text-slate-300`,
                children: `Chưa kết nối`,
              }),
        }),
      ],
    },
    e.id,
  );
}
function pe(e) {
  let t = (0, j.c)(29),
    { ipPhoneDB: n } = e,
    r,
    i,
    a,
    o,
    s,
    l,
    u;
  if (t[0] !== n) {
    let e = c(n);
    l = (0, M.jsx)(`div`, {
      className: `stat-grid grid grid-cols-4 gap-4 mb-6`,
      children: [
        [`green`, e.total, `Tổng máy`, `fa-phone-alt`],
        [`emerald`, e.active, `Active`, `fa-check-circle`],
        [`amber`, e.unregistered, `Unregistered`, `fa-exclamation-circle`],
        [`red`, e.offline, `Offline`, `fa-times-circle`],
      ].map(ve),
    });
    let d;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, { className: `fas fa-layer-group text-green-400` }),
            ` Phân bố theo Tầng`,
          ],
        })),
        (t[8] = d))
      : (d = t[8]);
    let f = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          d,
          (0, M.jsx)(`div`, {
            className: `space-y-2 max-h-48 overflow-y-auto custom-scroll`,
            children:
              Object.keys(e.byFloor).length === 0
                ? (0, M.jsx)(`p`, {
                    className: `text-xs text-slate-400 italic`,
                    children: `Chưa có`,
                  })
                : Object.entries(e.byFloor).sort(_e).map(ge),
          }),
        ],
      }),
      p;
    t[9] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, M.jsxs)(`h4`, {
          className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
          children: [
            (0, M.jsx)(`i`, {
              className: `fas fa-exclamation-triangle text-amber-400`,
            }),
            ` Máy chưa có extension`,
          ],
        })),
        (t[9] = p))
      : (p = t[9]);
    let m = (0, M.jsxs)(`div`, {
      className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
      children: [
        p,
        (0, M.jsx)(`div`, {
          className: `space-y-2 max-h-48 overflow-y-auto custom-scroll`,
          children:
            e.missingExtension.length === 0
              ? (0, M.jsx)(`p`, {
                  className: `text-xs text-emerald-600 font-bold italic`,
                  children: `✓ Tất cả đã có extension`,
                })
              : e.missingExtension.map(he),
        }),
      ],
    });
    (t[10] !== m || t[11] !== f
      ? ((u = (0, M.jsxs)(`div`, {
          className: `panel-grid grid grid-cols-2 gap-5 mb-6`,
          children: [f, m],
        })),
        (t[10] = m),
        (t[11] = f),
        (t[12] = u))
      : (u = t[12]),
      (o = `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`),
      t[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = (0, M.jsx)(`div`, {
            className: `p-4 border-b border-slate-100 bg-slate-50/50`,
            children: (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
              children: [
                (0, M.jsx)(`i`, { className: `fas fa-list text-slate-400` }),
                ` Danh Sách Đầy Đủ`,
              ],
            }),
          })),
          (t[13] = s))
        : (s = t[13]),
      (i = `w-full text-left`),
      t[14] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, M.jsx)(`thead`, {
            children: (0, M.jsxs)(`tr`, {
              className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200`,
              children: [
                (0, M.jsx)(`th`, { className: `p-3 pl-4`, children: `Nhánh` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Tên` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `IP` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Model` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Tầng` }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Trạng thái` }),
              ],
            }),
          })),
          (t[14] = a))
        : (a = t[14]),
      (r =
        e.sorted.length === 0
          ? (0, M.jsx)(`tr`, {
              children: (0, M.jsx)(`td`, {
                colSpan: 6,
                className: `p-4 text-center text-xs text-slate-400 italic`,
                children: `Chưa có dữ liệu`,
              }),
            })
          : e.sorted.map(me)),
      (t[0] = n),
      (t[1] = r),
      (t[2] = i),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = l),
      (t[7] = u));
  } else
    ((r = t[1]),
      (i = t[2]),
      (a = t[3]),
      (o = t[4]),
      (s = t[5]),
      (l = t[6]),
      (u = t[7]));
  let d;
  t[15] === r
    ? (d = t[16])
    : ((d = (0, M.jsx)(`tbody`, { children: r })), (t[15] = r), (t[16] = d));
  let f;
  t[17] !== i || t[18] !== a || t[19] !== d
    ? ((f = (0, M.jsxs)(`table`, { className: i, children: [a, d] })),
      (t[17] = i),
      (t[18] = a),
      (t[19] = d),
      (t[20] = f))
    : (f = t[20]);
  let p;
  t[21] !== o || t[22] !== s || t[23] !== f
    ? ((p = (0, M.jsxs)(`div`, { className: o, children: [s, f] })),
      (t[21] = o),
      (t[22] = s),
      (t[23] = f),
      (t[24] = p))
    : (p = t[24]);
  let m;
  return (
    t[25] !== p || t[26] !== l || t[27] !== u
      ? ((m = (0, M.jsxs)(`div`, { children: [l, u, p] })),
        (t[25] = p),
        (t[26] = l),
        (t[27] = u),
        (t[28] = m))
      : (m = t[28]),
    m
  );
}
function me(e) {
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-green-50/20`,
      children: [
        (0, M.jsx)(`td`, {
          className: `p-3 pl-4`,
          children: (0, M.jsx)(`span`, {
            className: `text-xs font-black text-green-700 bg-green-50 px-1.5 py-0.5 rounded`,
            children: e.extension || `—`,
          }),
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs font-bold text-slate-800`,
          children: e.name || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs font-mono text-indigo-600`,
          children: e.ip || `—`,
        }),
        (0, M.jsxs)(`td`, {
          className: `p-3 text-[10px] text-slate-500`,
          children: [e.brand ? `${e.brand} ` : ``, e.model || `—`],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-xs text-slate-600`,
          children: e.floor || `—`,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3`,
          children: (0, M.jsx)(`span`, {
            className: `text-[9px] font-black px-1.5 py-0.5 rounded-full ${e.status === `active` ? `bg-emerald-100 text-emerald-700` : e.status === `offline` ? `bg-red-100 text-red-700` : `bg-amber-100 text-amber-700`}`,
            children: e.status,
          }),
        }),
      ],
    },
    e.id,
  );
}
function he(e) {
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2.5 py-1.5 bg-amber-50 border border-amber-100 rounded-lg`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-amber-700 truncate`,
          children: e.name || e.ip || `—`,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[9px] font-bold text-amber-500`,
          children: e.floor || `—`,
        }),
      ],
    },
    e.id,
  );
}
function ge(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex justify-between px-2.5 py-1.5 bg-slate-50 border border-slate-100 rounded-lg`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-700 truncate`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-[10px] font-black text-green-600 shrink-0`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function _e(e, t) {
  let [n] = e,
    [r] = t;
  return n.localeCompare(r);
}
function ve(e) {
  let [t, n, r, i] = e,
    a = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${a.bg} border ${a.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`i`, { className: `fas ${i} ${a.text} text-lg mb-2` }),
        (0, M.jsx)(`div`, {
          className: `text-3xl font-black ${a.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${a.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
function ye(e) {
  let t = (0, j.c)(34),
    { kroneDB: n } = e,
    r,
    i,
    a,
    o,
    s,
    c,
    l,
    u,
    d;
  if (t[0] !== n) {
    d = Symbol.for(`react.early_return_sentinel`);
    bb0: {
      let e = S(n);
      if (n.length === 0) {
        let e;
        (t[10] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, M.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-16 text-slate-300`,
              children: [
                (0, M.jsx)(`i`, { className: `fas fa-th text-4xl mb-3` }),
                (0, M.jsx)(`p`, {
                  className: `text-sm font-bold`,
                  children: `Chưa có dữ liệu Krone`,
                }),
              ],
            })),
            (t[10] = e))
          : (e = t[10]),
          (d = e));
        break bb0;
      }
      ((u = (0, M.jsx)(`div`, {
        className: `stat-grid grid grid-cols-4 gap-4 mb-6`,
        children: [
          [`indigo`, e.totalKrones, `Tổng Krone`, `fa-th`],
          [`emerald`, e.totalOk, `Đang dùng`, `fa-check-circle`],
          [`red`, e.totalFault, `Lỗi / Hỏng`, `fa-exclamation-triangle`],
          [`slate`, e.totalEmpty, `Trống`, `fa-circle`],
        ].map(Ce),
      })),
        (c = `panel-grid grid grid-cols-2 gap-5 mb-6`));
      let f;
      t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((f = (0, M.jsx)(`div`, {
            className: `p-4 border-b border-slate-100 bg-slate-50/50`,
            children: (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
              children: [
                (0, M.jsx)(`i`, {
                  className: `fas fa-layer-group text-indigo-400`,
                }),
                ` Phân bố theo Tầng`,
              ],
            }),
          })),
          (t[11] = f))
        : (f = t[11]);
      let p;
      t[12] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((p = (0, M.jsx)(`thead`, {
            children: (0, M.jsxs)(`tr`, {
              className: `bg-slate-50 text-[9px] font-black text-slate-400 uppercase border-b border-slate-200`,
              children: [
                (0, M.jsx)(`th`, { className: `p-3 pl-4`, children: `Tầng` }),
                (0, M.jsx)(`th`, {
                  className: `p-3 text-center`,
                  children: `Krone`,
                }),
                (0, M.jsx)(`th`, {
                  className: `p-3 text-center`,
                  children: `Có phòng`,
                }),
                (0, M.jsx)(`th`, {
                  className: `p-3 text-center`,
                  children: `Lỗi`,
                }),
                (0, M.jsx)(`th`, {
                  className: `p-3 text-center`,
                  children: `Trống`,
                }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Sử dụng` }),
              ],
            }),
          })),
          (t[12] = p))
        : (p = t[12]);
      let m = (0, M.jsxs)(`table`, {
        className: `w-full text-left`,
        children: [
          p,
          (0, M.jsx)(`tbody`, {
            children: Object.entries(e.byFloor).sort(Se).map(xe),
          }),
        ],
      });
      (t[13] === m
        ? (l = t[14])
        : ((l = (0, M.jsxs)(`div`, {
            className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
            children: [f, m],
          })),
          (t[13] = m),
          (t[14] = l)),
        (o = `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`));
      let h;
      t[15] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, M.jsx)(`i`, {
            className: `fas fa-exclamation-triangle text-red-400`,
          })),
          (t[15] = h))
        : (h = t[15]);
      let g =
        e.faultList.length > 0 &&
        (0, M.jsxs)(`span`, {
          className: `text-[9px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-600`,
          children: [e.faultList.length, ` port`],
        });
      (t[16] === g
        ? (s = t[17])
        : ((s = (0, M.jsx)(`div`, {
            className: `p-4 border-b border-red-100 bg-red-50/30`,
            children: (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
              children: [h, ` Danh sách Port Lỗi`, g],
            }),
          })),
          (t[16] = g),
          (t[17] = s)),
        (r = `overflow-y-auto custom-scroll`),
        t[18] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((i = { maxHeight: 220 }), (t[18] = i))
          : (i = t[18]),
        (a =
          e.faultList.length === 0
            ? (0, M.jsx)(`p`, {
                className: `p-4 text-xs text-emerald-600 font-bold italic`,
                children: `✓ Không có port lỗi nào`,
              })
            : e.faultList.map(be)));
    }
    ((t[0] = n),
      (t[1] = r),
      (t[2] = i),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = c),
      (t[7] = l),
      (t[8] = u),
      (t[9] = d));
  } else
    ((r = t[1]),
      (i = t[2]),
      (a = t[3]),
      (o = t[4]),
      (s = t[5]),
      (c = t[6]),
      (l = t[7]),
      (u = t[8]),
      (d = t[9]));
  if (d !== Symbol.for(`react.early_return_sentinel`)) return d;
  let f;
  t[19] !== r || t[20] !== i || t[21] !== a
    ? ((f = (0, M.jsx)(`div`, { className: r, style: i, children: a })),
      (t[19] = r),
      (t[20] = i),
      (t[21] = a),
      (t[22] = f))
    : (f = t[22]);
  let p;
  t[23] !== f || t[24] !== o || t[25] !== s
    ? ((p = (0, M.jsxs)(`div`, { className: o, children: [s, f] })),
      (t[23] = f),
      (t[24] = o),
      (t[25] = s),
      (t[26] = p))
    : (p = t[26]);
  let m;
  t[27] !== p || t[28] !== c || t[29] !== l
    ? ((m = (0, M.jsxs)(`div`, { className: c, children: [l, p] })),
      (t[27] = p),
      (t[28] = c),
      (t[29] = l),
      (t[30] = m))
    : (m = t[30]);
  let h;
  return (
    t[31] !== m || t[32] !== u
      ? ((h = (0, M.jsxs)(`div`, { children: [u, m] })),
        (t[31] = m),
        (t[32] = u),
        (t[33] = h))
      : (h = t[33]),
    h
  );
}
function be(e, t) {
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex items-center gap-3 px-4 py-2.5 border-b border-slate-50 last:border-0 hover:bg-red-50/30`,
      children: [
        (0, M.jsx)(`div`, {
          className: `w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0`,
          children: (0, M.jsx)(`i`, {
            className: `fas fa-exclamation-triangle text-red-400 text-[9px]`,
          }),
        }),
        (0, M.jsxs)(`div`, {
          className: `flex-1 min-w-0`,
          children: [
            (0, M.jsxs)(`div`, {
              className: `text-xs font-bold text-slate-700`,
              children: [e.floor, ` · Krone #`, e.krone, ` · Port `, e.port],
            }),
            (0, M.jsxs)(`div`, {
              className: `text-[10px] text-slate-400`,
              children: [e.room, e.note ? ` · ${e.note}` : ``],
            }),
          ],
        }),
      ],
    },
    t,
  );
}
function xe(e) {
  let [t, n] = e,
    r = n.ok + n.fault,
    i = n.krones * 10,
    a = i > 0 ? Math.round((r / i) * 100) : 0;
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-indigo-50/20`,
      children: [
        (0, M.jsx)(`td`, {
          className: `p-3 pl-4 text-xs font-bold text-slate-800`,
          children: t,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-center text-xs font-black text-indigo-600`,
          children: n.krones,
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-center`,
          children: (0, M.jsxs)(`span`, {
            className: `text-xs font-black text-emerald-600`,
            children: [`✓ `, n.ok],
          }),
        }),
        (0, M.jsx)(`td`, {
          className: `p-3 text-center`,
          children: (0, M.jsxs)(`span`, {
            className: `text-xs font-black ${n.fault > 0 ? `text-red-500` : `text-slate-300`}`,
            children: [`⚠ `, n.fault],
          }),
        }),
        (0, M.jsxs)(`td`, {
          className: `p-3 text-center text-xs text-slate-400`,
          children: [`○ `, n.empty],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3`,
          children: (0, M.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, M.jsx)(`div`, {
                className: `flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden`,
                children: (0, M.jsx)(`div`, {
                  className: `h-full rounded-full ${a > 80 ? `bg-emerald-500` : a > 40 ? `bg-indigo-400` : `bg-slate-300`}`,
                  style: { width: `${a}%` },
                }),
              }),
              (0, M.jsxs)(`span`, {
                className: `text-[9px] font-black text-slate-400 w-7 text-right`,
                children: [a, `%`],
              }),
            ],
          }),
        }),
      ],
    },
    t,
  );
}
function Se(e, t) {
  let [n] = e,
    [r] = t;
  return n.localeCompare(r, `vi`);
}
function Ce(e) {
  let [t, n, r, i] = e,
    a = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${a.bg} border ${a.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`i`, { className: `fas ${i} ${a.text} text-lg mb-2` }),
        (0, M.jsx)(`div`, {
          className: `text-3xl font-black ${a.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${a.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
function we(e) {
  let t = (0, j.c)(41),
    { frameDB: n, ontDB: r } = e,
    i,
    a,
    o,
    s,
    c,
    l,
    u,
    d,
    f,
    m;
  if (t[0] !== n || t[1] !== r) {
    m = Symbol.for(`react.early_return_sentinel`);
    bb0: {
      if (((i = p(n, r)), i.totalOnts === 0)) {
        let e;
        (t[12] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, M.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-16 text-slate-300`,
              children: [
                (0, M.jsx)(`i`, {
                  className: `fas fa-code-branch text-4xl mb-3`,
                }),
                (0, M.jsx)(`p`, {
                  className: `text-sm font-bold`,
                  children: `Chưa có dữ liệu GPON`,
                }),
              ],
            })),
            (t[12] = e))
          : (e = t[12]),
          (m = e));
        break bb0;
      }
      ((f = (0, M.jsx)(`div`, {
        className: `stat-grid grid grid-cols-4 gap-4 mb-6`,
        children: [
          [`purple`, i.totalOnts, `Tổng ONT`, `fa-code-branch`],
          [`emerald`, i.totalOnline, `Online`, `fa-check-circle`],
          [`slate`, i.totalOffline, `Offline`, `fa-circle`],
          [`red`, i.totalLos, `Mất tín hiệu (LOS)`, `fa-exclamation-triangle`],
        ].map(Oe),
      })),
        (u = `panel-grid grid grid-cols-2 gap-5 mb-6`));
      let e;
      t[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, M.jsx)(`div`, {
            className: `p-4 border-b border-slate-100 bg-slate-50/50`,
            children: (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
              children: [
                (0, M.jsx)(`i`, {
                  className: `fas fa-sitemap text-purple-400`,
                }),
                ` Tỷ lệ lấp đầy Splitter theo Port`,
              ],
            }),
          })),
          (t[13] = e))
        : (e = t[13]);
      let h;
      t[14] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = { maxHeight: 260 }), (t[14] = h))
        : (h = t[14]);
      let g;
      t[15] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, M.jsx)(`thead`, {
            children: (0, M.jsxs)(`tr`, {
              className: `bg-slate-50 text-[9px] font-black text-slate-400 uppercase border-b border-slate-200 sticky top-0`,
              children: [
                (0, M.jsx)(`th`, {
                  className: `p-3 pl-4`,
                  children: `Frame / Slot / Port`,
                }),
                (0, M.jsx)(`th`, {
                  className: `p-3 text-center`,
                  children: `ONT`,
                }),
                (0, M.jsx)(`th`, { className: `p-3`, children: `Lấp đầy` }),
              ],
            }),
          })),
          (t[15] = g))
        : (g = t[15]);
      let _ = (0, M.jsxs)(`table`, {
        className: `w-full text-left`,
        children: [g, (0, M.jsx)(`tbody`, { children: i.portFill.map(De) })],
      });
      (t[16] === _
        ? (d = t[17])
        : ((d = (0, M.jsxs)(`div`, {
            className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`,
            children: [
              e,
              (0, M.jsx)(`div`, {
                className: `overflow-y-auto custom-scroll`,
                style: h,
                children: _,
              }),
            ],
          })),
          (t[16] = _),
          (t[17] = d)),
        (c = `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden`));
      let v;
      t[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, M.jsx)(`i`, {
            className: `fas fa-exclamation-triangle text-red-400`,
          })),
          (t[18] = v))
        : (v = t[18]);
      let y =
        i.losList.length > 0 &&
        (0, M.jsxs)(`span`, {
          className: `text-[9px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-600`,
          children: [i.losList.length, ` ONT`],
        });
      (t[19] === y
        ? (l = t[20])
        : ((l = (0, M.jsx)(`div`, {
            className: `p-4 border-b border-red-100 bg-red-50/30`,
            children: (0, M.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`,
              children: [v, ` ONT mất tín hiệu (LOS)`, y],
            }),
          })),
          (t[19] = y),
          (t[20] = l)),
        (a = `overflow-y-auto custom-scroll`),
        t[21] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((o = { maxHeight: 220 }), (t[21] = o))
          : (o = t[21]),
        (s =
          i.losList.length === 0
            ? (0, M.jsx)(`p`, {
                className: `p-4 text-xs text-emerald-600 font-bold italic`,
                children: `✓ Không có ONT nào mất tín hiệu`,
              })
            : i.losList.map(Ee)));
    }
    ((t[0] = n),
      (t[1] = r),
      (t[2] = i),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = c),
      (t[7] = l),
      (t[8] = u),
      (t[9] = d),
      (t[10] = f),
      (t[11] = m));
  } else
    ((i = t[2]),
      (a = t[3]),
      (o = t[4]),
      (s = t[5]),
      (c = t[6]),
      (l = t[7]),
      (u = t[8]),
      (d = t[9]),
      (f = t[10]),
      (m = t[11]));
  if (m !== Symbol.for(`react.early_return_sentinel`)) return m;
  let h;
  t[22] !== a || t[23] !== o || t[24] !== s
    ? ((h = (0, M.jsx)(`div`, { className: a, style: o, children: s })),
      (t[22] = a),
      (t[23] = o),
      (t[24] = s),
      (t[25] = h))
    : (h = t[25]);
  let g;
  t[26] !== h || t[27] !== c || t[28] !== l
    ? ((g = (0, M.jsxs)(`div`, { className: c, children: [l, h] })),
      (t[26] = h),
      (t[27] = c),
      (t[28] = l),
      (t[29] = g))
    : (g = t[29]);
  let _;
  t[30] !== g || t[31] !== u || t[32] !== d
    ? ((_ = (0, M.jsxs)(`div`, { className: u, children: [d, g] })),
      (t[30] = g),
      (t[31] = u),
      (t[32] = d),
      (t[33] = _))
    : (_ = t[33]);
  let v;
  t[34] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = (0, M.jsxs)(`h4`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2`,
        children: [
          (0, M.jsx)(`i`, {
            className: `fas fa-broadcast-tower text-purple-400`,
          }),
          ` Nhà cung cấp (theo cổng TV/WiFi)`,
        ],
      })),
      (t[34] = v))
    : (v = t[34]);
  let y;
  t[35] === i.providerCounts
    ? (y = t[36])
    : ((y = (0, M.jsxs)(`div`, {
        className: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`,
        children: [
          v,
          Object.keys(i.providerCounts).length === 0
            ? (0, M.jsx)(`p`, {
                className: `text-xs text-slate-400 italic`,
                children: `Chưa gán nhà cung cấp cho cổng nào`,
              })
            : (0, M.jsx)(`div`, {
                className: `flex gap-3 flex-wrap`,
                children: Object.entries(i.providerCounts).map(Te),
              }),
        ],
      })),
      (t[35] = i.providerCounts),
      (t[36] = y));
  let b;
  return (
    t[37] !== _ || t[38] !== y || t[39] !== f
      ? ((b = (0, M.jsxs)(`div`, { children: [f, _, y] })),
        (t[37] = _),
        (t[38] = y),
        (t[39] = f),
        (t[40] = b))
      : (b = t[40]),
    b
  );
}
function Te(e) {
  let [t, n] = e;
  return (0, M.jsxs)(
    `div`,
    {
      className: `px-4 py-2 bg-purple-50 border border-purple-100 rounded-lg flex items-center gap-2`,
      children: [
        (0, M.jsx)(`span`, {
          className: `text-xs font-bold text-purple-700`,
          children: t,
        }),
        (0, M.jsx)(`span`, {
          className: `text-xs font-black text-purple-500`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function Ee(e) {
  return (0, M.jsxs)(
    `div`,
    {
      className: `flex items-center gap-3 px-4 py-2.5 border-b border-slate-50 last:border-0 hover:bg-red-50/30`,
      children: [
        (0, M.jsx)(`div`, {
          className: `w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0`,
          children: (0, M.jsx)(`i`, {
            className: `fas fa-exclamation-triangle text-red-400 text-[9px]`,
          }),
        }),
        (0, M.jsxs)(`div`, {
          className: `flex-1 min-w-0`,
          children: [
            (0, M.jsx)(`div`, {
              className: `text-xs font-bold text-slate-700`,
              children: e.room,
            }),
            (0, M.jsx)(`div`, {
              className: `text-[10px] text-slate-400`,
              children: e.breadcrumb,
            }),
          ],
        }),
      ],
    },
    e.id,
  );
}
function De(e) {
  let t = e.capacity > 0 ? Math.round((e.used / e.capacity) * 100) : 0;
  return (0, M.jsxs)(
    `tr`,
    {
      className: `border-b border-slate-100 last:border-0 hover:bg-purple-50/20`,
      children: [
        (0, M.jsx)(`td`, {
          className: `p-3 pl-4 text-xs font-bold text-slate-800`,
          children: e.breadcrumb,
        }),
        (0, M.jsxs)(`td`, {
          className: `p-3 text-center text-xs font-black text-purple-600`,
          children: [e.used, `/`, e.capacity],
        }),
        (0, M.jsx)(`td`, {
          className: `p-3`,
          children: (0, M.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, M.jsx)(`div`, {
                className: `flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden`,
                children: (0, M.jsx)(`div`, {
                  className: `h-full rounded-full ${t >= 100 ? `bg-red-500` : t > 80 ? `bg-amber-500` : `bg-purple-400`}`,
                  style: { width: `${Math.min(t, 100)}%` },
                }),
              }),
              (0, M.jsxs)(`span`, {
                className: `text-[9px] font-black text-slate-400 w-7 text-right`,
                children: [t, `%`],
              }),
            ],
          }),
        }),
      ],
    },
    e.breadcrumb,
  );
}
function Oe(e) {
  let [t, n, r, i] = e,
    a = O(t);
  return (0, M.jsxs)(
    `div`,
    {
      className: `${a.bg} border ${a.border} rounded-xl p-4 text-center shadow-sm`,
      children: [
        (0, M.jsx)(`i`, { className: `fas ${i} ${a.text} text-lg mb-2` }),
        (0, M.jsx)(`div`, {
          className: `text-3xl font-black ${a.text}`,
          children: n,
        }),
        (0, M.jsx)(`p`, {
          className: `text-[10px] font-bold ${a.text} uppercase tracking-widest mt-1`,
          children: r,
        }),
      ],
    },
    r,
  );
}
function ke({ db: e, username: t }) {
  let n = g((e) => e.saveSwitchBackup),
    r = g((e) => e.bulkMarkBrandBackup),
    i = g((e) => e.addGlobalLog),
    [a, o] = (0, A.useState)(`all`),
    [s, c] = (0, A.useState)(null),
    [l, d] = (0, A.useState)(null),
    p = [];
  e.forEach((e) =>
    e.switches.forEach((t) => p.push({ sw: t, floor: e.floor })),
  );
  let { nOk: m, nWarn: h, nOld: _, nNever: y, nFailed: b } = w(e),
    x = p;
  (a === `never` &&
    (x = p.filter(({ sw: e }) => !e.backup || !e.backup.status)),
    a === `old` &&
      (x = p.filter(({ sw: e }) => {
        let t = u(e.backup?.date);
        return t !== null && t > 30 && e.backup?.status === `ok`;
      })),
    a === `failed` &&
      (x = p.filter(({ sw: e }) => e.backup?.status === `failed`)),
    a === `warning` &&
      (x = p.filter(({ sw: e }) => {
        let t = u(e.backup?.date);
        return t !== null && t > 7 && t <= 30 && e.backup?.status === `ok`;
      })));
  let S = {};
  x.forEach(({ sw: e, floor: t }) => {
    let n = e.brand || `Unknown`;
    (S[n] || (S[n] = { color: e.color || `#64748b`, items: [] }),
      S[n].items.push({ sw: e, floor: t }));
  });
  let T = Object.keys(S).sort(),
    k = [
      [`all`, `Tất cả`, p.length],
      [`never`, `Chưa backup`, y],
      [`warning`, `8–30 ngày`, h],
      [`old`, `> 30 ngày`, _],
      [`failed`, `Thất bại`, b],
    ];
  return (0, M.jsxs)(`div`, {
    children: [
      (0, M.jsx)(`div`, {
        className: `stat-grid grid grid-cols-5 gap-3 mb-6`,
        children: [
          [`emerald`, m, `Đã backup (≤7 ngày)`, `fa-check-circle`],
          [`amber`, h, `8–30 ngày`, `fa-clock`],
          [`purple`, _, `> 30 ngày`, `fa-hourglass-end`],
          [`red`, b, `Thất bại`, `fa-times-circle`],
          [`slate`, y, `Chưa backup`, `fa-question-circle`],
        ].map(([e, t, n, r]) => {
          let i = O(e);
          return (0, M.jsxs)(
            `div`,
            {
              className: `${i.bg} border ${i.border} rounded-xl p-4 text-center shadow-sm`,
              children: [
                (0, M.jsx)(`i`, {
                  className: `fas ${r} ${i.text} text-lg mb-2`,
                }),
                (0, M.jsx)(`div`, {
                  className: `text-3xl font-black ${i.text}`,
                  children: t,
                }),
                (0, M.jsx)(`p`, {
                  className: `text-[10px] font-bold ${i.text} uppercase tracking-widest mt-1`,
                  children: n,
                }),
              ],
            },
            n,
          );
        }),
      }),
      (0, M.jsx)(`div`, {
        className: `flex flex-wrap gap-2 mb-4`,
        children: k.map(([e, t, n]) =>
          (0, M.jsxs)(
            `button`,
            {
              onClick: () => o(e),
              className: `px-3 py-1.5 text-[10px] font-black rounded-lg border transition-all ${a === e ? `bg-indigo-600 text-white border-indigo-600` : `bg-white text-slate-600 border-slate-200 hover:border-indigo-300`}`,
              children: [
                t,
                ` `,
                (0, M.jsx)(`span`, {
                  className: `ml-1 opacity-70`,
                  children: n,
                }),
              ],
            },
            e,
          ),
        ),
      }),
      T.map((e) => {
        let { color: n, items: a } = S[e],
          o = 0,
          s = 0;
        return (
          a.forEach(({ sw: e }) => {
            let t = f(e.backup);
            t.icon === `✅` ? o++ : t.icon !== `⏭️` && s++;
          }),
          (0, M.jsxs)(
            `div`,
            {
              className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-4`,
              children: [
                (0, M.jsxs)(`div`, {
                  className: `px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 flex-wrap`,
                  style: { borderLeft: `4px solid ${n}` },
                  children: [
                    (0, M.jsx)(`span`, {
                      className: `text-xs font-black text-slate-800`,
                      children: e,
                    }),
                    (0, M.jsxs)(`span`, {
                      className: `text-[10px] text-slate-400`,
                      children: [a.length, ` switch`],
                    }),
                    (0, M.jsx)(`span`, {
                      className: `text-slate-300 text-[10px]`,
                      children: `·`,
                    }),
                    (0, M.jsxs)(`span`, {
                      className: `text-[10px] font-bold text-emerald-600`,
                      children: [`✅ `, o, ` OK`],
                    }),
                    s > 0 &&
                      (0, M.jsxs)(`span`, {
                        className: `text-[10px] font-bold text-red-500`,
                        children: [`⚠️ `, s, ` cần backup`],
                      }),
                    (0, M.jsxs)(`button`, {
                      onClick: () => {
                        let n = r(e, t);
                        i(
                          `Bulk Backup · ${e}`,
                          `Đánh dấu backup toàn bộ ${n} switch ${e}`,
                          t,
                          C(),
                        );
                      },
                      className: `ml-auto px-3 py-1.5 text-[9px] font-black bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-all flex items-center gap-1`,
                      children: [
                        (0, M.jsx)(`i`, {
                          className: `fas fa-check-double text-[8px]`,
                        }),
                        ` Đánh dấu tất cả `,
                        e,
                        ` đã backup hôm nay`,
                      ],
                    }),
                  ],
                }),
                (0, M.jsxs)(`table`, {
                  className: `w-full text-left`,
                  children: [
                    (0, M.jsx)(`thead`, {
                      children: (0, M.jsxs)(`tr`, {
                        className: `bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-wide border-b border-slate-100`,
                        children: [
                          (0, M.jsx)(`th`, {
                            className: `p-2 pl-4 w-8`,
                            children: `ST`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `Tên / Tầng`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `IP Address`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `Model`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `Trạng thái`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `Method`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `File`,
                          }),
                          (0, M.jsx)(`th`, {
                            className: `p-2`,
                            children: `Bởi`,
                          }),
                          (0, M.jsx)(`th`, { className: `p-2` }),
                        ],
                      }),
                    }),
                    (0, M.jsx)(`tbody`, {
                      children: a.map(({ sw: e, floor: t }) => {
                        let n = f(e.backup),
                          r = e.backup;
                        return (0, M.jsxs)(
                          `tr`,
                          {
                            className: `border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors`,
                            children: [
                              (0, M.jsx)(`td`, {
                                className: `p-2 pl-4`,
                                children: (0, M.jsx)(`span`, {
                                  className: `text-base`,
                                  title: n.label,
                                  children: n.icon,
                                }),
                              }),
                              (0, M.jsxs)(`td`, {
                                className: `p-2`,
                                children: [
                                  (0, M.jsx)(`span`, {
                                    className: `text-xs font-bold text-slate-800`,
                                    children: e.name,
                                  }),
                                  e.isCore &&
                                    (0, M.jsx)(`span`, {
                                      className: `ml-1.5 text-[8px] font-black bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full`,
                                      children: `CORE`,
                                    }),
                                  (0, M.jsx)(`p`, {
                                    className: `text-[9px] text-slate-400 mt-0.5`,
                                    children: t,
                                  }),
                                ],
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2 font-mono text-xs font-bold text-indigo-600`,
                                children: e.ip || `—`,
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2 text-[10px] text-slate-500`,
                                children: e.model || `—`,
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2`,
                                children: (0, M.jsx)(`span`, {
                                  className: `text-[10px] font-black px-2 py-0.5 rounded-full border ${n.bgClass} ${n.textClass}`,
                                  children: n.label,
                                }),
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2 text-[9px] text-slate-400 font-mono`,
                                children: r?.method || `—`,
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2 text-[9px] text-slate-400 truncate max-w-[120px]`,
                                title: r?.configFile || ``,
                                children: r?.configFile || `—`,
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2 text-[9px] text-slate-400`,
                                children: r?.by || `—`,
                              }),
                              (0, M.jsx)(`td`, {
                                className: `p-2`,
                                children: (0, M.jsxs)(`div`, {
                                  className: `flex items-center gap-1`,
                                  children: [
                                    (0, M.jsx)(`button`, {
                                      onClick: () => c(e),
                                      className: `px-2 py-1 text-[9px] font-black bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all`,
                                      children: `Cập nhật`,
                                    }),
                                    r?.logs &&
                                      r.logs.length > 0 &&
                                      (0, M.jsx)(`button`, {
                                        onClick: () => d(e),
                                        className: `px-2 py-1 text-[9px] font-black bg-slate-50 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-100 transition-all`,
                                        title: `Lịch sử`,
                                        children: `🕐`,
                                      }),
                                  ],
                                }),
                              }),
                            ],
                          },
                          e.id,
                        );
                      }),
                    }),
                  ],
                }),
              ],
            },
            e,
          )
        );
      }),
      s &&
        (0, M.jsx)(E, {
          sw: s,
          onClose: () => c(null),
          onSave: (e) => {
            (n(s.id, e),
              i(`Backup · ${s.name}`, v(s, e), e.by || `system`, e.date),
              c(null));
          },
        }),
      l && (0, M.jsx)(D, { sw: l, onClose: () => d(null) }),
    ],
  });
}
var $ = [
  { id: `switch`, label: `Switch & Mạng`, icon: `fa-server` },
  { id: `odf`, label: `ODF & Cáp quang`, icon: `fa-network-wired` },
  { id: `wifi`, label: `WiFi & AP`, icon: `fa-wifi` },
  { id: `cctv`, label: `CCTV & Camera`, icon: `fa-video` },
  { id: `outdoor`, label: `Thiết bị Outdoor`, icon: `fa-tree` },
  { id: `ipphone`, label: `Điện Thoại IP`, icon: `fa-phone-alt` },
  { id: `krone`, label: `Krone Analog`, icon: `fa-th` },
  { id: `gpon`, label: `GPON`, icon: `fa-code-branch` },
  { id: `backup`, label: `Backup SW`, icon: `fa-box-archive` },
];
function Ae(e) {
  let t = (0, j.c)(76),
    { initialTab: n, username: r, onClose: i } = e,
    [a, o] = (0, A.useState)(n),
    s = g(Ue),
    c = g(He),
    l = g(Ve),
    u = g(Be),
    d = g(ze),
    f = g(Re),
    p = g(Le),
    m = g(Ie),
    h = g(Fe),
    _ = g(Pe),
    v = g(Ne),
    b = g(Me),
    x;
  t[0] !== u ||
  t[1] !== d ||
  t[2] !== s ||
  t[3] !== b ||
  t[4] !== v ||
  t[5] !== h ||
  t[6] !== _ ||
  t[7] !== p ||
  t[8] !== m ||
  t[9] !== f ||
  t[10] !== c ||
  t[11] !== l
    ? ((x = () => {
        let e = y({
            db: s,
            odfDB: c,
            wifiDB: l,
            ipPhoneDB: p,
            kroneDB: m,
            gponFrameDB: h,
            gponOntDB: _,
            cctvDB: u,
            nvrDB: f,
            cctvFloorplans: d,
            firewallDB: v,
            elevatorDB: b,
          }),
          t = new Date().toLocaleDateString(`vi-VN`).replace(/\//g, `-`),
          n = document.createElement(`a`);
        ((n.href = `data:text/csv;charset=utf-8,` + encodeURIComponent(e)),
          (n.download = `BaoCao_HaTangMang_${t}.csv`),
          n.click());
      }),
      (t[0] = u),
      (t[1] = d),
      (t[2] = s),
      (t[3] = b),
      (t[4] = v),
      (t[5] = h),
      (t[6] = _),
      (t[7] = p),
      (t[8] = m),
      (t[9] = f),
      (t[10] = c),
      (t[11] = l),
      (t[12] = x))
    : (x = t[12]);
  let S = x,
    C = je,
    w;
  t[13] === s
    ? (w = t[14])
    : ((w = (0, M.jsx)(ee, { db: s })), (t[13] = s), (t[14] = w));
  let T;
  t[15] === c
    ? (T = t[16])
    : ((T = (0, M.jsx)(te, { odfDB: c })), (t[15] = c), (t[16] = T));
  let E;
  t[17] !== s || t[18] !== c || t[19] !== l
    ? ((E = (0, M.jsx)(ne, { wifiDB: l, odfDB: c, networkDB: s })),
      (t[17] = s),
      (t[18] = c),
      (t[19] = l),
      (t[20] = E))
    : (E = t[20]);
  let D;
  t[21] !== u || t[22] !== d || t[23] !== s || t[24] !== f
    ? ((D = (0, M.jsx)(oe, {
        cctvDB: u,
        nvrDB: f,
        networkDB: s,
        cctvFloorplans: d,
      })),
      (t[21] = u),
      (t[22] = d),
      (t[23] = s),
      (t[24] = f),
      (t[25] = D))
    : (D = t[25]);
  let O;
  t[26] !== s || t[27] !== c || t[28] !== l
    ? ((O = (0, M.jsx)(ue, { db: s, wifiDB: l, odfDB: c })),
      (t[26] = s),
      (t[27] = c),
      (t[28] = l),
      (t[29] = O))
    : (O = t[29]);
  let k;
  t[30] === p
    ? (k = t[31])
    : ((k = (0, M.jsx)(pe, { ipPhoneDB: p })), (t[30] = p), (t[31] = k));
  let N;
  t[32] === m
    ? (N = t[33])
    : ((N = (0, M.jsx)(ye, { kroneDB: m })), (t[32] = m), (t[33] = N));
  let P;
  t[34] !== h || t[35] !== _
    ? ((P = (0, M.jsx)(we, { frameDB: h, ontDB: _ })),
      (t[34] = h),
      (t[35] = _),
      (t[36] = P))
    : (P = t[36]);
  let F;
  t[37] !== s || t[38] !== r
    ? ((F = (0, M.jsx)(ke, { db: s, username: r })),
      (t[37] = s),
      (t[38] = r),
      (t[39] = F))
    : (F = t[39]);
  let I;
  t[40] !== F ||
  t[41] !== w ||
  t[42] !== T ||
  t[43] !== E ||
  t[44] !== D ||
  t[45] !== O ||
  t[46] !== k ||
  t[47] !== N ||
  t[48] !== P
    ? ((I = {
        switch: w,
        odf: T,
        wifi: E,
        cctv: D,
        outdoor: O,
        ipphone: k,
        krone: N,
        gpon: P,
        backup: F,
      }),
      (t[40] = F),
      (t[41] = w),
      (t[42] = T),
      (t[43] = E),
      (t[44] = D),
      (t[45] = O),
      (t[46] = k),
      (t[47] = N),
      (t[48] = P),
      (t[49] = I))
    : (I = t[49]);
  let L = I,
    R;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((R = { display: `flex`, zIndex: 220 }), (t[50] = R))
    : (R = t[50]);
  let z;
  t[51] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((z = {
        width: 960,
        maxWidth: `96vw`,
        display: `flex`,
        flexDirection: `column`,
        maxHeight: `92vh`,
      }),
      (t[51] = z))
    : (z = t[51]);
  let B;
  t[52] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((B = (0, M.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          (0, M.jsx)(`div`, {
            className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
            children: (0, M.jsx)(`i`, { className: `fas fa-chart-bar` }),
          }),
          `Báo Cáo Tổng Hợp Hạ Tầng Mạng`,
        ],
      })),
      (t[52] = B))
    : (B = t[52]);
  let V;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = (0, M.jsx)(`i`, { className: `fas fa-file-csv` })), (t[53] = V))
    : (V = t[53]);
  let H;
  t[54] === S
    ? (H = t[55])
    : ((H = (0, M.jsxs)(`button`, {
        onClick: S,
        className: `px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-all flex items-center gap-1.5`,
        children: [V, ` CSV`],
      })),
      (t[54] = S),
      (t[55] = H));
  let U;
  t[56] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((U = (0, M.jsxs)(`button`, {
        onClick: C,
        title: `In / xuất PDF toàn bộ các mục báo cáo`,
        className: `px-3 py-1.5 bg-red-50 border border-red-200 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-all flex items-center gap-1.5`,
        children: [(0, M.jsx)(`i`, { className: `fas fa-file-pdf` }), ` PDF`],
      })),
      (t[56] = U))
    : (U = t[56]);
  let W;
  t[57] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((W = (0, M.jsx)(`i`, { className: `fas fa-times` })), (t[57] = W))
    : (W = t[57]);
  let G;
  t[58] === i
    ? (G = t[59])
    : ((G = (0, M.jsx)(`button`, {
        onClick: i,
        title: `Đóng`,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: W,
      })),
      (t[58] = i),
      (t[59] = G));
  let K;
  t[60] !== H || t[61] !== G
    ? ((K = (0, M.jsxs)(`div`, {
        className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
        children: [
          B,
          (0, M.jsxs)(`div`, {
            className: `flex gap-2 items-center`,
            children: [H, U, G],
          }),
        ],
      })),
      (t[60] = H),
      (t[61] = G),
      (t[62] = K))
    : (K = t[62]);
  let q;
  t[63] === a
    ? (q = t[64])
    : ((q = $.map((e) =>
        (0, M.jsxs)(
          `button`,
          {
            onClick: () => o(e.id),
            className: `report-tab-btn ${a === e.id ? `active` : ``}`,
            children: [
              (0, M.jsx)(`i`, { className: `fas ${e.icon} mr-1.5` }),
              e.label,
            ],
          },
          e.id,
        ),
      )),
      (t[63] = a),
      (t[64] = q));
  let J;
  t[65] === q
    ? (J = t[66])
    : ((J = (0, M.jsx)(`div`, {
        className: `report-tab-bar flex gap-2 mb-4 shrink-0 border-b border-slate-100 pb-3 flex-wrap`,
        children: q,
      })),
      (t[65] = q),
      (t[66] = J));
  let Y;
  t[67] !== L || t[68] !== a
    ? ((Y = $.map((e) =>
        (0, M.jsxs)(
          `div`,
          {
            className: `report-tab-panel`,
            "data-active": a === e.id,
            children: [
              (0, M.jsxs)(`h2`, {
                className: `report-print-heading`,
                children: [
                  (0, M.jsx)(`i`, { className: `fas ${e.icon}` }),
                  ` `,
                  e.label,
                ],
              }),
              L[e.id],
            ],
          },
          e.id,
        ),
      )),
      (t[67] = L),
      (t[68] = a),
      (t[69] = Y))
    : (Y = t[69]);
  let X;
  t[70] === Y
    ? (X = t[71])
    : ((X = (0, M.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll pr-1`,
        id: `report-print-area`,
        children: Y,
      })),
      (t[70] = Y),
      (t[71] = X));
  let Z;
  return (
    t[72] !== K || t[73] !== J || t[74] !== X
      ? ((Z = (0, M.jsx)(`div`, {
          className: `modal`,
          style: R,
          children: (0, M.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: z,
            children: [K, J, X],
          }),
        })),
        (t[72] = K),
        (t[73] = J),
        (t[74] = X),
        (t[75] = Z))
      : (Z = t[75]),
    Z
  );
}
function je() {
  return window.print();
}
function Me(e) {
  return e.ElevatorDB;
}
function Ne(e) {
  return e.FirewallDB;
}
function Pe(e) {
  return e.GponOntDB;
}
function Fe(e) {
  return e.GponFrameDB;
}
function Ie(e) {
  return e.KroneDB;
}
function Le(e) {
  return e.IPPhoneDB;
}
function Re(e) {
  return e.NVRDB;
}
function ze(e) {
  return e.CctvFloorplans;
}
function Be(e) {
  return e.CctvCameraDB;
}
function Ve(e) {
  return e.WifiDB;
}
function He(e) {
  return e.ODFDB;
}
function Ue(e) {
  return e.DB;
}
export { Ae as default };
