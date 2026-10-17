import React from 'react';
import { useUIStore } from '../stores/useUIStore.js';
import { useSandboxStore } from '../stores/useToastStore.js';
import { useDialogStore } from '../stores/useDialogStore.js';
import { useNetworkStore } from '../stores/useNetworkStore.js';

export function Header({ currentUser, onLogout }) {
  const activeView = useUIStore((state) => state.activeView);
  const setActiveView = useUIStore((state) => state.setActiveView);
  const scale = useUIStore((state) => state.scale);
  const setScale = useUIStore((state) => state.setScale);
  const topologyIconMode = useUIStore((state) => state.topologyIconMode);
  const toggleTopologyIconMode = useUIStore((state) => state.toggleTopologyIconMode);
  const toggleSidebarMobile = useUIStore((state) => state.toggleSidebarMobile);
  const openGlobalSearch = useUIStore((state) => state.openGlobalSearch);

  const isSandboxMode = useSandboxStore((state) => state.isSandboxMode);
  const showDialog = useDialogStore((state) => state.showDialog);

  const viewTitles = {
    topology: 'Sơ đồ Switch & Hạ tầng Mạng',
    ipam: 'Quản lý Không gian Địa chỉ IP (IPAM)',
    elevator: 'Hạ tầng Mạng Thang máy & Elevator CCTV',
    wifi: 'Quản lý WiFi Access Points & Bản vẽ phủ sóng',
    cctv: 'Camera CCTV & Mặt bằng Quan sát',
    odf: 'Hộp phối quang ODF & Trục Fiber Tracing',
    ipphone: 'Hệ thống Điện thoại IP (VLAN 150)',
    gpon: 'Mạng quang thụ động GPON (OLT / ONT)',
    inventory: 'Tổng kho Thiết bị (Device Inventory)',
    users: 'Quản trị Tài khoản & Phân quyền'
  };

  const handleExitSandbox = () => {
    showDialog(
      'Thoát Sandbox Mode?\nMọi thay đổi trong môi trường thử nghiệm sẽ bị hủy và dữ liệu gốc được khôi phục.',
      'confirm',
      () => {
        const snapshot = useSandboxStore.getState().exit();
        if (snapshot) {
          useNetworkStore.getState().hydrate(snapshot);
          showDialog('Đã thoát Sandbox Mode. Dữ liệu gốc đã được khôi phục.', 'success');
        }
      }
    );
  };

  return (
    <header className="header flex flex-col border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      {isSandboxMode && (
        <div className="bg-amber-500 text-white text-xs font-bold px-4 py-1.5 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <i className="fas fa-flask animate-bounce" />
            <span>
              <b>Sandbox Mode đang hoạt động:</b> Mọi thao tác chỉnh sửa không ghi vào cơ sở dữ liệu thật.
            </span>
          </div>
          <button
            onClick={handleExitSandbox}
            className="px-2 py-0.5 bg-black/20 hover:bg-black/30 rounded text-[11px] font-bold uppercase transition-colors"
          >
            Thoát Sandbox
          </button>
        </div>
      )}

      <div className="px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebarMobile}
            className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center"
          >
            <i className="fas fa-bars" />
          </button>

          <div>
            <h2 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span>{viewTitles[activeView] || 'Network Infrastructure'}</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">
              Aquamarine Resort & Casino · DC Network Infrastructure
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeView === 'topology' && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setScale(scale - 0.1)}
                className="w-7 h-7 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center text-xs font-bold transition-all"
                title="Thu nhỏ"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                onClick={() => setScale(1)}
                className="px-2 text-[10px] font-bold font-mono text-slate-600 hover:text-indigo-600"
                title="Tỉ lệ gốc 100%"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={() => setScale(scale + 0.1)}
                className="w-7 h-7 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center text-xs font-bold transition-all"
                title="Phóng to"
              >
                <i className="fas fa-plus" />
              </button>
              <div className="w-[1px] h-4 bg-slate-200 mx-1" />
              <button
                onClick={toggleTopologyIconMode}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all ${
                  topologyIconMode ? 'bg-indigo-600 text-white' : 'hover:bg-white text-slate-600'
                }`}
                title="Chế độ xem Icon / Chi tiết"
              >
                <i className="fas fa-icons" />
              </button>
            </div>
          )}

          <button
            onClick={openGlobalSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors border border-slate-200 cursor-pointer"
          >
            <i className="fas fa-search text-[10px]" />
            <span>Tìm kiếm...</span>
            <kbd className="text-[9px] bg-white px-1.5 py-0.5 rounded font-mono border border-slate-300">
              ⌘K
            </kbd>
          </button>

          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-black text-xs flex items-center justify-center shadow-md">
                  {currentUser.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-black text-slate-800 leading-tight">
                    {currentUser.username}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
                    {currentUser.role || 'viewer'}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors ml-1"
                title="Đăng xuất"
              >
                <i className="fas fa-sign-out-alt text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
