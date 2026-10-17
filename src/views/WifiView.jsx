import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  A as r,
  B as i,
  D as a,
  E as o,
  F as s,
  I as c,
  L as l,
  N as u,
  O as d,
  P as f,
  R as p,
  T as m,
  V as h,
  a as g,
  c as _,
  i as v,
  j as y,
  l as b,
  o as x,
  s as S,
  tn as C,
  z as w,
} from "./index-QE6I14Fy.js";
import { n as T, t as E } from "./MultiSelectDropdown-CobGdMgk.js";
var D = e(t(), 1),
  O = C(),
  k = n();
function A(e) {
  let {
    db: n,
    networkDB: i,
    odfDB: a,
    floorFilter: o,
    onFloorFilterChange: l,
    onSelectAp: u,
    onShowLogs: d,
    onDragApStart: p,
    onNavigateToOdf: m,
    searchQuery = '',
    onSearchChange,
    sidebarTab = 'list',
    onTabChange
  } = e;

  let nArr = Array.isArray(n) ? n : [];
  let iArr = Array.isArray(i) ? i : [];
  let stats = { byType: {}, byFloor: [] };
  try { stats = f(nArr) || { byType: {}, byFloor: [] }; } catch(e){}
  let floors = [];
  try { floors = r(iArr) || []; } catch(e){}
  let apsByFloor = [];
  try { apsByFloor = s(nArr, o) || []; } catch(e){}

  let searchQ = (searchQuery || '').trim().toLowerCase();
  let cleanQ = searchQ.replace(/[:\-\.\s]/g, '');
  let displayAps = searchQ
    ? apsByFloor.filter((ap) => {
        if (!ap) return false;
        if (ap.name && ap.name.toLowerCase().includes(searchQ)) return true;
        if (ap.ip && ap.ip.toLowerCase().includes(searchQ)) return true;
        if (ap.floor && ap.floor.toLowerCase().includes(searchQ)) return true;
        if (ap.type && ap.type.toLowerCase().includes(searchQ)) return true;
        if (ap.model && ap.model.toLowerCase().includes(searchQ)) return true;
        if (ap.mac) {
          let rawMac = ap.mac.toLowerCase();
          let cleanMac = rawMac.replace(/[:\-\.\s]/g, '');
          if (rawMac.includes(searchQ)) return true;
          if (cleanQ && cleanMac.includes(cleanQ)) return true;
          if (cleanQ && cleanQ.length <= 4 && cleanMac.endsWith(cleanQ)) return true;
        }
        return false;
      })
    : apsByFloor;

  // Header Tabs (Danh Sách AP vs Thống Kê)
  let tabButtons = (0, k.jsxs)('div', {
    className: 'flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 pt-2 gap-1 shrink-0',
    children: [
      (0, k.jsxs)('button', {
        type: 'button',
        onClick: () => onTabChange && onTabChange('list'),
        className: `flex-1 py-2 px-2 text-xs rounded-t-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
          sidebarTab !== 'stats'
            ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border-t border-x border-slate-200 dark:border-slate-700 shadow-xs font-black'
            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold'
        }`,
        children: [
          (0, k.jsx)('i', { className: 'fas fa-wifi text-xs' }),
          ` Danh Sách AP (${displayAps.length})`
        ]
      }),
      (0, k.jsxs)('button', {
        type: 'button',
        onClick: () => onTabChange && onTabChange('stats'),
        className: `py-2 px-3 text-xs rounded-t-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
          sidebarTab === 'stats'
            ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border-t border-x border-slate-200 dark:border-slate-700 shadow-xs font-black'
            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold'
        }`,
        children: [
          (0, k.jsx)('i', { className: 'fas fa-chart-pie text-xs' }),
          ' Thống Kê'
        ]
      })
    ]
  });

  // Search Bar & Filter Controls
  let searchBar = (0, k.jsxs)('div', {
    className: 'p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-2 shrink-0',
    children: [
      (0, k.jsxs)('div', {
        className: 'relative flex items-center',
        children: [
          (0, k.jsx)('i', { className: 'fas fa-search absolute left-2.5 text-xs text-slate-400' }),
          (0, k.jsx)('input', {
            type: 'text',
            value: searchQuery || '',
            onChange: (ev) => onSearchChange && onSearchChange(ev.target.value),
            placeholder: '🔍 Tìm theo Tên, IP, MAC (4 số cuối hoặc đủ)...',
            className: 'w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 outline-none focus:border-cyan-500 font-medium placeholder:text-slate-400'
          }),
          searchQuery &&
            (0, k.jsx)('button', {
              type: 'button',
              onClick: () => onSearchChange && onSearchChange(''),
              className: 'absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer',
              title: 'Xóa tìm kiếm',
              children: '✕'
            })
        ]
      }),
      (0, k.jsxs)('div', {
        className: 'flex items-center gap-2',
        children: [
          (0, k.jsx)('label', {
            htmlFor: 'wifi-floor-filter',
            className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0',
            children: 'Tầng'
          }),
          (0, k.jsxs)('select', {
            id: 'wifi-floor-filter',
            value: o,
            onChange: (ev) => l(ev.target.value),
            className: 'flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 py-1 px-1.5 outline-none truncate cursor-pointer',
            children: [
              (0, k.jsx)('option', { value: 'all', children: 'Tất cả tầng' }),
              floors.map(j)
            ]
          })
        ]
      })
    ]
  });

  // Render AP card list
  let apListContent =
    displayAps.length === 0
      ? (0, k.jsxs)('div', {
          className: 'flex flex-col items-center justify-center py-12 opacity-40',
          children: [
            (0, k.jsx)('i', { className: 'fas fa-wifi text-3xl text-slate-400 mb-3' }),
            (0, k.jsxs)('p', {
              className: 'text-xs font-bold text-slate-500 text-center px-4',
              children: [
                searchQ ? `Không tìm thấy AP khớp với "${searchQuery}"` : 'Chưa có AP nào',
                o === 'all' ? '' : ' ở tầng này'
              ]
            })
          ]
        })
      : displayAps.map((ap) => {
          let typeInfo = h(ap.type),
            placed = ap.x != null && !!ap.floorplanId,
            logCount = ap.logs?.length ?? 0,
            odfInfo = c(ap, a);

          return (0, k.jsxs)(
            'div',
            {
              className: `wifi-device-card ${placed ? 'placed' : ''} select-none`,
              draggable: true,
              onDragStart: (ev) => {
                ev.dataTransfer.effectAllowed = 'move';
                p(ap.id);
              },
              onClick: () => u(ap),
              children: [
                // Top row: Icon + Name + Type/Placed
                (0, k.jsxs)('div', {
                  className: 'flex items-center gap-2.5',
                  children: [
                    (0, k.jsx)('div', {
                      className: `w-7 h-7 rounded-full ${typeInfo.iconBg} flex items-center justify-center shrink-0`,
                      children: (0, k.jsx)('i', {
                        className: `fas fa-wifi ${typeInfo.iconText} text-xs`
                      })
                    }),
                    (0, k.jsxs)('div', {
                      className: 'flex-1 min-w-0',
                      children: [
                        (0, k.jsx)('p', {
                          className: 'text-xs font-black text-slate-800 dark:text-slate-100 truncate',
                          title: ap.name,
                          children: ap.name
                        }),
                        (0, k.jsxs)('p', {
                          className: 'text-[10px] font-bold text-slate-400 truncate',
                          children: [ap.floor, ap.zone ? ' · ' + ap.zone : '']
                        })
                      ]
                    }),
                    (0, k.jsxs)('div', {
                      className: 'flex flex-col items-end gap-1 shrink-0',
                      children: [
                        (0, k.jsx)('span', {
                          className: `wifi-stat-badge ${typeInfo.badge} text-[9px] px-1.5 py-0.5 rounded`,
                          children: ap.type
                        }),
                        placed &&
                          (0, k.jsxs)('span', {
                            className: 'text-[8px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center',
                            children: [
                              (0, k.jsx)('i', { className: 'fas fa-map-marker-alt mr-0.5' }),
                              'Đã định vị'
                            ]
                          })
                      ]
                    })
                  ]
                }),

                // Middle row: PROMINENT IP ADDRESS BADGE
                (0, k.jsxs)('div', {
                  className: 'mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2',
                  children: [
                    ap.ip
                      ? (0, k.jsxs)('span', {
                          className: 'font-mono text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800 flex items-center gap-1.5 shadow-2xs',
                          title: `IP AP: ${ap.ip}`,
                          children: [
                            (0, k.jsx)('i', { className: 'fas fa-wifi text-[9px] text-cyan-500' }),
                            ap.ip
                          ]
                        })
                      : (0, k.jsx)('span', {
                          className: 'text-[10px] text-slate-400 italic',
                          children: 'Chưa có IP'
                        }),
                    ap.mac &&
                      (0, k.jsxs)('span', {
                        className: 'font-mono text-[9px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase tracking-tight',
                        title: `MAC: ${ap.mac}`,
                        children: [
                          (0, k.jsx)('i', { className: 'fas fa-barcode text-[8px] mr-1 opacity-60' }),
                          ap.mac
                        ]
                      })
                  ]
                }),

                // Bottom row: ODF link button / logs badges
                (0, k.jsxs)('div', {
                  className: 'mt-1.5 flex items-center gap-1.5 flex-wrap text-[10px]',
                  children: [
                    odfInfo &&
                      (0, k.jsxs)('button', {
                        type: 'button',
                        onClick: (ev) => {
                          ev.stopPropagation();
                          m();
                        },
                        title: 'Xem trên ODF',
                        className: 'flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded text-[9px] font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors cursor-pointer',
                        children: [
                          (0, k.jsx)('i', { className: 'fas fa-plug text-[7px]' }),
                          'ODF'
                        ]
                      }),
                    (0, k.jsxs)('span', {
                      className: 'ml-auto px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[9px] font-bold flex items-center gap-1',
                      children: [
                        (0, k.jsx)('i', { className: 'fas fa-history text-[8px]' }),
                        `${logCount} log`
                      ]
                    })
                  ]
                })
              ]
            },
            ap.id
          );
        });

  // Overview / Stats Panel Content
  let statsOverviewContent = (0, k.jsxs)('div', {
    className: 'p-4 space-y-3',
    children: [
      (0, k.jsxs)('div', {
        className: 'flex items-center justify-between mb-2',
        children: [
          (0, k.jsx)('span', {
            className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest',
            children: 'Tổng quan'
          }),
          (0, k.jsxs)('span', {
            className: 'text-lg font-black text-cyan-600',
            children: [stats.total, ' ', (0, k.jsx)('span', { className: 'text-xs font-bold text-slate-400', children: 'AP' })]
          })
        ]
      }),
      (0, k.jsx)('div', {
        className: 'flex flex-wrap gap-1.5',
        children: Object.keys(stats.byType).length === 0
          ? (0, k.jsx)('span', { className: 'text-[10px] text-slate-400 italic', children: 'Chưa có AP nào' })
          : Object.entries(stats.byType).map(N)
      }),
      (0, k.jsxs)('div', {
        className: 'mt-3 pt-3 border-t border-slate-100 dark:border-slate-800',
        children: [
          (0, k.jsx)('div', {
            className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2',
            children: 'Theo tầng'
          }),
          (0, k.jsx)('div', {
            className: 'space-y-1.5 max-h-48 overflow-y-auto custom-scroll',
            children: stats.byFloor.length === 0
              ? (0, k.jsx)('p', { className: 'text-[10px] text-slate-400 italic', children: 'Chưa có dữ liệu' })
              : stats.byFloor.map(M)
          })
        ]
      })
    ]
  });

  return (0, k.jsxs)('div', {
    id: 'wifi-left-panel',
    className: 'view-sidebar w-[320px] shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden',
    children: [
      tabButtons,
      sidebarTab === 'stats'
        ? (0, k.jsx)('div', { className: 'flex-1 overflow-y-auto custom-scroll', children: statsOverviewContent })
        : (0, k.jsxs)(k.Fragment, {
            children: [
              searchBar,
              (0, k.jsx)('div', {
                className: 'flex-1 overflow-y-auto custom-scroll p-3 space-y-2',
                children: apListContent
              })
            ]
          })
    ]
  });
}
function j(e) {
  return (0, k.jsx)(`option`, { value: e, children: e }, e);
}
function M(e) {
  let [t, n] = e;
  return (0, k.jsxs)(
    `div`,
    {
      className: `flex items-center justify-between`,
      children: [
        (0, k.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-600 truncate`,
          children: t,
        }),
        (0, k.jsx)(`span`, {
          className: `text-[10px] font-black text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function N(e) {
  let [t, n] = e,
    r = h(t);
  return (0, k.jsxs)(
    `span`,
    { className: `wifi-stat-badge ${r.badge}`, children: [t, `: `, n] },
    t,
  );
}
function P(e) {
  let t = (0, O.c)(25),
    {
      floorplans: n,
      currentFloorplanId: r,
      isUploading: i,
      onSelectFloorplan: a,
      onUpload: o,
      onDelete: s,
    } = e,
    c;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = (0, k.jsx)(`label`, {
        htmlFor: `wifi-floorplan-select`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Bản vẽ tầng:`,
      })),
      (t[0] = c))
    : (c = t[0]);
  let l = r ?? ``,
    u;
  t[1] === a
    ? (u = t[2])
    : ((u = (e) => a(e.target.value)), (t[1] = a), (t[2] = u));
  let d;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = (0, k.jsx)(`option`, { value: ``, children: `-- Chọn bản vẽ --` })),
      (t[3] = d))
    : (d = t[3]);
  let f;
  t[4] === n ? (f = t[5]) : ((f = n.map(F)), (t[4] = n), (t[5] = f));
  let p;
  t[6] !== l || t[7] !== u || t[8] !== f
    ? ((p = (0, k.jsxs)(`select`, {
        id: `wifi-floorplan-select`,
        value: l,
        onChange: u,
        className: `bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-1.5 px-3 focus:outline-none focus:border-cyan-500`,
        children: [d, f],
      })),
      (t[6] = l),
      (t[7] = u),
      (t[8] = f),
      (t[9] = p))
    : (p = t[9]);
  let m;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, k.jsx)(`i`, { className: `fas fa-upload` })), (t[10] = m))
    : (m = t[10]);
  let h;
  t[11] === o
    ? (h = t[12])
    : ((h = (0, k.jsxs)(`label`, {
        className: `px-4 py-1.5 bg-white border border-dashed border-cyan-400 text-cyan-600 rounded-lg text-xs font-bold cursor-pointer hover:bg-cyan-50 transition-colors flex items-center gap-1.5`,
        children: [
          m,
          ` Upload bản vẽ`,
          (0, k.jsx)(`input`, {
            type: `file`,
            accept: `image/*`,
            className: `hidden`,
            onChange: (e) => {
              let t = e.target.files?.[0];
              (t && o(t), (e.target.value = ``));
            },
          }),
        ],
      })),
      (t[11] = o),
      (t[12] = h));
  let g;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, k.jsx)(`i`, { className: `fas fa-trash` })), (t[13] = g))
    : (g = t[13]);
  let _;
  t[14] === s
    ? (_ = t[15])
    : ((_ = (0, k.jsx)(`button`, {
        onClick: s,
        title: `Xóa bản vẽ hiện tại`,
        className: `px-3 py-1.5 bg-red-50 border border-red-200 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5`,
        children: g,
      })),
      (t[14] = s),
      (t[15] = _));
  let v;
  t[16] === i
    ? (v = t[17])
    : ((v = i
        ? (0, k.jsxs)(`span`, {
            className: `text-cyan-600`,
            children: [
              (0, k.jsx)(`i`, {
                className: `fas fa-spinner fa-spin text-cyan-500 mr-1`,
              }),
              `Đang upload...`,
            ],
          })
        : `Kéo AP từ danh sách sang bản vẽ để đặt vị trí`),
      (t[16] = i),
      (t[17] = v));
  let y;
  t[18] === v
    ? (y = t[19])
    : ((y = (0, k.jsx)(`div`, {
        className: `ml-auto text-[10px] text-slate-400 font-bold italic`,
        children: v,
      })),
      (t[18] = v),
      (t[19] = y));
  let b;
  return (
    t[20] !== _ || t[21] !== y || t[22] !== p || t[23] !== h
      ? ((b = (0, k.jsxs)(`div`, {
          className: `flex items-center gap-3 shrink-0`,
          children: [c, p, h, _, y],
        })),
        (t[20] = _),
        (t[21] = y),
        (t[22] = p),
        (t[23] = h),
        (t[24] = b))
      : (b = t[24]),
    b
  );
}
function F(e) {
  return (0, k.jsx)(`option`, { value: e.id, children: e.name }, e.id);
}
function I(e) {
  let t = (0, O.c)(19),
    { ap: n, left: r, top: a, onDragStart: o, onEdit: s } = e,
    c;
  t[0] === n.type ? (c = t[1]) : ((c = i(n.type)), (t[0] = n.type), (t[1] = c));
  let l = `wifi-ap-pin ${c}`,
    u;
  t[2] !== r || t[3] !== a
    ? ((u = {
        left: r,
        top: a,
        position: `absolute`,
        transform: `translate(-50%, -100%)`,
      }),
      (t[2] = r),
      (t[3] = a),
      (t[4] = u))
    : (u = t[4]);
  let d = `${n.name} | ${n.type} | ${n.ip || `No IP`}`,
    f;
  t[5] === o
    ? (f = t[6])
    : ((f = (e) => {
        (e.stopPropagation(), (e.dataTransfer.effectAllowed = `move`), o());
      }),
      (t[5] = o),
      (t[6] = f));
  let p;
  t[7] === s
    ? (p = t[8])
    : ((p = (e) => {
        (e.stopPropagation(), s());
      }),
      (t[7] = s),
      (t[8] = p));
  let m;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, k.jsx)(`i`, { className: `fas fa-wifi` })), (t[9] = m))
    : (m = t[9]);
  let h;
  t[10] === n.name
    ? (h = t[11])
    : ((h = (0, k.jsx)(`div`, {
        className: `wifi-ap-tooltip`,
        children: n.name,
      })),
      (t[10] = n.name),
      (t[11] = h));
  let g;
  return (
    t[12] !== l ||
    t[13] !== u ||
    t[14] !== d ||
    t[15] !== f ||
    t[16] !== p ||
    t[17] !== h
      ? ((g = (0, k.jsxs)(`div`, {
          className: l,
          style: u,
          draggable: !0,
          title: d,
          onDragStart: f,
          onDoubleClick: p,
          children: [m, h],
        })),
        (t[12] = l),
        (t[13] = u),
        (t[14] = d),
        (t[15] = f),
        (t[16] = p),
        (t[17] = h),
        (t[18] = g))
      : (g = t[18]),
    g
  );
}
function L(e) {
  let t = (0, O.c)(15),
    { floorplan: n, aps: r, onDragApStart: i, onDropAp: a, onEditAp: o } = e,
    s = (0, D.useRef)(null),
    c = (0, D.useRef)(null),
    [l, d] = (0, D.useState)(null),
    f;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = function () {
        let e = s.current,
          t = c.current;
        if (!e || !t) {
          d(null);
          return;
        }
        d(
          u({
            containerWidth: e.clientWidth,
            containerHeight: e.clientHeight,
            imageNaturalWidth: t.naturalWidth,
            imageNaturalHeight: t.naturalHeight,
          }),
        );
      }),
      (t[0] = f))
    : (f = t[0]);
  let p = f,
    m;
  (t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = () => (
        window.addEventListener(`resize`, p),
        () => window.removeEventListener(`resize`, p)
      )),
      (t[1] = m))
    : (m = t[1]),
    (0, D.useEffect)(m));
  let h;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = () => {
        d(null);
      }),
      (t[2] = h))
    : (h = t[2]);
  let g = n?.id,
    _;
  (t[3] === g ? (_ = t[4]) : ((_ = [g]), (t[3] = g), (t[4] = _)),
    (0, D.useEffect)(h, _));
  let v;
  t[5] !== l || t[6] !== a
    ? ((v = function (e) {
        if ((e.preventDefault(), !l || !s.current)) return;
        let t = s.current.getBoundingClientRect(),
          n = e.clientX - t.left,
          r = e.clientY - t.top,
          i = ((n - l.offsetX) / l.renderedW) * 100,
          o = ((r - l.offsetY) / l.renderedH) * 100;
        a(Math.max(0, Math.min(100, i)), Math.max(0, Math.min(100, o)));
      }),
      (t[5] = l),
      (t[6] = a),
      (t[7] = v))
    : (v = t[7]);
  let y = v,
    b;
  if (
    t[8] !== r ||
    t[9] !== l ||
    t[10] !== n ||
    t[11] !== y ||
    t[12] !== i ||
    t[13] !== o
  ) {
    let e = n ? r.filter((e) => e.floorplanId === n.id && e.x != null) : [];
    ((b = (0, k.jsx)(`div`, {
      ref: s,
      className: `wifi-floorplan-container flex-1`,
      onDragOver: R,
      onDrop: y,
      children: n
        ? (0, k.jsxs)(k.Fragment, {
            children: [
              (0, k.jsx)(`img`, {
                ref: c,
                className: `wifi-floorplan-img`,
                src: n.url,
                alt: n.name,
                onLoad: p,
              }),
              l &&
                e.map((e) =>
                  (0, k.jsx)(
                    I,
                    {
                      ap: e,
                      left: l.offsetX + ((e.x ?? 0) / 100) * l.renderedW,
                      top: l.offsetY + ((e.y ?? 0) / 100) * l.renderedH,
                      onDragStart: () => i(e.id),
                      onEdit: () => o(e),
                    },
                    e.id,
                  ),
                ),
            ],
          })
        : (0, k.jsxs)(`div`, {
            className: `h-full flex flex-col items-center justify-center opacity-40 py-20`,
            children: [
              (0, k.jsx)(`i`, {
                className: `fas fa-map text-5xl text-slate-400 mb-4`,
              }),
              (0, k.jsx)(`p`, {
                className: `text-sm font-bold text-slate-500 uppercase tracking-widest`,
                children: `Upload bản vẽ mặt bằng để bắt đầu`,
              }),
            ],
          }),
    })),
      (t[8] = r),
      (t[9] = l),
      (t[10] = n),
      (t[11] = y),
      (t[12] = i),
      (t[13] = o),
      (t[14] = b));
  } else b = t[14];
  return b;
}
function R(e) {
  return e.preventDefault();
}
function z(e) {
  let t = (0, O.c)(142),
    { db: n, networkDB: r, floorFilter: i, onSelectAp: a } = e,
    [o, c] = (0, D.useState)(``),
    u;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((u = []), (t[0] = u))
    : (u = t[0]);
  let [d, f] = (0, D.useState)(u),
    p;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = []), (t[1] = p))
    : (p = t[1]);
  let [m, h] = (0, D.useState)(p),
    g;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = []), (t[2] = g))
    : (g = t[2]);
  let [_, v] = (0, D.useState)(g),
    [y, b] = (0, D.useState)(!1),
    [x, S] = (0, D.useState)(`floor`),
    [C, w] = (0, D.useState)(!1),
    T;
  if (t[3] !== n || t[4] !== i || t[5] !== r) {
    let e;
    (t[7] === r
      ? (e = t[8])
      : ((e = (e) => ({ ap: e, link: l(e, r) })), (t[7] = r), (t[8] = e)),
      (T = s(n, i).map(e)),
      (t[3] = n),
      (t[4] = i),
      (t[5] = r),
      (t[6] = T));
  } else T = t[6];
  let A = T,
    j;
  t[9] === A ? (j = t[10]) : ((j = A.filter(ie)), (t[9] = A), (t[10] = j));
  let M = j.length,
    N;
  if (t[11] !== A) {
    let e = new Map();
    (A.forEach((t) => {
      t.link && e.set(t.link.switchId, t.link.switchName);
    }),
      (N = [...e.entries()].sort(q).map(re)),
      (t[11] = A),
      (t[12] = N));
  } else N = t[12];
  let P = N,
    F;
  t[13] === A
    ? (F = t[14])
    : ((F = new Set(A.map(K))), (t[13] = A), (t[14] = F));
  let I = F,
    L;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = [`Dual-band`, `Tri-band`, `2.4G`, `5G`, `6G`]), (t[15] = L))
    : (L = t[15]);
  let R;
  t[16] === I
    ? (R = t[17])
    : ((R = L.filter((e) => I.has(e))), (t[16] = I), (t[17] = R));
  let z = R,
    J;
  t[18] === A
    ? (J = t[19])
    : ((J = [...new Set(A.map(G).filter(Boolean))].sort(W)),
      (t[18] = A),
      (t[19] = J));
  let oe = J,
    se;
  t[20] === x
    ? (se = t[21])
    : ((se = function (e) {
        if (e === x) {
          w(ne);
          return;
        }
        (S(e), w(!1));
      }),
      (t[20] = x),
      (t[21] = se));
  let Y = se,
    ce;
  t[22] !== C || t[23] !== x
    ? ((ce = function (e) {
        return e === x
          ? (0, k.jsx)(`i`, {
              className: `fas fa-chevron-${C ? `down` : `up`} ml-1 text-[8px]`,
            })
          : null;
      }),
      (t[22] = C),
      (t[23] = x),
      (t[24] = ce))
    : (ce = t[24]);
  let X = ce,
    le;
  if (
    t[25] !== _ ||
    t[26] !== y ||
    t[27] !== A ||
    t[28] !== o ||
    t[29] !== C ||
    t[30] !== x ||
    t[31] !== d ||
    t[32] !== m
  ) {
    let e = o.trim().toLowerCase(),
      n;
    t[34] === d
      ? (n = t[35])
      : ((n = (e) => d.length === 0 || (e.link && d.includes(e.link.switchId))),
        (t[34] = d),
        (t[35] = n));
    let r;
    t[36] === m
      ? (r = t[37])
      : ((r = (e) => m.length === 0 || m.includes(e.ap.type)),
        (t[36] = m),
        (t[37] = r));
    let i;
    t[38] === _
      ? (i = t[39])
      : ((i = (e) => _.length === 0 || _.includes(e.ap.brand)),
        (t[38] = _),
        (t[39] = i));
    let a;
    t[40] === y
      ? (a = t[41])
      : ((a = (e) => !y || !e.link), (t[40] = y), (t[41] = a));
    let s;
    (t[42] !== C || t[43] !== x
      ? ((s = (e, t) => {
          let n;
          return (
            (n =
              x === `switch`
                ? (e.link?.switchName ?? ``).localeCompare(
                    t.link?.switchName ?? ``,
                    `vi`,
                    { numeric: !0 },
                  )
                : x === `floor`
                  ? e.ap.floor.localeCompare(t.ap.floor, `vi`, {
                      numeric: !0,
                    }) ||
                    e.ap.name.localeCompare(t.ap.name, `vi`, { numeric: !0 })
                  : x === `name`
                    ? e.ap.name.localeCompare(t.ap.name, `vi`, { numeric: !0 })
                    : x === `type`
                      ? e.ap.type.localeCompare(t.ap.type, `vi`, {
                          numeric: !0,
                        })
                      : x === `brand`
                        ? e.ap.brand.localeCompare(t.ap.brand, `vi`, {
                            numeric: !0,
                          })
                        : e.ap.ip.localeCompare(t.ap.ip, `vi`, {
                            numeric: !0,
                          })),
            C ? -n : n
          );
        }),
        (t[42] = C),
        (t[43] = x),
        (t[44] = s))
      : (s = t[44]),
      (le = A.filter(
        (t) =>
          !e ||
          [
            t.ap.name,
            t.ap.ip,
            t.ap.mac,
            t.ap.floor,
            t.ap.brand,
            t.ap.model,
            t.link?.switchName ?? ``,
          ].some((t) => t.toLowerCase().includes(e)),
      )
        .filter(n)
        .filter(r)
        .filter(i)
        .filter(a)
        .sort(s)),
      (t[25] = _),
      (t[26] = y),
      (t[27] = A),
      (t[28] = o),
      (t[29] = C),
      (t[30] = x),
      (t[31] = d),
      (t[32] = m),
      (t[33] = le));
  } else le = t[33];
  let Z = le,
    Q;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Q = (0, k.jsxs)(`h4`, {
        className: `text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 shrink-0`,
        children: [
          (0, k.jsx)(`i`, { className: `fas fa-list-ol text-cyan-500` }),
          ` Danh Sách AP`,
        ],
      })),
      (t[45] = Q))
    : (Q = t[45]);
  let $;
  t[46] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($ = (0, k.jsx)(`i`, {
        className: `fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]`,
      })),
      (t[46] = $))
    : ($ = t[46]);
  let ue;
  t[47] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ue = (e) => c(e.target.value)), (t[47] = ue))
    : (ue = t[47]);
  let de;
  t[48] === o
    ? (de = t[49])
    : ((de = (0, k.jsxs)(`div`, {
        className: `relative flex-1 min-w-[160px] max-w-xs`,
        children: [
          $,
          (0, k.jsx)(`input`, {
            type: `text`,
            value: o,
            onChange: ue,
            placeholder: `Tìm theo tên, IP, MAC, switch, tầng, hãng, model...`,
            className: `w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500 transition-colors`,
          }),
        ],
      })),
      (t[48] = o),
      (t[49] = de));
  let fe;
  t[50] !== d || t[51] !== P
    ? ((fe = (0, k.jsx)(E, {
        icon: `fa-network-wired`,
        allLabel: `Tất cả Switch`,
        countLabel: U,
        options: P,
        selected: d,
        onChange: f,
      })),
      (t[50] = d),
      (t[51] = P),
      (t[52] = fe))
    : (fe = t[52]);
  let pe;
  t[53] === z ? (pe = t[54]) : ((pe = z.map(te)), (t[53] = z), (t[54] = pe));
  let me;
  t[55] !== pe || t[56] !== m
    ? ((me = (0, k.jsx)(E, {
        icon: `fa-broadcast-tower`,
        allLabel: `Tất cả Loại`,
        countLabel: H,
        options: pe,
        selected: m,
        onChange: h,
      })),
      (t[55] = pe),
      (t[56] = m),
      (t[57] = me))
    : (me = t[57]);
  let he;
  t[58] === oe ? (he = t[59]) : ((he = oe.map(V)), (t[58] = oe), (t[59] = he));
  let ge;
  t[60] !== _ || t[61] !== he
    ? ((ge = (0, k.jsx)(E, {
        icon: `fa-tag`,
        allLabel: `Tất cả Hãng`,
        countLabel: ee,
        options: he,
        selected: _,
        onChange: v,
      })),
      (t[60] = _),
      (t[61] = he),
      (t[62] = ge))
    : (ge = t[62]);
  let _e;
  t[63] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_e = () => b(B)), (t[63] = _e))
    : (_e = t[63]);
  let ve = `px-3 py-2 border rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0 ${y ? `bg-amber-50 border-amber-200 text-amber-600` : `bg-white border-slate-200 text-slate-700 hover:border-amber-300`}`,
    ye;
  t[64] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ye = (0, k.jsx)(`i`, { className: `fas fa-unlink text-[10px]` })),
      (t[64] = ye))
    : (ye = t[64]);
  let be;
  t[65] !== ve || t[66] !== M
    ? ((be = (0, k.jsxs)(`button`, {
        type: `button`,
        onClick: _e,
        title: `Chỉ hiện AP chưa gán Switch/Port`,
        className: ve,
        children: [ye, ` Chưa gán (`, M, `)`],
      })),
      (t[65] = ve),
      (t[66] = M),
      (t[67] = be))
    : (be = t[67]);
  let xe;
  t[68] !== Z.length || t[69] !== A.length
    ? ((xe = (0, k.jsxs)(`span`, {
        className: `text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-auto shrink-0`,
        children: [Z.length, ` / `, A.length, ` AP`],
      })),
      (t[68] = Z.length),
      (t[69] = A.length),
      (t[70] = xe))
    : (xe = t[70]);
  let Se;
  t[71] !== de ||
  t[72] !== fe ||
  t[73] !== me ||
  t[74] !== ge ||
  t[75] !== be ||
  t[76] !== xe
    ? ((Se = (0, k.jsxs)(`div`, {
        className: `p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 flex-wrap shrink-0`,
        children: [Q, de, fe, me, ge, be, xe],
      })),
      (t[71] = de),
      (t[72] = fe),
      (t[73] = me),
      (t[74] = ge),
      (t[75] = be),
      (t[76] = xe),
      (t[77] = Se))
    : (Se = t[77]);
  let Ce;
  t[78] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ce = (0, k.jsx)(`th`, { className: `p-3 pl-4 w-12`, children: `STT` })),
      (t[78] = Ce))
    : (Ce = t[78]);
  let we;
  t[79] === Y
    ? (we = t[80])
    : ((we = () => Y(`name`)), (t[79] = Y), (t[80] = we));
  let Te;
  t[81] === X ? (Te = t[82]) : ((Te = X(`name`)), (t[81] = X), (t[82] = Te));
  let Ee;
  t[83] !== we || t[84] !== Te
    ? ((Ee = (0, k.jsxs)(`th`, {
        className: `p-3 cursor-pointer select-none hover:text-slate-600`,
        onClick: we,
        children: [`Tên AP `, Te],
      })),
      (t[83] = we),
      (t[84] = Te),
      (t[85] = Ee))
    : (Ee = t[85]);
  let De;
  t[86] === Y
    ? (De = t[87])
    : ((De = () => Y(`type`)), (t[86] = Y), (t[87] = De));
  let Oe;
  t[88] === X ? (Oe = t[89]) : ((Oe = X(`type`)), (t[88] = X), (t[89] = Oe));
  let ke;
  t[90] !== De || t[91] !== Oe
    ? ((ke = (0, k.jsxs)(`th`, {
        className: `p-3 cursor-pointer select-none hover:text-slate-600`,
        onClick: De,
        children: [`Loại `, Oe],
      })),
      (t[90] = De),
      (t[91] = Oe),
      (t[92] = ke))
    : (ke = t[92]);
  let Ae;
  t[93] === Y
    ? (Ae = t[94])
    : ((Ae = () => Y(`brand`)), (t[93] = Y), (t[94] = Ae));
  let je;
  t[95] === X ? (je = t[96]) : ((je = X(`brand`)), (t[95] = X), (t[96] = je));
  let Me;
  t[97] !== Ae || t[98] !== je
    ? ((Me = (0, k.jsxs)(`th`, {
        className: `p-3 cursor-pointer select-none hover:text-slate-600`,
        onClick: Ae,
        children: [`Hãng `, je],
      })),
      (t[97] = Ae),
      (t[98] = je),
      (t[99] = Me))
    : (Me = t[99]);
  let Ne;
  t[100] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ne = (0, k.jsx)(`th`, { className: `p-3`, children: `Model` })),
      (t[100] = Ne))
    : (Ne = t[100]);
  let Pe;
  t[101] === Y
    ? (Pe = t[102])
    : ((Pe = () => Y(`floor`)), (t[101] = Y), (t[102] = Pe));
  let Fe;
  t[103] === X
    ? (Fe = t[104])
    : ((Fe = X(`floor`)), (t[103] = X), (t[104] = Fe));
  let Ie;
  t[105] !== Pe || t[106] !== Fe
    ? ((Ie = (0, k.jsxs)(`th`, {
        className: `p-3 cursor-pointer select-none hover:text-slate-600`,
        onClick: Pe,
        children: [`Tầng `, Fe],
      })),
      (t[105] = Pe),
      (t[106] = Fe),
      (t[107] = Ie))
    : (Ie = t[107]);
  let Le;
  t[108] === Y
    ? (Le = t[109])
    : ((Le = () => Y(`switch`)), (t[108] = Y), (t[109] = Le));
  let Re;
  t[110] === X
    ? (Re = t[111])
    : ((Re = X(`switch`)), (t[110] = X), (t[111] = Re));
  let ze;
  t[112] !== Le || t[113] !== Re
    ? ((ze = (0, k.jsxs)(`th`, {
        className: `p-3 cursor-pointer select-none hover:text-slate-600`,
        onClick: Le,
        children: [`Switch `, Re],
      })),
      (t[112] = Le),
      (t[113] = Re),
      (t[114] = ze))
    : (ze = t[114]);
  let Be;
  t[115] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Be = (0, k.jsx)(`th`, { className: `p-3`, children: `Port` })),
      (t[115] = Be))
    : (Be = t[115]);
  let Ve;
  t[116] === Y
    ? (Ve = t[117])
    : ((Ve = () => Y(`ip`)), (t[116] = Y), (t[117] = Ve));
  let He;
  t[118] === X ? (He = t[119]) : ((He = X(`ip`)), (t[118] = X), (t[119] = He));
  let Ue;
  t[120] !== Ve || t[121] !== He
    ? ((Ue = (0, k.jsxs)(`th`, {
        className: `p-3 cursor-pointer select-none hover:text-slate-600`,
        onClick: Ve,
        children: [`IP `, He],
      })),
      (t[120] = Ve),
      (t[121] = He),
      (t[122] = Ue))
    : (Ue = t[122]);
  let We;
  t[123] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((We = (0, k.jsx)(`th`, { className: `p-3`, children: `MAC` })),
      (t[123] = We))
    : (We = t[123]);
  let Ge;
  t[124] !== Ee ||
  t[125] !== ke ||
  t[126] !== Me ||
  t[127] !== Ie ||
  t[128] !== ze ||
  t[129] !== Ue
    ? ((Ge = (0, k.jsx)(`thead`, {
        children: (0, k.jsxs)(`tr`, {
          className: `bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200 sticky top-0`,
          children: [Ce, Ee, ke, Me, Ne, Ie, ze, Be, Ue, We],
        }),
      })),
      (t[124] = Ee),
      (t[125] = ke),
      (t[126] = Me),
      (t[127] = Ie),
      (t[128] = ze),
      (t[129] = Ue),
      (t[130] = Ge))
    : (Ge = t[130]);
  let Ke;
  t[131] !== Z || t[132] !== a
    ? ((Ke =
        Z.length === 0
          ? (0, k.jsx)(`tr`, {
              children: (0, k.jsx)(`td`, {
                colSpan: 10,
                className: `p-8 text-center text-xs text-slate-400 italic`,
                children: `Không tìm thấy AP nào khớp bộ lọc.`,
              }),
            })
          : Z.map((e, t) => {
              let { ap: n, link: r } = e;
              return (0, k.jsx)(
                ae,
                { ap: n, link: r, stt: t + 1, onSelectAp: a },
                n.id,
              );
            })),
      (t[131] = Z),
      (t[132] = a),
      (t[133] = Ke))
    : (Ke = t[133]);
  let qe;
  t[134] === Ke
    ? (qe = t[135])
    : ((qe = (0, k.jsx)(`tbody`, { children: Ke })),
      (t[134] = Ke),
      (t[135] = qe));
  let Je;
  t[136] !== Ge || t[137] !== qe
    ? ((Je = (0, k.jsx)(`div`, {
        className: `flex-1 overflow-auto custom-scroll`,
        children: (0, k.jsxs)(`table`, {
          className: `w-full text-left`,
          children: [Ge, qe],
        }),
      })),
      (t[136] = Ge),
      (t[137] = qe),
      (t[138] = Je))
    : (Je = t[138]);
  let Ye;
  return (
    t[139] !== Se || t[140] !== Je
      ? ((Ye = (0, k.jsxs)(`div`, {
          className: `bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col min-h-0`,
          children: [Se, Je],
        })),
        (t[139] = Se),
        (t[140] = Je),
        (t[141] = Ye))
      : (Ye = t[141]),
    Ye
  );
}
function B(e) {
  return !e;
}
function V(e) {
  return { value: e, label: e };
}
function ee(e) {
  return `${e} Hãng đã chọn`;
}
function te(e) {
  return { value: e, label: e };
}
function H(e) {
  return `${e} Loại đã chọn`;
}
function U(e) {
  return `${e} Switch đã chọn`;
}
function ne(e) {
  return !e;
}
function W(e, t) {
  return e.localeCompare(t, `vi`, { numeric: !0 });
}
function G(e) {
  return e.ap.brand;
}
function K(e) {
  return e.ap.type;
}
function re(e) {
  let [t, n] = e;
  return { value: t, label: n };
}
function q(e, t) {
  return e[1].localeCompare(t[1], `vi`, { numeric: !0 });
}
function ie(e) {
  return !e.link;
}
function ae(e) {
  let t = (0, O.c)(38),
    { ap: n, link: r, stt: i, onSelectAp: o } = e,
    s;
  t[0] === n.type ? (s = t[1]) : ((s = h(n.type)), (t[0] = n.type), (t[1] = s));
  let c = s,
    l;
  t[2] !== n || t[3] !== o
    ? ((l = () => o(n)), (t[2] = n), (t[3] = o), (t[4] = l))
    : (l = t[4]);
  let u;
  t[5] === i
    ? (u = t[6])
    : ((u = (0, k.jsx)(`td`, {
        className: `p-3 pl-4 text-[10px] text-slate-400 font-bold tabular-nums`,
        children: i,
      })),
      (t[5] = i),
      (t[6] = u));
  let d;
  t[7] === n.name
    ? (d = t[8])
    : ((d = (0, k.jsx)(`td`, {
        className: `p-3 text-xs font-bold text-slate-800`,
        children: n.name,
      })),
      (t[7] = n.name),
      (t[8] = d));
  let f = `px-1.5 py-0.5 rounded text-[9px] font-black whitespace-nowrap ${c.badge}`,
    p;
  t[9] !== n.type || t[10] !== f
    ? ((p = (0, k.jsx)(`td`, {
        className: `p-3`,
        children: (0, k.jsx)(`span`, { className: f, children: n.type }),
      })),
      (t[9] = n.type),
      (t[10] = f),
      (t[11] = p))
    : (p = t[11]);
  let m;
  t[12] === n.brand
    ? (m = t[13])
    : ((m = (0, k.jsx)(`td`, {
        className: `p-3`,
        children: n.brand
          ? (0, k.jsxs)(`span`, {
              className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black border whitespace-nowrap ${a(n.brand)}`,
              children: [
                (0, k.jsx)(`i`, { className: `fas fa-tag text-[8px]` }),
                ` `,
                n.brand,
              ],
            })
          : (0, k.jsx)(`span`, {
              className: `text-slate-300 text-xs`,
              children: `—`,
            }),
      })),
      (t[12] = n.brand),
      (t[13] = m));
  let g;
  t[14] === n.model
    ? (g = t[15])
    : ((g = (0, k.jsx)(`td`, {
        className: `p-3 text-[10px] font-bold text-slate-500`,
        children: n.model
          ? (0, k.jsx)(`span`, {
              className: `px-1.5 py-0.5 rounded bg-slate-100 font-mono`,
              children: n.model,
            })
          : (0, k.jsx)(`span`, { className: `text-slate-300`, children: `—` }),
      })),
      (t[14] = n.model),
      (t[15] = g));
  let _;
  t[16] === n.floor
    ? (_ = t[17])
    : ((_ = (0, k.jsx)(`td`, {
        className: `p-3`,
        children: n.floor
          ? (0, k.jsxs)(`span`, {
              className: `inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap`,
              children: [
                (0, k.jsx)(`i`, { className: `fas fa-building text-[8px]` }),
                ` `,
                n.floor,
              ],
            })
          : (0, k.jsx)(`span`, {
              className: `text-slate-300 text-xs`,
              children: `—`,
            }),
      })),
      (t[16] = n.floor),
      (t[17] = _));
  let v;
  t[18] === r
    ? (v = t[19])
    : ((v = (0, k.jsx)(`td`, {
        className: `p-3 text-[10px] font-bold`,
        children: r
          ? (0, k.jsx)(`span`, {
              className: `text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full`,
              children: r.switchName,
            })
          : (0, k.jsx)(`span`, {
              className: `text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full`,
              children: `Chưa gán`,
            }),
      })),
      (t[18] = r),
      (t[19] = v));
  let y;
  t[20] === r
    ? (y = t[21])
    : ((y = (0, k.jsx)(`td`, {
        className: `p-3 text-[10px] font-bold text-slate-600`,
        children:
          r?.port == null
            ? (0, k.jsx)(`span`, { className: `text-slate-300`, children: `—` })
            : (0, k.jsxs)(`span`, {
                className: `px-1.5 py-0.5 rounded bg-slate-100`,
                children: [`P`, r.port],
              }),
      })),
      (t[20] = r),
      (t[21] = y));
  let b = n.ip || `—`,
    x;
  t[22] === b
    ? (x = t[23])
    : ((x = (0, k.jsx)(`td`, {
        className: `p-3 text-xs font-mono text-indigo-600 tabular-nums`,
        children: b,
      })),
      (t[22] = b),
      (t[23] = x));
  let S = n.mac || `—`,
    C;
  t[24] === S
    ? (C = t[25])
    : ((C = (0, k.jsx)(`td`, {
        className: `p-3 text-xs font-mono text-slate-400 uppercase`,
        children: S,
      })),
      (t[24] = S),
      (t[25] = C));
  let w;
  return (
    t[26] !== v ||
    t[27] !== y ||
    t[28] !== x ||
    t[29] !== C ||
    t[30] !== l ||
    t[31] !== u ||
    t[32] !== d ||
    t[33] !== p ||
    t[34] !== m ||
    t[35] !== g ||
    t[36] !== _
      ? ((w = (0, k.jsxs)(`tr`, {
          onClick: l,
          className: `border-b border-slate-100 last:border-0 hover:bg-cyan-50/40 cursor-pointer transition-colors`,
          children: [u, d, p, m, g, _, v, y, x, C],
        })),
        (t[26] = v),
        (t[27] = y),
        (t[28] = x),
        (t[29] = C),
        (t[30] = l),
        (t[31] = u),
        (t[32] = d),
        (t[33] = p),
        (t[34] = m),
        (t[35] = g),
        (t[36] = _),
        (t[37] = w))
      : (w = t[37]),
    w
  );
}
function J(e) {
  let t = (0, O.c)(65),
    {
      networkDB: n,
      wifiDB: i,
      username: a,
      onImport: s,
      onApplyMappings: c,
      onClose: l,
    } = e,
    u = S(le),
    f = b(X),
    m;
  t[0] !== n || t[1] !== i
    ? ((m = p(n, i)), (t[0] = n), (t[1] = i), (t[2] = m))
    : (m = t[2]);
  let h = m,
    g;
  t[3] === h ? (g = t[4]) : ((g = () => h.map(ce)), (t[3] = h), (t[4] = g));
  let [_, v] = (0, D.useState)(g),
    x;
  t[5] !== n || t[6] !== i
    ? ((x = w(n, i)), (t[5] = n), (t[6] = i), (t[7] = x))
    : (x = t[7]);
  let C = x,
    T;
  t[8] === C ? (T = t[9]) : ((T = () => C.map(Y)), (t[8] = C), (t[9] = T));
  let [E, A] = (0, D.useState)(T),
    j;
  t[10] === h
    ? (j = t[11])
    : ((j = function () {
        v(h.map(se));
      }),
      (t[10] = h),
      (t[11] = j));
  let M = j,
    N;
  t[12] === h
    ? (N = t[13])
    : ((N = function (e) {
        h[e].alreadyExists || v((t) => t.map((t, n) => (n === e ? !t : t)));
      }),
      (t[12] = h),
      (t[13] = N));
  let P = N,
    F;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((F = function (e) {
        A((t) => t.map((t, n) => (n === e ? !t : t)));
      }),
      (t[14] = F))
    : (F = t[14]);
  let I = F,
    L;
  t[15] !== f ||
  t[16] !== E ||
  t[17] !== C ||
  t[18] !== c ||
  t[19] !== u ||
  t[20] !== a
    ? ((L = function () {
        let e = C.filter((e, t) => E[t]);
        if (!e.length) {
          u(`Chưa chọn AP nào để gán!`, `error`);
          return;
        }
        (e.forEach((e) => {
          let t = d(e.swName, e.port);
          f(`WiFi AP: ${e.apName}`, t, a);
        }),
          c(e.map(oe)));
      }),
      (t[15] = f),
      (t[16] = E),
      (t[17] = C),
      (t[18] = c),
      (t[19] = u),
      (t[20] = a),
      (t[21] = L))
    : (L = t[21]);
  let R = L,
    z;
  t[22] !== f ||
  t[23] !== h ||
  t[24] !== _ ||
  t[25] !== n ||
  t[26] !== s ||
  t[27] !== u ||
  t[28] !== a
    ? ((z = function () {
        let e = h.filter((e, t) => _[t]);
        if (!e.length) {
          u(`Chưa chọn thiết bị nào!`, `error`);
          return;
        }
        let t = r(n),
          i = e.map((e, n) => {
            let r = t.find((t) => t === e.floor) || t[0] || `Tầng 01`,
              i = y(e.swName, e.port, e.vlan);
            return (
              f(`WiFi AP: ${e.name}`, i, a),
              {
                id: `wifi-${Date.now()}-${n}`,
                name: e.name,
                ip: e.ip,
                mac: e.mac,
                floor: r,
                zone: ``,
                type: `Dual-band`,
                brand: ``,
                model: ``,
                ssid: ``,
                channel: ``,
                power: ``,
                notes: `Auto-imported từ ${e.swName} Port ${e.port}`,
                x: null,
                y: null,
                floorplanId: null,
                switchId: e.swId,
                switchPort: e.port,
                logs: o(void 0, i, a),
              }
            );
          });
        s(i);
      }),
      (t[22] = f),
      (t[23] = h),
      (t[24] = _),
      (t[25] = n),
      (t[26] = s),
      (t[27] = u),
      (t[28] = a),
      (t[29] = z))
    : (z = t[29]);
  let B = z,
    V;
  t[30] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = { display: `flex`, zIndex: 210 }), (t[30] = V))
    : (V = t[30]);
  let ee;
  t[31] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ee = {
        width: 680,
        maxWidth: `95vw`,
        display: `flex`,
        flexDirection: `column`,
        maxHeight: `90vh`,
      }),
      (t[31] = ee))
    : (ee = t[31]);
  let te;
  t[32] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((te = (0, k.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          (0, k.jsx)(`div`, {
            className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100`,
            children: (0, k.jsx)(`i`, { className: `fas fa-download` }),
          }),
          `Import AP từ Switch Port (VLAN 102)`,
        ],
      })),
      (t[32] = te))
    : (te = t[32]);
  let H;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, k.jsx)(`i`, { className: `fas fa-times` })), (t[33] = H))
    : (H = t[33]);
  let U;
  t[34] === l
    ? (U = t[35])
    : ((U = (0, k.jsxs)(`div`, {
        className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
        children: [
          te,
          (0, k.jsx)(`button`, {
            onClick: l,
            className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
            children: H,
          }),
        ],
      })),
      (t[34] = l),
      (t[35] = U));
  let ne;
  t[36] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ne = (0, k.jsxs)(`div`, {
        className: `mb-4 shrink-0 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2`,
        children: [
          (0, k.jsx)(`i`, {
            className: `fas fa-info-circle text-amber-500 mt-0.5`,
          }),
          (0, k.jsx)(`p`, {
            className: `text-[10px] text-amber-700 font-bold leading-relaxed`,
            children: `Hệ thống tự động phát hiện các cổng Switch đang gắn VLAN 102 (wifiVlan), có icon WiFi, hoặc tên thiết bị có chứa "AP"/"WiFi". Chọn thiết bị cần import vào WiFi Topology.`,
          }),
        ],
      })),
      (t[36] = ne))
    : (ne = t[36]);
  let W;
  t[37] !== h || t[38] !== _ || t[39] !== P
    ? ((W = (0, k.jsx)(`div`, {
        id: `wifi-import-new-candidates`,
        children:
          h.length === 0
            ? (0, k.jsxs)(`div`, {
                className: `flex flex-col items-center justify-center py-12 opacity-50`,
                children: [
                  (0, k.jsx)(`i`, {
                    className: `fas fa-search text-4xl text-slate-300 mb-4`,
                  }),
                  (0, k.jsx)(`p`, {
                    className: `text-sm font-bold text-slate-500`,
                    children: `Không tìm thấy cổng nào được gắn VLAN 102 hoặc icon WiFi.`,
                  }),
                  (0, k.jsx)(`p`, {
                    className: `text-xs text-slate-400 mt-1`,
                    children: `Hãy cấu hình VLAN cho các port trên Switch trước.`,
                  }),
                ],
              })
            : (0, k.jsx)(`div`, {
                className: `space-y-2`,
                children: h.map((e, t) =>
                  (0, k.jsxs)(
                    `label`,
                    {
                      className: `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${e.alreadyExists ? `bg-slate-50 border-slate-200 opacity-60` : `bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50`}`,
                      children: [
                        (0, k.jsx)(`input`, {
                          type: `checkbox`,
                          checked: _[t],
                          disabled: e.alreadyExists,
                          onChange: () => P(t),
                          style: {
                            accentColor: `#d97706`,
                            width: 14,
                            height: 14,
                            cursor: `pointer`,
                          },
                        }),
                        (0, k.jsx)(`div`, {
                          className: `w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs border border-amber-100 shrink-0`,
                          children: (0, k.jsx)(`i`, {
                            className: `fas fa-wifi`,
                          }),
                        }),
                        (0, k.jsxs)(`div`, {
                          className: `flex-1 min-w-0`,
                          children: [
                            (0, k.jsx)(`p`, {
                              className: `text-xs font-black text-slate-800`,
                              children: e.name,
                            }),
                            (0, k.jsxs)(`p`, {
                              className: `text-[10px] text-slate-500 font-bold`,
                              children: [
                                e.swName,
                                ` · Port `,
                                e.port,
                                ` · VLAN `,
                                e.vlan,
                                ` · `,
                                e.floor,
                              ],
                            }),
                            e.ip &&
                              (0, k.jsxs)(`p`, {
                                className: `text-[9px] font-mono text-indigo-500 mt-0.5`,
                                children: [e.ip, e.mac ? ` | ` + e.mac : ``],
                              }),
                          ],
                        }),
                        e.alreadyExists
                          ? (0, k.jsx)(`span`, {
                              className: `text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0`,
                              children: `Đã có`,
                            })
                          : (0, k.jsx)(`span`, {
                              className: `text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0`,
                              children: `Mới`,
                            }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
      })),
      (t[37] = h),
      (t[38] = _),
      (t[39] = P),
      (t[40] = W))
    : (W = t[40]);
  let G;
  t[41] !== R || t[42] !== E || t[43] !== C
    ? ((G =
        C.length > 0 &&
        (0, k.jsxs)(`div`, {
          id: `wifi-import-switchport-mappings`,
          className: `mt-5 pt-4 border-t border-slate-100`,
          children: [
            (0, k.jsxs)(`h4`, {
              className: `text-xs font-black text-slate-800 mb-1 flex items-center gap-2`,
              children: [
                (0, k.jsx)(`i`, { className: `fas fa-link text-indigo-500` }),
                ` AP đã có, chưa gán Switch/Port (`,
                C.length,
                `)`,
              ],
            }),
            (0, k.jsx)(`p`, {
              className: `text-[10px] text-slate-400 mb-3`,
              children: `Khớp theo IP/MAC/tên với cổng Switch bên trên — bấm "Gán đã chọn" để điền Switch/Port cho các AP này thay vì tự chọn tay trong form sửa AP.`,
            }),
            (0, k.jsx)(`div`, {
              className: `space-y-2`,
              children: C.map((e, t) =>
                (0, k.jsxs)(
                  `label`,
                  {
                    className: `flex items-center gap-3 p-3 rounded-xl border bg-indigo-50/30 border-indigo-100 hover:bg-indigo-50 cursor-pointer transition-all`,
                    children: [
                      (0, k.jsx)(`input`, {
                        type: `checkbox`,
                        checked: E[t],
                        onChange: () => I(t),
                        style: {
                          accentColor: `#4f46e5`,
                          width: 14,
                          height: 14,
                          cursor: `pointer`,
                        },
                      }),
                      (0, k.jsx)(`div`, {
                        className: `w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs border border-indigo-200 shrink-0`,
                        children: (0, k.jsx)(`i`, { className: `fas fa-wifi` }),
                      }),
                      (0, k.jsxs)(`div`, {
                        className: `flex-1 min-w-0`,
                        children: [
                          (0, k.jsx)(`p`, {
                            className: `text-xs font-black text-slate-800`,
                            children: e.apName,
                          }),
                          (0, k.jsxs)(`p`, {
                            className: `text-[10px] text-slate-500 font-bold`,
                            children: [
                              `→ `,
                              e.swName,
                              ` · Port `,
                              e.port,
                              ` · VLAN `,
                              e.vlan,
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  e.apId,
                ),
              ),
            }),
            (0, k.jsxs)(`button`, {
              onClick: R,
              className: `mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2`,
              children: [
                (0, k.jsx)(`i`, { className: `fas fa-link` }),
                ` Gán Switch/Port đã chọn`,
              ],
            }),
          ],
        })),
      (t[41] = R),
      (t[42] = E),
      (t[43] = C),
      (t[44] = G))
    : (G = t[44]);
  let K;
  t[45] !== W || t[46] !== G
    ? ((K = (0, k.jsxs)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll pr-1`,
        children: [W, G],
      })),
      (t[45] = W),
      (t[46] = G),
      (t[47] = K))
    : (K = t[47]);
  let re;
  t[48] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((re = (0, k.jsx)(`i`, { className: `fas fa-check-double mr-1` })),
      (t[48] = re))
    : (re = t[48]);
  let q;
  t[49] === M
    ? (q = t[50])
    : ((q = (0, k.jsxs)(`button`, {
        onClick: M,
        className: `px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all`,
        children: [re, `Chọn tất cả`],
      })),
      (t[49] = M),
      (t[50] = q));
  let ie;
  t[51] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ie = (0, k.jsx)(`div`, { className: `flex-1` })), (t[51] = ie))
    : (ie = t[51]);
  let ae;
  t[52] === l
    ? (ae = t[53])
    : ((ae = (0, k.jsx)(`button`, {
        onClick: l,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[52] = l),
      (t[53] = ae));
  let J;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((J = (0, k.jsx)(`i`, { className: `fas fa-file-import` })), (t[54] = J))
    : (J = t[54]);
  let Z;
  t[55] === B
    ? (Z = t[56])
    : ((Z = (0, k.jsxs)(`button`, {
        onClick: B,
        className: `px-6 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-amber-700 transition-all flex items-center gap-2`,
        children: [J, ` Import đã chọn`],
      })),
      (t[55] = B),
      (t[56] = Z));
  let Q;
  t[57] !== q || t[58] !== ae || t[59] !== Z
    ? ((Q = (0, k.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [q, ie, ae, Z],
      })),
      (t[57] = q),
      (t[58] = ae),
      (t[59] = Z),
      (t[60] = Q))
    : (Q = t[60]);
  let $;
  return (
    t[61] !== U || t[62] !== K || t[63] !== Q
      ? (($ = (0, k.jsx)(`div`, {
          className: `modal`,
          style: V,
          children: (0, k.jsxs)(`div`, {
            className: `modal-content shadow-2xl`,
            style: ee,
            children: [U, ne, K, Q],
          }),
        })),
        (t[61] = U),
        (t[62] = K),
        (t[63] = Q),
        (t[64] = $))
      : ($ = t[64]),
    $
  );
}
function oe(e) {
  return { apId: e.apId, swId: e.swId, swName: e.swName, port: e.port };
}
function se(e) {
  return !e.alreadyExists;
}
function Y() {
  return !0;
}
function ce() {
  return !1;
}
function X(e) {
  return e.addGlobalLog;
}
function le(e) {
  return e.showDialog;
}
var Z = {
  "Thêm mới": { icon: `fa-plus-circle`, color: `bg-cyan-500` },
  Import: { icon: `fa-download`, color: `bg-amber-500` },
  "Cập nhật": { icon: `fa-edit`, color: `bg-indigo-500` },
};
function Q(e) {
  let t = (0, O.c)(33),
    { ap: n, onClose: r } = e,
    i,
    a,
    o,
    s,
    c,
    l,
    u;
  if (t[0] !== n.logs || t[1] !== n.name || t[2] !== r) {
    let e = [...(n.logs ?? [])].reverse();
    ((l = `modal`),
      t[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = { display: `flex`, zIndex: 210 }), (t[10] = u))
        : (u = t[10]),
      (o = `modal-content shadow-2xl`),
      t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = {
            width: 580,
            maxWidth: `95vw`,
            display: `flex`,
            flexDirection: `column`,
            maxHeight: `88vh`,
          }),
          (t[11] = s))
        : (s = t[11]));
    let d;
    t[12] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = (0, k.jsx)(`div`, {
          className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
          children: (0, k.jsx)(`i`, { className: `fas fa-history` }),
        })),
        (t[12] = d))
      : (d = t[12]);
    let f;
    t[13] === n.name
      ? (f = t[14])
      : ((f = (0, k.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [
            d,
            (0, k.jsxs)(`span`, {
              children: [
                (0, k.jsx)(`span`, {
                  className: `text-cyan-600`,
                  children: n.name,
                }),
                ` — Lịch sử hoạt động`,
              ],
            }),
          ],
        })),
        (t[13] = n.name),
        (t[14] = f));
    let p;
    t[15] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, k.jsx)(`i`, { className: `fas fa-times` })), (t[15] = p))
      : (p = t[15]);
    let m;
    (t[16] === r
      ? (m = t[17])
      : ((m = (0, k.jsx)(`button`, {
          onClick: r,
          className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
          children: p,
        })),
        (t[16] = r),
        (t[17] = m)),
      t[18] !== m || t[19] !== f
        ? ((c = (0, k.jsxs)(`div`, {
            className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
            children: [f, m],
          })),
          (t[18] = m),
          (t[19] = f),
          (t[20] = c))
        : (c = t[20]),
      (i = `flex-1 overflow-y-auto custom-scroll pr-2`),
      (a =
        e.length === 0
          ? (0, k.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-12 opacity-40`,
              children: [
                (0, k.jsx)(`i`, {
                  className: `fas fa-history text-4xl text-slate-300 mb-4`,
                }),
                (0, k.jsx)(`p`, {
                  className: `text-sm font-bold text-slate-500`,
                  children: `Chưa có lịch sử nào được ghi nhận.`,
                }),
              ],
            })
          : (0, k.jsx)(`div`, {
              className: `relative py-4`,
              children: e.map($),
            })),
      (t[0] = n.logs),
      (t[1] = n.name),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o),
      (t[6] = s),
      (t[7] = c),
      (t[8] = l),
      (t[9] = u));
  } else
    ((i = t[3]),
      (a = t[4]),
      (o = t[5]),
      (s = t[6]),
      (c = t[7]),
      (l = t[8]),
      (u = t[9]));
  let d;
  t[21] !== i || t[22] !== a
    ? ((d = (0, k.jsx)(`div`, { className: i, children: a })),
      (t[21] = i),
      (t[22] = a),
      (t[23] = d))
    : (d = t[23]);
  let f;
  t[24] !== o || t[25] !== s || t[26] !== c || t[27] !== d
    ? ((f = (0, k.jsxs)(`div`, { className: o, style: s, children: [c, d] })),
      (t[24] = o),
      (t[25] = s),
      (t[26] = c),
      (t[27] = d),
      (t[28] = f))
    : (f = t[28]);
  let p;
  return (
    t[29] !== l || t[30] !== u || t[31] !== f
      ? ((p = (0, k.jsx)(`div`, { className: l, style: u, children: f })),
        (t[29] = l),
        (t[30] = u),
        (t[31] = f),
        (t[32] = p))
      : (p = t[32]),
    p
  );
}
function $(e, t) {
  let n = (e.msg || ``).includes(`Import`),
    r = (e.msg || ``).includes(`Thêm mới`),
    i = n ? Z.Import : r ? Z[`Thêm mới`] : Z[`Cập nhật`];
  return (0, k.jsxs)(
    `div`,
    {
      className: `timeline-item relative pl-10 mb-5 last:mb-0`,
      children: [
        (0, k.jsx)(`div`, {
          className: `absolute left-0 top-1 w-8 h-8 rounded-full ${i.color} text-white flex items-center justify-center text-xs shadow-md border-2 border-white z-10`,
          children: (0, k.jsx)(`i`, { className: `fas ${i.icon}` }),
        }),
        (0, k.jsxs)(`div`, {
          className: `bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all`,
          children: [
            (0, k.jsxs)(`div`, {
              className: `flex justify-between items-start mb-1.5`,
              children: [
                (0, k.jsx)(`span`, {
                  className: `text-xs font-black text-slate-800`,
                  children: e.user || `system`,
                }),
                (0, k.jsx)(`span`, {
                  className: `text-[10px] font-bold text-slate-400 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-slate-100 shadow-sm`,
                  children: e.time || ``,
                }),
              ],
            }),
            (0, k.jsx)(`p`, {
              className: `text-sm font-medium text-slate-600 leading-relaxed`,
              children: e.msg || ``,
            }),
          ],
        }),
      ],
    },
    t,
  );
}
function ue({ onBack: e, onNavigateToOdf: t, isAdmin: n, username: r }) {
  let i = b((e) => e.DB),
    a = b((e) => e.ODFDB),
    s = b((e) => e.WifiDB),
    c = b((e) => e.WifiFloorplans),
    l = b((e) => e.saveWifiAP),
    u = b((e) => e.deleteWifiAP),
    f = b((e) => e.addGlobalLog),
    p = b((e) => e.saveWifiFloorplan),
    h = b((e) => e.deleteWifiFloorplan),
    y = S((e) => e.showDialog),
    C = _((e) => e.openReportModal),
    w = _((e) => e.focusRequest),
    E = _((e) => e.clearFocusRequest),
    [O, j] = (0, D.useState)(`all`),
    [M, N] = (0, D.useState)(null),
    [F, I] = (0, D.useState)(!1),
    [R, B] = (0, D.useState)(`closed`),
    [V, ee] = (0, D.useState)(`floorplan`);
  let [wifiSearch, setWifiSearch] = (0, D.useState)(''),
    [wifiSidebarTab, setWifiSidebarTab] = (0, D.useState)('list');
  (0, D.useEffect)(() => {
    if (!w || w.module !== `wifi`) return;
    let e = (s || []).find((e) => e.id === w.apId);
    (e && B(e), E());
  }, [w, E, s]);
  let [te, H] = (0, D.useState)(!1),
    [U, ne] = (0, D.useState)(null),
    [W, G] = (0, D.useState)(null),
    K = (c || []).find((e) => e.id === M) ?? null;
  function re() {
    if (!n) {
      y(`Bạn không có quyền thêm AP!`, `error`);
      return;
    }
    B(null);
  }
  function q(e) {
    (l(e), B(`closed`));
  }
  function ie() {
    R === `closed` ||
      !R ||
      (f(`WiFi AP: ${R.name}`, `Đã xóa AP [${R.name}] khỏi hệ thống`, r),
      u(R.id),
      B(`closed`));
  }
  function ae(e) {
    (e.forEach((e) => l(e)), H(!1));
  }
  function oe(e) {
    (e.forEach((e) => {
      let t = s.find((t) => t.id === e.apId);
      if (!t) return;
      let n = d(e.swName, e.port);
      l({ ...t, switchId: e.swId, switchPort: e.port, logs: o(t.logs, n, r) });
    }),
      H(!1));
  }
  async function se(e) {
    I(!0);
    try {
      let t = O === `all` ? `Chung` : O,
        n = `fp-${Date.now()}`,
        r = e.name.split(`.`).pop(),
        i = `${m}/${n}.${r}`,
        a = `${t} — ${e.name.replace(/\.[^.]+$/, ``)}`,
        { error: o } = await x(i, e);
      if (o) throw o;
      let s = { id: n, floor: t, name: a, url: g(i), storagePath: i };
      (p(s), N(s.id), y(`Đã upload bản vẽ "${a}" thành công!`, `success`));
    } catch (e) {
      y(
        `Upload thất bại: ${e instanceof Error ? e.message : String(e)}`,
        `error`,
      );
    } finally {
      I(!1);
    }
  }
  function Y() {
    if (!M) {
      y(`Chưa chọn bản vẽ nào!`, `error`);
      return;
    }
    let e = c.find((e) => e.id === M);
    y(
      `Xóa bản vẽ "${e?.name}"? Các AP đã định vị trên bản vẽ này sẽ mất vị trí.`,
      `confirm`,
      async () => {
        if (e?.storagePath) {
          let { error: t } = await v(e.storagePath);
          t && console.warn(`Không thể xóa file R2:`, t.message);
        }
        (s.forEach((e) => {
          e.floorplanId === M &&
            l({ ...e, x: null, y: null, floorplanId: null });
        }),
          h(M),
          N(c.find((e) => e.id !== M)?.id ?? null));
      },
    );
  }
  function ce(e, t) {
    if (!W || !M) return;
    let n = s.find((e) => e.id === W);
    if (!n) {
      G(null);
      return;
    }
    (l({ ...n, x: e, y: t, floorplanId: M }), G(null));
  }
  return (0, k.jsxs)(`div`, {
    id: `wifi-view`,
    className: `w-full h-full flex flex-col relative bg-slate-50/50`,
    children: [
      (0, k.jsxs)(`div`, {
        className: `view-header px-8 py-5 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0 shrink-0`,
        children: [
          (0, k.jsxs)(`div`, {
            children: [
              (0, k.jsxs)(`h2`, {
                className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
                children: [
                  (0, k.jsx)(`div`, {
                    className: `w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100`,
                    children: (0, k.jsx)(`i`, { className: `fas fa-wifi` }),
                  }),
                  `WiFi Topology`,
                ],
              }),
              (0, k.jsx)(`p`, {
                className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
                children: `Quản lý & Giám sát Access Point trên mặt bằng`,
              }),
            ],
          }),
          (0, k.jsxs)(`div`, {
            className: `view-header-actions flex items-center gap-3`,
            children: [
              (0, k.jsxs)(`button`, {
                onClick: () => C(`wifi`),
                className: `px-5 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2`,
                children: [
                  (0, k.jsx)(`i`, { className: `fas fa-chart-bar` }),
                  ` Báo cáo`,
                ],
              }),
              (0, k.jsxs)(`button`, {
                onClick: () => H(!0),
                title: `Import AP từ Switch Port VLAN 102`,
                className: `px-5 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-xl hover:bg-amber-100 transition-all flex items-center gap-2`,
                children: [
                  (0, k.jsx)(`i`, { className: `fas fa-download` }),
                  ` Import Switch`,
                ],
              }),
              (0, k.jsxs)(`button`, {
                onClick: re,
                className: `px-5 py-2.5 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-cyan-700 transition-all flex items-center gap-2`,
                children: [
                  (0, k.jsx)(`i`, { className: `fas fa-plus` }),
                  ` Thêm AP`,
                ],
              }),
              (0, k.jsxs)(`button`, {
                onClick: e,
                className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
                children: [
                  (0, k.jsx)(`i`, { className: `fas fa-arrow-left` }),
                  ` Quay lại`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, k.jsxs)(`div`, {
        id: `wifi-body`,
        className: `view-body flex flex-1 overflow-hidden`,
        children: [
          (0, k.jsx)(A, {
            db: s,
            networkDB: i,
            odfDB: a,
            floorFilter: O,
            onFloorFilterChange: j,
            onSelectAp: B,
            onShowLogs: ne,
            onDragApStart: G,
            onNavigateToOdf: t,
            searchQuery: wifiSearch,
            onSearchChange: setWifiSearch,
            sidebarTab: wifiSidebarTab,
            onTabChange: setWifiSidebarTab,
          }),
          (0, k.jsxs)(`div`, {
            className: `flex-1 overflow-auto custom-scroll p-6 flex flex-col gap-4`,
            children: [
              (0, k.jsxs)(`div`, {
                className: `flex items-center gap-1 shrink-0 bg-slate-100 border border-slate-200 rounded-xl p-1 w-fit`,
                children: [
                  (0, k.jsxs)(`button`, {
                    onClick: () => ee(`floorplan`),
                    className: `px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${V === `floorplan` ? `bg-white text-cyan-600 shadow-sm` : `text-slate-500 hover:text-slate-700`}`,
                    children: [
                      (0, k.jsx)(`i`, { className: `fas fa-map` }),
                      ` Mặt bằng`,
                    ],
                  }),
                  (0, k.jsxs)(`button`, {
                    onClick: () => ee(`table`),
                    className: `px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${V === `table` ? `bg-white text-cyan-600 shadow-sm` : `text-slate-500 hover:text-slate-700`}`,
                    children: [
                      (0, k.jsx)(`i`, { className: `fas fa-list-ol` }),
                      ` Danh sách`,
                    ],
                  }),
                ],
              }),
              V === `floorplan`
                ? (0, k.jsxs)(k.Fragment, {
                    children: [
                      (0, k.jsx)(P, {
                        floorplans: Array.isArray(c) ? c : [],
                        currentFloorplanId: M,
                        isUploading: F,
                        onSelectFloorplan: N,
                        onUpload: se,
                        onDelete: Y,
                      }),
                      (0, k.jsx)(L, {
                        floorplan: K,
                        aps: s,
                        onDragApStart: G,
                        onDropAp: ce,
                        onEditAp: B,
                      }),
                      (0, k.jsxs)(`div`, {
                        className: `flex gap-3 flex-wrap shrink-0`,
                        children: [
                          (0, k.jsxs)(`div`, {
                            className: `wifi-stat-badge bg-indigo-100 text-indigo-700`,
                            children: [
                              (0, k.jsx)(`span`, {
                                className: `w-2 h-2 rounded-full bg-indigo-500`,
                              }),
                              `Dual-band`,
                            ],
                          }),
                          (0, k.jsxs)(`div`, {
                            className: `wifi-stat-badge bg-purple-100 text-purple-700`,
                            children: [
                              (0, k.jsx)(`span`, {
                                className: `w-2 h-2 rounded-full bg-purple-500`,
                              }),
                              `Tri-band`,
                            ],
                          }),
                          (0, k.jsxs)(`div`, {
                            className: `wifi-stat-badge bg-cyan-100 text-cyan-700`,
                            children: [
                              (0, k.jsx)(`span`, {
                                className: `w-2 h-2 rounded-full bg-cyan-500`,
                              }),
                              `2.4G`,
                            ],
                          }),
                          (0, k.jsxs)(`div`, {
                            className: `wifi-stat-badge bg-amber-100 text-amber-700`,
                            children: [
                              (0, k.jsx)(`span`, {
                                className: `w-2 h-2 rounded-full bg-amber-500`,
                              }),
                              `5G`,
                            ],
                          }),
                          (0, k.jsxs)(`div`, {
                            className: `wifi-stat-badge bg-emerald-100 text-emerald-700`,
                            children: [
                              (0, k.jsx)(`span`, {
                                className: `w-2 h-2 rounded-full bg-emerald-500`,
                              }),
                              `6G`,
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, k.jsx)(z, {
                    db: s,
                    networkDB: i,
                    floorFilter: O,
                    onSelectAp: B,
                  }),
            ],
          }),
        ],
      }),
      R !== `closed` &&
        (0, k.jsx)(T, {
          ap: R,
          networkDB: i,
          isAdmin: n,
          username: r,
          onSave: q,
          onDelete: ie,
          onClose: () => B(`closed`),
        }),
      te &&
        (0, k.jsx)(J, {
          networkDB: i,
          wifiDB: s,
          username: r,
          onImport: ae,
          onApplyMappings: oe,
          onClose: () => H(!1),
        }),
      U && (0, k.jsx)(Q, { ap: U, onClose: () => ne(null) }),
    ],
  });
}
export { ue as default };
