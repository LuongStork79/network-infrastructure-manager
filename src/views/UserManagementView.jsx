import { a as e, r as t, t as n } from "./jsx-runtime-BbbE9Oaj.js";
import {
  $t as r,
  Qt as i,
  Xt as a,
  Zt as o,
  en as s,
  s as c,
  tn as l,
} from "./index-QE6I14Fy.js";
var u = l(),
  d = e(t(), 1),
  f = n();
function p({ user: e, usersDb: t, onSave: n, onClose: l }) {
  let u = c((e) => e.showDialog),
    [p, m] = (0, d.useState)(e?.username ?? ``),
    [h, g] = (0, d.useState)(``),
    [_, v] = (0, d.useState)(e?.role ?? `user`),
    [y, b] = (0, d.useState)(!1);
  async function x() {
    let c = s(p, t, e?.username ?? null);
    if (c) {
      u(c, `error`);
      return;
    }
    let l = !e || h.trim().length > 0;
    if (l) {
      let e = r(h);
      if (e) {
        u(e, `error`);
        return;
      }
    }
    if (e && e.role === `admin` && _ !== `admin`) {
      let n = i(t, e.username);
      if (n) {
        u(n, `error`);
        return;
      }
    }
    b(!0);
    try {
      let t;
      ((t = e
        ? l
          ? { ...(await a(e, h)), username: p.trim(), role: _ }
          : { ...e, username: p.trim(), role: _ }
        : await o(p, h, _)),
        n(t, e?.username ?? null));
    } finally {
      b(!1);
    }
  }
  return (0, f.jsx)(`div`, {
    className: `modal`,
    style: { display: `flex`, zIndex: 222 },
    children: (0, f.jsxs)(`div`, {
      className: `modal-content shadow-2xl`,
      style: {
        width: 420,
        maxHeight: `90vh`,
        display: `flex`,
        flexDirection: `column`,
      },
      children: [
        (0, f.jsxs)(`div`, {
          className: `flex justify-between items-center mb-4 border-b border-slate-100 pb-4 shrink-0`,
          children: [
            (0, f.jsxs)(`h3`, {
              className: `text-lg font-black text-slate-800 flex items-center gap-3`,
              children: [
                (0, f.jsx)(`div`, {
                  className: `w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-xs border border-violet-100`,
                  children: (0, f.jsx)(`i`, { className: `fas fa-user-cog` }),
                }),
                (0, f.jsx)(`span`, {
                  children: e ? `Chỉnh sửa người dùng` : `Thêm người dùng`,
                }),
              ],
            }),
            (0, f.jsx)(`button`, {
              onClick: l,
              className: `w-8 h-8 bg-slate-50 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-100`,
              children: (0, f.jsx)(`i`, { className: `fas fa-times` }),
            }),
          ],
        }),
        (0, f.jsx)(`div`, {
          className: `flex-1 overflow-y-auto custom-scroll`,
          children: (0, f.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, f.jsxs)(`div`, {
                children: [
                  (0, f.jsx)(`label`, {
                    htmlFor: `user-cfg-username`,
                    className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                    children: `Tên đăng nhập`,
                  }),
                  (0, f.jsx)(`input`, {
                    id: `user-cfg-username`,
                    value: p,
                    onChange: (e) => m(e.target.value),
                    placeholder: `VD: an`,
                    className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500`,
                  }),
                ],
              }),
              (0, f.jsxs)(`div`, {
                children: [
                  (0, f.jsxs)(`label`, {
                    htmlFor: `user-cfg-password`,
                    className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                    children: [
                      `Mật khẩu`,
                      e &&
                        (0, f.jsx)(`span`, {
                          className: `normal-case font-medium text-slate-400`,
                          children: ` (để trống nếu giữ nguyên)`,
                        }),
                    ],
                  }),
                  (0, f.jsx)(`input`, {
                    id: `user-cfg-password`,
                    type: `password`,
                    value: h,
                    onChange: (e) => g(e.target.value),
                    placeholder: e ? `••••••••` : `Tối thiểu 6 ký tự`,
                    className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500`,
                  }),
                ],
              }),
              (0, f.jsxs)(`div`, {
                children: [
                  (0, f.jsx)(`label`, {
                    htmlFor: `user-cfg-role`,
                    className: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`,
                    children: `Vai trò`,
                  }),
                  (0, f.jsxs)(`select`, {
                    id: `user-cfg-role`,
                    value: _,
                    onChange: (e) => v(e.target.value),
                    className: `w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 cursor-pointer`,
                    children: [
                      (0, f.jsx)(`option`, {
                        value: `user`,
                        children: `Người dùng`,
                      }),
                      (0, f.jsx)(`option`, {
                        value: `admin`,
                        children: `Quản trị viên`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        (0, f.jsxs)(`div`, {
          className: `mt-8 pt-6 border-t border-slate-100 flex gap-3 shrink-0`,
          children: [
            (0, f.jsx)(`button`, {
              onClick: l,
              className: `flex-1 py-3 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50`,
              children: `Hủy`,
            }),
            (0, f.jsx)(`button`, {
              onClick: x,
              disabled: y,
              className: `flex-1 py-3 bg-violet-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-violet-700 disabled:opacity-60 transition-all`,
              children: y ? `Đang lưu...` : `Lưu`,
            }),
          ],
        }),
      ],
    }),
  });
}
function m(e) {
  let t = (0, u.c)(28),
    { usersDb: n, currentUsername: r, onBack: a, onSave: o, onDelete: s } = e,
    l = c(h),
    [m, g] = (0, d.useState)(`closed`);
  let currentUserObj = (n || []).find((u) => u.username === r);
  let isAdmin = e.isAdmin !== undefined ? !!e.isAdmin : currentUserObj?.role === 'admin';
  let _;
  t[0] !== r || t[1] !== s || t[2] !== l || t[3] !== n
    ? ((_ = function (e) {
        if (!isAdmin) {
          l(`Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể xóa tài khoản.`, `error`);
          return;
        }
        if (e.username === r) {
          l(`Bạn không thể xóa chính tài khoản đang đăng nhập.`, `error`);
          return;
        }
        let t = i(n, e.username);
        if (t) {
          l(t, `error`);
          return;
        }
        l(
          `Bạn có chắc chắn muốn xóa tài khoản "${e.username}"?`,
          `confirm`,
          () => s(e.username),
        );
      }),
      (t[0] = r),
      (t[1] = s),
      (t[2] = l),
      (t[3] = n),
      (t[4] = _))
    : (_ = t[4]);
  let v = _,
    y;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = (0, f.jsxs)(`h2`, {
        className: `text-xl font-black text-slate-800 tracking-tight flex items-center gap-3`,
        children: [
          (0, f.jsx)(`div`, {
            className: `w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100`,
            children: (0, f.jsx)(`i`, { className: `fas fa-users-cog` }),
          }),
          `Quản lý người dùng`,
        ],
      })),
      (t[5] = y))
    : (y = t[5]);
  let b;
  t[6] === n.length
    ? (b = t[7])
    : ((b = (0, f.jsxs)(`div`, {
        children: [
          y,
          (0, f.jsxs)(`p`, {
            className: `text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest flex items-center gap-2`,
            children: [
              n.length,
              ` tài khoản`,
              !isAdmin && (0, f.jsx)(`span`, {
                className: `text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider`,
                children: `Chế độ chỉ đọc`,
              }),
            ],
          }),
        ],
      })),
      (t[6] = n.length),
      (t[7] = b));
  let x;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = () => g(null)), (t[8] = x))
    : (x = t[8]);
  let S;
  S = isAdmin
    ? (0, f.jsxs)(`button`, {
        onClick: x,
        className: `px-5 py-2.5 bg-violet-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-violet-700 transition-all flex items-center gap-2`,
        children: [
          (0, f.jsx)(`i`, { className: `fas fa-plus` }),
          ` Thêm người dùng`,
        ],
      })
    : null;
  let C;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = (0, f.jsx)(`i`, { className: `fas fa-arrow-left` })), (t[10] = C))
    : (C = t[10]);
  let w;
  t[11] === a
    ? (w = t[12])
    : ((w = (0, f.jsxs)(`div`, {
        className: `view-header-actions flex gap-3`,
        children: [
          S,
          (0, f.jsxs)(`button`, {
            onClick: a,
            className: `px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2`,
            children: [C, ` Quay lại Topology`],
          }),
        ],
      })),
      (t[11] = a),
      (t[12] = w));
  let T;
  t[13] !== b || t[14] !== w
    ? ((T = (0, f.jsxs)(`div`, {
        className: `view-header px-8 py-6 border-b border-slate-200 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0`,
        children: [b, w],
      })),
      (t[13] = b),
      (t[14] = w),
      (t[15] = T))
    : (T = t[15]);
  let E;
  t[16] !== r || t[17] !== v || t[18] !== n
    ? ((E = (0, f.jsx)(`div`, {
        className: `flex-1 overflow-y-auto custom-scroll bg-slate-50/50 p-8`,
        children:
          n.length === 0
            ? (0, f.jsx)(`p`, {
                className: `text-sm text-slate-400 text-center py-12`,
                children: `Chưa có người dùng nào.`,
              })
            : (0, f.jsx)(`div`, {
                className: `bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden`,
                children: (0, f.jsxs)(`table`, {
                  className: `w-full text-sm`,
                  children: [
                    (0, f.jsx)(`thead`, {
                      children: (0, f.jsxs)(`tr`, {
                        className: `bg-slate-50 border-b border-slate-200 text-left`,
                        children: [
                          (0, f.jsx)(`th`, {
                            className: `px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                            children: `Tài khoản`,
                          }),
                          (0, f.jsx)(`th`, {
                            className: `px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest`,
                            children: `Vai trò`,
                          }),
                          isAdmin && (0, f.jsx)(`th`, {
                            className: `px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right`,
                            children: `Thao tác`,
                          }),
                        ],
                      }),
                    }),
                    (0, f.jsx)(`tbody`, {
                      children: n.map((e) =>
                        (0, f.jsxs)(
                          `tr`,
                          {
                            className: `border-b border-slate-100 last:border-0 hover:bg-slate-50/70`,
                            children: [
                              (0, f.jsx)(`td`, {
                                className: `px-5 py-3.5 font-bold text-slate-700`,
                                children: (0, f.jsxs)(`span`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    e.username,
                                    e.username === r &&
                                      (0, f.jsx)(`span`, {
                                        className: `text-[9px] font-black text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-full uppercase tracking-widest`,
                                        children: `Bạn`,
                                      }),
                                  ],
                                }),
                              }),
                              (0, f.jsx)(`td`, {
                                className: `px-5 py-3.5`,
                                children: (0, f.jsx)(`span`, {
                                  className: `text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${e.role === `admin` ? `bg-amber-50 text-amber-600` : `bg-slate-100 text-slate-500`}`,
                                  children:
                                    e.role === `admin`
                                      ? `Quản trị viên`
                                      : `Người dùng`,
                                }),
                              }),
                              isAdmin && (0, f.jsxs)(`td`, {
                                className: `px-5 py-3.5 text-right`,
                                children: [
                                  (0, f.jsxs)(`button`, {
                                    onClick: () => g(e),
                                    className: `text-indigo-500 hover:text-indigo-700 text-xs font-bold mr-3`,
                                    children: [
                                      (0, f.jsx)(`i`, {
                                        className: `fas fa-pen mr-1`,
                                      }),
                                      `Sửa`,
                                    ],
                                  }),
                                  (0, f.jsxs)(`button`, {
                                    onClick: () => v(e),
                                    className: `text-red-500 hover:text-red-700 text-xs font-bold`,
                                    children: [
                                      (0, f.jsx)(`i`, {
                                        className: `fas fa-trash mr-1`,
                                      }),
                                      `Xóa`,
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          e.username,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
      })),
      (t[16] = r),
      (t[17] = v),
      (t[18] = n),
      (t[19] = E))
    : (E = t[19]);
  let D;
  t[20] !== m || t[21] !== o || t[22] !== n
    ? ((D =
        m !== `closed` &&
        (0, f.jsx)(p, {
          user: m,
          usersDb: n,
          onSave: (e, t) => {
            if (!isAdmin) {
              l(`Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể chỉnh sửa hoặc thêm tài khoản.`, `error`);
              return;
            }
            (o(e, t), g(`closed`));
          },
          onClose: () => g(`closed`),
        })),
      (t[20] = m),
      (t[21] = o),
      (t[22] = n),
      (t[23] = D))
    : (D = t[23]);
  let O;
  return (
    t[24] !== D || t[25] !== T || t[26] !== E
      ? ((O = (0, f.jsxs)(`div`, {
          className: `w-full h-full flex flex-col`,
          children: [T, E, D],
        })),
        (t[24] = D),
        (t[25] = T),
        (t[26] = E),
        (t[27] = O))
      : (O = t[27]),
    O
  );
}
function h(e) {
  return e.showDialog;
}
export { m as default };
