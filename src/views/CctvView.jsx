import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  $ as r,
  G as i,
  H as a,
  J as o,
  K as s,
  N as c,
  Q as l,
  U as u,
  W as d,
  X as f,
  Y as p,
  Z as m,
  a as h,
  at as g,
  c as _,
  ct as v,
  dt as y,
  et as b,
  ft as x,
  ht as S,
  i as C,
  it as w,
  l as T,
  lt as E,
  mt as D,
  nt as O,
  o as k,
  ot as A,
  pt as j,
  q as M,
  rt as N,
  s as P,
  st as F,
  tn as I,
  tt as L,
  ut as R,
} from "./index-QE6I14Fy.js";
import { t as z } from "./elevator-BpwH_0-s.js";
var B = e(t(), 1),
  V = I(),
  H = n();
function matchMacAddress(itemMac, searchStr) {
  if (!itemMac || !searchStr) return false;
  let rawQ = searchStr.trim().toLowerCase();
  let cleanQ = rawQ.replace(/[:\-\.\s]/g, '');
  let rawMac = itemMac.toLowerCase();
  let cleanMac = rawMac.replace(/[:\-\.\s]/g, '');
  if (!cleanQ) return false;
  if (rawMac.includes(rawQ)) return true;
  if (cleanMac.includes(cleanQ)) return true;
  if (cleanQ.length <= 4 && cleanMac.endsWith(cleanQ)) return true;
  return false;
}

