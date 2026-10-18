import React, { useState, useEffect } from '../core/react-adapter.js';
import {
  getProjectsList,
  getActiveProjectId,
  getActiveProject,
  setActiveProjectId,
  addProject,
  updateProject,
  deleteProject
} from '../services/projectManager.js';
import { db } from '../services/firebase.js';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAllBrandNames, deleteBrand } from '../services/brandManager.js';

export default function ProjectsView({ onBack, isAdmin = true, username = 'system' }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'devices'
  const [projects, setProjects] = useState(getProjectsList());
  const [activeId, setActiveIdState] = useState(getActiveProjectId());
  
  // Selected project to inspect/manage devices (defaults to active project)
  const [inspectProjId, setInspectProjId] = useState(getActiveProjectId());
  const [projectFloors, setProjectFloors] = useState([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(false);

  // Project Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projLocation, setProjLocation] = useState('');
  const [templateMode, setTemplateMode] = useState('empty'); // 'empty' | 'standard' | 'clone'
  const [projectFormError, setProjectFormError] = useState('');
  const [isSubmittingProj, setIsSubmittingProj] = useState(false);

  // Switch Modal states
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [editingSwitch, setEditingSwitch] = useState(null);
  const [swName, setSwName] = useState('');
  const [swIp, setSwIp] = useState('');
  const [swBrand, setSwBrand] = useState('Cisco');
  const [swModel, setSwModel] = useState('');
  const [swFloor, setSwFloor] = useState('Server Room');
  const [swCustomFloor, setSwCustomFloor] = useState('');
  const [swPorts, setSwPorts] = useState(24);
  const [swType, setSwType] = useState('access');
  const [switchFormError, setSwitchFormError] = useState('');
  const [isSubmittingSwitch, setIsSubmittingSwitch] = useState(false);

  // Firewall / Router Modal states
  const [projectFirewalls, setProjectFirewalls] = useState([]);
  const [deviceSubTab, setDeviceSubTab] = useState('all'); // 'all' | 'switch' | 'router' | 'firewall'
  const [isFwModalOpen, setIsFwModalOpen] = useState(false);
  const [editingFw, setEditingFw] = useState(null);
  const [fwType, setFwType] = useState('firewall'); // 'firewall' | 'router'
  const [fwName, setFwName] = useState('');
  const [fwBrand, setFwBrand] = useState('Fortinet');
  const [fwModel, setFwModel] = useState('FortiGate 100F');
  const [fwIp, setFwIp] = useState('');
  const [fwMac, setFwMac] = useState('');
  const [fwZone, setFwZone] = useState('Server Room');
  const [fwUplinkTarget, setFwUplinkTarget] = useState('');
  const [fwUplinkPort, setFwUplinkPort] = useState(1);
  const [fwPorts, setFwPorts] = useState(24);
  const [fwFormError, setFwFormError] = useState('');
  const [isSubmittingFw, setIsSubmittingFw] = useState(false);

  // Sync projects list
  useEffect(() => {
    function handleUpdate() {
      setProjects(getProjectsList());
      setActiveIdState(getActiveProjectId());
    }
    window.addEventListener('nim:projects_updated', handleUpdate);
    window.addEventListener('nim:project_changed', handleUpdate);
    return () => {
      window.removeEventListener('nim:projects_updated', handleUpdate);
      window.removeEventListener('nim:project_changed', handleUpdate);
    };
  }, []);

  // Fetch switches and firewalls for the inspectProjId
  useEffect(() => {
    if (!inspectProjId) return;
    setIsLoadingDevices(true);
    const swDocName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
    const fwDocName = inspectProjId === 'default' ? 'firewall' : `${inspectProjId}_firewall`;
    const swDocRef = doc(db, 'networkData', swDocName);
    const fwDocRef = doc(db, 'networkData', fwDocName);

    const unsubSw = onSnapshot(swDocRef, (snap) => {
      setIsLoadingDevices(false);
      if (snap.exists()) {
        const data = snap.data();
        setProjectFloors(Array.isArray(data.DB) ? data.DB : []);
      } else {
        setProjectFloors([]);
      }
    }, (err) => {
      setIsLoadingDevices(false);
      console.warn('Error fetching project switches:', err);
    });

    const unsubFw = onSnapshot(fwDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setProjectFirewalls(Array.isArray(data.FirewallDB) ? data.FirewallDB : []);
      } else {
        setProjectFirewalls([]);
      }
    }, (err) => {
      console.warn('Error fetching project firewalls:', err);
    });

    return () => {
      unsubSw();
      unsubFw();
    };
  }, [inspectProjId]);

  // Flatten all switches from projectFloors
  const currentInspectProject = projects.find(p => p.id === inspectProjId) || { name: 'Dự án', id: inspectProjId };
  const allSwitches = [];
  (projectFloors || []).forEach(f => {
    (f.switches || []).forEach(s => {
      allSwitches.push({ ...s, floorName: f.floor });
    });
  });

  const routers = (projectFirewalls || []).filter(fw => fw.deviceType === 'router' || (fw.name && fw.name.toLowerCase().includes('router')));
  const firewalls = (projectFirewalls || []).filter(fw => fw.deviceType !== 'router' && (!fw.name || !fw.name.toLowerCase().includes('router')));


  // --- PROJECT ACTIONS ---
  function handleOpenAddProject() {
    setEditingProject(null);
    setProjName('');
    setProjDesc('');
    setProjLocation('');
    setTemplateMode('empty');
    setProjectFormError('');
    setIsProjectModalOpen(true);
  }

  function handleOpenEditProject(proj) {
    setEditingProject(proj);
    setProjName(proj.name);
    setProjDesc(proj.desc || '');
    setProjLocation(proj.location || '');
    setProjectFormError('');
    setIsProjectModalOpen(true);
  }

  async function handleSaveProject(e) {
    e.preventDefault();
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể tạo/sửa dự án.');
      return;
    }
    if (!projName.trim()) {
      setProjectFormError('Vui lòng nhập tên dự án!');
      return;
    }

    setIsSubmittingProj(true);
    try {
      if (editingProject) {
        updateProject(editingProject.id, { name: projName, desc: projDesc, location: projLocation });
        setProjects(getProjectsList());
        setIsProjectModalOpen(false);
      } else {
        const created = await addProject({
          name: projName,
          desc: projDesc,
          location: projLocation,
          templateMode
        });
        setProjects(getProjectsList());
        setIsProjectModalOpen(false);
        setInspectProjId(created.id);
        setActiveTab('devices');
        // Kích hoạt làm việc trên dự án mới
        setActiveProjectId(created.id, { reload: true });
      }
    } catch (err) {
      setProjectFormError(err.message || 'Lỗi khi lưu dự án');
    } finally {
      setIsSubmittingProj(false);
    }
  }

  function handleSwitchActiveProject(id) {
    if (id === activeId) return;
    setActiveProjectId(id, { reload: true });
  }

  async function handleDeleteProject(proj) {
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể xóa dự án.');
      return;
    }
    if (projects.length <= 1) {
      alert('Bạn cần giữ lại ít nhất 1 dự án trong hệ thống!');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${proj.name}" không?\nToàn bộ dữ liệu của dự án này sẽ bị xóa khỏi đám mây.`)) {
      try {
        await deleteProject(proj.id);
        const remaining = getProjectsList();
        setProjects(remaining);
        if (inspectProjId === proj.id) {
          setInspectProjId(remaining[0]?.id || '');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  // --- DEVICE ACTIONS ---
  function handleOpenAddSwitch() {
    setEditingSwitch(null);
    setSwName(`SW-${currentInspectProject.name.substring(0, 3).toUpperCase() || 'NET'}-${allSwitches.length + 1}`);
    setSwIp('192.168.1.' + (10 + allSwitches.length));
    setSwBrand('Cisco');
    setSwModel('CBS350-24T');
    setSwFloor(projectFloors[0]?.floor || 'Server Room');
    setSwCustomFloor('');
    setSwPorts(24);
    setSwType(allSwitches.length === 0 ? 'core' : 'access');
    setSwitchFormError('');
    setIsSwitchModalOpen(true);
  }

  function handleOpenEditSwitch(sw) {
    setEditingSwitch(sw);
    setSwName(sw.name || '');
    setSwIp(sw.ip || '');
    setSwBrand(sw.brand || 'Cisco');
    setSwModel(sw.model || '');
    setSwFloor(sw.floorName || 'Server Room');
    setSwCustomFloor('');
    setSwPorts(sw.totalPorts || 24);
    setSwType(sw.type || 'access');
    setSwitchFormError('');
    setIsSwitchModalOpen(true);
  }

  async function handleSaveSwitch(e) {
    e.preventDefault();
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể thêm/sửa Switch.');
      return;
    }
    if (!swName.trim()) {
      setSwitchFormError('Vui lòng nhập tên Switch!');
      return;
    }
    if (!swIp.trim()) {
      setSwitchFormError('Vui lòng nhập IP quản trị của Switch!');
      return;
    }

    const targetFloorName = swFloor === '__custom__' ? (swCustomFloor.trim() || 'Tầng Mới') : swFloor;
    setIsSubmittingSwitch(true);

    try {
      const docName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
      const docRef = doc(db, 'networkData', docName);

      let updatedFloors = JSON.parse(JSON.stringify(projectFloors));

      if (editingSwitch) {
        // Edit existing switch
        updatedFloors.forEach(f => {
          f.switches = (f.switches || []).filter(s => s.id !== editingSwitch.id);
        });
        let targetFloor = updatedFloors.find(f => f.floor === targetFloorName);
        if (!targetFloor) {
          targetFloor = { floor: targetFloorName, switches: [] };
          updatedFloors.push(targetFloor);
        }
        targetFloor.switches.push({
          ...editingSwitch,
          name: swName.trim(),
          ip: swIp.trim(),
          brand: swBrand,
          model: swModel.trim() || 'CBS350',
          totalPorts: Number(swPorts),
          type: swType
        });
      } else {
        // Add new switch
        const newSwId = `sw-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newPorts = Array.from({ length: Number(swPorts) }, (_, i) => ({
          port: i + 1,
          status: 'down',
          vlan: 1,
          type: swType === 'core' ? 'trunk' : 'access',
          device: ''
        }));

        let targetFloor = updatedFloors.find(f => f.floor === targetFloorName);
        if (!targetFloor) {
          targetFloor = { floor: targetFloorName, switches: [] };
          updatedFloors.push(targetFloor);
        }
        targetFloor.switches.push({
          id: newSwId,
          name: swName.trim(),
          ip: swIp.trim(),
          brand: swBrand,
          model: swModel.trim() || 'CBS350',
          totalPorts: Number(swPorts),
          type: swType,
          ports: newPorts
        });
      }

      await setDoc(docRef, { DB: updatedFloors }, { merge: true });
      setProjectFloors(updatedFloors);
      setIsSwitchModalOpen(false);
    } catch (err) {
      setSwitchFormError(err.message || 'Lỗi khi lưu Switch');
    } finally {
      setIsSubmittingSwitch(false);
    }
  }

  async function handleDeleteSwitch(sw) {
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể xóa Switch.');
      return;
    }
    if (!confirm(`Bạn có chắc chắn muốn xóa Switch "${sw.name}" (${sw.ip}) khỏi dự án này?`)) return;

    try {
      const docName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
      const docRef = doc(db, 'networkData', docName);

      const updatedFloors = projectFloors.map(f => ({
        ...f,
        switches: (f.switches || []).filter(s => s.id !== sw.id)
      }));

      await setDoc(docRef, { DB: updatedFloors }, { merge: true });
      setProjectFloors(updatedFloors);
    } catch (err) {
      alert('Lỗi xóa switch: ' + err.message);
    }
  }

  // --- FIREWALL & ROUTER ACTIONS ---
  function handleOpenAddFirewall(type = 'firewall') {
    setEditingFw(null);
    setFwType(type);
    if (type === 'router') {
      setFwName(`RT-${(currentInspectProject.name || 'NET').substring(0, 3).toUpperCase()}-01`);
      setFwBrand('Cisco');
      setFwModel('ISR 4331');
      setFwIp('10.0.0.1');
      setFwMac('00:1A:2B:3C:4D:01');
      setFwZone('Server Room');
      setFwUplinkTarget(allSwitches[0]?.name || '');
      setFwUplinkPort(1);
      setFwPorts(8);
    } else {
      setFwName(`FW-${(currentInspectProject.name || 'NET').substring(0, 3).toUpperCase()}-01`);
      setFwBrand('Fortinet');
      setFwModel('FortiGate 100F');
      setFwIp('10.0.1.1');
      setFwMac('00:09:0F:FE:ED:01');
      setFwZone('Server Room');
      setFwUplinkTarget(allSwitches[0]?.name || '');
      setFwUplinkPort(1);
      setFwPorts(24);
    }
    setFwFormError('');
    setIsFwModalOpen(true);
  }

  function handleOpenEditFirewall(fw) {
    setEditingFw(fw);
    const isRouter = fw.deviceType === 'router' || (fw.name && fw.name.toLowerCase().includes('router'));
    setFwType(isRouter ? 'router' : 'firewall');
    setFwName(fw.name || '');
    setFwBrand(fw.brand || (isRouter ? 'Cisco' : 'Fortinet'));
    setFwModel(fw.model || '');
    setFwIp(fw.ip || '');
    setFwMac(fw.mac || '');
    setFwZone(fw.zone || 'Server Room');
    setFwUplinkTarget(fw.uplinkTarget || '');
    setFwUplinkPort(fw.uplinkPort || 1);
    setFwPorts(fw.totalPorts || (Array.isArray(fw.ports) ? fw.ports.length : 24));
    setFwFormError('');
    setIsFwModalOpen(true);
  }

  async function handleSaveFirewall(e) {
    e.preventDefault();
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể thêm/sửa Router & Firewall.');
      return;
    }
    if (!fwName.trim()) {
      setFwFormError('Vui lòng nhập tên thiết bị!');
      return;
    }
    if (!fwIp.trim()) {
      setFwFormError('Vui lòng nhập IP thiết bị!');
      return;
    }

    setIsSubmittingFw(true);
    try {
      const docName = inspectProjId === 'default' ? 'firewall' : `${inspectProjId}_firewall`;
      const docRef = doc(db, 'networkData', docName);

      let updatedList = [...(projectFirewalls || [])];
      const portsCount = Number(fwPorts) || 24;

      if (editingFw) {
        const idx = updatedList.findIndex(item => item.id === editingFw.id);
        const existingPorts = Array.isArray(editingFw.ports) ? editingFw.ports : [];
        let newPorts = [...existingPorts];
        if (newPorts.length < portsCount) {
          for (let i = newPorts.length + 1; i <= portsCount; i++) {
            newPorts.push({ port: i, status: 'down', vlan: 1, type: 'access', device: '' });
          }
        } else if (newPorts.length > portsCount) {
          newPorts = newPorts.slice(0, portsCount);
        }

        const updatedItem = {
          ...editingFw,
          name: fwName.trim(),
          brand: fwBrand,
          model: fwModel.trim(),
          ip: fwIp.trim(),
          mac: fwMac.trim() || '00:00:00:00:00:00',
          zone: fwZone.trim() || 'Server Room',
          deviceType: fwType,
          uplinkTarget: fwUplinkTarget,
          uplinkPort: Number(fwUplinkPort) || 1,
          totalPorts: portsCount,
          ports: newPorts
        };

        if (idx >= 0) {
          updatedList[idx] = updatedItem;
        } else {
          updatedList.push(updatedItem);
        }
      } else {
        const newId = `${fwType}-${Date.now()}`;
        const newPorts = Array.from({ length: portsCount }, (_, i) => ({
          port: i + 1,
          status: 'down',
          vlan: 1,
          type: 'access',
          device: ''
        }));

        const newItem = {
          id: newId,
          name: fwName.trim(),
          brand: fwBrand,
          model: fwModel.trim(),
          ip: fwIp.trim(),
          mac: fwMac.trim() || '00:00:00:00:00:00',
          zone: fwZone.trim() || 'Server Room',
          deviceType: fwType,
          uplinkTarget: fwUplinkTarget,
          uplinkPort: Number(fwUplinkPort) || 1,
          totalPorts: portsCount,
          ports: newPorts,
          type: fwType === 'router' ? 'Gateway Router' : 'Next-Gen Firewall',
          enabled: true,
          status: 'online'
        };
        updatedList.push(newItem);
      }

      await setDoc(docRef, { FirewallDB: updatedList }, { merge: true });
      setProjectFirewalls(updatedList);
      setIsFwModalOpen(false);
    } catch (err) {
      setFwFormError(err.message || 'Lỗi khi lưu thiết bị');
    } finally {
      setIsSubmittingFw(false);
    }
  }

  async function handleDeleteFirewall(fw) {
    const isRouter = fw.deviceType === 'router' || (fw.name && fw.name.toLowerCase().includes('router'));
    const label = isRouter ? 'Router' : 'Firewall';
    if (!isAdmin) {
      alert(`Bạn không có quyền thực hiện thao tác này. Chỉ Quản trị viên mới có thể xóa ${label}.`);
      return;
    }
    if (!confirm(`Bạn có chắc chắn muốn xóa ${label} "${fw.name}" (${fw.ip}) khỏi dự án này?`)) return;

    try {
      const docName = inspectProjId === 'default' ? 'firewall' : `${inspectProjId}_firewall`;
      const docRef = doc(db, 'networkData', docName);

      const updatedList = (projectFirewalls || []).filter(item => item.id !== fw.id);
      await setDoc(docRef, { FirewallDB: updatedList }, { merge: true });
      setProjectFirewalls(updatedList);
    } catch (err) {
      alert(`Lỗi xóa ${label}: ` + err.message);
    }
  }

  const brandOptions = getAllBrandNames ? getAllBrandNames() : ['Cisco', 'Ruijie', 'Aruba', 'MikroTik', 'Huawei', 'TP-Link', 'Ubiquiti UniFi', 'D-Link', 'HP'];
  const fwBrandOptions = ['Fortinet', 'Cisco', 'Sophos', 'Palo Alto', 'MikroTik', 'pfSense', 'Ruijie', 'Check Point', 'Juniper', 'D-Link', 'TP-Link'];


  return (
    <div className="view-container flex flex-col h-full bg-slate-50 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="view-header px-6 py-4 border-b border-slate-200 bg-white shadow-xs flex flex-wrap justify-between items-center shrink-0 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100 text-lg">
            <i className="fas fa-folder-tree"></i>
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              Quản Lý Dự Án & Hạ Tầng Thiết Bị
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                {projects.length} Dự án
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Đang làm việc: <strong className="text-indigo-600 font-bold">{projects.find(p => p.id === activeId)?.name || 'Dự án Trung Tâm'}</strong> (ID: {activeId})
            </p>
          </div>
        </div>

        {/* View Switch Buttons & Actions */}
        <div className="flex items-center gap-2">
          {/* Tab Navigation */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fas fa-building text-[11px]"></i>
              Danh Sách Dự Án
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'devices'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fas fa-server text-[11px]"></i>
              Thiết Bị Của Dự Án ({allSwitches.length + routers.length + firewalls.length})
            </button>
          </div>

          {!isAdmin && (
            <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-black rounded-xl border border-amber-200 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <i className="fas fa-lock text-[10px]"></i>
              Chỉ đọc (Viewer)
            </span>
          )}

          {isAdmin && (
            <button
              onClick={handleOpenAddProject}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-plus text-[10px]"></i>
              Tạo Dự Án Mới
            </button>
          )}

          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-arrow-left text-[10px]"></i>
              Về Sơ Đồ Topology
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scroll p-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* TAB 1: DANH SÁCH DỰ ÁN */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">Các Dự Án Hạ Tầng Của Bạn</h3>
                  <p className="text-xs text-slate-500">Bấm "Chọn làm việc" để chuyển sơ đồ, hoặc "Quản lý thiết bị" để thêm/sửa switch của dự án đó.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((proj) => {
                  const isActive = proj.id === activeId;
                  return (
                    <div
                      key={proj.id}
                      className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between relative overflow-hidden ${
                        isActive
                          ? 'border-indigo-500 shadow-lg shadow-indigo-100/50 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
                      }`}
                    >
                      {/* Top Info */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                                isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <i className="fas fa-building"></i>
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-1">
                                {proj.name}
                              </h4>
                              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                <i className="fas fa-location-dot text-[10px]"></i>
                                {proj.location || 'Chưa cập nhật vị trí'}
                              </span>
                            </div>
                          </div>

                          {isActive && (
                            <span className="shrink-0 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-200 flex items-center gap-1 uppercase tracking-wider">
                              <i className="fas fa-circle-check text-[10px]"></i>
                              Đang chọn
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed min-h-[32px] line-clamp-2 mb-4">
                          {proj.desc || 'Không có mô tả chi tiết cho dự án này.'}
                        </p>
                      </div>

                      {/* Footer & Actions */}
                      <div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium mb-3">
                          <span>
                            <i className="fas fa-calendar-alt mr-1 text-slate-300"></i>
                            {proj.createdAt || 'N/A'}
                          </span>
                          <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-slate-500 text-[10px]">
                            ID: {proj.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive ? (
                            <button
                              disabled
                              className="flex-1 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 border border-emerald-200 cursor-default"
                            >
                              <i className="fas fa-check"></i>
                              Đang làm việc
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSwitchActiveProject(proj.id)}
                              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                              title="Chuyển sơ đồ và toàn bộ hệ thống sang dự án này"
                            >
                              <i className="fas fa-arrow-right-to-bracket text-[10px]"></i>
                              Chọn làm việc
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setInspectProjId(proj.id);
                              setActiveTab('devices');
                            }}
                            className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                            title="Xem và quản lý thiết bị của dự án này"
                          >
                            <i className="fas fa-server"></i>
                            Thiết bị
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => handleOpenEditProject(proj)}
                              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all text-xs cursor-pointer"
                              title="Sửa thông tin dự án"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          )}

                          {isAdmin && projects.length > 1 && (
                            <button
                              onClick={() => handleDeleteProject(proj)}
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 transition-all text-xs cursor-pointer"
                              title="Xóa dự án"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: QUẢN LÝ THIẾT BỊ CỦA DỰ ÁN */}
          {activeTab === 'devices' && (
            <div className="space-y-4">
              {/* Project selector bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold">
                    <i className="fas fa-network-wired"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Đang quản lý thiết bị của:</span>
                      <select
                        value={inspectProjId}
                        onChange={(e) => setInspectProjId(e.target.value)}
                        className="text-xs font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-1 cursor-pointer outline-none hover:bg-indigo-100"
                      >
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} {p.id === activeId ? '(Đang hoạt động)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Tổng số: <strong className="text-slate-700 font-bold">{allSwitches.length} Switch</strong> • <strong className="text-indigo-600 font-bold">{routers.length} Router</strong> • <strong className="text-rose-600 font-bold">{firewalls.length} Firewall</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {inspectProjId !== activeId && (
                    <button
                      onClick={() => handleSwitchActiveProject(inspectProjId)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fas fa-check-double text-[10px]"></i>
                      Kích Hoạt Làm Việc
                    </button>
                  )}

                  {isAdmin && (
                    <>
                      <button
                        onClick={handleOpenAddSwitch}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <i className="fas fa-plus text-[10px]"></i>
                        + Thêm Switch
                      </button>

                      <button
                        onClick={() => handleOpenAddFirewall('router')}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <i className="fas fa-route text-[10px]"></i>
                        + Thêm Router
                      </button>

                      <button
                        onClick={() => handleOpenAddFirewall('firewall')}
                        className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <i className="fas fa-shield-halved text-[10px]"></i>
                        + Thêm Firewall
                      </button>
                    </>
                  )}

                  {onBack && (
                    <button
                      onClick={onBack}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Mở sơ đồ Topology"
                    >
                      <i className="fas fa-diagram-project text-[10px]"></i>
                      Topology
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-tab Filter Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setDeviceSubTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    deviceSubTab === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Tất Cả ({allSwitches.length + routers.length + firewalls.length})
                </button>
                <button
                  onClick={() => setDeviceSubTab('switch')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    deviceSubTab === 'switch'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <i className="fas fa-server mr-1.5 text-[10px]"></i>
                  Switch ({allSwitches.length})
                </button>
                <button
                  onClick={() => setDeviceSubTab('router')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    deviceSubTab === 'router'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <i className="fas fa-route mr-1.5 text-[10px]"></i>
                  Router Gateway ({routers.length})
                </button>
                <button
                  onClick={() => setDeviceSubTab('firewall')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    deviceSubTab === 'firewall'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <i className="fas fa-shield-halved mr-1.5 text-[10px]"></i>
                  Firewall Bảo Mật ({firewalls.length})
                </button>
              </div>

              {isLoadingDevices ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
                  <i className="fas fa-spinner fa-spin text-xl text-indigo-600 mb-2 block"></i>
                  Đang tải thiết bị của dự án...
                </div>
              ) : (
                <div className="space-y-6">
                  {/* ROUTERS & FIREWALLS TABLE */}
                  {(deviceSubTab === 'all' || deviceSubTab === 'router' || deviceSubTab === 'firewall') && (
                    <div>
                      {(() => {
                        const targetList = deviceSubTab === 'router'
                          ? routers
                          : deviceSubTab === 'firewall'
                          ? firewalls
                          : [...routers, ...firewalls];

                        if (targetList.length === 0) {
                          if (deviceSubTab === 'all') return null;
                          return (
                            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
                              <p className="text-xs text-slate-500 mb-3">
                                Dự án này chưa có {deviceSubTab === 'router' ? 'Router Gateway' : 'Firewall'} nào.
                              </p>
                              {isAdmin && (
                                <button
                                  onClick={() => handleOpenAddFirewall(deviceSubTab === 'router' ? 'router' : 'firewall')}
                                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                >
                                  <i className="fas fa-plus"></i>
                                  Thêm {deviceSubTab === 'router' ? 'Router' : 'Firewall'} Mới
                                </button>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-6">
                            <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <i className="fas fa-shield-halved text-rose-500"></i>
                                Router & Tường Lửa Firewall ({targetList.length})
                              </h4>
                              {isAdmin && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleOpenAddFirewall('router')}
                                    className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 cursor-pointer"
                                  >
                                    + Thêm Router
                                  </button>
                                  <button
                                    onClick={() => handleOpenAddFirewall('firewall')}
                                    className="px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 cursor-pointer"
                                  >
                                    + Thêm Firewall
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-3 px-4">Tên Thiết Bị</th>
                                    <th className="py-3 px-4">Loại Thiết Bị</th>
                                    <th className="py-3 px-4">IP Quản Trị</th>
                                    <th className="py-3 px-4">MAC Address</th>
                                    <th className="py-3 px-4">Vị Trí / Khu Vực</th>
                                    <th className="py-3 px-4">Hãng & Model</th>
                                    <th className="py-3 px-4">Số Cổng</th>
                                    <th className="py-3 px-4 text-right">Thao Tác</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {targetList.map((fw) => {
                                    const isRouter = fw.deviceType === 'router' || (fw.name && fw.name.toLowerCase().includes('router'));
                                    return (
                                      <tr key={fw.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="py-3 px-4 font-extrabold text-slate-800 flex items-center gap-2">
                                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                                            isRouter ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                                          }`}>
                                            <i className={`fas ${isRouter ? 'fa-route' : 'fa-shield-halved'}`}></i>
                                          </span>
                                          <div>
                                            <span>{fw.name}</span>
                                            <span className="block text-[10px] font-mono text-slate-400 font-normal">ID: {fw.id}</span>
                                          </div>
                                        </td>
                                        <td className="py-3 px-4">
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            isRouter ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                                          }`}>
                                            {isRouter ? 'Router Gateway' : 'Next-Gen Firewall'}
                                          </span>
                                        </td>
                                        <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                                          {fw.ip || 'Chưa cấu hình'}
                                        </td>
                                        <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                                          {fw.mac || 'Chưa có MAC'}
                                        </td>
                                        <td className="py-3 px-4 text-slate-600 font-medium">
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[11px]">
                                            <i className="fas fa-layer-group text-[9px]"></i>
                                            {fw.zone || 'Server Room'}
                                          </span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 font-medium">
                                          <span className="font-bold text-slate-800">{fw.brand || (isRouter ? 'Cisco' : 'Fortinet')}</span>
                                          <span className="text-slate-400 text-[10px] ml-1.5">{fw.model || ''}</span>
                                        </td>
                                        <td className="py-3 px-4 font-mono font-bold text-slate-700">
                                          {fw.totalPorts || (Array.isArray(fw.ports) ? fw.ports.length : 24)} Ports
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                          {isAdmin ? (
                                            <div className="flex items-center justify-end gap-1.5">
                                              <button
                                                onClick={() => handleOpenEditFirewall(fw)}
                                                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                                title="Chỉnh sửa thiết bị này"
                                              >
                                                <i className="fas fa-edit"></i>
                                              </button>
                                              <button
                                                onClick={() => handleDeleteFirewall(fw)}
                                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                                title="Xóa khỏi dự án"
                                              >
                                                <i className="fas fa-trash-alt"></i>
                                              </button>
                                            </div>
                                          ) : (
                                            <span className="text-[10px] text-slate-400 italic">Chỉ xem</span>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* SWITCHES TABLE */}
                  {(deviceSubTab === 'all' || deviceSubTab === 'switch') && (
                    <div>
                      {allSwitches.length === 0 ? (
                        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto mb-3">
                            <i className="fas fa-server"></i>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800">Dự án này chưa có Switch nào</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
                            Bạn có thể thêm Switch đầu tiên để quản lý hạ tầng mạng phân tầng.
                          </p>
                          {isAdmin && (
                            <button
                              onClick={handleOpenAddSwitch}
                              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                            >
                              <i className="fas fa-plus"></i>
                              Thêm Switch Mới
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                          <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <i className="fas fa-server text-indigo-600"></i>
                              Danh Sách Switch Phân Tầng ({allSwitches.length})
                            </h4>
                            {isAdmin && (
                              <button
                                onClick={handleOpenAddSwitch}
                                className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 cursor-pointer"
                              >
                                + Thêm Switch
                              </button>
                            )}
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                  <th className="py-3 px-4">Tên Switch</th>
                                  <th className="py-3 px-4">IP Quản Trị</th>
                                  <th className="py-3 px-4">Tầng / Vị Trí</th>
                                  <th className="py-3 px-4">Hãng & Model</th>
                                  <th className="py-3 px-4">Số Port</th>
                                  <th className="py-3 px-4">Loại Switch</th>
                                  <th className="py-3 px-4 text-right">Thao Tác</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {allSwitches.map((sw) => (
                                  <tr key={sw.id} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="py-3 px-4 font-extrabold text-slate-800 flex items-center gap-2">
                                      <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                        <i className="fas fa-server"></i>
                                      </span>
                                      <div>
                                        <span>{sw.name}</span>
                                        <span className="block text-[10px] font-mono text-slate-400 font-normal">ID: {sw.id}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                                      {sw.ip || 'Chưa cấu hình'}
                                    </td>
                                    <td className="py-3 px-4 text-slate-600 font-medium">
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[11px]">
                                        <i className="fas fa-layer-group text-[9px]"></i>
                                        {sw.floorName}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-slate-700 font-medium">
                                      <span className="font-bold text-slate-800">{sw.brand || 'Cisco'}</span>
                                      <span className="text-slate-400 text-[10px] ml-1.5">{sw.model || ''}</span>
                                    </td>
                                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                                      {sw.totalPorts || sw.ports?.length || 24} Ports
                                    </td>
                                    <td className="py-3 px-4">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                        sw.type === 'core'
                                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                          : sw.type === 'distribution'
                                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      }`}>
                                        {sw.type || 'Access'}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      {isAdmin ? (
                                        <div className="flex items-center justify-end gap-1.5">
                                          <button
                                            onClick={() => handleOpenEditSwitch(sw)}
                                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                            title="Chỉnh sửa Switch này"
                                          >
                                            <i className="fas fa-edit"></i>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteSwitch(sw)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                            title="Xóa Switch khỏi dự án"
                                          >
                                            <i className="fas fa-trash-alt"></i>
                                          </button>
                                        </div>
                                      ) : (
                                        <span className="text-[10px] text-slate-400 italic">Chỉ xem</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Empty state when everything is 0 */}
                  {deviceSubTab === 'all' && allSwitches.length === 0 && routers.length === 0 && firewalls.length === 0 && (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                      <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto mb-3">
                        <i className="fas fa-network-wired"></i>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Dự án này chưa có thiết bị nào</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
                        Hãy bắt đầu thêm Router, Firewall hoặc Switch để xây dựng hạ tầng mạng của bạn!
                      </p>
                      {isAdmin ? (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenAddFirewall('router')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            <i className="fas fa-route mr-1.5"></i>
                            + Thêm Router
                          </button>
                          <button
                            onClick={() => handleOpenAddFirewall('firewall')}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            <i className="fas fa-shield-halved mr-1.5"></i>
                            + Thêm Firewall
                          </button>
                          <button
                            onClick={handleOpenAddSwitch}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            <i className="fas fa-server mr-1.5"></i>
                            + Thêm Switch
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Tài khoản chỉ xem không có quyền thêm thiết bị.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* MODAL 1: THÊM / SỬA DỰ ÁN */}
      {isProjectModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsProjectModalOpen(false);
          }}
        >
          <div
            className="pv-modal-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '540px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: '1px solid #cbd5e1',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Modal Header */}
            <div
              className="pv-modal-header"
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8fafc',
                boxSizing: 'border-box',
                width: '100%'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: '#eef2ff',
                    color: '#4f46e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px'
                  }}
                >
                  <i className="fas fa-folder-plus"></i>
                </span>
                <span>{editingProject ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSaveProject}
              style={{
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxSizing: 'border-box',
                width: '100%',
                margin: 0
              }}
            >
              {projectFormError && (
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#b91c1c',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-triangle-exclamation"></i>
                  <span>{projectFormError}</span>
                </div>
              )}

              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                  Tên Dự Án <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tòa Nhà Park 2, Chi nhánh Cần Thơ..."
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                    display: 'block',
                    textAlign: 'left'
                  }}
                />
              </div>

              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                  Vị trí / Địa chỉ
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 123 Nguyễn Văn Linh, Quận 7, TP.HCM"
                  value={projLocation}
                  onChange={(e) => setProjLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                    display: 'block',
                    textAlign: 'left'
                  }}
                />
              </div>

              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                  Mô tả dự án
                </label>
                <textarea
                  rows="2"
                  placeholder="Ghi chú về quy mô, mục đích dự án..."
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                    display: 'block',
                    textAlign: 'left',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              {!editingProject && (
                <div style={{ width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '8px', textAlign: 'left' }}>
                    Khởi tạo thiết bị ban đầu
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: templateMode === 'empty' ? '2px solid #4f46e5' : '1.5px solid #e2e8f0',
                        backgroundColor: templateMode === 'empty' ? '#eef2ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="projTemplate"
                          checked={templateMode === 'empty'}
                          onChange={() => setTemplateMode('empty')}
                          style={{ accentColor: '#4f46e5' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                          Dự án trống hoàn toàn (Khuyên dùng)
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b', paddingLeft: '22px' }}>
                        Dự án hoàn toàn mới và sạch (0 Switch, 0 Tầng, IPAM trống), không chứa dữ liệu từ dự án mặc định.
                      </span>
                    </label>

                    <label
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: templateMode === 'standard' ? '2px solid #4f46e5' : '1.5px solid #e2e8f0',
                        backgroundColor: templateMode === 'standard' ? '#eef2ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="projTemplate"
                          checked={templateMode === 'standard'}
                          onChange={() => setTemplateMode('standard')}
                          style={{ accentColor: '#4f46e5' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                          Khung chuẩn (Core + 2 Switch)
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b', paddingLeft: '22px' }}>
                        Tạo sẵn 1 Switch Core và 2 Switch Access kết nối Fiber.
                      </span>
                    </label>

                    <label
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: templateMode === 'clone' ? '2px solid #4f46e5' : '1.5px solid #e2e8f0',
                        backgroundColor: templateMode === 'clone' ? '#eef2ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="projTemplate"
                          checked={templateMode === 'clone'}
                          onChange={() => setTemplateMode('clone')}
                          style={{ accentColor: '#4f46e5' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                          Sao chép mẫu
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b', paddingLeft: '22px' }}>
                        Sao chép toàn bộ thiết bị Switch từ Dự án Trung Tâm sang.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="pv-modal-footer" style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  style={{
                    padding: '9px 18px',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProj}
                  style={{
                    padding: '9px 20px',
                    backgroundColor: '#4f46e5',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
                  }}
                >
                  {isSubmittingProj ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      <span>{editingProject ? 'Lưu Thay Đổi' : 'Tạo Dự Án & Bắt Đầu Thêm Thiết Bị'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: THÊM / SỬA SWITCH TRỰC TIẾP CHO DỰ ÁN */}
      {isSwitchModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSwitchModalOpen(false);
          }}
        >
          <div
            className="pv-modal-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '540px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: '1px solid #cbd5e1',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Modal Header */}
            <div
              className="pv-modal-header"
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8fafc',
                boxSizing: 'border-box',
                width: '100%'
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px'
                    }}
                  >
                    <i className="fas fa-server"></i>
                  </span>
                  <span>{editingSwitch ? 'Chỉnh Sửa Switch' : 'Thêm Switch Mới Vào Dự Án'}</span>
                </h3>
                <p style={{ margin: '4px 0 0 42px', fontSize: '11px', fontWeight: 700, color: '#4f46e5' }}>
                  Dự án: {currentInspectProject.name} (ID: {inspectProjId})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSwitchModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Switch Form */}
            <form
              onSubmit={handleSaveSwitch}
              style={{
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxSizing: 'border-box',
                width: '100%',
                margin: 0
              }}
            >
              {switchFormError && (
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#b91c1c',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-triangle-exclamation"></i>
                  <span>{switchFormError}</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Tên Switch <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: SW-CORE-01"
                    value={swName}
                    onChange={(e) => setSwName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    IP Quản Trị <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 192.168.1.10"
                    value={swIp}
                    onChange={(e) => setSwIp(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: '#4f46e5',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textAlign: 'left' }}>
                      Hãng Sản Xuất
                    </label>
                    {swBrand && (
                      <button
                        type="button"
                        onClick={() => {
                          const confirmMsg = `Bạn có chắc chắn muốn xóa thương hiệu "${swBrand}" khỏi danh sách?`;
                          if (window.confirm(confirmMsg)) {
                            deleteBrand(swBrand);
                            const updated = getAllBrandNames();
                            setSwBrand(updated[0] || '');
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title={`Xóa thương hiệu "${swBrand}"`}
                      >
                        <i className="fas fa-trash-alt" style={{ fontSize: '10px' }} /> Xóa hiệu
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select
                      value={swBrand}
                      onChange={(e) => setSwBrand(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        backgroundColor: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'pointer'
                      }}
                    >
                      {brandOptions.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {swBrand && (
                      <button
                        type="button"
                        onClick={() => {
                          const confirmMsg = `Bạn có chắc chắn muốn xóa thương hiệu "${swBrand}" khỏi danh sách?`;
                          if (window.confirm(confirmMsg)) {
                            deleteBrand(swBrand);
                            const updated = getAllBrandNames();
                            setSwBrand(updated[0] || '');
                          }
                        }}
                        style={{
                          padding: '10px',
                          backgroundColor: '#fee2e2',
                          border: '1.5px solid #fca5a5',
                          borderRadius: '12px',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                        title={`Xóa thương hiệu "${swBrand}"`}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="VD: CBS350-24T..."
                    value={swModel}
                    onChange={(e) => setSwModel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Tầng / Vị Trí
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                      value={swFloor}
                      onChange={(e) => setSwFloor(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        backgroundColor: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'pointer'
                      }}
                    >
                      {(projectFloors || []).map(f => (
                        <option key={f.floor} value={f.floor}>{f.floor}{f.switches?.length ? ` (${f.switches.length} sw)` : ` (trống)`}</option>
                      ))}
                      <option value="__custom__">+ Nhập tầng mới...</option>
                    </select>
                    {swFloor && swFloor !== '__custom__' && (
                      <button
                        type="button"
                        onClick={async () => {
                          const target = (projectFloors || []).find(f => f.floor === swFloor);
                          const swCount = (target?.switches || []).length;
                          const msg = swCount > 0
                            ? `Tầng / Vị trí "${swFloor}" đang có ${swCount} switch. Bạn có chắc chắn muốn xóa vị trí này và toàn bộ switch thuộc tầng?`
                            : `Bạn có chắc chắn muốn xóa Tầng / Vị trí "${swFloor}"?`;
                          if (window.confirm(msg)) {
                            const updated = (projectFloors || []).filter(f => f.floor !== swFloor);
                            const docName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
                            const docRef = doc(db, 'networkData', docName);
                            await setDoc(docRef, { DB: updated }, { merge: true });
                            setProjectFloors(updated);
                            setSwFloor(updated[0]?.floor || '__custom__');
                          }
                        }}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: '#fff1f2',
                          border: '1.5px solid #fecdd3',
                          color: '#f43f5e',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        title={`Xóa tầng/vị trí "${swFloor}"`}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    )}
                  </div>
                  {swFloor === '__custom__' && (
                    <input
                      type="text"
                      placeholder="Gõ tên tầng mới..."
                      value={swCustomFloor}
                      onChange={(e) => setSwCustomFloor(e.target.value)}
                      style={{
                        width: '100%',
                        marginTop: '6px',
                        padding: '8px 12px',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #818cf8',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Số Cổng (Ports)
                  </label>
                  <select
                    value={swPorts}
                    onChange={(e) => setSwPorts(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value={8}>8 Ports</option>
                    <option value={16}>16 Ports</option>
                    <option value={24}>24 Ports</option>
                    <option value={48}>48 Ports</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                  Kiểu Switch
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['core', 'distribution', 'access'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSwType(type)}
                      style={{
                        padding: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '10px',
                        border: swType === type ? '2px solid #4f46e5' : '1.5px solid #cbd5e1',
                        backgroundColor: swType === type ? '#4f46e5' : '#f8fafc',
                        color: swType === type ? '#ffffff' : '#334155',
                        textTransform: 'capitalize',
                        cursor: 'pointer'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pv-modal-footer" style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsSwitchModalOpen(false)}
                  style={{
                    padding: '9px 18px',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingSwitch}
                  style={{
                    padding: '9px 20px',
                    backgroundColor: '#059669',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.2)'
                  }}
                >
                  {isSubmittingSwitch ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      <span>{editingSwitch ? 'Cập Nhật Switch' : 'Thêm Vào Dự Án Này'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: THÊM / SỬA FIREWALL & ROUTER */}
      {isFwModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFwModalOpen(false);
          }}
        >
          <div
            className="pv-modal-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '540px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: '1px solid #cbd5e1',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Modal Header */}
            <div
              className="pv-modal-header"
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8fafc',
                boxSizing: 'border-box',
                width: '100%'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: fwType === 'router' ? '#eff6ff' : '#fff1f2',
                    color: fwType === 'router' ? '#2563eb' : '#e11d48',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px'
                  }}
                >
                  <i className={`fas ${fwType === 'router' ? 'fa-route' : 'fa-shield-halved'}`}></i>
                </span>
                <span>
                  {editingFw
                    ? (fwType === 'router' ? 'Chỉnh Sửa Router' : 'Chỉnh Sửa Firewall')
                    : (fwType === 'router' ? 'Thêm Router Vào Dự Án' : 'Thêm Firewall Vào Dự Án')}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setIsFwModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSaveFirewall}
              style={{
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxSizing: 'border-box',
                width: '100%',
                margin: 0
              }}
            >
              {fwFormError && (
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#b91c1c',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-triangle-exclamation"></i>
                  <span>{fwFormError}</span>
                </div>
              )}

              {/* Loại thiết bị toggle */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                  Loại Thiết Bị
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setFwType('router')}
                    style={{
                      padding: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '12px',
                      border: fwType === 'router' ? '2px solid #2563eb' : '1.5px solid #cbd5e1',
                      backgroundColor: fwType === 'router' ? '#eff6ff' : '#f8fafc',
                      color: fwType === 'router' ? '#1d4ed8' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-route"></i>
                    <span>Router Gateway</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFwType('firewall')}
                    style={{
                      padding: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '12px',
                      border: fwType === 'firewall' ? '2px solid #e11d48' : '1.5px solid #cbd5e1',
                      backgroundColor: fwType === 'firewall' ? '#fff1f2' : '#f8fafc',
                      color: fwType === 'firewall' ? '#be123c' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-shield-halved"></i>
                    <span>Firewall Bảo Mật</span>
                  </button>
                </div>
              </div>

              {/* Tên Thiết Bị */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                  Tên Thiết Bị <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={fwType === 'router' ? 'VD: RT-Gateway-01' : 'VD: FW-Core-01'}
                  value={fwName}
                  onChange={(e) => setFwName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Hãng & Model */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Hãng Sản Xuất
                  </label>
                  <select
                    value={fwBrand}
                    onChange={(e) => setFwBrand(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    {fwBrandOptions.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder={fwType === 'router' ? 'VD: ISR 4331, RB5009...' : 'VD: FortiGate 100F, XGS 126...'}
                    value={fwModel}
                    onChange={(e) => setFwModel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* IP Quản trị & MAC */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    IP Quản Trị <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 10.0.0.1 hoặc 192.168.1.1"
                    value={fwIp}
                    onChange={(e) => setFwIp(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#4338ca',
                      fontFamily: 'monospace',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Địa Chỉ MAC
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 00:09:0F:FE:ED:01"
                    value={fwMac}
                    onChange={(e) => setFwMac(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      fontFamily: 'monospace',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Vị trí / Khu vực & Số Cổng */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Vị Trí / Khu Vực (Zone)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Server Room, Tầng 1..."
                    value={fwZone}
                    onChange={(e) => setFwZone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Số Cổng (Ports)
                  </label>
                  <select
                    value={fwPorts}
                    onChange={(e) => setFwPorts(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value={4}>4 Ports</option>
                    <option value={8}>8 Ports</option>
                    <option value={16}>16 Ports</option>
                    <option value={24}>24 Ports</option>
                    <option value={48}>48 Ports</option>
                  </select>
                </div>
              </div>

              {/* Uplink Target & Port */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Kết Nối Uplink Đến
                  </label>
                  <select
                    value={fwUplinkTarget}
                    onChange={(e) => setFwUplinkTarget(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">(Không kết nối / Độc lập)</option>
                    {allSwitches.map(sw => (
                      <option key={sw.id} value={sw.name}>{sw.name} ({sw.floorName})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px', textAlign: 'left' }}>
                    Cổng Uplink
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={48}
                    value={fwUplinkPort}
                    onChange={(e) => setFwUplinkPort(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pv-modal-footer" style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsFwModalOpen(false)}
                  style={{
                    padding: '9px 18px',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingFw}
                  style={{
                    padding: '9px 20px',
                    backgroundColor: fwType === 'router' ? '#2563eb' : '#e11d48',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: fwType === 'router'
                      ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                      : '0 4px 6px -1px rgba(225, 29, 72, 0.2)'
                  }}
                >
                  {isSubmittingFw ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      <span>
                        {editingFw
                          ? (fwType === 'router' ? 'Cập Nhật Router' : 'Cập Nhật Firewall')
                          : (fwType === 'router' ? 'Thêm Router Vào Dự Án' : 'Thêm Firewall Vào Dự Án')}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
