import React, { useRef } from 'react';
import { useUIStore } from '../stores/useUIStore.js';
import { useNetworkStore } from '../stores/useNetworkStore.js';
import { useSandboxStore } from '../stores/useToastStore.js';
import { useDialogStore } from '../stores/useDialogStore.js';

export function IconRail({ isAdmin = true, username = 'admin' }) {
  const activeView = useUIStore((state) => state.activeView);
  const setActiveView = useUIStore((state) => state.setActiveView);
  const showFullTopologyView = useUIStore((state) => state.showFullTopologyView);
  const openReportModal = useUIStore((state) => state.openReportModal);
  const openGlobalTimelineModal = useUIStore((state) => state.openGlobalTimelineModal);
  const openAddSwitchModal = useUIStore((state) => state.openAddSwitchModal);

  const isSandboxMode = useSandboxStore((state) => state.isSandboxMode);
  const showDialog = useDialogStore((state) => state.showDialog);

  const fileInputRef = useRef(null);

  const toggleSandbox = () => {
    if (isSandboxMode) {
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
    } else {
      const state = useNetworkStore.getState();
      const snapshot = structuredClone({
        DB: state.DB,
        GlobalLogs: state.GlobalLogs,
        ElevatorDB: state.ElevatorDB,
        WifiDB: state.WifiDB,
        WifiFloorplans: state.WifiFloorplans,
        CctvCameraDB: state.CctvCameraDB,
        CctvFloorplans: state.CctvFloorplans,
        CctvFloorConnectors: state.CctvFloorConnectors,
        ODFDB: state.ODFDB,
        IPPhoneDB: state.IPPhoneDB,
        NVRDB: state.NVRDB,
        KroneDB: state.KroneDB,
        FirewallDB: state.FirewallDB,
        GponFrameDB: state.GponFrameDB,
        GponOntDB: state.GponOntDB,
        BackupHistory: state.BackupHistory
      });
      useSandboxStore.getState().enter(snapshot);
      showDialog(
        '🧪 Sandbox Mode đã bật!\n\nMọi thay đổi chỉ tồn tại trong bộ nhớ, không lưu vào database thật.\nBấm nút Flask lần nữa để thoát và khôi phục dữ liệu gốc.',
        'success'
      );
    }
  };

  const handleExportBackup = () => {
    const state = useNetworkStore.getState();
    const data = {
      DB: state.DB,
      GlobalLogs: state.GlobalLogs,
      ElevatorDB: state.ElevatorDB,
      WifiDB: state.WifiDB,
      WifiFloorplans: state.WifiFloorplans,
      CctvCameraDB: state.CctvCameraDB,
      CctvFloorplans: state.CctvFloorplans,
      CctvFloorConnectors: state.CctvFloorConnectors,
      ODFDB: state.ODFDB,
      IPPhoneDB: state.IPPhoneDB,
      NVRDB: state.NVRDB,
      KroneDB: state.KroneDB,
      FirewallDB: state.FirewallDB,
      GponFrameDB: state.GponFrameDB,
      GponOntDB: state.GponOntDB
    };

    const fileName = `AquaNet_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    showDialog(`Đã xuất bản sao lưu thành công: ${fileName}`, 'success');
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        showDialog('Khôi phục toàn bộ cơ sở dữ liệu từ file JSON này?', 'confirm', () => {
          useNetworkStore.getState().hydrate(json);
          showDialog('Phục hồi dữ liệu thành công!', 'success');
        });
      } catch (err) {
        showDialog('File JSON không hợp lệ hoặc bị lỗi định dạng!', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <aside className="icon-rail">
      <button
        onClick={openAddSwitchModal}
        className="icon-rail-btn icon-rail-btn-primary"
        title="Thêm thiết bị mới"
      >
        <i className="fas fa-plus" />
      </button>

      <div className="icon-rail-group custom-scroll">
        <button
          onClick={showFullTopologyView}
          className={`icon-rail-btn ${activeView === 'topology' ? 'active' : ''}`}
          title="Sơ đồ Switch (Topology)"
        >
          <i className="fas fa-diagram-project" />
        </button>

        <button
          onClick={() => setActiveView('ipam')}
          className={`icon-rail-btn ${activeView === 'ipam' ? 'active' : ''}`}
          title="Quản lý IPAM & Subnets"
        >
          <i className="fas fa-sitemap" />
        </button>

        <button
          onClick={() => setActiveView('elevator')}
          className={`icon-rail-btn ${activeView === 'elevator' ? 'active' : ''}`}
          title="Elevator Topology"
        >
          <i className="fas fa-elevator" />
        </button>

        <button
          onClick={() => setActiveView('wifi')}
          className={`icon-rail-btn icon-rail-btn--cyan ${activeView === 'wifi' ? 'active' : ''}`}
          title="WiFi Access Points"
        >
          <i className="fas fa-wifi" />
        </button>

        <button
          onClick={() => setActiveView('cctv')}
          className={`icon-rail-btn icon-rail-btn--orange ${activeView === 'cctv' ? 'active' : ''}`}
          title="CCTV — Camera Topology"
        >
          <i className="fas fa-video" />
        </button>

        <button
          onClick={() => setActiveView('odf')}
          className={`icon-rail-btn icon-rail-btn--amber ${activeView === 'odf' ? 'active' : ''}`}
          title="ODF — Phối quang"
        >
          <i className="fas fa-network-wired" />
        </button>

        <button
          onClick={() => setActiveView('ipphone')}
          className={`icon-rail-btn icon-rail-btn--green ${activeView === 'ipphone' ? 'active' : ''}`}
          title="Điện thoại IP (VLAN 150)"
        >
          <i className="fas fa-phone-alt" />
        </button>

        <button
          onClick={() => setActiveView('gpon')}
          className={`icon-rail-btn icon-rail-btn--cyan ${activeView === 'gpon' ? 'active' : ''}`}
          title="GPON Network (OLT / ONT)"
        >
          <i className="fas fa-circle-nodes" />
        </button>

        <button
          onClick={() => setActiveView('inventory')}
          className={`icon-rail-btn ${activeView === 'inventory' ? 'active' : ''}`}
          title="Kho thiết bị (Device Inventory)"
        >
          <i className="fas fa-boxes-stacked" />
        </button>
      </div>

      <div className="icon-rail-footer flex flex-col gap-1.5 pb-2">
        <button
          onClick={() => openReportModal('summary')}
          className="icon-rail-btn"
          title="Báo cáo & Thống kê"
        >
          <i className="fas fa-chart-pie" />
        </button>

        <button
          onClick={openGlobalTimelineModal}
          className="icon-rail-btn"
          title="Global Activity Timeline"
        >
          <i className="fas fa-history" />
        </button>

        <button
          onClick={toggleSandbox}
          className={`icon-rail-btn ${isSandboxMode ? 'icon-rail-btn--sandbox active' : ''}`}
          title={isSandboxMode ? 'Thoát Sandbox Mode' : 'Bật Sandbox Mode thử nghiệm'}
        >
          <i className="fas fa-flask" />
        </button>

        <button
          onClick={handleExportBackup}
          className="icon-rail-btn"
          title="Sao lưu JSON (Export)"
        >
          <i className="fas fa-download" />
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="icon-rail-btn"
          title="Phục hồi JSON (Import)"
        >
          <i className="fas fa-upload" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportFile}
          className="hidden"
        />

        {isAdmin && (
          <button
            onClick={() => setActiveView('users')}
            className={`icon-rail-btn ${activeView === 'users' ? 'active' : ''}`}
            title="Quản trị người dùng"
          >
            <i className="fas fa-users-cog" />
          </button>
        )}
      </div>
    </aside>
  );
}

export default IconRail;