function U(e) {
  let {
    db: rawN,
    networkDB: rawR,
    nvrDB: rawI,
    floorFilter: a = 'all',
    onFloorFilterChange: s,
    nvrFilter: c = 'all',
    onNvrFilterChange: l,
    onSelectCamera: u,
    onDragCameraStart: d,
    onNavigateToSwitch: f,
  } = e;

  let [searchQuery, setSearchQuery] = (0, B.useState)('');
  let [sidebarTab, setSidebarTab] = (0, B.useState)('list');

  let n = Array.isArray(rawN) ? rawN : [];
  let r = Array.isArray(rawR) ? rawR : [];
  let i = Array.isArray(rawI) ? rawI : [];

  let stats = { total: 0, placed: 0, byFloor: [], unplacedByFloor: [] };
  try {
    stats = N(n);
  } catch (err) {
    stats = { total: 0, placed: 0, byFloor: [], unplacedByFloor: [] };
  }

  let floors = [];
  try {
    floors = o(r);
  } catch (err) {
    floors = [];
  }

  let nvrs = [];
  try {
    nvrs = S(n, i);
  } catch (err) {
    nvrs = [];
  }

  let rawCameras = [];
  try {
    rawCameras = g(n, a, c);
  } catch (err) {
    rawCameras = [];
  }

  let searchQ = (searchQuery || '').trim().toLowerCase();
  let displayCameras = searchQ
    ? rawCameras.filter((cam) => {
        if (!cam) return false;
        if (cam.name && cam.name.toLowerCase().includes(searchQ)) return true;
        if (cam.ip && cam.ip.toLowerCase().includes(searchQ)) return true;
        if (cam.floor && cam.floor.toLowerCase().includes(searchQ)) return true;
        if (cam.zone && cam.zone.toLowerCase().includes(searchQ)) return true;
        if (cam.model && cam.model.toLowerCase().includes(searchQ)) return true;
        if (matchMacAddress(cam.mac, searchQ)) return true;
        return false;
      })
    : rawCameras;

  // Header Tabs (Danh Sách vs Thống Kê NVR)
  let tabButtons = (0, H.jsxs)('div', {
    className: 'flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 pt-2 gap-1 shrink-0',
    children: [
      (0, H.jsxs)('button', {
        type: 'button',
        onClick: () => setSidebarTab('list'),
        className: `flex-1 py-2 px-2 text-xs rounded-t-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
          sidebarTab !== 'stats'
            ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 border-t border-x border-slate-200 dark:border-slate-700 shadow-xs font-black'
            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold'
        }`,
        children: [
          (0, H.jsx)('i', { className: 'fas fa-video text-xs' }),
          ` Danh Sách (${displayCameras.length})`
        ]
      }),
      (0, H.jsxs)('button', {
        type: 'button',
        onClick: () => setSidebarTab('stats'),
        className: `py-2 px-3 text-xs rounded-t-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
          sidebarTab === 'stats'
            ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 border-t border-x border-slate-200 dark:border-slate-700 shadow-xs font-black'
            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold'
        }`,
        children: [
          (0, H.jsx)('i', { className: 'fas fa-chart-pie text-xs' }),
          ' Thống Kê NVR'
        ]
      })
    ]
  });

  // Search Bar & Filter Controls
  let searchBar = (0, H.jsxs)('div', {
    className: 'p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-2 shrink-0',
    children: [
      (0, H.jsxs)('div', {
        className: 'relative flex items-center',
        children: [
          (0, H.jsx)('i', { className: 'fas fa-search absolute left-2.5 text-xs text-slate-400' }),
          (0, H.jsx)('input', {
            type: 'text',
            value: searchQuery,
            onChange: (ev) => setSearchQuery(ev.target.value),
            placeholder: '🔍 Tìm theo Tên, IP, MAC (4 số cuối hoặc đủ)...',
            className: 'w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 outline-none focus:border-orange-500 font-medium placeholder:text-slate-400'
          }),
          searchQuery &&
            (0, H.jsx)('button', {
              type: 'button',
              onClick: () => setSearchQuery(''),
              className: 'absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer',
              title: 'Xóa tìm kiếm',
              children: '✕'
            })
        ]
      }),
      (0, H.jsxs)('div', {
        className: 'flex items-center gap-2',
        children: [
          (0, H.jsxs)('select', {
            id: 'cctv-floor-filter',
            value: a,
            onChange: (ev) => s(ev.target.value),
            className: 'flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 py-1 px-1.5 outline-none truncate cursor-pointer',
            title: 'Lọc theo tầng',
            children: [
              (0, H.jsx)('option', { value: 'all', children: 'Tất cả tầng' }),
              floors.map(G)
            ]
          }),
          (0, H.jsxs)('select', {
            id: 'cctv-nvr-filter',
            value: c,
            onChange: (ev) => l(ev.target.value),
            className: 'flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 py-1 px-1.5 outline-none truncate cursor-pointer',
            title: 'Lọc theo NVR',
            children: [
              (0, H.jsx)('option', { value: 'all', children: 'Tất cả NVR' }),
              nvrs.map(W)
            ]
          })
        ]
      })
    ]
  });

  // Render camera card list
  let cameraListContent =
    displayCameras.length === 0
      ? (0, H.jsxs)('div', {
          className: 'flex flex-col items-center justify-center py-12 opacity-40',
          children: [
            (0, H.jsx)('i', { className: 'fas fa-video text-3xl text-slate-400 mb-3' }),
            (0, H.jsxs)('p', {
              className: 'text-xs font-bold text-slate-500 text-center px-4',
              children: [
                searchQ ? `Không tìm thấy camera khớp với "${searchQuery}"` : 'Chưa có camera nào',
                a === 'all' ? '' : ' ở tầng này',
                c === 'all' ? '' : ' thuộc NVR này'
              ]
            })
          ]
        })
      : displayCameras.map((cam) => {
          let placed = cam.x != null && !!cam.floorplanId,
            logCount = cam.logs?.length ?? 0,
            badgeInfo = { icon: 'fa-video', label: '', badge: '' },
            switchInfo = null;

          try {
            let bi = b(cam);
            if (bi) badgeInfo = bi;
          } catch (err) {}

          try {
            switchInfo = E(cam, r);
          } catch (err) {}

          return (0, H.jsxs)(
            'div',
            {
              className: `cctv-device-card ${placed ? 'placed' : ''} select-none`,
              draggable: true,
              onDragStart: (ev) => {
                ev.dataTransfer.effectAllowed = 'move';
                d(cam.id);
              },
              onClick: () => u(cam),
              children: [
                // Top row: Icon + Name + Angle/Placed
                (0, H.jsxs)('div', {
                  className: 'flex items-center gap-2.5',
                  children: [
                    (0, H.jsx)('div', {
                      className: 'w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center shrink-0',
                      children: (0, H.jsx)('i', {
                        className: `fas ${badgeInfo.icon || 'fa-video'} text-orange-600 dark:text-orange-400 text-xs`
                      })
                    }),
                    (0, H.jsxs)('div', {
                      className: 'flex-1 min-w-0',
                      children: [
                        (0, H.jsx)('p', {
                          className: 'text-xs font-black text-slate-800 dark:text-slate-100 truncate',
                          title: cam.name,
                          children: cam.name
                        }),
                        (0, H.jsxs)('p', {
                          className: 'text-[10px] font-bold text-slate-400 truncate',
                          children: [cam.floor || 'Chưa gán tầng', cam.zone ? ' · ' + cam.zone : '']
                        })
                      ]
                    }),
                    (0, H.jsxs)('div', {
                      className: 'flex flex-col items-end gap-1 shrink-0',
                      children: [
                        (0, H.jsxs)('span', {
                          className: 'cctv-stat-badge bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-[9px] px-1.5 py-0.5 rounded',
                          children: [
                            (0, H.jsx)('i', {
                              className: 'fas fa-location-arrow text-[8px] mr-0.5',
                              style: { rotate: `${cam.angle || 0}deg` }
                            }),
                            `${cam.angle || 0}°`
                          ]
                        }),
                        placed &&
                          (0, H.jsxs)('span', {
                            className: 'text-[8px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center',
                            children: [
                              (0, H.jsx)('i', { className: 'fas fa-map-marker-alt mr-0.5' }),
                              'Đã định vị'
                            ]
                          })
                      ]
                    })
                  ]
                }),

                // Middle row: IP + MAC address
                (0, H.jsxs)('div', {
                  className: 'mt-2 flex items-center gap-2 flex-wrap text-[10px]',
                  children: [
                    cam.ip &&
                      (0, H.jsxs)('span', {
                        className: 'font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded font-bold flex items-center gap-1',
                        children: [
                          (0, H.jsx)('i', { className: 'fas fa-network-wired text-[8px] opacity-70' }),
                          cam.ip
                        ]
                      }),
                    cam.mac &&
                      (0, H.jsxs)('span', {
                        className: 'font-mono text-[9px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase tracking-tight',
                        title: `MAC: ${cam.mac}`,
                        children: [
                          (0, H.jsx)('i', { className: 'fas fa-barcode text-[8px] mr-1 opacity-60' }),
                          cam.mac
                        ]
                      })
                  ]
                }),

                // Bottom row: Switch port / logs badges
                (0, H.jsxs)('div', {
                  className: 'mt-1.5 flex items-center gap-1.5 flex-wrap text-[10px]',
                  children: [
                    badgeInfo.label &&
                      (0, H.jsx)('span', {
                        className: `cctv-stat-badge ${badgeInfo.badge || ''}`,
                        children: badgeInfo.label
                      }),
                    switchInfo &&
                      (0, H.jsxs)('button', {
                        type: 'button',
                        onClick: (ev) => {
                          ev.stopPropagation();
                          f(switchInfo.switchId, switchInfo.port);
                        },
                        title: 'Xem trên sơ đồ Switch',
                        className: 'flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer',
                        children: [
                          (0, H.jsx)('i', { className: 'fas fa-diagram-project text-[7px]' }),
                          `${switchInfo.port}`
                        ]
                      }),
                    (0, H.jsxs)('span', {
                      className: 'ml-auto px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[9px] font-bold flex items-center gap-1',
                      children: [
                        (0, H.jsx)('i', { className: 'fas fa-history text-[8px]' }),
                        `${logCount} log`
                      ]
                    })
                  ]
                })
              ]
            },
            cam.id
          );
        });

  // Overview / Stats Panel Content
  let statsOverviewContent = (0, H.jsxs)('div', {
    className: 'p-4 space-y-3',
    children: [
      (0, H.jsxs)('div', {
        className: 'flex items-center justify-between mb-2',
        children: [
          (0, H.jsx)('span', {
            className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest',
            children: 'Tổng quan'
          }),
          (0, H.jsxs)('span', {
            className: 'text-lg font-black text-orange-600',
            children: [stats.total || 0, ' ', (0, H.jsx)('span', { className: 'text-xs font-bold text-slate-400', children: 'Camera' })]
          })
        ]
      }),
      (0, H.jsxs)('div', {
        className: 'flex flex-wrap gap-1.5',
        children: [
          (stats.total || 0) === 0
            ? (0, H.jsx)('span', { className: 'text-[10px] text-slate-400 italic', children: 'Chưa có camera nào' })
            : (0, H.jsxs)('span', { className: 'cctv-stat-badge bg-emerald-100 text-emerald-700', children: ['Đã định vị: ', stats.placed || 0, '/', stats.total || 0] }),
          (stats.total || 0) - (stats.placed || 0) > 0 &&
            (0, H.jsxs)('span', {
              className: 'cctv-stat-badge bg-amber-100 text-amber-700',
              children: [
                (0, H.jsx)('i', { className: 'fas fa-triangle-exclamation' }),
                ' Chưa định vị: ',
                (stats.total || 0) - (stats.placed || 0)
              ]
            })
        ]
      }),
      stats.unplacedByFloor && stats.unplacedByFloor.length > 0 &&
        (0, H.jsxs)('div', {
          className: 'mt-3 pt-3 border-t border-slate-100 dark:border-slate-800',
          children: [
            (0, H.jsxs)('div', {
              className: 'text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2',
              children: [
                (0, H.jsx)('i', { className: 'fas fa-triangle-exclamation mr-1' }),
                'Cần sắp xếp (chưa định vị)'
              ]
            }),
            (0, H.jsx)('div', {
              className: 'space-y-1.5 max-h-36 overflow-y-auto custom-scroll',
              children: stats.unplacedByFloor.map(J)
            })
          ]
        }),
      (0, H.jsxs)('div', {
        className: 'mt-3 pt-3 border-t border-slate-100 dark:border-slate-800',
        children: [
          (0, H.jsx)('div', {
            className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2',
            children: 'Theo tầng'
          }),
          (0, H.jsx)('div', {
            className: 'space-y-1.5 max-h-48 overflow-y-auto custom-scroll',
            children: (!stats.byFloor || stats.byFloor.length === 0)
              ? (0, H.jsx)('p', { className: 'text-[10px] text-slate-400 italic', children: 'Chưa có dữ liệu' })
              : stats.byFloor.map(q)
          })
        ]
      }),
      nvrs && nvrs.length > 0 &&
        (0, H.jsxs)('div', {
          className: 'mt-3 pt-3 border-t border-slate-100 dark:border-slate-800',
          children: [
            (0, H.jsx)('div', {
              className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2',
              children: 'Đầu ghi (NVR)'
            }),
            (0, H.jsx)('div', {
              className: 'space-y-1.5 max-h-48 overflow-y-auto custom-scroll',
              children: nvrs.map(K)
            })
          ]
        })
    ]
  });

  return (0, H.jsxs)('div', {
    id: 'cctv-left-panel',
    className: 'view-sidebar w-[320px] shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden',
    children: [
      tabButtons,
      sidebarTab === 'stats'
        ? (0, H.jsx)('div', { className: 'flex-1 overflow-y-auto custom-scroll', children: statsOverviewContent })
        : (0, H.jsxs)(H.Fragment, {
            children: [
              searchBar,
              (0, H.jsx)('div', {
                className: 'flex-1 overflow-y-auto custom-scroll p-3 space-y-2',
                children: cameraListContent
              })
            ]
          })
    ]
  });
}
function W(e) {
  return (0, H.jsx)(`option`, { value: e.nvrId, children: e.name }, e.nvrId);
}
function G(e) {
  return (0, H.jsx)(`option`, { value: e, children: e }, e);
}
function K(e) {
  return (0, H.jsxs)(
    `div`,
    {
      className: `text-[10px]`,
      children: [
        (0, H.jsxs)(`div`, {
          className: `flex items-center justify-between`,
          children: [
            (0, H.jsxs)(`span`, {
              className: `font-bold text-slate-600 truncate flex items-center gap-1`,
              children: [
                (0, H.jsx)(`i`, { className: `fas fa-hdd text-slate-400` }),
                e.name,
              ],
            }),
            (0, H.jsxs)(`span`, {
              className: `font-black text-slate-500 shrink-0`,
              children: [e.usedChannels, `/`, e.channels, ` kênh`],
            }),
          ],
        }),
        e.ip &&
          (0, H.jsx)(`p`, {
            className: `font-mono text-slate-400`,
            children: e.ip,
          }),
        (0, H.jsx)(`div`, {
          className: `mt-0.5 h-1 bg-slate-100 rounded-full overflow-hidden`,
          children: (0, H.jsx)(`div`, {
            className: `h-full bg-orange-400`,
            style: {
              width: `${Math.min(100, (e.usedChannels / e.channels) * 100)}%`,
            },
          }),
        }),
      ],
    },
    e.nvrId,
  );
}
function q(e) {
  let [t, n] = e;
  return (0, H.jsxs)(
    `div`,
    {
      className: `flex items-center justify-between`,
      children: [
        (0, H.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-600 truncate`,
          children: t,
        }),
        (0, H.jsx)(`span`, {
          className: `text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function J(e) {
  let [t, n] = e;
  return (0, H.jsxs)(
    `div`,
    {
      className: `flex items-center justify-between`,
      children: [
        (0, H.jsx)(`span`, {
          className: `text-[10px] font-bold text-slate-600 truncate`,
          children: t,
        }),
        (0, H.jsx)(`span`, {
          className: `text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full`,
          children: n,
        }),
      ],
    },
    t,
  );
}
function Y(e) {
  let t = (0, V.c)(48),
    {
      floorplans: n,
      currentFloorplanId: r,
      isUploading: i,
      onSelectFloorplan: a,
      onUpload: o,
      onDelete: s,
      onOpenCopyLayout: c,
      investigateMode: l,
      onToggleInvestigateMode: u,
    } = e,
    [d, f] = (0, B.useState)(`asc`),
    p;
  t[0] !== n || t[1] !== d
    ? ((p = D(n, d)), (t[0] = n), (t[1] = d), (t[2] = p))
    : (p = t[2]);
  let m = p,
    h;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = (0, H.jsx)(`label`, {
        htmlFor: `cctv-floorplan-select`,
        className: `text-[10px] font-black text-slate-400 uppercase tracking-widest`,
        children: `Bản vẽ tầng:`,
      })),
      (t[3] = h))
    : (h = t[3]);
  let g = r ?? ``,
    _;
  t[4] === a
    ? (_ = t[5])
    : ((_ = (e) => a(e.target.value)), (t[4] = a), (t[5] = _));
  let v;
  t[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = (0, H.jsx)(`option`, { value: ``, children: `-- Chọn bản vẽ --` })),
      (t[6] = v))
    : (v = t[6]);
  let y;
  t[7] === m ? (y = t[8]) : ((y = m.map(te)), (t[7] = m), (t[8] = y));
  let b;
  t[9] !== g || t[10] !== _ || t[11] !== y
    ? ((b = (0, H.jsxs)(`select`, {
        id: `cctv-floorplan-select`,
        value: g,
        onChange: _,
        className: `bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-1.5 px-3 focus:outline-none focus:border-orange-500`,
        children: [v, y],
      })),
      (t[9] = g),
      (t[10] = _),
      (t[11] = y),
      (t[12] = b))
    : (b = t[12]);
  let x;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = () => f(ee)), (t[13] = x))
    : (x = t[13]);
  let S =
      d === `asc`
        ? `Đang xếp tăng dần (Basement → tầng cao) — bấm để xếp giảm dần`
        : `Đang xếp giảm dần (tầng cao → Basement) — bấm để xếp tăng dần`,
    C = d === `asc` ? `Sắp xếp tăng dần` : `Sắp xếp giảm dần`,
    w = `fas ${d === `asc` ? `fa-arrow-down-1-9` : `fa-arrow-up-9-1`}`,
    T;
  t[14] === w
    ? (T = t[15])
    : ((T = (0, H.jsx)(`i`, { className: w })), (t[14] = w), (t[15] = T));
  let E = d === `asc` ? `Tăng dần` : `Giảm dần`,
    O;
  t[16] !== C || t[17] !== T || t[18] !== E || t[19] !== S
    ? ((O = (0, H.jsxs)(`button`, {
        type: `button`,
        onClick: x,
        title: S,
        "aria-label": C,
        className: `px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center gap-1.5`,
        children: [T, ` `, E],
      })),
      (t[16] = C),
      (t[17] = T),
      (t[18] = E),
      (t[19] = S),
      (t[20] = O))
    : (O = t[20]);
  let k;
  t[21] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, H.jsx)(`i`, { className: `fas fa-upload` })), (t[21] = k))
    : (k = t[21]);
  let A;
  t[22] === o
    ? (A = t[23])
    : ((A = (0, H.jsxs)(`label`, {
        className: `px-4 py-1.5 bg-white border border-dashed border-orange-400 text-orange-600 rounded-lg text-xs font-bold cursor-pointer hover:bg-orange-50 transition-colors flex items-center gap-1.5`,
        children: [
          k,
          ` Upload bản vẽ`,
          (0, H.jsx)(`input`, {
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
      (t[22] = o),
      (t[23] = A));
  let j;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((j = (0, H.jsx)(`i`, { className: `fas fa-trash` })), (t[24] = j))
    : (j = t[24]);
  let M;
  t[25] === s
    ? (M = t[26])
    : ((M = (0, H.jsx)(`button`, {
        onClick: s,
        title: `Xóa bản vẽ hiện tại`,
        className: `px-3 py-1.5 bg-red-50 border border-red-200 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5`,
        children: j,
      })),
      (t[25] = s),
      (t[26] = M));
  let N;
  t[27] !== r || t[28] !== n || t[29] !== c
    ? ((N =
        r &&
        n.length > 1 &&
        (0, H.jsxs)(`button`, {
          onClick: c,
          title: `Sao chép vị trí camera từ một tầng khác có layout giống nhau`,
          className: `px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1.5`,
          children: [
            (0, H.jsx)(`i`, { className: `fas fa-clone` }),
            ` Sao chép layout`,
          ],
        })),
      (t[27] = r),
      (t[28] = n),
      (t[29] = c),
      (t[30] = N))
    : (N = t[30]);
  let P;
  t[31] !== r || t[32] !== l || t[33] !== u
    ? ((P =
        r &&
        (0, H.jsxs)(`button`, {
          onClick: u,
          title: `Click vào một điểm trên bản vẽ để xem camera nào đang hướng về điểm đó`,
          className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${l ? `bg-orange-600 border-orange-600 text-white hover:bg-orange-700` : `bg-white border-orange-200 text-orange-600 hover:bg-orange-50`}`,
          children: [
            (0, H.jsx)(`i`, { className: `fas fa-crosshairs` }),
            ` `,
            l ? `Đang điều tra…` : `Tra cứu điểm nhìn`,
          ],
        })),
      (t[31] = r),
      (t[32] = l),
      (t[33] = u),
      (t[34] = P))
    : (P = t[34]);
  let F;
  t[35] !== l || t[36] !== i
    ? ((F = i
        ? (0, H.jsxs)(`span`, {
            className: `text-orange-600`,
            children: [
              (0, H.jsx)(`i`, {
                className: `fas fa-spinner fa-spin text-orange-500 mr-1`,
              }),
              `Đang upload...`,
            ],
          })
        : l
          ? `Click vào bản vẽ để tra cứu camera hướng về điểm đó`
          : `Kéo Camera từ danh sách sang bản vẽ để đặt vị trí`),
      (t[35] = l),
      (t[36] = i),
      (t[37] = F))
    : (F = t[37]);
  let I;
  t[38] === F
    ? (I = t[39])
    : ((I = (0, H.jsx)(`div`, {
        className: `ml-auto text-[10px] text-slate-400 font-bold italic`,
        children: F,
      })),
      (t[38] = F),
      (t[39] = I));
  let L;
  return (
    t[40] !== O ||
    t[41] !== A ||
    t[42] !== M ||
    t[43] !== N ||
    t[44] !== P ||
    t[45] !== I ||
    t[46] !== b
      ? ((L = (0, H.jsxs)(`div`, {
          className: `flex items-center gap-3 shrink-0`,
          children: [h, b, O, A, M, N, P, I],
        })),
        (t[40] = O),
        (t[41] = A),
        (t[42] = M),
        (t[43] = N),
        (t[44] = P),
        (t[45] = I),
        (t[46] = b),
        (t[47] = L))
      : (L = t[47]),
    L
  );
}
function ee(e) {
  return e === `asc` ? `desc` : `asc`;
}
function te(e) {
  return (0, H.jsx)(`option`, { value: e.id, children: e.name }, e.id);
}
var ne = 46;
function re(e) {
  let t = (0, V.c)(69),
    {
      camera: n,
      nvrLink: r,
      left: i,
      top: a,
      zoom: o,
      onMoveEnd: s,
      onEdit: c,
      onRotate: l,
      onOpenAngleMenu: d,
      onToggleLock: f,
    } = e,
    p = (0, B.useRef)(null),
    m = (0, B.useRef)(null),
    [h, g] = (0, B.useState)(null),
    _ = h ?? n.angle,
    v;
  t[0] === n ? (v = t[1]) : ((v = b(n)), (t[0] = n), (t[1] = v));
  let y = v,
    x;
  t[2] === n.fov
    ? (x = t[3])
    : ((x = w(n.fov, ne)), (t[2] = n.fov), (t[3] = x));
  let S = x,
    C;
  t[4] === n.locked
    ? (C = t[5])
    : ((C = function (e) {
        (e.stopPropagation(),
          !n.locked &&
            (e.currentTarget.setPointerCapture?.(e.pointerId),
            (m.current = { pointerId: e.pointerId })));
      }),
      (t[4] = n.locked),
      (t[5] = C));
  let T = C,
    E;
  t[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = function (e) {
        if (!m.current || e.pointerId !== m.current.pointerId) return;
        let t = p.current?.getBoundingClientRect();
        if (!t) return;
        let n = t.left + t.width / 2,
          r = t.top + t.height / 2;
        g(u(e.clientX - n, e.clientY - r));
      }),
      (t[6] = E))
    : (E = t[6]);
  let D = E,
    O;
  t[7] !== h || t[8] !== l
    ? ((O = function (e) {
        m.current?.pointerId === e.pointerId &&
          ((m.current = null), h != null && l(h), g(null));
      }),
      (t[7] = h),
      (t[8] = l),
      (t[9] = O))
    : (O = t[9]);
  let k = O,
    A = (0, B.useRef)(null),
    [M, N] = (0, B.useState)(null),
    P;
  t[10] === n.locked
    ? (P = t[11])
    : ((P = function (e) {
        n.locked ||
          (e.currentTarget.setPointerCapture?.(e.pointerId),
          (A.current = {
            pointerId: e.pointerId,
            startClientX: e.clientX,
            startClientY: e.clientY,
          }));
      }),
      (t[10] = n.locked),
      (t[11] = P));
  let F = P,
    I;
  t[12] === o
    ? (I = t[13])
    : ((I = function (e) {
        !A.current ||
          e.pointerId !== A.current.pointerId ||
          N({
            dx: (e.clientX - A.current.startClientX) / o,
            dy: (e.clientY - A.current.startClientY) / o,
          });
      }),
      (t[12] = o),
      (t[13] = I));
  let L = I,
    R;
  t[14] !== M || t[15] !== s
    ? ((R = function (e) {
        A.current?.pointerId === e.pointerId &&
          ((A.current = null), M && s(e.clientX, e.clientY), N(null));
      }),
      (t[14] = M),
      (t[15] = s),
      (t[16] = R))
    : (R = t[16]);
  let z = R,
    U = M ? i + M.dx : i,
    W = M ? a + M.dy : a,
    G = `cctv-cam-pin${n.locked ? ` locked` : ``}`,
    K;
  t[17] !== U || t[18] !== W
    ? ((K = {
        left: U,
        top: W,
        position: `absolute`,
        transform: `translate(-50%, -100%)`,
      }),
      (t[17] = U),
      (t[18] = W),
      (t[19] = K))
    : (K = t[19]);
  let q = `${n.name} | ${n.ip || `No IP`}`,
    J;
  t[20] === c
    ? (J = t[21])
    : ((J = (e) => {
        (e.stopPropagation(), c());
      }),
      (t[20] = c),
      (t[21] = J));
  let Y;
  t[22] === d
    ? (Y = t[23])
    : ((Y = (e) => {
        (e.preventDefault(), e.stopPropagation(), d(e.clientX, e.clientY));
      }),
      (t[22] = d),
      (t[23] = Y));
  let ee = `${_}deg`,
    te;
  t[24] === ee
    ? (te = t[25])
    : ((te = { rotate: ee }), (t[24] = ee), (t[25] = te));
  let re;
  t[26] === S
    ? (re = t[27])
    : ((re = (0, H.jsx)(`div`, {
        className: `cctv-cam-cone-shape`,
        style: {
          borderLeftWidth: S,
          borderRightWidth: S,
          borderBottomWidth: ne,
        },
      })),
      (t[26] = S),
      (t[27] = re));
  let X = `fas ${y.icon}`,
    oe;
  t[28] === X
    ? (oe = t[29])
    : ((oe = (0, H.jsx)(`i`, { className: X })), (t[28] = X), (t[29] = oe));
  let se;
  t[30] !== T || t[31] !== k || t[32] !== oe
    ? ((se = (0, H.jsx)(`div`, {
        className: `cctv-cam-rotate-handle`,
        onPointerDown: T,
        onPointerMove: D,
        onPointerUp: k,
        onPointerCancel: k,
        children: oe,
      })),
      (t[30] = T),
      (t[31] = k),
      (t[32] = oe),
      (t[33] = se))
    : (se = t[33]);
  let ce;
  t[34] !== te || t[35] !== re || t[36] !== se
    ? ((ce = (0, H.jsxs)(`div`, {
        className: `cctv-cam-cone`,
        style: te,
        children: [re, se],
      })),
      (t[34] = te),
      (t[35] = re),
      (t[36] = se),
      (t[37] = ce))
    : (ce = t[37]);
  let le = `cctv-cam-lock-btn${n.locked ? ` locked` : ``}`,
    ue = n.locked ? `Mở khóa vị trí` : `Khóa vị trí (chống kéo/xoay nhầm)`,
    de;
  t[38] === f
    ? (de = t[39])
    : ((de = (e) => {
        (e.stopPropagation(), f());
      }),
      (t[38] = f),
      (t[39] = de));
  let fe = `fas ${n.locked ? `fa-lock` : `fa-lock-open`}`,
    pe;
  t[40] === fe
    ? (pe = t[41])
    : ((pe = (0, H.jsx)(`i`, { className: fe })), (t[40] = fe), (t[41] = pe));
  let me;
  t[42] !== le || t[43] !== ue || t[44] !== de || t[45] !== pe
    ? ((me = (0, H.jsx)(`button`, {
        type: `button`,
        className: le,
        title: ue,
        onClick: de,
        onPointerDown: ae,
        onDoubleClick: ie,
        children: pe,
      })),
      (t[42] = le),
      (t[43] = ue),
      (t[44] = de),
      (t[45] = pe),
      (t[46] = me))
    : (me = t[46]);
  let he;
  t[47] === r
    ? (he = t[48])
    : ((he = r
        ? (0, H.jsxs)(`span`, {
            className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-black border whitespace-nowrap ${j(r.nvrId)}`,
            children: [
              (0, H.jsx)(`i`, { className: `fas fa-hdd text-[7px]` }),
              ` `,
              r.nvrName,
            ],
          })
        : (0, H.jsxs)(`span`, {
            className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold border border-slate-600 bg-slate-700 text-slate-300 whitespace-nowrap`,
            children: [
              (0, H.jsx)(`i`, { className: `fas fa-hdd text-[7px]` }),
              ` Chưa gán NVR`,
            ],
          })),
      (t[47] = r),
      (t[48] = he));
  let ge;
  t[49] === n.name
    ? (ge = t[50])
    : ((ge = (0, H.jsx)(`span`, {
        className: `text-white font-black`,
        children: n.name,
      })),
      (t[49] = n.name),
      (t[50] = ge));
  let _e = n.ip || `—`,
    Z;
  t[51] === _e
    ? (Z = t[52])
    : ((Z = (0, H.jsx)(`span`, {
        className: `font-mono font-bold text-indigo-300`,
        children: _e,
      })),
      (t[51] = _e),
      (t[52] = Z));
  let Q;
  t[53] !== he || t[54] !== ge || t[55] !== Z
    ? ((Q = (0, H.jsxs)(`div`, {
        className: `cctv-cam-tooltip`,
        children: [he, ge, Z],
      })),
      (t[53] = he),
      (t[54] = ge),
      (t[55] = Z),
      (t[56] = Q))
    : (Q = t[56]);
  let $;
  return (
    t[57] !== F ||
    t[58] !== L ||
    t[59] !== z ||
    t[60] !== K ||
    t[61] !== q ||
    t[62] !== J ||
    t[63] !== Y ||
    t[64] !== ce ||
    t[65] !== me ||
    t[66] !== Q ||
    t[67] !== G
      ? (($ = (0, H.jsxs)(`div`, {
          ref: p,
          className: G,
          style: K,
          title: q,
          onPointerDown: F,
          onPointerMove: L,
          onPointerUp: z,
          onPointerCancel: z,
          onDoubleClick: J,
          onContextMenu: Y,
          children: [ce, me, Q],
        })),
        (t[57] = F),
        (t[58] = L),
        (t[59] = z),
        (t[60] = K),
        (t[61] = q),
        (t[62] = J),
        (t[63] = Y),
        (t[64] = ce),
        (t[65] = me),
        (t[66] = Q),
        (t[67] = G),
        (t[68] = $))
      : ($ = t[68]),
    $
  );
}
function ie(e) {
  return e.stopPropagation();
}
function ae(e) {
  return e.stopPropagation();
}
var X = 0.25;
function oe(e) {
  let t = (0, V.c)(20),
    {
      floorplan: n,
      cameras: r,
      nvrDB: i,
      onDropCamera: a,
      onMoveCamera: o,
      onEditCamera: s,
      onRotateCamera: l,
      onOpenAngleMenu: u,
      onToggleLock: d,
      investigateMode: f,
      investigatePoint: p,
      onInvestigatePoint: m,
    } = e,
    h = (0, B.useRef)(null),
    g = (0, B.useRef)(null),
    [_, y] = (0, B.useState)(null),
    [b, x] = (0, B.useState)(1),
    S;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = function () {
        let e = h.current,
          t = g.current;
        if (!e || !t) {
          y(null);
          return;
        }
        y(
          c({
            containerWidth: e.clientWidth,
            containerHeight: e.clientHeight,
            imageNaturalWidth: t.naturalWidth,
            imageNaturalHeight: t.naturalHeight,
          }),
        );
      }),
      (t[0] = S))
    : (S = t[0]);
  let C = S,
    w;
  (t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = () => (
        window.addEventListener(`resize`, C),
        () => window.removeEventListener(`resize`, C)
      )),
      (t[1] = w))
    : (w = t[1]),
    (0, B.useEffect)(w));
  let T;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = () => {
        (y(null), x(1));
      }),
      (t[2] = T))
    : (T = t[2]);
  let E = n?.id,
    D;
  (t[3] === E ? (D = t[4]) : ((D = [E]), (t[3] = E), (t[4] = D)),
    (0, B.useEffect)(T, D));
  let O;
  if (
    t[5] !== _ ||
    t[6] !== r ||
    t[7] !== n ||
    t[8] !== f ||
    t[9] !== p ||
    t[10] !== i ||
    t[11] !== a ||
    t[12] !== s ||
    t[13] !== m ||
    t[14] !== o ||
    t[15] !== u ||
    t[16] !== l ||
    t[17] !== d ||
    t[18] !== b
  ) {
    let e = function (e, t) {
        if (!h.current) return null;
        let n = h.current.getBoundingClientRect();
        return { x: (e - n.left) / b, y: (t - n.top) / b };
      },
      c = function (t) {
        t.preventDefault();
        let n = _ ? e(t.clientX, t.clientY) : null;
        if (!_ || !n) return;
        let r = ((n.x - _.offsetX) / _.renderedW) * 100,
          i = ((n.y - _.offsetY) / _.renderedH) * 100;
        a(Math.max(0, Math.min(100, r)), Math.max(0, Math.min(100, i)));
      },
      y = function (t, n, r) {
        let i = _ ? e(n, r) : null;
        if (!_ || !i) return;
        let a = ((i.x - _.offsetX) / _.renderedW) * 100,
          s = ((i.y - _.offsetY) / _.renderedH) * 100;
        o(t, Math.max(0, Math.min(100, a)), Math.max(0, Math.min(100, s)));
      },
      S = function (t) {
        if (!f || !_ || !n) return;
        let i = e(t.clientX, t.clientY);
        if (!i) return;
        let a = A(r, n.id, i, _),
          o = Math.max(
            0,
            Math.min(100, ((i.x - _.offsetX) / _.renderedW) * 100),
          ),
          s = Math.max(
            0,
            Math.min(100, ((i.y - _.offsetY) / _.renderedH) * 100),
          );
        m(a, { xPct: o, yPct: s }, t.clientX, t.clientY);
      },
      w = n ? r.filter((e) => e.floorplanId === n.id && e.x != null) : [];
    ((O = (0, H.jsx)(`div`, {
      className: `cctv-floorplan-container flex-1`,
      children: n
        ? (0, H.jsxs)(H.Fragment, {
            children: [
              (0, H.jsxs)(`div`, {
                className: `cctv-zoom-controls`,
                children: [
                  (0, H.jsx)(`button`, {
                    onClick: () => x(le),
                    disabled: b >= 3,
                    title: `Phóng to`,
                    "aria-label": `Phóng to`,
                    children: (0, H.jsx)(`i`, { className: `fas fa-plus` }),
                  }),
                  (0, H.jsxs)(`span`, {
                    className: `cctv-zoom-controls-value`,
                    children: [Math.round(b * 100), `%`],
                  }),
                  (0, H.jsx)(`button`, {
                    onClick: () => x(ce),
                    disabled: b <= 1,
                    title: `Thu nhỏ`,
                    "aria-label": `Thu nhỏ`,
                    children: (0, H.jsx)(`i`, { className: `fas fa-minus` }),
                  }),
                ],
              }),
              (0, H.jsxs)(`div`, {
                ref: h,
                className: `cctv-floorplan-zoom-layer`,
                style: {
                  transform: `scale(${b})`,
                  cursor: f ? `crosshair` : void 0,
                },
                onDragOver: se,
                onDrop: c,
                onClick: S,
                children: [
                  (0, H.jsx)(`img`, {
                    ref: g,
                    className: `cctv-floorplan-img`,
                    src: n.url,
                    alt: n.name,
                    onLoad: C,
                  }),
                  _ &&
                    w.map((e) =>
                      (0, H.jsx)(
                        re,
                        {
                          camera: e,
                          nvrLink: v(e, i),
                          left: _.offsetX + ((e.x ?? 0) / 100) * _.renderedW,
                          top: _.offsetY + ((e.y ?? 0) / 100) * _.renderedH,
                          zoom: b,
                          onMoveEnd: (t, n) => y(e.id, t, n),
                          onEdit: () => s(e),
                          onRotate: (t) => l(e.id, t),
                          onOpenAngleMenu: (t, n) => u(e.id, t, n),
                          onToggleLock: () => d(e.id),
                        },
                        e.id,
                      ),
                    ),
                  _ &&
                    p &&
                    (0, H.jsx)(`div`, {
                      className: `cctv-investigate-marker`,
                      style: {
                        left: _.offsetX + (p.xPct / 100) * _.renderedW,
                        top: _.offsetY + (p.yPct / 100) * _.renderedH,
                      },
                    }),
                ],
              }),
            ],
          })
        : (0, H.jsxs)(`div`, {
            className: `h-full flex flex-col items-center justify-center opacity-40 py-20`,
            children: [
              (0, H.jsx)(`i`, {
                className: `fas fa-map text-5xl text-slate-400 mb-4`,
              }),
              (0, H.jsx)(`p`, {
                className: `text-sm font-bold text-slate-500 uppercase tracking-widest`,
                children: `Upload bản vẽ mặt bằng để bắt đầu`,
              }),
            ],
          }),
    })),
      (t[5] = _),
      (t[6] = r),
      (t[7] = n),
      (t[8] = f),
      (t[9] = p),
      (t[10] = i),
      (t[11] = a),
      (t[12] = s),
      (t[13] = m),
      (t[14] = o),
      (t[15] = u),
      (t[16] = l),
      (t[17] = d),
      (t[18] = b),
      (t[19] = O));
  } else O = t[19];
  return O;
}
function se(e) {
  return e.preventDefault();
}
function ce(e) {
  return Math.max(1, e - X);
}
function le(e) {
  return Math.min(3, e + X);
}
function ue(e) {
  let t = (0, V.c)(166),
    {
      camera: n,
      networkDB: i,
      nvrDB: a,
      isAdmin: s,
      username: c,
      onSave: u,
      onDelete: f,
      onClose: p,
    } = e,
    m = P(ge),
    h = T(he),
    g = o(i),
    [_, v] = (0, B.useState)(n?.name ?? ``),
    [y, b] = (0, B.useState)(n?.ip ?? ``),
    [S, C] = (0, B.useState)(n?.mac ?? ``),
    [w, E] = (0, B.useState)(n?.floor ?? g[0] ?? ``),
    [D, O] = (0, B.useState)(n?.zone ?? ``),
    [k, A] = (0, B.useState)(n?.brand ?? ``),
    [j, N] = (0, B.useState)(n?.model ?? ``),
    [F, I] = (0, B.useState)(n?.notes ?? ``),
    [R, U] = (0, B.useState)(n?.switchId ?? ``),
    [W, G] = (0, B.useState)(n?.switchPort == null ? `` : String(n.switchPort)),
    [K, q] = (0, B.useState)(n?.nvrId ?? ``),
    [J, Y] = (0, B.useState)(n?.channel == null ? `` : String(n.channel)),
    [ee, te] = (0, B.useState)(n?.angle ?? 0),
    [ne, re] = (0, B.useState)(n?.fov ?? 90),
    ie = i.flatMap(me),
    ae;
  t[0] !== a || t[1] !== K
    ? ((ae = K ? a.find((e) => e.id === K) : void 0),
      (t[0] = a),
      (t[1] = K),
      (t[2] = ae))
    : (ae = t[2]);
  let X = ae,
    oe;
  t[3] !== h ||
  t[4] !== ee ||
  t[5] !== k ||
  t[6] !== n ||
  t[7] !== J ||
  t[8] !== w ||
  t[9] !== ne ||
  t[10] !== y ||
  t[11] !== s ||
  t[12] !== S ||
  t[13] !== j ||
  t[14] !== _ ||
  t[15] !== F ||
  t[16] !== K ||
  t[17] !== u ||
  t[18] !== m ||
  t[19] !== R ||
  t[20] !== W ||
  t[21] !== c ||
  t[22] !== D
    ? ((oe = function () {
        if (!s) {
          m(`Bạn không có quyền!`, `error`);
          return;
        }
        let e = _.trim();
        if (!e) {
          m(`Vui lòng nhập tên Camera!`, `error`);
          return;
        }
        let t = {
          name: e,
          ip: y.trim(),
          mac: S.trim(),
          floor: w,
          zone: D.trim(),
          brand: k.trim(),
          model: j.trim(),
          notes: F.trim(),
          switchId: R,
          switchPort: parseInt(W, 10) || null,
          nvrId: K || null,
          channel: parseInt(J, 10) || null,
          angle: x(ee),
          fov: L(ne),
        };
        if (n) {
          let i = r(e);
          (u({ ...n, ...t, logs: d(n.logs, i, c) }), h(`Camera: ${e}`, i, c));
        } else {
          let n = M(e, w);
          (u({
            id: `cctv-${Date.now()}`,
            ...t,
            x: null,
            y: null,
            floorplanId: null,
            logs: d(void 0, n, c),
          }),
            h(`Camera: ${e}`, n, c));
        }
      }),
      (t[3] = h),
      (t[4] = ee),
      (t[5] = k),
      (t[6] = n),
      (t[7] = J),
      (t[8] = w),
      (t[9] = ne),
      (t[10] = y),
      (t[11] = s),
      (t[12] = S),
      (t[13] = j),
      (t[14] = _),
      (t[15] = F),
      (t[16] = K),
      (t[17] = u),
      (t[18] = m),
      (t[19] = R),
      (t[20] = W),
      (t[21] = c),
      (t[22] = D),
      (t[23] = oe))
    : (oe = t[23]);
  let se = oe,
    ce;
  t[24] !== n?.name || t[25] !== f || t[26] !== m
    ? ((ce = function () {
        m(`Xóa Camera "${n?.name}"?`, `confirm`, f);
      }),
      (t[24] = n?.name),
      (t[25] = f),
      (t[26] = m),
      (t[27] = ce))
    : (ce = t[27]);
  let le = ce,
    ue;
  t[28] !== h || t[29] !== n || t[30] !== u || t[31] !== m || t[32] !== c
    ? ((ue = function () {
        n &&
          m(
            `Gỡ Camera "${n.name}" khỏi bản đồ? Camera vẫn được giữ trong danh sách, có thể định vị lại sau.`,
            `confirm`,
            () => {
              let e = l(n.name);
              (h(`Camera: ${n.name}`, e, c),
                u({
                  ...n,
                  x: null,
                  y: null,
                  floorplanId: null,
                  logs: d(n.logs, e, c),
                }));
            },
          );
      }),
      (t[28] = h),
      (t[29] = n),
      (t[30] = u),
      (t[31] = m),
      (t[32] = c),
      (t[33] = ue))
    : (ue = t[33]);
  let _e = ue,
    Z = !!n && n.x != null && !!n.floorplanId,
    Q;
  t[34] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Q = { display: `flex` }), (t[34] = Q))
    : (Q = t[34]);
  let $;
  t[35] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($ = {
        width: 560,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      }),
      (t[35] = $))
    : ($ = t[35]);
  let ve;
  t[36] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ve = (0, H.jsx)(`div`, {
        className: `w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xs border border-orange-100`,
        children: (0, H.jsx)(`i`, { className: `fas fa-video` }),
      })),
      (t[36] = ve))
    : (ve = t[36]);
  let ye = n ? `Chỉnh sửa Camera` : `Thêm Camera`,
    be;
  t[37] === ye
    ? (be = t[38])
    : ((be = (0, H.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [ve, (0, H.jsx)(`span`, { children: ye })],
      })),
      (t[37] = ye),
      (t[38] = be));
  let xe;
  t[39] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((xe = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[39] = xe))
    : (xe = t[39]);
  let Se;
  t[40] === p
    ? (Se = t[41])
    : ((Se = (0, H.jsx)(`button`, {
        onClick: p,
        title: `Đóng`,
        className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
        children: xe,
      })),
      (t[40] = p),
      (t[41] = Se));
  let Ce;
  t[42] !== be || t[43] !== Se
    ? ((Ce = (0, H.jsxs)(`div`, {
        className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
        children: [be, Se],
      })),
      (t[42] = be),
      (t[43] = Se),
      (t[44] = Ce))
    : (Ce = t[44]);
  let we;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((we = (0, H.jsxs)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: [
          `Tên Camera `,
          (0, H.jsx)(`span`, { className: `text-red-400`, children: `*` }),
        ],
      })),
      (t[45] = we))
    : (we = t[45]);
  let Te;
  t[46] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Te = (e) => v(e.target.value)), (t[46] = Te))
    : (Te = t[46]);
  let Ee;
  t[47] === _
    ? (Ee = t[48])
    : ((Ee = (0, H.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          we,
          (0, H.jsx)(`input`, {
            type: `text`,
            value: _,
            onChange: Te,
            placeholder: `CAM-TANG01-A`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[47] = _),
      (t[48] = Ee));
  let De;
  t[49] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((De = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `IP Address`,
      })),
      (t[49] = De))
    : (De = t[49]);
  let Oe;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Oe = (e) => b(e.target.value)), (t[50] = Oe))
    : (Oe = t[50]);
  let ke;
  t[51] === y
    ? (ke = t[52])
    : ((ke = (0, H.jsxs)(`div`, {
        children: [
          De,
          (0, H.jsx)(`input`, {
            type: `text`,
            value: y,
            onChange: Oe,
            placeholder: `172.16.4.x`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none font-mono transition-colors`,
          }),
        ],
      })),
      (t[51] = y),
      (t[52] = ke));
  let Ae;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ae = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `MAC Address`,
      })),
      (t[53] = Ae))
    : (Ae = t[53]);
  let je;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((je = (e) => C(z(e.target.value))), (t[54] = je))
    : (je = t[54]);
  let Me;
  t[55] === S
    ? (Me = t[56])
    : ((Me = (0, H.jsxs)(`div`, {
        children: [
          Ae,
          (0, H.jsx)(`input`, {
            type: `text`,
            value: S,
            onChange: je,
            maxLength: 17,
            placeholder: `AA:BB:CC:DD:EE:FF`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none font-mono uppercase transition-colors`,
          }),
        ],
      })),
      (t[55] = S),
      (t[56] = Me));
  let Ne;
  t[57] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ne = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Tầng / Vị trí`,
      })),
      (t[57] = Ne))
    : (Ne = t[57]);
  let Pe;
  t[58] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Pe = (e) => E(e.target.value)), (t[58] = Pe))
    : (Pe = t[58]);
  let Fe = g.map(pe),
    Ie;
  t[59] !== w || t[60] !== Fe
    ? ((Ie = (0, H.jsxs)(`div`, {
        children: [
          Ne,
          (0, H.jsx)(`select`, {
            value: w,
            onChange: Pe,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
            children: Fe,
          }),
        ],
      })),
      (t[59] = w),
      (t[60] = Fe),
      (t[61] = Ie))
    : (Ie = t[61]);
  let Le;
  t[62] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Le = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Khu vực`,
      })),
      (t[62] = Le))
    : (Le = t[62]);
  let Re;
  t[63] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (e) => O(e.target.value)), (t[63] = Re))
    : (Re = t[63]);
  let ze;
  t[64] === D
    ? (ze = t[65])
    : ((ze = (0, H.jsxs)(`div`, {
        children: [
          Le,
          (0, H.jsx)(`input`, {
            type: `text`,
            value: D,
            onChange: Re,
            placeholder: `Sảnh, hành lang...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[64] = D),
      (t[65] = ze));
  let Be;
  t[66] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Be = (0, H.jsx)(`label`, {
        htmlFor: `cctv-cam-angle`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Hướng camera (độ)`,
      })),
      (t[66] = Be))
    : (Be = t[66]);
  let Ve;
  t[67] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ve = (e) => te(x(Number(e.target.value) || 0))), (t[67] = Ve))
    : (Ve = t[67]);
  let He;
  t[68] === ee
    ? (He = t[69])
    : ((He = (0, H.jsxs)(`div`, {
        children: [
          Be,
          (0, H.jsx)(`input`, {
            id: `cctv-cam-angle`,
            type: `number`,
            min: 0,
            max: 359,
            value: ee,
            onChange: Ve,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none font-mono transition-colors`,
          }),
        ],
      })),
      (t[68] = ee),
      (t[69] = He));
  let Ue;
  t[70] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ue = (0, H.jsx)(`label`, {
        htmlFor: `cctv-cam-fov`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Góc quan sát (FOV, độ)`,
      })),
      (t[70] = Ue))
    : (Ue = t[70]);
  let We;
  t[71] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((We = (e) => re(Number(e.target.value) || 0)), (t[71] = We))
    : (We = t[71]);
  let Ge;
  t[72] === ne
    ? (Ge = t[73])
    : ((Ge = (0, H.jsxs)(`div`, {
        children: [
          Ue,
          (0, H.jsx)(`input`, {
            id: `cctv-cam-fov`,
            type: `number`,
            min: 10,
            max: 120,
            value: ne,
            onChange: We,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none font-mono transition-colors`,
          }),
        ],
      })),
      (t[72] = ne),
      (t[73] = Ge));
  let Ke;
  t[74] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ke = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Thương hiệu`,
      })),
      (t[74] = Ke))
    : (Ke = t[74]);
  let qe;
  t[75] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((qe = (e) => A(e.target.value)), (t[75] = qe))
    : (qe = t[75]);
  let Je;
  t[76] === k
    ? (Je = t[77])
    : ((Je = (0, H.jsxs)(`div`, {
        children: [
          Ke,
          (0, H.jsx)(`input`, {
            type: `text`,
            value: k,
            onChange: qe,
            placeholder: `Hikvision, Dahua...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[76] = k),
      (t[77] = Je));
  let Ye;
  t[78] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ye = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Model`,
      })),
      (t[78] = Ye))
    : (Ye = t[78]);
  let Xe;
  t[79] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Xe = (e) => N(e.target.value)), (t[79] = Xe))
    : (Xe = t[79]);
  let Ze;
  t[80] === j
    ? (Ze = t[81])
    : ((Ze = (0, H.jsxs)(`div`, {
        children: [
          Ye,
          (0, H.jsx)(`input`, {
            type: `text`,
            value: j,
            onChange: Xe,
            placeholder: `Dome 4MP...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[80] = j),
      (t[81] = Ze));
  let Qe;
  t[82] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Qe = (0, H.jsx)(`label`, {
        htmlFor: `cctv-cam-switch`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Switch kết nối`,
      })),
      (t[82] = Qe))
    : (Qe = t[82]);
  let $e;
  t[83] === Symbol.for(`react.memo_cache_sentinel`)
    ? (($e = (e) => U(e.target.value)), (t[83] = $e))
    : ($e = t[83]);
  let et;
  t[84] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((et = (0, H.jsx)(`option`, {
        value: ``,
        children: `-- Chọn Switch --`,
      })),
      (t[84] = et))
    : (et = t[84]);
  let tt = ie.map(fe),
    nt;
  t[85] !== R || t[86] !== $e || t[87] !== et || t[88] !== tt
    ? ((nt = (0, H.jsxs)(`select`, {
        id: `cctv-cam-switch`,
        value: R,
        onChange: $e,
        className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
        children: [et, tt],
      })),
      (t[85] = R),
      (t[86] = $e),
      (t[87] = et),
      (t[88] = tt),
      (t[89] = nt))
    : (nt = t[89]);
  let rt;
  t[90] !== Qe || t[91] !== nt
    ? ((rt = (0, H.jsxs)(`div`, { children: [Qe, nt] })),
      (t[90] = Qe),
      (t[91] = nt),
      (t[92] = rt))
    : (rt = t[92]);
  let it;
  t[93] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((it = (0, H.jsx)(`label`, {
        htmlFor: `cctv-cam-switch-port`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Port trên Switch`,
      })),
      (t[93] = it))
    : (it = t[93]);
  let at;
  t[94] === G
    ? (at = t[95])
    : ((at = (e) => G(e.target.value)), (t[94] = G), (t[95] = at));
  let ot;
  t[96] !== W || t[97] !== at
    ? ((ot = (0, H.jsxs)(`div`, {
        children: [
          it,
          (0, H.jsx)(`input`, {
            id: `cctv-cam-switch-port`,
            value: W,
            onChange: at,
            type: `number`,
            min: 1,
            placeholder: `Số port`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[96] = W),
      (t[97] = at),
      (t[98] = ot))
    : (ot = t[98]);
  let st;
  t[99] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((st = (0, H.jsx)(`label`, {
        htmlFor: `cctv-cam-nvr`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `NVR ghi hình`,
      })),
      (t[99] = st))
    : (st = t[99]);
  let ct;
  t[100] === q
    ? (ct = t[101])
    : ((ct = (e) => q(e.target.value)), (t[100] = q), (t[101] = ct));
  let lt;
  t[102] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((lt = (0, H.jsx)(`option`, { value: ``, children: `-- Chọn NVR --` })),
      (t[102] = lt))
    : (lt = t[102]);
  let ut;
  t[103] === a
    ? (ut = t[104])
    : ((ut = a.map(de)), (t[103] = a), (t[104] = ut));
  let dt;
  t[105] !== K || t[106] !== ct || t[107] !== ut
    ? ((dt = (0, H.jsxs)(`select`, {
        id: `cctv-cam-nvr`,
        value: K,
        onChange: ct,
        className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
        children: [lt, ut],
      })),
      (t[105] = K),
      (t[106] = ct),
      (t[107] = ut),
      (t[108] = dt))
    : (dt = t[108]);
  let ft;
  t[109] === X
    ? (ft = t[110])
    : ((ft =
        X &&
        (0, H.jsxs)(`div`, {
          className: `mt-1.5 p-2 bg-orange-50 border border-orange-100 rounded-lg text-[9px] text-orange-700 font-bold leading-relaxed`,
          children: [
            (0, H.jsx)(`i`, { className: `fas fa-hdd mr-1` }),
            X.ip || `Chưa có IP`,
            X.brand ? ` · ${X.brand}` : ``,
            X.model ? ` ${X.model}` : ``,
            ` · `,
            X.channels,
            ` kênh`,
            X.floor || X.location
              ? ` · ${[X.floor, X.location].filter(Boolean).join(` - `)}`
              : ``,
          ],
        })),
      (t[109] = X),
      (t[110] = ft));
  let pt;
  t[111] !== dt || t[112] !== ft
    ? ((pt = (0, H.jsxs)(`div`, { children: [st, dt, ft] })),
      (t[111] = dt),
      (t[112] = ft),
      (t[113] = pt))
    : (pt = t[113]);
  let mt;
  t[114] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((mt = (0, H.jsx)(`label`, {
        htmlFor: `cctv-cam-channel`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Kênh (Channel)`,
      })),
      (t[114] = mt))
    : (mt = t[114]);
  let ht;
  t[115] === Y
    ? (ht = t[116])
    : ((ht = (e) => Y(e.target.value)), (t[115] = Y), (t[116] = ht));
  let gt;
  t[117] !== J || t[118] !== ht
    ? ((gt = (0, H.jsxs)(`div`, {
        children: [
          mt,
          (0, H.jsx)(`input`, {
            id: `cctv-cam-channel`,
            value: J,
            onChange: ht,
            type: `number`,
            min: 1,
            placeholder: `1-32`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none transition-colors`,
          }),
        ],
      })),
      (t[117] = J),
      (t[118] = ht),
      (t[119] = gt))
    : (gt = t[119]);
  let _t;
  t[120] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_t = (0, H.jsx)(`label`, {
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Ghi chú`,
      })),
      (t[120] = _t))
    : (_t = t[120]);
  let vt;
  t[121] === I
    ? (vt = t[122])
    : ((vt = (e) => I(e.target.value)), (t[121] = I), (t[122] = vt));
  let yt;
  t[123] !== F || t[124] !== vt
    ? ((yt = (0, H.jsxs)(`div`, {
        className: `col-span-2`,
        children: [
          _t,
          (0, H.jsx)(`textarea`, {
            value: F,
            onChange: vt,
            rows: 2,
            placeholder: `Ghi chú thêm...`,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-sm font-bold outline-none resize-none transition-colors`,
          }),
        ],
      })),
      (t[123] = F),
      (t[124] = vt),
      (t[125] = yt))
    : (yt = t[125]);
  let bt;
  t[126] !== Ee ||
  t[127] !== ke ||
  t[128] !== Me ||
  t[129] !== Ie ||
  t[130] !== ze ||
  t[131] !== He ||
  t[132] !== Ge ||
  t[133] !== Je ||
  t[134] !== Ze ||
  t[135] !== rt ||
  t[136] !== ot ||
  t[137] !== pt ||
  t[138] !== gt ||
  t[139] !== yt
    ? ((bt = (0, H.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll`,
        children: (0, H.jsxs)(`div`, {
          className: `grid grid-cols-2 gap-4`,
          children: [Ee, ke, Me, Ie, ze, He, Ge, Je, Ze, rt, ot, pt, gt, yt],
        }),
      })),
      (t[126] = Ee),
      (t[127] = ke),
      (t[128] = Me),
      (t[129] = Ie),
      (t[130] = ze),
      (t[131] = He),
      (t[132] = Ge),
      (t[133] = Je),
      (t[134] = Ze),
      (t[135] = rt),
      (t[136] = ot),
      (t[137] = pt),
      (t[138] = gt),
      (t[139] = yt),
      (t[140] = bt))
    : (bt = t[140]);
  let xt;
  t[141] !== n || t[142] !== le
    ? ((xt =
        n &&
        (0, H.jsxs)(`button`, {
          onClick: le,
          className: `px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-all`,
          children: [
            (0, H.jsx)(`i`, { className: `fas fa-trash mr-1` }),
            `Xóa`,
          ],
        })),
      (t[141] = n),
      (t[142] = le),
      (t[143] = xt))
    : (xt = t[143]);
  let St;
  t[144] !== _e || t[145] !== Z
    ? ((St =
        Z &&
        (0, H.jsxs)(`button`, {
          onClick: _e,
          title: `Gỡ khỏi bản vẽ, không xóa hẳn Camera`,
          className: `px-5 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-xl hover:bg-amber-100 transition-all`,
          children: [
            (0, H.jsx)(`i`, { className: `fas fa-map-marker-alt mr-1` }),
            `Gỡ khỏi bản đồ`,
          ],
        })),
      (t[144] = _e),
      (t[145] = Z),
      (t[146] = St))
    : (St = t[146]);
  let Ct;
  t[147] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ct = (0, H.jsx)(`div`, { className: `flex-1` })), (t[147] = Ct))
    : (Ct = t[147]);
  let wt;
  t[148] === p
    ? (wt = t[149])
    : ((wt = (0, H.jsx)(`button`, {
        onClick: p,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[148] = p),
      (t[149] = wt));
  let Tt;
  t[150] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Tt = (0, H.jsx)(`i`, { className: `fas fa-save` })), (t[150] = Tt))
    : (Tt = t[150]);
  let Et;
  t[151] === se
    ? (Et = t[152])
    : ((Et = (0, H.jsxs)(`button`, {
        onClick: se,
        className: `px-6 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-orange-700 transition-all flex items-center gap-2`,
        children: [Tt, ` Lưu`],
      })),
      (t[151] = se),
      (t[152] = Et));
  let Dt;
  t[153] !== xt || t[154] !== St || t[155] !== wt || t[156] !== Et
    ? ((Dt = (0, H.jsxs)(`div`, {
        className: `flex gap-3 mt-6 pt-4 border-t border-slate-100 shrink-0`,
        children: [xt, St, Ct, wt, Et],
      })),
      (t[153] = xt),
      (t[154] = St),
      (t[155] = wt),
      (t[156] = Et),
      (t[157] = Dt))
    : (Dt = t[157]);
  let Ot;
  t[158] !== Ce || t[159] !== bt || t[160] !== Dt || t[161] !== $
    ? ((Ot = (0, H.jsxs)(`div`, {
        className: `modal-content shadow-2xl`,
        style: $,
        children: [Ce, bt, Dt],
      })),
      (t[158] = Ce),
      (t[159] = bt),
      (t[160] = Dt),
      (t[161] = $),
      (t[162] = Ot))
    : (Ot = t[162]);
  let kt;
  return (
    t[163] !== Q || t[164] !== Ot
      ? ((kt = (0, H.jsx)(`div`, {
          className: `modal`,
          style: Q,
          children: Ot,
        })),
        (t[163] = Q),
        (t[164] = Ot),
        (t[165] = kt))
      : (kt = t[165]),
    kt
  );
}
function de(e) {
  return (0, H.jsx)(`option`, { value: e.id, children: e.name }, e.id);
}
function fe(e) {
  return (0, H.jsxs)(
    `option`,
    { value: e.id, children: [e.name, ` (`, e.floor, `)`] },
    e.id,
  );
}
function pe(e) {
  return (0, H.jsx)(`option`, { value: e, children: e }, e);
}
function me(e) {
  return e.switches.map((t) => ({ id: t.id, name: t.name, floor: e.floor }));
}
function he(e) {
  return e.addGlobalLog;
}
function ge(e) {
  return e.showDialog;
}
function _e(e) {
  let t = (0, V.c)(75),
    {
      networkDB: n,
      cctvDB: r,
      nvrDB: i,
      username: a,
      onImport: s,
      onClose: c,
    } = e,
    l = P(be),
    u = T(ye),
    f;
  t[0] !== r || t[1] !== n
    ? ((f = F(n, r)), (t[0] = r), (t[1] = n), (t[2] = f))
    : (f = t[2]);
  let m = f,
    h;
  t[3] === m ? (h = t[4]) : ((h = () => m.map(ve)), (t[3] = m), (t[4] = h));
  let [g, _] = (0, B.useState)(h),
    [v, y] = (0, B.useState)(``),
    b,
    x,
    S,
    C,
    w,
    E,
    D,
    O,
    k,
    A,
    j;
  if (
    t[5] !== u ||
    t[6] !== m ||
    t[7] !== g ||
    t[8] !== n ||
    t[9] !== i ||
    t[10] !== c ||
    t[11] !== s ||
    t[12] !== v ||
    t[13] !== l ||
    t[14] !== a
  ) {
    let e = v.trim().toLowerCase(),
      r = e
        ? m.map($).filter((t) => {
            let { c: n } = t;
            return [n.name, n.ip, n.mac, n.swName, n.floor].some((t) =>
              (t ?? ``).toLowerCase().includes(e),
            );
          })
        : m.map(Q);
    x = function () {
      let e = new Set(r.map(Z));
      _((t) => t.map((t, n) => (e.has(n) ? !m[n].alreadyExists : t)));
    };
    let f;
    t[26] === m
      ? (f = t[27])
      : ((f = function (e) {
          m[e].alreadyExists || _((t) => t.map((t, n) => (n === e ? !t : t)));
        }),
        (t[26] = m),
        (t[27] = f));
    let h = f,
      T;
    (t[28] !== u ||
    t[29] !== m ||
    t[30] !== g ||
    t[31] !== n ||
    t[32] !== i ||
    t[33] !== s ||
    t[34] !== l ||
    t[35] !== a
      ? ((T = function () {
          let e = m.filter((e, t) => g[t]);
          if (!e.length) {
            l(`Chưa chọn thiết bị nào!`, `error`);
            return;
          }
          let t = o(n),
            r = e.map((e, n) => {
              let r = t.find((t) => t === e.floor) || t[0] || `Tầng 01`,
                o = e.nvr ? i.find((t) => t.name === e.nvr) : void 0,
                s = p(e.swName, e.port, e.vlan);
              return (
                u(`Camera: ${e.name}`, s, a),
                {
                  id: `cctv-${Date.now()}-${n}`,
                  name: e.name,
                  ip: e.ip,
                  mac: e.mac,
                  floor: r,
                  zone: ``,
                  brand: ``,
                  model: e.camType,
                  notes: `Auto-imported từ ${e.swName} Port ${e.port}`,
                  x: null,
                  y: null,
                  floorplanId: null,
                  angle: 0,
                  fov: 90,
                  switchId: e.swId,
                  switchPort: e.port,
                  nvrId: o?.id ?? null,
                  channel: e.ch,
                  logs: d(void 0, s, a),
                }
              );
            });
          s(r);
        }),
        (t[28] = u),
        (t[29] = m),
        (t[30] = g),
        (t[31] = n),
        (t[32] = i),
        (t[33] = s),
        (t[34] = l),
        (t[35] = a),
        (t[36] = T))
      : (T = t[36]),
      (b = T),
      (S = `modal`),
      t[37] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = { display: `flex`, zIndex: 210 }), (t[37] = C))
        : (C = t[37]),
      (D = `modal-content shadow-2xl`),
      t[38] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = {
            width: 680,
            maxWidth: `95vw`,
            display: `flex`,
            flexDirection: `column`,
            maxHeight: `90vh`,
          }),
          (t[38] = O))
        : (O = t[38]));
    let M;
    t[39] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((M = (0, H.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [
            (0, H.jsx)(`div`, {
              className: `w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xs border border-orange-100`,
              children: (0, H.jsx)(`i`, { className: `fas fa-download` }),
            }),
            `Import Camera từ Switch Port (VLAN 120)`,
          ],
        })),
        (t[39] = M))
      : (M = t[39]);
    let N;
    (t[40] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((N = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[40] = N))
      : (N = t[40]),
      t[41] === c
        ? (k = t[42])
        : ((k = (0, H.jsxs)(`div`, {
            className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
            children: [
              M,
              (0, H.jsx)(`button`, {
                onClick: c,
                className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
                children: N,
              }),
            ],
          })),
          (t[41] = c),
          (t[42] = k)),
      t[43] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, H.jsxs)(`div`, {
            className: `mb-4 shrink-0 bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-2`,
            children: [
              (0, H.jsx)(`i`, {
                className: `fas fa-info-circle text-orange-500 mt-0.5`,
              }),
              (0, H.jsx)(`p`, {
                className: `text-[10px] text-orange-700 font-bold leading-relaxed`,
                children: `Hệ thống tự động phát hiện các cổng Switch đang gắn VLAN 120 (CCTV) hoặc có icon Camera. Chọn thiết bị cần import vào CCTV Topology, sau đó kéo thả để định vị trên bản vẽ từng tầng.`,
              }),
            ],
          })),
          (t[43] = A))
        : (A = t[43]),
      t[44] !== m.length || t[45] !== v
        ? ((j =
            m.length > 0 &&
            (0, H.jsxs)(`div`, {
              className: `relative mb-3 shrink-0`,
              children: [
                (0, H.jsx)(`i`, {
                  className: `fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs`,
                }),
                (0, H.jsx)(`input`, {
                  value: v,
                  onChange: (e) => y(e.target.value),
                  placeholder: `Tìm theo tên, IP, MAC, Switch, tầng...`,
                  className: `w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-400`,
                }),
              ],
            })),
          (t[44] = m.length),
          (t[45] = v),
          (t[46] = j))
        : (j = t[46]),
      (w = `flex-1 overflow-y-auto custom-scroll pr-1`),
      (E =
        m.length === 0
          ? (0, H.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center py-12 opacity-50`,
              children: [
                (0, H.jsx)(`i`, {
                  className: `fas fa-search text-4xl text-slate-300 mb-4`,
                }),
                (0, H.jsx)(`p`, {
                  className: `text-sm font-bold text-slate-500`,
                  children: `Không tìm thấy cổng nào được gắn VLAN 120 hoặc icon Camera.`,
                }),
                (0, H.jsx)(`p`, {
                  className: `text-xs text-slate-400 mt-1`,
                  children: `Hãy cấu hình VLAN/icon cho các port trên Switch trước.`,
                }),
              ],
            })
          : r.length === 0
            ? (0, H.jsxs)(`div`, {
                className: `flex flex-col items-center justify-center py-12 opacity-50`,
                children: [
                  (0, H.jsx)(`i`, {
                    className: `fas fa-filter-circle-xmark text-4xl text-slate-300 mb-4`,
                  }),
                  (0, H.jsxs)(`p`, {
                    className: `text-sm font-bold text-slate-500`,
                    children: [`Không có kết quả khớp "`, v.trim(), `".`],
                  }),
                ],
              })
            : (0, H.jsx)(`div`, {
                className: `space-y-2`,
                children: r.map((e) => {
                  let { c: t, i: n } = e;
                  return (0, H.jsxs)(
                    `label`,
                    {
                      className: `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${t.alreadyExists ? `bg-slate-50 border-slate-200 opacity-60` : `bg-white border-slate-200 hover:border-orange-300 hover:bg-orange-50`}`,
                      children: [
                        (0, H.jsx)(`input`, {
                          type: `checkbox`,
                          checked: g[n],
                          disabled: t.alreadyExists,
                          onChange: () => h(n),
                          style: {
                            accentColor: `#ea580c`,
                            width: 14,
                            height: 14,
                            cursor: `pointer`,
                          },
                        }),
                        (0, H.jsx)(`div`, {
                          className: `w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xs border border-orange-100 shrink-0`,
                          children: (0, H.jsx)(`i`, {
                            className: `fas fa-video`,
                          }),
                        }),
                        (0, H.jsxs)(`div`, {
                          className: `flex-1 min-w-0`,
                          children: [
                            (0, H.jsx)(`p`, {
                              className: `text-xs font-black text-slate-800`,
                              children: t.name,
                            }),
                            (0, H.jsxs)(`p`, {
                              className: `text-[10px] text-slate-500 font-bold`,
                              children: [
                                t.swName,
                                ` · Port `,
                                t.port,
                                ` · VLAN `,
                                t.vlan,
                                ` · `,
                                t.floor,
                              ],
                            }),
                            t.ip &&
                              (0, H.jsxs)(`p`, {
                                className: `text-[9px] font-mono text-indigo-500 mt-0.5`,
                                children: [t.ip, t.mac ? ` | ` + t.mac : ``],
                              }),
                            t.nvr &&
                              (0, H.jsxs)(`p`, {
                                className: `text-[9px] font-mono text-slate-400 mt-0.5`,
                                children: [
                                  `NVR: `,
                                  t.nvr,
                                  t.ch == null ? `` : ` · CH${t.ch}`,
                                ],
                              }),
                          ],
                        }),
                        t.alreadyExists
                          ? (0, H.jsx)(`span`, {
                              className: `text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0`,
                              children: `Đã có`,
                            })
                          : (0, H.jsx)(`span`, {
                              className: `text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full shrink-0`,
                              children: `Mới`,
                            }),
                      ],
                    },
                    n,
                  );
                }),
              })),
      (t[5] = u),
      (t[6] = m),
      (t[7] = g),
      (t[8] = n),
      (t[9] = i),
      (t[10] = c),
      (t[11] = s),
      (t[12] = v),
      (t[13] = l),
      (t[14] = a),
      (t[15] = b),
      (t[16] = x),
      (t[17] = S),
      (t[18] = C),
      (t[19] = w),
      (t[20] = E),
      (t[21] = D),
      (t[22] = O),
      (t[23] = k),
      (t[24] = A),
      (t[25] = j));
  } else
    ((b = t[15]),
      (x = t[16]),
      (S = t[17]),
      (C = t[18]),
      (w = t[19]),
      (E = t[20]),
      (D = t[21]),
      (O = t[22]),
      (k = t[23]),
      (A = t[24]),
      (j = t[25]));
  let M;
  t[47] !== w || t[48] !== E
    ? ((M = (0, H.jsx)(`div`, { className: w, children: E })),
      (t[47] = w),
      (t[48] = E),
      (t[49] = M))
    : (M = t[49]);
  let N;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, H.jsx)(`i`, { className: `fas fa-check-double mr-1` })),
      (t[50] = N))
    : (N = t[50]);
  let I;
  t[51] === x
    ? (I = t[52])
    : ((I = (0, H.jsxs)(`button`, {
        onClick: x,
        className: `px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all`,
        children: [N, `Chọn tất cả`],
      })),
      (t[51] = x),
      (t[52] = I));
  let L;
  t[53] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = (0, H.jsx)(`div`, { className: `flex-1` })), (t[53] = L))
    : (L = t[53]);
  let R;
  t[54] === c
    ? (R = t[55])
    : ((R = (0, H.jsx)(`button`, {
        onClick: c,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[54] = c),
      (t[55] = R));
  let z;
  t[56] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((z = (0, H.jsx)(`i`, { className: `fas fa-file-import` })), (t[56] = z))
    : (z = t[56]);
  let U;
  t[57] === b
    ? (U = t[58])
    : ((U = (0, H.jsxs)(`button`, {
        onClick: b,
        className: `px-6 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-orange-700 transition-all flex items-center gap-2`,
        children: [z, ` Import đã chọn`],
      })),
      (t[57] = b),
      (t[58] = U));
  let W;
  t[59] !== I || t[60] !== R || t[61] !== U
    ? ((W = (0, H.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [I, L, R, U],
      })),
      (t[59] = I),
      (t[60] = R),
      (t[61] = U),
      (t[62] = W))
    : (W = t[62]);
  let G;
  t[63] !== M ||
  t[64] !== W ||
  t[65] !== D ||
  t[66] !== O ||
  t[67] !== k ||
  t[68] !== A ||
  t[69] !== j
    ? ((G = (0, H.jsxs)(`div`, {
        className: D,
        style: O,
        children: [k, A, j, M, W],
      })),
      (t[63] = M),
      (t[64] = W),
      (t[65] = D),
      (t[66] = O),
      (t[67] = k),
      (t[68] = A),
      (t[69] = j),
      (t[70] = G))
    : (G = t[70]);
  let K;
  return (
    t[71] !== S || t[72] !== C || t[73] !== G
      ? ((K = (0, H.jsx)(`div`, { className: S, style: C, children: G })),
        (t[71] = S),
        (t[72] = C),
        (t[73] = G),
        (t[74] = K))
      : (K = t[74]),
    K
  );
}
function Z(e) {
  let { i: t } = e;
  return t;
}
function Q(e, t) {
  return { c: e, i: t };
}
function $(e, t) {
  return { c: e, i: t };
}
function ve() {
  return !1;
}
function ye(e) {
  return e.addGlobalLog;
}
function be(e) {
  return e.showDialog;
}
function xe(e) {
  let t = (0, V.c)(49),
    {
      floorplans: n,
      currentFloorplanId: r,
      cctvDB: i,
      onCopy: a,
      onClose: o,
    } = e,
    s;
  t[0] === r ? (s = t[1]) : ((s = (e) => e.id !== r), (t[0] = r), (t[1] = s));
  let c = n.filter(s),
    [l, u] = (0, B.useState)(c[0]?.id ?? ``),
    d;
  t[2] !== r || t[3] !== n
    ? ((d = n.find((e) => e.id === r)?.name ?? ``),
      (t[2] = r),
      (t[3] = n),
      (t[4] = d))
    : (d = t[4]);
  let f = d,
    p;
  if (t[5] !== i || t[6] !== l) {
    let e;
    (t[8] === l
      ? (e = t[9])
      : ((e = (e) => e.floorplanId === l && e.x != null && e.y != null),
        (t[8] = l),
        (t[9] = e)),
      (p = i.filter(e)),
      (t[5] = i),
      (t[6] = l),
      (t[7] = p));
  } else p = t[7];
  let m = p,
    h;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = { display: `flex`, zIndex: 210 }), (t[10] = h))
    : (h = t[10]);
  let g;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = { width: 480, maxWidth: `95vw` }), (t[11] = g))
    : (g = t[11]);
  let _;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_ = (0, H.jsxs)(`h3`, {
        className: `text-lg font-black text-slate-800 flex items-center gap-3`,
        children: [
          (0, H.jsx)(`div`, {
            className: `w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs border border-indigo-100`,
            children: (0, H.jsx)(`i`, { className: `fas fa-clone` }),
          }),
          `Sao chép vị trí Camera`,
        ],
      })),
      (t[12] = _))
    : (_ = t[12]);
  let v;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[13] = v))
    : (v = t[13]);
  let y;
  t[14] === o
    ? (y = t[15])
    : ((y = (0, H.jsxs)(`div`, {
        className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4`,
        children: [
          _,
          (0, H.jsx)(`button`, {
            onClick: o,
            title: `Đóng`,
            className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
            children: v,
          }),
        ],
      })),
      (t[14] = o),
      (t[15] = y));
  let b;
  t[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = (0, H.jsx)(`i`, {
        className: `fas fa-info-circle text-indigo-500 mt-0.5`,
      })),
      (t[16] = b))
    : (b = t[16]);
  let x;
  t[17] === f
    ? (x = t[18])
    : ((x = (0, H.jsxs)(`div`, {
        className: `mb-4 bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex items-start gap-2`,
        children: [
          b,
          (0, H.jsxs)(`p`, {
            className: `text-[10px] text-indigo-700 font-bold leading-relaxed`,
            children: [
              `Dùng khi các tầng có layout mặt bằng giống nhau (ví dụ các tầng phòng khách sạn lặp lại). Hệ thống sẽ tạo camera MỚI trên bản vẽ "`,
              f,
              `" tại đúng vị trí/hướng của camera trên bản vẽ nguồn — không ảnh hưởng đến camera đã có sẵn.`,
            ],
          }),
        ],
      })),
      (t[17] = f),
      (t[18] = x));
  let S;
  t[19] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = (0, H.jsx)(`label`, {
        htmlFor: `cctv-copy-source`,
        className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
        children: `Sao chép từ bản vẽ`,
      })),
      (t[19] = S))
    : (S = t[19]);
  let C =
      c.length === 0
        ? (0, H.jsx)(`p`, {
            className: `text-xs text-slate-400 italic mt-2`,
            children: `Chưa có bản vẽ nào khác để sao chép.`,
          })
        : (0, H.jsx)(`select`, {
            id: `cctv-copy-source`,
            value: l,
            onChange: (e) => u(e.target.value),
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-bold outline-none transition-colors`,
            children: c.map(Se),
          }),
    w;
  t[20] !== S || t[21] !== C
    ? ((w = (0, H.jsxs)(`div`, { className: `mb-4`, children: [S, C] })),
      (t[20] = S),
      (t[21] = C),
      (t[22] = w))
    : (w = t[22]);
  let T;
  t[23] !== m || t[24] !== l
    ? ((T =
        l &&
        (0, H.jsx)(`p`, {
          className: `text-xs font-bold text-slate-500 mb-4`,
          children:
            m.length === 0
              ? `Bản vẽ nguồn chưa có camera nào được định vị.`
              : `Sẽ sao chép ${m.length} camera.`,
        })),
      (t[23] = m),
      (t[24] = l),
      (t[25] = T))
    : (T = t[25]);
  let E;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = (0, H.jsx)(`div`, { className: `flex-1` })), (t[26] = E))
    : (E = t[26]);
  let D;
  t[27] === o
    ? (D = t[28])
    : ((D = (0, H.jsx)(`button`, {
        onClick: o,
        className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
        children: `Hủy`,
      })),
      (t[27] = o),
      (t[28] = D));
  let O;
  t[29] !== a || t[30] !== l
    ? ((O = () => l && a(l)), (t[29] = a), (t[30] = l), (t[31] = O))
    : (O = t[31]);
  let k = !l || m.length === 0,
    A;
  t[32] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (0, H.jsx)(`i`, { className: `fas fa-clone` })), (t[32] = A))
    : (A = t[32]);
  let j;
  t[33] !== O || t[34] !== k
    ? ((j = (0, H.jsxs)(`button`, {
        onClick: O,
        disabled: k,
        className: `px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed`,
        children: [A, ` Sao chép`],
      })),
      (t[33] = O),
      (t[34] = k),
      (t[35] = j))
    : (j = t[35]);
  let M;
  t[36] !== D || t[37] !== j
    ? ((M = (0, H.jsxs)(`div`, {
        className: `flex gap-3 pt-4 border-t border-slate-100`,
        children: [E, D, j],
      })),
      (t[36] = D),
      (t[37] = j),
      (t[38] = M))
    : (M = t[38]);
  let N;
  t[39] !== y ||
  t[40] !== x ||
  t[41] !== w ||
  t[42] !== T ||
  t[43] !== M ||
  t[44] !== g
    ? ((N = (0, H.jsxs)(`div`, {
        className: `modal-content shadow-2xl`,
        style: g,
        children: [y, x, w, T, M],
      })),
      (t[39] = y),
      (t[40] = x),
      (t[41] = w),
      (t[42] = T),
      (t[43] = M),
      (t[44] = g),
      (t[45] = N))
    : (N = t[45]);
  let P;
  return (
    t[46] !== N || t[47] !== h
      ? ((P = (0, H.jsx)(`div`, { className: `modal`, style: h, children: N })),
        (t[46] = N),
        (t[47] = h),
        (t[48] = P))
      : (P = t[48]),
    P
  );
}
function Se(e) {
  return (0, H.jsx)(`option`, { value: e.id, children: e.name }, e.id);
}
function Ce(e) {
  let t = (0, V.c)(93),
    { cctvDB: n, connectors: r, onSave: i, onDelete: a, onClose: o } = e,
    [s, c] = (0, B.useState)(``),
    [l, u] = (0, B.useState)(``),
    [d, f] = (0, B.useState)(``),
    [p, m] = (0, B.useState)(``),
    h,
    g,
    _,
    v,
    b,
    x,
    S,
    C,
    w,
    T,
    E,
    D,
    O,
    k,
    A,
    j,
    M,
    N,
    P;
  if (
    t[0] !== l ||
    t[1] !== d ||
    t[2] !== n ||
    t[3] !== s ||
    t[4] !== o ||
    t[5] !== i
  ) {
    let e = [...n].sort(Ee),
      r;
    (t[25] === n
      ? (r = t[26])
      : ((r = (e) => n.find((t) => t.id === e)?.name ?? `(đã xóa)`),
        (t[25] = n),
        (t[26] = r)),
      (g = r));
    let a;
    (t[27] === n
      ? (a = t[28])
      : ((a = (e) => n.find((t) => t.id === e)?.floor ?? ``),
        (t[27] = n),
        (t[28] = a)),
      (h = a));
    let p;
    (t[29] !== l || t[30] !== d || t[31] !== s || t[32] !== i
      ? ((p = function () {
          let e = s.trim();
          if (!e) {
            m(`Vui lòng nhập tên liên kết (vd: Cầu thang bộ B).`);
            return;
          }
          if (!l || !d) {
            m(`Vui lòng chọn cả 2 camera.`);
            return;
          }
          if (l === d) {
            m(`2 camera phải khác nhau.`);
            return;
          }
          (m(``),
            i({
              id: `cctv-conn-${Date.now()}`,
              label: e,
              cameraAId: l,
              cameraBId: d,
            }),
            c(``),
            u(``),
            f(``));
        }),
        (t[29] = l),
        (t[30] = d),
        (t[31] = s),
        (t[32] = i),
        (t[33] = p))
      : (p = t[33]),
      (_ = p),
      (T = `modal`),
      t[34] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = { display: `flex`, zIndex: 211 }), (t[34] = E))
        : (E = t[34]),
      (x = `modal-content shadow-2xl`),
      t[35] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = {
            width: 620,
            maxWidth: `95vw`,
            display: `flex`,
            flexDirection: `column`,
            maxHeight: `90vh`,
          }),
          (t[35] = S))
        : (S = t[35]));
    let y;
    t[36] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((y = (0, H.jsxs)(`h3`, {
          className: `text-lg font-black text-slate-800 flex items-center gap-3`,
          children: [
            (0, H.jsx)(`div`, {
              className: `w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-xs border border-pink-100`,
              children: (0, H.jsx)(`i`, { className: `fas fa-link` }),
            }),
            `Liên kết Cầu thang / Thang máy giữa các tầng`,
          ],
        })),
        (t[36] = y))
      : (y = t[36]);
    let F;
    (t[37] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((F = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[37] = F))
      : (F = t[37]),
      t[38] === o
        ? (C = t[39])
        : ((C = (0, H.jsxs)(`div`, {
            className: `flex justify-between items-center mb-5 border-b border-slate-100 pb-4 shrink-0`,
            children: [
              y,
              (0, H.jsx)(`button`, {
                onClick: o,
                title: `Đóng`,
                className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
                children: F,
              }),
            ],
          })),
          (t[38] = o),
          (t[39] = C)),
      t[40] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((w = (0, H.jsxs)(`div`, {
            className: `mb-4 shrink-0 bg-pink-50 border border-pink-200 rounded-xl p-3 flex items-start gap-2`,
            children: [
              (0, H.jsx)(`i`, {
                className: `fas fa-info-circle text-pink-500 mt-0.5`,
              }),
              (0, H.jsx)(`p`, {
                className: `text-[10px] text-pink-700 font-bold leading-relaxed`,
                children: `Đánh dấu 2 camera (vd: camera đầu cầu thang tầng 5 và cuối cầu thang tầng 6) là "cùng một điểm di chuyển" — khi truy vết hành trình điều tra, hệ thống sẽ gợi ý nhảy thẳng sang camera liên kết ở tầng kia.`,
              }),
            ],
          })),
          (t[40] = w))
        : (w = t[40]),
      (N = `grid grid-cols-2 gap-3 mb-2 shrink-0`));
    let I;
    t[41] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((I = (0, H.jsx)(`label`, {
          htmlFor: `cctv-conn-label`,
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Tên liên kết`,
        })),
        (t[41] = I))
      : (I = t[41]);
    let L;
    (t[42] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((L = (e) => c(e.target.value)), (t[42] = L))
      : (L = t[42]),
      t[43] === s
        ? (P = t[44])
        : ((P = (0, H.jsxs)(`div`, {
            className: `col-span-2`,
            children: [
              I,
              (0, H.jsx)(`input`, {
                id: `cctv-conn-label`,
                type: `text`,
                value: s,
                onChange: L,
                placeholder: `Cầu thang bộ B, Thang máy 2...`,
                className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl text-sm font-bold outline-none transition-colors`,
              }),
            ],
          })),
          (t[43] = s),
          (t[44] = P)));
    let R;
    t[45] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((R = (0, H.jsx)(`label`, {
          htmlFor: `cctv-conn-camera-a`,
          className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
          children: `Camera A`,
        })),
        (t[45] = R))
      : (R = t[45]);
    let z;
    t[46] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((z = (e) => u(e.target.value)), (t[46] = z))
      : (z = t[46]);
    let B;
    (t[47] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((B = (0, H.jsx)(`option`, {
          value: ``,
          children: `-- Chọn camera --`,
        })),
        (t[47] = B))
      : (B = t[47]),
      (b = (0, H.jsxs)(`div`, {
        children: [
          R,
          (0, H.jsxs)(`select`, {
            id: `cctv-conn-camera-a`,
            value: l,
            onChange: z,
            className: `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl text-sm font-bold outline-none transition-colors`,
            children: [B, e.map(Te)],
          }),
        ],
      })),
      t[48] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((M = (0, H.jsx)(`label`, {
            htmlFor: `cctv-conn-camera-b`,
            className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
            children: `Camera B`,
          })),
          (t[48] = M))
        : (M = t[48]),
      (v = `cctv-conn-camera-b`),
      (D = d),
      t[49] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (e) => f(e.target.value)), (t[49] = O))
        : (O = t[49]),
      (k = `w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl text-sm font-bold outline-none transition-colors`),
      t[50] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, H.jsx)(`option`, {
            value: ``,
            children: `-- Chọn camera --`,
          })),
          (t[50] = A))
        : (A = t[50]),
      (j = e.map(we)),
      (t[0] = l),
      (t[1] = d),
      (t[2] = n),
      (t[3] = s),
      (t[4] = o),
      (t[5] = i),
      (t[6] = h),
      (t[7] = g),
      (t[8] = _),
      (t[9] = v),
      (t[10] = b),
      (t[11] = x),
      (t[12] = S),
      (t[13] = C),
      (t[14] = w),
      (t[15] = T),
      (t[16] = E),
      (t[17] = D),
      (t[18] = O),
      (t[19] = k),
      (t[20] = A),
      (t[21] = j),
      (t[22] = M),
      (t[23] = N),
      (t[24] = P));
  } else
    ((h = t[6]),
      (g = t[7]),
      (_ = t[8]),
      (v = t[9]),
      (b = t[10]),
      (x = t[11]),
      (S = t[12]),
      (C = t[13]),
      (w = t[14]),
      (T = t[15]),
      (E = t[16]),
      (D = t[17]),
      (O = t[18]),
      (k = t[19]),
      (A = t[20]),
      (j = t[21]),
      (M = t[22]),
      (N = t[23]),
      (P = t[24]));
  let F;
  t[51] !== v ||
  t[52] !== D ||
  t[53] !== O ||
  t[54] !== k ||
  t[55] !== A ||
  t[56] !== j
    ? ((F = (0, H.jsxs)(`select`, {
        id: v,
        value: D,
        onChange: O,
        className: k,
        children: [A, j],
      })),
      (t[51] = v),
      (t[52] = D),
      (t[53] = O),
      (t[54] = k),
      (t[55] = A),
      (t[56] = j),
      (t[57] = F))
    : (F = t[57]);
  let I;
  t[58] !== F || t[59] !== M
    ? ((I = (0, H.jsxs)(`div`, { children: [M, F] })),
      (t[58] = F),
      (t[59] = M),
      (t[60] = I))
    : (I = t[60]);
  let L;
  t[61] !== b || t[62] !== I || t[63] !== N || t[64] !== P
    ? ((L = (0, H.jsxs)(`div`, { className: N, children: [P, b, I] })),
      (t[61] = b),
      (t[62] = I),
      (t[63] = N),
      (t[64] = P),
      (t[65] = L))
    : (L = t[65]);
  let R;
  t[66] === p
    ? (R = t[67])
    : ((R =
        p &&
        (0, H.jsx)(`p`, {
          className: `text-[10px] font-bold text-red-500 mb-2 shrink-0`,
          children: p,
        })),
      (t[66] = p),
      (t[67] = R));
  let z;
  t[68] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((z = (0, H.jsx)(`i`, { className: `fas fa-plus` })), (t[68] = z))
    : (z = t[68]);
  let U;
  t[69] === _
    ? (U = t[70])
    : ((U = (0, H.jsxs)(`button`, {
        onClick: _,
        className: `mb-4 shrink-0 px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-pink-700 transition-all self-start flex items-center gap-2`,
        children: [z, ` Thêm liên kết`],
      })),
      (t[69] = _),
      (t[70] = U));
  let W;
  t[71] !== h || t[72] !== g || t[73] !== r || t[74] !== a
    ? ((W = (0, H.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll pr-1 border-t border-slate-100 pt-3`,
        children:
          r.length === 0
            ? (0, H.jsx)(`p`, {
                className: `text-xs text-slate-400 italic text-center py-6`,
                children: `Chưa có liên kết nào.`,
              })
            : (0, H.jsx)(`div`, {
                className: `space-y-2`,
                children: r.map((e) => {
                  let t = y(e, e.cameraAId) === e.cameraBId;
                  return (0, H.jsxs)(
                    `div`,
                    {
                      className: `flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white`,
                      children: [
                        (0, H.jsx)(`div`, {
                          className: `w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-xs border border-pink-100 shrink-0`,
                          children: (0, H.jsx)(`i`, {
                            className: `fas fa-link`,
                          }),
                        }),
                        (0, H.jsxs)(`div`, {
                          className: `flex-1 min-w-0`,
                          children: [
                            (0, H.jsx)(`p`, {
                              className: `text-xs font-black text-slate-800`,
                              children: e.label,
                            }),
                            (0, H.jsxs)(`p`, {
                              className: `text-[10px] text-slate-500 font-bold truncate`,
                              children: [
                                g(e.cameraAId),
                                ` (`,
                                h(e.cameraAId),
                                `) `,
                                (0, H.jsx)(`i`, {
                                  className: `fas fa-arrows-left-right mx-1 text-slate-300`,
                                }),
                                ` `,
                                g(e.cameraBId),
                                ` (`,
                                h(e.cameraBId),
                                `)`,
                              ],
                            }),
                            !t &&
                              (0, H.jsx)(`p`, {
                                className: `text-[9px] text-red-500 font-bold mt-0.5`,
                                children: `Dữ liệu liên kết không hợp lệ`,
                              }),
                          ],
                        }),
                        (0, H.jsx)(`button`, {
                          onClick: () => a(e.id),
                          title: `Xóa liên kết`,
                          className: `w-7 h-7 bg-red-50 border border-red-200 text-red-500 rounded-full hover:bg-red-100 shrink-0`,
                          children: (0, H.jsx)(`i`, {
                            className: `fas fa-trash text-[10px]`,
                          }),
                        }),
                      ],
                    },
                    e.id,
                  );
                }),
              }),
      })),
      (t[71] = h),
      (t[72] = g),
      (t[73] = r),
      (t[74] = a),
      (t[75] = W))
    : (W = t[75]);
  let G;
  t[76] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((G = (0, H.jsx)(`div`, { className: `flex-1` })), (t[76] = G))
    : (G = t[76]);
  let K;
  t[77] === o
    ? (K = t[78])
    : ((K = (0, H.jsxs)(`div`, {
        className: `flex gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0`,
        children: [
          G,
          (0, H.jsx)(`button`, {
            onClick: o,
            className: `px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all`,
            children: `Đóng`,
          }),
        ],
      })),
      (t[77] = o),
      (t[78] = K));
  let q;
  t[79] !== x ||
  t[80] !== S ||
  t[81] !== C ||
  t[82] !== w ||
  t[83] !== L ||
  t[84] !== R ||
  t[85] !== U ||
  t[86] !== W ||
  t[87] !== K
    ? ((q = (0, H.jsxs)(`div`, {
        className: x,
        style: S,
        children: [C, w, L, R, U, W, K],
      })),
      (t[79] = x),
      (t[80] = S),
      (t[81] = C),
      (t[82] = w),
      (t[83] = L),
      (t[84] = R),
      (t[85] = U),
      (t[86] = W),
      (t[87] = K),
      (t[88] = q))
    : (q = t[88]);
  let J;
  return (
    t[89] !== T || t[90] !== E || t[91] !== q
      ? ((J = (0, H.jsx)(`div`, { className: T, style: E, children: q })),
        (t[89] = T),
        (t[90] = E),
        (t[91] = q),
        (t[92] = J))
      : (J = t[92]),
    J
  );
}
function we(e) {
  return (0, H.jsxs)(
    `option`,
    { value: e.id, children: [e.name, ` (`, e.floor, `)`] },
    e.id,
  );
}
function Te(e) {
  return (0, H.jsxs)(
    `option`,
    { value: e.id, children: [e.name, ` (`, e.floor, `)`] },
    e.id,
  );
}
function Ee(e, t) {
  return e.name.localeCompare(t.name);
}
var De = [
    { label: `↑ Bắc`, deg: 0 },
    { label: `→ Đông`, deg: 90 },
    { label: `↓ Nam`, deg: 180 },
    { label: `← Tây`, deg: 270 },
  ],
  Oe = [60, 90, 120];
function ke(e) {
  let t = (0, V.c)(59),
    { camera: n, x: r, y: i, onChange: a, onClose: o } = e,
    s = (0, B.useRef)(null),
    [c, l] = (0, B.useState)(String(n.angle)),
    [u, d] = (0, B.useState)(String(n.fov)),
    f,
    p;
  (t[0] === o
    ? ((f = t[1]), (p = t[2]))
    : ((f = () => {
        let e = function (e) {
            s.current && !s.current.contains(e.target) && o();
          },
          t = function (e) {
            e.key === `Escape` && o();
          };
        return (
          document.addEventListener(`pointerdown`, e),
          document.addEventListener(`keydown`, t),
          () => {
            (document.removeEventListener(`pointerdown`, e),
              document.removeEventListener(`keydown`, t));
          }
        );
      }),
      (p = [o]),
      (t[0] = o),
      (t[1] = f),
      (t[2] = p)),
    (0, B.useEffect)(f, p));
  let m;
  t[3] !== n.fov || t[4] !== u || t[5] !== a
    ? ((m = function (e, t) {
        let r = t ?? (Number(e) || 0);
        a(r, Number(u) || n.fov);
      }),
      (t[3] = n.fov),
      (t[4] = u),
      (t[5] = a),
      (t[6] = m))
    : (m = t[6]);
  let h = m,
    g;
  t[7] !== c || t[8] !== n.angle || t[9] !== a
    ? ((g = function (e, t) {
        let r = t ?? (Number(e) || 0);
        a(Number(c) || n.angle, r);
      }),
      (t[7] = c),
      (t[8] = n.angle),
      (t[9] = a),
      (t[10] = g))
    : (g = t[10]);
  let _ = g,
    v;
  t[11] === h
    ? (v = t[12])
    : ((v = function (e) {
        (l(String(e)), h(``, e));
      }),
      (t[11] = h),
      (t[12] = v));
  let y = v,
    b;
  t[13] === _
    ? (b = t[14])
    : ((b = function (e) {
        (d(String(e)), _(``, e));
      }),
      (t[13] = _),
      (t[14] = b));
  let S = b,
    C = Math.min(Math.max(8, r), window.innerWidth - 236),
    w = Math.min(Math.max(8, i), window.innerHeight - 260),
    T;
  t[15] !== C || t[16] !== w
    ? ((T = { left: C, top: w }), (t[15] = C), (t[16] = w), (t[17] = T))
    : (T = t[17]);
  let E;
  t[18] === n.name
    ? (E = t[19])
    : ((E = (0, H.jsx)(`span`, { className: `truncate`, children: n.name })),
      (t[18] = n.name),
      (t[19] = E));
  let D;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[20] = D))
    : (D = t[20]);
  let O;
  t[21] === o
    ? (O = t[22])
    : ((O = (0, H.jsx)(`button`, { onClick: o, title: `Đóng`, children: D })),
      (t[21] = o),
      (t[22] = O));
  let k;
  t[23] !== O || t[24] !== E
    ? ((k = (0, H.jsxs)(`div`, {
        className: `cctv-angle-menu-header`,
        children: [E, O],
      })),
      (t[23] = O),
      (t[24] = E),
      (t[25] = k))
    : (k = t[25]);
  let A;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (0, H.jsx)(`label`, {
        htmlFor: `cctv-angle-menu-angle`,
        children: `Hướng (độ)`,
      })),
      (t[26] = A))
    : (A = t[26]);
  let j, M;
  t[27] === h
    ? ((j = t[28]), (M = t[29]))
    : ((j = (e) => {
        (l(e.target.value), h(e.target.value));
      }),
      (M = (e) => {
        let t = x(Number(e.target.value) || 0);
        (l(String(t)), h(``, t));
      }),
      (t[27] = h),
      (t[28] = j),
      (t[29] = M));
  let N;
  t[30] !== c || t[31] !== j || t[32] !== M
    ? ((N = (0, H.jsx)(`input`, {
        id: `cctv-angle-menu-angle`,
        type: `number`,
        value: c,
        onChange: j,
        onBlur: M,
      })),
      (t[30] = c),
      (t[31] = j),
      (t[32] = M),
      (t[33] = N))
    : (N = t[33]);
  let P;
  t[34] === y
    ? (P = t[35])
    : ((P = De.map((e) =>
        (0, H.jsx)(
          `button`,
          { onClick: () => y(e.deg), children: e.label },
          e.deg,
        ),
      )),
      (t[34] = y),
      (t[35] = P));
  let F;
  t[36] === P
    ? (F = t[37])
    : ((F = (0, H.jsx)(`div`, {
        className: `cctv-angle-menu-quick`,
        children: P,
      })),
      (t[36] = P),
      (t[37] = F));
  let I;
  t[38] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((I = (0, H.jsx)(`label`, {
        htmlFor: `cctv-angle-menu-fov`,
        children: `Góc quan sát · FOV (độ)`,
      })),
      (t[38] = I))
    : (I = t[38]);
  let R, z;
  t[39] === _
    ? ((R = t[40]), (z = t[41]))
    : ((R = (e) => {
        (d(e.target.value), _(e.target.value));
      }),
      (z = (e) => {
        let t = L(Number(e.target.value) || 0);
        (d(String(t)), _(``, t));
      }),
      (t[39] = _),
      (t[40] = R),
      (t[41] = z));
  let U;
  t[42] !== u || t[43] !== R || t[44] !== z
    ? ((U = (0, H.jsx)(`input`, {
        id: `cctv-angle-menu-fov`,
        type: `number`,
        value: u,
        onChange: R,
        onBlur: z,
      })),
      (t[42] = u),
      (t[43] = R),
      (t[44] = z),
      (t[45] = U))
    : (U = t[45]);
  let W;
  t[46] === S
    ? (W = t[47])
    : ((W = Oe.map((e) =>
        (0, H.jsxs)(`button`, { onClick: () => S(e), children: [e, `°`] }, e),
      )),
      (t[46] = S),
      (t[47] = W));
  let G;
  t[48] === W
    ? (G = t[49])
    : ((G = (0, H.jsx)(`div`, {
        className: `cctv-angle-menu-quick`,
        children: W,
      })),
      (t[48] = W),
      (t[49] = G));
  let K;
  t[50] !== N || t[51] !== F || t[52] !== U || t[53] !== G
    ? ((K = (0, H.jsxs)(`div`, {
        className: `cctv-angle-menu-body`,
        children: [A, N, F, I, U, G],
      })),
      (t[50] = N),
      (t[51] = F),
      (t[52] = U),
      (t[53] = G),
      (t[54] = K))
    : (K = t[54]);
  let q;
  return (
    t[55] !== k || t[56] !== K || t[57] !== T
      ? ((q = (0, H.jsxs)(`div`, {
          ref: s,
          className: `cctv-angle-menu`,
          style: T,
          children: [k, K],
        })),
        (t[55] = k),
        (t[56] = K),
        (t[57] = T),
        (t[58] = q))
      : (q = t[58]),
    q
  );
}
function Ae(e) {
  let t = (0, V.c)(20),
    {
      matches: n,
      nvrDB: r,
      x: i,
      y: a,
      onSelectCamera: o,
      onAddToTrace: s,
      onClose: c,
    } = e,
    l = (0, B.useRef)(null),
    u,
    d;
  (t[0] === c
    ? ((u = t[1]), (d = t[2]))
    : ((u = () => {
        let e = function (e) {
            l.current && !l.current.contains(e.target) && c();
          },
          t = function (e) {
            e.key === `Escape` && c();
          };
        return (
          document.addEventListener(`pointerdown`, e),
          document.addEventListener(`keydown`, t),
          () => {
            (document.removeEventListener(`pointerdown`, e),
              document.removeEventListener(`keydown`, t));
          }
        );
      }),
      (d = [c]),
      (t[0] = c),
      (t[1] = u),
      (t[2] = d)),
    (0, B.useEffect)(u, d));
  let f = Math.min(Math.max(8, i), window.innerWidth - 268),
    p = Math.min(Math.max(8, a), window.innerHeight - 320),
    m;
  t[3] !== f || t[4] !== p
    ? ((m = { left: f, top: p }), (t[3] = f), (t[4] = p), (t[5] = m))
    : (m = t[5]);
  let h;
  t[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = (0, H.jsxs)(`span`, {
        className: `truncate`,
        children: [
          (0, H.jsx)(`i`, {
            className: `fas fa-crosshairs mr-1.5 text-orange-500`,
          }),
          `Camera hướng về điểm này`,
        ],
      })),
      (t[6] = h))
    : (h = t[6]);
  let g;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[7] = g))
    : (g = t[7]);
  let _;
  t[8] === c
    ? (_ = t[9])
    : ((_ = (0, H.jsxs)(`div`, {
        className: `cctv-angle-menu-header`,
        children: [
          h,
          (0, H.jsx)(`button`, { onClick: c, title: `Đóng`, children: g }),
        ],
      })),
      (t[8] = c),
      (t[9] = _));
  let v;
  t[10] !== n || t[11] !== r || t[12] !== s || t[13] !== c || t[14] !== o
    ? ((v =
        n.length === 0
          ? (0, H.jsxs)(`div`, {
              className: `cctv-investigate-empty`,
              children: [
                (0, H.jsx)(`i`, { className: `fas fa-video-slash` }),
                (0, H.jsx)(`p`, {
                  children: `Không có camera nào đang hướng về điểm này.`,
                }),
              ],
            })
          : (0, H.jsx)(`div`, {
              className: `cctv-investigate-list`,
              children: n.map((e, t) => {
                let { camera: n } = e,
                  i = b(n),
                  a = n.nvrId ? r.find((e) => e.id === n.nvrId) : void 0;
                return (0, H.jsxs)(
                  `div`,
                  {
                    className: `cctv-investigate-row`,
                    children: [
                      (0, H.jsxs)(`button`, {
                        className: `cctv-investigate-item`,
                        onClick: () => {
                          (o(n.id), c());
                        },
                        children: [
                          (0, H.jsx)(`div`, {
                            className: `cctv-investigate-item-icon`,
                            children: (0, H.jsx)(`i`, {
                              className: `fas ${i.icon}`,
                            }),
                          }),
                          (0, H.jsxs)(`div`, {
                            className: `flex-1 min-w-0`,
                            children: [
                              (0, H.jsxs)(`p`, {
                                className: `cctv-investigate-item-name`,
                                children: [
                                  n.name,
                                  t === 0 &&
                                    (0, H.jsx)(`span`, {
                                      className: `cctv-investigate-nearest`,
                                      children: `Gần nhất`,
                                    }),
                                ],
                              }),
                              (0, H.jsx)(`p`, {
                                className: `cctv-investigate-item-meta`,
                                children: a
                                  ? `NVR ${a.name}${n.channel == null ? `` : ` · CH${n.channel}`}`
                                  : n.ip || n.floor,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, H.jsx)(`button`, {
                        className: `cctv-investigate-item-add`,
                        title: `Thêm vào hành trình điều tra`,
                        onClick: () => s(n.id),
                        children: (0, H.jsx)(`i`, {
                          className: `fas fa-route`,
                        }),
                      }),
                    ],
                  },
                  n.id,
                );
              }),
            })),
      (t[10] = n),
      (t[11] = r),
      (t[12] = s),
      (t[13] = c),
      (t[14] = o),
      (t[15] = v))
    : (v = t[15]);
  let y;
  return (
    t[16] !== m || t[17] !== _ || t[18] !== v
      ? ((y = (0, H.jsxs)(`div`, {
          ref: l,
          className: `cctv-investigate-menu`,
          style: m,
          children: [_, v],
        })),
        (t[16] = m),
        (t[17] = _),
        (t[18] = v),
        (t[19] = y))
      : (y = t[19]),
    y
  );
}
function je(e) {
  let t = (0, V.c)(35),
    {
      steps: n,
      cctvDB: r,
      nvrDB: i,
      connectors: a,
      onUpdateNote: o,
      onRemoveStep: s,
      onReorderStep: c,
      onClear: l,
      onJumpToConnector: u,
      onPrint: d,
      onClose: f,
    } = e,
    p;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = (0, H.jsx)(`i`, {
        className: `fas fa-route mr-1.5 text-pink-500`,
      })),
      (t[0] = p))
    : (p = t[0]);
  let m = n.length > 0 ? `(${n.length})` : ``,
    h;
  t[1] === m
    ? (h = t[2])
    : ((h = (0, H.jsxs)(`span`, { children: [p, `Hành trình điều tra `, m] })),
      (t[1] = m),
      (t[2] = h));
  let g;
  t[3] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, H.jsx)(`i`, { className: `fas fa-times` })), (t[3] = g))
    : (g = t[3]);
  let _;
  t[4] === f
    ? (_ = t[5])
    : ((_ = (0, H.jsx)(`button`, { onClick: f, title: `Đóng`, children: g })),
      (t[4] = f),
      (t[5] = _));
  let v;
  t[6] !== h || t[7] !== _
    ? ((v = (0, H.jsxs)(`div`, {
        className: `cctv-trace-panel-header`,
        children: [h, _],
      })),
      (t[6] = h),
      (t[7] = _),
      (t[8] = v))
    : (v = t[8]);
  let x;
  t[9] !== r ||
  t[10] !== a ||
  t[11] !== i ||
  t[12] !== u ||
  t[13] !== s ||
  t[14] !== c ||
  t[15] !== o ||
  t[16] !== n
    ? ((x =
        n.length === 0
          ? (0, H.jsxs)(`div`, {
              className: `cctv-trace-panel-empty`,
              children: [
                (0, H.jsx)(`i`, { className: `fas fa-shoe-prints` }),
                (0, H.jsxs)(`p`, {
                  children: [
                    `Chưa có camera nào trong hành trình. Bật "Tra cứu điểm nhìn", chọn camera bị nghi vấn, rồi bấm nút `,
                    (0, H.jsx)(`i`, { className: `fas fa-route` }),
                    ` để thêm vào đây.`,
                  ],
                }),
              ],
            })
          : n.map((e, t) => {
              let l = r.find((t) => t.id === e.cameraId),
                d = l ? b(l) : null,
                f = l?.nvrId ? i.find((e) => e.id === l.nvrId) : void 0,
                p = l ? R(a, l.id) : [];
              return (0, H.jsxs)(
                `div`,
                {
                  className: `cctv-trace-step`,
                  children: [
                    (0, H.jsxs)(`div`, {
                      className: `cctv-trace-step-top`,
                      children: [
                        (0, H.jsx)(`span`, {
                          className: `cctv-trace-step-index`,
                          children: t + 1,
                        }),
                        (0, H.jsx)(`div`, {
                          className: `cctv-trace-step-icon`,
                          children: (0, H.jsx)(`i`, {
                            className: `fas ${d?.icon ?? `fa-video`}`,
                          }),
                        }),
                        (0, H.jsxs)(`div`, {
                          className: `flex-1 min-w-0`,
                          children: [
                            (0, H.jsx)(`p`, {
                              className: `cctv-trace-step-name`,
                              children: l?.name ?? `(Camera đã bị xóa)`,
                            }),
                            (0, H.jsxs)(`p`, {
                              className: `cctv-trace-step-meta`,
                              children: [
                                l?.floor ?? `—`,
                                f
                                  ? ` · NVR ${f.name}${l?.channel == null ? `` : ` · CH${l.channel}`}`
                                  : ``,
                              ],
                            }),
                          ],
                        }),
                        (0, H.jsxs)(`div`, {
                          className: `cctv-trace-step-actions`,
                          children: [
                            (0, H.jsx)(`button`, {
                              onClick: () => c(t, -1),
                              disabled: t === 0,
                              title: `Đưa lên trước`,
                              children: (0, H.jsx)(`i`, {
                                className: `fas fa-arrow-up`,
                              }),
                            }),
                            (0, H.jsx)(`button`, {
                              onClick: () => c(t, 1),
                              disabled: t === n.length - 1,
                              title: `Đưa xuống sau`,
                              children: (0, H.jsx)(`i`, {
                                className: `fas fa-arrow-down`,
                              }),
                            }),
                            (0, H.jsx)(`button`, {
                              onClick: () => s(t),
                              title: `Bỏ khỏi hành trình`,
                              className: `text-red-500`,
                              children: (0, H.jsx)(`i`, {
                                className: `fas fa-trash`,
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, H.jsx)(`input`, {
                      type: `text`,
                      value: e.note,
                      onChange: (e) => o(t, e.target.value),
                      placeholder: `Thời điểm quan sát / ghi chú...`,
                      className: `cctv-trace-step-note`,
                    }),
                    p.map((t) => {
                      let n = y(t, e.cameraId),
                        i = n ? r.find((e) => e.id === n) : void 0;
                      return !n || !i
                        ? null
                        : (0, H.jsxs)(
                            `button`,
                            {
                              onClick: () => u(n),
                              className: `cctv-trace-step-jump`,
                              children: [
                                (0, H.jsx)(`i`, {
                                  className: `fas fa-arrow-right-arrow-left`,
                                }),
                                ` `,
                                t.label,
                                `: nhảy sang `,
                                i.name,
                                ` (`,
                                i.floor,
                                `)`,
                              ],
                            },
                            t.id,
                          );
                    }),
                  ],
                },
                `${e.cameraId}-${t}`,
              );
            })),
      (t[9] = r),
      (t[10] = a),
      (t[11] = i),
      (t[12] = u),
      (t[13] = s),
      (t[14] = c),
      (t[15] = o),
      (t[16] = n),
      (t[17] = x))
    : (x = t[17]);
  let S;
  t[18] === x
    ? (S = t[19])
    : ((S = (0, H.jsx)(`div`, {
        className: `cctv-trace-panel-body`,
        children: x,
      })),
      (t[18] = x),
      (t[19] = S));
  let C = n.length === 0,
    w;
  t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((w = (0, H.jsx)(`i`, { className: `fas fa-trash` })), (t[20] = w))
    : (w = t[20]);
  let T;
  t[21] !== l || t[22] !== C
    ? ((T = (0, H.jsxs)(`button`, {
        onClick: l,
        disabled: C,
        className: `cctv-trace-panel-btn cctv-trace-panel-btn-ghost`,
        children: [w, ` Xóa hành trình`],
      })),
      (t[21] = l),
      (t[22] = C),
      (t[23] = T))
    : (T = t[23]);
  let E = n.length === 0,
    D;
  t[24] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = (0, H.jsx)(`i`, { className: `fas fa-print` })), (t[24] = D))
    : (D = t[24]);
  let O;
  t[25] !== d || t[26] !== E
    ? ((O = (0, H.jsxs)(`button`, {
        onClick: d,
        disabled: E,
        className: `cctv-trace-panel-btn cctv-trace-panel-btn-primary`,
        children: [D, ` In hành trình`],
      })),
      (t[25] = d),
      (t[26] = E),
      (t[27] = O))
    : (O = t[27]);
  let k;
  t[28] !== T || t[29] !== O
    ? ((k = (0, H.jsxs)(`div`, {
        className: `cctv-trace-panel-footer`,
        children: [T, O],
      })),
      (t[28] = T),
      (t[29] = O),
      (t[30] = k))
    : (k = t[30]);
  let A;
  return (
    t[31] !== k || t[32] !== v || t[33] !== S
      ? ((A = (0, H.jsxs)(`div`, {
          className: `cctv-trace-panel`,
          children: [v, S, k],
        })),
        (t[31] = k),
        (t[32] = v),
        (t[33] = S),
        (t[34] = A))
      : (A = t[34]),
    A
  );
}
function Me(e) {
  let t = (0, V.c)(23),
    { steps: n, cctvDB: r, nvrDB: i } = e,
    a,
    o,
    s,
    c,
    l,
    u;
  if (t[0] !== r || t[1] !== i || t[2] !== n) {
    let e = m(n, r, i);
    ((c = `cctv-trace-print-area`),
      t[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((l = (0, H.jsx)(`h2`, {
            className: `text-lg font-black text-slate-800 mb-1`,
            children: `Hành trình điều tra CCTV`,
          })),
          (t[9] = l))
        : (l = t[9]),
      t[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, H.jsxs)(`p`, {
            className: `text-xs text-slate-500 font-bold mb-4`,
            children: [`In lúc: `, new Date().toLocaleString(`vi-VN`)],
          })),
          (t[10] = u))
        : (u = t[10]),
      (o = `cctv-trace-print-table`),
      t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = (0, H.jsx)(`thead`, {
            children: (0, H.jsxs)(`tr`, {
              children: [
                (0, H.jsx)(`th`, { children: `#` }),
                (0, H.jsx)(`th`, { children: `Camera` }),
                (0, H.jsx)(`th`, { children: `Tầng` }),
                (0, H.jsx)(`th`, { children: `NVR / Kênh` }),
                (0, H.jsx)(`th`, { children: `Thời điểm / Ghi chú` }),
              ],
            }),
          })),
          (t[11] = s))
        : (s = t[11]),
      (a = e.map(Ne)),
      (t[0] = r),
      (t[1] = i),
      (t[2] = n),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = c),
      (t[7] = l),
      (t[8] = u));
  } else
    ((a = t[3]), (o = t[4]), (s = t[5]), (c = t[6]), (l = t[7]), (u = t[8]));
  let d;
  t[12] === a
    ? (d = t[13])
    : ((d = (0, H.jsx)(`tbody`, { children: a })), (t[12] = a), (t[13] = d));
  let f;
  t[14] !== o || t[15] !== s || t[16] !== d
    ? ((f = (0, H.jsxs)(`table`, { className: o, children: [s, d] })),
      (t[14] = o),
      (t[15] = s),
      (t[16] = d),
      (t[17] = f))
    : (f = t[17]);
  let p;
  return (
    t[18] !== c || t[19] !== l || t[20] !== u || t[21] !== f
      ? ((p = (0, H.jsxs)(`div`, { id: c, children: [l, u, f] })),
        (t[18] = c),
        (t[19] = l),
        (t[20] = u),
        (t[21] = f),
        (t[22] = p))
      : (p = t[22]),
    p
  );
}
function Ne(e) {
  return (0, H.jsxs)(
    `tr`,
    {
      children: [
        (0, H.jsx)(`td`, { children: e.index }),
        (0, H.jsx)(`td`, { children: e.cameraName }),
        (0, H.jsx)(`td`, { children: e.floor }),
        (0, H.jsx)(`td`, { children: e.nvrLabel }),
        (0, H.jsx)(`td`, { children: e.note || `—` }),
      ],
    },
    e.index,
  );
}
function Pe({ onBack: e, isAdmin: t, username: n }) {
  let r = T((e) => e.DB),
    o = T((e) => e.NVRDB),
    c = T((e) => e.CctvCameraDB),
    l = T((e) => e.CctvFloorplans),
    u = T((e) => e.CctvFloorConnectors),
    d = T((e) => e.saveCctvCamera),
    p = T((e) => e.deleteCctvCamera),
    m = T((e) => e.addGlobalLog),
    g = T((e) => e.saveCctvFloorplan),
    v = T((e) => e.deleteCctvFloorplan),
    y = T((e) => e.saveCctvFloorConnector),
    b = T((e) => e.deleteCctvFloorConnector),
    x = P((e) => e.showDialog),
    S = _((e) => e.focusRequest),
    w = _((e) => e.clearFocusRequest),
    E = _((e) => e.requestFocus),
    D = _((e) => e.openReportModal),
    [A, j] = (0, B.useState)(`all`),
    [M, N] = (0, B.useState)(`all`),
    [F, I] = (0, B.useState)(null),
    [L, R] = (0, B.useState)(!1),
    [z, V] = (0, B.useState)(`closed`),
    [W, G] = (0, B.useState)(!1),
    [K, q] = (0, B.useState)(!1),
    [J, ee] = (0, B.useState)(null),
    [te, ne] = (0, B.useState)(null),
    [cameraSearch, setCameraSearch] = (0, B.useState)(''),
    [cctvSidebarTab, setCctvSidebarTab] = (0, B.useState)('list'),
    [re, ie] = (0, B.useState)(null),
    [ae, X] = (0, B.useState)(!1),
    [se, ce] = (0, B.useState)(null),
    [le, de] = (0, B.useState)([]),
    [fe, pe] = (0, B.useState)(null),
    [me, he] = (0, B.useState)(!1),
    [ge, Z] = (0, B.useState)([]),
    [Q, $] = (0, B.useState)(!1);
  (0, B.useEffect)(() => {
    if (!S || S.module !== `cctv`) return;
    let e = c.find((e) => e.id === S.cameraId);
    (e && V(e), w());
  }, [S, w, c]);
  let ve = (l || []).find((e) => e.id === F) ?? null;
  function ye() {
    if (!t) {
      x(`Bạn không có quyền thêm Camera!`, `error`);
      return;
    }
    V(null);
  }
  function be(e) {
    (d(e), V(`closed`));
  }
  function Se() {
    z === `closed` ||
      !z ||
      (m(`Camera: ${z.name}`, `Đã xóa Camera [${z.name}] khỏi hệ thống`, n),
      p(z.id),
      V(`closed`));
  }
  async function we(e) {
    R(!0);
    try {
      let t = A === `all` ? `Chung` : A,
        n = `cctv-fp-${Date.now()}`,
        r = e.name.split(`.`).pop(),
        i = `${a}/${n}.${r}`,
        o = `${t} — ${e.name.replace(/\.[^.]+$/, ``)}`,
        { error: s } = await k(i, e);
      if (s) throw s;
      let c = { id: n, floor: t, name: o, url: h(i), storagePath: i };
      (g(c), I(c.id), x(`Đã upload bản vẽ "${o}" thành công!`, `success`));
    } catch (e) {
      x(
        `Upload thất bại: ${e instanceof Error ? e.message : String(e)}`,
        `error`,
      );
    } finally {
      R(!1);
    }
  }
  function Te() {
    if (!F) {
      x(`Chưa chọn bản vẽ nào!`, `error`);
      return;
    }
    let e = (l || []).find((e) => e.id === F);
    x(
      `Xóa bản vẽ "${e?.name}"? Các Camera đã định vị trên bản vẽ này sẽ mất vị trí.`,
      `confirm`,
      async () => {
        if (e?.storagePath) {
          let { error: t } = await C(e.storagePath);
          t && console.warn(`Không thể xóa file R2:`, t.message);
        }
        (c.forEach((e) => {
          e.floorplanId === F &&
            d({ ...e, x: null, y: null, floorplanId: null });
        }),
          v(F),
          I((l || []).find((e) => e.id !== F)?.id ?? null),
          Ue());
      },
    );
  }
  function Ee(e, t) {
    if (!J || !F) return;
    let n = c.find((e) => e.id === J);
    if (!n) {
      ee(null);
      return;
    }
    (d({ ...n, x: e, y: t, floorplanId: F }), ee(null));
  }
  function De(e, t) {
    let n = c.find((t) => t.id === e);
    n && d({ ...n, angle: t });
  }
  function Oe(e) {
    let t = c.find((t) => t.id === e);
    if (!t) return;
    let r = !t.locked;
    (d({ ...t, locked: r }), m(`Camera: ${t.name}`, f(t.name, r), n));
  }
  function Ne(e, t, n) {
    let r = c.find((t) => t.id === e);
    r && d({ ...r, x: t, y: n });
  }
  function Pe(e) {
    (e.forEach((e) => d(e)), G(!1));
  }
  function Fe(e) {
    if (!F) return;
    let t = ve?.floor ?? `Chung`,
      r = O(c, e, F, t, n);
    r.forEach((e) => d(e));
    let i = l.find((t) => t.id === e)?.name ?? e,
      a = ve?.name ?? F;
    (m(`Camera CCTV`, s(i, a, r.length), n),
      q(!1),
      x(`Đã sao chép ${r.length} camera sang "${a}"!`, `success`));
  }
  function Ie(e, t, n) {
    (Ue(), ne(e), ie({ x: t, y: n }));
  }
  function Le() {
    (ne(null), ie(null));
  }
  function Re(e, t) {
    if (!te) return;
    let n = c.find((e) => e.id === te);
    n && d({ ...n, angle: e, fov: t });
  }
  let ze = te ? (c.find((e) => e.id === te) ?? null) : null;
  function Be(e) {
    (I(e), Ue());
  }
  function Ve() {
    (X((e) => !e), Ue());
  }
  function He(e, t, n, r) {
    (Le(), ce(t), de(e), pe({ x: n, y: r }));
  }
  function Ue() {
    (ce(null), de([]), pe(null));
  }
  function We(e) {
    let t = c.find((t) => t.id === e);
    t && V(t);
  }
  function Ge(e) {
    y(e);
    let t = c.find((t) => t.id === e.cameraAId),
      r = c.find((t) => t.id === e.cameraBId);
    t && r && m(`CCTV Liên kết tầng`, i(e.label, t.name, r.name), n);
  }
  function Ke(e) {
    (Z((t) => [...t, { cameraId: e, note: `` }]), $(!0));
  }
  function qe(e, t) {
    Z((n) => n.map((n, r) => (r === e ? { ...n, note: t } : n)));
  }
  function Je(e) {
    Z((t) => t.filter((t, n) => n !== e));
  }
  function Ye(e, t) {
    Z((n) => {
      let r = e + t;
      if (r < 0 || r >= n.length) return n;
      let i = [...n];
      return (([i[e], i[r]] = [i[r], i[e]]), i);
    });
  }
  function Xe() {
    x(`Xóa toàn bộ hành trình điều tra?`, `confirm`, () => Z([]));
  }
  function Ze(e) {
    let t = c.find((t) => t.id === e);
    t &&
      (t.floorplanId && Be(t.floorplanId),
      j(t.floor),
      Z((t) =>
        t.some((t) => t.cameraId === e) ? t : [...t, { cameraId: e, note: `` }],
      ));
  }
  function Qe() {
    window.print();
  }
  function $e(e, t) {
    E({ module: `topology`, switchId: e, portNum: t ?? void 0 });
  }
  return (0, H.jsxs)(`div`, {
    id: `cctv-view`,
    className: `w-full h-full flex flex-col relative bg-slate-50/50`,
    children: [
      (0, H.jsxs)(`div`, {
        className: `view-header px-8 py-5 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0 shrink-0`,
        children: [
          (0, H.jsxs)(`div`, {
            children: [
              (0, H.jsxs)(`h2`, {
                className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
                children: [
                  (0, H.jsx)(`div`, {
                    className: `w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100`,
                    children: (0, H.jsx)(`i`, { className: `fas fa-video` }),
                  }),
                  `CCTV — Camera Topology`,
                ],
              }),
              (0, H.jsx)(`p`, {
                className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest`,
                children: `Định vị & Giám sát Camera trên mặt bằng`,
              }),
            ],
          }),
          (0, H.jsxs)(`div`, {
            className: `view-header-actions flex items-center gap-3`,
            children: [
              (0, H.jsxs)(`button`, {
                onClick: () => D(`cctv`),
                className: `px-5 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2`,
                children: [
                  (0, H.jsx)(`i`, { className: `fas fa-chart-bar` }),
                  ` Báo cáo`,
                ],
              }),
              (0, H.jsxs)(`button`, {
                onClick: () => G(!0),
                title: `Import Camera từ Switch Port VLAN 120`,
                className: `px-5 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-xl hover:bg-amber-100 transition-all flex items-center gap-2`,
                children: [
                  (0, H.jsx)(`i`, { className: `fas fa-download` }),
                  ` Import Switch`,
                ],
              }),
              (0, H.jsxs)(`button`, {
                onClick: () => he(!0),
                title: `Liên kết Cầu thang/Thang máy giữa các tầng, dùng cho truy vết hành trình`,
                className: `px-5 py-2.5 bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold rounded-xl hover:bg-pink-100 transition-all flex items-center gap-2`,
                children: [
                  (0, H.jsx)(`i`, { className: `fas fa-link` }),
                  ` Liên kết tầng`,
                ],
              }),
              (0, H.jsxs)(`button`, {
                onClick: () => $((e) => !e),
                title: `Bảng hành trình điều tra`,
                className: `px-5 py-2.5 bg-pink-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-pink-700 transition-all flex items-center gap-2`,
                children: [
                  (0, H.jsx)(`i`, { className: `fas fa-route` }),
                  ` Hành trình`,
                  ge.length > 0 ? ` (${ge.length})` : ``,
                ],
              }),
              (0, H.jsxs)(`button`, {
                onClick: ye,
                className: `px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-orange-700 transition-all flex items-center gap-2`,
                children: [
                  (0, H.jsx)(`i`, { className: `fas fa-plus` }),
                  ` Thêm Camera`,
                ],
              }),
              (0, H.jsxs)(`button`, {
                onClick: e,
                className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
                children: [
                  (0, H.jsx)(`i`, { className: `fas fa-arrow-left` }),
                  ` Quay lại`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, H.jsxs)(`div`, {
        id: `cctv-body`,
        className: `view-body flex flex-1 overflow-hidden`,
        children: [
          (0, H.jsx)(U, {
            db: c,
            networkDB: r,
            nvrDB: o,
            floorFilter: A,
            onFloorFilterChange: j,
            nvrFilter: M,
            onNvrFilterChange: N,
            onSelectCamera: V,
            onDragCameraStart: ee,
            onNavigateToSwitch: $e,
            
          }),
          (0, H.jsxs)(`div`, {
            className: `flex-1 overflow-auto custom-scroll p-6 flex flex-col gap-4`,
            children: [
              (0, H.jsx)(Y, {
                floorplans: Array.isArray(l) ? l : [],
                currentFloorplanId: F,
                isUploading: L,
                onSelectFloorplan: Be,
                onUpload: we,
                onDelete: Te,
                onOpenCopyLayout: () => q(!0),
                investigateMode: ae,
                onToggleInvestigateMode: Ve,
              }),
              (0, H.jsx)(oe, {
                floorplan: ve,
                cameras: c,
                nvrDB: o,
                onDropCamera: Ee,
                onMoveCamera: Ne,
                onEditCamera: V,
                onRotateCamera: De,
                onOpenAngleMenu: Ie,
                onToggleLock: Oe,
                investigateMode: ae,
                investigatePoint: se,
                onInvestigatePoint: He,
              }),
            ],
          }),
        ],
      }),
      z !== `closed` &&
        (0, H.jsx)(ue, {
          camera: z,
          networkDB: r,
          nvrDB: o,
          isAdmin: t,
          username: n,
          onSave: be,
          onDelete: Se,
          onClose: () => V(`closed`),
        }),
      W &&
        (0, H.jsx)(_e, {
          networkDB: r,
          cctvDB: c,
          nvrDB: o,
          username: n,
          onImport: Pe,
          onClose: () => G(!1),
        }),
      K &&
        F &&
        (0, H.jsx)(xe, {
          floorplans: l,
          currentFloorplanId: F,
          cctvDB: c,
          onCopy: Fe,
          onClose: () => q(!1),
        }),
      ze &&
        re &&
        (0, H.jsx)(
          ke,
          { camera: ze, x: re.x, y: re.y, onChange: Re, onClose: Le },
          ze.id,
        ),
      fe &&
        (0, H.jsx)(Ae, {
          matches: le,
          nvrDB: o,
          x: fe.x,
          y: fe.y,
          onSelectCamera: We,
          onAddToTrace: Ke,
          onClose: Ue,
        }),
      me &&
        (0, H.jsx)(Ce, {
          cctvDB: c,
          connectors: u,
          onSave: Ge,
          onDelete: b,
          onClose: () => he(!1),
        }),
      Q &&
        (0, H.jsx)(je, {
          steps: ge,
          cctvDB: c,
          nvrDB: o,
          connectors: u,
          onUpdateNote: qe,
          onRemoveStep: Je,
          onReorderStep: Ye,
          onClear: Xe,
          onJumpToConnector: Ze,
          onPrint: Qe,
          onClose: () => $(!1),
        }),
      ge.length > 0 && (0, H.jsx)(Me, { steps: ge, cctvDB: c, nvrDB: o }),
    ],
  });
}
export { Pe as default };
